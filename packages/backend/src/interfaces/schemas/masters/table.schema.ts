import Joi from "joi";

interface tableSchema {
    table_no: string;
    tenant_id?: string;
    remark?: string;
    max_person?: number;
}

const tableValidation = Joi.object({
    table_no: Joi.string().required(),
    tenant_id: Joi.string().allow(null).empty("").optional(),
    remark: Joi.string().allow(null).empty("").optional(),
    max_person: Joi.number().allow(null).empty(0).optional(),
});

export {
    type tableSchema,
    tableValidation
}