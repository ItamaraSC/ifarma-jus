const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3004;

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
        console.log('Error ao conectar ao database:'+ err.stack);
        return;
    }
    console.log('conectado ao banco com sucesso ');
});

app.post('/Cadastrar/Produtos' , (req,res) => {
    const { Nome , SKU , Descricao , Dt_Fabrica ,  Dt_Validade ,  Qtd_Prod , Vlr , Lote_Prod  , Categoria , Receita_Medica } = req.body;

    if(!Nome || !SKU || !Descricao || !Dt_Fabrica || !Dt_Validade || !Qtd_Prod || !Vlr || !Lote_Prod || !Categoria || !Receita_Medica){
        return res.status(400).json({
            message : 'Todos os campos são obrigatórios'
        });
    }
    
    const query = 'INSERT INTO tb_produto (Nome, SKU, Descricao, Dt_Fabrica, Dt_Validade, Qtd_Prod, Vlr, Lote_Prod , Categoria , Receita_Medica ) VALUES (?,?,?,?,?,?,?,?,?,?)';
    db_ifarma.execute(query, [Nome , SKU , Descricao , Dt_Fabrica ,  Dt_Validade ,  Qtd_Prod , Vlr , Lote_Prod , Categoria , Receita_Medica ] , (err, result) => {
        if(err){
            console.log('erro ao cadastrar usuario' ,err);
            return res.status(500).json({
                message : 'ocorreu um erro interno no sistema'
            });
        }
        res.status(200).json({
            message : 'Produto cadastro realizado com sucesso!'
        });
    });
});



app.listen(port , () => {
    console.log(`servidor rodando na porta  http:/localhost${port}`);
});