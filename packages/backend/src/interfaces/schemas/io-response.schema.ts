export interface IoResponseSchema {
    code: number;
    message: string;
    data?: { [key: string]: any } | { [key: string]: any }[] | null;
    error?: { [key: string]: any } | { [key: string]: any }[] | string[] | string | null;
}