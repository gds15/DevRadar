const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');//importação do pointschema da pasta utils

//schema e a estruturacao dentro do banco de dados passando os campos que o usuario vai ter
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema, //esse e o que importamos que estamos usando aqui
        index: '2dsphere'
    }
});

//exportar o model
module.exports = mongoose.model('Dev', DevSchema);
