import "../styles/footerComponent.css";
import {NavLink} from 'react-router-dom'

export default function FooterComponent() {
  return (
    <footer>
      <NavLink to="/about" className={"navLinksFooter"}>
        Sobre Nosotros
      </NavLink>

      <NavLink to="/contact" className={"navLinksFooter"}>
        Contacto
      </NavLink>
    </footer>
  )
}
