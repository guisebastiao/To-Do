import { ServerError } from "@/utils/ServerErrorHandler";
import { AuthRepository } from "./authRepository";
import { LoginData, RegistaData } from "./authSchema";
import { hashPassword, comparePassword } from "@/utils/hash";
import { jwtExpirate } from "@/utils/env";
import { FastifyReply } from "fastify";

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async login(data: LoginData, reply: FastifyReply) {
    const user = await this.authRepository.login(data.email);

    if (!user) {
      throw new ServerError(404, "Essa conta não está cadastrada");
    }

    const passwordIsCorret = comparePassword(data.password, user.password);

    if (!passwordIsCorret) {
      throw new ServerError(401, "Senha incorreta");
    }

    const token = await reply.jwtSign({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    reply.setCookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "strict",
      maxAge: Number(jwtExpirate),
      path: "/",
    });

    return user;
  }

  async register(data: RegistaData, reply: FastifyReply) {
    const user = await this.authRepository.findByEmail(data.email);

    if (user) {
      throw new ServerError(409, "Esse conta já existe");
    }

    const hashedPassword = hashPassword(data.password);

    const registerData: RegistaData = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    };

    const userCreated = await this.authRepository.register(registerData);

    const token = await reply.jwtSign({
      id: userCreated.id,
      email: userCreated.email,
      name: userCreated.name,
    });

    reply.setCookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "strict",
      maxAge: Number(jwtExpirate),
      path: "/",
    });

    return userCreated;
  }
}
