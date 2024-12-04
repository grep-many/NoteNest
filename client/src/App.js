import './App.css';
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
import LoadingProgressState from './context/loadingProgress/LodingProgressState';
import LoadingBar from 'react-top-loading-bar';
import loadingProgressContext from './context/loadingProgress/loadingProgressContext';

function AppContent() {
  const { setProgress } = useContext(loadingProgressContext);
  const location = useLocation();

  useEffect(() => {
    // Trigger progress bar when route changes
    setProgress(100);

    // Reset progress after a delay
    const timer = setTimeout(() => setProgress(0), 500);

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, [location, setProgress]);

  return (
    <>
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
    </>
  );
}

function App() {
  return (
    <NoteState>
      <DarkModeState>
        <LoadingProgressState>
          <AlertState>
            <Router basename='/NoteNest'>
              <LoadingBar color="#3b82f6" />
              <AppContent />
            </Router>
          </AlertState>
        </LoadingProgressState>
      </DarkModeState>
    </NoteState>
  );
}

export default App;
