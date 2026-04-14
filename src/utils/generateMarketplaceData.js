/**
 * Gerador Automático de Dados para Marketplace
 * Cria produtos agrícolas e equipamentos com informações realistas
 */

// Mapeamento centralizado de imagens reais específicas por palavra-chave
const imageMap = {
  // Grãos específicos
  arroz: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  feijao: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
  soja: "https://images.unsplash.com/photo-1615484477201-9c3f3c5b0e0c",
  milho: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc",
  trigo: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b",
  cevada: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b",
  aveia: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b",
  sorgo: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b",
  amendoim: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b",
  girassol: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b",
  canola: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b",
  centeio: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b",
  quinoa: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b",
  lentilha: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b",
  cafe: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e",

  // Verduras/Legumes específicos
  cenoura: "https://images.unsplash.com/photo-1582515073490-dc0b3c2d6c17",
  batata: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  cebola: "https://images.unsplash.com/photo-1582515073490-dc0b3c2d6c17",
  pepino: "https://images.unsplash.com/photo-1582515073490-dc0b3c2d6c17",
  abobrinha: "https://images.unsplash.com/photo-1582515073490-dc0b3c2d6c17",
  beterraba: "https://images.unsplash.com/photo-1582515073490-dc0b3c2d6c17",
  espinafre: "https://images.unsplash.com/photo-1551468747-edb7a7d43d18",
  brocolis: "https://images.unsplash.com/photo-1551468747-edb7a7d43d18",
  couve: "https://images.unsplash.com/photo-1551468747-edb7a7d43d18",
  repolho: "https://images.unsplash.com/photo-1551468747-edb7a7d43d18",
  rabanete: "https://images.unsplash.com/photo-1582515073490-dc0b3c2d6c17",
  abobora: "https://images.unsplash.com/photo-1582515073490-dc0b3c2d6c17",
  quiabo: "https://images.unsplash.com/photo-1582515073490-dc0b3c2d6c17",
  pimentao: "https://images.unsplash.com/photo-1582515073490-dc0b3c2d6c17",
  gengibre: "https://images.unsplash.com/photo-1582515073490-dc0b3c2d6c17",
  alface: "https://images.unsplash.com/photo-1551468747-edb7a7d43d18",
  tomate: "https://images.unsplash.com/photo-1561136594-7f68413a1760",

  // Frutas específicas
  banana: "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277",
  laranja: "https://images.unsplash.com/photo-1582515073490-39981397c445",
  maca: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
  manga: "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277",
  uva: "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277",
  abacaxi: "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277",
  melao: "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277",
  goiaba: "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277",
  mamao: "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277",
  kiwi: "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277",
  morango: "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277",
  limao: "https://images.unsplash.com/photo-1582515073490-39981397c445",
  pescego: "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277",
  melancia: "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277",
  framboesa: "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277",
  amora: "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277",
  mirtilo: "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277",
  cereja: "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277",

  // Equipamentos por marca
  "john deere": "https://images.unsplash.com/photo-1598514982846-1e62c0a7f7f0",
  "massey ferguson": "https://images.unsplash.com/photo-1603039039187-3c73a3b6c4d3",
  "new holland": "https://images.unsplash.com/photo-1581092334247-1f7d0d8a7b6d",
  "valtra": "https://images.unsplash.com/photo-1622396636133-ba43f812bc35",
  "case ih": "https://images.unsplash.com/photo-1601597111223-2b5c7a7f3c91",
  "claas": "https://images.unsplash.com/photo-1625246333195-78e3d2e7fbaf",
  "fendt": "https://images.unsplash.com/photo-1625246333195-78e3d2e7fbaf",
  "deutz": "https://images.unsplash.com/photo-1625246333195-78e3d2e7fbaf",
  "same": "https://images.unsplash.com/photo-1625246333195-78e3d2e7fbaf",
  "lander": "https://images.unsplash.com/photo-1625246333195-78e3d2e7fbaf",
  "kubota": "https://images.unsplash.com/photo-1625246333195-78e3d2e7fbaf",
  "versatil": "https://images.unsplash.com/photo-1625246333195-78e3d2e7fbaf",
  "femco": "https://images.unsplash.com/photo-1625246333195-78e3d2e7fbaf",
  "baldan": "https://images.unsplash.com/photo-1625246333195-78e3d2e7fbaf",
  "boere": "https://images.unsplash.com/photo-1625246333195-78e3d2e7fbaf",
  "jacto": "https://images.unsplash.com/photo-1625246333195-78e3d2e7fbaf",
  "herbicat": "https://images.unsplash.com/photo-1625246333195-78e3d2e7fbaf",
  "yto": "https://images.unsplash.com/photo-1625246333195-78e3d2e7fbaf",
  "eaton": "https://images.unsplash.com/photo-1625246333195-78e3d2e7fbaf",
  "pirelli": "https://images.unsplash.com/photo-1625246333195-78e3d2e7fbaf",
  "agrale": "https://images.unsplash.com/photo-1625246333195-78e3d2e7fbaf",
  "tatu": "https://images.unsplash.com/photo-1625246333195-78e3d2e7fbaf",
  "stara": "https://images.unsplash.com/photo-1625246333195-78e3d2e7fbaf",
  "matal": "https://images.unsplash.com/photo-1625246333195-78e3d2e7fbaf",
  "kemper": "https://images.unsplash.com/photo-1625246333195-78e3d2e7fbaf",
  "amazo": "https://images.unsplash.com/photo-1625246333195-78e3d2e7fbaf"
};

/**
 * Gera 50 produtos agrícolas com id, nome, tipo, marca, preço e imagem
 * @returns {Array} Array de 50 produtos
 */
export function generateProdutos() {
  const tipos = ['Grãos', 'Frutas', 'Verduras/Legumes'];
  const marcas = [
    'Embrapa', 'Corteva', 'Bayer', 'Syngenta', 'BASF',
    'Agrofruta', 'Verde Brasil', 'Hortifruti', 'Projeto Verde',
    'Agricultura Familiar', 'Agroexport', 'Conab', 'ABPA', 'ABIC',
    'Produtor Local', 'Cooperativa', 'Agropecuária Brasil'
  ];

  const produtosBase = [
    // Grãos (15)
    { nome: 'Arroz Integral', tipo: 'Grãos' },
    { nome: 'Feijão Carioca', tipo: 'Grãos' },
    { nome: 'Soja Premium', tipo: 'Grãos' },
    { nome: 'Milho Amarelo', tipo: 'Grãos' },
    { nome: 'Trigo de Moagem', tipo: 'Grãos' },
    { nome: 'Café Arábica', tipo: 'Grãos' },
    { nome: 'Cevada Maltada', tipo: 'Grãos' },
    { nome: 'Aveia em Flocos', tipo: 'Grãos' },
    { nome: 'Sorgo Granífero', tipo: 'Grãos' },
    { nome: 'Amendoim Descascado', tipo: 'Grãos' },
    { nome: 'Girassol Híbrido', tipo: 'Grãos' },
    { nome: 'Canola Certificada', tipo: 'Grãos' },
    { nome: 'Centeio Integral', tipo: 'Grãos' },
    { nome: 'Quinoa Orgânica', tipo: 'Grãos' },
    { nome: 'Lentilha Selecionada', tipo: 'Grãos' },
    // Frutas (18)
    { nome: 'Banana Cavendish', tipo: 'Frutas' },
    { nome: 'Laranja Pera', tipo: 'Frutas' },
    { nome: 'Maçã Gala', tipo: 'Frutas' },
    { nome: 'Manga Palmer', tipo: 'Frutas' },
    { nome: 'Uva Itália', tipo: 'Frutas' },
    { nome: 'Abacaxi Pérola', tipo: 'Frutas' },
    { nome: 'Melão Amarelo', tipo: 'Frutas' },
    { nome: 'Goiaba Vermelha', tipo: 'Frutas' },
    { nome: 'Mamão Formosa', tipo: 'Frutas' },
    { nome: 'Kiwi Premium', tipo: 'Frutas' },
    { nome: 'Morango Fresco', tipo: 'Frutas' },
    { nome: 'Limão Tahiti', tipo: 'Frutas' },
    { nome: 'Pêssego Doce', tipo: 'Frutas' },
    { nome: 'Melancia Vermelha', tipo: 'Frutas' },
    { nome: 'Framboesa Congelada', tipo: 'Frutas' },
    { nome: 'Amora Preta', tipo: 'Frutas' },
    { nome: 'Mirtilo Selvagem', tipo: 'Frutas' },
    { nome: 'Cereja Doce', tipo: 'Frutas' },
    // Verduras/Legumes (17)
    { nome: 'Alface Crespa', tipo: 'Verduras/Legumes' },
    { nome: 'Tomate Italiano', tipo: 'Verduras/Legumes' },
    { nome: 'Cenoura Nantes', tipo: 'Verduras/Legumes' },
    { nome: 'Batata Monalisa', tipo: 'Verduras/Legumes' },
    { nome: 'Cebola Roxa', tipo: 'Verduras/Legumes' },
    { nome: 'Pepino Europeu', tipo: 'Verduras/Legumes' },
    { nome: 'Abobrinha Verde', tipo: 'Verduras/Legumes' },
    { nome: 'Beterraba Doce', tipo: 'Verduras/Legumes' },
    { nome: 'Espinafre Fresco', tipo: 'Verduras/Legumes' },
    { nome: 'Brócolis Orgânico', tipo: 'Verduras/Legumes' },
    { nome: 'Couve Mineira', tipo: 'Verduras/Legumes' },
    { nome: 'Repolho Roxo', tipo: 'Verduras/Legumes' },
    { nome: 'Rabanete Vermelho', tipo: 'Verduras/Legumes' },
    { nome: 'Abóbora Moranga', tipo: 'Verduras/Legumes' },
    { nome: 'Quiabo Verde', tipo: 'Verduras/Legumes' },
    { nome: 'Pimentão Vermelho', tipo: 'Verduras/Legumes' },
    { nome: 'Gengibre Fresco', tipo: 'Verduras/Legumes' },
  ];

  return produtosBase.map((prod, idx) => ({
    id: `prod-${idx + 1}`,
    nome: prod.nome,
    tipo: prod.tipo,
    marca: marcas[Math.floor(Math.random() * marcas.length)],
    category: prod.tipo,
    priceMin: Math.round((Math.random() * 150 + 30) * 100) / 100,
    priceIdeal: Math.round((Math.random() * 250 + 80) * 100) / 100,
    quantidade: Math.floor(Math.random() * 500 + 10),
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    vendas: Math.floor(Math.random() * 5000 + 100),
    desconto: Math.floor(Math.random() * 40 + 5),
    frete: Math.random() > 0.4 ? 'Frete grátis' : `Frete a partir de R$ ${Math.floor(Math.random() * 50 + 10)}`,
    description: `${prod.nome} de alta qualidade, selecionado para o melhor rendimento agrícola.`,
    // image será definida dinamicamente no render usando getImage(item)
  }));
}

/**
 * Gera 80 equipamentos agrícolas com informações completas
 * @returns {Array} Array de 80 equipamentos
 */
export function generateEquipamentos() {
  const marcas = [
    'John Deere', 'Massey Ferguson', 'New Holland', 'Valtra', 'Case IH',
    'Versatil', 'Femco', 'Baldan', 'Boere', 'Kuhn', 'Amazone', 'Randon',
    'Tatu', 'Stara', 'Jacto', 'Herbicat', 'Claas', 'Matal', 'Kemper',
    'Yto', 'Kubota', 'Eaton', 'Pirelli', 'Agrale'
  ];

  const tipos = [
    { valor: 'trator', label: 'Trator' },
    { valor: 'arado', label: 'Arado' },
    { valor: 'grade', label: 'Grade' },
    { valor: 'plantadeira', label: 'Plantadeira' },
    { valor: 'pulverizador', label: 'Pulverizador' },
    { valor: 'colheitadeira', label: 'Colheitadeira' },
    { valor: 'distribuidor', label: 'Distribuidor' },
    { valor: 'carroceria', label: 'Carroceria' },
    { valor: 'ensiladeira', label: 'Ensiladeira' },
    { valor: 'acessorio', label: 'Acessório' },
  ];

  const modelos = {
    trator: ['R', 'T', 'CR', 'S', 'MF', 'NH', 'Case'],
    arado: ['Arado 2 Discos', 'Arado 3 Discos', 'Arado 4 Discos', 'Arado de Aiveca'],
    grade: ['Grade Aradora', 'Grade Niveladora', 'Grade de Disco', 'Grade Pesada'],
    plantadeira: ['Plantadeira Pneumática', 'Plantadeira de Precisão', 'Plantadeira GPS', 'Plantadeira Mecanizada'],
    pulverizador: ['Pulverizador 200L', 'Pulverizador 400L', 'Pulverizador 600L', 'Pulverizador Autopropelido'],
    colheitadeira: ['Colheitadeira CR', 'Colheitadeira CL', 'Colheitadeira TC', 'Colheitadeira CAT'],
    distribuidor: ['Distribuidor Esterco', 'Distribuidor Adubadora', 'Distribuidor Cal', 'Distribuidor Granulado'],
    carroceria: ['Carroceria Agrícola', 'Carroceria Silagem', 'Carroceria Graneleira', 'Carroceria Basculante'],
    ensiladeira: ['Ensiladeira 1 Eixo', 'Ensiladeira 2 Eixos', 'Ensiladeira 3 Eixos', 'Ensiladeira Automotriz'],
    acessorio: ['Engate Rápido', 'Cilindro Hidráulico', 'Barra de Corte', 'Sistema de Freio'],
  };

  let equipamentos = [];
  let id = 1;

  tipos.forEach((tipo) => {
    const modelsForType = modelos[tipo.valor];
    const itemsPerType = Math.ceil(80 / tipos.length);

    for (let i = 0; i < itemsPerType && equipamentos.length < 80; i++) {
      const marca = marcas[Math.floor(Math.random() * marcas.length)];
      const modelo = modelsForType[Math.floor(Math.random() * modelsForType.length)];
      const numero = Math.floor(Math.random() * 500) + 50;

      equipamentos.push({
        id: id++,
        nome: `${marca} ${modelo} ${numero}`,
        marca: marca,
        tipo: tipo.valor,
        preco: Math.round((Math.random() * 1200 + 150) * 100) / 100,
        disponivel: Math.random() > 0.2, // 80% disponível
        rating: (Math.random() * 1.5 + 3.5).toFixed(1),
        alugueis: Math.floor(Math.random() * 2000 + 50),
        desconto: Math.floor(Math.random() * 30 + 5),
        frete: Math.random() > 0.4 ? 'Frete grátis' : `Frete a partir de R$ ${Math.floor(Math.random() * 150 + 50)}`,
        // image será definida dinamicamente no render usando getImage(item)
      });
    }
  });

  return equipamentos.slice(0, 80);
}

/**
 * Função auxiliar para gerar descricoes dinâmicas
 * @param {string} nome - Nome do produto/equipamento
 * @param {string} tipo - Tipo de item
 * @returns {string} Descrição gerada
 */
export function gerarDescricao(nome, tipo) {
  const descricoes = {
    'Grãos': `${nome} de alta qualidade, ideal para indústria e consumo. Produto em perfeitas condições.`,
    'Frutas': `${nome} fresco e saudável, selecionado para qualidade superior. Pronto para distribuição.`,
    'Verduras/Legumes': `${nome} orgânico de primeira qualidade, rico em nutrientes e aroma natural.`,
    'trator': `${nome} em excelente estado de funcionamento. Manutenção em dia e pronto para aluguel.`,
    'equipamento': `${nome} de alta performance. Ideal para operações agrícolas de grande escala.`,
  };

  return descricoes[tipo] || `${nome} - Produto de qualidade garantida.`;
}

/**
 * Busca imagem baseada no nome do item usando o imageMap
 * Garante correspondência EXATA baseada em palavras-chave específicas
 * @param {Object} item - Item com propriedade nome
 * @returns {string} URL da imagem correspondente
 */
export const getImage = (item) => {
  if (!item || !item.nome) {
    return "https://via.placeholder.com/300?text=Erro";
  }

  const nome = item.nome.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s]/g, ' ') // Substitui caracteres especiais por espaço
    .replace(/\s+/g, ' ') // Remove espaços múltiplos
    .trim();

  // Busca por correspondência exata de palavras-chave
  for (let key in imageMap) {
    // Verifica se a palavra-chave está presente como palavra completa
    const regex = new RegExp(`\\b${key}\\b`, 'i');
    if (regex.test(nome)) {
      return imageMap[key];
    }
  }

  // Se não encontrou correspondência, retorna erro específico
  return `https://via.placeholder.com/300?text=Imagem+nao+encontrada+para:+${encodeURIComponent(item.nome)}`;
};

// Exportar imageMap para uso em outros módulos
export { imageMap };
