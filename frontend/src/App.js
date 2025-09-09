import React from 'react';
import { Routes, Route, Navigate, Outlet} from 'react-router-dom';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Contas from './pages/Contas';
import ResumoContas from './pages/ResumoContas';
import Mesas from './pages/Mesas'
import Login from './pages/Login';
import Cadastros from './pages/Cadastros'
import './App.css';

function PrivateRoute() {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/" replace />;
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* Rotas privadas */}
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/contas" element={<Contas />} />
        <Route path="/resumo" element={<ResumoContas />} />
        <Route path="/mesas" element={<Mesas />} />
        <Route path="/cadastros" element={<Cadastros />} />
      </Route>
    </Routes>
  );
};

export default App;
