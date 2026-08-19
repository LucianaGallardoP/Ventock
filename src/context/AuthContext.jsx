import React, { createContext, useState, useEffect } from "react";
import { authLogin } from "../helpers/apiLogin";

export const AuthContext = createContext();

const tiempo_expiracion = 6 * 60 * 60 * 1000;

export function AuthProvider({ children }) {
  const obtenerTokenValido = () => {
    const tokenGuardado = localStorage.getItem("token");
    const expiracion = localStorage.getItem("sesion_expira_en");

    if (!tokenGuardado || !expiracion) return null;

    if (Date.now() > Number(expiracion)) {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      localStorage.removeItem("sesion_expira_en");
      return null;
    }
    return tokenGuardado;
  };

  const [token, setToken] = useState(obtenerTokenValido());

  const [user, setUser] = useState(() => {
    if (!obtenerTokenValido()) return null;
    const savedUser = localStorage.getItem("usuario");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const tokenValido = obtenerTokenValido();
    if (!tokenValido && token) {
      setToken(null);
      setUser(null);
    }
  }, []);

  const login = async (datos) => {
    const data = await authLogin(datos);

    if (data?.token) {
      const tiempoDeExpiracion = Date.now() + tiempo_expiracion;

      setToken(data.token);
      setUser(data.usuario);

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      localStorage.setItem("sesion_expira_en", tiempoDeExpiracion.toString());

      return { success: true, usuario: data.usuario };
    } else {
      return {
        success: false,
        mensaje: data.mensaje || "Error de credenciales",
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("sesion_expira_en");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
