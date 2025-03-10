const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.json());

const db_ifarma = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senha', 
    database: 'db_ifarma',
    port: 3306
});

db_ifarma.connect((err) => {
    if (err) {
        console.log('Erro ao conectar ao banco de dados: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco com sucesso');
});

// Rota para cadastrar funcionário
app.post('/Cadastra/Funcionario', (req, res) => {
    const { Nome, CPF, Senha, Tipo_Usuario } = req.body;

    if (!Nome || !CPF || !Senha || !Tipo_Usuario) {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos' });
    }

    const confCPF = 'SELECT * FROM tb_usuario WHERE CPF = ?';
    db_ifarma.execute(confCPF, [CPF], (err, results) => {
        if (err) {
            console.error('Erro ao verificar CPF existente:', err);
            return res.status(500).json({ 
                message: 'Erro interno ao verificar CPF'
            });
        }

        if (results.length > 0) {
            return res.status(400).json({
                message: 'CPF já cadastrado',
            });
        }

        const query = 'INSERT INTO tb_usuario (Nome, CPF, Senha, Tipo_Usuario) VALUES (?, ?, ?, ?)';
        db_ifarma.execute(query, [Nome, CPF, Senha, Tipo_Usuario], (err, result) => {
            if (err) {
                console.log('Erro ao cadastrar funcionário:', err);
                return res.status(500).json({ 
                    message: 'Ocorreu um erro interno no sistema' 
                });
            }
            res.status(200).json({ 
                message: 'Usuário cadastrado com sucesso!' 
            });
        });
    });
});

// app.get('/Funcionarios', (req, res) => {
//     const queryAdministrador = 'SELECT Id_Usuario, Nome FROM tb_usuario WHERE Tipo_Usuario = "Administrador"';
//     const queryFuncionario = 'SELECT Id_Usuario, Nome FROM tb_usuario WHERE Tipo_Usuario = "Funcionario"';

//     db_ifarma.query(queryAdministrador, (err, resultsAdministrador) => {
//         if (err) {
//             console.error('Erro ao buscar administradores:', err);
//             return res.status(500).json({ 
//                 message: 'Erro interno ao buscar administradores' 
//             });
//         }
    
//     db_ifarma.query(queryFuncionario , (err,resultsFuncionario) => {
//         if(err){
//             console.error('erro ao buscar funcionários' , err);
//             return res.status(500).json({
//                 message : 'Erro interno ao buscar funcionários '
//             });
//         }

//         const combinedResultes = [...resultsFuncionario , ...resultsAdministrador];
//         res.status(200).json(combinedResultes);

//         });
//     });
// });

app.listen(port, () => {
    console.log(`Servidor de funcionários rodando em http://localhost:${port}`);
});
