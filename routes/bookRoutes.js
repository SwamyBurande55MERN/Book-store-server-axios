const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Book = require("../model/book.js");
const authenticate = require("../middleware/auth.js");

//create new book
router.post("/newbook",async (req, res) => {
      try {
            const { bookName, author, description, price, publishDate, available, image } =
                  req.body;
            if (
                  !bookName ||
                  !author ||
                  !description ||
                  !price ||
                  !publishDate ||
                  !available || 
                  !image
            ) {
                  return res
                        .status(403)
                        .json({ "error message": `All book fields are mandatory` });
            }

            const newBook = new Book({
                  bookName,
                  author,
                  description,
                  price,
                  publishDate,
                  available,
                  image
            });

            const saveNewBook = newBook.save();
            if (!saveNewBook) {
                  return res
                        .status(500)
                        .json({ "error message": `error while saving book` });
            }
            return res.status(200).json({ message: `New book created successfully` });
      } catch (err) {
            console.log(`error : ${err}`);
      }
});

//get all books
router.get("/getallbooks", async (req, res) => {
      try {
            const allBooks = await Book.find();
            if (!allBooks) {
                  return res
                        .status(500)
                        .json({ "error message": `error in getting all books` });
            }
            res.status(200).send(allBooks);
      } catch (err) {
            console.log(`error while getting all books`);
      }
});

//delete one book
router.delete("/deletebook/:id", async (req, res) => {
      try {
            const bookId = req.params.id;

            const deletedBook = await Book.findByIdAndDelete(bookId);

            if (!deletedBook) {
                  return res.status(404).json({ "error message": "Book not found" });
            }

            return res.status(200).json({ message: "Book deleted successfully" });
      } catch (err) {
            console.error(`Error: ${err}`);
            return res.status(500).json({ "error message": "Internal server error" });
      }
});

//get one book
router.get("/getonebook/:id", async (req, res) => {
      const bookId = req.params.id;
      const getBook = await Book.findById(bookId);
      if (!getBook) {
            return res.status(403).json({ error: "Book does not exist" });
      }
      return res.status(200).send(getBook);
});

//update one book
router.put("/updatebook/:id", async (req, res) => {
      try {
            const bookId = req.params.id;

            const updatedBook = await Book.findByIdAndUpdate(
                  bookId,
                  { $set: req.body },
                  { new: true }
            );

            if (!updatedBook) {
                  return res.status(404).json({ "error message": "Book not found" });
            }

            return res.status(200).json({ message: "Book updated successfully", book: updatedBook });
      } catch (err) {
            console.error(`Error: ${err}`);
            return res.status(500).json({ "error message": "Internal server error" });
      }
});

module.exports = router;