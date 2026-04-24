import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Nav, Navbar, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import logotipoVentock from "../assets/logotipoVentock.png";
import isotipoVentock from "../assets/isotipoVentock.png";
import "../styles/sideBarComponent.css";

export default function SideBarComponent() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      navigate("/login");
      window.location.reload();
    }
  };

  const isSuperAdmin = user?.rol === "SuperAdmin";

  return (
    <Navbar id="sideBar_Container" expand="md">
      <div id="navbar_Container">
        <Navbar.Brand id="logos_Container">
          <img src={isotipoVentock} alt="Isotipo Ventock" width={"30px"} />
          <img src={logotipoVentock} alt="Logotipo Ventock" width={"80px"} />
          <div className="person_logIng">
            <p
              style={{
                fontSize: "small",
                color: "#f0f2f5",
                textTransform: "uppercase",
              }}
            >
              {user?.rol || "Invitado"}
            </p>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <hr style={{ color: "white", margin: "0" }} />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" id="navLinks_Container">
            <NavLink to="/" className="navLinks">
              Inicio
            </NavLink>

            {!isSuperAdmin && (
              <>
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
                  Notas de Crédito
                </NavLink>

                <NavLink to="/gestionarCategoria" className="navLinks">
                  Gestionar Categorías
                </NavLink>

                <NavLink to="*" className="navLinks">
                  Efectivo Retirado
                </NavLink>
              </>
            )}

            <div className="sidebar-footer-links">
              <hr style={{ color: "white", margin: "0", width: "80%" }} />

              <NavLink to="/about" className="navLinks">
                Sobre Nosotros
              </NavLink>

              <NavLink to="/contact" className="navLinks">
                Contacto
              </NavLink>

              <Button variant="link" onClick={handleLogout} id="logOut">
                Cerrar Sesión
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
