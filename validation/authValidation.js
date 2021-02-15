import Joi from "joi";

const authValidation = (req) =>{
    const authSchema = Joi.object().keys({
        email: Joi.string().trim().email().required().min(5).max(255),
        password: Joi.string().min(5).max(255).required()
    })
    return authSchema.validate(req)
}

export default authValidation