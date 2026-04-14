import Layout from '../components/Layout';
import styles from '../styles/Page.module.css';
import serviceImage from '../assets/images/farmer-working.jpg';

export default function Servicos() {
  const fallbackImage = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=500&q=60';
  return (
    <Layout>
      <section className={styles.pageSection}>
        <div className={styles.pageHeader}>
          <p className={styles.pageOverline}>Serviços</p>
          <h1 className={styles.pageTitle}>Soluções práticas para o agronegócio</h1>
          <p className={styles.pageSubtitle}>
            O AgroJusto entrega serviços pensados para quem quer tomar decisões mais rápidas, seguras e rentáveis.
          </p>
        </div>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutText}>
            <div className={styles.aboutCard}>
              <h2>Análise de custo e rentabilidade</h2>
              <p>
                Planeje sua safra com dados reais sobre insumos, mão de obra e mercado. Tenha uma visão clara dos resultados antes de investir.
              </p>
            </div>
            <div className={styles.aboutCard}>
              <h2>Aluguel de máquinas e implementos</h2>
              <p>
                Compare opções de equipamentos, simule custos e escolha a melhor alternativa para reduzir despesas e aumentar produtividade.
              </p>
            </div>
            <div className={styles.aboutCard}>
              <h2>Gestão operacional simplificada</h2>
              <p>
                Centralize informações de campo, estoque e serviços em uma única plataforma para acompanhar cada etapa da produção.
              </p>
            </div>
          </div>
          <div className={styles.aboutImageWrapper}>
            <img
              className={styles.aboutImage}
              src={serviceImage}
              alt="Agricultor trabalhando no campo"
              onError={(e) => { e.target.src = fallbackImage; }}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
