export default function Slide10Media() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #1C0533 0%, #150026 50%, #0A0012 100%)",
        fontFamily: "'Noto Sans Devanagari', 'Noto Sans', system-ui, sans-serif",
        padding: "4vh 4vw",
        boxSizing: "border-box",
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto 1fr auto auto",
        gap: "2vh",
        color: "#FFFFFF",
        position: "relative",
      }}
    >
      <div style={{ position:"absolute", top:"-5vw", right:"-4vw", width:"20vw", height:"20vw", borderRadius:"50%", background:"rgba(251,191,36,0.06)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-4vw", left:"5%", width:"16vw", height:"16vw", borderRadius:"50%", background:"rgba(253,224,71,0.04)", pointerEvents:"none" }} />

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid rgba(255,255,255,0.15)", paddingBottom:"2vh" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"1vw" }}>
          <div style={{ width:"2vw", height:"2vw", backgroundColor:"#FBBF24", borderRadius:"0.4vw" }} />
          <div style={{ fontSize:"1.2vw", fontWeight:700, color:"rgba(255,255,255,0.9)" }}>PWD &amp; Irrigation Dept. — Rajasthan</div>
        </div>
        <div style={{ display:"flex", gap:"2vw", fontSize:"1vw", fontWeight:600, color:"rgba(255,255,255,0.4)" }}>
          <div>CHAPTER 9 — FINAL</div><div>MEDIA &amp; ACCOUNTABILITY</div>
        </div>
      </div>

      <div>
        <div style={{ fontSize:"1.05vw", fontWeight:700, color:"#FBBF24", marginBottom:"0.8vh", textTransform:"uppercase", letterSpacing:"0.07em" }}>लोकतंत्र का चौथा स्तंभ</div>
        <div style={{ fontSize:"2.8vw", fontWeight:800, lineHeight:1.15 }}>मीडिया की ज़िम्मेदारी — अब बोलने का वक्त है</div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5vh 3vw" }}>
        {[
          { n:1, title:"Sting Operation — XEN Login Test", body:"90% XEN portal पर login तक नहीं कर सकते — यह interview और sting operation से जगज़ाहिर किया जाए" },
          { n:2, title:"एक Operator, तीन Roles — Expose करो", body:"Maker + Checker + Approver — एक ही बाहरी operator कैसे तीनों roles निभाता है, यह उजागर हो" },
          { n:3, title:"ठेकेदारों की चुप्पी — जाँच हो", body:"Payment ठप होने के बाद भी contractors माैन क्यों हैं? यह सवाल मीडिया को पूछना होगा" },
          { n:4, title:"Morphed Photo Scam — उजागर हो", body:"Physical progress में जो morphed photos अपलोड हो रही हैं, उनकी जाँच और खुलासा ज़रूरी है" },
          { n:5, title:"IFMS 3.0 — Public Audit की माँग", body:"IFMS 3.0 portal को public audit के दायरे में लाया जाए — NIC Rajasthan को जवाबदेह बनाया जाए" },
          { n:6, title:"जनता की निगरानी — अनिवार्य", body:"जन भुगतान प्रणाली में जनता की निगरानी अनिवार्य है — यह लोकहित का मामला है" },
        ].map(d => (
          <div key={d.n} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(251,191,36,0.2)", borderRadius:"0.8vw", padding:"1.5vh 2vw", display:"flex", gap:"1.2vw", alignItems:"flex-start" }}>
            <div style={{ width:"2.5vw", height:"2.5vw", backgroundColor:"rgba(251,191,36,0.18)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:"1vw", fontWeight:800, color:"#FBBF24" }}>{d.n}</div>
            <div>
              <div style={{ fontSize:"0.95vw", fontWeight:700, color:"rgba(255,255,255,0.95)", marginBottom:"0.3vh" }}>{d.title}</div>
              <div style={{ fontSize:"0.85vw", color:"rgba(255,255,255,0.55)", lineHeight:1.4 }}>{d.body}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Closing statement */}
      <div style={{ background:"rgba(251,191,36,0.1)", border:"1px solid rgba(251,191,36,0.3)", borderRadius:"1vw", padding:"2vh 3vw", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"3vw" }}>
        <div style={{ fontSize:"1.1vw", fontWeight:600, color:"rgba(255,255,255,0.9)", lineHeight:1.5, flex:1, fontStyle:"italic" }}>
          "जब तक system की monitoring नहीं होगी, तब तक यही होगा — सरकार काम करती रहेगी, जनता का पैसा डूबता रहेगा।"
        </div>
        <div style={{ background:"#FBBF24", color:"#1C0533", padding:"1.2vh 2.5vw", borderRadius:"0.6vw", fontSize:"0.95vw", fontWeight:800, flexShrink:0, letterSpacing:"0.02em" }}>
          Press Must Act Now
        </div>
      </div>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"1px solid rgba(255,255,255,0.12)", paddingTop:"1.5vh", fontSize:"0.9vw", color:"rgba(255,255,255,0.3)", fontWeight:500 }}>
        <div>Rajasthan PWD &amp; Irrigation — Contractor Payment System Investigation</div>
        <span>Slide 10 of 10</span>
      </div>
    </div>
  );
}
