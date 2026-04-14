import { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import Modal from '../components/Modal';
import styles from '../styles/Aluguel.module.css';
import marketplaceStyles from '../styles/Marketplace.module.css';
import { generateEquipamentos, getImage } from '../utils/generateMarketplaceData';
import farmerImage from '../assets/images/farmer-working.jpg';

export default function Aluguel() {
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroMarca, setFiltroMarca] = useState('todas');
  const [modalAberto, setModalAberto] = useState(false);
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);
  const [diasAluguel, setDiasAluguel] = useState(1);
  const [aluguelConfirmado, setAluguelConfirmado] = useState(false);
  const [dataInicio, setDataInicio] = useState('');
  const [calculoRealizado, setCalculoRealizado] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('agrojusto-favorites-aluguel');
    return saved ? JSON.parse(saved) : [];
  });

  const fallbackImage = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=500&q=60';

  const toggleFavorite = (equipId) => {
    setFavorites((prev) => {
      const updated = prev.includes(equipId)
        ? prev.filter((id) => id !== equipId)
        : [...prev, equipId];
      localStorage.setItem('agrojusto-favorites-aluguel', JSON.stringify(updated));
      return updated;
    });
  };

  // Gera 80 equipamentos automaticamente
  const equipamentos = generateEquipamentos();

  const tipos = [
    { valor: 'todos', label: 'Todos os Equipamentos' },
    { valor: 'trator', label: '🚜 Tratores' },
    { valor: 'arado', label: '⛏️ Arados' },
    { valor: 'grade', label: '⚙️ Grades' },
    { valor: 'plantadeira', label: '🌱 Plantadeiras' },
    { valor: 'pulverizador', label: '💨 Pulverizadores' },
    { valor: 'colheitadeira', label: '🌾 Colheitadeiras' },
    { valor: 'distribuidor', label: '🔄 Distribuidores' },
    { valor: 'carroceria', label: '📦 Carrocerias' },
    { valor: 'ensiladeira', label: '📋 Ensiladeiras' },
    { valor: 'acessorio', label: '⚙️ Acessórios' },
  ];

  // Extrai marcas únicas dos equipamentos gerados
  const marcas = ['todas', ...new Set(equipamentos.map(e => e.marca))];

  // Equipamentos em destaque (mais alugados)
  const featuredEquipamentos = [...equipamentos]
    .sort((a, b) => b.alugueis - a.alugueis)
    .slice(0, 6);

  const equipamentosFiltrados = equipamentos.filter(equip => {
    const matchBusca = equip.nome.toLowerCase().includes(busca.toLowerCase()) ||
                      equip.marca.toLowerCase().includes(busca.toLowerCase());
    const matchTipo = filtroTipo === 'todos' || equip.tipo === filtroTipo;
    const matchMarca = filtroMarca === 'todas' || equip.marca === filtroMarca;
    return matchBusca && matchTipo && matchMarca;
  });

  const abrirModal = (equip) => {
    setEquipamentoSelecionado(equip);
    setModalAberto(true);
    setAluguelConfirmado(false);
    setCalculoRealizado(false);
    setDiasAluguel(1);
    setDataInicio(new Date().toISOString().split('T')[0]);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setEquipamentoSelecionado(null);
    setAluguelConfirmado(false);
  };

  const confirmarAluguel = () => {
    if (dataInicio && diasAluguel > 0 && equipamentoSelecionado) {
      // Salvar no histórico
      const history = JSON.parse(localStorage.getItem('agrojusto-history') || '[]');
      const entry = {
        id: Date.now(),
        type: 'Máquina alugada',
        name: equipamentoSelecionado.nome,
        category: 'Aluguel',
        date: new Date().toLocaleDateString('pt-BR'),
        value: `R$ ${precoTotal.toLocaleString('pt-BR')}`,
      };
      history.unshift(entry);
      localStorage.setItem('agrojusto-history', JSON.stringify(history));
      
      setAluguelConfirmado(true);
      setTimeout(fecharModal, 3000);
    }
  };

  const precoTotal = equipamentoSelecionado ? equipamentoSelecionado.preco * diasAluguel : 0;

  const calcularAluguel = () => {
    if (dataInicio && diasAluguel > 0) {
      setCalculoRealizado(true);
    }
  };

  return (
    <Layout>
      <div className={styles.pageRental}>
        <div className={styles.pageHeader}>
          <p className={styles.pageOverline}>Equipamentos</p>
          <h1 className={styles.pageTitle}>Aluguel de máquinas agrícolas</h1>
          <p className={styles.pageSubtitle}>
            Acesse um catálogo completo de equipamentos de marcas líderes. Filtre por tipo e marca para encontrar a máquina perfeita.
          </p>
        </div>

      {/* SEÇÃO DE DESTAQUE - MAIS ALUGADOS */}
      <section className={marketplaceStyles.featuredSection}>
        <div className={marketplaceStyles.featuredHeader}>
          <h2 className={marketplaceStyles.featuredTitle}>⭐ Equipamentos mais alugados</h2>
          <p className={marketplaceStyles.featuredSubtitle}>Máquinas mais procuradas pelos agricultores</p>
        </div>
        <div className={marketplaceStyles.featuredGrid}>
          {featuredEquipamentos.map((equip) => (
            <div key={equip.id} className={marketplaceStyles.featuredCard} onClick={() => abrirModal(equip)}>
              <div className={marketplaceStyles.featuredImageWrapper}>
                <img src={getImage(equip)} alt={equip.nome} className={marketplaceStyles.featuredImage} onError={(e) => { e.target.src = fallbackImage; }} />
                {equip.desconto > 0 && (
                  <div className={marketplaceStyles.discountBadge}>-{equip.desconto}%</div>
                )}
                <button
                  type="button"
                  className={marketplaceStyles.favoriteButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(equip.id);
                  }}
                  title={favorites.includes(equip.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                >
                  {favorites.includes(equip.id) ? '❤️' : '🤍'}
                </button>
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
                <button type="button" className={marketplaceStyles.featuredButton} disabled={!equip.disponivel}>
                  {equip.disponivel ? '🎯 Alugar' : '❌ Indisponível'}
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
              type="text"
              placeholder="Nome ou marca"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className={marketplaceStyles.sidebarSearchInput}
            />
            </div>

            <div className={marketplaceStyles.filterSection}>
              <h3 className={marketplaceStyles.filterTitle}>🛠️ Tipo</h3>
              <div className={marketplaceStyles.filterOptions}>
                <label className={marketplaceStyles.filterLabel}>
                  <input
                    type="radio"
                    name="tipo"
                    value="todos"
                    checked={filtroTipo === 'todos'}
                    onChange={(e) => setFiltroTipo(e.target.value)}
                    className={marketplaceStyles.filterRadio}
                  />
                  <span>Todos os tipos</span>
                </label>
                {tipos.map(tipo => (
                  <label key={tipo.valor} className={marketplaceStyles.filterLabel}>
                    <input
                      type="radio"
                      name="tipo"
                      value={tipo.valor}
                      checked={filtroTipo === tipo.valor}
                      onChange={(e) => setFiltroTipo(e.target.value)}
                      className={marketplaceStyles.filterRadio}
                    />
                    <span>{tipo.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={marketplaceStyles.filterSection}>
              <h3 className={marketplaceStyles.filterTitle}>🏭 Marca</h3>
              <select 
                value={filtroMarca} 
                onChange={(e) => setFiltroMarca(e.target.value)} 
                className={marketplaceStyles.filterSelectSidebar}
              >
                {marcas.map(marca => (
                  <option key={marca} value={marca}>
                    {marca === 'todas' ? 'Todas as marcas' : marca}
                  </option>
                ))}
              </select>
            </div>

            <button 
              onClick={() => {
                setBusca('');
                setFiltroTipo('todos');
                setFiltroMarca('todas');
              }}
              className={marketplaceStyles.filterResetButton}
            >
              Limpar filtros
            </button>
          </aside>

          {/* CONTEÚDO PRINCIPAL */}
          <div className={marketplaceStyles.marketplaceContent}>
            <div className={marketplaceStyles.resultsSummary}>
              <h2>{equipamentosFiltrados.length} equipamentos encontrados</h2>
              <p>Disponível para aluguel imediato</p>
            </div>

            <div className={marketplaceStyles.cardsGrid}>
            {equipamentosFiltrados.length > 0 ? (
              equipamentosFiltrados.map(equip => (
                <div key={equip.id} className={styles.card}>
                  <div className={styles.cardImage}>
                    <img 
                      src={getImage(equip)} 
                      alt={equip.nome}
                      className={styles.cardImageImg}
                      onError={(e) => { e.target.src = fallbackImage; }}
                    />
                    {equip.desconto > 0 && (
                      <div className={marketplaceStyles.discountBadge}>-{equip.desconto}%</div>
                    )}
                    {!equip.disponivel && (
                      <div className={styles.indisponivel}>Indisponível</div>
                    )}
                    <button
                      type="button"
                      className={marketplaceStyles.favoriteButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(equip.id);
                      }}
                      title={favorites.includes(equip.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    >
                      {favorites.includes(equip.id) ? '❤️' : '🤍'}
                    </button>
                  </div>

                  <div className={styles.cardContent}>
                    <div className={`${styles.availabilityBadge} ${equip.disponivel ? styles.available : styles.unavailable}`}>
                      {equip.disponivel ? '✓ Disponível' : '✕ Indisponível'}
                    </div>
                    <p className={styles.cardMarca}>{equip.marca}</p>
                    <h3 className={styles.cardTitle}>{equip.nome}</h3>
                    
                    <div className={styles.cardRating}>
                      <span>⭐ {equip.rating}</span>
                      <span className={styles.rentalCount}>({equip.alugueis})</span>
                    </div>
                    <p className={styles.cardFrete}>{equip.frete}</p>
                    
                    <div className={styles.cardPrice}>
                      <span className={styles.priceLabel}>R$ {equip.preco.toLocaleString('pt-BR')}/dia</span>
                    </div>

                    <button
                      className={`${styles.rentButton} ${!equip.disponivel ? styles.rentButtonDisabled : ''}`}
                      onClick={() => abrirModal(equip)}
                      disabled={!equip.disponivel}
                    >
                      {equip.disponivel ? '🎯 Alugar Agora' : '❌ Indisponível'}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <div className={styles.noResultsIcon}>🔍</div>
                <p>Nenhum equipamento encontrado</p>
                <p className={styles.noResultsSubtext}>Tente ajustar seus critérios de busca</p>
              </div>
            )}
          </div>
            </div>
          </div>
        </div>

      {/* Modal */}
      {modalAberto && equipamentoSelecionado && (
        <div className={styles.modalOverlay} onClick={fecharModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {aluguelConfirmado ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✅</div>
                <h2>Aluguel Confirmado!</h2>
                <p>Seu aluguel de <strong>{equipamentoSelecionado.nome}</strong> foi confirmado com sucesso.</p>
                <div className={styles.successDetails}>
                  <div className={styles.detailRow}>
                    <span>Data de início:</span>
                    <strong>{new Date(dataInicio).toLocaleDateString('pt-BR')}</strong>
                  </div>
                  <div className={styles.detailRow}>
                    <span>Duração:</span>
                    <strong>{diasAluguel} dia(s)</strong>
                  </div>
                  <div className={styles.detailRow}>
                    <span>Total:</span>
                    <strong>R$ {precoTotal.toLocaleString('pt-BR')}</strong>
                  </div>
                </div>
                <p className={styles.successFooter}>Você receberá um e-mail com os detalhes</p>
              </div>
            ) : (
              <>
                <button className={styles.closeButton} onClick={fecharModal}>✕</button>

                <div className={styles.modalHeader}>
                  <div 
                    className={styles.modalImage}
                    style={{ backgroundColor: equipamentoSelecionado.cor }}
                  >
                    <div className={styles.largeIcon}>{equipamentoSelecionado.icon}</div>
                  </div>
                  <div>
                    <h2>{equipamentoSelecionado.nome}</h2>
                    <p className={styles.modalDescription}>{equipamentoSelecionado.descricao}</p>
                  </div>
                </div>

                <div className={styles.modalForm}>
                  <div className={styles.formGroup}>
                    <label>📅 Data de Início</label>
                    <input
                      type="date"
                      value={dataInicio}
                      onChange={(e) => setDataInicio(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>⏱️ Número de Dias</label>
                    <div className={styles.daysSelector}>
                      <button 
                        className={styles.dayChangeBtn}
                        onClick={() => setDiasAluguel(Math.max(1, diasAluguel - 1))}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={diasAluguel}
                        onChange={(e) => setDiasAluguel(Math.max(1, parseInt(e.target.value) || 1))}
                      />
                      <button 
                        className={styles.dayChangeBtn}
                        onClick={() => setDiasAluguel(diasAluguel + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.modalSummary}>
                  <div className={styles.summaryRow}>
                    <span>Valor diário:</span>
                    <span>R$ {equipamentoSelecionado.preco.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Dias:</span>
                    <span>{diasAluguel}</span>
                  </div>
                  <div className={styles.summaryRow + ' ' + styles.summaryTotal}>
                    <span>Total:</span>
                    <span>R$ {precoTotal.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className={styles.calcNote}>
                    {calculoRealizado ? 'Cálculo realizado para a data selecionada.' : 'Clique em Calcular aluguel para confirmar o valor.'}
                  </div>
                </div>

                <div className={styles.modalButtons}>
                  <button 
                    type="button"
                    className={styles.modalCalculateBtn}
                    onClick={calcularAluguel}
                  >
                    Calcular aluguel
                  </button>
                  <button 
                    className={styles.modalCancelBtn}
                    onClick={fecharModal}
                  >
                    Cancelar
                  </button>
                  <button 
                    className={styles.modalConfirmBtn}
                    onClick={confirmarAluguel}
                  >
                    ✓ Confirmar Aluguel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
