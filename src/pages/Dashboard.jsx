import { useState, useEffect } from 'react'
import BottomNav from '../components/BottomNav'

const SYMPTOMS = [
    'Cramps', 'Bloating', 'Headache', 'Fatigue',
    'Mood swings', 'Breast tenderness', 'Acne', 'Back pain',
    'Nausea', 'Insomnia', 'Hot flashes', 'Spotting',
]

const MOODS = ['😁 Great', '🙂 Good', '😐 Okay', '😕 Low', '😢 Sad', '😡 Irritable']
const FLOWS = ['Light', 'Moderate', 'Heavy', 'Spotting', 'None']

function daysBetween(d1, d2) {
    if (!d1 || !d2) return null
    const ms = new Date(d2) - new Date(d1)
    return Math.round(ms / 86400000)
}

export default function Dashboard() {
    const profile = JSON.parse(localStorage.getItem('bloomher_profile') || '{}')

    const [log, setLog] = useState({
        startDate: '', endDate: '', flow: 'Moderate', mood: '🙂 Good', pain: 3,
    })
    const [symptoms, setSymptoms] = useState([])
    const [customSymptom, setCustom] = useState('')
    const [saved, setSaved] = useState(false)
    const [savedLogs, setSavedLogs] = useState([])
    const [alerts, setAlerts] = useState([])

    useEffect(() => {
        const logs = JSON.parse(localStorage.getItem('bloomher_logs') || '[]')
        setSavedLogs(logs)
        computeAlerts(logs, profile.cycleAvg)
    }, [])

    const setField = (k, v) => setLog(l => ({ ...l, [k]: v }))

    const toggleSymptom = (s) => {
        setSymptoms(prev =>
            prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
        )
    }

    const addCustom = () => {
        if (!customSymptom.trim()) return
        if (!SYMPTOMS.includes(customSymptom.trim())) {
            SYMPTOMS.push(customSymptom.trim())
        }
        setSymptoms(prev => [...new Set([...prev, customSymptom.trim()])])
        setCustom('')
    }

    const saveLog = () => {
        if (!log.startDate) return
        const duration = daysBetween(log.startDate, log.endDate)
        const entry = { ...log, symptoms, duration, id: Date.now(), savedAt: new Date().toISOString() }
        const logs = JSON.parse(localStorage.getItem('bloomher_logs') || '[]')
        logs.unshift(entry)
        localStorage.setItem('bloomher_logs', JSON.stringify(logs))
        setSavedLogs(logs)
        computeAlerts(logs, profile.cycleAvg)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
        setLog({ startDate: '', endDate: '', flow: 'Moderate', mood: '🙂 Good', pain: 3 })
        setSymptoms([])
    }

    const computeAlerts = (logs, avgCycle) => {
        const a = []
        if (logs.length >= 2) {
            const gap = daysBetween(logs[1].startDate, logs[0].startDate)
            if (gap > 45) a.push({ type: 'warning', msg: `⚠️ Irregular cycle detected! ${gap} days since last period. Please consult a doctor.` })
            if (gap < 21) a.push({ type: 'danger', msg: `⚠️ Short cycle detected (${gap} days). May indicate hormonal imbalance.` })
        }
        const latest = logs[0]
        if (latest) {
            const hasPCOS = latest.pain >= 8 && latest.symptoms?.includes('Spotting')
            if (hasPCOS) a.push({ type: 'danger', msg: '🔴 High pain + spotting — possible PCOS indicator. Please consult your gynaecologist.' })
            const hasAnemia = latest.symptoms?.includes('Fatigue') && latest.symptoms?.includes('Hot flashes')
            if (hasAnemia) a.push({ type: 'warning', msg: '🟠 Fatigue + hot flashes noted — possible anaemia. Increase iron-rich foods and seek medical advice.' })
        }
        setAlerts(a)
    }

    const greet = () => {
        const h = new Date().getHours()
        if (h < 12) return 'Good morning'
        if (h < 17) return 'Good afternoon'
        return 'Good evening'
    }

    return (
        <div className="page page-gradient-pink">
            {/* Header */}
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '2.2rem' }}>🌸</span>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                            {greet()}{profile.name ? `, ${profile.name}` : ''}! 💖
                        </h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                            {profile.healthGoal || 'Your wellness journey starts here'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container">

                {/* ======= EARLY WARNING ALERTS ======= */}
                {alerts.length > 0 && (
                    <div className="anim-slide-up" style={{ marginBottom: '1.25rem' }}>
                        <div className="section-title">🚨 Early Warning Alerts</div>
                        {alerts.map((a, i) => (
                            <div key={i} className={`alert alert-${a.type}`}>{a.msg}</div>
                        ))}
                    </div>
                )}

                {saved && (
                    <div className="alert alert-success anim-fade">✅ Cycle log saved successfully!</div>
                )}

                {/* ======= CYCLE LOGGING ======= */}
                <div className="card card-pink anim-slide-up" style={{ marginBottom: '1.25rem', animationDelay: '0.05s' }}>
                    <div className="section-title">🩸 Cycle Logging</div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Start Date</label>
                            <input className="form-input" type="date" value={log.startDate}
                                onChange={e => setField('startDate', e.target.value)} />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">End Date</label>
                            <input className="form-input" type="date" value={log.endDate}
                                onChange={e => setField('endDate', e.target.value)} />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '0.9rem' }}>
                        <label className="form-label">Flow Level</label>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {FLOWS.map(f => (
                                <button key={f}
                                    className={`btn btn-sm ${log.flow === f ? 'btn-primary' : 'btn-ghost'}`}
                                    onClick={() => setField('flow', f)}
                                >{f}</button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Mood Today</label>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {MOODS.map(m => (
                                <button key={m}
                                    className={`btn btn-sm ${log.mood === m ? 'btn-lavender' : 'btn-ghost'}`}
                                    onClick={() => setField('mood', m)}
                                >{m}</button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Pain Level: <strong style={{ color: 'var(--pink-deep)' }}>{log.pain}/10</strong></label>
                        <input className="form-range" type="range" min="0" max="10" value={log.pain}
                            onChange={e => setField('pain', +e.target.value)} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            <span>No pain 😊</span><span>Severe 😖</span>
                        </div>
                    </div>

                    <button className="btn btn-primary btn-full" onClick={saveLog}>
                        💾 Save Cycle Log
                    </button>
                </div>

                {/* ======= SYMPTOM TRACKER ======= */}
                <div className="card card-lavender anim-slide-up" style={{ marginBottom: '1.25rem', animationDelay: '0.12s' }}>
                    <div className="section-title">🌡 Symptom Tracker</div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.1rem', marginBottom: '1rem' }}>
                        {SYMPTOMS.map(s => (
                            <label key={s} className="checkbox-item">
                                <input type="checkbox" checked={symptoms.includes(s)}
                                    onChange={() => toggleSymptom(s)} />
                                {s}
                            </label>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                        <input className="form-input" placeholder="Add custom symptom..."
                            value={customSymptom}
                            onChange={e => setCustom(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && addCustom()}
                        />
                        <button className="btn btn-teal btn-sm" onClick={addCustom}>+ Add</button>
                    </div>

                    {symptoms.length > 0 && (
                        <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {symptoms.map(s => (
                                <span key={s} className="badge badge-lavender">✓ {s}</span>
                            ))}
                        </div>
                    )}
                </div>

                {/* ======= PAST LOGS ======= */}
                {savedLogs.length > 0 && (
                    <div className="card anim-slide-up" style={{ animationDelay: '0.2s', marginBottom: '1.25rem' }}>
                        <div className="section-title">📋 Recent Logs</div>
                        {savedLogs.slice(0, 3).map((l, i) => (
                            <div key={l.id || i} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '0.65rem 0',
                                borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                                fontSize: '0.88rem',
                            }}>
                                <div>
                                    <div style={{ fontWeight: 600 }}>{l.startDate} → {l.endDate || '?'}</div>
                                    <div style={{ color: 'var(--text-muted)' }}>{l.mood} · {l.flow} flow · Pain: {l.pain}/10</div>
                                </div>
                                {l.duration && <span className="badge badge-pink">{l.duration}d</span>}
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {alerts.length === 0 && savedLogs.length === 0 && (
                    <div className="card anim-slide-up" style={{ textAlign: 'center', marginBottom: '1.25rem', animationDelay: '0.2s' }}>
                        <span style={{ fontSize: '2.5rem' }}>🌸</span>
                        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                            Start by logging your first cycle above!
                        </p>
                    </div>
                )}
            </div>

            <BottomNav />
        </div>
    )
}
