CREATE DATABASE IF NOT EXISTS db_ifarma
COLLATE utf8mb4_general_ci CHARSET utf8mb4; 
USE db_iFarma; 
  
-- CREATE TABLE IF NOT EXISTS tb_endereco( 
-- Id_Endereco INT PRIMARY KEY  AUTO_INCREMENT, 
-- Logradouro VARCHAR(255) NOT NULL, 
-- Numero INT NOT NULL, 
-- Complemento VARCHAR(255) NOT NULL, 
-- Bairro VARCHAR (255) NOT NULL, 
-- Cidade VARCHAR (255) NOT NULL, 
-- Estado VARCHAR (255) NOT NULL, 
-- CEP VARCHAR (55) NOT NULL, 
-- Pais VARCHAR (255) NOT NULL 
-- ); 
 
CREATE TABLE IF NOT EXISTS tb_farmacia(  
Id_Farmacia INT PRIMARY KEY  AUTO_INCREMENT, 
Nome VARCHAR(255) NOT NULL,
Telefone VARCHAR (15) NOT NULL, 
Email VARCHAR(80) NOT NULL,
Endereco VARCHAR(255)
-- nota fiscal
-- Id_Endereco  varchar(255) NOT NULL,  
-- CONSTRAINT fk_id_endereco_farmacia FOREIGN KEY (Id_Endereco) REFERENCES tb_Endereco (Id_Endereco)
); 
-- select * from tb_usuario;
CREATE TABLE IF NOT EXISTS tb_usuario( 
Id_Usuario INT AUTO_INCREMENT PRIMARY KEY, 
Nome VARCHAR(100) NOT NULL, 
CPF VARCHAR(14) UNIQUE NOT NULL, 
Senha VARCHAR(20) NOT NULL, 
-- Telefone VARCHAR (15) NOT NULL, 
-- Email VARCHAR(80) NOT NULL,
-- Status_Conta BOOLEAN NOT NULL, 
-- Dt_Hr_Criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
Tipo_Usuario ENUM ('Administrador','Farmaceutico', 'Atendente') NOT NULL
); 
  INSERT INTO tb_usuario (Nome, CPF, Senha, Tipo_Usuario) VALUES  
    ('MH', '9090', '0123', 'Administrador'),
    ('Itamara', '8080', '4567', 'Administrador'),
    ('Gersiane', '7070', '8910', 'Administrador');
    
--   select * from tb_produto;
  
CREATE TABLE IF NOT EXISTS tb_login ( 
	Id_usuario INT NOT NULL, 
    Ultimo_Acesso DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    CONSTRAINT fk_id_usuario_login FOREIGN KEY (Id_usuario) REFERENCES tb_usuario (Id_usuario) 
); 
--     SELECT Nome , Dt_Validade , sku FROM tb_produto WHERE Nome LIKE '%paracetamol%';


CREATE TABLE IF NOT EXISTS tb_cliente (  
Id_Cliente int auto_increment primary key,
CPF VARCHAR(14) not null, 
Nome VARCHAR(100) NOT NULL,
Telefone VARCHAR (15) NOT NULL, 
Email VARCHAR(80) NOT NULL
); 

CREATE TABLE IF NOT EXISTS tb_fornecedor(  
Id_Fornecedor INT PRIMARY KEY AUTO_INCREMENT, 
Nome VARCHAR(255) NOT NULL, 
CNPJ VARCHAR(18) NOT NULL, 
Telefone VARCHAR (15) NOT NULL, 
Email VARCHAR(80) NOT NULL,
Codigo VARCHAR(255) NOT NULL, 
Endereco varchar(255) NOT NULL,  
Prod_Forn varchar (255) not null,
Pagamento int not null
); 
-- select * from tb_produto;
-- select * from tb_fornecedor;

CREATE TABLE IF NOT EXISTS tb_produto( 
Id_Produto INT PRIMARY KEY AUTO_INCREMENT, 
Nome VARCHAR(100) NOT NULL, 
SKU VARCHAR(20) NOT NULL, 
-- Codigo int not null , 
Descricao VARCHAR(255), 
Dt_Fabrica DATE NOT NULL, 
Dt_Validade DATE NOT NULL, 
Qtd_Prod INT NOT NULL, 
Vlr DECIMAL(10,2) NOT NULL, 
Lote_Prod VARCHAR(20) NOT NULL, 
Receita_Medica ENUM('SIM' , 'NÃO') NOT NULL,
Categoria VARCHAR(50) NOT NULL
-- Vlr_Unitario_Venda DECIMAL(10,2) NOT NULL
); 

 -- select * from tb_fornecedor;
-- CREATE TABLE IF NOT EXISTS tb_fornecedor_prod( 
-- Id_Fornecedor_Prod INT AUTO_INCREMENT PRIMARY KEY, 
-- Id_Fornecedor INT NOT NULL, 
-- Id_Produto INT NOT NULL, 
-- CONSTRAINT fk_id_fornecedor FOREIGN KEY (Id_Fornecedor) REFERENCES tb_Fornecedor (Id_Fornecedor), 
-- CONSTRAINT fk_id_produto FOREIGN KEY (Id_Produto) REFERENCES tb_Produto (Id_Produto) 
-- ); 
 
CREATE TABLE IF NOT EXISTS tb_estoque (  
Id_Estoque INT PRIMARY KEY AUTO_INCREMENT, 
Qtd_Estoque INT NOT NULL,
Id_Fornecedor int not null,
Id_Produto int not null, 
-- Movimentacao  BOOLEAN NOT NULL, 
-- Motivo_Mov VARCHAR(255) NOT NULL 
constraint fk_id_produto foreign key (Id_Produto) references tb_produto (Id_Produto),
constraint fk_id_fornecedor foreign key (Id_Fornecedor) references tb_Fornecedor (Id_Fornecedor)
); 

-- select * from tb_venda;
CREATE TABLE IF NOT EXISTS tb_venda( 
 Id_Venda INT PRIMARY KEY AUTO_INCREMENT, 
 -- Dt_Hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
 Vlr_Total DECIMAL(10,2) NOT NULL, 
 Forma_Pag ENUM('Dinheiro','Pix', 'Débito', 'Crédito'),
--  Id_Venda_Prod INT AUTO_INCREMENT PRIMARY KEY, 
Qtd_Prod INT NOT NULL, 
Num_Vend int not null ,
Id_Cliente int not null,
Dt_Venda date not null, 
Id_Produto int not null,
-- Id_Venda INT NOT NULL, 
-- Id_Estoque INT NOT NULL, 
-- Id_Farmacia  INT NOT NULL, 
constraint fk_id_produto_venda foreign key (Id_Produto) references tb_produto (Id_Produto),
CONSTRAINT fk_id_cliente FOREIGN KEY (Id_Cliente) REFERENCES tb_cliente (Id_Cliente)
-- CONSTRAINT fk_id_estoque_venda FOREIGN KEY (Id_Estoque) REFERENCES tb_Estoque (Id_Estoque), 
-- CONSTRAINT fk_cpf_venda_prod FOREIGN KEY (CPF) REFERENCES tb_Cliente (CPF), 
-- CONSTRAINT fk_id_farmacia_venda_prod FOREIGN KEY (Id_Farmacia) REFERENCES tb_Farmacia (Id_Farmacia) 
 ); 
 

-- select * from tb_venda;
--  CREATE TABLE IF NOT EXISTS tb_venda_prod( 
-- Id_Venda_Prod INT AUTO_INCREMENT PRIMARY KEY, 
-- Qtd_Prod INT NOT NULL, 
-- Id_Venda INT NOT NULL, 
-- Id_Estoque INT NOT NULL, 
-- CPF VARCHAR(14) NULL, 
-- Id_Farmacia  INT NOT NULL, 
-- CONSTRAINT fk_id_venda_prod FOREIGN KEY (Id_Venda) REFERENCES tb_Venda (Id_Venda), 
-- CONSTRAINT fk_id_estoque_venda FOREIGN KEY (Id_Estoque) REFERENCES tb_Estoque (Id_Estoque), 
-- CONSTRAINT fk_cpf_venda_prod FOREIGN KEY (CPF) REFERENCES tb_Cliente (CPF), 
-- CONSTRAINT fk_id_farmacia_venda_prod FOREIGN KEY (Id_Farmacia) REFERENCES tb_Farmacia (Id_Farmacia) 
-- ); 
 
CREATE TABLE IF NOT EXISTS tb_nota_fiscal ( 
Id_Nota INT PRIMARY KEY AUTO_INCREMENT, 
Dt_Emissao DATE NOT NULL, 
Subtotal DECIMAL(10,2) NOT NULL, 
Impostos DECIMAL(10,2) NOT NULL, 
Vlr_Total DECIMAL(10,2) NOT NULL, 
Id_Venda INT NOT NULL, 
CONSTRAINT fk_id_venda_nota_fical FOREIGN KEY (Id_Venda) REFERENCES tb_Venda (Id_Venda) 
); 
 
CREATE TABLE IF NOT EXISTS tb_hist_venda ( 
Id_Hist_venda INT PRIMARY KEY AUTO_INCREMENT, 
Dt_Hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
Id_venda INT NOT NULL, 
CONSTRAINT fk_id_venda_Hist FOREIGN KEY (Id_Venda) REFERENCES tb_Venda (Id_Venda) 
); 
 
CREATE TABLE IF NOT EXISTS tb_receita( 
Id_Receita int PRIMARY KEY auto_increment, 
Nome_Paciente VARCHAR(100) NOT NULL, 
-- Cod_Paciente int not null, 
Cod_Receita varchar(20) not null, 
Nome_Medico VARCHAR(100) NOT NULL, 
CRM_Medico VARCHAR(30) NOT NULL, 
Dt_Emissao date  NOT NULL, 
Prescricao varchar (200), 
Dt_Validade date NOT NULL 
);

CREATE TABLE IF NOT EXISTS tb_receita_venda( 
Id_Venda INT NOT NULL, 
Id_Receita int not null, 
PRIMARY KEY (Id_Venda, Id_Receita ), 
CONSTRAINT fk_id_venda_prod_receita FOREIGN KEY (id_Venda) REFERENCES tb_Venda (Id_Venda), 
CONSTRAINT fk_id_receita_venda_prod FOREIGN KEY (Id_Receita) REFERENCES tb_Receita (Id_Receita) 
); 
 
CREATE TABLE IF NOT EXISTS tb_pedido ( 
Id_Pedido INT PRIMARY KEY AUTO_INCREMENT, 
Status_Pedido ENUM ('Pendente', 'Aprovado', 'Cancelado', 'Enviado', 'Recebido'),
Dt_Entrega DATE NOT NULL, 
Dt_pedido date not null, 
-- Observacao Varchar (255), 
Produto VARCHAR(255) not null , 
Qtd_pedida int not null , 
Vlr_Unitario_Prod DECIMAL(10,2) NOT NULL,  
Vlr_Total DECIMAL(10,2) NOT NULL,
-- Dt_Hora DATETIME NOT NULL  DEFAULT CURRENT_TIMESTAMP, 
Id_Fornecedor int not null,
-- Id_Usuario INT NOT NULL, 
CONSTRAINT fk_fornecedor_pedido FOREIGN KEY ( Id_Fornecedor) REFERENCES tb_Fornecedor ( Id_Fornecedor)
-- CONSTRAINT fk_usuario_pedido FOREIGN KEY (Id_Usuario) REFERENCES tb_usuario (Id_Usuario) 
); 

-- select * from tb_pedido;

-- CREATE TABLE IF NOT EXISTS tb_pedido_prod( 
-- Id_Pedido_Prod INT PRIMARY KEY AUTO_INCREMENT, 
-- Id_Pedido INT NOT NULL, 
-- Id_Produto INT NOT NULL, 
-- CONSTRAINT fk_pedido_prod FOREIGN KEY (Id_Pedido) REFERENCES tb_Pedido (Id_Pedido), 
-- CONSTRAINT fk_produto_pedido FOREIGN KEY (Id_Produto) REFERENCES tb_Produto (Id_Produto) 
-- ); 
 
CREATE TABLE IF NOT EXISTS tb_hist_pedido( 
Id_Hist_Pedido INT PRIMARY KEY AUTO_INCREMENT, 
Id_Pedido_Prod INT NOT NULL, 
Dt_Inicial_Consulta DATE NOT NULL, 
Dt_Final_Consulta DATE NOT NULL,
Id_Pedido INT NOT NULL, 
CONSTRAINT fk_pedido_hist FOREIGN KEY (Id_Pedido) REFERENCES tb_Pedido(Id_Pedido) 
); 
 
CREATE TABLE IF NOT EXISTS tb_nota_pedido( 
Id_Nota_Pedido INT AUTO_INCREMENT PRIMARY KEY, 
Dt_Emissao DATE NOT NULL, 
Subtotal DECIMAL(10,2) NOT NULL, 
Impostos DECIMAL(10,2) NOT NULL, 
Vlr_Total DECIMAL(10,2) NOT NULL, 
Id_Pedido INT NOT NULL, 
CONSTRAINT fk_pedido_nota FOREIGN KEY (Id_Pedido) REFERENCES tb_Pedido (Id_Pedido) 
);
 
CREATE TABLE IF NOT EXISTS tb_servico( 
Id_Servico INT PRIMARY KEY AUTO_INCREMENT, 
Nome VARCHAR(100) NOT NULL, 
Preco DECIMAL(10,2) NOT NULL, 
Duracao TIME NOT NULL,
Catg_Servico VARCHAR(50) ,   
Descricao VARCHAR(255) NOT NULL, 
Id_Usuario INT NOT NULL, 
CONSTRAINT fk_usuario_servico FOREIGN KEY (Id_Usuario) REFERENCES tb_usuario (Id_Usuario) 
); 
-- select * from tb_produto;



 