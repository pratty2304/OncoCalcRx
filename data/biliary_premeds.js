window.premedData = window.premedData || {};
window.premedData.biliary = {

    // ── ADJUVANT ──────────────────────────────────────────────────────────────

    'Single-S1-Adjuvant': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
        // S-1 is oral — appears in Oral Chemotherapy section
    },

    'Single-Capecitabine': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
        // Capecitabine is oral — appears in Oral Chemotherapy section
    },

    'Gemcitabine-Cisplatin': {
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
                name: 'Cisplatin',
                sequence: 2,
                solvent: 'NS',
                volume: '500mL',
                duration: '60–90 min',
            }
        ]
    },

    'Capecitabine-RT': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
        // Capecitabine is oral — appears in Oral Chemotherapy section
    },

    '5FU-RT-Adjuvant': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: '5-Fluorouracil (continuous infusion)',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: 'Daily CI during RT',
                note: 'Continuous infusion via elastomeric pump or CADD pump. Prepare daily dose bag.'
            }
        ]
    },

    'Single-5FU-Adjuvant': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: '5-Fluorouracil',
                sequence: 1,
                solvent: 'NS',
                volume: '50mL',
                duration: 'IV bolus / 5–10 min'
            }
        ]
    },

    'GemCap-then-CapRT-Adjuvant': {
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
            }
            // Capecitabine (chemo phase) and Capecitabine (concurrent RT phase) are oral — in Oral Chemo section
        ]
    },

    // ── METASTATIC ────────────────────────────────────────────────────────────

    'Gemcitabine-Cisplatin-Durvalumab': {
        label: null,
        emetogenicity: 'moderate',
        infusionDrugs: [
            {
                name: 'Durvalumab',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '250mL',
                duration: '60 min',
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

    'GEMOX': {
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
                name: 'Oxaliplatin',
                sequence: 2,
                solvent: 'D5W',
                volume: '250mL',
                duration: '2 hrs',
                note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.'
            }
        ]
    },

    'Capecitabine-Cisplatin': {
        label: null,
        emetogenicity: 'high',
        infusionDrugs: [
            {
                name: 'Cisplatin',
                sequence: 1,
                solvent: 'NS',
                volume: '500mL',
                duration: '60–90 min',
            }
            // Capecitabine is oral — appears in Oral Chemotherapy section
        ]
    },

    'Gemcitabine-Capecitabine': {
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
            }
            // Capecitabine is oral — appears in Oral Chemotherapy section
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
                name: '5-Fluorouracil (continuous infusion)',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: '96 hrs CI (D1–D4)',
                note: 'Continuous infusion via elastomeric pump or CADD pump.'
            }
        ]
    },

    'CapeOX': {
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
            }
            // Capecitabine is oral — appears in Oral Chemotherapy section
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

    'Gemcitabine-Nabpaclitaxel': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Nab-paclitaxel',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                duration: '30 min',
                note: 'Albumin-bound formulation — no special tubing or in-line filter required. Do not use an in-line filter. Do not substitute for solvent-based paclitaxel on a mg-for-mg basis.'
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

    'Gemcitabine-Cisplatin-Nabpaclitaxel': {
        label: null,
        emetogenicity: 'moderate',
        infusionDrugs: [
            {
                name: 'Nab-paclitaxel',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                duration: '30 min',
                note: 'Albumin-bound formulation — no special tubing or in-line filter required. Do not use an in-line filter. Do not substitute for solvent-based paclitaxel on a mg-for-mg basis.'
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

    'Gemcitabine-Cisplatin-Pembrolizumab': {
        label: null,
        emetogenicity: 'moderate',
        infusionDrugs: [
            {
                name: 'Pembrolizumab',
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

    'Dabrafenib-Trametinib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
        // Both Dabrafenib and Trametinib are oral — appear in Oral Chemotherapy section
    },

    'Ivosidenib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    'Pemigatinib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    'Futibatinib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
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

    'Nivolumab-Ipilimumab': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Nivolumab',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '100mL',
                duration: '30 min'
            },
            {
                name: 'Ipilimumab',
                sequence: 2,
                solvent: 'NS or D5W',
                volume: '50mL',
                duration: '30 min',
                note: 'For 1mg/kg combination dosing: dilute in 50mL to maintain concentration 1–4mg/mL per PI. Do not co-infuse with Nivolumab through the same line.'
            }
        ]
    },

    'Zanidatamab': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Zanidatamab',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '250mL',
                duration: '180 min (cycle 1) / 60 min (subsequent)',
                note: 'Reduce infusion rate or interrupt for infusion reactions. First infusion over 3 hours; if tolerated, subsequent infusions over 60 min.'
            }
        ]
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
                note: 'First infusion over 90 min; if tolerated, reduce to 30 min for subsequent cycles. Monitor for infusion reactions and pulmonary toxicity.'
            }
        ]
    },

    'Trastuzumab-Pertuzumab': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Pertuzumab',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '60 min (cycle 1) / 30 min (subsequent)',
                durationLoading: '60 min',
                durationMaintenance: '30 min',
                note: 'First infusion: 60 min; subsequent infusions: 30 min if tolerated. Monitor for infusion-related reactions. Administer through a 0.2 micron in-line filter.'
            },
            {
                name: 'Trastuzumab',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: '90 min (cycle 1) / 30 min (subsequent)',
                durationLoading: '90 min',
                durationMaintenance: '30 min',
                note: 'Loading dose (8 mg/kg) over 90 min; if tolerated, maintenance doses (6 mg/kg) over 30 min. Monitor for infusion-related reactions. Administer through a 0.2 micron in-line filter.'
            }
        ]
    },

    'Tucatinib-Trastuzumab': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Trastuzumab',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '90 min (cycle 1) / 30 min (subsequent)',
                durationLoading: '90 min',
                durationMaintenance: '30 min',
                note: 'Loading dose (8 mg/kg) over 90 min; if tolerated, maintenance doses (6 mg/kg) over 30 min. Monitor for infusion-related reactions. Administer through a 0.2 micron in-line filter.'
            }
            // Tucatinib is oral — appears in Oral Chemotherapy section
        ]
    },

    'Entrectinib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    'Larotrectinib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    'Selpercatinib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    'Adagrasib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    }
};
