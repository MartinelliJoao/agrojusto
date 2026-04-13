import styles from '../styles/Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>AgroJusto</h3>
            <p>
              Plataforma de cálculo justo para aluguel e comercialização de terras agrícolas.
            </p>
          </div>

          <div className={styles.footerSection}>
            <h3>Navegação</h3>
            <a href="/">Home</a>
            <a href="/calculo">Cálculo</a>
            <a href="/aluguel">Aluguel</a>
            <a href="/perfil">Perfil</a>
          </div>

          <div className={styles.footerSection}>
            <h3>Contato</h3>
            <p>Email: contato@agrojusto.com</p>
            <p>Telefone: (11) 9999-9999</p>
            <p>São Paulo, Brasil</p>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} AgroJusto. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
