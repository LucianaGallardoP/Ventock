import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button, Form } from "react-bootstrap";
import VentockSVGblanco from "../assets/VentockSVGblanco.png";
import logotipoVentock from "../assets/logotipoVentock.png";
import "../styles/logInPage.css";

export default function LogInPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    correo: "",
    password: "",
  });

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.type === "text" ? "correo" : "password"]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultado = await login(datos);

    // Funcion login de AuthContext
    const { success, usuario, mensaje } = await login(datos);

    if (success && usuario) {
      if (usuario.rol === "SuperAdmin") {
        navigate("/superAdmin");
      } else {
        navigate("/");
      }
    } else {
      alert(mensaje || "Error al iniciar sesión");
    }
  };

  return (
    <section id="logIn_main">
      <div id="form_section">
        <Form id="logInForm_container" onSubmit={handleSubmit}>
          <div id="imgs_container">
            <img
              src={VentockSVGblanco}
              id="imgIsotipo"
              alt="isotipo de Ventock"
            />
            <img
              src={logotipoVentock}
              id="imgLogotipo"
              alt="logotipo de Ventock"
            />
          </div>
          <hr />
          <h5 id="logIn_tittle">Iniciar Sesión</h5>

          <Form.Group
            className="campos_Container"
            controlId="formBasicUserName"
          >
            <Form.Control
              className="controls_formLogIn"
              type="email"
              placeholder="Email"
              required
              value={datos.correo}
              onChange={(e) => {
                setDatos({ ...datos, correo: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group
            className="campos_Container"
            controlId="formGroupPassword"
          >
            <Form.Control
              type="password"
              className="controls_formLogIn "
              placeholder="Contraseña"
              required
              value={datos.password}
              onChange={(e) => setDatos({ ...datos, password: e.target.value })}
            />
          </Form.Group>

          <Form.Text
            className="text-light"
            style={{ display: "flex", justifyContent: "center" }}
          >
            Nunca compartiremos tu información.
          </Form.Text>

          <div id="btnEnviar_container">
            <Button type="" id="btnIngresar">
              Ingresar
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
}
