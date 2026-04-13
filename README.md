# AgroJusto - Frontend

Plataforma moderna de cálculo justo para aluguel e comercialização de terras agrícolas. Uma aplicação React completa com sistema de rotas, componentes reutilizáveis e design responsivo.

## 🚀 Características

- **Calculadora de Aluguel** - Calcule valores justos de aluguel com base em dados de mercado
- **Mapa de Propriedades** - Visualize propriedades disponíveis (integração Leaflet)
- **Sistema de Perfil** - Gerencie seus dados pessoais e propriedades
- **Design Responsivo** - Funciona perfeitamente em desktop, tablet e mobile
- **Paleta Verde Profissional** - Design moderno com cores verde (#2e7d32), branco e cinza

## 📦 Stack Tecnológico

- **React 18+** - Biblioteca JavaScript para UI
- **Vite** - Build tool rápido e moderno
- **React Router DOM** - Sistema de rotas
- **Axios** - Cliente HTTP para requisições
- **Leaflet + React-Leaflet** - Maps interativos
- **CSS Modules** - Estilos encapsulados e modular

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Navbar.jsx      # Barra de navegação fixa
│   ├── Footer.jsx      # Footer com links
│   └── Layout.jsx      # Layout wrapper
├── pages/              # Páginas da aplicação
│   ├── Home.jsx        # Página inicial
│   ├── Calculo.jsx     # Calculadora de aluguel
│   ├── Aluguel.jsx     # Propriedades disponíveis
│   └── Perfil.jsx      # Perfil do usuário
├── styles/             # CSS Modules
│   ├── Navbar.module.css
│   ├── Footer.module.css
│   ├── Home.module.css
│   ├── Calculo.module.css
│   ├── Aluguel.module.css
│   ├── Perfil.module.css
│   └── Layout.module.css
├── services/           # Serviços e APIs
│   └── api.js         # Cliente Axios configurado
├── assets/
│   └── images/        # Imagens do projeto
├── App.jsx            # Componente principal
├── App.css            # Estilos globais
├── main.jsx           # Entrada da aplicação
└── index.css          # Variáveis CSS globais
```

## 🎨 Paleta de Cores

- **Verde Principal**: #2e7d32
- **Verde Escuro**: #1b5e20
- **Verde Claro**: #c8e6c9
- **Branco**: #ffffff
- **Cinza Claro**: #f5f5f5
- **Cinza Médio**: #e0e0e0
- **Cinza Escuro**: #666666

## 🛣️ Sistema de Rotas

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/` | Home | Página inicial com informações |
| `/calculo` | Calculo | Calculadora de aluguel |
| `/aluguel` | Aluguel | Propriedades disponíveis |
| `/perfil` | Perfil | Perfil do usuário |

## 🚀 Como Começar

### Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Abrir navegador em
http://localhost:5173
```

### Build para Produção

```bash
# Criar build otimizado
npm run build

# Preview do build
npm run preview
```

## 📋 Páginas Criadas

### Home (`/`)
- Apresentação da plataforma
- CTA para começar cálculos
- Cards de features (6 features)
- Design inspirador com gradiente verde

### Calculadora (`/calculo`)
- Input de área total em hectares
- Input de área produtiva
- Input de preço de mercado
- Percentual customizável de aluguel
- Cálculo em tempo real
- Resultados formatados em reais

### Aluguel (`/aluguel`)
- Filtragem por nome/localização
- Filtragem por estado
- 6 propriedades de exemplo
- Cards com informações detalhadas
- Botões de ação

### Perfil (`/perfil`)
- Sidebar com menu de navegação
- Seção de dados pessoais
- Lista de propriedades do usuário
- Aluguéis ativos
- Formulários interativos

## 🔗 Serviços (API)

O arquivo `src/services/api.js` fornece métodos prontos para comunicação com a API:

```javascript
import { apiService } from './services/api';

// Exemplos de uso
await apiService.getPropriedades();
await apiService.criarPropriedade(dados);
await apiService.calcularAluguel(dados);
await apiService.getPerfil();
```

## 🎯 Próximos Passos

- [ ] Integração com API backend
- [ ] Autenticação de usuários
- [ ] Mapa interativo com Leaflet
- [ ] Upload de imagens de propriedades
- [ ] Sistema de avaliações
- [ ] Notificações em tempo real

## 📱 Responsividade

Todos os componentes são totalmente responsivos:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🔒 Segurança

- Interceptadores Axios para token JWT
- Headers de segurança configurados
- LGPD compliance ready

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato com nossa equipe em contato@agrojusto.com

## 📄 Licença

Todos os direitos reservados © 2024 AgroJusto.

---

**Desenvolvido com ❤️ para o agronegócio brasileiro**
