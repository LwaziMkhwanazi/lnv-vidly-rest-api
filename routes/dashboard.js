import express from "express"
import Rental from "../models/rentalModel.js"
import Movie from "../models/movieModel.js"
import Customer from "../models/customersModel.js"

const router = express.Router()

//Count all Customers
router.get('/customers', async(req,res)=>{
    const customers = await Customer.countDocuments()
    res.send({customers:customers})
})

// Count All Movies
router.get('/movies', async(req,res)=>{
  const movies = await Movie.countDocuments()
  res.send({movies:movies})
})

// Count All Rentals
router.get('/rentals', async(req,res)=>{
    const rentals = await Rental.countDocuments()
    res.send({rentals:rentals})
  })

export default router