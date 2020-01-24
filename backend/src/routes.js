//para poder importar apenas algo de um metodo podemos usar {} 
const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

//metodos HTTP: GET, POST, PUT, DELETE

//tipos de parametros:

//Query param: request.query (filtros, ordenação, paginação, ....)
//Route Params: request.params (identificar um recurso na alteração, remoção)
//Body: request.bady (dados para criação ou alteração de um registro)
//mongodb (um banco não relacional)

//rota para listar os devs cadastrados
routes.get('/devs', DevController.index);
//aqui pega o controller que vai fazer essa função com o .store que nesse caso e o nome da função 
routes.post('/devs', DevController.store);  

//rota da busca
routes.get('/search', SearchController.index);

// exportando esse obj routes
module.exports = routes;