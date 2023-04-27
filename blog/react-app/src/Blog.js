import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { Renderer, parse } from 'marked';
import './Blog.css';

export default function Blog() {
  console.log('in in blog');

  const [input, setInput] = useState({
    title: '',
    content: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    console.log(input);
  };

  const customRenderer = new Renderer();
  customRenderer.image = function(href, title, text) {
    const match = text.match(/(\d+)\s+(\d+)/);
    const match1 = text.match(/(\d+)/);
    if (match) {
      const width = match[1] + 'px';
      const height = match[2] + 'px';
      const style = `width: ${width}; height: ${height};`;
      return `<img src="${href}" alt="${text}" title="${title}" style="${style}">`;
    } else if (match1) {
      const img = new Image();
      img.src = href;
      
      const origWidth = img.naturalWidth;
      const origHeight = img.naturalHeight;

      const scale = match1[1];
      const newWidth = origWidth * scale;
      const newHeight = origHeight * scale;
      const style = `width: ${newWidth}px; height: ${newHeight}px;`;

      img.remove();

      return `<img src="${href}" alt="${text}" title="${title}" style="${style}">`;
    } else {
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
        <h1>Blog</h1>

        <form method="post" action="/blog">
            <div className="form-group">
                <label>Title</label>
                <input
                    className="form-control"
                    name="title"
                    aria-describedby="emailHelp"
                    placeholder="Enter title"
                    onChange={handleChange}
                />
                <small id="titleHelp" className="form-text text-muted">
                    super cool title that draws people in.
                </small>
            </div>
            <div className="form-group">
                {/* <label>Your Post</label> */}
                <div className="d-flex align-items-center justify-content-between">
                    <label className="d-flex flex-row">Your Post</label>
                    <label className="d-flex flex-row-reverse">Preview</label>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <textarea
                            name="content"
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="20"
                            placeholder="Let the ink flow!"
                            onChange={handleChange}
                            value={input.content}
                        ></textarea>
                    </div>
                    <div className="col-sm-6">
                        <div dangerouslySetInnerHTML={renderText(input.content)}></div>
                    </div>
                </div>
            </div>

            <button className="btn btn-primary">Post</button>
        </form>
    </div>
  );
}
