import mongoose from "mongoose"

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
        isGold:{
            type:String,
            default: "No"
        },
        phone: {
            type:Number,
            required:true,
            unique:true
        }
},{ timestamps: true })

const Customer = mongoose.model('customer',customerSchema)

export default Customer