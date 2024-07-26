import  { Router } from "express";
import Book from "../models/book-model.js";
const book_router = Router();

// const router = Router();

// getting all books

book_router.get("/", async(req, res)=>{
  try{
    const all_books = await Book.find({});
    res.status(200).json({
      count: all_books.length,
      data: all_books});
  }catch(error){
    res.status(500).send({message: error.message});
  }
})

// creating a book
book_router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { title, author, publish_year } = req.body;
    if (!title || !author || !publish_year) {
      return res.status(400).send({ message: "no field can be empty" });
    }
    const new_book = {
      title: title,
      author: author,
      publish_year: publish_year,
    };
    const new_book_created = await Book.create(new_book);

    return res.status(201).send(new_book_created);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// getting a specific book
book_router.get("/:id", async (req, res)=>{
  try{
    const book = await Book.findById(req.params.id);
    if(!book){
      return res.status(404).send({message: 'Book not found'});
    }
    return res.status(200).json(book);
  }catch(error){
    res.send(500).send({message: error.message});
  }
});

// updating a book
book_router.put("/:id", async (req, res) => {
  try {
    console.log(req.body);
    const { title, author, publish_year } = req.body;
    if (!title || !author || !publish_year) {
      return res.status(400).send({ message: "no field can be empty" });
    }
    const book = {
      title: title,
      author: author,
      publish_year: publish_year,
    };
    const updated_book = await Book.findByIdAndUpdate(req.params.id, book, {returnDocument: 'after'});
    if(!updated_book){
      return res.status(404).send({message: 'Book not found'});
    }

    return res.status(200).send(updated_book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


// deleting a book
book_router.delete("/:id", async (req, res)=>{
  try{
    const book = await Book.findByIdAndDelete(req.params.id);
    if(!book){
      return res.status(404).send({message: "Book not found"});
    }
    return res.status(200).send({message: "Book deleted succesfully"});

  }catch(error){
    res.status(500).send({message: error.message});
  }
})

export default book_router;
