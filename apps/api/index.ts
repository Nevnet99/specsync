import { env } from "./env";
import Fastify from "fastify";
import { healthRoutes } from "./modules/health/routes";
import { authenticationRoutes } from "./modules/authentication/routes";

const fastify = Fastify({
  logger: true,
});

const start = async () => {
  const address = env.PORT || 3000;

  try {
    await fastify.register(healthRoutes, { prefix: "/health" });
    await fastify.register(authenticationRoutes, { prefix: "/authentication" });
    await fastify.listen({ port: address });

    fastify.log.info(`Server is running on ${address}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
