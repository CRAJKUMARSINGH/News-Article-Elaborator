export default function Slide04IFMS20() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #1E3A8A 0%, #1e40af 40%, #0f2460 100%)",
        fontFamily: "'Noto Sans Devanagari', 'Noto Sans', system-ui, sans-serif",
        padding: "4vh 4vw",
        boxSizing: "border-box",
        display: "grid",
        gridTemplateColumns: "1fr 1.3fr",
        gridTemplateRows: "auto auto 1fr auto",
        gap: "2.5vh 4vw",
        color: "#FFFFFF",
        position: "relative",
      }}
    >
      <div style={{ position:"absolute", top:"-5vw", right:"-4vw", width:"20vw", height:"20vw", borderRadius:"50%", background:"rgba(96,165,250,0.08)", pointerEvents:"none" }} />

      {/* Header */}
      <div style={{ gridColumn:"1/-1", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid rgba(255,255,255,0.15)", paddingBottom:"2vh" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"1vw" }}>
          <div style={{ width:"2vw", height:"2vw", backgroundColor:"#60A5FA", borderRadius:"0.4vw" }} />
          <div style={{ fontSize:"1.2vw", fontWeight:700, color:"rgba(255,255,255,0.9)" }}>PWD &amp; Irrigation Dept. — Rajasthan</div>
        </div>
        <div style={{ display:"flex", gap:"2vw", fontSize:"1vw", fontWeight:600, color:"rgba(255,255,255,0.4)" }}>
          <div>CHAPTER 3</div><div>IFMS 2.0 — JAN 2025</div>
        </div>
      </div>

      {/* Title */}
      <div style={{ gridColumn:"1/-1" }}>
        <div style={{ fontSize:"1.05vw", fontWeight:700, color:"#60A5FA", marginBottom:"0.8vh", textTransform:"uppercase", letterSpacing:"0.07em" }}>
          सुधार का नया अध्याय
        </div>
        <div style={{ fontSize:"2.8vw", fontWeight:800, lineHeight:1.15 }}>
          IFMS 2.0 — महत्वाकांक्षी सुधार, नई उलझनें
        </div>
      </div>

      {/* Left */}
      <div style={{ display:"flex", flexDirection:"column", gap:"1.8vh" }}>
        <div style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(96,165,250,0.25)", borderRadius:"1vw", padding:"2.5vh 2.5vw" }}>
          <div style={{ fontSize:"1.05vw", fontWeight:700, color:"#93C5FD", marginBottom:"1.2vh" }}>जनवरी 2025 — अनिवार्य</div>
          <div style={{ fontSize:"0.95vw", color:"rgba(255,255,255,0.75)", lineHeight:1.6 }}>
            सभी नए कार्यों और अनुबंधों को IFMS 2.0 में दर्ज करना अनिवार्य। साथ में <strong style={{ color:"#60A5FA" }}>mb.rajasthan.gov.in</strong> पर Measurement Book की online entry।
          </div>
        </div>
        <div style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(96,165,250,0.25)", borderRadius:"1vw", padding:"2.5vh 2.5vw" }}>
          <div style={{ fontSize:"1.05vw", fontWeight:700, color:"#93C5FD", marginBottom:"1.2vh" }}>तीन नई समस्याएं</div>
          {["Document Overload — data इतना अधिक कि review असंभव","Electronic MB — contractor ने कभी measurement नहीं की","Outsourcing विस्फोट — ₹20 लाख/Division/वर्ष"].map((p, i) => (
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"1vw", marginBottom:"0.8vh", fontSize:"0.92vw", color:"rgba(255,255,255,0.7)" }}>
              <div style={{ width:"0.55vw", height:"0.55vw", backgroundColor:"#F87171", borderRadius:"50%", flexShrink:0, marginTop:"0.5vh" }} />
              {p}
            </div>
          ))}
        </div>
      </div>

      {/* Right — 7 IDs */}
      <div style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(96,165,250,0.2)", borderRadius:"1vw", padding:"2.5vh 2.5vw", display:"flex", flexDirection:"column", gap:"1.2vh" }}>
        <div style={{ fontSize:"1.05vw", fontWeight:700, color:"#93C5FD", marginBottom:"0.5vh" }}>7 अनिवार्य IDs — हर कार्य के लिए</div>
        {[
          ["Work-ID","कार्य की पहचान"],
          ["AS-ID","Admin Sanction"],
          ["TS-ID","Technical Sanction"],
          ["BOQ-ID","Bill of Quantity"],
          ["Package-ID","Package reference"],
          ["WO-ID","Work Order"],
          ["Abstract-ID","Bill Abstract"],
        ].map(([id, label], i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:"1.5vw", background:"rgba(255,255,255,0.06)", borderRadius:"0.6vw", padding:"1vh 1.5vw" }}>
            <div style={{ width:"1.8vw", height:"1.8vw", backgroundColor:"rgba(96,165,250,0.25)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <span style={{ fontSize:"0.75vw", fontWeight:800, color:"#60A5FA" }}>{i+1}</span>
            </div>
            <div>
              <div style={{ fontSize:"0.95vw", fontWeight:700, color:"#BFDBFE" }}>{id}</div>
              <div style={{ fontSize:"0.8vw", color:"rgba(255,255,255,0.45)" }}>{label}</div>
            </div>
          </div>
        ))}
        <div style={{ background:"rgba(248,113,113,0.15)", border:"1px solid rgba(248,113,113,0.3)", borderRadius:"0.6vw", padding:"1vh 1.5vw", marginTop:"0.5vh" }}>
          <div style={{ fontSize:"0.85vw", fontWeight:600, color:"#FCA5A5" }}>
            ~₹40 करोड़+ वार्षिक outsourcing नुकसान राज्य-स्तर पर
          </div>
        </div>
      </div>

      <div style={{ gridColumn:"1/-1", display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"1px solid rgba(255,255,255,0.12)", paddingTop:"2vh", fontSize:"0.9vw", color:"rgba(255,255,255,0.3)", fontWeight:500 }}>
        <div>Rajasthan PWD &amp; Irrigation — Contractor Payment System Investigation</div>
        <span>Slide 4 of 10</span>
      </div>
    </div>
  );
}
