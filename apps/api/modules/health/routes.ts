import { FastifyInstance } from "fastify";
import { sql } from "../../db/client";
import { env } from "../../env";

export const healthRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "GET",
    url: "/",
    handler: async (request, reply) => {
      const uptime = Math.floor(process.uptime());
      const timestamp = new Date().toISOString();

      let databaseStatus = "error";
      let databaseLatency = 0;
      try {
        const t0 = Date.now();
        const databasePing = await sql`SELECT 1`;
        const t1 = Date.now();

        databaseLatency = t1 - t0;
        databaseStatus = databasePing.length > 0 ? "ok" : "error";
      } catch (error) {
        databaseStatus = "error";
      }

      return reply.status(200).send({
        status: "ok",
        uptime: `${uptime}s`,
        timestamp,
        environment: env.NODE_ENV,
        dependencies: {
          database: {
            status: databaseStatus,
            timestamp: new Date().toISOString(),
            latency: `${databaseLatency}ms`,
          },
        },
      });
    },
  });
};
