import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { BackButton } from "../components/BackButton";

export const ShowBook = () => {

  const [book, setBook] = useState({})
  const [loading, setLoading] = useState(false)
  const {id} = useParams()

  useEffect(() => {
    setLoading(true)
  
    axios
      .get(`http://localhost:4040/books/${id}`)
      .then(response => {
        setLoading(false)
        setBook(response.data)
      })
      .catch(error => {
        console.log(error);
        setLoading(false)
      })
  }, [])
  

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl-4 mr-4 text-gray-500">ID</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl-4 mr-4 text-gray-500">TITLE</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl-4 mr-4 text-gray-500">AUTHOR</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl-4 mr-4 text-gray-500">PUBLISH YEAR</span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl-4 mr-4 text-gray-500">CREATE TIME</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl-4 mr-4 text-gray-500">LAST UPDATED TIME</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}
