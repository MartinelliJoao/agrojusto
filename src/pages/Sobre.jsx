import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import styles from '../styles/Page.module.css';

export default function Sobre() {
  return (
    <Layout>
      <section className={styles.pageSection}>
        <div className={styles.pageHeader}>
          <p className={styles.pageOverline}>Sobre</p>
          <h1 className={styles.pageTitle}>A história do AgroJusto</h1>
          <p className={styles.pageSubtitle}>
            Uma jornada de agricultura inteligente, confiança e resultados reais para produtores e gestores rurais.
          </p>
        </div>

        <div className={styles.aboutGrid}>
          <div className={styles.aboutText}>
            <div className={styles.aboutCard}>
              <h2>Nossa trajetória</h2>
              <p>
                O AgroJusto foi criado para atender produtores e gestores que buscam eficiência e transparência
                na operação agrícola. A partir de uma experiência prática no campo, desenvolvemos uma plataforma
                que reúne dados reais, análise financeira e opções de serviço em um único ambiente.
              </p>
            </div>
            <div className={styles.aboutCard}>
              <h2>O desafio que enfrentamos</h2>
              <p>
                O agronegócio moderno exige decisões rápidas, mas muitos produtores ainda operam com informações
                fragmentadas e alto risco financeiro. O AgroJusto entrega previsibilidade, reduz perdas e melhora
                a capacidade de planejamento em toda a cadeia produtiva.
              </p>
            </div>
            <div className={styles.aboutCard}>
              <h2>Como atuamos</h2>
              <p>
                Integramos inteligência de custo, mercado e serviços para apoiar o produtor em cada etapa do ciclo
                agrícola. Do cálculo de investimento à escolha de máquinas, nossa solução oferece clareza e segurança.
              </p>
            </div>
            <div className={styles.aboutCard}>
              <h2>Missão, visão e valores</h2>
              <div className={styles.valueList}>
                <div className={styles.valueItem}>
                  <strong>Missão</strong>
                  <span>Fortalecer o agronegócio brasileiro com soluções práticas, dados confiáveis e atendimento dedicado.</span>
                </div>
                <div className={styles.valueItem}>
                  <strong>Visão</strong>
                  <span>Ser a plataforma de apoio técnico e financeiro mais relevante para quem planta, produz e investe no campo.</span>
                </div>
                <div className={styles.valueItem}>
                  <strong>Valores</strong>
                  <span>Compromisso com o produtor, transparência nas decisões, inovação responsável e foco em resultados sustentáveis.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.aboutFooter}>
          <div>
            <h2>Um parceiro para todas as etapas</h2>
            <p>
              Do planejamento de custos ao aluguel de máquinas e gestão da produção, o AgroJusto conecta
              o campo às soluções que você precisa para crescer com confiança.
            </p>
            <p>
              Explore também nossas jornadas de campo e tecnologia, desenvolvidas para orientar cada decisão.
            </p>
          </div>
          <Link to="/" className={styles.aboutButton}>
            Veja nossas jornadas
          </Link>
        </div>
      </section>
    </Layout>
  );
}
