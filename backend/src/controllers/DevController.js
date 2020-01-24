const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websockt');

//importar o devcontroller no routes.js
module.exports = {
    //metodo para a listagem de tods os devs
    async index(request, response) {
        //aqui poderia passar filtros tbm mais nesse caso so vamos listar todos
        const devs = await Dev.find();

        return response.json(devs);
    },

    //metodo para o cadastro
    async store(request, response) {
        const { github_username, techs, latitude , longitude } = request.body;//pegando somente o githube_username
        
        //agora para evitar de cadastrar o msm dev 2x
        let dev = await Dev.findOne({ github_username });//aqui basicamente procura no banco de dados se existe algum dev ja cadastrado no banco com esse user name

        //se n tiver nenhum dev ja cadastrado fazer o cadastro na base de dados
        if (!dev) {
            //o await faz com que o node espere a resposta da api do git para continuar com a execuçaõ 
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            //console.log(apiResponse.data);
    
            //pegar as informações que eu quero do perfil do git
            const { name = login, avatar_url, bio } = apiResponse.data;//name = login aqui ja esta definindo se o nome n exixtir pra pegar o login no lugar
            //outra forma de fazer se o nome for fazio pergar o login no lugar do nome
            /*if(!name) {
                name = apiResponse.data.login;
            }*/
    
            //transformar a string das tecnologias em array 
            const techsArray = parseStringAsArray(techs);
    
            //console.log(name, avatar_url, bio, github_username);
    
            //para poder pegar as cordenadas da latitude e longitude para poder passar para o create poder cadastrar no banco
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
    
            //retornar para dentro da variavel dev
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            //filtrar as conexoes que estao ha no maximo 10km de distancia
            //e que o novo dev tenha pelo menos uma das tecnologias filtradas

            const sendSocketMEssageTo = findConnections(
                {latitude, longitude},
                techsArray,
            )

            sendMessage(sendSocketMEssageTo, 'new-dev', dev)
        }
    
        return response.json(dev);
    }
}