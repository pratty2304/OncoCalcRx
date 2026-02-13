window.protocolData = window.protocolData || {};
window.protocolData.cervical = {
  "definitive": {
    "Cisplatin-RT": {
      "name": "Cisplatin weekly + RT (NCCN Preferred)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "D1, weekly during radiation therapy x 5-6 weeks"
        }
      ]
    },
    "Cisplatin-Pembrolizumab-RT": {
      "name": "Cisplatin + Pembrolizumab + RT (KEYNOTE-A18)",
      "cycles": 5,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "D1, weekly during radiation therapy x 5-6 weeks"
        },
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days x 5 doses concurrent, then 400 mg Q6W maintenance up to 15 cycles"
        }
      ]
    },
    "Carboplatin-RT": {
      "name": "Carboplatin weekly + RT (cisplatin-intolerant)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 2",
          "unit": "AUC",
          "schedule": "D1, weekly during radiation therapy x 5-6 weeks"
        }
      ]
    },
    "Cisplatin-5FU-RT": {
      "name": "Cisplatin + 5-Fluorouracil + RT",
      "cycles": 2,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 28 days x 2 cycles during RT"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 1000,
          "unit": "mg/m²/day",
          "schedule": "continuous infusion D2-5 (96 hours), every 28 days x 2 cycles during RT"
        }
      ]
    }
  },
  "neoadjuvant": {
    "Cisplatin-Paclitaxel-Neo": {
      "name": "Cisplatin + Paclitaxel",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles"
        },
        {
          "name": "Paclitaxel",
          "dose": 175,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles"
        }
      ]
    },
    "Carboplatin-Paclitaxel-Neo": {
      "name": "Carboplatin + Paclitaxel",
      "cycles": 6,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 5",
          "unit": "AUC",
          "schedule": "D1, every 21 days x 6 cycles"
        },
        {
          "name": "Paclitaxel",
          "dose": 175,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles"
        }
      ]
    }
  },
  "adjuvant": {
    "Cisplatin-Paclitaxel-Adj": {
      "name": "Cisplatin + Paclitaxel",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles"
        },
        {
          "name": "Paclitaxel",
          "dose": 175,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles"
        }
      ]
    },
    "Carboplatin-Paclitaxel-Adj": {
      "name": "Carboplatin + Paclitaxel",
      "cycles": 6,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 5",
          "unit": "AUC",
          "schedule": "D1, every 21 days x 6 cycles"
        },
        {
          "name": "Paclitaxel",
          "dose": 175,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles"
        }
      ]
    }
  },
  "metastatic": {
    "Cisplatin-Paclitaxel-Pembrolizumab-Bevacizumab": {
      "name": "Cisplatin + Paclitaxel + Pembrolizumab + Bevacizumab (KEYNOTE-826) (NCCN Preferred)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Paclitaxel",
          "dose": 175,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days (up to 35 cycles / 2 years)"
        },
        {
          "name": "Bevacizumab",
          "dose": 15,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days (continue until progression)"
        }
      ]
    },
    "Carboplatin-Paclitaxel-Pembrolizumab-Bevacizumab": {
      "name": "Carboplatin + Paclitaxel + Pembrolizumab + Bevacizumab (KEYNOTE-826) (NCCN Preferred)",
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
        },
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days (up to 35 cycles / 2 years)"
        },
        {
          "name": "Bevacizumab",
          "dose": 15,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days (continue until progression)"
        }
      ]
    },
    "Cisplatin-Paclitaxel-Pembrolizumab": {
      "name": "Cisplatin + Paclitaxel + Pembrolizumab (KEYNOTE-826)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Paclitaxel",
          "dose": 175,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days (up to 35 cycles / 2 years)"
        }
      ]
    },
    "Carboplatin-Paclitaxel-Pembrolizumab": {
      "name": "Carboplatin + Paclitaxel + Pembrolizumab (KEYNOTE-826)",
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
        },
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days (up to 35 cycles / 2 years)"
        }
      ]
    },
    "Cisplatin-Paclitaxel-Atezolizumab-Bevacizumab": {
      "name": "Cisplatin + Paclitaxel + Atezolizumab + Bevacizumab (BEATcc)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Paclitaxel",
          "dose": 175,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Atezolizumab",
          "dose": 1200,
          "unit": "mg",
          "schedule": "D1, every 21 days (continue until progression)"
        },
        {
          "name": "Bevacizumab",
          "dose": 15,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days (continue until progression)"
        }
      ]
    },
    "Carboplatin-Paclitaxel-Atezolizumab-Bevacizumab": {
      "name": "Carboplatin + Paclitaxel + Atezolizumab + Bevacizumab (BEATcc)",
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
        },
        {
          "name": "Atezolizumab",
          "dose": 1200,
          "unit": "mg",
          "schedule": "D1, every 21 days (continue until progression)"
        },
        {
          "name": "Bevacizumab",
          "dose": 15,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days (continue until progression)"
        }
      ]
    },
    "Cisplatin-Paclitaxel-Bevacizumab": {
      "name": "Cisplatin + Paclitaxel + Bevacizumab (GOG-240)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Paclitaxel",
          "dose": 175,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Bevacizumab",
          "dose": 15,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days (continue until progression)"
        }
      ]
    },
    "Carboplatin-Paclitaxel-Bevacizumab": {
      "name": "Carboplatin + Paclitaxel + Bevacizumab (GOG-240)",
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
        },
        {
          "name": "Bevacizumab",
          "dose": 15,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days (continue until progression)"
        }
      ]
    },
    "Cisplatin-Paclitaxel": {
      "name": "Cisplatin + Paclitaxel",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 50,
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
    "Carboplatin-Paclitaxel-Weekly": {
      "name": "Carboplatin + Paclitaxel (weekly)",
      "cycles": 6,
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
    "Topotecan-Paclitaxel-Bevacizumab": {
      "name": "Topotecan + Paclitaxel + Bevacizumab (GOG-240)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Topotecan",
          "dose": 0.75,
          "unit": "mg/m²",
          "schedule": "D1-3, every 21 days"
        },
        {
          "name": "Paclitaxel",
          "dose": 175,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Bevacizumab",
          "dose": 15,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days (continue until progression)"
        }
      ]
    },
    "Gemcitabine-Cisplatin-Pembrolizumab": {
      "name": "Gemcitabine + Cisplatin + Pembrolizumab",
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
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days (up to 35 cycles / 2 years)"
        }
      ]
    },
    "Gemcitabine-Carboplatin-Pembrolizumab": {
      "name": "Gemcitabine + Carboplatin + Pembrolizumab",
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
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days (up to 35 cycles / 2 years)"
        }
      ]
    },
    "Pembrolizumab-2L": {
      "name": "Pembrolizumab monotherapy (KEYNOTE-158) (PD-L1 CPS >= 1)",
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
    "Cemiplimab-2L": {
      "name": "Cemiplimab (EMPOWER-Cervical 1) (NCCN Preferred 2L)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Cemiplimab",
          "dose": 350,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Tisotumab-Vedotin-2L": {
      "name": "Tisotumab vedotin (innovaTV 301) (tissue factor-directed ADC) (NCCN Preferred 2L)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Tisotumab vedotin",
          "dose": 2,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Nivolumab-2L": {
      "name": "Nivolumab (CheckMate 358)",
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
    "Trastuzumab-Deruxtecan-2L": {
      "name": "Trastuzumab deruxtecan (DESTINY-PanTumor02) (HER2+ IHC 3+ or 2+/ISH+)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Trastuzumab deruxtecan",
          "dose": 5.4,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Topotecan-2L": {
      "name": "Topotecan",
      "cycles": 6,
      "drugs": [
        {
          "name": "Topotecan",
          "dose": 1.5,
          "unit": "mg/m²",
          "schedule": "D1-5, every 21 days"
        }
      ]
    },
    "Topotecan-Weekly-2L": {
      "name": "Topotecan (weekly)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Topotecan",
          "dose": 4,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, every 28 days"
        }
      ]
    },
    "Docetaxel-2L": {
      "name": "Docetaxel",
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
    "Gemcitabine-2L": {
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
    "Pemetrexed-2L": {
      "name": "Pemetrexed",
      "cycles": 6,
      "drugs": [
        {
          "name": "Pemetrexed",
          "dose": 500,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Irinotecan-2L": {
      "name": "Irinotecan",
      "cycles": 6,
      "drugs": [
        {
          "name": "Irinotecan",
          "dose": 125,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, D22, every 42 days"
        }
      ]
    },
    "Vinorelbine-2L": {
      "name": "Vinorelbine",
      "cycles": 6,
      "drugs": [
        {
          "name": "Vinorelbine",
          "dose": 30,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        }
      ]
    },
    "Nab-Paclitaxel-2L": {
      "name": "Nab-paclitaxel (albumin-bound paclitaxel)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Nab-paclitaxel",
          "dose": 125,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, every 28 days"
        }
      ]
    },
    "Cisplatin-Topotecan-2L": {
      "name": "Cisplatin + Topotecan",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Topotecan",
          "dose": 0.75,
          "unit": "mg/m²",
          "schedule": "D1-3, every 21 days"
        }
      ]
    },
    "Paclitaxel-Topotecan-2L": {
      "name": "Paclitaxel + Topotecan",
      "cycles": 6,
      "drugs": [
        {
          "name": "Paclitaxel",
          "dose": 175,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Topotecan",
          "dose": 0.75,
          "unit": "mg/m²",
          "schedule": "D1-3, every 21 days"
        }
      ]
    },
    "Paclitaxel-Topotecan-Bevacizumab-2L": {
      "name": "Paclitaxel + Topotecan + Bevacizumab",
      "cycles": 6,
      "drugs": [
        {
          "name": "Paclitaxel",
          "dose": 175,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Topotecan",
          "dose": 0.75,
          "unit": "mg/m²",
          "schedule": "D1-3, every 21 days"
        },
        {
          "name": "Bevacizumab",
          "dose": 15,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Gemcitabine-Cisplatin-2L": {
      "name": "Gemcitabine + Cisplatin",
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
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Cisplatin-Docetaxel-2L": {
      "name": "Cisplatin + Docetaxel",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Docetaxel",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Carboplatin-Docetaxel-2L": {
      "name": "Carboplatin + Docetaxel",
      "cycles": 6,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 5",
          "unit": "AUC",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Docetaxel",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    }
  }
};
