import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import PageProvider from '@/context/PageProvider'
import { ThemeProvider } from './context/ThemeProvider'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter
            basename='/NoteNest/'
            future={{
                v7_relativeSplatPath: true,
                v7_startTransition: true,
            }}
        >
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <PageProvider>
                    <App />
                </PageProvider>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>,
)
