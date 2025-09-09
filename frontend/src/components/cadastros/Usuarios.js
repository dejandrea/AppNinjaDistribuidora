import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Botao from '../Botao';
import ModalNovoUsuario from '../ModalNovoUsuario';
import ModalEditarUsuario from '../ModalEditarUsuario';
import "../../styles/pages/Cadastros.css"

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
    const [busca, setBusca] = useState('');

    let navigate = useNavigate();
    const fetchUsuarios = async () => {
        try {
            const response = await api.get('/usuarios');
            setUsuarios(response.data);
            setUsuariosFiltrados(response.data);
        } catch (error) {
            console.error('Erro ao buscar Usuários', error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    // Filtro em tempo real
    useEffect(() => {
        const filtro = usuarios.filter(c =>
            c.nome.toLowerCase().includes(busca.toLowerCase()) ||
            String(c.codigoUsuario).includes(busca)
        );
        setUsuariosFiltrados(filtro);
    }, [busca, usuarios]);

    return (
        <div className="body">
            <div className='body__top'>
                <div className="menu">
                    <Botao onClick={() => setMostrarModal(true)} tamanho='sm'>Novo Usuário</Botao>
                </div>
                
                <input
                    type="text"
                    placeholder="Buscar por nome, apelido ou código"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className='searchInput'
                />
            </div>
            <div className="body-content">

                <div className='main-content'>
                    <table>
                        <tr className='table__title'>
                            <th>Cód</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Observações</th>
                            <th>Editar</th>
                        </tr>
                        {usuariosFiltrados.map((usuario) => (
                            <tr key={usuario.codigoUsuario} className={`${usuario.status} ${usuario.ativo ? "ativo" : "inativo"}`}>
                                <td>{usuario.codigoUsuario}</td>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.status}</td>
                                <td>{usuario.observacoes}</td>
                                <td onClick={() => setUsuarioSelecionado(usuario)} className='editar'>Editar</td>
                            </tr>
                        ))}
                    </table>
                    {usuarioSelecionado && (
                        <ModalEditarUsuario
                            usuario={usuarioSelecionado}
                            onClose={() => setUsuarioSelecionado(null)}
                            onSuccess={() => {
                                setUsuarioSelecionado(null);
                                // atualiza a lista
                                fetchUsuarios();
                            }}
                        />
                    )}
                </div>
            </div>

            {mostrarModal && (
                <ModalNovoUsuario
                    onClose={() => setMostrarModal(false)}
                    onSuccess={() => {
                        setMostrarModal(false);
                        api.get('/usuarios')
                            .then(res => setUsuarios(res.data));
                    }}
                />
            )}
        </div>


    );

};

export default Usuarios;
