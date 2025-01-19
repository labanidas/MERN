
import cloudinary from "../lib/cloudinary.js";
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
        const user = await User.findOne({email});

        if (user) return res.status(400).json({message: "user exists!"});
        //  hash passwords
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);
        const new_user = new User({
            email,
            fullName,
            password: hashed_password
        })

        if(new_user){
            // generate jwt token 
            generateToken(new_user._id, res); // for sesion

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


export const login = async  (req, res)=>{
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({message: "ALl fields are required"});
    }

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message: "Invalid Credentials!"})
        }

        const isPasswordCorrect  = await bcrypt.compare(password, user.password); 

        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic :user.profilePic
        })

    }catch(error){
        console.log("Error in auth controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }

}


export const logout = (req, res)=>{
    try{
        res.cookie("jwt", "", {maxAge:0}); // cookie expored immediately
        res.status(200).json({message: "Logged out succesfullt"});
    }catch(error){
        console.log("Error in auth controller ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const updateProfile = async (req, res) => {

    try{
        const {profilePic} = req.body;
        const userId = req.user._id; // returned from middlewear

        if(!profilePic){
            return res.status(400).json({message:"Profile pic is required"});
        }

        const uploadedResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadedResponse.secure_url },
            {new: true} // return new updated user instead of the old record
        );

        res.status(200).json(updatedUser);

    }catch(error){
        console.log("Error in auth controller while uploading picture", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const checkAuth = (req, res)=>{
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log("Error in auth controller in checkAuth", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}