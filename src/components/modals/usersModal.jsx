import React from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { postUsuario, putUsuario } from "../../helpers/apiUsuarios";
import ("../../styles/usersModal.css");

export default function UsersModal({ 
  show, 
  handleClose, 
  usuarioForm, 
  setUsuarioForm, 
  obtenerUsuarios 
}) {

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
      alert(usuarioForm.id ? "Usuario actualizado" : "Usuario creado");
      obtenerUsuarios();
      handleClose();    
    } else {
      alert(`Error: ${data.mensaje || "Revisar los datos."}`);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="md" backdrop="static" centered>
      <Modal.Header
        closeButton
        closeVariant="white"
        style={{
          backgroundColor: "#1e293b",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h5 id="addUser_title">
          {usuarioForm.id ? "Modificar" : "Nuevo"} Usuario
        </h5>
      </Modal.Header>

      <Modal.Body id="addUser_container">

        <Form id="addUser_form" onSubmit={handleSubmit}>
          <Form.Group
            className="formGroup_users"
            controlId="formGroupNombreUsuario"
          >
            <Form.Label className="formGroupLabel_users">Nombre</Form.Label>
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
            className="formGroup_users"
            controlId="formGroupApellidoUsuario"
          >
            <Form.Label className="formGroupLabel_users">Apellido</Form.Label>
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
            className="formGroup_users"
            controlId="formGroupCorreo"
          >
            <Form.Label className="formGroupLabel_users">Correo</Form.Label>
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
              className="formGroup_users"
              controlId="formGroupPassword"
            >
              <Form.Label className="formGroupLabel_users">
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

          <Form.Group className="formGroup_users" controlId="formGroupRol">
            <Form.Label className="formGroupLabel_users">Rol</Form.Label>
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
            className="formGroup_users"
            controlId="formGroupEstado"
          >
            <Form.Label className="formGroupLabel_users">Estado</Form.Label>
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

          <Button id="btnAddUser" type="submit">
            {usuarioForm.id ? "Actualizar Usuario" : "Guardar Usuario"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}