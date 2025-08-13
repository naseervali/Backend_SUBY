const Vendor=require('../models/Vendor');
const jwt=require('jsonwebtoken');
const dotEnv=require('dotenv')

dotEnv.config()

const Skey=process.env.KEY;

const verifyToken=async (req,res,next)=>{
    const token=req.headers.token;

    if(!token){
        return  res.status(401).join({error:"Token is required"})
    }
    try{
        const decoded=jwt.verify(token,Skey)
        const vendor=await Vendor.findById(decoded.vendorId);
        if(!vendor){
            return res.status(404).json({Erorr:"Vendor Not Found"})
        }
        req.vendorId=vendor._id;

        next()
    }
    catch(error){
        console.log(error);
        res.status(500).json({erorr:"Invalid Token"})

    }
}
module.exports=verifyToken;