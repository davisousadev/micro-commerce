import { FastifyInstance } from "fastify";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller";
import {
    createProductSchema,
    updateProductSchema,
    deleteProductSchema
} from "../schemas/product.schema";

export async function productRoutes(app: FastifyInstance) {

    app.post("/products", {
        schema: {
            body: createProductSchema
        }
    }, createProduct);

    app.get("/products", getProducts);

    app.get("/products/:id", {
        schema: {
            params: deleteProductSchema
        }
    }, getProductById);

    app.put("/products/:id", {
        schema: {
            params: deleteProductSchema,
            body: updateProductSchema
        }
    }, updateProduct);

    app.delete("/products/:id", {
        schema: {
            params: deleteProductSchema
        }
    }, deleteProduct);
}
