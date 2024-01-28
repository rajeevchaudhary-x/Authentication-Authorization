const bcrypt  = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// singup route handler
exports.singup = async (req,res)=>{
    try{
        //get data 
        const{name,email,password,role}=req.body;
        //check if user already exist

        const existuser = await User.findOne({email});

        if(existuser){
            return res.status(400).json({
                success:false,
                message:'user already Exists',
            });
        }

        // secure the password 
        let hashedPassword;
        try{
           hashedPassword = await bcrypt.hash(password,10);  
        }
        catch(err){
             return res.status(500).json({
                success:false,
                message:"Error in Hashing password",
             });
        }

        // create a entry for new user insert in db 
        const user = await User.create({
            name,email,password:hashedPassword,role
        })

        return res.status(200).json({
            success:true,
            message:'User Created Sucessfully'
        });

      
    }
    catch(error){
      console.error(error);
      return res.status(500).json({
        success:false,
        message:'User Cannot be registered, please try again later',
      });
      

    }
}


// login function 

exports.login = async (req ,res)=>{
    try{
       const {email,password} = req.body;
       // check if password is empty and email is empty
       if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Please Enter valid email and password",

        });
       }

       // check for the registered user 
       const user = await User.findOne({email});
       // if user is not registered 
       if(!user){
        return res.status(401).json({
            success:false,
            message:"user not registered",
        });
       }

      // payload
      const payload = {
        email:user.email,
        id:user._id,
        role:user.role,
      }


       // verify password & generate a JWT token
       if(await bcrypt.compare(password,user.password)){
        //password match 
        let token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn:"2h",
        } );
        let userObject = user.toObject();

        
        // user.token = token;
        userObject.token = token;
        userObject.password = undefined;
        // user.password=undefined; 
        // console.log(user);
        const options = {
         expires:new Date(Date.now() + 3*24*60*1000),
         httpOnly:true,   
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user: userObject,
            message:"User Logged in Sucesfully",
        });
       }
       else{
        return res.status(403).json({
            success:false,
            message:"password do not match ",
        });
       }
    }
    catch(error){
     console.error(error);
     return res.status(500).json({

     })
    }
}


exports.test = (req,res)=>{
    // const message = req.body.message;
    // console.log(message);
 return res.json({
    status:true,
    message:"This is test route",
 })
}