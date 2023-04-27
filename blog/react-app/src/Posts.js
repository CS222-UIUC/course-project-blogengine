import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Posts.css';
import DOMPurify from 'dompurify';
import { Renderer, parse } from 'marked';

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

    const customRenderer = new Renderer();
    customRenderer.image = function(href, title, text) {
        const match = text.match(/(?<=\|)\s*(\d+)\s+(\d+)/);
        const match1 = text.match(/(?<=\|)\s*(?:0*\.)?\d+(?:\.\d+)?/); // /^\d+(\.\d+)?$/ /(?<!\d)0*(\d*)(?:\.(\d+))?/
        if (match) {
        const width = match[1] + 'px';
        const height = match[2] + 'px';
        text = text.replace("|" + match[0], '').trim();
        const style = `width: ${width}; height: ${height};`;
        return `<img src="${href}" alt="${text}" title="${title}" style="${style}">`;
        } else if (match1) {
        const img = new Image();
        img.src = href;
        console.log(match1);
        const origWidth = img.naturalWidth;
        const origHeight = img.naturalHeight;

        const scale = match1[0];
        const newWidth = origWidth * scale;
        const newHeight = origHeight * scale;
        text = text.replace("|" + match1[0], '').trim();
        const style = `width: ${newWidth}px; height: ${newHeight}px;`;

        img.remove();

        return `<img src="${href}" alt="${text}" title="${title}" style="${style}">`;
        } else {
        console.log("IM HERE");

        return `<img src="${href}" alt="${text}" title="${title}">`;
        }
    };

    const renderText = (content) => {
        const html = parse(content, {renderer: customRenderer});
        const sanitizedHtml = DOMPurify.sanitize(html);
        const shorter_html = sanitizedHtml.length > 100 ? sanitizedHtml.substring(0, 100) + "..." : sanitizedHtml;
        return { __html: shorter_html };
    };

    return (
        <div>
            <h1 id='header'>Posts</h1>
            {blogs.map(blog =>
                <div className='card'>
                    {/* <div className="container-sm"> */}
                        <h3>
                            <Link to={`/posts/${blog.slug}`} className="nowrap-title">
                                {blog.title}
                            </Link>
                        </h3>
                        <div className="snippet">
                            {/* <p dangerouslySetInnerHTML={{ __html: blog.body }}></p> */}
                            {/* <p>{blog.content.length > 100 ? blog.content.substring(0, 100) + "..." : blog.content}</p> */}
                            <p dangerouslySetInnerHTML={renderText(blog.content)}></p>
                            <Link to={`/posts/${blog.slug}`} className="nowrap-body">
                                {blog.content.length > 100 ? "Read more" : "Go to post"}{" "}
                            {/* <i className="fas fa-arrow-circle-right"></i> */}
                            </Link>
                        </div>
                    {/* </div> */}
                </div>
            )}
        </div>
        // <div className='container'>
        //     <h1>Posts</h1>
        //         {blogs.map(blog => 
        //             <div>
        //                 <h1>{blog.title}</h1>
        //                 <p>{blog.content}</p>
        //                 <Link to={`/posts/${blog.slug}`}>Read More</Link> {/* Use the Link component to link to the individual blog post page */}
        //             </div>
        //         )}
        // </div>
    )
}

// <Link to={`/posts/${blog.slug}`} className="nowrap-body">
// {blog.content.length > 100 ? "Read more" : "Go to post"}{" "}
// {/* <i className="fas fa-arrow-circle-right"></i> */}
// </Link>