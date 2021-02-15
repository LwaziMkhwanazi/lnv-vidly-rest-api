import Joi from "joi";
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);


const rentalValidation = (rental) =>{
    const rentalSchema = Joi.object().keys({
        customerId: myJoiObjectId().required(),
        movieId: myJoiObjectId().required()
    })
    return rentalSchema.validate(rental)
}

export default rentalValidation;