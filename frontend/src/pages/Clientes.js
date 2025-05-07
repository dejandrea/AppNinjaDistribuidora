import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Botao from '../components/Botao';
import Header from "../components/Header"
import ModalNovoCliente from '../components/ModalNovoCliente';
import "../styles/pages/Clientes.css"

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);

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
                    <Botao onClick={() => navigate('/')} tamanho='sm'>Tela Inicial</Botao>
                    <Botao onClick={() => setMostrarModal(true)} tamanho='sm'>Novo Cliente</Botao>
                    <Botao onClick={() => navigate('/')} tamanho='sm'>Buscar Cliente</Botao>
                    <Botao onClick={() => navigate('/')} tamanho='sm'>Atualizar Cliente</Botao>
                </div>
                <div className='main-content'>
                    <table>
                        <tr className='table__title'>
                            <th>Cód</th>
                            <th>Nome</th>
                            <th>Apelido</th>
                            <th>Status</th>
                            <th>Observações</th>
                            <th>Editar</th>
                        </tr>
                        {clientes.map((cliente) => (
                            <tr key={cliente.codigoCliente} className={cliente.status}>
                                <td>{cliente.codigoCliente}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.apelido}</td>
                                <td>{cliente.status}</td>
                                <td>{cliente.observacoes}</td>
                                <td>Editar</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>

            {mostrarModal && (
                <ModalNovoCliente
                  onClose={() => setMostrarModal(false)}
                  onSuccess={() => {
                    setMostrarModal(false);
                    axios.get('http://localhost:5000/clientes')
                      .then(res => setClientes(res.data));
                  }}
                />
              )}
        </div>


);

};

export default Clientes;