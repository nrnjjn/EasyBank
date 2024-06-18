import express from 'express'
import User from '../models/user.js';
import Account from '../models/account.js';
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express()

router.post('/register', async(req,res)=>{
    try{
        const{Name,Password}=req.body
        let hashedPassword=await bcrypt.hash(Password,10)
        console.log(hashedPassword);

        req.body={...req.body,Password:hashedPassword}

        console.log(req.body);
        const newUser = new User(req.body)
        const savedUser = await newUser.save();
        console.log(newUser,'new user');
        res.json({message:"Registration",savedUser})
    }
    catch(e){
        console.log(e)
        res.json(e.message)
    }
})


let verifyToken=(req,res,next)=>{
    try{
        console.log(req.headers.authorization)
        let response=jwt.verify(req.headers.authorization,'dsd')
        console.log(response)
        next()     
    }
    catch(e){
        res.status(401).json(e.message)
    }
}


router.post('/login',async(req,res)=>{
    try{
    console.log(req.body);
    const {Email,Password}=req.body
    let users=await User.findOne({Email:Email})
    if(!users){
        return res.status(402).json('Invalid username or password')
    }
    let matchPassword=await bcrypt.compare(Password, users.Password)
    console.log(users);
    if(!matchPassword){
        console.log('jy');
        return res.status(402).json('Invalid username or password')
    }
    let token=jwt.sign({id:users._id,Name:users.Name},'dsd')
    console.log(token,'token generate');
    res.json({users,token})
}
catch(e){
    res.json(e.message)
}
})

router.get('/view/:id',verifyToken,async(req,res)=>{
    let id = req.params.id
    let users=await User.findById(id)
    console.log(users);
    res.json(users)
})

router.post('/deposite',async(req,res)=>{
    try{
        console.log(req.body);
        const newDeposite= new Account(req.body)
        const savedDeposite = await newDeposite.save();
        let mainAcc= await User.findById(savedDeposite.userId)
        mainAcc.Balance= parseInt(mainAcc.Balance) + parseInt(req.body.Amount)
        await mainAcc.save();
        let transaction=await Account.findById(savedDeposite._id)
        transaction.transBalance=mainAcc.Balance
        await transaction.save();
        console.log(newDeposite);
        res.json({message:"Deposite",savedDeposite})
    }
    catch(e){
        res.json(e.message)
    }
})


router.post('/withdraw',async(req,res)=>{
    try{
        console.log(req.body);
        const newWithdraw= new Account(req.body)
        const savedWithdraw = await newWithdraw.save();
        let mainAcc= await User.findById(savedWithdraw.userId)
        mainAcc.Balance= parseInt(mainAcc.Balance) - parseInt(req.body.Amount)
        await mainAcc.save();
        let transaction=await Account.findById(savedWithdraw._id)
        transaction.transBalance=mainAcc.Balance
        await transaction.save();
        console.log(newWithdraw);
        res.json({message:"Withdraw",savedWithdraw})
    }
    catch(e){
        res.json(e.message)
    }
})



router.get('/transaction/:id',async(req,res)=>{
    try{
        let id=req.params.id
        console.log(id);
        console.log(req.body);
        let trans= await Account.find({userId:id})
        console.log(trans);
        let bal=await User.findById(id);
        console.log(bal);
        res.json({trans,bal});
    }
    catch(e){
        console.error(e); // Log the error
        res.status(500).json({ error: e.message });    }
})



export default router
