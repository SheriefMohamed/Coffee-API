import {Request} from 'express'
import { stafftokenData } from './Staff';

export interface RequestWithBody extends Request{
    body: { [key: string] : string | undefined };
    staff?:stafftokenData
}