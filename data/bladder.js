window.protocolData = window.protocolData || {};
window.protocolData.bladder = {
  "neoadjuvant": {
    "ddMVAC": {
      "name": "Dose-dense MVAC (ddMVAC) (NCCN Preferred)",
      "cycles": 4,
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
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 70,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    }
  },
  "adjuvant": {
    "ddMVAC": {
      "name": "Dose-dense MVAC (ddMVAC)",
      "cycles": 4,
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
        }
      ]
    },
    "GC-Adjuvant": {
      "name": "Gemcitabine + Cisplatin (GC)",
      "cycles": 4,
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
    },
    "Durvalumab-Adjuvant": {
      "name": "Durvalumab monotherapy (PD-L1 inhibitor) (NIAGARA maintenance)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Durvalumab",
          "dose": 1500,
          "unit": "mg",
          "schedule": "D1, every 28 days for up to 8 cycles"
        }
      ]
    }
  },
  "perioperative": {
    "GC-Durvalumab-Perioperative": {
      "name": "Gemcitabine + Cisplatin + Durvalumab (PD-L1 inhibitor) (NIAGARA) (NCCN Preferred)",
      "cycles": 4,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, q21days x 4 neoadjuvant cycles"
        },
        {
          "name": "Cisplatin",
          "dose": 70,
          "unit": "mg/m²",
          "schedule": "D1, q21days x 4 neoadjuvant cycles"
        },
        {
          "name": "Durvalumab",
          "dose": 1500,
          "unit": "mg",
          "schedule": "D1, q3weeks (neoadjuvant) then q4weeks (adjuvant x 8 cycles)"
        }
      ]
    },
    "EV-Pembrolizumab-Perioperative": {
      "name": "Enfortumab Vedotin + Pembrolizumab (Nectin-4 ADC + PD-1 inhibitor) (KEYNOTE-905/EV-303) (cisplatin-ineligible)",
      "cycles": 3,
      "drugs": [
        {
          "name": "Enfortumab Vedotin",
          "dose": 1.25,
          "unit": "mg/kg",
          "schedule": "D1, D8, q3weeks x 3 neoadjuvant + 6 adjuvant cycles"
        },
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, q3weeks x 3 neoadjuvant + 14 adjuvant cycles"
        }
      ]
    }
  },
  "definitive": {
    "5FU-MMC-RT": {
      "name": "5-FU + Mitomycin-C + RT (BC2001)",
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
    },
    "Cisplatin-RT": {
      "name": "Cisplatin + RT (radiosensitizer)",
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
    "Cisplatin-5FU-RT": {
      "name": "Cisplatin + 5-FU + RT (RTOG 0712 FCT arm)",
      "cycles": 2,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 20,
          "unit": "mg/m²",
          "schedule": "D1-D3 of each RT course (induction + consolidation)"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "CI D1-D5 of each RT course"
        }
      ]
    },
    "Cisplatin-Paclitaxel-RT": {
      "name": "Cisplatin + Paclitaxel + RT (RTOG 0233)",
      "cycles": 2,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 15,
          "unit": "mg/m²",
          "schedule": "D1-D3 of each RT course"
        },
        {
          "name": "Paclitaxel",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, D8 of each RT course"
        }
      ]
    },
    "Gemcitabine-RT": {
      "name": "Low-dose Gemcitabine + RT (RTOG 0712 GD arm)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 27,
          "unit": "mg/m²",
          "schedule": "twice weekly concurrent with daily RT"
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
    "PC-Cisplatin-Ineligible": {
      "name": "Paclitaxel + Carboplatin (cisplatin-ineligible)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Paclitaxel",
          "dose": 175,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Carboplatin",
          "dose": "AUC 5-6",
          "unit": "AUC",
          "schedule": "D1, every 21 days"
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
      "name": "Erdafitinib (pan-FGFR inhibitor) (FGFR3 alteration)",
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
      "name": "Trastuzumab deruxtecan (T-DXd) (HER2-directed ADC) (HER2 IHC 3+)",
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
    },
    "Single-Paclitaxel": {
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
    "GP": {
      "name": "Gemcitabine + Paclitaxel",
      "cycles": 6,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Paclitaxel",
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Ifosfamide-Doxorubicin-Gemcitabine": {
      "name": "Ifosfamide + Doxorubicin + Gemcitabine",
      "cycles": 6,
      "drugs": [
        {
          "name": "Ifosfamide",
          "dose": 1500,
          "unit": "mg/m²",
          "schedule": "D1-D3, every 21 days"
        },
        {
          "name": "Mesna (pre-dose)",
          "dose": 300,
          "unit": "mg/m²",
          "schedule": "before Ifosfamide, D1-D3, every 21 days"
        },
        {
          "name": "Mesna (4h post)",
          "dose": 600,
          "unit": "mg/m²",
          "schedule": "4 hours after Ifosfamide, D1-D3, every 21 days"
        },
        {
          "name": "Mesna (8h post)",
          "dose": 600,
          "unit": "mg/m²",
          "schedule": "8 hours after Ifosfamide, D1-D3, every 21 days"
        },
        {
          "name": "Doxorubicin",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        }
      ]
    }
  }
};
