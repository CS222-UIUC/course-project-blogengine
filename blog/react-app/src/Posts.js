import React, {useState, useEffect} from 'react';
import axios from "axios";

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

    // useEffect(() => {
    //     axios.get('/posts').then((res) => {
    //       setBlogs(res.data);
    //     });
    // }, []);

    return (
        <div className='container'>
            <h1>Posts</h1>
                {blogs.map(blog => 
                    <div>
                        <h1>{blog.title}</h1>
                        <p>{blog.content}</p>
                    </div>
                )}
        </div>
    )
}