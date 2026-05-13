import React, { createContext, useState, useEffect } from "react";
import { authLogin } from "../helpers/apiLogin";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(()=>{
    const savedUser = localStorage.getItem("usuario");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = async (datos) => {
    const data = await authLogin(datos);

    if (data?.token) {
      setToken(data.token);
      setUser(data.usuario);

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

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
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
