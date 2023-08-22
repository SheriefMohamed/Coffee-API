import { pool } from "../config/database";
import { RowDataPacket } from 'mysql2';
import { Item } from "../interfaces/Item";

export class ItemsService{
    insertItem = async (data: Item) => {
        const {name, category, price} = data;
        const [rows] = await pool.query(
            `INSERT INTO items (name, category, price) 
            VALUES ('${name}','${category}',${price})`
        )
        return rows
    }

    getAllItems = async () => {
        const [rows] = await pool.query(`SELECT * FROM items`)
        return rows
    }

    getSingleItem = async (itemId: number) => {
        const [rows] = await pool.query(`SELECT * FROM items WHERE id = ${itemId}`);
        if (Array.isArray(rows) && rows.length > 0) {
            const firstRow = rows[0] as RowDataPacket;
            return firstRow
        }
    } 

    updateItem = async (itemId: number, data: Item) => {
        const {name, category, price} = data;
        const [rows] = await pool.query(`UPDATE items SET 
        name = '${name}', category = '${category}', price = ${price}
        WHERE id = ${itemId}`);
        return rows
    }

    deleteItem = async (itemId: number) => {
        const [rows] = await pool.query(`DELETE FROM items WHERE id = ${itemId}`);
        return rows
    }
}