import React from 'react';
import '../styles/components/Nav.css';
import logo from '../assets/logo-empresa.jpg'
import { useNavigate } from 'react-router-dom';
import Botao from '../components/Botao';

const Nav = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    // 1. Limpa os dados do usuário
    localStorage.removeItem("token");
    // Se você usa Context ou Redux, também resetar o estado global

    // 2. Redireciona substituindo a rota atual no histórico
    navigate("/", { replace: true });
  };

  return (
    <nav className="navBar">
      <img className='logoCliente' src={logo} alt="logo loja" />

      <div className='container__buttons'>
        <Botao onClick={() => navigate('/clientes') }tamanho='sm'>Caixa</Botao>
        <Botao onClick={() => navigate('/contas')}tamanho='sm'>PDV</Botao>
        <Botao onClick={() => navigate('/cadastros')}tamanho='sm'>Cadastros</Botao>
        <Botao onClick={() => navigate('/financeiro') }tamanho='sm'>Financeiro</Botao>
        <Botao onClick={() => navigate('/contas')}tamanho='sm'>Estoque</Botao>
        <Botao onClick={() => navigate('/resumo')}tamanho='sm'>Relatórios</Botao>
      </div>
      <Botao onClick={handleLogout} tamanho='xsm' cor='secundario'>Sair</Botao>
    </nav>
  );
};

export default Nav;
