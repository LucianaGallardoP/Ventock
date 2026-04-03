import "./App.css";
import HeaderComponent from "./components/headerComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <HeaderComponent />
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
