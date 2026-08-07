# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, r'e:\Rajkumar\News-Article-Elaborator')

exec(open(r'e:\Rajkumar\News-Article-Elaborator\generate_exports.py',
          encoding='utf-8').read())

# ── Patch Ch.5 with Pathway 5 ──────────────────────────────────
for i, ch in enumerate(EMB['chapters']):
    if ch[0] == 'Ch.5':
        EMB['chapters'][i] = (
            'Ch.5',
            'Five Fraud Pathways — incl. Multi-Project CRC Reuse (NEW)',
            'Fraud के पाँच रास्ते — Pathway 5: एक CRC, कई Projects',
            ('Pathway 1: CRC quantity altered. '
             'Pathway 2: Fake/recycled CRC. '
             'Pathway 3: Verification officer compromised. '
             'Pathway 4: 80 MT used, 120 MT claimed. '
             'Pathway 5 — NEW (most dangerous): Same CRC submitted to multiple '
             'projects simultaneously by the same contractor. One 100 MT delivery '
             'is claimed across 3 projects = 300 MT payment from treasury. '
             'Each Division processes its bill independently — no cross-Division '
             'CRC cross-check exists. Without a centralised CRC registry this '
             'fraud is completely invisible.'),
            ('Pathway 1: CRC में quantity alter। '
             'Pathway 2: Fake/recycled CRC। '
             'Pathway 3: Verification officer compromised। '
             'Pathway 4: 80 MT use, 120 MT claim। '
             'Pathway 5 (नई — सबसे खतरनाक): एक ही contractor एक CRC को '
             'एक साथ कई projects की bills में attach करता है। '
             '100 MT की एक delivery को 3 projects में दिखाकर 300 MT का payment। '
             'हर Division अपना bill independently process करता है — '
             'cross-Division CRC check का कोई mechanism नहीं। '
             'Centralised CRC Registry के बिना यह fraud पूरी तरह invisible है।')
        )
        break

EMB['facts'][4] = ('5', 'Fraud pathways — incl. multi-project CRC reuse')

print('=== Regenerating eMB exports with Pathway 5 ===')
make_docx(EMB, 'PWD-eMB-Corruption-Investigation.docx')
make_pdf (EMB, 'PWD-eMB-Corruption-Investigation.pdf')
make_pptx(EMB, 'PWD-eMB-Corruption-Investigation.pptx')
print('All done.')
