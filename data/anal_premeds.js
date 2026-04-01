window.premedData = window.premedData || {};
window.premedData.anal = {

    // ── DEFINITIVE (CRT) ─────────────────────────────────────────────────────

    '5FU-MMC-RT-RTOG': {
        label: null,
        emetogenicity: 'moderate',
        infusionDrugs: [
            {
                name: 'Mitomycin-C',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '40–100mL',
                duration: '15–20 min',
                note: 'Vesicant — confirm secure IV access before administration. Administer as slow IV infusion; avoid extravasation.'
            },
            {
                name: '5-Fluorouracil',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: '96 hrs CI (D1–D4)',
                note: 'Continuous infusion via elastomeric pump or CADD pump. Prepare total 4-day dose in a single bag.'
            }
        ]
    },

    '5FU-Cisplatin-RT': {
        label: null,
        emetogenicity: 'high',
        infusionDrugs: [
            {
                name: 'Cisplatin',
                sequence: 1,
                solvent: 'NS',
                volume: '500mL',
                duration: '60–90 min',
            },
            {
                name: '5-Fluorouracil',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: '96 hrs CI (D1–D4)',
                note: 'Continuous infusion via elastomeric pump or CADD pump.'
            }
        ]
    },

    'Capecitabine-MMC-RT': {
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
            }
            // Capecitabine is oral — appears in Oral Chemotherapy section
        ]
    },

    // ── METASTATIC ────────────────────────────────────────────────────────────

    'Carboplatin-Paclitaxel': {
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

    '5FU-Cisplatin': {
        label: null,
        emetogenicity: 'high',
        infusionDrugs: [
            {
                name: 'Cisplatin',
                sequence: 1,
                solvent: 'NS',
                volume: '500mL',
                duration: '60–90 min',
            },
            {
                name: '5-Fluorouracil',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: '96 hrs CI (D1–D4)',
                note: 'Continuous infusion via elastomeric pump or CADD pump.'
            }
        ]
    },

    'mFOLFOX6': {
        label: null,
        emetogenicity: 'moderate',
        infusionDrugs: [
            {
                name: 'Oxaliplatin',
                sequence: 1,
                solvent: 'D5W',
                volume: '250mL',
                duration: '2 hrs',
                note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.'
            },
            {
                name: 'Leucovorin',
                sequence: 2,
                solvent: 'NS or D5W',
                volume: '250mL',
                duration: '2 hrs',
                note: 'Run concurrently with Oxaliplatin via Y-site connector.'
            },
            {
                name: '5-Fluorouracil',
                sequence: 3,
                solvent: 'NS',
                volume: '50mL',
                duration: 'IV bolus / 5–10 min'
            },
            {
                name: '5-Fluorouracil (continuous infusion)',
                sequence: 4,
                solvent: 'NS',
                volume: '250mL',
                duration: '46 hrs CI (D1–D2)',
                note: 'Continuous infusion via elastomeric pump or CADD pump.'
            }
        ]
    },

    'FOLCIS': {
        label: null,
        emetogenicity: 'high',
        infusionDrugs: [
            {
                name: 'Cisplatin',
                sequence: 1,
                solvent: 'NS',
                volume: '500mL',
                duration: '60–90 min',
            },
            {
                name: 'Leucovorin',
                sequence: 2,
                solvent: 'NS or D5W',
                volume: '250mL',
                duration: '2 hrs'
            },
            {
                name: '5-Fluorouracil',
                sequence: 3,
                solvent: 'NS',
                volume: '50mL',
                duration: 'IV bolus / 5–10 min'
            },
            {
                name: '5-Fluorouracil (continuous infusion)',
                sequence: 4,
                solvent: 'NS',
                volume: '250mL',
                duration: '46 hrs CI (D1–D2)',
                note: 'Continuous infusion via elastomeric pump or CADD pump.'
            }
        ]
    },

    'Modified-DCF': {
        label: null,
        emetogenicity: 'high',
        infusionDrugs: [
            {
                name: 'Docetaxel',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '60 min'
            },
            {
                name: 'Cisplatin',
                sequence: 2,
                solvent: 'NS',
                volume: '500mL',
                duration: '60–90 min',
            },
            {
                name: '5-Fluorouracil',
                sequence: 3,
                solvent: 'NS',
                volume: '250mL',
                duration: '46 hrs CI (D1–D2)',
                note: 'Continuous infusion via elastomeric pump or CADD pump.'
            }
        ]
    },

    'Carboplatin-Paclitaxel-Retifanlimab': {
        label: null,
        emetogenicity: 'moderate',
        infusionDrugs: [
            {
                name: 'Retifanlimab-dlwr',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '100mL',
                duration: '30 min'
            },
            {
                name: 'Paclitaxel',
                sequence: 2,
                solvent: 'NS or D5W',
                volume: '250mL',
                duration: '60 min',
                note: 'Pre-medicate: dexamethasone, H1 antihistamine, H2 blocker.'
            },
            {
                name: 'Carboplatin',
                sequence: 3,
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

    'Cemiplimab-Monotherapy': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Cemiplimab',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '250mL',
                duration: '30 min'
            }
        ]
    },

    'Single-Toripalimab': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Toripalimab',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                duration: '60 min'
            }
        ]
    },

    'Single-Tislelizumab': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Tislelizumab',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '100mL',
                duration: '30–60 min'
            }
        ]
    },

    'Dostarlimab-Monotherapy': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Dostarlimab',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '250mL',
                duration: '30 min'
            }
        ]
    },

    'Retifanlimab-Monotherapy': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Retifanlimab-dlwr',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '100mL',
                duration: '30 min'
            }
        ]
    }
};
