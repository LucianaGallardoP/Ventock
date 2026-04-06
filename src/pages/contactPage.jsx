import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import "../styles/contactPage.css";

export default function ContactPage() {
  const form = useRef();

  const enviarEmail = (e) => {
    e.preventDefault();

    const serviceID = "service_fkn07ht";
    const templateID = "template_ly0ffc9";
    const publicKey = "YQxzDnV-OZL6zSUlt";

    emailjs.sendForm(serviceID, templateID, form.current, publicKey).then(
      (result) => {
        console.log(result.text);
        alert("¡Consulta enviada con éxito! Nos contactaremos pronto.");
        e.target.reset();
      },
      (error) => {
        console.log("DETALLE TÉCNICO:", error);
        alert(
          "Lo sentimos, hubo un problema técnico al enviar tu consulta. Por favor, intentá más tarde.",
        );
      },
    );
  };

  return (
    <section id="contact_main">
      <Form id="contactForm_container" ref={form} onSubmit={enviarEmail}>
        <h5 id="contact_tittle">Contáctate con el soporte de VENTOCK</h5>

        <Form.Group
          className="contactCampos_Container"
          controlId="formBasicEmail"
        >
          <Form.Label className="labels_formContacto">E-mail:</Form.Label>

          <Form.Control
            className="controls_formContact"
            type="email"
            name="email"
            placeholder="Ingrese su correo electrónico"
            required
          />
        </Form.Group>

        <Form.Group
          className="contactCampos_Container"
          controlId="formBasicUserName"
        >
          <Form.Label className="labels_formContacto">Usuario:</Form.Label>
          <Form.Control
            className="controls_formContact"
            type="text"
            name="nombreUsuario"
            placeholder="Ingrese su nombre de usuario"
            required
          />
        </Form.Group>

        <Form.Group
          className="contactCampos_Container"
          controlId="formGroupMessage"
        >
          <Form.Label className="labels_formContacto">Mensaje:</Form.Label>
          <Form.Control
            className="controls_formContact"
            as="textarea"
            rows={2}
            name="mensaje"
            placeholder="Ingrese mensaje o motivo del contacto."
            style={{ maxHeight: "fit-content" }}
            required
          />
        </Form.Group>

        <Form.Text className="text-light text">
          Nunca compartiremos tu información con nadie.
        </Form.Text>

        <div id="btnEnviar_container">
          <Button type="submit" id="btnEnviarMensaje">
            Enviar
          </Button>
        </div>
      </Form>
    </section>
  );
}
