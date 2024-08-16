import React, { useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton';
import { useSnackbar } from 'notistack';

function DeleteBook() {

  const [loader, setLoader] = useState(false);
  const {id} = useParams()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoader(true);
    axios
      .delete(`http://localhost:3000/books/${id}`)
      .then(() => {
        setLoader(false)
        enqueueSnackbar("Book deleted succesfully", { variant: "success" })
        navigate('/')
      }).catch((error) => {
        console.log(error)
        enqueueSnackbar("Error", { variant: "error" })
        setLoader(false)
      })
  }
  return (
    <div className='p-4'>
      <BackButton />
        {loader ? (<Spinner />) : (
          <h1 className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'><h3 className='text-2xl'>Are You Sure You want to delete this book?</h3>
          <button
            className='p-4 bg-red-600 text-white m-8 w-full'
            onClick={handleDeleteBook}
          >
            Yes, Delete it
          </button>
        </h1>
        )}
        
    </div>
  )
}

export default DeleteBook