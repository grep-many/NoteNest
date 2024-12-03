import React, { useContext } from 'react';
import darkModeContext from '../context/darkMode/darkModeContext';

const Footer = () => {
    const { isDarkMode } = useContext(darkModeContext);
    return (
        <footer className={`${isDarkMode ? 'bg-black text-white border-white' : 'bg-white text-dark border-dark'} border-top text-center p-1`}>
            <p className='m-0'>&copy; 2024 Notes App. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
