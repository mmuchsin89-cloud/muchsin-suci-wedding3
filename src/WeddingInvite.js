import React, { useRef, useState, useEffect } from 'react';
const akadCoords = { lat: -0.412915, lng: 100.072266 };
const resepsiCoords = { lat: -0.6375711, lng: 100.1322098 };

export default function WeddingInvite(){
  const [open, setOpen] = useState(false);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // autoplay when undangan dibuka
  function openInvite(){
    setOpen(true);
    if(audioRef.current){
      audioRef.current.play().then(()=>setPlaying(true)).catch(()=>{});
    }
  }

  function togglePlay(){
    if(!audioRef.current) return;
    if(playing){ audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play().catch(()=>{}); setPlaying(true); }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="hero">
          <h1>Undangan Pernikahan</h1>
          <p>M. MUCHSIN RAHMADANI & SUCI PERMATA ARJUNA, S.Pd.GSD</p>
          <p>14 — 16 April 2026</p>
          <button className="open-btn" onClick={openInvite}>Buka Undangan</button>

          <div className="audio-controls">
            <audio ref={audioRef} loop src="/audio/track.mp3" />
            <button onClick={togglePlay} className="btn">{playing? 'Pause Musik' : 'Putar Musik'}</button>
          </div>
        </div>

        {open && (
          <div style={{padding:20}}>
            <h2>Akad Nikah</h2>
            <p>Selasa, 14 April 2026</p>
            <p>Jl. Raya Malai, Kampung Ingu, Kecamatan Sungai Geringging, Kabupaten Padang Pariaman</p>
            <a href={`https://www.google.com/maps?q=${akadCoords.lat},${akadCoords.lng}`} target="_blank" rel="noreferrer">Lihat di Google Maps</a>

            <h2>Resepsi</h2>
            <p>Kamis, 16 April 2026</p>
            <p>Jl. H. Agus Salim No. 48, Kelurahan Jalan Baru, Kecamatan Pariaman Tengah, Kota Pariaman</p>
            <a href={`https://www.google.com/maps?q=${resepsiCoords.lat},${resepsiCoords.lng}`} target="_blank" rel="noreferrer">Lihat di Google Maps</a>

            <p style={{marginTop:20}}>Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.</p>
            <p>Wassalamu’alaikum Warahmatullahi Wabarakatuh</p>
          </div>
        )}
      </div>
    </div>
  )
}
