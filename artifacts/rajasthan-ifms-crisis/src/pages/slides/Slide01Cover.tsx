export default function Slide01Cover() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #312E81 0%, #1E1B4B 60%, #0F0A2E 100%)",
        fontFamily: "'Noto Sans Devanagari', 'Noto Sans', system-ui, sans-serif",
        padding: "4vh 4vw",
        boxSizing: "border-box",
        display: "grid",
        gridTemplateColumns: "3fr 2fr",
        gridTemplateRows: "auto 1fr auto",
        gap: "3vh 4vw",
        color: "#FFFFFF",
        position: "relative",
      }}
    >
      {/* decorative circles */}
      <div style={{ position:"absolute", top:"-8vw", right:"-4vw", width:"22vw", height:"22vw", borderRadius:"50%", background:"rgba(251,191,36,0.07)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-6vw", left:"30%", width:"16vw", height:"16vw", borderRadius:"50%", background:"rgba(99,102,241,0.15)", pointerEvents:"none" }} />

      {/* Header */}
      <div
        style={{
          gridColumn: "1 / -1",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.18)",
          paddingBottom: "2vh",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
          <div style={{ width: "2vw", height: "2vw", backgroundColor: "#FBBF24", borderRadius: "0.4vw" }} />
          <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>PWD &amp; Irrigation Dept. — Rajasthan</div>
        </div>
        <div style={{ display: "flex", gap: "2vw", fontSize: "1vw", fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>
          <div>IFMS INVESTIGATION</div>
          <div>2026</div>
        </div>
      </div>

      {/* Left — Main Content */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "2.5vh" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.8vw",
            background: "rgba(251,191,36,0.15)",
            border: "1px solid rgba(251,191,36,0.35)",
            borderRadius: "2vw",
            padding: "0.7vh 1.5vw",
            width: "fit-content",
          }}
        >
          <div style={{ width: "0.6vw", height: "0.6vw", backgroundColor: "#FBBF24", borderRadius: "50%" }} />
          <div style={{ fontSize: "0.9vw", fontWeight: 700, color: "#FDE68A", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            खोजी रिपोर्ट — Investigative Report
          </div>
        </div>

        <div style={{ fontSize: "4.5vw", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          राजस्थान का<br />
          <span style={{ color: "#FBBF24" }}>डिजिटल भुगतान</span><br />
          संकट
        </div>

        <div style={{ fontSize: "1.15vw", color: "rgba(255,255,255,0.7)", lineHeight: 1.5, maxWidth: "90%" }}>
          IFMS 3.0 Portal: जब सरकार ने ठेकेदारों का भुगतान बंद कर दिया
        </div>

        {/* KPI Cards */}
        <div style={{ display: "flex", gap: "2vw", marginTop: "1vh" }}>
          <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "0.8vw", padding: "1.5vh 2vw" }}>
            <div style={{ fontSize: "0.75vw", fontWeight: 700, color: "#FDE68A", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.4vh" }}>Affected Divisions</div>
            <div style={{ fontSize: "2.2vw", fontWeight: 800, color: "#FFFFFF" }}>~200</div>
            <div style={{ fontSize: "0.75vw", color: "rgba(255,255,255,0.5)" }}>PWD Divs</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "0.8vw", padding: "1.5vh 2vw" }}>
            <div style={{ fontSize: "0.75vw", fontWeight: 700, color: "#FDE68A", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.4vh" }}>Annual Loss / Div</div>
            <div style={{ fontSize: "2.2vw", fontWeight: 800, color: "#FFFFFF" }}>₹20L+</div>
            <div style={{ fontSize: "0.75vw", color: "rgba(255,255,255,0.5)" }}>Wasted</div>
          </div>
        </div>
      </div>

      {/* Right — Report Panel */}
      <div
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
          borderRadius: "1.2vw",
          padding: "3vh 2.5vw",
          display: "flex",
          flexDirection: "column",
          gap: "2vh",
          alignSelf: "center",
        }}
      >
        <div style={{ fontSize: "1.1vw", fontWeight: 700, color: "rgba(255,255,255,0.9)", borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: "1.5vh" }}>
          Report At A Glance
        </div>
        {[
          { label: "PERIOD COVERED", val: "2012 – August 2026" },
          { label: "DEPARTMENTS", val: "PWD & Irrigation, Rajasthan" },
          { label: "PORTALS TRACED", val: "WAM → IFMS 2.0 → IFMS 3.0" },
          { label: "WAM SERVED", val: "14 Years (2012–2026)", color: "#FBBF24" },
        ].map((item) => (
          <div key={item.label}>
            <div style={{ fontSize: "0.7vw", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3vh" }}>{item.label}</div>
            <div style={{ fontSize: "0.95vw", fontWeight: 600, color: item.color || "rgba(255,255,255,0.85)" }}>{item.val}</div>
          </div>
        ))}
        <div style={{ background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.4)", borderRadius: "0.6vw", padding: "1.2vh 1.5vw", marginTop: "0.5vh" }}>
          <div style={{ fontSize: "0.7vw", fontWeight: 700, color: "#FCA5A5", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.3vh" }}>CURRENT STATUS</div>
          <div style={{ fontSize: "0.95vw", fontWeight: 700, color: "#FCA5A5" }}>Payments Completely Stopped</div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          gridColumn: "1 / -1",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingTop: "2vh",
          fontSize: "0.9vw",
          color: "rgba(255,255,255,0.35)",
          fontWeight: 500,
        }}
      >
        <div>Rajasthan PWD &amp; Irrigation — Contractor Payment System Investigation</div>
        <span>Slide 1 of 10</span>
      </div>
    </div>
  );
}
