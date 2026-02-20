import { useState } from 'react'
import BottomNav from '../components/BottomNav'

const QUOTES = [
    { text: "You are doing better than you think. Keep blooming. 🌸", author: "BloomHer" },
    { text: "Every cycle is a reminder of your incredible strength. 💪", author: "BloomHer" },
    { text: "Your body is not a problem to be fixed. It's a story to be understood.", author: "Unknown" },
    { text: "Rest if you must, but don't you quit. You're stronger than your symptoms. 🌷", author: "BloomHer" },
    { text: "Self-care isn't selfish — it's essential. Take care of you today.", author: "BloomHer" },
    { text: "You are worthy of care, love, and health — every single day. 💖", author: "BloomHer" },
    { text: "A bad day with your health is not a bad life. Keep going. ✨", author: "BloomHer" },
    { text: "Women are the backbone of humanity. Never forget your power. 🌺", author: "BloomHer" },
    { text: "Healing is not linear. Be gentle with yourself on the hard days.", author: "Unknown" },
    { text: "Your period is not a weakness. It's a superpower in disguise. 💫", author: "BloomHer" },
    { text: "Small steps still move you forward. You're making progress! 🌱", author: "BloomHer" },
    { text: "Your feelings are valid. Your pain is real. You deserve support. 💜", author: "BloomHer" },
    { text: "Today, choose yourself. Your wellness is your priority. 🌷", author: "BloomHer" },
    { text: "You have survived every hard day so far. That's a 100% success rate. 🎉", author: "Unknown" },
    { text: "Breathe. You are loved. You are enough. You are blooming. 🌸", author: "BloomHer" },
    { text: "Be patient with your body. It's working hard for you every single day.", author: "BloomHer" },
    { text: "It's okay to not be okay. Tomorrow is a new bloom. 🌺", author: "BloomHer" },
    { text: "Nourish yourself like you matter — because you absolutely do. 💝", author: "BloomHer" },
    { text: "Your worth is not measured by your productivity. Rest is sacred.", author: "Unknown" },
    { text: "Every woman who overcomes pain is a hero in her own story. 🦋", author: "BloomHer" },
    { text: "Start today with kindness to your body. It will thank you tomorrow. 💖", author: "BloomHer" },
    { text: "You are a garden — give yourself sunlight, water, and time. 🌻", author: "BloomHer" },
    { text: "Courage isn't feeling fearless. It's tracking your health even on tough days. 💪", author: "BloomHer" },
    { text: "One day at a time, one breath at a time — you've got this. 🌷", author: "BloomHer" },
    { text: "The most beautiful thing you can be is healthy and happy. Aim for both. ✨", author: "BloomHer" },
    { text: "You are not your diagnosis. You are the strength that rises above it. 🌸", author: "BloomHer" },
    { text: "Your hormones don't define you — your heart and resilience do. 💜", author: "BloomHer" },
    { text: "Take up space. Your health journey matters and so do you. 🌺", author: "BloomHer" },
    { text: "Every sunrise is a chance to bloom a little more. Rise, queen. 👑", author: "BloomHer" },
    { text: "Be soft. Be strong. Be you exactly as you are today. 💖", author: "BloomHer" },
]

const BACKGROUNDS = [
    'linear-gradient(135deg, #ff9ac1, #c4a1ff)',
    'linear-gradient(135deg, #5eead4, #a78bfa)',
    'linear-gradient(135deg, #fb923c, #f472b6)',
    'linear-gradient(135deg, #c4a1ff, #99f6e4)',
    'linear-gradient(135deg, #f472b6, #fb923c)',
    'linear-gradient(135deg, #a78bfa, #5eead4)',
    'linear-gradient(135deg, #fcd34d, #f472b6)',
]

export default function DailyQuotes() {
    const [idx, setIdx] = useState(() => Math.floor(Math.random() * QUOTES.length))
    const [bgIdx, setBgIdx] = useState(0)
    const [animKey, setAnimKey] = useState(0)
    const [liked, setLiked] = useState(false)

    const quote = QUOTES[idx]

    const newQuote = () => {
        let next
        do { next = Math.floor(Math.random() * QUOTES.length) } while (next === idx)
        setIdx(next)
        setBgIdx(b => (b + 1) % BACKGROUNDS.length)
        setAnimKey(k => k + 1)
        setLiked(false)
    }

    const today = new Date().toLocaleDateString('en-IN', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })

    return (
        <div className="page" style={{ background: 'linear-gradient(160deg, #fce7f3 0%, #ede9fe 50%, #ccfbf1 100%)' }}>
            <div className="page-header" style={{ textAlign: 'center' }}>
                <h1>💖 Daily Quotes</h1>
                <p>Start your day with love and positivity</p>
            </div>

            <div className="container">
                {/* Date */}
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <span className="badge badge-lavender" style={{ fontSize: '0.82rem' }}>📅 {today}</span>
                </div>

                {/* Main Quote Card */}
                <div key={animKey} className="anim-slide-up" style={{ marginBottom: '1.25rem' }}>
                    <div style={{
                        background: BACKGROUNDS[bgIdx],
                        borderRadius: 24,
                        padding: '2.5rem 2rem',
                        textAlign: 'center',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        {/* Decorative circles */}
                        <div style={{
                            position: 'absolute', top: -30, right: -30,
                            width: 100, height: 100,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.15)',
                        }} />
                        <div style={{
                            position: 'absolute', bottom: -20, left: -20,
                            width: 80, height: 80,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.12)',
                        }} />

                        <div style={{ fontSize: '3rem', marginBottom: '1rem', position: 'relative' }}>💬</div>

                        <p style={{
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            color: '#fff',
                            lineHeight: 1.65,
                            fontStyle: 'italic',
                            textShadow: '0 1px 8px rgba(0,0,0,0.12)',
                            position: 'relative',
                        }}>
                            "{quote.text}"
                        </p>

                        <p style={{
                            marginTop: '1.25rem',
                            color: 'rgba(255,255,255,0.82)',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            position: 'relative',
                        }}>— {quote.author}</p>
                    </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '0.85rem', marginBottom: '1.5rem' }}>
                    <button
                        className="btn btn-full btn-lg"
                        style={{
                            background: liked ? '#fce7f3' : 'rgba(255,255,255,0.9)',
                            color: liked ? 'var(--pink-deep)' : 'var(--text-dark)',
                            border: '2px solid var(--border)',
                            fontSize: '1.1rem',
                            transition: 'all 0.2s',
                        }}
                        onClick={() => setLiked(l => !l)}
                    >
                        {liked ? '❤️ Loved!' : '🤍 Love it'}
                    </button>
                    <button className="btn btn-primary btn-full btn-lg" onClick={newQuote}>
                        ✨ New Quote
                    </button>
                </div>

                {/* Quote count */}
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
                    Quote {idx + 1} of {QUOTES.length} · Tap "New Quote" to discover more 🌸
                </p>

                {/* All quotes preview */}
                <div className="card anim-slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="section-title">🌟 More to Inspire You</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                        {QUOTES.filter((_, i) => i !== idx).slice(0, 4).map((q, i) => (
                            <div key={i}
                                onClick={() => { setIdx(QUOTES.indexOf(q)); setAnimKey(k => k + 1); setLiked(false) }}
                                style={{
                                    padding: '0.75rem',
                                    background: 'rgba(255,255,255,0.6)',
                                    borderRadius: 12,
                                    cursor: 'pointer',
                                    fontSize: '0.87rem',
                                    color: 'var(--text-dark)',
                                    fontStyle: 'italic',
                                    fontWeight: 500,
                                    border: '1px solid var(--border)',
                                    transition: 'background 0.2s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = 'var(--pink-light)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.6)'}
                            >
                                "{q.text.slice(0, 70)}{q.text.length > 70 ? '…' : ''}"
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <BottomNav />
        </div>
    )
}
