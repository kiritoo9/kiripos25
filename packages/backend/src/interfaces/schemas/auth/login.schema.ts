import Joi from "joi";

interface loginSchema {
    username: string;
    password: string;
}

const loginValidation = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

export {
    type loginSchema,
    loginValidation
}