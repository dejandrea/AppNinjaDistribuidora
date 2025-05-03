import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BotaoG from '../components/BotaoG';

const Contas = () => {
    const [contas, setContas] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchContas = async () => {
            try {
                const response = await axios.get('http://localhost:5000/contas');
                setContas(response.data);
            } catch (error) {
                console.error('Erro ao buscar contas', error);
            }
        };

        fetchContas();
    }, []);

    return (
        <div>
            <BotaoG onClick={() => navigate('/')}>Home</BotaoG>
            <h1>Contas</h1>
            <ul>
                {contas.map((conta) => (
                    <li key={conta.codigoConta}>
                        {conta.valor} - {conta.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Contas;