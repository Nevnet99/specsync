import { FastifyInstance } from "fastify";

export const authenticationRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/login",
    handler: async (request, reply) => {
      return reply.status(200).send({ message: "Hello, world!" });
    },
  });
};
