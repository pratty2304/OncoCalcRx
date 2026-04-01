window.protocolData = window.protocolData || {};
window.protocolData.biliary = {
  "adjuvant": {
    "Single-Capecitabine": {
      "name": "Capecitabine monotherapy (BILCAP)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Capecitabine",
          "dose": 1250,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D14, every 21 days"
        }
      ]
    },
    "Single-S1-Adjuvant": {
      "name": "S-1 (Tegafur/Gimeracil/Oteracil) [ASCOT/JCOG1202]",
      "cycles": 4,
      "drugs": [
        {
          "name": "S-1",
          "dose": 50,
          "unit": "mg",
          "isOralTargeted": true,
          "schedule": "PO twice daily D1–28, every 42 days × 4 cycles. BSA-tiered dosing: BSA <1.25 m² → 40 mg BD; BSA 1.25–1.5 m² → 50 mg BD; BSA >1.5 m² → 60 mg BD"
        }
      ]
    },
    "Gemcitabine-Cisplatin": {
      "name": "Gemcitabine + Cisplatin (GC)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 25,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        }
      ]
    },
    "Capecitabine-RT": {
      "name": "Capecitabine + RT",
      "cycles": 1,
      "drugs": [
        {
          "name": "Capecitabine",
          "dose": 825,
          "unit": "mg/m²",
          "schedule": "PO twice daily on days of RT"
        }
      ]
    },
    "5FU-RT-Adjuvant": {
      "name": "5-FU + concurrent RT",
      "cycles": 1,
      "drugs": [
        {
          "name": "5-Fluorouracil (continuous infusion)",
          "dose": 225,
          "unit": "mg/m²",
          "schedule": "daily CI during radiation therapy"
        }
      ]
    },
    "GemCap-then-CapRT-Adjuvant": {
      "name": "Gem/Cap → Cap + RT (SWOG S0809)",
      "cycles": 4,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, q21days x 4 cycles (chemo phase)"
        },
        {
          "name": "Capecitabine (chemo phase)",
          "dose": 750,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D14, q21days x 4 cycles"
        },
        {
          "name": "Capecitabine (concurrent RT phase)",
          "dose": 665,
          "unit": "mg/m²",
          "schedule": "PO twice daily on days of RT (45-59.4 Gy)"
        }
      ]
    },
    "Gemcitabine-Capecitabine": {
      "name": "Gemcitabine + Capecitabine (GemCap)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Capecitabine",
          "dose": 830,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D14, every 21 days"
        }
      ]
    },
    "Single-5FU-Adjuvant": {
      "name": "5-Fluorouracil monotherapy",
      "cycles": 6,
      "drugs": [
        {
          "name": "5-Fluorouracil",
          "dose": 500,
          "unit": "mg/m²",
          "schedule": "IV bolus D1-D5, every 28 days"
        }
      ]
    },
    "Single-Gemcitabine": {
      "name": "Gemcitabine monotherapy",
      "cycles": 6,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, every 28 days"
        }
      ]
    }
  },
  "metastatic": {
    "Gemcitabine-Cisplatin-Durvalumab": {
      "name": "Gemcitabine + Cisplatin + Durvalumab (TOPAZ-1)",
      "cycles": 8,
      "cyclesNote": "GemCis for 8 cycles then both stopped; Durvalumab switches to 1500mg Q4W monotherapy until progression (no maximum)",
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days. Stopped after 8 cycles"
        },
        {
          "name": "Cisplatin",
          "dose": 25,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days. Maximum 8 cycles, then discontinued"
        },
        {
          "name": "Durvalumab",
          "dose": 1500,
          "unit": "mg",
          "schedule": "D1, every 21 days for 8 cycles (induction), then 1500mg every 28 days as monotherapy until progression (no maximum)"
        }
      ]
    },
    "Gemcitabine-Cisplatin-Pembrolizumab": {
      "name": "Gemcitabine + Cisplatin + Pembrolizumab (KEYNOTE-966)",
      "cycles": 8,
      "cyclesNote": "Cisplatin: max 8 cycles then stopped; Gemcitabine continues until progression (no cap); Pembrolizumab max 35 cycles (~2 years)",
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days. Continues beyond cycle 8 until progression or toxicity (no maximum)"
        },
        {
          "name": "Cisplatin",
          "dose": 25,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days. Maximum 8 cycles, then discontinued"
        },
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days. Maximum 35 cycles (~2 years)"
        }
      ]
    },
    "Gemcitabine-Cisplatin": {
      "name": "Gemcitabine + Cisplatin (GC) (ABC-02)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 25,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        }
      ]
    },
    "GEMOX": {
      "name": "Gemcitabine + Oxaliplatin (GEMOX)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Oxaliplatin",
          "dose": 85,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Gemcitabine-Nabpaclitaxel": {
      "name": "Gemcitabine + Nab-paclitaxel",
      "cycles": 6,
      "drugs": [
        {
          "name": "Nab-paclitaxel",
          "dose": 125,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        }
      ]
    },
    "Capecitabine-Cisplatin": {
      "name": "Capecitabine + Cisplatin",
      "cycles": 6,
      "drugs": [
        {
          "name": "Capecitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D14, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Gemcitabine-Capecitabine": {
      "name": "Gemcitabine + Capecitabine",
      "cycles": 6,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Capecitabine",
          "dose": 650,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D14, every 21 days"
        }
      ]
    },
    "mFOLFOX6": {
      "name": "mFOLFOX6 (ABC-06)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Oxaliplatin",
          "dose": 85,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days"
        },
        {
          "name": "Leucovorin",
          "dose": 400,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 400,
          "unit": "mg/m²",
          "schedule": "Bolus D1, every 14 days"
        },
        {
          "name": "5-Fluorouracil (continuous infusion)",
          "dose": 2400,
          "unit": "mg/m²",
          "schedule": "D1-D2 (46hr CI), every 14 days"
        }
      ]
    },
    "5FU-Cisplatin": {
      "name": "5-FU + Cisplatin",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "5-Fluorouracil (continuous infusion)",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "daily x 4 days, every 21 days"
        }
      ]
    },
    "CapeOX": {
      "name": "Capecitabine + Oxaliplatin (CAPOX/XELOX)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Oxaliplatin",
          "dose": 130,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Capecitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D14, every 21 days"
        }
      ]
    },
    "Single-Gemcitabine": {
      "name": "Gemcitabine monotherapy",
      "cycles": 6,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        }
      ]
    },
    "Gemcitabine-Cisplatin-Nabpaclitaxel": {
      "name": "Gemcitabine + Cisplatin + Nab-paclitaxel (SWOG S1815)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 800,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 25,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Nab-paclitaxel",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        }
      ]
    },
    "Dabrafenib-Trametinib": {
      "name": "Dabrafenib + Trametinib (BRAF V600E mutation)",
      "cycles": "Until progression",
      "drugs": [
        {
          "name": "Dabrafenib",
          "dose": 150,
          "unit": "mg",
          "schedule": "PO twice daily",
          "isOralTargeted": true
        },
        {
          "name": "Trametinib",
          "dose": 2,
          "unit": "mg",
          "schedule": "PO once daily",
          "isOralTargeted": true
        }
      ]
    },
    "Ivosidenib": {
      "name": "Ivosidenib (ClarIDHy) (IDH1 mutation)",
      "cycles": "Until progression",
      "drugs": [
        {
          "name": "Ivosidenib",
          "dose": 500,
          "unit": "mg",
          "schedule": "PO once daily",
          "isOralTargeted": true
        }
      ]
    },
    "Pemigatinib": {
      "name": "Pemigatinib (FIGHT-202) (FGFR2 fusions)",
      "cycles": "Until progression",
      "drugs": [
        {
          "name": "Pemigatinib",
          "dose": 13.5,
          "unit": "mg",
          "schedule": "PO once daily for 14 days, then 7 days off",
          "isOralTargeted": true
        }
      ]
    },
    "Futibatinib": {
      "name": "Futibatinib (FOENIX-CCA2) (FGFR2 fusions)",
      "cycles": "Until progression",
      "drugs": [
        {
          "name": "Futibatinib",
          "dose": 20,
          "unit": "mg",
          "schedule": "PO once daily until progression",
          "isOralTargeted": true
        }
      ]
    },
    "Pembrolizumab-Monotherapy": {
      "name": "Pembrolizumab monotherapy (MSI-H/dMMR/TMB-H)",
      "cycles": "Until progression",
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days (or 400mg q6weeks)"
        }
      ]
    },
    "Dostarlimab-Monotherapy": {
      "name": "Dostarlimab (dMMR/MSI-H)",
      "cycles": "Until progression",
      "drugs": [
        {
          "name": "Dostarlimab",
          "dose": 500,
          "unit": "mg",
          "schedule": "q3weeks x 4, then 1000mg q6weeks"
        }
      ]
    },
    "Nivolumab-Ipilimumab": {
      "name": "Nivolumab + Ipilimumab (MSI-H/dMMR/TMB-H)",
      "cycles": "Until progression",
      "cyclesNote": "Ipilimumab: 4 doses (q6weeks); Nivolumab continues until progression",
      "drugs": [
        {
          "name": "Nivolumab",
          "dose": 3,
          "unit": "mg/kg",
          "schedule": "q2weeks x 4, then 480mg flat dose q4weeks"
        },
        {
          "name": "Ipilimumab",
          "dose": 1,
          "unit": "mg/kg",
          "schedule": "q6weeks x 4 doses"
        }
      ]
    },
    "Zanidatamab": {
      "name": "Zanidatamab (HERIZON-BTC-01) (HER2+ IHC 3+)",
      "cycles": "Until progression",
      "drugs": [
        {
          "name": "Zanidatamab",
          "dose": 20,
          "unit": "mg/kg",
          "schedule": "IV q2weeks until progression"
        }
      ]
    },
    "Trastuzumab-Deruxtecan": {
      "name": "Trastuzumab deruxtecan (T-DXd) (HER2+ IHC 3+)",
      "cycles": "Until progression",
      "drugs": [
        {
          "name": "Trastuzumab deruxtecan",
          "dose": 5.4,
          "unit": "mg/kg",
          "schedule": "IV q3weeks until progression"
        }
      ]
    },
    "Trastuzumab-Pertuzumab": {
      "name": "Trastuzumab + Pertuzumab (HER2+ IHC 3+)",
      "cycles": "Until progression",
      "drugs": [
        {
          "name": "Trastuzumab",
          "dose": 8,
          "maintenanceDose": 6,
          "unit": "mg/kg",
          "schedule": "loading 8mg/kg, then 6mg/kg q3weeks",
          "hasLoadingDose": true
        },
        {
          "name": "Pertuzumab",
          "dose": 840,
          "maintenanceDose": 420,
          "unit": "mg",
          "schedule": "loading 840mg, then 420mg q3weeks",
          "hasLoadingDose": true
        }
      ]
    },
    "Tucatinib-Trastuzumab": {
      "name": "Tucatinib + Trastuzumab (MOUNTAINEER) (HER2+ IHC 3+)",
      "cycles": "Until progression",
      "drugs": [
        {
          "name": "Tucatinib",
          "dose": 300,
          "unit": "mg",
          "schedule": "PO twice daily continuously",
          "isOralTargeted": true
        },
        {
          "name": "Trastuzumab",
          "dose": 8,
          "maintenanceDose": 6,
          "unit": "mg/kg",
          "schedule": "loading 8mg/kg IV cycle 1, then 6mg/kg q3weeks",
          "hasLoadingDose": true
        }
      ]
    },
    "Entrectinib": {
      "name": "Entrectinib (NTRK fusion+)",
      "cycles": "Until progression",
      "drugs": [
        {
          "name": "Entrectinib",
          "dose": 600,
          "unit": "mg",
          "schedule": "PO once daily until progression",
          "isOralTargeted": true
        }
      ]
    },
    "Larotrectinib": {
      "name": "Larotrectinib (NTRK fusion+)",
      "cycles": "Until progression",
      "drugs": [
        {
          "name": "Larotrectinib",
          "dose": 100,
          "unit": "mg",
          "schedule": "PO twice daily until progression",
          "isOralTargeted": true
        }
      ]
    },
    "Selpercatinib": {
      "name": "Selpercatinib (RET fusion+)",
      "cycles": "Until progression",
      "drugs": [
        {
          "name": "Selpercatinib",
          "dose": 160,
          "unit": "mg",
          "schedule": "PO twice daily until progression",
          "isOralTargeted": true
        }
      ]
    },
    "Adagrasib": {
      "name": "Adagrasib (KRAS G12C mutation)",
      "cycles": "Until progression",
      "drugs": [
        {
          "name": "Adagrasib",
          "dose": 600,
          "unit": "mg",
          "schedule": "PO twice daily until progression",
          "isOralTargeted": true
        }
      ]
    }
  }
};
