import { Link, NavLink } from "react-router-dom";
import "./MobileBottomNav.css";

export default function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      <NavLink to="/">Home</NavLink>
      <Link to={{ pathname: "/", hash: "#grounding-compass" }}>Compass</Link>
      <Link to={{ pathname: "/", hash: "#site-footer" }}>Links</Link>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/splash">Arrival Ritual</NavLink>
    </nav>
  );
}