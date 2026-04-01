window.premedData = window.premedData || {};

window.premedData.pancreatic = (function () {

    // ── Drug factory helpers ────────────────────────────────────────────────
    function oxali(seq)   { return { name: 'Oxaliplatin', solvent: 'D5W', volume: 250, duration: '2 hours', sequence: seq }; }
    function iri(seq)     { return { name: 'Irinotecan', solvent: 'NS', volume: 250, duration: '90 min', sequence: seq }; }
    function liri(seq)    { return { name: 'Liposomal Irinotecan', solvent: 'D5W', volume: 500, duration: '90 min', sequence: seq }; }
    function lv(seq)      { return { name: 'Leucovorin', solvent: 'D5W', volume: 250, duration: '2 hours (concurrent with oxaliplatin or irinotecan via Y-site)', sequence: seq }; }
    function fuBolus(seq) { return { name: '5-Fluorouracil', solvent: 'NS', volume: 50, duration: 'IV push over 2–4 min', sequence: seq }; }
    function fuCI(seq)    { return { name: '5-Fluorouracil', solvent: 'NS', volume: 250, duration: '46h CI (Baxter LV5 pump — D5W)', sequence: seq }; }
    function gem(seq)     { return { name: 'Gemcitabine', solvent: 'NS', volume: 250, duration: '30 min', sequence: seq }; }
    function gemFDR(seq)  { return { name: 'Gemcitabine', solvent: 'NS', volume: 250, duration: '100 min (fixed dose rate: 10 mg/m²/min)', sequence: seq }; }
    function nabP(seq)    { return { name: 'Nab-paclitaxel', solvent: 'NS', volume: 100, duration: '30 min (no filter)', sequence: seq }; }
    function cis(seq)     { return { name: 'Cisplatin', solvent: 'NS', volume: 500, duration: '1–2 hours', sequence: seq }; }
    function pembro(seq)  { return { name: 'Pembrolizumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function zeno(seq)    { return { name: 'Zenocutuzumab', solvent: 'NS', volume: 250, duration: '2 hours (1st dose); 1 hour (subsequent doses if tolerated)', sequence: seq }; }
    function oral(emeto)  { return { label: null, emetogenicity: emeto, isOral: true, infusionDrugs: [] }; }

    return {

        // ── NEOADJUVANT & ADJUVANT ───────────────────────────────────────────

        'mFOLFIRINOX': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                oxali(1),
                iri(2),
                lv(3),
                fuBolus(4),
                fuCI(5)
            ]
        },

        'Gemcitabine-Nabpaclitaxel': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                nabP(1),
                gem(2)
            ]
        },

        'Gemcitabine-Capecitabine': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                gem(1)
                // Capecitabine → oral (appears in Oral Chemotherapy section)
            ]
        },

        'Gemcitabine': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                gem(1)
            ]
        },

        'Capecitabine-RT': oral('low'),   // capecitabine PO concurrent with RT

        'Gemcitabine-RT': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                gem(1)
            ]
        },

        '5FU-RT': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                fuCI(1)   // CI daily D1–D4 and D29–D32 concurrent with RT
            ]
        },

        // ── METASTATIC ───────────────────────────────────────────────────────

        'NALIRIFOX': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                liri(1),
                oxali(2),
                lv(3),
                fuBolus(4),
                fuCI(5)
            ]
        },

        'FDR-Gemcitabine': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                gemFDR(1)
            ]
        },

        '5FU-LV': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                lv(1),
                fuBolus(2),
                fuCI(3)
            ]
        },

        'Capecitabine': oral('low'),

        'Gemcitabine-Erlotinib': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                gem(1)
                // Erlotinib → oral (appears in Oral Chemotherapy section)
            ]
        },

        'Liposomal-Irinotecan-5FU-LV': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                liri(1),
                lv(2),
                fuBolus(3),
                fuCI(4)
            ]
        },

        'mFOLFOX6': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                oxali(1),
                lv(2),
                fuBolus(3),
                fuCI(4)
            ]
        },

        'mFOLFIRI': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                iri(1),
                lv(2),
                fuBolus(3),
                fuCI(4)
            ]
        },

        'Gemcitabine-Cisplatin': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                gem(1),
                cis(2)
            ]
        },

        'Nabpaclitaxel-Gemcitabine-Cisplatin': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                nabP(1),
                gem(2),
                cis(3)
            ]
        },

        'Olaparib':      oral('low'),
        'Pembrolizumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                pembro(1)
            ]
        },
        'Sotorasib':  oral('low'),
        'Adagrasib':  oral('moderate'),

        'Zenocutuzumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                zeno(1)
            ]
        }

    };
})();
