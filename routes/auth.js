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
                res.send(token)
})


router.get('/',async(req,res)=>{
  res.send('Hi')
})

router.delete('/', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Unable to log out')
      } else {
        res.send('Logout successful')
      }
    });
  } else {
    res.end()
  }
})

export default router