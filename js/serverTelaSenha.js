const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3022 ; 

app.use(cors());
app.use(bodyParser.json());

const db_digipass = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senha',
    database: 'db_digipass',
    port : 3306
});

db_digipass.connect((err) => {
    if(err){
        console.log('erro ao conectar o database' + err.stack);
        return;
    }
    console.log('Conexão bem sucedida com o banco de dados');
});

app.post('/Senha', (req, res) => {
    const { cpf, senha_hash } = req.body;

    if (!senha_hash || !cpf) {
        return res.status(404).json({ message: 'Insira todos os campos' });
    }

    const query = 'UPDATE tb_usuarios SET senha_hash = ? WHERE cpf = ?';
    db_digipass.execute(query, [senha_hash, cpf], (err, result) => {
        if (err) {
            console.log('Erro ao colocar a senha', err);
            return res.status(500).json({
                message: 'Erro interno'
            });
        }
        res.status(200).json({
            message: 'Senha alterada com sucesso'
        });
    });
});


app.listen(port , () => {
    console.log(`Server rodando na porta http://localhost:${port}`);
});