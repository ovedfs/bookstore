import express from 'express'
import { Book } from "../models/BookModel.js"

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const books = await Book.find({})

    return res.status(200).send(books)
  } catch (error) {
    console.log(error);
    res.status(500).send({message: error.message})
  }
})

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)

    return res.status(200).send(book)
  } catch (error) {
    console.log(error);
    res.status(500).send({message: error.message})
  }
})

router.post('/', async (req, res) => {
  try {
    if(!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({message: 'Send all required files: title, author, publishYear'})
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear
    }

    const book = await Book.create(newBook)

    return res.status(201).send(book)
    
  } catch (error) {
    console.log(error);
    res.status(500).send({message: error.message})
  }
})

router.put('/:id', async (req, res) => {
  try {
    const result = await Book.findByIdAndUpdate(req.params.id, req.body)

    if(!result) {
      return res.status(404).send({message: 'Book not founded'})
    }

    return res.status(201).send({message: 'Book updated'})
  } catch (error) {
    console.log(error);
    res.status(500).send({message: error.message})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id)

    if(!result) {
      return res.status(404).send({message: 'Book not deleted'})
    }

    return res.status(200).send({message: 'Book deleted'})
  } catch (error) {
    console.log(error);
    res.status(500).send({message: error.message})
  }
})

export default router