import ValidateObjectId from "../middlleware/validateObjectID.js"
import express from "express";
import validateGenru from "../validation/genreValidation.js";
import validate from "../middlleware/validate.js";
import {Genre} from "../models/genreModel.js";
import auth from "../middlleware/auth.js";
import admin from "../middlleware/admin.js";

const router = express.Router()
// //Create a Genru
router.post('/',[validate(validateGenru)],async(req,res)=>{
               let genru = new Genre(req.body)
                 genru = await genru.save()
                res.send(genru)
});
// // Get All List Of Genrus
router.get('/',async(req,res) =>{
           const genrus= await Genre.find().sort('name')
           if(genrus.length === 0) return res.send('No Genres available')
            res.send(genrus) 
})

// Get Single Genru
router.get('/:id',ValidateObjectId, async(req,res)=>{
       const genre = await Genre.findById(req.params.id)
       if(!genre) return res.status(404).send('Genre with a Given Id Was Not Found')
        res.send(genre)
})


// Update request
router.put('/:id',[ValidateObjectId], async(req,res)=>{
           
            const genre = await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true})
            if(!genre) res.send('The genre with a given Id was not Found')
           res.send(genre) 
})

//Delete request
router.delete('/:id',[ValidateObjectId],async(req,res)=>{
            const genre = await Genre.findByIdAndDelete(req.params.id)
                if(!genre) return res.send('Genre with a given Id was not Found')
                res.send(genre)
})





export default router