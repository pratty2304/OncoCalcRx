window.premedData = window.premedData || {};
window.premedData.bladder = {

    // ── NEOADJUVANT ───────────────────────────────────────────────────────────

    'ddMVAC': {
        label: null,
        emetogenicity: 'high',
        infusionDrugs: [
            {
                name: 'Methotrexate',
                sequence: 1,
                solvent: 'NS',
                volume: '50mL',
                duration: '15–20 min',
                note: 'G-CSF support required (pegfilgrastim D3 or filgrastim D3–D10). Confirm adequate renal function before each cycle.'
            },
            {
                name: 'Vinblastine',
                sequence: 2,
                solvent: 'NS',
                volume: '50mL',
                duration: '15–20 min',
                note: 'Vesicant — confirm secure IV access. Administer as slow IV push or short infusion.'
            },
            {
                name: 'Doxorubicin',
                sequence: 3,
                solvent: 'NS',
                volume: '100mL / 250mL',
                duration: '15–30 min',
                note: 'VESICANT — confirm patent IV access or central line. Flush line with NS before and after. Monitor cumulative lifetime dose (do not exceed 450–550 mg/m²).'
            },
            {
                name: 'Cisplatin',
                sequence: 4,
                solvent: 'NS',
                volume: '500mL',
                duration: '60–90 min',
            }
        ]
    },

    'GC-Neoadjuvant': {
        label: null,
        emetogenicity: 'high',
        infusionDrugs: [
            {
                name: 'Gemcitabine',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '30 min',
                note: 'Infuse over exactly 30 min. Prolonged infusion (>30 min) increases toxicity without improving efficacy.'
            },
            {
                name: 'Cisplatin',
                sequence: 2,
                solvent: 'NS',
                volume: '500mL',
                duration: '60–90 min',
            }
        ]
    },

    // ── ADJUVANT ──────────────────────────────────────────────────────────────

    'GC-Adjuvant': {
        label: null,
        emetogenicity: 'high',
        infusionDrugs: [
            {
                name: 'Gemcitabine',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '30 min',
                note: 'Infuse over exactly 30 min. Prolonged infusion (>30 min) increases toxicity without improving efficacy.'
            },
            {
                name: 'Cisplatin',
                sequence: 2,
                solvent: 'NS',
                volume: '500mL',
                duration: '60–90 min',
            }
        ]
    },

    'Nivolumab-Adjuvant': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Nivolumab',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '100mL',
                duration: '30 min'
            }
        ]
    },

    'Pembrolizumab-Adjuvant': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Pembrolizumab',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '100mL',
                duration: '30 min'
            }
        ]
    },

    'Durvalumab-Adjuvant': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Durvalumab',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '250mL',
                duration: '60 min'
            }
        ]
    },

    // ── PERIOPERATIVE ─────────────────────────────────────────────────────────

    'GC-Durvalumab-Perioperative': {
        label: null,
        emetogenicity: 'high',
        infusionDrugs: [
            {
                name: 'Durvalumab',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '250mL',
                duration: '60 min'
            },
            {
                name: 'Gemcitabine',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: '30 min',
                note: 'Infuse over exactly 30 min. Prolonged infusion (>30 min) increases toxicity without improving efficacy.'
            },
            {
                name: 'Cisplatin',
                sequence: 3,
                solvent: 'NS',
                volume: '500mL',
                duration: '60–90 min',
            }
        ]
    },

    'EV-Pembrolizumab-Perioperative': {
        label: null,
        emetogenicity: 'moderate',
        infusionDrugs: [
            {
                name: 'Enfortumab Vedotin',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                duration: '30 min',
                note: 'Use a 0.2–5 micron in-line filter. Do not shake. NS only — incompatible with D5W.'
            },
            {
                name: 'Pembrolizumab',
                sequence: 2,
                solvent: 'NS or D5W',
                volume: '100mL',
                duration: '30 min'
            }
        ]
    },

    // ── DEFINITIVE (CHEMORADIATION) ───────────────────────────────────────────

    '5FU-MMC-RT': {
        label: null,
        emetogenicity: 'moderate',
        infusionDrugs: [
            {
                name: 'Mitomycin-C',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '40–100mL',
                duration: '15–20 min',
                note: 'Vesicant — confirm secure IV access before administration.'
            },
            {
                name: '5-Fluorouracil',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: 'CI D1–D5 and D16–D20 during RT',
                note: 'Continuous infusion via elastomeric pump or CADD pump during RT.'
            }
        ]
    },

    'Cisplatin-RT': {
        label: null,
        emetogenicity: 'moderate',
        infusionDrugs: [
            {
                name: 'Cisplatin',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '60–90 min',
            }
        ]
    },

    'Cisplatin-5FU-RT': {
        label: null,
        emetogenicity: 'moderate',
        infusionDrugs: [
            {
                name: 'Cisplatin',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '60–90 min',
            },
            {
                name: '5-Fluorouracil',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: 'CI D1–D5 of each RT course',
                note: 'Continuous infusion via elastomeric pump or CADD pump.'
            }
        ]
    },

    'Cisplatin-Paclitaxel-RT': {
        label: null,
        emetogenicity: 'moderate',
        infusionDrugs: [
            {
                name: 'Paclitaxel',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '500mL',
                duration: '60 min'
            },
            {
                name: 'Cisplatin',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: '60–90 min',
            }
        ]
    },

    'Gemcitabine-RT': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Gemcitabine',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                duration: '30 min',
                note: 'Infuse over exactly 30 min. Prolonged infusion (>30 min) increases toxicity without improving efficacy.'
            }
        ]
    },

    // ── METASTATIC ────────────────────────────────────────────────────────────

    'Enfortumab-Vedotin-Pembrolizumab': {
        label: null,
        emetogenicity: 'moderate',
        infusionDrugs: [
            {
                name: 'Enfortumab Vedotin',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                duration: '30 min',
                note: 'Use a 0.2–5 micron in-line filter. Do not shake. NS only — incompatible with D5W.'
            },
            {
                name: 'Pembrolizumab',
                sequence: 2,
                solvent: 'NS or D5W',
                volume: '100mL',
                duration: '30 min'
            }
        ]
    },

    'Gemcitabine-Cisplatin-Nivolumab': {
        label: null,
        emetogenicity: 'high',
        infusionDrugs: [
            {
                name: 'Nivolumab',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '100mL',
                duration: '30 min'
            },
            {
                name: 'Gemcitabine',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: '30 min',
                note: 'Infuse over exactly 30 min. Prolonged infusion (>30 min) increases toxicity without improving efficacy.'
            },
            {
                name: 'Cisplatin',
                sequence: 3,
                solvent: 'NS',
                volume: '500mL',
                duration: '60–90 min',
            }
        ]
    },

    'GC-Metastatic': {
        label: null,
        emetogenicity: 'high',
        infusionDrugs: [
            {
                name: 'Gemcitabine',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '30 min',
                note: 'Infuse over exactly 30 min. Prolonged infusion (>30 min) increases toxicity without improving efficacy.'
            },
            {
                name: 'Cisplatin',
                sequence: 2,
                solvent: 'NS',
                volume: '500mL',
                duration: '60–90 min',
            }
        ]
    },

    'Avelumab-Maintenance': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Avelumab',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '60 min',
                note: 'Pre-medicate with antihistamine and paracetamol before the first 4 infusions (mandatory per label). Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions. Counsel patient on irAEs.'
            }
        ]
    },

    'GCa-Cisplatin-Ineligible': {
        label: null,
        emetogenicity: 'moderate',
        infusionDrugs: [
            {
                name: 'Gemcitabine',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '30 min',
                note: 'Infuse over exactly 30 min. Prolonged infusion (>30 min) increases toxicity without improving efficacy.'
            },
            {
                name: 'Carboplatin',
                sequence: 2,
                solvent: 'D5W',
                volume: '250mL',
                duration: '30–60 min'
            }
        ]
    },

    'PC-Cisplatin-Ineligible': {
        label: null,
        emetogenicity: 'moderate',
        infusionDrugs: [
            {
                name: 'Paclitaxel',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '500mL',
                duration: '3 hrs'
            },
            {
                name: 'Carboplatin',
                sequence: 2,
                solvent: 'D5W',
                volume: '250mL',
                duration: '30–60 min'
            }
        ]
    },

    'Pembrolizumab-Monotherapy': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Pembrolizumab',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '100mL',
                duration: '30 min'
            }
        ]
    },

    'Atezolizumab-Monotherapy': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Atezolizumab',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '60 min (cycle 1) / 30 min (subsequent)',
                durationLoading: '60 min',
                durationMaintenance: '30 min',
                note: 'First infusion: 60 min; if tolerated, second: 30 min; subsequent: 15 min. Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions. Counsel patient on irAEs before starting therapy.'
            }
        ]
    },

    'Enfortumab-Vedotin-Mono': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Enfortumab Vedotin',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                duration: '30 min',
                note: 'Use a 0.2–5 micron in-line filter. Do not shake. NS only — incompatible with D5W.'
            }
        ]
    },

    'Erdafitinib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
        // Erdafitinib is oral — appears in Oral Chemotherapy section
    },

    'Trastuzumab-Deruxtecan': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Trastuzumab deruxtecan',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                duration: '90 min (cycle 1) / 30 min (subsequent)',
                durationLoading: '90 min',
                durationMaintenance: '30 min',
                note: 'NS only — do NOT use D5W. First infusion over 90 min; if tolerated, reduce to 30 min. Monitor for infusion reactions and ILD.'
            }
        ]
    },

    'Nivolumab-Monotherapy': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Nivolumab',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '100mL',
                duration: '30 min'
            }
        ]
    },

    'Docetaxel-Monotherapy': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Docetaxel',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '250mL',
                duration: '60 min'
            }
        ]
    },

    'Single-Gemcitabine': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Gemcitabine',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '30 min',
                note: 'Infuse over exactly 30 min. Prolonged infusion (>30 min) increases toxicity without improving efficacy.'
            }
        ]
    },

    'Single-Paclitaxel': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Paclitaxel',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '500mL',
                duration: '3 hrs'
            }
        ]
    },

    'GP': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Paclitaxel',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '500mL',
                duration: '3 hrs'
            },
            {
                name: 'Gemcitabine',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: '30 min',
                note: 'Infuse over exactly 30 min. Prolonged infusion (>30 min) increases toxicity without improving efficacy.'
            }
        ]
    },

    'Ifosfamide-Doxorubicin-Gemcitabine': {
        label: null,
        emetogenicity: 'high',
        infusionDrugs: [
            {
                name: 'Mesna (pre-dose)',
                sequence: 1,
                solvent: 'NS',
                volume: '50mL',
                duration: '15 min',
                note: 'Administer immediately before Ifosfamide.'
            },
            {
                name: 'Ifosfamide',
                sequence: 2,
                solvent: 'NS',
                volume: '500mL',
                duration: '60–120 min',
                note: 'Mesna uroprotection required — total Mesna dose equal to ifosfamide dose, given as boluses at 0h, 4h, 8h relative to each ifosfamide dose (or as continuous infusion). Ensure adequate IV hydration throughout.'
            },
            {
                name: 'Mesna (4h post)',
                sequence: 3,
                solvent: 'NS',
                volume: '50mL',
                duration: '15 min',
                note: '4 hours after start of Ifosfamide.'
            },
            {
                name: 'Mesna (8h post)',
                sequence: 4,
                solvent: 'NS',
                volume: '50mL',
                duration: '15 min',
                note: '8 hours after start of Ifosfamide.'
            },
            {
                name: 'Doxorubicin',
                sequence: 5,
                solvent: 'NS',
                volume: '100mL / 250mL',
                duration: '15–30 min',
                note: 'VESICANT — confirm patent IV access or central line. Flush line with NS before and after. Monitor cumulative lifetime dose (do not exceed 450–550 mg/m²).'
            },
            {
                name: 'Gemcitabine',
                sequence: 6,
                solvent: 'NS',
                volume: '250mL',
                duration: '30 min',
                note: 'Infuse over exactly 30 min. Prolonged infusion (>30 min) increases toxicity without improving efficacy.'
            }
        ]
    }
};
