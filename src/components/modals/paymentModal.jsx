import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { OrderContext } from "../../context/OrderContext";
import { ProductContext } from "../../context/ProductContext";
import { actualizarProducto } from "../../helpers/apiProducto";
import("../../styles/paymentModal.css");

export default function PaymentModal({ show, onHide, onSuccess }) {
  const { detallePedido, totalConDescuento, limpiarPedido } =
    useContext(OrderContext);
  const { productos, setProductos, cargarCatsProds } =
    useContext(ProductContext);

  const procesarVenta = async (metodo) => {
    if (!detallePedido || detallePedido.length === 0) return;

    const totalCobrado = totalConDescuento.toFixed(2);
    const copiaDetalle = [...detallePedido];

    try {
      const promesasActualizacion = copiaDetalle.map(async (item) => {
        const prodEncontrado = productos.find(
          (p) => p.id === item.id || p._id === item.id,
        );

        if (!prodEncontrado) {
          throw new Error(
            `Producto con ID ${item.id} no encontrado en el contexto.`,
          );
        }

        const idMongo = prodEncontrado.id || prodEncontrado._id;
        const stockActual = Number(prodEncontrado.stock) || 0;
        const cantidadVendida = Number(item.cantidad) || 0;
        const nuevoStock = stockActual - cantidadVendida;
    
        const datosBackend = {
          nombre: prodEncontrado.nombreProducto || prodEncontrado.nombre,
          stock: nuevoStock,
          stockCritico:
            prodEncontrado.stockCritico !== undefined
              ? Number(prodEncontrado.stockCritico)
              : 0,
          precio: Number(
            prodEncontrado.precioUnitario || prodEncontrado.precio || 0,
          ),
          ganancia:
            prodEncontrado.ganancia !== undefined
              ? Number(prodEncontrado.ganancia)
              : 1,
          iva:
            prodEncontrado.iva !== undefined ? Number(prodEncontrado.iva) : 1,
          categoria: prodEncontrado.categoriaId || prodEncontrado.categoria,
          codigo: prodEncontrado.codigo || "",
        };

        const res = await actualizarProducto(idMongo, datosBackend);

        if (res?.mensaje && res.mensaje.includes("No se pudo conectar")) {
          throw new Error(res.mensaje);
        }

        return res;
      });

      await Promise.all(promesasActualizacion);

      if (cargarCatsProds) {
        await cargarCatsProds();
      } else {
        setProductos((prev) =>
          prev.map((p) => {
            const itemVendido = copiaDetalle.find(
              (i) => i.id === p.id || i.id === p._id,
            );
            if (itemVendido) {
              return { ...p, stock: p.stock - itemVendido.cantidad };
            }
            return p;
          }),
        );
      }

      if (onSuccess) {
        onSuccess(
          `Venta procesada con éxito en ${metodo}.\nTotal cobrado: $${totalCobrado}\nEl stock ha sido actualizado.`,
        );
      }

      onHide();
      limpiarPedido();
    } catch (error) {
      console.error("Detalle del error al actualizar el stock:", error);
      alert(`Hubo un error al procesar la venta: ${error.message}`);
    }
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
