import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import("../styles/superAdminPage.css");

export default function SuperAdminPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const URL_API = "http://localhost:3001/api/usuarios";

  // --- PETICIÓN AL BACKEND ---
  const obtenerUsuarios = async () => {
    try {
      const resp = await fetch(URL_API);
      const data = await resp.json();
      const usuariosFormateados = data.usuarios.map((u) => ({
        ...u,
        id: u._id,
        estado: u.estado ? "Activo" : "Inactivo",
      }));

      setUsuarios(usuariosFormateados);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const [usuarioForm, setUsuarioForm] = useState({
    id: null,
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    rol: "Vendedor",
    estado: "Activo",
  });

  const handleShow = (usuario = null) => {
    if (usuario) {
      setUsuarioForm(usuario);
    } else {
      setUsuarioForm({
        id: null,
        nombre: "",
        apellido: "",
        correo: "",
        rol: "Vendedor",
        estado: "Activo",
      });
    }
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioForm({ ...usuarioForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (usuarioForm.id) {
    //   // Lógica de Edición
    //   const usuariosEditados = usuarios.map((u) =>
    //     u.id === usuarioForm.id ? usuarioForm : u,
    //   );
    //   setUsuarios(usuariosEditados);
    //   alert("Usuario actualizado con éxito");
    // } else {
    //   // Lógica de Creación (Simulada)
    //   const nuevoUsuario = {
    //     ...usuarioForm,
    //     id: usuarios.length + 1,
    //     fechaRegistro: new Date().toLocaleDateString(),
    //   };
    //   setUsuarios([...usuarios, nuevoUsuario]);
    //   alert("Usuario creado con éxito");
    // }

    // handleClose();
  
    const body = {
    ...usuarioForm,
    estado: usuarioForm.estado === "Activo"
  };

  try {
    let resp;
    if (usuarioForm.id) {
      // Lógica de Edición (PUT)
      resp = await fetch(`${URL_API}/${usuarioForm.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      // Lógica de Creación (POST)
      resp = await fetch(URL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    const data = await resp.json();

    if (resp.ok) {
     alert(usuarioForm.id ? "Usuario actualizado" : "Usuario creado");
      obtenerUsuarios(); // Refrescar la tabla
      handleClose();
    } else {
     alert(`Error: ${data.mensaje || "No se pudo realizar la operación"}`);
    }
  } catch (error) {
    console.error("Error en la peticion:", error);
  }
  };

  const handleEliminar = async (id) => {
  if (window.confirm("¿Estás seguro de eliminar este usuario permanentemente?")) {
    try {
      const resp = await fetch(`${URL_API}/${id}`, {
        method: "DELETE",
      });

      if (resp.ok) {
        alert("Usuario eliminado correctamente");
        obtenerUsuarios(); // Refrescar la tabla
      } else {
        const data = await resp.json();
        alert(`Error al eliminar: ${data.mensaje}`);
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  }
};

  // --- FILTRO ---
  const usuariosFiltrados = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.correo.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <section id="SAdmin_container">
      <h2>Dashboard SuperAdmin</h2>

      <div id="usuarios_header">
        <h5 id="usuarios_tittle">LISTA DE USUARIOS</h5>
        <button id="cargarUsuario" onClick={() => handleShow()}>
          Nuevo Usuario
        </button>

        <div id="inputBuscar_container">
          <Form.Control
            id="controlBuscar"
            type="search"
            placeholder="Buscar usuario..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      <div id="usuarios_main">
        <table id="usuarios_table">
          <thead id="usuariosTable_thead">
            <tr className="columns_TableUsuarios">
              <th>ID</th>
              <th>NOMBRE</th>
              <th>APELLIDO</th>
              <th>CORREO</th>
              <th>ROL</th>
              <th>ESTADO</th>
              <th>FECHA REGISTRO</th>
              <th id="icons_container">
                <FaPen /> <FaTrashCan />
              </th>
            </tr>
          </thead>

          <tbody>
            {usuariosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              usuariosFiltrados.map((u) => (
                <tr key={u._id} className="text-center">
                  <td>{u._id}</td>
                  <td>{u.nombre}</td>
                  <td>{u.apellido}</td>
                  <td>{u.correo}</td>
                  <td>{u.rol}</td>
                  <td>
                    <span
                      className={
                        u.estado === "Activo" ? "text-success" : "text-danger"
                      }
                    >
                      {u.estado}
                    </span>
                  </td>

                  <td>{new Date(u.fechaRegistro).toLocaleDateString()}</td>

                  <td id="icons_container">
                    <Button
                      variant="link"
                      id="btn_modificar"
                      onClick={() => handleShow(u)}
                    >
                      <FaPen />
                    </Button>
                    <Button
                      variant="link"
                      className="btn_eliminar"
                      onClick={() => handleEliminar(u.id)}
                    >
                      <FaTrashCan />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL CARGAR USUARIO */}
      <Modal show={showModal} onHide={handleClose} size="md" backdrop="static">
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#f0f2f5",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h5 id="cargarUsuario_title">
            {usuarioForm.id ? "MODIFICAR USUARIO" : "CARGAR NUEVO USUARIO"}
          </h5>
        </Modal.Header>
        <Modal.Body id="cargarUsuario_container">
          {/* Cada input tiene su 'value' conectado a un estado y su 'onChange' para actualizarlo */}
          <Form id="cargarUsuario_form" onSubmit={handleSubmit}>
            <Form.Group
              className="formGroupUsuarios"
              controlId="formGroupNombreUsuario"
            >
              <Form.Label className="formGroupLabelUsuarios">Nombre</Form.Label>
              <Form.Control
                name="nombre"
                className="formGroupControl"
                type="text"
                placeholder="Nombre del Usuario"
                required
                value={usuarioForm.nombre}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              className="formGroupUsuarios"
              controlId="formGroupApellidoUsuario"
            >
              <Form.Label className="formGroupLabelUsuarios">
                Apellido
              </Form.Label>
              <Form.Control
                name="apellido"
                className="formGroupControl"
                type="text"
                required
                placeholder="Apellido del Usuario"
                value={usuarioForm.apellido}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              className="formGroupUsuarios"
              controlId="formGroupCorreo"
            >
              <Form.Label className="formGroupLabelUsuarios">Correo</Form.Label>
              <Form.Control
                name="correo"
                className="formGroupControl"
                type="email"
                required
                placeholder="Email del usuario"
                value={usuarioForm.correo}
                onChange={handleChange}
              />
            </Form.Group>

            {!usuarioForm.id && ( // Solo mostramos password si es un usuario nuevo
              <Form.Group
                className="formGroupUsuarios"
                controlId="formGroupPassword"
              >
                <Form.Label className="formGroupLabelUsuarios">
                  Contraseña
                </Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  required
                  value={usuarioForm.password}
                  onChange={handleChange}
                />
              </Form.Group>
            )}

            <Form.Group className="formGroupUsuarios" controlId="formGroupRol">
              <Form.Label className="formGroupLabelUsuarios">Rol</Form.Label>
              <Form.Select
                className="formGroupControl"
                name="rol"
                value={usuarioForm.rol}
                onChange={handleChange}
              >
                <option value="Vendedor">Vendedor</option>
                <option value="Admin">Admin</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="formGroupUsuarios"
              controlId="formGroupEstado"
            >
              <Form.Label className="formGroupLabelUsuarios">Estado</Form.Label>
              <Form.Select
                className="formGroupControl"
                name="estado"
                value={usuarioForm.estado}
                onChange={handleChange}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </Form.Select>
            </Form.Group>

            <Button
              id="btnAddUsuario"
              type="submit"
              // El botón se bloquea si el form no esta completo
              // disabled={!formularioValido}
            >
              {usuarioForm.id ? "ACTUALIZAR USUARIO" : "GUARDAR USUARIO"}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#f0f2f5" }}></Modal.Footer>
      </Modal>
    </section>
  );
}
