export default function Slide05DarkSide() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #7F1D1D 0%, #450A0A 60%, #1A0303 100%)",
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
      <div style={{ position:"absolute", top:"-6vw", right:"-3vw", width:"20vw", height:"20vw", borderRadius:"50%", background:"rgba(248,113,113,0.07)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-4vw", left:"20%", width:"12vw", height:"12vw", borderRadius:"50%", background:"rgba(252,165,165,0.05)", pointerEvents:"none" }} />

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid rgba(255,255,255,0.15)", paddingBottom:"2vh" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"1vw" }}>
          <div style={{ width:"2vw", height:"2vw", backgroundColor:"#F87171", borderRadius:"0.4vw" }} />
          <div style={{ fontSize:"1.2vw", fontWeight:700, color:"rgba(255,255,255,0.9)" }}>PWD &amp; Irrigation Dept. — Rajasthan</div>
        </div>
        <div style={{ display:"flex", gap:"2vw", fontSize:"1vw", fontWeight:600, color:"rgba(255,255,255,0.4)" }}>
          <div>CHAPTER 4</div><div>DARK SIDE</div>
        </div>
      </div>

      <div>
        <div style={{ fontSize:"1.05vw", fontWeight:700, color:"#F87171", marginBottom:"0.8vh", textTransform:"uppercase", letterSpacing:"0.07em" }}>IFMS 2.0 — जो सामने नहीं आया</div>
        <div style={{ fontSize:"3vw", fontWeight:800, lineHeight:1.15 }}>IFMS 2.0 का अंधेरा पहलू: Scam और Overload</div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gridTemplateRows:"1fr 1fr", gap:"2vh 3vw" }}>
        {[
          { num:"1", title:"Morphed Photo Scam", body:"Physical progress reports में morphed photos upload करने का scam शुरू हो गया। काम हुआ नहीं, photos दिखाई दिए। कोई verification mechanism नहीं।", tag:"Scam Active — अनवरत जारी", tagColor:"#F87171" },
          { num:"2", title:"Training का पूर्ण अभाव", body:"Engineers और Staff को कोई प्रशिक्षण नहीं मिला। सब काम computer operators के ज़िम्मे। Electronic MB में measurement आज तक किसी contractor ने नहीं की।", tag:"Training: Zero", tagColor:"#F87171" },
          { num:"3", title:"Outsourcing Explosion", body:"Double workload से outsourcing centres ने काम हथिया लिया। प्रति Division ₹20 लाख/वर्ष — ~200 Divisions = ₹40 करोड़+ प्रतिवर्ष।", tag:"₹40 करोड़+ Annual Waste", tagColor:"#FBBF24" },
          { num:"4", title:"OTP — Accountability का पतन", body:"Divisional Accountants भी operators को OTP सौंपने लगे। संवेदनशील सरकारी प्रक्रिया पूरी तरह बाहरी हाथों में।", tag:"सरकारी जिम्मेदारी से पलायन", tagColor:"#FBBF24" },
        ].map(card => (
          <div key={card.num} style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(248,113,113,0.25)", borderRadius:"1vw", padding:"2vh 2vw", display:"flex", flexDirection:"column", gap:"1vh" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"1vw" }}>
              <div style={{ width:"2.2vw", height:"2.2vw", backgroundColor:"rgba(248,113,113,0.2)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ fontSize:"0.9vw", fontWeight:800, color:"#F87171" }}>{card.num}</span>
              </div>
              <div style={{ fontSize:"1.05vw", fontWeight:700, color:"#FECACA" }}>{card.title}</div>
            </div>
            <div style={{ fontSize:"0.9vw", color:"rgba(255,255,255,0.7)", lineHeight:1.5 }}>{card.body}</div>
            <div style={{ background:"rgba(255,255,255,0.07)", border:`1px solid ${card.tagColor}40`, borderRadius:"0.5vw", padding:"0.6vh 1vw", marginTop:"auto" }}>
              <div style={{ fontSize:"0.82vw", fontWeight:600, color:card.tagColor }}>{card.tag}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"1px solid rgba(255,255,255,0.12)", paddingTop:"2vh", fontSize:"0.9vw", color:"rgba(255,255,255,0.3)", fontWeight:500 }}>
        <div>Rajasthan PWD &amp; Irrigation — Contractor Payment System Investigation</div>
        <span>Slide 5 of 10</span>
      </div>
    </div>
  );
}
