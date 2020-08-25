# agenda-node-react-fullstack

Um exemplo simples desenvolvido em Node.js utilizando JavaScript como base.

* Projeto dividido em três partes:
	* [backend](#backend)
	* [frontend](#frontend)
	* [mobile](#mobile)

<br>

## [backend](/backend)

RESTful API desenvolvida em Node.js utilizando: JavaScript, Sequelize, JWT, documentação com Swagger (OpenAPI 3.0.2) e banco de dados MySQL (SQLite para testes).

As configurações de conexão com o banco de dados estão no arquivo: [backend/src/configs/database.js](/backend/src/configs/database.js)

* Para criar todas as tabelas usando as ***migrations***, utilizar o seguinte comando:
	> npm | yarn sequelize db:migrate --env development

*OBS: O comando só irá criar as tabelas, ou seja, o banco de dados já deve estar criado.*

<br>

## [frontend](/frontend)

Cliente WEB para consumir a API, desenvolvido utilizando: ReactJS e React Redux.

<br>

## [mobile](/mobile)

Cliente Mobile para consumir a API, desenvolvido utilizando React Native.