import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import AppToast from "../components/AppToast";
import "../styles/contactPage.css";

export default function ContactPage() {
  const form = useRef();
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [toastMessage, setToastMessage] = useState("");

  const enviarEmail = (e) => {
    e.preventDefault();

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(serviceID, templateID, form.current, publicKey).then(
      (result) => {
        console.log(result.text);
        setToastType("success");
        setToastMessage(
          "¡Consulta enviada con éxito! Nos contactaremos pronto.",
        );
        setShowToast(true);
        e.target.reset();
      },
      (error) => {
        console.log("DETALLE TÉCNICO:", error);
        setToastType("error");
        setToastMessage(
          "Lo sentimos, hubo un problema técnico al enviar tu consulta. Por favor, intentá más tarde.",
        );
        setShowToast(true);
      },
    );
  };

  return (
    <section id="contact_main">
      <Form id="contactForm_container" ref={form} onSubmit={enviarEmail}>
        <h5 id="contact_tittle">CONTÁCTATE CON NUESTRO SOPORTE</h5>

        <Form.Group
          className="contactCampos_Container"
          controlId="formBasicEmail"
        >
          <Form.Label className="labels_formContacto">E-mail</Form.Label>

          <Form.Control
            className="controls_formContact"
            type="email"
            name="email"
            placeholder="Ingrese Email"
            required
          />
        </Form.Group>

        <Form.Group
          className="contactCampos_Container"
          controlId="formBasicUserName"
        >
          <Form.Label className="labels_formContacto">Usuario</Form.Label>
          <Form.Control
            className="controls_formContact"
            type="text"
            name="nombreUsuario"
            placeholder="Ingrese nombre y apellido"
            required
          />
        </Form.Group>

        <Form.Group
          className="contactCampos_Container"
          controlId="formGroupMessage"
        >
          <Form.Label className="labels_formContacto">Mensaje</Form.Label>
          <Form.Control
            className="controls_formContact"
            as="textarea"
            rows={1}
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

      <AppToast
        show={showToast}
        onClose={() => setShowToast(false)}
        type={toastType}
        message={toastMessage}
      />
    </section>
  );
}
