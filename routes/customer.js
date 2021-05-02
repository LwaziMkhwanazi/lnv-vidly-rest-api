import Customer from "../models/customersModel.js";
import customerValidate from "../validation/customerValidation.js"
import validateObjectID from "../middlleware/validateObjectID.js"
import validate from "../middlleware/validate.js";
import express from "express"
import auth from "../middlleware/auth.js";
import Rental from "../models/rentalModel.js"

//Create Router
const router = express.Router()

//Get All Customer
router.get('/',async(req,res)=>{
        const customers = await Customer.find().sort('-dateOut')
    
        res.send(customers)
})




// Create A Customer
router.post('/',[validate(customerValidate)], async(req,res)=>{
  
       let customer = new Customer(
           {name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone }
            )
         customer = await customer.save() 
        res.send(customer)
})

// Get Single Customer by phone
router.get('/:phone',async(req,res)=>{
        let customer = await Customer.findOne({phone:req.params.phone})
        if(!customer) return res.send('Customer does not exist. Please double check the phone number')
        res.send(customer)
})


//Get A Single Customer
router.get('/:id',[validateObjectID], async(req,res)=>{
        const customer = await Customer.findById(req.params.id)
            if(!customer) return res.status(404).send('Customer with A Given ID Does Not Exist')
            res.send(customer)
})
//Update Single Customer document
router.put('/:id',[validateObjectID], async(req,res)=>{
        const results = await Customer.findByIdAndUpdate(req.params.id,{name:req.body.name,isGold: req.body.isGold,
               phone: req.body.phone },{new:true})
               if(!results) return res.status(404).send('Customer with a given Id Not Found')
               res.send(results)
})

//Delete Request
router.delete('/:id',[validateObjectID],async(req,res)=>{
        const results = await Customer.findByIdAndRemove(req.params.id)
               if(!results) return res.status(404).send('Customer with a given Id Not Found')
               res.send(results)
})

export default router