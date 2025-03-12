const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app =express();
const port = 3010;

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
        console.log('Error ao conectar ao database:' + err.stack);
        return;
    }
    console.log('conectado ao database');
});

app.post('/Registro/Venda' , (req,res) => {

    const { Num_Vend , Id_Cliente , Forma_Pag , Dt_Venda , Id_Produto , Vlr_Total  , Qtd_Prod} = req.body;

    if(!Num_Vend || !Id_Cliente || !Forma_Pag || !Dt_Venda || !Id_Produto || !Vlr_Total || !Qtd_Prod){
        return res.status(400).json({ 
            message: 'Por favor, preencha todos os campos' 
        });
    }

    const query = 'INSERT INTO tb_venda (Num_Vend , Id_Cliente , Forma_Pag , Dt_Venda , Id_Produto , Vlr_Total , Qtd_Prod) VALUES (?,?,?,?,?,?,?)';
    db_ifarma.execute(query, [Num_Vend , Id_Cliente , Forma_Pag , Dt_Venda , Id_Produto , Vlr_Total , Qtd_Prod], (err, result) => {
        if(err){
            console.log('Erro ao cadastrar venda' ,err);
            return res.status(500).json({
                message : 'Erro interno ao cadastrar venda'
            });
        }

        return res.status(200).json({
            message : 'Venda cadastrada'
        });
        
    });
});

app.get('/Registro/Venda/Cliente', (req, res) => {
    const queryCliente = 'SELECT Id_Cliente , Nome FROM tb_cliente ';
    db_ifarma.query(queryCliente , (err, result) => {
        if(err){
            console.log('Erro ao listar clientes' ,err);
            return res.status(500).json({
                message : 'ocorreu um erro interno no sistema'
            });
        }

        console.log('cliente carregado' , result);
        res.status(200).json(result);
    });
});

app.get('/Registro/Venda/Produto' , (req,res) => {
    const queryProduto = 'SELECT Id_Produto , Nome FROM tb_produto ';
    db_ifarma.query(queryProduto , (err, results) =>{
        if(err){
            console.log('erro ao listar os produtos' , err);
            return res.status(500).json({
                message : 'ocorreu um erro interno no sistema',
                error: err.message
            });
        }
        console.log('produtos carregado' , results);
        res.status(200).json(results);
    });
});

app.listen(port , () => {
    console.log(`Servidor rodando na porta ${port}`);
})