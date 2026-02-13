window.protocolData = window.protocolData || {};
window.protocolData.esophageal = {
  "neoadjuvant": {
    "CROSS-Neoadjuvant": {
      "name": "Carboplatin + Paclitaxel + RT (CROSS)",
      "cycles": 5,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 2",
          "unit": "AUC",
          "schedule": "D1, every 7 days x 5 weeks (with concurrent RT)"
        },
        {
          "name": "Paclitaxel",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 7 days x 5 weeks (with concurrent RT)"
        }
      ]
    },
    "5FU-Cisplatin-RT-Neo": {
      "name": "5-FU + Cisplatin + RT",
      "cycles": 2,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1, week 1 and 5 x 2 cycles (with concurrent RT)"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "CI D1-D4, week 1 and 5 x 2 cycles (with concurrent RT)"
        }
      ]
    }
  },
  "definitive": {
    "5FU-Cisplatin-RT-Definitive": {
      "name": "5-FU + Cisplatin + RT (Herskovic)",
      "cycles": 2,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1, week 1 and 5 (with concurrent RT 50.4 Gy)"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "CI D1-D4, week 1 and 5 (with concurrent RT 50.4 Gy)"
        }
      ]
    },
    "Carboplatin-Paclitaxel-RT-Definitive": {
      "name": "Carboplatin + Paclitaxel + RT (CROSS doses)",
      "cycles": 5,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 2",
          "unit": "AUC",
          "schedule": "D1, every 7 days x 5 weeks (with concurrent RT 50.4 Gy)"
        },
        {
          "name": "Paclitaxel",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 7 days x 5 weeks (with concurrent RT 50.4 Gy)"
        }
      ]
    },
    "FOLFOX-RT-Definitive": {
      "name": "FOLFOX + RT (PRODIGE5/ACCORD17)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Oxaliplatin",
          "dose": 85,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days (with concurrent RT 50 Gy)"
        },
        {
          "name": "Leucovorin",
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days (with concurrent RT)"
        },
        {
          "name": "5-Fluorouracil (bolus)",
          "dose": 400,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days (with concurrent RT)"
        },
        {
          "name": "5-Fluorouracil (continuous infusion)",
          "dose": 1600,
          "unit": "mg/m²",
          "schedule": "CI over 46 hours D1-D2, every 14 days (with concurrent RT)"
        }
      ]
    }
  },
  "perioperative": {
    "FLOT4-Perioperative": {
      "name": "FLOT4 (Docetaxel + Oxaliplatin + Leucovorin + 5-FU) (FLOT4-AIO)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Docetaxel",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days x 8 cycles (4 preop + 4 postop)"
        },
        {
          "name": "Oxaliplatin",
          "dose": 85,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days x 8 cycles (4 preop + 4 postop)"
        },
        {
          "name": "Leucovorin",
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days x 8 cycles (4 preop + 4 postop)"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 2600,
          "unit": "mg/m²",
          "schedule": "CI over 24 hours D1, every 14 days x 8 cycles (4 preop + 4 postop)"
        }
      ]
    },
    "FLOT-Durvalumab-Perioperative": {
      "name": "FLOT + Durvalumab (MATTERHORN) (GEJ adenocarcinoma)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Docetaxel",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days x 8 cycles (4 preop + 4 postop)"
        },
        {
          "name": "Oxaliplatin",
          "dose": 85,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days x 8 cycles (4 preop + 4 postop)"
        },
        {
          "name": "Leucovorin",
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days x 8 cycles (4 preop + 4 postop)"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 2600,
          "unit": "mg/m²",
          "schedule": "CI over 24 hours D1, every 14 days x 8 cycles (4 preop + 4 postop)"
        },
        {
          "name": "Durvalumab",
          "dose": 1500,
          "unit": "mg",
          "schedule": "q4w during FLOT, then q4w maintenance postop (total 1 year)"
        }
      ]
    },
    "ECF-MAGIC-Perioperative": {
      "name": "ECF (Epirubicin + Cisplatin + 5-FU) (MAGIC)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Epirubicin",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles (3 preop + 3 postop)"
        },
        {
          "name": "Cisplatin",
          "dose": 60,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles (3 preop + 3 postop)"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "CI D1-D21, every 21 days x 6 cycles (3 preop + 3 postop)"
        }
      ]
    },
    "mFOLFOX6-Perioperative": {
      "name": "mFOLFOX6",
      "cycles": 8,
      "drugs": [
        {
          "name": "Oxaliplatin",
          "dose": 85,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days x 8 cycles (4 preop + 4 postop)"
        },
        {
          "name": "Leucovorin",
          "dose": 400,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days x 8 cycles (4 preop + 4 postop)"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 400,
          "unit": "mg/m²",
          "schedule": "Bolus D1, every 14 days x 8 cycles (4 preop + 4 postop)"
        },
        {
          "name": "5-Fluorouracil (continuous infusion)",
          "dose": 2400,
          "unit": "mg/m²",
          "schedule": "CI over 46 hours D1-D2, every 14 days x 8 cycles (4 preop + 4 postop)"
        }
      ]
    },
    "CapeOX-Perioperative": {
      "name": "Capecitabine + Oxaliplatin (CAPOX)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Oxaliplatin",
          "dose": 130,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 8 cycles (4 preop + 4 postop)"
        },
        {
          "name": "Capecitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D14, every 21 days x 8 cycles (4 preop + 4 postop)"
        }
      ]
    }
  },
  "adjuvant": {
    "Nivolumab-Adjuvant": {
      "name": "Nivolumab (CheckMate-577) (post-neoadjuvant CRT with residual disease)",
      "cycles": 17,
      "drugs": [
        {
          "name": "Nivolumab",
          "dose": 240,
          "unit": "mg",
          "schedule": "D1, every 14 days x 16 weeks, then 480mg every 28 days, total 1 year"
        }
      ]
    }
  },
  "metastatic": {
    "Pembrolizumab-Cisplatin-5FU": {
      "name": "Pembrolizumab + Cisplatin + 5-FU (KEYNOTE-590)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days (max 6 cycles)"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 800,
          "unit": "mg/m²",
          "schedule": "CI D1-D5, every 21 days"
        }
      ]
    },
    "Nivolumab-FOLFOX": {
      "name": "Nivolumab + mFOLFOX6 (CheckMate-649) (adenocarcinoma, PD-L1 CPS ≥5)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Nivolumab",
          "dose": 240,
          "unit": "mg",
          "schedule": "D1, every 14 days"
        },
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
          "schedule": "CI over 46 hours D1-D2, every 14 days"
        }
      ]
    },
    "Nivolumab-CAPOX": {
      "name": "Nivolumab + CAPOX (CheckMate-649) (adenocarcinoma, PD-L1 CPS ≥5)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Nivolumab",
          "dose": 360,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        },
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
    "Nivolumab-Cisplatin-5FU": {
      "name": "Nivolumab + Cisplatin + 5-FU (CheckMate-648) (ESCC)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Nivolumab",
          "dose": 240,
          "unit": "mg",
          "schedule": "D1, every 14 days"
        },
        {
          "name": "Cisplatin",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 800,
          "unit": "mg/m²",
          "schedule": "CI D1-D5, every 21 days"
        }
      ]
    },
    "Nivolumab-Ipilimumab": {
      "name": "Nivolumab + Ipilimumab (CheckMate-648) (ESCC)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Nivolumab",
          "dose": 3,
          "unit": "mg/kg",
          "schedule": "D1, every 14 days"
        },
        {
          "name": "Ipilimumab",
          "dose": 1,
          "unit": "mg/kg",
          "schedule": "D1, every 6 weeks"
        }
      ]
    },
    "Tislelizumab-Cisplatin-5FU": {
      "name": "Tislelizumab + Cisplatin + 5-FU (RATIONALE-306) (ESCC)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Tislelizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days (max 6 cycles)"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 800,
          "unit": "mg/m²",
          "schedule": "CI D1-D5, every 21 days"
        }
      ]
    },
    "mFOLFOX6-Pembrolizumab": {
      "name": "mFOLFOX6 + Pembrolizumab (KEYNOTE-590) (PD-L1 CPS ≥1)",
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
          "schedule": "CI over 46 hours D1-D2, every 14 days"
        },
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Cisplatin-5FU-Trastuzumab-HER2": {
      "name": "Cisplatin + 5-FU + Trastuzumab (ToGA) (HER2+)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Trastuzumab",
          "dose": 8,
          "maintenanceDose": 6,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days (loading dose 8 mg/kg, then 6 mg/kg)",
          "hasLoadingDose": true
        },
        {
          "name": "Cisplatin",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days (max 6 cycles)"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 800,
          "unit": "mg/m²",
          "schedule": "CI D1-D5, every 21 days"
        }
      ]
    },
    "CapeOX-Trastuzumab-HER2": {
      "name": "Capecitabine + Oxaliplatin + Trastuzumab (ToGA) (HER2+)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Trastuzumab",
          "dose": 8,
          "maintenanceDose": 6,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days (loading dose 8 mg/kg, then 6 mg/kg)",
          "hasLoadingDose": true
        },
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
    "FOLFOX-Trastuzumab-HER2": {
      "name": "mFOLFOX6 + Trastuzumab (HER2+)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Trastuzumab",
          "dose": 8,
          "maintenanceDose": 6,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days (loading dose 8 mg/kg, then 6 mg/kg)",
          "hasLoadingDose": true
        },
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
          "schedule": "CI over 46 hours D1-D2, every 14 days"
        }
      ]
    },
    "CapeOX-Trastuzumab-Pembrolizumab-HER2": {
      "name": "CAPOX + Trastuzumab + Pembrolizumab (KEYNOTE-811) (HER2+/PD-L1 CPS ≥1)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Trastuzumab",
          "dose": 8,
          "maintenanceDose": 6,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days (loading dose 8 mg/kg, then 6 mg/kg)",
          "hasLoadingDose": true
        },
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
    "mFOLFOX6-Metastatic": {
      "name": "mFOLFOX6",
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
          "schedule": "CI over 46 hours D1-D2, every 14 days"
        }
      ]
    },
    "CapeOX-Metastatic": {
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
    "Carboplatin-Paclitaxel": {
      "name": "Carboplatin + Paclitaxel",
      "cycles": 6,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 5",
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
    "Cisplatin-Paclitaxel": {
      "name": "Cisplatin + Paclitaxel",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 80,
          "unit": "mg/m²",
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
    "ECX": {
      "name": "ECX (Epirubicin + Cisplatin + Capecitabine)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Epirubicin",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 60,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Capecitabine",
          "dose": 625,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D21, every 21 days"
        }
      ]
    },
    "EOX": {
      "name": "EOX (Epirubicin + Oxaliplatin + Capecitabine)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Epirubicin",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Oxaliplatin",
          "dose": 130,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Capecitabine",
          "dose": 625,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D21, every 21 days"
        }
      ]
    },
    "Ramucirumab-Paclitaxel-2L": {
      "name": "Ramucirumab + Paclitaxel (RAINBOW)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Ramucirumab",
          "dose": 8,
          "unit": "mg/kg",
          "schedule": "D1, D15, every 28 days"
        },
        {
          "name": "Paclitaxel",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, every 28 days"
        }
      ]
    },
    "Nivolumab-2L-ESCC": {
      "name": "Nivolumab monotherapy (ATTRACTION-3) (PD-1 inhibitor) (ESCC)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Nivolumab",
          "dose": 240,
          "unit": "mg",
          "schedule": "D1, every 14 days or 480mg every 28 days"
        }
      ]
    },
    "Ramucirumab-Monotherapy-2L": {
      "name": "Ramucirumab monotherapy (REGARD)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Ramucirumab",
          "dose": 8,
          "unit": "mg/kg",
          "schedule": "D1, every 14 days"
        }
      ]
    },
    "T-DXd-HER2-2L": {
      "name": "Trastuzumab Deruxtecan (DESTINY-Gastric01) (HER2+)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Trastuzumab Deruxtecan",
          "dose": 6.4,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "FOLFIRI-2L": {
      "name": "FOLFIRI",
      "cycles": 12,
      "drugs": [
        {
          "name": "Irinotecan",
          "dose": 180,
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
          "schedule": "CI over 46 hours D1-D2, every 14 days"
        }
      ]
    },
    "Paclitaxel-2L": {
      "name": "Paclitaxel monotherapy",
      "cycles": 6,
      "drugs": [
        {
          "name": "Paclitaxel",
          "dose": 175,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Paclitaxel-Weekly-2L": {
      "name": "Paclitaxel monotherapy (weekly)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Paclitaxel",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, every 28 days"
        }
      ]
    },
    "Nab-Paclitaxel-Carboplatin-1L": {
      "name": "Nab-Paclitaxel + Carboplatin",
      "drugs": [
        {
          "name": "Nab-Paclitaxel",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Carboplatin",
          "dose": "AUC 5",
          "unit": "AUC",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Nab-Paclitaxel-2L": {
      "name": "Nab-Paclitaxel monotherapy",
      "drugs": [
        {
          "name": "Nab-Paclitaxel",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, every 28 days"
        }
      ]
    },
    "Docetaxel-2L": {
      "name": "Docetaxel monotherapy",
      "cycles": 6,
      "drugs": [
        {
          "name": "Docetaxel",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Irinotecan-2L": {
      "name": "Irinotecan monotherapy",
      "cycles": 6,
      "drugs": [
        {
          "name": "Irinotecan",
          "dose": 150,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days"
        }
      ]
    },
    "Cisplatin-Irinotecan-2L": {
      "name": "Cisplatin + Irinotecan",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 30,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Irinotecan",
          "dose": 65,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        }
      ]
    },
    "Pembrolizumab-3L": {
      "name": "Pembrolizumab monotherapy (KEYNOTE-181) (PD-1 inhibitor) (PD-L1 CPS ≥10)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days or 400mg every 42 days"
        }
      ]
    },
    "TAS-102-3L": {
      "name": "Trifluridine/Tipiracil (TAS-102) (TAGS)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Trifluridine/Tipiracil",
          "dose": 35,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D5, D8-D12, every 28 days"
        }
      ]
    }
  }
};
