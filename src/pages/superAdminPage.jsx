import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import {
  getUsuarios,
  postUsuario,
  putUsuario,
  deleteUsuario,
} from "../helpers/apiUsuarios";
import("../styles/superAdminPage.css");

export default function SuperAdminPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const [usuarioForm, setUsuarioForm] = useState({
    id: null,
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    rol: "Vendedor",
    estado: true,
  });

  // PETICION AL BACKEND
  const obtenerUsuarios = async () => {
    const data = await getUsuarios(0, 10);
    if (data?.usuarios) {
      setUsuarios(data.usuarios);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const handleShow = (usuario = null) => {
    if (usuario) {
      setUsuarioForm({
        ...usuario,
        id: usuario._id,
        estado: usuario.estado,
      });
    } else {
      setUsuarioForm({
        id: null,
        nombre: "",
        apellido: "",
        correo: "",
        password: "",
        rol: "Vendedor",
        estado: true,
      });
    }
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const val = name === "estado" ? value === "true" : value;
    setUsuarioForm({ ...usuarioForm, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data;

    if (usuarioForm.id) {
      data = await putUsuario(usuarioForm.id, usuarioForm);
    } else {
      data = await postUsuario(usuarioForm);
    }

    if (
      data?.mensaje === "Usuario logueado con exito" ||
      data?._id ||
      !data?.errors
    ) {
      alert(usuarioForm.id ? "Usuario actualizado" : " Usuario creado");
      obtenerUsuarios();
      handleClose();
    } else {
      alert(`Error: ${data.mensaje || "Revisar los datos."}`);
    }
  };

  const handleEliminar = async (id) => {
    if (
      window.confirm("¿Estás seguro de eliminar este usuario permanentemente?")
    ) {
      const data = await deleteUsuario(id);
      if (data) {
        alert("Usuario eliminado exitosamente.");
        obtenerUsuarios();
      }
    }
  };

  const usuariosFiltrados = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.correo.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <section id="SAdmin_container">
      <div id="usuarios_header">
        <h5 id="usuarios_tittle">LISTA DE USUARIOS</h5>

        <div id="agregar_buscar_container">
          <button id="cargarUsuario" onClick={() => handleShow()}>
            + Agregar Usuario
          </button>
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
          <thead>
            <tr className="columns_TableUsuarios">
              <th>NOMBRE Y APELLIDO</th>
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
                <tr key={u._id} className={`text-center ${!u.estado ? "u-Inactivo" : ""}`}>
                  <td>
                    {u.nombre} {u.apellido}
                  </td>
                  <td>{u.correo}</td>
                  <td
                    className={
                      u.rol === "Admin"
                        ? "rol-admin"
                        : u.rol === "Vendedor"
                          ? "rol-vendedor"
                          : ""
                    }
                  >
                    {u.rol}
                  </td>
                  <td className={u.estado ? "text-success" : "text-danger"}>
                    {u.estado ? "Activo" : "Inactivo"}
                  </td>
                  <td>{new Date(u.fechaRegistro).toLocaleDateString()}</td>

                  <td id="icons_container">
                    <Button
                      variant="link"
                      id="btn_modificar"
                      onClick={() => handleShow(u)}
                    >
                      <FaPen id="FaPen" />
                    </Button>
                    <Button
                      variant="link"
                      className="btn_eliminar"
                      onClick={() => handleEliminar(u._id)}
                    >
                      <FaTrashCan id="FaTrashCan" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ----- MODAL CARGAR USUARIO ----- */}
      <Modal show={showModal} onHide={handleClose} size="md" backdrop="static">
        <Modal.Header
          closeButton 
          closeVariant="white"
          style={{
            backgroundColor: "#1e293b",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h5 id="cargarUsuario_title">
            {usuarioForm.id ? "MODIFICAR" : "NUEVO"} USUARIO
          </h5>
        </Modal.Header>
        <Modal.Body id="cargarUsuario_container">
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
                value={usuarioForm.nombre}
                onChange={handleChange}
                required
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
                placeholder="Apellido del Usuario"
                value={usuarioForm.apellido}
                onChange={handleChange}
                required
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
                placeholder="Email del usuario"
                value={usuarioForm.correo}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {!usuarioForm.id && (
              <Form.Group
                className="formGroupUsuarios"
                controlId="formGroupPassword"
              >
                <Form.Label className="formGroupLabelUsuarios">
                  Contraseña
                </Form.Label>
                <Form.Control
                  name="password"
                  className="formGroupControl"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  onChange={handleChange}
                  required
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
                value={usuarioForm.estado.toString()}
                onChange={handleChange}
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </Form.Select>
            </Form.Group>

            <Button id="btnAddUsuario" type="submit">
              {usuarioForm.id ? "ACTUALIZAR USUARIO" : "GUARDAR USUARIO"}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#1e293b", height:"40px"}}></Modal.Footer>
      </Modal>
    </section>
  );
}
