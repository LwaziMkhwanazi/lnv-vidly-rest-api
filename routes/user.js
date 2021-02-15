import express from "express";
import _ from "lodash";
import userValidation from "../validation/userLoginValidation.js";
import validate from "../middlleware/validate.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import auth from "../middlleware/auth.js"
import admin from "../middlleware/admin.js"

const router = express.Router()

//Get User
router.get('/me',auth,async(req,res)=>{
        const user = await User.findById(req.user._id).select('-password')
        res.send(user)
})

//Get a list of users
router.get('/',[auth,admin],async(req,res)=>{
        const users = await User.find().sort('name')
        res.send(users)
})

//Register new User
router.post('/',validate(userValidation), async(req,res)=>{
                 let user = await User.findOne({email:req.body.email})
            if(user) return res.status(400).send('User already exist')
             user = new User(_.pick(req.body,['name','email','password'])) 
             const salt = await bcrypt.genSalt(10)
             user.password = await bcrypt.hash(req.body.password,salt)
            user = await user.save()
            const token = user.generateAuthToken()
          res.header('x-auth-token',token).send(_.pick(user,['_id','name','email'])) 
})

export default router