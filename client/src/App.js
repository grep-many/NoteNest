import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import DarkModeState from './context/darkMode/DarkModeState';
import Alert from './components/Alert';
import AlertState from './context/alert/AlertState';
import Login from './components/Login';
import Signup from './components/Signup';
import You from './components/You';
import Footer from './components/Footer';

function App() {

  return (
    <NoteState>
      <DarkModeState>
        <AlertState>
          <Router basename='/NoteNest'>
            <Navbar />
            <div className='mx-1 my-2 sticky-top' style={{ height: '50px', top: '70px' }}>
              <Alert />
            </div>
            <div className="d-flex flex-column" style={{ minHeight: '90vh' }}>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/you" element={<You />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="*" element={<Home />} />
              </Routes>
            </div>
            <Footer />
          </Router>
        </AlertState>
      </DarkModeState>
    </NoteState>
  );
}

export default App;
