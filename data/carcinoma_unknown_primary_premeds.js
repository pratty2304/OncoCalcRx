window.premedData = window.premedData || {};
window.premedData.carcinoma_unknown_primary = {

    // Carboplatin + Paclitaxel (3-weekly)
    'Carboplatin-Paclitaxel': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Paclitaxel',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '3 hours',
                note: 'Pre-medicate: dexamethasone, H1 antihistamine, H2 blocker.'
            },
            {
                name: 'Carboplatin',
                sequence: 2,
                solvent: 'D5W',
                volume: '250mL',
                duration: '30–60 min',
                note: 'Calvert formula: dose (mg) = AUC × (CrCl + 25). Do not use aluminium-containing needles or IV sets.'
            }
        ]
    },

    // Carboplatin + Paclitaxel (weekly)
    'Carboplatin-Paclitaxel-Weekly': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Paclitaxel',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '1 hour',
                note: 'Pre-medicate: dexamethasone, H1 antihistamine, H2 blocker.'
            },
            {
                name: 'Carboplatin',
                sequence: 2,
                solvent: 'D5W',
                volume: '100mL',
                duration: '30 min',
                note: 'Calvert formula: dose (mg) = AUC × (CrCl + 25). Do not use aluminium-containing needles or IV sets.'
            }
        ]
    },

    // Gemcitabine + Cisplatin
    'Gemcitabine-Cisplatin': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
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

    // Gemcitabine + Carboplatin
    'Gemcitabine-Carboplatin': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
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
                duration: '30–60 min',
                note: 'Calvert formula: dose (mg) = AUC × (CrCl + 25). Do not use aluminium-containing needles or IV sets.'
            }
        ]
    },

    // Docetaxel + Cisplatin
    'Docetaxel-Cisplatin': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Docetaxel',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '1 hour',
                note: 'See Mandatory Dexamethasone clinical alert for 3-day pre-medication schedule.'
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

    // Docetaxel + Carboplatin
    'Docetaxel-Carboplatin': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Docetaxel',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '1 hour',
                note: 'See Mandatory Dexamethasone clinical alert for 3-day pre-medication schedule.'
            },
            {
                name: 'Carboplatin',
                sequence: 2,
                solvent: 'D5W',
                volume: '250mL',
                duration: '30–60 min',
                note: 'Calvert formula: dose (mg) = AUC × (CrCl + 25). Do not use aluminium-containing needles or IV sets.'
            }
        ]
    },

    // Gemcitabine + Irinotecan
    'Gemcitabine-Irinotecan': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
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
                name: 'Irinotecan',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: '90 min',
                note: 'Pre-medicate with atropine 0.25–0.5mg SC/IV if acute cholinergic syndrome occurs (early diarrhoea, diaphoresis, abdominal cramps). Loperamide 4mg at first sign of delayed diarrhoea, then 2mg every 2h until diarrhoea-free for 12h.'
            }
        ]
    },

    // Paclitaxel + Carboplatin + Etoposide (PCE) — etoposide is oral in this regimen
    'Paclitaxel-Carboplatin-Etoposide': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Paclitaxel',
                sequence: 1,
                solvent: 'NS',
                volume: '500mL',
                duration: '3 hours',
                note: 'Pre-medicate: dexamethasone, H1 antihistamine, H2 blocker.'
            },
            {
                name: 'Carboplatin',
                sequence: 2,
                solvent: 'D5W',
                volume: '250mL',
                duration: '30–60 min',
                note: 'Calvert formula: dose (mg) = AUC × (CrCl + 25). Do not use aluminium-containing needles or IV sets.'
            }
        ]
    },

    // Etoposide + Cisplatin (EP)
    'Etoposide-Cisplatin': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Etoposide',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '60 min',
                note: 'Minimum infusion time 30–60 min; never administer as IV bolus (severe hypotension risk). Maximum concentration 0.4 mg/mL.'
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

    // BEP (Bleomycin + Etoposide + Cisplatin)
    'BEP': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Bleomycin',
                sequence: 1,
                solvent: 'NS',
                volume: '50mL',
                duration: '10 min',
                note: 'MANDATORY test dose 1–2 units IM or IV before first cycle — observe 60 min for anaphylaxis. Monitor pulmonary function (DLCO) before each cycle — hold for significant decline or symptomatic pneumonitis. Cumulative dose limit ~300 units lifetime.'
            },
            {
                name: 'Etoposide',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: '60 min',
                note: 'Minimum infusion time 30–60 min; never administer as IV bolus (severe hypotension risk). Maximum concentration 0.4 mg/mL.'
            },
            {
                name: 'Cisplatin',
                sequence: 3,
                solvent: 'NS',
                volume: '500mL',
                duration: '60 min',
            }
        ]
    },

    // CAPOX — capecitabine is oral
    'CapeOX': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Oxaliplatin',
                sequence: 1,
                solvent: 'D5W',
                volume: '250mL',
                duration: '2 hours',
                note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.'
            }
        ]
    },

    // FOLFOX
    'FOLFOX': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Oxaliplatin',
                sequence: 1,
                solvent: 'D5W',
                volume: '250mL',
                duration: '2 hours',
                note: 'Dilute in D5W only — incompatible with NS and chloride-containing solutions. Do not use aluminium-containing equipment. Flush line with D5W before and after. Cold sensitivity counselling: avoid cold food, drinks, and surfaces for 5–7 days after infusion.'
            },
            {
                name: 'Leucovorin',
                sequence: 2,
                solvent: 'D5W',
                volume: '250mL',
                duration: '2 hours',
                note: 'D1. Run simultaneously with Oxaliplatin via Y-site over 2h.'
            },
            {
                name: '5-Fluorouracil (bolus)',
                sequence: 3,
                solvent: 'NS',
                volume: '50mL',
                duration: '2–4 min IV push',
                note: 'D1. Administer as IV bolus after Leucovorin infusion completes.'
            },
            {
                name: '5-Fluorouracil (infusion)',
                sequence: 4,
                solvent: 'D5W',
                volume: '240mL',
                duration: '46h CI',
                note: 'Baxter Infusor LV5 at 5mL/h over 46h. D5W only. Ambulatory pump — patient discharged with pump, returns after 46h for disconnection.'
            }
        ]
    },

    // FOLFIRI
    'FOLFIRI': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Irinotecan',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '90 min',
                note: 'Pre-medicate with atropine 0.25–0.5mg SC/IV if acute cholinergic syndrome occurs (early diarrhoea, diaphoresis, abdominal cramps). Loperamide 4mg at first sign of delayed diarrhoea, then 2mg every 2h until diarrhoea-free for 12h.'
            },
            {
                name: 'Leucovorin',
                sequence: 2,
                solvent: 'D5W',
                volume: '250mL',
                duration: '90 min',
                note: 'D1. Run simultaneously with Irinotecan via Y-site over 90 min.'
            },
            {
                name: '5-Fluorouracil (bolus)',
                sequence: 3,
                solvent: 'NS',
                volume: '50mL',
                duration: '2–4 min IV push',
                note: 'D1. Administer as IV bolus after Leucovorin/Irinotecan infusions complete.'
            },
            {
                name: '5-Fluorouracil (infusion)',
                sequence: 4,
                solvent: 'D5W',
                volume: '240mL',
                duration: '46h CI',
                note: 'Baxter Infusor LV5 at 5mL/h over 46h. D5W only. Ambulatory pump — patient discharged with pump, returns after 46h for disconnection.'
            }
        ]
    },

    // Gemcitabine + Carboplatin + Paclitaxel
    'Gemcitabine-Carboplatin-Paclitaxel': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Paclitaxel',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '3 hours',
                note: 'Pre-medicate: dexamethasone, H1 antihistamine, H2 blocker.'
            },
            {
                name: 'Carboplatin',
                sequence: 2,
                solvent: 'D5W',
                volume: '250mL',
                duration: '30–60 min',
                note: 'Calvert formula: dose (mg) = AUC × (CrCl + 25). Do not use aluminium-containing needles or IV sets.'
            },
            {
                name: 'Gemcitabine',
                sequence: 3,
                solvent: 'NS',
                volume: '250mL',
                duration: '30 min',
                note: 'Infuse over exactly 30 min. Prolonged infusion (>30 min) increases toxicity without improving efficacy.'
            }
        ]
    },

    // Pembrolizumab monotherapy
    'Pembrolizumab': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Pembrolizumab',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                duration: '30 min',
                note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions throughout infusion. Counsel patient on immune-related adverse events (irAEs) before starting therapy.'
            }
        ]
    },

    // Nivolumab monotherapy
    'Nivolumab': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Nivolumab',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                durationLoading: '60 min',
                durationMaintenance: '30 min',
                note: 'First infusion: 60 min; subsequent infusions: 30 min if first tolerated. Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions. Counsel patient on irAEs before starting therapy.'
            }
        ]
    },

    // Docetaxel monotherapy (2nd line)
    'Docetaxel-2L': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Docetaxel',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '1 hour',
                note: 'See Mandatory Dexamethasone clinical alert for 3-day pre-medication schedule.'
            }
        ]
    },

    // Gemcitabine monotherapy (2nd line)
    'Gemcitabine-2L': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
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

    // Paclitaxel monotherapy (2nd line)
    'Paclitaxel-2L': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Paclitaxel',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '3 hours',
                note: 'Pre-medicate: dexamethasone, H1 antihistamine, H2 blocker.'
            }
        ]
    },

    // Capecitabine monotherapy (2nd line) — fully oral
    'Capecitabine-2L': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    }
};
