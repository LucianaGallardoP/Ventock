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
    }
  };

  useEffect(() => {
    if (token) {
      cargarCatsProds();
    }
  }, [token]);

  const crearNuevaCategoria = async (nombre) => {
    if (!nombre || nombre.trim() === "") return { ok: false, mensaje: "Nombre inválido." };

    try {
      const resp = await crearCategoria({ nombre });
      if (resp?.categoria) {
        await cargarCatsProds();
        return { ok: true, mensaje: "Categoría creada con éxito." };
      } else {
        return { ok: false, mensaje: resp.mensaje || "Error al crear la categoría." };
      }
    } catch (error) {
      return { ok: false, mensaje: "Error de conexión al crear categoría." };
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
      await cargarCatsProds();
      return { ok: true, mensaje: res.mensaje || "Producto eliminado con éxito." };
    } catch (error) {
      return { ok: false, mensaje: "Error al intentar eliminar el producto." };
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

  const handleSubmitProducto = async (e) => {
    e.preventDefault();

    const catEncontrada = categorias.find((c) => c.nombre === catSeleccionada);

    const datosBackend = {
      codigo: codigoProd,
      nombre: nombreProd,
      stock: stock !== "" ? Number(stock) : 0,
      stockCritico: stockCritico !== "" ? Number(stockCritico) : 0,
      precio: Number(precioU),
      ganancia: ganancia !== "" ? Number(ganancia) : 1,
      iva: iva !== "" ? Number(iva) : 1,
      categoria: catEncontrada?.id,
    };

    try {
      let res;
      const esEdicion = !!modificandoId;

      if (esEdicion) {
        res = await actualizarProducto(modificandoId, datosBackend);
      } else {
        res = await crearProducto(datosBackend);
      }

      if (res) {
        await cargarCatsProds();
        resetearFormularioProducto();
        return {
          ok: true,
          esEdicion,
          mensaje: res.mensaje || (esEdicion ? "Producto actualizado correctamente." : "Producto cargado correctamente."),
        };
      }
      return { ok: false, mensaje: "No se obtuvo respuesta del servidor." };
    } catch (error) {
      return { ok: false, mensaje: "Error al procesar la solicitud en el servidor." };
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
