window.protocolData = window.protocolData || {};
window.protocolData.carcinoma_unknown_primary = {
  "metastatic": {
    "Carboplatin-Paclitaxel": {
      "name": "Carboplatin + Paclitaxel (adenocarcinoma/squamous)",
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
    "Carboplatin-Paclitaxel-Weekly": {
      "name": "Carboplatin + Paclitaxel weekly (adenocarcinoma/squamous)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 2",
          "unit": "AUC",
          "schedule": "D1, every 7 days"
        },
        {
          "name": "Paclitaxel",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, every 7 days"
        }
      ]
    },
    "Gemcitabine-Cisplatin": {
      "name": "Gemcitabine + Cisplatin (adenocarcinoma/squamous)",
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
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Gemcitabine-Carboplatin": {
      "name": "Gemcitabine + Carboplatin (adenocarcinoma/squamous)",
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
    "Docetaxel-Cisplatin": {
      "name": "Docetaxel + Cisplatin (squamous)",
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
        }
      ]
    },
    "Docetaxel-Carboplatin": {
      "name": "Docetaxel + Carboplatin (squamous)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Docetaxel",
          "dose": 75,
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
    "Gemcitabine-Irinotecan": {
      "name": "Gemcitabine + Irinotecan (adenocarcinoma)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Irinotecan",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        }
      ]
    },
    "Paclitaxel-Carboplatin-Etoposide": {
      "name": "Paclitaxel + Carboplatin + Etoposide (PCE) (neuroendocrine/poorly differentiated)",
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
          "dose": "AUC 6",
          "unit": "AUC",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Etoposide",
          "dose": 50,
          "unit": "mg",
          "schedule": "PO D1-10 (alternating 50 mg and 100 mg daily), every 21 days"
        }
      ]
    },
    "Etoposide-Cisplatin": {
      "name": "Etoposide + Cisplatin (EP) (neuroendocrine/poorly differentiated)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Etoposide",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1-3, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "BEP": {
      "name": "Bleomycin + Etoposide + Cisplatin (BEP) (germ cell features)",
      "cycles": 3,
      "drugs": [
        {
          "name": "Bleomycin",
          "dose": 30,
          "unit": "units",
          "schedule": "D1, D8, D15, every 21 days"
        },
        {
          "name": "Etoposide",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1-5, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 20,
          "unit": "mg/m²",
          "schedule": "D1-5, every 21 days"
        }
      ]
    },
    "CapeOX": {
      "name": "Capecitabine + Oxaliplatin (CAPOX) (colorectal profile)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Capecitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-14, every 21 days"
        },
        {
          "name": "Oxaliplatin",
          "dose": 130,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "FOLFOX": {
      "name": "5-FU + Leucovorin + Oxaliplatin (FOLFOX) (colorectal profile)",
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
          "name": "5-Fluorouracil (bolus)",
          "dose": 400,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days"
        },
        {
          "name": "5-Fluorouracil (infusion)",
          "dose": 2400,
          "unit": "mg/m²",
          "schedule": "continuous infusion over 46 hours, every 14 days"
        }
      ]
    },
    "FOLFIRI": {
      "name": "5-FU + Leucovorin + Irinotecan (FOLFIRI) (colorectal profile)",
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
          "name": "5-Fluorouracil (bolus)",
          "dose": 400,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days"
        },
        {
          "name": "5-Fluorouracil (infusion)",
          "dose": 2400,
          "unit": "mg/m²",
          "schedule": "continuous infusion over 46 hours, every 14 days"
        }
      ]
    },
    "Gemcitabine-Carboplatin-Paclitaxel": {
      "name": "Gemcitabine + Carboplatin + Paclitaxel (adenocarcinoma)",
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
        },
        {
          "name": "Paclitaxel",
          "dose": 175,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Pembrolizumab": {
      "name": "Pembrolizumab monotherapy (MSI-H/dMMR or TMB-H)",
      "cycles": 35,
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days (up to 35 cycles / 2 years)"
        }
      ]
    },
    "Nivolumab": {
      "name": "Nivolumab monotherapy (MSI-H/dMMR)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Nivolumab",
          "dose": 240,
          "unit": "mg",
          "schedule": "D1, every 14 days"
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
    "Gemcitabine-2L": {
      "name": "Gemcitabine monotherapy",
      "cycles": 8,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
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
    "Capecitabine-2L": {
      "name": "Capecitabine monotherapy",
      "cycles": 8,
      "drugs": [
        {
          "name": "Capecitabine",
          "dose": 1250,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-14, every 21 days"
        }
      ]
    }
  }
};
