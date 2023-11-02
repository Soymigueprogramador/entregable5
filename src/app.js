/*import Path from 'path';
//import { Server } from 'socket.io';

const express = require('express');
const routerProduct = require('./router/products.router');
import vistasRouter from './dao/mongoDB/router/vistas.router';
import carritoRouter from './dao/mongoDB/router/carrito.router';
import usuarioRouter from './dao/mongoDB/router/usuarios.router';
import mensajeRouter from './dao/mongoDB/router/mensaje.router'; 
import { Server } from 'socket.io'; 
import { engine } from 'express-handlebars'; 
import __dirname from './util';
import mongoose from 'mongoose'; 
//import connectMongo from 'connect-mongo';

const app = express();
const port = 3000; 
const nombreDeLaEmpresa = 'MG lo quiero 3D';

app.engine('handlebars', engine({ allowProtoMethodsByDefaul: true }));
app.set('view engine', 'handlebars');
app.use('viwes', Path(__dirname, '/vista'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/profile', routerProduct);
app.use(express.static(Path.join(__dirname, '/public')));
app.use('/api/vistas', vistasRouter);
app.use('/api/carrito', carritoRouter);
app.use('/api/menssage', menssageRouter);
app.use('/api/user', usuarioRouter);
app.use('/api/product', productRouter); 

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

//export { serverSocket };*/












import express from 'express';
import productsRouter from './router/products.router.js';
import vistasRouter from './dao/mongoDB/router/vistas.router.js';
import carritoRouter from './dao/mongoDB/router/carrito.router.js';
//import usuariosRouter from './dao/mongoDB/router/usuarios.router.js';
import mensajeRouter from './dao/mongoDB/router/mensaje.router.js';
import { server } from 'socket.io';
import { engine } from 'express-handlebars';
import path from 'path';
import mongoose from 'mongoose';

const app = express();
const port = 3000;
const nombreDeLaEmpresa = 'MG lo quiero 3D';

app.engine('handlebars', engine({ allowProtoPropertiesByDefault: true }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/profile', routerProduct);
app.use('/api/vistas', vistasRouter);
app.use('/api/carrito', carritoRouter);
app.use('/api/mensaje', mensajeRouter);
app.use('/api/user', usuarioRouter);
app.use('/api/product', routerProduct);

function prendiendoApp() {
    console.log('prendiendoApp');
}

prendiendoApp();

try {
    app.listen(port, () => {
        console.log(`Arrancamos en el puerto ${port}`);
    });
} catch (error) {
    console.log(`Error al arrancar la aplicación: ${error}`);
}


// export { serverSocket };
