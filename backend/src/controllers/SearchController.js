const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    //parte responsavel pela busca na parte mobile da aplicacao
    async index(request, response) {
        //console.log(request.query);
        const { latitude, longitude, techs} = request.query;
        
        const techsArray = parseStringAsArray(techs);

        //formar uma lista de devs 
        const devs = await Dev.find({//aqui dentro do {} esta o filtro que sera usado na busca
            //filtro das techs
            techs: {
                $in: techsArray,
            },
            //filtro localização
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    //aqui passa a distancia maxima em metros
                    $maxDistance: 10000,
                },
            },
        });
        //console.log(devs);
        return response.json({ devs });
        
    }
}