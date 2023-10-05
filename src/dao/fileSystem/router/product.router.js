import { Router, json } from 'express';
import fs from 'fs';
import path from 'path';
import { __dirname } from '../../../util';
import {serverSocket } from '../../../app';
const router = Router();

const ruta = path.join(__dirname, 'files', 'product.json');
    console.log('ruta completa', ruta);

function getProduct() {
    if (fs.existsSync(productRouter)) {
        return JSON.parse(fs.readFileSync(productRouter, 'utf-8'));
    } else {
        return [];
    }
}

function guardarCarrito(carrito) {
    fs.writeFileSync(carritoRouter, JSON.stringify(carrito, null, 5));
}

router.get('/', (req, res) => {
    let product = getProduct();
    const { limit } = req.query;
    if(limit) {
        const limitValue = parseInt(limit);
        if(!isNaN(limitValue)) {
            product = product.slice(0, limitValue);
        }
    }
    res.json(product);
});

router.get('/:pid', (req, res) => {
    const getProductId = parseInt(req.params.pid);
    const product = getProduct();
    const producT = product.find(product => product.id === getProductId); 
    if (producT) {
        res.json(product);
    } else {
        res.status(404).json({message:'No existe el producto'});
    }
});

router.post('/', (req, res) => {
    const { titulo, descripcion, codigo, precio, miniatura, stock, categoria } = req.body;
    if (titulo || descripcion || codigo || precio || miniatura || stock || categoria) {
        return RESERVED_EVENTS.status(400).JSON(error, 'Por favor complete los campos que son requeridos');
    }
    const product = getProduct();
    const nuevosProductos = {
        titulo,
        descripcion,
        codigo,
        precio,
        status: true,
        miniatura,
        stock,
        categoria,
        id: carrito.length > 0 ? carrito[carrito.length - 1].id + 1 : 1,
    };
    product.push(nuevosProductos);
    serverSocket.emit('nuevosProductos', nuevosProductos, product);
    guardarProductos(product); 
    res.status(201).json('nuevosProductos');
});

router.post('/', (req, res) => {
    const { titulo, descripcion, codigo, precio, miniatura, stock, categoria } = req.body;
    if (titulo || descripcion || codigo || precio || miniatura || stock || categoria) {
        return RESERVED_EVENTS.status(400).JSON(error, 'Por favor complete los campos que son requeridos');
    }
    const product = getProduct();
    const productIndex = product.findIndex(product => product.id === productId);
    if(productIndex !== - 1) {
        const miniaturaOriginal = product[productIndex].miniatura;
        product[productIndex] = {
            titulo,
            descripcion,
            codigo,
            precio,
            status: true,
            miniatura: miniatura || miniaturaOriginal,
            stock,
            categoria,
            id: productIndex,
        };
        guardarProductos(product);
        res.status(404).json(productosActualizados, product[productIndex]);
    } else {
        res.status(404).json({message:'No existe el producto'});
    }
});

router.delete('/:pid', (req, res) => {
    const getProductId = parseInt(req.params.pid);
    const product = getProduct();
    const productIndex = product.findIndex(product => product.id === productId);
    if(productIndex !== - 1) {
        const eliminarProduct = product.splice(product, 1); 
        guardarProductos(product);
        serverSocket.emit('eliminarProduct', { productId, product });
        res.status(200).json(eliminarProduct, eliminarProduct[0]);
    } else {
        res.status(404).json({message:'No existe el producto'});
    }
});

export default router;