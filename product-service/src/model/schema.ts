import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    estoque: { type: Number, default: 0 }
});

export const Product = mongoose.model('Product', ProductSchema);