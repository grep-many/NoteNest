import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import MainPage from '@/pages/MainPage'
import { Toaster } from './components/ui/toaster'
import ServerCheck from './components/server/ServerCheck'
import ServerBad from './components/server/ServerBad'
import { usePage } from './context/PageProvider'

function App() {

    const { serverStatus } = usePage();

    if (serverStatus === null) {
        return <ServerCheck />
    } else if (serverStatus === false) {
        return <ServerBad />
    } else {
        return (
            <>
                <Toaster />
                <Routes>
                    <Route
                        path='/'
                        element={<MainPage />}
                    />
                    <Route
                        path='*'
                        element={<Navigate to={'/'} />}
                    />
                </Routes>
            </>
        )
    }
}

export default App
