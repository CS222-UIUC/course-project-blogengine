import React, { useState } from 'react';

export default function Blog() {
    let [title, setTitle] = useState();
    let [content, setContent] = useState();

    const titleUpdate = (event) => { // Dealing with name field changes to update our state
        setTitle(event.target.value);
        setContent(event.target.value);
    }

    const handleSubmit = (e) => { // Once the form has been submitted, this function will post to the backend
        const postURL = "http://localhost:3000/api/staff/" //Our previously set up route in the backend
        fetch(postURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ // We should keep the fields consistent for managing this data later
                title: title,
                content: content,
            })
        })
        .then(()=>{
            // Once posted, the user will be notified 
            alert('You have been added to the system!');
        })
    }

    return (
        <div>
            <h1>Blog</h1>

            <form method='post' action='/'>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" name="title" aria-describedby="emailHelp" placeholder="Enter title" />
                    <small id="emailHelp" className="form-text text-muted">super cool title that draws people in.</small>
                </div>
                <div className="form-group">
                    <label>Your Post</label>
                    <textarea name="content" className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Let the ink flow!"></textarea>
                </div>
                <button className='btn btn-primary'>Post</button> 
            </form>
            
            {/* type="submit" class="btn btn-primary" */}
        </div>
    );
}

