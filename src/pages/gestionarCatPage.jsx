import React, { useState, useContext } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { ProductContext } from "../context/ProductContext";
import {actualizarCategoria, borrarCategoria} from "../helpers/apiCategoria"
import("../styles/gestionarCatPage.css");

export default function GestionarCatPage() {
  const {categorias, setCategorias, cargarCategorias} = useContext(ProductContext);

  const [showModal, setShowModal] = useState(false);
  const [categoriaForm, setCategoriaForm] = useState({
    id: null,
    nombre: "",
    estado: "Activo",
  });

  const handleShow = (categoria) => {
    setCategoriaForm(categoria);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoriaForm({ ...categoriaForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await actualizarCategoria(categoriaForm.id, {
        nombre: categoriaForm.nombre
      });
      if (resp?.categoria) {
        alert("Categoría actualizada!");
        await cargarCategorias();
        handleClose();
      } else {
        alert(resp.mensaje || "Error al actualizar");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("Estas seguro de eliminar esta categoria permanentemente?")) {
      try {
        const resp = await borrarCategoria(id);
        if (resp) {
          alert("Categoria eliminada con exito");
          await cargarCategorias();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <section id="gestCat_container">
      <h2>Dashboard Admin</h2>

      <div id="gestCategorias_header">
        <h5 id="gestCategorias_tittle">GESTIONAR CATEGORIAS</h5>
      </div>

      <div id="categorias_main">
        <table id="categorias_table">
          <thead id="categoriasTable_thead">
            <tr className="columns_TableCategorias">
              <th>NOMBRE</th>
              <th>ESTADO</th>
              <th>FECHA REGISTRO</th>
              <th>USUARIO</th>
              <th id="icons_container">
                <FaPen /> <FaTrashCan />
              </th>
            </tr>
          </thead>

          <tbody>
            {categorias.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-3">
                  No hay categorías registradas
                </td>
              </tr>
            ) : (
              categorias.map((cat) => (
                <tr key={cat.id} className="text-center align-middle">
                  <td>{cat.nombre}</td>
                  <td>
                    <span
                      className={
                        cat.estado === "Activo" ? "text-success" : "text-danger"
                      }
                    >
                      {cat.estado}
                    </span>
                  </td>
                  <td>{cat.fechaRegistro}</td>
                  <td>{cat.usuario?.correo || cat.usuario || "Admin"}</td>
                  <td>
                    <div id="icons_container">
                      <Button variant="link" onClick={() => handleShow(cat)}>
                        <FaPen color="#1e293b" />
                      </Button>
                      <Button
                        variant="link"
                        className="text-danger"
                        onClick={() => handleEliminar(cat.id)}
                      >
                        <FaTrashCan />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL EDITAR CATEGORIA */}
      <Modal
        show={showModal}
        onHide={handleClose}
        size="md"
        backdrop="static"
        centered
      >
        <Modal.Header closeButton style={{ backgroundColor: "#f0f2f5" }}>
          <h5 id="cargarUsuario_title">MODIFICAR CATEGORIA</h5>
        </Modal.Header>
        <Modal.Body id="cargarUsuario_container">
          <Form id="cargarUsuario_form" onSubmit={handleSubmit}>
            <Form.Group
              className="formGroupUsuarios"
              controlId="formGroupNombreCat"
            >
              <Form.Label className="formGroupLabelUsuarios">Nombre</Form.Label>
              <Form.Control
                name="nombre"
                className="formGroupControl"
                type="text"
                required
                value={categoriaForm.nombre}
                onChange={handleChange}
              />
            </Form.Group>

            {/* <Form.Group
              className="formGroupUsuarios"
              controlId="formGroupEstadoCat"
            >
              <Form.Label className="formGroupLabelUsuarios">Estado</Form.Label>
              <Form.Select
                name="estado"
                className="formGroupControl"
                value={categoriaForm.estado}
                onChange={handleChange}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </Form.Select>
            </Form.Group> */}

            <Button id="btnAddUsuario" type="submit" className="mt-4">
              ACTUALIZAR CATEGORIA
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{ backgroundColor: "#f0f2f5", border: "none" }}
        ></Modal.Footer>
      </Modal>
    </section>
  );
}
