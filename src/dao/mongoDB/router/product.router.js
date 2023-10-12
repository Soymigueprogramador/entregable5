import { Router } from 'express';
import path from 'path';  
import { serverSocket } from '../../../app';
import { productModel } from '../models/productos.modelo';

const router = Router();

router.get('/', async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;  
    const opciones = {
        page: parseInt(page),
        limit: parseInt(limit)
    };
    if (sort) {
        const ordenarSort = sort === 'asc' ? 1 : sort === 'desc' ? -1 : 0;
        if (ordenarSort !== 0) {
            opciones.sort = { price: ordenarSort };
        }
        const filter = query ? { category: query } : {};
        try {
            const productos = await productModel.paginate(filter, opciones);
            const respuestaDeDatos = {
                productos: productos.docs,
                totalPage: productos.totalPages,  
                hasPrevPage: productos.hasPrevPage,
                hasNextPage: productos.hasNextPage,
                prevPage: productos.prevPage,
                nextPage: productos.nextPage
            };
            res.status(200).json(respuestaDeDatos);
        } catch (error) {
            res.status(500).json({ error: 'Encontré un error cuando buscamos tu producto' });  
        }
    }
});

router.get('/:pid', async (req, res) => {
    let producto = await productModel.findOne({ id: req.params.pid });
    res.json(producto);
});

router.post('/', async (req, res) => {
    let productos = await productModel.find();
    const listaProductos = await productModel.findOne({}, {}, { sort: { id: -1 } });
    const listId = listaProductos ? listaProductos.id : 0;
    const siguienteId = listId + 1;  
    const {
        titulo,
        descripcion,
        code,
        precio,  
        miniatura,
        status,
        categoria
    } = req.body;
    
    
    try {
        let nuevoProducto = await productModel.create({
            id: siguienteId,
            titulo,
            descripcion,
            code,
            precio,
            miniatura,
            status: true,
            categoria
        });
        await nuevoProducto.save();
        let productos = await productModel.find();
        serverSocket.emit('nuevoProducto', nuevoProducto, producto);
        res.status(201).json({ mensaje: 'Ya creamos tu producto', producto: nuevoProducto });
    } catch (error) {
        res.status(500).json({ error: 'Error inesperado', mensaje: error.message });  
    }
});

router.put('/:id', async (req, res) => {
    try {
        const productoId = parseInt(req.params.id);
        const productToUpdate = await productModel.findOne({ id: productoId });
        if (!productToUpdate) {
            return res.status(404).json({ message: 'Producto no encontrado' });
            const {
                titulo,
                descripcion,
                code,
                precio,  
                miniatura,
                status,
                categoria
            } = req.body;
            productToUpdate.titulo = titulo,
            productToUpdate.descripcion = descripcion,
            productToUpdate.code = code,
            productToUpdate.precio = precio,
            productToUpdate.miniatura = miniatura,
            productToUpdate.status = status,
            productToUpdate.categoria = categoria;
            await productToUpdate.save();
            res.status(200).json({ mensaje: 'Producto modificado', producto: productToUpdate })
        }
    } catch (error) {
        res.status(500).json({ error: 'Error inesperado', mensaje: error.message });  
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const productoId = parseInt(req.params.id);
        const productToUpdate = await productModel.findOneAndRemove({ id: productoId });
        if (!productToUpdate) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        const product = await productModel.find();
        serverSocket.emit('productDelete', { productId, product });
        res.status(200).json({ mensaje: 'Producto eliminado', product: productToUpdate })
    } catch (error) {
        res.status(500).json({ error: 'Error inesperado', mensaje: error.message });  
    }
});

export default router;