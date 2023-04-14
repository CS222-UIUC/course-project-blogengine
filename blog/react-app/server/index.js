
const path = require("path");
const express = require("express");
const app = express(); // create express app

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(express.json());

app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect("mongodb+srv://goose:cRz5rNM2QBwXhOtn@bloggoose.wdsjcvj.mongodb.net/notesDB");

const notesSchema = {
  title: String,
  content: String
}

const Note = mongoose.model("Note", notesSchema);

//add middlewares
let thing = path.join(__dirname, "..", "src/blog");
app.post("/blog", function(req, res) {
  let newNote = new Note({
    title: req.body.title,
    content: req.body.content
  });
  console.log(req.body.title);
  newNote.save();
  res.redirect("/blog");
})

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use((req, res, next) => {
  console.log("lalala");
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// start express server on port 3000
app.listen(3000, () => {
  console.log("server started on port 3000");
});
