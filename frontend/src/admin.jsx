import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/index.css'
import AdminDashboard from './components/AdminDashboard.jsx'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <AdminDashboard />
        </AuthProvider>
    </StrictMode>,
)
