import { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import Modal from '../components/Modal';
import styles from '../styles/Aluguel.module.css';
import farmerImage from '../assets/images/farmer-working.jpg';

export default function Aluguel() {
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [modalAberto, setModalAberto] = useState(false);
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);
  const [diasAluguel, setDiasAluguel] = useState(1);
  const [aluguelConfirmado, setAluguelConfirmado] = useState(false);
  const [dataInicio, setDataInicio] = useState('');

  // Dados de equipamentos
  const equipamentos = [
    {
      id: 1,
      nome: 'Trator 100 CV',
      tipo: 'trator',
      preco: 450,
      icon: '🚜',
      cor: '#FFB74D',
      descricao: 'Trator potente para trabalhos de aração e transporte',
      disponivel: true,
    },
    {
      id: 2,
      nome: 'Arado 3 Discos',
      tipo: 'arado',
      preco: 200,
      icon: '⛏️',
      cor: '#81C784',
      descricao: 'Arado ideal para preparação do solo',
      disponivel: true,
    },
    {
      id: 3,
      nome: 'Colheitadeira CR 8',
      tipo: 'colheitadeira',
      preco: 800,
      icon: '🌾',
      cor: '#FFB300',
      descricao: 'Colheitadeira moderna com tecnologia de ponta',
      disponivel: true,
    },
    {
      id: 4,
      nome: 'Plantadeira Pneumática',
      tipo: 'plantadeira',
      preco: 300,
      icon: '🌱',
      cor: '#4CAF50',
      descricao: 'Plantadeira de precisão para sementes',
      disponivel: true,
    },
    {
      id: 5,
      nome: 'Pulverizador 400L',
      tipo: 'pulverizador',
      preco: 150,
      icon: '💨',
      cor: '#29B6F6',
      descricao: 'Pulverizador com tanque de 400 litros',
      disponivel: true,
    },
    {
      id: 6,
      nome: 'Grade Aradora',
      tipo: 'arado',
      preco: 250,
      icon: '⚙️',
      cor: '#757575',
      descricao: 'Grade aradora para nivelamento de solo',
      disponivel: false,
    },
    {
      id: 7,
      nome: 'Trator Compacto 60 CV',
      tipo: 'trator',
      preco: 300,
      icon: '🚜',
      cor: '#FFB74D',
      descricao: 'Trator compacto para pequenas propriedades',
      disponivel: true,
    },
    {
      id: 8,
      nome: 'Distribuidora de Esterco',
      tipo: 'acessorio',
      preco: 180,
      icon: '🔄',
      cor: '#A1887F',
      descricao: 'Distribuidora para espalhamento de esterco',
      disponivel: true,
    },
  ];

  const tipos = [
    { valor: 'todos', label: 'Todos os Equipamentos' },
    { valor: 'trator', label: '🚜 Tratores' },
    { valor: 'arado', label: '⛏️ Arados' },
    { valor: 'colheitadeira', label: '🌾 Colheitadeiras' },
    { valor: 'plantadeira', label: '🌱 Plantadeiras' },
    { valor: 'pulverizador', label: '💨 Pulverizadores' },
    { valor: 'acessorio', label: '⚙️ Acessórios' },
  ];

  // Filtrar equipamentos
  const equipamentosFiltrados = equipamentos.filter(equip => {
    const matchBusca = equip.nome.toLowerCase().includes(busca.toLowerCase()) ||
                      equip.descricao.toLowerCase().includes(busca.toLowerCase());
    const matchTipo = filtroTipo === 'todos' || equip.tipo === filtroTipo;
    return matchBusca && matchTipo;
  });

  const abrirModal = (equip) => {
    setEquipamentoSelecionado(equip);
    setModalAberto(true);
    setAluguelConfirmado(false);
    setDiasAluguel(1);
    setDataInicio(new Date().toISOString().split('T')[0]);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setEquipamentoSelecionado(null);
    setAluguelConfirmado(false);
  };

  const confirmarAluguel = () => {
    if (dataInicio && diasAluguel > 0) {
      setAluguelConfirmado(true);
      setTimeout(fecharModal, 3000);
    }
  };

  const precoTotal = equipamentoSelecionado ? equipamentoSelecionado.preco * diasAluguel : 0;

  return (
    <Layout>
      <div className={styles.pageBackground} style={{
        backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(46, 125, 50, 0.5) 100%), url(${farmerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <h1>🏪 Marketplace de Equipamentos</h1>
            <p>Alugue equipamentos agrícolas de qualidade com preços justo</p>
          </div>

          {/* Barra de Busca e Filtros */}
          <div className={styles.searchFilterBar}>
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="🔍 Buscar equipamentos..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.filterBox}>
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className={styles.filterSelect}
              >
                {tipos.map(tipo => (
                  <option key={tipo.valor} value={tipo.valor}>
                    {tipo.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.resultCount}>
              {equipamentosFiltrados.length} equipamento(s) encontrado(s)
            </div>
          </div>

          {/* Grid de Cards */}
          <div className={styles.cardsGrid}>
            {equipamentosFiltrados.length > 0 ? (
              equipamentosFiltrados.map(equip => (
                <div key={equip.id} className={styles.card}>
                  <div 
                    className={styles.cardImage}
                    style={{ backgroundColor: equip.cor }}
                  >
                    <div className={styles.equipmentIcon}>{equip.icon}</div>
                    {!equip.disponivel && (
                      <div className={styles.indisponivel}>Indisponível</div>
                    )}
                  </div>

                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{equip.nome}</h3>
                    <p className={styles.cardDescription}>{equip.descricao}</p>
                    
                    <div className={styles.cardPrice}>
                      <span className={styles.priceLabel}>Por dia:</span>
                      <span className={styles.priceValue}>
                        R$ {equip.preco.toLocaleString('pt-BR')}
                      </span>
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
                </div>

                <div className={styles.modalButtons}>
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
