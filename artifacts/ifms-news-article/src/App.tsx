import React, { useRef, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { motion, useInView } from 'framer-motion';
import {
  Share2,
  Printer,
  Link as LinkIcon,
  Twitter,
  Facebook,
  AlertOctagon,
  Clock,
  User,
  ArrowRight
} from 'lucide-react';

const queryClient = new QueryClient();

// Animation Wrapper Components
function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function Chapter({ number, title, children }: { number: number; title: ReactNode; children: ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative my-16 pt-8 group"
    >
      <div className="absolute top-0 left-0 text-[10rem] font-display font-bold leading-none text-muted opacity-30 -translate-x-12 -translate-y-8 pointer-events-none select-none transition-transform duration-1000 group-hover:scale-105">
        {number}
      </div>
      
      <div className="relative border-l-4 border-accent pl-6 mb-8 md:ml-0 ml-4">
        <h2 className="text-2xl md:text-3xl font-bold font-display text-primary leading-snug">
          {title}
        </h2>
      </div>
      <div className="prose prose-lg md:prose-xl prose-stone max-w-none text-foreground leading-relaxed font-serif tracking-normal md:pl-0 pl-4">
        {children}
      </div>
    </motion.section>
  );
}

function PullQuote({ children }: { children: ReactNode }) {
  return (
    <FadeIn>
      <blockquote className="my-14 mx-auto max-w-2xl text-center">
        <div className="border-t border-b border-accent py-8 px-6">
          <p className="text-2xl md:text-3xl font-display italic text-primary leading-relaxed font-semibold">
            {children}
          </p>
        </div>
      </blockquote>
    </FadeIn>
  );
}

function Article() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center overflow-x-hidden selection:bg-accent selection:text-white">
      {/* Top Bar / Masthead */}
      <header className="w-full bg-primary text-primary-foreground py-4 px-6 shadow-md border-b-4 border-accent relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <div className="text-xs font-sans tracking-widest uppercase text-accent-foreground/80 mb-1">
              खोजी पत्रकारिता | Investigative Journalism
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
              जन संवाददाता
            </h1>
          </div>
          <div className="flex flex-col items-center md:items-end font-sans text-sm text-primary-foreground/80 space-y-1">
            <span className="font-medium tracking-wide">2 August 2026</span>
            <span className="bg-primary-foreground/10 px-3 py-1 rounded-full text-xs font-medium border border-primary-foreground/20">
              PWD & Irrigation | Rajasthan
            </span>
          </div>
        </div>
      </header>

      {/* Article Container */}
      <article className="w-full max-w-3xl mx-auto px-6 pt-16 pb-24">
        
        {/* Headers */}
        <FadeIn>
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-foreground leading-tight mb-4">
              राजस्थान का डिजिटल<br className="hidden md:block"/> भुगतान संकट
            </h1>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground opacity-90 leading-tight mb-8">
              Rajasthan's Digital Payment Crisis
            </h2>
            
            <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
            
            <p className="text-xl md:text-2xl font-serif text-muted-foreground italic mb-10 max-w-2xl mx-auto leading-relaxed">
              IFMS 3.0 Portal: जब सरकार ने ठेकेदारों का भुगतान बंद कर दिया — एक खोजी रिपोर्ट
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 font-sans text-sm mb-12 border-y border-border py-4">
              <div className="flex items-center gap-2">
                <User size={16} className="text-accent" />
                <span className="font-semibold text-foreground uppercase tracking-wider">संवाददाता | Reporter</span>
              </div>
              <span className="hidden md:inline text-muted-foreground">•</span>
              <div className="text-muted-foreground flex items-center gap-2">
                Special Correspondent, PWD & Irrigation Bureau
              </div>
              <span className="hidden md:inline text-muted-foreground">•</span>
              <div className="text-muted-foreground flex items-center gap-2">
                <Clock size={16} />
                <span>12 min read</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Key Facts Box */}
        <FadeIn delay={0.2}>
          <div className="bg-primary text-primary-foreground rounded-sm shadow-xl p-8 mb-16 relative overflow-hidden border border-primary/20">
            <div className="absolute -right-10 -top-10 text-white/5 rotate-12 pointer-events-none">
              <AlertOctagon size={200} />
            </div>
            
            <h3 className="font-display text-2xl font-bold mb-6 text-accent-foreground border-b border-primary-foreground/20 pb-4 flex items-center gap-3">
              <AlertOctagon className="text-accent" />
              At A Glance
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 font-sans relative z-10">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></div>
                <p className="text-lg leading-snug"><strong className="text-white">~200 PWD Divisions</strong> प्रभावित</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></div>
                <p className="text-lg leading-snug"><strong className="text-white">₹20 लाख/वर्ष</strong> प्रति Division अतिरिक्त outsourcing लागत</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-destructive mt-2 shrink-0 animate-pulse"></div>
                <p className="text-lg leading-snug"><strong className="text-white">₹40 करोड़+ प्रतिवर्ष</strong> कुल राज्य-स्तरीय नुकसान</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></div>
                <p className="text-lg leading-snug"><strong className="text-white">14 वर्षों तक</strong> WAM portal ने काम किया (2012–2026)</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-destructive mt-2 shrink-0 animate-pulse"></div>
                <p className="text-lg leading-snug"><strong className="text-white">10 July 2026 से</strong> भुगतान पूरी तरह ठप</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-destructive mt-2 shrink-0 animate-pulse"></div>
                <p className="text-lg leading-snug"><strong className="text-white">IFMS 3.0: 1 August 2026 तक भी</strong> portal systematic नहीं</p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Story Body */}
        
        <Chapter number={1} title="WAM Portal — नींव और वादा (2012)">
          <p>
            वर्ष 2012 में Rajasthan सरकार ने एक महत्वाकांक्षी कदम उठाया। PWD (Public Works Department) और Irrigation Department के ठेकेदारों को उनका भुगतान online करने के लिए WAM portal (wam.rajasthan.gov.in) लॉन्च किया गया। साथ ही PayManager (paymanager.rajasthan.gov.in) से integration हुई, जिसके माध्यम से संबंधित treasury सीधे contractor के bank account में payment जमा करने लगी।
          </p>
          <p>
            यह प्रणाली दो स्तंभों पर टिकी थी: <strong>पारदर्शिता और दक्षता</strong>। कागज़ी प्रक्रिया का अंत, बिचौलियों की समाप्ति, और समय पर भुगतान — यही इसका वादा था। 14 वर्षों तक, अपनी तमाम खामियों के बावजूद, यह प्रणाली काम करती रही।
          </p>
        </Chapter>

        <PullQuote>
          "यह प्रणाली 14 वर्षों तक — कमियों के बावजूद — payments करती रही। 6 July 2026 तक सब संतोषजनक था।"
        </PullQuote>

        <Chapter number={2} title="WAM की छुपी खामियां — जो कभी नहीं सुधरीं">
          <div className="space-y-8">
            <div>
              <h3 className="font-sans font-bold text-xl text-primary mb-2 flex items-center gap-2">
                <span className="bg-destructive/10 text-destructive px-2 py-1 rounded text-sm uppercase tracking-wide">खामी #1</span> 
                Bill Submission — केवल काग़ज़ पर
              </h3>
              <p>
                WAM portal की पहली और सबसे बड़ी कमज़ोरी यह थी कि contractor खुद bill नहीं बनाते थे। प्रत्येक ज़िले में गिने-चुने contractors ही स्वयं bill बनाकर submit करते थे। बाकी की ज़िम्मेदारी केवल काग़ज़ी अनुबंध (contract) में ही रह गई।
              </p>
            </div>
            
            <div>
              <h3 className="font-sans font-bold text-xl text-primary mb-2 flex items-center gap-2">
                <span className="bg-destructive/10 text-destructive px-2 py-1 rounded text-sm uppercase tracking-wide">खामी #2</span> 
                Transparency — शून्य
              </h3>
              <p>
                Portal पर नागरिकों के लिए कोई भी transparency window नहीं थी। आम जनता bill की स्थिति, payment history, या contractor payments की जानकारी नहीं देख सकती थी। Taxpayers का पैसा कहाँ जा रहा था — यह जानने का कोई सार्वजनिक रास्ता नहीं था।
              </p>
            </div>
          </div>
          <p className="mt-6 font-semibold italic text-destructive">
            ये दोनों कमज़ोरियाँ IFMS 2.0 में भी बनी रहीं। और अब IFMS 3.0 में भी ये मुद्दे अनसुलझे हैं।
          </p>
        </Chapter>

        <Chapter number={3} title="IFMS 2.0 — महत्वाकांक्षी सुधार, नई उलझनें (जनवरी 2025)">
          <p>
            जनवरी 2025 से राजस्थान सरकार ने सभी नए कार्यों और अनुबंधों को IFMS 2.0 में दर्ज करना अनिवार्य किया। इसके तहत प्रत्येक कार्य के लिए सात प्रकार की IDs generate करना और mb.rajasthan.gov.in पर Measurement Book की online entry अनिवार्य की गई:
          </p>
          
          <div className="bg-secondary/50 p-6 rounded-sm border border-border my-6">
            <h4 className="font-sans font-bold text-lg mb-4 text-primary uppercase tracking-wide text-center">7 अनिवार्य IDs</h4>
            <div className="flex flex-wrap justify-center gap-3 font-sans text-sm font-medium">
              {['Work-ID', 'AS-ID (Admin Sanction)', 'TS-ID (Tech Sanction)', 'BOQ-ID (Bill of Quantity)', 'Package-ID', 'WO-ID (Work Order)', 'Abstract-ID (Bill Abstract)'].map(id => (
                <span key={id} className="bg-white border border-border px-3 py-1.5 rounded-sm shadow-sm">{id}</span>
              ))}
            </div>
          </div>

          <p>
            इस व्यवस्था में bills को WAM portal से electronically integrate किया जाना था। सिद्धांत में यह एक उत्कृष्ट व्यवस्था थी। व्यवहार में, यह तीन नई समस्याओं का जन्म बन गई:
          </p>

          <ul className="space-y-6 mt-8 list-none pl-0">
            <li className="relative pl-6">
              <span className="absolute left-0 top-1.5 w-2 h-2 bg-accent rounded-full"></span>
              <strong className="font-sans text-lg text-primary block mb-1">समस्या 1 — Document Overload:</strong> 
              PayManager में इतने papers upload करने की औपचारिकता जोड़ी गई कि कोई भी अधिकारी पूरे documents पढ़ ही नहीं सकता था। Data इतना अधिक हो गया कि meaningful review असंभव था।
            </li>
            <li className="relative pl-6">
              <span className="absolute left-0 top-1.5 w-2 h-2 bg-accent rounded-full"></span>
              <strong className="font-sans text-lg text-primary block mb-1">समस्या 2 — Electronic MB: एक कागज़ी सुधार:</strong> 
              Electronic Measurement Book में measurement contractor/vendor के माध्यम से पहले दर्ज होना था। लेकिन आज तक किसी भी contractor ने यह काम नहीं किया।
            </li>
            <li className="relative pl-6">
              <span className="absolute left-0 top-1.5 w-2 h-2 bg-destructive rounded-full"></span>
              <strong className="font-sans text-lg text-destructive block mb-1">समस्या 3 — Outsourcing विस्फोट:</strong> 
              Staff और engineers पर physical work के साथ-साथ IFMS entry का double workload इतना बढ़ गया कि outsourcing computer centres ने काम हथिया लिया। परिणामस्वरूप प्रत्येक PWD Division पर लगभग ₹20 लाख प्रतिवर्ष की अतिरिक्त outsourcing लागत बढ़ गई। राज्य में ~200 PWD Divisions हैं — <strong>कुल वार्षिक नुकसान: ₹40 करोड़ से अधिक।</strong>
            </li>
          </ul>
        </Chapter>

        <Chapter number={4} title="IFMS 2.0 का अंधेरा पहलू — Scam और Accountability का पतन">
          <div className="space-y-6">
            <div className="p-6 bg-destructive/5 border-l-4 border-destructive">
              <h3 className="font-sans font-bold text-xl text-destructive mb-2">Morphed Photo Scam</h3>
              <p className="text-foreground">
                Physical progress reports में digitally edited (morphed) photos upload करने का scam शुरू हो गया। काम ज़मीन पर नहीं हुआ, लेकिन photos portal पर upload हो गए। इस scam को रोकने का कोई mechanism नहीं था।
              </p>
            </div>
            
            <div className="p-6 bg-destructive/5 border-l-4 border-destructive">
              <h3 className="font-sans font-bold text-xl text-destructive mb-2">OTP का दुरुपयोग</h3>
              <p className="text-foreground">
                Engineers और staff को IFMS पर कोई समग्र प्रशिक्षण नहीं दिया गया। घोर लापरवाही में, Divisional Accountants तक ने अपना OTP outsourcing computer operators को दे दिया। सरकारी प्रक्रिया पूरी तरह बाहरी, unqualified hands में चली गई।
              </p>
            </div>
          </div>
        </Chapter>

        <PullQuote>
          "Divisional Accountants भी operators को OTP देते हैं। सरकारी accountability पूरी तरह outsource हो गई।"
        </PullQuote>

        <Chapter number={5} title="वह काली जुलाई — WAM बंद, IFMS 3.0 तैयार नहीं (July 2026)">
          <p className="mb-8">
            इस migration का काम NIC Rajasthan की एक ऐसी team को सौंपा गया जो इस काम के लिए पर्याप्त अनुभवी नहीं थी। Data import, portal integration, और system को stable करने का काम — जो पहले ही शुरू होना चाहिए था — अब भी अधूरा था।
          </p>

          <div className="relative border-l-2 border-border ml-4 md:ml-6 space-y-10 pb-8">
            <div className="relative pl-8">
              <div className="absolute w-4 h-4 rounded-full bg-accent border-4 border-background -left-[9px] top-1"></div>
              <h4 className="font-sans font-bold text-lg text-primary">2 July 2026</h4>
              <p className="mt-1">
                Finance Department ने PWD और Irrigation के अधिकारियों को training दी। घोषणा हुई: WAM portal की जगह अब सभी bills IFMS 3.0 portal से होंगे।
              </p>
            </div>
            <div className="relative pl-8">
              <div className="absolute w-4 h-4 rounded-full bg-accent border-4 border-background -left-[9px] top-1"></div>
              <h4 className="font-sans font-bold text-lg text-primary">6 July 2026</h4>
              <p className="mt-1">
                WAM portal पर आखिरी बार सामान्य payment processing हुई।
              </p>
            </div>
            <div className="relative pl-8">
              <div className="absolute w-5 h-5 rounded-full bg-destructive border-4 border-background -left-[11px] top-1"></div>
              <h4 className="font-sans font-bold text-lg text-destructive">10 July 2026</h4>
              <p className="mt-1 font-semibold">
                WAM portal पर bill processing पूरी तरह बंद कर दी गई।
              </p>
            </div>
          </div>

          <div className="bg-primary text-primary-foreground p-6 rounded-sm mt-8">
            <h4 className="font-sans font-bold text-lg text-accent-foreground mb-2 flex items-center gap-2">
              <AlertOctagon size={20} />
              1 August 2026 की स्थिति
            </h4>
            <p className="font-serif">
              Portal अभी भी systematic नहीं। Vendor names दिखते नहीं। Security deposits integrate नहीं हुई। Bills ठप। और ना जाने क्यों — <em>सभी contractors माैन हैं।</em>
            </p>
          </div>
        </Chapter>

        <Chapter number={6} title="IFMS 3.0 — कागज़ पर सुरक्षित, ज़मीन पर खोखली">
          <div className="grid md:grid-cols-2 gap-8 my-8">
            <div className="border border-border p-6 bg-white rounded-sm shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
              <h3 className="font-sans font-bold text-lg text-primary mb-3">सरकार का vision</h3>
              <h4 className="font-display font-semibold text-xl mb-4">Maker-Checker-Approver</h4>
              <p className="text-sm md:text-base">
                नए system में तीन-स्तरीय bill verification की योजना थी: Maker (bill बनाता है), Checker (जाँचता है), Approver (approve करता है)। Electronic Measurement Book से linked, पारदर्शी, fraud-proof।
              </p>
            </div>

            <div className="border border-destructive/30 p-6 bg-destructive/5 rounded-sm shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-destructive"></div>
              <h3 className="font-sans font-bold text-lg text-destructive mb-3">ज़मीनी हकीक़त</h3>
              <p className="text-sm md:text-base">
                हमारे संवाददाता के अनुसार, यदि किसी XEN (Executive Engineer) का interview लिया जाए तो 90% XEN IFMS portal का inbox तक login नहीं कर पाएंगे। Engineers ने computer operators को केवल OTP दे दिया है। नतीजतन, एक ही बाहरी operator Maker, Checker, और Approver — तीनों roles निभाता है।
              </p>
            </div>
          </div>
          
          <p className="text-center font-bold text-xl text-primary italic px-4">
            तीन-स्तरीय जाँच की आत्मा नष्ट हो गई। सरकार का खर्च फिर भी बढ़ा।
          </p>
        </Chapter>

        <PullQuote>
          "90% XEN IFMS portal का inbox तक login नहीं कर पाएंगे। एक operator तीनों roles निभाता है।"
        </PullQuote>

        <Chapter number={7} title="1 August 2026 — Portal Status Dashboard">
          <p className="mb-6">Portal पर अभी तक:</p>
          
          <div className="space-y-4 mb-8 font-sans">
            {[
              { text: "Vendor/Contractor names appear नहीं हो रहे", critical: true },
              { text: "Names किसी alphabetical क्रम में नहीं — खोजना असंभव", critical: false },
              { text: "Contractor की जमा Security Deposit का online record integrate नहीं", critical: true },
              { text: "Bills: 10 July से पूरी तरह ठप", critical: true },
              { text: "Training की कोई योजना नहीं — न field offices के लिए, न Divisional Accountants के लिए", critical: false }
            ].map((item, i) => (
              <div key={i} className={`p-4 rounded-sm border-l-4 flex items-start gap-4 ${item.critical ? 'bg-destructive/10 border-destructive text-destructive-foreground font-medium' : 'bg-secondary border-muted-foreground/50'}`}>
                {item.critical ? <AlertOctagon className="text-destructive shrink-0 mt-0.5" size={20}/> : <div className="w-2 h-2 rounded-full bg-muted-foreground mt-2 shrink-0"></div>}
                <span className={item.critical ? 'text-destructive font-semibold text-lg' : 'text-foreground'}>{item.text}</span>
              </div>
            ))}
          </div>

          <div className="p-6 bg-white border border-border italic text-center text-lg text-muted-foreground shadow-sm">
            <strong>Government का response:</strong> IFMS site पर कुछ training videos डालकर सरकार ने अपने "कर्तव्य की खानापूरी" कर ली।
          </div>
        </Chapter>

        <Chapter number={8} title="पाँच तत्काल माँगें">
          <div className="space-y-6 counters">
            {[
              {
                title: "नागरिक पारदर्शिता:",
                desc: "हर नागरिक को bill की स्थिति और दस्तावेज़ मुफ़्त में देखने की सुविधा IFMS 3.0 में जोड़ी जाए।"
              },
              {
                title: "Maker-Checker-Approver: वास्तविक पृथक्करण:",
                desc: "तीनों roles अलग-अलग अधिकारी निभाएं। Computer operator को OTP देने की प्रथा तत्काल बंद हो।"
              },
              {
                title: "समग्र, अनिवार्य Training:",
                desc: "हर field office — हर XEN, हर Divisional Accountant — के लिए mandatory IFMS 3.0 training।"
              },
              {
                title: "Portal तत्काल Fix:",
                desc: "Vendor names और security deposits को तत्काल integrate करे NIC Rajasthan — deadline तय हो, accountability तय हो।"
              },
              {
                title: "Independent Monitoring Committee:",
                desc: "System की नियमित, स्वतंत्र समीक्षा। एक independent committee जो विभाग और सरकार से बाहर हो।"
              }
            ].map((demand, i) => (
              <div key={i} className="flex gap-4 items-start bg-white p-5 border border-border/50 rounded-sm hover:shadow-md transition-shadow">
                <span className="font-display font-bold text-3xl text-accent shrink-0 w-8 text-center">{i + 1}</span>
                <div>
                  <h4 className="font-sans font-bold text-lg text-primary">{demand.title}</h4>
                  <p className="text-foreground/80 mt-1">{demand.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Chapter>

        <Chapter number={9} title="लोकतंत्र के चौथे स्तंभ से आह्वान">
          <p>
            लोकतंत्र के चौथे स्तंभ — प्रेस — को इस मुद्दे पर एक साथ sting operation कर इस बात को जगज़ाहिर करना चाहिए कि:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-6 text-lg marker:text-accent">
            <li>90% XEN portal पर login तक नहीं कर सकते</li>
            <li>एक operator तीनों roles Maker, Checker, Approver निभाता है</li>
            <li>ठेकेदार भुगतान ठप होने के बाद भी माैन क्यों हैं</li>
            <li>Morphed photos का scam कब तक चलेगा</li>
          </ul>
          <p>
            साथ ही, IFMS 3.0 portal को public audit के दायरे में लाया जाए। जन भुगतान प्रणाली में जनता की निगरानी अनिवार्य है — यह लोकहित का मामला है।
          </p>
        </Chapter>

      </article>

      {/* Closing Statement - Full Width */}
      <FadeIn>
        <div className="w-full bg-primary py-20 px-6 border-t-8 border-accent">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight italic">
              "जब तक system की monitoring नहीं होगी, तब तक यही होगा — सरकार काम करती रहेगी, जनता का पैसा डूबता रहेगा।"
            </h2>
          </div>
        </div>
      </FadeIn>

      {/* Footer Share Visual */}
      <footer className="w-full bg-background border-t border-border py-12 px-6">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <p className="font-sans font-bold text-primary mb-6 uppercase tracking-widest text-sm">इस रिपोर्ट को साझा करें</p>
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
              <Twitter size={20} />
            </button>
            <button className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
              <Facebook size={20} />
            </button>
            <button className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
              <LinkIcon size={20} />
            </button>
            <button className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
              <Printer size={20} />
            </button>
          </div>
          <div className="mt-12 text-center text-sm font-sans text-muted-foreground">
            <p className="mb-2">© 2026 जन संवाददाता. All rights reserved.</p>
            <p>Independent Investigative Journalism from Rajasthan.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Article} />
      {/* Fallback to Article as this is a single page application */}
      <Route component={Article} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;