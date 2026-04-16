// const url = "http://localhost:3001/api/productos";

const url = "http://ventockbackend.vercel.app/api/productos";

const getAuthHeaders = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return {
    "Content-type": "application/json; charset=UTF-8",
    "x-token": token || "",
  };
};

const limite = 50;

export const getProductos = async (desde = 0) => {
  try {
    const resp = await fetch (url + "?limite= " + limite + "&desde= " + desde, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo obtener la información de productos.");
  }
};

export const getProductoById = async (id) => {
  try {
   
    const resp = await fetch(url + "/" + id,  {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo obtener el producto solicitado.");
  }
};

export const crearProducto = async (datos) => {
  try {
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: getAuthHeaders(),
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo conectar a la base de datos para crear el producto.");
  }
};

export const actualizarProducto = async (id, datos) => {
  try {
    const resp = await fetch(url + "/" + id,  {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: getAuthHeaders(),
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    return { mensaje: "No se pudo conectar con el backend para actualizar." };
  }
};

export const borrarProducto = async (id) => {
  try {
    const resp = await fetch(url + "/" + id,  {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    return { mensaje: "No se pudo conectar con el backend para eliminar." };
  }
};