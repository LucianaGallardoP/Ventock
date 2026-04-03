import React from "react";
import "../styles/contactPage.css";
import { Button, Form } from "react-bootstrap";

export default function ContactPage() {
  return (
    <section id="contactMain">
      <h5 style={{ fontWeight: "bold" }}>Contactános</h5>
      <Form id="contactForm_container">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su correo electrónico"
          />
          <Form.Text className="text-muted">
            Nunca compartiremos tu email con nadie.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUserName">
          <Form.Label>Nombre de Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su nombre de usuario"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupMessage">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Ingrese mensaje o motivo del contacto."
            style={{maxHeight:"fit-content"}}
          />
        </Form.Group>
        <div id="btnEnviar_container">
          <Button type="submit" id="btnEnviarMensaje">
            Enviar
          </Button>
        </div>
      </Form>
    </section>
  );
}
