import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { OrderContext } from "../../context/OrderContext";
import { ProductContext } from "../../context/ProductContext";

export default function PaymentModal({
  showModalMetodoPago,
  setShowModalMetodoPago,
}) {
  const { detallePedido, vaciarCarrito } = useContext(OrderContext);
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

    // Aquí guardar la venta en una DB.
    alert(`Venta registrada con éxito (${metodo}). Stock actualizado.`);

    vaciarCarrito();
    onHide();
  };

  /* Modal Metodo de Pago */
  return (
    <Modal
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
