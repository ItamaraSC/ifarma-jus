CREATE DATABASE IF NOT EXISTS db_ifarma
COLLATE utf8mb4_general_ci CHARSET utf8mb4; 
USE db_iFarma; 

 
CREATE TABLE IF NOT EXISTS tb_farmacia(  
Id_Farmacia INT PRIMARY KEY  AUTO_INCREMENT, 
Nome VARCHAR(255) NOT NULL,
Telefone VARCHAR (15) NOT NULL, 
Email VARCHAR(80) NOT NULL,
Endereco VARCHAR(255)
); 

CREATE TABLE IF NOT EXISTS tb_usuario( 
Id_Usuario INT AUTO_INCREMENT PRIMARY KEY, 
Nome VARCHAR(100) NOT NULL, 
CPF VARCHAR(14) UNIQUE NOT NULL, 
Senha VARCHAR(20) NOT NULL, 
Tipo_Usuario ENUM ('Administrador','Farmaceutico', 'Atendente') NOT NULL
); 
  INSERT INTO tb_usuario (Nome, CPF, Senha, Tipo_Usuario) VALUES  
    ('MH', '9090', '0123', 'Administrador'),
    ('Itamara', '8080', '4567', 'Administrador'),
    ('Gersiane', '7070', '8910', 'Administrador');
    
  
CREATE TABLE IF NOT EXISTS tb_login ( 
	Id_usuario INT NOT NULL, 
    Ultimo_Acesso DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    CONSTRAINT fk_id_usuario_login FOREIGN KEY (Id_usuario) REFERENCES tb_usuario (Id_usuario) 
); 

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


CREATE TABLE IF NOT EXISTS tb_produto( 
Id_Produto INT PRIMARY KEY AUTO_INCREMENT, 
Nome VARCHAR(100) NOT NULL, 
SKU VARCHAR(20) NOT NULL, 
Descricao VARCHAR(255), 
Dt_Fabrica DATE NOT NULL, 
Dt_Validade DATE NOT NULL, 
Qtd_Prod INT NOT NULL, 
Vlr DECIMAL(10,2) NOT NULL, 
Lote_Prod VARCHAR(20) NOT NULL, 
Receita_Medica ENUM('SIM' , 'NÃO') NOT NULL,
Categoria VARCHAR(50) NOT NULL
); 

 
CREATE TABLE IF NOT EXISTS tb_estoque (  
Id_Estoque INT PRIMARY KEY AUTO_INCREMENT, 
Qtd_Estoque INT NOT NULL,
Id_Fornecedor int not null,
Id_Produto int not null, 
constraint fk_id_produto foreign key (Id_Produto) references tb_produto (Id_Produto),
constraint fk_id_fornecedor foreign key (Id_Fornecedor) references tb_Fornecedor (Id_Fornecedor)
); 


CREATE TABLE IF NOT EXISTS tb_venda( 
 Id_Venda INT PRIMARY KEY AUTO_INCREMENT, 
 Vlr_Total DECIMAL(10,2) NOT NULL, 
 Forma_Pag ENUM('Dinheiro','Pix', 'Débito', 'Crédito'),
Qtd_Prod INT NOT NULL, 
Num_Vend int not null ,
Id_Cliente int not null,
Dt_Venda date not null, 
Id_Produto int not null,
constraint fk_id_produto_venda foreign key (Id_Produto) references tb_produto (Id_Produto),
CONSTRAINT fk_id_cliente FOREIGN KEY (Id_Cliente) REFERENCES tb_cliente (Id_Cliente)
 ); 
 


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
Produto VARCHAR(255) not null , 
Qtd_pedida int not null , 
Vlr_Unitario_Prod DECIMAL(10,2) NOT NULL,  
Vlr_Total DECIMAL(10,2) NOT NULL,
Id_Fornecedor int not null,
CONSTRAINT fk_fornecedor_pedido FOREIGN KEY ( Id_Fornecedor) REFERENCES tb_Fornecedor ( Id_Fornecedor)
); 


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




 