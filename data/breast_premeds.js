window.premedData = window.premedData || {};

window.premedData.breast = (function () {

    var HEC = [
        { name: "Ondansetron", dose: "8mg", route: "Oral", frequency: "Twice daily", duration: "Days 2–4" },
        { name: "Dexamethasone", dose: "8mg", route: "Oral", frequency: "Once daily (morning)", duration: "Days 2–4" },
        { name: "Aprepitant", dose: "80mg", route: "Oral", frequency: "Once daily", duration: "Days 2–3", onlyIf: "nk1_oral_aprepitant" },
        { name: "Metoclopramide", dose: "10mg", route: "Oral", frequency: "Three times daily (as needed)", duration: "Days 2–5" },
        { name: "Pantoprazole", dose: "40mg", route: "Oral", frequency: "Once daily", duration: "While on dexamethasone" }
    ];

    var MEC = [
        { name: "Ondansetron", dose: "8mg", route: "Oral", frequency: "Twice daily", duration: "Days 2–3" },
        { name: "Dexamethasone", dose: "4mg", route: "Oral", frequency: "Twice daily", duration: "Days 2–3" },
        { name: "Metoclopramide", dose: "10mg", route: "Oral", frequency: "Three times daily (as needed)", duration: "Days 2–4" }
    ];

    var LOW = [
        { name: "Metoclopramide", dose: "10mg", route: "Oral", frequency: "Three times daily (as needed)", duration: "Days 1–3" },
        { name: "Ondansetron", dose: "8mg", route: "Oral", frequency: "As needed", duration: "Days 1–3" }
    ];

    var ORAL_PM = [
        { name: "Ondansetron", dose: "8mg", route: "Oral", frequency: "As needed", duration: "As required" },
        { name: "Metoclopramide", dose: "10mg", route: "Oral", frequency: "Three times daily (as needed)", duration: "As required" }
    ];

    var PYRIDOXINE = { name: "Pyridoxine (Vitamin B6)", dose: "50mg", route: "Oral", frequency: "Three times daily", duration: "Throughout treatment" };
    var LOPERAMIDE = { name: "Loperamide", dose: "2mg", route: "Oral", frequency: "Three times daily (prophylactic)", duration: "Cycles 1–2" };
    var GLUCOSE_MON = { name: "Blood glucose monitoring", dose: "—", route: "—", frequency: "As per protocol", duration: "Throughout treatment" };

    // Infusion drug helpers
    function doxo(seq)   { return { name: "Doxorubicin",     solvent: "NS",   volume: "100mL / 250mL", duration: "15–30 min", sequence: seq }; }
    function epi(seq)    { return { name: "Epirubicin",      solvent: "NS",   volume: "100mL / 250mL", duration: "15–30 min", sequence: seq }; }
    function cyclo(seq)  { return { name: "Cyclophosphamide",solvent: "NS",   volume: 250, duration: "45 min",  sequence: seq }; }
    function fiveFU(seq) { return { name: "5-Fluorouracil",  solvent: "NS",   volume: 250, duration: "30 min",  sequence: seq }; }
    function pacli3w(seq){ return { name: "Paclitaxel",      solvent: "NS",   volume: 500, duration: "3 hours", sequence: seq }; }
    function pacliWk(seq){ return { name: "Paclitaxel",      solvent: "NS",   volume: 250, duration: "1 hour",  sequence: seq }; }
    function doce(seq)   { return { name: "Docetaxel",       solvent: "NS",   volume: 250, duration: "60 min",  sequence: seq }; }
    function nabp3w(seq) { return { name: "Nab-paclitaxel",  solvent: "NS",   volume: 100, duration: "30 min",  sequence: seq }; }
    function nabpWk(seq) { return { name: "Nab-paclitaxel",  solvent: "NS",   volume: 100, duration: "30 min",  sequence: seq }; }
    function carbo(seq)  { return { name: "Carboplatin",     solvent: "D5W",  volume: 250, duration: "30 min",  sequence: seq }; }
    function cisplat(seq){ return { name: "Cisplatin",       solvent: "NS",   volume: 500, duration: "2 hours", sequence: seq }; }
    function gemcit(seq) { return { name: "Gemcitabine",     solvent: "NS",   volume: 250, duration: "30 min",  sequence: seq }; }
    function mtx(seq)    { return { name: "Methotrexate",    solvent: "NS",   volume: 100, duration: "30 min",  sequence: seq }; }
    function vino(seq)   { return { name: "Vinorelbine",     solvent: "NS",   volume: 100, duration: "10 min",  sequence: seq }; }
    function eribul(seq) { return { name: "Eribulin",        solvent: "NS",   volume: 100, duration: "5 min",   sequence: seq }; }
    function pld(seq)    { return { name: "Pegylated Liposomal Doxorubicin", solvent: "D5W", volume: 250, duration: "90 min", sequence: seq }; }
    function tras(seq)   { return { name: "Trastuzumab",     solvent: "NS",   volume: 250, duration: "90 min (1st) / 30 min (subsequent)", sequence: seq }; }
    function pertu(seq)  { return { name: "Pertuzumab",      solvent: "NS",   volume: 250, duration: "60 min (1st) / 30 min (subsequent)", sequence: seq }; }
    function pembro(seq) { return { name: "Pembrolizumab",   solvent: "NS",   volume: 100, duration: "30 min",  sequence: seq }; }
    function tdxd(seq)   { return { name: "Trastuzumab deruxtecan",  solvent: "NS", volume: 100, duration: "90 min (1st) / 30 min (subsequent)", sequence: seq }; }
    function tdm1(seq)   { return { name: "Trastuzumab emtansine",   solvent: "NS", volume: 250, duration: "90 min (1st) / 30 min (subsequent)", sequence: seq }; }
    function sacitu(seq) { return { name: "Sacituzumab govitecan",   solvent: "NS", volume: 500, duration: "3 hours (1st) / 1 hour (subsequent)", sequence: seq }; }
    function datopo(seq) { return { name: "Datopotamab deruxtecan",  solvent: "NS", volume: 100, duration: "60 min (1st) / 30 min (subsequent)", sequence: seq }; }
    function margetu(seq){ return { name: "Margetuximab",    solvent: "NS",   volume: 250, duration: "120 min (1st) / 30 min (subsequent)", sequence: seq }; }
    function ixa(seq)    { return { name: "Ixabepilone",     solvent: "LR",   volume: 500, duration: "3 hours",  sequence: seq }; }
    function dostarlimab(seq){ return { name: "Dostarlimab", solvent: "NS",   volume: 250, duration: "30 min",  sequence: seq }; }

    // GF shortcuts
    var GF_MAN = { recommended: true,  mandatory: true };
    var GF_REC = { recommended: true,  mandatory: false };
    var GF_NO  = { recommended: false, mandatory: false };

    return {

        // =====================================================
        // SEQUENTIAL REGIMENS (phases array)
        // =====================================================

        "AC-T": {
            phases: [
                {
                    label: "Phase 1: Doxorubicin + Cyclophosphamide (AC)",
                    emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: false,
                    premedDexamethasone: "12mg",
                    infusionDrugs: [doxo(1), cyclo(2)],
                    postDischargeMeds: HEC,
                    growthFactor: GF_REC
                },
                {
                    label: "Phase 2: Paclitaxel",
                    emetogenicity: "moderate", hasPaclitaxel: true, hasDocetaxel: false,
                    premedDexamethasone: "20mg",
                    infusionDrugs: [pacli3w(1)],
                    postDischargeMeds: MEC,
                    growthFactor: GF_NO
                }
            ]
        },

        "EC-Doc": {
            phases: [
                {
                    label: "Phase 1: Epirubicin + Cyclophosphamide (EC)",
                    emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: false,
                    premedDexamethasone: "12mg",
                    infusionDrugs: [epi(1), cyclo(2)],
                    postDischargeMeds: HEC,
                    growthFactor: GF_REC
                },
                {
                    label: "Phase 2: Docetaxel",
                    emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: true,
                    premedDexamethasone: "8mg",
                    infusionDrugs: [doce(1)],
                    postDischargeMeds: MEC,
                    growthFactor: GF_NO
                }
            ]
        },

        "AC-Doc": {
            phases: [
                {
                    label: "Phase 1: Doxorubicin + Cyclophosphamide (AC)",
                    emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: false,
                    premedDexamethasone: "12mg",
                    infusionDrugs: [doxo(1), cyclo(2)],
                    postDischargeMeds: HEC,
                    growthFactor: GF_REC
                },
                {
                    label: "Phase 2: Docetaxel",
                    emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: true,
                    premedDexamethasone: "8mg",
                    infusionDrugs: [doce(1)],
                    postDischargeMeds: MEC,
                    growthFactor: GF_NO
                }
            ]
        },

        "EC-T": {
            phases: [
                {
                    label: "Phase 1: Epirubicin + Cyclophosphamide (EC)",
                    emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: false,
                    premedDexamethasone: "12mg",
                    infusionDrugs: [epi(1), cyclo(2)],
                    postDischargeMeds: HEC,
                    growthFactor: GF_REC
                },
                {
                    label: "Phase 2: Paclitaxel",
                    emetogenicity: "moderate", hasPaclitaxel: true, hasDocetaxel: false,
                    premedDexamethasone: "20mg",
                    infusionDrugs: [pacli3w(1)],
                    postDischargeMeds: MEC,
                    growthFactor: GF_NO
                }
            ]
        },

        "FEC-T": {
            phases: [
                {
                    label: "Phase 1: 5-FU + Epirubicin + Cyclophosphamide (FEC)",
                    emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: false,
                    premedDexamethasone: "12mg",
                    infusionDrugs: [fiveFU(1), epi(2), cyclo(3)],
                    postDischargeMeds: HEC,
                    growthFactor: GF_REC
                },
                {
                    label: "Phase 2: Docetaxel",
                    emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: true,
                    premedDexamethasone: "8mg",
                    infusionDrugs: [doce(1)],
                    postDischargeMeds: MEC,
                    growthFactor: GF_NO
                }
            ]
        },

        "Epirubicin-CMF": {
            phases: [
                {
                    label: "Phase 1: Epirubicin",
                    emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: false,
                    premedDexamethasone: "12mg",
                    infusionDrugs: [epi(1)],
                    postDischargeMeds: HEC,
                    growthFactor: GF_REC
                },
                {
                    label: "Phase 2: CMF (Cyclophosphamide + Methotrexate + 5-FU)",
                    emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: false,
                    premedDexamethasone: "8mg",
                    infusionDrugs: [cyclo(1), mtx(2), fiveFU(3)],
                    postDischargeMeds: MEC,
                    growthFactor: GF_NO
                }
            ]
        },

        "AC-THP": {
            phases: [
                {
                    label: "Phase 1: Doxorubicin + Cyclophosphamide (AC)",
                    emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: false,
                    premedDexamethasone: "12mg",
                    infusionDrugs: [doxo(1), cyclo(2)],
                    postDischargeMeds: HEC,
                    growthFactor: GF_REC
                },
                {
                    label: "Phase 2: Docetaxel + Trastuzumab + Pertuzumab (THP)",
                    emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: true,
                    premedDexamethasone: "8mg",
                    infusionDrugs: [pertu(1), tras(2), doce(3)],
                    postDischargeMeds: MEC,
                    growthFactor: GF_NO
                }
            ]
        },

        "AC-TH": {
            phases: [
                {
                    label: "Phase 1: Doxorubicin + Cyclophosphamide (AC)",
                    emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: false,
                    premedDexamethasone: "12mg",
                    infusionDrugs: [doxo(1), cyclo(2)],
                    postDischargeMeds: HEC,
                    growthFactor: GF_REC
                },
                {
                    label: "Phase 2: Paclitaxel + Trastuzumab",
                    emetogenicity: "moderate", hasPaclitaxel: true, hasDocetaxel: false,
                    premedDexamethasone: "20mg",
                    infusionDrugs: [tras(1), pacli3w(2)],
                    postDischargeMeds: MEC,
                    growthFactor: GF_NO
                }
            ]
        },

        "FEC-THP": {
            phases: [
                {
                    label: "Phase 1: 5-FU + Epirubicin + Cyclophosphamide (FEC)",
                    emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: false,
                    premedDexamethasone: "12mg",
                    infusionDrugs: [fiveFU(1), epi(2), cyclo(3)],
                    postDischargeMeds: HEC,
                    growthFactor: GF_REC
                },
                {
                    label: "Phase 2: Docetaxel + Trastuzumab + Pertuzumab (THP)",
                    emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: true,
                    premedDexamethasone: "8mg",
                    infusionDrugs: [pertu(1), tras(2), doce(3)],
                    postDischargeMeds: MEC,
                    growthFactor: GF_NO
                }
            ]
        },

        "Paclitaxel-Carboplatin-AC": {
            phases: [
                {
                    label: "Phase 1: Paclitaxel + Carboplatin",
                    emetogenicity: "high", hasPaclitaxel: true, hasDocetaxel: false,
                    premedDexamethasone: "20mg",
                    infusionDrugs: [pacli3w(1), carbo(2)],
                    postDischargeMeds: HEC,
                    growthFactor: GF_REC
                },
                {
                    label: "Phase 2: Doxorubicin + Cyclophosphamide (AC)",
                    emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: false,
                    premedDexamethasone: "12mg",
                    infusionDrugs: [doxo(1), cyclo(2)],
                    postDischargeMeds: HEC,
                    growthFactor: GF_REC
                }
            ]
        },

        "Paclitaxel-Carboplatin-Pembrolizumab": {
            phases: [
                {
                    label: "Phase 1: Paclitaxel + Carboplatin + Pembrolizumab",
                    emetogenicity: "high", hasPaclitaxel: true, hasDocetaxel: false,
                    premedDexamethasone: "20mg",
                    infusionDrugs: [pembro(1), pacli3w(2), carbo(3)],
                    postDischargeMeds: HEC,
                    growthFactor: GF_REC
                },
                {
                    label: "Phase 2: Doxorubicin + Cyclophosphamide + Pembrolizumab (AC)",
                    emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: false,
                    premedDexamethasone: "12mg",
                    infusionDrugs: [pembro(1), doxo(2), cyclo(3)],
                    postDischargeMeds: HEC,
                    growthFactor: GF_REC
                }
            ]
        },

        "Paclitaxel-Carboplatin-Pembrolizumab-Weekly": {
            phases: [
                {
                    label: "Phase 1: Paclitaxel (weekly) + Carboplatin + Pembrolizumab",
                    emetogenicity: "high", hasPaclitaxel: true, hasDocetaxel: false,
                    premedDexamethasone: "12mg",
                    infusionDrugs: [pembro(1), pacliWk(2), carbo(3)],
                    postDischargeMeds: HEC,
                    growthFactor: GF_REC
                },
                {
                    label: "Phase 2: Doxorubicin + Cyclophosphamide + Pembrolizumab (AC)",
                    emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: false,
                    premedDexamethasone: "12mg",
                    infusionDrugs: [pembro(1), doxo(2), cyclo(3)],
                    postDischargeMeds: HEC,
                    growthFactor: GF_REC
                }
            ]
        },

        "Tamoxifen-Exemestane": {
            phases: [
                {
                    label: "Phase 1: Tamoxifen",
                    emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
                    infusionDrugs: [],
                    postDischargeMeds: ORAL_PM,
                    growthFactor: GF_NO
                },
                {
                    label: "Phase 2: Exemestane",
                    emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
                    infusionDrugs: [],
                    postDischargeMeds: ORAL_PM,
                    growthFactor: GF_NO
                }
            ]
        },

        // =====================================================
        // SINGLE-PHASE IV REGIMENS
        // =====================================================

        "TAC": {
            label: "Docetaxel + Doxorubicin + Cyclophosphamide (TAC)",
            emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: true,
            premedDexamethasone: "12mg",
            infusionDrugs: [doce(1), doxo(2), cyclo(3)],
            postDischargeMeds: HEC,
            growthFactor: GF_MAN
        },

        "TC": {
            label: "Docetaxel + Cyclophosphamide (TC)",
            emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: true,
            premedDexamethasone: "12mg",
            infusionDrugs: [doce(1), cyclo(2)],
            postDischargeMeds: HEC,
            growthFactor: GF_REC
        },

        "Dose-Dense-AC": {
            label: "Dose Dense AC (ddAC)",
            emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "12mg",
            infusionDrugs: [doxo(1), cyclo(2)],
            postDischargeMeds: HEC,
            growthFactor: GF_MAN
        },

        "Dose-Dense-Paclitaxel": {
            label: "Dose Dense Paclitaxel (sequential after ddAC)",
            emetogenicity: "moderate", hasPaclitaxel: true, hasDocetaxel: false,
            premedDexamethasone: "20mg",
            infusionDrugs: [pacli3w(1)],
            postDischargeMeds: MEC,
            growthFactor: GF_MAN
        },

        "Dose-Dense-Paclitaxel-Trastuzumab": {
            label: "Dose Dense Paclitaxel + Trastuzumab",
            emetogenicity: "moderate", hasPaclitaxel: true, hasDocetaxel: false,
            premedDexamethasone: "20mg",
            infusionDrugs: [tras(1), pacli3w(2)],
            postDischargeMeds: MEC,
            growthFactor: GF_MAN
        },

        "CMF": {
            label: "Cyclophosphamide + Methotrexate + 5-FU (CMF)",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "8mg",
            infusionDrugs: [cyclo(1), mtx(2), fiveFU(3)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "CAF": {
            label: "Cyclophosphamide + Doxorubicin + 5-FU (CAF)",
            emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "12mg",
            infusionDrugs: [fiveFU(1), doxo(2), cyclo(3)],
            postDischargeMeds: HEC,
            growthFactor: GF_REC
        },

        "FEC": {
            label: "5-FU + Epirubicin + Cyclophosphamide (FEC)",
            emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "12mg",
            infusionDrugs: [fiveFU(1), epi(2), cyclo(3)],
            postDischargeMeds: HEC,
            growthFactor: GF_REC
        },

        "Paclitaxel-Weekly-Adjuvant": {
            label: "Paclitaxel weekly (sequential after AC)",
            emetogenicity: "moderate", hasPaclitaxel: true, hasDocetaxel: false,
            premedDexamethasone: "12mg",
            infusionDrugs: [pacliWk(1)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "TCHP": {
            label: "Docetaxel + Carboplatin + Trastuzumab + Pertuzumab (TCHP)",
            emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: true,
            premedDexamethasone: "12mg",
            infusionDrugs: [pertu(1), tras(2), doce(3), carbo(4)],
            postDischargeMeds: HEC,
            growthFactor: GF_REC
        },

        "TCH": {
            label: "Docetaxel + Carboplatin + Trastuzumab (TCH)",
            emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: true,
            premedDexamethasone: "12mg",
            infusionDrugs: [tras(1), doce(2), carbo(3)],
            postDischargeMeds: HEC,
            growthFactor: GF_REC
        },

        "THP": {
            label: "Docetaxel + Trastuzumab + Pertuzumab (THP)",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: true,
            premedDexamethasone: "8mg",
            infusionDrugs: [pertu(1), tras(2), doce(3)],
            postDischargeMeds: MEC,
            growthFactor: GF_REC
        },

        "PCHP": {
            label: "Paclitaxel + Carboplatin + Trastuzumab + Pertuzumab (PCHP)",
            emetogenicity: "high", hasPaclitaxel: true, hasDocetaxel: false,
            premedDexamethasone: "20mg",
            infusionDrugs: [pertu(1), tras(2), pacli3w(3), carbo(4)],
            postDischargeMeds: HEC,
            growthFactor: GF_REC
        },

        "PCH": {
            label: "Paclitaxel + Carboplatin + Trastuzumab (PCH)",
            emetogenicity: "high", hasPaclitaxel: true, hasDocetaxel: false,
            premedDexamethasone: "20mg",
            infusionDrugs: [tras(1), pacli3w(2), carbo(3)],
            postDischargeMeds: HEC,
            growthFactor: GF_REC
        },

        "PHP": {
            label: "Paclitaxel + Trastuzumab + Pertuzumab (PHP)",
            emetogenicity: "moderate", hasPaclitaxel: true, hasDocetaxel: false,
            premedDexamethasone: "20mg",
            infusionDrugs: [pertu(1), tras(2), pacli3w(3)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "AC-Pembrolizumab": {
            label: "Doxorubicin + Cyclophosphamide + Pembrolizumab (AC)",
            emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "12mg",
            infusionDrugs: [pembro(1), doxo(2), cyclo(3)],
            postDischargeMeds: HEC,
            growthFactor: GF_REC
        },

        "EC-Pembrolizumab": {
            label: "Epirubicin + Cyclophosphamide + Pembrolizumab (EC)",
            emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "12mg",
            infusionDrugs: [pembro(1), epi(2), cyclo(3)],
            postDischargeMeds: HEC,
            growthFactor: GF_REC
        },

        "Paclitaxel-Carboplatin-3weekly": {
            label: "Paclitaxel + Carboplatin (3-weekly)",
            emetogenicity: "high", hasPaclitaxel: true, hasDocetaxel: false,
            premedDexamethasone: "20mg",
            infusionDrugs: [pacli3w(1), carbo(2)],
            postDischargeMeds: HEC,
            growthFactor: GF_REC
        },

        "Paclitaxel-Carboplatin-weekly": {
            label: "Paclitaxel + Carboplatin (weekly)",
            emetogenicity: "moderate", hasPaclitaxel: true, hasDocetaxel: false,
            premedDexamethasone: "12mg",
            infusionDrugs: [pacliWk(1), carbo(2)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Nab-Paclitaxel-Carboplatin-3weekly": {
            label: "Nab-paclitaxel + Carboplatin (3-weekly)",
            emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "12mg",
            infusionDrugs: [nabp3w(1), carbo(2)],
            postDischargeMeds: HEC,
            growthFactor: GF_REC
        },

        "Nab-Paclitaxel-Carboplatin-weekly": {
            label: "Nab-paclitaxel + Carboplatin (weekly)",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "8mg",
            infusionDrugs: [nabpWk(1), carbo(2)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Gemcitabine-Carboplatin": {
            label: "Gemcitabine + Carboplatin",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "8mg",
            infusionDrugs: [gemcit(1), carbo(2)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Carboplatin-Docetaxel": {
            label: "Carboplatin + Docetaxel",
            emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: true,
            premedDexamethasone: "12mg",
            infusionDrugs: [doce(1), carbo(2)],
            postDischargeMeds: HEC,
            growthFactor: GF_REC
        },

        "Gemcitabine-Paclitaxel": {
            label: "Gemcitabine + Paclitaxel",
            emetogenicity: "moderate", hasPaclitaxel: true, hasDocetaxel: false,
            premedDexamethasone: "20mg",
            infusionDrugs: [pacli3w(1), gemcit(2)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Gemcitabine-Capecitabine": {
            label: "Gemcitabine + Capecitabine",
            emetogenicity: "low", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [gemcit(1)],
            postDischargeMeds: LOW.concat([PYRIDOXINE]),
            growthFactor: GF_NO
        },

        "Capecitabine-Docetaxel": {
            label: "Capecitabine + Docetaxel",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: true,
            premedDexamethasone: "8mg",
            infusionDrugs: [doce(1)],
            postDischargeMeds: MEC.concat([PYRIDOXINE]),
            growthFactor: GF_NO
        },

        "Capecitabine-Paclitaxel": {
            label: "Capecitabine + Paclitaxel",
            emetogenicity: "moderate", hasPaclitaxel: true, hasDocetaxel: false,
            premedDexamethasone: "20mg",
            infusionDrugs: [pacli3w(1)],
            postDischargeMeds: MEC.concat([PYRIDOXINE]),
            growthFactor: GF_NO
        },

        "Capecitabine-Vinorelbine": {
            label: "Capecitabine + Vinorelbine",
            emetogenicity: "low", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [vino(1)],
            postDischargeMeds: LOW.concat([PYRIDOXINE]),
            growthFactor: GF_NO
        },

        "Capecitabine-Ixabepilone": {
            label: "Capecitabine + Ixabepilone",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "8mg",
            infusionDrugs: [ixa(1)],
            postDischargeMeds: MEC.concat([PYRIDOXINE]),
            growthFactor: GF_NO
        },

        "Doxorubicin-Paclitaxel": {
            label: "Doxorubicin + Paclitaxel",
            emetogenicity: "high", hasPaclitaxel: true, hasDocetaxel: false,
            premedDexamethasone: "20mg",
            infusionDrugs: [pacli3w(1), doxo(2)],
            postDischargeMeds: HEC,
            growthFactor: GF_REC
        },

        "Docetaxel-Doxorubicin": {
            label: "Docetaxel + Doxorubicin",
            emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: true,
            premedDexamethasone: "12mg",
            infusionDrugs: [doce(1), doxo(2)],
            postDischargeMeds: HEC,
            growthFactor: GF_REC
        },

        "Single-Paclitaxel-3weekly": {
            label: "Paclitaxel monotherapy (3-weekly)",
            emetogenicity: "moderate", hasPaclitaxel: true, hasDocetaxel: false,
            premedDexamethasone: "20mg",
            infusionDrugs: [pacli3w(1)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Single-Paclitaxel-weekly": {
            label: "Paclitaxel monotherapy (weekly)",
            emetogenicity: "moderate", hasPaclitaxel: true, hasDocetaxel: false,
            premedDexamethasone: "12mg",
            infusionDrugs: [pacliWk(1)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Single-Nab-Paclitaxel-3weekly": {
            label: "Nab-paclitaxel monotherapy (3-weekly)",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "8mg",
            infusionDrugs: [nabp3w(1)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Single-Nab-Paclitaxel-weekly": {
            label: "Nab-paclitaxel monotherapy (weekly)",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "8mg",
            infusionDrugs: [nabpWk(1)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Docetaxel": {
            label: "Docetaxel monotherapy",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: true,
            premedDexamethasone: "8mg",
            infusionDrugs: [doce(1)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Single-Docetaxel": {
            label: "Docetaxel monotherapy",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: true,
            premedDexamethasone: "8mg",
            infusionDrugs: [doce(1)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Eribulin": {
            label: "Eribulin",
            emetogenicity: "low", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [eribul(1)],
            postDischargeMeds: LOW,
            growthFactor: GF_NO
        },

        "Single-Eribulin": {
            label: "Eribulin monotherapy",
            emetogenicity: "low", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [eribul(1)],
            postDischargeMeds: LOW,
            growthFactor: GF_NO
        },

        "Vinorelbine": {
            label: "Vinorelbine",
            emetogenicity: "low", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [vino(1)],
            postDischargeMeds: LOW,
            growthFactor: GF_NO
        },

        "Single-Vinorelbine": {
            label: "Vinorelbine monotherapy",
            emetogenicity: "low", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [vino(1)],
            postDischargeMeds: LOW,
            growthFactor: GF_NO
        },

        "Single-Gemcitabine": {
            label: "Gemcitabine monotherapy",
            emetogenicity: "low", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [gemcit(1)],
            postDischargeMeds: LOW,
            growthFactor: GF_NO
        },

        "Single-Doxorubicin": {
            label: "Doxorubicin monotherapy",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "8mg",
            infusionDrugs: [doxo(1)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "PLD": {
            label: "Pegylated Liposomal Doxorubicin (PLD)",
            emetogenicity: "low", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [pld(1)],
            postDischargeMeds: LOW,
            growthFactor: GF_NO
        },

        "Ixabepilone-Monotherapy": {
            label: "Ixabepilone monotherapy",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "8mg",
            infusionDrugs: [ixa(1)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Cisplatin-Monotherapy": {
            label: "Cisplatin monotherapy",
            emetogenicity: "high", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "12mg",
            infusionDrugs: [cisplat(1)],
            postDischargeMeds: HEC,
            growthFactor: GF_NO
        },

        "Carboplatin-Monotherapy": {
            label: "Carboplatin monotherapy",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "8mg",
            infusionDrugs: [carbo(1)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Sacituzumab-Govitecan": {
            label: "Sacituzumab Govitecan",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "8mg",
            infusionDrugs: [sacitu(1)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Sacituzumab-Govitecan-Pembrolizumab": {
            label: "Sacituzumab Govitecan + Pembrolizumab",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "8mg",
            infusionDrugs: [pembro(1), sacitu(2)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Datopotamab-Deruxtecan": {
            label: "Datopotamab Deruxtecan",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "8mg",
            infusionDrugs: [datopo(1)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "TDxd": {
            label: "Trastuzumab Deruxtecan (T-DXd)",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "8mg",
            infusionDrugs: [tdxd(1)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "TDxd-DESTINY-Breast05": {
            label: "Trastuzumab Deruxtecan (T-DXd)",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "8mg",
            infusionDrugs: [tdxd(1)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "TDxd-DESTINY-Breast06": {
            label: "Trastuzumab Deruxtecan (T-DXd)",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "8mg",
            infusionDrugs: [tdxd(1)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "TDxd-DESTINY-Breast04": {
            label: "Trastuzumab Deruxtecan (T-DXd)",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "8mg",
            infusionDrugs: [tdxd(1)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Trastuzumab-Deruxtecan-HER2low": {
            label: "Trastuzumab Deruxtecan (T-DXd)",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "8mg",
            infusionDrugs: [tdxd(1)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "TDxd-Pertuzumab": {
            label: "Trastuzumab Deruxtecan + Pertuzumab",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "8mg",
            infusionDrugs: [pertu(1), tdxd(2)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "TDM1-KATHERINE": {
            label: "Trastuzumab Emtansine (T-DM1)",
            emetogenicity: "low", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [tdm1(1)],
            postDischargeMeds: LOW,
            growthFactor: GF_NO
        },

        "TDM1": {
            label: "Trastuzumab Emtansine (T-DM1)",
            emetogenicity: "low", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [tdm1(1)],
            postDischargeMeds: LOW,
            growthFactor: GF_NO
        },

        "Trastuzumab-Adjuvant": {
            label: "Trastuzumab",
            emetogenicity: "low", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [tras(1)],
            postDischargeMeds: LOW,
            growthFactor: GF_NO
        },

        "Trastuzumab-Pertuzumab-Maintenance": {
            label: "Trastuzumab + Pertuzumab Maintenance",
            emetogenicity: "low", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [pertu(1), tras(2)],
            postDischargeMeds: LOW,
            growthFactor: GF_NO
        },

        "Pertuzumab-Trastuzumab-Docetaxel": {
            label: "Pertuzumab + Trastuzumab + Docetaxel (CLEOPATRA)",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: true,
            premedDexamethasone: "8mg",
            infusionDrugs: [pertu(1), tras(2), doce(3)],
            postDischargeMeds: MEC,
            growthFactor: GF_REC
        },

        "Pertuzumab-Trastuzumab-Paclitaxel": {
            label: "Pertuzumab + Trastuzumab + Paclitaxel",
            emetogenicity: "moderate", hasPaclitaxel: true, hasDocetaxel: false,
            premedDexamethasone: "20mg",
            infusionDrugs: [pertu(1), tras(2), pacli3w(3)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Paclitaxel-Trastuzumab-Weekly": {
            label: "Paclitaxel weekly + Trastuzumab",
            emetogenicity: "moderate", hasPaclitaxel: true, hasDocetaxel: false,
            premedDexamethasone: "12mg",
            infusionDrugs: [tras(1), pacliWk(2)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Trastuzumab-Paclitaxel": {
            label: "Trastuzumab + Paclitaxel",
            emetogenicity: "moderate", hasPaclitaxel: true, hasDocetaxel: false,
            premedDexamethasone: "20mg",
            infusionDrugs: [tras(1), pacli3w(2)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Trastuzumab-Docetaxel": {
            label: "Trastuzumab + Docetaxel",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: true,
            premedDexamethasone: "8mg",
            infusionDrugs: [tras(1), doce(2)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Trastuzumab-Vinorelbine": {
            label: "Trastuzumab + Vinorelbine",
            emetogenicity: "low", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [tras(1), vino(2)],
            postDischargeMeds: LOW,
            growthFactor: GF_NO
        },

        "Trastuzumab-Capecitabine": {
            label: "Trastuzumab + Capecitabine",
            emetogenicity: "low", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [tras(1)],
            postDischargeMeds: LOW.concat([PYRIDOXINE]),
            growthFactor: GF_NO
        },

        "Trastuzumab-Lapatinib": {
            label: "Trastuzumab + Lapatinib",
            emetogenicity: "low", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [tras(1)],
            postDischargeMeds: LOW,
            growthFactor: GF_NO
        },

        "Tucatinib-Trastuzumab-Capecitabine": {
            label: "Tucatinib + Trastuzumab + Capecitabine",
            emetogenicity: "low", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [tras(1)],
            postDischargeMeds: LOW.concat([PYRIDOXINE]),
            growthFactor: GF_NO
        },

        "Tucatinib-TDM1": {
            label: "Tucatinib + T-DM1",
            emetogenicity: "low", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [tdm1(1)],
            postDischargeMeds: LOW,
            growthFactor: GF_NO
        },

        "Gemcitabine-Carboplatin-Trastuzumab": {
            label: "Gemcitabine + Carboplatin + Trastuzumab",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "8mg",
            infusionDrugs: [tras(1), gemcit(2), carbo(3)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Margetuximab-Capecitabine": {
            label: "Margetuximab + Capecitabine",
            emetogenicity: "low", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [margetu(1)],
            postDischargeMeds: LOW.concat([PYRIDOXINE]),
            growthFactor: GF_NO
        },

        "Margetuximab-Eribulin": {
            label: "Margetuximab + Eribulin",
            emetogenicity: "low", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [margetu(1), eribul(2)],
            postDischargeMeds: LOW,
            growthFactor: GF_NO
        },

        "Margetuximab-Vinorelbine": {
            label: "Margetuximab + Vinorelbine",
            emetogenicity: "low", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [margetu(1), vino(2)],
            postDischargeMeds: LOW,
            growthFactor: GF_NO
        },

        "Margetuximab-Gemcitabine": {
            label: "Margetuximab + Gemcitabine",
            emetogenicity: "low", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [margetu(1), gemcit(2)],
            postDischargeMeds: LOW,
            growthFactor: GF_NO
        },

        "Pembrolizumab-Nab-Paclitaxel": {
            label: "Pembrolizumab + Nab-paclitaxel",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "8mg",
            infusionDrugs: [pembro(1), nabp3w(2)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Pembrolizumab-Paclitaxel": {
            label: "Pembrolizumab + Paclitaxel",
            emetogenicity: "moderate", hasPaclitaxel: true, hasDocetaxel: false,
            premedDexamethasone: "20mg",
            infusionDrugs: [pembro(1), pacli3w(2)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Pembrolizumab-Gemcitabine-Carboplatin": {
            label: "Pembrolizumab + Gemcitabine + Carboplatin",
            emetogenicity: "moderate", hasPaclitaxel: false, hasDocetaxel: false,
            premedDexamethasone: "8mg",
            infusionDrugs: [pembro(1), gemcit(2), carbo(3)],
            postDischargeMeds: MEC,
            growthFactor: GF_NO
        },

        "Pembrolizumab-Maintenance": {
            label: "Pembrolizumab Maintenance",
            emetogenicity: "minimal", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [pembro(1)],
            postDischargeMeds: LOW,
            growthFactor: GF_NO
        },

        "Pembrolizumab-MSI-H": {
            label: "Pembrolizumab (MSI-H/dMMR)",
            emetogenicity: "minimal", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [pembro(1)],
            postDischargeMeds: LOW,
            growthFactor: GF_NO
        },

        "Pembrolizumab-TMB-H": {
            label: "Pembrolizumab (TMB-H)",
            emetogenicity: "minimal", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [pembro(1)],
            postDischargeMeds: LOW,
            growthFactor: GF_NO
        },

        "Dostarlimab-dMMR": {
            label: "Dostarlimab (dMMR)",
            emetogenicity: "minimal", hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [dostarlimab(1)],
            postDischargeMeds: LOW,
            growthFactor: GF_NO
        },

        // =====================================================
        // ORAL REGIMENS (isOral: true)
        // =====================================================

        "Olaparib-Adjuvant": {
            label: "Olaparib (PARP inhibitor)",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Olaparib-BRCA": {
            label: "Olaparib (PARP inhibitor)",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Talazoparib-BRCA": {
            label: "Talazoparib (PARP inhibitor)",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Abemaciclib-Tamoxifen": {
            label: "Abemaciclib + Tamoxifen",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Ribociclib-AI-Adjuvant": {
            label: "Ribociclib + Anastrozole",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Ribociclib-Letrozole-Adjuvant": {
            label: "Ribociclib + Letrozole",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Tamoxifen": {
            label: "Tamoxifen",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Anastrozole": {
            label: "Anastrozole",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Letrozole": {
            label: "Letrozole",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Tamoxifen-Goserelin": {
            label: "Tamoxifen + Goserelin",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Anastrozole-Goserelin": {
            label: "Anastrozole + Goserelin",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Palbociclib-Letrozole": {
            label: "Palbociclib + Letrozole",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Ribociclib-Letrozole": {
            label: "Ribociclib + Letrozole",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Abemaciclib-Letrozole": {
            label: "Abemaciclib + Letrozole",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Palbociclib-Fulvestrant": {
            label: "Palbociclib + Fulvestrant",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Ribociclib-Fulvestrant": {
            label: "Ribociclib + Fulvestrant",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Abemaciclib-Fulvestrant": {
            label: "Abemaciclib + Fulvestrant",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Everolimus-Exemestane": {
            label: "Everolimus + Exemestane",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Alpelisib-Fulvestrant": {
            label: "Alpelisib + Fulvestrant",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM.concat([GLUCOSE_MON]), growthFactor: GF_NO
        },
        "Elacestrant": {
            label: "Elacestrant",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Inavolisib-Palbociclib-Fulvestrant": {
            label: "Inavolisib + Palbociclib + Fulvestrant",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Capivasertib-Fulvestrant": {
            label: "Capivasertib + Fulvestrant",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Single-Capecitabine": {
            label: "Capecitabine",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM.concat([PYRIDOXINE]), growthFactor: GF_NO
        },
        "Capecitabine-Adjuvant": {
            label: "Capecitabine",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM.concat([PYRIDOXINE]), growthFactor: GF_NO
        },
        "Imlunestrant": {
            label: "Imlunestrant",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Capecitabine-Lapatinib": {
            label: "Capecitabine + Lapatinib",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM.concat([PYRIDOXINE]), growthFactor: GF_NO
        },
        "Capecitabine-Neratinib": {
            label: "Capecitabine + Neratinib",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM.concat([PYRIDOXINE, LOPERAMIDE]), growthFactor: GF_NO
        },
        "Single-Neratinib": {
            label: "Neratinib",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM.concat([LOPERAMIDE]), growthFactor: GF_NO
        },
        "Neratinib-Extended": {
            label: "Neratinib (extended adjuvant)",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM.concat([LOPERAMIDE]), growthFactor: GF_NO
        },
        "Larotrectinib-NTRK": {
            label: "Larotrectinib",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        },
        "Entrectinib-NTRK": {
            label: "Entrectinib",
            emetogenicity: "oral", isOral: true, hasPaclitaxel: false, hasDocetaxel: false,
            infusionDrugs: [], postDischargeMeds: ORAL_PM, growthFactor: GF_NO
        }

    };
})();
