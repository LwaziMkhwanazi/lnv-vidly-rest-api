import express from "express";
import _ from "lodash";
import authValidation from "../validation/authValidation.js";
import validate from "../middlleware/validate.js"
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const router = express.Router()

//Login User
router.post('/login',validate(authValidation), async(req,res)=>{
            let user = await User.findOne({email:req.body.email})
            if(!user) return res.status(400).send('Invalid email or password')

          const validPassword = await bcrypt.compare(req.body.password,user.password)
            if(!validPassword) return res.status(400).send('Invalid email or password ')
              const token =  user.generateAuthToken()
                res.header('auth',token).send(token)
})


router.get('/',async(req,res)=>{
  res.header('auth','').send("Logout succesfully")
})



export default router