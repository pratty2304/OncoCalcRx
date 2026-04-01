window.premedData = window.premedData || {};

window.premedData.thymoma = (function () {

    // ── Drug factory helpers ────────────────────────────────────────────────
    function cyclo(seq)  { return { name: 'Cyclophosphamide', solvent: 'NS', volume: 250, duration: '30–60 min', sequence: seq }; }
    function doxo(seq)   { return { name: 'Doxorubicin', solvent: 'NS', volume: '100mL / 250mL', duration: '15–30 min', sequence: seq }; }
    function cis(seq)    { return { name: 'Cisplatin', solvent: 'NS', volume: 500, duration: '1–2 hours', sequence: seq }; }
    function vincr(seq)  { return { name: 'Vincristine', solvent: 'NS', volume: 50, duration: '5–10 min IV push (vesicant — central line preferred; max 2mg)', sequence: seq }; }
    function etopo(seq)  { return { name: 'Etoposide', solvent: 'NS', volume: 500, duration: '60–90 min (max 0.4 mg/mL; never IV bolus)', sequence: seq }; }
    function ifos(seq)   { return { name: 'Ifosfamide', solvent: 'NS', volume: 500, duration: '3 hours (concurrent with Mesna)', sequence: seq }; }
    function mesna(seq)  { return { name: 'Mesna', solvent: 'NS', volume: 250, duration: 'Concurrent with Ifosfamide; 4h post-dose; 8h post-dose', sequence: seq }; }
    function pacli(seq)  { return { name: 'Paclitaxel', solvent: 'NS', volume: 500, duration: '3 hours', sequence: seq }; }
    function carbo(seq)  { return { name: 'Carboplatin', solvent: 'D5W', volume: 250, duration: '30–60 min', sequence: seq }; }
    function ramu(seq)   { return { name: 'Ramucirumab', solvent: 'NS', volume: 250, duration: '60 min (initial rate 25 mL/hr × 15 min, then increase; pre-medicate with diphenhydramine IV for first 2 infusions)', sequence: seq }; }
    function pembro(seq) { return { name: 'Pembrolizumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function avel(seq)   { return { name: 'Avelumab', solvent: 'NS', volume: 250, duration: '60 min (pre-medicate: antihistamine + paracetamol before each of first 4 infusions)', sequence: seq }; }
    function peme(seq)   { return { name: 'Pemetrexed', solvent: 'NS', volume: 100, duration: '10 min (folic acid + B12 supplementation mandatory — see alert)', sequence: seq }; }
    function gem(seq)    { return { name: 'Gemcitabine', solvent: 'NS', volume: 250, duration: '30 min', sequence: seq }; }
    function lv(seq)     { return { name: 'Leucovorin', solvent: 'NS', volume: 250, duration: '2 hours (concurrent with oxaliplatin via Y-site, or run separately)', sequence: seq }; }
    function fu5B(seq)   { return { name: '5-Fluorouracil', solvent: 'NS', volume: 100, duration: 'IV bolus over 3–5 min (after leucovorin)', sequence: seq }; }
    function fu5CI(seq)  { return { name: '5-Fluorouracil (continuous infusion)', solvent: 'D5W', volume: 240, duration: '46h CI · Baxter Infusor LV5 at 5 mL/h', sequence: seq }; }
    function oral(emeto) { return { label: null, emetogenicity: emeto, isOral: true, infusionDrugs: [] }; }

    return {

        // ── NEOADJUVANT ─────────────────────────────────────────────────────

        'CAP': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                cyclo(1),
                doxo(2),
                cis(3)
            ]
        },

        'ADOC': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                doxo(1),
                cis(2),
                vincr(3),
                cyclo(4)
            ]
        },

        'Cisplatin-Etoposide': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                cis(1),
                etopo(2)
            ]
        },

        'VIP': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                etopo(1),
                ifos(2),
                mesna(3),
                cis(4)
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

        // ── METASTATIC — cytotoxic combinations ─────────────────────────────

        'Carboplatin-Paclitaxel-Ramucirumab': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                ramu(1),
                pacli(2),
                carbo(3)
                // Ramucirumab continues as maintenance
            ]
        },

        'Pemetrexed-Single': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                peme(1)
                // Folic Acid → oral daily (appears in Oral Chemotherapy section)
                // Vitamin B12 → IM injection (appears in Oral Chemotherapy section)
            ]
        },

        'Gemcitabine-Capecitabine': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                gem(1)
                // Capecitabine → oral (appears in Oral Chemotherapy section)
            ]
        },

        'Gemcitabine-Single': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                gem(1)
            ]
        },

        '5FU-Leucovorin': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                lv(1),
                fu5B(2),
                fu5CI(3)
            ]
        },

        'Paclitaxel-Single': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                pacli(1)
            ]
        },

        'Etoposide-Single': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                etopo(1)
            ]
        },

        'Ifosfamide-Single': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                ifos(1),
                mesna(2)
            ]
        },

        // ── METASTATIC — IO / targeted (IV component) ────────────────────────

        'Pembrolizumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                pembro(1)
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

        'Lenvatinib-Pembrolizumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                pembro(1)
                // Lenvatinib → oral (appears in Oral Chemotherapy section)
            ]
        },

        // ── METASTATIC — oral / IM agents ───────────────────────────────────

        'Everolimus':  oral('low'),
        'Sunitinib':   oral('low'),
        'Lenvatinib':  oral('low'),
        'Octreotide':  oral('low')   // IM monthly injection → isOral: true flows to Oral Chemotherapy section

    };
})();
