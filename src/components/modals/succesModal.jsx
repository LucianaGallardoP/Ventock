import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function SuccessModal({ show, onHide, title, message }) {
  return (
    <Modal show={show} onHide={onHide} size="md" backdrop="static" centered>
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#f0f2f5",
          color: "#1e293b",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h5
          style={{
            margin: 0,
            color: "#1e293b",
            fontSize: "1rem",
            fontWeight: "600",
            fontFamily: "Inter",
          }}
        >
          {title || "OPERACIÓN EXITOSA"}
        </h5>
      </Modal.Header>
      <Modal.Body style={{ textAlign: "center", padding: "20px" }}>
        <p
          style={{
            // fontSize: "1.05rem",
            color: "#1e293b",
            margin: 0,
            whitespace: "pre-line",
          }}
        >
          {message}
        </p>
      </Modal.Body>
      <Modal.Footer
        style={{ backgroundColor: "#eef1f6", justifyContent: "center" }}
      >
        <Button
          style={{
            backgroundColor: "#1e293b",
            border: "none",
             borderRadius: "20px",
            padding: "6px 25px",
          }}
          onClick={onHide}
        >
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
