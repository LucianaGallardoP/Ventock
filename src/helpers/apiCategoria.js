const url = "http://localhost:3001/api/categorias";
const limite = 5;

// const url = "http://ventockbackend.vercel.app/api/categorias";

// const token = JSON.parse(localStorage.getItem("token"));

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-type": "application/json; charset=UTF-8",
    "x-token": token || "",
  };
};

export const getCategorias = async (desde = 0) => {
  try {
    const resp = await fetch(url + "?limite= " + limite + "&desde= " + desde, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo obtener las categorias.");
  }
};

export const getCategoriaById = async (id) => {
  try {
    const resp = await fetch(url + "/" + id, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo obtener la informacion solicitada.");
  }
};

export const crearCategoria = async (datos) => {
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
    throw new Error("No se pudo crear la categoria.");
  }
};

export const actualizarCategoria = async (id, datos) => {
  try {
    const resp = await fetch(url + "/" + id, {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: getAuthHeaders(),
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { mensaje: "No se conecto con backend, error al actualizar" };
  }
};

export const borrarCategoria = async (id) => {
  try {
    const resp = await fetch(url + "/" + id, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const data = await resp.json();

    return data;
  } catch (error) {
    console.log(error);
    return { mensaje: "No se conecto con backend, error al eliminar" };
  }
};
