const express = require('express');
const cors = require('cors'); // IMPORTA O CORS
const app = express();
app.use(cors());
const PORT = 3000;

const sequelize = require('./config/database');
const Produto = require('./models/Produto');
const Fornecedor = require('./models/Fornecedor');

// Executa os relacionamentos
require('./models/associacoes');

// Middleware para JSON e CORS
app.use(cors()); // ATIVA O CORS
app.use(express.json());

// Rotas
const produtosRoutes = require('./routes/produtos');
const fornecedoresRoutes = require('./routes/fornecedores');

app.use('/produtos', produtosRoutes);
app.use('/fornecedores', fornecedoresRoutes.router);

app.get('/', (req, res) => {
  res.send('Servidor Node com Express funcionando!');
});

// Inicia o servidor apenas uma vez após o banco sincronizar
sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso!');
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}/`);
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco:', error);
  });
