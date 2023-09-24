export interface Order{
    table_number: number | string;
    staff_id: number | string;
    items: ItemLine[];
}

export interface ItemLine{
    item_id: number;
    quantity: number;
}

export interface OrderLine{
    item_id: number;
    order_id: number;
    quantity: number;
}