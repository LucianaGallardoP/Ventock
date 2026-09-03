import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { OrderContext } from "../context/OrderContext";
import DeleteModal from "./modals/deleteModal";
import "../styles/orderDetailComponent.css";

export default function OrderDetailComponent({ setShowConfirmModal }) {
  const {
    detallePedido,
    eliminarDelDetalle,
    manejarCambioCantidad,
    totalConDescuento,
    descuentoPorc,
    setDescuentoPorc,
  } = useContext(OrderContext);

  const totalSinDescuento = detallePedido.reduce((acc, item) => acc + item.subtotal, 0);

// --- ESTADOS LOCALES PARA EL MODAL DE BORRADO ---
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemParaEliminar, setItemParaEliminar] = useState({ id: null, nombre: "" });

  // Abre el modal visual y carga los datos del item seleccionado
  const clickDeleteIcon = (id, nombre) => {
    setItemParaEliminar({ id, nombre });
    setShowDeleteModal(true);
  };

  // Se ejecuta si el usuario confirma la acción en el modal
  const confirmarEliminacion = () => {
    if (itemParaEliminar.id) {
      eliminarDelDetalle(itemParaEliminar.id);
      setShowDeleteModal(false);
      setItemParaEliminar({ id: null, nombre: "" });
    }
  };

  return (
    <section id="orders_container">
      <div>
        <h5 id="orders_tittle">DETALLE DEL PEDIDO</h5>
      </div>

      <div id="orderDetail_table">
        <table style={{ width: "100%" }}>
          <thead>
            <tr id="columns_OrderTable">
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Importe</th>
              <th>Subtotal</th>
              <th>
                <FaTrashCan style={{fontSize:"smaller"}}/>
              </th>
            </tr>
          </thead>

          <tbody className="text-center">
            {detallePedido.length === 0 ? (
              <tr>
                <td colSpan={6} className=" text-muted celda_vacia ">
                  No hay productos
                </td>
              </tr>
            ) : (
              detallePedido.map((item) => (
                <tr key={item.id} className="orderItem_row">
                  {/* <td>{item.nombreProducto}</td> */}
                  
                  <td className="orderProductName_cell">
                    <div className="orderProductName_scroll" title={item.nombreProducto}>
                      {item.nombreProducto}
                    </div>
                  </td>
                  
                  <td>
                    <Form.Control
                      type="number"
                      className=" input_cantidad no-spinners"
                      value={item.cantidad === 0 ? "" : item.cantidad}
                      min="0"
                      style={{
                        width: "90px",
                        margin: "auto",
                        backgroundColor: "transparent",
                        textAlign: "center",
                      }}
                      onChange={(e) => {
                        const valor = e.target.value;
                        manejarCambioCantidad(item.id, valor);
                      }}
                      onBlur={(e) => {
                        if (item.cantidad === 0) {
                          manejarCambioCantidad(item.id, 1);
                        }
                      }}
                    />
                  </td>
                  <td>${item.importe}</td>
                  <td className="subtotal_cell">${item.subtotal.toFixed(2)}</td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      className="btn_eliminar"
                      size="sm"
                      onClick={() => eliminarDelDetalle(item.id)}
                    >
                      <FaTrashCan className="FaTrashCan FaTrashCan_body"/>
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
            <td style={{ width: "20%" }}>
              <Form.Control
                type="number"
                className="input_descuento no-spinners"
                placeholder="%Desc"
                value={descuentoPorc === 0 ? "" : descuentoPorc}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || (val >= 0 && val <= 100)) {
                    setDescuentoPorc(val === "" ? 0 : Number(val));
                  }
                }}
                style={{
                  height: "100%",
                  backgroundColor: "transparent",
                  border: "none",
                  fontFamily: "Inter",
                  fontWeight: "500",
                  color: "#1e293b",

                }}
              />
            </td>

            <th
              style={{
                width: "30%",
                fontFamily: "Inter",
                fontWeight: "600",
                color: "#1e293b",
                
              }}
            >
              IMPORTE TOTAL
            </th>

            <th className="importe_total_cell" style={{ width: "50%", fontSize: "1.5rem", color: "#1e293b" }}>
              {/* ${totalConDescuento.toFixed(2)} */}

              {descuentoPorc > 0 ? (
                  <div className="contenedor_precios_descuento">
                    <span className="precio_original">${totalSinDescuento.toFixed(2)}</span>
                    <span className="precio_con_descuento">${totalConDescuento.toFixed(2)}</span>
                  </div>
                ) : (
                  <span className="precio_con_descuento" style={{ fontSize: "1.5rem" }}>
                    ${totalConDescuento.toFixed(2)}
                  </span>
                )}
            </th>
          </tr>
        </table>

        <Button
          id="guardarPedido_btn"
          disabled={detallePedido.length === 0}
          style={{ fontSize: "1.05rem" }}
          onClick={() => setShowConfirmModal(true)}
        >
          Guardar Pedido
        </Button>
      </div>
      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        onConfirm={confirmarEliminacion}
        title="QUITAR PRODUCTO DEL PEDIDO"
        message={`¿Estás seguro de que deseas quitar "${itemParaEliminar.nombre}" del detalle actual del pedido?`}
      />
    </section>
  );
}
