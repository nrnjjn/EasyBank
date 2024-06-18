import express from 'express'
import User from '../models/user.js';

const router = express()


router.get('/viewusers',async(req,res)=>{
    console.log(req.body);
    let response=await User.find({userType:'user'})
    console.log(response);
    res.json(response)
})


router.put('/acceptusers/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(id);
    console.log(req.body);
    let response=await User.findByIdAndUpdate(id,req.body)
    console.log(response);
    }
    catch(e){
        res.json(e.message)
    }
})


export default router