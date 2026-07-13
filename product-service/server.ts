import Fastify from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import mongoose from "mongoose";
import { productRoutes } from "./src/routes/product.route";

const app = Fastify({
    logger: true,
}).withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(productRoutes);

const MONGO_URI = 'mongodb://localhost:27017/product_db';

mongoose.connect(MONGO_URI)
    .then(() => console.log('🍃 MongoDB conectado com sucesso!'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

const start = async () => {
    try {
        await app.listen({ port: 3001 });
        console.log("Product service is running on http://localhost:3001");
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
