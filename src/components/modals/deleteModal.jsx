import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function DeleteModal({
  show,
  handleClose,
  onConfirm,
  title = "CONFIRMAR ELIMINACIÓN",
  message = "¿Estás seguro de que deseas eliminar este elemento permanentemente?",
  confirmText = "Eliminar",
}) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      backdrop="static"
      centered
    >
      <Modal.Header
        closeButton
        closeVariant="white"
        style={{ backgroundColor: "#1e293b", color: "#f0f2f5" }}
      >
        <Modal.Title
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            fontFamily: "Inter",
            color: "#f0f2f5",
          }}
        >
          {title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          backgroundColor: "#eef1f6",
          color: "#1e293b",
          textAlign: "center",
        }}
      >
        <p style={{ margin: "0px" }}>{message}</p>
      </Modal.Body>

      <Modal.Footer style={{ backgroundColor: "#eef1f6" }}>
        <Button
          onClick={handleClose}
          style={{
            borderRadius: "20px",
            backgroundColor: "#1e293b",
            border: "none",
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          style={{
            borderRadius: "20px",
            backgroundColor: "#a12e2e",
            border: "none",
          }}
        >
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
