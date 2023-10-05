//import Path from 'path';
//import { Server } from 'socket.io';

const express = require('express');
const routerProduct = require('./router/products.router');
const app = express();
const port = 3000; 
const nombreDeLaEmpresa = 'MG lo quiero 3D';

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/profile', routerProduct);

function prendiendoApp() {
    console.log('prendiendoApp');
}
prendiendoApp();

try {
    app.listen(port); 
    console.log('arrancamos en el ${port}');
}

catch(error) {
    console.log('`Error al arrancar la aplicacion ${error}');
};

//export { serverSocket };