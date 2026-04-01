window.premedData = window.premedData || {};

window.premedData.ureteric_urethral = (function () {

    // ── Drug factory helpers ────────────────────────────────────────────────
    function gem(seq)    { return { name: 'Gemcitabine', solvent: 'NS', volume: 250, duration: '30 min', sequence: seq }; }
    function cis(seq)    { return { name: 'Cisplatin', solvent: 'NS', volume: 500, duration: '1–2 hours', sequence: seq }; }
    function carbo(seq)  { return { name: 'Carboplatin', solvent: 'D5W', volume: 250, duration: '30–60 min', sequence: seq }; }
    function mtx(seq)    { return { name: 'Methotrexate', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function vinb(seq)   { return { name: 'Vinblastine', solvent: 'NS', volume: 50, duration: '5–10 min slow IV push (vesicant — central line preferred)', sequence: seq }; }
    function doxo(seq)   { return { name: 'Doxorubicin', solvent: 'NS', volume: '100mL / 250mL', duration: '15–30 min', sequence: seq }; }
    function lv(seq)     { return { name: 'Leucovorin rescue', solvent: 'NS', volume: 100, duration: '15–30 min (24h after Methotrexate)', sequence: seq }; }
    function nivo(seq)   { return { name: 'Nivolumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function pembro(seq) { return { name: 'Pembrolizumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function avel(seq)   { return { name: 'Avelumab', solvent: 'NS', volume: 250, duration: '60 min (pre-medicate: antihistamine + paracetamol before each of first 4 infusions)', sequence: seq }; }
    function atezo(seq)  { return { name: 'Atezolizumab', solvent: 'NS', volume: 250, duration: '60 min (1st); 30 min thereafter if tolerated', sequence: seq }; }
    function ev(seq)     { return { name: 'Enfortumab Vedotin', solvent: 'NS', volume: 250, duration: '30 min', sequence: seq }; }
    function tdxd(seq)   { return { name: 'Trastuzumab deruxtecan', solvent: 'NS', volume: 250, duration: '90 min (1st infusion); 30 min thereafter if tolerated', sequence: seq }; }
    function mmc(seq)    { return { name: 'Mitomycin-C', solvent: 'NS', volume: 50, duration: '15–30 min (vesicant — ensure good IV access; avoid extravasation)', sequence: seq }; }
    function fu5CI(seq)  { return { name: '5-Fluorouracil', solvent: 'D5W', volume: 240, duration: 'Daily CI via elastomeric pump during RT — consult pharmacy for rate and fill volume', sequence: seq }; }
    function doce(seq)   { return { name: 'Docetaxel', solvent: 'NS', volume: 250, duration: '1 hour', sequence: seq }; }
    function pacli(seq)  { return { name: 'Paclitaxel', solvent: 'NS', volume: 500, duration: '3 hours', sequence: seq }; }

    return {

        // ── NEOADJUVANT ─────────────────────────────────────────────────────

        'ddMVAC': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                mtx(1),
                vinb(2),
                doxo(3),
                cis(4),
                lv(5)
            ]
        },

        'GC-Neoadjuvant': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                gem(1),
                cis(2)
            ]
        },

        // ── ADJUVANT ────────────────────────────────────────────────────────

        'GC-Adjuvant': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                gem(1),
                cis(2)
            ]
        },

        'GCa-Adjuvant': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                gem(1),
                carbo(2)
            ]
        },

        'Nivolumab-Adjuvant': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                nivo(1)
            ]
        },

        'Pembrolizumab-Adjuvant': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                pembro(1)
            ]
        },

        // ── DEFINITIVE (chemo-RT) ────────────────────────────────────────────

        'Cisplatin-RT': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                cis(1)
            ]
        },

        '5FU-MMC-RT': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                mmc(1),
                fu5CI(2)
            ]
        },

        // ── METASTATIC — first-line combinations ─────────────────────────────

        'Enfortumab-Vedotin-Pembrolizumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                pembro(1),
                ev(2)
            ]
        },

        'Gemcitabine-Cisplatin-Nivolumab': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                gem(1),
                cis(2),
                nivo(3)
            ]
        },

        'GC-Metastatic': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                gem(1),
                cis(2)
            ]
        },

        'GCa-Cisplatin-Ineligible': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                gem(1),
                carbo(2)
            ]
        },

        'GC-Split-Dose': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                gem(1),
                cis(2)
            ]
        },

        'MVAC': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                mtx(1),
                vinb(2),
                doxo(3),
                cis(4),
                lv(5)
            ]
        },

        // ── METASTATIC — IO maintenance / monotherapy ─────────────────────────

        'Avelumab-Maintenance': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                avel(1)
            ]
        },

        'Pembrolizumab-Monotherapy': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                pembro(1)
            ]
        },

        'Atezolizumab-Monotherapy': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                atezo(1)
            ]
        },

        'Nivolumab-Monotherapy': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                nivo(1)
            ]
        },

        // ── METASTATIC — ADCs ─────────────────────────────────────────────────

        'Enfortumab-Vedotin-Mono': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                ev(1)
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

        // ── METASTATIC — oral targeted ─────────────────────────────────────────

        'Erdafitinib': {
            label: null,
            emetogenicity: 'low',
            isOral: true,
            infusionDrugs: []
        },

        // ── METASTATIC — cytotoxics ───────────────────────────────────────────

        'Docetaxel-Monotherapy': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                doce(1)
            ]
        },

        'Paclitaxel-Monotherapy': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                pacli(1)
            ]
        }

    };
})();
