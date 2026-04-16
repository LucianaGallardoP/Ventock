const url = "http://localhost:3001/api/categorias";

// const url = "http://ventockbackend.vercel.app/api/categorias";

const token = JSON.parse(localStorage.getItem("token"));

const limite = 5;

export const getCategorias = async (desde = 0) => {
  try {
    const resp = await fetch(url + "?limite= " + limite + "&desde= " + desde, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo obtener la informacion solicitada.");
  }
};

export const getCategoriaById = async (id) => {
  try {
    const resp = await fetch(url + "/" + id, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": token,
      },
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
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo conectar a la base de datos");
  }
};

export const actualizarCategoria = async (id, datos) => {
  try {
    const resp = await fetch(url + "/" + id, {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { mensaje: "No se conecto con backend" };
  }
};

export const borrarCategoria = async (id) => {
  try {
    const resp = await fetch(url + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });

    const data = await resp.json();

    return data;
  } catch (error) {
    console.log(error);
    return { mensaje: "No se conecto con backend" };
  }
};
