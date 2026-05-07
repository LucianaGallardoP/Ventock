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

  return (
    <section id="products_container">
      <div id="products_header">
        <h5 id="products_tittle">INVENTARIO</h5>

        <button id="cargarProducto" onClick={() => setShowModalCarga(true)}>
          + Agregar Producto
        </button>

        <div id="inputBuscar_container">
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
                  <Dropdown.Toggle
                    // id="dropdown-basic"
                    className="dropd_categorias"
                  >
                    Filtrar Categorías
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    style={{ width: "100%", backgroundColor: "#bdd1de" }}
                  >
                    {categorias.map((cat) => (
                      <Dropdown.Item
                        key={cat.id}
                        className="itemsCategorias_dropD"
                      >
                        {cat.nombre}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </th>
            </tr>

            <tr className="columns_TableProducts">
              {/* <th>ID</th> */}
              <th>NOMBRE</th>
              <th>STOCK (Ult modif)</th>
              <th>PRECIO.U</th>
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
            {categorias.map((cat) => (
              <React.Fragment key={cat.id}>
                <tr>
                  <td className="titleCategorias_table" colSpan={9}>
                    {cat.nombre.toUpperCase()}
                  </td>
                </tr>

                {/* Usamos 'productosMostrados' (la lista filtrada) en vez de 'productos' */}
                {resultadosBusqueda
                  .filter((producto) => producto.categoria === cat.nombre)
                  .map((producto) => {
                    const esCritico =
                      producto.stockCritico !== "" &&
                      Number(producto.stock) <= Number(producto.stockCritico);

                    return (
                      <tr
                        key={producto.id}
                        className={esCritico ? "fila_stock_critico" : ""}
                      >
                        {/* <td>{producto.id}</td> */}
                        <td>{producto.nombreProducto}</td>
                        <td
                          style={{
                            fontWeight: esCritico ? "bold" : "normal",
                            backgroundColor: esCritico
                              ? "rgb(223, 36, 36)"
                              : "#f0f2f5",
                          }}
                        >
                          {producto.stock} {esCritico}
                        </td>
                        {/* <td>{producto.stock}</td> */}
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
                        <td
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            border: "none",
                          }}
                        >
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

                {/* Mensaje si la categoria todavia no tiene productos */}
                {productos.filter(
                  (producto) => producto.categoria === cat.nombre,
                ).length === 0 && (
                  <tr>
                    <td colSpan={9}>
                      No hay productos cargados en "{cat.nombre}"
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}

            {/* Mensaje si no hay categorias creadas */}
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
