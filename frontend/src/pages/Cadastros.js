import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Botao from '../components/Botao';
import CadClientes from "../components/cadastros/Clientes";
import CadUsuarios from "../components/cadastros/Usuarios";
import CadFornecedores from "../components/cadastros/Fornecedores";
import "../styles/pages/Cadastros.css";

const Cadastros = () => {
  const [activeTab, setActiveTab] = useState("clientes");
  let navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };
  return (
    <div className="container">

      <div className="cadastros-header">
          <h1>Cadastros</h1>
          <div className="header-btn-container">
              <Botao onClick={() => navigate('/home')} tamanho='xsm'>Tela Inicial</Botao>
              <Botao onClick={handleLogout} tamanho='xsm' cor='sair'>Sair</Botao>
          </div>
      </div>
      <div className="cadastros-container">
        {/* Abas */}
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === "clientes" ? "active" : ""}`}
            onClick={() => setActiveTab("clientes")}
          >
            Clientes
          </button>

          <button
            className={`tab-button ${activeTab === "usuarios" ? "active" : ""}`}
            onClick={() => setActiveTab("usuarios")}
          >
            Usuários
          </button>

          <button
            className={`tab-button ${
              activeTab === "fornecedores" ? "active" : ""
            }`}
            onClick={() => setActiveTab("fornecedores")}
          >
            Fornecedores
          </button>
        </div>

        {/* Conteúdo da aba */}
        <div className="tab-content">
          {activeTab === "clientes" && <CadClientes />}
          {activeTab === "usuarios" && <CadUsuarios />}
          {activeTab === "fornecedores" && <CadFornecedores />}
        </div>
      </div>
    </div>
  );
};

export default Cadastros;
