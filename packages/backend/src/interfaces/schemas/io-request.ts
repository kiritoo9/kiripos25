export interface IoRequest {
    page: number;
    limit: number;
    keywords: string | null;
    orderBy: string | null;
}