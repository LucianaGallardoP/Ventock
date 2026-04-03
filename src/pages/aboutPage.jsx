import "../styles/aboutPage.css";
// import avatar from "../assets/avatar.jpeg";

export default function AboutPage() {
  return (
    <section id="aboutMain">
      <h5 style={{ fontWeight: "bold", paddingTop: "10px" }}>Sobre Nosotros</h5>
      <p id="parrafoAboutUs">
        "Transformamos la complejidad de tus inventarios en procesos simples y
        rentables. Somos tu aliado estratégico para el control de tu negocio."
      </p>
      <p style={{ fontSize: "larger" }}>Integrantes:</p>
      <p>Luciana Gallardo</p>
      <img
        // src={avatar}
        alt="fotoLuciana"
        height={"20%"}
        width={"8%"}
        style={{ borderRadius: "50%" }}
      />
      <div>
        <p style={{ fontWeight: "bolder", marginTop: "10px" }}>
          GitHub: LucianaGallardoP
        </p>
      </div>
    </section>
  );
}
