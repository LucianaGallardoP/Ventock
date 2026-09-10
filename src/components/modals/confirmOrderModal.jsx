import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { OrderContext } from "../../context/OrderContext";
import("../../styles/confirmOrderModal.css");

export default function ConfirmOrderModal({
  show,
  onHide,
  onConfirm,
  onSuccess,
}) {
  const { limpiarPedido } = useContext(OrderContext);

  const manejarPresupuesto = () => {
    onHide();

    if (onSuccess) {
      onSuccess(
        <>
          <div>Presupuesto guardado con éxito.</div>
          <div style={{ marginTop: "4px" }}>
            Los productos permanecen guardados en el historial de presupuestos.
          </div>
        </>,
      );
    }
    
    limpiarPedido();
  };

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
          <Button
            className="btnsGuardarVenta"
            onClick={() => {
              onHide();
              onConfirm();
            }}
          >
            Vendido
          </Button>
          <Button className="btnsGuardarVenta" onClick={manejarPresupuesto}>
            Presupuesto
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#f0f2f5" }}></Modal.Footer>
    </Modal>
  );
}
