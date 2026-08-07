export default function Slide09Reforms() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #1E3A8A 0%, #1e1b8a 50%, #0a0a4a 100%)",
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
      <div style={{ position:"absolute", top:"-5vw", right:"-4vw", width:"20vw", height:"20vw", borderRadius:"50%", background:"rgba(147,197,253,0.06)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-4vw", left:"10%", width:"14vw", height:"14vw", borderRadius:"50%", background:"rgba(96,165,250,0.05)", pointerEvents:"none" }} />

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid rgba(255,255,255,0.15)", paddingBottom:"2vh" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"1vw" }}>
          <div style={{ width:"2vw", height:"2vw", backgroundColor:"#60A5FA", borderRadius:"0.4vw" }} />
          <div style={{ fontSize:"1.2vw", fontWeight:700, color:"rgba(255,255,255,0.9)" }}>PWD &amp; Irrigation Dept. — Rajasthan</div>
        </div>
        <div style={{ display:"flex", gap:"2vw", fontSize:"1vw", fontWeight:600, color:"rgba(255,255,255,0.4)" }}>
          <div>CHAPTER 8</div><div>REFORMS NEEDED</div>
        </div>
      </div>

      <div>
        <div style={{ fontSize:"1.05vw", fontWeight:700, color:"#60A5FA", marginBottom:"0.8vh", textTransform:"uppercase", letterSpacing:"0.07em" }}>तत्काल कार्रवाई आवश्यक</div>
        <div style={{ fontSize:"3vw", fontWeight:800, lineHeight:1.15 }}>पाँच तत्काल सुधार: क्या होना चाहिए?</div>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:"1.3vh" }}>
        {[
          { n:1, title:"नागरिक पारदर्शिता", body:"हर नागरिक को bill की स्थिति और दस्तावेज़ मुफ़्त में देखने की सुविधा — public accountability अनिवार्य", tag:"Transparency", tc:"#60A5FA", tbc:"rgba(96,165,250,0.12)" },
          { n:2, title:"Maker-Checker-Approver: तीन अलग अधिकारी", body:"तीनों roles अलग-अलग अधिकारी निभाएं — operator को OTP देने की प्रथा तत्काल बंद हो", tag:"Accountability", tc:"#60A5FA", tbc:"rgba(96,165,250,0.12)" },
          { n:3, title:"समग्र Training कार्यक्रम", body:"हर field office के लिए mandatory, intensive IFMS 3.0 training — बिना training के कोई portal access नहीं", tag:"Training", tc:"#60A5FA", tbc:"rgba(96,165,250,0.12)" },
          { n:4, title:"Portal तत्काल Fix करे NIC Rajasthan", body:"Vendor names, security deposits को तत्काल integrate करे — portal को operational बनाने की deadline तय हो", tag:"Urgent Fix", tc:"#F87171", tbc:"rgba(248,113,113,0.12)" },
          { n:5, title:"Independent Monitoring Committee", body:"System की नियमित, स्वतंत्र समीक्षा — एक independent committee जो विभाग और सरकार से बाहर हो", tag:"Monitoring", tc:"#FBBF24", tbc:"rgba(251,191,36,0.12)" },
        ].map(r => (
          <div key={r.n} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(96,165,250,0.18)", borderRadius:"0.7vw", padding:"1.5vh 2.5vw", display:"flex", gap:"2vw", alignItems:"center" }}>
            <div style={{ width:"3.2vw", height:"3.2vw", backgroundColor:"#3B82F6", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:"1.3vw", fontWeight:800, color:"#FFFFFF" }}>{r.n}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:"1.05vw", fontWeight:700, color:"rgba(255,255,255,0.95)", marginBottom:"0.3vh" }}>{r.title}</div>
              <div style={{ fontSize:"0.88vw", color:"rgba(255,255,255,0.6)", lineHeight:1.35 }}>{r.body}</div>
            </div>
            <div style={{ background:r.tbc, border:`1px solid ${r.tc}40`, color:r.tc, fontSize:"0.82vw", fontWeight:700, padding:"0.5vh 1.2vw", borderRadius:"2vw", flexShrink:0 }}>{r.tag}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"1px solid rgba(255,255,255,0.12)", paddingTop:"2vh", fontSize:"0.9vw", color:"rgba(255,255,255,0.3)", fontWeight:500 }}>
        <div>Rajasthan PWD &amp; Irrigation — Contractor Payment System Investigation</div>
        <span>Slide 9 of 10</span>
      </div>
    </div>
  );
}
