import { Router, Router } from 'express';
import __dirname from '../../../util'; nuevo
import { serverSocket } from '../../../app';
import { mensageModal } from '../moduls/mensages.modulo';
//import router from '../../../router/products.router';

const Router = Router();

router.get('/', async (req, res) => {
    let mensaje = await mensageModal.find();
    res.json(mensaje);
});

router.post('/', async (req, res) => {
    const {
        user,
        mensaje
    } = req.body;
    try {
        const nuevoMessage = new mensageModal.create({
            user,
            mensaje
        })
        await nuevoMessage.save();
        let mensaje = await mensageModal.find();
        serverSocket.emit('nuevoMensaje', nuevoMensaje, mensaje);
        res.status(201).json({ mensaje: 'Mensaje enviado', user: user, text:  mensaje});
    } catch(error) {
        res.status(500).json({ error: 'No esperaba este error' });
    }
});

router.delete('/', async (req, res) => {
    let eliminarChat = await mensageModal.deteleMany({}); 
    res.status(201).json({ mensaje: 'Se elimino el chat' });
    let mensaje = await mensageModal.find();
    serverSocket.emit('limpiarMensaje', mensaje);
});

export default router;