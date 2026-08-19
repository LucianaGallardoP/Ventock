import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button, Form, Spinner } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import isotipoVentock from "../assets/isotipoVentock.png";
import logotipoVentock from "../assets/logotipoVentock.png";
import "../styles/logInPage.css";

export default function LogInPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    correo: "",
    password: "",
  });

  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.type === "text" ? "correo" : "password"]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
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
    } catch (error) {
      alert("Ocurrió un error en la conexión.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <section id="logIn_main">
      <div id="form_section">
        <Form id="logInForm_container" onSubmit={handleSubmit}>
          <div id="imgs_container">
            <img
              src={isotipoVentock}
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
              disabled={cargando}
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
            <div className="password_container">
              <Form.Control
                type={mostrarPassword ? "text" : "password"}
                className="controls_formLogIn"
                placeholder="Contraseña"
                required
                disabled={cargando}
                value={datos.password}
                onChange={(e) =>
                  setDatos({ ...datos, password: e.target.value })
                }
              />
              <span 
                className="ojo_icon" 
                onClick={() => !cargando && setMostrarPassword(!mostrarPassword)}
                style={{ cursor: cargando ? "not-allowed" : "pointer" }}
              >
                {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </Form.Group>

          <Form.Text
            className="text-light"
            style={{ display: "flex", justifyContent: "center" }}
          >
            Nunca compartiremos tu información.
          </Form.Text>

          <Button
            variant="link"
            className="text-light"
            id="recupPassword"
            onClick={() => navigate("/404")}
          >
            Olvidaste tu contraseña?
          </Button>

          <div id="btnEnviar_container">
            <Button type="submit" id="btnIngresar" disabled={cargando}>
              {cargando ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Cargando...
                </>
              ) : (
                "Ingresar"
              )}
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
}
