const express = require('express');
const cors = require('cors');
const app = express();

// ✅ CORRIGIR: Importar corretamente do models/index.js
const { sequelize, Produto, Fornecedor } = require('./models');

app.use(cors());
app.use(express.json());

// Rotas
const rotaProdutos = require('./routes/produtos');
const rotaFornecedores = require('./routes/fornecedores');

app.use('/produtos', rotaProdutos);
app.use('/fornecedores', rotaFornecedores);

// Sincroniza com o banco de dados e inicia o servidor
sequelize.sync({ force: true }).then(async () => {
  console.log('Banco de dados sincronizado.');
  
  try {
    // Criar um produto de teste
    const produtoTeste = await Produto.create({
      nome: 'Notebook Dell',
      codigoBarras: '1234567890123',
      descricao: 'Notebook Dell i7, 16GB RAM',
      quantidade: 5,
      categoria: 'Informática'
    });
    
    console.log('✅ Produto criado com sucesso!');
    
    // Verificar métodos disponíveis
    console.log('Métodos disponíveis no produto:');
    const métodos = Object.keys(Produto.prototype).filter(method => 
      method.includes('add') || method.includes('get') || method.includes('set')
    );
    métodos.forEach(method => console.log('  -', method));
    
    // Testar se algum método de associação está disponível
    if (métodos.some(method => method.includes('Fornecedor'))) {
      console.log('✅ Métodos de fornecedor disponíveis!');
      
      // Criar fornecedor de teste
      const fornecedorTeste = await Fornecedor.create({
        nomeEmpresa: 'TechSupply Brasil',
        cnpj: '12.345.678/0001-90',
        endereco: 'Av. Paulista, 1000, São Paulo-SP',
        telefone: '(11) 9999-8888',
        email: 'contato@techsupply.com.br',
        contatoPrincipal: 'Carlos Silva'
      });
      
      console.log('✅ Fornecedor criado com sucesso!');
      
      // Usar o método disponível (pode ser addFornecedore ou addFornecedores)
      if (typeof produtoTeste.addFornecedore === 'function') {
        await produtoTeste.addFornecedore(fornecedorTeste);
        console.log('✅ Fornecedor associado usando addFornecedore!');
      } else if (typeof produtoTeste.addFornecedores === 'function') {
        await produtoTeste.addFornecedores([fornecedorTeste]);
        console.log('✅ Fornecedor associado usando addFornecedores!');
      }
      
    } else {
      console.log('❌ Nenhum método de fornecedor disponível');
    }

  } catch (erro) {
    console.error('❌ Erro durante os testes:', erro.message);
  }

  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
}).catch((err) => {
  console.error('❌ Erro ao conectar ou sincronizar com o banco:', err.message);
});