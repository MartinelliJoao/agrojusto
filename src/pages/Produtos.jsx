import { useMemo, useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Page.module.css';
import marketplaceStyles from '../styles/Marketplace.module.css';
import { generateProdutos, getImage } from '../utils/generateMarketplaceData';

const products = generateProdutos();

const categories = ['Todos', 'Grãos', 'Frutas', 'Verduras/Legumes'];
const brands = ['Todas', 'Embrapa', 'Corteva', 'Bayer', 'Syngenta', 'BASF', 'Verde Brasil'];
const priceRanges = [
  { label: 'Qualquer preço', min: 0, max: Infinity },
  { label: 'Até R$ 100', min: 0, max: 100 },
  { label: 'R$ 100 a R$ 250', min: 100, max: 250 },
  { label: 'R$ 250 a R$ 500', min: 250, max: 500 },
  { label: 'Acima de R$ 500', min: 500, max: Infinity },
];
const sortOptions = [
  { value: 'popular', label: 'Mais populares' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
  { value: 'name-asc', label: 'A → Z' },
  { value: 'best-rated', label: 'Melhor avaliados' },
];

export default function Produtos() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const [brand, setBrand] = useState('Todas');
  const [priceRange, setPriceRange] = useState(0);
  const [sort, setSort] = useState('popular');
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('agrojusto-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const fallbackImage = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=500&q=60';

  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      const updated = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem('agrojusto-favorites', JSON.stringify(updated));
      return updated;
    });
  };

  // Produtos em destaque (mais vendidos)
  const featuredProducts = [...products]
    .sort((a, b) => b.vendas - a.vendas)
    .slice(0, 6);

  const handleScheduleDelivery = (product) => {
    const history = JSON.parse(localStorage.getItem('agrojusto-history') || '[]');
    const entry = {
      id: Date.now(),
      type: 'Produto entregue',
      name: product.nome,
      category: product.category,
      date: new Date().toLocaleDateString('pt-BR'),
      value: `R$ ${product.priceIdeal.toFixed(2)}`,
    };
    history.unshift(entry);
    localStorage.setItem('agrojusto-history', JSON.stringify(history));
    setFeedback('✓ Produto agendado com sucesso! Verifique no histórico.');
    setTimeout(() => {
      setSelectedOffer(null);
      setFeedback('');
    }, 1500);
  };

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const selectedRange = priceRanges[priceRange];
    
    return products
      .filter((product) => {
        const matchesSearch = product.nome.toLowerCase().includes(normalizedQuery) || 
                            product.description.toLowerCase().includes(normalizedQuery) ||
                            product.marca.toLowerCase().includes(normalizedQuery);
        const matchesCategory = category === 'Todos' || product.category === category;
        const matchesBrand = brand === 'Todas' || product.marca === brand;
        const matchesPrice = product.priceIdeal >= selectedRange.min && product.priceIdeal <= selectedRange.max;
        return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
      })
      .sort((a, b) => {
        if (sort === 'price-asc') return a.priceIdeal - b.priceIdeal;
        if (sort === 'price-desc') return b.priceIdeal - a.priceIdeal;
        if (sort === 'name-asc') return a.nome.localeCompare(b.nome);
        if (sort === 'best-rated') return b.rating - a.rating;
        return b.vendas - a.vendas; // popular (default)
      });
  }, [query, category, brand, priceRange, sort]);

  return (
    <Layout>
      <section className={styles.pageSection}>
        <div className={styles.pageHeader}>
          <p className={styles.pageOverline}>Produtos</p>
          <h1 className={styles.pageTitle}>Marketplace agrícola</h1>
          <p className={styles.pageSubtitle}>
            Encontre insumos, equipamentos e tecnologia para sua operação agrícola
          </p>
        </div>

        {/* SEÇÃO DE DESTAQUE - MAIS VENDIDOS */}
        <section className={marketplaceStyles.featuredSection}>
          <div className={marketplaceStyles.featuredHeader}>
            <h2 className={marketplaceStyles.featuredTitle}>⭐ Mais vendidos</h2>
            <p className={marketplaceStyles.featuredSubtitle}>Produtos mais procurados pelos agricultores</p>
          </div>
          <div className={marketplaceStyles.featuredGrid}>
            {featuredProducts.map((product) => (
              <div key={product.id} className={marketplaceStyles.featuredCard}>
                <div className={marketplaceStyles.featuredImageWrapper}>
                <img src={getImage(product)} alt={product.nome} className={marketplaceStyles.featuredImage} onError={(e) => { e.target.src = fallbackImage; }} />
                  {product.desconto > 0 && (
                    <div className={marketplaceStyles.discountBadge}>-{product.desconto}%</div>
                  )}
                  <button
                    type="button"
                    className={marketplaceStyles.favoriteButton}
                    onClick={() => toggleFavorite(product.id)}
                    title={favorites.includes(product.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    {favorites.includes(product.id) ? '❤️' : '🤍'}
                  </button>
                </div>
                <div className={marketplaceStyles.featuredContent}>
                  <h3>{product.nome}</h3>
                  <p className={marketplaceStyles.brand}>{product.marca}</p>
                  <div className={marketplaceStyles.rating}>
                    <span className={marketplaceStyles.stars}>⭐ {product.rating}</span>
                    <span className={marketplaceStyles.vendas}>({product.vendas} vendas)</span>
                  </div>
                  <p className={marketplaceStyles.frete}>{product.frete}</p>
                  <div className={marketplaceStyles.priceSection}>
                    <span className={marketplaceStyles.price}>R$ {product.priceIdeal.toFixed(2)}</span>
                  </div>
                  <button 
                    type="button" 
                    className={marketplaceStyles.featuredButton} 
                    onClick={() => setSelectedOffer(product)}
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className={marketplaceStyles.marketplaceContainer}>
          {/* SIDEBAR COM FILTROS */}
          <aside className={marketplaceStyles.filterSidebar}>
            <div className={marketplaceStyles.filterSection}>
              <h3 className={marketplaceStyles.filterTitle}>🔍 Buscar</h3>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Nome ou descrição"
                className={marketplaceStyles.sidebarSearchInput}
              />
            </div>

            <div className={marketplaceStyles.filterSection}>
              <h3 className={marketplaceStyles.filterTitle}>📁 Categoria</h3>
              <div className={marketplaceStyles.filterOptions}>
                {categories.map((option) => (
                  <label key={option} className={marketplaceStyles.filterLabel}>
                    <input
                      type="radio"
                      name="category"
                      value={option}
                      checked={category === option}
                      onChange={(event) => setCategory(event.target.value)}
                      className={marketplaceStyles.filterRadio}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={marketplaceStyles.filterSection}>
              <h3 className={marketplaceStyles.filterTitle}>🏷️ Marca</h3>
              <select value={brand} onChange={(event) => setBrand(event.target.value)} className={marketplaceStyles.filterSelectSidebar}>
                {brands.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className={marketplaceStyles.filterSection}>
              <h3 className={marketplaceStyles.filterTitle}>💰 Faixa de preço</h3>
              <select value={priceRange} onChange={(event) => setPriceRange(Number(event.target.value))} className={marketplaceStyles.filterSelectSidebar}>
                {priceRanges.map((range, idx) => (
                  <option key={idx} value={idx}>{range.label}</option>
                ))}
              </select>
            </div>

            <div className={marketplaceStyles.filterSection}>
              <h3 className={marketplaceStyles.filterTitle}>↕️ Ordenar por</h3>
              <select value={sort} onChange={(event) => setSort(event.target.value)} className={marketplaceStyles.filterSelectSidebar}>
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={() => {
                setQuery('');
                setCategory('Todos');
                setBrand('Todas');
                setPriceRange(0);
                setSort('popular');
              }}
              className={marketplaceStyles.filterResetButton}
            >
              Limpar filtros
            </button>
          </aside>

          {/* CONTEÚDO PRINCIPAL */}
          <div className={marketplaceStyles.marketplaceContent}>
            <div className={marketplaceStyles.resultsSummary}>
              <h2>{filteredProducts.length} produtos encontrados</h2>
              <p>{category === 'Todos' ? 'Todos os produtos' : `Categoria: ${category}`}</p>
            </div>

            <div className={marketplaceStyles.productsGrid}>
          {filteredProducts.map((product) => (
            <article key={product.id} className={marketplaceStyles.productCard}>
              <div className={marketplaceStyles.productImageWrapper}>
                <img src={getImage(product)} alt={product.nome} className={marketplaceStyles.productImage} onError={(e) => { e.target.src = fallbackImage; }} />
                {product.desconto > 0 && (
                  <div className={marketplaceStyles.discountBadge}>-{product.desconto}%</div>
                )}
                <button
                  type="button"
                  className={marketplaceStyles.favoriteButton}
                  onClick={() => toggleFavorite(product.id)}
                  title={favorites.includes(product.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                >
                  {favorites.includes(product.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <div className={marketplaceStyles.productDetails}>
                <div className={marketplaceStyles.productMeta}>
                  <span className={marketplaceStyles.productTag}>{product.category}</span>
                </div>
                <h3>{product.nome}</h3>
                <p className={marketplaceStyles.productBrand}>{product.marca}</p>
                <div className={marketplaceStyles.productRating}>
                  <span className={marketplaceStyles.stars}>⭐ {product.rating}</span>
                  <span className={marketplaceStyles.vendas}>({product.vendas})</span>
                </div>
                <p className={marketplaceStyles.productFrete}>{product.frete}</p>
              </div>
              <div className={marketplaceStyles.productFooter}>
                <strong className={marketplaceStyles.productPrice}>R$ {product.priceIdeal.toFixed(2)}</strong>
                <button type="button" className={styles.marketButton} onClick={() => setSelectedOffer(product)}>Ver detalhes</button>
              </div>
            </article>
          ))}
        </div>
            </div>
          </div>

        {selectedOffer && (
          <div className={styles.offerModal}>
            <div className={styles.offerModalContent}>
              <button type="button" className={styles.offerModalClose} onClick={() => setSelectedOffer(null)}>✕</button>
              <img src={getImage(selectedOffer)} alt={selectedOffer.nome} className={styles.offerImage} onError={(e) => { e.target.src = fallbackImage; }} />
              <h2>{selectedOffer.nome}</h2>
              <p className={styles.offerCategory}>{selectedOffer.category} • {selectedOffer.marca}</p>
              <p className={styles.offerDescription}>{selectedOffer.description}</p>
              
              <div className={styles.offerStatsGrid}>
                <div className={styles.offerStatBox}>
                  <span className={styles.offerLabel}>Avaliação</span>
                  <strong className={styles.offerStat}>⭐ {selectedOffer.rating} ({selectedOffer.vendas} vendas)</strong>
                </div>
                <div className={styles.offerStatBox}>
                  <span className={styles.offerLabel}>Desconto</span>
                  <strong className={styles.offerStat} style={{ color: selectedOffer.desconto > 0 ? '#d32f2f' : '#666' }}>
                    {selectedOffer.desconto > 0 ? `-${selectedOffer.desconto}%` : 'Sem desconto'}
                  </strong>
                </div>
              </div>

              <div className={styles.offerDetailsGrid}>
                <div className={styles.offerDetailBox}>
                  <span className={styles.offerLabel}>Quantidade disponível</span>
                  <strong className={styles.offerDetail}>📦 {selectedOffer.quantidade} unidades</strong>
                </div>
                <div className={styles.offerDetailBox}>
                  <span className={styles.offerLabel}>Entrega</span>
                  <strong className={styles.offerDetail} style={{ color: selectedOffer.frete === 'Frete grátis' ? '#2e7d32' : '#666' }}>
                    {selectedOffer.frete}
                  </strong>
                </div>
              </div>
              
              <div className={styles.offerPricingGrid}>
                <div className={styles.offerPricingBox}>
                  <span className={styles.offerLabel}>Preço mínimo</span>
                  <strong className={styles.offerPrice}>R$ {selectedOffer.priceMin.toFixed(2)}</strong>
                </div>
                <div className={styles.offerPricingBox}>
                  <span className={styles.offerLabel}>Preço sugerido</span>
                  <strong className={styles.offerPrice}>R$ {selectedOffer.priceIdeal.toFixed(2)}</strong>
                </div>
              </div>

              <div className={styles.offerActions}>
                <button 
                  type="button" 
                  className={styles.offerActionButton} 
                  onClick={() => handleScheduleDelivery(selectedOffer)}
                  disabled={selectedOffer.quantidade === 0}
                >
                  Agendar entrega
                </button>
                <button type="button" className={styles.offerActionButtonOutline} onClick={() => setSelectedOffer(null)}>Fechar</button>
              </div>
              {feedback && <p className={styles.offerFeedback}>{feedback}</p>}
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
