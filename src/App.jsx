import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HeaderComponent from "./components/headerComponent";
import LogInPage from "./pages/logInPage";
import SuperAdminPage from "./pages/superAdminPage";
import HomePage from "./pages/homePage";
import GestionarCatPage from "./pages/gestionarCatPage";
import FooterComponent from "./components/footerComponent";
import ErrorPage from "./pages/errorPage";
import AboutPage from "./pages/aboutPage";
import ContactPage from "./pages/contactPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token } = useContext(AuthContext);
  if (!token) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user?.rol))
    return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <OrderProvider>
          <BrowserRouter>
            <HeaderComponent />
            <Routes>
              {/* RUTAS PUBLICAS */}
              <Route path="/login" element={<LogInPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<ErrorPage />} />

              {/* RUTAS PROTEGIDAS - SOLO SUPERADMIN*/}
              <Route
                path="/superAdmin"
                element={
                  <ProtectedRoute allowedRoles={["SuperAdmin"]}>
                    <SuperAdminPage />
                  </ProtectedRoute>
                }
              />

              {/* RUTAS PROTEGIDAS - SUPERADMIN Y ADMIN*/}
              <Route
                path="/gestionarCategoria"
                element={
                  <ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}>
                    <GestionarCatPage />
                  </ProtectedRoute>
                }
              />

              {/* RUTAS PROTEGIDAS - CUALQUIER USUARIO LOGUEADO*/}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <FooterComponent />
          </BrowserRouter>
        </OrderProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
