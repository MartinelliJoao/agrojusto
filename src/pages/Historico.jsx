import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Page.module.css';

const defaultHistoryEntries = [
  {
    id: 1,
    type: 'Produto calculado',
    name: 'Plantadeira Smart',
    date: '12 Abr 2026',
    value: 'R$ 38.400',
  },
  {
    id: 2,
    type: 'Máquina alugada',
    name: 'Trator 4x4',
    date: '10 Abr 2026',
    value: 'R$ 15.800',
  },
  {
    id: 3,
    type: 'Produto calculado',
    name: 'Irrigador Eco',
    date: '09 Abr 2026',
    value: 'R$ 7.200',
  },
  {
    id: 4,
    type: 'Máquina alugada',
    name: 'Colheitadeira X',
    date: '05 Abr 2026',
    value: 'R$ 22.500',
  },
  {
    id: 5,
    type: 'Produto calculado',
    name: 'Drone Agro',
    date: '03 Abr 2026',
    value: 'R$ 6.900',
  },
  {
    id: 6,
    type: 'Máquina alugada',
    name: 'Pulverizador V2',
    date: '01 Abr 2026',
    value: 'R$ 9.650',
  },
];

export default function Historico() {
  const [historyEntries, setHistoryEntries] = useState(defaultHistoryEntries);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('agrojusto-history') || '[]');
    if (stored.length > 0) {
      setHistoryEntries([...stored, ...defaultHistoryEntries]);
    }
  }, []);

  return (
    <Layout>
      <section className={styles.pageSection}>
        <div className={styles.pageHeader}>
          <p className={styles.pageOverline}>Histórico</p>
          <h1 className={styles.pageTitle}>Histórico de produtos e aluguéis</h1>
          <p className={styles.pageSubtitle}>
            Acompanhe as últimas simulações de produtos calculados e as máquinas alugadas em um histórico organizado.
          </p>
        </div>

        <div className={styles.historyCard}>
          <div className={styles.historyHeader}>
            <div>
              <p className={styles.metricLabel}>Registros</p>
              <strong>{historyEntries.length}</strong>
            </div>
            <p className={styles.pageSubtitle}>Dados simulados para mostrar o fluxo de operações.</p>
          </div>

          <div className={styles.historyList}>
            <div className={styles.historyRowHeader}>
              <span>Nome</span>
              <span>Data</span>
              <span>Valor</span>
            </div>
            {historyEntries.map((entry) => (
              <div key={entry.id} className={styles.historyRow}>
                <div>
                  <p className={styles.historyType}>{entry.type}</p>
                  <strong>{entry.name}</strong>
                </div>
                <span>{entry.date}</span>
                <strong>{entry.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
