import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import Spinner from "../components/Spinner";
import BookTable from "../components/Home/BookTable";
import BookCard from "../components/Home/BookCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoader(true);
    axios
      .get("http://localhost:3000/books")
      .then((response) => {
        setBooks(response.data.data);
        console.log(books);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button className="bg-sky-300 hover:bg-sky-600 px-6 py-1 rounded-lg"
         onClick={(()=>{ setShowType('table')})}>Table
        </button>
        <button className="bg-sky-300 hover:bg-sky-600 px-6 py-1 rounded-lg"
         onClick={(()=>{ setShowType('card')})}>Card
        </button>
      </div>
      <div className="flex flex-col justify-between items-center">
        <h1 className="text-3xl  my-8">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
        {loader ? (
          <Spinner />
        ) : (
          showType == 'table' ? <BookTable books = {books} /> : <BookCard />
        )}
      </div>
    </div>
  );
};

export default Home;
