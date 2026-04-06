import React from "react";
import "../styles/logInPage.css";
import { Button, Form } from "react-bootstrap";
import VentockSVGblanco from "../assets/VentockSVGblanco.png";
import logotipoVentock from "../assets/logotipoVentock.png";

export default function LogInPage() {
  return (
    <section id="logIn_main">
      <div id="form_section">
        <Form id="logInForm_container">
          <div id="img_container">
            <img src={VentockSVGblanco} id="imgIsotipo" alt="" />
            <img src={logotipoVentock} id="imgLogotipo" alt="" />
          </div>
          <hr />
          <h5 id="logIn_tittle">Iniciar Sesión</h5>

          <Form.Group
            className="campos_Container"
            controlId="formBasicUserName"
          >
            <Form.Label className="labels_formLogIn">Usuario</Form.Label>
            <Form.Control
              className="controls_formLogIn"
              type="text"
              // name="nombreUsuario"
              placeholder="Ingrese nombre de Usuario"
              required
            />
          </Form.Group>

          <Form.Group
            className="campos_Container"
            controlId="formGroupPassword"
          >
            <Form.Label className="labels_formLogIn ">Contraseña</Form.Label>
            <Form.Control
              type="password"
              className="controls_formLogIn "
              placeholder="Ingrese Contraseña"
              // style={{ maxHeight: "fit-content" }}
              required
            />
          </Form.Group>

          <Form.Text className="text-light" style={{ marginLeft: "15px" }}>
            Nunca compartiremos tu información con nadie.
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
