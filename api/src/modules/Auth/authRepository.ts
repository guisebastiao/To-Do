import { prisma } from "@/utils/prisma";
import { RegistaData } from "@/modules/Auth/authSchema";

export class AuthRepository {
  async login(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async register(data: RegistaData) {
    return prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
