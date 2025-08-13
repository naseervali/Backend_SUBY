const Vendor =require('../models/Vendor')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const dotEnv=require('dotenv')

dotEnv.config();
const Skey=process.env.KEY;

const vendorRegister=async(req,res)=>{
    const{username,email,password}=req.body
    try{
const vendorEmail=await Vendor.findOne({ email })
if(vendorEmail){
    return res.status(400).json("Email already exist")
}
const hashedPassword=await bcrypt.hash(password,10);
const newVendor=new Vendor({
    username,email,password:hashedPassword
});
await newVendor.save();
res.status(201).json({message:"Vendor Register Successfully"})

    }catch(error){
        console.log(error)
res.status(500).json({error:"Internal server error"})
    }
}

const vendorLogin= async (req,res)=>{
const { email, password }=req.body;
try{
const vendor=await Vendor.findOne({ email })
if(!vendor || !(await bcrypt.compare(password,vendor.password))){
    return res.status(401).json({error:"Invalid Details"})
}
const token=jwt.sign({vendorId:vendor._id},Skey,{expiresIn:"1h"})
res.status(200).json({sucess:"login Successfull",token})

}catch(error){
res.status(400).json({error:"Error"})
}
}
const getAllVendors =async(req,res)=>{
    try {
        const vendors= await Vendor.find().populate('firm');
        res.json(vendors)
    } catch (error) {
        console.log(error)
        res.status(400).json({error:"Error"})
    }
}
const getVendorById =async (req,res)=>{
    const vendorId= req.params.id;
    try {
        const vendor=await Vendor.findById(vendorId).populate('firm')
      if(!vendor)
      {
          return res.status(404).json({error:"vendor not found"})
        
      }
      res.status(200).json({vendor})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error"})
        
    }
}
module.exports={vendorRegister,vendorLogin,getAllVendors,getVendorById}