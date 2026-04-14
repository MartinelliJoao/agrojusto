import { Link } from 'react-router-dom';
import { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import ChatModal from '../components/ChatModal';
import styles from '../styles/Home.module.css';
import marketplaceStyles from '../styles/Marketplace.module.css';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { generateProdutos, generateEquipamentos, getImage } from '../utils/generateMarketplaceData';

export default function Home() {
  const [featuresRef, featuresVisible] = useIntersectionObserver();
  const [trustRef, trustVisible] = useIntersectionObserver();
  const [benefitsRef, benefitsVisible] = useIntersectionObserver();
  const [cardsRef, cardsVisible] = useIntersectionObserver();
  const [ctaRef, ctaVisible] = useIntersectionObserver();
  const [finalCtaRef, finalCtaVisible] = useIntersectionObserver();
  const [chatOpen, setChatOpen] = useState(false);
  
  const fallbackImage = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=500&q=60';
  
  // Gera dados de produtos e equipamentos
  const produtos = generateProdutos();
  const equipamentos = generateEquipamentos();
  
  // Produtos em destaque (mais vendidos)
  const produtosDestaque = [...produtos]
    .sort((a, b) => b.vendas - a.vendas)
    .slice(0, 4);
  
  // Equipamentos em destaque (mais alugados)
  const equipamentosDestaque = [...equipamentos]
    .sort((a, b) => b.alugueis - a.alugueis)
    .slice(0, 4);
  return (
    <Layout>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            Plataforma para produtores rurais
          </div>
          <h1 className={styles.heroTitle}>
            Aumente seu lucro com tecnologia agrícola inteligente
          </h1>
          <p className={styles.heroSubtitle}>
            Calcule preços justos, reduza custos e alugue máquinas com facilidade. 
            A solução mais confiável para produtores rurais brasileiros.
          </p>
          <div className={styles.heroCTA}>
            <Link to="/calculo" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="lg">
                🧮 Calcular preço agora
              </Button>
            </Link>
            <Link to="/aluguel" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" size="lg">
                🚜 Explorar máquinas
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.scrollHint}>
          <span>Role para descobrir mais</span>
          <span className={styles.scrollIcon}>↓</span>
        </div>
      </section>

      {/* SEÇÃO DE CONFIANÇA - NÚMEROS IMPORTANTES */}
      <section 
        className={`${styles.trustSection} ${trustVisible ? styles.visible : ''}`}
        ref={trustRef}
      >
        <div className={styles.trustGrid}>
          <div className={styles.trustCard}>
            <span className={styles.trustNumber}>1.000+</span>
            <span className={styles.trustLabel}>Cálculos Realizados</span>
          </div>
          <div className={styles.trustCard}>
            <span className={styles.trustNumber}>500+</span>
            <span className={styles.trustLabel}>Produtores Ativos</span>
          </div>
          <div className={styles.trustCard}>
            <span className={styles.trustNumber}>80+</span>
            <span className={styles.trustLabel}>Máquinas Disponíveis</span>
          </div>
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

      {/* SEÇÃO DE BENEFÍCIOS */}
      <section 
        className={`${styles.benefitsSection} ${benefitsVisible ? styles.visible : ''}`}
        ref={benefitsRef}
      >
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Principais Benefícios</h2>
          <p className={styles.sectionSubtitle}>
            Transforme sua operação agrícola com nossas soluções
          </p>
          
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <span className={styles.benefitIcon}>💰</span>
              <h3>Mais Lucro</h3>
              <p>Calcule preços precisos baseados em dados reais de mercado. Maximize seus ganhos em cada negociação.</p>
            </div>
            
            <div className={styles.benefitCard}>
              <span className={styles.benefitIcon}>🎯</span>
              <h3>Economia Garantida</h3>
              <p>Alugue máquinas quando necessário sem custos de manutenção. Reduza gastos operacionais em até 40%.</p>
            </div>
            
            <div className={styles.benefitCard}>
              <span className={styles.benefitIcon}>📈</span>
              <h3>Decisão Inteligente</h3>
              <p>Acesso a análises profundas de tendências do mercado. Tome decisões informadas com confiança.</p>
            </div>
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

      {/* Seção de Produtos em Destaque */}
      <section className={marketplaceStyles.featuredSection}>
        <div className={marketplaceStyles.featuredHeader}>
          <h2 className={marketplaceStyles.featuredTitle}>⭐ Produtos Populares</h2>
          <p className={marketplaceStyles.featuredSubtitle}>Os insumos mais procurados pelos agricultores</p>
        </div>
        <div className={marketplaceStyles.featuredGrid}>
          {produtosDestaque.map((product) => (
            <div key={product.id} className={marketplaceStyles.featuredCard}>
              <div className={marketplaceStyles.featuredImageWrapper}>
                <img src={getImage(product)} alt={product.nome} className={marketplaceStyles.featuredImage} onError={(e) => { e.target.src = fallbackImage; }} />
                {product.desconto > 0 && (
                  <div className={marketplaceStyles.discountBadge}>-{product.desconto}%</div>
                )}
              </div>
              <div className={marketplaceStyles.featuredContent}>
                <h3>{product.nome}</h3>
                <p className={marketplaceStyles.brand}>{product.marca}</p>
                <div className={marketplaceStyles.rating}>
                  <span className={marketplaceStyles.stars}>⭐ {product.rating}</span>
                  <span className={marketplaceStyles.vendas}>({product.vendas})</span>
                </div>
                <p className={marketplaceStyles.frete}>{product.frete}</p>
                <div className={marketplaceStyles.priceSection}>
                  <span className={marketplaceStyles.price}>R$ {product.priceIdeal.toFixed(2)}</span>
                </div>
                <Link to="/produtos" style={{ textDecoration: 'none' }}>
                  <button type="button" className={marketplaceStyles.featuredButton}>
                    Ver detalhes
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/produtos" style={{ textDecoration: 'none' }}>
            <Button variant="primary">Ver todos os produtos →</Button>
          </Link>
        </div>
      </section>

      {/* Seção de Equipamentos em Destaque */}
      <section className={marketplaceStyles.featuredSection}>
        <div className={marketplaceStyles.featuredHeader}>
          <h2 className={marketplaceStyles.featuredTitle}>🚜 Equipamentos Populares</h2>
          <p className={marketplaceStyles.featuredSubtitle}>As máquinas mais alugadas para sua propriedade</p>
        </div>
        <div className={marketplaceStyles.featuredGrid}>
          {equipamentosDestaque.map((equip) => (
            <div key={equip.id} className={marketplaceStyles.featuredCard}>
              <div className={marketplaceStyles.featuredImageWrapper}>
                <img src={getImage(equip)} alt={equip.nome} className={marketplaceStyles.featuredImage} onError={(e) => { e.target.src = fallbackImage; }} />
                {equip.desconto > 0 && (
                  <div className={marketplaceStyles.discountBadge}>-{equip.desconto}%</div>
                )}
              </div>
              <div className={marketplaceStyles.featuredContent}>
                <h3>{equip.nome}</h3>
                <p className={marketplaceStyles.brand}>{equip.marca}</p>
                <div className={marketplaceStyles.rating}>
                  <span className={marketplaceStyles.stars}>⭐ {equip.rating}</span>
                  <span className={marketplaceStyles.vendas}>({equip.alugueis})</span>
                </div>
                <p className={marketplaceStyles.frete}>{equip.frete}</p>
                <div className={marketplaceStyles.priceSection}>
                  <span className={marketplaceStyles.price}>R$ {equip.preco.toFixed(2)}/dia</span>
                </div>
                <Link to="/aluguel" style={{ textDecoration: 'none' }}>
                  <button type="button" className={marketplaceStyles.featuredButton}>
                    Alugar agora
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/aluguel" style={{ textDecoration: 'none' }}>
            <Button variant="primary">Ver todos os equipamentos →</Button>
          </Link>
        </div>
      </section>

      {/* CTA Section Final - Profissional */}
      <section 
        className={`${styles.finalCtaSection} ${finalCtaVisible ? styles.visible : ''}`}
        ref={finalCtaRef}
      >
        <div className={styles.sectionContainer}>
          <div className={styles.finalCtaContent}>
            <h2 className={styles.finalCtaTitle}>
              Pronto para transformar sua produção?
            </h2>
            <p className={styles.finalCtaText}>
              Junte-se a mais de 500 produtores brasileiros que aumentaram seus lucros com nossa plataforma. 
              Especialista dedicado pronto para ajudá-lo.
            </p>
            <button className={styles.finalCtaButton} onClick={() => setChatOpen(true)}>
              📞 Falar com especialista
            </button>
          </div>
        </div>
      </section>
      <ChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </Layout>
  );
}
