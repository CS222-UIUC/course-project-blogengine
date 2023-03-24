import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';


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
    {component}
  </>
}

export default App