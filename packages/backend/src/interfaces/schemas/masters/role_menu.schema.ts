import Joi from "joi";

interface roleMenuSchema {
    role_id: string;
    menu_id: string;
    act_view: boolean;
    act_detail: boolean;
    act_create: boolean;
    act_update: boolean;
    act_delete: boolean;
}

const roleMenuValidation = Joi.object({
    role_id: Joi.string().required(),
    menu_id: Joi.string().required(),
    act_view: Joi.boolean().required().default(false),
    act_detail: Joi.boolean().required().default(false),
    act_create: Joi.boolean().required().default(false),
    act_update: Joi.boolean().required().default(false),
    act_delete: Joi.boolean().required().default(false),
});

export {
    type roleMenuSchema,
    roleMenuValidation
}