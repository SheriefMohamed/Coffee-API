import { pool } from "../config/database";
import { RowDataPacket } from 'mysql2';
import { Staff, StaffPass } from "../interfaces/Staff";

export class StaffService{
    insertStaffMember = async (data: Staff) => {
        const {fullname, email, password, salary, position} = data;
        const [rows] = await pool.query(
            `INSERT INTO coffee.staff (fullname, email, password, salary, position_id) 
            VALUES ('${fullname}','${email}','${password}','${salary}',(SELECT id FROM position WHERE name='${position}'))`
        )
        return rows
    }

    getAllStaffMembers = async () => {
        const [rows] = await pool.query(`SELECT id, fullname, email, password, salary ,(SELECT name FROM position WHERE id = position_id) AS position FROM staff`)
        return rows
    }

    getSingleStaffMember = async (staffMemberId: number) => {
        const [rows] = await pool.query(`SELECT id, fullname, email, password, salary ,(SELECT name FROM position WHERE id = position_id) AS position FROM staff WHERE id = ${staffMemberId}`);
        if (Array.isArray(rows) && rows.length > 0) {
            const firstRow = rows[0] as RowDataPacket;
            return firstRow
        }
    }

    getStaffTokenData = async (staffMemberEmail: string) => {
        const [rows] = await pool.query(`SELECT id, fullname, email, password ,(SELECT name FROM position WHERE id = position_id) AS position FROM staff WHERE email = '${staffMemberEmail}'`);
        if (Array.isArray(rows) && rows.length > 0) {
            const firstRow = rows[0] as RowDataPacket;
            return firstRow
        }
    }

    emailIsExists = async (email: string) => {
        const [rows] = await pool.query(`SELECT count(*) as count from staff WHERE email = '${email}'`)
        if (Array.isArray(rows) && rows.length > 0) {
            const firstRow = rows[0] as RowDataPacket;
            return firstRow.count == 0 ? false : true;
        }
    }

    updateStaffMember = async (staffMemberId: number, data: Staff) => {
        const {fullname, email, salary, position} = data;
        const [rows] = await pool.query(`UPDATE staff SET 
        fullname = '${fullname}', email = '${email}', salary = '${salary}',position_id = (SELECT id FROM position where name='${position}')
        WHERE id = ${staffMemberId}`);
        if ('affectedRows' in rows) {
            const affectedRows = rows.affectedRows;
            return affectedRows
        }
    }

    updateStaffMemberPassword = async (staffMemberId: number, data: StaffPass) => {
        const {password} = data;
        const [rows] = await pool.query(`UPDATE staff SET 
        password = '${password}' WHERE id = ${staffMemberId}`);
        if ('affectedRows' in rows) {
            const affectedRows = rows.affectedRows;
            return affectedRows
        }
    }
}