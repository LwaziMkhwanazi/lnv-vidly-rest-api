import Joi from "joi";
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);

Joi.objectId = myJoiObjectId

 const movieValidate = (movie) =>{

    const movieSchema = Joi.object().keys({
        _id:Joi.objectId(),
        title: Joi.string().trim().min(3).max(225),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()

    })
    return movieSchema.validate(movie)
}

 

export default movieValidate