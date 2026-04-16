import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { OrderContext } from "../../context/OrderContext";
import { ProductContext } from "../../context/ProductContext";
import("../../styles/paymentModal.css");

export default function PaymentModal({ show, onHide }) {
  const {
    detallePedido,
    setDetallePedido,
    totalConDescuento,
    setDescuentoPorc,
  } = useContext(OrderContext);
  const { productos, setProductos } = useContext(ProductContext);

  const procesarVenta = (metodo) => {
    // Lógica para restar stock
    const nuevosProductos = productos.map((prodExistente) => {
      const itemEnCarrito = detallePedido.find(
        (item) => item.id === prodExistente.id,
      );
      if (itemEnCarrito) {
        return {
          ...prodExistente,
          stock: prodExistente.stock - itemEnCarrito.cantidad,
        };
      }
      return prodExistente;
    });

    setProductos(nuevosProductos);

   alert(
      `Venta procesada con éxito en ${metodo}.\n` +
      `Total cobrado: $${totalConDescuento.toFixed(2)}\n` +
      `El stock ha sido actualizado.`
    );

    setDetallePedido([]);
    setDescuentoPorc(0)
    onHide();
  };

  

  /* Modal Metodo de Pago */
  return (
    <Modal show={show} onHide={onHide} size="sm" backdrop="static" centered>
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#F0F2F5",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h5 id="cargarProducto_title">MÉTODO DE PAGO</h5>
      </Modal.Header>
      <Modal.Body id="metodoPago_container">
        {["Efectivo", "Transferencia", "Débito", "Crédito"].map((metodo) => (
          <Button
            key={metodo}
            className="btnsMetodoPago"
            onClick={() => procesarVenta(metodo)}
          >
            {metodo}
          </Button>
        ))}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#e4ebf0" }}></Modal.Footer>
    </Modal>
  );
}
