import { pool } from "../config/database";
import { RowDataPacket } from 'mysql2';
import { Position } from "../interfaces/Position";

export class PositionService{
    insertPosition = async (data: Position) => {
        const {name} = data;
        const [rows] = await pool.query(`INSERT INTO coffee.position (name) VALUES ('${name}');`);
        return rows
    }

    getAllPositions = async () => {
        const [rows] = await pool.query(`SELECT * FROM position`);
        return rows
    }

    getArrayOfPositions = async () => {
        const [rows] = await pool.query(`SELECT name FROM position`);
        const positionNames: string[] = (rows as RowDataPacket[]).map((row: any) => row.name);
        return positionNames;
    }

    getSinglePosition = async (positionId: number) => {
        const [rows] = await pool.query(`SELECT * FROM position WHERE id = ${positionId}`);
        if (Array.isArray(rows) && rows.length > 0) {
            const firstRow = rows[0] as RowDataPacket;
            return firstRow
        }
    }

    updatePosition = async (positionId: number, data: Position) => {
        const {name} = data;
        const [rows] = await pool.query(`UPDATE position SET 
        name = '${name}'
        WHERE id = ${positionId}`);
        if ('affectedRows' in rows) {
            const affectedRows = rows.affectedRows;
            return affectedRows
        }
    }
}