import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DATABASE, DB_PASSWORD} from './config'

export const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    database: DATABASE,
    password: DB_PASSWORD,
});