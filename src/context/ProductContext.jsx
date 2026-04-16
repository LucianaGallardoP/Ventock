import React, { createContext, useState, useEffect } from "react";
import { getCategorias, crearCategoria } from "../helpers/apiCategoria";
import {
  getProductos,
  crearProducto,
  actualizarProducto,
  borrarProducto,
} from "../helpers/apiProducto";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtro, setFiltro] = useState("");

  // Estados de cada campo del formulario NUEVO PRODUCTO. Si tiene un ID, el formulario sabe que está EDITANDO, si es null, está CREANDO
  const [modificandoId, setModificandoId] = useState(null);
  const [nombreProd, setNombreProd] = useState("");
  const [stock, setStock] = useState("");
  const [stockCritico, setStockCritico] = useState("");
  const [precioU, setPrecioU] = useState("");
  const [ganancia, setGanancia] = useState("");
  const [iva, setIva] = useState("");
  const [importe, setImporte] = useState("");
  const [catSeleccionada, setCatSeleccionada] = useState("Elige una categoría");

  const cargarCatsProds = async () => {
    try {
      const [dataCategorias, dataProductos] = await Promise.all([
        getCategorias(0),
        getProductos(0),
      ]);

      if (dataCategorias?.categorias) {
        setCategorias(
          dataCategorias.categorias.map((cat) => ({
            ...cat,
            id: cat._id,
            nombre: cat.nombre,
          })),
        );
      }

      if (dataProductos?.productos) {
        const prodsMapeados = dataProductos.productos.map((p) => ({
          id: p._id,
          nombreProducto: p.nombre,
          stock: p.stock,
          stockCritico: p.stockCritico,
          precioUnitario: p.precio,
          ganancia: p.ganancia,
          iva: p.iva,
          importe: p.importe,
          categoria: p.categoria?.nombre || "Sin Categoría",
          categoriaId: p.categoria?._id,
        }));
        setProductos(prodsMapeados);
      }
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      cargarCatsProds();
    }
  }, []);

   const crearNuevaCategoria = async (nombre) => {
    if (!nombre || nombre.trim() === "") return;

    try {
      const resp = await crearCategoria({ nombre });
      if (resp?.categoria) {
        alert("Categoria creada con exito");
        await cargarCatsProds();
      } else {
        alert(resp.mensaje || "Error al crear la categoria.");
      }
    } catch (error) {
      alert("Error de conexión");
    }
  };

  const resultadosBusqueda = productos.filter(
    (p) =>
      p.nombreProducto.toLowerCase().includes(filtro.toLowerCase()) ||
      p.id.toString().includes(filtro),
  );

  // Filtra la lista de productos quitando el que coincida con el ID recibido
  const eliminarProducto = async (id) => {
    const producto = productos.find((p) => p.id === id);
    if (
      window.confirm(`¿Eliminar definitivamente ${producto.nombreProducto}?`)
    ) {
      try {
        const res = await borrarProducto(id);
        alert(res.mensaje || "Producto eliminado");
        await cargarCatsProds();
      } catch (error) {
        alert("Error al intentar eliminar el producto.");
      }
    }
  };

  // Pasa los datos de un producto de la tabla a los inputs del formulario para modificarlos
  function prepararEdicion(producto, showModalCargar) {
    setModificandoId(producto.id);
    setNombreProd(producto.nombreProducto);
    setStock(producto.stock);
    setStockCritico(producto.stockCritico);
    setPrecioU(producto.precioUnitario);
    setGanancia(producto.ganancia);
    setIva(producto.iva);
    setImporte(producto.importe);
    setCatSeleccionada(producto.categoria);
    showModalCargar(true);
  }

  // Se activa al darle "Cargar Producto"
  const handleSubmitProducto = async (e, handleCloseModalCarga) => {
    e.preventDefault();

    const catEncontrada = categorias.find((c) => c.nombre === catSeleccionada);

    const datosBackend = {
      nombre: nombreProd,
      stock: Number(stock),
      stockCritico: Number(stockCritico),
      precio: Number(precioU),
      ganancia: Number(ganancia),
      iva: Number(iva),
      categoria: catEncontrada?.id,
    };

    try {
      let res;
      if (modificandoId) {
        res = await actualizarProducto(modificandoId, datosBackend);
      } else {
        res = await crearProducto(datosBackend);
      }

      if (res) {
        alert(res.mensaje || "Operación exitosa");
        await cargarCatsProds();
        // limpiarFormulario();
        // handleCloseModalCarga();
      }
    } catch (error) {
      alert("Error al procesar la solicitud en el servidor.");
    }

    setModificandoId(null);
    setNombreProd("");
    setStock("");
    setStockCritico("");
    setPrecioU("");
    setGanancia("");
    setIva("");
    setImporte("0.00");
    setCatSeleccionada("Elige una categoría");
    // Limpiamos todos los campos del formulario para el siguiente producto
    handleCloseModalCarga();
  };

  return (
    <ProductContext.Provider
      value={{
        productos,
        setProductos,
        categorias,
        setCategorias,
        filtro,
        setFiltro,
        resultadosBusqueda,

        // Funciones
        crearNuevaCategoria,
        cargarCatsProds,
        eliminarProducto,
        prepararEdicion,
        handleSubmitProducto,

        //Estados del forumlario
        nombreProd,
        setNombreProd,
        stock,
        setStock,
        stockCritico,
        setStockCritico,
        precioU,
        setPrecioU,
        ganancia,
        setGanancia,
        iva,
        setIva,
        importe,
        setImporte,
        catSeleccionada,
        setCatSeleccionada,
        modificandoId,
        setModificandoId,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
