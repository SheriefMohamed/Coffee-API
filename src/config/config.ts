import dotenv from "dotenv";
dotenv.config({path: './src/config/.env'});

export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;

export const NODE_ENV = process.env.NODE_ENV;

export const DB_HOST = process.env.DB_HOST;

export const DB_USER = process.env.DB_USER;

export const DATABASE = process.env.DATABASE; 

export const DB_PASSWORD = process.env.DB_PASSWORD; 

export const JWT_SECRET = process.env.JWT_SECRET as string; 

export const JWT_EXPIRES_TIME = process.env.JWT_EXPIRES_TIME as string; 

export const COOKIE_EXPIRES_TIME = Number(process.env.COOKIE_EXPIRES_TIME) as number; 