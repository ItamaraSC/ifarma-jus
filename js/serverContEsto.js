const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3011;

app.use(cors());
app.use(bodyParser.json());

const db_ifarma = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'senac',
    database : 'db_ifarma',
    port : 3307
});

db_ifarma.connect((err) =>{
    if(err){
        console.log('erro ao conectar ao database' +err.stack);
        return;
    }

    console.log('Conectado ao database');
});

app.get('/Estoque' , (req,res) => {

    const { produto } = req.query;

    if(!produto){
        return res.status(400).json({
            message : 'Por favor, preencha o campo de (produto)'
        });
    }

    const query =  `SELECT Nome , DATE_FORMAT(Dt_Validade , '%d/%m/%Y' ) AS Dt_Validade, SKU , Qtd_Prod FROM tb_produto WHERE Nome LIKE ?`;

    db_ifarma.query(query , [ `%${produto}%` ] , (err, result) => {
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
})