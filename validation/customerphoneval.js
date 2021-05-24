import Joi from "joi"

const phoneNumberValidation = (number)=>{
    const phoneSchema = Joi.object().keys({
        phone: Joi.number('Digits only')
    })
    return phoneSchema.validate(number)
}

export default phoneNumberValidation