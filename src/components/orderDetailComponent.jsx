import React, { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { OrderContext } from "../context/OrderContext";
import "../styles/orderDetailComponent.css";

export default function OrderDetailComponent() {
  // Extraemos todo directamente del contexto
  const {
    detallePedido,
    eliminarDelDetalle,
    manejarCambioCantidad,
    importeTotalPedido,
    setShowModalGuardarPedido,
  } = useContext(OrderContext);

  return (
    <section id="customerOrders_container">
      <div>
        <h5
          style={{
            fontWeight: "bold",
            marginTop: "10px",
            marginBottom: "15px",
          }}
        >
          Detalle del Pedido
        </h5>
      </div>

      <div id="orderDetail_tableSection">
        <table style={{ width: "100%" }}>
          <thead>
            <tr id="orderTable_header">
              <th>ID</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Importe</th>
              <th>Subtotal</th>
              <th>
                <FaTrash />
              </th>
            </tr>
          </thead>

          {/* Aquí se mapea 'detallePedido' para mostrar el carrito */}
          <tbody>
            {detallePedido.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-muted">
                  No hay productos
                </td>
              </tr>
            ) : (
              detallePedido.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nombreProducto}</td>
                  <td>
                    <Form.Control
                      type="number"
                      value={item.cantidad}
                      min="1"
                      style={{ width: "70px", margin: "auto" }}
                      onChange={(e) =>
                        manejarCambioCantidad(item.id, e.target.value)
                      }
                    />
                  </td>
                  <td>${item.importe}</td>
                  <td>${item.subtotal.toFixed(2)}</td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => eliminarDelDetalle(item.id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div style={{ width: "98%" }}>
        <table id="orderDetail_Importe">
          <tr>
            <th style={{ width: "40%", fontWeight: "normal" }}>
              Importe Total
            </th>
            <th style={{ fontSize: "1.5rem" }}>
              ${importeTotalPedido.toFixed(2)}
            </th>
          </tr>
        </table>

        <Button
          id="guardarPedido_btn"
          style={{ fontSize: "1.1rem" }}
          onClick={() => setShowModalGuardarPedido(true)}
        >
          Guardar Pedido
        </Button>
      </div>
    </section>
  );
}
