import React from 'react';
import '../styles/components/BotaoG.css';

const BotaoG = ({ onClick, children, tipo = 'button', ...rest }) => {
  return (
    <button
      type={tipo}
      className="botao"
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default BotaoG;
