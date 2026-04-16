import React, { createContext, useState, useContext } from "react";
import { ProductContext } from "./ProductContext";

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  const { productos, setProductos } = useContext(ProductContext);
  const [detallePedido, setDetallePedido] = useState([]); 
  const [descuentoPorc, setDescuentoPorc] = useState(0)
  const [showModalGuardarPedido, setShowModalGuardarPedido] = useState(false); 
  const [showModalMetodoPago, setShowModalMetodoPago] = useState(false);

  // VARIABLE DE CALCULO
  // Calculo automatico del total sumando todos los subtotal del detalle
  const importeTotalPedido = detallePedido.reduce(
    (acumulador, item) => acumulador + Number(item.subtotal),
    0,
  );

  const montoDescuento = importeTotalPedido * (Number(descuentoPorc || 0) / 100);
  const totalConDescuento = importeTotalPedido -montoDescuento;

  // Funcion para agregar un producto de la lista al carrito
  function agregarAlDetalle(producto) {
    // Verificamos si el producto ya existe en el carrito
    const existe = detallePedido.find((item) => item.id === producto.id);

    if (existe) {
      // Si ya estaba en el carrito solo subimos la cantidad y el total
     setDetallePedido (detallePedido.map((item) =>
        item.id === producto.id
          ? {
              ...item,
              cantidad: item.cantidad + 1,
              subtotal: (item.cantidad + 1) * Number(item.importe),
            }
          : item,
      ));
     
    } else {
      // Si es la primera vez, lo agregamos con cantidad 1
     setDetallePedido([...detallePedido, {
        id: producto.id,
        nombreProducto: producto.nombreProducto,
        cantidad: 1,
        importe: Number(producto.importe),
        subtotal: Number(producto.importe),
      }]);
      
    }
  }

  function eliminarDelDetalle(id) {
    setDetallePedido(detallePedido.filter((item) => item.id !== id));
  }

  // Permite escribir manualmente la cantidad en el carrito
  function manejarCambioCantidad(id, nuevaCantidad) {
    const cant = parseInt(nuevaCantidad);
    if (isNaN(cant) || cant < 1) return;

    setDetallePedido (detallePedido.map((item) =>
      item.id === id
        ? {
            ...item,
            cantidad: cant,
            subtotal: cant * item.importe,
          }
        : item,
    ));
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