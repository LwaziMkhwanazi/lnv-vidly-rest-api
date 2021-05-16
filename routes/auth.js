import express from "express";
import _ from "lodash";
import authValidation from "../validation/authValidation.js";
import validate from "../middlleware/validate.js"
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const router = express.Router()

//Login User
router.post('/',validate(authValidation), async(req,res)=>{
            let user = await User.findOne({email:req.body.email})
            if(!user) return res.status(400).send('Invalid email or password')

          const validPassword = await bcrypt.compare(req.body.password,user.password)
            if(!validPassword) return res.status(400).send('Invalid email or password 2')
              const token =  user.generateAuthToken()
                res.header('x-auth-token',token).send(token)
})

export default router