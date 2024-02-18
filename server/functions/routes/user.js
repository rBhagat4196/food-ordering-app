const express = require("express");
const admin = require("firebase-admin")
const router = express.Router();

router.get("/", (req, res) => {
   res.json("inside user");
});

router.get("/jwtVerification",async(req,res)=>{
    if(!req.headers.authorization){
        return res.status(500).json({msg : "token not fund"})
    }
    const token = req.headers.authorization.split(" ")[1];
    try{
        const decodedValue = await admin.auth().verifyIdToken(token)
        if(!decodedValue){
            return  res.status(500).json({success : false , msg : "Unauthorized User"})
        }
        res.status(200).json({success : true , data : decodedValue})
    }catch(error){
        res.send({
            success : false,
            msg : `Error in extracting the token : ${error}`
        })
    }
})
module.exports = router;
