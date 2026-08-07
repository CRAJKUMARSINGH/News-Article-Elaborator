# -*- coding: utf-8 -*-
"""
CLEAN FULL REGENERATION — All exports from scratch.
Includes every chapter through Session end (Recovery Portal chapter).
"""
import os, textwrap
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from pptx import Presentation
from pptx.util import Inches as PI, Pt as PPt
from pptx.dml.color import RGBColor as PRGB
from pptx.enum.text import PP_ALIGN
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer,
                                 Table, TableStyle, HRFlowable, PageBreak)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY

OUT = r"e:\Rajkumar\News-Article-Elaborator\.local\outputs"
os.makedirs(OUT, exist_ok=True)

NAVY  = (0x1E, 0x3A, 0x5F)
TEAL  = (0x0D, 0x94, 0x88)
CRIM  = (0x9B, 0x1C, 0x1C)
WHITE = (0xFF, 0xFF, 0xFF)
LIGHT = (0xED, 0xE5, 0xD6)

def rgb(*t):  return RGBColor(*t)
def prgb(*t): return PRGB(*t)
def rlc(t):   return colors.Color(t[0]/255, t[1]/255, t[2]/255)

# ─────────────────────────────────────────────────────────────────
#  ARTICLE 1 — IFMS 3.0 INVESTIGATIVE ARTICLE
# ─────────────────────────────────────────────────────────────────
IFMS = {
  "title_hi": "राजस्थान का डिजिटल भुगतान संकट",
  "title_en": "Rajasthan's Digital Payment Crisis: The IFMS 3.0 Expose",
  "deck_hi":  "WAM बंद · IFMS टूटा · Helpline मौन · Delegation गायब · DSC बाज़ार में · AS/FS देरी · HO Credential दलाली · 200 रद्द अनुबंध · Recovery Portal नहीं",
  "deck_en":  "A complete investigative report on Rajasthan PWD & Irrigation's digital governance collapse",
  "pub":      "जन संवाददाता | Jan Samvaddaata",
  "date":     "6 August 2026",
  "bureau":   "PWD & Irrigation Bureau, Rajasthan",
  "facts": [
    ("~200",   "PWD Divisions affected"),
    ("₹40Cr+", "Annual outsourcing loss statewide"),
    ("10 Jul", "WAM shutdown — payments stopped 2026"),
    ("4 Bugs", "Documented in official complaint email"),
    ("6 Mths", "AS-ID delay: Physical Oct 2025, IFMS Apr 2026"),
    ("DSC",    "At computer centre — IT Act 66C violation"),
    ("~200",   "Contracts rescinded — ZERO recovery monitoring"),
    ("0",      "Helpline replies — employeehelpdesk.ifms@rajasthan.gov.in"),
    ("90 Days","Time to build Recovery Portal — never done in 15 yrs"),
  ],
  "chapters": [
    ("Ch.1","WAM Portal — Foundation & Promise (2012)",
            "WAM Portal — नींव और वादा (2012)",
            "In 2012 Rajasthan launched WAM portal integrated with PayManager. For 14 years, despite flaws, payments processed. Last successful WAM payment: 6 July 2026.",
            "2012 में WAM portal लॉन्च — PayManager integration। 14 वर्ष काम किया। आखिरी WAM payment: 6 July 2026।"),
    ("Ch.2","WAM's Hidden Flaws — Never Fixed",
            "WAM की छुपी खामियां — जो कभी नहीं सुधरीं",
            "Flaw 1: Bill submission only on paper — contractors never self-submitted. Flaw 2: Zero public transparency — no citizen window. Both flaws carried unchanged into IFMS 3.0.",
            "खामी 1: Bill केवल कागज़ पर। खामी 2: Transparency शून्य। दोनों खामियाँ IFMS 3.0 में भी जारी।"),
    ("Ch.3","IFMS 2.0 — New Entanglements (Jan 2025)",
            "IFMS 2.0 — नई उलझनें (जनवरी 2025)",
            "Jan 2025: 7 mandatory IDs per work. Three problems: Document overload, Electronic MB stayed on paper only, Outsourcing explosion ₹20L/Division/year = ₹40 Cr+ statewide annual loss.",
            "7 अनिवार्य IDs। तीन समस्याएं: Document overload, Electronic MB कागज़ पर, Outsourcing विस्फोट ₹40 Cr+ वार्षिक नुकसान।"),
    ("Ch.4","IFMS 2.0 Dark Side — Morphed Photos, OTP Abuse",
            "IFMS 2.0 — Morphed Photo Scam, OTP दुरुपयोग",
            "Morphed Photo Scam: Digitally edited photos uploaded as progress proof — work not done on ground. OTP Abuse: Divisional Accountants handed OTPs to computer operators. Government accountability fully outsourced.",
            "Morphed photos as progress proof। Divisional Accountants ने OTP operators को दिए। सरकारी accountability outsource।"),
    ("Ch.4B","AS/FS ID Delay Scam & Head Office Credential Bribery",
             "AS/FS ID देरी घोटाला और HO Credential दलाली",
             "Physical AS/FS: Oct 2025. Tender: Jan 2026. Work Order: Jan last week. First bill attempt: Apr 2026 — FS-ID absent. AS-ID applied 6 months late. Contractor gets secret bytes, approaches HO. Certain operators hold HO login credentials and generate FS-ID for bribe. IP Login Audit can expose this trail.",
             "Physical AS/FS Oct 2025 — IFMS ID April 2026: 6 माह देरी। FS-ID key to treasury payment। Contractor को secret bytes — HO में रिश्वत। Operator HO credentials से instant FS-ID। IP Audit trail सब उजागर कर सकता है।"),
    ("Ch.5","Black July — WAM Shutdown, IFMS 3.0 Not Ready",
            "वह काली जुलाई — WAM बंद, IFMS 3.0 तैयार नहीं",
            "2 Jul: Training + IFMS 3.0 announced. 6 Jul: Last WAM payment. 10 Jul: WAM fully shutdown. 1 Aug 2026: Portal still broken — vendor names missing, security deposits not integrated, bills completely stopped.",
            "2 Jul: IFMS 3.0 घोषणा। 6 Jul: आखिरी WAM payment। 10 Jul: WAM बंद। 1 Aug: Portal टूटा — Vendors गायब, Security deposits नहीं, Bills ठप।"),
    ("Ch.6","IFMS 3.0 — Secure on Paper, Hollow on Ground",
            "IFMS 3.0 — कागज़ पर सुरक्षित, ज़मीन पर खोखली",
            "Government vision: Maker-Checker-Approver three-tier verification. Ground reality: 90% XEN cannot login to IFMS inbox. OTPs given to operators. One external operator performs all three roles — the system's soul destroyed.",
            "Vision: Maker-Checker-Approver। Reality: 90% XEN login नहीं कर पाते। एक operator तीनों roles। तीन-स्तरीय जाँच की आत्मा नष्ट।"),
    ("Ch.6A","Ideal Delegation Matrix — 10 Tasks, 3 Officers Each",
             "आदर्श Delegation Matrix — सरकार ने Statutory Compulsion नहीं दी",
             "Technical expert proposed framework: AS&FS / Vendor Bill / Refund: AE/SDC → Div Auditor → XEN. Sanction: Div Auditor → Div Accountant → XEN. TS/BOQ/Package/WO/Abstract: AE → TA → XEN. Government issued NO statutory circular mandating this delegation — fatal omission enabling monopoly operator.",
             "10 tasks के लिए task-wise delegation: AS&FS: AE/SDC→Div Auditor→XEN। Sanction: Div Auditor→Div Accountant→XEN। TS/BOQ/Package/WO/Abstract: AE→TA→XEN। सरकार ने कोई Statutory Circular नहीं दिया — यही घातक चूक।"),
    ("Ch.6B","Digital Signature Abuse — DSC at Market Computer Centres",
             "Digital Signature बाज़ार में — XEN का DSC Computer Centre पर",
             "No XEN has logged into IFMS. Their DSC (Digital Signature Certificates) are kept at market computer centres. Operator signs as Maker, Checker AND Approver using XEN's DSC. IT Act 66C: using another person's digital identity = 3 years imprisonment. This crime occurs daily in government offices across Rajasthan.",
             "कोई XEN login नहीं किया। DSC बाज़ार के computer centre पर। Operator XEN के DSC से तीनों roles। IT Act 66C: 3 वर्ष कारावास।"),
    ("Ch.7","1 August 2026 — Portal Status: 4 Documented Bugs",
            "1 August 2026 — 4 Documented Bugs — Official Complaint Unanswered",
            "Official complaint to employeehelpdesk.ifms@rajasthan.gov.in — no reply. Bug 1: Vendor selection list incomplete, not alphabetical. Bug 2: Security Refund balance not showing. Bug 3: July Monthly Report section non-responsive. Bug 4: Disbursement Engine WAM page completely blank.",
            "Complaint email: employeehelpdesk.ifms@rajasthan.gov.in — कोई reply नहीं। Bug 1: Vendor list अधूरी। Bug 2: Security Refund balance absent। Bug 3: July Report non-responsive। Bug 4: Disbursement Engine blank।"),
    ("Ch.8","IFMS Helpline — No Contact, No Solution",
            "IFMS Helpline — संपर्क नहीं, समाधान नहीं",
            "All helpline numbers non-responsive. Official email employeehelpdesk.ifms@rajasthan.gov.in silent — formal complaint with 4 bugs + screenshots sent, zero reply. NIC support desk non-functional. No escalation matrix. No dedicated 24x7 line. Officers resort to WhatsApp groups.",
            "Helpline numbers non-responsive। Email silent। NIC support ठप। Escalation matrix नहीं। Officers WhatsApp groups पर।"),
    ("Ch.8B","~200 Rescinded Contracts — Zero Recovery: Named Defaulters Walk Free",
             "~200 रद्द अनुबंध — वसूली शून्य: नामित ठेकेदार बेखौफ",
             "Three named cases: (1) Bhairavji Bridge, Banswara — rescinded, risk-and-cost tender floated, ZERO recovery. (2) Kotada Road, Udaipur — rescinded, differential cost UNRECOVERED. (3) Gannon Dunkerlay & Co — large established firm, contract rescinded, substantial dues UNEXERCISED, company walked free. Statewide pattern: ~200 rescissions, zero systematic recovery monitoring. Rescission is a paper threat, not a financial one.",
             "तीन नामित मामले: (1) भैरवजी Bridge, बाँसवाड़ा — rescinded, वसूली शून्य। (2) Kotada Road, उदयपुर — rescinded, cost unrecovered। (3) Gannon Dunkerlay — established company, walked free। ~200 rescissions — zero monitoring। Rescission = कागज़ी खतरा।"),
    ("Ch.8C","Why No Recovery Portal? Why No Legal Pursuit? — Architecture of Impunity",
             "Recovery Portal क्यों नहीं? Legal Pursuit क्यों नहीं? — Impunity का Architecture",
             "Q1: Why no Digitised Recovery Portal despite 15 years of digital infrastructure? Because it would make every non-recovery visible and attributable to a named officer — exactly what the system avoids. Q2: Why no legal pursuit? Two explanations: Gross Negligence OR Complicity — the same officer who processed payments refuses to initiate recovery. Limitation periods are expiring unnoticed. Five-point framework: (A) Recovery Portal on IFMS in 90 days; (B) Legal notice within 30 days of rescission; (C) Litigation Register monthly updated; (D) Limitation period auto-alerts; (E) Same-officer overlap = automatic ACB referral.",
             "Q1: Recovery Portal 15 वर्षों में क्यों नहीं? क्योंकि visibility = accountability — जिससे system बचता है। Q2: Legal pursuit क्यों नहीं? Negligence या Complicity — जिस हाथ ने payments किए वही recovery रोक रहा है। Limitation periods expire हो रहे हैं। 5-point framework: Portal 90 days; Legal notice 30 days; Litigation register; Limitation alerts; Same-officer = ACB referral।"),
    ("Ch.9","Seven Immediate Reforms",
            "सात तत्काल माँगें",
            "1.Statutory Delegation Gazette Notification. 2.Citizen Transparency portal. 3.DSC with officer only — computer centre = IT Act offence. 4.Mandatory training before portal access. 5.Portal bugs fixed with deadline — NIC accountable. 6.24x7 dedicated helpline + working email. 7.Independent Monitoring Committee.",
            "1.Statutory Delegation Gazette Notification। 2.Citizen Transparency। 3.DSC अधिकारी के पास। 4.Mandatory Training। 5.Portal bugs deadline fix। 6.24×7 Helpline। 7.Independent Monitoring Committee।"),
    ("Ch.10","Ten Media Demands — Call to the Fourth Estate",
             "दस मीडिया माँगें — चौथे स्तंभ से आह्वान",
             "1.RTI on delegation circular. 2.AS/FS backdating CAG audit. 3.IP Login Audit → ACB. 4.XEN Login sting. 5.DSC location live check. 6.Helpline live call test. 7.Morphed photo expose. 8.IFMS public audit. 9.One operator three roles expose. 10.Rescinded contracts recovery RTI.",
             "1.Delegation RTI। 2.AS/FS Backdating CAG Audit। 3.IP Login Audit→ACB। 4.XEN Login Sting। 5.DSC Location Check। 6.Live Helpline Test। 7.Morphed Photo Expose। 8.Public Audit। 9.One Operator Three Roles। 10.Recovery RTI।"),
  ]
}

# ─────────────────────────────────────────────────────────────────
#  ARTICLE 2 — PWD eMB CORRUPTION
# ─────────────────────────────────────────────────────────────────
EMB = {
  "title_hi": "PWD का डिजिटल माप घोटाला",
  "title_en": "Electronic Measurement Books: The Digital Veil Over Road Corruption",
  "deck_hi":  "eMB Abstract · Bitumen CRC Fraud · 5 Fraud Pathways · Missing QC Records · No Contractor Ledger · Dormant EMD/SD/Dep-V · Rescinded Contracts · Recovery Portal नहीं",
  "deck_en":  "A complete investigative expose of PWD road works corruption enabled by absent digital accountability",
  "pub":      "जन संवाददाता | Jan Samvaddaata",
  "date":     "6 August 2026",
  "bureau":   "PWD Roads & Infrastructure Bureau, Rajasthan",
  "facts": [
    ("Abstract","e-MB has no line-by-line data — summary only"),
    ("5",       "CRC Fraud pathways — incl. multi-project reuse"),
    ("0",       "QC Test Abstracts routinely uploaded"),
    ("CRC",    "Bitumen CRC — Single Mother of Corruption"),
    ("15 Yrs", "Online payments — ZERO Contractor Ledger built"),
    ("EMD+SD", "Dormant deposits — no ledger, no statement, no refund"),
    ("~200",   "Contracts rescinded — ZERO recovery monitoring"),
    ("90 Days","Time to build Recovery Portal — never done"),
  ],
  "chapters": [
    ("Ch.1","e-MB Promise vs Ground Reality",
            "eMB का वादा और ज़मीनी हकीकत",
            "The Electronic Measurement Book was designed to bring transparency, accuracy and accountability. Instead it produces a sanitised abstract that conceals exactly what is needed to detect over-measurement, quality shortfalls, and bitumen manipulation.",
            "eMB पारदर्शिता लाने के लिए था। इसकी जगह यह एक sanitised abstract तैयार करता है जो fraud छुपाता है।"),
    ("Ch.2","Abstract-Only Billing — Digital Building Without Foundation",
            "Abstract-Only Billing — बिना नींव की डिजिटल इमारत",
            "Missing from e-MB: chainage-wise quantities, layer-wise thicknesses, cross-sectional measurements, progressive totals. Two non-negotiable actions when full digital entry is impractical: (1) Upload contractor's original bill in full. (2) Upload complete physical MB as PDF.",
            "eMB में missing: Chainage-wise quantities, Layer-wise thickness, Cross-sections, Progressive totals। दो अनिवार्य actions: Original bill upload + Physical MB PDF।"),
    ("Ch.3","Missing QC Test Records — Quality Only on Paper",
            "Missing QC Records — गुणवत्ता कागज़ पर, ज़मीन पर नहीं",
            "Laboratory test results for bitumen grade, density, Marshall stability, and binder content are routinely absent. No accessible record of whether materials met specified standards. QC exists only on paper.",
            "Grade, density, Marshall stability, binder content — test results absent। Quality केवल कागज़ पर।"),
    ("Ch.4","Bitumen CRC — The Single Mother of Corruption",
            "Bitumen CRC — भ्रष्टाचार की जननी",
            "Bitumen CRC (Consignment Receipt Certificate) and Consumption Statement form the documentary chain proving genuine purchase, delivery, and use. When absent, auditor has only an abstract figure — 'X MT bitumen used' — with no way to prove or disprove it.",
            "Bitumen CRC और Consumption Statement — documentary chain। Absent होने पर auditor के पास केवल abstract figure। Verification impossible।"),
    ("Ch.5","Five Fraud Pathways — incl. Multi-Project CRC Reuse",
            "Fraud के पाँच रास्ते — Pathway 5: एक CRC, कई Projects",
            "P1: CRC quantity altered. P2: Fake/recycled CRC. P3: Verification officer compromised. P4: Inflated consumption (80 MT used, 120 MT claimed). P5 NEW (most dangerous): Same contractor submits same CRC across multiple projects simultaneously — one 100 MT delivery claimed at 3 projects = 300 MT payment. Invisible without a centralised statewide CRC registry.",
            "P1: CRC alter। P2: Fake CRC। P3: Verification compromised। P4: 80 MT use, 120 MT claim। P5 (नई — सबसे खतरनाक): एक CRC तीन projects में — 100 MT delivery, 300 MT payment। Centralised CRC Registry के बिना invisible।"),
    ("Ch.6","Why Roads Fail — The Real Public Cost",
            "सड़कें क्यों टूटती हैं — जनता का असली नुकसान",
            "Sub-standard bitumen: roads fail years before design life. A 10-year road lasts 2-3 years. Higher maintenance costs on state. Public safety endangered. Taxpayer funds the same road twice. When digital system designed to prevent this becomes a vehicle for concealment, the reform loses all credibility.",
            "Sub-standard bitumen: 10 साल की सड़क 2-3 साल में टूटती है। Double maintenance cost। Public safety risk। Taxpayer दो बार tax देता है।"),
    ("Ch.6B","15 Years — Zero Contractor Ledger, Dormant EMD/SD/Dep-V",
             "15 साल, कोई Ledger नहीं — EMD, SD, Dep-V मूक जमा",
             "15 years of online payments — no Contractor Ledger ever built. EMD, Security Deposit, Dep-V lie dormant when contractor dies, records lost, or track breaks. Department never volunteers to return them. e-Procurement collects EMD online but has no e-EMD Refund system. Fix: Digital Ledger per contractor; mandatory 31-March annual balance email; e-EMD Refund integrated in e-Procurement; DLP auto-alerts.",
             "15 वर्ष online payment — Contractor Ledger नहीं। EMD+SD+Dep-V वर्षों तक dormant। e-Procurement EMD online collect — refund manual। समाधान: Digital Ledger, 31 March auto-email, e-EMD Refund integration, DLP auto-alerts।"),
    ("Ch.6C","Rescinded Contracts — Bhairavji Bridge, Kotada Road, Gannon Dunkerlay",
             "रद्द अनुबंध — भैरवजी Bridge, Kotada Road, Gannon Dunkerlay",
             "Three named cases: Bhairavji Bridge Banswara (rescinded, nil recovery), Kotada Road Udaipur (rescinded, nil recovery), Gannon Dunkerlay & Co — established firm, contract rescinded, substantial dues unexercised, company walked free. ~200 rescissions statewide, zero monitoring. Rescission is a paper threat, not a financial liability.",
             "भैरवजी Bridge, Kotada Road, Gannon Dunkerlay — तीनों में वसूली शून्य। ~200 rescissions — कोई systematic monitoring नहीं। Blacklist enforce नहीं।"),
    ("Ch.6D","Why No Recovery Portal? Why No Legal Pursuit? — Architecture of Impunity",
             "Recovery Portal नहीं, Legal Pursuit नहीं — Impunity का Architecture",
             "Q1: Recovery Portal not built in 15 years — because it would make every non-recovery visible and attributable to a named officer. Q2: No legal pursuit because of either Gross Negligence or Complicity — the same officer who processed payments is the officer who refuses to collect. Limitation periods expiring unnoticed. Five-point framework: Portal in 90 days; legal notice in 30 days; litigation register; limitation alerts; same-officer overlap = ACB referral.",
             "Recovery Portal 15 वर्षों में नहीं — visibility = accountability से बचाव। Legal pursuit नहीं — Negligence या Complicity। Limitation expire हो रहे हैं। Framework: Portal 90 days, Notice 30 days, Register, Alerts, ACB referral।"),
    ("Ch.7","Seven Minimum Corrective Actions — Immediate",
            "सात Minimum Corrective Actions — तत्काल",
            "1.Mandate upload of contractor's original bill. 2.Upload complete physical MB PDF. 3.Upload QC test abstract. 4.Upload Bitumen CRC copies. 5.Cross-link Consumption Statement with CRC — mismatch auto-flags. 6.Centralised CRC Registry — one CRC, one bill only. 7.Missing documents = payment withheld + scrutiny initiated.",
            "1.Original bill upload। 2.Physical MB PDF। 3.QC abstract। 4.Bitumen CRC copies। 5.Consumption Statement cross-link। 6.Centralised CRC Registry। 7.Documents absent = payment withheld।"),
    ("Ch.8","Thirteen Media & Public Demands",
            "तेरह मीडिया और जन माँगें",
            "1.RTI on CRC upload status. 2.CAG audit bitumen claimed vs received. 3.CRC verification sting. 4.Core cutting test on recent roads. 5.Department circular mandating uploads. 6.Public bitumen supplier list. 7.Public bill tracking portal. 8.CRC duplication ACB audit. 9.RTI on dormant EMD/SD deposits. 10.e-EMD Refund expose. 11.Contractor Ledger sting. 12.Rescinded contracts recovery RTI. 13.Blacklisting register demand.",
            "1.RTI CRC upload। 2.CAG bitumen audit। 3.CRC sting। 4.Core cutting test। 5.Department circular। 6.Supplier public list। 7.Public portal। 8.CRC duplication ACB। 9.Dormant deposits RTI। 10.e-EMD expose। 11.Ledger sting। 12.Recovery RTI। 13.Blacklist register।"),
  ]
}

# ─────────────────────────────────────────────────────────────────
#  HELPERS
# ─────────────────────────────────────────────────────────────────
def set_cell_bg(cell, hex_rgb):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), hex_rgb)
    tcPr.append(shd)

def add_tb(slide, text, l, t, w, h, sz=14, bold=False, italic=False,
           color=WHITE, align=PP_ALIGN.LEFT):
    tb = slide.shapes.add_textbox(PI(l),PI(t),PI(w),PI(h))
    tf = tb.text_frame; tf.word_wrap = True
    p = tf.paragraphs[0]; p.alignment = align
    r = p.add_run(); r.text = text
    r.font.size = PPt(sz); r.font.bold = bold
    r.font.italic = italic; r.font.color.rgb = prgb(*color)

def fill_bg(slide, col):
    bg = slide.background; f = bg.fill
    f.solid(); f.fore_color.rgb = prgb(*col)

def add_rect(slide, l, t, w, h, fill, line=None):
    s = slide.shapes.add_shape(1, PI(l),PI(t),PI(w),PI(h))
    s.fill.solid(); s.fill.fore_color.rgb = prgb(*fill)
    if line: s.line.color.rgb = prgb(*line)
    else: s.line.fill.background()
    return s

# ─────────────────────────────────────────────────────────────────
#  DOCX
# ─────────────────────────────────────────────────────────────────
def make_docx(art, filename):
    doc = Document()
    for sec in doc.sections:
        sec.top_margin = Cm(2); sec.bottom_margin = Cm(2)
        sec.left_margin = Cm(2.5); sec.right_margin = Cm(2.5)

    def h(text, size, color=NAVY, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER):
        p = doc.add_paragraph(); p.alignment = align
        r = p.add_run(text); r.bold = bold
        r.font.size = Pt(size); r.font.color.rgb = rgb(*color); return p

    h("जन संवाददाता  |  JAN SAMVADDAATA", 22, NAVY)
    h(f"खोजी पत्रकारिता  •  {art['date']}  •  {art['bureau']}", 9, TEAL, bold=False)
    doc.add_paragraph("─" * 76)
    h(art["title_hi"], 20, NAVY)
    h(art["title_en"], 13, NAVY)
    dk = doc.add_paragraph(); dk.alignment = WD_ALIGN_PARAGRAPH.CENTER
    dr = dk.add_run(art["deck_hi"] + "\n" + art["deck_en"])
    dr.italic = True; dr.font.size = Pt(9.5)
    dr.font.color.rgb = rgb(0x6B,0x63,0x55)
    doc.add_paragraph("─" * 76)

    # Facts table
    h("AT A GLANCE — मुख्य तथ्य", 10, TEAL)
    facts = art["facts"]; cols = 3
    rows = [facts[i:i+cols] for i in range(0, len(facts), cols)]
    tbl = doc.add_table(rows=len(rows), cols=cols)
    tbl.style = 'Table Grid'
    for ri, row in enumerate(rows):
        for ci, (num, lbl) in enumerate(row):
            cell = tbl.cell(ri, ci); cell.text = ""
            p = cell.paragraphs[0]; p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            rn = p.add_run(num+"\n"); rn.bold=True; rn.font.size=Pt(14)
            rn.font.color.rgb = rgb(*WHITE)
            rl = p.add_run(lbl); rl.font.size=Pt(7.5)
            rl.font.color.rgb = rgb(0xCC,0xCC,0xCC)
            set_cell_bg(cell, "1E3A5F")
    doc.add_paragraph()

    # Chapters
    for ch in art["chapters"]:
        num, en_title, hi_title, en_body, hi_body = ch
        mp = doc.add_paragraph()
        mr = mp.add_run(f"{'─'*4}  {num}  |  {hi_title}")
        mr.bold=True; mr.font.size=Pt(12.5); mr.font.color.rgb=rgb(*TEAL)
        ep = doc.add_paragraph()
        ep.paragraph_format.left_indent = Cm(0.4)
        er = ep.add_run(en_title); er.bold=True; er.font.size=Pt(11)
        er.font.color.rgb = rgb(*NAVY)
        hp = doc.add_paragraph()
        hp.paragraph_format.left_indent = Cm(0.4)
        hp.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        hr2 = hp.add_run(hi_body); hr2.font.size=Pt(10.5)
        enp = doc.add_paragraph()
        enp.paragraph_format.left_indent = Cm(0.4)
        enp.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        enr = enp.add_run(en_body)
        enr.font.size=Pt(10); enr.italic=True
        enr.font.color.rgb = rgb(0x44,0x40,0x3C)
        doc.add_paragraph("· "*38)

    fp = doc.add_paragraph(); fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    fr = fp.add_run(f"जन संवाददाता  |  {art['date']}  |  All rights reserved  |  Public Interest Investigation")
    fr.font.size=Pt(7.5); fr.font.color.rgb = rgb(*TEAL)

    path = os.path.join(OUT, filename)
    doc.save(path); print(f"  DOCX  ✓  {filename}")

# ─────────────────────────────────────────────────────────────────
#  PDF
# ─────────────────────────────────────────────────────────────────
def make_pdf(art, filename):
    path = os.path.join(OUT, filename)
    doc = SimpleDocTemplate(path, pagesize=A4,
          leftMargin=2.2*cm, rightMargin=2.2*cm,
          topMargin=2*cm, bottomMargin=2*cm)
    story = []; W = A4[0]-4.4*cm
    nav=rlc(NAVY); tea=rlc(TEAL); cri=rlc(CRIM)
    grey=colors.Color(0.4,0.39,0.33)

    def sty(nm,**kw): return ParagraphStyle(nm,**kw)
    s_pub  = sty('pub',  fontName='Helvetica-Bold',fontSize=19,textColor=nav,alignment=TA_CENTER,spaceAfter=3)
    s_sub  = sty('sub',  fontName='Helvetica',fontSize=9,textColor=tea,alignment=TA_CENTER,spaceAfter=6)
    s_thi  = sty('thi',  fontName='Helvetica-Bold',fontSize=16,textColor=nav,alignment=TA_CENTER,spaceAfter=3)
    s_ten  = sty('ten',  fontName='Helvetica-Bold',fontSize=11.5,textColor=nav,alignment=TA_CENTER,spaceAfter=3)
    s_deck = sty('deck', fontName='Helvetica-Oblique',fontSize=9,textColor=grey,alignment=TA_CENTER,spaceAfter=8)
    s_ch   = sty('ch',   fontName='Helvetica-Bold',fontSize=11.5,textColor=tea,spaceAfter=2,spaceBefore=12)
    s_ent  = sty('ent',  fontName='Helvetica-Bold',fontSize=10.5,textColor=nav,leftIndent=8,spaceAfter=2)
    s_hi   = sty('hi',   fontName='Helvetica',fontSize=10.5,textColor=colors.black,leftIndent=8,
                          alignment=TA_JUSTIFY,spaceAfter=3,leading=15)
    s_en   = sty('en',   fontName='Helvetica-Oblique',fontSize=9.5,
                          textColor=colors.Color(0.27,0.25,0.24),
                          leftIndent=8,alignment=TA_JUSTIFY,spaceAfter=5,leading=14)
    s_foot = sty('foot', fontName='Helvetica',fontSize=7.5,textColor=tea,alignment=TA_CENTER,spaceBefore=8)

    story.append(Paragraph("जन संवाददाता  |  JAN SAMVADDAATA", s_pub))
    story.append(Paragraph(f"खोजी पत्रकारिता  •  {art['date']}  •  {art['bureau']}", s_sub))
    story.append(HRFlowable(width=W,thickness=2,color=tea))
    story.append(Spacer(1,5))
    story.append(Paragraph(art["title_hi"], s_thi))
    story.append(Paragraph(art["title_en"], s_ten))
    story.append(Paragraph(art["deck_hi"], s_deck))
    story.append(Paragraph(art["deck_en"], s_deck))
    story.append(HRFlowable(width=W,thickness=1,color=tea))
    story.append(Spacer(1,6))

    story.append(Paragraph("AT A GLANCE — मुख्य तथ्य", s_ch))
    facts=art["facts"]; cols=4
    rows=[]
    for i in range(0,len(facts),cols):
        row=[]
        for num,lbl in facts[i:i+cols]:
            cp = (f"<font size=13 color='#FFFFFF'><b>{num}</b></font><br/>"
                  f"<font size=7.5 color='#AAAAAA'>{lbl}</font>")
            row.append(Paragraph(cp,ParagraphStyle('fc',alignment=TA_CENTER,leading=14)))
        while len(row)<cols: row.append("")
        rows.append(row)
    cw=W/cols
    ft=Table(rows,colWidths=[cw]*cols,rowHeights=1.3*cm)
    ft.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1),nav),
        ('GRID',(0,0),(-1,-1),0.4,colors.Color(0.2,0.3,0.45)),
        ('VALIGN',(0,0),(-1,-1),'MIDDLE'),
        ('TOPPADDING',(0,0),(-1,-1),5),
        ('BOTTOMPADDING',(0,0),(-1,-1),5),
    ]))
    story.append(ft); story.append(Spacer(1,8))

    for ch in art["chapters"]:
        num,en_title,hi_title,en_body,hi_body = ch
        story.append(Paragraph(f"{num}  |  {hi_title}", s_ch))
        story.append(Paragraph(en_title, s_ent))
        story.append(Paragraph(hi_body, s_hi))
        story.append(Paragraph(en_body, s_en))
        story.append(HRFlowable(width=W,thickness=0.5,
                                 color=colors.Color(0.83,0.77,0.66)))

    story.append(Spacer(1,10))
    story.append(HRFlowable(width=W,thickness=1.5,color=nav))
    story.append(Paragraph(
        f"जन संवाददाता  |  {art['date']}  |  All rights reserved  |  Public Interest Investigation",
        s_foot))
    doc.build(story); print(f"  PDF   ✓  {filename}")

# ─────────────────────────────────────────────────────────────────
#  PPTX
# ─────────────────────────────────────────────────────────────────
def make_pptx(art, filename):
    prs = Presentation()
    prs.slide_width  = PI(13.33)
    prs.slide_height = PI(7.5)
    blank = prs.slide_layouts[6]

    BG_COLORS = [
        (0x1E,0x3A,0x5F),(0x1A,0x2E,0x50),(0x12,0x24,0x42),(0x0F,0x2A,0x3E),
        (0x1C,0x18,0x14),(0x1A,0x05,0x33),(0x14,0x24,0x20),(0x28,0x18,0x05),
        (0x1E,0x3A,0x5F),(0x12,0x24,0x42),(0x1A,0x2E,0x50),(0x0F,0x2A,0x3E),
        (0x1C,0x18,0x14),(0x1A,0x05,0x33),(0x14,0x24,0x20),
    ]

    # ── COVER ──
    sl = prs.slides.add_slide(blank); fill_bg(sl,NAVY)
    add_rect(sl,0,0,13.33,0.08,TEAL)
    add_rect(sl,0,7.42,13.33,0.08,TEAL)
    add_tb(sl,"जन संवाददाता  |  JAN SAMVADDAATA",
           0.4,0.25,12.5,0.55,13,bold=True,color=TEAL,align=PP_ALIGN.CENTER)
    add_tb(sl,"खोजी पत्रकारिता  |  INVESTIGATIVE JOURNALISM",
           0.4,0.82,12.5,0.38,9.5,color=(170,185,200),align=PP_ALIGN.CENTER)
    add_rect(sl,1.5,1.3,10.33,0.04,TEAL)
    add_tb(sl,art["title_hi"],0.5,1.45,12.33,1.15,
           30,bold=True,color=WHITE,align=PP_ALIGN.CENTER)
    add_tb(sl,art["title_en"],0.5,2.7,12.33,0.75,
           16,bold=True,color=(160,200,220),align=PP_ALIGN.CENTER)
    add_tb(sl,art["deck_hi"],0.5,3.6,12.33,0.55,
           10,italic=True,color=(175,185,175),align=PP_ALIGN.CENTER)
    add_tb(sl,art["deck_en"],0.5,4.18,12.33,0.55,
           9.5,italic=True,color=(155,170,160),align=PP_ALIGN.CENTER)
    add_rect(sl,1.5,4.9,10.33,0.04,TEAL)
    add_tb(sl,f"{art['pub']}  •  {art['date']}  •  {art['bureau']}",
           0.4,5.05,12.5,0.38,8.5,color=(110,130,145),align=PP_ALIGN.CENTER)

    # ── KEY FACTS ──
    sl = prs.slides.add_slide(blank); fill_bg(sl,NAVY)
    add_rect(sl,0,0,13.33,0.07,TEAL)
    add_tb(sl,"AT A GLANCE  —  मुख्य तथ्य  |  KEY FACTS",
           0.3,0.12,12.5,0.48,13,bold=True,color=TEAL,align=PP_ALIGN.CENTER)
    facts=art["facts"]; per=4
    rows=[facts[i:i+per] for i in range(0,len(facts),per)]
    cw=3.0; ch_h=1.3; x0=0.3; gap=0.13
    for ri,row in enumerate(rows):
        y=0.75+ri*(ch_h+0.16)
        for ci,(num,lbl) in enumerate(row):
            x=x0+ci*(cw+gap)
            add_rect(sl,x,y,cw,ch_h,(0x28,0x50,0x80),TEAL)
            add_tb(sl,num,x+0.08,y+0.08,cw-0.16,0.65,
                   20,bold=True,color=WHITE,align=PP_ALIGN.CENTER)
            add_tb(sl,lbl,x+0.08,y+0.72,cw-0.16,0.52,
                   8,color=(175,190,205),align=PP_ALIGN.CENTER)

    # ── CHAPTER SLIDES ──
    total = len(art["chapters"])
    for i,ch in enumerate(art["chapters"]):
        num,en_title,hi_title,en_body,hi_body = ch
        bg = BG_COLORS[i % len(BG_COLORS)]
        sl = prs.slides.add_slide(blank); fill_bg(sl,bg)
        add_rect(sl,0,0,13.33,0.07,TEAL)
        add_rect(sl,0,7.43,13.33,0.07,TEAL)
        add_rect(sl,0.3,0.15,1.1,0.44,TEAL)
        add_tb(sl,num,0.3,0.15,1.1,0.44,10,bold=True,
               color=WHITE,align=PP_ALIGN.CENTER)
        add_tb(sl,hi_title,1.55,0.12,11.4,0.58,
               17,bold=True,color=WHITE)
        add_tb(sl,en_title,1.55,0.67,11.4,0.44,
               11.5,bold=True,color=(160,200,220))
        add_rect(sl,0.3,1.24,12.73,0.03,TEAL)
        add_tb(sl,textwrap.fill(hi_body,78),
               0.3,1.35,6.2,5.6,10.5,color=(218,224,230))
        add_tb(sl,textwrap.fill(en_body,78),
               6.8,1.35,6.2,5.6,10,italic=True,color=(168,185,195))
        add_rect(sl,6.6,1.35,0.03,5.6,TEAL)
        add_tb(sl,f"Slide {i+3} / {total+2}",
               11.9,7.1,1.3,0.3,8,
               color=(100,115,130),align=PP_ALIGN.RIGHT)

    # ── CALL TO ACTION ──
    sl = prs.slides.add_slide(blank)
    fill_bg(sl,(0x7F,0x1D,0x1D))
    add_rect(sl,0,0,13.33,0.07,(0xFF,0xA0,0xA0))
    add_rect(sl,0,7.43,13.33,0.07,(0xFF,0xA0,0xA0))
    add_tb(sl,"🚨  ACT NOW  —  अभी कार्रवाई करें  🚨",
           0.5,0.45,12.33,0.75,21,bold=True,
           color=WHITE,align=PP_ALIGN.CENTER)
    add_tb(sl,
        "RTI FILE करें  •  CAG Audit माँगें  •  ACB को सूचित करें  •  Recovery Portal माँगें\n"
        "File RTI  •  Demand CAG Audit  •  Alert ACB  •  Demand Recovery Portal",
        0.5,1.35,12.33,0.9,13,
        color=(255,200,200),align=PP_ALIGN.CENTER)
    add_tb(sl,
        '"जब तक system की monitoring नहीं होगी —\n'
        'जनता का पैसा डूबता रहेगा।\n\n'
        '"Recovery Portal बनाना 90 दिन का काम था।\n'
        '15 वर्ष में नहीं बना — यह negligence नहीं,\n'
        'यह impunity का architecture है।"',
        1.0,2.6,11.33,3.5,15,italic=True,
        color=WHITE,align=PP_ALIGN.CENTER)
    add_tb(sl,
        f"जन संवाददाता  |  {art['date']}  |  Public Interest Investigation",
        0.5,6.8,12.33,0.45,9,
        color=(200,150,150),align=PP_ALIGN.CENTER)

    path = os.path.join(OUT, filename)
    prs.save(path); print(f"  PPTX  ✓  {filename}")

# ─────────────────────────────────────────────────────────────────
#  MAIN
# ─────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("\n" + "="*60)
    print("  CLEAN FULL REGENERATION — जन संवाददाता")
    print("  All exports from scratch — 6 files")
    print("="*60)

    print("\n[1/2] IFMS 3.0 Investigative Article")
    make_docx(IFMS, "IFMS-Rajasthan-Investigation.docx")
    make_pdf (IFMS, "IFMS-Rajasthan-Investigation.pdf")
    make_pptx(IFMS, "IFMS-Rajasthan-Investigation.pptx")

    print("\n[2/2] PWD eMB Corruption Article")
    make_docx(EMB,  "PWD-eMB-Corruption-Investigation.docx")
    make_pdf (EMB,  "PWD-eMB-Corruption-Investigation.pdf")
    make_pptx(EMB,  "PWD-eMB-Corruption-Investigation.pptx")

    print("\n" + "="*60)
    print("  ✅  ALL 6 FILES READY")
    print(f"  📁  {OUT}")
    print("="*60)
    for f in os.listdir(OUT):
        if not f.endswith('.html'):
            size = os.path.getsize(os.path.join(OUT,f))//1024
            print(f"     {f:<48}  {size:>4} KB")
