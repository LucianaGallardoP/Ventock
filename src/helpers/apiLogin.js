// const url = "http://localhost:3001/api/auth/login";

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/api/auth/login`;

// const url = "http://ventockbackend.vercel.app/api/auth/login";

export const authLogin = async (datos) => {
  try {
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await resp.json()

    return data;

  } catch (error) {
    return { mensaje: "No se conecto con el backend!" };
  }
};
