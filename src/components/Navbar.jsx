import { Link, useLocation } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

function Navbar({ cart }) {
  const location = useLocation();
  const cartCount = cart.reduce((sum, item) => sum + (item.qty ?? 1), 0);

  return (
    <nav className={styles.nav}>

      {/* Logo */}
      <Link to="/" className={styles.logo}>
        Shop<span>Ease</span>
      </Link>

      {/* Links */}
      <div className={styles.links}>

        <Link
          to="/"
          className={`${styles.link} ${location.pathname === "/" ? styles.active : ""}`}
        >
          Home
        </Link>

        <Link
          to="/cart"
          className={styles.cartLink}
        >
          🛍 Cart
          {cartCount > 0 && (
            <span className={styles.badge}>{cartCount}</span>
          )}
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;