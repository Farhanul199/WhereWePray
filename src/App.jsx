import { useMemo, useState } from 'react'

const nav = ["Qur'an", 'Journal', 'Dua & Dhikr', 'Home']
const surahs = [
  [1,'Al-Fatihah','الفاتحة',7],[2,'Al-Baqarah','البقرة',286],[3,'Aal-e-Imran','آل عمران',200],
  [4,"An-Nisa'",'النساء',176],[5,"Al-Ma’idah",'المائدة',120],[6,"Al-An’am",'الأنعام',165],
  [7,"Al-A’raf",'الأعراف',206],[8,'Al-Anfal','الأنفال',75],[9,'At-Tawbah','التوبة',129],[10,'Yunus','يونس',109]
]
const prayers = ['Fajr','Dhuhr','Asr','Maghrib','Isha']
const deeds = ['Prayed on time','Prayed in congregation',"Read Qur'an",'Dhikr','Donated today','Donated on Friday','Helped someone','Sadaqah','Lowered gaze','Spoke kindly','Optional Nafl prayer']
const duaGroups = [
  ['Morning','Begin the day with adhkar for protection, gratitude and tawakkul.',[
    ['Morning remembrance','أَصْـبَحْنا وَأَصْـبَحَ المـلكُ للهِ','Asbahna wa asbahal-mulku lillah.','We have entered a new morning and with it all dominion belongs to Allah.','Muslim'],
    ['Seeking wellbeing','اللّهـمَّ إِنِّي أَسْأَلُكَ العَافِيَةَ','Allahumma inni as’alukal-‘afiyah.','O Allah, I ask You for wellbeing.','Tirmidhi']]],
  ['Evening','Wind down the day with protection, forgiveness and remembrance.',[['Evening remembrance','أَمْسَيْنا وَأَمْسَى المـلكُ للهِ','Amsayna wa amsal-mulku lillah.','We have entered a new evening and with it all dominion belongs to Allah.','Muslim']]],
  ['Salah and After Salah','Adhkar surrounding the daily prayers and the moments immediately after.',[['Seeking forgiveness after salah','أَسْتَغْفِرُ اللهَ','Astaghfirullah.','I seek Allah’s forgiveness.','Muslim']]],
  ['Before Sleep and Tahajjud','Supplications before sleeping and during the stillness of the night.',[['Sleeping dua','بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا','Bismika Allahumma amutu wa ahya.','In Your name, O Allah, I die and I live.','Bukhari']]],
  ['Praise of Allah and Salawat','Praise, glorification and salutations upon the Prophet ﷺ.',[['Salawat','اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ','Allahumma salli ‘ala Muhammad.','O Allah, send blessings upon Muhammad.','Bukhari & Muslim']]],
  ["Qur'anic Duas and Sunnah Duas",'Authentic duas drawn from the Qur’an and Sunnah.',[['Rabbana atina','رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً','Rabbana atina fid-dunya hasanah.','Our Lord, give us good in this world.','Qur’an 2:201']]],
  ['Istighfar and Dhikr for All Times','Short remembrances for throughout the day.',[['Sayyidul Istighfar','اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ','Allahumma anta Rabbi la ilaha illa Anta.','O Allah, You are my Lord, none has the right to be worshipped except You.','Bukhari']]],
  ['Duas for the Ummah','Supplications for guidance, mercy, relief and unity for the Ummah.',[['For the believers','رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا','Rabbana ighfir lana wa li ikhwanina.','Our Lord, forgive us and our brothers who preceded us in faith.','Qur’an 59:10']]],
  ['99 Names of Allah','Reflect on the beautiful names of Allah.',[['Ar-Rahman','ٱلرَّحْمَٰن','Ar-Rahman','The Entirely Merciful.','Asma ul Husna'],['Al-Wadud','ٱلْوَدُود','Al-Wadud','The Most Loving.','Asma ul Husna']]]
]

function App(){
  const [page,setPage]=useState("Qur'an")
  const [surah,setSurah]=useState(2)
  const [dua,setDua]=useState('Morning')
  const [chosenDeeds,setChosenDeeds]=useState(['Prayed on time','Dhikr','Donated today'])
  const [reflection,setReflection]=useState('Alhamdulillah. Today I prayed Fajr, Dhuhr and Asr. I want to be more consistent with my evening adhkar.')
  const [mistakes,setMistakes]=useState('')
  const currentSurah=surahs.find(s=>s[0]===surah)||surahs[1]
  const currentDua=duaGroups.find(g=>g[0]===dua)||duaGroups[0]
  const status=[['Fajr',1,1,0],['Dhuhr',1,1,1],['Asr',1,0,0],['Maghrib',0,0,0],['Isha',0,0,0]]
  const xp=useMemo(()=>status.reduce((n,p)=>n+(p[1]?100:0)+(p[2]?25:0)+(p[3]?50:0),0)+chosenDeeds.length*20,[chosenDeeds])
  const toggleDeed=d=>setChosenDeeds(v=>v.includes(d)?v.filter(x=>x!==d):[...v,d])

  return <div className="app-shell">
    <header className="topbar">
      <button className="brand-lockup" onClick={()=>setPage('Home')}><span className="brand-text">WhereWePraying<span>?</span></span></button>
      <nav>{nav.map(n=><button key={n} className={page===n?'active':''} onClick={()=>setPage(n)}>{n}</button>)}</nav>
      <div className="header-actions"><button className="round-btn">⌕</button><button className="avatar">AK</button></div>
    </header>
    <main className="page-wrap">
      {page==='Home'&&<Home open={setPage}/>} 
      {page==="Qur'an"&&<Quran current={currentSurah} selected={surah} select={setSurah}/>} 
      {page==='Journal'&&<Journal status={status} deedsChosen={chosenDeeds} toggleDeed={toggleDeed} xp={xp} reflection={reflection} setReflection={setReflection} mistakes={mistakes} setMistakes={setMistakes}/>} 
      {page==='Dua & Dhikr'&&<Dua active={currentDua} selected={dua} select={setDua}/>} 
    </main>
  </div>
}

function Home({open}){return <div className="section-page"><section className="panel home-hero"><div><span className="kicker">A calmer companion</span><h1>Read, reflect and remember in one gentle space.</h1><p>A refined WhereWePraying experience centred on Qur’an reading, daily journalling and a thoughtful Dua & Dhikr library.</p><div className="button-row"><button className="accent-btn" onClick={()=>open("Qur'an")}>Open Qur’an</button><button className="soft-btn" onClick={()=>open('Journal')}>Open Journal</button></div></div><Arch/></section><section className="home-grid">{[["Qur'an",'Read'],['Journal','Reflect'],['Dua & Dhikr','Remember']].map(([x,k])=><button className="panel home-card" key={x} onClick={()=>open(x)}><span className="kicker">{k}</span><h3>{x}</h3><p>Open the dedicated {x} experience.</p></button>)}</section></div>}

function Quran({current,selected,select}){const stats=[['Bookmarks','12','Saved ayat'],['History','35','Recent reads'],['Continue Reading','Al-Baqarah','Ayah 255'],['Juz','2','Al-Baqarah 142–252'],['Last Read','Today','Al-Baqarah 255']];return <div className="section-page">
  <section className="page-heading"><div><h1>Read the Qur’an</h1><p>Continue reading, explore a Surah, or find an Ayah.</p></div><div className="search-row"><div className="search-box">⌕ &nbsp; Search Surah, Ayah or keyword...</div><button className="soft-btn">Advanced Search</button></div></section>
  <section className="stats-grid">{stats.map(s=><article className="panel stat" key={s[0]}><span>{s[0]}</span><strong>{s[1]}</strong><small>{s[2]}</small></article>)}</section>
  <section className="reader-grid"><aside className="panel sidebar"><div className="sidebar-head"><h3>Surahs</h3><span>☰</span></div><div className="surah-list">{surahs.map(s=><button key={s[0]} className={selected===s[0]?'surah active':'surah'} onClick={()=>select(s[0])}><span>{s[0]}</span><b>{s[1]}</b><span className="arabic-small">{s[2]}</span><span>{s[3]}</span></button>)}</div><button className="soft-btn full">View All Surahs</button></aside>
  <article className="panel reader"><div className="reader-head"><div><h2>{current[1]} <span>{current[2]}</span></h2><p>Juz 2 · Madani · {current[3]} Ayahs</p></div><div className="reader-actions">Play · Bookmark · Copy · Share</div></div><div className="ayah"><span className="ayah-number">255</span><p>اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ</p></div><div className="translation"><div><strong>English Translation <span>Sahih International</span></strong><p>Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep.</p></div><div><strong>Transliteration</strong><p>Allahu la ilaha illa huwa al-Hayyul-Qayyum. La ta’khudhuhu sinatun wa-la nawm.</p></div></div><div className="reader-nav"><button className="soft-btn">Previous Ayah</button><button className="soft-btn">Go to Surah</button><button className="accent-btn">Next Ayah</button></div></article></section>
  <section className="panel settings"><div><span>Translation</span><b>Sahih International</b></div><div><span>Font Size</span><b>A− 100% A+</b></div><div><span>Arabic Font</span><b>Uthmanic</b></div><div><span>Reading Mode</span><b>Light · Sepia · Dark</b></div><button className="soft-btn">Reader Settings</button></section>
</div>}

function Journal({status,deedsChosen,toggleDeed,xp,reflection,setReflection,mistakes,setMistakes}){return <div className="section-page">
  <section className="journal-top"><article className="panel journal-intro"><Arch/><div><h1>Islamic Journal</h1><p>A private 5-minute check-in to track your prayers, good deeds and reflections.</p><span className="kicker">♡ &nbsp; Private to you</span></div></article><article className="panel progress"><span className="kicker">Today’s progress</span><div className="progress-grid"><div><small>Barakah Points</small><strong>{xp.toLocaleString()}</strong><span>Level 7 · Seeker</span></div><div><small>Daily Goal</small><strong>83%</strong><span>of target</span></div><div><small>Daily Streak</small><strong>18</strong><span>days</span></div><div><small>Good Deeds</small><strong>{deedsChosen.length}</strong><span>tracked today</span></div></div></article></section>
  <section className="journal-body"><div className="stack"><article className="panel quick"><div className="card-title"><h3>Quick Log</h3><span>Tap to track</span></div><div className="prayer-grid">{prayers.map((p,i)=><button className={status[i][1]?'prayer active':'prayer'} key={p}><strong>{p}</strong><span>{status[i][1]?'Prayed':'Pending'}</span></button>)}</div><div className="deed-grid">{deeds.map(d=><button key={d} className={deedsChosen.includes(d)?'deed active':'deed'} onClick={()=>toggleDeed(d)}>{d}</button>)}</div></article><article className="panel calendar"><div className="card-title"><h3>Your Progress Calendar</h3><span>May 2025</span></div><div className="calendar-grid">{Array.from({length:31},(_,i)=><span key={i} className={(i+1)%5===0?'warn':(i+1)%7===0?'miss':'good'}>{i+1}</span>)}</div></article></div>
  <div className="stack"><article className="panel points"><h3>How points work</h3>{[['Fard prayers','100 pts each'],['On-time prayer bonus','+25 pts'],['In congregation bonus','+50 pts'],['Read Qur’an','30 pts'],['Dhikr','20 pts'],['Donated today','30 pts']].map(x=><div key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></div>)}</article><article className="panel summary"><h3>Today’s Summary</h3><p>Alhamdulillah. Today you prayed Fajr, Dhuhr and Asr, prayed Dhuhr on time, and gave charity.</p><div className="tags"><span>Fajr prayed</span><span>Dhuhr prayed</span><span>Dhuhr on time</span><span>Donated today</span></div></article><article className="panel tracker"><h3>Prayer Tracker</h3><div className="tracker-row header"><span>Prayer</span><span>Status</span><span>On time</span><span>Congregation</span></div>{status.map(p=><div className="tracker-row" key={p[0]}><span>{p[0]}</span><span className={p[1]?'green':'amber'}>{p[1]?'Prayed':'Pending'}</span><span>{p[2]?'✓':'–'}</span><span>{p[3]?'✓':'–'}</span></div>)}</article><article className="panel text-card"><h3>Daily Reflection</h3><textarea value={reflection} onChange={e=>setReflection(e.target.value)}/></article><article className="panel text-card"><h3>Private · Mistakes & Repentance</h3><textarea placeholder="Write it down, seek forgiveness and let it go." value={mistakes} onChange={e=>setMistakes(e.target.value)}/></article></div></section>
  <section className="panel quote"><p>“Say, O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives all sins.”</p><span>Qur’an 39:53</span></section>
</div>}

function Dua({active,selected,select}){return <div className="section-page"><section className="page-heading dua-heading"><div><h1>Dua & Dhikr</h1><p>Authentic supplications and remembrances organised around the moments you need them.</p></div><article className="panel dua-mini"><Arch mini/><div><strong>{active[0]}</strong><span>{active[2].length} curated duas</span></div></article></section><section className="reader-grid"><aside className="panel sidebar"><h3>Categories</h3><div className="dua-menu">{duaGroups.map(g=><button key={g[0]} className={selected===g[0]?'dua-category active':'dua-category'} onClick={()=>select(g[0])}>{g[0]}</button>)}</div></aside><div className="stack"><article className="panel dua-intro"><span className="kicker">Selected Category</span><h2>{active[0]}</h2><p>{active[1]}</p></article>{active[2].map(d=><article className="panel dua-entry" key={d[0]}><div className="dua-entry-head"><div><h3>{d[0]}</h3><span>{d[4]}</span></div><button className="soft-btn">Save</button></div><div className="dua-arabic">{d[1]}</div><div className="dua-meta"><strong>Transliteration</strong><p>{d[2]}</p></div><div className="dua-meta"><strong>Translation</strong><p>{d[3]}</p></div></article>)}</div></section></div>}

function Arch({mini=false}){return <div className={mini?'arch mini':'arch'}><div className="sky"/><div className="hill"/><span className="tower one"/><span className="tower two"/></div>}
export default App
