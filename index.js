
const express=require('express')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const vendorRoutes=require('./routes/vendorRoute')
const bodyParser=require('body-parser')
const firmroutes=require('./routes/firmroutes')
const productsRoutes=require('./routes/productsRoute')
const path=require('path')
const app=express()

const PORT=4000;

app.use(bodyParser.json());


dotenv.config();

app.use('/vendor',vendorRoutes);
app.use('/firm',firmroutes)
app.use('/product',productsRoutes)
app.use('/uploads',express.static('uploads'));
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Mongo db connected")
})
.catch((error)=>{
    console.log("Eroor",error)
})

app.listen(PORT,()=>{
    console.log(`SERVER STARTED AND RUNNING AT ${PORT}`)
})

app.use('/home',(req,res)=>{
    res.send("<h1>Heloo</h1>")
})