import { NavLink } from 'react-router-dom'

const navItems = [
    { to: '/dashboard', icon: '🏠', label: 'Home' },
    { to: '/insights', icon: '📊', label: 'Insights' },
    { to: '/tips', icon: '💡', label: 'Tips' },
    { to: '/reminders', icon: '⏰', label: 'Remind' },
    { to: '/quotes', icon: '💖', label: 'Quotes' },
]

export default function BottomNav() {
    return (
        <nav className="bottom-nav">
            {navItems.map(({ to, icon, label }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                >
                    <span style={{ fontSize: '1.25rem' }}>{icon}</span>
                    {label}
                </NavLink>
            ))}
        </nav>
    )
}
