import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BotaoG from '../components/BotaoG';
import '../styles/pages/Home.css';

const Home = () => {
    let navigate = useNavigate();
    return (
      <div className="body">
        <Header/>
        <div>
            <BotaoG onClick={()=> navigate('/clientes')}>Clientes</BotaoG>
            <BotaoG onClick={()=> navigate('/contas')}>À Receber</BotaoG>
        </div>
        <BotaoG>Contas Abertas</BotaoG>
      </div>
    );
}
  
export default Home;