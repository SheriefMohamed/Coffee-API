export interface Order{
    table_number: number;
    staff_id: number;
    items: ItemLine[];
}

interface ItemLine{
    item_id: number;
    quantity: number;
}

export interface OrderLine{
    item_id: number;
    order_id: number;
    quantity: number;
}