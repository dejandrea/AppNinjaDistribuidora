import React from 'react';
import '../styles/components/Header.css';
import logo from '../assets/logoConveniência.jpg'

const Header = () => {
  return (
    <header className="header">
        <img className='logo' src={logo} alt="logo loja"  />
    </header>
  );
};

export default Header;
