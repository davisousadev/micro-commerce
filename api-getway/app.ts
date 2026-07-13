import Fastify from "fastify";
import replyFrom from "@fastify/reply-from";

const app = Fastify({
  logger: true,
});

// Gateway simple GET health route
app.get("/health", async (request, reply) => {
  return {
    status: "ok",
    service: "api-gateway",
    timestamp: new Date().toISOString(),
  };
});

// Products Gateway Routes (forward /produtos and /produtos/* to http://localhost:3001)
app.register(async (produtosInstance) => {
  produtosInstance.register(replyFrom, {
    base: "http://localhost:3001",
  });

  produtosInstance.all("/products", (request, reply) => {
    reply.from(request.url);
  });

  produtosInstance.all("/products/*", (request, reply) => {
    reply.from(request.url);
  });
});

// Orders Gateway Routes (forward /pedidos and /pedidos/* to http://localhost:3002)
app.register(async (pedidosInstance) => {
  pedidosInstance.register(replyFrom, {
    base: "http://localhost:3002",
  });

  pedidosInstance.all("/pedidos", (request, reply) => {
    reply.from(request.url);
  });

  pedidosInstance.all("/pedidos/*", (request, reply) => {
    reply.from(request.url);
  });
});

// Start the gateway
const start = async () => {
  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Gateway is running on http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
