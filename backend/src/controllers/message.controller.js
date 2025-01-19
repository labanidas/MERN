import Message from "../models/message.model.js"

export const getUserForSidebar = async(req, res) =>{
    res.status(200).json({message: "getUserForSidebar"})
}

export const getMessages = async(req, res) =>{
    res.status(200).json({message: "getMessages"})
}

export const sendMessage = async(req, res) =>{
    res.status(200).json({message: "sendMessage"})
}