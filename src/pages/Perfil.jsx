import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import Modal from '../components/Modal';
import styles from '../styles/Perfil.module.css';

export default function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState([
    {
      id: 1,
      nome: 'Milho Premium',
      tipo: 'Grão',
      quantidade: '500 sacas',
      preco: 'R$ 85/saca',
      dataAdd: '15 Mar 2026',
      icon: '🌾',
      status: 'Disponível',
    },
    {
      id: 2,
      nome: 'Soja Transgênica',
      tipo: 'Grão',
      quantidade: '800 sacas',
      preco: 'R$ 120/saca',
      dataAdd: '12 Mar 2026',
      icon: '🟩',
      status: 'Disponível',
    },
    {
      id: 3,
      nome: 'Feijão Carioca',
      tipo: 'Leguminosa',
      quantidade: '200 sacas',
      preco: 'R$ 180/saca',
      dataAdd: '08 Mar 2026',
      icon: '🫘',
      status: 'Quase Esgotado',
    },
  ]);

  const [historico, setHistorico] = useState([
    { id: 1, acao: 'Novo produto adicionado', produto: 'Milho Premium', data: '15 Mar 2026 14:30' },
    { id: 2, acao: 'Preço atualizado', produto: 'Soja Transgênica', data: '12 Mar 2026 10:15' },
    { id: 3, acao: 'Contato recebido', produto: 'Feijão Carioca', data: '10 Mar 2026 09:45' },
    { id: 4, acao: 'Novo produto adicionado', produto: 'Soja Transgênica', data: '09 Mar 2026 16:20' },
    { id: 5, acao: 'Perfil atualizado', produto: 'Dados pessoais', data: '01 Mar 2026 11:00' },
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    tipo: 'Grão',
    quantidade: '',
    preco: '',
  });

  const tipos = ['Grão', 'Leguminosa', 'Hortaliça', 'Frutícola', 'Outro'];
  const icones = ['🌾', '🟩', '🥕', '🍎', '📦'];

  const handleAbrirModal = () => {
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false);
    setNovoProduto({ nome: '', tipo: 'Grão', quantidade: '', preco: '' });
  };

  const handleAdicionarProduto = () => {
    if (!novoProduto.nome || !novoProduto.quantidade || !novoProduto.preco) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const tipoIndex = tipos.indexOf(novoProduto.tipo);
    const novoId = Math.max(...produtos.map(p => p.id), 0) + 1;

    const produtoNovo = {
      id: novoId,
      nome: novoProduto.nome,
      tipo: novoProduto.tipo,
      quantidade: novoProduto.quantidade,
      preco: novoProduto.preco,
      dataAdd: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
      icon: icones[tipoIndex],
      status: 'Disponível',
    };

    setProdutos([produtoNovo, ...produtos]);
    
    // Adicionar ao histórico
    const novoHistorico = {
      id: Math.max(...historico.map(h => h.id), 0) + 1,
      acao: 'Novo produto adicionado',
      produto: novoProduto.nome,
      data: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR'),
    };
    setHistorico([novoHistorico, ...historico]);

    handleFecharModal();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Layout>
      <div className={styles.pageBackground}>
        <div className={styles.container}>
          {/* Header do Perfil */}
          <div className={styles.profileHeader}>
            <div className={styles.profileLeft}>
              <div className={styles.profileAvatar}>👨‍🌾</div>
              <div className={styles.profileInfo}>
                <h1 className={styles.profileName}>{user?.nome || 'Usuário'}</h1>
                <p className={styles.profileLocation}>📍 Agro Justo</p>
                <p className={styles.profileContact}>
                  📧 {user?.email || 'email@exemplo.com'}
                </p>
              </div>
            </div>
            <div className={styles.profileActions}>
              <Button
                variant="danger"
                onClick={handleLogout}
                style={{ marginBottom: '1rem' }}
              >
                🚪 Sair
              </Button>
              <div className={styles.profileStats}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>{produtos.length}</div>
                  <div className={styles.statLabel}>Produtos</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>{historico.length}</div>
                  <div className={styles.statLabel}>Atividades</div>
                </div>
              </div>
            </div>
          </div>

          {/* Seção de Produtos */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>📦 Produtos Cadastrados</h2>
              <Button 
                variant="primary"
                onClick={handleAbrirModal}
              >
                + Adicionar Produto
              </Button>
            </div>

            {produtos.length > 0 ? (
              <div className={styles.productsGrid}>
                {produtos.map(produto => (
                  <div key={produto.id} className={styles.productCard}>
                    <div className={styles.cardHeader}>
                      <span className={styles.productIcon}>{produto.icon}</span>
                      <span className={`${styles.statusBadge} ${styles[`status-${produto.status === 'Disponível' ? 'disponivel' : 'alerta'}`]}`}>
                        {produto.status}
                      </span>
                    </div>

                    <h3 className={styles.productName}>{produto.nome}</h3>
                    
                    <div className={styles.productDetails}>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Tipo:</span>
                        <span className={styles.detailValue}>{produto.tipo}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Quantidade:</span>
                        <span className={styles.detailValue}>{produto.quantidade}</span>
                      </div>
                    </div>

                    <div className={styles.productPrice}>{produto.preco}</div>

                    <div className={styles.productFooter}>
                      <span className={styles.productDate}>Adicionado: {produto.dataAdd}</span>
                      <Button
                        variant="danger"
                        size="sm"
                        icon="🗑️"
                        onClick={() => handleRemoverProduto(produto.id)}
                        title="Remover produto"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📭</div>
                <p>Nenhum produto cadastrado ainda</p>
                <Button 
                  variant="primary"
                  onClick={handleAbrirModal}
                >
                  Adicionar primeiro produto
                </Button>
              </div>
            )}
          </div>

          {/* Seção de Histórico */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>📋 Histórico de Atividades</h2>
            
            {historico.length > 0 ? (
              <div className={styles.historyList}>
                {historico.map((item) => (
                  <div key={item.id} className={styles.historyItem}>
                    <div className={styles.historyDot}></div>
                    <div className={styles.historyContent}>
                      <span className={styles.historyAction}>{item.acao}</span>
                      <span className={styles.historyProduct}>{item.produto}</span>
                    </div>
                    <span className={styles.historyDate}>{item.data}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>Nenhuma atividade registrada</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Adicionar Produto */}
      <Modal
        isOpen={modalAberto}
        onClose={handleFecharModal}
        title="🏷️ Novo Produto"
        size="md"
        footer={
          <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
            <Button 
              variant="secondary"
              onClick={handleFecharModal}
              style={{ flex: 1 }}
            >
              Cancelar
            </Button>
            <Button 
              variant="primary"
              onClick={handleAdicionarProduto}
              style={{ flex: 1 }}
            >
              ✓ Adicionar
            </Button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ 
              display: 'block', 
              color: '#2e7d32', 
              fontWeight: 600, 
              marginBottom: '0.6rem',
              fontSize: '0.95rem'
            }}>
              Nome do Produto *
            </label>
            <input
              type="text"
              placeholder="Ex: Milho Premium"
              value={novoProduto.nome}
              onChange={(e) => setNovoProduto({...novoProduto, nome: e.target.value})}
              style={{
                width: '100%',
                padding: '0.8rem',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              color: '#2e7d32', 
              fontWeight: 600, 
              marginBottom: '0.6rem',
              fontSize: '0.95rem'
            }}>
              Tipo *
            </label>
            <select
              value={novoProduto.tipo}
              onChange={(e) => setNovoProduto({...novoProduto, tipo: e.target.value})}
              style={{
                width: '100%',
                padding: '0.8rem',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            >
              {tipos.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              color: '#2e7d32', 
              fontWeight: 600, 
              marginBottom: '0.6rem',
              fontSize: '0.95rem'
            }}>
              Quantidade *
            </label>
            <input
              type="text"
              placeholder="Ex: 500 sacas"
              value={novoProduto.quantidade}
              onChange={(e) => setNovoProduto({...novoProduto, quantidade: e.target.value})}
              style={{
                width: '100%',
                padding: '0.8rem',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              color: '#2e7d32', 
              fontWeight: 600, 
              marginBottom: '0.6rem',
              fontSize: '0.95rem'
            }}>
              Preço *
            </label>
            <input
              type="text"
              placeholder="Ex: R$ 85/saca"
              value={novoProduto.preco}
              onChange={(e) => setNovoProduto({...novoProduto, preco: e.target.value})}
              style={{
                width: '100%',
                padding: '0.8rem',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>
      </Modal>
    </Layout>
  );
}
