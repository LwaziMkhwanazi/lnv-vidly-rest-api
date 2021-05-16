import Joi from "joi";

const phoneValidation = (number) =>{
    const customerSchema = Joi.object().keys({
        name: Joi.string().pattern(new RegExp(/^[0-9]+$/)).min(8).max(8),
     
    })
    return customerSchema.validate(number)
}

export default phoneValidation