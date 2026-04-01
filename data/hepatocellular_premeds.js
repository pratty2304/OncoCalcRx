window.premedData = window.premedData || {};

window.premedData.hepatocellular = (function () {

    // Infusion drug helpers
    function atezo(seq)     { return { name: 'Atezolizumab',   solvent: 'NS',  volume: 250, duration: '60 min (1st) / 30 min (subsequent)', sequence: seq }; }
    function bev(seq)       { return { name: 'Bevacizumab',    solvent: 'NS',  volume: 100, duration: '90 min (1st) / 60 min (2nd) / 30 min (subsequent)', sequence: seq }; }
    function durva(seq)     { return { name: 'Durvalumab',     solvent: 'NS',  volume: 250, duration: '60 min',                                sequence: seq }; }
    function tremu(seq)     { return { name: 'Tremelimumab',   solvent: 'NS',  volume: 250, duration: '60 min',                                sequence: seq }; }
    function nivo(seq)      { return { name: 'Nivolumab',      solvent: 'NS',  volume: 100, duration: '30 min',                                sequence: seq }; }
    function ipi(seq)       { return { name: 'Ipilimumab',     solvent: 'NS',  volume: 100, duration: '30 min',                                sequence: seq }; }
    function pembro(seq)    { return { name: 'Pembrolizumab',  solvent: 'NS',  volume: 100, duration: '30 min',                                sequence: seq }; }
    function tisl(seq)      { return { name: 'Tislelizumab',   solvent: 'NS',  volume: 100, duration: '60 min (1st) / 30 min (subsequent)',    sequence: seq }; }
    function dostar(seq)    { return { name: 'Dostarlimab',    solvent: 'NS',  volume: 250, duration: '30 min',                                sequence: seq }; }
    function ramu(seq)      { return { name: 'Ramucirumab',    solvent: 'NS',  volume: 250, duration: '60 min',                                sequence: seq }; }
    function oxali(seq)     { return { name: 'Oxaliplatin',    solvent: 'D5W', volume: 250, duration: '2 hours',                               sequence: seq }; }
    function leucov(seq)    { return { name: 'Leucovorin',     solvent: 'NS',  volume: 250, duration: '2 hours',                               sequence: seq }; }
    function fu5(seq)       { return { name: '5-Fluorouracil', solvent: 'NS',  volume: 250, duration: 'CI (per pump)',                         sequence: seq }; }

    function oral(emetogenicity) {
        return { label: null, emetogenicity: emetogenicity, isOral: true, infusionDrugs: [] };
    }

    return {

        // ── ADJUVANT ─────────────────────────────────────────────────────────
        'Atezolizumab-Bevacizumab-Adj': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [atezo(1), bev(2)]
        },

        // ── METASTATIC ───────────────────────────────────────────────────────
        'Atezolizumab-Bevacizumab-1L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [atezo(1), bev(2)]
        },
        'Durvalumab-Tremelimumab-1L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [durva(1), tremu(2)]
        },
        'Sorafenib-1L':            oral('low'),
        'Lenvatinib-1L':           oral('low'),
        'Durvalumab-Monotherapy-1L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [durva(1)]
        },
        'Tislelizumab-Monotherapy-1L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [tisl(1)]
        },
        'Cabozantinib-2L':         oral('low'),
        'Regorafenib-2L':          oral('moderate'),
        'Ramucirumab-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [ramu(1)]
        },
        'Ipilimumab-Nivolumab-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [ipi(1), nivo(2)]
        },
        'Nivolumab-Monotherapy-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [nivo(1)]
        },
        'Pembrolizumab-Monotherapy-2L': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [pembro(1)]
        },
        'FOLFOX4-Subsequent': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [oxali(1), leucov(2), fu5(3), fu5(4)]
            // fu5(3) = bolus, fu5(4) = 22h CI — matched by occurrence order
        },
        'Dostarlimab-MSI': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [dostar(1)]
        },
        'Selpercatinib-RET':        oral('low'),
        'Larotrectinib-NTRK':       oral('low'),
        'Entrectinib-NTRK':         oral('low'),
        'Repotrectinib-NTRK':       oral('low')
    };

})();
