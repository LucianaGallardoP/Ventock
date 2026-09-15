// const url = "http://localhost:3001/api/categorias";
const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/api/categorias`;
const limite = 50;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-type": "application/json; charset=UTF-8",
    "x-token": token || "",
  };
};

export const getCategorias = async (desde = 0, todas = false) => {
  try {
    const query = `?limite=${limite}&desde=${desde}${todas ? "&todas=true" : ""}`;
    const resp = await fetch(`${url}${query}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    throw new Error("No se pudo obtener las categorias.");
  }
};

export const getCategoriaById = async (id) => {
  try {
    const resp = await fetch(`${url}/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await resp.json();
    return data;
  } catch (error) {
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
    throw new Error("No se pudo crear la categoria.");
  }
};

export const actualizarCategoria = async (id, datos) => {
  try {
    const resp = await fetch(`${url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: getAuthHeaders(),
    });

    const data = await resp.json();
    if (!resp.ok || !data?.categoria) {
      return {
        ok: false,
        mensaje: data?.mensaje || "Error al actualizar la categoría.",
      };
    }
    return { ok: true, ...data };
  } catch (error) {
    return { ok: false, mensaje: "No se conectó con el backend, error al actualizar." };
  }
};

export const cambiarEstadoCategoria = async (id) => {
  try {
    const resp = await fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
    });

    const data = await resp.json();
    if (!resp.ok || !data?.categoria) {
      return {
        ok: false,
        mensaje: data?.mensaje || "Error al cambiar el estado de la categoría.",
      };
    }
    return { ok: true, ...data };
  } catch (error) {
    return { ok: false, mensaje: "No se conectó con el backend, error al cambiar el estado." };
  }
};

export const borrarCategoria = async (id) => {
  try {
    const resp = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const data = await resp.json();
    if (!resp.ok || !data?.categoriaBorrada) {
      return {
        ok: false,
        mensaje: data?.mensaje || data?.msg || "Error al eliminar la categoría.",
      };
    }
    return { ok: true, ...data };
  } catch (error) {
    return { ok: false, mensaje: "No se conectó con el backend, error al eliminar." };
  }
};
