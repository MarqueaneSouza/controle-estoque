import { Link } from 'react-router-dom';

function ListaProdutos() {
  return (
    <div>
      <h1>Lista de Produtos</h1>
      <p>Aqui serão listados os produtos cadastrados.</p>

      <nav>
        <Link to="/produtos/novo">Cadastrar Produto</Link> |{' '}
        <Link to="/fornecedores/novo">Cadastrar Fornecedor</Link>
      </nav>
    </div>
  );
}

export default ListaProdutos;
