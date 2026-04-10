import React, { useContext, useState } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { ProductContext } from "../../context/ProductContext";
import("../../styles/productModal.css");

export default function ProductModal({ show, onHide }) {
  const {
    categorias,
    crearNuevaCategoria,
    handleSubmitProducto,
    nombreProd,
    setNombreProd,
    stock,
    setStock,
    precioU,
    setPrecioU,
    ganancia,
    setGanancia,
    iva,
    setIva,
    importe,
    setImporte,
    catSeleccionada,
    setCatSeleccionada,
    modificandoId,
  } = useContext(ProductContext);

  const [nuevaCatInput, setNuevaCatInput] = useState("");

  // // Lógica de cálculo interna del modal
  // const recalcularImporte = (p, i, d) => {
  //   const precioBase = Number(p) || 0;
  //   const impuesto = Number(i) || 0;
  //   const desc = Number(d) || 0;
  //   const precioConDescuento = precioBase - (precioBase * desc) / 100;
  //   const resultadoFinal =
  //     precioConDescuento + (precioConDescuento * impuesto) / 100;
  //   setImporte(resultadoFinal.toFixed(2));
  // };

  // Lógica de cálculo interna del modal
  const recalcularImporte = (p, g, i) => {
    const costo = Number(p) || 0;
    const porcGanancia = Number(g) || 0;
    const porcIva = Number(i) || 0;
    const precioConGanancia = costo + (costo * porcGanancia) / 100;
    const resultadoFinal =
      precioConGanancia + (precioConGanancia * porcIva) / 100;
    setImporte(resultadoFinal.toFixed(2));
  };

  const formularioValido =
    nombreProd.trim() !== "" &&
    stock !== "" &&
    precioU !== "" &&
    ganancia !== "" &&
    iva !== "" &&
    importe !== "" &&
    catSeleccionada !== "Elige una categoría" &&
    catSeleccionada !== "Crea una categoría";

  /* Modal CARGAR PRODUCTO */

  return (
    <Modal show={show} onHide={onHide} size="lg" backdrop="static">
      <Modal.Header closeButton style={{ backgroundColor: "#e4ebf0" }}>
        <h5 id="cargarProducto_title">
          {modificandoId ? "Modificar producto" : "Cargar Producto"}
        </h5>
      </Modal.Header>
      <Modal.Body id="cargarProducto_container">
        {/* Cada input tiene su 'value' conectado a un estado y su 'onChange' para actualizarlo */}
        <Form
          onSubmit={(e) => handleSubmitProducto(e, onHide)}
          id="cargarProducto_form"
        >
          <Form.Group className="formGroup" controlId="formGroupIdProducto">
            <Form.Label className="formGroupLabel">ID</Form.Label>
            <Form.Control
              className="formGroupControl"
              type="text"
              placeholder="ID del producto"
              disabled
              required
            />
          </Form.Group>

          <Form.Group className="formGroup" controlId="formGroupNombreProducto">
            <Form.Label className="formGroupLabel">Nombre</Form.Label>
            <Form.Control
              className="formGroupControl"
              type="text"
              placeholder="Nombre del Producto"
              value={nombreProd}
              onChange={(e) => setNombreProd(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="formGroup" controlId="formGroupStock">
            <Form.Label className="formGroupLabel">Stock</Form.Label>
            <Form.Control
              className="formGroupControl"
              type="number"
              placeholder="Stock del Producto"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="formGroup" controlId="formGroupStockCritico">
            <Form.Label className="formGroupLabel">Stock Crítico</Form.Label>
            <Form.Control
              className="formGroupControl"
              type="number"
              placeholder="Ingrese Stock Crítico del Producto"
              // value={stock}
              // onChange={(e) => setStock(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="formGroup" controlId="formGroupPrecioUnitario">
            <Form.Label className="formGroupLabel">
              Precio Costo(P.U)
            </Form.Label>
            <Form.Control
              className="formGroupControl"
              type="number"
              placeholder="Precio Unitario del Producto"
              value={precioU}
              onChange={(e) => {
                setPrecioU(e.target.value);
                recalcularImporte(e.target.value, iva, ganancia);
              }}
            />
          </Form.Group>

          <Form.Group className="formGroup" controlId="formGroupGanancia">
            <Form.Label className="formGroupLabel">% Ganancia</Form.Label>
            <Form.Control
              className="formGroupControl"
              type="number"
              placeholder="Ganancia del Producto"
              value={ganancia}
              onChange={(e) => {
                setGanancia(e.target.value);
                recalcularImporte(precioU, iva, e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="formGroup" controlId="formGroupIva">
            <Form.Label className="formGroupLabel">% IVA</Form.Label>
            <Form.Control
              className="formGroupControl"
              type="number"
              placeholder="IVA del Producto"
              value={iva}
              onChange={(e) => {
                setIva(e.target.value);
                recalcularImporte(precioU, e.target.value, ganancia);
              }}
            />
          </Form.Group>

          <Form.Group className="formGroup" controlId="formGroupImporte">
            <Form.Label className="formGroupLabel">Importe Final</Form.Label>
            <Form.Control
              className="formGroupControl"
              type="text"
              placeholder="Importe del Producto"
              disabled
              value={importe}
              onChange={(e) => setImporte(e.target.value)}
            />
          </Form.Group>

          <div id="selectCat_addProduct_container">
            {/* DropDowm Categorias */}
            <Dropdown
              style={{ width: "40%" }}
              onSelect={(val) => {
                setCatSeleccionada(val);
              }}
            >
              <Dropdown.Toggle id="dropdown-basic">
                {catSeleccionada}
              </Dropdown.Toggle>

              <Dropdown.Menu id="dropDownMenu">
                {categorias.length === 0 ? (
                  <p style={{ textAlign: "center" }}>
                    No hay categorías creadas
                  </p>
                ) : (
                  categorias.map((cat, index) => (
                    <Dropdown.Item
                      className="dropDownItem"
                      key={index}
                      eventKey={cat}
                    >
                      {cat}
                    </Dropdown.Item>
                  ))
                )}
                <Dropdown.Divider />

                <div className="d-flex ">
                  <Form.Control
                    placeholder="Nueva categoría"
                    value={nuevaCatInput}
                    onChange={(e) => setNuevaCatInput(e.target.value)}
                    onClick={(e) => e.stopPropagation()} // Evita que el dropdown se cierre al escribir
                  />
                  <Button
                    id="btnCrearCat"
                    type="button"
                    onClick={() => {
                      crearNuevaCategoria(nuevaCatInput);
                      setNuevaCatInput("");
                    }}
                  >
                    Crear
                  </Button>
                </div>
              </Dropdown.Menu>
            </Dropdown>

            <Button
              id="btnAddProduct"
              type="submit"
              // El botón se bloquea si el form no esta completo
              disabled={!formularioValido}
            >
              {modificandoId ? "Actualizar Producto" : "Guardar"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#e4ebf0" }}></Modal.Footer>
    </Modal>
  );
}
