import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import styles from '../styles/Home.module.css';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function Home() {
  const [featuresRef, featuresVisible] = useIntersectionObserver();
  const [cardsRef, cardsVisible] = useIntersectionObserver();
  const [ctaRef, ctaVisible] = useIntersectionObserver();
  return (
    <Layout>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Tecnologia que valoriza o agricultor
          </h1>
          <p className={styles.heroSubtitle}>
            A plataforma mais confiável para cálculo justo de aluguel de terras agrícolas, 
            equipamentos e análise de mercado. Ajudamos produtores rurais a tomar decisões 
            baseadas em dados precisos.
          </p>
          <div className={styles.heroCTA}>
            <Link to="/calculo" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="lg">
                🧮 Calcular Preço
              </Button>
            </Link>
            <Link to="/aluguel" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" size="lg">
                🚜 Explorar Equipamentos
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.scrollHint}>
          <span>Role para descobrir mais</span>
          <span className={styles.scrollIcon}>↓</span>
        </div>
      </section>

      {/* Features Section */}
      <section 
        className={`${styles.featuresSection} ${featuresVisible ? styles.visible : ''}`}
        ref={featuresRef}
      >
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Nossos Diferenciais</h2>
          <p className={styles.sectionSubtitle}>
            Tudo que você precisa para gerenciar sua propriedade de forma inteligente e eficiente
          </p>
          
          <div className={styles.featuresGrid}>
            <Card 
              icon="🧮"
              title="Cálculo Inteligente"
              variant="filled"
              hover={true}
            >
              Algoritmos avançados baseados em dados de mercado em tempo real. 
              Calcule preços justos de aluguel com precisão profissional.
            </Card>

            <Card 
              icon="📍"
              title="Distância Automática"
              variant="filled"
              hover={true}
            >
              Sistema de localização inteligente que calcula automaticamente 
              a distância e custos de deslocamento para suas operações.
            </Card>

            <Card 
              icon="🚜"
              title="Aluguel de Máquinas"
              variant="filled"
              hover={true}
            >
              Acesso a um catálogo completo de equipamentos agrícolas disponíveis 
              para aluguel com preços competitivos e transparentes.
            </Card>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section 
        className={`${styles.cardsSection} ${cardsVisible ? styles.visible : ''}`}
        ref={cardsRef}
      >
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Soluções Práticas</h2>
          <p className={styles.sectionSubtitle}>
            Conheca as principais funcionalidades que irão revolucionar o seu negócio
          </p>

          <div className={styles.cardsGrid}>
            <Card 
              icon="📊"
              title="Análise de Preços"
              variant="elevated"
            >
              <p>Obtenha análises detalhadas de mercado com gráficos e tendências. 
              Tome decisões informadas com dados atualizados constantemente.</p>
              <Link to="/calculo" style={{ textDecoration: 'none' }}>
                <Button variant="ghost" size="sm">
                  Saiba mais →
                </Button>
              </Link>
            </Card>

            <Card 
              icon="🤝"
              title="Conexão com Locadores"
              variant="elevated"
            >
              <p>Conecte-se com proprietários e outros agricultores. 
              Negocie directly na plataforma com segurança e transparência.</p>
              <Link to="/perfil" style={{ textDecoration: 'none' }}>
                <Button variant="ghost" size="sm">
                  Saiba mais →
                </Button>
              </Link>
            </Card>

            <Card 
              icon="📱"
              title="App Mobile Completo"
              variant="elevated"
            >
              <p>Acesse nossa plataforma em qualquer lugar, a qualquer hora. 
              Sincronização em tempo real entre todos os seus dispositivos.</p>
              <Button variant="ghost" size="sm">
                Saiba mais →
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className={`${styles.ctaSection} ${ctaVisible ? styles.visible : ''}`}
        ref={ctaRef}
      >
        <div className={styles.sectionContainer}>
          <div className={styles.ctaContent}>
            <h2>Pronto para otimizar seu negócio?</h2>
            <p>
              Junte-se a centenas de produtores que já confiam na AgroJusto para 
              gerenciar suas operações agrícolas de forma mais inteligente e lucrativa.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/calculo" style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="lg">
                  ✓ Começar Agora
                </Button>
              </Link>
              <Button variant="secondary" size="lg">
                📞 Fale com um Especialista
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
