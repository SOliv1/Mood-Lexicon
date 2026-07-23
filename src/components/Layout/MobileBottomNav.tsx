import { NavLink } from "react-router-dom";
import "./MobileBottomNav.css";

export default function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/splash">Arrival Ritual</NavLink>
    </nav>
  );
}