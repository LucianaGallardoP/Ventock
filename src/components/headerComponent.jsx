import { Nav, Navbar, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import logotipoVentock from "../assets/logotipoVentock.png";
import "../styles/headerComponent.css";

export default function HeaderComponent() {
  const navigate = useNavigate();
  const handleLogout = () => {
    if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");

      navigate("/login");
      // recargar para limpiar todos los contextos
      window.location.reload();
    }
  };

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
              Ventas diarias
            </NavLink>

            <NavLink to="*" className="navLinks">
              Ventas Mensuales
            </NavLink>

            <NavLink to="*" className="navLinks">
              Notas Crédito
            </NavLink>

            <NavLink to="/gestionarCategoria" className="navLinks">
              Gestión Categorías
            </NavLink>

            <Button
              variant="link"
              onClick={handleLogout}
              style={{
                textDecoration: "none",
                backgroundColor: "#8ab3cf",
                color: "#f0f2f5",
                fontWeight: "bold",
                fontSize: "small",
                borderRadius: "20px",
              }}
            >
              Cerrar Sesión
            </Button>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
