import Joi from "joi";

interface branchSchema {
    name: string;
    tenant_id?: string;
    phone?: number;
    address?: string;
    remark?: string;
}

const branchValidation = Joi.object({
    name: Joi.string().required(),
    tenant_id: Joi.string().allow(null).empty("").optional(),
    phone: Joi.number().allow(null).empty("").optional(),
    address: Joi.string().allow(null).empty("").optional(),
    remark: Joi.string().allow(null).empty("").optional(),
});

export {
    type branchSchema,
    branchValidation
}