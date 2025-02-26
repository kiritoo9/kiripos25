export interface IoResponseSchema {
    code: number;
    message: string;
    data?: { [key: string]: any } | { [key: string]: any }[];
    error?: { [key: string]: any } | { [key: string]: any }[] | string[] | string | null;
}