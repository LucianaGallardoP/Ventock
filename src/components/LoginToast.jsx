import React, { useEffect, useState } from "react";
import AppToast from "./AppToast";

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
    <AppToast
      show={show}
      onClose={() => setShow(false)}
      type="success"
      message={
        nombre ? `¡Bienvenido/a, ${nombre}!` : "Inicio de sesión exitoso."
      }
    />
  );
}
