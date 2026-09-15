import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";

export default function AppToast({
  show,
  onClose,
  type = "success",
  message,
  delay = 3500,
}) {
  const esError = type === "error";

  return (
    <ToastContainer
      position="top-end"
      className="p-3"
      style={{ position: "fixed", zIndex: 2000 }}
    >
      <Toast
        show={show}
        onClose={onClose}
        delay={delay}
        autohide
        style={{
          backgroundColor: "#1e293b",
          color: "#f0f2f5",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          boxShadow: "0 15px 25px 0 rgba(0, 0, 0, 0.25)",
        }}
      >
        <Toast.Body
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          {esError ? (
            <FaCircleExclamation
              style={{ color: "#a12e2e", fontSize: "1.2rem", flexShrink: 0 }}
            />
          ) : (
            <FaCircleCheck
              style={{ color: "#16a34a", fontSize: "1.2rem", flexShrink: 0 }}
            />
          )}
          <span>{message}</span>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
