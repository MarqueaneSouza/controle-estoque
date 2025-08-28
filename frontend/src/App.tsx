import { Routes, Route } from 'react-router-dom';
import CadastroProduto from './pages/CadastroProduto';
import CadastroFornecedor from './pages/CadastroFornecedor';
import ListaProdutos from './pages/ListaProdutos';
import ListaFornecedores from './pages/ListaFornecedores';
import AssociarProdutoFornecedor from './pages/AssociarProdutoFornecedor';
import DesassociarFornecedor from './pages/DesassociarFornecedor';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListaProdutos />} />
      <Route path="/produtos/novo" element={<CadastroProduto />} />
      <Route path="/fornecedores/novo" element={<CadastroFornecedor />} />
      <Route path="/cadastro-produto" element={<CadastroProduto />} />
      <Route path="/fornecedores" element={<ListaFornecedores />} />
      <Route path="/produtos/associar" element={<AssociarProdutoFornecedor />} />
      <Route path="/fornecedores/desassociar" element={<DesassociarFornecedor />} />
      

    </Routes>
  );
}

export default App;
