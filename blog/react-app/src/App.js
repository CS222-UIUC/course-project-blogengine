import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Blog from './Blog';
import About from './About';
import Posts from './Posts';


function App() {
  let component;
  switch (window.location.pathname) {
    case "/":
      component = <Home />;
      break;
    case "/blog":
      component = <Blog />;
      break;
    case "/about":
      component = <About />;
      break;
  }

  return <>
    <Navbar />
    <div class="container">
      {component}
    </div>
  </>
}

export default App;