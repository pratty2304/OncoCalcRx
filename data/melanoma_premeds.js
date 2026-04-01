window.premedData = window.premedData || {};

window.premedData.melanoma = (function () {

    // ── Drug factory helpers ────────────────────────────────────────────────
    function pembro(seq) { return { name: 'Pembrolizumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function nivo(seq)   { return { name: 'Nivolumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function ipi(seq)    { return { name: 'Ipilimumab', solvent: 'NS', volume: 250, duration: '90 min', sequence: seq }; }
    function relat(seq)  { return { name: 'Relatlimab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function atezo(seq)  { return { name: 'Atezolizumab', solvent: 'NS', volume: 250, duration: '60 min (1st infusion) / 30 min (subsequent)', sequence: seq }; }
    function oral(emeto) { return { label: null, emetogenicity: emeto, isOral: true, infusionDrugs: [] }; }

    return {

        // ── NEOADJUVANT ──────────────────────────────────────────────────────

        'Pembrolizumab-Neoadjuvant': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                pembro(1)
            ]
        },

        'Nivolumab-Ipilimumab-Neoadjuvant': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                nivo(1),
                ipi(2)
            ]
        },

        // ── ADJUVANT ─────────────────────────────────────────────────────────

        'Pembrolizumab-Adjuvant': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                pembro(1)
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

        'Dabrafenib-Trametinib-Adjuvant': oral('low'),

        'Interferon-alpha-2b-Adjuvant': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                { name: 'Interferon alfa-2b', solvent: 'NS', volume: 100, duration: '20 min IV (induction D1–5/week × 4 weeks); then SC injection for maintenance', sequence: 1 }
            ]
        },

        'Peg-Interferon-alpha-2b-Adjuvant': {
            label: null,
            emetogenicity: 'low',
            isOral: true,
            infusionDrugs: []   // SC weekly — no IV component
        },

        // ── METASTATIC ───────────────────────────────────────────────────────

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

        'Nivolumab-Ipilimumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                nivo(1),
                ipi(2)
            ]
        },

        // Opdualag (co-formulated fixed-dose; listed as two sequential infusions per labelling)
        'Nivolumab-Relatlimab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                nivo(1),
                relat(2)
            ]
        },

        'Ipilimumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                ipi(1)
            ]
        },

        'Dabrafenib-Trametinib': oral('low'),
        'Vemurafenib-Cobimetinib': oral('low'),
        'Encorafenib-Binimetinib': oral('low'),
        'Dabrafenib': oral('low'),
        'Vemurafenib': oral('low'),
        'Encorafenib': oral('low'),
        'Imatinib-KIT': oral('low'),

        // Atezolizumab IV; Vemurafenib + Cobimetinib are oral
        'Atezolizumab-Vemurafenib-Cobimetinib': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                atezo(1)
            ]
        },

        // Tebentafusp — step-up dosing; first 3 doses require inpatient observation for CRS
        'Tebentafusp': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                { name: 'Tebentafusp', solvent: 'NS', volume: 100, duration: '15–20 min (step-up: 20 mcg D1, 30 mcg D8, then 68 mcg weekly)', sequence: 1 }
            ]
        },

        // Lifileucel TIL therapy — lymphodepletion phase then TIL infusion + IL-2 support
        'Lifileucel': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                { name: 'Cyclophosphamide', solvent: 'NS', volume: 500, duration: '1–2 hours (lymphodepletion, with Mesna)', sequence: 1 },
                { name: 'Mesna', solvent: 'NS', volume: 100, duration: '15 min (every 4 hours × 15 doses — uroprotection)', sequence: 2 },
                { name: 'Fludarabine', solvent: 'NS', volume: 100, duration: '30 min (lymphodepletion)', sequence: 3 },
                { name: 'Lifileucel', solvent: 'NS', volume: 250, duration: '30–60 min (single infusion; no leucocyte-depleting filter)', sequence: 4 },
                { name: 'Aldesleukin (IL-2)', solvent: 'D5W', volume: 50, duration: '15 min IV bolus every 8–12 hours (up to 6 doses post-infusion)', sequence: 5 }
            ]
        },

        // T-VEC — intralesional injection; no standard IV infusion
        'Talimogene-laherparepvec': {
            label: null,
            emetogenicity: 'low',
            isOral: true,
            infusionDrugs: []   // intralesional injection — no IV component
        },

        // High-dose Aldesleukin monotherapy — mandatory ICU/monitored setting
        'Aldesleukin': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                { name: 'Aldesleukin (IL-2)', solvent: 'D5W', volume: 50, duration: '15 min IV bolus every 8 hours (× 14 doses per cycle; ICU/monitored setting mandatory)', sequence: 1 }
            ]
        },

        // Dacarbazine — protect from light; administer in D5W
        'Dacarbazine': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                { name: 'Dacarbazine', solvent: 'D5W', volume: 250, duration: '30–60 min (protect from light; freshly prepared)', sequence: 1 }
            ]
        },

        'Temozolomide': oral('moderate'),

        'Carboplatin-Paclitaxel': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                { name: 'Paclitaxel', solvent: 'NS', volume: 500, duration: '3 hours', sequence: 1 },
                { name: 'Carboplatin', solvent: 'D5W', volume: 250, duration: '30–60 min', sequence: 2 }
            ]
        },

        'Cisplatin-Dacarbazine': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                { name: 'Cisplatin', solvent: 'NS', volume: 500, duration: '1–2 hours', sequence: 1 },
                { name: 'Dacarbazine', solvent: 'D5W', volume: 250, duration: '30–60 min (protect from light)', sequence: 2 }
            ]
        }

    };
})();
