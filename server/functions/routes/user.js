const express = require("express");
const admin = require("firebase-admin")
const router = express.Router();

let data = []
router.get("/", (req, res) => {
   res.json("inside user");
});

router.get("/jwtVerification",async(req,res)=>{
    if(!req.headers.authorization){
        return res.status(500).json({msg : "token not fund"})
    }
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token)
    try{
        const decodedValue = await admin.auth().verifyIdToken(token)
        if(!decodedValue){
            return  res.status(500).json({success : false , msg : "Unauthorized User"})
        }
        return res.status(200).json({success : true , data : decodedValue})
    }catch(error){
        res.send({
            success : false,
            msg : `Error in extracting the token : ${error}`
        })
    }
})

const listAllUsers = async (nextpagetoken) => {
    admin
      .auth()
      .listUsers(1000, nextpagetoken)
      .then((listuserresult) => {
        listuserresult.users.forEach((rec) => {
          data.push(rec.toJSON());
        });
        if (listuserresult.pageToken) {
          listALlUsers(listuserresult.pageToken);
        }
      })
      .catch((er) => console.log(er));
  };
  // Start listing users from the beginning, 1000 at a time.
  listAllUsers();

  router.get("/all", async (req, res) => {
    listAllUsers();
    try {
      return res
        .status(200)
        .send({ success: true, data: data, dataCount: data.length });
    } catch (er) {
      return res.send({
        success: false,
        msg: `Error in listing users :,${er}`,
      });
    }
  });

module.exports = router;
