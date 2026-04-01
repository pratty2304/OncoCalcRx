window.premedData = window.premedData || {};

window.premedData.stem_cell_transplant = (function () {

    // ── Drug factory helpers ────────────────────────────────────────────────
    function melph(seq)  { return { name: 'Melphalan', solvent: 'NS', volume: 250, duration: '15–30 min (administer within 60 min of reconstitution; use within 1 hour of preparation)', sequence: seq }; }
    function bcnu(seq)   { return { name: 'Carmustine (BCNU)', solvent: 'D5W', volume: 500, duration: '1–2 hours (glass or polyolefin container; protect from light)', sequence: seq }; }
    function etopo(seq)  { return { name: 'Etoposide', solvent: 'NS', volume: 500, duration: '60–90 min (max 0.4 mg/mL; never IV bolus)', sequence: seq }; }
    function etopo1g(seq){ return { name: 'Etoposide', solvent: 'NS', volume: 1000, duration: '60–90 min (max 0.4 mg/mL; never IV bolus)', sequence: seq }; }
    function ara(seq)    { return { name: 'Cytarabine', solvent: 'NS', volume: 250, duration: '1–3 hours', sequence: seq }; }
    function araHD(seq)  { return { name: 'Cytarabine', solvent: 'NS', volume: 500, duration: '1–3 hours (High-dose: steroid eye drops QID from D-1 until 24h post-last dose to prevent keratoconjunctivitis)', sequence: seq }; }
    function bend(seq)   { return { name: 'Bendamustine', solvent: 'NS', volume: 500, duration: '30–60 min', sequence: seq }; }
    function cyclo(seq)  { return { name: 'Cyclophosphamide', solvent: 'NS', volume: 250, duration: '30–60 min (MESNA uroprotection mandatory at high doses)', sequence: seq }; }
    function bu(seq)     { return { name: 'Busulfan', solvent: 'NS or D5W', volume: 250, duration: '2 hours (therapeutic drug monitoring for AUC targeting; seizure prophylaxis with phenytoin, levetiracetam, or clonazepam during and 24h post)', sequence: seq }; }
    function flu(seq)    { return { name: 'Fludarabine', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function treo(seq)   { return { name: 'Treosulfan', solvent: 'NS', volume: 500, duration: '2 hours', sequence: seq }; }
    function thio(seq)   { return { name: 'Thiotepa', solvent: 'NS', volume: 500, duration: '2 hours', sequence: seq }; }
    function amsa(seq)   { return { name: 'Amsacrine', solvent: 'D5W', volume: 500, duration: '60–90 min (glass container MANDATORY — crystallises in NS; incompatible with NS/heparin; protect from light; monitor QTc)', sequence: seq }; }
    function tbi(dose, seq) { return { name: 'Total Body Irradiation', solvent: 'N/A', volume: 'N/A', duration: `${dose} — administered by Radiation Oncology (not an IV infusion)`, sequence: seq }; }

    return {

        // ── AUTOLOGOUS ──────────────────────────────────────────────────────

        'Melphalan-200': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                melph(1)
            ]
        },

        'Melphalan-140': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                melph(1)
            ]
        },

        'BEAM': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                bcnu(1),
                etopo(2),
                ara(3),
                melph(4)
            ]
        },

        'BeEAM': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                bend(1),
                etopo(2),
                ara(3),
                melph(4)
            ]
        },

        'CBV': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                bcnu(1),
                etopo(2),
                cyclo(3)
            ]
        },

        'LACE': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                etopo1g(1),
                araHD(2),
                cyclo(3)
                // Lomustine (CCNU) → oral D-7 (appears in Oral Chemotherapy section)
            ]
        },

        // ── ALLOGENEIC — MYELOABLATIVE (MAC) ───────────────────────────────

        'Busulfan-Cyclophosphamide': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                bu(1),
                cyclo(2)
            ]
        },

        'Fludarabine-Busulfan-4day': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                flu(1),
                bu(2)
            ]
        },

        'Cyclophosphamide-TBI': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                tbi('1200 cGy fractionated', 1),
                cyclo(2)
            ]
        },

        'Treosulfan-Fludarabine': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                treo(1),
                flu(2)
            ]
        },

        'Thiotepa-Busulfan-Fludarabine': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                thio(1),
                bu(2),
                flu(3)
            ]
        },

        // ── ALLOGENEIC — REDUCED INTENSITY (RIC / NMA) ─────────────────────

        'Fludarabine-Busulfan-2day': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                flu(1),
                bu(2)
            ]
        },

        'Fludarabine-Melphalan': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                flu(1),
                melph(2)
            ]
        },

        'Fludarabine-Cyclophosphamide': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                flu(1),
                cyclo(2)
            ]
        },

        'Fludarabine-TBI-200': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                flu(1),
                tbi('200 cGy single fraction', 2)
            ]
        },

        'Baltimore-Haplo-NMA': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                flu(1),
                cyclo(2),
                tbi('200 cGy single fraction', 3)
            ]
        },

        'FLAMSA-RIC': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                flu(1),
                amsa(2),
                araHD(3),
                tbi('400 cGy fractionated', 4),
                cyclo(5)
            ]
        }

    };
})();
