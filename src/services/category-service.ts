import { pool } from "../config/database";
import { RowDataPacket } from 'mysql2';
import { Category } from "../interfaces/Category";

export class categoryService{
    insertCategory = async (data: Category) => {
        const {name} = data;
        const [rows] = await pool.query(
            `INSERT INTO category (name) 
            VALUES ('${name}')`
        )
        return rows
    }

    getAllCategories = async () => {
        const [rows] = await pool.query(`SELECT id, name FROM category`)
        return rows
    }

    getArrayOfCategories = async () => {
        const [rows] = await pool.query(`SELECT name FROM category`)
        const categoryNames: string[] = (rows as RowDataPacket[]).map((row: any) => row.name);
        return categoryNames;
    }

    getSingleCategory = async (categoryId: number) => {
        const [rows] = await pool.query(`SELECT id, name FROM category WHERE id = ${categoryId}`);
        if (Array.isArray(rows) && rows.length > 0) {
            const firstRow = rows[0] as RowDataPacket;
            return firstRow
        }
    } 

    updateCategory = async (categoryId: number, data: Category) => {
        const {name} = data;
        const [rows] = await pool.query(`UPDATE category SET 
        name = '${name}'
        WHERE id = ${categoryId}`);
        if ('affectedRows' in rows) {
            const affectedRows = rows.affectedRows;
            return affectedRows
        }
    }
}