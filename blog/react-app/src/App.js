import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Blog from './Blog';
import About from './About';
import Posts from './Posts';
import Post from './Post';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  // let component;
  // switch (window.location.pathname) {
  //   case "/":
  //     component = <Home />;
  //     break;
  //   case "/blog":
  //     component = <Blog />;
  //     break;
  //   case "/posts":
  //     component = <Posts />;
  //     break;
  //   case "/about":
  //     component = <About />;
  //     break;
  // }

  // return <>
  //   <Navbar />
  //   <div class="container">
  //     {component}
  //   </div>
  // </>
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:slug" element={<Post />} /> 
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;