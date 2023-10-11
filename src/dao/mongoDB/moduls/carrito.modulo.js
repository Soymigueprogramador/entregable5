import { Schema, model } from "mongoose";

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

export const carritoModulo = model(carritoColl, carritoSchema)