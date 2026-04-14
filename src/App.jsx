import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import Calculo from './pages/Calculo';
import Produtos from './pages/Produtos';
import Aluguel from './pages/Aluguel';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Dashboard from './pages/Dashboard';
import Favoritos from './pages/Favoritos';
import Historico from './pages/Historico';
import Perfil from './pages/Perfil';
import './App.css';
import './styles/ImageEffects.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/calculo" element={<ProtectedRoute><Calculo /></ProtectedRoute>} />
          <Route path="/produtos" element={<ProtectedRoute><Produtos /></ProtectedRoute>} />
          <Route path="/aluguel" element={<ProtectedRoute><Aluguel /></ProtectedRoute>} />
          <Route path="/sobre" element={<ProtectedRoute><Sobre /></ProtectedRoute>} />
          <Route path="/contato" element={<ProtectedRoute><Contato /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/favoritos" element={<ProtectedRoute><Favoritos /></ProtectedRoute>} />
          <Route path="/historico" element={<ProtectedRoute><Historico /></ProtectedRoute>} />
          <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
