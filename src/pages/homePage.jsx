import React, { useState } from "react";
import ProductListComponent from "../components/productListComponent.jsx";
import OrderDetailComponent from "../components/orderDetailComponent.jsx";
import ProductModal from "../components/modals/productModal.jsx";
import ConfirmOrderModal from "../components/modals/confirmOrderModal.jsx";
import PaymentModal from "../components/modals/paymentModal.jsx";
import "../styles/homePage.css";

export default function HomePage() {
  // Controlan la visibilidad de cada uno de los modales (productos, confirmacion de pedido, metodo pago)
  const [showProductModal, setShowProductModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <section id="main_container">
      <div id="prodSistema_pedido_container">
        <ProductListComponent setShowModalCarga={setShowProductModal} />
        <OrderDetailComponent setShowConfirmModal={setShowConfirmModal} />
      </div>

      <ProductModal
        // MODAL 1
        show={showProductModal}
        onHide={() => setShowProductModal(false)}
      />

      {/* MODAL 2: Vendido o Presupuesto? */}
      <ConfirmOrderModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={() => {
          setShowConfirmModal(false);
          setShowPaymentModal(true);
        }}
      />

      {/* MODAL 3: Seleccion del pago y cierre de stock */}
      <PaymentModal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
      />
    </section>
  );
}
