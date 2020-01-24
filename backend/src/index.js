const express = require('express'); //agora temos o express disponivel dentro da variavel express
const mongoose = require('mongoose');//mongoose importado para o projeto
const cors = require('cors');//para permitir que o front possa se comunicar com nosso backend
const http = require('http');

const routes = require('./routes'); //importando o routes 
const { setupWebsocket } = require ('./websockt')//aquie esta dentro de  chaves pq esta importando somente a funcao setupWebsocket

//const pq o valor n vai ser alterado 
const app = express();
const server = http.Server(app);//aqui e para poder trabalhar com websockt

setupWebsocket(server);

//aqui dentro vai a string de conexao que pegamos do mongodb atlas
mongoose.connect('mongodb+srv://gustavo:25578237@cluster0-itmnu.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//esse ponto use quer dizer que e algo que vai ser usado por todas as rotas da aplicação
app.use(cors());//assim ele libera o asseço para qualquer aplicacao app.use(cors({ origin: 'http://localhost:3000'})) assim da pra fazer que somente essa assece
app.use(express.json());
app.use(routes);

//apartir de agora a aplicação vai estar rodando nessa porta no localhost
server.listen(3333);