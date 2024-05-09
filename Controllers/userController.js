const asyncHandler = require('express-async-handler')
const User = require("../Models/userModel")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

//Register a user
//route Post /api/users/register
//public
const registerUser = asyncHandler(async(req,res)=>{
    const {username, email, password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields required");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists.");
    }
    //hashed password
    const hashedPassword = await bcrypt.hash(password,10);
    // console.log("hashed password", hashedPassword)
    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    })
    console.log(user);
    if(user){
        res.status(201).json({_id:user.id, email:user.email})
    }else{
        res.status(400)
        throw new Error("user data is not valid");
    }
    res.json({message:"Register the user"});
});


//Login user
//route Post /api/users/login
//public
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new error("All fields required");
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'10m'}
    );
        res.status(200).json({accessToken});
    }else{
        res.status(401)
        throw new Error("Invalid Credentials")
    }
    // res.json({message:"Login user"});
});


//Register a user
//route Post /api/users/current
//private --> ONly logged in user will be able to access.
const currentUser = asyncHandler(async(req,res)=>{
    // res.json({message:"current user"});
    res.json(req.user)
});

module.exports={registerUser,loginUser,currentUser};