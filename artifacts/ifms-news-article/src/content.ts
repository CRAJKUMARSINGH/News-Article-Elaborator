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

type DeepDiveSeed = {
  title: { en: string; hi: string };
  focus: { en: string; hi: string };
  detail: { en: string; hi: string };
  question: { en: string; hi: string };
};

type DeepDive = {
  title: string;
  paragraphs: string[];
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
  longform: DeepDive[];
};

const deepDiveSeeds: DeepDiveSeed[] = [
  {
    title: { en: 'A migration is a records problem before it is a software problem', hi: 'माइग्रेशन पहले रिकॉर्ड की समस्या है, software की बाद में' },
    focus: { en: 'A new interface can be switched on quickly, but an accountable record has to carry history, identifiers, approvals and exceptions across the switch.', hi: 'नया interface जल्दी शुरू किया जा सकता है, लेकिन जवाबदेह record को switch के आर-पार history, identifiers, approvals और exceptions साथ लेकर चलने पड़ते हैं।' },
    detail: { en: 'The brief is most useful when read as a question about continuity rather than as a simple comparison between two portals.', hi: 'Brief को दो portals की साधारण तुलना की तरह नहीं, बल्कि continuity के सवाल की तरह पढ़ना सबसे उपयोगी है।' },
    question: { en: 'Can an officer or citizen start with one payment reference and reach the original work, approval and measurement without relying on an undocumented personal explanation?', hi: 'क्या कोई अधिकारी या नागरिक एक payment reference से शुरू करके बिना किसी undocumented व्यक्तिगत explanation के original work, approval और measurement तक पहुंच सकता है?' },
  },
  {
    title: { en: 'What "systematic" should mean in a payment record', hi: 'Payment record में "systematic" का अर्थ क्या होना चाहिए' },
    focus: { en: 'A systematic portal is not merely one that accepts entries; it gives every bill a stable identity, a predictable sequence and a visible explanation when the normal sequence breaks.', hi: 'Systematic portal केवल entries स्वीकार करने वाला portal नहीं है; वह हर bill को stable identity, predictable sequence और normal sequence टूटने पर visible explanation देता है।' },
    detail: { en: 'In practical terms, systematic means that a reviewer does not have to guess whether two names, two numbers or two attachments refer to the same work.', hi: 'व्यावहारिक अर्थ में systematic का मतलब है कि reviewer को यह अनुमान न लगाना पड़े कि दो names, दो numbers या दो attachments एक ही work से जुड़े हैं।' },
    question: { en: 'Which fields are mandatory, which are inherited from an earlier stage, and which exception is created when a field is unavailable during migration?', hi: 'कौन-से fields mandatory हैं, कौन-से पहले stage से आते हैं, और migration में field unavailable होने पर कौन-सा exception बनता है?' },
  },
  {
    title: { en: 'The difference between a payment trail and a work trail', hi: 'Payment trail और work trail के बीच का अंतर' },
    focus: { en: 'A payment trail can establish that a transaction was initiated, processed or settled; a work trail must also connect that transaction to a physical claim and a measured quantity.', hi: 'Payment trail यह बता सकता है कि transaction initiate, process या settle हुआ; work trail को उस transaction को physical claim और measured quantity से भी जोड़ना होगा।' },
    detail: { en: 'That distinction keeps the report from asking one screen to prove what only a linked set of records can establish.', hi: 'यह अंतर report को इस गलती से बचाता है कि एक screen से वह बात साबित मान ली जाए जिसे records की linked set ही स्थापित कर सकती है।' },
    question: { en: 'Does the payment reference lead to a work identity and then to the measurement and approval that explain the amount?', hi: 'क्या payment reference work identity तक और फिर उस measurement और approval तक पहुंचाता है जो amount को explain करते हैं?' },
  },
  {
    title: { en: 'Why the January 2025 expectation matters', hi: 'जनवरी 2025 की अपेक्षा क्यों महत्वपूर्ण है' },
    focus: { en: 'The expectation that new works and contracts would carry a fuller IFMS 2.0 identity created a reference point against which later records can be checked.', hi: 'नए works और contracts के लिए fuller IFMS 2.0 identity की अपेक्षा ने बाद के records को जांचने के लिए एक reference point बनाया।' },
    detail: { en: 'It does not automatically answer whether each record complied; it tells a reviewer which links should be sought when examining a later bill.', hi: 'यह अपने-आप नहीं बताता कि हर record compliant था; यह बताता है कि बाद के bill को जांचते समय कौन-से links तलाशने चाहिए।' },
    question: { en: 'For a work begun after the stated transition point, are the expected identifiers present, consistent and connected to the final bill?', hi: 'दिए गए transition point के बाद शुरू हुए work में expected identifiers मौजूद, consistent और final bill से connected हैं?' },
  },
  {
    title: { en: 'The handover window is an evidence category of its own', hi: 'Handover window अपने-आप में evidence की एक category है' },
    focus: { en: 'Bills created before the switch, bills migrated during the switch and bills completed after the switch may each require a different reconciliation note.', hi: 'Switch से पहले बने bills, switch के दौरान migrate हुए bills और switch के बाद complete हुए bills के लिए अलग reconciliation note की जरूरत हो सकती है।' },
    detail: { en: 'Treating every record as if it was born inside the same system can conceal the exact point where an identifier or enclosure was carried forward.', hi: 'हर record को एक ही system के भीतर बना मानना उस exact point को छिपा सकता है जहां identifier या enclosure आगे ले जाया गया था।' },
    question: { en: 'What was the bill\'s starting system, what was its destination system, and where is the documented bridge between them?', hi: 'Bill किस starting system में था, किस destination system में पहुंचा, और दोनों के बीच documented bridge कहां है?' },
  },
  {
    title: { en: 'Training is a control, not a ceremonial event', hi: 'Training एक control है, ceremonial event नहीं' },
    focus: { en: 'The 2 July training date matters only when it is connected to attendance, role-specific practice, follow-up support and evidence that staff could complete the new workflow.', hi: '2 जुलाई की training date तभी meaningful है जब वह attendance, role-specific practice, follow-up support और नए workflow को पूरा कर पाने के evidence से जुड़ी हो।' },
    detail: { en: 'A single briefing may explain a screen, but it cannot by itself resolve how old documents, exceptions and incomplete integrations should be handled.', hi: 'एक briefing screen समझा सकती है, लेकिन पुराने documents, exceptions और incomplete integrations को कैसे संभालना है, यह अकेले नहीं सुलझा सकती।' },
    question: { en: 'After training, who could answer a bill-level question, and was that answer recorded for staff and contractors who were not in the room?', hi: 'Training के बाद bill-level सवाल का जवाब कौन दे सकता था, और क्या वह जवाब उन staff और contractors के लिए record किया गया जो room में नहीं थे?' },
  },
  {
    title: { en: 'A short timeline can create a long backlog', hi: 'छोटा timeline लंबा backlog बना सकता है' },
    focus: { en: 'When regular payments continue until 6 July and processing stops on 10 July, offices have only a narrow window to reconcile pending work, migrated data and new instructions.', hi: 'जब regular payments 6 जुलाई तक चलें और processing 10 जुलाई को रुक जाए, तो offices के पास pending work, migrated data और नई instructions reconcile करने के लिए छोटा window रहता है।' },
    detail: { en: 'The existence of a tight window is not evidence that a backlog occurred, but it is a reason to ask how backlog risk was monitored and cleared.', hi: 'Tight window अपने-आप backlog का evidence नहीं है, लेकिन यह पूछने का कारण है कि backlog risk को कैसे monitor और clear किया गया।' },
    question: { en: 'Was there a dated inventory of bills in preparation, bills returned for correction, bills awaiting approval and bills transferred between systems?', hi: 'क्या preparation में रहे bills, correction के लिए लौटे bills, approval की प्रतीक्षा वाले bills और systems के बीच transfer हुए bills की dated inventory थी?' },
  },
  {
    title: { en: 'Identifiers are the grammar of accountability', hi: 'Identifiers जवाबदेही की grammar हैं' },
    focus: { en: 'Work, sanction, BOQ, package, work order and approved abstract IDs are not decorative labels; they are the references that allow different documents to speak about the same work.', hi: 'Work, sanction, BOQ, package, work order और approved abstract IDs decorative labels नहीं हैं; ये वे references हैं जो अलग documents को एक ही work के बारे में जोड़ते हैं।' },
    detail: { en: 'A missing or inconsistent identifier does not prove a false claim, but it raises the cost of checking and makes an innocent mismatch harder to distinguish from a serious one.', hi: 'Missing या inconsistent identifier false claim prove नहीं करता, लेकिन checking की cost बढ़ाता है और innocent mismatch को serious mismatch से अलग करना कठिन बनाता है।' },
    question: { en: 'Can each identifier be searched, does it resolve to one work, and do the linked documents use the same value without unexplained substitutions?', hi: 'क्या हर identifier search किया जा सकता है, क्या वह एक ही work पर resolve होता है, और क्या linked documents वही value बिना unexplained substitution के इस्तेमाल करते हैं?' },
  },
  {
    title: { en: 'Administrative and technical approval answer different questions', hi: 'Administrative और technical approval अलग सवालों का उत्तर देते हैं' },
    focus: { en: 'An administrative sanction and a technical sanction are separate parts of the authorisation chain; their presence should not be reduced to a single generic approval stamp.', hi: 'Administrative sanction और technical sanction authorisation chain के अलग हिस्से हैं; उनकी मौजूदगी को एक generic approval stamp तक सीमित नहीं करना चाहिए।' },
    detail: { en: 'The first establishes the administrative basis for the work, while the second concerns technical design, quantities or standards that later measurements are expected to follow.', hi: 'पहला work का administrative basis स्थापित करता है, जबकि दूसरा technical design, quantities या standards से जुड़ा होता है जिनका पालन बाद के measurements में होना चाहिए।' },
    question: { en: 'Does the amount claimed correspond to the approved scope, and can a reviewer see which approval established the scope and which established the technical basis?', hi: 'क्या claimed amount approved scope से मेल खाता है, और क्या reviewer देख सकता है कि scope किस approval ने और technical basis किसने establish किया?' },
  },
  {
    title: { en: 'The BOQ is a translation between plan and payment', hi: 'BOQ plan और payment के बीच translation है' },
    focus: { en: 'The Bill of Quantities gives a reviewer a way to compare what was planned with what was measured and eventually paid.', hi: 'Bill of Quantities reviewer को planned, measured और अंततः paid quantity की तुलना करने का आधार देता है।' },
    detail: { en: 'Without that comparison, a payment total can appear complete while the reader lacks the units, rates and item boundaries needed to understand it.', hi: 'उस comparison के बिना payment total complete दिख सकता है, जबकि reader के पास उसे समझने के लिए units, rates और item boundaries नहीं होंगी।' },
    question: { en: 'For each material or work item, do the approved quantity, measured quantity, rate and paid quantity remain visible and reconcilable?', hi: 'क्या हर material या work item के लिए approved quantity, measured quantity, rate और paid quantity visible और reconcilable रहते हैं?' },
  },
  {
    title: { en: 'A Measurement Book is not just an attachment', hi: 'Measurement Book केवल attachment नहीं है' },
    focus: { en: 'The MB is the place where a physical claim is translated into line-by-line quantities, dates, locations and the signature or role of the person who recorded and checked it.', hi: 'MB वह जगह है जहां physical claim line-by-line quantities, dates, locations और record व check करने वाले व्यक्ति की signature या role में बदलता है।' },
    detail: { en: 'A summary amount cannot perform the same evidentiary function as the underlying entries, especially when a reviewer needs to test one item rather than accept the total.', hi: 'Summary amount underlying entries जैसा evidentiary काम नहीं कर सकता, खासकर जब reviewer को total स्वीकार करने के बजाय एक item जांचना हो।' },
    question: { en: 'Are the original entries or a complete scan available, and do the entries explain how the measured quantity became the quantity included in the bill?', hi: 'क्या original entries या complete scan available हैं, और क्या entries बताती हैं कि measured quantity bill में शामिल quantity कैसे बनी?' },
  },
  {
    title: { en: 'Digital absence and physical presence must be linked', hi: 'Digital absence और physical presence को link करना होगा' },
    focus: { en: 'When line entry is unavailable, a physical MB PDF can preserve evidence only if it is attached to the right work, bill and approval rather than stored as an orphan file.', hi: 'जब line entry उपलब्ध न हो, physical MB PDF तभी evidence बचा सकता है जब वह सही work, bill और approval से attached हो, orphan file की तरह नहीं।' },
    detail: { en: 'The exception should be visible, dated and reviewable; otherwise a temporary workaround can quietly become a permanent blind spot.', hi: 'Exception visible, dated और reviewable होना चाहिए; नहीं तो temporary workaround धीरे-धीरे permanent blind spot बन सकता है।' },
    question: { en: 'Does the physical substitute carry the same identifiers, page range and approval context that a digital line entry would have carried?', hi: 'क्या physical substitute वही identifiers, page range और approval context रखता है जो digital line entry रखती?' },
  },
  {
    title: { en: 'Quality records test more than quantity', hi: 'Quality records केवल quantity नहीं जांचते' },
    focus: { en: 'QC test abstracts and related quality records address whether the work or material met the relevant specification, not simply whether an amount was entered.', hi: 'QC test abstracts और quality records यह जांचते हैं कि work या material relevant specification पर खरा उतरा या नहीं, केवल amount enter हुआ या नहीं।' },
    detail: { en: 'A clean payment trail can therefore coexist with an incomplete quality trail, which is why the two should be reviewed as connected but distinct evidence.', hi: 'इसलिए clean payment trail के साथ incomplete quality trail भी हो सकता है; दोनों को connected लेकिन distinct evidence की तरह review करना चाहिए।' },
    question: { en: 'Which test or inspection supports the item in the bill, who recorded the result, and where is the result attached to the relevant work and date?', hi: 'Bill के item को कौन-सा test या inspection support करता है, result किसने record किया, और वह relevant work और date से कहां attached है?' },
  },
  {
    title: { en: 'Material receipts are part of the chain, not background paperwork', hi: 'Material receipts chain का हिस्सा हैं, background paperwork नहीं' },
    focus: { en: 'A receipt, certificate or consumption statement can help establish how material entered the work record and whether the claimed use can be followed through the project.', hi: 'Receipt, certificate या consumption statement यह समझने में मदद कर सकता है कि material work record में कैसे आया और claimed use को project में follow किया जा सकता है या नहीं।' },
    detail: { en: 'These documents do not replace measurement or quality testing; they answer a different question about custody, use and reconciliation.', hi: 'ये documents measurement या quality testing की जगह नहीं लेते; ये custody, use और reconciliation के अलग सवाल का उत्तर देते हैं।' },
    question: { en: 'Can the material named in the bill be matched to receipt, certificate, storage or issue evidence and then to the claimed consumption?', hi: 'क्या bill में named material को receipt, certificate, storage या issue evidence से और फिर claimed consumption से match किया जा सकता है?' },
  },
  {
    title: { en: 'Why Bitumen CRC deserves a specific check', hi: 'Bitumen CRC की specific जांच क्यों जरूरी है' },
    focus: { en: 'The brief names Bitumen CRC alongside other material records, signalling that a generic "documents attached" statement is not enough for every item.', hi: 'Brief Bitumen CRC को दूसरे material records के साथ अलग से नाम देता है; इससे पता चलता है कि generic "documents attached" statement पर्याप्त नहीं है।' },
    detail: { en: 'A specific record should be checked for the item, quantity, source, date and relationship to the work rather than counted only as another page in a file.', hi: 'Specific record में item, quantity, source, date और work से relationship देखना चाहिए; उसे file के एक और page की तरह नहीं गिनना चाहिए।' },
    question: { en: 'Does the certificate or CRC correspond to the material and period claimed, and is its relationship to the measured work documented?', hi: 'क्या certificate या CRC claimed material और period से correspond करता है, और measured work से उसका relationship documented है?' },
  },
  {
    title: { en: 'Vendor names are a data-quality issue with accountability consequences', hi: 'Vendor names data-quality issue भी हैं और accountability issue भी' },
    focus: { en: 'Inconsistent vendor names can make matching a contractor, contract, security deposit and payment harder even when the underlying entities are legitimate.', hi: 'Inconsistent vendor names contractor, contract, security deposit और payment को match करना कठिन बना सकते हैं, भले underlying entities legitimate हों।' },
    detail: { en: 'The remedy is not to infer wrongdoing from spelling or formatting; it is to preserve a stable vendor identity, aliases and the source of each correction.', hi: 'Remedy spelling या formatting से wrongdoing infer करना नहीं, बल्कि stable vendor identity, aliases और हर correction का source preserve करना है।' },
    question: { en: 'Is there one vendor identifier, and can name variations be explained by an approved master record rather than by manual guesswork?', hi: 'क्या एक vendor identifier है, और क्या name variations को manual guesswork के बजाय approved master record से explain किया जा सकता है?' },
  },
  {
    title: { en: 'Security deposits need a visible relationship to the contract', hi: 'Security deposits का contract से visible relationship जरूरी है' },
    focus: { en: 'An incomplete security-deposit integration leaves a reviewer unsure whether the deposit record is absent, stored elsewhere, awaiting migration or simply not linked.', hi: 'Incomplete security-deposit integration reviewer को unsure छोड़ सकती है कि deposit record absent है, कहीं और stored है, migration की प्रतीक्षा में है या linked नहीं है।' },
    detail: { en: 'Those possibilities have different meanings and different remedies, so a status label should not collapse them into one blank field.', hi: 'इन possibilities के meanings और remedies अलग हैं; इसलिए status label को इन्हें एक blank field में नहीं समेटना चाहिए।' },
    question: { en: 'For a selected contract, can the amount, instrument, date, validity and release or adjustment status of the deposit be traced?', hi: 'Selected contract के लिए deposit का amount, instrument, date, validity और release या adjustment status trace किया जा सकता है?' },
  },
  {
    title: { en: 'More pages can mean less reviewability', hi: 'अधिक pages का मतलब कम reviewability भी हो सकता है' },
    focus: { en: 'A thick file is not necessarily a strong file: a reviewer needs a map showing which page answers which control question and which role accepted it.', hi: 'Thick file जरूरी नहीं strong file हो: reviewer को map चाहिए जो बताए कि कौन-सा page कौन-सा control question answer करता है और किस role ने उसे accept किया।' },
    detail: { en: 'Unindexed enclosures increase the chance that a document is technically present but practically invisible during approval.', hi: 'Unindexed enclosures से यह risk बढ़ता है कि document technically present हो लेकिन approval के दौरान practically invisible रहे।' },
    question: { en: 'Can a reviewer find each required enclosure quickly, and is the file index updated when a document is added, replaced or rejected?', hi: 'क्या reviewer हर required enclosure जल्दी खोज सकता है, और document add, replace या reject होने पर file index update होता है?' },
  },
  {
    title: { en: 'Outsourcing changes where control must be visible', hi: 'Outsourcing से control visibility की जगह बदलती है' },
    focus: { en: 'When computer-centre or outsourced staff help prepare or enter records, the official chain of responsibility still needs to remain visible and auditable.', hi: 'जब computer-centre या outsourced staff records prepare या enter करते हैं, तब official responsibility chain फिर भी visible और auditable रहनी चाहिए।' },
    detail: { en: 'The issue is not the employment category of the operator; it is whether access, correction, review and approval are separated and logged.', hi: 'मुद्दा operator की employment category नहीं, बल्कि access, correction, review और approval का अलग और logged होना है।' },
    question: { en: 'Who entered the data, who could alter it, who checked the alteration and which official accepted the final record?', hi: 'Data किसने enter किया, किसे alter करने की अनुमति थी, alteration किसने check किया और final record किस official ने accept किया?' },
  },
  {
    title: { en: 'Maker, checker and approver are three different acts', hi: 'Maker, checker और approver तीन अलग acts हैं' },
    focus: { en: 'Role separation matters because preparing a record, testing its evidence and authorising a payment require different forms of attention and accountability.', hi: 'Role separation महत्वपूर्ण है क्योंकि record prepare करना, evidence test करना और payment authorise करना attention और accountability के अलग forms हैं।' },
    detail: { en: 'A role label is meaningful only when the system records what the person did, when they did it and what exception they accepted or returned.', hi: 'Role label तभी meaningful है जब system यह record करे कि व्यक्ति ने क्या किया, कब किया और कौन-सा exception accept या return किया।' },
    question: { en: 'Are the three roles visibly distinct for the selected bill, and can a later reviewer see the handoff between them?', hi: 'क्या selected bill में तीनों roles visibly distinct हैं, और क्या later reviewer उनके बीच handoff देख सकता है?' },
  },
  {
    title: { en: 'Monitoring should look for patterns, not only individual errors', hi: 'Monitoring को केवल individual errors नहीं, patterns देखने चाहिए' },
    focus: { en: 'A transition dashboard should reveal repeated missing enclosures, repeated vendor mismatches, long approval waits and recurring manual workarounds.', hi: 'Transition dashboard को repeated missing enclosures, repeated vendor mismatches, long approval waits और recurring manual workarounds दिखाने चाहिए।' },
    detail: { en: 'A pattern can point to a system design issue or training need without identifying misconduct, while a single anomaly still requires its own record-specific review.', hi: 'Pattern system design issue या training need की ओर संकेत कर सकता है बिना misconduct identify किए; single anomaly को फिर भी record-specific review चाहिए।' },
    question: { en: 'What exception reports existed, who reviewed them, how often were they reviewed and what evidence shows that recurring issues were closed?', hi: 'कौन-से exception reports थे, उन्हें किसने review किया, कितनी बार review किया और recurring issues close होने का evidence क्या है?' },
  },
  {
    title: { en: 'A migrated record needs provenance', hi: 'Migrated record को provenance चाहिए' },
    focus: { en: 'Migration should preserve where a field came from, when it was moved, whether it was transformed and whether the original remains available for comparison.', hi: 'Migration को preserve करना चाहिए कि field कहां से आया, कब move हुआ, transform हुआ या नहीं, और comparison के लिए original उपलब्ध है या नहीं।' },
    detail: { en: 'Without provenance, a corrected value and an accidentally altered value can look identical after the move.', hi: 'Provenance के बिना corrected value और accidentally altered value migration के बाद एक जैसे दिख सकते हैं।' },
    question: { en: 'Can the department show the source record, migration event, transformation rule and post-migration validation for a sampled bill?', hi: 'क्या department sampled bill के लिए source record, migration event, transformation rule और post-migration validation दिखा सकता है?' },
  },
  {
    title: { en: 'The first audit after a switch should be deliberately boring', hi: 'Switch के बाद पहला audit जानबूझकर boring होना चाहिए' },
    focus: { en: 'A useful first audit does not chase the most dramatic allegation; it samples ordinary bills and tests whether the new chain works in routine conditions.', hi: 'Useful first audit सबसे dramatic allegation के पीछे नहीं भागता; वह ordinary bills sample करके देखता है कि routine conditions में नई chain काम करती है या नहीं।' },
    detail: { en: 'Routine samples can expose missing links before those gaps are mistaken for a special case or hidden by an unusually well-prepared file.', hi: 'Routine samples missing links को जल्दी दिखा सकते हैं, इससे पहले कि gaps को special case समझा जाए या unusually well-prepared file उन्हें छिपा दे।' },
    question: { en: 'Across a representative sample, how many bills can be traced end to end, and where do failures cluster by office, stage or document type?', hi: 'Representative sample में कितने bills end to end trace हो सकते हैं, और failures office, stage या document type के हिसाब से कहां cluster होते हैं?' },
  },
  {
    title: { en: 'Public access should expose the chain without exposing unnecessary personal data', hi: 'Public access chain दिखाए, unnecessary personal data नहीं' },
    focus: { en: 'Bill-level transparency should make approvals, measurements, tests and payments understandable while protecting personal, banking or security-sensitive details that do not need public release.', hi: 'Bill-level transparency approvals, measurements, tests और payments को समझने योग्य बनाए, साथ ही ऐसे personal, banking या security-sensitive details बचाए जिन्हें public release की जरूरत नहीं।' },
    detail: { en: 'Good access design is therefore a balance between discoverability and responsible redaction, not a choice between total secrecy and indiscriminate disclosure.', hi: 'Good access design discoverability और responsible redaction के बीच balance है; total secrecy और indiscriminate disclosure के बीच चुनाव नहीं।' },
    question: { en: 'Can an interested reader follow the public identifiers and evidence while the system masks information that would create a separate privacy or security risk?', hi: 'क्या interested reader public identifiers और evidence follow कर सकता है, जबकि system अलग privacy या security risk वाली information mask करता है?' },
  },
  {
    title: { en: 'A record should explain its own gaps', hi: 'Record को अपने gaps खुद explain करने चाहिए' },
    focus: { en: 'A missing field becomes less confusing when the record states why it is missing, who owns the next action, when it should be resolved and what temporary evidence is accepted.', hi: 'Missing field कम confusing तब होता है जब record बताता है कि वह क्यों missing है, next action किसके पास है, कब resolve होगा और temporary evidence क्या accepted है।' },
    detail: { en: 'An unexplained blank is ambiguous; a documented exception is a control that can be monitored and closed.', hi: 'Unexplained blank ambiguous होता है; documented exception ऐसा control है जिसे monitor और close किया जा सकता है।' },
    question: { en: 'For every missing enclosure, is there a reason code, owner, due date, substitute evidence and final closure note?', hi: 'हर missing enclosure के लिए reason code, owner, due date, substitute evidence और final closure note है?' },
  },
  {
    title: { en: 'Reconciliation is a continuing operation, not a one-time clean-up', hi: 'Reconciliation one-time clean-up नहीं, continuing operation है' },
    focus: { en: 'Legacy and new records may remain connected for months or years, so reconciliation needs a repeatable process rather than a single migration-day promise.', hi: 'Legacy और new records महीनों या वर्षों तक connected रह सकते हैं; इसलिए reconciliation को single migration-day promise के बजाय repeatable process चाहिए।' },
    detail: { en: 'The process should identify unresolved links, prioritise payment and contract risk, record decisions and preserve the trail of each correction.', hi: 'Process को unresolved links identify, payment और contract risk prioritise, decisions record और हर correction का trail preserve करना चाहिए।' },
    question: { en: 'Who owns unresolved legacy links after go-live, and how can a reviewer tell whether a record was reconciled yesterday or has been pending since the switch?', hi: 'Go-live के बाद unresolved legacy links का owner कौन है, और reviewer कैसे जाने कि record कल reconcile हुआ या switch से pending है?' },
  },
  {
    title: { en: 'The public test is a usability test as well as an integrity test', hi: 'Public test usability test भी है और integrity test भी' },
    focus: { en: 'If only a specialist who already knows the office can understand a bill, the record may be technically available but not meaningfully public.', hi: 'अगर केवल वही specialist bill समझ सकता है जो office को पहले से जानता है, तो record technically available होकर भी meaningfully public नहीं है।' },
    detail: { en: 'Clear labels, stable identifiers, a short glossary and a visible chain can reduce the knowledge barrier without simplifying away important evidence.', hi: 'Clear labels, stable identifiers, short glossary और visible chain knowledge barrier घटा सकते हैं, बिना important evidence को simplify किए।' },
    question: { en: 'Could an informed reader who did not prepare the bill understand its scope, measurement, testing, approval and payment from the published record?', hi: 'क्या informed reader जिसने bill prepare नहीं किया, published record से उसका scope, measurement, testing, approval और payment समझ सकता है?' },
  },
  {
    title: { en: 'Verification questions are stronger when they are bill-specific', hi: 'Verification questions bill-specific हों तो मजबूत होती हैं' },
    focus: { en: 'Broad claims about a department or portal are difficult to test; a named bill, work and date turn a concern into a checkable proposition.', hi: 'Department या portal पर broad claims test करना कठिन है; named bill, work और date concern को checkable proposition में बदलते हैं।' },
    detail: { en: 'Specificity also protects fairness because it prevents a defect in one record from being generalised to every office or official.', hi: 'Specificity fairness की रक्षा भी करती है क्योंकि one-record defect को हर office या official पर generalise करने से रोकती है।' },
    question: { en: 'What exact bill, work, document, date and role would allow another reviewer to repeat the verification independently?', hi: 'कौन-सा exact bill, work, document, date और role दूसरे reviewer को verification independently repeat करने देगा?' },
  },
  {
    title: { en: 'A concern becomes a finding only after the evidence is tested', hi: 'Evidence test होने के बाद ही concern finding बनता है' },
    focus: { en: 'The language of reported concern is not a weakness in the report; it is a boundary that keeps an unresolved observation from becoming an unsupported accusation.', hi: 'Reported concern की भाषा report की कमजोरी नहीं; यह वह boundary है जो unresolved observation को unsupported accusation बनने से रोकती है।' },
    detail: { en: 'A finding requires a defined subject, reliable documents, a consistent method and an opportunity to explain discrepancies before publication.', hi: 'Finding के लिए defined subject, reliable documents, consistent method और publication से पहले discrepancy explain करने का opportunity जरूरी है।' },
    question: { en: 'What evidence would confirm the concern, what evidence would weaken it, and has the record been tested against both possibilities?', hi: 'कौन-सा evidence concern confirm करेगा, कौन-सा उसे weaken करेगा, और क्या record को दोनों possibilities के विरुद्ध test किया गया?' },
  },
  {
    title: { en: 'Controls should be designed for the rushed day', hi: 'Controls rushed day को ध्यान में रखकर design होने चाहिए' },
    focus: { en: 'A process that works only when staff have unlimited time will fail precisely when payment volume, migration pressure or public deadlines are highest.', hi: 'जो process तभी काम करे जब staff के पास unlimited time हो, वह payment volume, migration pressure या public deadlines के सबसे ऊंचे समय पर fail होगा।' },
    detail: { en: 'The minimum required evidence must therefore be clear, prioritised and easy to check, while exceptional cases receive a visible route rather than an informal shortcut.', hi: 'Minimum required evidence clear, prioritised और easy to check होना चाहिए; exceptional cases को informal shortcut के बजाय visible route मिलना चाहिए।' },
    question: { en: 'What does the system force a busy approver to notice, and what can pass silently when the file is incomplete?', hi: 'Busy approver को system क्या notice करने के लिए मजबूर करता है, और file incomplete होने पर क्या silently pass हो सकता है?' },
  },
  {
    title: { en: 'Corrections need an audit trail of their own', hi: 'Corrections का अपना audit trail होना चाहिए' },
    focus: { en: 'A correction can improve a migrated record, but without a before value, reason, actor, date and approval it can also erase the history that a later reviewer needs.', hi: 'Correction migrated record को improve कर सकता है, लेकिन before value, reason, actor, date और approval के बिना वह later reviewer के लिए जरूरी history भी मिटा सकता है।' },
    detail: { en: 'The goal is not to freeze every error forever; it is to make legitimate correction distinguishable from unrecorded alteration.', hi: 'Goal हर error को हमेशा freeze करना नहीं; legitimate correction को unrecorded alteration से distinguishable बनाना है।' },
    question: { en: 'Can the department show what changed, why it changed, who approved it and whether the change affected amount, quantity, vendor or approval status?', hi: 'क्या department दिखा सकता है कि क्या बदला, क्यों बदला, किसने approve किया और change ने amount, quantity, vendor या approval status को प्रभावित किया या नहीं?' },
  },
  {
    title: { en: 'The safest conclusion may be a better question', hi: 'सबसे सुरक्षित conclusion कभी-कभी बेहतर question होता है' },
    focus: { en: 'Where the source brief cannot establish an outcome, the report should state what would need to be checked next instead of filling the gap with certainty.', hi: 'जहां source brief outcome establish नहीं कर सकता, वहां report को certainty से gap भरने के बजाय बताना चाहिए कि आगे क्या check करना होगा।' },
    detail: { en: 'That approach leaves room for an innocent explanation, a process correction or a confirmed finding, depending on what the records show.', hi: 'यह approach innocent explanation, process correction या confirmed finding—तीनों के लिए जगह छोड़ती है, records के आधार पर।' },
    question: { en: 'What is the narrowest next question that can be answered from a primary record rather than from inference?', hi: 'वह सबसे narrow next question कौन-सा है जिसका उत्तर inference के बजाय primary record से दिया जा सकता है?' },
  },
  {
    title: { en: 'The accountability chain should survive staff turnover', hi: 'Accountability chain को staff turnover survive करना चाहिए' },
    focus: { en: 'A record that depends on one experienced clerk\'s memory is fragile; the system should carry enough context for a new reviewer to understand the decision.', hi: 'जो record एक experienced clerk की memory पर निर्भर हो वह fragile है; system में इतना context होना चाहिए कि नया reviewer decision समझ सके।' },
    detail: { en: 'This is especially important during a transition, when responsibility may move between offices, vendors, data-entry teams and approving authorities.', hi: 'यह transition में खास तौर पर महत्वपूर्ण है, जब responsibility offices, vendors, data-entry teams और approving authorities के बीच move हो सकती है।' },
    question: { en: 'If the original preparer left tomorrow, could another authorised person reconstruct the bill without a private handover?', hi: 'अगर original preparer कल चला जाए, तो क्या दूसरा authorised person private handover के बिना bill reconstruct कर सकता है?' },
  },
  {
    title: { en: 'The final standard is not perfection but traceability', hi: 'अंतिम standard perfection नहीं, traceability है' },
    focus: { en: 'A living public system will have corrections, exceptions and delayed documents; accountability depends on making those conditions visible and manageable.', hi: 'Living public system में corrections, exceptions और delayed documents होंगे; accountability इस पर निर्भर करती है कि वे conditions visible और manageable हों।' },
    detail: { en: 'Traceability lets a reader distinguish a controlled delay from an unexplained disappearance and a corrected mistake from a silent rewrite.', hi: 'Traceability reader को controlled delay और unexplained disappearance, corrected mistake और silent rewrite में अंतर करने देती है।' },
    question: { en: 'Can the record explain its own journey, including every material exception, until the reader reaches a defensible payment decision?', hi: 'क्या record अपनी पूरी journey, हर material exception समेत, explain कर सकता है जब तक reader defensible payment decision तक पहुंचे?' },
  },
];

function buildLongform(language: Language): DeepDive[] {
  return deepDiveSeeds.map((seed) => {
    const title = seed.title[language];
    const focus = seed.focus[language];
    const detail = seed.detail[language];
    const question = seed.question[language];
    if (language === 'en') {
      return {
        title,
        paragraphs: [
          'To understand this report, begin with ' + title + '. ' + focus + ' That point should be kept separate from any conclusion about wrongdoing. It describes a control question: whether a reader can reconstruct the path from an authorised decision to a recorded result. In a transition, the same work may appear under an older portal, a migrated identifier, a scanned enclosure and a newer approval screen. Those pieces can be individually genuine and still be difficult to join. A careful reading therefore looks for the link between them, not simply the presence of a familiar logo or a completed payment status. ' + detail + ' The useful test is whether the record tells the same story at every stage, with dates, quantities, names and approvals that can be checked against one another. If the story changes, the discrepancy needs explanation before it becomes an allegation. This is why the report treats continuity as evidence rather than as an administrative detail.',
          'A reviewer examining ' + title + ' would ask: ' + question + ' The answer should be recorded as a dated, bill-specific finding rather than a broad impression about the portal. It should identify what was requested, which office or role held it, what was supplied and which part remains unavailable. ' + detail + ' This discipline protects two sides at once: it prevents a department from treating a missing attachment as harmless, and it prevents a report from treating an unresolved gap as proof of fraud. It also makes correction possible. If the problem is a migrated ID, the remedy may be reconciliation; if it is a training gap, the remedy may be supervision; if it is a missing work record, the remedy may be a formal exception and audit review. ' + focus + ' The report\'s larger point is simple: transparency is not the amount of data uploaded, but the ability to follow one defensible chain from decision to payment.',
        ],
      };
    }
    return {
      title,
      paragraphs: [
        '\u0907\u0938 \u0930\u093f\u092a\u094b\u0930\u094d\u091f \u0915\u094b \u0938\u092e\u091d\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f ' + title + ' \u0938\u0947 \u0936\u0941\u0930\u0942\u0906\u0924 \u0915\u0930\u0947\u0902\u0964 ' + focus + ' \u0907\u0938 \u092c\u093e\u0924 \u0915\u094b wrongdoing \u0915\u0947 \u0915\u093f\u0938\u0940 \u0928\u093f\u0937\u094d\u0915\u0930\u094d\u0937 \u0938\u0947 \u0905\u0932\u0917 \u0930\u0916\u0928\u093e \u091c\u0930\u0942\u0930\u0940 \u0939\u0948\u0964 \u092f\u0939 \u090f\u0915 control question \u0939\u0948: \u0915\u094d\u092f\u093e reader authorised decision \u0938\u0947 recorded result \u0924\u0915 \u0915\u093e \u0930\u093e\u0938\u094d\u0924\u093e \u092b\u093f\u0930 \u0938\u0947 \u092c\u0928\u093e \u0938\u0915\u0924\u093e \u0939\u0948? Transition \u0915\u0947 \u0926\u094c\u0930\u093e\u0928 \u0935\u0939\u0940 work \u092a\u0941\u0930\u093e\u0928\u0947 portal, migrated identifier, scanned enclosure \u0914\u0930 \u0928\u090f approval screen \u092e\u0947\u0902 \u0905\u0932\u0917-\u0905\u0932\u0917 \u0926\u093f\u0916\u093e\u0908 \u0926\u0947 \u0938\u0915\u0924\u093e \u0939\u0948\u0964 \u092f\u0947 \u0939\u093f\u0938\u094d\u0938\u0947 \u0905\u0932\u0917-\u0905\u0932\u0917 genuine \u0939\u094b \u0938\u0915\u0924\u0947 \u0939\u0948\u0902, \u092b\u093f\u0930 \u092d\u0940 \u0909\u0928\u094d\u0939\u0947\u0902 \u091c\u094b\u0921\u093c\u0928\u093e \u0915\u0920\u093f\u0928 \u0939\u094b \u0938\u0915\u0924\u093e \u0939\u0948\u0964 \u0907\u0938\u0932\u093f\u090f careful reading \u0915\u0947\u0935\u0932 familiar logo \u092f\u093e completed payment status \u0928\u0939\u0940\u0902 \u0926\u0947\u0916\u0924\u0940; \u0935\u0939 \u0909\u0928\u0915\u0947 \u092c\u0940\u091a \u0915\u093e link \u0916\u094b\u091c\u0924\u0940 \u0939\u0948\u0964 ' + detail + ' \u0909\u092a\u092f\u094b\u0917\u0940 test \u092f\u0939 \u0939\u0948 \u0915\u093f record \u0939\u0930 stage \u092a\u0930 \u090f\u0915 \u0939\u0940 \u0915\u0939\u093e\u0928\u0940 \u0915\u0939\u0924\u093e \u0939\u0948 \u092f\u093e \u0928\u0939\u0940\u0902\u2014dates, quantities, names \u0914\u0930 approvals \u0915\u094b \u090f\u0915-\u0926\u0942\u0938\u0930\u0947 \u0938\u0947 check \u0915\u093f\u092f\u093e \u091c\u093e \u0938\u0915\u0947\u0964 \u0905\u0917\u0930 \u0915\u0939\u093e\u0928\u0940 \u092c\u0926\u0932\u0924\u0940 \u0939\u0948 \u0924\u094b allegation \u0938\u0947 \u092a\u0939\u0932\u0947 discrepancy \u0915\u0940 explanation \u091a\u093e\u0939\u093f\u090f\u0964 \u0907\u0938\u0940 \u0915\u093e\u0930\u0923 report continuity \u0915\u094b administrative detail \u0928\u0939\u0940\u0902, evidence \u092e\u093e\u0928\u0924\u0940 \u0939\u0948\u0964',
        title + ' \u0915\u0940 \u091c\u093e\u0902\u091a \u0915\u0930\u0924\u0947 \u0938\u092e\u092f reviewer \u092a\u0942\u091b\u0947\u0917\u093e: ' + question + ' \u0909\u0924\u094d\u0924\u0930 broad portal impression \u0915\u0947 \u0930\u0942\u092a \u092e\u0947\u0902 \u0928\u0939\u0940\u0902, dated \u0914\u0930 bill-specific finding \u0915\u0947 \u0930\u0942\u092a \u092e\u0947\u0902 \u0926\u0930\u094d\u091c \u0939\u094b\u0928\u093e \u091a\u093e\u0939\u093f\u090f\u0964 \u0909\u0938\u092e\u0947\u0902 \u092f\u0939 \u0938\u093e\u092b \u0939\u094b \u0915\u093f \u0915\u094d\u092f\u093e \u092e\u093e\u0902\u0917\u093e \u0917\u092f\u093e, \u0915\u093f\u0938 office \u092f\u093e role \u0915\u0947 \u092a\u093e\u0938 \u0925\u093e, \u0915\u094d\u092f\u093e \u0909\u092a\u0932\u092c\u094d\u0927 \u0915\u0930\u093e\u092f\u093e \u0917\u092f\u093e \u0914\u0930 \u0915\u094c\u0928-\u0938\u093e \u0939\u093f\u0938\u094d\u0938\u093e \u0905\u092d\u0940 unavailable \u0939\u0948\u0964 ' + detail + ' \u092f\u0939 discipline \u0926\u094b\u0928\u094b\u0902 \u092a\u0915\u094d\u0937\u094b\u0902 \u0915\u0940 \u0930\u0915\u094d\u0937\u093e \u0915\u0930\u0924\u093e \u0939\u0948: department missing attachment \u0915\u094b harmless \u092e\u093e\u0928\u0915\u0930 \u0906\u0917\u0947 \u0928 \u092c\u0922\u093c\u0947, \u0914\u0930 report unresolved gap \u0915\u094b fraud \u0915\u093e proof \u0928 \u092c\u0928\u093e \u0926\u0947\u0964 \u0907\u0938\u0938\u0947 correction \u0915\u093e \u0930\u093e\u0938\u094d\u0924\u093e \u092d\u0940 \u092c\u0928\u0924\u093e \u0939\u0948\u0964 \u0905\u0917\u0930 \u0938\u092e\u0938\u094d\u092f\u093e migrated ID \u0915\u0940 \u0939\u0948 \u0924\u094b remedy reconciliation \u0939\u094b \u0938\u0915\u0924\u0940 \u0939\u0948; training gap \u0939\u0948 \u0924\u094b supervision; missing work record \u0939\u0948 \u0924\u094b formal exception \u0914\u0930 audit review\u0964 ' + focus + ' Report \u0915\u093e \u092c\u0921\u093c\u093e point \u0938\u0940\u0927\u093e \u0939\u0948: transparency uploaded data \u0915\u0940 \u092e\u093e\u0924\u094d\u0930\u093e \u0928\u0939\u0940\u0902, decision \u0938\u0947 payment \u0924\u0915 \u090f\u0915 defensible chain \u0915\u094b follow \u0915\u0930 \u092a\u093e\u0928\u0947 \u0915\u0940 \u0915\u094d\u0937\u092e\u0924\u093e \u0939\u0948\u0964',
      ],
    };
  });
}

export const reports: Record<Language, ReportContent> = {
  en: {
    eyebrow: 'Investigation / systems',
    location: 'Rajasthan · 2026',
    title: 'When the payment trail moves, who can still follow it?',
    dek: 'Rajasthan\'s PWD and Irrigation departments moved contractor payments from WAM / PayManager toward IFMS 3.0. The source brief describes a handover where the new record was not yet fully systematic — and where the proof around a bill matters as much as the payment itself.',
    metadata: ['Edited source brief', 'Read time · 14 min', 'Report view'],
    editorTitle: 'Editor\'s note',
    editorQuote: 'This is a record of transition, not a verdict.',
    editorBody: 'Observations and reported concerns are kept distinct from established facts. The open questions are part of the story.',
    summaryLabel: 'Executive summary',
    summary: 'A digital migration is also a migration of accountability: every sanction, measurement, quality check and material record must remain attached to the bill.',
    establishedLabel: 'What is established:',
    established: 'WAM / PayManager handled online contractor bill payments since 2012. The Finance Department trained officials on 2 July 2026. WAM processing stopped on 10 July as IFMS 3.0 migration and stabilisation continued.',
    reportedLabel: 'What remains reported:',
    reported: 'By 1 August, the new portal was not yet systematic, with inconsistent vendor names and incomplete security-deposit integration. The source also flags paperwork, training, role and evidence gaps.',
    sections: [
      { id: 'chapter-record', number: '01', title: 'The handover happened in stages', paragraphs: ['The old and new systems did not change places in a single clean moment. WAM and PayManager had been the online route for contractor bill payments since 2012, which meant that offices, contractors and processing staff had a familiar way to submit and move a bill. From January 2025, however, new works and contracts were expected to establish a fuller identity inside IFMS 2.0. The change was therefore not only a new payment screen; it was an attempt to make each payment part of a wider works record.', 'That identity was meant to travel through the work, administrative sanction, technical sanction, BOQ, package, work order and approved abstract IDs. Measurements were intended to be entered in the electronic Measurement Book. A reader following one bill should, in principle, be able to move backwards from the payment to the approved work, the quantities recorded, and the checks applied before approval. The payment would sit at the end of a connected chain rather than as an isolated transaction.', 'The July 2026 dates show why the transition deserves to be read as a handover rather than a single switch. The Finance Department training was held on 2 July; regular WAM payments continued up to 6 July; and WAM bill processing stopped on 10 July while data migration and IFMS 3.0 stabilisation continued. Those dates do not prove that a payment was improper. They do show that the legacy route closed during a period in which the replacement system was still settling.', 'That creates a practical reconciliation task. Older bills, new contracts, migrated records and bills prepared during the transition may not present their supporting information in exactly the same way. The central question is whether the department can preserve one traceable record across those formats, including for a bill that was started in one workflow and completed in another.'] },
      { id: 'chapter-strain', number: '02', title: 'The operational strain is visible in the paperwork', paragraphs: ['The source brief does not describe a system that failed in one dramatic instant. It describes friction: too many supporting pages, limited training and monitoring, and a greater burden on outsourced staff and computer centres. This matters because a payment process is not only a software task. It also depends on people knowing which document belongs to which stage, who is responsible for checking it, and where an exception is recorded when the expected digital entry cannot be completed.', 'More supporting pages can appear to strengthen a file, but volume alone does not create control. If the original contractor bill, Measurement Book pages, quality-control abstracts and material records are circulated separately, the file becomes harder to assemble and harder to review. A document may exist somewhere in the process without being visibly attached to the approval that depends on it. The risk described here is therefore a traceability problem: the record becomes longer while the relationship between its parts becomes less clear.', 'The source also points to limited training and monitoring during the transition, together with a greater outsourcing and computer-centre burden. That creates additional handoffs between the person preparing the information, the person entering it, and the officer expected to approve it. Where maker, checker and approver responsibilities are not clearly separated and visible, a later reviewer may be unable to tell who verified a quantity, who accepted an enclosure, or who decided that a missing record was acceptable.', 'By 1 August, the source reported that the new portal was not yet systematic, vendor names were appearing inconsistently, and security-deposit records were not fully integrated. These are reported operational concerns, not proof of a false bill or misconduct. Their importance is that inconsistent names and incomplete linked records make ordinary scrutiny slower: the reviewer has to spend more time matching a vendor, a contract and a deposit before reaching the substantive question of whether the work and payment correspond.'] },
      { id: 'chapter-evidence', number: '03', title: 'The bill needs to carry its proof', paragraphs: ['A payment system can show that money moved. An accountable works record must also show what the money was for, which approval authorised it, how the work was measured, and whether the materials and quality checks were documented. That distinction is the heart of this transition. A transaction entry answers the question "was a payment processed?"; the supporting record must answer "what work did this payment represent, and how was that conclusion tested?"', 'The intended chain begins before the bill reaches the payment stage. A work should have its identity, administrative and technical approvals, BOQ, package and work order. The Measurement Book should then record the quantities that were actually measured. Quality-control test abstracts and material documents provide another layer of checking, especially where the value of a bill depends on material consumption or a specified standard. If any one of those links is absent, the payment may still be visible while the basis for the payment is not.', 'The source raises concerns about line-by-line Measurement Book records being missing or inaccessible in some cases, QC test abstracts not being consistently attached, and gaps around Bitumen CRC, material receipts and consumption statements. Each item has a different evidentiary role. The MB helps test quantity; the QC abstract helps test quality; material receipts and consumption statements help test whether the material claimed in the work record can be accounted for. They should not be treated as interchangeable attachments.', 'This is also why public visibility matters. If bill-level records are difficult for an interested citizen to see and follow, the accountability chain becomes dependent on an internal reader who already knows the office, vendor and file structure. The brief identifies that visibility limitation, but it does not establish what happened in any particular bill. The responsible next step is verification: identify the bill, request the linked records, and state precisely which link is present, missing or still under migration.'] },
      { id: 'chapter-accountability', number: '04', title: 'A minimum accountability checklist', paragraphs: ['The corrective direction is practical: make the original bill and its supporting evidence travel together. The purpose is not to create paperwork for its own sake. It is to ensure that the person approving a payment can see the work claim, the measurement behind it, the quality check, and the material record in one reviewable file. A complete record also gives an auditor or citizen a starting point instead of requiring them to reconstruct the payment from disconnected systems.', 'Where a digital line entry cannot be made, the physical record should not disappear into the gap. A complete physical Measurement Book PDF can preserve the line-by-line evidence temporarily, provided it is clearly linked to the work, bill and approval. The same principle applies to QC abstracts, Bitumen certificates, material receipts and consumption statements: a missing digital field should produce a visible exception and a review step, not a silent approval.', 'Roles should be equally visible. A maker prepares or enters the record; a checker tests the information and enclosures; an approver authorises the payment. Showing those roles, dates and exceptions makes it possible to understand how a bill moved through the system. It also gives the department a way to measure whether a recurring problem is a training issue, a migration issue, a missing document, or an unresolved system integration issue.', 'This checklist is a control standard for reading the transition, not a claim that every current process already meets it. The public test is straightforward: can a reader trace one payment from sanction to measurement, quality check and material use? If the answer is no, the migration may have changed the interface without yet completing the accountability chain.'] },
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
     longform: buildLongform('en'),
  },
  hi: {
    eyebrow: 'जांच / व्यवस्था',
    location: 'राजस्थान · 2026',
    title: 'भुगतान की राह बदल जाए, तो उसे कौन देख पाएगा?',
    dek: 'राजस्थान के PWD और सिंचाई विभागों में ठेकेदारों के भुगतान WAM / PayManager से IFMS 3.0 की ओर ले जाए गए। उपलब्ध स्रोत-नोट के अनुसार यह बदलाव ऐसे समय हुआ जब नई व्यवस्था का रिकॉर्ड अभी पूरी तरह व्यवस्थित नहीं था — और जब किसी बिल के साथ उसका प्रमाण भी उतना ही जरूरी है जितना भुगतान।',
    metadata: ['संपादित स्रोत-रिपोर्ट', 'पढ़ने का समय · 14 मिनट', 'रिपोर्ट'],
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
      { id: 'chapter-record', number: '01', title: 'बदलाव एक ही दिन में नहीं हुआ', paragraphs: ['पुरानी और नई व्यवस्था ने एक ही साफ क्षण में एक-दूसरे की जगह नहीं ली। 2012 से WAM और PayManager ठेकेदारों के बिल भुगतान का ऑनलाइन रास्ता थे। इसका मतलब था कि कार्यालयों, ठेकेदारों और processing staff के पास बिल आगे बढ़ाने का एक परिचित तरीका था। लेकिन जनवरी 2025 से नए काम और अनुबंधों के लिए IFMS 2.0 में अधिक पूरा रिकॉर्ड बनाना अपेक्षित था। इसलिए यह बदलाव केवल नया payment screen नहीं था; इसका उद्देश्य हर भुगतान को पूरे works record का हिस्सा बनाना था।', 'इस रिकॉर्ड में work ID, administrative sanction ID, technical sanction ID, BOQ ID, package ID, work order ID और approved abstract ID शामिल थे। माप को electronic Measurement Book में दर्ज किया जाना था। किसी एक बिल को पढ़ने वाला व्यक्ति सिद्धांत रूप में payment से पीछे जाते हुए approved work, दर्ज quantities और approval से पहले हुई checks तक पहुंच सके। भुगतान एक जुड़े हुए record-chain का अंतिम चरण होना था, अलग-थलग लेनदेन नहीं।', 'जुलाई 2026 की तारीखें बताती हैं कि इसे एक handover की तरह पढ़ना जरूरी है। वित्त विभाग का training 2 जुलाई को हुआ; स्रोत-नोट के अनुसार WAM पर regular payments 6 जुलाई तक जारी रहे; और 10 जुलाई को WAM bill processing रोक दी गई, जबकि data migration और IFMS 3.0 stabilisation चल रहे थे। ये तारीखें किसी payment को गलत सिद्ध नहीं करतीं। वे यह जरूर दिखाती हैं कि replacement system के settle होने के दौरान legacy route बंद हुआ।', 'इससे reconciliation का व्यावहारिक काम पैदा होता है। पुराने bills, नए contracts, migrated records और transition के दौरान तैयार bills में supporting information एक ही तरह से दिखाई नहीं दे सकती। मुख्य सवाल यह है कि विभाग इन अलग formats के बीच एक traceable record बचा पाता है या नहीं — खासकर उस bill के लिए जो एक workflow में शुरू हुआ और दूसरे में पूरा हुआ।'] },
      { id: 'chapter-strain', number: '02', title: 'कागजी प्रक्रिया में बदलाव का दबाव दिखता है', paragraphs: ['स्रोत-नोट किसी एक नाटकीय क्षण में सिस्टम के विफल होने की बात नहीं करता। उसमें घर्षण की बात है: एक बिल के साथ बहुत अधिक पन्ने, सीमित training और monitoring, तथा outsourcing और computer centres पर बढ़ता बोझ। यह इसलिए महत्वपूर्ण है क्योंकि payment process केवल software का काम नहीं है। यह इस बात पर भी निर्भर करता है कि किस stage पर कौन-सा document चाहिए, उसे कौन check करेगा, और जब digital entry पूरी न हो सके तो exception कहां दर्ज होगा।', 'Supporting pages की संख्या बढ़ना अपने-आप में control मजबूत नहीं करता। अगर original contractor bill, Measurement Book pages, quality-control abstracts और material records अलग-अलग घूमते रहें, तो file लंबी हो सकती है लेकिन review कठिन। कोई document process में कहीं मौजूद हो सकता है, फिर भी उस approval से visibly जुड़ा न हो जिस पर वह निर्भर है। यहां बताई गई चिंता traceability की है: record बढ़ रहा है, लेकिन उसके हिस्सों का संबंध स्पष्ट नहीं हो रहा।', 'स्रोत training और monitoring की सीमाओं के साथ outsourcing और computer-centres पर बढ़ते बोझ की ओर भी संकेत करता है। इससे record तैयार करने वाले, उसे enter करने वाले और approval देने वाले व्यक्ति के बीच handoffs बढ़ते हैं। अगर maker, checker और approver की जिम्मेदारियां साफ और visible नहीं हैं, तो बाद का reviewer यह नहीं समझ पाता कि quantity किसने verify की, enclosure किसने स्वीकार किया, या missing record को acceptable किस आधार पर माना गया।', '1 अगस्त तक स्रोत ने नए portal को पूरी तरह systematic नहीं बताया; vendor names लगातार दिखाई नहीं दे रहे थे और security-deposit records पूरी तरह integrated नहीं हुए थे। यह operational concern है, false bill या misconduct का proof नहीं। इसका महत्व यह है कि inconsistent names और incomplete linked records ordinary scrutiny को धीमा करते हैं: reviewer को substantive सवाल तक पहुंचने से पहले vendor, contract और deposit को match करने में अधिक समय लगाना पड़ता है।'] },
      { id: 'chapter-evidence', number: '03', title: 'बिल को अपना प्रमाण साथ लेकर चलना चाहिए', paragraphs: ['Payment system यह दिखा सकती है कि पैसा चला गया। जवाबदेह works record को यह भी दिखाना होगा कि पैसा किस काम के लिए था, किस approval ने उसे अधिकृत किया, काम कैसे मापा गया और सामग्री व quality checks का document बना या नहीं। इस transition का मूल फर्क यही है। Transaction entry सवाल "payment process हुआ?" का उत्तर देती है; supporting record को यह बताना होता है कि payment किस काम को represent करता है और उस निष्कर्ष की जांच कैसे हुई।', 'यह chain bill आने से पहले शुरू होती है। Work की पहचान, administrative और technical approvals, BOQ, package और work order दर्ज होने चाहिए। फिर Measurement Book में वास्तव में मापी गई quantities का record होना चाहिए। Quality-control test abstracts और material documents एक अतिरिक्त जांच देते हैं, खासकर तब जब bill की value material consumption या specified standard पर निर्भर करती है। इनमें से कोई link गायब हो तो payment दिख सकता है, लेकिन payment का आधार दिखाई नहीं देता।', 'स्रोत में line-by-line Measurement Book records के missing या inaccessible होने, QC test abstracts के consistently attached न होने और Bitumen CRC, material receipt documents तथा consumption statements से जुड़े gaps उठाए गए हैं। हर item का evidentiary role अलग है। MB quantity की जांच में मदद करता है; QC abstract quality की; material receipts और consumption statements यह देखने में मदद करते हैं कि work record में दावा की गई material use को account किया जा सकता है या नहीं। इन्हें interchangeable attachments नहीं समझना चाहिए।', 'इसीलिए public visibility भी जरूरी है। अगर bill-level records किसी interested citizen के लिए देखना और follow करना कठिन हों, तो accountability chain उस internal reader पर निर्भर हो जाती है जो office, vendor और file structure पहले से जानता है। Brief इस limitation की ओर संकेत करता है, लेकिन किसी particular bill में क्या हुआ यह स्थापित नहीं करता। जिम्मेदार अगला कदम verification है: bill पहचानें, linked records मांगें और साफ बताएं कि कौन-सा link मौजूद, missing या migration के कारण लंबित है।'] },
      { id: 'chapter-accountability', number: '04', title: 'न्यूनतम जवाबदेही चेकलिस्ट', paragraphs: ['सुधार की दिशा व्यावहारिक है: मूल bill और उससे जुड़े प्रमाण एक साथ आगे बढ़ें। उद्देश्य paperwork बढ़ाना नहीं है। उद्देश्य यह है कि payment approve करने वाला व्यक्ति work claim, उसके पीछे का measurement, quality check और material record एक ही reviewable file में देख सके। Complete record auditor या citizen को disconnected systems से payment reconstruct करने के बजाय एक स्पष्ट starting point देता है।', 'जहां digital line entry संभव नहीं है, वहां physical record इस अंतराल में गायब नहीं होना चाहिए। Complete physical Measurement Book PDF अस्थायी रूप से line-by-line evidence बचा सकता है, बशर्ते वह work, bill और approval से स्पष्ट रूप से जुड़ा हो। यही सिद्धांत QC abstracts, Bitumen certificates, material receipts और consumption statements पर लागू होता है: missing digital field को visible exception और review step बनना चाहिए, silent approval नहीं।', 'Roles भी visible होने चाहिए। Maker record तैयार या enter करता है; checker information और enclosures को test करता है; approver payment authorize करता है। इन roles, dates और exceptions को दिखाने से समझ आता है कि bill system में कैसे आगे बढ़ा। इससे विभाग यह भी पहचान सकता है कि बार-बार आने वाली समस्या training की है, migration की, missing document की या unresolved system integration की।', 'यह checklist transition को पढ़ने का control standard है, यह दावा नहीं कि हर current process पहले से इसे पूरा करता है। जनता की कसौटी सीधी है: क्या कोई पाठक sanction से measurement, quality check और material use तक एक payment का पूरा रास्ता देख सकता है? अगर नहीं, तो migration ने interface बदल दिया है, लेकिन जवाबदेही की पूरी कड़ी अभी नहीं बनी।'] },
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
     longform: buildLongform('hi'),
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
    { number: '01', kicker: 'THE SWITCH', title: 'A payment system changes midstream', takeaway: 'Rajasthan\'s works departments moved from a familiar WAM / PayManager workflow toward IFMS 3.0 in July 2026.', copy: 'Since 2012, contractor bills had been processed online through WAM and PayManager. The migration promised a new chain of records — but the handover was still settling when the old route closed.', accent: 'amber' },
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