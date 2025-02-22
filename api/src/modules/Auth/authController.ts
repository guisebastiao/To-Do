import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "@/modules/Auth/authService";
import { ServerError, FieldErrors } from "@/utils/ServerErrorHandler";
import { ZodError } from "zod";
import {
  loginSchema,
  LoginData,
  RegistaData,
  registerSchema,
} from "@/modules/Auth/authSchema";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(
    request: FastifyRequest<{ Body: LoginData }>,
    reply: FastifyReply
  ) {
    try {
      const parsed = loginSchema.safeParse(request.body);

      if (!parsed.success) {
        const errors: ZodError = parsed.error;

        const error: FieldErrors = {
          fieldErrors: errors.errors.map((err) => ({
            field: err.path.join("."),
            error: err.message,
          })),
        };

        throw new ServerError(422, "Erro de validação", error.fieldErrors);
      }

      await this.authService.login(request.body, reply);

      return reply
        .status(200)
        .send({ status: 200, message: "Login bem sucedido" });
    } catch (error) {
      if (error instanceof ServerError) {
        return reply.status(error.status).send(error.getResponse());
      }

      return reply.status(500).send({
        status: 500,
        message: "Algo deu errado, tente novamente mais tarde",
      });
    }
  }

  async register(
    request: FastifyRequest<{ Body: RegistaData }>,
    reply: FastifyReply
  ) {
    try {
      const parsed = registerSchema.safeParse(request.body);

      if (!parsed.success) {
        const errors: ZodError = parsed.error;

        const error: FieldErrors = {
          fieldErrors: errors.errors.map((err) => ({
            field: err.path.join("."),
            error: err.message,
          })),
        };

        throw new ServerError(422, "Erro de validação", error.fieldErrors);
      }

      await this.authService.register(request.body, reply);

      return reply
        .status(201)
        .send({ status: 201, message: "Cadastrado concluido" });
    } catch (error) {
      if (error instanceof ServerError) {
        return reply.status(error.status).send(error.getResponse());
      }

      return reply.status(500).send({
        status: 500,
        message: "Algo deu errado, tente novamente mais tarde",
      });
    }
  }

  async logout(_request: FastifyRequest, reply: FastifyReply) {
    try {
      return reply
        .clearCookie("token")
        .status(200)
        .send({ status: 200, message: "Logout bem sucedido" });
    } catch (error) {
      return reply.status(500).send({
        status: 500,
        message: "Algo deu errado, tente novamente mais tarde",
      });
    }
  }
}
