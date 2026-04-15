import React from "react";
import { Modal, Button } from "react-bootstrap";
import("../../styles/confirmOrderModal.css");

export default function ConfirmOrderModal({ show, onHide, onConfirm }) {
  /* Modal GUARDAR PEDIDO */
  return (
    <Modal show={show} onHide={onHide} size="md" backdrop="static" centered>
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#f0f2f5",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h5 id="confirmOrder_title">FINALIZAR PEDIDO</h5>
      </Modal.Header>
      <Modal.Body id="guardarPedido_container">
        <p style={{ fontWeight: "bolder", fontSize: "1.2rem" }}>
          ¿Cómo desea registrar esta operación?
        </p>
        <div id="btnsGuardarVenta_container">
          <Button className="btnsGuardarVenta" onClick={onConfirm}>
            Vendido
          </Button>
          <Button className="btnsGuardarVenta">Presupuesto</Button>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#f0f2f5" }}></Modal.Footer>
    </Modal>
  );
}
