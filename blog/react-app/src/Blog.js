// import React, { useState } from 'react';
// import { parse }  from 'marked';

// export default function Blog() {
//     console.log("in in blog");

//     const [input, setInput] = useState({
//         title: "",
//         content: ""
//     });

//     // function handleChange(event) {
//     //     const {name, value} = event.target;

//     //     setInput(prevInput => {
//     //         return {
//     //             ...prevInput,
//     //             [name]: value
//     //         }
//     //     })
//     // }

//     handleChange = event => {
//         const {name, value} = event.target;
//         //this.setInput({title, content})

//         setInput(prevInput => {
//             return {
//                 ...prevInput,
//                 [name]: value
//             }
//         })
//     }

//     const handleClick = (e) => {
//         e.preventDefault();

//         console.log(input);
//     }

//     renderText = content => {
//         const __html = parse(content, { sanitize: true });
//         return { __html };
//     }

//     return (
//         <div>
//             <h1>Blog</h1>

//             <form method='post' action='/blog'>
//                 {/* <div className="form-group">
//                     <label>Title</label>
//                     <input className="form-control" name="title" aria-describedby="emailHelp" placeholder="Enter title" />
//                     <small id="titleHelp" className="form-text text-muted">super cool title that draws people in.</small>
//                 </div>
//                 <div className="form-group">
//                     <label>Your Post</label>
//                     <textarea name="content" className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Let the ink flow!"></textarea>
//                 </div> */}
//                 <div className="form-group">
//                     <label>Title</label>
//                     <input className="form-control" name="title" aria-describedby="emailHelp" placeholder="Enter title" />
//                     <small id="titleHelp" className="form-text text-muted">super cool title that draws people in.</small>
//                 </div>
//                 <div className='form-group'>
//                     <label>Your Post</label>
//                     <div className='row'>
//                         <div className='col-sm-12'>
//                             <textarea 
//                                 onChange={this.handleChange}
//                                 value={this.input.content}
//                                 className='form-control' rows='20' placeholder="Let the ink flow!"></textarea>
//                         </div>
//                         <div className='col-sm-6'>
//                             <div dangerouslySetInnerHTML={this.renderText(this.state.text)}></div> 
//                         </div>
//                     </div>
//                 </div>
  
//                 <button className='btn btn-primary'>Post</button> 
//             </form>
//             {/* type="submit" class="btn btn-primary" */}
//         </div>
//     );
// }

// // return (
// //     <div className='container'>
// //         <div className='row'>
// //         <div className='col-sm-6'>
// //             <textarea className='form-control'rows='35' />
// //             // we will write our text here
// //         </div>
// //         <div className='col-sm-6'>
// //             // we will render our text here
// //         </div>
// //         </div>
// //     </div>
// // )

import React, { useState } from 'react';
import { parse } from 'marked';
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

  const renderText = (content) => {
    const html = parse(content, { sanitize: true });
    return { __html: html };
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
