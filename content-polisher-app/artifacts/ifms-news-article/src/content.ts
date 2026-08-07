export type Language = 'en' | 'hi';
export type Tone = 'past' | 'pivot' | 'watch';

export type TimelineItem = {
  date: string;
  label: string;
  detail: string;
  tone: Tone;
};

export type Slide = {
  number: string;
  kicker: string;
  title: string;
  takeaway: string;
  copy: string;
  accent: string;
};

export type EvidenceRowData = {
  label: string;
  detail: string;
  status: string;
};

export type ReportContent = {
  eyebrow: string;
  location: string;
  title: string;
  dek: string;
  metadata: string[];
  editorTitle: string;
  editorQuote: string;
  editorBody: string;
  summaryLabel: string;
  summary: string;
  establishedLabel: string;
  established: string;
  reportedLabel: string;
  reported: string;
  sections: { id: string; number: string; title: string; paragraphs: string[] }[];
  toc: string[];
  operational: string[];
  observationTitle: string;
  observation: string;
  evidence: EvidenceRowData[];
  distinction: string;
  checklist: string[];
  publicTestTitle: string;
  publicTest: string;
  publicTestBody: string;
  deskNote: string;
  establishedKey: string;
  reportedKey: string;
  jump: string;
};

export const reports: Record<Language, ReportContent> = {
  en: {
    eyebrow: 'Investigation / systems',
    location: 'Rajasthan · 2026',
    title: 'When the payment trail moves, who can still follow it?',
    dek: 'Rajasthan’s PWD and Irrigation departments moved contractor payments from WAM / PayManager toward IFMS 3.0. The source brief describes a handover where the new record was not yet fully systematic — and where the proof around a bill matters as much as the payment itself.',
    metadata: ['Edited source brief', 'Read time · 9 min', 'Report view'],
    editorTitle: 'Editor’s note',
    editorQuote: 'This is a record of transition, not a verdict.',
    editorBody: 'Observations and reported concerns are kept distinct from established facts. The open questions are part of the story.',
    summaryLabel: 'Executive summary',
    summary: 'A digital migration is also a migration of accountability: every sanction, measurement, quality check and material record must remain attached to the bill.',
    establishedLabel: 'What is established:',
    established: 'WAM / PayManager handled online contractor bill payments since 2012. The Finance Department trained officials on 2 July 2026. WAM processing stopped on 10 July as IFMS 3.0 migration and stabilisation continued.',
    reportedLabel: 'What remains reported:',
    reported: 'By 1 August, the new portal was not yet systematic, with inconsistent vendor names and incomplete security-deposit integration. The source also flags paperwork, training, role and evidence gaps.',
    sections: [
      { id: 'chapter-record', number: '01', title: 'The handover happened in stages', paragraphs: ['The old and new systems did not change places in a single clean moment. WAM and PayManager had been the online route for contractor bill payments since 2012. From January 2025, however, new works and contracts were expected to establish a fuller identity inside IFMS 2.0.', 'That identity was meant to travel through the work, administrative sanction, technical sanction, BOQ, package, work order and approved abstract IDs. Measurements were intended to be entered in the electronic Measurement Book. In principle, the payment would sit at the end of a connected chain rather than as an isolated transaction.'] },
      { id: 'chapter-strain', number: '02', title: 'The operational strain is visible in the paperwork', paragraphs: ['The source brief does not describe a system that failed in one dramatic instant. It describes friction: too many supporting pages, limited training and monitoring, and a greater burden on outsourced staff and computer centres.'] },
      { id: 'chapter-evidence', number: '03', title: 'The bill needs to carry its proof', paragraphs: ['A payment system can show that money moved. An accountable works record must also show what the money was for, how the work was measured and whether the materials and quality checks were documented.'] },
      { id: 'chapter-accountability', number: '04', title: 'A minimum accountability checklist', paragraphs: ['The corrective direction is practical: make the original bill and its supporting evidence travel together. Where a digital line entry cannot be made, the physical record should not disappear into the gap.'] },
    ],
    toc: ['The handover', 'What should travel with a bill', 'Where the process strains', 'The evidence gap', 'A minimum checklist'],
    operational: ['Too many supporting pages to move one bill forward', 'Limited staff training and monitoring during the transition', 'Greater outsourcing / computer-centre burden', 'Unclear segregation of maker, checker and approver roles'],
    observationTitle: 'Reported observation',
    observation: 'These are reported operational concerns from the source brief, not an independent finding about any individual office or official.',
    evidence: [
      { label: 'Measurement Book', detail: 'Line-by-line records were described as missing or inaccessible in some cases.', status: 'Needs verification' },
      { label: 'QC test abstracts', detail: 'The source raises concern that quality-control test abstracts may be absent.', status: 'Not consistently attached' },
      { label: 'Bitumen / material record', detail: 'Bitumen CRC, material receipt documents and consumption statements were flagged.', status: 'Evidence gap' },
      { label: 'Public visibility', detail: 'Bill-level records were described as difficult for the public to see and follow.', status: 'Limited' },
    ],
    distinction: 'The brief raises evidence and transparency concerns. It does not, by itself, prove that a false bill, substandard work or corrupt payment occurred.',
    checklist: ['Original contractor bill attached', 'Complete physical MB PDF attached where digital line entry is unavailable', 'QC abstracts attached', 'Bitumen certificates attached', 'Consumption statements attached', 'Missing enclosures trigger scrutiny before approval'],
    publicTestTitle: 'The public test',
    publicTest: 'Can a reader trace a payment from sanction to measurement, quality check and material use?',
    publicTestBody: 'If the answer is no, the migration has changed the interface without yet completing the accountability chain.',
    deskNote: 'Separate what was seen from what is suspected.',
    establishedKey: 'Established in brief',
    reportedKey: 'Reported concern',
    jump: 'Jump to checklist',
  },
  hi: {
    eyebrow: 'जांच / व्यवस्था',
    location: 'राजस्थान · 2026',
    title: 'भुगतान की राह बदल जाए, तो उसे कौन देख पाएगा?',
    dek: 'राजस्थान के PWD और सिंचाई विभागों में ठेकेदारों के भुगतान WAM / PayManager से IFMS 3.0 की ओर ले जाए गए। उपलब्ध स्रोत-नोट के अनुसार यह बदलाव ऐसे समय हुआ जब नई व्यवस्था का रिकॉर्ड अभी पूरी तरह व्यवस्थित नहीं था — और जब किसी बिल के साथ उसका प्रमाण भी उतना ही जरूरी है जितना भुगतान।',
    metadata: ['संपादित स्रोत-रिपोर्ट', 'पढ़ने का समय · 9 मिनट', 'रिपोर्ट'],
    editorTitle: 'संपादकीय टिप्पणी',
    editorQuote: 'यह बदलाव का रिकॉर्ड है, फैसला नहीं।',
    editorBody: 'देखी गई बातों और उठाई गई चिंताओं को स्थापित तथ्यों से अलग रखा गया है। खुले सवाल भी इस कहानी का हिस्सा हैं।',
    summaryLabel: 'संक्षिप्त सार',
    summary: 'डिजिटल माइग्रेशन केवल सिस्टम बदलना नहीं है; यह जवाबदेही का भी माइग्रेशन है। हर स्वीकृति, माप, गुणवत्ता-जांच और सामग्री का रिकॉर्ड बिल से जुड़ा रहना चाहिए।',
    establishedLabel: 'क्या स्थापित है:',
    established: '2012 से WAM / PayManager के जरिए ठेकेदारों के बिलों का ऑनलाइन भुगतान होता था। 2 जुलाई 2026 को वित्त विभाग ने अधिकारियों को प्रशिक्षण दिया। IFMS 3.0 में माइग्रेशन और स्थिरीकरण के बीच WAM पर बिल प्रक्रिया 10 जुलाई को रोक दी गई।',
    reportedLabel: 'क्या रिपोर्ट के रूप में सामने आया:',
    reported: '1 अगस्त तक नया पोर्टल पूरी तरह व्यवस्थित नहीं बताया गया; विक्रेताओं के नाम लगातार दिखाई नहीं दे रहे थे और सुरक्षा-जमा रिकॉर्ड का एकीकरण अधूरा बताया गया। स्रोत में कागजी प्रक्रिया, प्रशिक्षण, भूमिकाओं और प्रमाण से जुड़े अंतर भी उठाए गए हैं।',
    sections: [
      { id: 'chapter-record', number: '01', title: 'बदलाव एक ही दिन में नहीं हुआ', paragraphs: ['पुरानी और नई व्यवस्था ने एक ही साफ क्षण में एक-दूसरे की जगह नहीं ली। 2012 से WAM और PayManager ठेकेदारों के बिल भुगतान का ऑनलाइन रास्ता थे। लेकिन जनवरी 2025 से नए काम और अनुबंधों के लिए IFMS 2.0 में अधिक पूरा रिकॉर्ड बनाना अपेक्षित था।', 'इस रिकॉर्ड में work ID, administrative sanction ID, technical sanction ID, BOQ ID, package ID, work order ID और approved abstract ID शामिल थे। माप को electronic Measurement Book में दर्ज किया जाना था। सिद्धांत रूप में भुगतान एक जुड़े हुए रिकॉर्ड-चेन का अंतिम चरण होना था, अलग-थलग लेनदेन नहीं।'] },
      { id: 'chapter-strain', number: '02', title: 'कागजी प्रक्रिया में बदलाव का दबाव दिखता है', paragraphs: ['स्रोत-नोट किसी एक नाटकीय क्षण में सिस्टम के विफल होने की बात नहीं करता। उसमें घर्षण की बात है: एक बिल के साथ बहुत अधिक पन्ने, सीमित प्रशिक्षण और निगरानी, तथा outsourcing और computer centres पर बढ़ता बोझ।'] },
      { id: 'chapter-evidence', number: '03', title: 'बिल को अपना प्रमाण साथ लेकर चलना चाहिए', paragraphs: ['भुगतान प्रणाली यह दिखा सकती है कि पैसा चला गया। जवाबदेह works record को यह भी दिखाना होगा कि पैसा किस काम के लिए था, काम कैसे मापा गया और सामग्री व quality checks का दस्तावेज बना या नहीं।'] },
      { id: 'chapter-accountability', number: '04', title: 'न्यूनतम जवाबदेही चेकलिस्ट', paragraphs: ['सुधार की दिशा व्यावहारिक है: मूल बिल और उससे जुड़े प्रमाण एक साथ आगे बढ़ें। जहां digital line entry संभव नहीं है, वहां physical record इस अंतराल में गायब नहीं होना चाहिए।'] },
    ],
    toc: ['बदलाव का क्रम', 'बिल के साथ क्या रहना चाहिए', 'प्रक्रिया का दबाव', 'प्रमाण का अंतर', 'न्यूनतम चेकलिस्ट'],
    operational: ['एक बिल आगे बढ़ाने के लिए बहुत अधिक supporting pages', 'बदलाव के दौरान कर्मचारियों का सीमित प्रशिक्षण और निगरानी', 'outsourcing / computer-centre पर बढ़ता बोझ', 'maker, checker और approver की भूमिकाओं का स्पष्ट अलगाव नहीं'],
    observationTitle: 'रिपोर्टेड observation',
    observation: 'ये स्रोत-नोट में उठाई गई संचालन संबंधी चिंताएं हैं; किसी कार्यालय या अधिकारी के बारे में स्वतंत्र निष्कर्ष नहीं।',
    evidence: [
      { label: 'Measurement Book', detail: 'कुछ मामलों में line-by-line रिकॉर्ड के उपलब्ध या सुलभ न होने की बात कही गई है।', status: 'सत्यापन जरूरी' },
      { label: 'QC test abstracts', detail: 'स्रोत में quality-control test abstracts के अनुपस्थित होने की आशंका उठाई गई है।', status: 'नियमित रूप से संलग्न नहीं' },
      { label: 'Bitumen / material record', detail: 'Bitumen CRC, material receipt documents और consumption statements का उल्लेख किया गया है।', status: 'प्रमाण का अंतर' },
      { label: 'Public visibility', detail: 'बिल-स्तर के रिकॉर्ड आम नागरिकों के लिए देखना और समझना कठिन बताया गया है।', status: 'सीमित' },
    ],
    distinction: 'स्रोत में प्रमाण और transparency से जुड़ी चिंताएं उठाई गई हैं। इससे अकेले false bill, घटिया काम या भ्रष्ट भुगतान सिद्ध नहीं होता।',
    checklist: ['मूल contractor bill संलग्न हो', 'जहां digital line entry संभव न हो, वहां पूरा physical MB PDF संलग्न हो', 'QC abstracts संलग्न हों', 'Bitumen certificates संलग्न हों', 'Consumption statements संलग्न हों', 'संलग्नक न होने पर approval से पहले scrutiny हो'],
    publicTestTitle: 'जनता की कसौटी',
    publicTest: 'क्या कोई पाठक sanction से measurement, quality check और material use तक भुगतान का पूरा रास्ता देख सकता है?',
    publicTestBody: 'यदि जवाब नहीं है, तो माइग्रेशन ने interface तो बदल दिया है, लेकिन जवाबदेही की पूरी कड़ी अभी नहीं बनी।',
    deskNote: 'जो देखा गया है, उसे जो संदिग्ध है उससे अलग रखें।',
    establishedKey: 'स्रोत में स्थापित',
    reportedKey: 'रिपोर्टेड चिंता',
    jump: 'चेकलिस्ट पर जाएं',
  },
};

export const timelines: Record<Language, TimelineItem[]> = {
  en: [
    { date: 'Since 2012', label: 'The old rails', detail: 'Contractor bill payments were processed online through WAM and PayManager Rajasthan portals.', tone: 'past' },
    { date: 'Jan 2025', label: 'A new record begins', detail: 'New works and contracts were expected to be recorded in IFMS 2.0 with sanction, BOQ, package, work order and approved abstract IDs.', tone: 'past' },
    { date: '02 Jul 2026', label: 'Training before the switch', detail: 'The Finance Department trained PWD and Irrigation officials as the migration approached.', tone: 'pivot' },
    { date: '06 Jul 2026', label: 'Last regular WAM payment', detail: 'WAM continued regular payments up to this date, according to the source brief.', tone: 'pivot' },
    { date: '10 Jul 2026', label: 'Processing stopped', detail: 'WAM bill processing was stopped while data migration and IFMS 3.0 stabilisation continued.', tone: 'pivot' },
    { date: '01 Aug 2026', label: 'A system still settling', detail: 'The source reports that vendor names were not appearing consistently and security-deposit records were not fully integrated.', tone: 'watch' },
  ],
  hi: [
    { date: '2012 से', label: 'पुरानी व्यवस्था', detail: 'ठेकेदारों के बिलों का भुगतान WAM और PayManager Rajasthan portals के जरिए ऑनलाइन होता था।', tone: 'past' },
    { date: 'जनवरी 2025', label: 'नया रिकॉर्ड शुरू', detail: 'नए काम और अनुबंधों के लिए IFMS 2.0 में sanction, BOQ, package, work order और approved abstract IDs दर्ज करना अपेक्षित था।', tone: 'past' },
    { date: '02 जुलाई 2026', label: 'बदलाव से पहले प्रशिक्षण', detail: 'माइग्रेशन से पहले वित्त विभाग ने PWD और सिंचाई अधिकारियों को प्रशिक्षण दिया।', tone: 'pivot' },
    { date: '06 जुलाई 2026', label: 'WAM का आखिरी नियमित भुगतान', detail: 'स्रोत-नोट के अनुसार इस तारीख तक WAM पर नियमित भुगतान जारी था।', tone: 'pivot' },
    { date: '10 जुलाई 2026', label: 'प्रक्रिया रोकी गई', detail: 'Data migration और IFMS 3.0 stabilisation के बीच WAM पर बिल प्रक्रिया रोक दी गई।', tone: 'pivot' },
    { date: '01 अगस्त 2026', label: 'व्यवस्था अभी स्थिर नहीं', detail: 'स्रोत के अनुसार vendor names लगातार दिखाई नहीं दे रहे थे और security-deposit records पूरी तरह integrate नहीं हुए थे।', tone: 'watch' },
  ],
};

export const slideDecks: Record<Language, Slide[]> = {
  en: [
    { number: '01', kicker: 'THE SWITCH', title: 'A payment system changes midstream', takeaway: 'Rajasthan’s works departments moved from a familiar WAM / PayManager workflow toward IFMS 3.0 in July 2026.', copy: 'Since 2012, contractor bills had been processed online through WAM and PayManager. The migration promised a new chain of records — but the handover was still settling when the old route closed.', accent: 'amber' },
    { number: '02', kicker: 'WHAT CHANGED', title: 'From a payment portal to a linked work record', takeaway: 'IFMS 2.0 required each new work to carry its identity through approvals, quantities and the final bill.', copy: 'From January 2025, new works and contracts were expected to be recorded with work, administrative sanction, technical sanction, BOQ, package, work order and approved abstract IDs. Measurements were intended for the electronic Measurement Book.', accent: 'blue' },
    { number: '03', kicker: 'THE TIMELINE', title: 'Training came before the old route closed', takeaway: 'Officials were trained on 2 July; WAM payments continued to 6 July and processing stopped on 10 July.', copy: 'That short sequence matters. Data migration and IFMS 3.0 stabilisation were still underway when the legacy workflow stopped. By 1 August, the source described the new portal as not yet systematic.', accent: 'terracotta' },
    { number: '04', kicker: 'OPERATIONAL STRAIN', title: 'More pages, more handoffs, less certainty', takeaway: 'Reported concerns point to a process carrying more paperwork without a clear enough control map.', copy: 'The source describes too many supporting pages, limited staff training and monitoring, a heavier outsourcing / computer-centre burden, and unclear segregation between maker, checker and approver roles.', accent: 'sage' },
    { number: '05', kicker: 'EVIDENCE GAPS', title: 'A payment record is only as strong as its enclosures', takeaway: 'Missing line-by-line records make it harder to test whether a bill describes work actually measured and checked.', copy: 'The source raises concerns about missing or inaccessible line-by-line Measurement Book records, absent QC test abstracts, missing Bitumen CRC / material receipt documents and consumption statements.', accent: 'ink' },
    { number: '06', kicker: 'CORRUPTION RISK', title: 'Opacity is a control failure, not a finding', takeaway: 'The brief raises risk questions; it does not establish that corruption occurred.', copy: 'When vendor names appear inconsistently, security-deposit records are not fully integrated and roles are unclear, scrutiny becomes harder. These are reported concerns that require verification — not proven allegations.', accent: 'terracotta' },
    { number: '07', kicker: 'PUBLIC IMPACT', title: 'The public cannot easily follow the bill', takeaway: 'Limited bill-level visibility leaves citizens unable to trace payment to measurement, quality and material use.', copy: 'A system built for public works should let an interested reader understand what was sanctioned, measured, tested and paid. At present, the source points to limited public visibility into that bill-level chain.', accent: 'blue' },
    { number: '08', kicker: 'RECOMMENDATIONS', title: 'Make the bill carry its proof', takeaway: 'No enclosure, no quiet approval: missing records should trigger scrutiny.', copy: 'Attach the original contractor bill, a complete physical MB PDF where digital line entry is unavailable, QC abstracts, bitumen certificates and consumption statements. Keep maker / checker / approver roles visible and make bill-level records accessible.', accent: 'amber' },
  ],
  hi: [
    { number: '01', kicker: 'बदलाव', title: 'भुगतान व्यवस्था बीच रास्ते में बदल गई', takeaway: 'राजस्थान के works departments जुलाई 2026 में WAM / PayManager से IFMS 3.0 की ओर बढ़े।', copy: '2012 से ठेकेदारों के बिल WAM और PayManager पर process होते थे। नई व्यवस्था ने रिकॉर्ड की एक नई chain का वादा किया, लेकिन पुराना रास्ता बंद होने तक handover पूरी तरह स्थिर नहीं हुआ था।', accent: 'amber' },
    { number: '02', kicker: 'क्या बदला', title: 'Payment portal से linked work record तक', takeaway: 'IFMS 2.0 में हर नए काम की पहचान approval, quantity और final bill तक साथ चलनी थी।', copy: 'जनवरी 2025 से नए कामों और अनुबंधों के लिए work, administrative sanction, technical sanction, BOQ, package, work order और approved abstract IDs अपेक्षित थे। Measurement Book में माप दर्ज होना था।', accent: 'blue' },
    { number: '03', kicker: 'समय-क्रम', title: 'पुरानी प्रक्रिया बंद होने से पहले प्रशिक्षण हुआ', takeaway: '2 जुलाई को training, 6 जुलाई तक WAM payments और 10 जुलाई को processing बंद हुई।', copy: 'यह छोटा-सा क्रम महत्वपूर्ण है। WAM बंद होने के समय data migration और IFMS 3.0 stabilisation अभी चल रहे थे। 1 अगस्त तक स्रोत ने नए portal को पूरी तरह व्यवस्थित नहीं बताया।', accent: 'terracotta' },
    { number: '04', kicker: 'संचालन का दबाव', title: 'अधिक पन्ने, अधिक handoffs, कम निश्चितता', takeaway: 'रिपोर्टेड चिंताएं बताती हैं कि paperwork बढ़ा, लेकिन control map पर्याप्त स्पष्ट नहीं हुआ।', copy: 'स्रोत में supporting pages की अधिकता, staff training और monitoring की कमी, outsourcing / computer-centre पर बढ़ते बोझ और maker, checker, approver roles के स्पष्ट अलगाव की कमी का उल्लेख है।', accent: 'sage' },
    { number: '05', kicker: 'प्रमाण का अंतर', title: 'भुगतान रिकॉर्ड उतना ही मजबूत है जितने उसके enclosures', takeaway: 'Line-by-line रिकॉर्ड न होने पर यह जांचना कठिन होता है कि बिल वास्तव में मापे और जांचे गए काम को दर्शाता है या नहीं।', copy: 'स्रोत में line-by-line Measurement Book records, QC test abstracts, Bitumen CRC / material receipt documents और consumption statements से जुड़े gaps उठाए गए हैं।', accent: 'ink' },
    { number: '06', kicker: 'जोखिम', title: 'Opacity control failure हो सकती है, finding नहीं', takeaway: 'Brief जोखिम के सवाल उठाता है; इससे corruption सिद्ध नहीं होता।', copy: 'Vendor names का असंगत दिखना, security-deposit records का अधूरा integration और unclear roles scrutiny को कठिन बना सकते हैं। ये verification की जरूरत वाली reported concerns हैं, proven allegations नहीं।', accent: 'terracotta' },
    { number: '07', kicker: 'जनता पर असर', title: 'जनता के लिए bill follow करना आसान नहीं', takeaway: 'कम bill-level visibility से payment को measurement, quality और material use से जोड़ना कठिन होता है।', copy: 'Public works system में interested reader को समझ आना चाहिए कि क्या sanction हुआ, क्या measure हुआ, क्या test हुआ और क्या pay हुआ। स्रोत इस chain की limited public visibility की ओर संकेत करता है।', accent: 'blue' },
    { number: '08', kicker: 'सिफारिश', title: 'बिल को अपना proof साथ रखना चाहिए', takeaway: 'Enclosure नहीं तो quiet approval नहीं; missing records scrutiny शुरू करें।', copy: 'Original contractor bill, complete physical MB PDF, QC abstracts, bitumen certificates और consumption statements संलग्न हों। Maker / checker / approver roles visible हों और bill-level records accessible बनाए जाएं।', accent: 'amber' },
  ],
};