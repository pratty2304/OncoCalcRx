window.premedData = window.premedData || {};

window.premedData.mesothelioma = (function () {

    // ── Drug factory helpers ────────────────────────────────────────────────
    function pemex(seq)  { return { name: 'Pemetrexed', solvent: 'NS', volume: 100, duration: '10 min', sequence: seq }; }
    function cis(seq)    { return { name: 'Cisplatin', solvent: 'NS', volume: 500, duration: '1–2 hours', sequence: seq }; }
    function carbo(seq)  { return { name: 'Carboplatin', solvent: 'D5W', volume: 250, duration: '30–60 min', sequence: seq }; }
    function bev(seq)    { return { name: 'Bevacizumab', solvent: 'NS', volume: 100, duration: '90 min (1st) / 60 min (2nd) / 30 min (subsequent)', sequence: seq }; }
    function nivo(seq)   { return { name: 'Nivolumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function ipi(seq)    { return { name: 'Ipilimumab', solvent: 'NS', volume: 250, duration: '90 min', sequence: seq }; }
    function pembro(seq) { return { name: 'Pembrolizumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function atezo(seq)  { return { name: 'Atezolizumab', solvent: 'NS', volume: 250, duration: '60 min (1st) / 30 min (subsequent)', sequence: seq }; }
    function gem(seq)    { return { name: 'Gemcitabine', solvent: 'NS', volume: 250, duration: '30 min', sequence: seq }; }
    function vino(seq)   { return { name: 'Vinorelbine', solvent: 'NS', volume: 125, duration: '6–10 min', sequence: seq }; }

    return {

        // ── NEOADJUVANT ──────────────────────────────────────────────────────
        // (Pemetrexed-Cisplatin and Pemetrexed-Carboplatin keys are shared
        //  across neoadjuvant, adjuvant and metastatic settings)

        'Pemetrexed-Cisplatin': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                pemex(1),
                cis(2)
                // Folic Acid and Vitamin B12 appear automatically in Oral Chemotherapy table
            ]
        },

        'Pemetrexed-Carboplatin': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                pemex(1),
                carbo(2)
            ]
        },

        // ── METASTATIC ───────────────────────────────────────────────────────

        'Nivolumab-Ipilimumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                nivo(1),
                ipi(2)
            ]
        },

        'Pemetrexed-Cisplatin-Bevacizumab': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                pemex(1),
                cis(2),
                bev(3)
            ]
        },

        'Pemetrexed-Carboplatin-Bevacizumab': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                pemex(1),
                carbo(2),
                bev(3)
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

        'Gemcitabine-Carboplatin': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                gem(1),
                carbo(2)
            ]
        },

        'Pemetrexed-Maintenance': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                pemex(1)
            ]
        },

        'Bevacizumab-Maintenance': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                bev(1)
            ]
        },

        'Pembrolizumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                pembro(1)
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

        'Atezolizumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                atezo(1)
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

        'Vinorelbine': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                vino(1)
            ]
        }

    };
})();
