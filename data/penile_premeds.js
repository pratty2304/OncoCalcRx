window.premedData = window.premedData || {};

window.premedData.penile = (function () {

    // ── Drug factory helpers ────────────────────────────────────────────────
    function pacli(seq)    { return { name: 'Paclitaxel', solvent: 'NS', volume: 500, duration: '3 hours', sequence: seq }; }
    function ifos(seq)     { return { name: 'Ifosfamide', solvent: 'NS', volume: 500, duration: '1–2 hours', sequence: seq }; }
    function mesnaIV(seq)  { return { name: 'Mesna (pre-dose)', solvent: 'NS', volume: 100, duration: '15 min (before ifosfamide)', sequence: seq }; }
    function mesna4h(seq)  { return { name: 'Mesna (4h post)', solvent: 'NS', volume: 100, duration: '15 min (4h after ifosfamide)', sequence: seq }; }
    function mesna8h(seq)  { return { name: 'Mesna (8h post)', solvent: 'NS', volume: 100, duration: '15 min (8h after ifosfamide)', sequence: seq }; }
    function cis(seq)      { return { name: 'Cisplatin', solvent: 'NS', volume: 500, duration: '1–2 hours', sequence: seq }; }
    function carbo(seq)    { return { name: 'Carboplatin', solvent: 'D5W', volume: 250, duration: '30–60 min', sequence: seq }; }
    function doce(seq)     { return { name: 'Docetaxel', solvent: 'NS', volume: 250, duration: '1 hour', sequence: seq }; }
    function fuCI(seq)     { return { name: '5-Fluorouracil', solvent: 'NS', volume: 250, duration: 'CI (D1–D4 or D1–D5 per schedule)', sequence: seq }; }
    function mmc(seq)      { return { name: 'Mitomycin-C', solvent: 'NS', volume: 50, duration: 'IV bolus over 5–10 min', sequence: seq }; }
    function pembro(seq)   { return { name: 'Pembrolizumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function oral(emeto)   { return { label: null, emetogenicity: emeto, isOral: true, infusionDrugs: [] }; }

    return {

        // ── NEOADJUVANT & ADJUVANT ───────────────────────────────────────────

        'TIP': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                mesnaIV(1),
                pacli(2),
                ifos(3),
                cis(4),
                mesna4h(5),
                mesna8h(6)
            ]
        },

        'Cisplatin-5FU': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                cis(1),
                fuCI(2)
            ]
        },

        // ── DEFINITIVE (CONCURRENT CHEMORADIATION) ───────────────────────────

        'Cisplatin-RT': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                cis(1)   // 40 mg/m² weekly radiosensitiser
            ]
        },

        '5FU-MMC-RT': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                mmc(1),
                fuCI(2)
            ]
        },

        'Capecitabine-RT': oral('low'),   // capecitabine PO concurrent with RT

        // ── METASTATIC ───────────────────────────────────────────────────────

        'TPF': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                doce(1),
                cis(2),
                fuCI(3)
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
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                pacli(1),
                carbo(2)
            ]
        },

        'Cisplatin-5FU-Pembrolizumab': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                pembro(1),
                cis(2),
                fuCI(3)
            ]
        },

        'Carboplatin-5FU-Pembrolizumab': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                pembro(1),
                carbo(2),
                fuCI(3)
            ]
        },

        'Paclitaxel': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                pacli(1)
            ]
        },

        'Docetaxel': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                doce(1)
            ]
        },

        'Pembrolizumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                pembro(1)
            ]
        }

    };
})();
