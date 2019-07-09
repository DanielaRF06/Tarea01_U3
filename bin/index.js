                                    //Archivo inicial.

const app = require('../server');
const config = require('../_config');

const server = require('http').Server(app); // pasa config de express al modulo http

const port = config.PORT; //obtiene puerto

server.listen(port); // ejecuta el servidor

console.log(`Server is running on port ${port}`);
 