import React, { useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import darkModeContext from '../context/darkMode/darkModeContext';
import alertContext from '../context/alert/alertContext';
import LoadingBar from 'react-top-loading-bar'
import Cookies from 'js-cookie';
import loadingProgressContext from '../context/loadingProgress/loadingProgressContext';

export default function NavbarComponent() {

    const { isDarkMode, setIsDarkMode } = useContext(darkModeContext);
    const { showAlert } = useContext(alertContext);
    const {progress,setProgress} = useContext(loadingProgressContext);
    const location = window.location.pathname; // For active link highlighting
    const closeHamburger = useRef(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('x-auth-token');
        navigate('/');
    }

    useEffect(() => {
        if (isDarkMode) {
            showAlert('Toggled Dark Mode!', 'Enabled dark mode');
        } else {
            showAlert('Toggled Dark Mode!', 'Disabled dark mode');
        }
        document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
    }, [isDarkMode]);

    // Function to toggle dark mode
    const handleDarkModeToggle = () => {
        setIsDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', JSON.stringify(newMode)); // Save as boolean string
            return newMode;
        });
    };

    if (window.innerWidth < 991) { // Check if the device width is less than 991px
        document.querySelectorAll('.nav-item').forEach(element => {
            element.addEventListener('click', () => {
                closeHamburger.current.click();
            });
        });
    }

    return (
        <>
            <nav className={`sticky-top navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-black border-white border-bottom' : 'navbar-light bg-light border border-bottom'}`}>
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        ref={closeHamburger}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand" to="/" onClick={()=>setProgress(100)}>
                        NoteNest
                    </Link>
                    <div className="form-check form-switch ms-3 tablet" title="Toggle dark mode">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="modeSwitch"
                            checked={isDarkMode}
                            onChange={handleDarkModeToggle}
                        />
                    </div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${location.pathname === '/' ? 'active' : ''} text-center`}
                                    aria-current="page"
                                    to="/"
                                    onClick={()=>{setProgress(100)}}
                                >
                                    Home
                                </Link>
                            </li>
                            {Cookies.get('x-auth-token') &&
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${location.pathname === '/you' ? 'active' : ''} text-center`}
                                        aria-current="page"
                                        to="/you"
                                    >
                                        You
                                    </Link>
                                </li>
                            }
                        </ul>
                        <form className="d-flex justify-content-center">
                            <div className="form-check form-switch my-auto desktop" title="Toggle dark mode">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="modeSwitch"
                                    checked={isDarkMode}
                                    onChange={handleDarkModeToggle}
                                />
                            </div>
                            {Cookies.get('x-auth-token') ?
                                <button className={"m-1 btn border-danger " + (isDarkMode ? 'btn-outline-danger' : 'text-black btn-outline-danger') + ' nav-item'} onClick={handleLogout}>Logout</button> :
                                <>
                                    <Link className={"m-1 btn border-" + (isDarkMode ? 'white btn-outline-light' : 'black text-black btn-outline-dark') + ' nav-item'} to='/signup' onClick={()=>setProgress(100)}>Signup</Link>
                                    <Link className={"m-1 btn border-" + (isDarkMode ? 'white btn-outline-light' : 'black text-black btn-outline-dark') + ' nav-item'} to='/login' onClick={()=>setProgress(100)}>Login</Link>
                                </>
                            }
                        </form>
                    </div>
                </div>
            </nav>
            <LoadingBar
                color={isDarkMode ? '#fff' : '#000'}
                progress={progress}
            />
        </>
    );
}
