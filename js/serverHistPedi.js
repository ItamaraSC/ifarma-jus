const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 3012;

app.use(cors());
app.use(bodyParser.json());

const db_ifarma = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'senac',
    database : 'db_ifarma',
    port : 3307
});

db_ifarma.connect((err) => {
    if(err) {
        console.log('Error connecting to the database:' + err.stack);
        return;
    }
    console.log('Connected to the database!');
});

app.get('/Historico/Pedidos' , (req, res) => {

    const query =  `SELECT Produto , DATE_FORMAT(Dt_pedido , '%d/%m/%Y') AS Dt_pedido, DATE_FORMAT(Dt_Entrega , '%d/%m/%Y' ) AS Dt_Entrega, Id_Fornecedor FROM tb_pedido`;

    db_ifarma.query(query , (err, result) => {
        if(err){
            console.log('Erro ao listar estoque' ,err);
            return res.status(500).json({
                message : 'ocorreu um erro interno no sistema'
            });
        }

        if(result.length === 0){
            return res.status(404).json({
                message : 'Nenhum produto encontrado'
            });
        }

        console.log('Estoque carregado' , result);

        res.status(200).json(result);
    });
    
});

app.listen(port , () => {
    console.log(`servidor rodando na porta  http://localhost:${port}`);
});
