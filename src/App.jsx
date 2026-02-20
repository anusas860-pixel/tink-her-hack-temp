import { HashRouter as BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import ProfileSetup from './pages/ProfileSetup'
import Dashboard from './pages/Dashboard'
import Insights from './pages/Insights'
import HealthTips from './pages/HealthTips'
import Reminders from './pages/Reminders'
import DailyQuotes from './pages/DailyQuotes'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/setup" element={<ProfileSetup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/tips" element={<HealthTips />} />
                <Route path="/reminders" element={<Reminders />} />
                <Route path="/quotes" element={<DailyQuotes />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}
