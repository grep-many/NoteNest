import React, { useState } from "react";
import AlertContext from "./alertContext";

const AlertState = (props) => {
    
    const [alert, setAlert] = useState(null);

    const showAlert = (title, para, danger=false) => {
        setAlert({
            title,
            para,
            danger,
        });
    };

    return (
        <AlertContext.Provider value={{ alert, showAlert ,setAlert}}>
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
