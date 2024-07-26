import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import axios from 'axios';

function ShowBook() {

  const [loading, setLoader] = useState(false);
  const [book, setbook] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    setLoader(true);
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((response) => {
        setbook(response.data);
        // console.log(response.data)
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      })
  }, []);
  return (
    <div className='p-4'>
      <BackButton />
      <h3 className='text-3xl my-4'>Show Book</h3>
      {loading ? (<Spinner />) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year</span>
            <span>{book.publish_year}</span>
          </div>
          <div className="my-4">
            {/* delete and edit links here  */}
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook