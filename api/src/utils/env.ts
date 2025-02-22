import { config } from "dotenv";
config();

export const databaseUrl = process.env.DATABASE_URL as string;
export const jwtSecret = process.env.JWT_SECRET as string;
export const jwtExpirate = process.env.JWT_EXPIRATE as string;
