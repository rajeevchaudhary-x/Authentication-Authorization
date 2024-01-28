// auth , isstudent ,isadmin
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next)=>{
    try{
        // extract jwt token
        // methods of extract token
      const token = req.body.token;
       if(!token){
        return res.status(401).json({
            success:false,
            message:"Token is missing",
        });
    }
        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET);
             console.log('Printed by auth middleware: ' + decode);  // doublt here 
             req.user = decode

        }
        catch(error){
          return res.status(401).json({
            success:false,
            message:"Token is invalid",
          });    
        }
        next();
    
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"something went wrong while verifying token",
          });    
    }
}

exports.isstudent = (req,res,next)=>{
    try{
        if(req.user.role!="student"){
         return res.status(401).json({
            success:false,
            message:"This is protected route for student",

         });
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"user role is not matching",

         });
    }
}

exports.isadmin = (req,res,next)=>{
    try{
        if(req.user.role!="Admin"){
         return res.status(401).json({
            success:false,
            message:"This is protected route for Admin",

         });
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"user role is not matching",

         });
    }
}

