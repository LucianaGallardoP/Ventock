import React, { createContext, useState, useContext } from "react";
import { ProductContext } from "./ProductContext";

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  // Extraemos setProductos del contexto de productos para actualizar el stock al vender
  const { productos, setProductos } = useContext(ProductContext);

  const [detallePedido, setDetallePedido] = useState([]); // Es el "carrito"

  const [showModalGuardarPedido, setShowModalGuardarPedido] = useState(false); // Control para el Modal de Guardar Pedido

  const [showModalMetodoPago, setShowModalMetodoPago] = useState(false); // Control para el Modal de Metodo de Pago

  // ---VARIABLES DE CÁLCULO ---

  // Cálculo automático del total sumando todos los subtotal del detalle
  const importeTotalPedido = detallePedido.reduce(
    (acumulador, item) => acumulador + Number(item.subtotal),
    0,
  );

  // ------------------ LÓGICA DEL CARRITO (VENTA) ------------------
  // Funcion para agregar un producto de la lista al carrito o detalle del pedido
  function agregarAlDetalle(producto) {
    // Verificamos si el producto ya existe en el detalle
    const existe = detallePedido.find((item) => item.id === producto.id);

    if (existe) {
      // Si ya estaba en el carrito, solo subimos la cantidad y el total
      const nuevoDetalle = detallePedido.map((item) =>
        item.id === producto.id
          ? {
              ...item,
              cantidad: item.cantidad + 1,
              subtotal: (item.cantidad + 1) * Number(item.importe),
            }
          : item,
      );
      setDetallePedido(nuevoDetalle);
    } else {
      // Si es la primera vez que lo tocamos, lo agregamos con cantidad 1
      const nuevoItem = {
        id: producto.id,
        nombreProducto: producto.nombreProducto,
        cantidad: 1,
        importe: Number(producto.importe),
        subtotal: Number(producto.importe),
      };
      setDetallePedido([...detallePedido, nuevoItem]);
    }
  }

  // Quita un producto del carrito
  function eliminarDelDetalle(id) {
    const nuevoDetalle = detallePedido.filter((item) => item.id !== id);
    setDetallePedido(nuevoDetalle);
  }

  // Permite escribir manualmente la cantidad en el carrito
  function manejarCambioCantidad(id, nuevaCantidad) {
    // Convertimos a numero y validamos que no sea negativo
    const cant = parseInt(nuevaCantidad);
    if (isNaN(cant) || cant < 1) return;

    const nuevoDetalle = detallePedido.map((item) =>
      item.id === id
        ? {
            ...item,
            cantidad: cant,
            subtotal: cant * item.importe,
          }
        : item,
    );
    setDetallePedido(nuevoDetalle);
  }

  // Cerrar la venta y restar el stock:
  function procesarPago(metodo) {
    if (detallePedido.length === 0) return;

    // 1. Restamos el stock en la lista de productos
    const productosActualizados = productos.map((p) => {
      const itemVendido = detallePedido.find((item) => item.id === p.id);
      if (itemVendido) {
        return {
          ...p,
          stock: Number(p.stock) - itemVendido.cantidad,
        };
      }
      return p;
    });

    setProductos(productosActualizados);
    setDetallePedido([]); // Vaciamos el carrito
    setShowModalMetodoPago(false); // Cerramos el modal
    alert(
      `Venta procesada con éxito en ${metodo}. El stock ha sido actualizado.`,
    );
  }

  return (
    <OrderContext.Provider
      value={{
        detallePedido,
        setDetallePedido,
        importeTotalPedido,
        agregarAlDetalle,
        eliminarDelDetalle,
        manejarCambioCantidad,
        procesarPago,
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
