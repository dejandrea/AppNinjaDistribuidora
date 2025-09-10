import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Botao from '../components/Botao';
import Pagar from "../components/financeiro/contasAPagar";
import Receber from "../components/financeiro/contasAReceber";
import ResumoContas from "./ResumoContas";
import "../styles/pages/Cadastros.css";

const Financeiro = () => {
  const [activeTab, setActiveTab] = useState("relatorio");
  let navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };
  return (
    <div className="container">

      <div className="cadastros-header">
          <h1>Financeiro</h1>
          <div className="header-btn-container">
              <Botao onClick={() => navigate('/home')} tamanho='xsm'>Tela Inicial</Botao>
              <Botao onClick={handleLogout} tamanho='xsm' cor='sair'>Sair</Botao>
          </div>
      </div>
      <div className="cadastros-container">
        {/* Abas */}
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === "receber" ? "active" : ""}`}
            onClick={() => setActiveTab("receber")}
          >
            À Receber
          </button>

          <button
            className={`tab-button ${activeTab === "pagar" ? "active" : ""}`}
            onClick={() => setActiveTab("pagar")}
          >
            À Pagar
          </button>

          <button
            className={`tab-button ${
              activeTab === "relatorio" ? "active" : ""
            }`}
            onClick={() => setActiveTab("relatorio")}
          >
            Relatório Contas à Receber
          </button>
        </div>

        {/* Conteúdo da aba */}
        <div className="tab-content">
          {activeTab === "receber" && <Receber />}
          {activeTab === "pagar" && <Pagar />}
          {activeTab === "relatorio" && <ResumoContas />}
        </div>
      </div>
    </div>
  );
};

export default Financeiro;
