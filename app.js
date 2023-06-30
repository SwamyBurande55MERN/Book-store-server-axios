const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const port = process.env.PORT || 7000;

const app = express();  
app.use(cors()); // Enable CORS for all routes
app.use(express.json());  // to parse data => json data

const userRoute = require("./routes/userRoutes.js");
const bookRoute = require("./routes/bookRoutes.js");

app.use(userRoute);
app.use(bookRoute);

// connecting to mongo db using mongoose.connect
mongoose.connect(process.env.CONNECTION_URL,{
    useNewUrlParser:true
  }).then(()=> {
    console.log(`connected to db`);
  }).catch(()=> {
    console.log(`connection terminated`);
  })

// app.get("/", (req, res)=> {
//       res.status(201).send(`<h1> Hello </h1>`);
// })
app.listen(port, ()=> {
      console.log(`Server listening to port ${port}`);
})