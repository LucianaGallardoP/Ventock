import React, { useState } from "react";
import ProductListComponent from "../components/productListComponent.jsx";
import OrderDetailComponent from "../components/orderDetailComponent.jsx";
import ProductModal from "../components/modals/productModal.jsx";
import ConfirmOrderModal from "../components/modals/confirmOrderModal.jsx";
import PaymentModal from "../components/modals/paymentModal.jsx";
import SuccessModal from "../components/modals/succesModal.jsx";
import "../styles/adminPage.css";

export default function AdminPage() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [successTitle, setSuccessTitle] = useState("OPERACIÓN EXITOSA");
  const [successMessage, setSuccessMessage] = useState("");

  const handleVentaExitosa = (mensaje) => {
    setSuccessTitle("VENTA REGISTRADA");
    setSuccessMessage(mensaje);
    setShowSuccessModal(true);
  };

  const handlePresupuestoExitoso = (mensaje) => {
    setSuccessTitle("PRESUPUESTO GUARDADO");
    setSuccessMessage(mensaje);
    setShowSuccessModal(true);
  };

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
        onSuccess={handlePresupuestoExitoso}
      />

      <PaymentModal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        onSuccess={handleVentaExitosa}
      />

      <SuccessModal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        title={successTitle}
        message={successMessage}
      />
    </section>
  );
}
