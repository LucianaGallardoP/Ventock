import "../styles/logInPage.css";
import { Button, Form } from "react-bootstrap";
import VentockSVGblanco from "../assets/VentockSVGblanco.png";
import logotipoVentock from "../assets/logotipoVentock.png";

export default function LogInPage() {
  return (
    <section id="logIn_main">
      <div id="form_section">
        <Form id="logInForm_container">
          <div id="imgs_container">
            <img src={VentockSVGblanco} id="imgIsotipo" alt="" />
            <img src={logotipoVentock} id="imgLogotipo" alt="" />
          </div>
          <hr />
          <h5 id="logIn_tittle">Iniciar Sesión</h5>

          <Form.Group
            className="campos_Container"
            controlId="formBasicUserName"
          >
            <Form.Control
              className="controls_formLogIn"
              type="text"
              placeholder="Email"
              required
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
