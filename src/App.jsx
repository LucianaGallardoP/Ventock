import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";
import HeaderComponent from "./components/headerComponent";
import LogInPage from "./pages/logInPage";
import HomePage from "./pages/homePage";
import FooterComponent from "./components/footerComponent";
import ErrorPage from "./pages/errorPage";
import AboutPage from "./pages/aboutPage";
import ContactPage from "./pages/contactPage";
import SuperAdminPage from "./pages/superAdminPage";

function App() {
  return (
    <ProductProvider>
      <OrderProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/login" element={<LogInPage />} />
            <Route path="/superAdmin" element={<SuperAdminPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <FooterComponent />
        </BrowserRouter>
      </OrderProvider>
    </ProductProvider>
  );
}

export default App;
