import React, { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { FaCircleCheck } from "react-icons/fa6";

export default function LoginToast() {
  const [show, setShow] = useState(false);
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const loginNombre = sessionStorage.getItem("loginExitoso");
    if (loginNombre) {
      setNombre(loginNombre === "1" ? "" : loginNombre);
      setShow(true);
      sessionStorage.removeItem("loginExitoso");
    }
  }, []);

  return (
    <ToastContainer
      position="top-end"
      className="p-3"
      style={{ position: "fixed", zIndex: 2000 }}
    >
      <Toast
        show={show}
        onClose={() => setShow(false)}
        delay={3500}
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
          <FaCircleCheck
            style={{ color: "#16a34a", fontSize: "1.2rem", flexShrink: 0 }}
          />
          <span>
            {nombre
              ? `¡Bienvenido/a, ${nombre}!`
              : "Inicio de sesión exitoso."}
          </span>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
