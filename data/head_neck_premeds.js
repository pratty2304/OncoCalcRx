window.premedData = window.premedData || {};

window.premedData.head_neck = (function () {

    // Infusion drug helpers
    function cisplat(seq)   { return { name: 'Cisplatin',     solvent: 'NS',  volume: 500, duration: '60–90 min',                             sequence: seq }; }
    function carbo(seq)     { return { name: 'Carboplatin',   solvent: 'D5W', volume: 250, duration: '30 min',                                sequence: seq }; }
    function pacli(seq)     { return { name: 'Paclitaxel',    solvent: 'NS',  volume: 250, duration: '3 hours',                               sequence: seq }; }
    function pacliW(seq)    { return { name: 'Paclitaxel',    solvent: 'NS',  volume: 250, duration: '1 hour',                                sequence: seq }; }
    function doce(seq)      { return { name: 'Docetaxel',     solvent: 'NS',  volume: 250, duration: '60 min',                                sequence: seq }; }
    function fu5(seq)       { return { name: '5-Fluorouracil', solvent: 'NS', volume: 250, duration: 'CI (per pump)',                         sequence: seq }; }
    function gem(seq)       { return { name: 'Gemcitabine',   solvent: 'NS',  volume: 250, duration: '30 min',                                sequence: seq }; }
    function vino(seq)      { return { name: 'Vinorelbine',   solvent: 'NS',  volume: 100, duration: '6–10 min',                              sequence: seq }; }
    function mtx(seq)       { return { name: 'Methotrexate',  solvent: 'NS',  volume: 100, duration: '15–30 min',                             sequence: seq }; }
    function cetux(seq)     { return { name: 'Cetuximab',     solvent: 'NS',  volume: 250, duration: '120 min (1st) / 60 min (subsequent)',   sequence: seq }; }
    function pembro(seq)    { return { name: 'Pembrolizumab', solvent: 'NS',  volume: 100, duration: '30 min',                                sequence: seq }; }
    function nivo(seq)      { return { name: 'Nivolumab',     solvent: 'NS',  volume: 100, duration: '30 min',                                sequence: seq }; }
    function tori(seq)      { return { name: 'Toripalimab',   solvent: 'NS',  volume: 250, duration: '60 min (1st) / 30 min (subsequent)',    sequence: seq }; }

    return {

        // ── NEOADJUVANT ──────────────────────────────────────────────────────
        'TPF-Neo': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [doce(1), cisplat(2), fu5(3)]
            // Docetaxel: mandatory dexamethasone pre-treatment (auto-alert)
            // 5-FU: 4-day CI (auto-detected by get5FUCIInfo)
        },
        'Cisplatin-5FU-Neo': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [cisplat(1), fu5(2)]
        },
        'Carboplatin-Paclitaxel-Neo': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [carbo(1), pacli(2)]
        },
        'Gemcitabine-Cisplatin-NPC-Neo': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [cisplat(1), gem(2)]
        },

        // ── DEFINITIVE (concurrent with RT) ──────────────────────────────────
        'Cisplatin-RT-Q3W': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [cisplat(1)]
        },
        'Cisplatin-RT-Weekly': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [cisplat(1)]
        },
        'Cetuximab-RT': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [cetux(1)]
        },
        'Carboplatin-Paclitaxel-RT': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [carbo(1), pacliW(2)]
        },

        // ── ADJUVANT (post-operative concurrent with RT) ──────────────────────
        'Cisplatin-RT-Q3W-Adj': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [cisplat(1)]
        },
        'Cisplatin-RT-Weekly-Adj': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [cisplat(1)]
        },

        // ── METASTATIC / RECURRENT ────────────────────────────────────────────
        'Pembrolizumab-Cisplatin-5FU-1L': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [pembro(1), cisplat(2), fu5(3)]
        },
        'Pembrolizumab-Carboplatin-5FU-1L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [pembro(1), carbo(2), fu5(3)]
        },
        'Pembrolizumab-Monotherapy-CPS20-1L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [pembro(1)]
        },
        'Cisplatin-5FU-Cetuximab-1L': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [cetux(1), cisplat(2), fu5(3)]
        },
        'Carboplatin-5FU-Cetuximab-1L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [cetux(1), carbo(2), fu5(3)]
        },
        'Cisplatin-5FU-1L': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [cisplat(1), fu5(2)]
        },
        'Carboplatin-Paclitaxel-1L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [carbo(1), pacli(2)]
        },
        'Carboplatin-Paclitaxel-Weekly-1L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [carbo(1), pacliW(2)]
        },
        'Cisplatin-Paclitaxel-1L': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [cisplat(1), pacli(2)]
        },
        'Toripalimab-Gemcitabine-Cisplatin-NPC': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [tori(1), cisplat(2), gem(3)]
        },
        'Gemcitabine-Cisplatin-NPC': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [cisplat(1), gem(2)]
        },
        'Cisplatin-Vinorelbine-NPC': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [cisplat(1), vino(2)]
        },
        'Pembrolizumab-Monotherapy-CPS1-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [pembro(1)]
        },
        'Nivolumab-Monotherapy-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [nivo(1)]
        },
        'Cetuximab-Monotherapy-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [cetux(1)]
        },
        'Docetaxel-Monotherapy-2L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [doce(1)]
        },
        'Paclitaxel-Monotherapy-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [pacli(1)]
        },
        'Paclitaxel-Weekly-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [pacliW(1)]
        },
        'Methotrexate-Monotherapy-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [mtx(1)]
        },
        'Capecitabine-Monotherapy-2L': {
            label: null,
            emetogenicity: 'low',
            isOral: true,
            infusionDrugs: []
        },
        'Carboplatin-Cetuximab-2L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [cetux(1), carbo(2)]
        },
        'Paclitaxel-Carboplatin-Cetuximab-2L': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [cetux(1), carbo(2), pacli(3)]
        },
        'Afatinib-2L': {
            label: null,
            emetogenicity: 'low',
            isOral: true,
            infusionDrugs: []
        }
    };

})();
