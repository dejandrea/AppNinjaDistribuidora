import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Contas from './pages/Contas';
import ResumoContas from './pages/ResumoContas';
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/contas" element={<Contas />} />
      <Route path="/resumo" element={<ResumoContas />} />
    </Routes>
  );
};

export default App;
