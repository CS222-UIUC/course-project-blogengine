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
 
      {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img
          src="https://img.freepik.com/premium-photo/creative-mind-3d-illustration-with-light-bulb-generative-ai_549702-684.jpg"
          alt="left-image"
          style={{ width: "40%", height: "auto", objectFit: "cover", marginRight: "20px" }}
        />
        <img
          src="https://www.success.com/wp-content/uploads/2016/07/waystotapintoyourcreativeself.jpg"
          alt="right-image"
          style={{ width: "40%", height: "auto", objectFit: "cover", marginLeft: "20px" }}
        />
      </div> */}
 
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
