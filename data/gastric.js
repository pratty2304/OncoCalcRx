window.protocolData = window.protocolData || {};
window.protocolData.gastric = {
  "neoadjuvant": {
    "FLOT-Neo": {
      "name": "Docetaxel + Oxaliplatin + Leucovorin + 5-Fluorouracil (FLOT)",
      "cycles": 4,
      "drugs": [
        {
          "name": "Docetaxel",
          "dose": 50,
          "unit": "mg/m²",
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
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 2600,
          "unit": "mg/m²",
          "schedule": "CI over 24 hours D1, every 14 days"
        }
      ]
    },
    "mFOLFOX6-Neo": {
      "name": "Oxaliplatin + Leucovorin + 5-Fluorouracil (mFOLFOX6)",
      "cycles": 6,
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
          "name": "5-Fluorouracil",
          "dose": 2400,
          "unit": "mg/m²",
          "schedule": "Continuous infusion 46h D1-D2, every 14 days"
        }
      ]
    },
    "CapeOX-Neo": {
      "name": "Capecitabine + Oxaliplatin (CAPOX)",
      "cycles": 4,
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
    }
  },
  "adjuvant": {
    "mFOLFOX6-Adj": {
      "name": "Oxaliplatin + Leucovorin + 5-Fluorouracil (mFOLFOX6)",
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
          "name": "5-Fluorouracil",
          "dose": 2400,
          "unit": "mg/m²",
          "schedule": "Continuous infusion 46h D1-D2, every 14 days"
        }
      ]
    },
    "CapeOX-Adj": {
      "name": "Capecitabine + Oxaliplatin (CAPOX) (CLASSIC)",
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
    "Capecitabine-Adj": {
      "name": "Capecitabine monotherapy",
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
    "5FU-LV-Adj": {
      "name": "5-Fluorouracil + Leucovorin",
      "cycles": 6,
      "drugs": [
        {
          "name": "Leucovorin",
          "dose": 20,
          "unit": "mg/m²",
          "schedule": "D1-D5, every 28 days"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 425,
          "unit": "mg/m²",
          "schedule": "D1-D5, every 28 days"
        }
      ]
    },
    "S1-Adj": {
      "name": "S-1 monotherapy (ACTS-GC)",
      "cycles": 8,
      "drugs": [
        {
          "name": "S-1",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D28, every 42 days (6-week cycle), for 1 year"
        }
      ]
    },
    "S1-Oxaliplatin-Adj": {
      "name": "S-1 + Oxaliplatin (SOX)",
      "cycles": 8,
      "drugs": [
        {
          "name": "S-1",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D14, every 21 days"
        },
        {
          "name": "Oxaliplatin",
          "dose": 130,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    }
  },
  "perioperative": {
    "FLOT4-Periop": {
      "name": "Docetaxel + Oxaliplatin + Leucovorin + 5-Fluorouracil (FLOT4) (AIO-FLOT4)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Docetaxel",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days (4 cycles preoperative + 4 cycles postoperative)"
        },
        {
          "name": "Oxaliplatin",
          "dose": 85,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days (4 cycles preoperative + 4 cycles postoperative)"
        },
        {
          "name": "Leucovorin",
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days (4 cycles preoperative + 4 cycles postoperative)"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 2600,
          "unit": "mg/m²",
          "schedule": "CI over 24 hours D1, every 14 days (4 cycles preoperative + 4 cycles postoperative)"
        }
      ]
    },
    "ECF-MAGIC": {
      "name": "Epirubicin + Cisplatin + 5-Fluorouracil (ECF) (MAGIC)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Epirubicin",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days (3 cycles preoperative + 3 cycles postoperative)"
        },
        {
          "name": "Cisplatin",
          "dose": 60,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days (3 cycles preoperative + 3 cycles postoperative)"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "CI D1-D21, every 21 days (3 cycles preoperative + 3 cycles postoperative)"
        }
      ]
    },
    "Durvalumab-FLOT-MATTERHORN": {
      "name": "Durvalumab + FLOT (MATTERHORN)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Durvalumab",
          "dose": 1500,
          "unit": "mg",
          "schedule": "D1, every 28 days (4 cycles preoperative + 4 cycles postoperative)"
        },
        {
          "name": "Docetaxel",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days (4 cycles preoperative + 4 cycles postoperative)"
        },
        {
          "name": "Oxaliplatin",
          "dose": 85,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days (4 cycles preoperative + 4 cycles postoperative)"
        },
        {
          "name": "Leucovorin",
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days (4 cycles preoperative + 4 cycles postoperative)"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 2600,
          "unit": "mg/m²",
          "schedule": "CI over 24 hours D1, every 14 days (4 cycles preoperative + 4 cycles postoperative)"
        }
      ]
    },
    "Durvalumab-Maintenance-MATTERHORN": {
      "name": "Durvalumab Maintenance (MATTERHORN) (post Durvalumab + FLOT)",
      "cycles": 13,
      "drugs": [
        {
          "name": "Durvalumab",
          "dose": 1500,
          "unit": "mg",
          "schedule": "D1, every 28 days x 12 months (after completing perioperative Durvalumab + FLOT and surgery)"
        }
      ]
    }
  },
  "metastatic": {
    "Pembrolizumab-5FU-Cisplatin-1L": {
      "name": "Pembrolizumab + 5-Fluorouracil + Cisplatin (PD-L1 CPS≥1) (PD-1 inhibitor)",
      "cycles": 6,
      "cyclesNote": "Pembrolizumab continues until progression",
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
          "schedule": "D1, every 21 days"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 800,
          "unit": "mg/m²",
          "schedule": "CI over 5 days D1-D5, every 21 days"
        }
      ]
    },
    "Nivolumab-Ipilimumab-MSI-1L": {
      "name": "Nivolumab + Ipilimumab (CheckMate-649) (dMMR/MSI-H) (PD-1 + CTLA-4 inhibitors)",
      "cycles": 4,
      "cyclesNote": "Ipilimumab: 4 doses (induction only); Nivolumab continues until progression",
      "drugs": [
        {
          "name": "Nivolumab",
          "dose": 1,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days x 4, then 240mg flat dose every 14 days or 480mg every 28 days"
        },
        {
          "name": "Ipilimumab",
          "dose": 3,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days x 4 doses"
        }
      ]
    },
    "Pembrolizumab-Mono": {
      "name": "Pembrolizumab monotherapy (KEYNOTE-059) (dMMR/MSI-H) (PD-1 inhibitor)",
      "cycles": "Until progression",
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days or 400mg every 6 weeks"
        }
      ]
    },
    "FOLFOX-Zolbetuximab-1L": {
      "name": "mFOLFOX6 + Zolbetuximab (SPOTLIGHT) (CLDN18.2+)",
      "cycles": 12,
      "cyclesNote": "Zolbetuximab continues until progression",
      "drugs": [
        {
          "name": "Zolbetuximab",
          "dose": 800,
          "unit": "mg/m²",
          "schedule": "D1 cycle 1 loading dose, then 600 mg/m² D1, every 21 days"
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
          "name": "5-Fluorouracil",
          "dose": 2400,
          "unit": "mg/m²",
          "schedule": "Continuous infusion 46h D1-D2, every 14 days"
        }
      ]
    },
    "XP-Trastuzumab-HER2-1L": {
      "name": "Capecitabine + Cisplatin + Trastuzumab (ToGA) (HER2+)",
      "cycles": 6,
      "cyclesNote": "Trastuzumab continues until progression",
      "drugs": [
        {
          "name": "Capecitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D14, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Trastuzumab",
          "dose": 8,
          "maintenanceDose": 6,
          "unit": "mg/kg",
          "schedule": "8 mg/kg loading dose, then 6 mg/kg D1, every 21 days",
          "hasLoadingDose": true
        }
      ]
    },
    "FOLFOX-Trastuzumab-HER2-1L": {
      "name": "mFOLFOX6 + Trastuzumab (HER2+)",
      "cycles": 12,
      "cyclesNote": "Trastuzumab continues until progression",
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
          "name": "5-Fluorouracil",
          "dose": 2400,
          "unit": "mg/m²",
          "schedule": "Continuous infusion 46h D1-D2, every 14 days"
        },
        {
          "name": "Trastuzumab",
          "dose": 8,
          "maintenanceDose": 6,
          "unit": "mg/kg",
          "schedule": "8 mg/kg loading dose, then 6 mg/kg D1, every 21 days",
          "hasLoadingDose": true
        }
      ]
    },
    "FOLFOX-Trastuzumab-Pembrolizumab-HER2-1L": {
      "name": "mFOLFOX6 + Trastuzumab + Pembrolizumab (KEYNOTE-811) (HER2+) (PD-1 inhibitor)",
      "cycles": 12,
      "cyclesNote": "Trastuzumab and Pembrolizumab continue until progression",
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
          "name": "5-Fluorouracil",
          "dose": 2400,
          "unit": "mg/m²",
          "schedule": "Continuous infusion 46h D1-D2, every 14 days"
        },
        {
          "name": "Trastuzumab",
          "dose": 8,
          "maintenanceDose": 6,
          "unit": "mg/kg",
          "schedule": "8 mg/kg loading dose, then 6 mg/kg D1, every 21 days",
          "hasLoadingDose": true
        },
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "5FU-Cisplatin-Trastuzumab-HER2-1L": {
      "name": "5-Fluorouracil + Cisplatin + Trastuzumab (ToGA) (HER2+)",
      "cycles": 6,
      "cyclesNote": "Trastuzumab continues until progression",
      "drugs": [
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
          "schedule": "CI over 5 days D1-D5, every 21 days"
        },
        {
          "name": "Trastuzumab",
          "dose": 8,
          "maintenanceDose": 6,
          "unit": "mg/kg",
          "schedule": "8 mg/kg loading dose, then 6 mg/kg D1, every 21 days",
          "hasLoadingDose": true
        }
      ]
    },
    "5FU-Cisplatin-Trastuzumab-Pembrolizumab-HER2-1L": {
      "name": "5-Fluorouracil + Cisplatin + Trastuzumab + Pembrolizumab (KEYNOTE-811) (HER2+) (PD-1 inhibitor)",
      "cycles": 6,
      "cyclesNote": "Trastuzumab and Pembrolizumab continue until progression",
      "drugs": [
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
          "schedule": "CI over 5 days D1-D5, every 21 days"
        },
        {
          "name": "Trastuzumab",
          "dose": 8,
          "maintenanceDose": 6,
          "unit": "mg/kg",
          "schedule": "8 mg/kg loading dose, then 6 mg/kg D1, every 21 days",
          "hasLoadingDose": true
        },
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "ECX-1L": {
      "name": "Epirubicin + Cisplatin + Capecitabine (ECX) (REAL-2)",
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
          "schedule": "PO twice daily D1-D21 continuously, every 21 days"
        }
      ]
    },
    "EOX-1L": {
      "name": "Epirubicin + Oxaliplatin + Capecitabine (EOX) (REAL-2)",
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
          "schedule": "PO twice daily D1-D21 continuously, every 21 days"
        }
      ]
    },
    "DCF-1L": {
      "name": "Docetaxel + Cisplatin + 5-Fluorouracil (DCF) (V325)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Docetaxel",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 750,
          "unit": "mg/m²",
          "schedule": "CI over 5 days D1-D5, every 21 days"
        }
      ]
    },
    "FLO-1L": {
      "name": "Oxaliplatin + Leucovorin + 5-Fluorouracil (FLO)",
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
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 2600,
          "unit": "mg/m²",
          "schedule": "CI over 24 hours D1, every 14 days"
        }
      ]
    },
    "mFOLFOX6-1L": {
      "name": "Oxaliplatin + Leucovorin + 5-Fluorouracil (mFOLFOX6)",
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
          "name": "5-Fluorouracil",
          "dose": 2400,
          "unit": "mg/m²",
          "schedule": "Continuous infusion 46h D1-D2, every 14 days"
        }
      ]
    },
    "CapeOX-1L": {
      "name": "Capecitabine + Oxaliplatin (CAPOX)",
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
    "FOLFOX-Nivolumab-1L": {
      "name": "mFOLFOX6 + Nivolumab (CheckMate-649) (PD-1 inhibitor)",
      "cycles": 12,
      "cyclesNote": "Nivolumab continues until progression",
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
          "name": "5-Fluorouracil",
          "dose": 2400,
          "unit": "mg/m²",
          "schedule": "Continuous infusion 46h D1-D2, every 14 days"
        },
        {
          "name": "Nivolumab",
          "dose": 240,
          "unit": "mg",
          "schedule": "D1, every 14 days"
        }
      ]
    },
    "FOLFOX-Pembrolizumab-1L": {
      "name": "mFOLFOX6 + Pembrolizumab (KEYNOTE-859) (PD-1 inhibitor)",
      "cycles": 12,
      "cyclesNote": "Pembrolizumab continues until progression",
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
          "name": "5-Fluorouracil",
          "dose": 2400,
          "unit": "mg/m²",
          "schedule": "Continuous infusion 46h D1-D2, every 14 days"
        },
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "5FU-Cisplatin-Tislelizumab-1L": {
      "name": "5-Fluorouracil + Cisplatin + Tislelizumab (RATIONALE-305) (PD-1 inhibitor)",
      "cycles": 6,
      "cyclesNote": "Tislelizumab continues until progression",
      "drugs": [
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
          "schedule": "CI over 5 days D1-D5, every 21 days"
        },
        {
          "name": "Tislelizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "CapeOX-Trastuzumab-HER2-1L": {
      "name": "Capecitabine + Oxaliplatin + Trastuzumab (HER2+)",
      "cycles": 8,
      "cyclesNote": "Trastuzumab continues until progression",
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
        },
        {
          "name": "Trastuzumab",
          "dose": 8,
          "maintenanceDose": 6,
          "unit": "mg/kg",
          "schedule": "8 mg/kg loading dose, then 6 mg/kg D1, every 21 days",
          "hasLoadingDose": true
        }
      ]
    },
    "CapeOX-Trastuzumab-Pembrolizumab-HER2-1L": {
      "name": "Capecitabine + Oxaliplatin + Trastuzumab + Pembrolizumab (KEYNOTE-811) (HER2+) (PD-1 inhibitor)",
      "cycles": 8,
      "cyclesNote": "Trastuzumab and Pembrolizumab continue until progression",
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
        },
        {
          "name": "Trastuzumab",
          "dose": 8,
          "maintenanceDose": 6,
          "unit": "mg/kg",
          "schedule": "8 mg/kg loading dose, then 6 mg/kg D1, every 21 days",
          "hasLoadingDose": true
        },
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "CapCis-Trastuzumab-HER2-1L": {
      "name": "Capecitabine + Cisplatin + Trastuzumab (HER2+)",
      "cycles": 6,
      "cyclesNote": "Trastuzumab continues until progression",
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Capecitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D14, every 21 days"
        },
        {
          "name": "Trastuzumab",
          "dose": 8,
          "maintenanceDose": 6,
          "unit": "mg/kg",
          "schedule": "8 mg/kg loading dose, then 6 mg/kg D1, every 21 days",
          "hasLoadingDose": true
        }
      ]
    },
    "CapCis-Trastuzumab-Pembrolizumab-HER2-1L": {
      "name": "Capecitabine + Cisplatin + Trastuzumab + Pembrolizumab (KEYNOTE-811) (HER2+) (PD-1 inhibitor)",
      "cycles": 6,
      "cyclesNote": "Trastuzumab and Pembrolizumab continue until progression",
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Capecitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D14, every 21 days"
        },
        {
          "name": "Trastuzumab",
          "dose": 8,
          "maintenanceDose": 6,
          "unit": "mg/kg",
          "schedule": "8 mg/kg loading dose, then 6 mg/kg D1, every 21 days",
          "hasLoadingDose": true
        },
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "CapeOX-Nivolumab-1L": {
      "name": "Capecitabine + Oxaliplatin + Nivolumab (CheckMate-649) (PD-1 inhibitor)",
      "cycles": 8,
      "cyclesNote": "Nivolumab continues until progression",
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
        },
        {
          "name": "Nivolumab",
          "dose": 360,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "CapeOX-Pembrolizumab-1L": {
      "name": "Capecitabine + Oxaliplatin + Pembrolizumab (KEYNOTE-859) (PD-1 inhibitor)",
      "cycles": 8,
      "cyclesNote": "Pembrolizumab continues until progression",
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
        },
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "CapeOX-Tislelizumab-1L": {
      "name": "Capecitabine + Oxaliplatin + Tislelizumab (RATIONALE-305) (PD-1 inhibitor)",
      "cycles": 8,
      "cyclesNote": "Tislelizumab continues until progression",
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
        },
        {
          "name": "Tislelizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "CapeOX-Zolbetuximab-1L": {
      "name": "Capecitabine + Oxaliplatin + Zolbetuximab (GLOW) (CLDN18.2+)",
      "cycles": 8,
      "cyclesNote": "Zolbetuximab continues until progression",
      "drugs": [
        {
          "name": "Zolbetuximab",
          "dose": 800,
          "unit": "mg/m²",
          "schedule": "D1 cycle 1 loading dose, then 600 mg/m² D1, every 21 days"
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
    "CapCis-Pembrolizumab-1L": {
      "name": "Capecitabine + Cisplatin + Pembrolizumab (PD-1 inhibitor)",
      "cycles": 6,
      "cyclesNote": "Pembrolizumab continues until progression",
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Capecitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D14, every 21 days"
        },
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "CapCis-Tislelizumab-1L": {
      "name": "Capecitabine + Cisplatin + Tislelizumab (PD-1 inhibitor)",
      "cycles": 6,
      "cyclesNote": "Tislelizumab continues until progression",
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Capecitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D14, every 21 days"
        },
        {
          "name": "Tislelizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "SP-1L": {
      "name": "S-1 + Cisplatin (SP) (SPIRITS)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 60,
          "unit": "mg/m²",
          "schedule": "D8, every 35 days"
        },
        {
          "name": "S-1",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D21, every 35 days"
        }
      ]
    },
    "SOX-1L": {
      "name": "S-1 + Oxaliplatin (SOX) (G-SOX)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Oxaliplatin",
          "dose": 130,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "S-1",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D14, every 21 days"
        }
      ]
    },
    "SOX-Nivolumab-1L": {
      "name": "S-1 + Oxaliplatin + Nivolumab (ATTRACTION-4) (PD-1 inhibitor)",
      "cycles": 6,
      "cyclesNote": "Nivolumab continues until progression",
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
          "name": "S-1",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D14, every 21 days"
        }
      ]
    },
    "S1-Mono-1L": {
      "name": "S-1 monotherapy",
      "cycles": 6,
      "drugs": [
        {
          "name": "S-1",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D28, every 42 days"
        }
      ]
    },
    "Paclitaxel-Ramucirumab-2L": {
      "name": "Paclitaxel + Ramucirumab (RAINBOW) (VEGFR2 inhibitor)",
      "cycles": 6,
      "cyclesNote": "Ramucirumab continues until progression",
      "drugs": [
        {
          "name": "Paclitaxel",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, every 28 days"
        },
        {
          "name": "Ramucirumab",
          "dose": 8,
          "unit": "mg/kg",
          "schedule": "D1, D15, every 28 days"
        }
      ]
    },
    "FOLFIRI-Ramucirumab-2L": {
      "name": "FOLFIRI + Ramucirumab (VEGFR2 inhibitor)",
      "cycles": 12,
      "cyclesNote": "Ramucirumab continues until progression",
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
          "name": "5-Fluorouracil",
          "dose": 2400,
          "unit": "mg/m²",
          "schedule": "Continuous infusion 46h D1-D2, every 14 days"
        },
        {
          "name": "Ramucirumab",
          "dose": 8,
          "unit": "mg/kg",
          "schedule": "D1, every 14 days"
        }
      ]
    },
    "Irinotecan-Ramucirumab-2L": {
      "name": "Irinotecan + Ramucirumab (VEGFR2 inhibitor)",
      "cycles": 6,
      "cyclesNote": "Ramucirumab continues until progression",
      "drugs": [
        {
          "name": "Irinotecan",
          "dose": 150,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days"
        },
        {
          "name": "Ramucirumab",
          "dose": 8,
          "unit": "mg/kg",
          "schedule": "D1, every 14 days"
        }
      ]
    },
    "T-DXd-HER2-2L": {
      "name": "Trastuzumab Deruxtecan (T-DXd) (DESTINY-Gastric01) (HER2+)",
      "cycles": "Until progression",
      "drugs": [
        {
          "name": "Trastuzumab Deruxtecan",
          "dose": 6.4,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "mFOLFIRI-2L": {
      "name": "Irinotecan + Leucovorin + 5-Fluorouracil (mFOLFIRI)",
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
          "name": "5-Fluorouracil",
          "dose": 2400,
          "unit": "mg/m²",
          "schedule": "Continuous infusion 46h D1-D2, every 14 days"
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
    "Paclitaxel-2L": {
      "name": "Paclitaxel monotherapy (weekly)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Paclitaxel",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, every 28 days"
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
    "S1-Docetaxel-2L": {
      "name": "S-1 + Docetaxel (DS)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Docetaxel",
          "dose": 60,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "S-1",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D14, every 21 days"
        }
      ]
    },
    "TAS-102-3L": {
      "name": "Trifluridine/Tipiracil (TAS-102) (TAGS)",
      "cycles": 6,
      "drugs": [
        {
          "name": "TAS-102",
          "dose": 35,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D5, D8-D12, every 28 days"
        }
      ]
    },
    "Ramucirumab-2L": {
      "name": "Ramucirumab monotherapy (REGARD) (VEGFR2 inhibitor)",
      "cycles": "Until progression",
      "drugs": [
        {
          "name": "Ramucirumab",
          "dose": 8,
          "unit": "mg/kg",
          "schedule": "D1, every 14 days"
        }
      ]
    },
    "Nivolumab-3L": {
      "name": "Nivolumab monotherapy (ATTRACTION-2) (PD-1 inhibitor)",
      "cycles": "Until progression",
      "drugs": [
        {
          "name": "Nivolumab",
          "dose": 240,
          "unit": "mg",
          "schedule": "D1, every 14 days or 480mg every 28 days"
        }
      ]
    },
    "Dostarlimab-MSI-3L": {
      "name": "Dostarlimab monotherapy (dMMR/MSI-H) (PD-1 inhibitor)",
      "cycles": "Until progression",
      "drugs": [
        {
          "name": "Dostarlimab",
          "dose": 500,
          "unit": "mg",
          "schedule": "D1, every 21 days x 4, then 1000mg every 6 weeks"
        }
      ]
    }
  }
};
