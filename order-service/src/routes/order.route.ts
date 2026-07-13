import { FastifyInstance } from "fastify";
import { createOrder, getOrders } from "../controllers/order.controller";
import { CreateOrderSchema } from "../schemas/order.schema";

export async function orderRoutes(app: FastifyInstance) {

    app.post('/order', { schema: { body: CreateOrderSchema } }, createOrder);

    app.get('/order', getOrders);
}   