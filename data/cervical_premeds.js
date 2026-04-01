window.premedData = window.premedData || {};
window.premedData.cervical = {

    // ── DEFINITIVE ──────────────────────────────────────────────────────────

    'Cisplatin-RT': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Cisplatin',
                sequence: 1,
                solvent: 'NS',
                volume: '500mL',
                duration: '60 min',
            }
        ]
    },

    'Cisplatin-Pembrolizumab-RT': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Cisplatin',
                sequence: 1,
                solvent: 'NS',
                volume: '500mL',
                duration: '60 min',
            },
            {
                name: 'Pembrolizumab',
                sequence: 2,
                solvent: 'NS',
                volume: '100mL',
                duration: '30 min',
                note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions throughout infusion. Counsel patient on immune-related adverse events (irAEs) before starting therapy.'
            }
        ]
    },

    'Carboplatin-RT': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Carboplatin',
                sequence: 1,
                solvent: 'D5W',
                volume: '250mL',
                duration: '30–60 min',
                note: 'Calvert formula: dose (mg) = AUC × (CrCl + 25). Do not use aluminium-containing needles or IV sets.'
            }
        ]
    },

    'INTERLACE-Induction-CRT': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Paclitaxel (induction)',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '60 min',
                note: 'Pre-medicate: dexamethasone, H1 antihistamine, H2 blocker.'
            },
            {
                name: 'Carboplatin (induction)',
                sequence: 2,
                solvent: 'D5W',
                volume: '250mL',
                duration: '30–60 min',
                note: 'Calvert formula: dose (mg) = AUC × (CrCl + 25). Do not use aluminium-containing needles or IV sets.'
            },
            {
                name: 'Cisplatin (concurrent with RT)',
                sequence: 3,
                solvent: 'NS',
                volume: '500mL',
                duration: '60 min',
            }
        ]
    },

    'Cisplatin-5FU-RT': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Cisplatin',
                sequence: 1,
                solvent: 'NS',
                volume: '500mL',
                duration: '60 min',
            },
            {
                name: '5-Fluorouracil',
                sequence: 2,
                solvent: 'NS',
                volume: '500mL',
                duration: '96 hrs CI (D2–D5)',
                note: 'Continuous infusion — use elastomeric or CADD pump. Confirm pump rate and fill volume with pharmacy before dispensing.'
            }
        ]
    },

    // ── NEOADJUVANT ─────────────────────────────────────────────────────────

    'Cisplatin-Paclitaxel-Neo': {
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
                name: 'Cisplatin',
                sequence: 2,
                solvent: 'NS',
                volume: '500mL',
                duration: '60–90 min',
            }
        ]
    },

    'Carboplatin-Paclitaxel-Neo': {
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

    // ── ADJUVANT ────────────────────────────────────────────────────────────

    'Cisplatin-Paclitaxel-Adj': {
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
                name: 'Cisplatin',
                sequence: 2,
                solvent: 'NS',
                volume: '500mL',
                duration: '60–90 min',
            }
        ]
    },

    'Carboplatin-Paclitaxel-Adj': {
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

    // ── METASTATIC ──────────────────────────────────────────────────────────

    'Cisplatin-Paclitaxel-Pembrolizumab-Bevacizumab': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Pembrolizumab',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                duration: '30 min',
                note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions throughout infusion. Counsel patient on immune-related adverse events (irAEs) before starting therapy.'
            },
            {
                name: 'Paclitaxel',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: '3 hours',
                note: 'Pre-medicate: dexamethasone, H1 antihistamine, H2 blocker.'
            },
            {
                name: 'Cisplatin',
                sequence: 3,
                solvent: 'NS',
                volume: '500mL',
                duration: '60–90 min',
            },
            {
                name: 'Bevacizumab',
                sequence: 4,
                solvent: 'NS',
                volume: '100mL',
                duration: '30–90 min',
                note: 'First infusion: 90 min. If tolerated, second infusion: 60 min; subsequent infusions: 30 min. Do not administer as IV push or bolus.'
            }
        ]
    },

    'Carboplatin-Paclitaxel-Pembrolizumab-Bevacizumab': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Pembrolizumab',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                duration: '30 min',
                note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions throughout infusion. Counsel patient on immune-related adverse events (irAEs) before starting therapy.'
            },
            {
                name: 'Paclitaxel',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: '3 hours',
                note: 'Pre-medicate: dexamethasone, H1 antihistamine, H2 blocker.'
            },
            {
                name: 'Carboplatin',
                sequence: 3,
                solvent: 'D5W',
                volume: '250mL',
                duration: '30–60 min',
                note: 'Calvert formula: dose (mg) = AUC × (CrCl + 25). Do not use aluminium-containing needles or IV sets.'
            },
            {
                name: 'Bevacizumab',
                sequence: 4,
                solvent: 'NS',
                volume: '100mL',
                duration: '30–90 min',
                note: 'First infusion: 90 min. If tolerated, second infusion: 60 min; subsequent infusions: 30 min. Do not administer as IV push or bolus.'
            }
        ]
    },

    'Cisplatin-Paclitaxel-Pembrolizumab': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Pembrolizumab',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                duration: '30 min',
                note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions throughout infusion. Counsel patient on immune-related adverse events (irAEs) before starting therapy.'
            },
            {
                name: 'Paclitaxel',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: '3 hours',
                note: 'Pre-medicate: dexamethasone, H1 antihistamine, H2 blocker.'
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

    'Carboplatin-Paclitaxel-Pembrolizumab': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Pembrolizumab',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                duration: '30 min',
                note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions throughout infusion. Counsel patient on immune-related adverse events (irAEs) before starting therapy.'
            },
            {
                name: 'Paclitaxel',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: '3 hours',
                note: 'Pre-medicate: dexamethasone, H1 antihistamine, H2 blocker.'
            },
            {
                name: 'Carboplatin',
                sequence: 3,
                solvent: 'D5W',
                volume: '250mL',
                duration: '30–60 min',
                note: 'Calvert formula: dose (mg) = AUC × (CrCl + 25). Do not use aluminium-containing needles or IV sets.'
            }
        ]
    },

    'Cisplatin-Paclitaxel-Atezolizumab-Bevacizumab': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Atezolizumab',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '60 min',
                note: 'First infusion: 60 min. If tolerated, subsequent infusions: 30 min. Administer through a 0.2 micron in-line filter. Counsel patient on irAEs before starting therapy.'
            },
            {
                name: 'Paclitaxel',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: '3 hours',
                note: 'Pre-medicate: dexamethasone, H1 antihistamine, H2 blocker.'
            },
            {
                name: 'Cisplatin',
                sequence: 3,
                solvent: 'NS',
                volume: '500mL',
                duration: '60–90 min',
            },
            {
                name: 'Bevacizumab',
                sequence: 4,
                solvent: 'NS',
                volume: '100mL',
                duration: '30–90 min',
                note: 'First infusion: 90 min. If tolerated, second infusion: 60 min; subsequent infusions: 30 min. Do not administer as IV push or bolus.'
            }
        ]
    },

    'Carboplatin-Paclitaxel-Atezolizumab-Bevacizumab': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Atezolizumab',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '60 min',
                note: 'First infusion: 60 min. If tolerated, subsequent infusions: 30 min. Administer through a 0.2 micron in-line filter. Counsel patient on irAEs before starting therapy.'
            },
            {
                name: 'Paclitaxel',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: '3 hours',
                note: 'Pre-medicate: dexamethasone, H1 antihistamine, H2 blocker.'
            },
            {
                name: 'Carboplatin',
                sequence: 3,
                solvent: 'D5W',
                volume: '250mL',
                duration: '30–60 min',
                note: 'Calvert formula: dose (mg) = AUC × (CrCl + 25). Do not use aluminium-containing needles or IV sets.'
            },
            {
                name: 'Bevacizumab',
                sequence: 4,
                solvent: 'NS',
                volume: '100mL',
                duration: '30–90 min',
                note: 'First infusion: 90 min. If tolerated, second infusion: 60 min; subsequent infusions: 30 min. Do not administer as IV push or bolus.'
            }
        ]
    },

    'Cisplatin-Paclitaxel-Bevacizumab': {
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
                name: 'Cisplatin',
                sequence: 2,
                solvent: 'NS',
                volume: '500mL',
                duration: '60–90 min',
            },
            {
                name: 'Bevacizumab',
                sequence: 3,
                solvent: 'NS',
                volume: '100mL',
                duration: '30–90 min',
                note: 'First infusion: 90 min. If tolerated, second infusion: 60 min; subsequent infusions: 30 min. Do not administer as IV push or bolus.'
            }
        ]
    },

    'Carboplatin-Paclitaxel-Bevacizumab': {
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
                name: 'Bevacizumab',
                sequence: 3,
                solvent: 'NS',
                volume: '100mL',
                duration: '30–90 min',
                note: 'First infusion: 90 min. If tolerated, second infusion: 60 min; subsequent infusions: 30 min. Do not administer as IV push or bolus.'
            }
        ]
    },

    'Cisplatin-Paclitaxel': {
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
                name: 'Cisplatin',
                sequence: 2,
                solvent: 'NS',
                volume: '500mL',
                duration: '60–90 min',
            }
        ]
    },

    'Carboplatin-Paclitaxel': {
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

    'Carboplatin-Paclitaxel-Weekly': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Paclitaxel',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '60 min',
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

    'Topotecan-Paclitaxel-Bevacizumab': {
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
            },
            {
                name: 'Topotecan',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: '30 min',
                note: 'Dilute to ≤0.05 mg/mL in NS or D5W. Store diluted solution protected from light.'
            },
            {
                name: 'Bevacizumab',
                sequence: 3,
                solvent: 'NS',
                volume: '100mL',
                duration: '30–90 min',
                note: 'First infusion: 90 min. If tolerated, second infusion: 60 min; subsequent infusions: 30 min. Do not administer as IV push or bolus.'
            }
        ]
    },

    'Gemcitabine-Cisplatin-Pembrolizumab': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Pembrolizumab',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                duration: '30 min',
                note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions throughout infusion. Counsel patient on immune-related adverse events (irAEs) before starting therapy.'
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

    'Gemcitabine-Carboplatin-Pembrolizumab': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Pembrolizumab',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                duration: '30 min',
                note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions throughout infusion. Counsel patient on immune-related adverse events (irAEs) before starting therapy.'
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
                name: 'Carboplatin',
                sequence: 3,
                solvent: 'D5W',
                volume: '250mL',
                duration: '30–60 min',
                note: 'Calvert formula: dose (mg) = AUC × (CrCl + 25). Do not use aluminium-containing needles or IV sets.'
            }
        ]
    },

    'Pembrolizumab-2L': {
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

    'Cemiplimab-2L': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Cemiplimab',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '30 min',
                note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions throughout infusion. Counsel patient on immune-related adverse events (irAEs) before starting therapy.'
            }
        ]
    },

    'Tisotumab-Vedotin-2L': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Tisotumab vedotin',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                duration: '30 min',
                note: 'Tissue factor-directed ADC. Monitor for ocular toxicity (conjunctivitis, keratitis, dry eye) — mandatory ophthalmic drops (corticosteroid + vasoconstrictor + lubricant) before and after each infusion. Monitor for peripheral neuropathy and bleeding events.'
            }
        ]
    },

    'Nivolumab-2L': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Nivolumab',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                duration: '30 min',
                note: 'First infusion: 60 min; subsequent infusions: 30 min if first tolerated. Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions. Counsel patient on irAEs before starting therapy.'
            }
        ]
    },

    'Trastuzumab-Deruxtecan-2L': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Trastuzumab deruxtecan',
                sequence: 1,
                solvent: 'D5W',
                volume: '100mL',
                duration: '90 min',
                note: 'First infusion: 90 min; subsequent infusions: 30 min if prior infusions tolerated. Must be diluted in D5W only (not NS). Monitor for ILD/pneumonitis (hold for Grade 1, discontinue for Grade 2+). Monitor for haematological toxicity.'
            }
        ]
    },

    'Topotecan-2L': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Topotecan',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '30 min',
                note: 'Dilute to ≤0.05 mg/mL in NS or D5W. Store diluted solution protected from light.'
            }
        ]
    },

    'Topotecan-Weekly-2L': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Topotecan',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '30 min',
                note: 'Dilute to ≤0.05 mg/mL in NS or D5W. Store diluted solution protected from light.'
            }
        ]
    },

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
                duration: '60 min',
                note: 'See Mandatory Dexamethasone clinical alert for 3-day pre-medication schedule.'
            }
        ]
    },

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

    'Pemetrexed-2L': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Pemetrexed',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                duration: '10 min',
                note: 'Mandatory supplementation: Folic acid 400 mcg PO daily starting 7 days before first dose (continue throughout + 21 days after last dose); Vitamin B12 1000 mcg IM at least 7 days before first dose, then every 9 weeks. Dexamethasone 4mg BD on Day −1, Day 1, and Day 2 to reduce cutaneous reactions.'
            }
        ]
    },

    'Irinotecan-2L': {
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
            }
        ]
    },

    'Vinorelbine-2L': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Vinorelbine',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                duration: '6–10 min',
                note: 'VESICANT — administer via central line or confirmed patent peripheral IV. Dilute in NS or D5W to 1.5–3 mg/mL. Flush thoroughly with ≥75–125 mL NS after administration. Extravasation causes severe tissue necrosis.'
            }
        ]
    },

    'Nab-Paclitaxel-2L': {
        label: null,
        emetogenicity: 'low',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Nab-paclitaxel',
                sequence: 1,
                solvent: 'NS',
                volume: '100mL',
                duration: '30 min',
                note: 'No special tubing required (albumin-bound — no PVC/DEHP concern). Do not use an in-line filter. Reconstitute with NS to 5 mg/mL. No routine pre-medication required (though institution protocols may vary).'
            }
        ]
    },

    'Cisplatin-Topotecan-2L': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
        infusionDrugs: [
            {
                name: 'Topotecan',
                sequence: 1,
                solvent: 'NS',
                volume: '250mL',
                duration: '30 min',
                note: 'Dilute to ≤0.05 mg/mL in NS or D5W. Store diluted solution protected from light.'
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

    'Paclitaxel-Topotecan-2L': {
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
            },
            {
                name: 'Topotecan',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: '30 min',
                note: 'Dilute to ≤0.05 mg/mL in NS or D5W. Store diluted solution protected from light.'
            }
        ]
    },

    'Paclitaxel-Topotecan-Bevacizumab-2L': {
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
            },
            {
                name: 'Topotecan',
                sequence: 2,
                solvent: 'NS',
                volume: '250mL',
                duration: '30 min',
                note: 'Dilute to ≤0.05 mg/mL in NS or D5W. Store diluted solution protected from light.'
            },
            {
                name: 'Bevacizumab',
                sequence: 3,
                solvent: 'NS',
                volume: '100mL',
                duration: '30–90 min',
                note: 'First infusion: 90 min. If tolerated, second infusion: 60 min; subsequent infusions: 30 min. Do not administer as IV push or bolus.'
            }
        ]
    },

    'Gemcitabine-Cisplatin-2L': {
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

    'Cisplatin-Docetaxel-2L': {
        label: null,
        emetogenicity: 'high',
        isOral: false,
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
                duration: '60–90 min',
            }
        ]
    },

    'Carboplatin-Docetaxel-2L': {
        label: null,
        emetogenicity: 'moderate',
        isOral: false,
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
                name: 'Carboplatin',
                sequence: 2,
                solvent: 'D5W',
                volume: '250mL',
                duration: '30–60 min',
                note: 'Calvert formula: dose (mg) = AUC × (CrCl + 25). Do not use aluminium-containing needles or IV sets.'
            }
        ]
    }
};
