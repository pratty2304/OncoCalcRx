window.premedData = window.premedData || {};

window.premedData.ovarian = (function () {

    // ── Drug factory helpers ────────────────────────────────────────────────
    function carbo(seq)  { return { name: 'Carboplatin', solvent: 'D5W', volume: 250, duration: '30–60 min', sequence: seq }; }
    function pacli(seq)  { return { name: 'Paclitaxel', solvent: 'NS', volume: 500, duration: '3 hours', sequence: seq }; }
    function pacliW(seq) { return { name: 'Paclitaxel', solvent: 'NS', volume: 250, duration: '1 hour', sequence: seq }; }
    function doce(seq)   { return { name: 'Docetaxel', solvent: 'NS', volume: 250, duration: '1 hour', sequence: seq }; }
    function bev(seq)    { return { name: 'Bevacizumab', solvent: 'NS', volume: 100, duration: '90 min (1st); 60 min (2nd); 30 min thereafter if tolerated', sequence: seq }; }
    function durva(seq)  { return { name: 'Durvalumab', solvent: 'NS', volume: 250, duration: '60 min', sequence: seq }; }
    function cyclo(seq)  { return { name: 'Cyclophosphamide', solvent: 'NS', volume: 500, duration: '1 hour', sequence: seq }; }
    function bleo(seq)   { return { name: 'Bleomycin', solvent: 'NS', volume: 50, duration: '15–30 min', sequence: seq }; }
    function etopo(seq)  { return { name: 'Etoposide', solvent: 'NS', volume: 500, duration: '60 min', sequence: seq }; }
    function cis(seq)    { return { name: 'Cisplatin', solvent: 'NS', volume: 500, duration: '1–2 hours', sequence: seq }; }
    function gem(seq)    { return { name: 'Gemcitabine', solvent: 'NS', volume: 250, duration: '30 min', sequence: seq }; }
    function pld(seq)    { return { name: 'Pegylated Liposomal Doxorubicin', solvent: 'D5W', volume: 250, duration: '60 min (start at 1 mg/min for first 15 min; if no reaction, infuse remainder over 60 min total; max rate 1 mg/min)', sequence: seq }; }
    function topo(seq)   { return { name: 'Topotecan', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function mirv(seq)   { return { name: 'Mirvetuximab Soravtansine', solvent: 'NS', volume: 250, duration: '3 hours (0.2 micron in-line filter required)', sequence: seq }; }
    function pemex(seq)  { return { name: 'Pemetrexed', solvent: 'NS', volume: 100, duration: '10 min', sequence: seq }; }
    function pembro(seq) { return { name: 'Pembrolizumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function oral(emeto) { return { label: null, emetogenicity: emeto, isOral: true, infusionDrugs: [] }; }

    return {

        // ── PRIMARY TREATMENT ───────────────────────────────────────────────

        'Carboplatin-Paclitaxel': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                pacli(1),
                carbo(2)
            ]
        },

        'Carboplatin-Paclitaxel-DoseDense': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                pacliW(1),
                carbo(2)
            ]
        },

        'Docetaxel-Carboplatin': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                doce(1),
                carbo(2)
            ]
        },

        'Bevacizumab-Carboplatin-Paclitaxel': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                pacli(1),
                carbo(2),
                bev(3)
            ]
        },

        'DUO-O': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                durva(1),
                pacli(2),
                carbo(3),
                bev(4)
                // Olaparib → oral (appears in Oral Chemotherapy section)
            ]
        },

        'IP-Cisplatin-Paclitaxel': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                { name: 'Paclitaxel (IV)', solvent: 'NS', volume: 500, duration: '3 hours (D1 — IV)', sequence: 1 },
                { name: 'Cisplatin (IP)', solvent: 'NS (warm, 2L)', volume: 2000, duration: 'IP instillation over 1 hour (D2 — specialized facility)', sequence: 2 },
                { name: 'Paclitaxel (IP)', solvent: 'NS (warm, 2L)', volume: 2000, duration: 'IP instillation over 1 hour (D8 — specialized facility)', sequence: 3 }
            ]
        },

        'Carboplatin-Cyclophosphamide': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                cyclo(1),
                carbo(2)
            ]
        },

        'BEP': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                bleo(1),
                etopo(2),
                cis(3)
            ]
        },

        // ── MAINTENANCE ─────────────────────────────────────────────────────

        'Olaparib-Bevacizumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                bev(1)
                // Olaparib → oral (appears in Oral Chemotherapy section)
            ]
        },

        'Niraparib-Bevacizumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                bev(1)
                // Niraparib → oral (appears in Oral Chemotherapy section)
            ]
        },

        'Olaparib':  oral('low'),
        'Niraparib': oral('low'),
        'Rucaparib': oral('low'),

        'Bevacizumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                bev(1)
            ]
        },

        // ── RECURRENT / PROGRESSIVE ─────────────────────────────────────────

        'Carboplatin-PLD': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                pld(1),
                carbo(2)
            ]
        },

        'Carboplatin-Gemcitabine': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                gem(1),
                carbo(2)
            ]
        },

        'Carboplatin-Gemcitabine-Bevacizumab': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                gem(1),
                carbo(2),
                bev(3)
            ]
        },

        'Carboplatin-Docetaxel': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                doce(1),
                carbo(2)
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

        'Mirvetuximab-Soravtansine': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                mirv(1)
            ]
        },

        'Pembrolizumab-Paclitaxel': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                pembro(1),
                pacliW(2)
            ]
        },

        'Pembrolizumab-Paclitaxel-Bevacizumab': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                pembro(1),
                pacliW(2),
                bev(3)
            ]
        },

        'Paclitaxel-Bevacizumab': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                pacliW(1),
                bev(2)
            ]
        },

        'PLD': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                pld(1)
            ]
        },

        'Topotecan': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                topo(1)
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

        'Docetaxel': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                doce(1)
            ]
        },

        'Etoposide': oral('low'),   // oral etoposide (50 mg/m² PO)

        'Pemetrexed': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                pemex(1)
                // Folic Acid, Vitamin B12 → supplementation (appears in Oral Chemotherapy section)
            ]
        },

        'Altretamine':             oral('moderate'),
        'Avutometinib-Defactinib': oral('low')

    };
})();
