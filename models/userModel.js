import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        minlength:5,
        maxlength:50,
        required:true
    },
    email:{
        type:String,
        unique:true,
        minlength:5,
        maxlength:255,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        minlength:5,
        maxlength:1024,
        required:true
    },
    isAdmin: {
        type:Boolean,
        default: false
    }
    
})

userSchema.methods.generateAuthToken = function (params) {
    const token = jwt.sign({_id:this._id,isAdmin:this.isAdmin}, config.get('jwtPrivateKey'))
    return token
}

const User = mongoose.model('User',userSchema)

export default User