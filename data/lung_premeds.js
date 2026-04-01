window.premedData = window.premedData || {};

window.premedData.lung = (function () {

    // ── Infusion drug helpers ─────────────────────────────────────────────────
    function nivo(seq)    { return { name: 'Nivolumab',              solvent: 'NS',  volume: 100,  duration: '30 min',                                                   sequence: seq }; }
    function pembro(seq)  { return { name: 'Pembrolizumab',          solvent: 'NS',  volume: 100,  duration: '30 min',                                                   sequence: seq }; }
    function atezo(seq)   { return { name: 'Atezolizumab',           solvent: 'NS',  volume: 250,  duration: '60 min (1st) / 30 min (subsequent)',                       sequence: seq }; }
    function durva(seq)   { return { name: 'Durvalumab',             solvent: 'NS',  volume: 250,  duration: '60 min',                                                   sequence: seq }; }
    function tisl(seq)    { return { name: 'Tislelizumab',           solvent: 'NS',  volume: 100,  duration: '60 min (1st) / 30 min (subsequent)',                       sequence: seq }; }
    function cemip(seq)   { return { name: 'Cemiplimab',             solvent: 'NS',  volume: 250,  duration: '30 min',                                                   sequence: seq }; }
    function ipi(seq)     { return { name: 'Ipilimumab',             solvent: 'NS',  volume: 100,  duration: '30 min',                                                   sequence: seq }; }
    function tremu(seq)   { return { name: 'Tremelimumab',           solvent: 'NS',  volume: 250,  duration: '60 min',                                                   sequence: seq }; }
    function cis(seq)     { return { name: 'Cisplatin',              solvent: 'NS',  volume: 500,  duration: '60–90 min',                                                sequence: seq }; }
    function carbo(seq)   { return { name: 'Carboplatin',            solvent: 'NS',  volume: 250,  duration: '30–60 min',                                                sequence: seq }; }
    function pacli(seq)   { return { name: 'Paclitaxel',             solvent: 'NS',  volume: 250,  duration: '3 hours',                                                  sequence: seq }; }
    function pacliW(seq)  { return { name: 'Paclitaxel',             solvent: 'NS',  volume: 250,  duration: '1 hour',                                                   sequence: seq }; } // weekly low-dose
    function nabpac(seq)  { return { name: 'Nab-paclitaxel',         solvent: 'NS',  volume: 100,  duration: '30 min',                                                   sequence: seq }; }
    function pem(seq)     { return { name: 'Pemetrexed',             solvent: 'NS',  volume: 100,  duration: '10 min',                                                   sequence: seq }; }
    function gem(seq)     { return { name: 'Gemcitabine',            solvent: 'NS',  volume: 250,  duration: '30 min',                                                   sequence: seq }; }
    function vino(seq)    { return { name: 'Vinorelbine',            solvent: 'NS',  volume: 50,   duration: '20–30 min',                                                sequence: seq }; }
    function etop(seq)    { return { name: 'Etoposide',              solvent: 'NS',  volume: 500,  duration: '60 min',                                                   sequence: seq }; }
    function doce(seq)    { return { name: 'Docetaxel',              solvent: 'NS',  volume: 250,  duration: '1 hour',                                                   sequence: seq }; }
    function ramu(seq)    { return { name: 'Ramucirumab',            solvent: 'NS',  volume: 250,  duration: '60 min',                                                   sequence: seq }; }
    function bev(seq)     { return { name: 'Bevacizumab',            solvent: 'NS',  volume: 100,  duration: '90 min (1st) / 60 min (2nd) / 30 min (subsequent)',        sequence: seq }; }
    function amiv(seq)    { return { name: 'Amivantamab',            solvent: 'NS',  volume: 250,  duration: 'Cycle 1: split over 2 days (see PI); subsequent: 2h',      sequence: seq }; }
    function tdxd(seq)    { return { name: 'Trastuzumab deruxtecan', solvent: 'NS',  volume: 100,  duration: '90 min (1st) / 45 min (subsequent)',                       sequence: seq }; }
    function dato(seq)    { return { name: 'Datopotamab deruxtecan', solvent: 'NS',  volume: 100,  duration: '60 min',                                                   sequence: seq }; }
    function tarlat(seq)  { return { name: 'Tarlatamab',             solvent: 'NS',  volume: 100,  duration: '60 min (step-up D1 + D8) / 30 min (maintenance)',          sequence: seq }; }
    function topot(seq)   { return { name: 'Topotecan',              solvent: 'NS',  volume: 100,  duration: '30 min',                                                   sequence: seq }; }
    function lurbi(seq)   { return { name: 'Lurbinectedin',          solvent: 'D5W', volume: 500,  duration: '60 min',                                                   sequence: seq }; }
    function cyclo(seq)   { return { name: 'Cyclophosphamide',       solvent: 'NS',  volume: 250,  duration: '30–60 min',                                                sequence: seq }; }
    function doxo(seq)    { return { name: 'Doxorubicin',            solvent: 'NS',  volume: '100mL / 250mL', duration: '15–30 min',                                    sequence: seq }; }
    function vcr(seq)     { return { name: 'Vincristine',            solvent: 'NS',  volume: 50,   duration: '10 min',                                                   sequence: seq }; }
    function irino(seq)   { return { name: 'Irinotecan',             solvent: 'D5W', volume: 250,  duration: '90 min',                                                   sequence: seq }; }

    function oral(emetogenicity) {
        return { label: null, emetogenicity: emetogenicity, isOral: true, infusionDrugs: [] };
    }

    return {

        // ── NSCLC NEOADJUVANT ─────────────────────────────────────────────────
        'Nivolumab-Cis-Pem-Neo': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [nivo(1), cis(2), pem(3)]
        },
        'Nivolumab-Cis-Gem-Neo': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [nivo(1), cis(2), gem(3)]
        },
        'Nivolumab-Carbo-Pac-Neo': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [nivo(1), carbo(2), pacli(3)]
        },
        'Cisplatin-Pemetrexed-Neo': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [cis(1), pem(2)]
        },
        'Carboplatin-Paclitaxel-Neo': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [carbo(1), pacli(2)]
        },
        'Cisplatin-Gemcitabine-Neo': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [cis(1), gem(2)]
        },
        'Cisplatin-Vinorelbine-Neo': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [cis(1), vino(2)]
        },

        // ── NSCLC DEFINITIVE ─────────────────────────────────────────────────
        'Cisplatin-Etoposide-CRT': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [cis(1), etop(2)]
        },
        'Weekly-Paclitaxel-Carboplatin-CRT': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [pacliW(1), carbo(2)]
        },
        'Cisplatin-Pemetrexed-CRT': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [cis(1), pem(2)]
        },
        'Osimertinib-Post-CRT':    oral('low'),
        'Durvalumab-Consolidation': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [durva(1)]
        },

        // ── NSCLC PERIOPERATIVE ───────────────────────────────────────────────
        'Nivolumab-Carbo-Pac-Periop': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [nivo(1), carbo(2), pacli(3)]
        },
        'Pembrolizumab-Cis-Pem-Periop': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [pembro(1), cis(2), pem(3)]
        },
        'Pembrolizumab-Cis-Gem-Periop': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [pembro(1), cis(2), gem(3)]
        },
        'Durvalumab-Cis-Pem-Periop': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [durva(1), cis(2), pem(3)]
        },
        'Durvalumab-Carbo-Pem-Periop': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [durva(1), carbo(2), pem(3)]
        },
        'Durvalumab-Cis-Gem-Periop': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [durva(1), cis(2), gem(3)]
        },
        'Durvalumab-Carbo-Gem-Periop': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [durva(1), carbo(2), gem(3)]
        },
        'Tislelizumab-Cis-Pem-Periop': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [tisl(1), cis(2), pem(3)]
        },
        'Tislelizumab-Carbo-Pem-Periop': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [tisl(1), carbo(2), pem(3)]
        },
        'Tislelizumab-Cis-Pac-Periop': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [tisl(1), cis(2), pacli(3)]
        },
        'Tislelizumab-Carbo-Pac-Periop': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [tisl(1), carbo(2), pacli(3)]
        },

        // ── NSCLC ADJUVANT ────────────────────────────────────────────────────
        'Osimertinib-Adj':              oral('low'),
        'Alectinib-Adj':                oral('low'),
        'Atezolizumab-Adj': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [atezo(1)]
        },
        'Pembrolizumab-Adj': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [pembro(1)]
        },
        'Cisplatin-Vinorelbine-Adj': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [cis(1), vino(2)]
        },
        'Carboplatin-Paclitaxel-Adj': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [carbo(1), pacli(2)]
        },
        'Cisplatin-Pemetrexed-Adj': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [cis(1), pem(2)]
        },
        'Cisplatin-Gemcitabine-Adj': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [cis(1), gem(2)]
        },
        'Cisplatin-Docetaxel-Adj': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [cis(1), doce(2)]
        },

        // ── NSCLC METASTATIC — IO monotherapy ─────────────────────────────────
        'Pembrolizumab-Monotherapy': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [pembro(1)]
        },
        'Atezolizumab-Monotherapy': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [atezo(1)]
        },
        'Cemiplimab-Monotherapy': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [cemip(1)]
        },
        'Nivolumab-Ipilimumab': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [nivo(1), ipi(2)]
        },

        // ── NSCLC METASTATIC — chemo + IO ─────────────────────────────────────
        'Pembrolizumab-Carboplatin-Pemetrexed': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [pembro(1), carbo(2), pem(3)]
        },
        'Pembrolizumab-Cisplatin-Pemetrexed': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [pembro(1), cis(2), pem(3)]
        },
        'Pembrolizumab-Carboplatin-Paclitaxel': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [pembro(1), carbo(2), pacli(3)]
        },
        'Pembrolizumab-Carboplatin-NabPaclitaxel': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [pembro(1), carbo(2), nabpac(3)]
        },
        'Nivo-Ipi-Carbo-Pac-9LA': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [nivo(1), ipi(2), carbo(3), pacli(4)]
        },
        'Nivo-Ipi-Carbo-Pem-9LA': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [nivo(1), ipi(2), carbo(3), pem(4)]
        },
        'Nivo-Ipi-Cis-Pem-9LA': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [nivo(1), ipi(2), cis(3), pem(4)]
        },
        'Atezolizumab-Bevacizumab-Carboplatin-Paclitaxel': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [atezo(1), bev(2), carbo(3), pacli(4)]
        },
        'Cemiplimab-Carboplatin-Pemetrexed': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [cemip(1), carbo(2), pem(3)]
        },

        // ── NSCLC METASTATIC — EGFR TKIs ─────────────────────────────────────
        'Osimertinib':                  oral('low'),
        'Osimertinib-Carboplatin-Pemetrexed': {
            // osimertinib is oral; carboplatin + pemetrexed are IV
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [carbo(1), pem(2)]
        },
        'Gefitinib-Carboplatin-Pemetrexed': {
            // gefitinib is oral; carboplatin + pemetrexed are IV
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [carbo(1), pem(2)]
        },
        'Gefitinib':                    oral('low'),
        'Afatinib':                     oral('low'),

        // ── NSCLC METASTATIC — EGFR bispecific ───────────────────────────────
        'Amivantamab-Lazertinib': {
            // lazertinib is oral; amivantamab is IV
            label: null, emetogenicity: 'low',
            infusionDrugs: [amiv(1)]
        },
        'Amivantamab-Exon20': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [amiv(1)]
        },
        'Amivantamab-Chemo-Exon20': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [amiv(1), carbo(2), pem(3)]
        },

        // ── NSCLC METASTATIC — ALK/ROS1 TKIs (all oral) ─────────────────────
        'Alectinib':                    oral('low'),
        'Brigatinib':                   oral('low'),
        'Lorlatinib':                   oral('low'),
        'Crizotinib-ROS1':              oral('low'),
        'Entrectinib-ROS1':             oral('low'),
        'Repotrectinib-ROS1':           oral('low'),

        // ── NSCLC METASTATIC — other targeted oral ────────────────────────────
        'Sotorasib':                    oral('low'),
        'Adagrasib':                    oral('low'),
        'Dabrafenib-Trametinib':        oral('low'),
        'Capmatinib':                   oral('low'),
        'Tepotinib':                    oral('low'),
        'Selpercatinib-RET':            oral('low'),
        'Entrectinib-NTRK':             oral('low'),
        'Larotrectinib-NTRK':           oral('low'),

        // ── NSCLC METASTATIC — HER2 ADC ──────────────────────────────────────
        'Trastuzumab-Deruxtecan-HER2': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [tdxd(1)]
        },

        // ── NSCLC METASTATIC — 2nd/subsequent line ───────────────────────────
        'Nivolumab-2L': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [nivo(1)]
        },
        'Cisplatin-Pemetrexed': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [cis(1), pem(2)]
        },
        'Carboplatin-Pemetrexed': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [carbo(1), pem(2)]
        },
        'Carboplatin-Paclitaxel': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [carbo(1), pacli(2)]
        },
        'Carboplatin-Gemcitabine': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [carbo(1), gem(2)]
        },
        'Docetaxel-Ramucirumab': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [doce(1), ramu(2)]
        },
        'Datopotamab-Deruxtecan-2L': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [dato(1)]
        },
        'Tislelizumab-2L': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [tisl(1)]
        },
        'Docetaxel-Monotherapy': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [doce(1)]
        },
        'Pemetrexed-Maintenance': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [pem(1)]
        },

        // ── SCLC DEFINITIVE ───────────────────────────────────────────────────
        // (same keys exist as NSCLC definitive — JS lookup uses cancer type scope,
        //  so SCLC key lookup falls through to NSCLC keys above if not re-declared.
        //  Declaring them here explicitly ensures correct emetogenicity per context.)
        // Note: SCLC definitive shares key names with NSCLC definitive —
        // the premed lookup is per-cancer-type, so only one set is stored here.
        // The NSCLC definitive entries above cover 'Cisplatin-Etoposide-CRT' correctly.

        // ── SCLC METASTATIC — chemo + IO ─────────────────────────────────────
        'Atezolizumab-Carboplatin-Etoposide': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [atezo(1), carbo(2), etop(3)]
        },
        'Durvalumab-Carboplatin-Etoposide': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [durva(1), carbo(2), etop(3)]
        },
        'Durvalumab-Cisplatin-Etoposide': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [durva(1), cis(2), etop(3)]
        },
        'Durvalumab-Tremelimumab-Carboplatin-Etoposide': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [durva(1), tremu(2), carbo(3), etop(4)]
        },

        // ── SCLC METASTATIC — pure chemo ─────────────────────────────────────
        'Carboplatin-Etoposide': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [carbo(1), etop(2)]
        },
        'Cisplatin-Etoposide': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [cis(1), etop(2)]
        },
        'Irinotecan-Cisplatin': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [irino(1), cis(2)]
        },

        // ── SCLC METASTATIC — novel agents ───────────────────────────────────
        'Tarlatamab': {
            label: null, emetogenicity: 'low',
            infusionDrugs: [tarlat(1)]
        },
        'Topotecan-IV': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [topot(1)]
        },
        'Topotecan-Oral':               oral('moderate'),
        'Lurbinectedin': {
            label: null, emetogenicity: 'moderate',
            infusionDrugs: [lurbi(1)]
        },
        'CAV': {
            label: null, emetogenicity: 'high',
            infusionDrugs: [cyclo(1), doxo(2), vcr(3)]
        },
        'Temozolomide':                 oral('moderate'),

    };

})();
