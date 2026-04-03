import React from "react";
import { useContext } from "react";
import { Dropdown, Form, Button } from "react-bootstrap";
import { FaTrash, FaPen } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { ProductContext } from "../context/ProductContext";

export default function ProductListComponent({ setShowModalCarga }) {
  const {
    categorias,
    filtro,
    setFiltro,
    resultadosBusqueda,
    eliminarProducto,
    prepararEdicion,
    agregarAlDetalle, // Esta función la moveremos al context de Carrito luego, por ahora úsala si existe
  } = useContext(ProductContext);

  return (
    <section id="productList_container">
      <div id="productList_header">
        <h5 style={{ fontWeight: "bold" }}>Productos en Sistema</h5>

        <div id="inputBuscar_container">
          <Form.Control
            style={{ width: "auto" }}
            type="search"
            placeholder="ID o Nombre del Producto"
            value={filtro}
            // Filtra mientras se escribe
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>

        <button onClick={() => setShowModalCarga(true)}>Nuevo Producto</button>
      </div>

      <div id="productList_tableSection">
        <table id="productsTable" style={{ width: "100%" }}>
          <thead id="productsTable_thead">
            <tr>
              <th colSpan={9} style={{ padding: "0%" }}>
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    style={{ borderRadius: "0", border: "none" }}
                  >
                    Filtrar Categorías
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    style={{ width: "100%", backgroundColor: "#bdd1de" }}
                  >
                    {categorias.map((cat, index) => (
                      <Dropdown.Item
                        key={index}
                        className="itemsCategories_dropD"
                      >
                        {cat}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </th>
            </tr>

            <tr className="productsTable_header">
              <th>ID</th>
              <th>Nombre</th>
              <th>Stock - Últ. Modif.</th>
              <th>P.U</th>
              <th>%Desc</th>
              <th>%IVA</th>
              <th>Importe</th>
              <th>
                <CiCirclePlus />
              </th>
              <th>
                <FaPen /> <FaTrash />
              </th>
            </tr>
          </thead>

          <tbody>
            {categorias.map((cat) => {
              return (
                <React.Fragment key={cat}>
                  <tr>
                    <td className="titleCategories_table" colSpan={9}>
                      {cat.toUpperCase()}
                    </td>
                  </tr>

                  {/* Usamos 'productosMostrados' (la lista filtrada) en vez de 'productos' */}
                  {resultadosBusqueda
                    .filter((producto) => producto.categoria === cat)
                    .map((producto) => (
                      <tr key={producto.id}>
                        <td>{producto.id}</td>
                        <td>{producto.nombreProducto}</td>
                        <td>{producto.stock}</td>
                        <td>${producto.precioUnitario}</td>
                        <td>{producto.descuento}</td>
                        <td>{producto.iva}</td>
                        <td>${producto.importe}</td>
                        <td style={{ textAlign: "center" }}>
                          <Button onClick={() => agregarAlDetalle(producto)}>
                            +
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
                            style={{ backgroundColor: "none" }}
                            variant="warning"
                            onClick={() => prepararEdicion(producto, setShowModalCarga)}
                          >
                            <FaPen style={{ color: "white" }} />
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => eliminarProducto(producto.id)}
                          >
                            <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    ))}

                  {/* Mensaje si la categoria todavia no tiene productos */}
                  {productos.filter((producto) => producto.categoria === cat)
                    .length === 0 && (
                    <tr>
                      <td colSpan={9}>No hay productos cargados en "{cat}"</td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}

            {/* Mensaje si no hay categorias creadas */}
            {categorias.length === 0 && (
              <tr>
                <td colSpan={9}>
                  <h6 className="text-muted mt-2 text-center">
                    Crea una categoría para empezar a listar productos
                  </h6>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
