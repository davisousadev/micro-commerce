import { FastifyRequest, FastifyReply } from "fastify";
import { Product } from "../model/schema";
import { CreateProductSchema, UpdateProductSchema, DeleteProductSchema } from "../schemas/product.schema";

export const createProduct = async (
    request: FastifyRequest<{ Body: CreateProductSchema }>,
    reply: FastifyReply
) => {
    try {
        const { nome, preco, estoque } = request.body;
        const newProduct = new Product({
            nome,
            preco,
            estoque
        });
        await newProduct.save();
        return reply.status(201).send({
            data: newProduct,
            message: "Produto criado com sucesso"
        });
    } catch (error) {
        return reply.status(500).send({
            message: "Erro ao criar produto",
        });
    }
};

export const getProducts = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const products = await Product.find();
        return reply.status(200).send({
            data: products,
            message: "Produtos listados com sucesso"
        });
    } catch (error) {
        return reply.status(500).send({
            message: "Erro ao listar produtos"
        });
    }
};

export const getProductById = async (
    request: FastifyRequest<{ Params: DeleteProductSchema }>,
    reply: FastifyReply
) => {
    try {
        const { id } = request.params;
        const product = await Product.findById(id);
        if (!product) {
            return reply.status(404).send({
                message: "Produto não encontrado"
            });
        }
        return reply.status(200).send({
            data: product,
            message: "Produto encontrado com sucesso"
        });
    } catch (error) {
        return reply.status(500).send({
            message: "Erro ao buscar produto"
        });
    }
};

export const updateProduct = async (
    request: FastifyRequest<{ Params: DeleteProductSchema; Body: UpdateProductSchema }>,
    reply: FastifyReply
) => {
    try {
        const { id } = request.params;
        const { nome, preco, estoque } = request.body;

        const product = await Product.findById(id);
        if (!product) {
            return reply.status(404).send({
                message: "Produto não encontrado"
            });
        }

        if (nome !== undefined) product.nome = nome;
        if (preco !== undefined) product.preco = preco;
        if (estoque !== undefined) product.estoque = estoque;

        await product.save();

        return reply.status(200).send({
            data: product,
            message: "Produto atualizado com sucesso"
        });
    } catch (error) {
        return reply.status(500).send({
            message: "Erro ao atualizar produto"
        });
    }
};

export const deleteProduct = async (
    request: FastifyRequest<{ Params: DeleteProductSchema }>,
    reply: FastifyReply
) => {
    try {
        const { id } = request.params;
        const result = await Product.findByIdAndDelete(id);
        if (!result) {
            return reply.status(404).send({
                message: "Produto não encontrado"
            });
        }
        return reply.status(200).send({
            message: "Produto removido com sucesso"
        });
    } catch (error) {
        return reply.status(500).send({
            message: "Erro ao remover produto"
        });
    }
};
