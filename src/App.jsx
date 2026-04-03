import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";
import HeaderComponent from "./components/headerComponent";
import HomePage from "./pages/homePage";

function App() {
  return (
    <ProductProvider>
      <OrderProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </OrderProvider>
    </ProductProvider>
  );
}

export default App;
