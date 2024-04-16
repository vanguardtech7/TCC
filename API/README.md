
# API DO TCC

Api de gerenciamento/agendamento de impressora 3D


## Stacks utilizadas

- Express
- Cors
- Dotenv
- SMTP Google
- NodeMailer
- Node.js
- JWT
- Sequelize
- MySQL
- Cyclic
-


## Documentação da API

#### Realizar o login

```http
  POST /login
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**.|
| `senha` | `string` | **Obrigatório**.|


#### Rota cadastro do usuário

```http
  POST /cadastro-user
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**.|
| `email` | `string` | **Obrigatório**.|
| `senha` | `string` | **Obrigatório**.|
| `cargo` | `string` | **Obrigatório**.|
| `turma` | `string` | **Opcional**.|

#### Rota cadastro do Gestor


```http
  POST /cadastro-gestor
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**.|
| `email` | `string` | **Obrigatório**. |
| `senha` | `string` | **Obrigatório**. |

#### Envia email de recuperaçao de senha

```http
  POST /reset-password
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**.|


#### Rota para redefinir a senha

```http
  POST /redefinir-senha
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `senha`      | `string` | **Obrigatório**.|


#### Rota cadastro de materiais


```http
  POST /materiais
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `cor` | `string` | **Obrigatório**.|
| `quantidade` | `interger` | **Obrigatório**.|
| `diametro` | `string` | **Obrigatório**.|
| `material` | `string` | **Obrigatório**.|
| `peso` | `double` | **Obrigatório**. |


#### Rota para buscar todos os materiais


```http
  GET /materiais
```
### Rota para deletar um material

```http
  DELETE /materiais/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `ID`      | `string` | **Obrigatório**.|


## Usado por 

Esse projeto é usado pela seguinte empresa:

- Senai suiço-brasileira, São Paulo.



## Autores

- [@Douglasrochass](https://www.github.com/Douglasrochass)

