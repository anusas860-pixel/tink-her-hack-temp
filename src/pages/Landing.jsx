import { useNavigate } from 'react-router-dom'

export default function Landing() {
    const nav = useNavigate()

    return (
        <div className="page" style={{ background: 'linear-gradient(150deg, #ff9ac1 0%, #c4a1ff 45%, #5eead4 100%)', minHeight: '100vh' }}>
            {/* Floating petals decoration */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                {['🌸', '🌷', '💮', '🌺', '🌸', '💐'].map((p, i) => (
                    <span key={i} style={{
                        position: 'absolute',
                        fontSize: `${1.2 + i * 0.4}rem`,
                        left: `${8 + i * 15}%`,
                        top: `${5 + (i % 3) * 10}%`,
                        opacity: 0.35,
                        animation: `float ${2.5 + i * 0.5}s ease-in-out infinite`,
                        animationDelay: `${i * 0.4}s`,
                    }}>{p}</span>
                ))}
            </div>

            <div className="container" style={{ paddingTop: '4rem', position: 'relative' }}>
                {/* Logo / Brand */}
                <div className="anim-slide-up" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: 96, height: 96,
                        background: 'rgba(255,255,255,0.3)',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.25rem',
                        fontSize: '3rem',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                        backdropFilter: 'blur(8px)',
                        border: '2px solid rgba(255,255,255,0.5)',
                        animation: 'float 3s ease-in-out infinite',
                    }}>🌸</div>

                    <h1 style={{
                        fontSize: '3.2rem', fontWeight: 800,
                        color: '#fff',
                        textShadow: '0 2px 16px rgba(0,0,0,0.18)',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1,
                    }}>
                        Bloom<span style={{ color: '#fce7f3' }}>Her</span>
                    </h1>
                    <p style={{
                        fontSize: '1.1rem', fontWeight: 500,
                        color: 'rgba(255,255,255,0.9)',
                        marginTop: '0.6rem',
                        letterSpacing: '0.01em',
                    }}>Your cycle, your story, your bloom 🌺</p>
                </div>

                {/* Privacy Badge */}
                <div className="anim-slide-up" style={{ animationDelay: '0.15s', marginBottom: '2rem' }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.25)',
                        backdropFilter: 'blur(12px)',
                        border: '1.5px solid rgba(255,255,255,0.45)',
                        borderRadius: 50,
                        padding: '0.7rem 1.4rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '0.92rem',
                    }}>
                        🔐 Your data stays private &amp; encrypted
                    </div>
                </div>

                {/* Feature chips */}
                <div className="anim-slide-up" style={{ animationDelay: '0.25s', display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
                    {['🩸 Cycle Tracking', '🌡 Symptom Log', '📊 Insights', '💡 Health Tips', '⏰ Reminders', '💖 Daily Quotes'].map(f => (
                        <span key={f} style={{
                            background: 'rgba(255,255,255,0.22)',
                            backdropFilter: 'blur(8px)',
                            border: '1.5px solid rgba(255,255,255,0.38)',
                            borderRadius: 50,
                            padding: '0.4rem 0.9rem',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            color: '#fff',
                        }}>{f}</span>
                    ))}
                </div>

                {/* Hero Card */}
                <div className="anim-slide-up" style={{ animationDelay: '0.35s', marginBottom: '2rem' }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.22)',
                        backdropFilter: 'blur(14px)',
                        borderRadius: 24,
                        padding: '1.75rem',
                        border: '1.5px solid rgba(255,255,255,0.4)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    }}>
                        <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '1.05rem', lineHeight: 1.65, fontWeight: 500, textAlign: 'center' }}>
                            BloomHer empowers women to understand their bodies, track their wellness journey, and thrive — all in one safe, beautiful space. ✨
                        </p>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="anim-slide-up" style={{ animationDelay: '0.45s', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <button
                        className="btn btn-lg btn-full"
                        style={{ background: 'rgba(255,255,255,0.95)', color: '#ec4899', fontWeight: 700, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
                        onClick={() => nav('/setup')}
                    >
                        🌸 Get Started — It's Free
                    </button>
                    <button
                        className="btn btn-lg btn-full"
                        style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '2px solid rgba(255,255,255,0.55)', backdropFilter: 'blur(8px)' }}
                        onClick={() => nav('/dashboard')}
                    >
                        Sign In →
                    </button>
                </div>

                {/* Footer note */}
                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', marginTop: '2rem', paddingBottom: '2rem' }}>
                    No ads · No selling your data · Always private 💜
                </p>
            </div>
        </div>
    )
}
