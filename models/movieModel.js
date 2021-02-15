import mongoose from "mongoose";
import {genresSchema} from "./genreModel.js";
const moviesSchema = mongoose.Schema({
    title:{
        type:String,
        trim:true,
        minlength:5,
        maxlength:255,
        required: true
    },
    genre:{
        type:genresSchema,
        required:true
    },
    numberInStock:{
         type: Number,
         min:0,
         max:255,
          required: true
        },
    dailyRentalRate:{
        type:Number, 
        required:true,
        min:0,
        max:255
    }
})

const Movie = mongoose.model('Movie',moviesSchema)

export default Movie
//  function validationMovie(movie){
//     const moviesSchema = Joi.object().keys({
//         title:Joi.string().min(5).max(255),
//         genreId: Joi.string().required(),
//         numberInStock:Joi.number().min(0).required(),
//         dailyRentalRate: Joi.number().min(0).required()
//     })
//     return moviesSchema.validate(movie)
// }

