import Joi from "joi";

interface productCategorySchema {
    name: string;
    tenant_id?: string;
    description?: string;
    icon?: string;
}

const productCategoryValidation = Joi.object({
    name: Joi.string().required(),
    tenant_id: Joi.string().allow(null).empty("").optional(),
    description: Joi.string().allow(null).empty(0).optional(),
    icon: Joi.string().allow(null).empty(0).optional()
});

export {
    type productCategorySchema,
    productCategoryValidation
}