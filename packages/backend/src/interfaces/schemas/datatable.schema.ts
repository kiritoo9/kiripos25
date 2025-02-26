interface Paramters {
    page: number;
    limit: number;
    order?: string;
    search?: string;
    another_params?: { [key: string]: any } | { [key: string]: any }[] | string | number | boolean;
}

interface Count {
    total_page: number;
    total_data: number;
}

export interface DatatableSchema {
    parameters: Paramters;
    count: Count;
    data: { [key: string]: any }[];
}