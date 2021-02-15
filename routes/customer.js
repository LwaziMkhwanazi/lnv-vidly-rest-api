import Customer from "../models/customersModel.js";
import customerValidate from "../validation/customerValidation.js"
import validateObjectID from "../middlleware/validateObjectID.js"
import validate from "../middlleware/validate.js";
import express from "express"
import auth from "../middlleware/auth.js";

//Create Router
const router = express.Router()

//Get All Customer
router.get('/',auth,async(req,res)=>{
        const customers = await Customer.find()
        res.send(customers)
})

// Create A Customer
router.post('/',[auth,validate(customerValidate)], async(req,res)=>{
  
       let customer = new Customer(
           {name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone }
            )
         customer = await customer.save() 
        res.send(customer)
})

//Get A Single Customer
router.get('/:id',[auth,validateObjectID], async(req,res)=>{
        const customer = await Customer.findById(req.params.id)
            if(!customer) res.status(404).send('Customer with A Given Id Does Not Exist')
            res.send(customer)
})
//Update Single Customer document
router.put('/:id',[auth,validateObjectID], async(req,res)=>{
        const results = await Customer.findByIdAndUpdate(req.params.id,{name:req.body.name,isGold: req.body.isGold,
               phone: req.body.phone },{new:true})
               if(!results) return res.status(404).send('Customer with a given Id Not Found')
               res.send(results)
})

//Delete Request
router.delete('/:id',[auth,validateObjectID],async(req,res)=>{
        const results = await Customer.findByIdAndRemove(req.params.id)
               if(!results) return res.status(404).send('Customer with a given Id Not Found')
               res.send(results)
})

export default router