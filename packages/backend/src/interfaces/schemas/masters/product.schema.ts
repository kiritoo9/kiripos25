import Joi from "joi";

interface productSchema {
    code: string;
    name: string;
    category_id: string;
    capital_price: number;
    sell_price: number;
    tenant_id?: string;
    description?: string;
    details?: string;
    images?: string[] | string;
    status?: string;
    tags?: string;
}

const productValidation = Joi.object({
    code: Joi.string().required(),
    name: Joi.string().required(),
    category_id: Joi.string().required(),
    capital_price: Joi.number().required(),
    sell_price: Joi.number().required(),
    tenant_id: Joi.string().allow(null).empty("").optional(),
    description: Joi.string().allow(null).empty("").optional(),
    details: Joi.string().allow(null).empty("").optional(),
    status: Joi.string().allow(null).empty("").optional(),
    tags: Joi.string().allow(null).empty("").optional(),
    images: Joi.array().items(
        Joi.string()
    ).allow(null).empty("").optional(),
});

export {
    type productSchema,
    productValidation
}