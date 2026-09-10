import React, { useState, useContext } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { ProductContext } from "../context/ProductContext";
import { actualizarCategoria, borrarCategoria } from "../helpers/apiCategoria";
import DeleteModal from "../components/modals/deleteModal";
import SuccessModal from "../components/modals/succesModal";
import("../styles/gestionarCatPage.css");

export default function GestionarCatPage() {
  const { categorias, cargarCategorias } = useContext(ProductContext);

  // MODAL EDITAR
  const [showModal, setShowModal] = useState(false);
  const [categoriaForm, setCategoriaForm] = useState({
    id: null,
    nombre: "",
    estado: "Activo",
  });

  // MODAL ELIMINAR
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [catParaEliminar, setCatParaEliminar] = useState({
    id: null,
    nombre: "",
  });

  // MODAL ÉXITO
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successTitle, setSuccessTitle] = useState("OPERACIÓN EXITOSA");
  const [successMessage, setSuccessMessage] = useState("");

  const abrirNotificacion = (titulo, mensaje) => {
    setSuccessTitle(titulo);
    setSuccessMessage(mensaje);
    setShowSuccessModal(true);
  };

  const handleShow = (categoria) => {
    const categoryId = categoria._id || categoria.id;
    setCategoriaForm({
      id: categoryId,
      nombre: categoria.nombre,
      estado: categoria.estado || "Activo",
    });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoriaForm({ ...categoriaForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoriaForm.id) return;

    try {
      const resp = await actualizarCategoria(categoriaForm.id, {
        nombre: categoriaForm.nombre,
        estado: categoriaForm.estado,
      });

      if (resp) {
        handleClose();
        await cargarCategorias();
        abrirNotificacion(
          "CATEGORÍA ACTUALIZADA",
          "La categoría se modificó correctamente.",
        );
      }
    } catch (error) {}
  };

  const handleToggleEstado = async (cat) => {
    const targetId = cat.id || cat._id;
    const nuevoEstado = cat.estado === "Activo" ? "Desactivo" : "Activo";

    try {
      const resp = await actualizarCategoria(targetId, {
        nombre: cat.nombre,
        estado: nuevoEstado,
      });

      if (resp) {
        await cargarCategorias();
        abrirNotificacion(
          "ESTADO ACTUALIZADO",
          `La categoría ahora está ${nuevoEstado.toLowerCase()}.`,
        );
      }
    } catch (error) {}
  };

  const clickDeleteIcon = (cat) => {
    const targetId = cat.id || cat._id;
    setCatParaEliminar({ id: targetId, nombre: cat.nombre });
    setShowDeleteModal(true);
  };

  const confirmarEliminacion = async () => {
    if (catParaEliminar.id) {
      try {
        const resp = await borrarCategoria(catParaEliminar.id);
        if (resp) {
          setShowDeleteModal(false);
          await cargarCategorias();
          abrirNotificacion(
            "CATEGORÍA ELIMINADA",
            `La categoría "${catParaEliminar.nombre}" se eliminó correctamente.`,
          );
          setCatParaEliminar({ id: null, nombre: "" });
        }
      } catch (error) {}
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "Sin datos";
    const date = new Date(fecha);
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <section id="gestCat_container">
      <div id="gestCategorias_header">
        <h5 id="gestCategorias_tittle">GESTIONAR CATEGORIAS</h5>
      </div>

      <div id="categories_main">
        <table id="categories_table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre de Categoria</th>
              <th>Estado</th>
              <th>Fecha de Registro</th>
              <th>Usuario</th>
              <th id="icons_container">Acciones</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {categorias.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className=" text-muted text-center p-3 celda_vacia"
                >
                  No hay categorías registradas
                </td>
              </tr>
            ) : (
              categorias.map((cat, index) => {
                const targetId = cat.id || cat._id;
                const esActivo = cat.estado === "Activo";

                return (
                  <tr key={targetId} className=" categoryItem_row align-middle">
                    <td style={{ fontWeight: "bold" }}>{index + 1}</td>

                    <td className="categoryName_cell">{cat.nombre}</td>

                    <td>
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <Form.Check
                          type="switch"
                          id={`switch-cat-${targetId}`}
                          checked={esActivo}
                          onChange={() => handleToggleEstado(cat)}
                          className="custom_cat_switch"
                        />
                        <span
                          className={`estado_texto ${
                            esActivo ? "texto_activo" : "texto_desactivo"
                          }`}
                        >
                          {esActivo ? "Activo" : "Desactivo"}
                        </span>
                      </div>
                    </td>

                    <td>{formatearFecha(cat.fechaRegistro)}</td>
                    <td>{cat.usuario?.correo || cat.usuario || "Admin"}</td>
                    <td>
                      <div id="icons_container">
                        <Button
                          className="btn_modificar"
                          onClick={() => handleShow(cat)}
                        >
                          <FaPen className="FaPen Fapen_body" />
                        </Button>
                        <Button
                          className="btn_eliminar"
                          onClick={() => clickDeleteIcon(cat)}
                        >
                          <FaTrashCan className="FaTrashCan FaTrashCan_body" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
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
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#1e293b", color: "#f0f2f5" }}
        >
          <h5 id="modalEditarCat_title">MODIFICAR CATEGORIA</h5>
        </Modal.Header>
        <Modal.Body id="editarCat_modalBody">
          <Form id="editarCat_form" onSubmit={handleSubmit}>
            <Form.Group className="formGroupCat">
              <span className="formGroupLabelCat">Nombre</span>

              <Form.Control
                name="nombre"
                className="formGroupControlCat"
                type="text"
                required
                value={categoriaForm.nombre}
                onChange={handleChange}
              />
            </Form.Group>

            <Button id="btnAddCategorySubmit" type="submit" className="mt-4">
              ACTUALIZAR CATEGORIA
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{ backgroundColor: "#f0f2f5", border: "none" }}
        ></Modal.Footer>
      </Modal>

      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        onConfirm={confirmarEliminacion}
        title="ELIMINAR CATEGORÍA PERMANENTEMENTE"
        message={`¿Estás seguro de que deseas eliminar la categoría "${catParaEliminar.nombre}"? Esta acción no se puede deshacer.`}
      />

      <SuccessModal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        title={successTitle}
        message={successMessage}
      />
    </section>
  );
}
