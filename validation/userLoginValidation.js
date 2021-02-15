import Joi from "joi";

const userValidation = (user) =>{
    const userSchema = Joi.object().keys({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().trim().email().required().min(5).max(255),
        password: Joi.string().min(5).max(255).required(),
        isAdmin: Joi.boolean()
    })
    return userSchema.validate(user)
}

export default userValidation