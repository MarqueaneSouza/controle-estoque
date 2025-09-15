import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <header className="header">
        <h1>Controle de Estoque</h1>
        <nav className="nav">
          <Link to="/produtos" className="nav-link">Produtos</Link>
          <Link to="/fornecedores" className="nav-link">Fornecedores</Link>
          <Link to="/associar" className="nav-link">Associar</Link>
        </nav>
      </header>
      
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;