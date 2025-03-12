const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3005;

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
    if (err) {
        console.log('Erro de conexão com o banco de dados: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco de dados com sucesso!');
});


app.post('/Cadastra/Servico', (req, res) => {
    const { Nome, Preco, Duracao, Descricao, Catg_Servico, Id_Usuario } = req.body;

    if (!Nome || !Preco || !Duracao || !Descricao || !Catg_Servico || !Id_Usuario) {
        return res.status(400).json({ 
            message: 'Por favor, preencha todos os campos' 
        });
    }

    const query = 'INSERT INTO tb_servico (Nome, Preco, Duracao, Descricao, Catg_Servico, Id_Usuario) VALUES (?, ?, ?, ?, ?, ?)';

    db_ifarma.execute(query, [Nome, Preco, Duracao, Descricao, Catg_Servico, Id_Usuario], (err, result) => {
        if (err) {
            console.log('Erro ao cadastrar serviço:', err);
            return res.status(500).json({
                 message: 'Ocorreu um erro interno no sistema'
                });
        }
        return res.status(200).json({ 
            message: 'Servico cadastrado com sucesso' 
        });
    });
});

app.get('/Funcionarios' , (req, res) => {
    const query = 'SELECT Id_usuario , Nome , Tipo_Usuario FROM tb_usuario WHERE Tipo_Usuario IN ("Farmaceutico" , "Administrador" , "Atendente")';
    db_ifarma.query(query, (err, result) => {
        if(err){
            console.log('erro ao carregar colaboradores ' , err);
            return res.status(500).json({
                message : 'Erro ao cadastrar'
            });
        }
        console.log('funcionario carrecago ' ,result);
        res.status(200).json(result);
    })
})

app.listen(port, () => {
    console.log(`Servidor de serviços rodando em http://localhost:${port}`);
});
