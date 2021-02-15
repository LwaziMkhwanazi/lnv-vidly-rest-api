import Joi from "joi"
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);

Joi.objectId = myJoiObjectId
 const movieReturnValidate = (req) =>{
    const movieReturnSchema = Joi.object().keys({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    })
    return  movieReturnSchema.validate(req)
}

export default movieReturnValidate;