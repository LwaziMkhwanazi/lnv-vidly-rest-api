
import mongoose from "mongoose";
import moment from "moment"
const rentalSchema =  new mongoose.Schema({
            customer:{
                type: new mongoose.Schema({
                    name:{
                        type: String,
                        required: true,
                        minlength:5,
                        maxlength:50
                    },
                    isGold:{
                        type:String,
                        default: "No"
                    },
                    phone:{
                        type: String,
                        required: true,
                        minlength: 5,
                        maxlength: 50
                    }
                }),
                required:true
            },
            movie:{ 
                type: new mongoose.Schema({
                    title:{
                        type: String,
                        required: true,
                        trim: true,
                        minlength:5,
                        maxlength:255
                    },
                    genre:{
                      type:String  
                    },
                    dailyRentalRate:{
                        type: Number,
                        required: true,
                        min:5,
                        max:255
                    }
                }),
                required: true
            },
            dateOut:{
                type: Date,
                required: true,
                default: Date.now
            },
            dateReturned:{
                type: Date
            },
            rentalFee:{
                type: Number,
                min:0
            },
            rentalDays:{
                type:Number,
                min:0
            },
           
})

rentalSchema.statics.lookup = function (customerId,movieId) {
   return this.findOne({
        'customer._id':customerId,
        'movie._id': movieId
    })  
}

rentalSchema.methods.return = function () {
     this.dateReturned = new Date()

     this.rentalDays = moment().diff(this.dateOut,'days')
     this.rentalFee = this.rentalDays * this.movie.dailyRentalRate;
}
const Rental = mongoose.model('Rental',rentalSchema)


 export default Rental;