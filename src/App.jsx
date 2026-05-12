import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import LogInPage from "./pages/logInPage";
import SideBarComponent from "./components/sideBarComponent";
import SuperAdminPage from "./pages/superAdminPage";
import AdminPage from "./pages/adminPage";
import GestionarCatPage from "./pages/gestionarCatPage";
import AboutPage from "./pages/aboutPage";
import ContactPage from "./pages/contactPage";
import ErrorPage from "./pages/errorPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token } = useContext(AuthContext);

  if (!token) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user?.rol)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const RootRedirect = () => {
  const { user, token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.rol === "SuperAdmin") {
    return <Navigate to="/superAdmin" replace />;
  }

  if (user?.rol === "Admin" || user?.rol === "Vendedor") {
    return <AdminPage />;
  }

  return <Navigate to="/login" replace />;
};

const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayout = location.pathname === "/login";

  if (hideLayout) {
    return <main>{children}</main>;
  }

  return (
    <div className="gral-container">
      <SideBarComponent/>
      <div className="content-container">
        <main>{children}</main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <OrderProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                {/* RUTAS PUBLICAS */}
                <Route path="/login" element={<LogInPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<ErrorPage />} />

                {/* RUTA RAIZ*/}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <RootRedirect />
                    </ProtectedRoute>
                  }
                />

                {/* RUTA PROTEGIDA - SUPERADMIN */}
                <Route
                  path="/superAdmin"
                  element={
                    <ProtectedRoute allowedRoles={["SuperAdmin"]}>
                      <SuperAdminPage />
                    </ProtectedRoute>
                  }
                />

                {/* RUTA PROTEGIDA - SUPERADMIN Y ADMIN */}
                <Route
                  path="/gestionarCategoria"
                  element={
                    <ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}>
                      <GestionarCatPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Layout>
          </BrowserRouter>
        </OrderProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
export default App;
