export default function Slide08Broken() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #292524 0%, #1C1917 60%, #0A0806 100%)",
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
      <div style={{ position:"absolute", top:"-5vw", right:"-3vw", width:"18vw", height:"18vw", borderRadius:"50%", background:"rgba(234,88,12,0.06)", pointerEvents:"none" }} />

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid rgba(255,255,255,0.12)", paddingBottom:"2vh" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"1vw" }}>
          <div style={{ width:"2vw", height:"2vw", backgroundColor:"#FB923C", borderRadius:"0.4vw" }} />
          <div style={{ fontSize:"1.2vw", fontWeight:700, color:"rgba(255,255,255,0.9)" }}>PWD &amp; Irrigation Dept. — Rajasthan</div>
        </div>
        <div style={{ display:"flex", gap:"2vw", fontSize:"1vw", fontWeight:600, color:"rgba(255,255,255,0.4)" }}>
          <div>CHAPTER 7</div><div>STATUS: 1 AUGUST 2026</div>
        </div>
      </div>

      <div>
        <div style={{ fontSize:"1.05vw", fontWeight:700, color:"#FB923C", marginBottom:"0.8vh", textTransform:"uppercase", letterSpacing:"0.07em" }}>System Status Report</div>
        <div style={{ fontSize:"3vw", fontWeight:800, lineHeight:1.15 }}>अभी क्या टूटा है: 1 August 2026 की स्थिति</div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2vh 3vw" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:"1.6vh" }}>
          {[
            { icon:"✗", c:"#F87171", title:"Vendor Names गायब", body:"IFMS 3.0 में sub-vendors/contractors के names portal पर appear ही नहीं हो रहे" },
            { icon:"✗", c:"#F87171", title:"Alphabetical Order नहीं", body:"जो names दिखते हैं वे किसी alphabetical क्रम में नहीं — ढूंढना असंभव" },
            { icon:"✗", c:"#F87171", title:"Security Deposit Integrate नहीं", body:"Contractor की जमा Security Deposit का online record नए portal पर integrate नहीं हुआ" },
          ].map((item, i) => (
            <div key={i} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(248,113,113,0.2)", borderRadius:"0.8vw", padding:"1.8vh 2vw", display:"flex", gap:"1.5vw", alignItems:"flex-start" }}>
              <div style={{ width:"2.2vw", height:"2.2vw", backgroundColor:"rgba(239,68,68,0.25)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:"1.1vw", color:item.c, fontWeight:800 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize:"1vw", fontWeight:700, color:"rgba(255,255,255,0.95)", marginBottom:"0.4vh" }}>{item.title}</div>
                <div style={{ fontSize:"0.88vw", color:"rgba(255,255,255,0.55)", lineHeight:1.4 }}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:"1.6vh" }}>
          {[
            { icon:"✗", c:"#F87171", title:"Bills: पूरी तरह ठप", body:"10 July से अब तक — कोई भी contractor payment process नहीं हो सकी" },
            { icon:"!", c:"#FBBF24", title:"Training की कोई योजना नहीं", body:"Field offices, Divisional Accountants — कोई IFMS 3.0 training calendar नहीं" },
            { icon:"!", c:"#FBBF24", isGov:true, title:"Government Response", body:'IFMS site पर कुछ training videos डालकर सरकार ने "कर्तव्य पूरा" समझ लिया' },
          ].map((item, i) => (
            <div key={i} style={{ background: item.isGov ? "rgba(251,191,36,0.06)" : "rgba(255,255,255,0.05)", border:`1px solid rgba(${item.isGov ? "251,191,36" : "248,113,113"},0.2)`, borderRadius:"0.8vw", padding:"1.8vh 2vw", display:"flex", gap:"1.5vw", alignItems:"flex-start" }}>
              <div style={{ width:"2.2vw", height:"2.2vw", backgroundColor:`rgba(${item.isGov ? "251,191,36" : "239,68,68"},0.2)`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:"1.1vw", color:item.c, fontWeight:800 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize:"1vw", fontWeight:700, color: item.isGov ? "#FDE68A" : "rgba(255,255,255,0.95)", marginBottom:"0.4vh" }}>{item.title}</div>
                <div style={{ fontSize:"0.88vw", color:"rgba(255,255,255,0.55)", lineHeight:1.4 }}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:"2vh", fontSize:"0.9vw", color:"rgba(255,255,255,0.3)", fontWeight:500 }}>
        <div>Rajasthan PWD &amp; Irrigation — Contractor Payment System Investigation</div>
        <span>Slide 8 of 10</span>
      </div>
    </div>
  );
}
