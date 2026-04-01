window.premedData = window.premedData || {};

window.premedData.endometrial = (function () {

    // Infusion drug helpers
    function carbo(seq)   { return { name: 'Carboplatin',             solvent: 'D5W', volume: 250,            duration: '30 min',                                          sequence: seq }; }
    function pacli(seq)   { return { name: 'Paclitaxel',              solvent: 'NS',  volume: 500,            duration: '3 hours',                                         sequence: seq }; }
    function cisplat(seq) { return { name: 'Cisplatin',               solvent: 'NS',  volume: 500,            duration: '60–90 min',                                       sequence: seq }; }
    function doxo(seq)    { return { name: 'Doxorubicin',             solvent: 'NS',  volume: '100mL / 250mL',duration: '15–30 min',                                       sequence: seq }; }
    function gemcit(seq)  { return { name: 'Gemcitabine',             solvent: 'NS',  volume: 250,            duration: '30 min',                                          sequence: seq }; }
    function doce(seq)    { return { name: 'Docetaxel',               solvent: 'NS',  volume: 250,            duration: '60 min',                                          sequence: seq }; }
    function ifosfam(seq) { return { name: 'Ifosfamide',              solvent: 'NS',  volume: 500,            duration: '2 hours',                                         sequence: seq }; }
    function mesnaPre(seq){ return { name: 'Mesna (pre-dose)',         solvent: 'NS',  volume: 100,            duration: '15 min (before Ifosfamide)',                      sequence: seq }; }
    function mesna4h(seq) { return { name: 'Mesna (4h post)',          solvent: 'NS',  volume: 100,            duration: '15 min (4 hours after Ifosfamide)',               sequence: seq }; }
    function mesna8h(seq) { return { name: 'Mesna (8h post)',          solvent: 'NS',  volume: 100,            duration: '15 min (8 hours after Ifosfamide)',               sequence: seq }; }
    function pembro(seq)  { return { name: 'Pembrolizumab',            solvent: 'NS',  volume: 100,            duration: '30 min',                                          sequence: seq }; }
    function dostar(seq)  { return { name: 'Dostarlimab',              solvent: 'NS',  volume: 250,            duration: '30 min',                                          sequence: seq }; }
    function durva(seq)   { return { name: 'Durvalumab',               solvent: 'NS',  volume: 250,            duration: '60 min',                                          sequence: seq }; }
    function tras(seq)    { return { name: 'Trastuzumab',              solvent: 'NS',  volume: 250,            duration: '90 min (1st) / 30 min (subsequent)',              sequence: seq }; }
    function beva(seq)    { return { name: 'Bevacizumab',              solvent: 'NS',  volume: 100,            duration: '90 min (1st) / 60 min (2nd) / 30 min (subsequent)',sequence: seq }; }
    function pld(seq)     { return { name: 'Liposomal doxorubicin',    solvent: 'D5W', volume: 250,            duration: '90 min',                                          sequence: seq }; }
    function topotecan(seq){ return { name: 'Topotecan',               solvent: 'NS',  volume: 100,            duration: '30 min',                                          sequence: seq }; }
    function tdxd(seq)    { return { name: 'Trastuzumab deruxtecan',   solvent: 'NS',  volume: 100,            duration: '90 min (1st) / 30 min (subsequent)',              sequence: seq }; }

    return {

        // ── NEOADJUVANT ──────────────────────────────────────────────────
        'Carboplatin-Paclitaxel-Neo': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [pacli(1), carbo(2)]
        },

        // ── ADJUVANT ─────────────────────────────────────────────────────
        'Carboplatin-Paclitaxel-Adj': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [pacli(1), carbo(2)]
        },
        'Carboplatin-Paclitaxel-Pembrolizumab-Adj': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [pacli(1), carbo(2), pembro(3)]
        },
        'Carboplatin-Paclitaxel-Dostarlimab-Adj': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [pacli(1), carbo(2), dostar(3)]
        },
        'Carboplatin-Paclitaxel-Durvalumab-Adj': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [pacli(1), carbo(2), durva(3)]
        },
        'Cisplatin-RT-Adj': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [cisplat(1)]
        },

        // ── METASTATIC ───────────────────────────────────────────────────
        'Carboplatin-Paclitaxel-Pembrolizumab': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [pacli(1), carbo(2), pembro(3)]
        },
        'Carboplatin-Paclitaxel-Dostarlimab': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [pacli(1), carbo(2), dostar(3)]
        },
        'Carboplatin-Paclitaxel-Durvalumab': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [pacli(1), carbo(2), durva(3)]
        },
        'Carboplatin-Paclitaxel-Trastuzumab-HER2': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [tras(1), pacli(2), carbo(3)]
        },
        'Carboplatin-Paclitaxel-Bevacizumab': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [pacli(1), carbo(2), beva(3)]
        },
        'Carboplatin-Paclitaxel': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [pacli(1), carbo(2)]
        },
        'Lenvatinib-Pembrolizumab-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [pembro(1)]
            // Lenvatinib (oral) appears automatically in Oral Chemotherapy section
        },
        'Pembrolizumab-dMMR-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [pembro(1)]
        },
        'Dostarlimab-dMMR-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [dostar(1)]
        },
        'Trastuzumab-Deruxtecan-HER2-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [tdxd(1)]
        },
        'Doxorubicin-Cisplatin-2L': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [doxo(1), cisplat(2)]
        },
        'Gemcitabine-Docetaxel-2L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [gemcit(1), doce(2)]
        },
        'Gemcitabine-Cisplatin-2L': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [gemcit(1), cisplat(2)]
        },
        'Carboplatin-Docetaxel-2L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [doce(1), carbo(2)]
        },
        'Ifosfamide-Paclitaxel-Carcinosarcoma': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [mesnaPre(1), ifosfam(2), pacli(3), mesna4h(4), mesna8h(5)]
        },
        'Ifosfamide-Carcinosarcoma': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [mesnaPre(1), ifosfam(2), mesna4h(3), mesna8h(4)]
        },
        'Doxorubicin-2L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [doxo(1)]
        },
        'Liposomal-Doxorubicin-2L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [pld(1)]
        },
        'Paclitaxel-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [pacli(1)]
        },
        'Topotecan-2L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [topotecan(1)]
        },

        // ── ORAL / HORMONAL (no IV) ──────────────────────────────────────
        'Megestrol': {
            label: null,
            emetogenicity: 'low',
            isOral: true,
            infusionDrugs: []
        },
        'Medroxyprogesterone': {
            label: null,
            emetogenicity: 'low',
            isOral: true,
            infusionDrugs: []
        },
        'Tamoxifen': {
            label: null,
            emetogenicity: 'low',
            isOral: true,
            infusionDrugs: []
        },
        'Letrozole': {
            label: null,
            emetogenicity: 'low',
            isOral: true,
            infusionDrugs: []
        },
        'Everolimus-Letrozole': {
            label: null,
            emetogenicity: 'low',
            isOral: true,
            infusionDrugs: []
        }
    };

})();
