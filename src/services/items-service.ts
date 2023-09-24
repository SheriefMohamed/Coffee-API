import { pool } from "../config/database";
import { RowDataPacket } from 'mysql2';
import { Item } from "../interfaces/Item";

export class ItemsService{
    insertItem = async (data: Item) => {
        const {name, category, price} = data;
        const [rows] = await pool.query(
            `INSERT INTO item (name, category_id, price) 
            VALUES ('${name}',(SELECT id FROM category WHERE name='${category}'),${price})`
        )
        return rows
    }

    getAllItems = async () => {
        const [rows] = await pool.query(`SELECT id, name, (SELECT name FROM category WHERE id = category_id) AS category, price FROM item`)
        return rows
    }

    getArrayOfItems = async () => {
        const [rows] = await pool.query(`SELECT id FROM item`)
        const itemsIds: number[] = (rows as RowDataPacket[]).map((row: any) => row.id);
        return itemsIds;
    }

    getSingleItem = async (itemId: number) => {
        const [rows] = await pool.query(`SELECT id, name, (SELECT name FROM category WHERE id = category_id) AS category, price FROM item WHERE id = ${itemId}`);
        if (Array.isArray(rows) && rows.length > 0) {
            const firstRow = rows[0] as RowDataPacket;
            return firstRow
        }
    } 

    updateItem = async (itemId: number, data: Item) => {
        const {name, category, price} = data;
        const [rows] = await pool.query(`UPDATE item SET 
        name = '${name}', category_id = (SELECT id FROM category where name='${category}'), price = ${price}
        WHERE id = ${itemId}`);
        if ('affectedRows' in rows) {
            const affectedRows = rows.affectedRows;
            return affectedRows
        }
    }
}