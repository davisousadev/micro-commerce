import z from "zod"

export const OrderSchema = z.object({
  id: z.string(),
  produtoId: z.string(),
  quantidade: z.number(),
  precoTotal: z.number(),
  status: z.string().default("PAGO"),
});

export const CreateOrderSchema = z.object({
  produtoId: z.string(),
  quantidade: z.number(),
});

export const UpdateOrderSchema = z.object({
  status: z.string(),
});

export type OrderInput = z.infer<typeof OrderSchema>;
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
export type UpdateOrderInput = z.infer<typeof UpdateOrderSchema>;