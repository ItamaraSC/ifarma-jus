const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 3013;

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
    console.log('Connected to the database.');
});

app.get('/Historico/Vendas' , (re,res) => {

    const query = `SELECT Id_Cliente , Forma_Pag , Vlr_Total  , DATE_FORMAT(Dt_Venda , '%d/%m/%Y' ) AS Dt_Venda, Id_Produto FROM tb_venda `;

    db_ifarma.query(query , (err,result) => {

        if(err){
            console.log('Erro ao listar histórico de vendas' ,err);
            return res.status(500).json({
                message : 'ocorreu um erro interno no sistema'
            });
        }

        if(result.length === 0){
            return res.status(404).json({
                message : 'Nenhuma venda encontrada'
            });
        }

        console.log("vendas carregadas" , result);

        res.status(200).json(result);

    });

});



app.listen(port , () => {
    console.log(`Servidor de histórico de vendas rodando em http://localhost:${port}`);
});