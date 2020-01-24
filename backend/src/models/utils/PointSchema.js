const mongoose = require('mongoose');

//aqui e para poder armazenar a latitude longitude das cordenadas dos endereços dos dvs
const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        require: true,
    },
    coordinates: {
        type: [Number],
        require: true,
    }
});

//importar depois dentro do Dev.js
module.exports = PointSchema;