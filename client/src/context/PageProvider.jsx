import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useTheme } from "./ThemeProvider";
import { useToast } from "@/hooks/use-toast";
import { checkServerHealthService } from "@/services/authService";


const PagesContext = createContext(null);

export default function PageProvider({ children }) {

    const user = {
        name: '',
        email: ''
    }
    const { toast } = useToast();
    const { theme } = useTheme();
    const [loadTheme, setLoadTheme] = useState(theme !== 'system' ? theme : (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"))
    const [searchText, setSearchText] = useState('');
    const [progress, setProgress] = useState(0);
    const [serverStatus, setServerStatus] = useState(null);
    const [auth, setAuth] = useState({
        authenticate: false,
        user: user,
    });

    const location = useLocation();

    const handleLogout = () => {
        localStorage.clear();
        setAuth({
            authenticate: false,
            user: null,
        });
        toast({
            // variant:,
            title: "Logged Out!"
        })
    }

    const checkServerStatus = async () => {
        const response = await checkServerHealthService();
        if(response){
            setServerStatus(true);
        }else{
            setServerStatus(false);
        }
    }

    useEffect(() => {
        setProgress(100); // Initial progress indicator

        const timer = setTimeout(() => {
            setProgress(0);
        }, 500);

        return () => clearTimeout(timer); // Cleanup on component unmount
    }, [location]);

    useEffect(() => {
        setLoadTheme(theme !== 'system' ? theme : (window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"))
    }, [theme]);

    useEffect(() => {
        (async ()=> await checkServerStatus())();
        const userEmail = localStorage.getItem('email')
        const userName = localStorage.getItem('name')
        if (localStorage.length > 1 && localStorage.getItem("token")) {
            setAuth({
                authenticate: true,
                user: {
                    name: userName,
                    email: userEmail,
                }
            });
        } else {
            handleLogout();
        }
    }, [])

    return (
        <PagesContext.Provider value={{
            auth,
            setAuth,
            location,
            loadTheme,
            setProgress,
            handleLogout,
            toast,
            searchText,
            setSearchText,
            checkServerStatus,
            serverStatus,
        }} >
            <LoadingBar color={loadTheme === 'dark' ? '#fff' : '#000'} progress={progress} />
            {children}
        </PagesContext.Provider>
    )
}

export const usePage = () => {
    const context = useContext(PagesContext);
    if (context === undefined) {
        throw new Error("usePage must be use within PageProvider");
    }
    return context;
}