const express = require("express");
const router = express.Router(); 

const {singup,login,test}  = require("../controllers/auth");

const {isstudent,auth,isadmin} = require("../middlewares/authmiddleware");

router.post("/login", login);
router.post("/signup", singup);

/// testing route 
router.get('/test',auth,test)

// protected routes 
router.get('/student',auth,isstudent, (req,res)=>{
 res.json({
    success:true,
    message:"Welcome to student Protal",
 });    
});

router.get('/admin',auth,isadmin,(req,res)=>{
   // console.log(res.json())
    return res.json({
        success:true,
        message:"Welcome to Admin Protal",
     });   
});


module.exports = router;
