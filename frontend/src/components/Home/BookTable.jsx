import React from 'react'
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import {MdOutlineDelete} from "react-icons/md"
import { Link } from "react-router-dom";

function BookTable({books}) {
  return (
    <table className="w-full border-seperate border-spacing-2">
    <thead>
      <tr>
        <th className="border border-slate-600 rounded-md">No.</th>
        <th className="border border-slate-600 rounded-md">Title</th>
        <th className="border border-slate-600 rounded-md max-md:hidden">
          Author
        </th>
        <th className="border border-slate-600 rounded-md max-md:hidden">
          Publish year
        </th>
        <th className="border border-slate-600 rounded-md">
          Operations
        </th>
      </tr>
    </thead>
    <tbody>
      {books.map((book, index) => (
        <tr className="h-8 " key={book._id}>
          <td className="border border-slate-700 rounded-md text-center ">
            {index + 1}
          </td>
          <td className="border border-slate-700 rounded-md text-center ">
            {book.title}
          </td>
          <td className="border border-slate-700 rounded-md text-center max-md:hidden">
            {book.author}
          </td>
          <td className="border border-slate-700 rounded-md text-center max-md:hidden">
            {book.publish_year}
          </td>
          <td className="border border-slate-700 rounded-md text-center max-md:hidden">
            <div className="flex justify-center gap-x-4">
              <Link to={`/books/details/${book._id}`}>
                <BsInfoCircle className="text-2xl text-green-800" />
              </Link>
              <Link to={`/books/edit/${book._id}`}>
                <AiOutlineEdit className="text-2xl text-yellow-800" />
              </Link>
              <Link to={`/books/delete/${book._id}`}>
                <MdOutlineDelete className="text-2xl text-red-800" />
              </Link>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default BookTable