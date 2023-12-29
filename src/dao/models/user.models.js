import mongoose from 'mongoose'; 

const cartCollection = 'carts'; 

const cartSchema = new mongoose.Schema({
    cartId: { type: Number, unique: true, required: true },
    products: [
        new mongoose.Schema(
            {
                productId: { type: Number, required: true },
                quantity: { type: Number, required: true }
            },
            { id: false }
        ),
    ],
});

const productCollection = 'product'; 

const productSchema = new mongoose.Schema({
    productId: {type:Number, unique:true, requiered:true},
    code : {type:String, unique:true, required:true},
    title: {type:String, required:true },
    description : {type:String, required:true },
    price: {type:Number, required:true },
    stock: {type:Number, required:true },
    category: {type:String, required:true },
    thumbnail: [],
    status: {type:Boolean, required:true}   
});

const chatCollection = 'mensaje'; 

const chatSchema = new mongoose.Schema({
    user: String,
    message: String,
});


export const cartModel = mongoose.model (cartCollection, cartSchema)
export const productModel = mongoose.model (productCollection, productSchema)
export const chatModel = mongoose.model (chatCollection, chatSchema) 