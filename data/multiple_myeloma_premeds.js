window.premedData = window.premedData || {};

window.premedData.multiple_myeloma = (function () {

    // ── Drug factory helpers ────────────────────────────────────────────────
    function dara(seq)   { return { name: 'Daratumumab', solvent: 'NS', volume: 500, duration: '~7 h (1st) / ~4 h (2nd) / ~3 h (subsequent) — see split-dose note', sequence: seq }; }
    function daraSC(seq) { return { name: 'Daratumumab (SC)', solvent: 'SC', volume: 15, duration: '3–5 min SC injection (abdomen)', sequence: seq }; }
    function isa(seq)    { return { name: 'Isatuximab', solvent: 'NS', volume: 250, duration: '~3.5 h (1st) / ~2.5 h (subsequent)', sequence: seq }; }
    function bort(seq)   { return { name: 'Bortezomib', solvent: 'NS', volume: 5, duration: 'SC injection (3–5 sec); rotate sites', sequence: seq }; }
    function carfil(seq) { return { name: 'Carfilzomib', solvent: 'NS', volume: 50, duration: '10 min (cycle 1) / 30 min (cycles 2+)', sequence: seq }; }
    function elotu(seq)  { return { name: 'Elotuzumab', solvent: 'NS', volume: 250, duration: '60 min (1st 2 doses) / 30 min (subsequent)', sequence: seq }; }
    function belan(seq)  { return { name: 'Belantamab Mafodotin', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function tecli(seq)  { return { name: 'Teclistamab', solvent: 'NS', volume: 100, duration: '~1 h (step-up doses 0.06 mg/kg → 0.3 mg/kg → 1.5 mg/kg); SC option available', sequence: seq }; }
    function talque(seq) { return { name: 'Talquetamab', solvent: 'NS', volume: 100, duration: 'SC injection; step-up 0.01 mg/kg → 0.06 mg/kg → 0.405 mg/kg', sequence: seq }; }
    function elran(seq)  { return { name: 'Elranatamab', solvent: 'NS', volume: 100, duration: 'SC injection; step-up 12 mg → 32 mg → 76 mg', sequence: seq }; }
    function linvo(seq)  { return { name: 'Linvoseltamab', solvent: 'NS', volume: 250, duration: '~2 h (step-up doses); ~1 h (therapeutic dose 200 mg)', sequence: seq }; }
    function cyclo(seq)  { return { name: 'Cyclophosphamide', solvent: 'NS', volume: 500, duration: '1–2 hours', sequence: seq }; }
    function doxo(seq)   { return { name: 'Doxorubicin', solvent: 'NS', volume: '100mL / 250mL', duration: '15–30 min', sequence: seq }; }
    function cis(seq)    { return { name: 'Cisplatin', solvent: 'NS', volume: 500, duration: '1–2 hours', sequence: seq }; }
    function etopo(seq)  { return { name: 'Etoposide', solvent: 'NS', volume: 500, duration: '60 min', sequence: seq }; }
    function mesna(seq)  { return { name: 'Mesna', solvent: 'NS', volume: 100, duration: '15 min (given with cyclophosphamide, then 4h and 8h post)', sequence: seq }; }
    function oral(emeto) { return { label: null, emetogenicity: emeto, isOral: true, infusionDrugs: [] }; }

    return {

        // ── PRIMARY TREATMENT ────────────────────────────────────────────────

        // Fully SC/oral — Bortezomib SC + oral IMiD + oral Dex
        'VRd':      oral('low'),
        'VTD':      oral('low'),
        'CyBorD':   oral('low'),   // Cyclo oral at this dose (300 mg/m² weekly)
        'VRd-Lite': oral('low'),
        'MPT':      oral('low'),
        'MP':       oral('low'),
        'Vd':       oral('low'),
        'Rd':       oral('low'),
        'Lenalidomide-Maintenance': oral('low'),

        'Dara-VTD': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ dara(1) ]   // VTD components are SC/oral
        },

        'Dara-VRd': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ dara(1) ]
        },

        'Isa-VRd': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ isa(1) ]
        },

        'Dara-Rd': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ dara(1) ]
        },

        'Dara-VMP': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ dara(1) ]   // Bortezomib SC; Melphalan/Prednisone oral
        },

        'Dara-CyBorD': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ dara(1) ]   // Bortezomib SC; Cyclo/Dex oral
        },

        'Dara-SC-SMM': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ daraSC(1) ]
        },

        // ── RELAPSED / REFRACTORY ────────────────────────────────────────────

        'KRd': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ carfil(1) ]   // Lenalidomide/Dex oral
        },

        'Kd': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ carfil(1) ]
        },

        'Isa-Kd': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ isa(1), carfil(2) ]
        },

        'Dara-Kd': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ dara(1), carfil(2) ]
        },

        'PVd':       oral('low'),   // Pomalidomide PO, Bortezomib SC, Dex oral
        'Pd':        oral('low'),
        'Dara-Pd': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ dara(1) ]
        },

        'Isa-Pd': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ isa(1) ]
        },

        'Dara-Vd': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ dara(1) ]
        },

        'Elo-Rd': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ elotu(1) ]
        },

        'IRd':           oral('low'),   // Ixazomib PO, Lenalidomide PO, Dex oral
        'SVd':           oral('low'),   // Selinexor PO, Bortezomib SC, Dex oral
        'Selinexor-d':   oral('low'),

        'Belantamab-Pd': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ belan(1) ]   // Pomalidomide/Dex oral
        },

        'Belantamab-Vd': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ belan(1) ]   // Bortezomib SC, Dex oral
        },

        // Bispecific antibodies — all require inpatient step-up dosing for CRS
        'Teclistamab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ tecli(1) ]
        },

        'Talquetamab': {
            label: null,
            emetogenicity: 'low',
            isOral: true,   // SC injection — no IV infusion required
            infusionDrugs: []
        },

        'Elranatamab': {
            label: null,
            emetogenicity: 'low',
            isOral: true,   // SC injection — no IV infusion required
            infusionDrugs: []
        },

        'Linvoseltamab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ linvo(1) ]
        },

        // CAR-T — lymphodepletion (Cyclo + Flu) then single CAR-T infusion
        'Idecabtagene-Vicleucel': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                { name: 'Cyclophosphamide', solvent: 'NS', volume: 500, duration: '1–2 hours (lymphodepletion — with Mesna)', sequence: 1 },
                { name: 'Mesna', solvent: 'NS', volume: 100, duration: '15 min (every 4h × 3 doses — uroprotection)', sequence: 2 },
                { name: 'Fludarabine', solvent: 'NS', volume: 100, duration: '30 min (lymphodepletion)', sequence: 3 },
                { name: 'Idecabtagene Vicleucel', solvent: 'NS', volume: 100, duration: '30 min (single infusion D0; no leucocyte-depleting filter)', sequence: 4 }
            ]
        },

        'Ciltacabtagene-Vicleucel': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                { name: 'Cyclophosphamide', solvent: 'NS', volume: 500, duration: '1–2 hours (lymphodepletion — with Mesna)', sequence: 1 },
                { name: 'Mesna', solvent: 'NS', volume: 100, duration: '15 min (every 4h × 3 doses — uroprotection)', sequence: 2 },
                { name: 'Fludarabine', solvent: 'NS', volume: 100, duration: '30 min (lymphodepletion)', sequence: 3 },
                { name: 'Ciltacabtagene Vicleucel', solvent: 'NS', volume: 100, duration: '30 min (single infusion D0; no leucocyte-depleting filter)', sequence: 4 }
            ]
        },

        // VTD-PACE — intensive salvage; Cisplatin/Doxorubicin/Cyclo/Etoposide D1–D4 CI
        'VTD-PACE': {
            label: null,
            emetogenicity: 'high',
            isOral: false,
            infusionDrugs: [
                cis(1),
                doxo(2),
                cyclo(3),
                mesna(4),
                etopo(5)
                // Bortezomib SC, Thalidomide PO, Dexamethasone PO — appear in oral table
            ]
        },

        'Panobinostat-Vd': oral('low'),   // Panobinostat PO, Bortezomib SC, Dex oral

        'Bortezomib': {
            label: null,
            emetogenicity: 'low',
            isOral: true,   // SC injection — no IV infusion
            infusionDrugs: []
        },

        'Carfilzomib': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ carfil(1) ]
        },

        'Daratumumab': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ dara(1) ]
        }

    };
})();
