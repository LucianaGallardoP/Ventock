import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { getCategorias, crearCategoria } from "../helpers/apiCategoria";
import {
  getProductos,
  crearProducto,
  actualizarProducto,
  borrarProducto,
} from "../helpers/apiProducto";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const { token } = useContext(AuthContext);

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtro, setFiltro] = useState("");

  const [modificandoId, setModificandoId] = useState(null);
  const [codigoProd, setCodigoProd] = useState("");
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
        getCategorias(0, 1000),
        getProductos(0, 10000),
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
        // console.log("Primer producto recibido del backend:", dataProductos.productos[0]);
        const prodsMapeados = dataProductos.productos.map((p) => ({
          id: p._id,
          codigo: p.codigo || p._id,
          nombreProducto: p.nombre,
          stock: p.stock,
          stockCritico: p.stockCritico,
          precioUnitario: p.precio,
          ganancia: p.ganancia,
          iva: p.iva,
          importe: p.importe,
          categoria: p.categoria?.nombre || "Sin Categoría",
          categoriaId: p.categoria?._id,
          fechaStock: p.fechaUltimoStock || p.fechaRegistro || p.updatedAt,
          fechaPrecio: p.fechaUltimoPrecio || p.fechaRegistro || p.updatedAt,
        }));
        setProductos(prodsMapeados);
      }
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  useEffect(() => {
    if (token) {
      cargarCatsProds();
    }
  }, [token]);

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

  const eliminarProducto = async (id) => {
    try {
      const res = await borrarProducto(id);
      alert(res.mensaje || "Producto eliminado");
      await cargarCatsProds();
      return true; // Éxito
    } catch (error) {
      alert("Error al intentar eliminar el producto.");
      return false;
    }
  };

  const resetearFormularioProducto = () => {
    setModificandoId(null);
    setCodigoProd("");
    setNombreProd("");
    setStock("");
    setStockCritico("");
    setPrecioU("");
    setGanancia("");
    setIva("");
    setImporte("");
    setCatSeleccionada("Elige una categoría");
  };

  function prepararEdicion(producto, showModalCargar) {
    // setModificandoId(producto.id);
    // setCodigoProd(producto.codigo || "");
    // setNombreProd(producto.nombreProducto);
    // setStock(producto.stock);
    // setStockCritico(producto.stockCritico || "");
    // setPrecioU(producto.precioUnitario);
    // setGanancia(producto.ganancia);
    // setIva(producto.iva);

    // setImporte(producto.importe);
    // setCatSeleccionada(producto.categoria);
    // showModalCargar(true);
    if (!producto) return;

    setModificandoId(producto.id || producto._id);
    setCodigoProd(producto.codigo ? String(producto.codigo) : "");
    setNombreProd(producto.nombreProducto || producto.nombre || "");
    setStock(
      producto.stock !== undefined && producto.stock !== null
        ? String(producto.stock)
        : "",
    );
    setStockCritico(
      producto.stockCritico !== undefined && producto.stockCritico !== null
        ? String(producto.stockCritico)
        : "",
    );
    setPrecioU(
      producto.precioUnitario !== undefined && producto.precioUnitario !== null
        ? String(producto.precioUnitario)
        : "",
    );
    setGanancia(
      producto.ganancia !== undefined && producto.ganancia !== null
        ? String(producto.ganancia)
        : "1.40",
    );
    setIva(
      producto.iva !== undefined && producto.iva !== null
        ? String(producto.iva)
        : "1.21",
    );
    setImporte(
      producto.importe !== undefined && producto.importe !== null
        ? String(producto.importe)
        : "0",
    );
    setCatSeleccionada(producto.categoria || "Elige una categoría");

    if (typeof showModalCargar === "function") {
      showModalCargar(true);
    }
  }

  const handleSubmitProducto = async (e, handleCloseModalCarga) => {
    e.preventDefault();

    const catEncontrada = categorias.find((c) => c.nombre === catSeleccionada);

    const datosBackend = {
      codigo: codigoProd,
      nombre: nombreProd,
      // stock: Number(stock),
      // stockCritico: stockCritico !== "" ? Number(stockCritico) : 0,
      stock: stock !== "" ? Number(stock) : 0,
      stockCritico: stockCritico !== "" ? Number(stockCritico) : 0,
      precio: Number(precioU),
      // ganancia: Number(ganancia),
      ganancia: ganancia !== "" ? Number(ganancia) : 1,
      // iva: Number(iva),
      iva: iva !== "" ? Number(iva) : 1,
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
        resetearFormularioProducto();
        handleCloseModalCarga();
      }
    } catch (error) {
      alert("Error al procesar la solicitud en el servidor.");
    }
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
        resetearFormularioProducto,

        //Estados del forumlario
        codigoProd,
        setCodigoProd,
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
