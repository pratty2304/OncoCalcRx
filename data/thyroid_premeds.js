window.premedData = window.premedData || {};

window.premedData.thyroid = (function () {

    // ── Drug factory helpers ────────────────────────────────────────────────
    function pembro(seq) { return { name: 'Pembrolizumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function peme(seq)   { return { name: 'Pemetrexed', solvent: 'NS', volume: 100, duration: '10 min (folic acid + B12 supplementation mandatory — see alert)', sequence: seq }; }
    function carbo(seq)  { return { name: 'Carboplatin', solvent: 'D5W', volume: 250, duration: '30–60 min', sequence: seq }; }
    function doxo(seq)   { return { name: 'Doxorubicin', solvent: 'NS', volume: '100mL / 250mL', duration: '15–30 min', sequence: seq }; }
    function cis(seq)    { return { name: 'Cisplatin', solvent: 'NS', volume: 500, duration: '1–2 hours', sequence: seq }; }
    function pacli(seq)  { return { name: 'Paclitaxel', solvent: 'NS', volume: 500, duration: '3 hours', sequence: seq }; }
    function pacliW(seq) { return { name: 'Paclitaxel', solvent: 'NS', volume: 250, duration: '1 hour (weekly)', sequence: seq }; }
    function doce(seq)   { return { name: 'Docetaxel', solvent: 'NS', volume: 250, duration: '1 hour', sequence: seq }; }
    function oral(emeto) { return { label: null, emetogenicity: emeto, isOral: true, infusionDrugs: [] }; }

    return {

        // ── DIFFERENTIATED (DTC) — oral targeted agents ─────────────────────

        'Lenvatinib-DTC':           oral('low'),
        'Sorafenib-DTC':            oral('low'),
        'Cabozantinib-DTC':         oral('low'),
        'Selpercatinib-RET-DTC':    oral('low'),
        'Pralsetinib-RET-DTC':      oral('low'),
        'Larotrectinib-NTRK-DTC':   oral('low'),
        'Entrectinib-NTRK-DTC':     oral('low'),
        'Repotrectinib-NTRK-DTC':   oral('low'),
        'Dabrafenib-Trametinib-DTC': oral('low'),

        // Pembrolizumab + Lenvatinib (IV + oral)
        'Pembrolizumab-Lenvatinib-DTC': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                pembro(1)
                // Lenvatinib → oral (appears in Oral Chemotherapy section)
            ]
        },

        // Pemetrexed + Carboplatin (IV doublet)
        'Pemetrexed-Carboplatin-DTC': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                peme(1),
                carbo(2)
                // Folic Acid + Vitamin B12 → appear in Oral Chemotherapy section
            ]
        },

        // ── MEDULLARY (MTC) — oral targeted agents ──────────────────────────

        'Selpercatinib-RET-MTC':    oral('low'),
        'Vandetanib-MTC':           oral('low'),
        'Cabozantinib-MTC':         oral('low'),
        'Sorafenib-MTC':            oral('low'),
        'Lenvatinib-MTC':           oral('low'),
        'Sunitinib-MTC':            oral('low'),
        'Larotrectinib-NTRK-MTC':   oral('low'),
        'Entrectinib-NTRK-MTC':     oral('low'),

        'Pembrolizumab-TMB-MTC': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                pembro(1)
            ]
        },

        'Dacarbazine-MTC': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                { name: 'Dacarbazine', solvent: 'NS', volume: 250, duration: '30–60 min (protect from light)', sequence: 1 }
            ]
        },

        // ── ANAPLASTIC (ATC) — oral targeted agents ─────────────────────────

        'Dabrafenib-Trametinib-ATC': oral('low'),
        'Selpercatinib-RET-ATC':     oral('low'),
        'Pralsetinib-RET-ATC':       oral('low'),
        'Larotrectinib-NTRK-ATC':    oral('low'),
        'Entrectinib-NTRK-ATC':      oral('low'),
        'Repotrectinib-NTRK-ATC':    oral('low'),
        'Lenvatinib-ATC':            oral('low'),
        'Sorafenib-ATC':             oral('low'),
        'Cabozantinib-ATC':          oral('low'),

        'Pembrolizumab-ATC': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                pembro(1)
            ]
        },

        // ── ANAPLASTIC (ATC) — IV cytotoxics ────────────────────────────────

        'Doxorubicin-Cisplatin-ATC': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                doxo(1),
                cis(2)
            ]
        },

        'Paclitaxel-Carboplatin-ATC': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                pacli(1),
                carbo(2)
            ]
        },

        'Paclitaxel-Weekly-ATC': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                pacliW(1)
            ]
        },

        'Doxorubicin-ATC': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                doxo(1)
            ]
        },

        'Docetaxel-ATC': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                doce(1)
            ]
        }

    };
})();
