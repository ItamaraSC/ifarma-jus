// 400 = aviso q vai da erro / 404/500 = error / 200 = sucesso
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3001 ;

app.use(cors());
app.use(bodyParser.json());

const db_ifarma = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'senha',
    database : 'db_ifarma',
    port : 3306
});

db_ifarma.connect((err) => {
    if(err){
        console.log('Error connecting to the database:' + err.stack);
        return;
    }
    console.log('conectado ao banco com sucesso ');
});

app.post('/Cadastra/Cliente', (req,res) => {
    const { CPF  , Nome , Email , Telefone } = req.body;

    if(!CPF || !Nome || !Email || !Telefone){
        return res.status(400).json({
            message : 'por favor insira os campos de (CPF , Nome , Telefone  e Email) '
        });
    }

    const query = 'INSERT INTO tb_cliente (CPF , Nome , Email , Telefone ) VALUES ( ? , ? , ?, ?)';
    db_ifarma.execute(query, [CPF , Nome , Email , Telefone], (err, result) => {
        if(err){
            console.log('erro ao cadastrar usuario' ,err);
            return res.status(500).json({
                message : 'ocorreu um erro interno no sistema'
            });
        }
        res.status(200).json({
            message : 'cliente cadastrado com sucesso'
        });
    });
});
app.listen(port , () => {
    console.log(`servidor rodando na porta  http:/localhost${port}`);
});