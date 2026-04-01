window.premedData = window.premedData || {};
window.premedData.colorectal = {

    // ── COLON — NEOADJUVANT ──────────────────────────────────────────────────

    'mFOLFOX6-Neo': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Oxaliplatin', sequence: 1, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' },
            { name: 'Leucovorin', sequence: 2, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Run simultaneously with oxaliplatin via Y-site over 2h. Flush with D5W after.' },
            { name: '5-Fluorouracil', sequence: 3, solvent: 'D5W', volume: '100mL', duration: 'IV bolus over 2–4 min',
              note: 'Bolus dose — administer after leucovorin infusion completes.' },
            { name: '5-Fluorouracil', sequence: 4, solvent: 'D5W', volume: '240mL', duration: '46h CI (Baxter Infusor LV5)',
              note: '46-hour continuous infusion. Use Baxter Infusor LV5 (5 mL/hr). Dilute in D5W only.' }
        ]
    },

    'CapeOX-Neo': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Oxaliplatin', sequence: 1, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' }
        ]
    },

    'Nivolumab-Ipilimumab-Neo-NICHE2': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Nivolumab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '30 min',
              note: 'First infusion: 60 min; subsequent infusions: 30 min if first tolerated. Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions. Counsel patient on irAEs before starting therapy.' },
            { name: 'Ipilimumab', sequence: 2, solvent: 'NS', volume: '100mL', duration: '30 min',
              note: 'Administer through a 0.2 micron in-line filter. Do not mix with other medications. Monitor for infusion reactions and irAEs — colitis risk is higher with ipilimumab.' }
        ]
    },

    'Pembrolizumab-Neo-dMMR': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Pembrolizumab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '30 min',
              note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions throughout infusion. Counsel patient on immune-related adverse events (irAEs) before starting therapy.' }
        ]
    },

    'Cemiplimab-Neo-dMMR': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Cemiplimab', sequence: 1, solvent: 'NS', volume: '250mL', duration: '30 min',
              note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions throughout infusion. Counsel patient on immune-related adverse events (irAEs) before starting therapy.' }
        ]
    },

    'Dostarlimab-Neo-dMMR': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Dostarlimab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '30 min',
              note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions throughout infusion. Counsel patient on immune-related adverse events (irAEs) before starting therapy.' }
        ]
    },

    'Retifanlimab-Neo-dMMR': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Retifanlimab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '30 min',
              note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions throughout infusion. Counsel patient on immune-related adverse events (irAEs) before starting therapy.' }
        ]
    },

    'Toripalimab-Neo-dMMR': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Toripalimab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '30–60 min',
              note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions throughout infusion. Counsel patient on immune-related adverse events (irAEs) before starting therapy.' }
        ]
    },

    'Tislelizumab-Neo-dMMR': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Tislelizumab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '30–60 min',
              note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions throughout infusion. Counsel patient on immune-related adverse events (irAEs) before starting therapy.' }
        ]
    },

    // ── COLON — ADJUVANT ────────────────────────────────────────────────────

    'Capecitabine-Adj': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    '5FU-LV-Adj': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: '5-Fluorouracil', sequence: 1, solvent: 'NS', volume: '100mL', duration: '5–15 min bolus',
              note: 'Administer as slow IV push or short infusion. Monitor for acute cerebellar syndrome (rare — dizziness, ataxia).' },
            { name: 'Leucovorin', sequence: 2, solvent: 'D5W', volume: '100mL', duration: '10–15 min',
              note: 'Administer before 5-FU bolus.' }
        ]
    },

    'mFOLFOX6-Adj': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Oxaliplatin', sequence: 1, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' },
            { name: 'Leucovorin', sequence: 2, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Run simultaneously with oxaliplatin via Y-site over 2h. Flush with D5W after.' },
            { name: '5-Fluorouracil', sequence: 3, solvent: 'D5W', volume: '100mL', duration: 'IV bolus over 2–4 min',
              note: 'Bolus dose — administer after leucovorin infusion completes.' },
            { name: '5-Fluorouracil', sequence: 4, solvent: 'D5W', volume: '240mL', duration: '46h CI (Baxter Infusor LV5)',
              note: '46-hour continuous infusion. Use Baxter Infusor LV5 (5 mL/hr). Dilute in D5W only.' }
        ]
    },

    'CapeOX-Adj': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Oxaliplatin', sequence: 1, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' }
        ]
    },

    'mFOLFOX6-Atezolizumab-Adj-dMMR': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Atezolizumab', sequence: 1, solvent: 'NS', volume: '250mL', duration: '60 min',
              note: 'First infusion: 60 min. If tolerated, subsequent infusions: 30 min. Administer through a 0.2 micron in-line filter. Counsel patient on irAEs before starting therapy.' },
            { name: 'Oxaliplatin', sequence: 2, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' },
            { name: 'Leucovorin', sequence: 3, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Run simultaneously with oxaliplatin via Y-site over 2h. Flush with D5W after.' },
            { name: '5-Fluorouracil', sequence: 4, solvent: 'D5W', volume: '100mL', duration: 'IV bolus over 2–4 min',
              note: 'Bolus dose — administer after leucovorin infusion completes.' },
            { name: '5-Fluorouracil', sequence: 5, solvent: 'D5W', volume: '240mL', duration: '46h CI (Baxter Infusor LV5)',
              note: '46-hour continuous infusion. Use Baxter Infusor LV5 (5 mL/hr). Dilute in D5W only.' }
        ]
    },

    'CapeOX-Atezolizumab-Adj-dMMR': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Atezolizumab', sequence: 1, solvent: 'NS', volume: '250mL', duration: '60 min',
              note: 'First infusion: 60 min. If tolerated, subsequent infusions: 30 min. Administer through a 0.2 micron in-line filter. Counsel patient on irAEs before starting therapy.' },
            { name: 'Oxaliplatin', sequence: 2, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' }
        ]
    },

    // ── RECTAL — NEOADJUVANT ────────────────────────────────────────────────

    'mFOLFOX6-Rectal-Neo': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Oxaliplatin', sequence: 1, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' },
            { name: 'Leucovorin', sequence: 2, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Run simultaneously with oxaliplatin via Y-site over 2h. Flush with D5W after.' },
            { name: '5-Fluorouracil', sequence: 3, solvent: 'D5W', volume: '100mL', duration: 'IV bolus over 2–4 min',
              note: 'Bolus dose — administer after leucovorin infusion completes.' },
            { name: '5-Fluorouracil', sequence: 4, solvent: 'D5W', volume: '240mL', duration: '46h CI (Baxter Infusor LV5)',
              note: '46-hour continuous infusion. Use Baxter Infusor LV5 (5 mL/hr). Dilute in D5W only.' }
        ]
    },

    'CapeOX-Rectal-Neo': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Oxaliplatin', sequence: 1, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' }
        ]
    },

    'Dostarlimab-Rectal-Neo-dMMR': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Dostarlimab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '30 min',
              note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions throughout infusion. Counsel patient on immune-related adverse events (irAEs) before starting therapy.' }
        ]
    },

    '5FU-RT-German-AIO': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: '5-Fluorouracil', sequence: 1, solvent: 'NS', volume: '500mL', duration: '120h CI (D1–D5)',
              note: 'Continuous infusion — use elastomeric or CADD pump. Confirm pump rate and fill volume with pharmacy before dispensing.' }
        ]
    },

    'Capecitabine-RT-Neo': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    '5FU-Oxaliplatin-RT-Neo': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: '5-Fluorouracil', sequence: 1, solvent: 'NS', volume: '500mL', duration: 'CI throughout RT',
              note: 'Continuous infusion throughout RT course — use elastomeric or CADD pump. Confirm pump rate and fill volume with pharmacy before dispensing.' },
            { name: 'Oxaliplatin', sequence: 2, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' }
        ]
    },

    'CapeOX-RT-Neo': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Oxaliplatin', sequence: 1, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' }
        ]
    },

    // ── RECTAL — ADJUVANT ───────────────────────────────────────────────────

    'mFOLFOX6-Rectal-Adj': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Oxaliplatin', sequence: 1, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' },
            { name: 'Leucovorin', sequence: 2, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Run simultaneously with oxaliplatin via Y-site over 2h. Flush with D5W after.' },
            { name: '5-Fluorouracil', sequence: 3, solvent: 'D5W', volume: '100mL', duration: 'IV bolus over 2–4 min',
              note: 'Bolus dose — administer after leucovorin infusion completes.' },
            { name: '5-Fluorouracil', sequence: 4, solvent: 'D5W', volume: '240mL', duration: '46h CI (Baxter Infusor LV5)',
              note: '46-hour continuous infusion. Use Baxter Infusor LV5 (5 mL/hr). Dilute in D5W only.' }
        ]
    },

    'CapeOX-Rectal-Adj': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Oxaliplatin', sequence: 1, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' }
        ]
    },

    '5FU-RT-German-AIO-Adj': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: '5-Fluorouracil', sequence: 1, solvent: 'NS', volume: '500mL', duration: '120h CI (D1–D5)',
              note: 'Continuous infusion — use elastomeric or CADD pump. Confirm pump rate and fill volume with pharmacy before dispensing.' }
        ]
    },

    'Capecitabine-RT-Adj': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    '5FU-LV-Weekly-Adj': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: '5-Fluorouracil', sequence: 1, solvent: 'NS', volume: '100mL', duration: '5–15 min bolus',
              note: 'Administer as slow IV push or short infusion.' },
            { name: 'Leucovorin', sequence: 2, solvent: 'D5W', volume: '100mL', duration: '10–15 min',
              note: 'Administer before 5-FU bolus.' }
        ]
    },

    'FOLFOX4-Adj': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Oxaliplatin', sequence: 1, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' },
            { name: 'Leucovorin', sequence: 2, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Run concurrently with oxaliplatin via Y-site. Flush with D5W after.' },
            { name: '5-Fluorouracil', sequence: 3, solvent: 'D5W', volume: '100mL', duration: 'IV bolus',
              note: 'Bolus D1 and D2.' },
            { name: '5-Fluorouracil (continuous infusion)', sequence: 4, solvent: 'D5W', volume: '240mL', duration: '22h CI D1–D2',
              note: 'Continuous infusion over 22h on D1 and D2. Use elastomeric or CADD pump.' }
        ]
    },

    '5FU-LV-deGramont-Adj': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Leucovorin', sequence: 1, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Administer before 5-FU bolus on D1 and D2.' },
            { name: '5-Fluorouracil (bolus)', sequence: 2, solvent: 'D5W', volume: '100mL', duration: 'IV bolus',
              note: 'Bolus D1 and D2 after leucovorin.' },
            { name: '5-Fluorouracil (continuous infusion)', sequence: 3, solvent: 'D5W', volume: '240mL', duration: '22h CI D1–D2',
              note: 'Continuous infusion over 22h on D1 and D2. Use elastomeric or CADD pump.' }
        ]
    },

    'Capecitabine-Rectal-Adj': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    // ── METASTATIC ──────────────────────────────────────────────────────────

    'Modified-IFL-Saltz': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Irinotecan', sequence: 1, solvent: 'NS', volume: '250mL', duration: '90 min',
              note: 'Pre-medicate with atropine 0.25–0.5mg SC/IV if acute cholinergic syndrome occurs (early diarrhoea, diaphoresis, abdominal cramps). Loperamide 4mg at first sign of delayed diarrhoea, then 2mg every 2h until diarrhoea-free for 12h.' },
            { name: 'Leucovorin', sequence: 2, solvent: 'D5W', volume: '100mL', duration: '10–15 min',
              note: 'Administer before 5-FU bolus.' },
            { name: '5-Fluorouracil (bolus)', sequence: 3, solvent: 'D5W', volume: '100mL', duration: 'IV bolus',
              note: 'Administer as IV bolus.' }
        ]
    },

    'mFOLFIRI-Metastatic': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Irinotecan', sequence: 1, solvent: 'NS', volume: '250mL', duration: '90 min',
              note: 'Pre-medicate with atropine 0.25–0.5mg SC/IV if acute cholinergic syndrome occurs (early diarrhoea, diaphoresis, abdominal cramps). Loperamide 4mg at first sign of delayed diarrhoea, then 2mg every 2h until diarrhoea-free for 12h.' },
            { name: 'Leucovorin', sequence: 2, solvent: 'D5W', volume: '250mL', duration: '90 min',
              note: 'Run simultaneously with irinotecan via Y-site. Flush with D5W after.' },
            { name: '5-Fluorouracil', sequence: 3, solvent: 'D5W', volume: '100mL', duration: 'IV bolus over 2–4 min',
              note: 'Bolus dose — administer after irinotecan/leucovorin completes.' },
            { name: '5-Fluorouracil', sequence: 4, solvent: 'D5W', volume: '240mL', duration: '46h CI (Baxter Infusor LV5)',
              note: '46-hour continuous infusion. Use Baxter Infusor LV5 (5 mL/hr). Dilute in D5W only.' }
        ]
    },

    'mFOLFOX6-Metastatic': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Oxaliplatin', sequence: 1, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' },
            { name: 'Leucovorin', sequence: 2, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Run simultaneously with oxaliplatin via Y-site over 2h. Flush with D5W after.' },
            { name: '5-Fluorouracil', sequence: 3, solvent: 'D5W', volume: '100mL', duration: 'IV bolus over 2–4 min',
              note: 'Bolus dose — administer after leucovorin infusion completes.' },
            { name: '5-Fluorouracil', sequence: 4, solvent: 'D5W', volume: '240mL', duration: '46h CI (Baxter Infusor LV5)',
              note: '46-hour continuous infusion. Use Baxter Infusor LV5 (5 mL/hr). Dilute in D5W only.' }
        ]
    },

    'FOLFOXIRI-Metastatic': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            { name: 'Irinotecan', sequence: 1, solvent: 'NS', volume: '250mL', duration: '90 min',
              note: 'Pre-medicate with atropine 0.25–0.5mg SC/IV if acute cholinergic syndrome occurs. Loperamide 4mg at first sign of delayed diarrhoea, then 2mg every 2h until diarrhoea-free for 12h.' },
            { name: 'Oxaliplatin', sequence: 2, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' },
            { name: 'Leucovorin', sequence: 3, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Administer before 5-FU CI starts.' },
            { name: '5-Fluorouracil (continuous infusion)', sequence: 4, solvent: 'D5W', volume: '240mL', duration: '46h CI (Baxter Infusor LV5)',
              note: '46-hour continuous infusion. Use Baxter Infusor LV5 (5 mL/hr). Dilute in D5W only. Note: FOLFOXIRI uses no 5-FU bolus.' }
        ]
    },

    'mFOLFOX6-Bevacizumab-Metastatic': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Bevacizumab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '30–90 min',
              note: 'First infusion: 90 min. If tolerated, second infusion: 60 min; subsequent infusions: 30 min. Do not administer as IV push or bolus.' },
            { name: 'Oxaliplatin', sequence: 2, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' },
            { name: 'Leucovorin', sequence: 3, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Run simultaneously with oxaliplatin via Y-site over 2h. Flush with D5W after.' },
            { name: '5-Fluorouracil', sequence: 4, solvent: 'D5W', volume: '100mL', duration: 'IV bolus over 2–4 min',
              note: 'Bolus dose — administer after leucovorin infusion completes.' },
            { name: '5-Fluorouracil', sequence: 5, solvent: 'D5W', volume: '240mL', duration: '46h CI (Baxter Infusor LV5)',
              note: '46-hour continuous infusion. Use Baxter Infusor LV5 (5 mL/hr). Dilute in D5W only.' }
        ]
    },

    'CapeOX-Bevacizumab-Metastatic': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Bevacizumab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '30–90 min',
              note: 'First infusion: 90 min. If tolerated, second infusion: 60 min; subsequent infusions: 30 min. Do not administer as IV push or bolus.' },
            { name: 'Oxaliplatin', sequence: 2, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' }
        ]
    },

    'FOLFIRI-Bevacizumab-Metastatic': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Bevacizumab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '30–90 min',
              note: 'First infusion: 90 min. If tolerated, second infusion: 60 min; subsequent infusions: 30 min. Do not administer as IV push or bolus.' },
            { name: 'Irinotecan', sequence: 2, solvent: 'NS', volume: '250mL', duration: '90 min',
              note: 'Pre-medicate with atropine 0.25–0.5mg SC/IV if acute cholinergic syndrome occurs (early diarrhoea, diaphoresis, abdominal cramps). Loperamide 4mg at first sign of delayed diarrhoea, then 2mg every 2h until diarrhoea-free for 12h.' },
            { name: 'Leucovorin', sequence: 3, solvent: 'D5W', volume: '250mL', duration: '90 min',
              note: 'Run simultaneously with irinotecan via Y-site. Flush with D5W after.' },
            { name: '5-Fluorouracil', sequence: 4, solvent: 'D5W', volume: '100mL', duration: 'IV bolus over 2–4 min',
              note: 'Bolus dose — administer after irinotecan/leucovorin completes.' },
            { name: '5-Fluorouracil', sequence: 5, solvent: 'D5W', volume: '240mL', duration: '46h CI (Baxter Infusor LV5)',
              note: '46-hour continuous infusion. Use Baxter Infusor LV5 (5 mL/hr). Dilute in D5W only.' }
        ]
    },

    'FOLFOXIRI-Bevacizumab-Metastatic': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            { name: 'Bevacizumab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '30–90 min',
              note: 'First infusion: 90 min. If tolerated, second infusion: 60 min; subsequent infusions: 30 min. Do not administer as IV push or bolus.' },
            { name: 'Irinotecan', sequence: 2, solvent: 'NS', volume: '250mL', duration: '90 min',
              note: 'Pre-medicate with atropine 0.25–0.5mg SC/IV if acute cholinergic syndrome occurs. Loperamide 4mg at first sign of delayed diarrhoea, then 2mg every 2h until diarrhoea-free for 12h.' },
            { name: 'Oxaliplatin', sequence: 3, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' },
            { name: 'Leucovorin', sequence: 4, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Administer before 5-FU CI starts.' },
            { name: '5-Fluorouracil (continuous infusion)', sequence: 5, solvent: 'D5W', volume: '240mL', duration: '46h CI (Baxter Infusor LV5)',
              note: '46-hour continuous infusion. Use Baxter Infusor LV5 (5 mL/hr). Dilute in D5W only. Note: FOLFOXIRI uses no 5-FU bolus.' }
        ]
    },

    'mFOLFOX6-Cetuximab-Metastatic': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Cetuximab', sequence: 1, solvent: 'NS', volume: '250mL', duration: '60–120 min',
              note: 'First infusion: 120 min max (1 mg/min). Subsequent infusions: 60 min max (2 mg/min). Pre-medicate with H1 antihistamine (mandatory). Monitor closely for infusion reactions (Grade 3–4 occur in ~3%).' },
            { name: 'Oxaliplatin', sequence: 2, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' },
            { name: 'Leucovorin', sequence: 3, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Run simultaneously with oxaliplatin via Y-site over 2h. Flush with D5W after.' },
            { name: '5-Fluorouracil', sequence: 4, solvent: 'D5W', volume: '100mL', duration: 'IV bolus over 2–4 min',
              note: 'Bolus dose — administer after leucovorin infusion completes.' },
            { name: '5-Fluorouracil', sequence: 5, solvent: 'D5W', volume: '240mL', duration: '46h CI (Baxter Infusor LV5)',
              note: '46-hour continuous infusion. Use Baxter Infusor LV5 (5 mL/hr). Dilute in D5W only.' }
        ]
    },

    'mFOLFOX6-Panitumumab-Metastatic': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Panitumumab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '60 min',
              note: 'Doses ≤1000mg: 60 min infusion; doses >1000mg: 90 min. Administer through a 0.2 micron in-line filter. Do not mix with other medications. No pre-medication required (fully human antibody — low infusion reaction risk).' },
            { name: 'Oxaliplatin', sequence: 2, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' },
            { name: 'Leucovorin', sequence: 3, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Run simultaneously with oxaliplatin via Y-site over 2h. Flush with D5W after.' },
            { name: '5-Fluorouracil', sequence: 4, solvent: 'D5W', volume: '100mL', duration: 'IV bolus over 2–4 min',
              note: 'Bolus dose — administer after leucovorin infusion completes.' },
            { name: '5-Fluorouracil', sequence: 5, solvent: 'D5W', volume: '240mL', duration: '46h CI (Baxter Infusor LV5)',
              note: '46-hour continuous infusion. Use Baxter Infusor LV5 (5 mL/hr). Dilute in D5W only.' }
        ]
    },

    'CapeOX-Cetuximab-Metastatic': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Cetuximab', sequence: 1, solvent: 'NS', volume: '250mL', duration: '60–120 min',
              note: 'First infusion: 120 min max (1 mg/min). Subsequent infusions: 60 min max (2 mg/min). Pre-medicate with H1 antihistamine (mandatory). Monitor closely for infusion reactions.' },
            { name: 'Oxaliplatin', sequence: 2, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' }
        ]
    },

    'CapeOX-Panitumumab-Metastatic': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Panitumumab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '60 min',
              note: 'Doses ≤1000mg: 60 min infusion; doses >1000mg: 90 min. Administer through a 0.2 micron in-line filter. No pre-medication required (fully human antibody).' },
            { name: 'Oxaliplatin', sequence: 2, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' }
        ]
    },

    'FOLFIRI-Cetuximab-Metastatic': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Cetuximab', sequence: 1, solvent: 'NS', volume: '250mL', duration: '60–120 min',
              note: 'First infusion: 120 min max (1 mg/min). Subsequent infusions: 60 min max (2 mg/min). Pre-medicate with H1 antihistamine (mandatory). Monitor closely for infusion reactions.' },
            { name: 'Irinotecan', sequence: 2, solvent: 'NS', volume: '250mL', duration: '90 min',
              note: 'Pre-medicate with atropine 0.25–0.5mg SC/IV if acute cholinergic syndrome occurs (early diarrhoea, diaphoresis, abdominal cramps). Loperamide 4mg at first sign of delayed diarrhoea, then 2mg every 2h until diarrhoea-free for 12h.' },
            { name: 'Leucovorin', sequence: 3, solvent: 'D5W', volume: '250mL', duration: '90 min',
              note: 'Run simultaneously with irinotecan via Y-site. Flush with D5W after.' },
            { name: '5-Fluorouracil', sequence: 4, solvent: 'D5W', volume: '100mL', duration: 'IV bolus over 2–4 min',
              note: 'Bolus dose — administer after irinotecan/leucovorin completes.' },
            { name: '5-Fluorouracil', sequence: 5, solvent: 'D5W', volume: '240mL', duration: '46h CI (Baxter Infusor LV5)',
              note: '46-hour continuous infusion. Use Baxter Infusor LV5 (5 mL/hr). Dilute in D5W only.' }
        ]
    },

    'FOLFIRI-Panitumumab-Metastatic': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Panitumumab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '60 min',
              note: 'Doses ≤1000mg: 60 min infusion; doses >1000mg: 90 min. Administer through a 0.2 micron in-line filter. No pre-medication required.' },
            { name: 'Irinotecan', sequence: 2, solvent: 'NS', volume: '250mL', duration: '90 min',
              note: 'Pre-medicate with atropine 0.25–0.5mg SC/IV if acute cholinergic syndrome occurs (early diarrhoea, diaphoresis, abdominal cramps). Loperamide 4mg at first sign of delayed diarrhoea, then 2mg every 2h until diarrhoea-free for 12h.' },
            { name: 'Leucovorin', sequence: 3, solvent: 'D5W', volume: '250mL', duration: '90 min',
              note: 'Run simultaneously with irinotecan via Y-site. Flush with D5W after.' },
            { name: '5-Fluorouracil', sequence: 4, solvent: 'D5W', volume: '100mL', duration: 'IV bolus over 2–4 min',
              note: 'Bolus dose — administer after irinotecan/leucovorin completes.' },
            { name: '5-Fluorouracil', sequence: 5, solvent: 'D5W', volume: '240mL', duration: '46h CI (Baxter Infusor LV5)',
              note: '46-hour continuous infusion. Use Baxter Infusor LV5 (5 mL/hr). Dilute in D5W only.' }
        ]
    },

    'Cetuximab-Irinotecan-Metastatic': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Cetuximab', sequence: 1, solvent: 'NS', volume: '250mL', duration: '60–120 min',
              note: 'First infusion: 120 min max (1 mg/min). Subsequent infusions: 60 min max (2 mg/min). Pre-medicate with H1 antihistamine (mandatory). Monitor closely for infusion reactions.' },
            { name: 'Irinotecan', sequence: 2, solvent: 'NS', volume: '250mL', duration: '30–90 min',
              note: 'Pre-medicate with atropine 0.25–0.5mg SC/IV if acute cholinergic syndrome occurs (early diarrhoea, diaphoresis, abdominal cramps). Loperamide 4mg at first sign of delayed diarrhoea, then 2mg every 2h until diarrhoea-free for 12h.' }
        ]
    },

    'CapeOX-Metastatic': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Oxaliplatin', sequence: 1, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' }
        ]
    },

    'XELIRI-Metastatic': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Irinotecan', sequence: 1, solvent: 'NS', volume: '250mL', duration: '90 min',
              note: 'Pre-medicate with atropine 0.25–0.5mg SC/IV if acute cholinergic syndrome occurs (early diarrhoea, diaphoresis, abdominal cramps). Loperamide 4mg at first sign of delayed diarrhoea, then 2mg every 2h until diarrhoea-free for 12h.' }
        ]
    },

    'Capecitabine-Mitomycin-C-Metastatic': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Mitomycin-C', sequence: 1, solvent: 'NS', volume: '50mL', duration: '15–30 min',
              note: 'VESICANT — administer via central line or confirmed patent peripheral IV only. Monitor for extravasation (causes severe tissue necrosis). Track cumulative lifetime dose (↑HUS/TMA risk >60mg total). Monitor FBC + blood film + creatinine + LDH every cycle.' }
        ]
    },

    'Oxaliplatin-Irinotecan-Metastatic': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Irinotecan', sequence: 1, solvent: 'NS', volume: '250mL', duration: '90 min',
              note: 'Pre-medicate with atropine 0.25–0.5mg SC/IV if acute cholinergic syndrome occurs. Loperamide 4mg at first sign of delayed diarrhoea, then 2mg every 2h until diarrhoea-free for 12h.' },
            { name: 'Oxaliplatin', sequence: 2, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' }
        ]
    },

    '5FU-LV-Roswell-Park-Metastatic': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Leucovorin', sequence: 1, solvent: 'D5W', volume: '500mL', duration: '2 hours',
              note: 'Administer before 5-FU bolus.' },
            { name: '5-Fluorouracil', sequence: 2, solvent: 'D5W', volume: '100mL', duration: 'IV bolus',
              note: 'Administer as slow IV push or short infusion after leucovorin completes.' }
        ]
    },

    '5FU-LV-Bevacizumab-Metastatic': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Bevacizumab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '30–90 min',
              note: 'First infusion: 90 min. If tolerated, second infusion: 60 min; subsequent infusions: 30 min. Do not administer as IV push or bolus.' },
            { name: 'Leucovorin', sequence: 2, solvent: 'D5W', volume: '500mL', duration: '2 hours',
              note: 'Administer before 5-FU bolus.' },
            { name: '5-Fluorouracil', sequence: 3, solvent: 'D5W', volume: '100mL', duration: 'IV bolus',
              note: 'Administer as slow IV push or short infusion after leucovorin completes.' }
        ]
    },

    'TAS-102-Bevacizumab-Metastatic': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Bevacizumab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '30–90 min',
              note: 'First infusion: 90 min. If tolerated, second infusion: 60 min; subsequent infusions: 30 min. Do not administer as IV push or bolus.' }
        ]
    },

    'TAS-102-Metastatic': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    'XELIRI-Bevacizumab-Metastatic': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Bevacizumab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '30–90 min',
              note: 'First infusion: 90 min. If tolerated, second infusion: 60 min; subsequent infusions: 30 min. Do not administer as IV push or bolus.' },
            { name: 'Irinotecan', sequence: 2, solvent: 'NS', volume: '250mL', duration: '90 min',
              note: 'Pre-medicate with atropine 0.25–0.5mg SC/IV if acute cholinergic syndrome occurs. Loperamide 4mg at first sign of delayed diarrhoea, then 2mg every 2h until diarrhoea-free for 12h.' }
        ]
    },

    'FOLFIRI-Ziv-Aflibercept-Metastatic': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Ziv-aflibercept', sequence: 1, solvent: 'NS', volume: '100mL', duration: '60 min',
              note: 'Administer over 60 min through a 0.2 micron filter. Do not administer as IV push or bolus. Contains polyethylene glycol — use polyethylene-lined IV bags only (no PVC).' },
            { name: 'Irinotecan', sequence: 2, solvent: 'NS', volume: '250mL', duration: '90 min',
              note: 'Pre-medicate with atropine 0.25–0.5mg SC/IV if acute cholinergic syndrome occurs. Loperamide 4mg at first sign of delayed diarrhoea, then 2mg every 2h until diarrhoea-free for 12h.' },
            { name: 'Leucovorin', sequence: 3, solvent: 'D5W', volume: '250mL', duration: '90 min',
              note: 'Run simultaneously with irinotecan via Y-site. Flush with D5W after.' },
            { name: '5-Fluorouracil', sequence: 4, solvent: 'D5W', volume: '100mL', duration: 'IV bolus over 2–4 min',
              note: 'Bolus dose — administer after irinotecan/leucovorin completes.' },
            { name: '5-Fluorouracil', sequence: 5, solvent: 'D5W', volume: '240mL', duration: '46h CI (Baxter Infusor LV5)',
              note: '46-hour continuous infusion. Use Baxter Infusor LV5 (5 mL/hr). Dilute in D5W only.' }
        ]
    },

    'FOLFIRI-Ramucirumab-Metastatic': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Ramucirumab', sequence: 1, solvent: 'NS', volume: '250mL', duration: '60 min',
              note: 'Administer over 60 min through a 0.2 micron protein-sparing filter. Do not administer as IV push or bolus. Pre-medicate with H1 antihistamine before each infusion.' },
            { name: 'Irinotecan', sequence: 2, solvent: 'NS', volume: '250mL', duration: '90 min',
              note: 'Pre-medicate with atropine 0.25–0.5mg SC/IV if acute cholinergic syndrome occurs. Loperamide 4mg at first sign of delayed diarrhoea, then 2mg every 2h until diarrhoea-free for 12h.' },
            { name: 'Leucovorin', sequence: 3, solvent: 'D5W', volume: '250mL', duration: '90 min',
              note: 'Run simultaneously with irinotecan via Y-site. Flush with D5W after.' },
            { name: '5-Fluorouracil', sequence: 4, solvent: 'D5W', volume: '100mL', duration: 'IV bolus over 2–4 min',
              note: 'Bolus dose — administer after irinotecan/leucovorin completes.' },
            { name: '5-Fluorouracil', sequence: 5, solvent: 'D5W', volume: '240mL', duration: '46h CI (Baxter Infusor LV5)',
              note: '46-hour continuous infusion. Use Baxter Infusor LV5 (5 mL/hr). Dilute in D5W only.' }
        ]
    },

    'mFOLFOX6-Encorafenib-Cetuximab-BRAF': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Cetuximab', sequence: 1, solvent: 'NS', volume: '250mL', duration: '60–120 min',
              note: 'First infusion: 120 min max (1 mg/min). Subsequent infusions: 60 min max (2 mg/min). Pre-medicate with H1 antihistamine (mandatory). Monitor closely for infusion reactions.' },
            { name: 'Oxaliplatin', sequence: 2, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' },
            { name: 'Leucovorin', sequence: 3, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Run simultaneously with oxaliplatin via Y-site over 2h. Flush with D5W after.' },
            { name: '5-Fluorouracil', sequence: 4, solvent: 'D5W', volume: '100mL', duration: 'IV bolus over 2–4 min',
              note: 'Bolus dose — administer after leucovorin infusion completes.' },
            { name: '5-Fluorouracil', sequence: 5, solvent: 'D5W', volume: '240mL', duration: '46h CI (Baxter Infusor LV5)',
              note: '46-hour continuous infusion. Use Baxter Infusor LV5 (5 mL/hr). Dilute in D5W only.' }
        ]
    },

    'mFOLFOX6-Encorafenib-Panitumumab-BRAF': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Panitumumab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '60 min',
              note: 'Doses ≤1000mg: 60 min infusion; doses >1000mg: 90 min. Administer through a 0.2 micron in-line filter. No pre-medication required.' },
            { name: 'Oxaliplatin', sequence: 2, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.' },
            { name: 'Leucovorin', sequence: 3, solvent: 'D5W', volume: '250mL', duration: '2 hours',
              note: 'Run simultaneously with oxaliplatin via Y-site over 2h. Flush with D5W after.' },
            { name: '5-Fluorouracil', sequence: 4, solvent: 'D5W', volume: '100mL', duration: 'IV bolus over 2–4 min',
              note: 'Bolus dose — administer after leucovorin infusion completes.' },
            { name: '5-Fluorouracil', sequence: 5, solvent: 'D5W', volume: '240mL', duration: '46h CI (Baxter Infusor LV5)',
              note: '46-hour continuous infusion. Use Baxter Infusor LV5 (5 mL/hr). Dilute in D5W only.' }
        ]
    },

    'Vemurafenib-Irinotecan-Cetuximab-BRAF': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Cetuximab', sequence: 1, solvent: 'NS', volume: '250mL', duration: '60–120 min',
              note: 'First infusion: 120 min max (1 mg/min). Subsequent infusions: 60 min max (2 mg/min). Pre-medicate with H1 antihistamine (mandatory). Monitor closely for infusion reactions.' },
            { name: 'Irinotecan', sequence: 2, solvent: 'NS', volume: '250mL', duration: '90 min',
              note: 'Pre-medicate with atropine 0.25–0.5mg SC/IV if acute cholinergic syndrome occurs. Loperamide 4mg at first sign of delayed diarrhoea, then 2mg every 2h until diarrhoea-free for 12h.' }
        ]
    },

    'Binimetinib-Encorafenib-Cetuximab-BRAF': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Cetuximab', sequence: 1, solvent: 'NS', volume: '250mL', duration: '60–120 min',
              note: 'First infusion: 120 min max (1 mg/min). Subsequent infusions: 60 min max (2 mg/min). Pre-medicate with H1 antihistamine (mandatory). Monitor closely for infusion reactions.' }
        ]
    },

    'Encorafenib-Cetuximab-BRAF': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Cetuximab', sequence: 1, solvent: 'NS', volume: '250mL', duration: '60–120 min',
              note: 'First infusion: 120 min max (1 mg/min). Subsequent infusions: 60 min max (2 mg/min). Pre-medicate with H1 antihistamine (mandatory). Monitor closely for infusion reactions.' }
        ]
    },

    'Encorafenib-Panitumumab-BRAF': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Panitumumab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '60 min',
              note: 'Doses ≤1000mg: 60 min infusion; doses >1000mg: 90 min. Administer through a 0.2 micron in-line filter. No pre-medication required.' }
        ]
    },

    'Nivolumab-Ipilimumab-dMMR': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Nivolumab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '30 min',
              note: 'First infusion: 60 min; subsequent infusions: 30 min if first tolerated. Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions. Counsel patient on irAEs before starting therapy.' },
            { name: 'Ipilimumab', sequence: 2, solvent: 'NS', volume: '100mL', duration: '30 min',
              note: 'Administer through a 0.2 micron in-line filter. Do not mix with other medications. Monitor for infusion reactions and irAEs — colitis risk is higher with ipilimumab. Given for induction doses only (4 doses).' }
        ]
    },

    'Trastuzumab-Lapatinib-HER2': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Trastuzumab', sequence: 1, solvent: 'NS', volume: '250mL', duration: '30–90 min',
              note: 'Loading dose (8 mg/kg): 90 min infusion. Maintenance dose (6 mg/kg): 30 min if loading dose tolerated. Administer through a 0.2 micron in-line filter.' }
        ]
    },

    'Trastuzumab-Tucatinib-HER2': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Trastuzumab', sequence: 1, solvent: 'NS', volume: '250mL', duration: '30–90 min',
              note: 'Loading dose (8 mg/kg): 90 min infusion. Maintenance dose (6 mg/kg): 30 min if loading dose tolerated. Administer through a 0.2 micron in-line filter.' }
        ]
    },

    'Trastuzumab-Pertuzumab-HER2': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Trastuzumab', sequence: 1, solvent: 'NS', volume: '250mL', duration: '30–90 min',
              note: 'Loading dose (8 mg/kg): 90 min infusion. Maintenance dose (6 mg/kg): 30 min if loading dose tolerated. Administer through a 0.2 micron in-line filter.' },
            { name: 'Pertuzumab', sequence: 2, solvent: 'NS', volume: '250mL', duration: '30–60 min',
              note: 'Loading dose (840 mg): 60 min infusion. Maintenance dose (420 mg): 30 min if loading dose tolerated. Monitor for infusion reactions and left ventricular function (LVEF) before each cycle.' }
        ]
    },

    'Capecitabine-Single': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    'Irinotecan-Weekly-Single': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Irinotecan', sequence: 1, solvent: 'NS', volume: '250mL', duration: '90 min',
              note: 'Pre-medicate with atropine 0.25–0.5mg SC/IV if acute cholinergic syndrome occurs (early diarrhoea, diaphoresis, abdominal cramps). Loperamide 4mg at first sign of delayed diarrhoea, then 2mg every 2h until diarrhoea-free for 12h.' }
        ]
    },

    'Irinotecan-Monthly-Single': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Irinotecan', sequence: 1, solvent: 'NS', volume: '250mL', duration: '90 min',
              note: 'Pre-medicate with atropine 0.25–0.5mg SC/IV if acute cholinergic syndrome occurs (early diarrhoea, diaphoresis, abdominal cramps). Loperamide 4mg at first sign of delayed diarrhoea, then 2mg every 2h until diarrhoea-free for 12h.' }
        ]
    },

    'Cetuximab-Single': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Cetuximab', sequence: 1, solvent: 'NS', volume: '250mL', duration: '60–120 min',
              note: 'First infusion: 120 min max (1 mg/min). Subsequent infusions: 60 min max (2 mg/min). Pre-medicate with H1 antihistamine (mandatory). Monitor closely for infusion reactions (Grade 3–4 in ~3%).' }
        ]
    },

    'Panitumumab-Single': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Panitumumab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '60 min',
              note: 'Doses ≤1000mg: 60 min infusion; doses >1000mg: 90 min. Administer through a 0.2 micron in-line filter. No pre-medication required (fully human antibody — low infusion reaction risk).' }
        ]
    },

    'Trastuzumab-Deruxtecan-HER2': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Trastuzumab deruxtecan', sequence: 1, solvent: 'D5W', volume: '100mL', duration: '90 min',
              note: 'First infusion: 90 min; subsequent infusions: 30 min if prior infusions tolerated. Must be diluted in D5W only (not NS). Monitor for ILD/pneumonitis (hold for Grade 1, discontinue for Grade 2+). Monitor for haematological toxicity.' }
        ]
    },

    'Regorafenib-Single': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    'Pembrolizumab-dMMR': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Pembrolizumab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '30 min',
              note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions throughout infusion. Counsel patient on immune-related adverse events (irAEs) before starting therapy.' }
        ]
    },

    'Nivolumab-dMMR': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Nivolumab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '30 min',
              note: 'First infusion: 60 min; subsequent infusions: 30 min if first tolerated. Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions. Counsel patient on irAEs before starting therapy.' }
        ]
    },

    'Larotrectinib-NTRK': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    'Entrectinib-NTRK': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    'Sotorasib-KRAS-G12C': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    'Adagrasib-KRAS-G12C': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    'Selpercatinib-RET': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    'Dostarlimab-dMMR': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Dostarlimab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '30 min',
              note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions throughout infusion. Counsel patient on immune-related adverse events (irAEs) before starting therapy.' }
        ]
    },

    'Cemiplimab-dMMR': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Cemiplimab', sequence: 1, solvent: 'NS', volume: '250mL', duration: '30 min',
              note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions throughout infusion. Counsel patient on immune-related adverse events (irAEs) before starting therapy.' }
        ]
    },

    'Retifanlimab-dMMR': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Retifanlimab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '30 min',
              note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions throughout infusion. Counsel patient on immune-related adverse events (irAEs) before starting therapy.' }
        ]
    },

    'Tislelizumab-dMMR': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Tislelizumab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '30–60 min',
              note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions throughout infusion. Counsel patient on immune-related adverse events (irAEs) before starting therapy.' }
        ]
    },

    'Toripalimab-dMMR': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            { name: 'Toripalimab', sequence: 1, solvent: 'NS', volume: '100mL', duration: '30–60 min',
              note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions throughout infusion. Counsel patient on immune-related adverse events (irAEs) before starting therapy.' }
        ]
    },

    'Fruquintinib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    }
};
