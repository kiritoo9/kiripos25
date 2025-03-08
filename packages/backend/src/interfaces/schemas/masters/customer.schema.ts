import Joi from "joi";

interface customerSchema {
    name: string;
    tenant_id?: string;
    email?: string;
    phone?: string;
    address?: string;
    gender?: string;
    range_of_age?: string;
    remark?: string;
}

const customerValidation = Joi.object({
    name: Joi.string().required(),
    tenant_id: Joi.string().allow(null).empty("").optional(),
    email: Joi.string().allow(null).empty(0).optional(),
    phone: Joi.string().allow(null).empty(0).optional(),
    address: Joi.string().allow(null).empty(0).optional(),
    gender: Joi.string().allow(null).empty(0).optional(),
    range_of_age: Joi.string().allow(null).empty(0).optional(),
    remark: Joi.string().allow(null).empty("").optional(),
});

export {
    type customerSchema,
    customerValidation
}