import React, { createContext, useState } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  // ESTADOS--->

  // Guarda el array de objetos con todos los productos registrados
  const [productos, setProductos] = useState([]);

  // Lista de nombres de categorías
  const [categorias, setCategorias] = useState([]);

  // Guarda el texto que el usuario escribe en la barra de búsqueda
  const [filtro, setFiltro] = useState("");

  // Estados de cada campo del formulario NUEVO PRODUCTO
  // Si tiene un ID, el formulario sabe que está EDITANDO, si es null, está CREANDO
  const [modificandoId, setModificandoId] = useState(null);
  const [nombreProd, setNombreProd] = useState("");
  const [stock, setStock] = useState("");
  const [stockCritico, setStockCritico] = useState("");
  const [precioU, setPrecioU] = useState("");
  const [ganancia, setGanancia] = useState("");
  const [iva, setIva] = useState("");
  const [importe, setImporte] = useState("");
  // Controla qué texto se ve en el botón del Dropdown de categorías
  const [catSeleccionada, setCatSeleccionada] = useState("Elige una categoría");

  // VARIABLES DE CALCULO--->
  // Logica de busqueda: Crea una lista filtrada comparando el nombre o el ID con lo que se escribe en 'filtro'
  const resultadosBusqueda = productos.filter(
    (p) =>
      p.nombreProducto.toLowerCase().includes(filtro.toLowerCase()) ||
      p.id.toString().includes(filtro),
  );

  // FUNCIONES DE PRODUCTOS

  // Toma el texto del input de categoría y lo mete en el array de categorías
  function crearNuevaCategoria(nombre) {
    if (!nombre || nombre.trim() === "") return;

    const fakeMongoId =
      Date.now().toString(16) + Math.random().toString(16).slice(2, 14);

    // Creamos el objeto completo
    const nuevaCat = {
      id: fakeMongoId,
      nombre: nombre.trim(),
      estado: "Activo",
      fechaRegistro: new Date().toLocaleDateString(),
      usuario: "Admin",
    };

    setCategorias((prevCategorias) => [...prevCategorias, nuevaCat]);
  }

  // Filtra la lista de productos quitando el que coincida con el ID recibido
  function eliminarProducto(id) {
    const productoAEliminar = productos.find((p) => p.id === id);
    if (
      window.confirm(
        `¿Está seguro de ELIMINAR el producto ${productoAEliminar.nombreProducto} (ID: ${id})?`,
      )
    ) {
      setProductos(productos.filter((p) => p.id !== id));
      alert(
        `Producto: ${productoAEliminar.nombreProducto} (ID: ${id}) eliminado correctamente.`,
      );
    }
  }

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
  function handleSubmitProducto(e, handleCloseModalCarga) {
    e.preventDefault();

    const datosProducto = {
      id: modificandoId || productos.length + 1,
      nombreProducto: nombreProd,
      stock,
      stockCritico,
      precioUnitario: precioU,
      ganancia,
      iva,
      importe: importe,
      categoria: catSeleccionada,
    };

    if (modificandoId !== null) {
      // Si estamos editando, buscamos el producto por ID y reemplazamos sus datos
      setProductos(
        productos.map((p) => (p.id === modificandoId ? datosProducto : p)),
      );
      alert(
        `El producto ${nombreProd} (ID: ${modificandoId}) se modificó correctamente!`,
      );
    } else {
      // Actualizamos la lista de productos agregando el nuevo
      setProductos([...productos, datosProducto]);
      alert(`El producto: ${nombreProd} se creó correctamente!`);
    }

    setModificandoId(null);
    setNombreProd("");
    setStock("");
    setStockCritico("");
    setPrecioU("");
    setGanancia("");
    setIva("");
    setImporte("0.00"); // No dejes esto vacío para evitar errores de cálculo
    setCatSeleccionada("Elige una categoría");
    // Limpiamos todos los campos del formulario para el siguiente producto
    handleCloseModalCarga();
  }

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
