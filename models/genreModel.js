import mongoose from "mongoose";

const genresSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:3,
        maxlength:20
    }  
})
const Genre = mongoose.model('genre',genresSchema) 
export{
    Genre,
    genresSchema
} 