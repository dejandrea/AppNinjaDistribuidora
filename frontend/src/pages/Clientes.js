import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

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
    <div>
      <h1>Clientes</h1>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.codigoCliente}>
            {cliente.nome} - {cliente.telefone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clientes;