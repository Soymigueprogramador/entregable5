import { Schema, model } from "mongoose";
import mongoosePagina from 'mongoose-paginate-v2';

const productColl = 'product';

const productSchema = new Schema({
    id: String,
    titulo: String,
    descripcion: String,
    code: String,
    precio: Number,
    status: Boolean,
    miniatura: String, 
    stock: Number,
    categoria: String
}, { strick: true }); 

productSchema.plugin(mongoosePagina);

export const productModulo = model(productColl, productSchema);