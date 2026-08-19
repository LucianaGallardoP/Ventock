import "../styles/aboutPage.css";
import avatar from "../assets/avatar.png";
import SVGwhite from "../assets/isotipoVentock.png";
import logotipo from "../assets/logotipoVentock.png";

export default function AboutPage() {
  return (
    <section id="aboutMain">
      <div id="about_container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "20%",
          }}
        >
          <img src={SVGwhite} alt="" width={"40%"} />
          <img src={logotipo} alt="" width={"100%"} />
        </div>
        <div id="about_contenido">
          <h5 id="about_tittle">SOBRE NOSOTROS</h5>
          <p id="aboutUs_parrafo">
            "Transformamos la complejidad de tus inventarios en procesos simples
            y rentables. Somos tu aliado estratégico para el control de tu
            negocio."
          </p>
          <div id="infoIntegrantes">
            <img
              src={avatar}
              alt="Avatar Luciana"
              width={"35%"}
              style={{ borderRadius: "50%", marginTop:"10px" }}
            />
            <p>Luciana Gallardo</p>

            <div>
              <p
                style={{
                  fontWeight: "500",
                }}
              >
                GitHub: LucianaGallardoP
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
