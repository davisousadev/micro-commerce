import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/product_db';

export const connectDatabase = () => {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('🍃 MongoDB conectado com sucesso!'))
        .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));
};