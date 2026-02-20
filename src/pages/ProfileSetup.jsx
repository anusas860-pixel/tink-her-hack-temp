import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HEALTH_GOALS = [
    'Track my cycle',
    'Manage PCOS symptoms',
    'Improve fertility awareness',
    'Monitor menopause',
    'Manage endometriosis',
    'General wellness',
]

export default function ProfileSetup() {
    const nav = useNavigate()
    const [form, setForm] = useState({
        name: '',
        age: '',
        cycleAvg: '28',
        healthGoal: HEALTH_GOALS[0],
    })
    const [errors, setErrors] = useState({})
    const [step, setStep] = useState(1) // 1 = name/age, 2 = cycle/goal

    const setField = (k, v) => setForm(f => ({ ...f, [k]: v }))

    const validateStep1 = () => {
        const e = {}
        if (!form.name.trim()) e.name = 'Please enter your name'
        if (!form.age || form.age < 10 || form.age > 60) e.age = 'Please enter a valid age (10–60)'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const submit = () => {
        const e = {}
        if (!form.cycleAvg || form.cycleAvg < 15 || form.cycleAvg > 60) {
            e.cycleAvg = 'Average cycle length should be 15–60 days'
        }
        setErrors(e)
        if (Object.keys(e).length > 0) return

        localStorage.setItem('bloomher_profile', JSON.stringify({
            ...form,
            createdAt: new Date().toISOString(),
        }))
        nav('/dashboard')
    }

    return (
        <div className="page page-gradient-lavender">
            <div className="container" style={{ paddingTop: '3.5rem' }}>

                {/* Header */}
                <div className="anim-slide-up" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <span style={{ fontSize: '2.5rem' }}>👤</span>
                    <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginTop: '0.5rem' }}>
                        {step === 1 ? 'Hello, bloom! 🌸' : 'Your Cycle Info 🩸'}
                    </h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                        {step === 1 ? "Let's get to know you" : 'Help us personalise your experience'}
                    </p>
                </div>

                {/* Progress dots */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginBottom: '1.75rem' }}>
                    {[1, 2].map(s => (
                        <div key={s} style={{
                            width: s === step ? 28 : 10,
                            height: 10,
                            borderRadius: 50,
                            background: s === step ? 'var(--pink-deep)' : 'var(--border)',
                            transition: 'all 0.3s',
                        }} />
                    ))}
                </div>

                <div className="card anim-slide-up" style={{ animationDelay: '0.1s' }}>
                    {step === 1 ? (
                        <>
                            <div className="form-group">
                                <label className="form-label">Your Name 💝</label>
                                <input
                                    className="form-input"
                                    placeholder="e.g. Priya"
                                    value={form.name}
                                    onChange={e => setField('name', e.target.value)}
                                />
                                {errors.name && <span style={{ color: 'var(--rose)', fontSize: '0.8rem' }}>{errors.name}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Your Age</label>
                                <input
                                    className="form-input"
                                    type="number"
                                    placeholder="e.g. 24"
                                    min="10" max="60"
                                    value={form.age}
                                    onChange={e => setField('age', e.target.value)}
                                />
                                {errors.age && <span style={{ color: 'var(--rose)', fontSize: '0.8rem' }}>{errors.age}</span>}
                            </div>

                            <button
                                className="btn btn-primary btn-full btn-lg"
                                style={{ marginTop: '0.5rem' }}
                                onClick={() => { if (validateStep1()) setStep(2) }}
                            >
                                Continue →
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="form-group">
                                <label className="form-label">Average Cycle Length (days)</label>
                                <input
                                    className="form-input"
                                    type="number"
                                    min="15" max="60"
                                    value={form.cycleAvg}
                                    onChange={e => setField('cycleAvg', e.target.value)}
                                />
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    Typical range: 21–35 days. Average is 28.
                                </span>
                                {errors.cycleAvg && <span style={{ color: 'var(--rose)', fontSize: '0.8rem' }}>{errors.cycleAvg}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Health Goal 🎯</label>
                                <select
                                    className="form-select"
                                    value={form.healthGoal}
                                    onChange={e => setField('healthGoal', e.target.value)}
                                >
                                    {HEALTH_GOALS.map(g => <option key={g}>{g}</option>)}
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                                <button
                                    className="btn btn-ghost btn-full"
                                    onClick={() => setStep(1)}
                                >← Back</button>
                                <button
                                    className="btn btn-primary btn-full"
                                    onClick={submit}
                                >
                                    🌸 Let's Bloom!
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Privacy note */}
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '1.5rem' }}>
                    🔐 Your data is stored privately on your device only
                </p>
            </div>
        </div>
    )
}
