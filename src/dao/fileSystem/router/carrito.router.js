import { Router, json } from 'express';
import fs from 'fs';
import path from 'path';
import { __dirname } from '../../../util';

const router = Router();
const productRouter = path.join(__dirname, 'files', 'product.json');
const carritoRouter = path.join(__dirname, 'files', 'carrito.json');

function getProduct() {
    if (fs.existsSync(productRouter)) {
        return JSON.parse(fs.readFileSync(productRouter, 'utf-8'));
    } else {
        return [];
    }
}

function getCarrito() {
    if (fs.existsSync(carritoRouter)) {
        return JSON.parse(fs.readFileSync(carritoRouter, 'utf-8'));
    } else {
        return [];
    }
}

function guardarCarrito(carrito) {
    fs.writeFileSync(carritoRouter, JSON.stringify(carrito, null, 5));
}

router.post('/', (req, res) => {
    let carrito = getCarrito();

    const nuevoCarrito = {
        id: carrito.length > 0 ? carrito[carrito.length - 1].id + 1 : 1,
        getProduct: [],
    };

    carrito.push(nuevoCarrito);
    guardarCarrito(carrito);

    res.status(201).json({ nuevoCarrito });
});

router.get('/:cid', (req, res) => {
    const carritoId = parseInt(req.params.cid);
    const carrito = getCarrito();
    const carriTo = carrito.find((cart) => cart.id === carritoId);
    if (carriTo) {
        res.json(carriTo.getProduct);
    } else {
        res.status(404).json('UPS, carrito no encontrado');
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const carritoId = parseInt(req.params.cid);
    const getProductId = parseInt(req.params.pid);
    const { quantity } = req.body;
    const product = getProduct();
    const carrito = getCarrito();
    const carritoIndex = carrito.findIndex((cart) => cart.id === carritoId);
    const productExistente = carrito[carritoIndex].getProduct.find(
        (item) => item.product === getProductId
    );
    
    if (productExistente) {
        productExistente.quantity += quantity;
    } else {
        carrito[carritoIndex].getProduct.push({
            product: getProductId,
            quantity: quantity,
        });
    }
    
    guardarCarrito(carrito);
    
    res.status(200).json({ actualizarCarrito: carrito });
});

export default router;