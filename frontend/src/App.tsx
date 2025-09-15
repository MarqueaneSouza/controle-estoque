import { Routes, Route } from 'react-router-dom';
import CadastroProduto from '../../frontend-new/src/pages/CadastroProduto';
import CadastroFornecedor from '../../frontend-new/src/pages/CadastroFornecedor';
import ListaProdutos from '../../frontend-new/src/pages/ListaProdutos';
import ListaFornecedores from '../../frontend-new/src/pages/ListaFornecedores';
import AssociarProdutoFornecedor from '../../frontend-new/src/pages/AssociarProdutoFornecedor';
import DesassociarFornecedor from '../../frontend-new/src/pages/DesassociarFornecedor';
import AssociarFornecedor from '../../frontend-new/src/pages/AssociarFornecedor';


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
      <Route path="/fornecedores/associar" element={<AssociarFornecedor />} />
      

    </Routes>
  );
}

export default App;
