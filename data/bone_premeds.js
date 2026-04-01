window.premedData = window.premedData || {};
window.premedData.bone = {

    // ===================== OSTEOSARCOMA =====================

    // MAP: Doxorubicin + Cisplatin D1-D2; HD-MTX D22/D29 (cycles 1-4), D15/D22 (cycles 5-6)
    'MAP': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            { name: 'Doxorubicin',       sequence: 1, solvent: 'NS',    volume: '100mL / 250mL', duration: '15–30 min',  note: 'VESICANT — confirm patent IV access or central line. Flush line with NS before and after. Monitor cumulative lifetime dose (do not exceed 450–550 mg/m²).' },
            { name: 'Cisplatin',          sequence: 2, solvent: 'NS',    volume: '500mL',          duration: '2–4 hours' },
            { name: 'Methotrexate (HD)',  sequence: 3, solvent: 'NS',    volume: '1000mL',         duration: '4 hours',    note: 'Given on separate day (D22, D29 in cycles 1–4). Alkalinise urine to pH ≥7 before infusion. Monitor serum MTX at 24h, 48h, 72h post-infusion.' },
            { name: 'Leucovorin',         sequence: 4, solvent: 'NS',    volume: '100mL',          duration: '15 min',     note: 'Start 24h after end of MTX infusion. Repeat every 6 hours until serum MTX <0.1 µmol/L.' }
        ]
    },

    // AP: Doxorubicin + Cisplatin
    'AP': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            { name: 'Doxorubicin', sequence: 1, solvent: 'NS', volume: '100mL / 250mL', duration: '15–30 min', note: 'VESICANT — confirm patent IV access or central line. Flush line with NS before and after. Monitor cumulative lifetime dose (do not exceed 450–550 mg/m²).' },
            { name: 'Cisplatin',   sequence: 2, solvent: 'NS', volume: '500mL',          duration: '2–4 hours' }
        ]
    },

    // IAP: Ifosfamide + Mesna + Doxorubicin + Cisplatin
    'IAP': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            { name: 'Ifosfamide',  sequence: 1, solvent: 'NS', volume: '500mL',          duration: '1–2 hours',  note: 'Mesna uroprotection required — total Mesna dose equal to ifosfamide dose, given as boluses at 0h, 4h, 8h relative to each ifosfamide dose (or as continuous infusion). Ensure adequate IV hydration throughout.' },
            { name: 'Mesna',       sequence: 2, solvent: 'NS', volume: '250mL',          duration: '15–30 min',  note: 'Equal to ifosfamide dose. Boluses at 0h, 4h, 8h relative to each ifosfamide dose (or continuous infusion).' },
            { name: 'Doxorubicin', sequence: 3, solvent: 'NS', volume: '100mL / 250mL', duration: '15–30 min',  note: 'VESICANT — confirm patent IV access or central line. Flush line with NS before and after. Monitor cumulative lifetime dose (do not exceed 450–550 mg/m²).' },
            { name: 'Cisplatin',   sequence: 4, solvent: 'NS', volume: '500mL',          duration: '2–4 hours' }
        ]
    },

    // HD-MTX monotherapy (neoadjuvant/adjuvant osteosarcoma)
    'HD-MTX': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Methotrexate (HD)', sequence: 1, solvent: 'NS', volume: '1000mL', duration: '4 hours',   note: 'Alkalinise urine to pH ≥7 before and throughout infusion (sodium bicarbonate IV/PO). Monitor serum MTX at 24h, 48h, 72h post-infusion.' },
            { name: 'Leucovorin',        sequence: 2, solvent: 'NS', volume: '100mL',  duration: '15 min',    note: 'Start 24h after end of MTX infusion. Repeat every 6 hours until serum MTX <0.1 µmol/L.' }
        ]
    },

    // IE — osteosarcoma relapsed/refractory (Ifosfamide + Etoposide)
    'Ifosfamide-Etoposide': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            { name: 'Ifosfamide', sequence: 1, solvent: 'NS', volume: '500mL', duration: '1–2 hours', note: 'Mesna uroprotection required — total Mesna dose equal to ifosfamide dose, given as boluses at 0h, 4h, 8h relative to each ifosfamide dose (or as continuous infusion). Ensure adequate IV hydration throughout.' },
            { name: 'Mesna',      sequence: 2, solvent: 'NS', volume: '250mL', duration: '15–30 min', note: 'Equal to ifosfamide dose. Boluses at 0h, 4h, 8h or continuous infusion.' },
            { name: 'Etoposide',  sequence: 3, solvent: 'NS', volume: '250mL', duration: '60 min',    note: 'Minimum infusion time 30–60 min; never administer as IV bolus (severe hypotension risk). Maximum concentration 0.4 mg/mL.' }
        ]
    },

    // Gemcitabine + Docetaxel (osteosarcoma key; also shared by chondrosarcoma)
    'Gemcitabine-Docetaxel': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Gemcitabine', sequence: 1, solvent: 'NS', volume: '250mL', duration: '30 min',  note: 'Infuse over exactly 30 min. Prolonged infusion (>30 min) increases toxicity without improving efficacy.' },
            { name: 'Docetaxel',   sequence: 2, solvent: 'NS', volume: '250mL', duration: '1 hour',  note: 'See Mandatory Dexamethasone clinical alert for 3-day pre-medication schedule.' }
        ]
    },

    // Regorafenib — oral targeted
    'Regorafenib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    // Sorafenib — oral targeted (shared: osteosarcoma + chordoma)
    'Sorafenib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    // Cabozantinib — oral targeted (shared: osteosarcoma + ewings)
    'Cabozantinib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    // HD-Ifosfamide (shared: osteosarcoma + ewings relapsed/refractory)
    'HD-Ifosfamide': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            { name: 'Ifosfamide (HD)', sequence: 1, solvent: 'NS', volume: '500mL', duration: '1–3 hours', note: 'D1–D5 each cycle. Total 15 g/m² per cycle. Ensure aggressive hydration and Mesna uroprotection.' },
            { name: 'Mesna',           sequence: 2, solvent: 'NS', volume: '250mL', duration: '15–30 min', note: 'Equal to ifosfamide dose. Boluses at 0h, 4h, 8h or continuous infusion alongside ifosfamide.' }
        ]
    },

    // ICE — Ifosfamide + Carboplatin + Etoposide (shared: osteosarcoma + ewings)
    'Ifosfamide-Carboplatin-Etoposide': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            { name: 'Ifosfamide',  sequence: 1, solvent: 'NS',        volume: '500mL', duration: '1–2 hours',  note: 'Mesna uroprotection required — total Mesna dose equal to ifosfamide dose, given as boluses at 0h, 4h, 8h relative to each ifosfamide dose (or as continuous infusion). Ensure adequate IV hydration throughout.' },
            { name: 'Mesna',       sequence: 2, solvent: 'NS',        volume: '250mL', duration: '15–30 min',  note: 'Equal to ifosfamide dose. Boluses at 0h, 4h, 8h or continuous infusion.' },
            { name: 'Carboplatin', sequence: 3, solvent: 'NS or D5W', volume: '250mL', duration: '30–60 min',  note: 'Calvert formula: dose (mg) = AUC × (CrCl + 25). Do not use aluminium-containing needles or IV sets.' },
            { name: 'Etoposide',   sequence: 4, solvent: 'NS',        volume: '250mL', duration: '60 min',     note: 'Minimum infusion time 30–60 min; never administer as IV bolus (severe hypotension risk). Maximum concentration 0.4 mg/mL.' }
        ]
    },

    // HDMTX + Etoposide + Ifosfamide — osteosarcoma relapsed/refractory
    'HDMTX-Etoposide-Ifosfamide': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            { name: 'Methotrexate (HD)', sequence: 1, solvent: 'NS', volume: '1000mL', duration: '4 hours',   note: 'D1. Alkalinise urine to pH ≥7 before infusion. Monitor serum MTX at 24h, 48h, 72h.' },
            { name: 'Leucovorin',        sequence: 2, solvent: 'NS', volume: '100mL',  duration: '15 min',    note: 'Start 24h after MTX. Repeat every 6 hours until serum MTX <0.1 µmol/L.' },
            { name: 'Etoposide',         sequence: 3, solvent: 'NS', volume: '250mL',  duration: '60 min',    note: 'Minimum infusion time 30–60 min; never administer as IV bolus (severe hypotension risk). Maximum concentration 0.4 mg/mL.' },
            { name: 'Ifosfamide',        sequence: 4, solvent: 'NS', volume: '500mL',  duration: '1–2 hours', note: 'Mesna uroprotection required — total Mesna dose equal to ifosfamide dose, given as boluses at 0h, 4h, 8h relative to each ifosfamide dose (or as continuous infusion). Ensure adequate IV hydration throughout.' },
            { name: 'Mesna',             sequence: 5, solvent: 'NS', volume: '250mL',  duration: '15–30 min', note: 'Equal to ifosfamide dose. Boluses at 0h, 4h, 8h or continuous infusion.' }
        ]
    },

    // ===================== CHORDOMA =====================

    // Imatinib — oral targeted
    'Imatinib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    // Dasatinib — oral targeted (shared: chordoma + chondrosarcoma)
    'Dasatinib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    // Sunitinib — oral targeted
    'Sunitinib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    // Imatinib + Cisplatin (chordoma): oral imatinib + IV cisplatin
    'Imatinib-Cisplatin': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            { name: 'Cisplatin', sequence: 1, solvent: 'NS', volume: '500mL', duration: '2–4 hours' }
        ]
    },

    // Imatinib + Sirolimus — both oral
    'Imatinib-Sirolimus': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    // Erlotinib — oral targeted
    'Erlotinib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    // Lapatinib — oral targeted
    'Lapatinib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    // ===================== EWING'S SARCOMA =====================

    // VDC-IE: alternating VDC and IE cycles (multi-phase)
    'VDC-IE': {
        phases: [
            {
                label: 'Phase 1: VDC (Vincristine + Doxorubicin + Cyclophosphamide)',
                emetogenicity: 'high',
                infusionDrugs: [
                    { name: 'Vincristine',                sequence: 1, solvent: 'NS', volume: '50mL',          duration: '15–30 min',  note: 'VESICANT — confirm patent IV access or central line before administration. NEVER administer intrathecally (fatal). Cap dose at 2mg.' },
                    { name: 'Doxorubicin',                sequence: 2, solvent: 'NS', volume: '100mL / 250mL', duration: '15–30 min',  note: 'VESICANT — confirm patent IV access or central line. Flush line with NS before and after. Monitor cumulative lifetime dose (do not exceed 450–550 mg/m²).' },
                    { name: 'Cyclophosphamide',           sequence: 3, solvent: 'NS', volume: '500mL',          duration: '1 hour' },
                    { name: 'Mesna (for cyclophosphamide)', sequence: 4, solvent: 'NS', volume: '250mL',        duration: '15–30 min',  note: 'Equal to cyclophosphamide dose. Boluses at 0h, 4h, 8h.' }
                ]
            },
            {
                label: 'Phase 2: IE (Ifosfamide + Etoposide)',
                emetogenicity: 'high',
                infusionDrugs: [
                    { name: 'Ifosfamide',          sequence: 1, solvent: 'NS', volume: '500mL', duration: '1–2 hours', note: 'Mesna uroprotection required — total Mesna dose equal to ifosfamide dose, given as boluses at 0h, 4h, 8h relative to each ifosfamide dose (or as continuous infusion). Ensure adequate IV hydration throughout.' },
                    { name: 'Mesna (for ifosfamide)', sequence: 2, solvent: 'NS', volume: '250mL', duration: '15–30 min', note: 'Equal to ifosfamide dose. Boluses at 0h, 4h, 8h or continuous infusion.' },
                    { name: 'Etoposide',           sequence: 3, solvent: 'NS', volume: '250mL', duration: '60 min',    note: 'Minimum infusion time 30–60 min; never administer as IV bolus (severe hypotension risk). Maximum concentration 0.4 mg/mL.' }
                ]
            }
        ]
    },

    // VAC (Vincristine + Dactinomycin + Cyclophosphamide)
    'VAC': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            { name: 'Vincristine',  sequence: 1, solvent: 'NS', volume: '50mL',  duration: '15–30 min', note: 'VESICANT — confirm patent IV access or central line before administration. NEVER administer intrathecally (fatal). Cap dose at 2mg.' },
            { name: 'Dactinomycin', sequence: 2, solvent: 'NS', volume: '50mL',  duration: '15–30 min', note: 'Vesicant — avoid extravasation. Handle with cytotoxic precautions.' },
            { name: 'Cyclophosphamide', sequence: 3, solvent: 'NS', volume: '500mL', duration: '1 hour' },
            { name: 'Mesna',        sequence: 4, solvent: 'NS', volume: '250mL', duration: '15–30 min', note: 'Equal to cyclophosphamide dose. Boluses at 0h, 4h, 8h.' }
        ]
    },

    // IE standalone (ewings neoadjuvant/adjuvant)
    'IE': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            { name: 'Ifosfamide', sequence: 1, solvent: 'NS', volume: '500mL', duration: '1–2 hours', note: 'Mesna uroprotection required — total Mesna dose equal to ifosfamide dose, given as boluses at 0h, 4h, 8h relative to each ifosfamide dose (or as continuous infusion). Ensure adequate IV hydration throughout.' },
            { name: 'Mesna',      sequence: 2, solvent: 'NS', volume: '250mL', duration: '15–30 min', note: 'Equal to ifosfamide dose. Boluses at 0h, 4h, 8h or continuous infusion.' },
            { name: 'Etoposide',  sequence: 3, solvent: 'NS', volume: '250mL', duration: '60 min',    note: 'Minimum infusion time 30–60 min; never administer as IV bolus (severe hypotension risk). Maximum concentration 0.4 mg/mL.' }
        ]
    },

    // VIDE (Vincristine + Ifosfamide + Doxorubicin + Etoposide)
    'VIDE': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            { name: 'Vincristine',  sequence: 1, solvent: 'NS', volume: '50mL',          duration: '15–30 min', note: 'VESICANT — confirm patent IV access or central line before administration. NEVER administer intrathecally (fatal). Cap dose at 2mg.' },
            { name: 'Ifosfamide',   sequence: 2, solvent: 'NS', volume: '500mL',          duration: '1–2 hours', note: 'Mesna uroprotection required — total Mesna dose equal to ifosfamide dose, given as boluses at 0h, 4h, 8h relative to each ifosfamide dose (or as continuous infusion). Ensure adequate IV hydration throughout.' },
            { name: 'Mesna',        sequence: 3, solvent: 'NS', volume: '250mL',          duration: '15–30 min', note: 'Equal to ifosfamide dose. Boluses at 0h, 4h, 8h or continuous infusion.' },
            { name: 'Doxorubicin',  sequence: 4, solvent: 'NS', volume: '100mL / 250mL', duration: '15–30 min', note: 'VESICANT — confirm patent IV access or central line. Flush line with NS before and after. Monitor cumulative lifetime dose (do not exceed 450–550 mg/m²).' },
            { name: 'Etoposide',    sequence: 5, solvent: 'NS', volume: '250mL',          duration: '60 min',    note: 'Minimum infusion time 30–60 min; never administer as IV bolus (severe hypotension risk). Maximum concentration 0.4 mg/mL.' }
        ]
    },

    // VAIA (Vincristine + Doxorubicin + Ifosfamide + Dactinomycin)
    'VAIA': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            { name: 'Vincristine',  sequence: 1, solvent: 'NS', volume: '50mL',          duration: '15–30 min', note: 'VESICANT — confirm patent IV access or central line before administration. NEVER administer intrathecally (fatal). Cap dose at 2mg.' },
            { name: 'Doxorubicin',  sequence: 2, solvent: 'NS', volume: '100mL / 250mL', duration: '15–30 min', note: 'VESICANT — confirm patent IV access or central line. Flush line with NS before and after. Monitor cumulative lifetime dose (do not exceed 450–550 mg/m²).' },
            { name: 'Ifosfamide',   sequence: 3, solvent: 'NS', volume: '500mL',          duration: '1–2 hours', note: 'Mesna uroprotection required — total Mesna dose equal to ifosfamide dose, given as boluses at 0h, 4h, 8h relative to each ifosfamide dose (or as continuous infusion). Ensure adequate IV hydration throughout.' },
            { name: 'Mesna',        sequence: 4, solvent: 'NS', volume: '250mL',          duration: '15–30 min', note: 'Equal to ifosfamide dose. Boluses at 0h, 4h, 8h or continuous infusion.' },
            { name: 'Dactinomycin', sequence: 5, solvent: 'NS', volume: '50mL',           duration: '15–30 min', note: 'Vesicant — avoid extravasation.' }
        ]
    },

    // VDC standalone (ewings metastatic)
    'VDC': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            { name: 'Vincristine',    sequence: 1, solvent: 'NS', volume: '50mL',          duration: '15–30 min', note: 'VESICANT — confirm patent IV access or central line before administration. NEVER administer intrathecally (fatal). Cap dose at 2mg.' },
            { name: 'Doxorubicin',    sequence: 2, solvent: 'NS', volume: '100mL / 250mL', duration: '15–30 min', note: 'VESICANT — confirm patent IV access or central line. Flush line with NS before and after. Monitor cumulative lifetime dose (do not exceed 450–550 mg/m²).' },
            { name: 'Cyclophosphamide', sequence: 3, solvent: 'NS', volume: '500mL',        duration: '1 hour' },
            { name: 'Mesna',          sequence: 4, solvent: 'NS', volume: '250mL',          duration: '15–30 min', note: 'Equal to cyclophosphamide dose. Boluses at 0h, 4h, 8h.' }
        ]
    },

    // Cyclophosphamide + Topotecan (ewings relapsed/refractory)
    'Cyclophosphamide-Topotecan': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Topotecan',       sequence: 1, solvent: 'NS', volume: '100mL', duration: '30 min',    note: 'D1–D5 each cycle.' },
            { name: 'Cyclophosphamide', sequence: 2, solvent: 'NS', volume: '250mL', duration: '30–60 min', note: 'Low dose (250 mg/m²) — Mesna uroprotection not routinely required at this dose level.' }
        ]
    },

    // Irinotecan + Temozolomide (ewings relapsed/refractory)
    'Irinotecan-Temozolomide': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Irinotecan', sequence: 1, solvent: 'NS', volume: '250mL', duration: '90 min', note: 'Pre-medicate with atropine 0.25–0.5mg SC/IV if acute cholinergic syndrome occurs (early diarrhoea, diaphoresis, abdominal cramps). Loperamide 4mg at first sign of delayed diarrhoea, then 2mg every 2h until diarrhoea-free for 12h.' }
        ]
    },

    // VIT — Irinotecan + Temozolomide + Vincristine
    'Irinotecan-Temozolomide-Vincristine': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Vincristine', sequence: 1, solvent: 'NS', volume: '50mL',  duration: '15–30 min', note: 'VESICANT — confirm patent IV access or central line before administration. NEVER administer intrathecally (fatal). Cap dose at 2mg.' },
            { name: 'Irinotecan',  sequence: 2, solvent: 'NS', volume: '250mL', duration: '90 min',    note: 'Pre-medicate with atropine 0.25–0.5mg SC/IV if acute cholinergic syndrome occurs (early diarrhoea, diaphoresis, abdominal cramps). Loperamide 4mg at first sign of delayed diarrhoea, then 2mg every 2h until diarrhoea-free for 12h.' }
        ]
    },

    // Docetaxel + Gemcitabine — ewings relapsed/refractory (different key from osteosarcoma)
    'Docetaxel-Gemcitabine': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Gemcitabine', sequence: 1, solvent: 'NS', volume: '250mL', duration: '30 min',  note: 'Infuse over exactly 30 min. Prolonged infusion (>30 min) increases toxicity without improving efficacy.' },
            { name: 'Docetaxel',   sequence: 2, solvent: 'NS', volume: '250mL', duration: '1 hour',  note: 'See Mandatory Dexamethasone clinical alert for 3-day pre-medication schedule.' }
        ]
    },

    // Lurbinectedin (ewings relapsed/refractory)
    'Lurbinectedin': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Lurbinectedin', sequence: 1, solvent: 'NS or D5W', volume: '500mL', duration: '60 min', note: 'D1 every 21 days.' }
        ]
    },

    // ===================== CHONDROSARCOMA =====================

    // Ivosidenib — oral targeted (IDH1 inhibitor)
    'Ivosidenib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    // Pazopanib — oral targeted
    'Pazopanib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    // Doxorubicin monotherapy (chondrosarcoma dedifferentiated/mesenchymal)
    'Doxorubicin': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            { name: 'Doxorubicin', sequence: 1, solvent: 'NS', volume: '100mL / 250mL', duration: '15–30 min', note: 'VESICANT — confirm patent IV access or central line. Flush line with NS before and after. Monitor cumulative lifetime dose (do not exceed 450–550 mg/m²).' }
        ]
    },

    // Doxorubicin + Ifosfamide (AI — chondrosarcoma)
    'Doxorubicin-Ifosfamide': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            { name: 'Doxorubicin', sequence: 1, solvent: 'NS', volume: '100mL / 250mL', duration: '15–30 min', note: 'VESICANT — confirm patent IV access or central line. Flush line with NS before and after. Monitor cumulative lifetime dose (do not exceed 450–550 mg/m²).' },
            { name: 'Ifosfamide',  sequence: 2, solvent: 'NS', volume: '500mL',          duration: '1–2 hours', note: 'Mesna uroprotection required — total Mesna dose equal to ifosfamide dose, given as boluses at 0h, 4h, 8h relative to each ifosfamide dose (or as continuous infusion). Ensure adequate IV hydration throughout.' },
            { name: 'Mesna',       sequence: 3, solvent: 'NS', volume: '250mL',          duration: '15–30 min', note: 'Equal to ifosfamide dose. Boluses at 0h, 4h, 8h or continuous infusion.' }
        ]
    },

    // ===================== GIANT CELL TUMOUR =====================

    // Denosumab — subcutaneous (no IV infusion required)
    'Denosumab': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    // Interferon Alfa-2a — subcutaneous
    'Interferon-Alfa-2a': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    // Peginterferon Alfa-2a — subcutaneous
    'Peginterferon-Alfa-2a': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    }
};
