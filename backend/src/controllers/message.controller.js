import Message from "../models/message.model.js";
import User from "../models/user.model.js";

import cloudinary from "../lib/cloudinary.js";


export const getUserForSidebar = async(req, res) =>{
    try{
        const loggedInUserId = req.user._id;
        const finteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password"); // find all users except users with id of current user id and select everything except password
        
        res.status(200).json(finteredUsers);
    }catch(error){
        console.log("Error in message controller in getUserForSidebar", error.message);
        res.status(500).json({message: "Internal server error"});   
    }
}

export const getMessages = async(req, res) =>{
    try{
        const {id:userToChat} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChat },
                {senderId:userToChat, receiverId:myId }
            ]
        });

        res.status(200).jeon(messages);

    }catch(error){
        console.log("Error in message controller in getMessages", error.message);
        res.status(500).json({message: "Internal server error"});   
    }
}

export const sendMessage = async(req, res) =>{
    try{
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadedResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadedResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        await newMessage.save();

        // todo -- realtime functionality here --  using socket.io

        res.status(201).json(newMessage);

    }catch(error){
        console.log("Error in message controller in getMessages", error.message);
        res.status(500).json({message: "Internal server error"});   
    }
}