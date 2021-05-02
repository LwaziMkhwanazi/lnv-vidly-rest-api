import Joi from "joi"
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);

 const genruValidate = (genru) =>{
    const genrusSchema = Joi.object().keys({
        name: Joi.string().trim().min(3).max(50).required(),
    })
    return genrusSchema.validate(genru)
}

export default genruValidate