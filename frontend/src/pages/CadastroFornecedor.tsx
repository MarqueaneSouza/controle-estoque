function CadastroFornecedor() {
  return (
    <div>
      <h1>Cadastro de Fornecedor</h1>
      <form>
        <input type="text" placeholder="Nome do fornecedor" /><br />
        <input type="text" placeholder="CNPJ" /><br />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default CadastroFornecedor;
