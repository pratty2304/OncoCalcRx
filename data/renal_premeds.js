window.premedData = window.premedData || {};

window.premedData.renal = (function () {

    // ── Drug factory helpers ────────────────────────────────────────────────
    function nivo(seq)   { return { name: 'Nivolumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function ipi(seq)    { return { name: 'Ipilimumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function pembro(seq) { return { name: 'Pembrolizumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function avel(seq)   { return { name: 'Avelumab', solvent: 'NS', volume: 250, duration: '60 min (pre-medicate: antihistamine + paracetamol before each of first 4 infusions)', sequence: seq }; }
    function bev(seq)    { return { name: 'Bevacizumab', solvent: 'NS', volume: 100, duration: '90 min (1st); 60 min (2nd); 30 min thereafter if tolerated', sequence: seq }; }
    function oral(emeto) { return { label: null, emetogenicity: emeto, isOral: true, infusionDrugs: [] }; }

    return {

        // ── ADJUVANT ─────────────────────────────────────────────────────────

        'Pembrolizumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                pembro(1)
            ]
        },

        // ── METASTATIC — IO monotherapy / IO + TKI combos ────────────────────

        'Nivolumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                nivo(1)
            ]
        },

        'Nivolumab-Ipilimumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                nivo(1),
                ipi(2)
                // Ipilimumab given concurrently for 4 induction doses only
            ]
        },

        'Lenvatinib-Pembrolizumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                pembro(1)
                // Lenvatinib → oral (appears in Oral Chemotherapy section)
            ]
        },

        'Nivolumab-Cabozantinib': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                nivo(1)
                // Cabozantinib → oral (appears in Oral Chemotherapy section)
            ]
        },

        'Pembrolizumab-Axitinib': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                pembro(1)
                // Axitinib → oral (appears in Oral Chemotherapy section)
            ]
        },

        'Avelumab-Axitinib': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                avel(1)
                // Axitinib → oral (appears in Oral Chemotherapy section)
            ]
        },

        'Erlotinib-Bevacizumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                bev(1)
                // Erlotinib → oral (appears in Oral Chemotherapy section)
            ]
        },

        // ── METASTATIC — oral TKIs / mTOR / HIF-2α inhibitors ───────────────

        'Cabozantinib':        oral('low'),
        'Sunitinib':           oral('low'),
        'Pazopanib':           oral('low'),
        'Axitinib':            oral('low'),
        'Sorafenib':           oral('low'),
        'Tivozanib':           oral('low'),
        'Lenvatinib-Everolimus': oral('low'),
        'Everolimus':          oral('low'),
        'Belzutifan':          oral('low'),
        'Belzutifan-VHL':      oral('low')

    };
})();
