import React, { createContext, useState, useContext } from "react";
import { ProductContext } from "./ProductContext";

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  const { productos, setProductos } = useContext(ProductContext);
  const [detallePedido, setDetallePedido] = useState([]);
  const [descuentoPorc, setDescuentoPorc] = useState(0);
  const [showModalGuardarPedido, setShowModalGuardarPedido] = useState(false);
  const [showModalMetodoPago, setShowModalMetodoPago] = useState(false);

  const importeTotalPedido = detallePedido.reduce(
    (acumulador, item) => acumulador + Number(item.subtotal),
    0,
  );

  const montoDescuento =
    importeTotalPedido * (Number(descuentoPorc || 0) / 100);
  const totalConDescuento = importeTotalPedido - montoDescuento;

  function agregarAlDetalle(producto) {
    const existe = detallePedido.find((item) => item.id === producto.id);
    if (existe) {
      setDetallePedido(
        detallePedido.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
                subtotal: (item.cantidad + 1) * Number(item.importe),
              }
            : item,
        ),
      );
    } else {
      setDetallePedido([
        ...detallePedido,
        {
          id: producto.id,
          nombreProducto: producto.nombreProducto,
          cantidad: 1,
          importe: Number(producto.importe),
          subtotal: Number(producto.importe),
        },
      ]);
    }
  }

  function eliminarDelDetalle(id) {
    setDetallePedido(detallePedido.filter((item) => item.id !== id));
  }

  function manejarCambioCantidad(id, nuevaCantidad) {
    if (nuevaCantidad === "") {
      setDetallePedido(
        detallePedido.map((item) =>
          item.id === id
            ? {
                ...item,
                cantidad: 0,
                subtotal: 0,
              }
            : item,
        ),
      );
      return;
    }

    const cant = parseInt(nuevaCantidad, 10);
    if (isNaN(cant) || cant < 0) return;

    setDetallePedido(
      detallePedido.map((item) =>
        item.id === id
          ? {
              ...item,
              cantidad: cant,
              subtotal: cant * item.importe,
            }
          : item,
      ),
    );
  }

  return (
    <OrderContext.Provider
      value={{
        detallePedido,
        setDetallePedido,
        descuentoPorc,
        setDescuentoPorc,
        importeTotalPedido,
        totalConDescuento,
        agregarAlDetalle,
        eliminarDelDetalle,
        manejarCambioCantidad,
        showModalGuardarPedido,
        setShowModalGuardarPedido,
        showModalMetodoPago,
        setShowModalMetodoPago,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
