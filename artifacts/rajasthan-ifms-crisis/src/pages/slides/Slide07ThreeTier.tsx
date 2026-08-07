export default function Slide07ThreeTier() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #064E3B 0%, #032D22 60%, #011710 100%)",
        fontFamily: "'Noto Sans Devanagari', 'Noto Sans', system-ui, sans-serif",
        padding: "4vh 4vw",
        boxSizing: "border-box",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto auto 1fr auto",
        gap: "2.5vh 4vw",
        color: "#FFFFFF",
        position: "relative",
      }}
    >
      <div style={{ position:"absolute", top:"-5vw", right:"-5vw", width:"18vw", height:"18vw", borderRadius:"50%", background:"rgba(52,211,153,0.07)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-4vw", left:"40%", width:"14vw", height:"14vw", borderRadius:"50%", background:"rgba(110,231,183,0.05)", pointerEvents:"none" }} />

      {/* Header */}
      <div style={{ gridColumn:"1/-1", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid rgba(255,255,255,0.15)", paddingBottom:"2vh" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"1vw" }}>
          <div style={{ width:"2vw", height:"2vw", backgroundColor:"#34D399", borderRadius:"0.4vw" }} />
          <div style={{ fontSize:"1.2vw", fontWeight:700, color:"rgba(255,255,255,0.9)" }}>PWD &amp; Irrigation Dept. — Rajasthan</div>
        </div>
        <div style={{ display:"flex", gap:"2vw", fontSize:"1vw", fontWeight:600, color:"rgba(255,255,255,0.4)" }}>
          <div>CHAPTER 6</div><div>THREE-TIER SYSTEM</div>
        </div>
      </div>

      <div style={{ gridColumn:"1/-1" }}>
        <div style={{ fontSize:"1.05vw", fontWeight:700, color:"#34D399", marginBottom:"0.8vh", textTransform:"uppercase", letterSpacing:"0.07em" }}>IFMS 3.0 — Vision vs. Ground Reality</div>
        <div style={{ fontSize:"2.8vw", fontWeight:800, lineHeight:1.15 }}>कागज़ पर सुरक्षित, ज़मीन पर खोखली</div>
      </div>

      {/* Left — Vision */}
      <div style={{ background:"rgba(52,211,153,0.07)", border:"1px solid rgba(52,211,153,0.25)", borderRadius:"1vw", padding:"2.5vh 2.5vw", display:"flex", flexDirection:"column", gap:"1.8vh" }}>
        <div style={{ background:"rgba(52,211,153,0.15)", borderRadius:"0.6vw", padding:"1vh 1.5vw", display:"flex", alignItems:"center", gap:"1vw" }}>
          <div style={{ width:"0.7vw", height:"0.7vw", backgroundColor:"#34D399", borderRadius:"50%" }} />
          <div style={{ fontSize:"1.05vw", fontWeight:700, color:"#34D399" }}>सरकार का Vision</div>
        </div>
        {[
          { role:"MAKER", desc:"Bill तैयार करता है", sub:"Division level — engineer द्वारा", c:"#34D399" },
          { role:"CHECKER", desc:"Bill जाँचता है", sub:"Independent — दूसरे अधिकारी द्वारा", c:"#6EE7B7" },
          { role:"APPROVER", desc:"Final approve करता है", sub:"वरिष्ठ अधिकारी — treasury को forward", c:"#A7F3D0" },
        ].map((item, i) => (
          <div key={i}>
            {i > 0 && <div style={{ display:"flex", justifyContent:"center", marginBottom:"0.5vh" }}><div style={{ fontSize:"1.1vw", color:"rgba(52,211,153,0.6)", fontWeight:700 }}>↓</div></div>}
            <div style={{ background:"rgba(52,211,153,0.08)", border:"1px solid rgba(52,211,153,0.2)", borderRadius:"0.8vw", padding:"1.3vh 1.8vw", display:"flex", alignItems:"center", gap:"1.5vw" }}>
              <div style={{ width:"3.2vw", height:"3.2vw", backgroundColor:item.c, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ fontSize:"0.7vw", fontWeight:900, color:"#032D22" }}>{item.role}</span>
              </div>
              <div>
                <div style={{ fontSize:"1vw", fontWeight:600, color:"rgba(255,255,255,0.9)" }}>{item.desc}</div>
                <div style={{ fontSize:"0.82vw", color:"rgba(255,255,255,0.5)" }}>{item.sub}</div>
              </div>
            </div>
          </div>
        ))}
        <div style={{ background:"rgba(52,211,153,0.1)", borderRadius:"0.6vw", padding:"1vh 1.5vw" }}>
          <div style={{ fontSize:"0.88vw", fontWeight:600, color:"#6EE7B7" }}>Electronic MB से linked — पारदर्शी, fraud-proof प्रणाली</div>
        </div>
      </div>

      {/* Right — Reality */}
      <div style={{ background:"rgba(239,68,68,0.07)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:"1vw", padding:"2.5vh 2.5vw", display:"flex", flexDirection:"column", gap:"1.5vh" }}>
        <div style={{ background:"rgba(239,68,68,0.15)", borderRadius:"0.6vw", padding:"1vh 1.5vw", display:"flex", alignItems:"center", gap:"1vw" }}>
          <div style={{ width:"0.7vw", height:"0.7vw", backgroundColor:"#F87171", borderRadius:"50%" }} />
          <div style={{ fontSize:"1.05vw", fontWeight:700, color:"#F87171" }}>ज़मीनी हकीक़त</div>
        </div>
        {[
          { title:"90% XEN — Login भी नहीं कर सकते", body:"90% Executive Engineers IFMS portal का inbox तक खोलना नहीं जानते। प्रशिक्षण शून्य।" },
          { title:"Engineers ने Computer Operators को OTP दिया", body:"अधिकारियों ने अपनी login credentials outsourced operators को सौंप दी।" },
          { title:"एक Operator — तीनों roles", body:"Maker + Checker + Approver — तीनों roles एक ही बाहरी operator निभाता है।" },
        ].map((item, i) => (
          <div key={i} style={{ background:"rgba(239,68,68,0.07)", border:"1px solid rgba(239,68,68,0.18)", borderRadius:"0.8vw", padding:"1.3vh 1.8vw" }}>
            <div style={{ fontSize:"0.95vw", fontWeight:600, color:"rgba(255,255,255,0.95)", marginBottom:"0.4vh" }}>{item.title}</div>
            <div style={{ fontSize:"0.85vw", color:"rgba(255,255,255,0.6)", lineHeight:1.4 }}>{item.body}</div>
          </div>
        ))}
        <div style={{ background:"rgba(239,68,68,0.15)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:"0.6vw", padding:"1vh 1.5vw" }}>
          <div style={{ fontSize:"0.88vw", fontWeight:700, color:"#FCA5A5" }}>परिणाम: तीन-स्तरीय जाँच की आत्मा नष्ट — सरकार का खर्च फिर भी बढ़ा</div>
        </div>
        <div style={{ background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:"0.6vw", padding:"1vh 1.5vw" }}>
          <div style={{ fontSize:"0.88vw", fontWeight:700, color:"#FCA5A5" }}>Divisional Accountants भी operators को OTP देते हैं — supervision शून्य</div>
        </div>
      </div>

      <div style={{ gridColumn:"1/-1", display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"1px solid rgba(255,255,255,0.12)", paddingTop:"2vh", fontSize:"0.9vw", color:"rgba(255,255,255,0.3)", fontWeight:500 }}>
        <div>Rajasthan PWD &amp; Irrigation — Contractor Payment System Investigation</div>
        <span>Slide 7 of 10</span>
      </div>
    </div>
  );
}
