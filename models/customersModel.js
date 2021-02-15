import mongoose from "mongoose"

const customerSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
        isGold:{
            type:Boolean,
            default: false
        },
        phone: {
            type:Number,
            required:true
        }
})

const Customer = mongoose.model('customer',customerSchema)

export default Customer