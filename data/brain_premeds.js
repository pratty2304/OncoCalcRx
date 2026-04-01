window.premedData = window.premedData || {};
window.premedData.brain = {

    // ===================== GLIOBLASTOMA =====================

    // Temozolomide + RT (Stupp Protocol) — oral chemoradiation then oral maintenance
    'Temozolomide-RT': {
        label: null,
        emetogenicity: 'moderate',
        isOral: true,
        infusionDrugs: []
    },

    // TTFields + Temozolomide — oral component only (TTFields is a device)
    'Tumor-Treating-Fields': {
        label: null,
        emetogenicity: 'moderate',
        isOral: true,
        infusionDrugs: []
    },

    // Bevacizumab monotherapy — IV biologic
    'Bevacizumab': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Bevacizumab',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                durationLoading: '90 min',
                durationMaintenance: '30 min',
                note: 'First infusion: 90 min. If tolerated, second infusion: 60 min. Subsequent infusions: 30 min. Administer through a 0.2 micron in-line filter. Do not shake. Do not mix with dextrose solutions.'
            }
        ]
    },

    // Bevacizumab + Lomustine (EORTC 26101) — IV + oral
    'Bevacizumab-Lomustine': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Bevacizumab',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                durationLoading: '90 min',
                durationMaintenance: '30 min',
                note: 'First infusion: 90 min. If tolerated, second infusion: 60 min. Subsequent infusions: 30 min. Administer through a 0.2 micron in-line filter. Do not shake. Do not mix with dextrose solutions.'
            }
        ]
    },

    // Temozolomide rechallenge — oral
    'Temozolomide': {
        label: null,
        emetogenicity: 'moderate',
        isOral: true,
        infusionDrugs: []
    },

    // Lomustine (CCNU) — oral
    'Lomustine': {
        label: null,
        emetogenicity: 'moderate',
        isOral: true,
        infusionDrugs: []
    },

    // Carmustine (BCNU) — IV infusion
    'Carmustine': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Carmustine (BCNU)',
                sequence: 1,
                solvent: 'D5W',
                volume: '250mL',
                duration: '1–2 hours',
                note: 'Must be diluted in D5W (not NS — alcohol diluent incompatible with NS). Protect from light. Facial flushing and burning along injection site is common — slow rate if distressing. Administer via glass bottle if available. Every 6 weeks.'
            }
        ]
    },

    // Temozolomide + Bevacizumab — oral + IV
    'Temozolomide-Bevacizumab': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Bevacizumab',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                durationLoading: '90 min',
                durationMaintenance: '30 min',
                note: 'First infusion: 90 min. If tolerated, second infusion: 60 min. Subsequent infusions: 30 min. Administer through a 0.2 micron in-line filter. Do not shake. Do not mix with dextrose solutions.'
            }
        ]
    },

    // Irinotecan + Bevacizumab — both IV
    'Irinotecan-Bevacizumab': {
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
                name: 'Bevacizumab',
                sequence: 2,
                solvent: 'NS',
                volume: '100mL',
                durationLoading: '90 min',
                durationMaintenance: '30 min',
                note: 'First infusion: 90 min. If tolerated, second infusion: 60 min. Subsequent infusions: 30 min. Administer through a 0.2 micron in-line filter. Do not shake. Do not mix with dextrose solutions.'
            }
        ]
    },

    // Temozolomide + Lomustine (CeTeG) — both oral
    'Temozolomide-Lomustine': {
        label: null,
        emetogenicity: 'moderate',
        isOral: true,
        infusionDrugs: []
    },

    // Regorafenib (REGOMA) — oral
    'Regorafenib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    // ===================== GLIOMA GRADE 2–3 =====================

    // PCV (Procarbazine + Lomustine + Vincristine) — oral + oral + IV
    'PCV': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Vincristine',
                sequence: 1,
                solvent: 'NS',
                volume: '50mL',
                duration: '15–30 min',
                note: 'VESICANT — confirm patent IV access or central line before administration. NEVER administer intrathecally (fatal). Cap dose at 2mg.'
            }
        ]
    },

    // Vorasidenib (IDH1/2 inhibitor) — oral
    'Vorasidenib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    // Tovorafenib (RAF inhibitor) — oral
    'Tovorafenib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    },

    // ===================== MEDULLOBLASTOMA =====================

    // Cisplatin + Lomustine + Vincristine (Packer)
    'Cisplatin-Lomustine-Vincristine': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Cisplatin',
                sequence: 1,
                solvent: 'NS',
                volume: '500mL',
                duration: '2–4 hours',
            },
            {
                name: 'Vincristine',
                sequence: 2,
                solvent: 'NS',
                volume: '50mL',
                duration: '15–30 min',
                note: 'VESICANT — confirm patent IV access or central line before administration. NEVER administer intrathecally (fatal). Cap dose at 2mg.'
            }
        ]
    },

    // Cisplatin + Cyclophosphamide + Vincristine
    'Cisplatin-Cyclophosphamide-Vincristine': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Cisplatin',
                sequence: 1,
                solvent: 'NS',
                volume: '500mL',
                duration: '2–4 hours',
            },
            {
                name: 'Cyclophosphamide',
                sequence: 2,
                solvent: 'NS',
                volume: '500mL',
                duration: '1 hour',
                note: 'D1. High-dose — Mesna uroprotection required.'
            },
            {
                name: 'Mesna',
                sequence: 3,
                solvent: 'NS',
                volume: '250mL',
                duration: '15–30 min',
                note: 'Equal to 80% of cyclophosphamide dose. Boluses at 0h, 4h, 8h.'
            },
            {
                name: 'Vincristine',
                sequence: 4,
                solvent: 'NS',
                volume: '50mL',
                duration: '15–30 min',
                note: 'VESICANT — confirm patent IV access or central line before administration. NEVER administer intrathecally (fatal). Cap dose at 2mg.'
            }
        ]
    },

    // Carboplatin + Etoposide + Cyclophosphamide
    'Carboplatin-Etoposide-Cyclophosphamide': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Carboplatin',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '250mL',
                duration: '30–60 min',
                note: 'Calvert formula: dose (mg) = AUC × (CrCl + 25). Do not use aluminium-containing needles or IV sets.'
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
                name: 'Cyclophosphamide',
                sequence: 3,
                solvent: 'NS',
                volume: '500mL',
                duration: '1 hour',
                note: 'D1. Mesna uroprotection required.'
            },
            {
                name: 'Mesna',
                sequence: 4,
                solvent: 'NS',
                volume: '250mL',
                duration: '15–30 min',
                note: 'Equal to 80% of cyclophosphamide dose. Boluses at 0h, 4h, 8h.'
            }
        ]
    },

    // Cisplatin + Etoposide + Cyclophosphamide
    'Cisplatin-Etoposide-Cyclophosphamide': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Cisplatin',
                sequence: 1,
                solvent: 'NS',
                volume: '500mL',
                duration: '2–4 hours',
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
                name: 'Cyclophosphamide',
                sequence: 3,
                solvent: 'NS',
                volume: '500mL',
                duration: '1 hour',
                note: 'D1. Mesna uroprotection required.'
            },
            {
                name: 'Mesna',
                sequence: 4,
                solvent: 'NS',
                volume: '250mL',
                duration: '15–30 min',
                note: 'Equal to 80% of cyclophosphamide dose. Boluses at 0h, 4h, 8h.'
            }
        ]
    },

    // ===================== EPENDYMOMA =====================

    // Cisplatin + Etoposide (EP)
    'Cisplatin-Etoposide': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Cisplatin',
                sequence: 1,
                solvent: 'NS',
                volume: '500mL',
                duration: '2–4 hours',
            },
            {
                name: 'Etoposide',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: '60 min',
                note: 'Minimum infusion time 30–60 min; never administer as IV bolus (severe hypotension risk). Maximum concentration 0.4 mg/mL.'
            }
        ]
    },

    // ===================== DIFFUSE MIDLINE GLIOMA =====================

    // Dordaviprone (ONC201) — oral
    'Dordaviprone': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
    }
};
