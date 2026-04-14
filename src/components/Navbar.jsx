import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          <span>🌾</span>
          <span>AgroJusto</span>
        </Link>

        <div className={styles.navRight}>
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
              <Link to="/produtos" className={isActive('/produtos')}>
                Produtos
              </Link>
            </li>
            <li>
              <Link to="/aluguel" className={isActive('/aluguel')}>
                Aluguel
              </Link>
            </li>
            <li>
              <Link to="/sobre" className={isActive('/sobre')}>
                Sobre
              </Link>
            </li>
            <li>
              <Link to="/contato" className={isActive('/contato')}>
                Contato
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className={isActive('/dashboard')}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/favoritos" className={isActive('/favoritos')}>
                Favoritos
              </Link>
            </li>
            <li>
              <Link to="/historico" className={isActive('/historico')}>
                Histórico
              </Link>
            </li>
            <li>
              <Link to="/perfil" className={isActive('/perfil')}>
                Perfil
              </Link>
            </li>
          </ul>

          {user && (
            <div className={styles.userInfo}>
              <Link to="/perfil" className={styles.userLink}>
                <div className={styles.userAvatar}>
                  👨‍🌾
                </div>
                <span className={styles.userName}>{user.nome}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
