# agenda-node-react-fullstack

Um exemplo simples desenvolvido em Node.js utilizando JavaScript como base.

* Projeto dividido em três partes:
	* [backend](#backend)
	* [frontend](#frontend)
	* [mobile](#mobile)

<br>

## [backend](/backend)

RESTful API desenvolvida em Node.js utilizando: JavaScript, Sequelize, JWT, documentação com Swagger (OpenAPI 3.0.2) e banco de dados MySQL (SQLite para testes).

As configurações estão nos arquivos **.env** (*que foram mantidos por esse ser um projeto de exemplo*): [.env.development](/backend/config/.env.development) / [.env.test](/backend/config/.env.test)

* Para criar todas as tabelas usando as ***migrations***, utilizar o seguinte comando:
	> npm | yarn cross-env NODE_ENV=env.development sequelize db:migrate

*OBS: O comando só irá criar as tabelas, ou seja, o banco de dados já deve estar criado.*

<br>

## [frontend](/frontend)

Cliente WEB para consumir a API, desenvolvido utilizando: ReactJS e React Redux.

<br>

## [mobile](/mobile)

Cliente Mobile para consumir a API, desenvolvido utilizando React Native.