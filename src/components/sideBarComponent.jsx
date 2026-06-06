import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Nav, Navbar, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import logotipoVentock from "../assets/logotipoVentock.png";
import isotipoVentock from "../assets/isotipoVentock.png";
import DeleteModal from "./modals/deleteModal";
import "../styles/sideBarComponent.css";

export default function SideBarComponent() {
  const { user, token } = useContext(AuthContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    setShowLogoutModal(false);
    navigate("/login");
  };

  const isSuperAdmin = user?.rol === "SuperAdmin";
  const isAdminOrVendedor = user?.rol === "Admin" || user?.rol === "Vendedor";
  const isInvitado = !token;

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
            <NavLink to={isInvitado ? "/login" : "/"} className="navLinks">
              Inicio
            </NavLink>

            {isAdminOrVendedor && (
              <>
                <NavLink to="/presupuestos" className="navLinks">
                  Presupuestos
                </NavLink>

                <NavLink to="/ventas-diarias" className="navLinks">
                  Ventas diarias
                </NavLink>

                <NavLink to="/ventas-mensuales" className="navLinks">
                  Ventas Mensuales
                </NavLink>

                <NavLink to="/notas-credito" className="navLinks">
                  Notas de Crédito
                </NavLink>

                <NavLink to="/gestionarCategoria" className="navLinks">
                  Gestionar Categorías
                </NavLink>

                <NavLink to="/efectivo-retirado" className="navLinks">
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

              {token && (
                <Button
                  variant="link"
                  onClick={() => setShowLogoutModal(true)}
                  id="logOut"
                >
                  Cerrar Sesión
                </Button>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </div>
      <DeleteModal
        show={showLogoutModal}
        handleClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Cerrar Sesión"
        message="¿Estás seguro de que deseas cerrar sesión?"
        confirmText="Cerrar Sesión"
      />
    </Navbar>
  );
}
