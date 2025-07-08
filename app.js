const express = require('express');
const app = express();
const PORT = 3000;
const sequelize = require('./config/database');
const Produto = require('./models/Produto');
const Fornecedor = require('./models/Fornecedor');

// Aqui importa e executa os relacionamentos
require('./models/associacoes');

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

app.use(express.json());

const produtosRoutes = require('./routes/produtos');
const fornecedoresRoutes = require('./routes/fornecedores');

app.use('/produtos', produtosRoutes);
app.use('/fornecedores', fornecedoresRoutes.router);

app.get('/', (req, res) => {
    res.send('Servidor Node com Express funcionando!');
});

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

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
