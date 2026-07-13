import z from "zod";

export const productSchema = z.object({
    nome: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres"),
    preco: z.number().positive("Preço deve ser maior que 0"),
    estoque: z.number().positive("Estoque deve ser maior que 0").default(0),
});

export const createProductSchema = productSchema;

export const updateProductSchema = z.object({
    nome: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres").optional(),
    preco: z.number().positive("Preço deve ser maior que 0").optional(),
    estoque: z.number().positive("Estoque deve ser maior que 0").optional(),
});

export const deleteProductSchema = z.object({
    id: z.string(),
});

export type ProductSchema = z.infer<typeof productSchema>;
export type CreateProductSchema = z.infer<typeof createProductSchema>;
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
export type DeleteProductSchema = z.infer<typeof deleteProductSchema>;
