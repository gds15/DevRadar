//funcao para tranformar um array em string para n ter que ficar repetindo codigo
module.exports = function parseStringAsArray(arrayAsString) {
    //transformar a string das tecnologias em array separando por virgula e o .map para retirar os espaços entre as techs não atrapalha se no meio da palavra tiver espaço
    return arrayAsString.split(',').map(techs => techs.trim());
}