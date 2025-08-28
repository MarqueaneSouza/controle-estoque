const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./config/database');

// Modelos (importar primeiro, mas sem associar ainda)
require('./models/Produto');
require('./models/Fornecedor');

// Associações (depois dos modelos)
require('./models/associacoes');

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
const rotaProdutos = require('./routes/produtos');
const rotaFornecedores = require('./routes/fornecedores');

app.use('/produtos', rotaProdutos);
app.use('/fornecedores', rotaFornecedores);

// Testar conexão com banco e sincronizar modelos
sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado.');
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
}).catch((err) => {
  console.error('Erro ao conectar com o banco de dados:', err);
});
