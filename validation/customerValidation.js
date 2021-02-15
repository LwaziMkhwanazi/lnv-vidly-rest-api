import Joi from "joi"

const customerValidate =(customer) =>{
    const customerSchema = Joi.object().keys({
        name:Joi.string().min(4).max(25).trim().required(),
        isGold: Joi.boolean(),
        phone: Joi.number().min(8).required()
    })
   return customerSchema.validate(customer)  
}

export default customerValidate