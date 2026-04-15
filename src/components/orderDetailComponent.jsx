// import React, { useContext } from "react";
// import { Form, Button } from "react-bootstrap";
// import { FaTrashCan } from "react-icons/fa6";
// import { OrderContext } from "../context/OrderContext";
// import "../styles/orderDetailComponent.css";

// export default function OrderDetailComponent({ setShowConfirmModal }) {
//   // Extraemos todo directamente del contexto
//   const {
//     detallePedido,
//     eliminarDelDetalle,
//     manejarCambioCantidad,
//     importeTotalPedido,
//     descuentoPorc,
//     setDescuentoPorc
//   } = useContext(OrderContext);

//   return (
//     <section id="orders_container">
//       <div>
//         <h5 id="orders_tittle">DETALLE DEL PEDIDO</h5>
//       </div>

//       <div id="orderDetail_table">
//         <table style={{ width: "100%" }}>
//           <thead>
//             <tr id="columns_OrderTable">
//               <th>ID</th>
//               <th>PRODUCTO</th>
//               <th>CANTIDAD</th>
//               <th>IMPORTE</th>
//               <th>SUBTOTAL</th>
//               <th>
//                 <FaTrashCan />
//               </th>
//             </tr>
//           </thead>

//           {/* Aquí se mapea 'detallePedido' para mostrar el carrito */}
//           <tbody className="text-center">
//             {detallePedido.length === 0 ? (
//               <tr>
//                 <td colSpan={6} className=" text-muted">
//                   No hay productos
//                 </td>
//               </tr>
//             ) : (
//               detallePedido.map((item) => (
//                 <tr key={item.id}>
//                   <td>{item.id}</td>
//                   <td>{item.nombreProducto}</td>
//                   <td>
//                     <Form.Control
//                       type="number"
//                       value={item.cantidad}
//                       min="1"
//                       style={{
//                         width: "90px",
//                         margin: "auto",
//                         backgroundColor: "transparent",
//                       }}
//                       onChange={(e) =>
//                         manejarCambioCantidad(item.id, e.target.value)
//                       }
//                     />
//                   </td>
//                   <td>${item.importe}</td>
//                   <td>${item.subtotal.toFixed(2)}</td>
//                   <td style={{ textAlign: "center" }}>
//                     <Button
//                       className="btn_eliminar"
//                       size="sm"
//                       onClick={() => eliminarDelDetalle(item.id)}
//                     >
//                       <FaTrashCan />
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div style={{ width: "95%" }}>
//         <table id="orderDetail_Importe">
//           <tr>
//             <td>
//               <Form.Control
//                 type="number"
//                 className="no-spinners"
//                 placeholder="%Desc"
//                 min="0"
//                 max="100"
//                 value={
//                   descuentoPorc === 0 || descuentoPorc === ""
//                     ? ""
//                     : descuentoPorc
//                 }
//                 onChange={(e) => {
//                   const val = e.target.value;
//                   if (val === "") {
//                     setDescuentoPorc(0);
//                   } else if(val >= 0 && val <= 100) setDescuentoPorc(val);
//                 }}
//                 style={{
//                   height: "100%",
//                   backgroundColor: "transparent",
//                   border: "none",
//                   fontFamily: "Inter",
//                   fontWeight: "500",
//                   color: "#1e293b",
//                 }}
//               />
//             </td>

//             <th
//               style={{
//                 width: "30%",
//                 fontFamily: "Inter",
//                 fontWeight: "500",
//                 color: "#1e293b",
//               }}
//             >
//               IMPORTE TOTAL
//             </th>
//             <th style={{ width: "55%", fontSize: "1.5rem", color: "#1e293b" }}>
//               ${importeTotalPedido.toFixed(2)}
//             </th>
//           </tr>
//         </table>

//         <Button
//           id="guardarPedido_btn"
//           style={{ fontSize: "1.05rem" }}
//           disabled={detallePedido.length === 0}
//           onClick={() => setShowConfirmModal(true)}
//         >
//           Guardar Pedido
//         </Button>
//       </div>
//     </section>
//   );
// }

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
    totalConDescuento,
    descuentoPorc,
    setDescuentoPorc
  } = useContext(OrderContext);

  return (
    <section id="orders_container">
      <div>
        <h5 id="orders_tittle">DETALLE DEL PEDIDO</h5>
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
          <tbody  className="text-center">
            {detallePedido.length === 0 ? (
              <tr>
                <td colSpan={6} className=" text-muted">
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
                      style={{ width: "90px", margin: "auto", backgroundColor:"transparent" }}
                      onChange={(e) =>
                        manejarCambioCantidad(item.id, e.target.value)
                      }
                    />
                  </td>
                  <td>${item.importe}</td>
                  <td>${item.subtotal.toFixed(2)}</td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      className="btn_eliminar"
                      size="sm"
                      onClick={() => eliminarDelDetalle(item.id)}
                    >
                      <FaTrashCan />
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
            <td>
              <Form.Control
                type="number"
                className="no-spinners"
                placeholder="%Desc"
                value={descuentoPorc === 0 ? "" : descuentoPorc}
                onChange={(e)=>{
                  const val = e.target.value;
                    if (val === "" || (val >= 0 && val <= 100)) {
                      setDescuentoPorc(val === "" ? 0 : Number(val));
                    }
                }}
                style={{
                  height:"100%",
                  backgroundColor:"transparent",
                  border:"none",
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
                fontWeight: "500",
                color: "#1e293b",
              }}
            >
              IMPORTE TOTAL
            </th>
            <th style={{ width: "55%", fontSize: "1.5rem", color: "#1e293b" }}>
              ${totalConDescuento.toFixed(2)}
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
    </section>
  );
}