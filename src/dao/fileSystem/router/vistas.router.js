import { Router } from "express";
import router from "./product.router";

router.get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.status(200).render('home');
});

router.get('/realTimeProducts', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.status(200).render('realTimeProducts');
});