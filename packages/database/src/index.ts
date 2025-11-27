import dotenv from "dotenv";
dotenv.config();

console.log(process.env.DATABASE_URL);

export { prisma } from "./client.js";

export * from "../generated/client/index.js";

export { Prisma } from "../generated/client/index.js";