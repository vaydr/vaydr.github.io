import React from 'react';
import { HasHRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import CV from './pages/CV';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/humans" element={<CV />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          {/* Add a wildcard route to handle all other paths */}
          <Route path="*" element={<Home />} /> {/* Redirect all unmatched paths to Home */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
