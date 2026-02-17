window.protocolData = window.protocolData || {};
window.protocolData.thymoma = {
  "neoadjuvant": {
    "CAP": {
      "name": "Cyclophosphamide + Doxorubicin + Cisplatin (CAP) (Loehrer) (NCCN Preferred, thymoma)",
      "cycles": 4,
      "drugs": [
        {
          "name": "Cyclophosphamide",
          "dose": 500,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 4 cycles"
        },
        {
          "name": "Doxorubicin",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 4 cycles"
        },
        {
          "name": "Cisplatin",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 4 cycles"
        }
      ]
    },
    "ADOC": {
      "name": "Doxorubicin + Cisplatin + Vincristine + Cyclophosphamide (ADOC) (Fornasiero)",
      "cycles": 4,
      "drugs": [
        {
          "name": "Doxorubicin",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 4 cycles"
        },
        {
          "name": "Cisplatin",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 4 cycles"
        },
        {
          "name": "Vincristine",
          "dose": 0.6,
          "unit": "mg/m²",
          "schedule": "D3, every 21 days x 4 cycles (max 2 mg)"
        },
        {
          "name": "Cyclophosphamide",
          "dose": 700,
          "unit": "mg/m²",
          "schedule": "D4, every 21 days x 4 cycles"
        }
      ]
    },
    "Cisplatin-Etoposide": {
      "name": "Cisplatin + Etoposide (EP) (EORTC, Giaccone)",
      "cycles": 4,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 60,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 4 cycles"
        },
        {
          "name": "Etoposide",
          "dose": 120,
          "unit": "mg/m²",
          "schedule": "D1-D3, every 21 days x 4 cycles"
        }
      ]
    },
    "VIP": {
      "name": "Etoposide + Ifosfamide + Cisplatin (VIP) (Loehrer Intergroup)",
      "cycles": 4,
      "drugs": [
        {
          "name": "Etoposide",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1-D4, every 21 days x 4 cycles"
        },
        {
          "name": "Ifosfamide",
          "dose": 1200,
          "unit": "mg/m²",
          "schedule": "D1-D4, every 21 days x 4 cycles"
        },
        {
          "name": "Cisplatin",
          "dose": 20,
          "unit": "mg/m²",
          "schedule": "D1-D4, every 21 days x 4 cycles"
        },
        {
          "name": "Mesna",
          "dose": 1200,
          "unit": "mg/m²",
          "schedule": "equal to ifosfamide dose, D1-D4, every 21 days x 4 cycles"
        }
      ]
    },
    "Carboplatin-Paclitaxel": {
      "name": "Paclitaxel + Carboplatin (PC) (NCCN Preferred, thymic carcinoma)",
      "cycles": 4,
      "drugs": [
        {
          "name": "Paclitaxel",
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 4 cycles"
        },
        {
          "name": "Carboplatin",
          "dose": "AUC 5",
          "unit": "AUC",
          "schedule": "D1, every 21 days x 4 cycles"
        }
      ]
    }
  },
  "metastatic": {
    "CAP": {
      "name": "Cyclophosphamide + Doxorubicin + Cisplatin (CAP) (Loehrer) (NCCN Preferred, thymoma)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cyclophosphamide",
          "dose": 500,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Doxorubicin",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "ADOC": {
      "name": "Doxorubicin + Cisplatin + Vincristine + Cyclophosphamide (ADOC) (Fornasiero)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Doxorubicin",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Vincristine",
          "dose": 0.6,
          "unit": "mg/m²",
          "schedule": "D3, every 21 days (max 2 mg)"
        },
        {
          "name": "Cyclophosphamide",
          "dose": 700,
          "unit": "mg/m²",
          "schedule": "D4, every 21 days"
        }
      ]
    },
    "Cisplatin-Etoposide": {
      "name": "Cisplatin + Etoposide (EP) (EORTC, Giaccone)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 60,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Etoposide",
          "dose": 120,
          "unit": "mg/m²",
          "schedule": "D1-D3, every 21 days"
        }
      ]
    },
    "VIP": {
      "name": "Etoposide + Ifosfamide + Cisplatin (VIP) (Loehrer Intergroup)",
      "cycles": 4,
      "drugs": [
        {
          "name": "Etoposide",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1-D4, every 21 days"
        },
        {
          "name": "Ifosfamide",
          "dose": 1200,
          "unit": "mg/m²",
          "schedule": "D1-D4, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 20,
          "unit": "mg/m²",
          "schedule": "D1-D4, every 21 days"
        },
        {
          "name": "Mesna",
          "dose": 1200,
          "unit": "mg/m²",
          "schedule": "equal to ifosfamide dose, D1-D4, every 21 days"
        }
      ]
    },
    "Carboplatin-Paclitaxel": {
      "name": "Paclitaxel + Carboplatin (PC) (NCCN Preferred, thymic carcinoma)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Paclitaxel",
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Carboplatin",
          "dose": "AUC 5",
          "unit": "AUC",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Carboplatin-Paclitaxel-Ramucirumab": {
      "name": "Paclitaxel + Carboplatin + Ramucirumab (RELEVENT) (NCCN Preferred, thymic carcinoma)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Paclitaxel",
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles"
        },
        {
          "name": "Carboplatin",
          "dose": "AUC 5",
          "unit": "AUC",
          "schedule": "D1, every 21 days x 6 cycles"
        },
        {
          "name": "Ramucirumab",
          "dose": 10,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days (continue as maintenance after 6 cycles chemo)"
        }
      ]
    },
    "Everolimus": {
      "name": "Everolimus (mTOR inhibitor) (Zucali JCO 2018) (NCCN Preferred, thymoma)",
      "cycles": 35,
      "drugs": [
        {
          "name": "Everolimus",
          "dose": 10,
          "unit": "mg",
          "schedule": "PO once daily, until progression"
        }
      ]
    },
    "Pemetrexed-Single": {
      "name": "Pemetrexed (NCCN Preferred, thymoma)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Pemetrexed",
          "dose": 500,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Folic Acid",
          "dose": 400,
          "unit": "mcg",
          "schedule": "PO daily, starting 7 days before first pemetrexed, continue throughout and for 21 days after last dose"
        },
        {
          "name": "Vitamin B12 (Vitcofol)",
          "dose": 1000,
          "unit": "mcg",
          "schedule": "IM injection, at least 7 days before first pemetrexed, then every 9 weeks"
        }
      ]
    },
    "Gemcitabine-Capecitabine": {
      "name": "Gemcitabine + Capecitabine (NCCN Preferred, second-line)",
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
    "Gemcitabine-Single": {
      "name": "Gemcitabine",
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
    "Octreotide": {
      "name": "Octreotide LAR (thymoma, if octreoscan/DOTATATE positive) (NCCN Preferred, thymoma)",
      "cycles": 35,
      "drugs": [
        {
          "name": "Octreotide LAR",
          "dose": 30,
          "unit": "mg",
          "schedule": "IM monthly, until progression"
        }
      ]
    },
    "Pembrolizumab": {
      "name": "Pembrolizumab (PD-1 inhibitor) (thymic carcinoma ONLY — contraindicated in thymoma)",
      "cycles": 35,
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days (or 400 mg every 42 days), until progression (max 35 cycles)"
        }
      ]
    },
    "Sunitinib": {
      "name": "Sunitinib (multi-kinase inhibitor) (STYLE) (thymic carcinoma)",
      "cycles": 35,
      "drugs": [
        {
          "name": "Sunitinib",
          "dose": 50,
          "unit": "mg",
          "schedule": "PO daily for 4 weeks, then 2 weeks off (6-week cycles), until progression"
        }
      ]
    },
    "Lenvatinib": {
      "name": "Lenvatinib (multi-kinase inhibitor) (REMORA) (NCCN Preferred, thymic carcinoma)",
      "cycles": 35,
      "drugs": [
        {
          "name": "Lenvatinib",
          "dose": 24,
          "unit": "mg",
          "schedule": "PO once daily, until progression"
        }
      ]
    },
    "Avelumab-Axitinib": {
      "name": "Avelumab + Axitinib (CAVEATT) (thymic carcinoma)",
      "cycles": 35,
      "drugs": [
        {
          "name": "Avelumab",
          "dose": 10,
          "unit": "mg/kg",
          "schedule": "D1, D15, every 28 days, until progression"
        },
        {
          "name": "Axitinib",
          "dose": 5,
          "unit": "mg",
          "schedule": "PO twice daily, until progression"
        }
      ]
    },
    "Lenvatinib-Pembrolizumab": {
      "name": "Lenvatinib + Pembrolizumab (PECATI) (Investigational, thymic carcinoma)",
      "cycles": 35,
      "drugs": [
        {
          "name": "Lenvatinib",
          "dose": 20,
          "unit": "mg",
          "schedule": "PO once daily, until progression"
        },
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days (or 400 mg every 42 days), until progression (max 35 cycles)"
        }
      ]
    },
    "5FU-Leucovorin": {
      "name": "5-FU + Leucovorin (limited evidence)",
      "cycles": 6,
      "drugs": [
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
    "Paclitaxel-Single": {
      "name": "Paclitaxel",
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
    "Etoposide-Single": {
      "name": "Etoposide",
      "cycles": 6,
      "drugs": [
        {
          "name": "Etoposide",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1-D3, every 21 days"
        }
      ]
    },
    "Ifosfamide-Single": {
      "name": "Ifosfamide",
      "cycles": 6,
      "drugs": [
        {
          "name": "Ifosfamide",
          "dose": 1200,
          "unit": "mg/m²",
          "schedule": "D1-D5, every 21 days"
        },
        {
          "name": "Mesna",
          "dose": 1200,
          "unit": "mg/m²",
          "schedule": "equal to ifosfamide dose, D1-D5, every 21 days"
        }
      ]
    }
  }
};
