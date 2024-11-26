import { useState } from "react";
import darkModeContext from "./darkModeContext";

const DarkModeState = (props)=>{

    // Retrieve and parse the `darkMode` value from localStorage, default to `false` if not set
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false; // Parse to ensure it's a boolean
    });
    
    return (
        <darkModeContext.Provider value={{isDarkMode,setIsDarkMode}}>
            {props.children}
        </darkModeContext.Provider>
    )
}

export default DarkModeState;