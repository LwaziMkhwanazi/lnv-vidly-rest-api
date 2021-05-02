import ValidateObjectId from "../middlleware/validateObjectID.js"
import express from "express";
import Movie from "../models/movieModel.js";
import {Genre} from "../models/genreModel.js";
import movieValidate from "../validation/movieValidation.js";
import validate from "../middlleware/validate.js";
import auth from "../middlleware/auth.js";
import admin from "../middlleware/admin.js"
const router = express.Router()

//Create Single Movie
router.post('/',[validate(movieValidate)],async(req,res)=>{
  const genre = await Genre.findById(req.body.genreId)
  if(!genre) return res.status(400).send('Genre not Found')
  let movie = new Movie({
    title: req.body.title,
    genre:{
      _id:genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  })
    movie = await movie.save()
    res.send(movie)
})

//Editing Movie

router.put('/:id',[validate(movieValidate)],async(req,res)=>{
 
  const genre = await Genre.findById(req.body.genreId)
  if(!genre) return res.status(400).send('Genre not Found')

  const movie = await Movie.findByIdAndUpdate(req.params.id,{
    title:req.body.title,
    genre:{
      _id:genre._id,
      name: genre.name
    },
    numberInStock:req.body.numberInStock,
    dailyRentalRate:req.body.dailyRentalRate
   
  },{new: true})
  res.send(movie)
})






//Get List of Movies
router.get('/',async(req,res)=>{
    const  movies = await Movie.find()
    res.send(movies)
})
//Get Single Movie
router.get('/:id',ValidateObjectId,async(req,res)=>{
  //check if movie is available
    const movie = await Movie.findById(req.params.id)
    res.send(movie)  
})

//Delete Movie
router.delete('/:id',[ValidateObjectId], async(req,res)=>{
        let movie = await Movie.findByIdAndDelete(req.params.id)
        if(!movie) return res.status('400').send('Movie With A Given Id Not Found')
          res.send(movie)
    })

export default router;