import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Botao from '../components/Botao';

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
            <Botao onClick={() => navigate('/')}>Home</Botao>
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