import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';
import book_router from "./routers/book-router.js";

dotenv.config();

const app = express();

// Middleware for parsing request body
app.use(express.json());
app.use(cors()); // allow all 
// allow custom origin -- more controlled
// app.use(cors({
//   origin: "http://localhost:3000/",
//   methods: ['GET', 'PUT', 'POST', 'DELETE'],
//   allowheaders: ['Content-Type']
// }))


app.get("/", (req, res) => {
  return res.status(200).send("New mern project");
});

app.use("/books", book_router);

mongoose
  .connect(process.env.mongoURL)
  .then(() => {
    console.log("App connected to database");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
