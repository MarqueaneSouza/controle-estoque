function CadastroProduto() {
  return (
    <div>
      <h1>Cadastro de Produto</h1>
      <form>
        <input type="text" placeholder="Nome do produto" /><br />
        <input type="text" placeholder="Código de barras" /><br />
        <textarea placeholder="Descrição" /><br />
        <input type="number" placeholder="Quantidade" /><br />
        <input type="text" placeholder="Categoria" /><br />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default CadastroProduto;
