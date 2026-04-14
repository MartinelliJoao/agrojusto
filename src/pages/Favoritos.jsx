import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { generateProdutos, generateEquipamentos } from '../utils/generateMarketplaceData';
import styles from '../styles/Page.module.css';

const PRODUCT_STORAGE_KEY = 'agrojusto-favorites';
const EQUIPMENT_STORAGE_KEY = 'agrojusto-favorites-aluguel';

const produtos = generateProdutos();
const equipamentos = generateEquipamentos();

export default function Favoritos() {
  const [productFavorites, setProductFavorites] = useState(() => {
    const stored = window.localStorage.getItem(PRODUCT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [equipmentFavorites, setEquipmentFavorites] = useState(() => {
    const stored = window.localStorage.getItem(EQUIPMENT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    window.localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(productFavorites));
  }, [productFavorites]);

  useEffect(() => {
    window.localStorage.setItem(EQUIPMENT_STORAGE_KEY, JSON.stringify(equipmentFavorites));
  }, [equipmentFavorites]);

  const toggleProductFavorite = (id) => {
    setProductFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const toggleEquipmentFavorite = (id) => {
    setEquipmentFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const favoriteProducts = produtos.filter((product) => productFavorites.includes(product.id));
  const favoriteEquipments = equipamentos.filter((equip) => equipmentFavorites.includes(equip.id));

  return (
    <Layout>
      <section className={styles.pageSection}>
        <div className={styles.pageHeader}>
          <p className={styles.pageOverline}>Favoritos</p>
          <h1 className={styles.pageTitle}>Seus itens favoritos</h1>
          <p className={styles.pageSubtitle}>
            Aqui você encontra os produtos e máquinas que marcou com coração nas abas de marketplace.
          </p>
        </div>

        <div className={styles.pageIntroRow}>
          <div>
            <p className={styles.metricLabel}>Itens favoritados</p>
            <strong>{favoriteProducts.length + favoriteEquipments.length}</strong>
          </div>
          <p className={styles.pageSubtitle}>
            Remova favoritos diretamente desta página para manter sua lista atualizada.
          </p>
        </div>

        <div className={styles.favoriteListSection}>
          <h2>Produtos favoritos</h2>
          {favoriteProducts.length > 0 ? (
            <div className={styles.favoriteList}>
              {favoriteProducts.map((product) => (
                <div key={product.id} className={styles.favoriteItem}>
                  <span>🌾</span>
                  <div>
                    <strong>{product.nome}</strong>
                    <p>{product.description}</p>
                  </div>
                  <button
                    type="button"
                    className={`${styles.favoriteButton} ${styles.favoriteActive}`}
                    onClick={() => toggleProductFavorite(product.id)}
                    aria-label="Remover produto dos favoritos"
                  >
                    ♥
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noFavorites}>Nenhum produto favoritado ainda.</p>
          )}
        </div>

        <div className={styles.favoriteListSection}>
          <h2>Máquinas favoritas</h2>
          {favoriteEquipments.length > 0 ? (
            <div className={styles.favoriteList}>
              {favoriteEquipments.map((equip) => (
                <div key={equip.id} className={styles.favoriteItem}>
                  <span>🚜</span>
                  <div>
                    <strong>{equip.nome}</strong>
                    <p>{equip.marca} • {equip.tipo}</p>
                  </div>
                  <button
                    type="button"
                    className={`${styles.favoriteButton} ${styles.favoriteActive}`}
                    onClick={() => toggleEquipmentFavorite(equip.id)}
                    aria-label="Remover máquina dos favoritos"
                  >
                    ♥
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noFavorites}>Nenhuma máquina favoritada ainda.</p>
          )}
        </div>
      </section>
    </Layout>
  );
}
