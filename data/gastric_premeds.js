window.premedData = window.premedData || {};

window.premedData.gastric = (function () {

    // Infusion drug helpers
    function carbo(seq)     { return { name: 'Carboplatin',                          solvent: 'D5W', volume: 250,             duration: '30 min',                             sequence: seq }; }
    function cisplat(seq)   { return { name: 'Cisplatin',                            solvent: 'NS',  volume: 500,             duration: '60–90 min',                          sequence: seq }; }
    function oxali(seq)     { return { name: 'Oxaliplatin',                          solvent: 'D5W', volume: 250,             duration: '2 hours',                            sequence: seq }; }
    function leucov(seq)    { return { name: 'Leucovorin',                           solvent: 'NS',  volume: 250,             duration: '2 hours',                            sequence: seq }; }
    function fu5(seq)       { return { name: '5-Fluorouracil',                       solvent: 'NS',  volume: 250,             duration: 'CI (per pump)',                      sequence: seq }; }
    function fu5ci(seq)     { return { name: '5-Fluorouracil (continuous infusion)', solvent: 'NS',  volume: 250,             duration: 'CI (per pump)',                      sequence: seq }; }
    function doce(seq)      { return { name: 'Docetaxel',                            solvent: 'NS',  volume: 250,             duration: '60 min',                             sequence: seq }; }
    function epi(seq)       { return { name: 'Epirubicin',                           solvent: 'NS',  volume: '100mL / 250mL', duration: '15–30 min',                          sequence: seq }; }
    function pacliW(seq)    { return { name: 'Paclitaxel',                           solvent: 'NS',  volume: 250,             duration: '1 hour',                             sequence: seq }; }
    function irino(seq)     { return { name: 'Irinotecan',                           solvent: 'D5W', volume: 250,             duration: '90 min',                             sequence: seq }; }
    function tras(seq)      { return { name: 'Trastuzumab',                          solvent: 'NS',  volume: 250,             duration: '90 min (1st) / 30 min (subsequent)', sequence: seq }; }
    function tdxd(seq)      { return { name: 'Trastuzumab Deruxtecan',               solvent: 'NS',  volume: 100,             duration: '90 min (1st) / 30 min (subsequent)', sequence: seq }; }
    function pembro(seq)    { return { name: 'Pembrolizumab',                        solvent: 'NS',  volume: 100,             duration: '30 min',                             sequence: seq }; }
    function nivo(seq)      { return { name: 'Nivolumab',                            solvent: 'NS',  volume: 100,             duration: '30 min',                             sequence: seq }; }
    function ipi(seq)       { return { name: 'Ipilimumab',                           solvent: 'NS',  volume: 100,             duration: '30 min',                             sequence: seq }; }
    function tisl(seq)      { return { name: 'Tislelizumab',                         solvent: 'NS',  volume: 100,             duration: '60 min (1st) / 30 min (subsequent)', sequence: seq }; }
    function dostar(seq)    { return { name: 'Dostarlimab',                          solvent: 'NS',  volume: 250,             duration: '30 min',                             sequence: seq }; }
    function ramu(seq)      { return { name: 'Ramucirumab',                          solvent: 'NS',  volume: 250,             duration: '60 min',                             sequence: seq }; }
    function durva(seq)     { return { name: 'Durvalumab',                           solvent: 'NS',  volume: 250,             duration: '60 min',                             sequence: seq }; }
    function zolbe(seq)     { return { name: 'Zolbetuximab',                         solvent: 'NS',  volume: 250,             duration: '60 min (1st) / 30 min (subsequent)', sequence: seq }; }

    return {

        // ── NEOADJUVANT ──────────────────────────────────────────────────────
        'FLOT-Neo': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [doce(1), oxali(2), leucov(3), fu5(4)]
        },
        'mFOLFOX6-Neo': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [oxali(1), leucov(2), fu5(3), fu5(4)]
            // Two '5-Fluorouracil' entries: seq 3 = bolus, seq 4 = CI (matched by occurrence order)
        },
        'CapeOX-Neo': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [oxali(1)]
            // Capecitabine (oral) appears automatically in Oral Chemotherapy section
        },

        // ── ADJUVANT ─────────────────────────────────────────────────────────
        'mFOLFOX6-Adj': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [oxali(1), leucov(2), fu5(3), fu5(4)]
        },
        'CapeOX-Adj': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [oxali(1)]
        },
        'Capecitabine-Adj': {
            label: null,
            emetogenicity: 'low',
            isOral: true,
            infusionDrugs: []
        },
        '5FU-LV-Adj': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [leucov(1), fu5(2)]
        },
        'S1-Adj': {
            label: null,
            emetogenicity: 'low',
            isOral: true,
            infusionDrugs: []
        },
        'S1-Oxaliplatin-Adj': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [oxali(1)]
            // S-1 (oral) appears automatically in Oral Chemotherapy section
        },

        // ── PERIOPERATIVE ────────────────────────────────────────────────────
        'FLOT4-Periop': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [doce(1), oxali(2), leucov(3), fu5(4)]
        },
        'ECF-MAGIC': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [epi(1), cisplat(2), fu5(3)]
        },
        'Durvalumab-FLOT-MATTERHORN': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [doce(1), oxali(2), leucov(3), fu5(4), durva(5)]
        },
        'Durvalumab-Maintenance-MATTERHORN': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [durva(1)]
        },

        // ── METASTATIC ───────────────────────────────────────────────────────
        'Pembrolizumab-5FU-Cisplatin-1L': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [pembro(1), cisplat(2), fu5(3)]
        },
        'Nivolumab-Ipilimumab-MSI-1L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [nivo(1), ipi(2)]
        },
        'Pembrolizumab-Mono': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [pembro(1)]
        },
        'FOLFOX-Zolbetuximab-1L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [zolbe(1), oxali(2), leucov(3), fu5(4), fu5(5)]
        },
        'XP-Trastuzumab-HER2-1L': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [tras(1), cisplat(2)]
            // Capecitabine (oral) appears automatically in Oral Chemotherapy section
        },
        'FOLFOX-Trastuzumab-HER2-1L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [tras(1), oxali(2), leucov(3), fu5(4), fu5(5)]
        },
        'FOLFOX-Trastuzumab-Pembrolizumab-HER2-1L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [pembro(1), tras(2), oxali(3), leucov(4), fu5(5), fu5(6)]
        },
        '5FU-Cisplatin-Trastuzumab-HER2-1L': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [tras(1), cisplat(2), fu5(3)]
        },
        '5FU-Cisplatin-Trastuzumab-Pembrolizumab-HER2-1L': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [pembro(1), tras(2), cisplat(3), fu5(4)]
        },
        'ECX-1L': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [epi(1), cisplat(2)]
            // Capecitabine (oral) appears automatically
        },
        'EOX-1L': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [epi(1), oxali(2)]
            // Capecitabine (oral) appears automatically
        },
        'DCF-1L': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [doce(1), cisplat(2), fu5(3)]
        },
        'FLO-1L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [oxali(1), leucov(2), fu5(3)]
        },
        'mFOLFOX6-1L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [oxali(1), leucov(2), fu5(3), fu5(4)]
        },
        'CapeOX-1L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [oxali(1)]
        },
        'FOLFOX-Nivolumab-1L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [nivo(1), oxali(2), leucov(3), fu5(4), fu5(5)]
        },
        'FOLFOX-Pembrolizumab-1L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [pembro(1), oxali(2), leucov(3), fu5(4), fu5(5)]
        },
        '5FU-Cisplatin-Tislelizumab-1L': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [tisl(1), cisplat(2), fu5(3)]
        },
        'CapeOX-Trastuzumab-HER2-1L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [tras(1), oxali(2)]
        },
        'CapeOX-Trastuzumab-Pembrolizumab-HER2-1L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [pembro(1), tras(2), oxali(3)]
        },
        'CapCis-Trastuzumab-HER2-1L': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [tras(1), cisplat(2)]
        },
        'CapCis-Trastuzumab-Pembrolizumab-HER2-1L': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [pembro(1), tras(2), cisplat(3)]
        },
        'CapeOX-Nivolumab-1L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [nivo(1), oxali(2)]
        },
        'CapeOX-Pembrolizumab-1L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [pembro(1), oxali(2)]
        },
        'CapeOX-Tislelizumab-1L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [tisl(1), oxali(2)]
        },
        'CapeOX-Zolbetuximab-1L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [zolbe(1), oxali(2)]
        },
        'CapCis-Pembrolizumab-1L': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [pembro(1), cisplat(2)]
        },
        'CapCis-Tislelizumab-1L': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [tisl(1), cisplat(2)]
        },
        'SP-1L': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [cisplat(1)]
            // S-1 (oral) appears automatically in Oral Chemotherapy section
        },
        'SOX-1L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [oxali(1)]
            // S-1 (oral) appears automatically in Oral Chemotherapy section
        },
        'SOX-Nivolumab-1L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [nivo(1), oxali(2)]
            // S-1 (oral) appears automatically in Oral Chemotherapy section
        },
        'S1-Mono-1L': {
            label: null,
            emetogenicity: 'low',
            isOral: true,
            infusionDrugs: []
        },
        'Paclitaxel-Ramucirumab-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [ramu(1), pacliW(2)]
        },
        'FOLFIRI-Ramucirumab-2L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [ramu(1), irino(2), leucov(3), fu5(4), fu5(5)]
        },
        'Irinotecan-Ramucirumab-2L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [ramu(1), irino(2)]
        },
        'T-DXd-HER2-2L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [tdxd(1)]
        },
        'mFOLFIRI-2L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [irino(1), leucov(2), fu5(3), fu5(4)]
        },
        'Docetaxel-2L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [doce(1)]
        },
        'Paclitaxel-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [pacliW(1)]
        },
        'Irinotecan-2L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [irino(1)]
        },
        'Ramucirumab-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [ramu(1)]
        },
        'Nivolumab-3L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [nivo(1)]
        },
        'Dostarlimab-MSI-3L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [dostar(1)]
        },

        'S1-Docetaxel-2L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [doce(1)]
            // S-1 (oral) appears automatically in Oral Chemotherapy section
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
