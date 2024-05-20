create database senai;

use senai;


drop table login;

create table login(
id				int auto_increment,
nome 			varchar(50) not null,
email  		 	varchar(50) not null,
senha			varchar(50) not null,
cargo			varchar(20) not null,
turma			varchar(10) not null,
primary key (id)
);
create table adm(
id_adm			int auto_increment,
email_adm		varchar(50) not null,
senha_adm		varchar(50) not null,
primary key(id_adm)
);

create table pedidos(
id_pedido		int auto_increment,
data 			date not null,
descri			varchar(100) not null,
tempo_impre		time not null,
impre_usando	varchar(20) not null,
primary key(id_pedido)
);

create table cadas_impre(
id_cadas  		int auto_increment,
nome_cadas		varchar(50) not null,
modelo    		varchar(20) not null,
especifi_txt    varchar(100) not null,
primary key(id_cadas)
);


create table maquina(
id_maquina		int auto_increment,		
nome_maquina	varchar(20) not null,
modelo_maquina	varchar(20) not null,
status ENUM('ativo', 'inativo', 'manutencao'),
nome_cadas		varchar(50) not null,
especifi_txt    varchar(100) not null,
capacidade		int(20) not null,
numer_serie		int(20)not null,
entrada_energia		int(10) not null,
primary key(id_maquina)
);