// 400 = aviso q vai da erro / 404/500 = error / 200 = sucesso
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000 ;

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
    if(err){
        console.log('Error connecting to the database:' + err.stack);
        return;
    }
    console.log('conectado ao banco com sucesso ');
});


app.post('/login' , (req,res) => {
    const { CPF , Senha } = req.body;

    if(!CPF || !Senha){
        return res.status(400).json({
            message : 'por favor insira os campos de (CPF  e Senha) '
        });
    }

    const query = 'SELECT * FROM tb_usuario WHERE CPF = ? AND Senha = ? ';
    db_ifarma.execute(query , [CPF, Senha] , (err, result) => {
        if(err){
            console.log('Erro ao realizar login' ,err);
            return res.status(500).json({
                message : 'ocorreu um erro interno no sistema'
            });
        }
        
        if(result.length === 0){
            return res.status(404).json({
                message : 'CPF ou senha incorretos'
            });
        }
        const user = result[0];
        if(user.Senha === Senha){
            return res.status(200).json({
                message : 'login realizado',
                user : user,
            });
        }
        else{
            return res.status(401).json({
                message : 'CPF ou senha incorretos'
            });
        }
    })
});


app.listen(port , () => {
    console.log(`servidor rodando na porta  http:/localhost${port}`);
});