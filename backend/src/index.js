import express from "express";
import authRoutes from './routes/auth.route.js';

const app = express();

app.use("/app/auth", authRoutes)


const PORT = 5001
app.listen(PORT, ()=>{
    console.log(`Server is running on port number ${PORT}`);
})