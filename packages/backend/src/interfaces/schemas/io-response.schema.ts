export interface IoResponseSchema {
    status: number;
    message: string;
    data?: { [key: string]: any } | { [key: string]: any }[];
    error?: { [key: string]: any } | { [key: string]: any }[];
}