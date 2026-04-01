window.premedData = window.premedData || {};

window.premedData.neuroendocrine = (function () {

    // ── Drug factory helpers ────────────────────────────────────────────────
    function strep(seq)  { return { name: 'Streptozocin', solvent: 'NS', volume: 250, duration: '30–60 min', sequence: seq }; }
    function fu(seq)     { return { name: '5-Fluorouracil', solvent: 'NS', volume: 250, duration: '30 min', sequence: seq }; }
    function fuBolus(seq){ return { name: '5-Fluorouracil bolus', solvent: 'NS', volume: 50, duration: 'IV push over 2–4 min', sequence: seq }; }
    function fuCI(seq)   { return { name: '5-Fluorouracil infusion', solvent: 'NS', volume: 250, duration: '46h CI (Baxter LV5 pump — D5W)', sequence: seq }; }
    function doxo(seq)   { return { name: 'Doxorubicin', solvent: 'NS', volume: '100mL / 250mL', duration: '15–30 min', sequence: seq }; }
    function dtic(seq)   { return { name: 'Dacarbazine', solvent: 'D5W', volume: 250, duration: '30–60 min (light-protected bag and line)', sequence: seq }; }
    function cis(seq)    { return { name: 'Cisplatin', solvent: 'NS', volume: 500, duration: '1–2 hours', sequence: seq }; }
    function carbo(seq)  { return { name: 'Carboplatin', solvent: 'D5W', volume: 250, duration: '30–60 min', sequence: seq }; }
    function etopo(seq)  { return { name: 'Etoposide', solvent: 'NS', volume: 500, duration: '60 min', sequence: seq }; }
    function iri(seq)    { return { name: 'Irinotecan', solvent: 'NS', volume: 250, duration: '90 min', sequence: seq }; }
    function cyclo(seq)  { return { name: 'Cyclophosphamide', solvent: 'NS', volume: 500, duration: '1–2 hours', sequence: seq }; }
    function mesna(seq)  { return { name: 'Mesna', solvent: 'NS', volume: 100, duration: '15 min (given with cyclophosphamide, then 4h and 8h post)', sequence: seq }; }
    function vincr(seq)  { return { name: 'Vincristine', solvent: 'NS', volume: 50, duration: '15 min (cap at 2 mg)', sequence: seq }; }
    function oxali(seq)  { return { name: 'Oxaliplatin', solvent: 'D5W', volume: 250, duration: '2 hours', sequence: seq }; }
    function lv(seq)     { return { name: 'Leucovorin', solvent: 'D5W', volume: 250, duration: '2 hours (concurrent with oxaliplatin or irinotecan via Y-site)', sequence: seq }; }
    function lu177(seq)  { return { name: 'Lutetium Lu 177 Dotatate', solvent: 'NS', volume: 100, duration: '30 min (nuclear medicine facility; radiation safety precautions)', sequence: seq }; }
    function aa(seq)     { return { name: 'Amino Acid Solution (renal protection)', solvent: 'NS', volume: 1000, duration: 'Start 30 min before Lu-177; infuse over 4 hours total (for renal protection)', sequence: seq }; }
    function oral(emeto) { return { label: null, emetogenicity: emeto, isOral: true, infusionDrugs: [] }; }

    return {

        // ── SOMATOSTATIN ANALOGUES (IM/SC injection — no IV) ────────────────
        'Octreotide-LAR':       oral('low'),
        'Lanreotide':           oral('low'),
        'Interferon-Alpha':     oral('low'),   // SC injection

        // ── ORAL TARGETED / HORMONAL ─────────────────────────────────────────
        'Everolimus':           oral('low'),
        'Everolimus-Octreotide': oral('low'),
        'Sunitinib':            oral('low'),
        'Cabozantinib':         oral('low'),
        'Lenvatinib':           oral('low'),
        'Pazopanib':            oral('low'),
        'Sorafenib':            oral('low'),
        'Belzutifan':           oral('low'),
        'Capecitabine-Temozolomide': oral('low'),
        'Temozolomide':         oral('moderate'),   // oral alkylating; moderate emetogenicity

        // ── Lu-177 DOTATATE (PRRT — IV with renal amino acid protection) ────
        'Lutetium-177': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                aa(1),
                lu177(2)
            ]
        },

        // ── IV CYTOTOXIC REGIMENS ────────────────────────────────────────────

        'Streptozocin-5FU': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                strep(1),
                fu(2)
            ]
        },

        'Streptozocin-Doxorubicin': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                strep(1),
                doxo(2)
            ]
        },

        'Dacarbazine': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                dtic(1)
            ]
        },

        'Cisplatin-Etoposide': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                etopo(1),
                cis(2)
            ]
        },

        'Carboplatin-Etoposide': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                etopo(1),
                carbo(2)
            ]
        },

        'Irinotecan-Cisplatin': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                iri(1),
                cis(2)
            ]
        },

        'Cyclophosphamide-Doxorubicin-Vincristine': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                cyclo(1),
                mesna(2),
                doxo(3),
                vincr(4)
                // Mesna also given 4h and 8h post-cyclophosphamide
            ]
        },

        'FOLFOX': {
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

        'FOLFIRI': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                iri(1),
                lv(2),
                fuBolus(3),
                fuCI(4)
            ]
        }

    };
})();
