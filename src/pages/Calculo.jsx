import { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import styles from '../styles/Calculo.module.css';
import tractorImage from '../assets/images/tractor-machinery.jpg';

// Fix para ícones do Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Ícones customizados
const producerIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const consumerIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Calculo() {
  const [formData, setFormData] = useState({
    insumos: '',
    maoDeObra: '',
    transporte: '',
    distancia: '',
    custoPorKm: '5',
    quantidade: '',
    demanda: 'media',
  });

  const [resultado, setResultado] = useState(null);
  const [erros, setErros] = useState({});
  const [locacoes, setLocacoes] = useState({
    producer: [-15.7975, -47.8919], // Brasília
    consumer: [-15.7733, -47.8855],
  });

  // Calcular distância entre dois pontos (fórmula de Haversine simulada)
  const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  const distanciaCalculada = calcularDistancia(
    locacoes.producer[0],
    locacoes.producer[1],
    locacoes.consumer[0],
    locacoes.consumer[1]
  );

  const campos = [
    { name: 'insumos', label: 'Insumos', icon: '🌾', placeholder: 'Ex: 5000', type: 'number' },
    { name: 'maoDeObra', label: 'Mão de Obra', icon: '👷', placeholder: 'Ex: 3000', type: 'number' },
    { name: 'transporte', label: 'Transporte', icon: '🚛', placeholder: 'Ex: 1500', type: 'number' },
    { name: 'custoPorKm', label: 'Custo por km', icon: '💰', placeholder: 'Ex: 25', type: 'number' },
    { name: 'quantidade', label: 'Quantidade', icon: '📊', placeholder: 'Ex: 100', type: 'number' },
  ];

  const validarCampos = () => {
    const novosErros = {};
    if (!formData.insumos || formData.insumos <= 0) novosErros.insumos = true;
    if (!formData.maoDeObra || formData.maoDeObra <= 0) novosErros.maoDeObra = true;
    if (!formData.quantidade || formData.quantidade <= 0) novosErros.quantidade = true;
    return novosErros;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? '' : (name === 'demanda' ? value : parseFloat(value)),
    }));
    if (erros[name]) {
      setErros(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleMapClick = (e, tipo) => {
    const { lat, lng } = e.latlng;
    setLocacoes(prev => ({
      ...prev,
      [tipo]: [lat, lng],
    }));
  };

  const calcular = () => {
    const novosErros = validarCampos();
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    const insumos = parseFloat(formData.insumos) || 0;
    const maoDeObra = parseFloat(formData.maoDeObra) || 0;
    const transporte = parseFloat(formData.transporte) || 0;
    const custoPorKm = parseFloat(formData.custoPorKm) || 0;
    const quantidade = parseFloat(formData.quantidade) || 1;
    const demanda = formData.demanda;

    // Cálculo de custos
    const custoTransporte = (parseFloat(distanciaCalculada) * custoPorKm) + transporte;
    const custoTotal = insumos + maoDeObra + custoTransporte;
    const custoUnitario = custoTotal / quantidade;

    // Margem de lucro baseada na demanda
    const margens = { baixa: 0.15, media: 0.25, alta: 0.35 };
    const margem = margens[demanda] || 0.25;

    const precoMinimo = custoUnitario * 1.05; // 5% de margem mínima
    const precoIdeal = custoUnitario * (1 + margem); // Margem baseada em demanda

    setResultado({
      precoMinimo: precoMinimo.toFixed(2),
      precoIdeal: precoIdeal.toFixed(2),
      custoUnitario: custoUnitario.toFixed(2),
      margem: (margem * 100).toFixed(0),
      distancia: distanciaCalculada,
      custoTransporteTotal: custoTransporte.toFixed(2),
    });
  };

  const limpar = () => {
    setFormData({
      insumos: '',
      maoDeObra: '',
      transporte: '',
      distancia: '',
      custoPorKm: '5',
      quantidade: '',
      demanda: 'media',
    });
    setResultado(null);
    setErros({});
  };

  const MapClickHandler = ({ onProducerClick, onConsumerClick }) => {
    const map = useMap();
    return null;
  };

  return (
    <Layout>
      <div className={styles.pageBackground} style={{
        backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(46, 125, 50, 0.6) 100%), url(${tractorImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.headerIcon}>💹</div>
            <h1>Calculadora de Preços</h1>
            <p>Calcule o preço justo baseado em seus custos, distância e demanda</p>
          </div>

          <div className={styles.mainGrid}>
            {/* Formulário */}
            <div className={styles.formSection}>
              <form className={styles.form} onSubmit={(e) => { e.preventDefault(); calcular(); }}>
                <div className={styles.fieldsGrid}>
                  {campos.map((campo) => (
                    <div key={campo.name} className={`${styles.formGroup} ${erros[campo.name] ? styles.formGroupError : ''}`}>
                      <label htmlFor={campo.name}>
                        <span className={styles.fieldIcon}>{campo.icon}</span>
                        {campo.label}
                      </label>
                      <input
                        type={campo.type}
                        id={campo.name}
                        name={campo.name}
                        value={formData[campo.name]}
                        onChange={handleChange}
                        placeholder={campo.placeholder}
                        step="0.01"
                        className={erros[campo.name] ? styles.inputError : ''}
                      />
                      {erros[campo.name] && <span className={styles.errorMsg}>Campo obrigatório</span>}
                    </div>
                  ))}

                  <div className={styles.formGroup}>
                    <label htmlFor="demanda">
                      <span className={styles.fieldIcon}>📈</span>
                      Demanda do Mercado
                    </label>
                    <select
                      id="demanda"
                      name="demanda"
                      value={formData.demanda}
                      onChange={handleChange}
                    >
                      <option value="baixa">Baixa (15% margem)</option>
                      <option value="media">Média (25% margem)</option>
                      <option value="alta">Alta (35% margem)</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="distanciaAuto">
                      <span className={styles.fieldIcon}>🗺️</span>
                      Distância (km) - Auto
                    </label>
                    <input
                      type="text"
                      id="distanciaAuto"
                      value={`${distanciaCalculada} km`}
                      disabled
                      className={styles.inputDisabled}
                    />
                  </div>
                </div>

                <div className={styles.mapInfoBox}>
                  <span>📍 Clique no mapa para ajustar as localizações</span>
                </div>

                <div className={styles.buttonGroup}>
                  <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                    ✓ Calcular
                  </button>
                  <button type="button" onClick={limpar} className={`${styles.btn} ${styles.btnSecondary}`}>
                    ↻ Limpar
                  </button>
                </div>
              </form>

              {resultado && (
                <div className={styles.resultsContainer}>
                  <h2 className={styles.resultsTitle}>Resultado do Cálculo</h2>
                  <div className={styles.resultsGrid}>
                    <div className={`${styles.resultCard} ${styles.resultCardMinimo}`}>
                      <div className={styles.resultIcon}>📉</div>
                      <div className={styles.resultLabel}>Preço Mínimo</div>
                      <div className={styles.resultValue}>
                        R$ {parseFloat(resultado.precoMinimo).toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                      <div className={styles.resultDescription}>Margem mínima para viabilidade</div>
                    </div>

                    <div className={`${styles.resultCard} ${styles.resultCardIdeal}`}>
                      <div className={styles.resultIcon}>📈</div>
                      <div className={styles.resultLabel}>Preço Ideal</div>
                      <div className={styles.resultValue}>
                        R$ {parseFloat(resultado.precoIdeal).toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                      <div className={styles.resultDescription}>
                        Margem de {resultado.margem}% recomendada
                      </div>
                    </div>
                  </div>

                  <div className={styles.resultInfo}>
                    <div className={styles.resultInfoRow}>
                      <span>Custo unitário:</span>
                      <strong>R$ {parseFloat(resultado.custoUnitario).toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}</strong>
                    </div>
                    <div className={styles.resultInfoRow}>
                      <span>Distância:</span>
                      <strong>{resultado.distancia} km</strong>
                    </div>
                    <div className={styles.resultInfoRow}>
                      <span>Custo de transporte:</span>
                      <strong>R$ {parseFloat(resultado.custoTransporteTotal).toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mapa */}
            <div className={styles.mapSection}>
              <div className={styles.mapHeader}>
                <h3>📍 Localização de Entrega</h3>
                <p>Clique no mapa para marcar produtor e consumidor</p>
              </div>
              <MapContainer
                center={[-15.7975, -47.8919]}
                zoom={14}
                className={styles.mapContainer}
                onClick={(e) => {
                  // Detectar qual marcador foi clicado alternativamente por UI
                }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                
                {/* Marcador do Produtor */}
                <Marker position={locacoes.producer} icon={producerIcon}>
                  <Popup>
                    <div className={styles.popupContent}>
                      <strong>🌾 Produtor</strong>
                      <p>Localização da produção</p>
                      <button
                        className={styles.popupBtn}
                        onClick={() => {
                          const lat = prompt('Latitude:', locacoes.producer[0]);
                          const lng = prompt('Longitude:', locacoes.producer[1]);
                          if (lat && lng) {
                            setLocacoes(prev => ({
                              ...prev,
                              producer: [parseFloat(lat), parseFloat(lng)],
                            }));
                          }
                        }}
                      >
                        Editar Localização
                      </button>
                    </div>
                  </Popup>
                </Marker>

                {/* Marcador do Consumidor */}
                <Marker position={locacoes.consumer} icon={consumerIcon}>
                  <Popup>
                    <div className={styles.popupContent}>
                      <strong>🏢 Consumidor</strong>
                      <p>Localização de entrega</p>
                      <button
                        className={styles.popupBtn}
                        onClick={() => {
                          const lat = prompt('Latitude:', locacoes.consumer[0]);
                          const lng = prompt('Longitude:', locacoes.consumer[1]);
                          if (lat && lng) {
                            setLocacoes(prev => ({
                              ...prev,
                              consumer: [parseFloat(lat), parseFloat(lng)],
                            }));
                          }
                        }}
                      >
                        Editar Localização
                      </button>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>

              <div className={styles.mapLegend}>
                <div className={styles.legendItem}>
                  <span className={styles.legendGreen}>●</span>
                  <span>Produtor</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendBlue}>●</span>
                  <span>Consumidor</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDistance}>↔</span>
                  <span>{distanciaCalculada} km</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
