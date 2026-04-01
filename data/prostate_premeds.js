window.premedData = window.premedData || {};

window.premedData.prostate = (function () {

    // ── Drug factory helpers ────────────────────────────────────────────────
    function doce(seq)   { return { name: 'Docetaxel', solvent: 'NS', volume: 250, duration: '1 hour', sequence: seq }; }
    function caba(seq)   { return { name: 'Cabazitaxel', solvent: 'NS', volume: 250, duration: '1 hour', sequence: seq }; }
    function carbo(seq)  { return { name: 'Carboplatin', solvent: 'D5W', volume: 250, duration: '30–60 min', sequence: seq }; }
    function etopo(seq)  { return { name: 'Etoposide', solvent: 'NS', volume: 500, duration: '60 min', sequence: seq }; }
    function cis(seq)    { return { name: 'Cisplatin', solvent: 'NS', volume: 500, duration: '1–2 hours', sequence: seq }; }
    function mitox(seq)  { return { name: 'Mitoxantrone', solvent: 'NS', volume: 100, duration: '15–30 min', sequence: seq }; }
    function pembro(seq) { return { name: 'Pembrolizumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function ra223(seq)  { return { name: 'Radium-223 dichloride', solvent: 'NS', volume: 10, duration: 'Slow IV push over 1 min (nuclear medicine facility)', sequence: seq }; }
    function lu177(seq)  { return { name: 'Lutetium-177 PSMA-617', solvent: 'NS', volume: 100, duration: '30 min (nuclear medicine facility; radiation safety precautions)', sequence: seq }; }
    function sipul(seq)  { return { name: 'Sipuleucel-T', solvent: 'NS', volume: 250, duration: '60 min (autologous product — confirm patient ID with 2 identifiers before infusion)', sequence: seq }; }
    function oral(emeto) { return { label: null, emetogenicity: emeto, isOral: true, infusionDrugs: [] }; }

    return {

        // ── mCSPC — all oral/IM hormonal agents ─────────────────────────────

        'Abiraterone-Prednisone-ADT': oral('low'),
        'Enzalutamide-ADT':           oral('low'),
        'Apalutamide-ADT':            oral('low'),
        'Darolutamide-ADT':           oral('low'),
        'Niraparib-Abiraterone-BRCA2': oral('low'),

        'Darolutamide-Docetaxel-ADT': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                doce(1)
                // Darolutamide, ADT → oral/IM (appears in Oral Chemotherapy section)
            ]
        },

        'Abiraterone-Docetaxel-ADT': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                doce(1)
                // Abiraterone, Prednisone, ADT → oral/IM (appears in Oral Chemotherapy section)
            ]
        },

        'Docetaxel-ADT': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                doce(1)
                // Prednisone, ADT → oral/IM (appears in Oral Chemotherapy section)
            ]
        },

        // ── nmCRPC — all oral/IM ─────────────────────────────────────────────

        'Enzalutamide-EMBARK': oral('low'),

        // ── mCRPC — oral agents ──────────────────────────────────────────────

        'Abiraterone-Prednisone':    oral('low'),
        'Enzalutamide':              oral('low'),
        'Olaparib':                  oral('low'),
        'Olaparib-Abiraterone':      oral('low'),
        'Niraparib-Abiraterone':     oral('low'),
        'Talazoparib-Enzalutamide':  oral('low'),
        'Rucaparib':                 oral('low'),

        // ── mCRPC — IV cytotoxics ────────────────────────────────────────────

        'Docetaxel-Prednisone': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                doce(1)
                // Prednisone → oral (appears in Oral Chemotherapy section)
            ]
        },

        'Cabazitaxel-20': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                caba(1)
                // Prednisone → oral (appears in Oral Chemotherapy section)
            ]
        },

        'Cabazitaxel-25': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                caba(1)
                // Prednisone → oral (appears in Oral Chemotherapy section)
            ]
        },

        'Mitoxantrone-Prednisone': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                mitox(1)
                // Prednisone → oral (appears in Oral Chemotherapy section)
            ]
        },

        'Cisplatin-Etoposide-NEPC': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                etopo(1),
                cis(2)
            ]
        },

        'Carboplatin-Docetaxel-NEPC': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                doce(1),
                carbo(2)
            ]
        },

        'Carboplatin-Cabazitaxel': {
            label: null,
            emetogenicity: 'moderate',
            isOral: false,
            infusionDrugs: [
                caba(1),
                carbo(2)
            ]
        },

        // ── mCRPC — radiopharmaceuticals & immunotherapy ─────────────────────

        'Radium-223': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                ra223(1)
            ]
        },

        'Lutetium-177-PSMA': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                lu177(1)
            ]
        },

        'Sipuleucel-T': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [
                sipul(1)
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
