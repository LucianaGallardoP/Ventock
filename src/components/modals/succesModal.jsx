import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function SuccessModal({ show, onHide, title, message }) {
  return (
    <Modal show={show} onHide={onHide} size="md" backdrop="static" centered>
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#1e293b", color: "#f0f2f5"}}
      >
        <h5
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            fontFamily: "Inter",
            color: "#f0f2f5",
          }}
        >
          {title || "OPERACIÓN EXITOSA"}
        </h5>
      </Modal.Header>
      <Modal.Body
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#eef1f6",
          color: "#1e293b",
          textAlign: "center",
          whitespace: "pre-line",
        }}
      >
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
