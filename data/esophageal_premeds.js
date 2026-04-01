window.premedData = window.premedData || {};

window.premedData.esophageal = (function () {

    // Infusion drug helpers
    function carbo(seq)     { return { name: 'Carboplatin',                          solvent: 'D5W', volume: 250,             duration: '30 min',                             sequence: seq }; }
    function carboCross(seq){ return { name: 'Carboplatin',                          solvent: 'D5W', volume: 100,             duration: '30 min',                             sequence: seq }; }
    function pacliW(seq)    { return { name: 'Paclitaxel',                           solvent: 'NS',  volume: 250,             duration: '1 hour',                             sequence: seq }; }
    function pacli3w(seq)   { return { name: 'Paclitaxel',                           solvent: 'NS',  volume: 500,             duration: '3 hours',                            sequence: seq }; }
    function nabPacli(seq)  { return { name: 'Nab-Paclitaxel',                       solvent: 'NS',  volume: 100,             duration: '30 min',                             sequence: seq }; }
    function cisplat(seq)   { return { name: 'Cisplatin',                            solvent: 'NS',  volume: 500,             duration: '60–90 min',                          sequence: seq }; }
    function oxali(seq)     { return { name: 'Oxaliplatin',                          solvent: 'D5W', volume: 250,             duration: '2 hours',                            sequence: seq }; }
    function leucov(seq)    { return { name: 'Leucovorin',                           solvent: 'NS',  volume: 250,             duration: '2 hours',                            sequence: seq }; }
    function fu5(seq)       { return { name: '5-Fluorouracil',                       solvent: 'NS',  volume: 250,             duration: 'CI (per pump)',                      sequence: seq }; }
    function fu5bolus(seq)  { return { name: '5-Fluorouracil (bolus)',               solvent: 'NS',  volume: 50,              duration: '15 min (IV bolus)',                  sequence: seq }; }
    function fu5ci(seq)     { return { name: '5-Fluorouracil (continuous infusion)', solvent: 'NS',  volume: 250,             duration: 'CI (per pump)',                      sequence: seq }; }
    function doce(seq)      { return { name: 'Docetaxel',                            solvent: 'NS',  volume: 250,             duration: '60 min',                             sequence: seq }; }
    function epi(seq)       { return { name: 'Epirubicin',                           solvent: 'NS',  volume: '100mL / 250mL', duration: '15–30 min',                          sequence: seq }; }
    function pembro(seq)    { return { name: 'Pembrolizumab',                        solvent: 'NS',  volume: 100,             duration: '30 min',                             sequence: seq }; }
    function nivo(seq)      { return { name: 'Nivolumab',                            solvent: 'NS',  volume: 100,             duration: '30 min',                             sequence: seq }; }
    function ipi(seq)       { return { name: 'Ipilimumab',                           solvent: 'NS',  volume: 100,             duration: '30 min',                             sequence: seq }; }
    function tisl(seq)      { return { name: 'Tislelizumab',                         solvent: 'NS',  volume: 100,             duration: '60 min (1st) / 30 min (subsequent)', sequence: seq }; }
    function tras(seq)      { return { name: 'Trastuzumab',                          solvent: 'NS',  volume: 250,             duration: '90 min (1st) / 30 min (subsequent)', sequence: seq }; }
    function tdxd(seq)      { return { name: 'Trastuzumab Deruxtecan',               solvent: 'NS',  volume: 100,             duration: '90 min (1st) / 30 min (subsequent)', sequence: seq }; }
    function ramu(seq)      { return { name: 'Ramucirumab',                          solvent: 'NS',  volume: 250,             duration: '60 min',                             sequence: seq }; }
    function durva(seq)     { return { name: 'Durvalumab',                           solvent: 'NS',  volume: 250,             duration: '60 min',                             sequence: seq }; }
    function irino(seq)     { return { name: 'Irinotecan',                           solvent: 'D5W', volume: 250,             duration: '90 min',                             sequence: seq }; }

    return {

        // ── NEOADJUVANT ──────────────────────────────────────────────────────
        'CROSS-Neoadjuvant': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [pacliW(1), carboCross(2)]
        },
        '5FU-Cisplatin-RT-Neo': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [cisplat(1), fu5(2)]
        },

        // ── DEFINITIVE ───────────────────────────────────────────────────────
        '5FU-Cisplatin-RT-Definitive': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [cisplat(1), fu5(2)]
        },
        'Carboplatin-Paclitaxel-RT-Definitive': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [pacliW(1), carboCross(2)]
        },
        'FOLFOX-RT-Definitive': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [oxali(1), leucov(2), fu5bolus(3), fu5ci(4)]
        },

        // ── PERIOPERATIVE ────────────────────────────────────────────────────
        'FLOT4-Perioperative': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [doce(1), oxali(2), leucov(3), fu5(4)]
        },
        'FLOT-Durvalumab-Perioperative': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [doce(1), oxali(2), leucov(3), fu5(4), durva(5)]
        },
        'ECF-MAGIC-Perioperative': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [epi(1), cisplat(2), fu5(3)]
        },
        'mFOLFOX6-Perioperative': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [oxali(1), leucov(2), fu5(3), fu5ci(4)]
        },
        'CapeOX-Perioperative': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [oxali(1)]
            // Capecitabine (oral) appears automatically in Oral Chemotherapy section
        },

        // ── ADJUVANT ─────────────────────────────────────────────────────────
        'Nivolumab-Adjuvant': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [nivo(1)]
        },

        // ── METASTATIC ───────────────────────────────────────────────────────
        'Pembrolizumab-Cisplatin-5FU': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [pembro(1), cisplat(2), fu5(3)]
        },
        'Nivolumab-FOLFOX': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [nivo(1), oxali(2), leucov(3), fu5(4), fu5ci(5)]
        },
        'Nivolumab-CAPOX': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [nivo(1), oxali(2)]
            // Capecitabine (oral) appears automatically in Oral Chemotherapy section
        },
        'Nivolumab-Cisplatin-5FU': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [nivo(1), cisplat(2), fu5(3)]
        },
        'Nivolumab-Ipilimumab': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [nivo(1), ipi(2)]
        },
        'Tislelizumab-Cisplatin-5FU': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [tisl(1), cisplat(2), fu5(3)]
        },
        'mFOLFOX6-Pembrolizumab': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [oxali(1), leucov(2), fu5(3), fu5ci(4), pembro(5)]
        },
        'Cisplatin-5FU-Trastuzumab-HER2': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [tras(1), cisplat(2), fu5(3)]
        },
        'CapeOX-Trastuzumab-HER2': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [tras(1), oxali(2)]
            // Capecitabine (oral) appears automatically in Oral Chemotherapy section
        },
        'FOLFOX-Trastuzumab-HER2': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [tras(1), oxali(2), leucov(3), fu5(4), fu5ci(5)]
        },
        'CapeOX-Trastuzumab-Pembrolizumab-HER2': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [pembro(1), tras(2), oxali(3)]
            // Capecitabine (oral) appears automatically in Oral Chemotherapy section
        },
        'mFOLFOX6-Metastatic': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [oxali(1), leucov(2), fu5(3), fu5ci(4)]
        },
        'CapeOX-Metastatic': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [oxali(1)]
            // Capecitabine (oral) appears automatically in Oral Chemotherapy section
        },
        'Carboplatin-Paclitaxel': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [pacli3w(1), carbo(2)]
        },
        'Cisplatin-Paclitaxel': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [pacli3w(1), cisplat(2)]
        },
        'ECX': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [epi(1), cisplat(2)]
            // Capecitabine (oral) appears automatically in Oral Chemotherapy section
        },
        'EOX': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [epi(1), oxali(2)]
            // Capecitabine (oral) appears automatically in Oral Chemotherapy section
        },
        'Ramucirumab-Paclitaxel-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [ramu(1), pacliW(2)]
        },
        'Nivolumab-2L-ESCC': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [nivo(1)]
        },
        'Ramucirumab-Monotherapy-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [ramu(1)]
        },
        'T-DXd-HER2-2L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [tdxd(1)]
        },
        'FOLFIRI-2L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [irino(1), leucov(2), fu5(3), fu5ci(4)]
        },
        'Paclitaxel-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [pacli3w(1)]
        },
        'Paclitaxel-Weekly-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [pacliW(1)]
        },
        'Nab-Paclitaxel-Carboplatin-1L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [nabPacli(1), carbo(2)]
        },
        'Nab-Paclitaxel-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [nabPacli(1)]
        },
        'Docetaxel-2L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [doce(1)]
        },
        'Irinotecan-2L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [irino(1)]
        },
        'Cisplatin-Irinotecan-2L': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [cisplat(1), irino(2)]
        },
        'Pembrolizumab-3L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [pembro(1)]
        },

        // ── ORAL ONLY ────────────────────────────────────────────────────────
        'TAS-102-3L': {
            label: null,
            emetogenicity: 'low',
            isOral: true,
            infusionDrugs: []
        }
    };

})();
