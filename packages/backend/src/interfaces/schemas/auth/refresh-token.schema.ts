import Joi from "joi";

interface refreshTokenSchema {
    refresh_token: string;
}

const refreshTokenValidation = Joi.object({
    refresh_token: Joi.string().required()
});

export {
    refreshTokenValidation,
    type refreshTokenSchema
}