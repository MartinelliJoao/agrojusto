import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Calculo from './pages/Calculo';
import Aluguel from './pages/Aluguel';
import Perfil from './pages/Perfil';
import './App.css';
import './styles/ImageEffects.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculo" element={<Calculo />} />
        <Route path="/aluguel" element={<Aluguel />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
