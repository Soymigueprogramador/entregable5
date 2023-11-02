import { Schema, model } from "mongoose";
import { carritoRouter } from '../router/carrito.router';

const carritoColl = 'carrito';

const carritoSchema = new Schema({
    id_usuario: Number,
    product: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'product' },
            quantity: Number,
        },
    ],
});

export default modules