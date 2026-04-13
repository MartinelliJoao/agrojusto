import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          <span>🌾</span>
          <span>AgroJusto</span>
        </Link>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/" className={isActive('/')}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/calculo" className={isActive('/calculo')}>
              Cálculo
            </Link>
          </li>
          <li>
            <Link to="/aluguel" className={isActive('/aluguel')}>
              Aluguel
            </Link>
          </li>
          <li>
            <Link to="/perfil" className={isActive('/perfil')}>
              Perfil
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
