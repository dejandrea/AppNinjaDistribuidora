import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BotaoG from '../components/BotaoG';
import BotaoM from '../components/BotaoM'
import BotaoP from '../components/BotaoP'
import Header from "../components/Header"
import "../styles/pages/Clientes.css"

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/clientes');
                setClientes(response.data);
            } catch (error) {
                console.error('Erro ao buscar clientes', error);
            }
        };

        fetchClientes();
    }, []);

    return (
        <div className="body">
            <Header />
            <h1>Clientes</h1>
            <div className="body-content">
                <div className="menu-lateral">
                    <BotaoG onClick={() => navigate('/')}>Home G</BotaoG>
                    <BotaoM onClick={() => navigate('/')}>Home M</BotaoM>
                    <BotaoP onClick={() => navigate('/')}>Home P</BotaoP>
                </div>
                <div className='main-content'>
                    <ul>
                        {clientes.map((cliente) => (
                            <li key={cliente.codigoCliente}>
                                {cliente.nome} - {cliente.telefone}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


        </div>
    );
};

export default Clientes;