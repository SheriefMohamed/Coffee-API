export interface Staff{
    id?: number;
    fullname: string;
    email: string;
    password: string;
    salary: number;
    position: string;
    position_id?: number;
}

export interface StaffPass{
    password: string;
}

export interface stafftokenData{
    id: number;
    fullname: string;
    email: string;
    password?: string;
    position: string;
}