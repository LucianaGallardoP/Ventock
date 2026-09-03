import React, { useContext, useState } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { ProductContext } from "../../context/ProductContext";
import("../../styles/productModal.css");

const sanitizarDecimal = (valor) => {
  let formateado = valor.replace(",", ".");
  formateado = formateado.replace(/[^0-9.]/g, "");

  const partes = formateado.split(".");
  if (partes.length > 2) {
    formateado = `${partes[0]}.${partes.slice(1).join("")}`;
  }

  if (!formateado.includes(".") && formateado.length > 1) {
    formateado = formateado.slice(0, 1);
  }

  if (partes[1] && partes[1].length > 2) {
    formateado = `${partes[0]}.${partes[1].slice(0, 2)}`;
  }

  return formateado;
};

export default function ProductModal({ show, onHide }) {
  const {
   
    categorias,
    crearNuevaCategoria,
    handleSubmitProducto,
     codigoProd,
  setCodigoProd,
    nombreProd,
    setNombreProd,
    stock,
    setStock,
    stockCritico,
    setStockCritico,
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

  const recalcularImporte = (p, i, u) => {
    const costo = Number(p) || 0;

    // const factorIva = Number(i) || 0;
    const factorIva = Number(i) > 0 ? Number(i) : 1
    // const factorUtilidad = Number(u) || 0;
        const factorUtilidad = Number(u) > 0 ? Number(u) : 1;


    const resultadoFinal = costo * factorIva * factorUtilidad;
    setImporte(resultadoFinal.toFixed(2));
  };

  const esDecimalValido = (val) => val === "" || (val.includes(".") && !val.endsWith("."));

  const formularioValido =
    nombreProd.trim() !== "" &&
    // stock !== "" &&
    precioU !== "" &&
    esDecimalValido(iva) &&
    esDecimalValido(ganancia) &&
    // importe !== "" &&
    catSeleccionada !== "Elige una categoría" &&
    catSeleccionada !== "Crea una categoría";



  /* Modal CARGAR PRODUCTO */
  return (
    <Modal show={show} onHide={onHide} size="lg" backdrop="static">
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#1e293b",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h5 id="cargarProducto_title">
          {modificandoId ? "Modificar Producto" : "Cargar Producto"}
        </h5>
      </Modal.Header>
      <Modal.Body id="cargarProducto_container">
        <Form
          onSubmit={(e) => handleSubmitProducto(e, onHide)}
          id="cargarProducto_form"
        >
          <Form.Group className="formGroup" controlId="formGroupCodigoProducto">
            <Form.Label className="formGroupLabel">Código</Form.Label>
            <Form.Control
              className="formGroupControl"
              type="text"
              placeholder="Código del producto"
              value={codigoProd}
    onChange={(e) => setCodigoProd(e.target.value)}
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
              value={stockCritico}
              onChange={(e) => setStockCritico(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="formGroup" controlId="formGroupPrecioUnitario">
            <Form.Label className="formGroupLabel">
              Precio Costo(P.U)
            </Form.Label>
            <Form.Control
              className="formGroupControl"
              type="number"
              step="any"
              placeholder="Precio Unitario del Producto"
              value={precioU}
              onChange={(e) => {
                setPrecioU(e.target.value);
                recalcularImporte(e.target.value, iva, ganancia);
              }}
            />
          </Form.Group>

          <Form.Group className="formGroup" controlId="formGroupIva">
            <Form.Label className="formGroupLabel">Factor IVA</Form.Label>
            <Form.Control
              className="formGroupControl"
              type="text"
              inputMode="decimal"
              placeholder="Ej: 1.21"
              value={iva}
              onChange={(e) => {
                // setIva(e.target.value);
                // recalcularImporte(precioU, e.target.value, ganancia);
                const valorLimpio = sanitizarDecimal(e.target.value);
      setIva(valorLimpio);
      recalcularImporte(precioU, valorLimpio, ganancia);
              }}
            />
            {iva !== "" && !iva.includes(".") && (
              <small className="text-danger" style={{ fontSize: "0.7rem" }}>
                Debes incluir un punto decimal (ej: 1.21)
              </small>
            )}
          </Form.Group>

          <Form.Group className="formGroup" controlId="formGroupGanancia">
            <Form.Label className="formGroupLabel">Factor Utilidad</Form.Label>
            <Form.Control
              className="formGroupControl"
              type="text"
              inputMode="decimal"
              placeholder="Ej: 1.40"
              value={ganancia}
              onChange={(e) => {
                // setGanancia(e.target.value);
                // recalcularImporte(precioU, iva, e.target.value);
                const valorLimpio = sanitizarDecimal(e.target.value);
      setGanancia(valorLimpio);
      recalcularImporte(precioU, iva, valorLimpio);
    }}
            />
            {ganancia !== "" && !ganancia.includes(".") && (
              <small className="text-danger" style={{ fontSize: "0.7rem" }}>
                Debes incluir un punto decimal (ej: 1.40)
              </small>
            )}
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

          <div id="selectCat_guardar_container">
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
                  categorias.map((cat) => (
                    <Dropdown.Item
                      className="dropDownItem"
                      key={cat?.id}
                      eventKey={cat?.nombre || ""}
                    >
                      {cat?.nombre || "Sin nombre"}
                    </Dropdown.Item>
                  ))
                )}
                <Dropdown.Divider />

                <div className="d-flex ">
                  <Form.Control
                    id="formControl_newCat"
                    placeholder="Nueva categoría"
                    value={nuevaCatInput}
                    onChange={(e) => setNuevaCatInput(e.target.value)}
                  />
                  <Button
                    id="btnCrearCat"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (nuevaCatInput.trim() !== "") {
                        crearNuevaCategoria(nuevaCatInput);
                        setNuevaCatInput("");
                      }
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
              disabled={!formularioValido}
            >
              {modificandoId ? "Actualizar Producto" : "Guardar"}
            </Button>
          </div>
        </Form>
      </Modal.Body>    
    </Modal>
  );
}
