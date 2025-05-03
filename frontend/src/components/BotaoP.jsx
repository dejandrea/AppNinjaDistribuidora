import React from 'react';
import '../styles/components/BotaoP.css';

const BotaoP = ({ onClick, children, tipo = 'button', ...rest }) => {
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

export default BotaoP;
