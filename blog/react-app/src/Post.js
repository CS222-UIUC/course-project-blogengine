import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parse } from 'marked';

export default function Post() {
    console.log("in the post");
  const { slug } = useParams(); // Get the slug parameter from the URL
  const [post, setPost] = useState({ title: '', content: '' });

  console.log(slug);

  useEffect(() => {
    fetch(`/posts/${slug}`) // Make a GET request to the server to get the blog post with the specified slug
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [slug]);

  const renderText = (content) => {
    const html = parse(content, { sanitize: true });
    return { __html: html };
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={renderText(post.content)}></div>
    </div>
  );
}