window.premedData = window.premedData || {};

window.premedData.testicular = (function () {

    // ── Drug factory helpers ────────────────────────────────────────────────
    function bleo(seq)     { return { name: 'Bleomycin', solvent: 'NS', volume: 100, duration: '10–15 min slow infusion (test dose 1–2 units IM/IV before first cycle; observe 60 min)', sequence: seq }; }
    function etopo(seq)    { return { name: 'Etoposide', solvent: 'NS', volume: 500, duration: '60–90 min (max 0.4 mg/mL; never IV bolus)', sequence: seq }; }
    function etopoHD(seq)  { return { name: 'Etoposide', solvent: 'NS', volume: 1000, duration: '90–120 min (max 0.4 mg/mL; high-dose with ASCT)', sequence: seq }; }
    function cis(seq)      { return { name: 'Cisplatin', solvent: 'NS', volume: 500, duration: '1–2 hours', sequence: seq }; }
    function carbo(seq)    { return { name: 'Carboplatin', solvent: 'D5W', volume: 250, duration: '30–60 min', sequence: seq }; }
    function carboHD(seq)  { return { name: 'Carboplatin', solvent: 'D5W', volume: 500, duration: '60 min (high-dose with ASCT — carboplatin dose in mg, not AUC; pharmacy to verify)', sequence: seq }; }
    function ifos(seq)     { return { name: 'Ifosfamide', solvent: 'NS', volume: 500, duration: '3 hours (concurrent with Mesna)', sequence: seq }; }
    function mesna(seq)    { return { name: 'Mesna', solvent: 'NS', volume: 250, duration: 'Concurrent with Ifosfamide; 4h post-dose; 8h post-dose', sequence: seq }; }
    function pacliCI(seq)  { return { name: 'Paclitaxel', solvent: 'NS', volume: 500, duration: '24-hour CI via infusion pump (D1 only; non-PVC non-DEHP tubing + 0.22µm in-line filter mandatory)', sequence: seq }; }
    function pacli(seq)    { return { name: 'Paclitaxel', solvent: 'NS', volume: 250, duration: '1 hour', sequence: seq }; }
    function gem(seq)      { return { name: 'Gemcitabine', solvent: 'NS', volume: 250, duration: '30 min', sequence: seq }; }
    function oxali(seq)    { return { name: 'Oxaliplatin', solvent: 'D5W', volume: 250, duration: '2 hours (never in NS — causes precipitation)', sequence: seq }; }
    function vinb(seq)     { return { name: 'Vinblastine', solvent: 'NS', volume: 50, duration: '5–10 min slow IV push (vesicant — central line preferred)', sequence: seq }; }
    function pembro(seq)   { return { name: 'Pembrolizumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }

    return {

        // ── ADJUVANT ────────────────────────────────────────────────────────

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

        'Carboplatin': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                carbo(1)
            ]
        },

        // ── METASTATIC — first-line ─────────────────────────────────────────

        'EP': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                etopo(1),
                cis(2)
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

        // ── METASTATIC — salvage ────────────────────────────────────────────

        'TIP': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                pacliCI(1),   // D1: Paclitaxel 250mg/m² 24h CI
                ifos(2),      // D2–D5: Ifosfamide + Mesna + Cisplatin
                mesna(3),
                cis(4)
            ]
        },

        'VeIP': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                vinb(1),
                ifos(2),
                mesna(3),
                cis(4)
            ]
        },

        'Paclitaxel-Gemcitabine-Oxaliplatin': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                pacli(1),
                gem(2),
                oxali(3)
            ]
        },

        'Paclitaxel-Gemcitabine': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                pacli(1),
                gem(2)
            ]
        },

        'Gemcitabine-Oxaliplatin': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                gem(1),
                oxali(2)
            ]
        },

        // ── METASTATIC — high-dose with ASCT ───────────────────────────────

        'HD-CE': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                carboHD(1),
                etopoHD(2)
            ]
        },

        // ── METASTATIC — cisplatin-ineligible / oral / IO ──────────────────

        'Carboplatin-Etoposide': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                carbo(1),
                etopo(2)
            ]
        },

        'Etoposide-Oral': {
            label: null,
            emetogenicity: 'low',
            isOral: true,
            infusionDrugs: []
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
