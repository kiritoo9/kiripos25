import Joi from "joi";

interface userSchema {
    role_id: string;
    branch_id: string;
    branch_head: boolean;
    username: string;
    fullname: string;
    password?: string;
    email?: string;
    phone?: string;
    address?: string;
}

const userValidation = Joi.object({
    role_id: Joi.string().required(),
    branch_id: Joi.string().required(),
    branch_head: Joi.boolean().default(false),
    username: Joi.string().required(),
    fullname: Joi.string().required(),
    password: Joi.string().allow(null).empty("").optional(),
    email: Joi.string().allow(null).empty("").optional(),
    phone: Joi.string().allow(null).empty("").optional(),
    address: Joi.string().allow(null).empty("").optional(),
});

export {
    type userSchema,
    userValidation
}