import React, { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { OrderContext } from "../context/OrderContext";
import "../styles/orderDetailComponent.css";

export default function OrderDetailComponent({ setShowConfirmModal }) {
  // Extraemos todo directamente del contexto
  const {
    detallePedido,
    eliminarDelDetalle,
    manejarCambioCantidad,
    importeTotalPedido,
  } = useContext(OrderContext);

  return (
    <section id="orders_container">
      <div>
        <h5 id="orders_tittle">Detalle del Pedido</h5>
      </div>

      <div id="orderDetail_table">
        <table style={{ width: "100%" }}>
          <thead>
            <tr id="columns_OrderTable">
              <th>ID</th>
              <th>PRODUCTO</th>
              <th>CANTIDAD</th>
              <th>IMPORTE</th>
              <th>SUBTOTAL</th>
              <th>
                <FaTrashCan />
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

      <div style={{ width: "95%" }}>
        <table id="orderDetail_Importe">
          <tr>
            <th
              style={{ width: "35%", fontWeight: "lighter", color: "#1e293b" }}
            >
              Importe Total
            </th>
            <th style={{ fontSize: "1.5rem", color: "#1e293b" }}>
              ${importeTotalPedido.toFixed(2)}
            </th>
          </tr>
        </table>

        <Button
          id="guardarPedido_btn"
          style={{ fontSize: "1.05rem" }}
          onClick={() => setShowConfirmModal(true)}
        >
          Guardar Pedido
        </Button>
      </div>
    </section>
  );
}
