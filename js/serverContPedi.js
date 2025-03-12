const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3009;

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
        console.log('Error ao conectar ao database:', err.stack);
        return;
    }
    console.log('Connectado ao database:');
});

app.post('/Controle/Pedido' , (req,res) => {

    const { Status_Pedido , Dt_Entrega , Dt_pedido  , Produto , Qtd_pedida , Vlr_Unitario_Prod , Vlr_Total , Id_Fornecedor } = req.body;

    if(!Status_Pedido || !Dt_Entrega || !Dt_pedido ||!Produto ||!Qtd_pedida ||!Vlr_Unitario_Prod ||!Vlr_Total || !Id_Fornecedor ){
        return res.status(400).json({
             message: 'Por favor, preencha todos os campos'
            });

    }

    const query = 'INSERT INTO tb_pedido (Status_Pedido , Dt_Entrega , Dt_pedido  , Produto , Qtd_pedida , Vlr_Unitario_Prod , Vlr_Total , Id_Fornecedor ) VALUES (?,?,?,?,?,?,?,?)';
    db_ifarma.execute(query , [Status_Pedido , Dt_Entrega , Dt_pedido  , Produto , Qtd_pedida , Vlr_Unitario_Prod , Vlr_Total , Id_Fornecedor  ] , (err,result) => {
        if(err){
            console.log('erro ao controlar pedido' ,err);
            return res.status(500).json({
                message : 'ocorreu um erro interno no sistema'
            });
        }

        res.status(200).json({
            message : 'Pedido controlado com sucesso'
        });

    });
});

app.get('/Status/Pedido' , (req,res) => {

    const statusPendente = 'SELECT Id_pedido FROM tb_pedido WHERE Status_pedido ="Pendente"';
    const statusAprovado = 'SELECT Id_pedido FROM tb_pedido WHERE Status_pedido ="Aprovado"';
    const statusCancelado = 'SELECT Id_pedido FROM tb_pedido WHERE Status_pedido ="Cancelado"';
    const statusEnviado = 'SELECT Id_pedido FROM tb_pedido WHERE Status_pedido ="Enviado"';
    const statusRecebido = 'SELECT Id_pedido FROM tb_pedido WHERE Status_pedido ="Recebido"';

    db_ifarma.query(statusPendente , (err,resultPendente) => {
        if(err){
            console.log('Erro ao listar pedidos pendentes' ,err);
            return res.status(500).json({
                message : 'ocorreu um erro interno no sistema'
            });
        }

    db_ifarma.query(statusAprovado , (err,resultAprovado) => {
        if(err){
            console.log('Erro ao listar pedidos aprovados' ,err);
            return res.status(500).json({
                message : 'ocorreu um erro interno no sistema'
            });
        }

    db_ifarma.query(statusCancelado , (err,resultCancelado) => {
        if(err){
            console.log('Erro ao listar pedidos cancelados' ,err);
            return res.status(500).json({
                message : 'ocorreu um erro interno no sistema'
            });
        }

    db_ifarma.query(statusEnviado , (err,resultEnviado) => {
        if(err){
            console.log('Erro ao listar pedidos enviados' ,err);
            return res.status(500).json({
                message : 'ocorreu um erro interno no sistema'
            });
        }

    db_ifarma.query(statusRecebido , (err,resultRecebido) => {
        if(err){
            console.log('Erro ao listar pedidos recebidos' ,err);
            return res.status(500).json({
                message : 'ocorreu um erro interno no sistema'
            });
        }    
    
        const combinedResultes = [...resultPendente , ...resultAprovado , ...resultCancelado , ...resultEnviado , ...resultRecebido];
        res.status(200).json(combinedResultes);

    });
        });
            });
                });
                    });

});


app.get('/Fornecedor' , (req,res) => {
    const query = 'SELECT Id_Fornecedor , Nome FROM  tb_fornecedor ';

    db_ifarma.execute(query , (err,result) => {
        if(err){
            console.error('Erro ao listar fornecedores' ,err);
            return res.status(500).json({
                message : 'ocorreu um erro interno no sistema'
            });
        }
        
        console.log('fornecedores encontrado' ,result)
        res.status(200).json(result);
    })
});


app.listen(port , () => {
    console.log(`servidor rodando na porta  http://localhost:${port}`);
});