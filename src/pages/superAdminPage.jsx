import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { getUsuarios, deleteUsuario, putUsuario } from "../helpers/apiUsuarios";

import UsersModal from "../components/modals/usersModal";
import DeleteModal from "../components/modals/deleteModal";

import("../styles/superAdminPage.css");

export default function SuperAdminPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idParaEliminar, setIdParaEliminar] = useState(null);

  const [usuarioForm, setUsuarioForm] = useState({
    id: null,
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    rol: "Vendedor",
    estado: true,
  });

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

  const clickDeleteIcon = (id) => {
    setIdParaEliminar(id);
    setShowDeleteModal(true);
  };

  // const handleEliminar = async (id) => {
  //   if (
  //     window.confirm("¿Estás seguro de eliminar este usuario permanentemente?")
  //   ) {
  //     const data = await deleteUsuario(id);
  //     if (data) {
  //       alert("Usuario eliminado exitosamente.");
  //       obtenerUsuarios();
  //     }
  //   }
  // };

  const confirmarEliminacion = async () => {
    if (idParaEliminar) {
      const data = await deleteUsuario(idParaEliminar);
      if (data) {
        alert("Usuario eliminado exitosamente.");
        obtenerUsuarios();
      }

      setShowDeleteModal(false);
      setIdParaEliminar(null);
    }
  };

  const usuariosFiltrados = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.correo.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <section id="superAdmin_container">
      <div id="users_header">
        <h5 id="users_title">USUARIOS REGISTRADOS</h5>

        <div id="add_search_container">
          <button id="addUser" onClick={() => handleShow()}>
            + Agregar Usuario
          </button>
          <Form.Control
            id="controlSearch"
            type="search"
            placeholder="Buscar usuario..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      <div id="users_main">
        <table id="users_table">
          <thead>
            <tr className="columns_TableUsuarios">
              <th>Nombre y Apellido</th>
              <th>Correo Electrónico</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Fecha de Registro</th>
              <th id="icons_container">
                <FaPen className="FaPen" />{" "}
                <FaTrashCan className="FaTrashCan" />
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
                <tr
                  key={u._id}
                  className={`text-center ${!u.estado ? "u-Inactivo" : ""}`}
                >
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
                    <Button variant="link" onClick={() => handleShow(u)}>
                      <FaPen className="FaPen Fapen_body" />
                    </Button>

                    <Button
                      variant="link"
                      disabled={u.rol === "SuperAdmin"}
                      onClick={() => {
                        if (u.rol !== "SuperAdmin") {
                          clickDeleteIcon(u._id);
                        }
                      }}
                      style={{
                        opacity: u.rol === "SuperAdmin" ? 0.4 : 1,
                        cursor:
                          u.rol === "SuperAdmin" ? "not-allowed" : "pointer",
                      }}
                      title={
                        u.rol === "SuperAdmin"
                          ? "No se puede eliminar al Administrador Principal"
                          : "Eliminar usuario"
                      }
                    >
                      <FaTrashCan className="FaTrashCan FaTrashCan_body" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <UsersModal
        show={showModal}
        handleClose={handleClose}
        usuarioForm={usuarioForm}
        setUsuarioForm={setUsuarioForm}
        obtenerUsuarios={obtenerUsuarios}
      />

      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        onConfirm={confirmarEliminacion}
        title="Eliminar Usuario"
        message="¿Estás seguro de que deseas eliminar este usuario del sistema permanentemente?"
      />
    </section>
  );
}
