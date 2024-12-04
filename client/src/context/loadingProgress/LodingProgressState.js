import { useState } from "react"
import loadingProgressContext from "./loadingProgressContext";

const LoadingProgressState=({children})=>{

    const [progress,setProgress] = useState(0);

    return (
        <loadingProgressContext.Provider value={{progress,setProgress}}>
            {children}
        </loadingProgressContext.Provider>
    )

}

export default LoadingProgressState;