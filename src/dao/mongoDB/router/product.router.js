import { Router, Router } from 'express';
import __dirname from '../../../util'; 
import { serverSocket } from '../../../app';
import { productModel } from '../moduls/productos.modulo';
import router from '../../../router/products.router';

const router = Router(); 

/*router.get('/', async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.params;
    const opciones = {
        page: parseInt(page),
        limit :parseInt(limit)
    };
    if(sort) {
        const ordenarSort = sort === 'asc' ? 1: sort === 'desc' ? - 1: 0;
        if(ordenarSort !== 0) {
            opciones.sort = { price: ordenarSort }; 
        }
        const filter = query ? { category: query } 
    }
});*/ 