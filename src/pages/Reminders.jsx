import { useState, useEffect } from 'react'
import BottomNav from '../components/BottomNav'

const DEFAULT_REMINDERS = [
    {
        id: 'period',
        icon: '🩸',
        title: 'Period Reminder',
        desc: 'Get notified before your next period',
        enabled: false,
        date: '',
        note: '',
        color: 'card-pink',
    },
    {
        id: 'medication',
        icon: '💊',
        title: 'Medication Alert',
        desc: 'Set reminders for your daily medication',
        enabled: false,
        date: '',
        note: '',
        time: '08:00',
        color: 'card-teal',
    },
    {
        id: 'doctor',
        icon: '🩺',
        title: 'Doctor Visit',
        desc: 'Schedule your next gynaecologist visit',
        enabled: false,
        date: '',
        note: '',
        color: 'card-lavender',
    },
]

export default function Reminders() {
    const [reminders, setReminders] = useState(DEFAULT_REMINDERS)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        const stored = localStorage.getItem('bloomher_reminders')
        if (stored) setReminders(JSON.parse(stored))
    }, [])

    const update = (id, key, value) => {
        setReminders(r => r.map(item => item.id === id ? { ...item, [key]: value } : item))
    }

    const saveAll = () => {
        localStorage.setItem('bloomher_reminders', JSON.stringify(reminders))
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
    }

    const activeCount = reminders.filter(r => r.enabled).length

    return (
        <div className="page page-gradient-lavender">
            <div className="page-header">
                <h1>⏰ Reminders</h1>
                <p>Stay on top of your health schedule</p>
            </div>

            <div className="container">
                {/* Active count badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <span className={`badge ${activeCount > 0 ? 'badge-teal' : 'badge-lavender'}`}>
                        {activeCount > 0 ? `✅ ${activeCount} active` : '💤 No active reminders'}
                    </span>
                </div>

                {saved && (
                    <div className="alert alert-success anim-fade">✅ Reminders saved!</div>
                )}

                {reminders.map((r, i) => (
                    <div key={r.id} className={`card ${r.color} anim-slide-up`}
                        style={{ marginBottom: '1.1rem', animationDelay: `${i * 0.1}s` }}>

                        {/* Header */}
                        <div className="toggle-wrap" style={{ marginBottom: r.enabled ? '1rem' : 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ fontSize: '1.75rem' }}>{r.icon}</span>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>{r.title}</div>
                                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{r.desc}</div>
                                </div>
                            </div>
                            <label className="toggle">
                                <input type="checkbox" checked={r.enabled}
                                    onChange={e => update(r.id, 'enabled', e.target.checked)} />
                                <span className="toggle-slider" />
                            </label>
                        </div>

                        {/* Expanded form */}
                        {r.enabled && (
                            <div className="anim-fade">
                                <div className="divider" />

                                {r.id === 'period' && (
                                    <div className="form-group">
                                        <label className="form-label">Expected Date</label>
                                        <input className="form-input" type="date" value={r.date}
                                            onChange={e => update(r.id, 'date', e.target.value)} />
                                    </div>
                                )}

                                {r.id === 'medication' && (
                                    <>
                                        <div className="form-group">
                                            <label className="form-label">Medication Name</label>
                                            <input className="form-input" placeholder="e.g. Iron supplements, Folic acid"
                                                value={r.note}
                                                onChange={e => update(r.id, 'note', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Daily Time</label>
                                            <input className="form-input" type="time" value={r.time}
                                                onChange={e => update(r.id, 'time', e.target.value)} />
                                        </div>
                                    </>
                                )}

                                {r.id === 'doctor' && (
                                    <>
                                        <div className="form-group">
                                            <label className="form-label">Appointment Date</label>
                                            <input className="form-input" type="date" value={r.date}
                                                onChange={e => update(r.id, 'date', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Notes / Doctor Name</label>
                                            <input className="form-input" placeholder="e.g. Dr. Priya Sharma – annual check-up"
                                                value={r.note}
                                                onChange={e => update(r.id, 'note', e.target.value)} />
                                        </div>
                                    </>
                                )}

                                {/* Date display */}
                                {r.date && (
                                    <div style={{
                                        background: 'rgba(255,255,255,0.7)', borderRadius: 10,
                                        padding: '0.6rem 0.85rem', fontSize: '0.85rem', color: 'var(--text-dark)',
                                        marginTop: '0.25rem', fontWeight: 500,
                                    }}>
                                        📅 {new Date(r.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                        {r.id === 'period' && (() => {
                                            const days = Math.round((new Date(r.date) - new Date()) / 86400000)
                                            return days > 0 ? ` · in ${days} day${days !== 1 ? 's' : ''}` : days === 0 ? ' · Today!' : ` · ${Math.abs(days)} days ago`
                                        })()}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}

                <button className="btn btn-primary btn-full btn-lg anim-slide-up"
                    style={{ animationDelay: '0.3s' }}
                    onClick={saveAll}>
                    💾 Save All Reminders
                </button>

                <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '1rem' }}>
                    🔔 In-app reminders only. Enable browser notifications for real-time alerts.
                </p>
            </div>

            <BottomNav />
        </div>
    )
}
