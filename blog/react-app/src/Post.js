import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { Renderer, parse } from 'marked';

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
        return { __html: sanitizedHtml };
    };

  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={renderText(post.content)}></div>
    </div>
  );
}