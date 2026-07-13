import Fastify from 'fastify';
import { orderRoutes } from './src/routes/order.route';
import { connectDatabase } from './src/config/database';
import { ZodTypeProvider, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

const fastify = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

fastify.register(orderRoutes);

const start = async () => {
    try {
        await connectDatabase();
        await fastify.listen({ port: 3002 });
        console.log('🛒 Order Service rodando em http://localhost:3002');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();