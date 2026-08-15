import { useEffect, useMemo, useState } from 'react'

const pages = ['Home', "Qur'an", 'Journal', 'Dua & Dhikr']
const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']
const duas = [
  'Morning', 'Evening', 'Salah & After Salah', 'Before Sleep & Tahajjud',
  'Praise of Allah & Salawat', "Qur'anic Duas & Sunnah Duas",
  'Istighfar & Dhikr for All Times', 'Duas for the Ummah', '99 Names of Allah'
]

function App() {
  const [page, setPage] = useState('Home')
  const [journal, setJournal] = useState(() => {
    try { return JSON.parse(localStorage.getItem('wwp-journal')) || {} } catch { return {} }
  })
  const [reflection, setReflection] = useState(() => localStorage.getItem('wwp-reflection') || '')

  useEffect(() => { localStorage.setItem('wwp-journal', JSON.stringify(journal)) }, [journal])
  useEffect(() => { localStorage.setItem('wwp-reflection', reflection) }, [reflection])

  const xp = useMemo(() => Object.values(journal).reduce((sum, p) => sum + (p?.onTime ? 10 : 0) + (p?.jamaah ? 15 : 0), 0), [journal])

  const toggle = (prayer, key) => setJournal(prev => ({
    ...prev,
    [prayer]: { ...(prev[prayer] || {}), [key]: !(prev[prayer]?.[key]) }
  }))

  return (
    <div className="app-shell">
      <header className="site-header">
        <button className="brand" onClick={() => setPage('Home')} aria-label="WhereWePraying home">
          <span className="logo-slot" aria-hidden="true">⌂</span>
          <span>WhereWePraying<span className="question">?</span></span>
        </button>
        <nav>
          {pages.map(item => <button key={item} className={page === item ? 'active' : ''} onClick={() => setPage(item)}>{item}</button>)}
        </nav>
      </header>

      <main>
        {page === 'Home' && <Home onOpen={setPage} />}
        {page === "Qur'an" && <Quran />}
        {page === 'Journal' && <Journal journal={journal} toggle={toggle} reflection={reflection} setReflection={setReflection} xp={xp} />}
        {page === 'Dua & Dhikr' && <DuaDhikr />}
      </main>

      <footer>
        <strong>WhereWePraying?</strong>
        <span>Built around worship, reflection and consistency.</span>
      </footer>
    </div>
  )
}

function Home({ onOpen }) {
  return <>
    <section className="hero">
      <div>
        <span className="eyebrow">Your everyday worship companion</span>
        <h1>A quieter place to keep your <em>deen</em> close.</h1>
        <p>Read Qur'an, keep a simple daily Islamic journal, and return to authentic dua and dhikr without clutter.</p>
        <div className="hero-actions">
          <button className="primary" onClick={() => onOpen('Journal')}>Open today’s journal</button>
          <button className="secondary" onClick={() => onOpen("Qur'an")}>Read Qur'an</button>
        </div>
      </div>
      <div className="hero-card">
        <span className="small-label">Today</span>
        <h3>One small act at a time.</h3>
        <div className="mini-row"><span>Qur'an</span><strong>Read a few ayat</strong></div>
        <div className="mini-row"><span>Journal</span><strong>Log your salah</strong></div>
        <div className="mini-row"><span>Dhikr</span><strong>Remember Allah</strong></div>
      </div>
    </section>

    <section className="section-block">
      <div className="section-heading"><span>Start here</span><h2>Three simple spaces.</h2></div>
      <div className="feature-grid">
        <Feature title="Qur'an" text="A calm, focused reader designed for daily use." action={() => onOpen("Qur'an")} />
        <Feature title="Journal" text="Track salah, reflection and progress without turning worship into noise." action={() => onOpen('Journal')} />
        <Feature title="Dua & Dhikr" text="Organised collections for morning, evening, salah, sleep and more." action={() => onOpen('Dua & Dhikr')} />
      </div>
    </section>
  </>
}

function Feature({ title, text, action }) {
  return <button className="feature-card" onClick={action}><span className="gradient-strip"/><h3>{title}</h3><p>{text}</p><span className="text-link">Open section →</span></button>
}

function Quran() {
  const surahs = [
    ['1', 'Al-Fatihah', 'The Opening', '7'], ['2', 'Al-Baqarah', 'The Cow', '286'],
    ['3', 'Ali Imran', 'Family of Imran', '200'], ['18', 'Al-Kahf', 'The Cave', '110'],
    ['36', 'Ya-Sin', 'Ya Sin', '83'], ['55', 'Ar-Rahman', 'The Most Merciful', '78'],
    ['67', 'Al-Mulk', 'The Sovereignty', '30'], ['112', 'Al-Ikhlas', 'Sincerity', '4']
  ]
  return <section className="page-section">
    <div className="page-intro"><span className="eyebrow">Qur'an</span><h1>Read at your own pace.</h1><p>V0.1 starts with the reader structure. Full verified Qur'an data, translations, transliteration and bookmarks come next.</p></div>
    <div className="surah-list">
      {surahs.map(([n, name, eng, ayat]) => <div className="surah-row" key={n}><span className="surah-number">{n}</span><div><strong>{name}</strong><span>{eng}</span></div><span>{ayat} ayat</span></div>)}
    </div>
  </section>
}

function Journal({ journal, toggle, reflection, setReflection, xp }) {
  return <section className="page-section">
    <div className="page-intro"><span className="eyebrow">Daily journal</span><h1>How was your salah today?</h1><p>Tap what applies. Your entries stay on this device in V0.1.</p></div>
    <div className="journal-layout">
      <div className="prayer-card">
        {prayers.map(prayer => <div className="prayer-row" key={prayer}>
          <strong>{prayer}</strong>
          <div className="chips">
            <button className={journal[prayer]?.onTime ? 'chip selected' : 'chip'} onClick={() => toggle(prayer, 'onTime')}>On time</button>
            <button className={journal[prayer]?.jamaah ? 'chip selected' : 'chip'} onClick={() => toggle(prayer, 'jamaah')}>In Jama'ah</button>
          </div>
        </div>)}
      </div>
      <aside className="progress-card"><span className="small-label">Today’s progress</span><strong className="xp">{xp} XP</strong><p>A gentle progress marker. Intention and sincerity matter more than a score.</p></aside>
    </div>
    <div className="reflection-card"><label htmlFor="reflection">Today’s reflection</label><textarea id="reflection" value={reflection} onChange={e => setReflection(e.target.value)} placeholder="What are you grateful for today?"/><span>Saved automatically on this device.</span></div>
  </section>
}

function DuaDhikr() {
  return <section className="page-section">
    <div className="page-intro"><span className="eyebrow">Dua & Dhikr</span><h1>Remember Allah throughout the day.</h1><p>Collections are arranged around the moments you actually reach for them.</p></div>
    <div className="dua-grid">{duas.map((item, i) => <button className="dua-card" key={item}><span className={`tone tone-${(i % 4) + 1}`}/><strong>{item}</strong><span>Collection coming in the next content pass →</span></button>)}</div>
  </section>
}

export default App
