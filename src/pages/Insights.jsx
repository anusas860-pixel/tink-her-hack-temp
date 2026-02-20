import { useState, useEffect } from 'react'
import BottomNav from '../components/BottomNav'

function daysBetween(d1, d2) {
    if (!d1 || !d2) return null
    return Math.round((new Date(d2) - new Date(d1)) / 86400000)
}

export default function Insights() {
    const [logs, setLogs] = useState([])
    const profile = JSON.parse(localStorage.getItem('bloomher_profile') || '{}')

    useEffect(() => {
        setLogs(JSON.parse(localStorage.getItem('bloomher_logs') || '[]'))
    }, [])

    const cycleLengths = []
    for (let i = 0; i < logs.length - 1; i++) {
        const gap = daysBetween(logs[i + 1].startDate, logs[i].startDate)
        if (gap && gap > 0) cycleLengths.push({ month: logs[i].startDate?.slice(0, 7), days: gap })
    }

    const avgCycle = cycleLengths.length
        ? Math.round(cycleLengths.reduce((s, c) => s + c.days, 0) / cycleLengths.length)
        : null

    const avgPain = logs.length
        ? (logs.reduce((s, l) => s + (l.pain || 0), 0) / logs.length).toFixed(1)
        : null

    const maxBar = Math.max(...cycleLengths.map(c => c.days), 35)

    const irregularities = cycleLengths.filter(c => c.days < 21 || c.days > 35)

    const moodCounts = ['😁 Great', '🙂 Good', '😐 Okay', '😕 Low', '😢 Sad', '😡 Irritable'].map(m => ({
        label: m,
        count: logs.filter(l => l.mood === m).length,
    })).filter(m => m.count > 0)

    return (
        <div className="page page-gradient-teal">
            <div className="page-header">
                <h1>📊 Insights & Analytics</h1>
                <p>Your cycle patterns at a glance</p>
            </div>

            <div className="container">

                {/* Summary Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1.25rem' }}>
                    <div className="card card-pink anim-slide-up" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--pink-deep)' }}>
                            {avgCycle ?? '—'}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Avg Cycle (days)</div>
                    </div>
                    <div className="card card-teal anim-slide-up" style={{ textAlign: 'center', animationDelay: '0.05s' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0d9488' }}>
                            {avgPain ?? '—'}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Avg Pain Level</div>
                    </div>
                    <div className="card card-lavender anim-slide-up" style={{ textAlign: 'center', animationDelay: '0.1s' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--lavender)' }}>
                            {logs.length}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Cycles Logged</div>
                    </div>
                    <div className="card card-peach anim-slide-up" style={{ textAlign: 'center', animationDelay: '0.15s' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--peach)' }}>
                            {irregularities.length}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Irregularities</div>
                    </div>
                </div>

                {/* Cycle Trend Chart */}
                {cycleLengths.length > 0 ? (
                    <div className="card anim-slide-up" style={{ marginBottom: '1.25rem', animationDelay: '0.2s' }}>
                        <div className="section-title">📈 Cycle Length Trend</div>
                        <div className="cycle-bar-wrap">
                            {cycleLengths.slice(0, 6).map((c, i) => (
                                <div key={i} className="cycle-bar-row">
                                    <div className="cycle-bar-label">{c.month || `Cycle ${i + 1}`}</div>
                                    <div className="cycle-bar-track">
                                        <div className="cycle-bar-fill" style={{ width: `${(c.days / maxBar) * 100}%` }} />
                                    </div>
                                    <div className="cycle-bar-val">{c.days}d</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.6rem', fontSize: '0.78rem', alignItems: 'center' }}>
                            <div style={{ width: 12, height: 12, background: 'linear-gradient(90deg,var(--pink-deep),var(--lavender))', borderRadius: 3 }} />
                            <span style={{ color: 'var(--text-muted)' }}>Normal: 21–35 days</span>
                        </div>
                    </div>
                ) : null}

                {/* Pain Trend */}
                {logs.length > 0 && (
                    <div className="card anim-slide-up" style={{ marginBottom: '1.25rem', animationDelay: '0.25s' }}>
                        <div className="section-title">😣 Pain Level History</div>
                        <div className="cycle-bar-wrap">
                            {logs.slice(0, 6).map((l, i) => (
                                <div key={i} className="cycle-bar-row">
                                    <div className="cycle-bar-label">{l.startDate?.slice(5) || `Log ${i + 1}`}</div>
                                    <div className="cycle-bar-track">
                                        <div className="cycle-bar-fill"
                                            style={{
                                                width: `${(l.pain / 10) * 100}%`,
                                                background: l.pain >= 7
                                                    ? 'linear-gradient(90deg, #f43f5e, #fb923c)'
                                                    : 'linear-gradient(90deg, var(--teal), #06b6d4)',
                                            }} />
                                    </div>
                                    <div className="cycle-bar-val">{l.pain}/10</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Mood Summary */}
                {moodCounts.length > 0 && (
                    <div className="card anim-slide-up" style={{ marginBottom: '1.25rem', animationDelay: '0.3s' }}>
                        <div className="section-title">😊 Mood Summary</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {moodCounts.map(m => (
                                <div key={m.label} style={{
                                    background: 'var(--lavender-light)', borderRadius: 12,
                                    padding: '0.5rem 0.85rem', fontSize: '0.88rem', fontWeight: 600,
                                }}>
                                    {m.label} &nbsp;<span style={{ color: 'var(--pink-deep)' }}>×{m.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Irregularity Alerts */}
                {irregularities.length > 0 && (
                    <div className="card anim-slide-up" style={{ marginBottom: '1.25rem', animationDelay: '0.35s' }}>
                        <div className="section-title">⚠️ Irregularity Alerts</div>
                        {irregularities.map((c, i) => (
                            <div key={i} className={`alert ${c.days > 35 ? 'alert-warning' : 'alert-danger'}`}>
                                {c.month}: {c.days < 21
                                    ? `Short cycle (${c.days} days) — may indicate hormonal imbalance`
                                    : `Long cycle (${c.days} days) — may indicate irregularity or PCOS`}
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {logs.length === 0 && (
                    <div className="card anim-slide-up" style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: '3rem' }}>📊</span>
                        <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                            No data yet! Log your cycles on the Dashboard to see trends here.
                        </p>
                    </div>
                )}

                {/* Profile target */}
                {profile.cycleAvg && (
                    <div className="alert alert-info anim-slide-up" style={{ animationDelay: '0.4s' }}>
                        Your target cycle average: <strong>{profile.cycleAvg} days</strong>
                        {avgCycle && Math.abs(avgCycle - profile.cycleAvg) > 5 &&
                            ` (actual avg: ${avgCycle} days — ${Math.abs(avgCycle - profile.cycleAvg)} day deviation)`}
                    </div>
                )}
            </div>

            <BottomNav />
        </div>
    )
}
