import React, { useEffect, useRef, useState } from 'react';

const akadDate = new Date('2026-04-14T09:00:00');

// Updated coordinates:
const akadCoords = { lat: -0.412915, lng: 100.072266 };
const resepsiCoords = { lat: -0.6375711, lng: 100.1322098 };

export default function WeddingInvite() {
  const [open, setOpen] = useState(false);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [rsvps, setRsvps] = useState(() => {
    try { const raw = localStorage.getItem('rsvps-muchsin-suci'); return raw? JSON.parse(raw): []; } catch { return []; }
  });
  const [form, setForm] = useState({ name:'', attending:'Hadir', message:'' });

  useEffect(()=>{ localStorage.setItem('rsvps-muchsin-suci', JSON.stringify(rsvps)); },[rsvps]);
  useEffect(()=>{ if(!open && audioRef.current){ audioRef.current.pause(); setPlaying(false); } },[open]);

  function togglePlay(){
    if(!audioRef.current) return;
    if(playing){ audioRef.current.pause(); setPlaying(false); } else {
      audioRef.current.play().catch(()=>{});
      setPlaying(true);
    }
  }

  function submitRsvp(e){
    e.preventDefault();
    if(!form.name.trim()) return alert('Mohon isi nama');
    const entry = { ...form, time: new Date().toISOString() };
    setRsvps(s => [entry, ...s]);
    setForm({ name:'', attending:'Hadir', message:'' });
    alert('Terima kasih. RSVP Anda telah tersimpan.');
  }

  function downloadCSV(){
    if(!rsvps.length) return alert('Belum ada RSVP');
    const header = ['name','attending','message','time'];
    const rows = rsvps.map(r => header.map(h => '"'+((r[h]||'').replace(/"/g,'""'))+'"').join(','));
    const csv = [header.join(','), ...rows].join('\n');
    const blob = new Blob([csv], {type:'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'rsvp_muchsin_suci.csv'; a.click(); URL.revokeObjectURL(url);
  }

  // countdown
  const [count, setCount] = useState(getCountdown());
  useEffect(()=>{ const t = setInterval(()=>setCount(getCountdown()),1000); return ()=>clearInterval(t); },[]);

  function getCountdown(){
    const now = new Date();
    let diff = akadDate - now;
    if(diff < 0) diff = 0;
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const minutes = Math.floor((diff / (1000*60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return {days,hours,minutes,seconds};
  }

  return (
    <div className="container">
      <div className="card">
        <div className="hero">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <p style={{fontSize:14,color:'#8b5e3c'}}>بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
              <h1 className="title">Undangan Pernikahan</h1>
              <p className="subtitle">M. Muchsin Rahmadani & Suci Permata Arjuna, S.Pd.GSD</p>
            </div>
            <div style={{textAlign:'right'}}>
              <p style={{fontSize:13,color:'#8b5e3c'}}>14 — 16 April 2026</p>
              <button className="open-btn" onClick={()=>setOpen(true)}>Buka Undangan</button>
            </div>
          </div>

          <div className="audio-controls">
            <audio ref={audioRef} loop src="/audio/track.mp3" />
            <button onClick={togglePlay} className="btn" style={{padding:'8px 12px',background:'#b8860b'}}> {playing? 'Pause Musik' : 'Putar Musik'}</button>
            <div style={{fontSize:13,color:'#8b5e3c'}}>Musik: Saxophone — "Nothing's Gonna Change My Love For You" (ganti file di /public/audio)</div>
          </div>

          <div className="countdown">
            <div style={{background:'#fff',padding:'8px 12px',borderRadius:10,boxShadow:'0 6px 18px rgba(0,0,0,0.06)'}}>
              <div style={{fontSize:12,color:'#8b5e3c'}}>Menuju Akad</div>
              <div style={{fontSize:16}}>{count.days}d {count.hours}h {count.minutes}m {count.seconds}s</div>
            </div>
          </div>
        </div>

        {/* main content */}
        <div className="section" style={{display: open ? 'block' : 'none'}}>
          <section style={{textAlign:'center'}}>
            <h2>M. MUCHSIN RAHMADANI</h2>
            <p style={{marginTop:6}}>Putra Ketiga dari Bapak Nasrul & Ibu Deslinawati</p>
            <div style={{margin:'18px 0',fontSize:20,color:'#b8860b'}}> &amp; </div>
            <h2>SUCI PERMATA ARJUNA, S.Pd.GSD</h2>
            <p style={{marginTop:6}}>Putri Kedua dari Bapak Zulkifli (Alm.) & Ibu Arjuna</p>

            <blockquote style={{marginTop:12,fontStyle:'italic',color:'#6f4a37'}}>"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri..." <strong>QS. Ar-Rum: 21</strong></blockquote>
          </section>

          <div style={{marginTop:22}} className="grid">
            <div className="card-small">
              <h3>Akad Nikah</h3>
              <p style={{marginTop:6}}>Selasa, 14 April 2026</p>
              <p style={{marginTop:6}}>Jl. Raya Malai, Kampung Ingu, Kecamatan Sungai Geringging, Kabupaten Padang Pariaman</p>
              <p style={{marginTop:8}}><a href={`https://www.google.com/maps?q=${akadCoords.lat},${akadCoords.lng}`} target="_blank" rel="noreferrer">Lihat di Google Maps</a></p>
            </div>
            <div className="card-small">
              <h3>Resepsi</h3>
              <p style={{marginTop:6}}>Kamis, 16 April 2026</p>
              <p style={{marginTop:6}}>Jl. H. Agus Salim No. 48, Kel. Jalan Baru, Kec. Pariaman Tengah, Kota Pariaman</p>
              <p style={{marginTop:8}}><a href={`https://www.google.com/maps?q=${resepsiCoords.lat},${resepsiCoords.lng}`} target="_blank" rel="noreferrer">Lihat di Google Maps</a></p>
            </div>
          </div>

          <div style={{marginTop:20,display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            <div>
              <div style={{padding:10,background:'#fff',borderRadius:8}}>
                <h4 style={{margin:0,color:'#8b5e3c'}}>Peta Lokasi (Akad)</h4>
                <iframe title="map-akad" className="maps" src={`https://www.google.com/maps?q=${akadCoords.lat},${akadCoords.lng}&z=16&output=embed`}></iframe>
                <p style={{marginTop:8,color:'#6f4a37'}}>Lokasi Akad – Jl. Raya Malai, Kampung Ingu, Kecamatan Sungai Geringging, Kabupaten Padang Pariaman</p>
              </div>
            </div>
            <div>
              <div style={{padding:10,background:'#fff',borderRadius:8}}>
                <h4 style={{margin:0,color:'#8b5e3c'}}>Peta Lokasi (Resepsi)</h4>
                <iframe title="map-resepsi" className="maps" src={`https://www.google.com/maps?q=${resepsiCoords.lat},${resepsiCoords.lng}&z=16&output=embed`}></iframe>
                <p style={{marginTop:8,color:'#6f4a37'}}>Lokasi Resepsi – Jl. H. Agus Salim No. 48, Kel. Jalan Baru, Kecamatan Pariaman Tengah, Kota Pariaman</p>
              </div>
            </div>
          </div>

          <div style={{marginTop:20,background:'#fff',padding:16,borderRadius:10}}>
            <h3>Konfirmasi Kehadiran (RSVP)</h3>
            <form className="rsvp-form" onSubmit={submitRsvp}>
              <input placeholder="Nama lengkap" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
              <select value={form.attending} onChange={e=>setForm(f=>({...f,attending:e.target.value}))}>
                <option>Hadir</option>
                <option>Berhalangan</option>
              </select>
              <textarea placeholder="Pesan / Doa (opsional)" value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} />
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <button type="submit" className="btn">Kirim RSVP</button>
                <button type="button" onClick={downloadCSV} className="btn" style={{background:'#fff',color:'#8b5e3c',border:'1px solid #e6d6c8'}}>Unduh CSV</button>
              </div>
            </form>

            <div style={{marginTop:12}}>
              <h4>Daftar RSVP ({'{'}rsvps.length{'}'})</h4>
              <div className="rsvp-list">
                {rsvps.length===0 && <div style={{color:'#6f4a37'}}>Belum ada konfirmasi</div>}
                {rsvps.map((r,i)=>(
                  <div key={i} style={{padding:10,background:'#fff',border:'1px solid #f0e6de',borderRadius:8,marginBottom:8}}>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                      <div style={{fontWeight:600,color:'#3b2f2a'}}>{r.name}</div>
                      <div style={{fontSize:12,color:'#8b5e3c'}}>{new Date(r.time).toLocaleString()}</div>
                    </div>
                    <div style={{color:'#6f4a37'}}>{r.attending} — {r.message}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <footer style={{marginTop:20}}>
            <p>Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.</p>
            <p style={{marginTop:8,fontWeight:600}}>Wassalamu’alaikum Warahmatullahi Wabarakatuh</p>
            <div style={{marginTop:10,color:'#8b5e3c'}}>&copy; 2026 Muchsin & Suci</div>
          </footer>
        </div>

        <div style={{padding:14,background:'#fff7ee',borderTop:'1px solid rgba(139,94,60,0.05)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{color:'#8b5e3c'}}>Undangan: Muchsin & Suci — 14 — 16 April 2026</div>
            <div>
              <button className="open-btn" onClick={()=>setOpen(o=>!o)}>{open? 'Tutup' : 'Buka'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
