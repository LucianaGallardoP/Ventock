import React from "react";
import "../styles/errorPage.css";
import pagerror from "../assets/404Stock.mp4";

export default function ErrorPage() {
  return (
    <div id="errorMain">
      <div id="p">
        <p style={{ margin: "0" }}>
          Lo sentimos, no se encontró la página que buscas...
        </p>
        <p>Inténtalo de nuevo mas tarde.</p>
      </div>

      <video autoPlay muted loop>
        <source src={pagerror} type="video/mp4" />
      </video>
    </div>
  );
}
