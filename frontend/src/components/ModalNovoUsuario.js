import React, { useState } from 'react';
import api from '../services/api';
import Botao from './Botao';
import '../styles/components/Modal.css';

const ModalNovoUsuario = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    endereco: '',
    email: '',
    senha: '',
    status: "liberado",
    observacoes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/usuarios', form);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Novo Usuário</h2>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Nome:</legend>
            <input name="nome" value={form.nome} onChange={handleChange} required autoFocus />
          </fieldset>
          <fieldset>
            <legend>Telefone:</legend>
            <input name="telefone" value={form.telefone} onChange={handleChange} />
          </fieldset>
          <fieldset>
            <legend>Email:</legend>
            <input name="email" placeholder="seuemail@email.com" value={form.email} onChange={handleChange} />
          </fieldset>
          <fieldset>
            <legend>Senha:</legend>
            <input name="senha" type='password' value={form.senha} onChange={handleChange} />
          </fieldset>
          <fieldset>
            <legend>Endereço:</legend>
            <input name="endereco" value={form.endereco} onChange={handleChange} />
          </fieldset>
          <fieldset>
            <legend>Status:</legend>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="bloqueado">Bloqueado</option>
              <option value="liberado">Liberado</option>
            </select>
          </fieldset>
          <fieldset>
            <legend>Observações:</legend>
            <textarea name="observacoes" value={form.observacoes} onChange={handleChange} />
          </fieldset>
          <div className="modal-buttons">
            <Botao tipo='submit' tamanho='xxsm' cor='terciario'>Salvar</Botao>
            <Botao tamanho='xxsm' cor='terciario'onClick={onClose}>Cancelar</Botao>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalNovoUsuario;
