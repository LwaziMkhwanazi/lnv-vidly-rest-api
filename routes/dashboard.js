import express from "express"
import Rental from "../models/rentalModel.js"
import Movie from "../models/movieModel.js"
import Customer from "../models/customersModel.js"
import Report from "../models/reportsModel.js"

const router = express.Router()

//Count all Customers
router.get('/customers', async(req,res)=>{
    const customers = await Customer.countDocuments()
    res.send({customers:customers})
})

//pulling Report
router.get('/report',async(req,res)=>{
  const report = await Report.find()
  res.send(report)
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

  //Get all closed Rentals
router.get('/closed',async(req,res)=>{
  const rentals = await Rental.find({"rentalFee":{"$exists":true}},
    {"customer.name":1,"movie.title":1,"movie.dailyRentalRate":1,"dateOut":1,"dateReturned":1,"rentalDays":1,"rentalFee":1}).sort({dateReturned:-1})
      res.send(rentals)
})

//get number of all romantic genres rentals
router.get('/romantic', async(req,res)=>{
    const rentals = await Rental.find({"movie.genre":"Romantic"}).countDocuments()
    res.send({rentals:rentals})
})
//get number of all Karate genres rentals
router.get('/karate', async(req,res)=>{
  const rentals = await Rental.find({"movie.genre":"Karate"}).countDocuments()
  res.send({rentals:rentals})
})

//get number of all series genres rentals
router.get('/series', async(req,res)=>{
  const rentals = await Rental.find({"movie.genre":"Series"}).countDocuments()
  res.send({rentals:rentals})
})


//get list of all romantic action rentals
router.get('/action', async(req,res)=> {
  const rentals = await Rental.find({"movie.genre":"Action"}).countDocuments()
  res.send({rentals:rentals})
})

//get list of all comedy genres rentals
router.get('/comedy', async(req,res)=> {
  const rentals = await Rental.find({"movie.genre":"Comedy"}).countDocuments()
  res.send({rentals:rentals})
})

export default router