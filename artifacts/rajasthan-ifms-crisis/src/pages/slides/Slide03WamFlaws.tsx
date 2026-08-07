export default function Slide03WamFlaws() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #7C2D12 0%, #431407 60%, #1C0A03 100%)",
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
      <div style={{ position:"absolute", top:"-6vw", right:"-3vw", width:"18vw", height:"18vw", borderRadius:"50%", background:"rgba(251,146,60,0.08)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-5vw", left:"5%", width:"14vw", height:"14vw", borderRadius:"50%", background:"rgba(253,186,116,0.06)", pointerEvents:"none" }} />

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid rgba(255,255,255,0.15)", paddingBottom:"2vh" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"1vw" }}>
          <div style={{ width:"2vw", height:"2vw", backgroundColor:"#FB923C", borderRadius:"0.4vw" }} />
          <div style={{ fontSize:"1.2vw", fontWeight:700, color:"rgba(255,255,255,0.9)" }}>PWD &amp; Irrigation Dept. — Rajasthan</div>
        </div>
        <div style={{ display:"flex", gap:"2vw", fontSize:"1vw", fontWeight:600, color:"rgba(255,255,255,0.4)" }}>
          <div>CHAPTER 2</div><div>WAM — HIDDEN FLAWS</div>
        </div>
      </div>

      {/* Title */}
      <div>
        <div style={{ fontSize:"1.05vw", fontWeight:700, color:"#FB923C", marginBottom:"0.8vh", textTransform:"uppercase", letterSpacing:"0.07em" }}>
          जो कभी नहीं सुधरा
        </div>
        <div style={{ fontSize:"3vw", fontWeight:800, lineHeight:1.15 }}>
          WAM की छुपी खामियां — 14 साल बाद भी
        </div>
      </div>

      {/* Two flaw cards + status bar */}
      <div style={{ display:"flex", flexDirection:"column", gap:"2vh" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3vw" }}>
          {/* Flaw 1 */}
          <div style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(251,146,60,0.3)", borderRadius:"1vw", padding:"3vh 2.5vw", display:"flex", flexDirection:"column", gap:"1.5vh" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"1vw" }}>
              <div style={{ width:"3vw", height:"3vw", backgroundColor:"rgba(251,146,60,0.2)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <div style={{ fontSize:"1.2vw", fontWeight:800, color:"#FB923C" }}>1</div>
              </div>
              <div style={{ fontSize:"1.2vw", fontWeight:700, color:"#FDBA74" }}>Bill Submission — केवल काग़ज़ पर</div>
            </div>
            <div style={{ fontSize:"1vw", color:"rgba(255,255,255,0.75)", lineHeight:1.6 }}>
              ज़िले में गिने-चुने contractors ही स्वयं bill बनाकर submit करते थे। बाकी की ज़िम्मेदारी केवल काग़ज़ी अनुबंध में ही रह गई।
            </div>
            <div style={{ background:"rgba(251,146,60,0.15)", border:"1px solid rgba(251,146,60,0.3)", borderRadius:"0.5vw", padding:"0.8vh 1vw" }}>
              <div style={{ fontSize:"0.85vw", fontWeight:600, color:"#FED7AA" }}>Digital system — केवल नाम का। Field reality अलग।</div>
            </div>
          </div>

          {/* Flaw 2 */}
          <div style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(251,146,60,0.3)", borderRadius:"1vw", padding:"3vh 2.5vw", display:"flex", flexDirection:"column", gap:"1.5vh" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"1vw" }}>
              <div style={{ width:"3vw", height:"3vw", backgroundColor:"rgba(251,146,60,0.2)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <div style={{ fontSize:"1.2vw", fontWeight:800, color:"#FB923C" }}>2</div>
              </div>
              <div style={{ fontSize:"1.2vw", fontWeight:700, color:"#FDBA74" }}>Transparency — शून्य</div>
            </div>
            <div style={{ fontSize:"1vw", color:"rgba(255,255,255,0.75)", lineHeight:1.6 }}>
              Portal पर नागरिकों के लिए कोई transparency window नहीं। Taxpayers का पैसा कहाँ जा रहा था — जानने का कोई सार्वजनिक रास्ता नहीं।
            </div>
            <div style={{ background:"rgba(251,146,60,0.15)", border:"1px solid rgba(251,146,60,0.3)", borderRadius:"0.5vw", padding:"0.8vh 1vw" }}>
              <div style={{ fontSize:"0.85vw", fontWeight:600, color:"#FED7AA" }}>जनता के पैसे पर — जनता की कोई नज़र नहीं।</div>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div style={{ background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:"0.8vw", padding:"1.8vh 2.5vw", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:"1vw", fontWeight:600, color:"rgba(255,255,255,0.9)", marginBottom:"0.3vh" }}>14 साल की खामियाँ — आज भी अनसुलझी</div>
            <div style={{ fontSize:"0.9vw", color:"rgba(255,255,255,0.55)" }}>IFMS 2.0 में भी यही कमियाँ रहीं। IFMS 3.0 में अभी भी ये मुद्दे अनसुलझे हैं।</div>
          </div>
          <div style={{ background:"rgba(239,68,68,0.25)", border:"1px solid rgba(239,68,68,0.4)", borderRadius:"2vw", padding:"0.8vh 2vw", fontSize:"0.9vw", fontWeight:700, color:"#FCA5A5", flexShrink:0 }}>
            अनसुलझा — Unresolved
          </div>
        </div>
      </div>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"1px solid rgba(255,255,255,0.12)", paddingTop:"2vh", fontSize:"0.9vw", color:"rgba(255,255,255,0.3)", fontWeight:500 }}>
        <div>Rajasthan PWD &amp; Irrigation — Contractor Payment System Investigation</div>
        <span>Slide 3 of 10</span>
      </div>
    </div>
  );
}
