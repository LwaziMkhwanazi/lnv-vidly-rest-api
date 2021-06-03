//api/returns   // return 401 if the user is not Logged in
import validation from "../validation/validateReturn.js"
import express from "express";
import auth from "../middlleware/auth.js";
import validate from "../middlleware/validate.js"
import Rental from "../models/rentalModel.js";
import Movie from "../models/movieModel.js";
const router = express.Router()

router.post('/',[auth,validate(validation)],async(req,res)=>{
    
    // return 400 if customerId is not provided
     const rental = await Rental.lookup(req.body.customerId,req.body.movieId)
        // return 404 if the rental was not found for this customer/movie
        if(!rental) return res.status(404).send('Rental not Found')
        //return 400 if rental already processed
        if(rental.dateReturned) return res.status(400).send('Return already processed') 
            rental.return()
            await rental.save()
            // Increase the stock
          await Movie.updateOne({_id:rental.movie.id},{
                $inc: {numberInStock: 1}
            })
            //Return the Rental
            return res.send(rental)
  
});




export default router