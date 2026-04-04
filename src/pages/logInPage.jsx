import React from "react";
import "../styles/logInPage.css";
import { Button, Form } from "react-bootstrap";

export default function LogInPage() {
  return (
    <section id="logIn_main">
      <h5 id="logIn_tittle">Iniciar Sesión</h5>
      <Form id="logInForm_container">
        <Form.Group className="campos_Container" controlId="formBasicUserName">
          <Form.Label className="labels_formLogIn">Usuario</Form.Label>
          <Form.Control
            type="text"
            // name="nombreUsuario"
            placeholder="Ingrese su nombre de usuario"
            required
          />
        </Form.Group>

        <Form.Group className="campos_Container" controlId="formGroupPassword">
          <Form.Label className="labels_formLogIn">Contraseña</Form.Label>
          <Form.Control
            placeholder="Ingrese su Contraseña"
            style={{ maxHeight: "fit-content" }}
            required
          />
        </Form.Group>

        {/* <Form.Text className="text-muted" style={{ marginLeft: "15px" }}>
          Nunca compartiremos tu información con nadie.
        </Form.Text> */}

        <div id="btnEnviar_container">
          <Button type="" id="btnIngresar">
            Ingresar
          </Button>
        </div>
      </Form>
    </section>
  );
}
