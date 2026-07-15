import Fastify from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { productRoutes } from "./src/routes/product.route";
import { connectDatabase } from "./src/config/database";

const app = Fastify({
    logger: true,
}).withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(productRoutes);

const start = async () => {
    try {
        connectDatabase();
        await app.listen({ port: 3001, host: '0.0.0.0' });
        console.log("Product service is running on http://localhost:3001");
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
