export interface IoRequestSchema {
    page: number;
    limit: number;
    keywords: string | null;
    orderBy: string | null;
}