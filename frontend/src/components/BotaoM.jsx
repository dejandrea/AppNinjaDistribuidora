import React from 'react';
import '../styles/components/BotaoM.css';

const BotaoM = ({ onClick, children, tipo = 'button', ...rest }) => {
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

export default BotaoM;
