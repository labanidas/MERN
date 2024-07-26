import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'


function EditBook() {
  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publish_year, setPublish_year] = useState('');
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    setLoader(true);
    axios
    .get(`http://localhost:3000/books/${id}`)
    .then((response)=>{
      console.log(response.data)      
      setTitle(response.data.title)
      setAuthor(response.data.author)
      setPublish_year(response.data.publish_year)
      setLoader(false)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])

  const handleRequest = () => {
    const data = {
      "title":title,
      "author":author,
      "publish_year": publish_year
    }
    // console.log(data)
    setAuthor(true)
    axios
      .put(`http://localhost:3000/books/${id}`, data)
      .then((response) => {
        setLoader(false);
        navigate('/')
      }).catch((error) => {
        console.log(error)
        setLoader(false)
      })
  }


  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loader ? (<Spinner />) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600] p-4 mx-auto">
          <div className="my-4">
            <label htmlFor="" className="text-al mr-4 text-gray-500">Title</label>
            <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} className="border-2 border-gray-500 px-4 py-2 w-full" />
          </div>
          <div className=".">
            <label htmlFor="" className="text-al mr-4 text-gray-500">Author</label>
            <input type="text" value={author} onChange={(e) => { setAuthor(e.target.value) }} className="border-2 border-gray-500 px-4 py-2 w-full" />
          </div>
          <div className="my-4">
            <label htmlFor="" className="text-al mr-4 text-gray-500">Publish year</label>
            <input type="text" value={publish_year} onChange={(e) => { setPublish_year(e.target.value) }} className="border-2 border-gray-500 px-4 py-2 w-full" />
          </div>
          <button className="p-2 bg-sky-300 m-8" onClick={handleRequest}>Save</button>
        </div>
      )}
    </div>
  )
}

export default EditBook