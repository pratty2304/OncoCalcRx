window.premedData = window.premedData || {};

window.premedData.leukemia = (function () {

    // ── Infusion drug helpers ─────────────────────────────────────────────────
    function ritux(seq)     { return { name: 'Rituximab',                   solvent: 'NS',  volume: 500, duration: '4–8 hours (1st) / 2–4 hours (subsequent)', sequence: seq }; }
    function obinut(seq)    { return { name: 'Obinutuzumab',                solvent: 'NS',  volume: 250, duration: '4 hours D1 (1st dose) / 90 min (subsequent)', sequence: seq }; }
    function ofatum(seq)    { return { name: 'Ofatumumab',                  solvent: 'NS',  volume: 1000, duration: '4 hours (1st) / 2 hours (subsequent)', sequence: seq }; }
    function bend(seq)      { return { name: 'Bendamustine',                solvent: 'NS',  volume: 500, duration: '60 min',                                  sequence: seq }; }
    function fluda(seq)     { return { name: 'Fludarabine',                 solvent: 'NS',  volume: 100, duration: '30 min',                                  sequence: seq }; }
    function cyclo(seq)     { return { name: 'Cyclophosphamide',            solvent: 'NS',  volume: 250, duration: '30–60 min',                               sequence: seq }; }
    function cytarab(seq)   { return { name: 'Cytarabine',                  solvent: 'NS',  volume: 250, duration: '1–3 hours',                               sequence: seq }; }
    function dauno(seq)     { return { name: 'Daunorubicin',                solvent: 'NS',  volume: 250, duration: '30–60 min',                               sequence: seq }; }
    function idaru(seq)     { return { name: 'Idarubicin',                  solvent: 'NS',  volume: 100, duration: '15–30 min',                               sequence: seq }; }
    function doxo(seq)      { return { name: 'Doxorubicin',                 solvent: 'NS',  volume: '100mL / 250mL', duration: 'CI over 24h',                 sequence: seq }; }
    function mitox(seq)     { return { name: 'Mitoxantrone',                solvent: 'NS',  volume: 250, duration: '30 min',                                  sequence: seq }; }
    function etopo(seq)     { return { name: 'Etoposide',                   solvent: 'NS',  volume: 500, duration: '60 min',                                  sequence: seq }; }
    function clad(seq)      { return { name: 'Cladribine',                  solvent: 'NS',  volume: 500, duration: 'CIV over 7 days (inpatient) or 2h daily', sequence: seq }; }
    function pento(seq)     { return { name: 'Pentostatin',                 solvent: 'NS',  volume: 100, duration: '30 min',                                  sequence: seq }; }
    function clofa(seq)     { return { name: 'Clofarabine',                 solvent: 'NS',  volume: 100, duration: '2 hours',                                 sequence: seq }; }
    function nela(seq)      { return { name: 'Nelarabine',                  solvent: 'NS',  volume: 500, duration: '2 hours',                                 sequence: seq }; }
    function vinca(seq)     { return { name: 'Vincristine',                 solvent: 'NS',  volume: 100, duration: '10–15 min',                               sequence: seq }; }
    function aspar(seq)     { return { name: 'L-Asparaginase',              solvent: 'NS',  volume: 100, duration: '1 hour (IV) or IM',                       sequence: seq }; }
    function pegasp(seq)    { return { name: 'PEG-Asparaginase',            solvent: 'NS',  volume: 100, duration: '1–2 hours (IV) or IM',                    sequence: seq }; }
    function inotuz(seq)    { return { name: 'Inotuzumab ozogamicin',       solvent: 'NS',  volume: 250, duration: '1 hour',                                  sequence: seq }; }
    function blina(seq)     { return { name: 'Blinatumomab',                solvent: 'NS',  volume: 250, duration: 'CIV D1-28 (continuous infusion via pump)',  sequence: seq }; }
    function gemtuz(seq)    { return { name: 'Gemtuzumab ozogamicin',       solvent: 'NS',  volume: 250, duration: '2 hours',                                 sequence: seq }; }
    function cpx351(seq)    { return { name: 'CPX-351 (liposomal daunorubicin:cytarabine)', solvent: 'D5W', volume: 500, duration: '90 min',                 sequence: seq }; }
    function azacit(seq)    { return { name: 'Azacitidine',                 solvent: 'NS',  volume: 100, duration: '10–40 min (IV) or SC',                    sequence: seq }; }
    function decit(seq)     { return { name: 'Decitabine',                  solvent: 'NS',  volume: 250, duration: '3 hours',                                 sequence: seq }; }
    function arsen(seq)     { return { name: 'Arsenic trioxide',            solvent: 'D5W', volume: 250, duration: '2–4 hours',                               sequence: seq }; }
    function mtx(seq)       { return { name: 'Methotrexate',                solvent: 'NS',  volume: 500, duration: 'per protocol (2h loading + 22h CI)',       sequence: seq }; }
    function dexa(seq)      { return { name: 'Dexamethasone',               solvent: 'NS',  volume: 100, duration: '15–30 min',                               sequence: seq }; }
    function ramucir(seq)   { return { name: 'Ramucirumab',                 solvent: 'NS',  volume: 250, duration: '60 min',                                  sequence: seq }; }

    function oral(emetogenicity) {
        return { label: null, emetogenicity: emetogenicity, isOral: true, infusionDrugs: [] };
    }
    function sc(emetogenicity) {
        // SC-administered — listed as oral-only to suppress IV table
        return { label: null, emetogenicity: emetogenicity, isOral: true, infusionDrugs: [] };
    }

    return {

        // ══════════════════════════════════════════════════════════════════════
        // CML — all oral/SC TKIs
        // ══════════════════════════════════════════════════════════════════════
        'Imatinib-First-Line':    oral('low'),
        'Dasatinib-First-Line':   oral('low'),
        'Nilotinib-First-Line':   oral('low'),
        'Bosutinib-First-Line':   oral('low'),
        'Dasatinib-Second-Line':  oral('low'),
        'Dasatinib-AP-BP':        oral('low'),
        'Nilotinib-Second-Line':  oral('low'),
        'Bosutinib-Second-Line':  oral('low'),
        'Ponatinib':              oral('low'),
        'Asciminib-First-Line':   oral('low'),
        'Asciminib-T315I':        oral('low'),
        'Asciminib-Non-T315I':    oral('low'),
        'Omacetaxine':            sc('low'),    // SC twice daily
        'Imatinib-High-Dose':     oral('low'),
        'Hydroxyurea':            oral('low'),
        'Interferon-alpha-2a':    sc('low'),    // SC daily

        // ══════════════════════════════════════════════════════════════════════
        // CLL — primary_treatment
        // ══════════════════════════════════════════════════════════════════════
        'Ibrutinib-Monotherapy':           oral('low'),
        'Acalabrutinib-Monotherapy':       oral('low'),
        'Zanubrutinib-Monotherapy':        oral('low'),
        'Venetoclax-Obinutuzumab': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [obinut(1)]
            // Venetoclax oral — appears in Oral Chemotherapy section
        },
        'Acalabrutinib-Obinutuzumab': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [obinut(1)]
            // Acalabrutinib oral
        },
        'Ibrutinib-Obinutuzumab': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [obinut(1)]
            // Ibrutinib oral
        },
        'FCR': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [ritux(1), fluda(2), cyclo(3)]
        },
        'BR': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [ritux(1), bend(2)]
        },
        'Chlorambucil-Obinutuzumab': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [obinut(1)]
            // Chlorambucil oral
        },
        'Ibrutinib-Venetoclax':      oral('low'),  // both oral (GLOW)
        'Venetoclax-Rituximab-Frontline': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [ritux(1)]
            // Venetoclax oral
        },
        'Chlorambucil-Monotherapy':  oral('low'),

        // ══════════════════════════════════════════════════════════════════════
        // CLL — relapsed_refractory
        // ══════════════════════════════════════════════════════════════════════
        'Ibrutinib-RR':               oral('low'),
        'Acalabrutinib-RR':           oral('low'),
        'Zanubrutinib-RR':            oral('low'),
        'Venetoclax-Rituximab-RR': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [ritux(1)]
            // Venetoclax oral
        },
        'Venetoclax-Monotherapy-RR':  oral('low'),
        'Idelalisib-Rituximab': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [ritux(1)]
            // Idelalisib oral
        },
        'Lisocabtagene-Maraleucel-RR': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: []  // CAR-T single infusion — no standard IV premed table
        },
        'Pirtobrutinib':              oral('low'),
        'FCR-RR': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [ritux(1), fluda(2), cyclo(3)]
        },
        'BR-RR': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [ritux(1), bend(2)]
        },
        'Ibrutinib-Venetoclax-RR':    oral('low'),
        'Ofatumumab-RR': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [ofatum(1)]
        },
        'Obinutuzumab-Monotherapy-RR': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [obinut(1)]
        },
        'Lenalidomide-Rituximab-RR': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [ritux(1)]
            // Lenalidomide oral
        },

        // ══════════════════════════════════════════════════════════════════════
        // HCL — primary_treatment
        // ══════════════════════════════════════════════════════════════════════
        'Cladribine-IV': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [clad(1)]
        },
        'Cladribine-SC':            sc('low'),
        'Pentostatin': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [pento(1)]
        },
        'Cladribine-Rituximab': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [clad(1), ritux(2)]
        },
        'Interferon-alpha-HCL':     sc('low'),

        // ══════════════════════════════════════════════════════════════════════
        // HCL — relapsed_refractory
        // ══════════════════════════════════════════════════════════════════════
        'Cladribine-Retreatment': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [clad(1)]
        },
        'Pentostatin-Retreatment': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [pento(1)]
        },
        'Rituximab-HCL-RR': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [ritux(1)]
        },
        'Vemurafenib-HCL':           oral('low'),
        'Vemurafenib-Rituximab-HCL': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [ritux(1)]
            // Vemurafenib oral
        },
        'Bendamustine-Rituximab-HCL': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [ritux(1), bend(2)]
        },
        'Interferon-alpha-HCL-RR':   sc('low'),
        'Cladribine-Rituximab-RR': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [clad(1), ritux(2)]
        },

        // ══════════════════════════════════════════════════════════════════════
        // ALL — primary_treatment
        // ══════════════════════════════════════════════════════════════════════
        'HyperCVAD': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [cyclo(1), vinca(2), doxo(3), dexa(4), mtx(5), cytarab(6)]
        },
        'BFM-95': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [vinca(1), dauno(2), aspar(3), cyclo(4), cytarab(5)]
        },
        'CALGB-10403-AYA': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [dauno(1), vinca(2), pegasp(3)]
            // Prednisone oral
        },
        'GRAALL-2005': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [dauno(1), vinca(2), cyclo(3), pegasp(4)]
            // Prednisone oral
        },
        'Imatinib-MultiAgent-PhPos': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [dauno(1), vinca(2), aspar(3), cyclo(4)]
            // Imatinib oral; Prednisone oral
        },
        'Dasatinib-HyperCVAD-PhPos': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [cyclo(1), vinca(2), doxo(3), dexa(4)]
            // Dasatinib oral
        },
        'Ponatinib-HyperCVAD-PhPos': {
            label: null,
            emetogenicity: 'high',
            infusionDrugs: [cyclo(1), vinca(2), doxo(3), dexa(4)]
            // Ponatinib oral
        },
        'Inotuzumab-PhNeg': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [inotuz(1)]
        },
        'Blinatumomab-PhNeg': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [blina(1)]
        },
        'Tisagenlecleucel': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: []  // CAR-T single infusion
        },
        'Brexucabtagene-Autoleucel': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: []  // CAR-T single infusion
        },
        'Nelarabine-T-ALL': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [nela(1)]
        },
        'POMP-Maintenance': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [vinca(1)]
            // 6-MP, methotrexate (low-dose), prednisone — all oral
        },

        // ══════════════════════════════════════════════════════════════════════
        // ALL — relapsed_refractory
        // ══════════════════════════════════════════════════════════════════════
        'Blinatumomab-RR': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [blina(1)]
        },
        'Inotuzumab-RR': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [inotuz(1)]
        },
        'Tisagenlecleucel-RR': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: []
        },
        'Brexucabtagene-Autoleucel-RR': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: []
        },
        'Nelarabine-RR-T-ALL': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [nela(1)]
        },
        'Clofarabine-RR': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [clofa(1)]
        },

        // ══════════════════════════════════════════════════════════════════════
        // AML — primary_treatment
        // ══════════════════════════════════════════════════════════════════════
        '7plus3-Standard': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [cytarab(1), dauno(2)]
        },
        '7plus3-Idarubicin': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [cytarab(1), idaru(2)]
        },
        '7plus3-Midostaurin-FLT3': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [cytarab(1), dauno(2)]
            // Midostaurin oral
        },
        'CPX-351-sAML': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [cpx351(1)]
        },
        'Azacitidine-Venetoclax': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [azacit(1)]
            // Venetoclax oral; azacitidine can be SC or IV
        },
        'Decitabine-Venetoclax': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [decit(1)]
            // Venetoclax oral
        },
        'LDAC-Venetoclax': {
            label: null,
            emetogenicity: 'low',
            isOral: true,
            infusionDrugs: []
            // Both SC (cytarabine) and oral (venetoclax) — no IV table
        },
        'Azacitidine-Monotherapy': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [azacit(1)]
        },
        'Decitabine-Monotherapy': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [decit(1)]
        },
        'Gemtuzumab-Ozogamicin-Combo': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [gemtuz(1), cytarab(2), dauno(3)]
        },
        'HiDAC-Consolidation': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [cytarab(1)]
        },
        'ATRA-ATO-APL': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [arsen(1)]
            // ATRA oral
        },
        'ATRA-Idarubicin-APL': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [idaru(1)]
            // ATRA oral
        },
        'Midostaurin-Maintenance-FLT3':    oral('low'),
        'Azacitidine-Maintenance-CC-486':  oral('low'),  // oral azacitidine
        'Ivosidenib-IDH1':                 oral('low'),
        'Enasidenib-IDH2':                 oral('low'),
        'Ivosidenib-Azacitidine-IDH1': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [azacit(1)]
            // Ivosidenib oral
        },
        'Olutasidenib-IDH1':               oral('low'),
        'Quizartinib-FLT3-ITD': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [cytarab(1), dauno(2)]
            // Quizartinib oral
        },

        // ══════════════════════════════════════════════════════════════════════
        // AML — relapsed_refractory
        // ══════════════════════════════════════════════════════════════════════
        'Gilteritinib-FLT3':              oral('low'),
        'Venetoclax-Azacitidine-RR': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [azacit(1)]
            // Venetoclax oral
        },
        'MEC': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [mitox(1), etopo(2), cytarab(3)]
        },
        'FLAG-IDA': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [fluda(1), cytarab(2), idaru(3)]
            // G-CSF SC (not listed in IV table)
        },
        'CLAG-M': {
            label: null,
            emetogenicity: 'moderate',
            infusionDrugs: [clad(1), cytarab(2), mitox(3)]
            // G-CSF SC
        },
        'Gemtuzumab-Ozogamicin-Mono-RR': {
            label: null,
            emetogenicity: 'low',
            infusionDrugs: [gemtuz(1)]
        },
        'Ivosidenib-RR-IDH1':             oral('low'),
        'Enasidenib-RR-IDH2':             oral('low'),
        'Revumenib-KMT2A':                oral('low'),
        'Olutasidenib-RR-IDH1':           oral('low')
    };

})();
