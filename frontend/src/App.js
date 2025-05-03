import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Clientes from './pages/Clientes';
import Contas from './pages/Contas';
import Home from './pages/Home';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Contas/>
    </div>
  );
}

export default App;
