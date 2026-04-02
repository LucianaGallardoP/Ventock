import { BrowserRouter } from "react-router-dom";
import HeaderComponent from "./components/headerComponent";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
    </BrowserRouter>
  );
}

export default App;
