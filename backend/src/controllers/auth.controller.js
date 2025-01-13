
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs";


export const signup = async (req, res)=>{
    const { fullName, email, password } = req.body;

    if(!fullName || !email || !password){
        return res.status(400).json({message: "ALl fields are required"});
    }

    if(password.length < 6){
        return res.status(400).json({message: "Password must be at least 6 characters"});
    }

    try{
        //  hash passwords
        const user = await User.findOne({email});

        if (user) return res.status(400).json({message: "user exists!"});

        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);
        const new_user = new User({
            email: email,
            fullName: fullName,
            password: hashed_password
        })

        if(new_user){
            // generate jwt token 
            generateToken(new_user._id, res);
            await new_user.save();

            res.status(201).json({
                _id: new_user._id,
                fullName: new_user.fullName,
                email: new_user.email,
                profilePic: new_user.profilePic
            });
        }else{
            res.status(400).json({message: "Invalid user data"});
        }        
    }catch(error){
        console.log("Error in signup controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}


export const login = (req, res)=>{
    res.send("login route");
}


export const logout = (req, res)=>{
    res.send("logout route");
}

