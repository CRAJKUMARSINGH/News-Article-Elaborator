export default function Slide06JulyCollapse() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #1A0533 0%, #0F0326 60%, #060012 100%)",
        fontFamily: "'Noto Sans Devanagari', 'Noto Sans', system-ui, sans-serif",
        padding: "4vh 4vw",
        boxSizing: "border-box",
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto auto 1fr auto",
        gap: "2.2vh",
        color: "#FFFFFF",
        position: "relative",
      }}
    >
      <div style={{ position:"absolute", top:"-5vw", right:"-4vw", width:"20vw", height:"20vw", borderRadius:"50%", background:"rgba(167,139,250,0.07)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-5vw", left:"15%", width:"16vw", height:"16vw", borderRadius:"50%", background:"rgba(196,181,253,0.05)", pointerEvents:"none" }} />

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid rgba(255,255,255,0.15)", paddingBottom:"2vh" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"1vw" }}>
          <div style={{ width:"2vw", height:"2vw", backgroundColor:"#A78BFA", borderRadius:"0.4vw" }} />
          <div style={{ fontSize:"1.2vw", fontWeight:700, color:"rgba(255,255,255,0.9)" }}>PWD &amp; Irrigation Dept. — Rajasthan</div>
        </div>
        <div style={{ display:"flex", gap:"2vw", fontSize:"1vw", fontWeight:600, color:"rgba(255,255,255,0.4)" }}>
          <div>CHAPTER 5</div><div>JULY 2026 — CRITICAL</div>
        </div>
      </div>

      <div>
        <div style={{ fontSize:"1.05vw", fontWeight:700, color:"#A78BFA", marginBottom:"0.8vh", textTransform:"uppercase", letterSpacing:"0.07em" }}>The Breaking Point</div>
        <div style={{ fontSize:"2.8vw", fontWeight:800, lineHeight:1.15 }}>WAM बंद, IFMS 3.0 तैयार नहीं — भुगतान ठप</div>
      </div>

      {/* Timeline dots */}
      <div style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(167,139,250,0.2)", borderRadius:"1vw", padding:"2vh 3vw", display:"flex", alignItems:"center", position:"relative" }}>
        <div style={{ position:"absolute", top:"50%", left:"3vw", right:"3vw", height:"2px", backgroundColor:"rgba(255,255,255,0.1)", transform:"translateY(-50%)" }} />
        {[
          { d:"2 Jul", c:"#4ADE80" },
          { d:"6 Jul", c:"#FBBF24" },
          { d:"10 Jul", c:"#F87171" },
          { d:"1 Aug", c:"#A78BFA" },
        ].map((m, i) => (
          <div key={i} style={{ flex:1, display:"flex", justifyContent:"center", position:"relative", zIndex:1 }}>
            <div style={{ width:"3.5vw", height:"3.5vw", backgroundColor:m.c, borderRadius:"50%", border:"3px solid rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:"0.72vw", fontWeight:800, color:"#0F0326", textAlign:"center", lineHeight:1.1 }}>{m.d}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 4 detail cards */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:"2vw" }}>
        {[
          { d:"2 July 2026", c:"#4ADE80", bc:"rgba(74,222,128,0.12)", bc2:"rgba(74,222,128,0.25)", title:"Finance Dept. Training", body:"PWD/Irrigation अधिकारियों को training दी — WAM की जगह IFMS 3.0 लेगा" },
          { d:"6 July 2026", c:"#FBBF24", bc:"rgba(251,191,36,0.12)", bc2:"rgba(251,191,36,0.25)", title:"आख़िरी सामान्य Payment", body:"WAM Portal पर अंतिम बार सामान्य payment processing हुई" },
          { d:"10 July 2026", c:"#F87171", bc:"rgba(248,113,113,0.12)", bc2:"rgba(248,113,113,0.25)", title:"WAM Portal बंद", body:"WAM पर bill processing पूरी तरह बंद — NIC Rajasthan को migration ज़िम्मेदारी" },
          { d:"1 August 2026", c:"#A78BFA", bc:"rgba(167,139,250,0.12)", bc2:"rgba(167,139,250,0.25)", title:"Portal अभी भी ठप", body:"IFMS 3.0 systematic नहीं — vendor names नहीं दिखते, security deposits integrate नहीं" },
        ].map((card, i) => (
          <div key={i} style={{ background:card.bc, border:`1px solid ${card.bc2}`, borderRadius:"0.8vw", padding:"2vh 1.8vw", display:"flex", flexDirection:"column", gap:"0.8vh" }}>
            <div style={{ fontSize:"0.75vw", fontWeight:700, color:card.c, textTransform:"uppercase", letterSpacing:"0.05em" }}>{card.d}</div>
            <div style={{ fontSize:"0.95vw", fontWeight:700, color:"rgba(255,255,255,0.95)", lineHeight:1.3 }}>{card.title}</div>
            <div style={{ fontSize:"0.85vw", color:"rgba(255,255,255,0.6)", lineHeight:1.4 }}>{card.body}</div>
          </div>
        ))}
      </div>

      {/* Alert */}
      <div style={{ background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.3)", borderRadius:"0.8vw", padding:"1.5vh 3vw", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ fontSize:"1vw", fontWeight:600, color:"#FCA5A5" }}>ना जाने क्यों — सारे contractors माैन हैं</div>
        <div style={{ background:"#F87171", color:"#450A0A", padding:"0.8vh 2vw", borderRadius:"2vw", fontSize:"0.95vw", fontWeight:800, flexShrink:0 }}>Payment ठप — Contractors चुप</div>
      </div>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"1px solid rgba(255,255,255,0.12)", paddingTop:"2vh", fontSize:"0.9vw", color:"rgba(255,255,255,0.3)", fontWeight:500 }}>
        <div>Rajasthan PWD &amp; Irrigation — Contractor Payment System Investigation</div>
        <span>Slide 6 of 10</span>
      </div>
    </div>
  );
}
