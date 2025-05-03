import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Contas = () => {
  const [contas, setContas] = useState([]);

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