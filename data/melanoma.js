window.protocolData = window.protocolData || {};
window.protocolData.melanoma = {
  "neoadjuvant": {
    "Pembrolizumab-Neoadjuvant": {
      "name": "Pembrolizumab (SWOG S1801) (PD-1 inhibitor)",
      "cycles": 3,
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days x 3 cycles"
        }
      ]
    },
    "Nivolumab-Ipilimumab-Neoadjuvant": {
      "name": "Nivolumab + Ipilimumab (OpACIN-neo/NADINA)",
      "cycles": 2,
      "drugs": [
        {
          "name": "Nivolumab",
          "dose": 1,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days x 2 cycles"
        },
        {
          "name": "Ipilimumab",
          "dose": 3,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days x 2 cycles"
        }
      ]
    }
  },
  "adjuvant": {
    "Pembrolizumab-Adjuvant": {
      "name": "Pembrolizumab (KEYNOTE-054/716) (PD-1 inhibitor)",
      "cycles": 17,
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days x 17 cycles (1 year)"
        }
      ]
    },
    "Nivolumab-Adjuvant": {
      "name": "Nivolumab (CheckMate 238) (PD-1 inhibitor)",
      "cycles": 26,
      "drugs": [
        {
          "name": "Nivolumab",
          "dose": 240,
          "unit": "mg",
          "schedule": "D1, every 14 days x 12 months"
        }
      ]
    },
    "Dabrafenib-Trametinib-Adjuvant": {
      "name": "Dabrafenib + Trametinib (COMBI-AD) (BRAF V600E/K)",
      "cycles": 26,
      "drugs": [
        {
          "name": "Dabrafenib",
          "dose": 150,
          "unit": "mg",
          "schedule": "PO twice daily x 12 months"
        },
        {
          "name": "Trametinib",
          "dose": 2,
          "unit": "mg",
          "schedule": "PO once daily x 12 months"
        }
      ]
    },
    "Interferon-alpha-2b-Adjuvant": {
      "name": "Interferon alfa-2b (E1684)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Interferon alfa-2b",
          "dose": 20,
          "unit": "MIU/m²",
          "schedule": "D1-5 weekly x4 weeks, then 10 MIU/m² TIW x48 weeks"
        }
      ]
    },
    "Peg-Interferon-alpha-2b-Adjuvant": {
      "name": "Peginterferon alfa-2b (EORTC 18991)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Peginterferon alfa-2b",
          "dose": 6,
          "unit": "mcg/kg",
          "schedule": "SC weekly x8 weeks, then 3 mcg/kg weekly"
        }
      ]
    }
  },
  "metastatic": {
    "Pembrolizumab": {
      "name": "Pembrolizumab (KEYNOTE-006) (PD-1 inhibitor)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Nivolumab": {
      "name": "Nivolumab (CheckMate 066) (PD-1 inhibitor)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Nivolumab",
          "dose": 240,
          "unit": "mg",
          "schedule": "D1, every 14 days"
        }
      ]
    },
    "Nivolumab-Ipilimumab": {
      "name": "Nivolumab + Ipilimumab (CheckMate 067)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Nivolumab",
          "dose": 1,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days x4 cycles"
        },
        {
          "name": "Ipilimumab",
          "dose": 3,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days x4 cycles"
        }
      ]
    },
    "Nivolumab-Relatlimab": {
      "name": "Nivolumab + Relatlimab (RELATIVITY-047)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Nivolumab",
          "dose": 480,
          "unit": "mg",
          "schedule": "D1, every 28 days"
        },
        {
          "name": "Relatlimab",
          "dose": 160,
          "unit": "mg",
          "schedule": "D1, every 28 days"
        }
      ]
    },
    "Ipilimumab": {
      "name": "Ipilimumab (MDX010-20) (CTLA-4 inhibitor)",
      "cycles": 4,
      "drugs": [
        {
          "name": "Ipilimumab",
          "dose": 3,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days x4 cycles"
        }
      ]
    },
    "Dabrafenib-Trametinib": {
      "name": "Dabrafenib + Trametinib (COMBI-d/v) (BRAF V600E/K)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Dabrafenib",
          "dose": 150,
          "unit": "mg",
          "schedule": "PO twice daily continuously"
        },
        {
          "name": "Trametinib",
          "dose": 2,
          "unit": "mg",
          "schedule": "PO once daily, continuous"
        }
      ]
    },
    "Vemurafenib-Cobimetinib": {
      "name": "Vemurafenib + Cobimetinib (coBRIM) (BRAF V600E/K)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Vemurafenib",
          "dose": 960,
          "unit": "mg",
          "schedule": "PO twice daily continuously"
        },
        {
          "name": "Cobimetinib",
          "dose": 60,
          "unit": "mg",
          "schedule": "PO once daily D1-D21, every 28 days"
        }
      ]
    },
    "Encorafenib-Binimetinib": {
      "name": "Encorafenib + Binimetinib (COLUMBUS) (BRAF V600E/K)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Encorafenib",
          "dose": 450,
          "unit": "mg",
          "schedule": "PO once daily, continuous"
        },
        {
          "name": "Binimetinib",
          "dose": 45,
          "unit": "mg",
          "schedule": "PO twice daily continuously"
        }
      ]
    },
    "Atezolizumab-Vemurafenib-Cobimetinib": {
      "name": "Atezolizumab + Vemurafenib + Cobimetinib (IMspire150) (BRAF V600)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Atezolizumab",
          "dose": 840,
          "unit": "mg",
          "schedule": "D1, D15, every 28 days"
        },
        {
          "name": "Vemurafenib",
          "dose": 720,
          "unit": "mg",
          "schedule": "PO twice daily continuously"
        },
        {
          "name": "Cobimetinib",
          "dose": 60,
          "unit": "mg",
          "schedule": "PO once daily D1-D21, every 28 days"
        }
      ]
    },
    "Dabrafenib": {
      "name": "Dabrafenib (BREAK-3) (BRAF V600E/K)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Dabrafenib",
          "dose": 150,
          "unit": "mg",
          "schedule": "PO twice daily continuously"
        }
      ]
    },
    "Vemurafenib": {
      "name": "Vemurafenib (BRIM-3) (BRAF V600E/K)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Vemurafenib",
          "dose": 960,
          "unit": "mg",
          "schedule": "PO twice daily continuously"
        }
      ]
    },
    "Encorafenib": {
      "name": "Encorafenib (BRAF V600E/K)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Encorafenib",
          "dose": 450,
          "unit": "mg",
          "schedule": "PO once daily, continuous"
        }
      ]
    },
    "Tebentafusp": {
      "name": "Tebentafusp (IMCgp100-202) (uveal melanoma, HLA-A*02:01)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Tebentafusp",
          "dose": 68,
          "unit": "mcg",
          "schedule": "D1, every 7 days"
        }
      ]
    },
    "Lifileucel": {
      "name": "Lifileucel (Amtagvi) (TIL cell therapy)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Cyclophosphamide",
          "dose": 60,
          "unit": "mg/kg",
          "schedule": "daily x2 days (lymphodepletion)"
        },
        {
          "name": "Mesna",
          "dose": 12,
          "unit": "mg/kg",
          "schedule": "every 4 hours x15 doses (uroprotection)"
        },
        {
          "name": "Fludarabine",
          "dose": 25,
          "unit": "mg/m²",
          "schedule": "daily x5 days (lymphodepletion)"
        },
        {
          "name": "Lifileucel",
          "dose": "21.1 x 10^9",
          "unit": "viable cells",
          "schedule": "single infusion on day 0"
        },
        {
          "name": "Aldesleukin (IL-2)",
          "dose": 600000,
          "unit": "IU/kg",
          "schedule": "every 8-12 hours x6 doses (post-infusion support)"
        }
      ]
    },
    "Talimogene-laherparepvec": {
      "name": "Talimogene laherparepvec (OPTiM) (intralesional oncolytic virus)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Talimogene laherparepvec",
          "dose": "10^6 PFU/mL initial, then 10^8 PFU/mL",
          "unit": "PFU/mL",
          "schedule": "intralesional D1, then every 14 days"
        }
      ]
    },
    "Aldesleukin": {
      "name": "Aldesleukin (high-dose IL-2)",
      "cycles": 2,
      "drugs": [
        {
          "name": "Aldesleukin (IL-2)",
          "dose": 600000,
          "unit": "IU/kg",
          "schedule": "every 8 hours x14 doses, repeat x2 cycles"
        }
      ]
    },
    "Dacarbazine": {
      "name": "Dacarbazine",
      "cycles": 6,
      "drugs": [
        {
          "name": "Dacarbazine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Temozolomide": {
      "name": "Temozolomide",
      "cycles": 6,
      "drugs": [
        {
          "name": "Temozolomide",
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "PO D1-D5, every 28 days"
        }
      ]
    },
    "Carboplatin-Paclitaxel": {
      "name": "Carboplatin + Paclitaxel",
      "cycles": 6,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 6",
          "unit": "AUC",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Paclitaxel",
          "dose": 175,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Cisplatin-Dacarbazine": {
      "name": "Cisplatin + Dacarbazine",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 20,
          "unit": "mg/m²",
          "schedule": "D1-D4, every 21 days"
        },
        {
          "name": "Dacarbazine",
          "dose": 800,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Imatinib-KIT": {
      "name": "Imatinib (KIT-mutant melanoma)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Imatinib",
          "dose": 400,
          "unit": "mg",
          "schedule": "PO once daily, continuous"
        }
      ]
    }
  }
};
