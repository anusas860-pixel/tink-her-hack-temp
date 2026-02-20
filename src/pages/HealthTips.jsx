import { useState } from 'react'
import BottomNav from '../components/BottomNav'

const TIPS = {
    Nutrition: {
        icon: '🥗',
        color: 'card-teal',
        items: [
            { emoji: '🥬', title: 'Iron-rich Foods', desc: 'Spinach, lentils, tofu, and red meat help replenish iron lost during menstruation.' },
            { emoji: '🐟', title: 'Omega-3 Fatty Acids', desc: 'Salmon, walnuts, and flaxseeds reduce prostaglandins that cause cramps.' },
            { emoji: '🍌', title: 'Magnesium & Potassium', desc: 'Bananas, dark chocolate, and nuts ease muscle cramps and bloating.' },
            { emoji: '💧', title: 'Hydration is Key', desc: 'Drink 8–10 glasses of water. Herbal teas like ginger and chamomile ease discomfort.' },
            { emoji: '🚫', title: 'Reduce Caffeine & Sugar', desc: 'These can worsen bloating, mood swings, and breast tenderness.' },
            { emoji: '🧀', title: 'Calcium Sources', desc: 'Dairy, fortified plant milks, and broccoli can reduce PMS symptoms by 40%.' },
        ],
    },
    'Stress & Mood': {
        icon: '🧘',
        color: 'card-lavender',
        items: [
            {
                emoji: '🧘', title: 'Gentle Yoga', desc: "Cat-cow, child's pose, and butterfly pose relieve cramps and calm the nervous system."
            },
            { emoji: '🌬️', title: 'Deep Breathing', desc: '4-7-8 breathing reduces cortisol. Inhale 4s, hold 7s, exhale 8s.' },
            { emoji: '🎵', title: 'Music Therapy', desc: 'Listening to calm music lowers cortisol and lifts serotonin naturally.' },
            { emoji: '📝', title: 'Journalling', desc: 'Writing your feelings reduces emotional overwhelm and anxiety during luteal phase.' },
            { emoji: '🌿', title: 'Nature Walks', desc: '20 minutes outside boosts endorphins and reduces PMS-related depression.' },
            { emoji: '😴', title: 'Prioritise Sleep', desc: 'Aim for 7–9 hours. Sleep deprivation amplifies mood swings and pain sensitivity.' },
        ],
    },
    'Period Care': {
        icon: '🩸',
        color: 'card-pink',
        items: [
            { emoji: '🌡️', title: 'Heat Therapy', desc: 'Heating pad on abdomen relaxes uterine muscles and reduces cramping effectively.' },
            { emoji: '👙', title: 'Comfortable Clothing', desc: 'Loose, breathable clothes in soft fabrics reduce bloating discomfort.' },
            { emoji: '🩺', title: 'Track Abnormal Changes', desc: 'Note extremely heavy bleeding, unusual odour, or severe pain — consult a doctor.' },
            { emoji: '🌸', title: 'Hygiene Essentials', desc: 'Change pads/tampons every 4–6 hours. Try menstrual cups for eco-friendly options.' },
            { emoji: '🏊', title: 'Light Exercise', desc: 'Swimming, walking, or light cycling release endorphins and reduce cramps.' },
            { emoji: '💊', title: 'Pain Management', desc: 'Ibuprofen works best taken at first sign of cramps. Always consult your doctor first.' },
        ],
    },
}

const TABS = Object.keys(TIPS)

export default function HealthTips() {
    const [active, setActive] = useState('Nutrition')
    const section = TIPS[active]

    return (
        <div className="page page-gradient-peach">
            <div className="page-header">
                <h1>💡 Health Tips</h1>
                <p>Science-backed guidance for every phase</p>
            </div>

            <div className="container">
                {/* Tab bar */}
                <div className="tab-bar anim-slide-up">
                    {TABS.map(t => (
                        <button key={t} className={`tab-btn ${active === t ? 'active' : ''}`}
                            onClick={() => setActive(t)}>
                            {TIPS[t].icon} {t}
                        </button>
                    ))}
                </div>

                {/* Tips grid */}
                <div className={`card ${section.color} anim-slide-up`} style={{ animationDelay: '0.1s', marginBottom: '0.9rem' }}>
                    <div className="section-title">{section.icon} {active}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {section.items.map((item, i) => (
                            <div key={i} style={{
                                display: 'flex', gap: '0.9rem', alignItems: 'flex-start',
                                padding: '0.85rem',
                                background: 'rgba(255,255,255,0.6)',
                                borderRadius: 12,
                                border: '1px solid rgba(255,255,255,0.7)',
                            }}>
                                <span style={{ fontSize: '1.75rem', flexShrink: 0 }}>{item.emoji}</span>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{item.title}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom callout */}
                <div className="alert alert-info anim-slide-up" style={{ animationDelay: '0.2s' }}>
                    🩺 These tips are general wellness guidance. Always consult your healthcare provider for personalised medical advice.
                </div>
            </div>

            <BottomNav />
        </div>
    )
}
