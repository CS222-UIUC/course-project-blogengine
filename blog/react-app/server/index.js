
const path = require("path");
const express = require("express");
const app = express(); // create express app

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//slug stuff
// const slug = require('mongoose-slug-generator');
// mongoose.plugin(slug);

//slug stuff
// const slug = require('mongoose-slug-generator');
// mongoose.plugin(slug);

app.use(express.json());

app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect("mongodb+srv://goose:cRz5rNM2QBwXhOtn@bloggoose.wdsjcvj.mongodb.net/notesDB");

const slugify1 = require('slugify');

const notesSchema = mongoose.Schema({
  // title: String,
  // content: String,
  // //Define the slug parameters
  // slug: { type: String, slug: "title"}, //got rid of unique lol 
  title: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, slug: function(doc) {
    const title = doc.title;
    const asciiValues = doc.content
      .substring(0, Math.min(doc.content.length, 10))
      .split('')
      .map(char => char.charCodeAt(0))
      .reduce((sum, val) => sum + val, 0) % 1000;
    const slug = `${title}-${asciiValues}`;
    return slugify(slug, { lower: true, remove: /[*+~.()'"!:@]/g });
  }, index: true }
})

// {
//   title: String,
//   content: String,
//   // timestamps: true,
//   //Define the slug parameters
//   slug: { type: String, slug: "title" , unique: true} 
// }
// notesSchema.plugin(URLSlugs('title'));

const Note = mongoose.model("Note", notesSchema);

//add middlewares
let thing = path.join(__dirname, "..", "src/blog");
// app.post("/blog", function(req, res) {
//   let newNote = new Note({
//     title: req.body.title,
//     content: req.body.content
//   });
//   console.log(req.body.title);
//   // newNote.save();
//   // res.redirect("/blog");

//   newNote.save()
//     .then(() => {
//       console.log(req.body.title);
//       res.redirect("/blog");
//     })
//     .catch((err) => {
//       console.log("error");
//       console.error(err);
//       res.sendStatus(500);
//     });
// })


const slugify = require("mongoose-slug-generator");

mongoose.plugin(slugify);

app.post("/blog", async function(req, res) {
  try {
    let newNote = new Note({
      title: req.body.title,
      content: req.body.content
    });

    // const postSlug = slugify1(newNote.title, {
    //   lower: true,
    //   strict: true,
    // });
    // newNote.slug = postSlug;

    if (!newNote.slug) {
      console.log("generating slug");

      const slugTitle = slugify1(newNote.title, { lower: true, remove: /[*+~.()'"!:@]/g });
      const asciiValues = newNote.content.length > 10
        ? newNote.content.substring(0, 10).split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
        : newNote.content.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);

      newNote.slug = `${slugTitle}-${asciiValues % 1000}`;

      console.log("slug: " + newNote.slug);
    }

    console.log(req.body.title);

    await newNote.save();

    // console.log("Generated Slug:", postSlug);

    res.redirect("/blog");
  } catch (err) {
    console.log("error");
    console.error(err);
    res.sendStatus(500);
  }
});


app.get("/getposts", function(req, res) {
  console.log("get");
  Note.find().then(foundNotes => res.json(foundNotes));
  console.log("hmm");
  //const hmm = Note.find();

  // hmm.forEach(console.log);
})

app.get('/posts/:slug', async(req, res) => { //changed :posts to posts
  console.log("omggg");

  // const postSlug = slugify1(req.params.title, {
  //   lower: true, // Convert to lowercase
  //   strict: true, // Replace special characters with dashes
  // });

  // console.log(postSlug);

  Note.findOne({ slug: req.params.slug })
  .then(posts => {
    // if (post) {
    //   console.log(`Post found with id: ${post._id}`);
    // } else {
    //   console.log(`Post not found with slug: ${req.params.slug}`);
    // }

    if(!posts) {
      return res.status(404).json({
              message : "Post not found!"
      })
    }

    res.status(200).json({
                    title: posts.title,
                    content: posts.content,
    })
    //An extra console response never hurts!
    return console.log(posts);
  })
  .catch(error => {
    console.log(error);
  });
  // const id = req.params._id;
  // return console.log(id);
  // const posts = await Note.findById(req.params.posts);

  // if(!posts) {
  //     return res.status(404).json({
  //             message : "Post not found!"
  //     })
  // }

  // res.status(200).json({
  //                 title: posts.title,
  //                 body: posts.content,
  // })
  // //An extra console response never hurts!
  // return console.log(posts);
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
