window.protocolData = window.protocolData || {};
window.protocolData.ureteric_urethral = {
  "neoadjuvant": {
    "ddMVAC": {
      "name": "Dose-dense MVAC (ddMVAC) (NCCN Preferred)",
      "cycles": 4,
      "drugs": [
        {
          "name": "Methotrexate",
          "dose": 30,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days x 4 cycles"
        },
        {
          "name": "Vinblastine",
          "dose": 3,
          "unit": "mg/m²",
          "schedule": "D2, every 14 days x 4 cycles"
        },
        {
          "name": "Doxorubicin",
          "dose": 30,
          "unit": "mg/m²",
          "schedule": "D2, every 14 days x 4 cycles"
        },
        {
          "name": "Cisplatin",
          "dose": 70,
          "unit": "mg/m²",
          "schedule": "D2, every 14 days x 4 cycles"
        },
        {
          "name": "Leucovorin rescue",
          "dose": 15,
          "unit": "mg/m²",
          "schedule": "24h after Methotrexate, every 14 days x 4 cycles"
        }
      ]
    },
    "GC-Neoadjuvant": {
      "name": "Gemcitabine + Cisplatin (GC)",
      "cycles": 4,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days x 4 cycles"
        },
        {
          "name": "Cisplatin",
          "dose": 70,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 4 cycles"
        }
      ]
    }
  },
  "adjuvant": {
    "GC-Adjuvant": {
      "name": "Gemcitabine + Cisplatin (GC) (POUT trial)",
      "cycles": 4,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days x 4 cycles"
        },
        {
          "name": "Cisplatin",
          "dose": 70,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 4 cycles"
        }
      ]
    },
    "GCa-Adjuvant": {
      "name": "Gemcitabine + Carboplatin (POUT trial, eGFR 30-49)",
      "cycles": 4,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days x 4 cycles"
        },
        {
          "name": "Carboplatin",
          "dose": "AUC 5",
          "unit": "AUC",
          "schedule": "D1, every 21 days x 4 cycles"
        }
      ]
    },
    "Nivolumab-Adjuvant": {
      "name": "Nivolumab monotherapy (PD-1 inhibitor) (CheckMate 274)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Nivolumab",
          "dose": 240,
          "unit": "mg",
          "schedule": "D1, every 14 days for up to 1 year"
        }
      ]
    },
    "Pembrolizumab-Adjuvant": {
      "name": "Pembrolizumab monotherapy (PD-1 inhibitor) (AMBASSADOR)",
      "cycles": 17,
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days for up to 1 year"
        }
      ]
    }
  },
  "definitive": {
    "Cisplatin-RT": {
      "name": "Weekly Cisplatin + RT (radiosensitizer)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "weekly x 6 weeks concurrent with RT"
        }
      ]
    },
    "5FU-MMC-RT": {
      "name": "5-FU + Mitomycin-C + RT (BC2001-style)",
      "cycles": 2,
      "drugs": [
        {
          "name": "5-Fluorouracil",
          "dose": 500,
          "unit": "mg/m²",
          "schedule": "CI daily D1-D5 and D16-D20 of RT"
        },
        {
          "name": "Mitomycin-C",
          "dose": 12,
          "unit": "mg/m²",
          "schedule": "D1 of RT"
        }
      ]
    }
  },
  "metastatic": {
    "Enfortumab-Vedotin-Pembrolizumab": {
      "name": "Enfortumab Vedotin + Pembrolizumab (Nectin-4 ADC + PD-1 inhibitor) (EV-302/KEYNOTE-A39) (NCCN Preferred)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Enfortumab Vedotin",
          "dose": 1.25,
          "unit": "mg/kg",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Gemcitabine-Cisplatin-Nivolumab": {
      "name": "Gemcitabine + Cisplatin + Nivolumab (PD-1 inhibitor) (CheckMate 901)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 70,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Nivolumab",
          "dose": 360,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "GC-Metastatic": {
      "name": "Gemcitabine + Cisplatin (GC)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 70,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "ddMVAC": {
      "name": "Dose-dense MVAC (ddMVAC)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Methotrexate",
          "dose": 30,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days"
        },
        {
          "name": "Vinblastine",
          "dose": 3,
          "unit": "mg/m²",
          "schedule": "D2, every 14 days"
        },
        {
          "name": "Doxorubicin",
          "dose": 30,
          "unit": "mg/m²",
          "schedule": "D2, every 14 days"
        },
        {
          "name": "Cisplatin",
          "dose": 70,
          "unit": "mg/m²",
          "schedule": "D2, every 14 days"
        },
        {
          "name": "Leucovorin rescue",
          "dose": 15,
          "unit": "mg/m²",
          "schedule": "24h after Methotrexate, every 14 days"
        }
      ]
    },
    "MVAC": {
      "name": "MVAC (standard q28-day)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Methotrexate",
          "dose": 30,
          "unit": "mg/m²",
          "schedule": "D1, D15, D22, every 28 days"
        },
        {
          "name": "Vinblastine",
          "dose": 3,
          "unit": "mg/m²",
          "schedule": "D2, D15, D22, every 28 days"
        },
        {
          "name": "Doxorubicin",
          "dose": 30,
          "unit": "mg/m²",
          "schedule": "D2, every 28 days"
        },
        {
          "name": "Cisplatin",
          "dose": 70,
          "unit": "mg/m²",
          "schedule": "D2, every 28 days"
        },
        {
          "name": "Leucovorin rescue",
          "dose": 15,
          "unit": "mg/m²",
          "schedule": "24h after each Methotrexate dose"
        }
      ]
    },
    "Avelumab-Maintenance": {
      "name": "Avelumab maintenance (PD-L1 inhibitor) (JAVELIN Bladder 100)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Avelumab",
          "dose": 800,
          "unit": "mg",
          "schedule": "D1, every 14 days until progression"
        }
      ]
    },
    "GCa-Cisplatin-Ineligible": {
      "name": "Gemcitabine + Carboplatin (cisplatin-ineligible)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
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
    "GC-Split-Dose": {
      "name": "Gemcitabine + Cisplatin split-dose (borderline renal function)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 35,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        }
      ]
    },
    "Pembrolizumab-Monotherapy": {
      "name": "Pembrolizumab monotherapy (PD-1 inhibitor) (cisplatin-ineligible, PD-L1+)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days (or 400mg q6weeks)"
        }
      ]
    },
    "Atezolizumab-Monotherapy": {
      "name": "Atezolizumab monotherapy (PD-L1 inhibitor) (cisplatin-ineligible, PD-L1+)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Atezolizumab",
          "dose": 1200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Enfortumab-Vedotin-Mono": {
      "name": "Enfortumab Vedotin monotherapy (Nectin-4 ADC) (EV-301)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Enfortumab Vedotin",
          "dose": 1.25,
          "unit": "mg/kg",
          "schedule": "D1, D8, D15, every 28 days"
        }
      ]
    },
    "Erdafitinib": {
      "name": "Erdafitinib (pan-FGFR inhibitor) (FGFR3 alteration) (THOR)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Erdafitinib",
          "dose": 8,
          "unit": "mg",
          "schedule": "PO once daily, uptitrate to 9mg based on phosphate",
          "isOralTargeted": true
        }
      ]
    },
    "Trastuzumab-Deruxtecan": {
      "name": "Trastuzumab deruxtecan (T-DXd) (HER2-directed ADC) (HER2 IHC 3+) (DESTINY-PanTumor02)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Trastuzumab deruxtecan",
          "dose": 5.4,
          "unit": "mg/kg",
          "schedule": "IV q3weeks until progression"
        }
      ]
    },
    "Nivolumab-Monotherapy": {
      "name": "Nivolumab monotherapy (PD-1 inhibitor)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Nivolumab",
          "dose": 240,
          "unit": "mg",
          "schedule": "D1, every 14 days (or 480mg q4weeks)"
        }
      ]
    },
    "Docetaxel-Monotherapy": {
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
    "Paclitaxel-Monotherapy": {
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
    }
  }
};
