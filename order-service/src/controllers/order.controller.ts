import { FastifyReply, FastifyRequest } from "fastify";
import { CreateOrderInput } from "../schemas/order.schema";
import { Order } from "../model/order.model";
import amqp from 'amqplib';

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://127.0.0.1:3001';

export const createOrder = async (request: FastifyRequest<{ Body: CreateOrderInput }>, reply: FastifyReply) => {
    const { produtoId, quantidade } = request.body;

    try {
        const response = await fetch(`${PRODUCT_SERVICE_URL}/products/${produtoId}`);

        if (response.status === 404) {
            return reply.status(404).send({ erro: 'Produto selecionado não existe no catálogo!' });
        }

        if (!response.ok) {
            return reply.status(502).send({ erro: 'Erro ao consultar o serviço de produtos' });
        }

        const produto = await response.json();

        if (produto.data.estoque < quantidade) {
            return reply.status(400).send({ erro: 'Estoque insuficiente para a compra!' });
        }

        const precoTotal = produto.data.preco * quantidade;

        const novoPedido = await Order.create({
            produtoId,
            quantidade,
            precoTotal
        });

        const conexaoRabbit = await amqp.connect(process.env.RABBITMQ_URL || "amqp://localhost");
        const canal = await conexaoRabbit.createChannel();
        await canal.assertQueue("fila_pedidos");
        await canal.sendToQueue("fila_pedidos", Buffer.from(JSON.stringify(novoPedido)));

        return reply.status(201).send({
            data: novoPedido,
            message: "Pedido criado com sucesso"
        });

    } catch (err) {
        return reply.status(500).send({ erro: 'Erro interno ao processar pedido' });
    }
}

export const getOrders = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const orders = await Order.findAll();
        return reply.status(200).send({
            data: orders,
            message: "Pedidos listados com sucesso"
        });
    } catch (error) {
        return reply.status(500).send({
            message: "Erro ao listar pedidos"
        });
    }
}   