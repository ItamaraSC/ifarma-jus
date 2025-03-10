const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3007;

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
        console.log('Error ao conectar o database:'+ err.stack);
        return;
    }
    console.log('conectado ao banco com sucesso');
});

app.get('/perfil' , (req, res) => {
    const { CPF } = req.query;

    if( !CPF ){
        return res.status(400).json({
            message : 'CPF obg'
        });
    }

    const query = 'SELECT Nome , CPF , Senha , Tipo_Usuario FROM tb_usuario WHERE CPF = ? ';
    db_ifarma.execute(query, [ CPF ], (err, result) => {
        if(err){
            console.log('Erro ao cadastrar usuario' ,err);
            return res.status(500).json({
                message : 'ocorreu um erro interno no sistema'
            });
        }

        if(result.length === 0){
            return res.status(404).json({
                message : 'CPF não encontrado'
            });
        }

        res.status(200).json(result[0]);
    });
});

app.listen(port , () => {
    console.log(`servidor rodando na porta  http:/localhost${port}`);
});