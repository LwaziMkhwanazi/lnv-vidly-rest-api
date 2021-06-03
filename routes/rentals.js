import express from 'express';
import Rental from "../models/rentalModel.js";
import Movie from "../models/movieModel.js";
import Customer from "../models/customersModel.js";
import Transaction from "mongoose-transactions";
import rentalValidation from "../validation/rentalValidation.js";
import validate from "../middlleware/validate.js"
import auth from "../middlleware/auth.js";
import router from './movieReturns.js';
const routor = express.Router()
const transaction = new Transaction()


// Get all Rentals
routor.get('/',auth, async(req,res)=>{
    const rentals = await Rental.find().sort('-dateOut')
        res.send(rentals)
})

//get list of all romantic genres rentals
router.get('/romantic',auth, async(req,res)=>{
    const rentals = await Rental.find({"genre.name":"Romantic"})
    res.send(rentals)
})


//Create Rental
routor.post('/',[auth,validate(rentalValidation)], async(req,res)=>{
//find customer by id
const customer = await Customer.findById(req.body.customerId)
    if(!customer) return res.status(400).send('Invalid Customer')
//find movie by id
const movie = await Movie.findById(req.body.movieId)
 if(!movie) return res.status(400).send('Movie Not Found')
//check if movie is in stock
if(movie.numberInStock === 0) return res.status(400).send('Movie Out Of Stock')
//create the rental
const rental = new Rental({
    customer:{
        _id:customer._id,
        name:customer.name,
        phone: customer.phone
    },
    movie:{
        _id:movie._id,
        title:movie.title,
        genre:movie.genre.name,
        dailyRentalRate: movie.dailyRentalRate
    }
})

transaction.insert('Rental', rental)
transaction.update('Movie',{_id:movie._id},{$inc:{numberInStock: -1}})
await transaction.run()
res.send(rental)

})


export default routor