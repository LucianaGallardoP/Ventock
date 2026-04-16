import React, { useState } from "react";
import ProductListComponent from "../components/productListComponent.jsx";
import OrderDetailComponent from "../components/orderDetailComponent.jsx";
import ProductModal from "../components/modals/productModal.jsx";
import ConfirmOrderModal from "../components/modals/confirmOrderModal.jsx";
import PaymentModal from "../components/modals/paymentModal.jsx";
import "../styles/homePage.css";

export default function HomePage() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <section id="main_container">
      <div id="productos_pedido_container">
        <ProductListComponent setShowModalCarga={setShowProductModal} />
        <OrderDetailComponent setShowConfirmModal={setShowConfirmModal} />
      </div>

      <ProductModal
        show={showProductModal}
        onHide={() => setShowProductModal(false)}
      />

      <ConfirmOrderModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={() => {
          setShowConfirmModal(false);
          setShowPaymentModal(true);
        }}
      />

      <PaymentModal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
      />
    </section>
  );
}
