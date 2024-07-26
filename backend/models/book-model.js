import mongoose from "mongoose";

const book_schema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    publish_year: {
      type: String,
      require: true,
    },
  }
);

const Book = mongoose.model("Book", book_schema);
export default Book;
