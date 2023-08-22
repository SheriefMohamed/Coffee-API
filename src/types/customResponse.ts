import { Item } from './../interfaces/Item';
import { Response } from 'express'

export interface Json {
    success: boolean;
    data: Item | Item[];
    message?: string
}

export type CustomResponse<T> = Response & {
    json: (body?: T) => CustomResponse<T>;
}