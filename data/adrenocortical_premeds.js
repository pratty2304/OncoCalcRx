window.premedData = window.premedData || {};
window.premedData.adrenocortical = {

    // ── ADJUVANT ──────────────────────────────────────────────────────────────

    'Mitotane': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
        // Mitotane alert (adrenal replacement, plasma levels) fires via buildClinicalAlerts()
    },

    // ── METASTATIC ────────────────────────────────────────────────────────────

    'EDP-M': {
        label: null,
        emetogenicity: 'high',
        infusionDrugs: [
            // D1: Doxorubicin; D2–D4: Etoposide + Cisplatin (per schedule)
            // Table shows all IV drugs in typical administration order
            {
                name: 'Etoposide',
                sequence: 1,
                solvent: 'NS',
                volume: '500mL',
                duration: '60 min',
                note: 'Minimum infusion time 30–60 min; never administer as IV bolus (severe hypotension risk). Maximum concentration 0.4 mg/mL.'
            },
            {
                name: 'Doxorubicin',
                sequence: 2,
                solvent: 'NS',
                volume: '100mL / 250mL',
                duration: '15–30 min'
            },
            {
                name: 'Cisplatin',
                sequence: 3,
                solvent: 'NS',
                volume: '500mL',
                duration: '60–90 min',
            }
            // Mitotane is oral — not listed in infusion table
        ]
    },

    'EP-M': {
        label: null,
        emetogenicity: 'high',
        infusionDrugs: [
            {
                name: 'Etoposide',
                sequence: 1,
                solvent: 'NS',
                volume: '500mL',
                duration: '60 min'
            },
            {
                name: 'Cisplatin',
                sequence: 2,
                solvent: 'NS',
                volume: '500mL',
                duration: '60–90 min'
            }
            // Mitotane is oral — not listed
        ]
    },

    'Streptozocin-Mitotane': {
        label: null,
        emetogenicity: 'high',
        infusionDrugs: [
            {
                name: 'Streptozocin',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '30–60 min'
            }
            // Mitotane is oral — not listed
        ]
    },

    'EDP-M-Carboplatin': {
        label: null,
        emetogenicity: 'high',
        infusionDrugs: [
            {
                name: 'Etoposide',
                sequence: 1,
                solvent: 'NS',
                volume: '500mL',
                duration: '60 min'
            },
            {
                name: 'Doxorubicin',
                sequence: 2,
                solvent: 'NS',
                volume: '100mL / 250mL',
                duration: '15–30 min'
            },
            {
                name: 'Carboplatin',
                sequence: 3,
                solvent: 'D5W',
                volume: '250mL',
                duration: '30–60 min'
            }
            // Mitotane is oral — not listed
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
            // Capecitabine is oral — not listed
        ]
    },

    'Gemcitabine-Capecitabine-Mitotane': {
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
            // Capecitabine and Mitotane are oral — not listed
        ]
    },

    'Docetaxel-Cisplatin': {
        label: null,
        emetogenicity: 'high',
        infusionDrugs: [
            {
                name: 'Docetaxel',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '60 min',
                note: 'See Mandatory Dexamethasone clinical alert for 3-day pre-medication schedule.'
            },
            {
                name: 'Cisplatin',
                sequence: 2,
                solvent: 'NS',
                volume: '500mL',
                duration: '60–90 min'
            }
        ]
    },

    'Temozolomide': {
        label: null,
        emetogenicity: 'moderate',
        isOral: true,
        infusionDrugs: []
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
                volume: '100mL',
                duration: '30 min'
            }
        ]
    },

    'Pembrolizumab': {
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

    'Cabozantinib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    }
};
