window.premedData = window.premedData || {};

window.premedData.sarcoma = (function () {

    // ── Drug factory helpers ────────────────────────────────────────────────
    function doxo(seq)   { return { name: 'Doxorubicin', solvent: 'NS', volume: '100mL / 250mL', duration: '15–30 min', sequence: seq }; }
    function ifos(seq)   { return { name: 'Ifosfamide', solvent: 'NS', volume: 500, duration: '3 hours (concurrent with Mesna)', sequence: seq }; }
    function mesna(seq)  { return { name: 'Mesna', solvent: 'NS', volume: 250, duration: 'Concurrent with Ifosfamide; 4h post-dose; 8h post-dose', sequence: seq }; }
    function dacarbazine(seq) { return { name: 'Dacarbazine (DTIC)', solvent: 'NS', volume: 250, duration: '30–60 min (protect from light)', sequence: seq }; }
    function gem(seq)    { return { name: 'Gemcitabine', solvent: 'NS', volume: 250, duration: '30 min', sequence: seq }; }
    function doce(seq)   { return { name: 'Docetaxel', solvent: 'NS', volume: 250, duration: '1 hour', sequence: seq }; }
    function epirub(seq) { return { name: 'Epirubicin', solvent: 'NS', volume: '100mL / 250mL', duration: '15–30 min', sequence: seq }; }
    function trabe(seq)  { return { name: 'Trabectedin', solvent: 'D5W', volume: 500, duration: '24 hours via central line', sequence: seq }; }
    function erib(seq)   { return { name: 'Eribulin', solvent: 'NS', volume: 100, duration: '2–5 min IV push or 5 min infusion', sequence: seq }; }
    function doxoL(seq)  { return { name: 'Doxorubicin liposomal', solvent: 'D5W', volume: 250, duration: '60–90 min (initial rate 1mg/min; escalate if no infusion reaction)', sequence: seq }; }
    function vino(seq)   { return { name: 'Vinorelbine', solvent: 'NS', volume: 50, duration: '6–10 min', sequence: seq }; }
    function doceS(seq)  { return { name: 'Docetaxel', solvent: 'NS', volume: 250, duration: '1 hour', sequence: seq }; }
    function pacli(seq)  { return { name: 'Paclitaxel', solvent: 'NS', volume: 250, duration: '1 hour (weekly)', sequence: seq }; }
    function pacli3(seq) { return { name: 'Paclitaxel', solvent: 'NS', volume: 500, duration: '3 hours', sequence: seq }; }
    function carbo(seq)  { return { name: 'Carboplatin', solvent: 'D5W', volume: 250, duration: '30–60 min', sequence: seq }; }
    function bev(seq)    { return { name: 'Bevacizumab', solvent: 'NS', volume: 100, duration: '90 min (1st); 60 min (2nd); 30 min thereafter if tolerated', sequence: seq }; }
    function temsi(seq)  { return { name: 'Temsirolimus', solvent: 'NS', volume: 250, duration: '30–60 min IV weekly', sequence: seq }; }
    function atezo(seq)  { return { name: 'Atezolizumab', solvent: 'NS', volume: 250, duration: '60 min (1st); 30 min thereafter if tolerated', sequence: seq }; }
    function pembro(seq) { return { name: 'Pembrolizumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function nivo(seq)   { return { name: 'Nivolumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function ipi(seq)    { return { name: 'Ipilimumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    // Afamitresgene lymphodepletion
    function fluda(seq)  { return { name: 'Fludarabine', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function cyclo(seq)  { return { name: 'Cyclophosphamide', solvent: 'NS', volume: 250, duration: '30–60 min', sequence: seq }; }
    function afami(seq)  { return { name: 'Afamitresgene autoleucel', solvent: 'NS', volume: 100, duration: 'Single IV infusion — requires certified cell therapy centre; patient ID verification with 2 identifiers', sequence: seq }; }
    function oral(emeto) { return { label: null, emetogenicity: emeto, isOral: true, infusionDrugs: [] }; }

    return {

        // ── NEOADJUVANT & ADJUVANT ─────────────────────────────────────────

        'Doxorubicin-Ifosfamide': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                doxo(1),
                ifos(2),
                mesna(3)
            ]
        },

        'Doxorubicin': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                doxo(1)
            ]
        },

        'MAID': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                doxo(1),
                ifos(2),
                mesna(3),
                dacarbazine(4)
            ]
        },

        // ── METASTATIC — cytotoxic regimens ────────────────────────────────

        'Doxorubicin-Dacarbazine': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                doxo(1),
                dacarbazine(2)
            ]
        },

        'Doxorubicin-Trabectedin': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                doxo(1),
                trabe(2)
                // Trabectedin maintenance → same infusion entry continues
            ]
        },

        'Gemcitabine-Docetaxel': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                gem(1),
                doce(2)
            ]
        },

        'Ifosfamide-Epirubicin': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                ifos(1),
                epirub(2),
                mesna(3)
            ]
        },

        'Epirubicin': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                epirub(1)
            ]
        },

        'Trabectedin': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                trabe(1)
            ]
        },

        'Eribulin': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                erib(1)
            ]
        },

        'Ifosfamide-HighDose': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                ifos(1),
                mesna(2)
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

        'Dacarbazine': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                dacarbazine(1)
            ]
        },

        'Gemcitabine-Dacarbazine': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                gem(1),
                dacarbazine(2)
            ]
        },

        'Doxorubicin-Liposomal': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                doxoL(1)
            ]
        },

        'Vinorelbine': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                vino(1)
            ]
        },

        'Docetaxel': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                doceS(1)
            ]
        },

        'Gemcitabine-Vinorelbine': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                gem(1),
                vino(2)
            ]
        },

        'Paclitaxel-Angio': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                pacli(1)
            ]
        },

        'Carboplatin-Paclitaxel-Bevacizumab': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                pacli3(1),
                carbo(2),
                bev(3)
            ]
        },

        // ── METASTATIC — oral targeted agents ─────────────────────────────

        'Pazopanib':          oral('low'),
        'Sunitinib-SFT':      oral('low'),
        'Sorafenib-Desmoid':  oral('low'),
        'Sorafenib-EHE':      oral('low'),
        'Imatinib-DFSP':      oral('low'),
        'Tazemetostat':       oral('low'),
        'Nirogacestat':       oral('moderate'),
        'Pexidartinib':       oral('low'),
        'Sirolimus':          oral('low'),
        'Everolimus':         oral('low'),
        'Larotrectinib':      oral('low'),
        'Entrectinib':        oral('low'),
        'Repotrectinib':      oral('low'),
        'Crizotinib':         oral('low'),
        'Temozolomide':       oral('moderate'),

        // Temozolomide + Bevacizumab (Temozolomide oral, Bevacizumab IV)
        'Temozolomide-Bevacizumab': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                bev(1)
                // Temozolomide → oral (appears in Oral Chemotherapy section)
            ]
        },

        // ── METASTATIC — mTOR IV ──────────────────────────────────────────

        'Temsirolimus': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                temsi(1)
            ]
        },

        // ── METASTATIC — immunotherapy (IV) ──────────────────────────────

        'Atezolizumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                atezo(1)
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

        'Nivolumab-Ipilimumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                nivo(1),
                ipi(2)
            ]
        },

        // ── METASTATIC — rhabdomyosarcoma (RMS) regimens ─────────────────

        'VAC': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                { name: 'Vincristine', solvent: 'NS', volume: 50, duration: '5–10 min (IVP via central line)', sequence: 1 },
                { name: 'Dactinomycin', solvent: 'NS', volume: 50, duration: '10–15 min', sequence: 2 },
                cyclo(3),
                mesna(4)
            ]
        },

        'Cyclophosphamide-Topotecan': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                cyclo(1),
                { name: 'Topotecan', solvent: 'NS', volume: 250, duration: '30 min', sequence: 2 },
                mesna(3)
            ]
        },

        'VIT': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                { name: 'Vincristine', solvent: 'NS', volume: 50, duration: '5–10 min (IVP via central line)', sequence: 1 },
                { name: 'Irinotecan', solvent: 'NS', volume: 250, duration: '90 min', sequence: 2 }
                // Temozolomide → oral (appears in Oral Chemotherapy section)
            ]
        },

        // ── METASTATIC — TCR T-cell therapy (lymphodepletion + infusion) ─

        'Afamitresgene': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                fluda(1),
                cyclo(2),
                afami(3)
                // Lymphodepletion D-7 to D-5/D-4; cell infusion D0
            ]
        },

        // ── METASTATIC — desmoid (Methotrexate + Vinblastine) ─────────────

        'Methotrexate-Vinblastine': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                { name: 'Methotrexate', solvent: 'NS', volume: 100, duration: '30 min', sequence: 1 },
                { name: 'Vinblastine', solvent: 'NS', volume: 50, duration: '5–10 min', sequence: 2 }
            ]
        }

    };
})();
