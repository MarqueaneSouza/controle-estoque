import { Routes, Route } from 'react-router-dom';
import CadastroProduto from './pages/CadastroProduto';
import CadastroFornecedor from './pages/CadastroFornecedor';
import ListaProdutos from './pages/ListaProdutos';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListaProdutos />} />
      <Route path="/produtos/novo" element={<CadastroProduto />} />
      <Route path="/fornecedores/novo" element={<CadastroFornecedor />} />
      <Route path="/cadastro-produto" element={<CadastroProduto />} />

    </Routes>
  );
}

export default App;
