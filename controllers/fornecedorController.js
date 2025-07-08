const Fornecedor = require('../models/Fornecedor');

const listarFornecedores = async (req, res) => {
    try {
        const lista = await Fornecedor.findAll();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao listar fornecedores.', erro: error.message });
    }
};

const cadastrarFornecedor = async (req, res) => {
    const { nomeEmpresa, cnpj, endereco, telefone, email, contatoPrincipal } = req.body;

    if (!nomeEmpresa || !cnpj || !endereco || !telefone || !email || !contatoPrincipal) {
        return res.status(400).json({ mensagem: 'Campos obrigatórios não preenchidos!' });
    }

    try {
        const existe = await Fornecedor.findOne({ where: { cnpj } });
        if (existe) {
            return res.status(400).json({ mensagem: 'Fornecedor com esse CNPJ já está cadastrado!' });
        }

        const novoFornecedor = await Fornecedor.create({ nomeEmpresa, cnpj, endereco, telefone, email, contatoPrincipal });

        res.status(201).json({ mensagem: 'Fornecedor cadastrado com sucesso!', fornecedor: novoFornecedor });

    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao cadastrar fornecedor.', erro: error.message });
    }
};

module.exports = { listarFornecedores, cadastrarFornecedor };

