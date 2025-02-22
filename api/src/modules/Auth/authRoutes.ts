import { FastifyInstance } from "fastify";
import { AuthController } from "@/modules/Auth/authController";

export const authRoutes = (app: FastifyInstance) => {
  const authController = new AuthController();

  app.post("/login", authController.login.bind(authController));
  app.post("/register", authController.register.bind(authController));
  app.post("/logout", authController.logout.bind(authController));
};
