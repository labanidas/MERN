import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // to prsse cookie

import { connectDB } from "./lib/db.js";
import authRoutes from './routes/auth.route.js';
import messageRoute from "./routes/message.route.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser()); // allow to parse a cookie

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);


const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server is running on port number ${PORT}`);
    connectDB();
})