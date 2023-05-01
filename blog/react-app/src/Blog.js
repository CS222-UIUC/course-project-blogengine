import React, { useState } from 'react';

export default function Blog() {
    console.log("in in blog");

    const [input, setInput] = useState({
        title: "",
        content: ""
    });

    function handleChange(event) {
        const {name, value} = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }

    const handleClick = (e) => {
        e.preventDefault();

        console.log(input);
    }
    // const handleClick = (e) => { // Once the form has been submitted, this function will post to the backend
    //     const postURL = "http://localhost:3000/api/staff/" //Our previously set up route in the backend
    //     fetch(postURL, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ // We should keep the fields consistent for managing this data later
    //             title: title,
    //             content: content,
    //         })
    //     })
    //     .then(()=>{
    //         // Once posted, the user will be notified 
    //         alert('You have been added to the system!');
    //     })
    // }

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 style={{ textAlign: "center" }}>Blog</h1>
        <form method="post" action="/blog" style={{ maxWidth: "800px", width: "100%" }}>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              name="title"
              aria-describedby="emailHelp"
              placeholder="Enter title"
            />
            <small id="titleHelp" className="form-text text-muted">
              super cool title that draws people in.
            </small>
          </div>
          <div className="form-group">
            <label>Your Post</label>
            <textarea
              name="content"
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Let the ink flow!"
            ></textarea>
          </div>
          <button className="btn btn-primary">Post</button>
        </form>
    
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img
            src="https://thumbs.dreamstime.com/z/d-illustration-depicting-set-cut-out-printed-letters-arranged-to-form-words-get-creative-get-creative-concept-108033401.jpg"
            alt="left-image"
            style={{ width: "40%", height: "auto", objectFit: "cover", marginRight: "20px" }}
          />
          <img
            src="https://www.success.com/wp-content/uploads/2016/07/waystotapintoyourcreativeself.jpg"
            alt="right-image"
            style={{ width: "40%", height: "auto", objectFit: "cover", marginLeft: "20px" }}
          />
        </div>
    
        <p style={{ marginTop: "20px" }}>
          Having trouble coming up with post ideas?&nbsp;
          <a href="https://coschedule.com/blog/creative-blog-post-ideas-and-topics" target="_blank" rel="noopener noreferrer">
            Click here
          </a>
          &nbsp;to get your creative juices flowing!
        </p>
      </div>
    );
    
}

