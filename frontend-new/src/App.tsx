import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ListaProdutos from './pages/ListaProdutos';
import ListaFornecedores from './pages/ListaFornecedores';
import AssociarFornecedor from './pages/AssociarFornecedor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ListaProdutos />} />
          <Route path="produtos" element={<ListaProdutos />} />
          <Route path="fornecedores" element={<ListaFornecedores />} />
          <Route path="associar" element={<AssociarFornecedor />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;