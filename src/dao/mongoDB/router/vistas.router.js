import { Router } from 'express';
import __dirname from '../../../util'; 

const router = Router();

router.get('/', (req, res) => {
    res.setHeader('content-type', 'text/html');
    res.status(200).render('home');
});

router.get('/realTimeProductos', (req, res) => {
    res.setHeader('content-type', 'text/html');
    res.status(200).render('realTimeProductos');
});

router.get('/chat', (req, res) => {
    res.setHeader('content-type', 'text/html');
    res.status(200).render('chat');
});

router.get('/product', (req, res) => {
    res.setHeader('content-type', 'text/html');
    res.status(200).render('product');
});

router.get('/product/:id', (req, res) => {
    const productId = req.params.id;
    res.setHeader('content-type', 'text/html');
    res.status(200).render('productDetail', { productId });
});

router.get('/carrito/:id', (req, res) => {
    const carritoId = req.params.id;
    res.setHeader('content-type', 'text/html');
    res.status(200).render('carritoDetail', { carritoId });
});

export default router; 