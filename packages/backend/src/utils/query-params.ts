import type { QueryParamsSchema } from "../interfaces/schemas/query-params.schema";

const queryParams = (r: { [key: string]: any }): QueryParamsSchema => {
    let response: QueryParamsSchema = {
        page: r?.page ? parseInt(r?.page) : 1,
        limit: r?.limit ? parseInt(r?.limit) : 10,
        order: r?.sort ?? "",
        search: r?.search ?? ""
    }
    return response;
}
export default queryParams;