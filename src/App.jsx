import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [events, setEvents] = useState([]);
  const [theme, setTheme] = useState('theme-classic');
  const [form, setForm] = useState({ 
    year: '', title: '', exp: '', edu: '', skills: '', sum: '' 
  });

  useEffect(() => {
    const saved = localStorage.getItem('RESUME_DATA');
    const savedTheme = localStorage.getItem('RESUME_THEME');
    if (saved) setEvents(JSON.parse(saved));
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const changeTheme = (t) => {
    setTheme(t);
    localStorage.setItem('RESUME_THEME', t);
  };

  const handleStamp = () => {
    if (!form.year || !form.title) return;
    const newEvents = [...events, { ...form, id: Date.now() }]
      .sort((a, b) => parseInt(a.year) - parseInt(b.year));
    setEvents(newEvents);
    localStorage.setItem('RESUME_DATA', JSON.stringify(newEvents));
    setForm({ year: '', title: '', exp: '', edu: '', skills: '', sum: '' });
  };

  return (
    <div className={`app ${theme}`}>
      <section className="sidebar">
        <p className="picker-label">SHEET_COLOR_THEME</p>
        <div className="style-picker">
          <button className={`style-btn ${theme === 'theme-classic' ? 'active' : ''}`} onClick={() => changeTheme('theme-classic')}>CLASSIC</button>
          <button className={`style-btn ${theme === 'theme-cyber' ? 'active' : ''}`} onClick={() => changeTheme('theme-cyber')}>CYBER</button>
          <button className={`style-btn ${theme === 'theme-caution' ? 'active' : ''}`} onClick={() => changeTheme('theme-caution')}>CAUTION</button>
          <button className={`style-btn ${theme === 'theme-blood' ? 'active' : ''}`} onClick={() => changeTheme('theme-blood')}>BLOOD</button>
        </div>

        <div className="input-group">
          <label>YEAR / PERIOD</label>
          <input value={form.year} onChange={e => setForm({...form, year: e.target.value})} />
        </div>

        <div className="input-group">
          <label>ROLE_TITLE</label>
          <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
        </div>

        <div className="input-group">
          <label>01_EXPERIENCE</label>
          <textarea rows="2" value={form.exp} onChange={e => setForm({...form, exp: e.target.value})} />
        </div>

        <div className="input-group">
          <label>02_EDUCATION</label>
          <textarea rows="2" value={form.edu} onChange={e => setForm({...form, edu: e.target.value})} />
        </div>

        <div className="input-group">
          <label>03_SKILLS</label>
          <input value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} />
        </div>

        <div className="input-group">
          <label>04_SUMMARY</label>
          <textarea rows="2" value={form.sum} onChange={e => setForm({...form, sum: e.target.value})} />
        </div>

        <button onClick={handleStamp} style={{marginTop: '10px'}}>STAMP_RECORD</button>
        
        <div style={{marginTop: 'auto', display: 'flex', gap: '5px'}}>
          <button className="style-btn" onClick={() => window.print()}>EXPORT</button>
          <button className="style-btn" style={{borderColor: 'red'}} onClick={() => {
            localStorage.removeItem('RESUME_DATA');
            setEvents([]);
          }}>CLEAR</button>
        </div>
      </section>

      <section className="view">
        <div className="pipe"></div>
        {events.map((ev) => (
          <div className="card" key={ev.id}>
            <div className="connector"></div>
            <div className="card-year">{ev.year}</div>
            <h2 style={{fontSize: '1.2rem'}}>{ev.title}</h2>
            
            <p className="section-title">EXPERIENCE</p>
            <p className="section-content">{ev.exp}</p>
            
            <p className="section-title">EDUCATION</p>
            <p className="section-content">{ev.edu}</p>
            
            <p className="section-title">SKILLS</p>
            <p className="section-content">{ev.skills}</p>
            
            <p className="section-title">SUMMARY</p>
            <p className="section-content">{ev.sum}</p>

            <button 
              className="style-btn" 
              style={{marginTop: '1rem', width: 'auto'}}
              onClick={() => {
                const updated = events.filter(item => item.id !== ev.id);
                setEvents(updated);
                localStorage.setItem('RESUME_DATA', JSON.stringify(updated));
              }}
            >
              DELETE
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}