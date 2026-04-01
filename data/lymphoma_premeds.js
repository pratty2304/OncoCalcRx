window.premedData = window.premedData || {};

window.premedData.lymphoma = (function () {

    // ── Infusion drug helpers ─────────────────────────────────────────────────
    function nivo(seq)      { return { name: 'Nivolumab',                    solvent: 'NS',  volume: 100,  duration: '30 min',                                          sequence: seq }; }
    function pembro(seq)    { return { name: 'Pembrolizumab',                solvent: 'NS',  volume: 100,  duration: '30 min',                                          sequence: seq }; }
    function ritux(seq)     { return { name: 'Rituximab',                    solvent: 'NS',  volume: 250,  duration: '4–6 h (1st infusion) / 2–4 h (subsequent)',       sequence: seq }; }
    function obinut(seq)    { return { name: 'Obinutuzumab',                 solvent: 'NS',  volume: 250,  duration: '3.5 h (1st) / 2.5 h (subsequent) — see PI',      sequence: seq }; }
    function bv(seq)        { return { name: 'Brentuximab vedotin',          solvent: 'NS',  volume: 150,  duration: '30 min',                                          sequence: seq }; }
    function doxo(seq)      { return { name: 'Doxorubicin',                  solvent: 'NS',  volume: '100mL / 250mL', duration: '15–30 min',                           sequence: seq }; }
    function lipodoxo(seq)  { return { name: 'Liposomal doxorubicin',        solvent: 'D5W', volume: 250,  duration: '30–90 min (rate per dose)',                       sequence: seq }; }
    function vinc(seq)      { return { name: 'Vincristine',                  solvent: 'NS',  volume: 50,   duration: '15 min',                                          sequence: seq }; }
    function vinbl(seq)     { return { name: 'Vinblastine',                  solvent: 'NS',  volume: 50,   duration: '15 min',                                          sequence: seq }; }
    function vinor(seq)     { return { name: 'Vinorelbine',                  solvent: 'NS',  volume: 100,  duration: '6–10 min',                                        sequence: seq }; }
    function cyclo(seq)     { return { name: 'Cyclophosphamide',             solvent: 'NS',  volume: 250,  duration: '30–60 min',                                       sequence: seq }; }
    function dacarb(seq)    { return { name: 'Dacarbazine',                  solvent: 'D5W', volume: 250,  duration: '30–60 min (light-protected)',                     sequence: seq }; }
    function bleo(seq)      { return { name: 'Bleomycin',                    solvent: 'NS',  volume: 100,  duration: '15–30 min',                                       sequence: seq }; }
    function etopo(seq)     { return { name: 'Etoposide',                    solvent: 'NS',  volume: 250,  duration: '30–60 min (max 0.4 mg/mL)',                       sequence: seq }; }
    function benda(seq)     { return { name: 'Bendamustine',                 solvent: 'NS',  volume: 500,  duration: '30–60 min',                                       sequence: seq }; }
    function carbo(seq)     { return { name: 'Carboplatin',                  solvent: 'D5W', volume: 250,  duration: '30–60 min',                                       sequence: seq }; }
    function cis(seq)       { return { name: 'Cisplatin',                    solvent: 'NS',  volume: 500,  duration: '1–2 hours',                                       sequence: seq }; }
    function ifo(seq)       { return { name: 'Ifosfamide',                   solvent: 'NS',  volume: 500,  duration: '1–3 hours (with mesna)',                          sequence: seq }; }
    function mesna_pre(seq) { return { name: 'Mesna (pre-dose)',             solvent: 'NS',  volume: 100,  duration: '15 min (before ifosfamide)',                      sequence: seq }; }
    function mesna_4h(seq)  { return { name: 'Mesna (4h post)',              solvent: 'NS',  volume: 100,  duration: '15 min (4 h after ifosfamide)',                   sequence: seq }; }
    function mesna_8h(seq)  { return { name: 'Mesna (8h post)',              solvent: 'NS',  volume: 100,  duration: '15 min (8 h after ifosfamide)',                   sequence: seq }; }
    function gem(seq)       { return { name: 'Gemcitabine',                  solvent: 'NS',  volume: 250,  duration: '30 min',                                          sequence: seq }; }
    function oxa(seq)       { return { name: 'Oxaliplatin',                  solvent: 'D5W', volume: 250,  duration: '2 hours',                                         sequence: seq }; }
    function fluda(seq)     { return { name: 'Fludarabine',                  solvent: 'NS',  volume: 100,  duration: '30 min',                                          sequence: seq }; }
    function mtxHD(seq)     { return { name: 'Methotrexate (High-dose)',     solvent: 'NS',  volume: 500,  duration: '4 hours',                                         sequence: seq }; }
    function mtx(seq)       { return { name: 'Methotrexate',                 solvent: 'NS',  volume: 500,  duration: '4 hours',                                         sequence: seq }; }
    function leucov(seq)    { return { name: 'Leucovorin',                   solvent: 'NS',  volume: 100,  duration: '15–30 min',                                       sequence: seq }; }
    function araHD(seq)     { return { name: 'Cytarabine (High-dose)',       solvent: 'NS',  volume: 250,  duration: '1–3 hours',                                       sequence: seq }; }
    function polatuz(seq)   { return { name: 'Polatuzumab vedotin',          solvent: 'NS',  volume: 250,  duration: '90 min (1st) / 30 min (subsequent)',              sequence: seq }; }
    function tafasit(seq)   { return { name: 'Tafasitamab',                  solvent: 'NS',  volume: 250,  duration: '2 h (1st) / 1 h (subsequent)',                   sequence: seq }; }
    function loncas(seq)    { return { name: 'Loncastuximab tesirine',       solvent: 'NS',  volume: 100,  duration: '30 min',                                          sequence: seq }; }
    function mosunet(seq)   { return { name: 'Mosunetuzumab',                solvent: 'NS',  volume: 250,  duration: '2 h (1st) / 90 min (subsequent)',                sequence: seq }; }
    function glofitam(seq)  { return { name: 'Glofitamab',                   solvent: 'NS',  volume: 250,  duration: '2 h (1st) / 90 min (subsequent)',                sequence: seq }; }
    function copanlis(seq)  { return { name: 'Copanlisib',                   solvent: 'NS',  volume: 100,  duration: '60 min',                                          sequence: seq }; }
    function belinos(seq)   { return { name: 'Belinostat',                   solvent: 'NS',  volume: 250,  duration: '30 min',                                          sequence: seq }; }
    function romidep(seq)   { return { name: 'Romidepsin',                   solvent: 'NS',  volume: 250,  duration: '4 hours',                                         sequence: seq }; }
    function pralatr(seq)   { return { name: 'Pralatrexate',                 solvent: 'NS',  volume: 10,   duration: '3–5 min (IV push)',                               sequence: seq }; }
    function mogamu(seq)    { return { name: 'Mogamulizumab',                solvent: 'NS',  volume: 250,  duration: '60 min (1st) / 30 min (subsequent)',              sequence: seq }; }
    function denileu(seq)   { return { name: 'Denileukin diftitox-cxdl',     solvent: 'NS',  volume: 50,   duration: '60 min (infuse within 15 min of preparing bag)',  sequence: seq }; }
    function methylpred(seq){ return { name: 'Methylprednisolone (Solu-Medrol)', solvent: 'NS', volume: 100, duration: '15–30 min',                                     sequence: seq }; }
    function carm(seq)      { return { name: 'Carmustine',                   solvent: 'D5W', volume: 250,  duration: '1–2 hours (glass bottle, light-protected)',       sequence: seq }; }
    function melph(seq)     { return { name: 'Melphalan',                    solvent: 'NS',  volume: 100,  duration: '15–20 min (use within 1 h of reconstitution)',    sequence: seq }; }
    function laspar(seq)    { return { name: 'L-asparaginase',               solvent: 'NS',  volume: 100,  duration: '1–2 hours (or IM per protocol)',                  sequence: seq }; }
    function bort(seq)      { return { name: 'Bortezomib',                   solvent: 'NS',  volume: 10,   duration: 'SC injection (1.4 mL NS reconstitution)',         sequence: seq }; }
    function carfilz(seq)   { return { name: 'Carfilzomib',                  solvent: 'D5W', volume: 50,   duration: '10–20 min',                                       sequence: seq }; }

    function oral(emeto) { return { label: null, emetogenicity: emeto, isOral: true, infusionDrugs: [] }; }

    return {

        // ══════════════════════════════════════════════════════════════════════
        // HODGKIN'S LYMPHOMA
        // ══════════════════════════════════════════════════════════════════════

        // ── Primary Treatment ─────────────────────────────────────────────────
        'ABVD': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [doxo(1), bleo(2), vinbl(3), dacarb(4)]
        },
        'Nivolumab-AVD': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [nivo(1), doxo(2), vinbl(3), dacarb(4)]
        },
        'BrECADD': {
            label: null, emetogenicity: 'high',
            // Dexamethasone is oral in this protocol
            infusionDrugs: [bv(1), etopo(2), cyclo(3), doxo(4), dacarb(5)]
        },
        'BV-AVD': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [bv(1), doxo(2), vinbl(3), dacarb(4)]
        },
        'R-CHOP-NLPHL': {
            label: null, emetogenicity: 'high',
            // Prednisone oral
            infusionDrugs: [ritux(1), cyclo(2), doxo(3), vinc(4)]
        },
        'BEACOPP': {
            label: null, emetogenicity: 'high',
            // Procarbazine + Prednisone oral; multi-day: Bleomycin + Vincristine on D8
            infusionDrugs: [etopo(1), doxo(2), cyclo(3), bleo(4), vinc(5)]
        },
        'BEACOPP-Escalated': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [etopo(1), doxo(2), cyclo(3), bleo(4), vinc(5)]
        },

        // ── Relapsed / Refractory ─────────────────────────────────────────────
        'Brentuximab-Vedotin': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [bv(1)]
        },
        'BV-Nivolumab': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [bv(1), nivo(2)]
        },
        'Pembrolizumab': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [pembro(1)]
        },
        'Nivolumab': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [nivo(1)]
        },
        'ICE': {
            label: null, emetogenicity: 'high',
            // Mesna: 1000 mg/m² pre, 2000 mg/m² at 4h, 2000 mg/m² at 8h (= 100% ifosfamide dose)
            infusionDrugs: [mesna_pre(1), ifo(2), mesna_4h(3), mesna_8h(4), carbo(5), etopo(6)]
        },
        'ICE-BV': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [mesna_pre(1), ifo(2), mesna_4h(3), mesna_8h(4), carbo(5), etopo(6), bv(7)]
        },
        'ICE-Nivolumab': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [mesna_pre(1), ifo(2), mesna_4h(3), mesna_8h(4), carbo(5), etopo(6), nivo(7)]
        },
        'ICE-Pembrolizumab': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [mesna_pre(1), ifo(2), mesna_4h(3), mesna_8h(4), carbo(5), etopo(6), pembro(7)]
        },
        'DHAP': {
            label: null, emetogenicity: 'high',
            // Dexamethasone oral; cisplatin 100 mg/m² = high
            infusionDrugs: [cis(1), araHD(2)]
        },
        'GDP': {
            label: null, emetogenicity: 'high',
            // Dexamethasone oral; cisplatin 75 mg/m² = high
            infusionDrugs: [gem(1), cis(2)]
        },
        'IGEV': {
            label: null, emetogenicity: 'moderate',
            // Prednisone oral
            infusionDrugs: [ifo(1), gem(2), vinor(3)]
        },
        'Mini-BEAM': {
            label: null, emetogenicity: 'high',
            // Carmustine highly emetogenic; high-dose cytarabine
            infusionDrugs: [carm(1), etopo(2), araHD(3), melph(4)]
        },
        'GVD': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [gem(1), vinor(2), lipodoxo(3)]
        },
        'Bendamustine': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [benda(1)]
        },
        'BeECAR': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [benda(1), carbo(2), etopo(3)]
        },
        'GEMOX': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [gem(1), oxa(2)]
        },

        // ══════════════════════════════════════════════════════════════════════
        // B-CELL NHL
        // ══════════════════════════════════════════════════════════════════════

        // ── Primary Treatment ─────────────────────────────────────────────────
        'R-CHOP': {
            label: null, emetogenicity: 'high',
            // Prednisone oral
            infusionDrugs: [ritux(1), cyclo(2), doxo(3), vinc(4)]
        },
        'Pola-R-CHP': {
            label: null, emetogenicity: 'high',
            // Prednisone oral
            infusionDrugs: [polatuz(1), ritux(2), cyclo(3), doxo(4)]
        },
        'R-CVP': {
            label: null, emetogenicity: 'moderate',
            // Prednisone oral
            infusionDrugs: [ritux(1), cyclo(2), vinc(3)]
        },
        'R-Bendamustine': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [ritux(1), benda(2)]
        },
        'Obinutuzumab-Bendamustine': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [obinut(1), benda(2)]
        },
        'R-mini-CHOP': {
            label: null, emetogenicity: 'moderate',
            // Prednisone oral; low-dose doxorubicin 25 mg/m²
            infusionDrugs: [ritux(1), cyclo(2), doxo(3), vinc(4)]
        },
        'R-EPOCH': {
            label: null, emetogenicity: 'high',
            // Prednisone oral; etoposide/vincristine/doxorubicin as 96h CI
            infusionDrugs: [ritux(1), etopo(2), vinc(3), cyclo(4), doxo(5)]
        },
        'DA-R-EPOCH': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [ritux(1), etopo(2), vinc(3), cyclo(4), doxo(5)]
        },
        'Rituximab-Monotherapy': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [ritux(1)]
        },
        'R-HyperCVAD-MCL': {
            label: null, emetogenicity: 'high',
            // HD-MTX + leucovorin rescue; HD-Ara-C; complex multi-day alternating cycles
            infusionDrugs: [ritux(1), cyclo(2), vinc(3), doxo(4), mtxHD(5), leucov(6), araHD(7)]
        },
        'HyperCVAD-MA-R': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [ritux(1), cyclo(2), vinc(3), doxo(4), mtxHD(5), leucov(6), araHD(7)]
        },
        'R-CODOX-M-IVAC': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [ritux(1), cyclo(2), vinc(3), doxo(4), mtxHD(5), leucov(6), ifo(7), etopo(8), araHD(9)]
        },
        'MTX-Ara-C-PCNSL': {
            label: null, emetogenicity: 'high',
            // HD-MTX 3500 mg/m² + leucovorin rescue
            infusionDrugs: [mtxHD(1), leucov(2), araHD(3)]
        },
        'R-MPV-PCNSL': {
            label: null, emetogenicity: 'high',
            // Procarbazine oral
            infusionDrugs: [ritux(1), mtxHD(2), leucov(3), vinc(4)]
        },
        'MTR-PCNSL': {
            label: null, emetogenicity: 'high',
            // Temozolomide oral
            infusionDrugs: [mtxHD(1), leucov(2), ritux(3)]
        },
        'DRC-WM': {
            label: null, emetogenicity: 'low',
            // Dexamethasone oral; Cyclophosphamide oral (100 mg/m² PO)
            infusionDrugs: [ritux(1)]
        },
        'BDR-WM': {
            label: null, emetogenicity: 'low',
            // Dexamethasone oral; Bortezomib SC (listed for documentation)
            infusionDrugs: [bort(1), ritux(2)]
        },
        'BR-WM': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [benda(1), ritux(2)]
        },
        'Ibrutinib-WM':   oral('low'),
        'Zanubrutinib-WM': oral('low'),
        'Ibrutinib-Rituximab-MCL': {
            label: null, emetogenicity: 'low',
            // Ibrutinib oral; rituximab is the only IV drug
            infusionDrugs: [ritux(1)]
        },
        'Obinutuzumab-CHOP': {
            label: null, emetogenicity: 'high',
            // Prednisone oral
            infusionDrugs: [obinut(1), cyclo(2), doxo(3), vinc(4)]
        },
        'Acalabrutinib-BR-MCL': {
            label: null, emetogenicity: 'moderate',
            // Acalabrutinib oral
            infusionDrugs: [benda(1), ritux(2)]
        },

        // ── Relapsed / Refractory ─────────────────────────────────────────────
        'R-ICE': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [ritux(1), mesna_pre(2), ifo(3), mesna_4h(4), mesna_8h(5), carbo(6), etopo(7)]
        },
        'R-DHAP': {
            label: null, emetogenicity: 'high',
            // Dexamethasone oral; cisplatin 100 mg/m²
            infusionDrugs: [ritux(1), cis(2), araHD(3)]
        },
        'R-ESHAP': {
            label: null, emetogenicity: 'high',
            // Cisplatin 25 mg/m² D1-D4 + HD-AraC
            infusionDrugs: [ritux(1), etopo(2), methylpred(3), cis(4), araHD(5)]
        },
        'R-GDP': {
            label: null, emetogenicity: 'high',
            // Dexamethasone oral; cisplatin 75 mg/m²
            infusionDrugs: [ritux(1), gem(2), cis(3)]
        },
        'R-GemOx': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [ritux(1), gem(2), oxa(3)]
        },
        'R-CEPP': {
            label: null, emetogenicity: 'moderate',
            // Procarbazine + Prednisone oral
            infusionDrugs: [ritux(1), cyclo(2), etopo(3)]
        },
        'Pola-BR': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [polatuz(1), benda(2), ritux(3)]
        },
        'Tafasitamab-Lenalidomide': {
            label: null, emetogenicity: 'low',
            // Lenalidomide oral
            infusionDrugs: [tafasit(1)]
        },
        'Lenalidomide-Rituximab': {
            label: null, emetogenicity: 'low',
            // Lenalidomide oral
            infusionDrugs: [ritux(1)]
        },
        'Tazemetostat-FL':   oral('low'),
        'Copanlisib-FL': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [copanlis(1)]
        },
        'Idelalisib-Rituximab-FL': {
            label: null, emetogenicity: 'low',
            // Idelalisib oral
            infusionDrugs: [ritux(1)]
        },
        'Ibrutinib-MCL':      oral('low'),
        'Acalabrutinib-MCL':  oral('low'),
        'Zanubrutinib-MCL':   oral('low'),
        'Bortezomib-MCL': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [bort(1)]
        },
        'Lenalidomide-MCL':   oral('low'),
        'Carfilzomib-Rituximab-Dex-WM': {
            label: null, emetogenicity: 'low',
            // Dexamethasone oral
            infusionDrugs: [carfilz(1), ritux(2)]
        },
        'Axicabtagene-ciloleucel': {
            label: null, emetogenicity: 'moderate',
            // Lymphodepletion (flu + cyclo) then CAR-T infusion
            infusionDrugs: [fluda(1), cyclo(2), { name: 'Axicabtagene ciloleucel', solvent: 'NS', volume: 68, duration: 'Single infusion over 30 min (thawed, no filtration)', sequence: 3 }]
        },
        'Tisagenlecleucel': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [fluda(1), cyclo(2), { name: 'Tisagenlecleucel', solvent: 'NS', volume: 50, duration: 'Single infusion per protocol (thawed, no filtration)', sequence: 3 }]
        },
        'Lisocabtagene-maraleucel': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [fluda(1), cyclo(2), { name: 'Lisocabtagene maraleucel', solvent: 'NS', volume: 100, duration: 'Single infusion per protocol (thawed, no filtration)', sequence: 3 }]
        },
        'Epcoritamab':     oral('low'),   // SC step-up dosing
        'Mosunetuzumab': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [mosunet(1)]
        },
        'Loncastuximab-tesirine': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [loncas(1)]
        },
        'Selinexor-Dexamethasone': oral('moderate'),   // Selinexor causes significant nausea
        'Rituximab-Maintenance': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [ritux(1)]
        },
        'Pirtobrutinib-MCL': oral('low'),
        'BV-Lenalidomide-Rituximab-LBCL': {
            label: null, emetogenicity: 'low',
            // Lenalidomide oral
            infusionDrugs: [bv(1), ritux(2)]
        },
        'Epcoritamab-FL':  oral('low'),   // SC step-up dosing
        'Epcoritamab-R2-FL': {
            label: null, emetogenicity: 'low',
            // Epcoritamab SC, Lenalidomide oral — only Rituximab is IV
            infusionDrugs: [ritux(1)]
        },
        'Tafasitamab-Len-R-FL': {
            label: null, emetogenicity: 'low',
            // Lenalidomide oral
            infusionDrugs: [tafasit(1), ritux(2)]
        },
        'Lisocabtagene-FL': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [fluda(1), cyclo(2), { name: 'Lisocabtagene maraleucel', solvent: 'NS', volume: 100, duration: 'Single infusion per protocol (thawed, no filtration)', sequence: 3 }]
        },
        'Lisocabtagene-MZL': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [fluda(1), cyclo(2), { name: 'Lisocabtagene maraleucel', solvent: 'NS', volume: 100, duration: 'Single infusion per protocol (thawed, no filtration)', sequence: 3 }]
        },
        'Glofitamab': {
            label: null, emetogenicity: 'low',
            // Obinutuzumab pretreatment (cycle 1 only); Glofitamab step-up dosing
            infusionDrugs: [obinut(1), glofitam(2)]
        },

        // ══════════════════════════════════════════════════════════════════════
        // T-CELL NHL
        // ══════════════════════════════════════════════════════════════════════

        // ── Primary Treatment ─────────────────────────────────────────────────
        'CHOP-PTCL': {
            label: null, emetogenicity: 'high',
            // Prednisone oral
            infusionDrugs: [cyclo(1), doxo(2), vinc(3)]
        },
        'CHOEP-PTCL': {
            label: null, emetogenicity: 'high',
            // Prednisone oral
            infusionDrugs: [cyclo(1), doxo(2), vinc(3), etopo(4)]
        },
        'BV-CHP-ECHELON2': {
            label: null, emetogenicity: 'high',
            // Prednisone oral
            infusionDrugs: [bv(1), cyclo(2), doxo(3)]
        },
        'SMILE-ENKTL': {
            label: null, emetogenicity: 'high',
            // Dexamethasone oral; MTX 2000 mg/m² requires leucovorin rescue
            infusionDrugs: [mtx(1), leucov(2), mesna_pre(3), ifo(4), mesna_4h(5), mesna_8h(6), laspar(7), etopo(8)]
        },
        'AspaMetDex-ENKTL': {
            label: null, emetogenicity: 'high',
            // Dexamethasone oral; MTX 3000 mg/m² — leucovorin rescue required
            infusionDrugs: [mtx(1), leucov(2), laspar(3)]
        },
        'Crizotinib-ALCL':  oral('low'),
        'Alectinib-ALCL':   oral('low'),

        // ── Relapsed / Refractory ─────────────────────────────────────────────
        'Brentuximab-PTCL': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [bv(1)]
        },
        'Belinostat-PTCL': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [belinos(1)]
        },
        'Romidepsin-PTCL': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [romidep(1)]
        },
        'Pralatrexate-PTCL': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [pralatr(1)]
        },
        'Mogamulizumab-CTCL': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [mogamu(1)]
        },
        'Romidepsin-CTCL': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [romidep(1)]
        },
        'Vorinostat-CTCL':   oral('low'),
        'Brentuximab-ALCANZA-CTCL': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [bv(1)]
        },
        'Bexarotene-CTCL':   oral('low'),
        'Gemcitabine-PTCL': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [gem(1)]
        },
        // Crizotinib-ALCL / Alectinib-ALCL entries are repeated in R/R —
        // keys are the same so the same premed entry above is matched for both
        // primary_treatment and relapsed_refractory (JS object lookup is by key).
        'Denileukin-diftitox-CTCL': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [denileu(1)]
        }

    };

})();
