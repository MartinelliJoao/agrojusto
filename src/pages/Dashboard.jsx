import Layout from '../components/Layout';
import styles from '../styles/Page.module.css';

const monthlySales = [
  { month: 'Jan', value: 48 },
  { month: 'Fev', value: 62 },
  { month: 'Mar', value: 73 },
  { month: 'Abr', value: 57 },
  { month: 'Mai', value: 84 },
  { month: 'Jun', value: 92 },
];

const topProducts = [
  { name: 'Plantadeira Smart', value: 92 },
  { name: 'Trator 4x4', value: 76 },
  { name: 'Colheitadeira X', value: 58 },
  { name: 'Irrigador Eco', value: 43 },
];

export default function Dashboard() {
  return (
    <Layout>
      <section className={styles.pageSection}>
        <div className={styles.pageHeader}>
          <p className={styles.pageOverline}>Dashboard</p>
          <h1 className={styles.pageTitle}>Painel administrativo de operações</h1>
          <p className={styles.pageSubtitle}>
            Acompanhe os principais indicadores do seu negócio em tempo real e identifique oportunidades de crescimento.
          </p>
        </div>

        <div className={styles.dashboardMetrics}>
          <div className={styles.metricCard}>
            <p className={styles.metricLabel}>Total de produtos cadastrados</p>
            <strong>128</strong>
          </div>
          <div className={styles.metricCard}>
            <p className={styles.metricLabel}>Total de aluguéis feitos</p>
            <strong>343</strong>
          </div>
          <div className={`${styles.metricCard} ${styles.profitCard}`}>
            <p className={styles.metricLabel}>Lucro estimado</p>
            <strong>R$ 249.800</strong>
          </div>
          <div className={`${styles.metricCard} ${styles.profitCard}`}>
            <p className={styles.metricLabel}>Margem de lucro</p>
            <strong>60%</strong>
          </div>
        </div>

        <div className={styles.dashboardCharts}>
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div>
                <p className={styles.metricLabel}>Vendas por mês</p>
                <h2>Fluxo de receita</h2>
              </div>
              <span className={styles.chartTag}>Simulado</span>
            </div>
            <div className={styles.barChart}>
              {monthlySales.map((item) => (
                <div key={item.month} className={styles.chartBar}>
                  <div
                    className={styles.chartFill}
                    style={{ height: `${item.value}%` }}
                  />
                  <span>{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div>
                <p className={styles.metricLabel}>Produtos mais vendidos</p>
                <h2>Destaques de performance</h2>
              </div>
              <span className={styles.chartTag}>Simulado</span>
            </div>
            <div className={styles.productList}>
              {topProducts.map((product) => (
                <div key={product.name} className={styles.productRow}>
                  <span>{product.name}</span>
                  <div className={styles.productBarWrapper}>
                    <div
                      className={styles.productBar}
                      style={{ width: `${product.value}%` }}
                    />
                  </div>
                  <strong>{product.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
