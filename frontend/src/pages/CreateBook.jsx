import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';


function CreateBook() {
  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publish_year, setPublish_year] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleRequest = () => {
    const data = {
      "title": title,
      "author": author,
      "publish_year": publish_year
    }
    setAuthor(true)
    axios
      .post('http://localhost:3000/books', data)
      .then(() => {
        setLoader(false);
        enqueueSnackbar("Book created succesfully", { variant: "success" })
        navigate('/')
      }).catch((error) => {
        console.log(error)
        enqueueSnackbar("Error", { variant: "error" })
        setLoader(false)
      })
  }


  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loader ? (<Spinner />) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label htmlFor="" className="text-xl mr-4 text-gray-500">Title</label>
            <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} className="border-2 border-gray-500 px-4 py-2 w-full" />
          </div>
          <div className="my-4">
            <label htmlFor="" className="text-xl mr-4 text-gray-500">Author</label>
            <input type="text" value={author} onChange={(e) => { setAuthor(e.target.value) }} className="border-2 border-gray-500 px-4 py-2 w-full" />
          </div>
          <div className="my-4">
            <label htmlFor="" className="text-xl mr-4 text-gray-500">Publish year</label>
            <input type="text" value={publish_year} onChange={(e) => { setPublish_year(e.target.value) }} className="border-2 border-gray-500 px-4 py-2 w-full" />
          </div>
          <button className="p-2 bg-sky-300 m-8" onClick={handleRequest}>Save</button>
        </div>
      )}
    </div>
  )
}

export default CreateBook