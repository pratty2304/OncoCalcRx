window.premedData = window.premedData || {};

window.premedData.vulvar_vaginal = (function () {

    // ── Drug factory helpers ────────────────────────────────────────────────
    function cis(seq)    { return { name: 'Cisplatin', solvent: 'NS', volume: 500, duration: '1–2 hours', sequence: seq }; }
    function carbo(seq)  { return { name: 'Carboplatin', solvent: 'D5W', volume: 250, duration: '30–60 min', sequence: seq }; }
    function pacli(seq)  { return { name: 'Paclitaxel', solvent: 'NS', volume: 500, duration: '3 hours', sequence: seq }; }
    function doce(seq)   { return { name: 'Docetaxel', solvent: 'NS', volume: 250, duration: '1 hour', sequence: seq }; }
    function bev(seq)    { return { name: 'Bevacizumab', solvent: 'NS', volume: 100, duration: '90 min (1st infusion); 60 min (2nd); 30 min thereafter if tolerated', sequence: seq }; }
    function bevOpt(seq) { return { name: 'Bevacizumab (optional)', solvent: 'NS', volume: 100, duration: '90 min (1st infusion); 60 min (2nd); 30 min thereafter if tolerated', sequence: seq }; }
    function pembro(seq) { return { name: 'Pembrolizumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function cemi(seq)   { return { name: 'Cemiplimab', solvent: 'NS', volume: 250, duration: '30 min', sequence: seq }; }
    function nivo(seq)   { return { name: 'Nivolumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function tiso(seq)   { return { name: 'Tisotumab vedotin', solvent: 'NS', volume: 250, duration: '30 min', sequence: seq }; }
    function gem(seq)    { return { name: 'Gemcitabine', solvent: 'NS', volume: 250, duration: '30 min', sequence: seq }; }
    function tdxd(seq)   { return { name: 'Trastuzumab deruxtecan', solvent: 'NS', volume: 250, duration: '90 min (1st infusion); 30 min thereafter if tolerated', sequence: seq }; }
    function mmc(seq)    { return { name: 'Mitomycin-C', solvent: 'NS', volume: 50, duration: '15–30 min (vesicant — ensure good IV access; avoid extravasation)', sequence: seq }; }
    function fu5CI(seq)  { return { name: '5-Fluorouracil', solvent: 'D5W', volume: 240, duration: 'CI D1–D4 via elastomeric pump during RT — consult pharmacy for rate and fill volume', sequence: seq }; }

    return {

        // ── DEFINITIVE (chemo-RT) ────────────────────────────────────────────

        'Cisplatin-RT': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                cis(1)
            ]
        },

        'Carboplatin-RT': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                carbo(1)
            ]
        },

        'Cisplatin-5FU-RT': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                cis(1),
                fu5CI(2)
            ]
        },

        'Mitomycin-Capecitabine-RT': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                mmc(1)
                // Capecitabine is oral — appears in Oral Chemotherapy section
            ]
        },

        // ── ADJUVANT ────────────────────────────────────────────────────────

        'Cisplatin-RT-Adjuvant': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                cis(1)
            ]
        },

        'Carboplatin-RT-Adjuvant': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                carbo(1)
            ]
        },

        // ── METASTATIC — IO + chemo combinations ─────────────────────────────

        'Pembrolizumab-Cisplatin-Paclitaxel-Bev': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                pembro(1),
                pacli(2),
                cis(3),
                bevOpt(4)
            ]
        },

        'Pembrolizumab-Carboplatin-Paclitaxel-Bev': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                pembro(1),
                pacli(2),
                carbo(3),
                bevOpt(4)
            ]
        },

        // ── METASTATIC — cytotoxic ± bevacizumab ─────────────────────────────

        'Cisplatin-Paclitaxel-Bevacizumab': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                pacli(1),
                cis(2),
                bev(3)
            ]
        },

        'Carboplatin-Paclitaxel-Bevacizumab': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                pacli(1),
                carbo(2),
                bev(3)
            ]
        },

        'Cisplatin-Paclitaxel': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                pacli(1),
                cis(2)
            ]
        },

        'Carboplatin-Paclitaxel': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                pacli(1),
                carbo(2)
            ]
        },

        'Cisplatin-5FU': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                cis(1),
                fu5CI(2)
            ]
        },

        'Cisplatin-Monotherapy': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                cis(1)
            ]
        },

        'Carboplatin-Monotherapy': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                carbo(1)
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

        'Cisplatin-Docetaxel': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                doce(1),
                cis(2)
            ]
        },

        // ── METASTATIC — IO monotherapy ───────────────────────────────────────

        'Pembrolizumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                pembro(1)
            ]
        },

        'Cemiplimab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                cemi(1)
            ]
        },

        'Nivolumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                nivo(1)
            ]
        },

        // ── METASTATIC — ADCs ─────────────────────────────────────────────────

        'Tisotumab-Vedotin': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                tiso(1)
            ]
        },

        'Trastuzumab-Deruxtecan': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                tdxd(1)
            ]
        },

        // ── METASTATIC — oral targeted ────────────────────────────────────────

        'Erlotinib': {
            label: null,
            emetogenicity: 'low',
            isOral: true,
            infusionDrugs: []
        },

        'Larotrectinib': {
            label: null,
            emetogenicity: 'low',
            isOral: true,
            infusionDrugs: []
        },

        'Entrectinib': {
            label: null,
            emetogenicity: 'low',
            isOral: true,
            infusionDrugs: []
        }

    };
})();
