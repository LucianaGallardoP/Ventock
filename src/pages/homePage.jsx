import React, { useState } from "react";
import ProductListComponent from "../components/productListComponent.jsx";
import OrderDetailComponent from "../components/orderDetailComponent.jsx";
import { OrderProvider } from "../context/OrderContext.jsx";
import ProductModal from "../components/modals/productModal.jsx";
import "../styles/homePage.css";

export default function HomePage() {
  // Único estado necesario: controlar la visibilidad del modal de productos
 const [showProductModal, setShowProductModal] = useState(false);

  return (
    <OrderProvider>
      <section id="main_container">
        <div id="prodSistema_pedido_container">
          <ProductListComponent setShowModalCarga={setShowProductModal} />
          <OrderDetailComponent />
        </div>

        <ProductModal
          show={showProductModal}
          onHide={() => setShowProductModal(false)}
        />

        {/* Modal GUARDAR PEDIDO */}
        {/* <Modal
          show={showModalGuardarPedido}
          onHide={() => setShowModalGuardarPedido(false)}
          size="md"
          backdrop="static"
          centered
        >
          <Modal.Header closeButton style={{ backgroundColor: "#e4ebf0" }}>
            <h5 id="cargarProducto_title">Finalizar Pedido</h5>
          </Modal.Header>
          <Modal.Body id="guardarPedido_container">
            <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
              ¿Cómo desea registrar esta operación?
            </p>
            <div id="btnsGuardarVenta_container">
              <Button
                className="btnsGuardarVenta"
                onClick={() => {
                  setShowModalGuardarPedido(false);
                  setShowModalMetodoPago(true);
                }}
              >
                Vendido
              </Button>
              <Button className="btnsGuardarVenta">Presupuesto</Button>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#e4ebf0" }}></Modal.Footer>
        </Modal> */}

        {/* Modal Metodo de Pago */}
        {/* <Modal
          show={showModalMetodoPago}
          onHide={() => setShowModalMetodoPago(false)}
          size="md"
          backdrop="static"
          centered
        >
          <Modal.Header closeButton style={{ backgroundColor: "#e4ebf0" }}>
            <h5 id="cargarProducto_title">Seleccionar Método de Pago</h5>
          </Modal.Header>
          <Modal.Body id="metodoPago_container">
            <Button
              className="btnsMetodoPago"
              onClick={() => procesarPago("Efectivo")}
            >
              Efectivo
            </Button>
            <Button
              className="btnsMetodoPago"
              onClick={() => procesarPago("Transferencia")}
            >
              Transferencia
            </Button>

            <Button
              className="btnsMetodoPago"
              onClick={() => procesarPago("Débito")}
            >
              Débito
            </Button>

            <Button
              className="btnsMetodoPago"
              onClick={() => procesarPago("Crédito")}
            >
              Crédito
            </Button>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#e4ebf0" }}></Modal.Footer>
        </Modal> */}
      </section>
    </OrderProvider>
  );
}
