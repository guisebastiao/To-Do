import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import fastifyJWT, { JWT } from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import { jwtSecret, jwtExpirate } from "@/utils/env";

import { authRoutes } from "@/modules/Auth";
import { taskRoutes } from "@/modules/Task";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: string;
      email: string;
      name: string;
    };
  }
}

const whitelist = ["http://localhost:5173", "http://10.0.0.101:5173"];

export const app = () => {
  const app = Fastify();

  app.register(fastifyJWT, {
    secret: jwtSecret,
    cookie: {
      cookieName: "token",
      signed: false,
    },
    sign: {
      expiresIn: jwtExpirate + "ms",
    },
  });

  app.register(fastifyCookie);

  app.register(fastifyCors, {
    origin: whitelist,
    credentials: true,
  });

  app.register(fastifyHelmet);

  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch {
        reply.clearCookie("token");

        reply
          .status(401)
          .send({ status: 401, message: "Você precisa fazer login" });
      }
    }
  );

  app.addHook("preHandler", (req, _reply, next) => {
    req.jwt = app.jwt;
    return next();
  });

  app.register(authRoutes);
  app.register(taskRoutes);

  return app;
};
