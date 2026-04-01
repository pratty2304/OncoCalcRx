window.premedData = window.premedData || {};

window.premedData.merkel_cell = (function () {

    // ── Drug factory helpers ────────────────────────────────────────────────
    function pembro(seq)  { return { name: 'Pembrolizumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function nivo(seq)    { return { name: 'Nivolumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function ipi(seq)     { return { name: 'Ipilimumab', solvent: 'NS', volume: 250, duration: '90 min', sequence: seq }; }
    function avel(seq)    { return { name: 'Avelumab', solvent: 'NS', volume: 250, duration: '60 min', sequence: seq }; }
    function retif(seq)   { return { name: 'Retifanlimab', solvent: 'NS', volume: 250, duration: '30 min', sequence: seq }; }
    function etopo(seq)   { return { name: 'Etoposide', solvent: 'NS', volume: 500, duration: '60 min', sequence: seq }; }
    function cis(seq)     { return { name: 'Cisplatin', solvent: 'NS', volume: 500, duration: '1–2 hours', sequence: seq }; }
    function carbo(seq)   { return { name: 'Carboplatin', solvent: 'D5W', volume: 250, duration: '30–60 min', sequence: seq }; }
    function doxo(seq)    { return { name: 'Doxorubicin', solvent: 'NS', volume: '100mL / 250mL', duration: '15–30 min', sequence: seq }; }
    function vincr(seq)   { return { name: 'Vincristine', solvent: 'NS', volume: 50, duration: '10–15 min', sequence: seq }; }
    function cyclo(seq)   { return { name: 'Cyclophosphamide', solvent: 'NS', volume: 500, duration: '1–2 hours', sequence: seq }; }
    function mesna(seq)   { return { name: 'Mesna', solvent: 'NS', volume: 100, duration: '15 min (given with cyclophosphamide, then 4h and 8h post)', sequence: seq }; }
    function topo(seq)    { return { name: 'Topotecan', solvent: 'NS', volume: 250, duration: '30 min', sequence: seq }; }

    return {

        // ── NEOADJUVANT ──────────────────────────────────────────────────────

        'Avelumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                avel(1)
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

        // ── METASTATIC ───────────────────────────────────────────────────────
        // (adjuvant Avelumab and Pembrolizumab share the same protocol keys —
        //  single entry covers both settings)

        'Nivolumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                nivo(1)
            ]
        },

        'Retifanlimab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                retif(1)
            ]
        },

        'Ipilimumab-Nivolumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                ipi(1),
                nivo(2)
            ]
        },

        'EP': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                etopo(1),
                cis(2)
            ]
        },

        'EC': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                etopo(1),
                carbo(2)
            ]
        },

        'CAV': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                cyclo(1),
                mesna(2),
                doxo(3),
                vincr(4)
            ]
        },

        'Topotecan-Cyclophosphamide': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                topo(1),
                cyclo(2),
                mesna(3)
            ]
        }

    };
})();
