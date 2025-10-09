import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import GooeyNav from './components/GooeyNav';
import Home from './sections/Home';
import { useTheme } from './context/ThemeContext.jsx';
import SharedProfileCard from './components/SharedProfileCard';
import { FaUser, FaTools, FaFolderOpen, FaGraduationCap } from 'react-icons/fa';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './layouts/Footer';
import FloatingCoffeeButton from './components/FloatingCoffeeButton';
import SmoothCursor from './components/SmoothCursor';

function App() {
  const { theme } = useTheme();
  return (
    <Router>
      <div className="relative flex flex-col min-h-screen bg-primary-dark">
        <SmoothCursor />
        <div className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-4">
          <GooeyNav
            items={[
              { label: 'About', href: '#about', icon: <FaUser /> },
              { label: 'Skills', href: '#skills', icon: <FaTools /> },
              { label: 'Projects', href: '#projects', icon: <FaFolderOpen /> },
              { label: 'Education', href: '#education', icon: <FaGraduationCap /> },
            ]}
          />
        </div>
        <SharedProfileCard />
        <main className="relative z-10 flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <About />
                  <Skills />
                  <Projects />
                  <Education />
                  <Contact />
                </>
              }
            />
            
          </Routes>
        </main>
        <FloatingCoffeeButton />
        <Footer />
      </div>
    </Router>
  );
 }

export default App;
