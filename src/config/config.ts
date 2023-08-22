import dotenv from "dotenv";
dotenv.config({path: './src/config/.env'});

export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;

export const DB_HOST = process.env.DB_HOST

export const DB_USER = process.env.DB_USER

export const DATABASE = process.env.DATABASE 

export const DB_PASSWORD = process.env.DB_PASSWORD 