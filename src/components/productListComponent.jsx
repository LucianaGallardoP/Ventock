import React, { useContext } from "react";
import { Dropdown, Form, Button } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { ProductContext } from "../context/ProductContext";
import { OrderContext } from "../context/OrderContext";
import "../styles/productListComponent.css";

export default function ProductListComponent({ setShowModalCarga }) {
  const {
    categorias,
    filtro,
    setFiltro,
    resultadosBusqueda,
    eliminarProducto,
    prepararEdicion,
    productos,
  } = useContext(ProductContext);

  const { agregarAlDetalle } = useContext(OrderContext);

  const manejarFiltroCategoria = (nombreCategoria) => {
    setFiltro(nombreCategoria);
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "Sin datos";
    const date = new Date(fecha);
    return (
      date.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }) + " hs"
    );
  };

  return (
    <section id="products_container">
      <div id="products_header">
        <h5 id="products_tittle">INVENTARIO</h5>

        <div id="agregarBuscar_container">
          <button id="cargarProducto" onClick={() => setShowModalCarga(true)}>
            + Agregar Producto
          </button>
          <Form.Control
            id="controlBuscar"
            type="search"
            placeholder="Buscar producto..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
      </div>

      <div id="products_main">
        <table id="products_table">
          <thead id="productsTable_thead">
            <tr>
              <th colSpan={9} style={{ padding: "0%" }}>
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
              <th>NOMBRE</th>
              <th>STOCK</th>
              <th>P.U</th>
              <th>%GAN</th>
              <th>%IVA</th>
              <th>IMPORTE</th>
              <th>
                <IoIosAddCircle />
              </th>
              <th id="icons_container">
                <FaPen /> <FaTrashCan />
              </th>
            </tr>
          </thead>

          <tbody className="text-center">
            {categorias.map((cat) => {
              // 1. Obtenemos los productos de ESTA categoría
              const productosDeEstaCat = productos.filter(
                (p) => p.categoria === cat.nombre,
              );

              // 2. Filtramos esos productos según el buscador (filtro)
              // Si no hay filtro, mostramos todos. Si hay, buscamos por nombre.
              const productosFiltrados = productosDeEstaCat.filter((p) => {
                if (filtro === "" || cat.nombre === filtro) return true; // Si es filtro por dropdown o vacío
                return p.nombreProducto
                  .toLowerCase()
                  .includes(filtro.toLowerCase());
              });

              // 3. Solo renderizamos la categoría si tiene productos que mostrar
              // Esto evita que aparezcan títulos de categorías vacías al buscar
              if (
                productosFiltrados.length === 0 &&
                filtro !== "" &&
                cat.nombre !== filtro
              ) {
                return null;
              }

              // {categorias
              //   .filter((cat) => {
              //     return (
              //       filtro === "" ||
              //       cat.nombre === filtro ||
              //       cat.nombre.toLowerCase().includes(filtro.toLowerCase())
              //     );
              //   })

              //   .map((cat) => {
              //     const productosAMostrar =
              //       filtro === cat.nombre
              //         ? productos.filter((p) => p.categoria === cat.nombre)
              //         : resultadosBusqueda.filter(
              //             (p) => p.categoria === cat.nombre,
              //           );

              return (
                <React.Fragment key={cat.id}>
                  <tr>
                    <td className="titleCategorias_table" colSpan={9}>
                      {cat.nombre.toUpperCase()}
                    </td>
                  </tr>

                  {productosFiltrados.map((producto) => {
                    const esCritico =
                      producto.stockCritico !== "" &&
                      Number(producto.stock) <= Number(producto.stockCritico);

                    return (
                      <tr
                        key={producto.id}
                        className={esCritico ? "fila_stock_critico" : ""}
                      >
                        <td>{producto.nombreProducto}</td>

                        <td
                          style={{
                            fontWeight: esCritico ? "bold" : "normal",
                            backgroundColor: esCritico
                              ? "orange"
                              : "#f0f2f5",
                          }}
                        >
                          <span>{producto.stock}</span>
                          {/* {esCritico} */}
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

                        <td>${producto.precioUnitario}</td>
                        <td>%{producto.ganancia}</td>
                        <td>%{producto.iva}</td>
                        <td>${producto.importe}</td>
                        <td style={{ textAlign: "center" }}>
                          <Button
                            id="btn_agg"
                            onClick={() => agregarAlDetalle(producto)}
                          >
                            <IoIosAddCircle />
                          </Button>
                        </td>
                        <td>
                          <Button
                            id="btn_modificar"
                            onClick={() => {
                              prepararEdicion(producto, setShowModalCarga);
                            }}
                          >
                            <FaPen />
                          </Button>
                          <Button
                            className="btn_eliminar"
                            onClick={() => eliminarProducto(producto.id)}
                          >
                            <FaTrashCan />
                          </Button>
                        </td>
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
                <td colSpan={9} className="text-muted mt-2 text-center">
                  Crea una categoría para empezar a listar productos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
