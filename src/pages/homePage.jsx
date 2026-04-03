import React from "react";
import ProductListComponent from "../components/productListComponent.jsx";

export default function HomePage() {
  // Control para el Modal Nuevo Producto
  const [showModalCarga, setShowModalCarga] = useState(false);

  return (
    <section id="main_Container">
      <section id="prodSistema_pedido_container">
        <ProductListComponent setShowModalCarga={setShowModalCarga} />
      </section>
    </section>
  );
}
