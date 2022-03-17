//Utilise le 'http' basique de node pour créer le serveur 
const http = require('http');
//Appelle le fichier app.js
const app = require('./app');

//Permet de renvoyer un port valide
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
//Va chercher le PORT dans le fichier .env
const port = process.env.PORT;
app.set('port', port);

//Cherche les différentes erreurs et les gère de manière appropriée
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

//Crée le serveur avec le fichier app.js
const server = http.createServer(app);

server.on('error', errorHandler);
//eventListener, consignant le port ou le canal nommé sur le lequel le serveur s'éxécute dans la console
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);