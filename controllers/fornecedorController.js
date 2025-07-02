let fornecedores = [];

const listarFornecedores = (req, res) => {
    res.json(fornecedores);
};

const cadastrarFornecedor = (req, res) => {
    const { nomeEmpresa, cnpj, endereco, telefone, email, contatoPrincipal } = req.body;

    if (!nomeEmpresa || !cnpj || !endereco || !telefone || !email || !contatoPrincipal) {
        return res.status(400).json({ mensagem: 'Campos obrigatórios não preenchidos!' });
    }

    const existe = fornecedores.find(f => f.cnpj === cnpj);
    if (existe) {
        return res.status(400).json({ mensagem: 'Fornecedor com esse CNPJ já está cadastrado!' });
    }

    const novoFornecedor = { nomeEmpresa, cnpj, endereco, telefone, email, contatoPrincipal };
    fornecedores.push(novoFornecedor);

    res.status(201).json({ mensagem: 'Fornecedor cadastrado com sucesso!', fornecedor: novoFornecedor });
};

module.exports = { listarFornecedores, cadastrarFornecedor, fornecedores };
