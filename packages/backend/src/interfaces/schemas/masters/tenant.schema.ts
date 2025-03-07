import Joi from "joi";

interface tenantSchema {
    name: string;
    code?: string;
    slug?: string;
    tagline?: string;
    description?: string;
    remark?: string;
    status?: string;
    photo?: string;
    banner?: string;
}

const tenantValidation = Joi.object({
    name: Joi.string().required(),
    tagline: Joi.string().allow(null).empty("").optional(),
    description: Joi.string().allow(null).empty("").optional(),
    remark: Joi.string().allow(null).empty("").optional(),
    status: Joi.string().allow(null).empty("").optional(),
    photo: Joi.string().allow(null).empty("").optional(),
    banner: Joi.string().allow(null).empty("").optional(),
});

export {
    type tenantSchema,
    tenantValidation
}