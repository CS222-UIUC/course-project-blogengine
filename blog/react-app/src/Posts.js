import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

// import axios from "axios";

console.log("in posts");

export default function Posts() {
    console.log("in in posts");

    const [blogs, setBlogs] = useState([{
        title: '',
        content: ''
    }])

    useEffect(() => {
        fetch("/getposts").then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonRes => setBlogs(jsonRes));
    })

    // const postSlug = slugify(postTitle, {
    //     lower: true, // Convert to lowercase
    //     strict: true, // Replace special characters with dashes
    // });

    return (
        <div className='container'>
            <h1>Posts</h1>
                {blogs.map(blog => 
                    <div>
                        <h1>{blog.title}</h1>
                        <p>{blog.content}</p>
                        <Link to={`/posts/${blog.slug}`}>Read More</Link> {/* Use the Link component to link to the individual blog post page */}
                    </div>
                )}
        </div>
    )
}