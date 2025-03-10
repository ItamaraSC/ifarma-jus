// 400 = aviso q vai da erro / 404/500 = error / 200 = sucesso
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3003 ;

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

app.post('/Cadastrar/Fornecedor', (req,res) => {
    const {  Nome , Endereco , Email , Pagamento , CNPJ , Telefone , Prod_Forn , Codigo  } = req.body;

    if(!Nome || !Endereco || !Email || !Pagamento || !CNPJ || !Telefone || !Prod_Forn || !Codigo){
        return res.status(400).json({
            message : 'por favor insira os campos '
        });
    }

    const query = 'INSERT INTO tb_fornecedor (Nome , Endereco , Email , Pagamento , CNPJ , Telefone , Prod_Forn , Codigo) VALUES ( ?, ? ,? ,? ,? ,? ,? ,?)';
    db_ifarma.execute(query, [Nome , Endereco , Email , Pagamento , CNPJ , Telefone , Prod_Forn , Codigo], (err, result) => {
        if(err){
            console.log('erro ao cadastrar usuario' ,err);
            return res.status(500).json({
                message : 'ocorreu um erro interno no sistema'
            });
        }
        res.status(200).json({
            message : 'Fornecedor cadastrado com sucesso!'
        });
    });
});
app.listen(port , () => {
    console.log(`servidor rodando na porta  http:/localhost${port}`);
});