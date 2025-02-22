import { app } from "@/app";
import { prisma } from "./utils/prisma";

const server = app();

const start = async () => {
  try {
    await server.listen({ port: 3333, host: "0.0.0.0" });
    console.log("Server Running");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
