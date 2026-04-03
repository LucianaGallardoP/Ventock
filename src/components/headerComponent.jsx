import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logotipoVentock from "../assets/logotipoVentock.png";
// import ventockLogo from "../assets/Ventock.png";
import "../styles/headerComponent.css";

export default function HeaderComponent() {
  return (
    <Navbar id="header_Container" expand="md">
      <Navbar.Brand id="logo_Container">
        <img
          src={logotipoVentock}
          alt="Logotipo Ventock"
          className="imgLogotipo"
        />
      </Navbar.Brand>

      <div id="navbar_Container">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" id="navLinks_Container">
            <NavLink to="/" className="navLinks">
              Inicio
            </NavLink>

            <NavLink to="*" className="navLinks">
              Presupuestos
            </NavLink>

            <NavLink to="*" className="navLinks">
              Ventas del día
            </NavLink>

            <NavLink to="*" className="navLinks">
              Ventas Mensuales
            </NavLink>

            <NavLink to="*" className="navLinks">
              Notas de Crédito
            </NavLink>

            <NavLink to="*" className="navLinks">
              Gestión de Categorías
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
