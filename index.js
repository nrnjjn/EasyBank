import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const app=express()

app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/bank')
  .then(() => console.log('Connected!'));

  
import userRouter from './routes/user.js'
import adminRouter from './routes/admin.js' 

app.use('/admin',adminRouter)
app.use('/user',userRouter)

app.listen(4000)
