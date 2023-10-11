import { Schema, model } from "mongoose";

const mensageColl = 'carrito';

const mensageSchema = new Schema({
    usuario: String,
    mensage: String,
}, { strick: true });

export const mensageModulo = model(mensageColl, mensageSchema);