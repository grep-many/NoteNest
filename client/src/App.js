import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import DarkModeState from './context/darkMode/DarkModeState';
import Alert from './components/Alert';
import AlertState from './context/alert/AlertState';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {

  return (
    <NoteState>
      <DarkModeState>
        <AlertState>
          <Router basename='\NoteNest'>
            <Navbar />
            <div className='mx-1 my-2 sticky-top' style={{ height: '50px', top: '70px' }}>
              <Alert />
            </div>
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </div>
          </Router>
        </AlertState>
      </DarkModeState>
    </NoteState>
  );
}

export default App;
