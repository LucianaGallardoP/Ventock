// const url = "http://localhost:3001/api/usuarios";

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/api/usuarios`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-type": "application/json; charset=UTF-8",
    "x-token": token || "",
  };
};

export const getUsuarios = async (desde = 0, limite = 10) => {
  try {
    const resp = await fetch(url + "?limite=" + limite + "&desde=" + desde, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    throw new Error("No se pudo obtener la informacion solicitada.");
  }
};

export const getUsuarioById = async (id) => {
  try {
    const resp = await fetch(url + "/" + id);
    const data = await resp.json();

    return data;
  } catch (error) {
    throw new Error("No se pudo obtener la informacion solicitada.");
  }
};

export const postUsuario = async (datos) => {
  try {
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await resp.json();
    if (!resp.ok || !data?.usuario) {
      return {
        ok: false,
        mensaje: data?.mensaje || "Error al crear el usuario.",
      };
    }
    return { ok: true, ...data };
  } catch (error) {
    return { ok: false, mensaje: "No se conectó con el backend, error al crear el usuario." };
  }
};

export const putUsuario = async (id, datos) => {
  try {
    const resp = await fetch(url + "/" + id, {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: getAuthHeaders(),
    });

    const data = await resp.json();
    if (!resp.ok || !data?.usuario) {
      return {
        ok: false,
        mensaje: data?.mensaje || "Error al actualizar el usuario.",
      };
    }
    return { ok: true, ...data };
  } catch (error) {
    return { ok: false, mensaje: "No se conectó con el backend, error al actualizar el usuario." };
  }
};

export const deleteUsuario = async (id) => {
  try {
    const resp = await fetch(url + "/" + id, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const data = await resp.json();
    if (!resp.ok || !data?.usuarioBorrado) {
      return {
        ok: false,
        mensaje: data?.mensaje || "Error al eliminar el usuario.",
      };
    }
    return { ok: true, ...data };
  } catch (error) {
    return { ok: false, mensaje: "No se conectó con el backend, error al eliminar el usuario." };
  }
};
