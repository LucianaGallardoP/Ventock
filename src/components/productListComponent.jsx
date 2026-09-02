import React, { useContext, useState, useEffect } from "react";
import { Dropdown, Form, Button } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { ProductContext } from "../context/ProductContext";
import { OrderContext } from "../context/OrderContext";

import { AuthContext } from "../context/AuthContext";

import DeleteModal from "./modals/deleteModal";
import "../styles/productListComponent.css";

export default function ProductListComponent({ setShowModalCarga }) {
  const { user } = useContext(AuthContext);

  const {
    categorias,
    filtro,
    setFiltro,
    resultadosBusqueda,
    eliminarProducto,
    prepararEdicion,
    productos,
    resetearFormularioProducto,
  } = useContext(ProductContext);

  const { agregarAlDetalle } = useContext(OrderContext);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [prodParaEliminar, setProdParaEliminar] = useState({
    id: null,
    nombre: "",
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const esAdmin = user?.rol === "Admin" || user?.rol === "SuperAdmin";
  const columnasVisibles = esAdmin ? 10 : 9;

  const manejarFiltroCategoria = (nombreCategoria) => {
    setFiltro(nombreCategoria);
  };

  const clickDeleteIcon = (id, nombre) => {
    setProdParaEliminar({ id, nombre });
    setShowDeleteModal(true);
  };

  const confirmarEliminacion = async () => {
    if (prodParaEliminar.id) {
      const exito = await eliminarProducto(prodParaEliminar.id);
      if (exito) {
        setShowDeleteModal(false);
        setProdParaEliminar({ id: null, nombre: "" });
      }
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "Sin datos";
    const date = new Date(fecha);
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatearPrecio = (valor) => {
    if (valor === undefined || valor === null || isNaN(valor)) return "$0,00";
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor);
  };

  const coincideFiltro = (p, catNombre) => {
    const coincideCategoria =
      filtro === "" || catNombre === filtro || p.categoria === filtro;
    const busquedaTermino = filtro.toLowerCase().trim();

    if (busquedaTermino === "" || catNombre === filtro) {
      return coincideCategoria;
    }

    const coincideNombre = p.nombreProducto
      ?.toLowerCase()
      .includes(busquedaTermino);
    const coincideCodigo = p.codigo
      ? String(p.codigo).toLowerCase().includes(busquedaTermino)
      : false;

    return coincideNombre || coincideCodigo;
  };

  const productosVisibles = [];
  categorias.forEach((cat) => {
    const prodsCat = productos.filter(
      (p) => p.categoria === cat.nombre && coincideFiltro(p, cat.nombre),
    );
    productosVisibles.push(...prodsCat);
  });

  useEffect(() => {
    if (
      selectedIndex >= productosVisibles.length &&
      productosVisibles.length > 0
    ) {
      setSelectedIndex(productosVisibles.length - 1);
    }
  }, [productosVisibles.length, selectedIndex]);

  useEffect(() => {
    const filaSeleccionada = document.querySelector(".fila_seleccionada");
    if (filaSeleccionada) {
      filaSeleccionada.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  const handleKeyDown = (e) => {
    if (productosVisibles.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < productosVisibles.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const productoSeleccionado = productosVisibles[selectedIndex];
      if (productoSeleccionado) {
        agregarAlDetalle(productoSeleccionado);
      }
    }
  };

  let contadorItem = 0;
  let globalVisibleIndex = 0;

  return (
    <section id="products_container" tabIndex={0} onKeyDown={handleKeyDown}>
      <div id="products_header">
        <h5 id="products_tittle">INVENTARIO</h5>

        <div id="addSearch_container">
          {esAdmin && (
            <button
              id="addProduct"
              onClick={() => {
                resetearFormularioProducto();
                setShowModalCarga(true);
              }}
            >
              +
            </button>
          )}

          <div
            className={`search_wrapper ${
              isSearchOpen || filtro.trim() !== "" ? "expanded" : ""
            }`}
          >
            <button
              type="button"
              className="search_btn"
              onClick={() => setIsSearchOpen(true)}
            >
              <IoIosSearch size={22} />
            </button>
            <Form.Control
              id="controlBuscar"
              type="search"
              placeholder="Buscar..."
              value={filtro}
              onFocus={() => setIsSearchOpen(true)}
              onBlur={() => {
                if (filtro.trim() === "") {
                  setIsSearchOpen(false);
                }
              }}
              onChange={(e) => {
                setFiltro(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>

      <div id="products_main">
        <table id="products_table">
          <thead id="productsTable_thead">
            <tr>
              <th colSpan={columnasVisibles} style={{ padding: "0%" }}>
                <Dropdown>
                  <Dropdown.Toggle className="dropd_categorias">
                    {categorias.some((c) => c.nombre === filtro)
                      ? filtro
                      : "Todas las Categorías"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    style={{
                      width: "100%",
                      backgroundColor: "#D0D9E7",
                      textAlign: "center",
                    }}
                  >
                    <Dropdown.Item
                      className="itemsCategorias_dropD"
                      onClick={() => manejarFiltroCategoria("")}
                    >
                      --- Mostrar Todo ---
                    </Dropdown.Item>

                    {categorias.map((cat) => (
                      <Dropdown.Item
                        key={cat.id}
                        className="itemsCategorias_dropD"
                        onClick={() => manejarFiltroCategoria(cat.nombre)}
                      >
                        {cat.nombre}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </th>
            </tr>

            <tr className="columns_TableProducts">
              <th>#</th>
              <th>Código</th>
              <th>Producto</th>
              <th>Stock</th>
              <th>Prec.U</th>
              <th>IVA</th>
              <th>Utilidad</th>
              <th>Importe</th>
              <th>
                <IoIosAddCircle />
              </th>
              {esAdmin && (
                <th id="icons_container">
                  <FaPen />
                  <FaTrashCan/>
                </th>
              )}
            </tr>
          </thead>

          <tbody className="text-center">
            {categorias.map((cat) => {
              const productosDeEstaCat = productos.filter(
                (p) => p.categoria === cat.nombre,
              );

              const productosFiltrados = productosDeEstaCat.filter((p) => {
                if (filtro === "" || cat.nombre === filtro) return true;
                return p.nombreProducto
                  .toLowerCase()
                  .includes(filtro.toLowerCase());
              });

              if (
                productosFiltrados.length === 0 &&
                filtro !== "" &&
                cat.nombre !== filtro
              ) {
                return null;
              }

              return (
                <React.Fragment key={cat.id}>
                  <tr className="titleCategorie_row">
                    <td
                      className="titleCategorias_table"
                      colSpan={columnasVisibles}
                    >
                      {cat.nombre.toUpperCase()}
                    </td>
                  </tr>

                  {productosFiltrados.map((producto) => {
                    contadorItem++;
                    const currentIndex = globalVisibleIndex;
                    globalVisibleIndex++;

                    const isSelected = currentIndex === selectedIndex;

                    const esCritico =
                      producto.stockCritico !== "" &&
                      Number(producto.stock) <= Number(producto.stockCritico);

                    return (
                      <tr
                        key={producto.id}
                        onClick={() => setSelectedIndex(currentIndex)}
                        className={`productItem_row ${esCritico ? "fila_stock_critico" : ""} ${
                          isSelected ? "fila_seleccionada" : ""
                        }`}
                      >
                        {/* 1 */}
                        <td style={{ fontWeight: "bold" }}>{contadorItem}</td>
                        {/* 2 */}
                        <td style={{ color: "#64748b" }}>{producto.codigo}</td>
                        {/* 3 */}
                        <td className="productName_cell">
                          <div
                            className="productName_scroll"
                            title={producto.nombreProducto}
                          >
                            {producto.nombreProducto}
                          </div>
                        </td>
                        {/* 4 */}
                        <td
                          className="stock_Cell"
                          style={{
                            fontWeight: esCritico ? "bold" : "normal",
                          }}
                        >
                          <span>{producto.stock}</span>

                          <small
                            style={{
                              fontSize: "0.65rem",
                              opacity: 0.8,
                              display: "block",
                              marginTop: "2px",
                              fontWeight: "normal",
                            }}
                          >
                            {formatearFecha(producto.fechaStock)}
                          </small>
                        </td>

                        {/* <td>${producto.precioUnitario}</td> */}
                        <td>{formatearPrecio(producto.precioUnitario)}</td>

                        <td>{producto.iva}</td>
                        <td>{producto.ganancia}</td>

                        <td>
                          <span
                            style={{ color: "#a12e2e", fontSize:"0.85rem" }}
                          >
                            {/* ${producto.importe} */}
                            {formatearPrecio(producto.importe)}
                          </span>
                          <small
                            style={{
                              fontSize: "0.65rem",
                              opacity: 0.8,
                              display: "block",
                              marginTop: "2px",
                              fontWeight: "normal",
                            }}
                          >
                            {formatearFecha(producto.fechaPrecio)}
                          </small>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Button
                            id="btn_agg"
                            onClick={() => agregarAlDetalle(producto)}
                          >
                            <IoIosAddCircle />
                          </Button>
                        </td>

                        {esAdmin && (
                          <td>
                            <Button
                              className="btn_modificar"
                              onClick={() => {
                                prepararEdicion(producto, setShowModalCarga);
                              }}
                            >
                              <FaPen className="FaPen Fapen_body" />
                            </Button>
                            <Button
                              className="btn_eliminar"
                              onClick={() =>
                                clickDeleteIcon(
                                  producto.id,
                                  producto.nombreProducto,
                                )
                              }
                            >
                              <FaTrashCan className="FaTrashCan FaTrashCan_body" />
                            </Button>
                          </td>
                        )}
                      </tr>
                    );
                  })}

                  {productosFiltrados.length === 0 && (
                    <tr>
                      <td colSpan={9}>
                        No hay productos cargados en "{cat.nombre}"
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}

            {categorias.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="text-muted mt-2 text-center celda_vacia"
                >
                  Crea una categoría para empezar a listar productos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        onConfirm={confirmarEliminacion}
        title="ELIMINAR PRODUCTO PERMANENTEMENTE"
        message={`¿Estás seguro de que deseas eliminar "${prodParaEliminar.nombre}" del inventario de stock? Esta acción no se puede deshacer.`}
      />
    </section>
  );
}
