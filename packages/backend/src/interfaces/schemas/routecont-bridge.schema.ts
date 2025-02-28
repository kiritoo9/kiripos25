export interface RouteContBridgeSchema {
    success: boolean;
    data: any;
    error: { [key: string]: any } | { [key: string]: any }[] | string[] | string | null;
    code?: number;
}