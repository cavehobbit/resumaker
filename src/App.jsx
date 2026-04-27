import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ year: '', title: '', desc: '' });

  //
  useEffect(() => {
    const saved = localStorage.getItem('STAMP_DATA');
    if (saved) setEvents(JSON.parse(saved));
  }, []);

  const handleStamp = () => {
    if (!form.year || !form.title) return alert("MISSING_DATA");
    
    const newEvents = [...events, { ...form, id: Date.now() }]
      .sort((a, b) => parseInt(a.year) - parseInt(b.year));
    
    setEvents(newEvents);
    localStorage.setItem('STAMP_DATA', JSON.stringify(newEvents));
    setForm({ year: '', title: '', desc: '' });
  };

  const deleteOne = (id) => {
    const filtered = events.filter(e => e.id !== id);
    setEvents(filtered);
    localStorage.setItem('STAMP_DATA', JSON.stringify(filtered));
  };

  return (
    <div className="app">
      <section className="sidebar">
        <h1>STAMP</h1>
        
        <div className="input-group">
          <label>TIMESTAMP (YEAR)</label>
          <input 
            type="number" 
            placeholder="E.G. 1994"
            value={form.year}
            onChange={e => setForm({...form, year: e.target.value})}
          />
        </div>

        <div className="input-group">
          <label>EVENT_TITLE</label>
          <input 
            placeholder="E.G. GRADUATION"
            value={form.title}
            onChange={e => setForm({...form, title: e.target.value})}
          />
        </div>

        <div className="input-group">
          <label>DETAILS</label>
          <textarea 
            rows="4" 
            placeholder="DESCRIBE_EVENT..."
            value={form.desc}
            onChange={e => setForm({...form, desc: e.target.value})}
          ></textarea>
        </div>

        <button onClick={handleStamp}>STAMP_IT</button>
        
        <div style={{marginTop: 'auto'}}>
          <button className="btn-sec" onClick={() => window.print()}>PRINT_PDF</button>
          <button className="btn-sec" onClick={() => {
            localStorage.clear();
            setEvents([]);
          }}>CLEAR_ALL</button>
        </div>
      </section>

      <section className="view">
        <div className="pipe"></div>
        {events.map((ev) => (
          <div className="card" key={ev.id}>
            <div className="connector"></div>
            <div className="card-year">{ev.year}</div>
            <h2>{ev.title}</h2>
            <p>{ev.desc}</p>
            <button 
              onClick={() => deleteOne(ev.id)}
              style={{marginTop: '1rem', padding: '0.3rem', fontSize: '0.7rem', width: 'auto'}}
            >
              DELETE
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}