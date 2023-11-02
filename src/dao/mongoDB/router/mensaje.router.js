/*import { Router } from 'express';
import __dirname from '../../../util.js'; 
import { serverSocket } from '../../../app';
import { mensageModal } from '../moduls/mensages.modulo';
import router from '../../../router/products.router';

const router = express.Router();

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

export default router;*/ 



import express from 'express';
const filePath = __dirname + '/archivo.txt';
import express from 'express';
import { serverSocket } from '../../../app';
import mensageModal from '../moduls/mensages.modulo';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const mensajes = await mensageModal.find();
        res.json(mensajes);
    } catch (error) {
        res.status(500).json({ error: 'No se pudieron obtener los mensajes' });
    }
});

router.post('/', async (req, res) => {
    const { user, mensaje } = req.body;
    try {
        const nuevoMensaje = new mensageModal({
            user,
            mensaje
        });
        await nuevoMensaje.save();
        const mensajes = await mensageModal.find();
        serverSocket.emit('nuevoMensaje', nuevoMensaje, mensajes);
        res.status(201).json({ mensaje: 'Mensaje enviado', user: user, text: mensaje });
    } catch (error) {
        res.status(500).json({ error: 'No se pudo enviar el mensaje' });
    }
});

router.delete('/', async (req, res) => {
    try {
        await mensageModal.deleteMany({});
        const mensajes = await mensageModal.find();
        serverSocket.emit('limpiarMensaje', mensajes);
        res.status(201).json({ mensaje: 'Se eliminó el chat' });
    } catch (error) {
        res.status(500).json({ error: 'No se pudo eliminar el chat' });
    }
});

export default router;