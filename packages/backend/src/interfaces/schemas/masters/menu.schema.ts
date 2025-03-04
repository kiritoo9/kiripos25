import Joi from "joi";

interface menuSchema {
    name: string;
    label: string;
    url: string;
    parent_id?: string;
    icon?: string;
}

const menuValidation = Joi.object({
    name: Joi.string().required(),
    label: Joi.string().required(),
    url: Joi.string().required(),
    parent_id: Joi.string().allow(null).empty("").optional(),
    icon: Joi.string().allow(null).empty("").optional(),
});

export {
    type menuSchema,
    menuValidation
}