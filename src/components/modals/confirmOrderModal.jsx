import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ConfirmOrderModal({ show, onHide, onConfirm }) {
  /* Modal GUARDAR PEDIDO */
  return (
    <Modal show={show} onHide={onHide} size="md" backdrop="static" centered>
      <Modal.Header closeButton style={{ backgroundColor: "#e4ebf0" }}>
        <h5 id="cargarProducto_title">Finalizar Pedido</h5>
      </Modal.Header>
      <Modal.Body id="guardarPedido_container">
        <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
          ¿Cómo desea registrar esta operación?
        </p>
        <div id="btnsGuardarVenta_container">
          <Button className="btnsGuardarVenta" onClick={onConfirm}>
            Vendido
          </Button>
          <Button className="btnsGuardarVenta">Presupuesto</Button>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#e4ebf0" }}></Modal.Footer>
    </Modal>
  );
}
