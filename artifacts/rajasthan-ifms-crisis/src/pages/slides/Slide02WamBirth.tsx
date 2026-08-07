export default function Slide02WamBirth() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #14532D 0%, #052E16 60%, #021707 100%)",
        fontFamily: "'Noto Sans Devanagari', 'Noto Sans', system-ui, sans-serif",
        padding: "4vh 4vw",
        boxSizing: "border-box",
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto 1fr auto",
        gap: "2.5vh",
        color: "#FFFFFF",
        position: "relative",
      }}
    >
      <div style={{ position:"absolute", top:"-5vw", right:"-5vw", width:"20vw", height:"20vw", borderRadius:"50%", background:"rgba(74,222,128,0.07)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-8vw", left:"10%", width:"25vw", height:"25vw", borderRadius:"50%", background:"rgba(134,239,172,0.05)", pointerEvents:"none" }} />

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid rgba(255,255,255,0.15)", paddingBottom:"2vh" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"1vw" }}>
          <div style={{ width:"2vw", height:"2vw", backgroundColor:"#4ADE80", borderRadius:"0.4vw" }} />
          <div style={{ fontSize:"1.2vw", fontWeight:700, color:"rgba(255,255,255,0.9)" }}>PWD &amp; Irrigation Dept. — Rajasthan</div>
        </div>
        <div style={{ display:"flex", gap:"2vw", fontSize:"1vw", fontWeight:600, color:"rgba(255,255,255,0.45)" }}>
          <div>CHAPTER 1</div><div>2012 — ORIGINS</div>
        </div>
      </div>

      {/* Title */}
      <div>
        <div style={{ fontSize:"1.05vw", fontWeight:700, color:"#4ADE80", marginBottom:"0.8vh", textTransform:"uppercase", letterSpacing:"0.07em" }}>
          WAM Portal — नींव और वादा
        </div>
        <div style={{ fontSize:"3vw", fontWeight:800, lineHeight:1.15 }}>
          2012: राजस्थान का पहला Digital<br />Payment System
        </div>
      </div>

      {/* Content */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3vw", alignItems:"start" }}>
        {/* Left — story */}
        <div style={{ display:"flex", flexDirection:"column", gap:"2vh" }}>
          <div style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(74,222,128,0.2)", borderRadius:"1vw", padding:"2.5vh 2.5vw" }}>
            <div style={{ fontSize:"1.05vw", fontWeight:700, color:"#86EFAC", marginBottom:"1.2vh" }}>दो Portal, एक Mission</div>
            <div style={{ fontSize:"0.95vw", color:"rgba(255,255,255,0.75)", lineHeight:1.6 }}>
              <strong style={{ color:"#4ADE80" }}>WAM Portal</strong> (wam.rajasthan.gov.in) — contractors के online bills के लिए।<br /><br />
              <strong style={{ color:"#4ADE80" }}>PayManager</strong> (paymanager.rajasthan.gov.in) — Treasury integration, सीधे bank account में payment।
            </div>
          </div>
          <div style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(74,222,128,0.2)", borderRadius:"1vw", padding:"2.5vh 2.5vw" }}>
            <div style={{ fontSize:"1.05vw", fontWeight:700, color:"#86EFAC", marginBottom:"1.2vh" }}>Vision</div>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.8vh" }}>
              {["कागज़ी प्रक्रिया का अंत","बिचौलियों की समाप्ति","समय पर भुगतान","Transparency और Accountability"].map(v => (
                <div key={v} style={{ display:"flex", alignItems:"center", gap:"1vw", fontSize:"0.95vw", color:"rgba(255,255,255,0.75)" }}>
                  <div style={{ width:"0.6vw", height:"0.6vw", backgroundColor:"#4ADE80", borderRadius:"50%", flexShrink:0 }} />
                  {v}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — timeline */}
        <div style={{ display:"flex", flexDirection:"column", gap:"1.5vh" }}>
          <div style={{ fontSize:"0.85vw", fontWeight:700, color:"#4ADE80", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"0.5vh" }}>14-Year Journey</div>
          {[
            { yr:"2012", label:"WAM Portal Launch", note:"PWD & Irrigation go digital", color:"#4ADE80" },
            { yr:"2025", label:"IFMS 2.0 Mandate", note:"जनवरी — नया system अनिवार्य", color:"#FDE047" },
            { yr:"Jun 2026", label:"Finance Dept. Training", note:"WAM की जगह IFMS 3.0 होगा", color:"#FB923C" },
            { yr:"10 Jul 2026", label:"WAM Portal बंद", note:"आखिरी payment — सिस्टम collapse", color:"#F87171" },
          ].map((item, i) => (
            <div key={i} style={{ display:"flex", gap:"1.5vw", alignItems:"flex-start" }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
                <div style={{ width:"0.9vw", height:"0.9vw", borderRadius:"50%", backgroundColor:item.color, boxShadow:`0 0 0 3px rgba(255,255,255,0.1)` }} />
                {i < 3 && <div style={{ width:"2px", height:"4.5vh", backgroundColor:"rgba(255,255,255,0.15)", marginTop:"0.3vh" }} />}
              </div>
              <div>
                <div style={{ fontSize:"0.8vw", fontWeight:700, color:item.color }}>{item.yr}</div>
                <div style={{ fontSize:"0.95vw", fontWeight:600, color:"rgba(255,255,255,0.9)" }}>{item.label}</div>
                <div style={{ fontSize:"0.85vw", color:"rgba(255,255,255,0.5)" }}>{item.note}</div>
              </div>
            </div>
          ))}
          <div style={{ background:"rgba(74,222,128,0.1)", border:"1px solid rgba(74,222,128,0.25)", borderRadius:"0.7vw", padding:"1.2vh 1.5vw", marginTop:"0.5vh" }}>
            <div style={{ fontSize:"0.9vw", fontWeight:600, color:"#86EFAC", fontStyle:"italic" }}>
              "14 वर्षों तक — कमियों के बावजूद — payments होती रहीं।"
            </div>
          </div>
        </div>
      </div>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"1px solid rgba(255,255,255,0.12)", paddingTop:"2vh", fontSize:"0.9vw", color:"rgba(255,255,255,0.3)", fontWeight:500 }}>
        <div>Rajasthan PWD &amp; Irrigation — Contractor Payment System Investigation</div>
        <span>Slide 2 of 10</span>
      </div>
    </div>
  );
}
