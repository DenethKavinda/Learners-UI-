import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop"; // Import the ScrollToTop component
import Home from "./Home";
import Packages from "./Packages";
import Gallery from "./Gallery";
import About from "./About";
import Contact from "./Contact";
import PracticeExam from "./PracticeExam"; // Import the PracticeExam component
import Feedback from "./Feedback"; // Import the Feedback component
// Import other pages like Gallery, About, Contact as you create them

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Packages" element={<Packages />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/PracticeExam" element={<PracticeExam />} />{" "}
        <Route path="/Feedback" element={<Feedback />} />{" "}
        {/* Fallback routing to direct back home if path does not exist */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
