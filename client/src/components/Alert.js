import React, { useContext, useEffect } from 'react';
import alertContext from '../context/alert/alertContext';
import darkModeContext from '../context/darkMode/darkModeContext';

export default function Alert() {

    const {alert,setAlert} = useContext(alertContext);
    const {isDarkMode} = useContext(darkModeContext);
    const mode = isDarkMode ? 'black' : 'white';

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                // Use setAlert to hide the alert after 3 seconds
                setAlert(null); // Dismiss the alert after 3 seconds
            }, 1500);

            // Cleanup timer if the alert is dismissed or component unmounts
            return () => clearTimeout(timer);
        }
    }, [alert, setAlert]); // Ensure setAlert is part of the dependencies

    if (!alert) return null; // Don't render the alert if it's null

    return (
        <div className={`sticky-top alert bg-${mode} ${alert.danger ? 'alert-danger' : ''} alert-dismissible fade show container `+(isDarkMode?'border border-white':'border border-dark')} role="alert">
            <strong>{alert.title}</strong> {alert.para}
            <button
                type="button"
                className={"btn-close "+(isDarkMode?'dark':'')}
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setAlert(null)} // Allow manual close via button
            ></button>
        </div>
    );
}