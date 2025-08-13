const express=require('express')
const firmControler=require('../controllers/firmControler')
const verifyToken=require('../middlewares/verifyToken')
const path=require('path')
const router=express.Router()

router.post('/add-firm',verifyToken,firmControler.addFirm);
router.delete('/:firmId',firmControler.deletefirmById);
router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    req.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
})

module.exports=router;