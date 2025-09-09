import React, { useState, useEffect } from "react";
import api from "../services/api";
import Botao from "./Botao";
import "../styles/components/Modal.css";

const ModalEditarUsuario = ({ usuario, onClose, onSuccess }) => {
  const [form, setForm] = useState(usuario);

  useEffect(() => {
    setForm(usuario); // Atualiza se usuario mudar
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/usuarios/${form.codigoUsuario}`, form);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Nome:</legend>
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </fieldset>

          <fieldset>
            <legend>Telefone:</legend>
            <input
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <legend>Email:</legend>
            <input name="email" value={form.email} onChange={handleChange} />
          </fieldset>
          <fieldset>
            <legend>Senha:</legend>
            <input
              name="senha"
              type="password"
              value={form.senha}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <legend>Endereço:</legend>
            <input
              name="endereco"
              value={form.endereco}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <legend>Status:</legend>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="liberado">Liberado</option>
              <option value="bloqueado">Bloqueado</option>
            </select>
          </fieldset>
          <fieldset>
            <legend>Ativo:</legend>
            <select name="ativo" value={form.ativo} onChange={handleChange}>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </fieldset>
          <fieldset>
            <legend>Observações:</legend>
            <textarea
              name="observacoes"
              value={form.observacoes}
              onChange={handleChange}
            />
          </fieldset>
          <div className="modal-buttons">
            <Botao tipo="submit" tamanho="xxsm" cor="terciario">
              Salvar
            </Botao>
            <Botao tamanho="xxsm" cor="terciario" onClick={onClose}>
              Cancelar
            </Botao>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarUsuario;
