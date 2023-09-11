import { pool } from "../config/database";
import { FieldPacket, ResultSetHeader } from 'mysql2/promise';
import { Order, OrderLine } from './../interfaces/Order';

export class OrderService{
    insertOrderLine = async (data: OrderLine) => {
        const {item_id,order_id, quantity} = data;
        const [rows] = await pool.query(
            `INSERT INTO order_line (item_id, order_id, quantity, price) 
            VALUES (${item_id},${order_id},${quantity}, (select price from item where id = ${item_id}) * ${quantity})`
        )
        return rows
    }
    insertOrder = async (data: Order) => {
        const {table_number, staff_id, items} = data;
        const [result, fields]: [ResultSetHeader, FieldPacket[]] = await pool.query(
            `INSERT INTO coffee.order (date, time, table_number, staff_id) 
            VALUES (date(now()), TIME_FORMAT(now(), '%H:%i'), ${table_number}, ${staff_id})`
        )
        result.insertId

        items.forEach(async (value) => {
                await this.insertOrderLine({item_id: value.item_id, quantity: value.quantity, order_id: result.insertId})
        })
        return 
    }
}