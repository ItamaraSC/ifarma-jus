const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3008;

app.use(cors());
app.use(bodyParser.json());

const db_ifarma = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : 'senha',
    database : 'db_ifarma',
    port : 3306
});

db_ifarma.connect((err) => {
    if (err) {
        console.log('erro ao conectar ao banco ' + err.stack);
        return;
    }
    console.log('conectado ao banco ');
});

app.post('/Controle/Receitas' , (req,res) => {
    const { Nome_Paciente , Cod_Receita , Nome_Medico , CRM_Medico , Dt_Emissao , Prescricao , Dt_Validade} = req.body;

    if(!Nome_Paciente || !Cod_Receita || !Nome_Medico || !CRM_Medico || !Dt_Emissao || !Prescricao || !Dt_Validade){
        return res.status(400).json({
            message : 'preencha todos os campos'
        });
    }
     
    const query = 'INSERT INTO tb_receita (Nome_Paciente , Cod_Receita , Nome_Medico , CRM_Medico , Dt_Emissao , Prescricao , Dt_Validade) VALUES (?,?,?,?,?,?,?)';
    db_ifarma.execute(query , [Nome_Paciente , Cod_Receita , Nome_Medico , CRM_Medico , Dt_Emissao , Prescricao , Dt_Validade] , (err, result) => {

        if(err){
            console.log('Erro ao cadastrar' ,err);
            return res.status(500).json({
                message : 'ocorreu um erro interno no sistema'
            });
        }
        res.status(200).json({
            message : 'Receita cadastrada com sucesso'
        });
    });
});


// app.get('/Fornecedores' , (req,res) => {

//     const query = 'SELECT '
// })

app.listen(port , () =>{
    console.log(`o sistema está rodando na porta http://localhost:${port}`);
});