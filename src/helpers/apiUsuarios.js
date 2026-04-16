// const url = "http://localhost:3001/api/usuarios";

const url = "http://ventockbackend.vercel.app/api/usuarios";

// Helper para obtener el token limpio
const getAuthHeaders = () => {
  const token = JSON.parse(localStorage.getItem("token"));
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
    console.error(error);
    throw new Error("No se pudo obtener la informacion solicitada.");
  }
};

export const getUsuarioById = async (id) => {
  try {
    const resp = await fetch(url + "/" + id);
    const data = await resp.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo obtener la informacion solicitada.");
  }
};

export const crearUsuario = async (datos) => {
  try {
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    return {
      mensaje: "No se conecto al backend.",
    };
  }
};

export const actualizarUsuario = async (id, datos) => {
  try {
    const resp = await fetch(url + "/" + id, {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: getAuthHeaders(),
    });
    return await resp.json();
  } catch (error) {
    return { mensaje: "No se conectó al backend" };
  }
};

export const deleteUsuario = async (id) => {
  try {
    const resp = await fetch(url + "/" + id, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    return { mensaje: "No se conectó con el backend." };
  }
};
