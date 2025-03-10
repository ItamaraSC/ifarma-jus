const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3021;

app.use(cors());
app.use(bodyParser.json());

const db_digipass = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senha', 
    database: 'db_digipass',
    port: 3306
});

db_digipass.connect((err) => {
    if (err) {
        console.log('erro ao conectar ao database' + err.stack);
        return;
    }
    console.log('Conexão bem-sucedida com o database');
});

app.post('/Cadastro', (req, res) => {
    console.log('Dados recebidos:', req.body);
    const { nome , cpf  , telefone, email , data_nascimento , senha_hash} = req.body;

    if (!cpf || !nome || !data_nascimento || !telefone || !email) {
        return res.status(400).json({
            message: 'Preencha todos os campos!'
        });
    }



    const queryCPF = 'SELECT * FROM tb_usuarios WHERE cpf = ?';
    db_digipass.query(queryCPF , [cpf] , (err,result) => {
        if(err){
            console.log('Erro ao verificar CPF' ,err);
            return res.status(500).json({
                message : 'ocorreu um erro interno no sistema'
            });
        }
        if(result.length > 0){
            return res.status(400).json({
                message: 'CPF já cadastrado!'
            });
        }


        const queryEmail = 'SELECT * FROM tb_usuarios WHERE email = ?';
        db_digipass.query(queryEmail , [email] , (err,results) => {
            if(err){
                console.log('Erro ao verificar email' ,err);
                return res.status(500).json({
                    message : 'ocorreu um erro interno no sistema'
                });
            }
            if(results.length > 0){
                return res.status(400).json({
                    message: 'email já cadastrado!'
                });
            }
        

        
    const query = 'INSERT INTO tb_usuarios (nome, cpf, telefone, email , data_nascimento , senha_hash) VALUES (?, ?, ?, ? , ? , ?)';
    db_digipass.execute(query, [nome , cpf  , telefone, email , data_nascimento , senha_hash || ' '], (err, result) => {
        if(err){
            console.log('erro ao cadastrar usuario' ,err);
            return res.status(500).json({
                message : 'ocorreu um erro interno no sistema'
            });
        }
        res.status(200).json({
            message : 'usuario cadastrado com sucesso'
        });
    });
    });
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});
