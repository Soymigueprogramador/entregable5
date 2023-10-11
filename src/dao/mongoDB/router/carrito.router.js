import { Router } from "express";
import path from 'path'; 
import { carritoModel } from '../models/carrito.modulo'; 
import { productModel } from '../models/productos.modulo'; 

const router = Router(); 

router.post('/', async (req, res) => {
    const listaProduct = await carritoModel.findOne({}, {}, { sort: { id: -1 } });
    const listaId = listaProduct ? listaProduct.id : 0;
    const siguienteId = listaId + 1;
    try {
        let nuevoCarrito = await carritoModel.create({
            id: siguienteId,
            product: []
        });
        await nuevoCarrito.save();
        res.status(201).json({ mensaje: 'Carrito creado', carrito: nuevoCarrito });
    } catch (error) {
        res.status(500).json({ error: 'Error inesperado', detalle: error.message }); // Cambia 'mensage' a 'message'
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const carrito = await carritoModel.findOne({ id: parseInt(req.params.cid) }).populate('product.product');
        if (!carrito) {
            return res.status(404).json({ error: 'Tu carrito no existe' });
        }
        res.status(200).json({ mensaje: 'Carrito encontrado', carrito });
    } catch (error) {
        res.status(500).json({ error: 'Error inesperado', detalle: error.message });
    }
});

router.post('/:cid/product/:pid', async (req, res) => { 
    try {
        const { cid, pid } = req.params;
        const carrito = await carritoModel.findOne({ id: parseInt(cid) });
        const product = await productModel.findOne({ id: parseInt(pid) });
        if (!carrito || !product) { // Cambia 'OR' a '||'
            return res.status(404).json({ error: 'Tu carrito o tu producto no fue encontrado' });
        }
        const productoExistente = carrito.product.find(item => item.product.toString() === product.id.toString());
        if (productoExistente) {
            productoExistente.quantity++; 
        } else {
            carrito.product.push({ product: product.id, quantity: 1 });
        }
        await carrito.save();
        const nuevoCarrito = await carritoModel.findOne({ id: parseInt(cid) });
        res.status(200).json({ mensaje: 'Tu producto fue agregado al carrito', nuevoCarrito });
    } catch (error) {
        res.status(500).json({ error: 'Error inesperado', detalle: error.message });
    }
});

router.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const { product } = req.body; 
        const carrito = await carritoModel.findOne({ id: parseInt(cid) });
        if (!carrito) {
            return res.status(404).json({ error: 'Tu carrito no existe' });
        }
        carrito.product = product; 
        await carrito.save();
        res.status(200).json({ mensaje: 'Tu carrito esta actualizado', carrito });
    } catch (error) {
        res.status(500).json({ error: 'Error inesperado', detalle: error.message });
    }
});

router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const carrito = await carritoModel.findOne({ id: parseInt(cid) });
        if (!carrito) {
            return res.status(404).json({ error: 'Tu carrito no aparece' });
        }
        carrito.product = carrito.product.filter(product => product.product !== parseInt(pid));
        await carrito.save();
        res.status(200).json({ mensaje: 'Producto a fuera del carrito', carrito }); 
    } catch (error) {
        res.status(500).json({ error: 'Error inesperado', detalle: error.message });
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const carrito = await carritoModel.findOne({ id: parseInt(cid) });
        if (!carrito) {
            return res.status(404).json({ error: 'Tu carrito no aparece' });
        }
        carrito.product = [];
        await carrito.save();
        res.status(200).json({ mensaje: 'Carrito vacío', carrito }); 
    } catch (error) {
        res.status(500).json({ error: 'Error inesperado', detalle: error.message });
    }
});

export default router;