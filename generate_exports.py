# -*- coding: utf-8 -*-
"""
Generate DOCX, PDF, and PPTX exports for both investigative articles.
Hindi + English bilingual content.
"""
import os, re, textwrap
from docx import Document
from docx.shared import Pt, Cm, RGBColor, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from pptx import Presentation
from pptx.util import Inches as PInches, Pt as PPt, Emu
from pptx.dml.color import RGBColor as PRGBColor
from pptx.enum.text import PP_ALIGN
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer,
                                 Table, TableStyle, HRFlowable, PageBreak)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY

OUT = r"e:\Rajkumar\News-Article-Elaborator\.local\outputs"
os.makedirs(OUT, exist_ok=True)

# ── Colour palette ──────────────────────────────────────────────
NAVY   = (0x1E, 0x3A, 0x5F)
TEAL   = (0x0D, 0x94, 0x88)
CRIM   = (0x9B, 0x1C, 0x1C)
WHITE  = (0xFF, 0xFF, 0xFF)
LIGHT  = (0xED, 0xE5, 0xD6)

def rgb(*t): return RGBColor(*t)
def prgb(*t): return PRGBColor(*t)
def rl_color(t): return colors.Color(t[0]/255, t[1]/255, t[2]/255)

# ══════════════════════════════════════════════════════════════════
#  ARTICLE DATA — IFMS Article
# ══════════════════════════════════════════════════════════════════
IFMS = {
  "title_hi": "राजस्थान का डिजिटल भुगतान संकट",
  "title_en": "Rajasthan's Digital Payment Crisis: The IFMS 3.0 Expose",
  "deck_hi":  "WAM बंद, IFMS टूटा, Helpline मौन, Delegation गायब — एक सम्पूर्ण खोजी रिपोर्ट",
  "deck_en":  "WAM shutdown, IFMS broken, Helpline silent, No delegation — a complete investigative report",
  "pub":      "जन संवाददाता | Jan Samvaddaata",
  "date":     "6 August 2026",
  "bureau":   "PWD & Irrigation Bureau, Rajasthan",
  "facts": [
    ("~200",   "PWD Divisions affected"),
    ("₹20L+",  "Outsourcing cost/Division/year"),
    ("₹40 Cr+","Annual state-level loss"),
    ("14 Years","WAM Portal worked (2012-2026)"),
    ("10 Jul", "WAM shutdown, payments stopped"),
    ("4 Bugs", "Documented in official complaint email"),
    ("6 Months","AS-ID delay: Physical Oct 2025, IFMS Apr 2026"),
    ("0",       "Helpline/Email replies — Zero response"),
    ("DSC",    "At computer centre — IT Act 66C violation"),
  ],
  "chapters": [
    ("Ch.1", "WAM Portal — Foundation & Promise (2012)",
             "WAM Portal — नींव और वादा (2012)",
             "In 2012 Rajasthan launched wam.rajasthan.gov.in integrated with PayManager for direct contractor payments. For 14 years, despite flaws, the system functioned. Payments were processed. The last successful payment was 6 July 2026.",
             "वर्ष 2012 में राजस्थान सरकार ने PWD और Irrigation के ठेकेदारों के लिए WAM portal लॉन्च किया। 14 वर्षों तक यह प्रणाली — खामियों के बावजूद — काम करती रही। 6 July 2026 तक सब संतोषजनक था।"),
    ("Ch.2", "WAM's Hidden Flaws — Never Fixed",
             "WAM की छुपी खामियां — जो कभी नहीं सुधरीं",
             "Flaw 1: Bill Submission only on paper — contractors never self-submitted. Flaw 2: Zero public transparency — no citizen window for bill status or payment history. Both flaws carried into IFMS 2.0 and 3.0.",
             "खामी 1: Bill केवल कागज़ पर — contractors कभी खुद bill नहीं बनाते थे। खामी 2: पारदर्शिता शून्य — नागरिकों के लिए कोई window नहीं। ये खामियां IFMS 3.0 में भी जारी हैं।"),
    ("Ch.3", "IFMS 2.0 — Ambitious Reform, New Entanglements (Jan 2025)",
             "IFMS 2.0 — महत्वाकांक्षी सुधार, नई उलझनें",
             "January 2025: 7 mandatory IDs per work (Work-ID, AS-ID, TS-ID, BOQ-ID, Package-ID, WO-ID, Abstract-ID). Electronic MB on mb.rajasthan.gov.in. Three new problems: Document overload, electronic MB remained on paper only, outsourcing explosion at ₹20L/Division/year totalling ₹40 Cr+ state-wide.",
             "जनवरी 2025 से 7 अनिवार्य IDs प्रति कार्य। तीन नई समस्याएं: Document overload, Electronic MB केवल कागज़ पर, Outsourcing विस्फोट — ₹20 लाख/Division/वर्ष, कुल नुकसान ₹40 करोड़+।"),
    ("Ch.4", "IFMS 2.0 Dark Side — Scam & Accountability Collapse",
             "IFMS 2.0 का अंधेरा पहलू — Scam और Accountability का पतन",
             "Morphed Photo Scam: Digitally edited photos uploaded as progress evidence — work not done on ground. OTP Abuse: Divisional Accountants gave their OTPs to computer operators. Government accountability fully outsourced to unqualified private parties.",
             "Morphed Photo Scam: झूठी progress photos portal पर। OTP दुरुपयोग: Divisional Accountants ने OTP operators को दिए। सरकारी accountability पूरी तरह बाहरी हाथों में।"),
    ("Ch.4B","AS/FS ID Delay Scam & Head Office Credential Bribery",
             "AS/FS ID देरी घोटाला और HO Credential दलाली",
             "Physical AS/FS issued Oct 2025. Tender Jan 2026. Work Order Jan last week. First bill Apr 2026 — FS-ID absent. Division staff creates AS-ID in April — 6 months late. Contractor gets 'secret bytes', approaches HO. Certain operators hold HO officer login credentials and generate FS-ID instantly for bribe. IP Login Audit can expose this trail.",
             "Physical AS/FS: Oct 2025। Tender: Jan 2026। पहला bill: Apr 2026 — FS-ID absent। Division staff पहली बार Apr 2026 में AS-ID बनाता है — 6 माह देरी से। Contractor को 'secret bytes' मिलते हैं। HO में रिश्वत। Operator HO credentials से FS-ID generate करता है। IP Audit Trail सब उजागर कर सकता है।"),
    ("Ch.5", "Black July — WAM Shutdown, IFMS 3.0 Not Ready",
             "वह काली जुलाई — WAM बंद, IFMS 3.0 तैयार नहीं",
             "2 Jul: Training given, IFMS 3.0 announced. 6 Jul: Last WAM payment. 10 Jul: WAM fully shut. 1 Aug: Portal still broken — vendor names missing, security deposits not integrated, bills completely stopped.",
             "2 Jul: Training + IFMS 3.0 घोषणा। 6 Jul: WAM पर आखिरी payment। 10 Jul: WAM पूरी तरह बंद। 1 Aug: Portal टूटा — Vendor names गायब, Security deposits integrate नहीं, Bills ठप।"),
    ("Ch.6", "IFMS 3.0 — Secure on Paper, Hollow on Ground",
             "IFMS 3.0 — कागज़ पर सुरक्षित, ज़मीन पर खोखली",
             "Government vision: Maker-Checker-Approver three-tier verification. Ground reality: 90% XEN cannot even login to IFMS portal inbox. Engineers handed OTPs to operators. One external operator performs Maker + Checker + Approver roles — three-tier verification soul destroyed.",
             "सरकार का vision: Maker-Checker-Approver तीन-स्तरीय verification। ज़मीनी हकीकत: 90% XEN IFMS portal का inbox तक login नहीं कर पाते। एक operator तीनों roles निभाता है।"),
    ("Ch.6A","Ideal Maker-Checker-Approver Delegation Matrix",
             "आदर्श Maker-Checker-Approver Delegation Matrix",
             "Technical expert proposed framework: AS&FS: AE/Sub-Div Clerk→Div Auditor→XEN | Sanction: Div Auditor→Div Accountant→XEN | TS/BOQ/Package/WO/Abstract: AE→TA→XEN | Vendor Bill & Refund: AE/Sub-Div Clerk→Div Auditor→XEN. Government has issued NO statutory circular mandating this delegation — fatal omission enabling one-operator monopoly.",
             "तकनीकी विशेषज्ञ का प्रस्तावित framework: AS&FS: AE/SDC→Div Auditor→XEN | Sanction: Div Auditor→Div Accountant→XEN | TS/BOQ/Package/WO/Abstract: AE→TA→XEN | Vendor Bill & Refund: AE/SDC→Div Auditor→XEN। सरकार ने कोई Statutory Circular नहीं दिया — यही घातक चूक है।"),
    ("Ch.6B","Digital Signature Abuse — DSC at Market Computer Centres",
             "Digital Signature का बाज़ार — XEN का DSC Computer Centre पर",
             "No XEN has logged into IFMS. Their Digital Signature Certificates are kept at market computer centres. The operator uses the XEN's DSC to sign as Maker, Checker, AND Approver. IT Act 66C: using another person's digital identity = 3 years imprisonment. This crime is happening daily in government offices.",
             "किसी XEN ने IFMS login नहीं किया। DSC बाज़ार के computer centre पर। Operator XEN के DSC से Maker, Checker, Approver — तीनों roles निभाता है। IT Act 66C: किसी और की digital identity का उपयोग = 3 वर्ष कारावास।"),
    ("Ch.7", "1 August 2026 — Portal Status: 4 Documented Bugs",
             "1 August 2026 — Portal Status: 4 Documented Bugs",
             "Official complaint email to employeehelpdesk.ifms@rajasthan.gov.in — no reply. Bug #1: Vendor selection list incomplete, not alphabetical. Bug #2: Security Refund balance not showing. Bug #3: July Monthly Report non-responsive. Bug #4: Disbursement Engine WAM page blank.",
             "Official complaint: employeehelpdesk.ifms@rajasthan.gov.in — कोई reply नहीं। Bug 1: Vendor list अधूरी। Bug 2: Security Refund balance absent। Bug 3: July Report non-responsive। Bug 4: Disbursement Engine page blank।"),
    ("Ch.8", "IFMS Helpline: No Contact, No Solution",
             "IFMS Helpline: संपर्क नहीं, समाधान नहीं",
             "All IFMS 3.0 helpline numbers non-responsive. Official email employeehelpdesk.ifms@rajasthan.gov.in silent. NIC support desk not functional. No escalation matrix. No dedicated 24x7 toll-free line. Officers resort to unofficial WhatsApp groups.",
             "सभी IFMS helpline numbers non-responsive। Email: employeehelpdesk.ifms@rajasthan.gov.in — silent। NIC support desk काम नहीं करता। कोई escalation matrix नहीं। Officers WhatsApp groups पर निर्भर।"),
    ("Ch.9", "Seven Immediate Demands",
             "सात तत्काल माँगें",
             "1. Statutory Delegation Order (Gazette Notification). 2. Citizen Transparency. 3. DSC must stay with officer — not at computer centre. 4. Mandatory comprehensive training. 5. Portal bugs fixed with deadline. 6. 24x7 dedicated helpline. 7. Independent Monitoring Committee.",
             "1. Statutory Delegation Order (Gazette Notification)। 2. नागरिक पारदर्शिता। 3. DSC अधिकारी के पास — operator के नहीं। 4. अनिवार्य Training। 5. Portal bugs deadline के साथ fix हों। 6. 24×7 Dedicated Helpline। 7. Independent Monitoring Committee।"),
    ("Ch.10","Call to the Fourth Estate — 10 Media Demands",
             "चौथे स्तंभ से आह्वान — 10 मीडिया माँगें",
             "1.RTI on delegation circular 2.AS/FS backdating CAG audit 3.IP Login Audit→ACB 4.XEN Login sting 5.DSC location check 6.Live helpline call test 7.Morphed photo expose 8.Public audit demand 9.One operator three roles expose 10.Public monitoring mandate.",
             "1.Delegation RTI 2.AS/FS Backdating CAG Audit 3.IP Login Audit→ACB 4.XEN Login Sting 5.DSC Location Check 6.Live Helpline Test 7.Morphed Photo Expose 8.Public Audit माँग 9.One Operator Three Roles Expose 10.Public Monitoring अनिवार्य।"),
  ]
}

# ══════════════════════════════════════════════════════════════════
#  ARTICLE DATA — eMB Article
# ══════════════════════════════════════════════════════════════════
EMB = {
  "title_hi": "PWD का डिजिटल माप घोटाला",
  "title_en": "Electronic Measurement Books: The Digital Veil Over Road Corruption",
  "deck_hi":  "eMB Abstract, Bitumen CRC Fraud और Missing QC Records की सम्पूर्ण खोजी पड़ताल",
  "deck_en":  "How abstract-only e-MBs, missing Bitumen CRCs and absent QC records enable systematic road fraud",
  "pub":      "जन संवाददाता | Jan Samvaddaata",
  "date":     "6 August 2026",
  "bureau":   "PWD Roads & Infrastructure Bureau, Rajasthan",
  "facts": [
    ("Abstract","e-MB has no line-by-line data — summary only"),
    ("₹Cr",    "Bitumen = largest cost component in road projects"),
    ("0",       "QC Test Abstracts routinely absent"),
    ("CRC",    "Bitumen CRC — 'Single Mother of Corruption' in PWD"),
    ("4",       "Fraud pathways through Bitumen CRC manipulation"),
    ("Nil",    "Consumption Statement links in digital billing"),
    ("Early",  "Road failures due to sub-standard bitumen"),
    ("Unaudited","e-MB Abstract = unverifiable financial claim"),
  ],
  "chapters": [
    ("Ch.1","e-MB Promise vs Ground Reality",
            "eMB का वादा और ज़मीनी हकीकत",
            "The Electronic Measurement Book was designed to bring transparency, accuracy and accountability to civil works billing. Instead it produces a sanitised abstract that conceals the very details needed to detect over-measurement, quality shortfalls and bitumen record manipulation.",
            "Electronic Measurement Book पारदर्शिता, सटीकता और जवाबदेही लाने के लिए था। इसकी जगह यह एक sanitised abstract तैयार करता है जो over-measurement, quality shortfalls और Bitumen हेराफेरी छुपाता है।"),
    ("Ch.2","Abstract-Only Billing — Digital Building Without Foundation",
            "Abstract-Only Billing — बिना नींव की डिजिटल इमारत",
            "Missing from e-MB: chainage-wise quantities, layer-wise thicknesses, cross-sectional measurements, progressive totals. Two non-negotiable mandatory actions when full digital entry is impractical: (1) Upload contractor's original bill in full. (2) Upload clear PDF of physical MB with complete line-by-line measurements.",
            "eMB में missing: Chainage-wise quantities, Layer-wise thickness, Cross-sections, Progressive totals। दो अनिवार्य actions: (1) Contractor का original bill full upload। (2) Physical MB का complete PDF।"),
    ("Ch.3","Missing QC Test Records — Quality Only on Paper",
            "Missing QC Records — गुणवत्ता कागज़ पर",
            "Laboratory test results for bitumen grade, density, Marshall stability and binder content are routinely absent from e-MB billing trails. No accessible record exists of whether materials met specified standards. Quality Control exists only on paper.",
            "Grade, density, Marshall stability, binder content — laboratory test results eMB billing trail में routinely absent। Materials ने specified standards पूरे किए या नहीं — कोई accessible record नहीं।"),
    ("Ch.4","Bitumen CRC — The Single Mother of Corruption",
            "Bitumen CRC — भ्रष्टाचार की जननी",
            "Bitumen CRC (Consignment Receipt Certificate) and Consumption Statement are the documentary chain that proves bitumen was genuinely purchased, delivered and used. When missing, an auditor has only an abstract figure 'X MT bitumen used' with no way to prove or disprove it. CRC verification is universally identified as the single largest corruption vector in PWD road works.",
            "Bitumen CRC और Consumption Statement वह documentary chain है जो prove करती है कि bitumen genuinely खरीदी, deliver और use हुई। इनके absent होने पर auditor के पास केवल abstract figure है — 'X MT bitumen used' — जिसे न prove किया जा सकता, न disprove।"),
    ("Ch.5","Four Fraud Pathways — How Bitumen Manipulation Happens",
            "Fraud के चार रास्ते — Bitumen में हेराफेरी",
            "Pathway 1: Genuine CRC manipulation (quantity altered). Pathway 2: Fake or recycled CRC (same certificate in multiple bills). Pathway 3: Compromised verification (verifying officer is in collusion). Pathway 4: Inflated consumption statement (80 MT used, 120 MT claimed).",
            "Pathway 1: Genuine CRC में quantity alter। Pathway 2: Fake/recycled CRC — same certificate multiple bills में। Pathway 3: Verification officer compromised। Pathway 4: Consumption statement inflate — 80 MT use, 120 MT claim।"),
    ("Ch.6","Why Roads Fail — The Real Public Cost",
            "सड़कें क्यों टूटती हैं — जनता का नुकसान",
            "Sub-standard bitumen produces roads that fail years before their design life. A road designed for 10 years fails in 2-3. This imposes higher maintenance costs on the state, endagers public safety through potholes and accidents, and forces taxpayers to fund the same road twice. When the digital system designed to prevent this becomes a vehicle for concealment, the reform loses credibility.",
            "Sub-standard bitumen से सड़कें design life से पहले टूटती हैं। 10 साल की सड़क 2-3 साल में गड्ढों में। State पर additional maintenance खर्च। Public safety खतरे में। Taxpayer एक सड़क के लिए दो बार tax देता है।"),
    ("Ch.7","Six Minimum Corrective Actions — Immediate",
            "छह Minimum Corrective Actions — तत्काल",
            "1. Mandate upload of contractor's original bill. 2. Upload complete physical MB PDF. 3. Upload QC test abstract. 4. Upload Bitumen CRC copies. 5. Cross-link Consumption Statement with CRC (mismatch = auto-flag). 6. Treat missing documents as ground for withholding payment.",
            "1. Contractor का original bill upload अनिवार्य। 2. Physical MB का complete PDF। 3. QC test abstract upload। 4. Bitumen CRC copies upload। 5. Consumption Statement और CRC cross-link। 6. Documents absent = payment withheld।"),
    ("Ch.8","Call to Media & Public — Eight Demands",
            "मीडिया और जनता से आह्वान — आठ माँगें",
            "1.RTI on CRC upload status. 2.CAG audit of bitumen claimed vs received. 3.Sting on CRC verification. 4.Core cutting test on recent roads. 5.Department circular mandating uploads. 6.Public bitumen supplier list. 7.Public portal for bill tracking. 8.ACB investigation where CRC is reused.",
            "1.RTI — CRC upload status। 2.CAG audit: bitumen claimed vs received। 3.CRC verification sting। 4.Recent roads पर core cutting test। 5.Department circular — uploads mandatory। 6.Bitumen supplier public list। 7.Public portal — bill tracking। 8.ACB investigation — duplicate CRC।"),
  ]
}

# ══════════════════════════════════════════════════════════════════
#  DOCX GENERATOR
# ══════════════════════════════════════════════════════════════════
def set_cell_bg(cell, hex_rgb):
    from docx.oxml.ns import qn
    from docx.oxml import OxmlElement
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), hex_rgb)
    tcPr.append(shd)

def make_docx(art, filename):
    doc = Document()
    # Page margins
    for sec in doc.sections:
        sec.top_margin = Cm(2)
        sec.bottom_margin = Cm(2)
        sec.left_margin = Cm(2.5)
        sec.right_margin = Cm(2.5)

    # ── MASTHEAD ──
    mast = doc.add_paragraph()
    mast.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = mast.add_run("जन संवाददाता | JAN SAMVADDAATA")
    r.bold = True; r.font.size = Pt(22); r.font.color.rgb = rgb(*NAVY)

    sub = doc.add_paragraph()
    sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r2 = sub.add_run(f"खोजी पत्रकारिता | Investigative Journalism  •  {art['date']}  •  {art['bureau']}")
    r2.font.size = Pt(9); r2.font.color.rgb = rgb(*TEAL)

    doc.add_paragraph("─" * 80)

    # ── TITLES ──
    t1 = doc.add_paragraph()
    t1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    rh = t1.add_run(art["title_hi"])
    rh.bold = True; rh.font.size = Pt(20); rh.font.color.rgb = rgb(*NAVY)

    t2 = doc.add_paragraph()
    t2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    re = t2.add_run(art["title_en"])
    re.bold = True; re.font.size = Pt(14); re.font.color.rgb = rgb(*NAVY)

    deck = doc.add_paragraph()
    deck.alignment = WD_ALIGN_PARAGRAPH.CENTER
    rd = deck.add_run(art["deck_hi"] + "\n" + art["deck_en"])
    rd.italic = True; rd.font.size = Pt(10); rd.font.color.rgb = rgb(0x6B, 0x63, 0x55)

    doc.add_paragraph("─" * 80)

    # ── FACTS TABLE ──
    doc.add_paragraph("AT A GLANCE — मुख्य तथ्य").runs[0].bold = True
    n = len(art["facts"])
    cols = 3
    rows = (n + cols - 1) // cols
    tbl = doc.add_table(rows=rows, cols=cols)
    tbl.style = 'Table Grid'
    idx = 0
    for r in range(rows):
        for c in range(cols):
            cell = tbl.cell(r, c)
            if idx < n:
                num, lbl = art["facts"][idx]
                cell.text = ""
                p = cell.paragraphs[0]
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                rn = p.add_run(num + "\n")
                rn.bold = True; rn.font.size = Pt(14); rn.font.color.rgb = rgb(*WHITE)
                rl = p.add_run(lbl)
                rl.font.size = Pt(8); rl.font.color.rgb = rgb(0xCC, 0xCC, 0xCC)
                set_cell_bg(cell, "1E3A5F")
                idx += 1

    doc.add_paragraph()

    # ── CHAPTERS ──
    for ch in art["chapters"]:
        num, en_title, hi_title, en_body, hi_body = ch
        # Chapter marker
        mp = doc.add_paragraph()
        mr = mp.add_run(f"{num}  |  {hi_title}")
        mr.bold = True; mr.font.size = Pt(13); mr.font.color.rgb = rgb(*TEAL)

        ep = doc.add_paragraph()
        er = ep.add_run(en_title)
        er.bold = True; er.font.size = Pt(11.5); er.font.color.rgb = rgb(*NAVY)
        ep.paragraph_format.left_indent = Cm(0.4)

        # Hindi body
        hp = doc.add_paragraph()
        hp.paragraph_format.left_indent = Cm(0.4)
        hp.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        hr2 = hp.add_run(hi_body)
        hr2.font.size = Pt(10.5)

        # English body
        enp = doc.add_paragraph()
        enp.paragraph_format.left_indent = Cm(0.4)
        enp.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        enr = enp.add_run(en_body)
        enr.font.size = Pt(10); enr.font.color.rgb = rgb(0x44, 0x40, 0x3C)
        enr.italic = True

        doc.add_paragraph("· " * 40)

    # ── FOOTER ──
    footer_p = doc.add_paragraph()
    footer_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    fr = footer_p.add_run(f"जन संवाददाता  |  Published: {art['date']}  |  All rights reserved  |  Public Interest Investigation")
    fr.font.size = Pt(8); fr.font.color.rgb = rgb(*TEAL)

    path = os.path.join(OUT, filename)
    doc.save(path)
    print(f"  DOCX saved: {path}")

# ══════════════════════════════════════════════════════════════════
#  PDF GENERATOR
# ══════════════════════════════════════════════════════════════════
def make_pdf(art, filename):
    path = os.path.join(OUT, filename)
    doc = SimpleDocTemplate(path, pagesize=A4,
                            leftMargin=2.2*cm, rightMargin=2.2*cm,
                            topMargin=2*cm, bottomMargin=2*cm)
    story = []
    W = A4[0] - 4.4*cm

    # Styles
    nav  = rl_color(NAVY);  tea = rl_color(TEAL); cri = rl_color(CRIM)
    whi  = colors.white;    lgt = rl_color(LIGHT)
    grey = colors.Color(0.4, 0.39, 0.33)

    S = getSampleStyleSheet()
    def sty(name, **kw):
        s = ParagraphStyle(name, **kw)
        return s

    s_pub   = sty('pub',   fontName='Helvetica-Bold', fontSize=20, textColor=nav,
                           alignment=TA_CENTER, spaceAfter=4)
    s_sub   = sty('sub',   fontName='Helvetica', fontSize=9, textColor=tea,
                           alignment=TA_CENTER, spaceAfter=8)
    s_thi   = sty('thi',   fontName='Helvetica-Bold', fontSize=17, textColor=nav,
                           alignment=TA_CENTER, spaceAfter=4)
    s_ten   = sty('ten',   fontName='Helvetica-Bold', fontSize=12, textColor=nav,
                           alignment=TA_CENTER, spaceAfter=4)
    s_deck  = sty('deck',  fontName='Helvetica-Oblique', fontSize=9.5, textColor=grey,
                           alignment=TA_CENTER, spaceAfter=10)
    s_ch    = sty('ch',    fontName='Helvetica-Bold', fontSize=12, textColor=tea,
                           spaceAfter=2, spaceBefore=14)
    s_entit = sty('ent',   fontName='Helvetica-Bold', fontSize=10.5, textColor=nav,
                           leftIndent=8, spaceAfter=2)
    s_body  = sty('body',  fontName='Helvetica', fontSize=10, textColor=colors.black,
                           leftIndent=8, alignment=TA_JUSTIFY, spaceAfter=4, leading=15)
    s_en    = sty('en',    fontName='Helvetica-Oblique', fontSize=9.5,
                           textColor=colors.Color(0.27, 0.25, 0.24),
                           leftIndent=8, alignment=TA_JUSTIFY, spaceAfter=6, leading=14)
    s_foot  = sty('foot',  fontName='Helvetica', fontSize=7.5, textColor=tea,
                           alignment=TA_CENTER, spaceBefore=10)

    # MASTHEAD
    story.append(Paragraph("जन संवाददाता  |  JAN SAMVADDAATA", s_pub))
    story.append(Paragraph(
        f"खोजी पत्रकारिता  •  {art['date']}  •  {art['bureau']}", s_sub))
    story.append(HRFlowable(width=W, thickness=2, color=tea))
    story.append(Spacer(1, 6))

    story.append(Paragraph(art["title_hi"], s_thi))
    story.append(Paragraph(art["title_en"], s_ten))
    story.append(Paragraph(art["deck_hi"], s_deck))
    story.append(Paragraph(art["deck_en"], s_deck))
    story.append(HRFlowable(width=W, thickness=1, color=tea))
    story.append(Spacer(1, 8))

    # FACTS BOX
    story.append(Paragraph("AT A GLANCE — मुख्य तथ्य", s_ch))
    facts = art["facts"]
    cols = 4
    rows = []
    for i in range(0, len(facts), cols):
        row = []
        for num, lbl in facts[i:i+cols]:
            cell_p = f"<font size=14 color='#FFFFFF'><b>{num}</b></font><br/>" \
                     f"<font size=7.5 color='#AAAAAA'>{lbl}</font>"
            row.append(Paragraph(cell_p, ParagraphStyle('fc', alignment=TA_CENTER, leading=14)))
        while len(row) < cols:
            row.append("")
        rows.append(row)

    col_w = W / cols
    ft = Table(rows, colWidths=[col_w]*cols, rowHeights=1.4*cm)
    ft.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), nav),
        ('GRID', (0,0), (-1,-1), 0.5, colors.Color(0.2, 0.3, 0.45)),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(ft)
    story.append(Spacer(1, 10))

    # CHAPTERS
    for ch in art["chapters"]:
        num, en_title, hi_title, en_body, hi_body = ch
        story.append(Paragraph(f"{num}  |  {hi_title}", s_ch))
        story.append(Paragraph(en_title, s_entit))
        story.append(Paragraph(hi_body, s_body))
        story.append(Paragraph(en_body, s_en))
        story.append(HRFlowable(width=W, thickness=0.5,
                                 color=colors.Color(0.83, 0.77, 0.66)))

    # FOOTER
    story.append(Spacer(1, 12))
    story.append(HRFlowable(width=W, thickness=1.5, color=nav))
    story.append(Paragraph(
        f"जन संवाददाता  |  Published: {art['date']}  |  All rights reserved  |  Public Interest Investigation",
        s_foot))

    doc.build(story)
    print(f"  PDF  saved: {path}")

# ══════════════════════════════════════════════════════════════════
#  PPTX GENERATOR
# ══════════════════════════════════════════════════════════════════
def add_text_box(slide, text, left, top, width, height,
                 font_size=18, bold=False, italic=False,
                 color=(255,255,255), align=PP_ALIGN.LEFT, wrap=True):
    txBox = slide.shapes.add_textbox(
        PInches(left), PInches(top), PInches(width), PInches(height))
    tf = txBox.text_frame
    tf.word_wrap = wrap
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    run.font.size = PPt(font_size)
    run.font.bold = bold
    run.font.italic = italic
    run.font.color.rgb = prgb(*color)
    return txBox

def fill_bg(slide, color_tuple):
    from pptx.util import Pt as PPt2
    bg = slide.background
    fill = bg.fill
    fill.solid()
    fill.fore_color.rgb = prgb(*color_tuple)

def add_rect(slide, left, top, width, height, fill, line=None):
    from pptx.util import Inches as PI
    shape = slide.shapes.add_shape(
        1,  # MSO_SHAPE_TYPE.RECTANGLE
        PI(left), PI(top), PI(width), PI(height))
    shape.fill.solid()
    shape.fill.fore_color.rgb = prgb(*fill)
    if line:
        shape.line.color.rgb = prgb(*line)
    else:
        shape.line.fill.background()
    return shape

def make_pptx(art, filename):
    prs = Presentation()
    prs.slide_width  = PInches(13.33)
    prs.slide_height = PInches(7.5)
    blank = prs.slide_layouts[6]  # blank layout

    # ── SLIDE 0: COVER ──────────────────────────────────────────
    sl = prs.slides.add_slide(blank)
    fill_bg(sl, NAVY)
    add_rect(sl, 0, 0, 13.33, 0.08, TEAL)        # top accent bar
    add_rect(sl, 0, 7.42, 13.33, 0.08, TEAL)     # bottom accent bar

    add_text_box(sl, "जन संवाददाता  |  JAN SAMVADDAATA",
                 0.4, 0.3, 12.5, 0.6, 14, bold=True, color=TEAL, align=PP_ALIGN.CENTER)
    add_text_box(sl, "खोजी पत्रकारिता  |  INVESTIGATIVE JOURNALISM",
                 0.4, 0.9, 12.5, 0.4, 10, color=(180,190,200), align=PP_ALIGN.CENTER)
    add_rect(sl, 1.5, 1.4, 10.33, 0.04, TEAL)

    add_text_box(sl, art["title_hi"],
                 0.6, 1.6, 12.1, 1.2, 32, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
    add_text_box(sl, art["title_en"],
                 0.6, 2.9, 12.1, 0.8, 18, bold=True, color=(160,200,220), align=PP_ALIGN.CENTER)
    add_text_box(sl, art["deck_hi"],
                 0.6, 3.85, 12.1, 0.6, 11, italic=True, color=(180,190,180), align=PP_ALIGN.CENTER)
    add_text_box(sl, art["deck_en"],
                 0.6, 4.45, 12.1, 0.6, 10, italic=True, color=(160,175,165), align=PP_ALIGN.CENTER)
    add_rect(sl, 1.5, 5.15, 10.33, 0.04, TEAL)
    add_text_box(sl, f"{art['pub']}  •  {art['date']}  •  {art['bureau']}",
                 0.4, 5.3, 12.5, 0.4, 9, color=(120,140,150), align=PP_ALIGN.CENTER)

    # ── SLIDE 1: KEY FACTS ──────────────────────────────────────
    sl = prs.slides.add_slide(blank)
    fill_bg(sl, NAVY)
    add_rect(sl, 0, 0, 13.33, 0.07, TEAL)
    add_text_box(sl, "AT A GLANCE  —  मुख्य तथ्य  |  KEY FACTS",
                 0.3, 0.15, 12.5, 0.5, 14, bold=True, color=TEAL, align=PP_ALIGN.CENTER)

    facts = art["facts"]
    per_row = 4
    rows = [facts[i:i+per_row] for i in range(0, len(facts), per_row)]
    card_w = 3.0; card_h = 1.35; x_start = 0.3; gap = 0.13
    for ri, row in enumerate(rows):
        y = 0.85 + ri * (card_h + 0.18)
        for ci, (num, lbl) in enumerate(row):
            x = x_start + ci * (card_w + gap)
            add_rect(sl, x, y, card_w, card_h, (0x28, 0x50, 0x80), TEAL)
            add_text_box(sl, num, x+0.1, y+0.1, card_w-0.2, 0.7,
                         22, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
            add_text_box(sl, lbl, x+0.1, y+0.75, card_w-0.2, 0.55,
                         8.5, color=(180,195,210), align=PP_ALIGN.CENTER)

    # ── ONE SLIDE PER CHAPTER ───────────────────────────────────
    palette_bg = [
        (0x1E, 0x3A, 0x5F),   # navy
        (0x1A, 0x2E, 0x50),
        (0x12, 0x24, 0x42),
        (0x0F, 0x2A, 0x3E),
        (0x1C, 0x18, 0x14),   # dark brown
        (0x1A, 0x05, 0x33),   # dark purple
        (0x14, 0x24, 0x20),   # dark teal
        (0x1E, 0x3A, 0x5F),
        (0x1A, 0x2E, 0x50),
        (0x12, 0x24, 0x42),
    ]
    for i, ch in enumerate(art["chapters"]):
        num, en_title, hi_title, en_body, hi_body = ch
        bg = palette_bg[i % len(palette_bg)]
        sl = prs.slides.add_slide(blank)
        fill_bg(sl, bg)
        add_rect(sl, 0, 0, 13.33, 0.07, TEAL)
        add_rect(sl, 0, 7.43, 13.33, 0.07, TEAL)

        # Chapter number badge
        add_rect(sl, 0.3, 0.18, 1.1, 0.45, TEAL)
        add_text_box(sl, num, 0.3, 0.18, 1.1, 0.45,
                     11, bold=True, color=WHITE, align=PP_ALIGN.CENTER)

        # Hindi title
        add_text_box(sl, hi_title, 1.55, 0.15, 11.4, 0.6,
                     18, bold=True, color=WHITE)
        # English title
        add_text_box(sl, en_title, 1.55, 0.72, 11.4, 0.45,
                     12, bold=True, color=(160, 200, 220))
        # Divider
        add_rect(sl, 0.3, 1.28, 12.73, 0.03, TEAL)

        # Hindi body (left column)
        wrapped_hi = textwrap.fill(hi_body, width=80)
        add_text_box(sl, wrapped_hi, 0.3, 1.4, 6.2, 5.5,
                     11, color=(220, 225, 230))

        # English body (right column)
        wrapped_en = textwrap.fill(en_body, width=80)
        add_text_box(sl, wrapped_en, 6.8, 1.4, 6.2, 5.5,
                     10.5, italic=True, color=(170, 185, 195))

        # Vertical divider
        add_rect(sl, 6.6, 1.4, 0.03, 5.5, TEAL)

        # Slide number bottom right
        add_text_box(sl, f"{i+3} / {len(art['chapters'])+2}",
                     12.0, 7.1, 1.2, 0.3, 8, color=(100,120,140), align=PP_ALIGN.RIGHT)

    # ── FINAL SLIDE: CALL TO ACTION ─────────────────────────────
    sl = prs.slides.add_slide(blank)
    fill_bg(sl, (0x7F, 0x1D, 0x1D))
    add_rect(sl, 0, 0, 13.33, 0.07, (0xFF, 0xA0, 0xA0))
    add_rect(sl, 0, 7.43, 13.33, 0.07, (0xFF, 0xA0, 0xA0))
    add_text_box(sl, "🚨  ACT NOW  —  अभी कार्रवाई करें  🚨",
                 0.5, 0.5, 12.33, 0.8, 22, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
    add_text_box(sl,
        "RTI FILE करें  •  CAG Audit माँगें  •  ACB को सूचित करें\n"
        "File RTI  •  Demand CAG Audit  •  Alert Anti-Corruption Bureau",
        0.5, 1.5, 12.33, 1.0, 14, color=(255,200,200), align=PP_ALIGN.CENTER)
    add_text_box(sl,
        '"जब तक system की monitoring नहीं होगी —\nजनता का पैसा डूबता रहेगा।"\n\n'
        '"Until the system is monitored,\npublic money will keep draining."',
        1.0, 3.0, 11.33, 2.8, 16, italic=True, color=WHITE, align=PP_ALIGN.CENTER)
    add_text_box(sl,
        f"जन संवाददाता  |  {art['date']}  |  Public Interest Investigation",
        0.5, 6.8, 12.33, 0.5, 9, color=(200,150,150), align=PP_ALIGN.CENTER)

    path = os.path.join(OUT, filename)
    prs.save(path)
    print(f"  PPTX saved: {path}")

# ══════════════════════════════════════════════════════════════════
#  MAIN — Generate all 6 files
# ══════════════════════════════════════════════════════════════════
if __name__ == "__main__":
    print("\n=== Generating IFMS 3.0 Article ===")
    make_docx(IFMS, "IFMS-Rajasthan-Investigation.docx")
    make_pdf (IFMS, "IFMS-Rajasthan-Investigation.pdf")
    make_pptx(IFMS, "IFMS-Rajasthan-Investigation.pptx")

    print("\n=== Generating eMB Corruption Article ===")
    make_docx(EMB, "PWD-eMB-Corruption-Investigation.docx")
    make_pdf (EMB, "PWD-eMB-Corruption-Investigation.pdf")
    make_pptx(EMB, "PWD-eMB-Corruption-Investigation.pptx")

    print("\n✅  All 6 files generated in:", OUT)
