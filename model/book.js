const mongoose = require("mongoose");
// const {ObjectId} = mongoose.Schema.Types;

const bookSchema = new mongoose.Schema({
      bookName : {
            type : String,
            required : true
      },
      author : {
            type : String,
            required: true
      },
      description : {
            type : String,
            required : true
      },
      price : {
            type : String,
            required : true
      },
      publishDate : {
            type : String,
            required : true
      },
      available : {
            type : Boolean
      },
      image : {
            type : String,
            required : true
      }
})

const Book = mongoose.model("BOOKS", bookSchema);
module.exports = Book;