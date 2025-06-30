const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const produtosRoutes = require('./routes/produtos');
const fornecedoresRoutes = require('./routes/fornecedores');

app.use('/produtos', produtosRoutes);
app.use('/fornecedores', fornecedoresRoutes.router);

app.get('/', (req, res) => {
    res.send('Servidor Node com Express funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
