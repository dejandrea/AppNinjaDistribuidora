import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../services/api';
import logo from '../assets/logo-empresa.jpg'
import logoSistema from "../assets/images/logoSitema/Logo-peq-cnz.png"
import "../styles/pages/Login.css"

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { usuario } = await loginUsuario(email, senha);
            localStorage.setItem('usuario', JSON.stringify(usuario));
            localStorage.setItem('token', 'fakeToken'); // depois substituímos por JWT real
            navigate('/home');
        } catch (err) {
            alert(err.response?.data?.error || 'Erro no login');
        }
    };

    return (
        <div className='containerLogin'>
            <div className="login-container">
                <img className='logoEmpresa' src={logo} alt="logo loja" />
                <h2>Seja Bem Vindo!</h2>
                <form onSubmit={handleLogin}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Senha:</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />

                    {erro && <p className="error">{erro}</p>}

                    <button type="submit">Entrar</button>
                </form>
            </div>
            <img id='logoSistema' src={logoSistema} alt="logo Sistema" />
        </div>
    );
};

export default Login;
