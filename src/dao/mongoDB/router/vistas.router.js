import { Router } from 'express'
import path from 'path'; 

const router = Router(); 

router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html'); 
    res.status(200).render(path.join(__dirname, 'home')); 
});

router.get('/realTimeProductos', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render(path.join(__dirname, 'realTimeProductos'));
});

router.get('/chat', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render(path.join(__dirname, 'chat'));
});

router.get('/product', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render(path.join(__dirname, 'product'));
});

router.get('/product/:id', (req, res) => {
    const productId = req.params.id;
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render(path.join(__dirname, 'productDetail'), { productId });
});

router.get('/carrito/:id', (req) => {
    const carritoId = req.params.id;
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render(path.join(__dirname, 'carritoDetail'), { carritoId });
});

export default router;