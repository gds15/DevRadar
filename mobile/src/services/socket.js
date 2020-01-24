import socketio from 'socket.io-client';

const socket = socketio('http://192.168.1.103:3333', { //aqui e a msm url do api
    autoConnect: false,//n permitir a auto cenexao
});

//parte para mostrar a msg de um novo deve cadastrado
function subscribeToNewDevs(subscribeFunction) {
    socket.on('new-dev', subscribeFunction);
}

function connect(latitude, longitude, techs) {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs,
    };

    socket.connect();
}

function disconnect() {
    if (socket.connected) {
        socket.disconnect();
    }
}

//aqui esta exportando as 2 funcoes
export {
    connect,
    disconnect,
    subscribeToNewDevs,
}