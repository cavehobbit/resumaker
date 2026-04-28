import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [events, setEvents] = useState([]);
  const [theme, setTheme] = useState('theme-professional');
  const [customColors, setCustomColors] = useState({
    primary: '#4a5568',
    secondary: '#cbd5e0',
    text: '#ffffff'
  });
  const [form, setForm] = useState({ 
    year: '', title: '', exp: '', edu: '', skills: '', sum: '' 
  });

  useEffect(() => {
    const saved = localStorage.getItem('RESUME_DATA');
    const savedTheme = localStorage.getItem('RESUME_THEME');
    const savedColors = localStorage.getItem('RESUME_COLORS');
    if (saved) setEvents(JSON.parse(saved));
    if (savedTheme) setTheme(savedTheme);
    if (savedColors) setCustomColors(JSON.parse(savedColors));
  }, []);

  const changeTheme = (t) => {
    setTheme(t);
    localStorage.setItem('RESUME_THEME', t);
  };

  const updateColor = (key, value) => {
    const newColors = { ...customColors, [key]: value };
    setCustomColors(newColors);
    localStorage.setItem('RESUME_COLORS', JSON.stringify(newColors));
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
    <div className="app" style={{
      '--custom-primary': customColors.primary,
      '--custom-secondary': customColors.secondary,
      '--custom-text': customColors.text
    }}>
      <section className="sidebar">
        <p className="picker-label">PRESET STYLES</p>
        <div className="style-picker">
          <button className={`style-btn ${theme === 'theme-professional' ? 'active' : ''}`} onClick={() => changeTheme('theme-professional')}>PROFESSIONAL</button>
          <button className={`style-btn ${theme === 'theme-modern' ? 'active' : ''}`} onClick={() => changeTheme('theme-modern')}>MODERN</button>
          <button className={`style-btn ${theme === 'theme-minimal' ? 'active' : ''}`} onClick={() => changeTheme('theme-minimal')}>MINIMAL</button>
          <button className={`style-btn ${theme === 'theme-classic' ? 'active' : ''}`} onClick={() => changeTheme('theme-classic')}>CLASSIC</button>
          <button className={`style-btn ${theme === 'theme-floral' ? 'active' : ''}`} onClick={() => changeTheme('theme-floral')}>FLORAL</button>
          <button className={`style-btn ${theme === 'theme-geometric' ? 'active' : ''}`} onClick={() => changeTheme('theme-geometric')}>GEOMETRIC</button>
          <button className={`style-btn ${theme === 'theme-dots' ? 'active' : ''}`} onClick={() => changeTheme('theme-dots')}>DOTS</button>
        </div>

        <div className="section-divider"></div>

        <p className="picker-label">CUSTOM COLORS</p>
        <div className="color-grid">
          <div className="input-group">
            <label>PRIMARY</label>
            <input 
              type="color" 
              value={customColors.primary} 
              onChange={e => updateColor('primary', e.target.value)} 
            />
          </div>
          <div className="input-group">
            <label>SECONDARY</label>
            <input 
              type="color" 
              value={customColors.secondary} 
              onChange={e => updateColor('secondary', e.target.value)} 
            />
          </div>
        </div>
        <div className="input-group">
          <label>TEXT COLOR</label>
          <input 
            type="color" 
            value={customColors.text} 
            onChange={e => updateColor('text', e.target.value)} 
          />
        </div>

        <div className="section-divider"></div>

        <div className="input-group">
          <label>YEAR</label>
          <input value={form.year} onChange={e => setForm({...form, year: e.target.value})} />
        </div>

        <div className="input-group">
          <label>POSITION</label>
          <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
        </div>

        <div className="input-group">
          <label>EXPERIENCE</label>
          <textarea rows="2" value={form.exp} onChange={e => setForm({...form, exp: e.target.value})} />
        </div>

        <div className="input-group">
          <label>EDUCATION</label>
          <textarea rows="2" value={form.edu} onChange={e => setForm({...form, edu: e.target.value})} />
        </div>

        <div className="input-group">
          <label>SKILLS</label>
          <input placeholder="COMMA SEPARATED" value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} />
        </div>

        <div className="input-group">
          <label>SUMMARY</label>
          <textarea rows="2" value={form.sum} onChange={e => setForm({...form, sum: e.target.value})} />
        </div>

        <button className="action-btn" onClick={handleStamp}>ADD ENTRY</button>
        
        <div style={{marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '5px'}}>
          <button className="action-btn" onClick={() => window.print()}>PRINT</button>
          <button className="action-btn btn-secondary" onClick={() => {
            localStorage.removeItem('RESUME_DATA');
            setEvents([]);
          }}>CLEAR ALL</button>
        </div>
      </section>

      <section className={`view ${theme}`}>
        {events.map((ev) => (
          <div className="card" key={ev.id}>
            <div className="card-header">
              <h2>{ev.title}</h2>
              <p className="card-year">{ev.year}</p>
            </div>

            <div className="card-body">
              {ev.exp && (
                <>
                  <p className="section-title">EXPERIENCE</p>
                  <p className="section-content">{ev.exp}</p>
                </>
              )}
              
              {ev.edu && (
                <>
                  <p className="section-title">EDUCATION</p>
                  <p className="section-content">{ev.edu}</p>
                </>
              )}
              
              {ev.skills && (
                <>
                  <p className="section-title">SKILLS</p>
                  <div className="skill-tags">
                    {ev.skills.split(',').map((skill, i) => (
                      <span key={i} className="skill-tag">{skill.trim()}</span>
                    ))}
                  </div>
                </>
              )}
              
              {ev.sum && (
                <>
                  <p className="section-title">SUMMARY</p>
                  <p className="section-content">{ev.sum}</p>
                </>
              )}

              <button 
                className="delete-btn"
                onClick={() => {
                  const updated = events.filter(item => item.id !== ev.id);
                  setEvents(updated);
                  localStorage.setItem('RESUME_DATA', JSON.stringify(updated));
                }}
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}