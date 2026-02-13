window.protocolData = window.protocolData || {};
window.protocolData.endometrial = {
  "neoadjuvant": {
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
    "Carboplatin-Paclitaxel-Adj": {
      "name": "Carboplatin + Paclitaxel (GOG-209)",
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
    },
    "Carboplatin-Paclitaxel-Pembrolizumab-Adj": {
      "name": "Carboplatin + Paclitaxel + Pembrolizumab (NRG-GY018) (NCCN Preferred)",
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
        },
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days x 6 cycles, then 400 mg Q6W maintenance up to 14 cycles"
        }
      ]
    },
    "Carboplatin-Paclitaxel-Dostarlimab-Adj": {
      "name": "Carboplatin + Paclitaxel + Dostarlimab (RUBY) (NCCN Preferred)",
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
        },
        {
          "name": "Dostarlimab",
          "dose": 500,
          "unit": "mg",
          "schedule": "D1, every 21 days x 6 cycles, then 1000 mg Q6W maintenance up to 3 years"
        }
      ]
    },
    "Carboplatin-Paclitaxel-Durvalumab-Adj": {
      "name": "Carboplatin + Paclitaxel + Durvalumab (DUO-E)",
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
        },
        {
          "name": "Durvalumab",
          "dose": 1120,
          "unit": "mg",
          "schedule": "D1, every 21 days x 6 cycles, then 1500 mg Q4W maintenance"
        }
      ]
    },
    "Cisplatin-RT-Adj": {
      "name": "Cisplatin weekly + RT (adjuvant chemoradiation)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "D1, weekly during radiation therapy x 5-6 weeks"
        }
      ]
    }
  },
  "metastatic": {
    "Carboplatin-Paclitaxel-Pembrolizumab": {
      "name": "Carboplatin + Paclitaxel + Pembrolizumab (NRG-GY018) (NCCN Preferred)",
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
          "schedule": "D1, every 21 days, then 400 mg Q6W maintenance up to 14 cycles"
        }
      ]
    },
    "Carboplatin-Paclitaxel-Dostarlimab": {
      "name": "Carboplatin + Paclitaxel + Dostarlimab (RUBY) (NCCN Preferred)",
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
          "name": "Dostarlimab",
          "dose": 500,
          "unit": "mg",
          "schedule": "D1, every 21 days, then 1000 mg Q6W maintenance up to 3 years"
        }
      ]
    },
    "Carboplatin-Paclitaxel-Durvalumab": {
      "name": "Carboplatin + Paclitaxel + Durvalumab (DUO-E)",
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
          "name": "Durvalumab",
          "dose": 1120,
          "unit": "mg",
          "schedule": "D1, every 21 days, then 1500 mg Q4W maintenance"
        }
      ]
    },
    "Carboplatin-Paclitaxel-Trastuzumab-HER2": {
      "name": "Carboplatin + Paclitaxel + Trastuzumab (HER2+ serous)",
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
          "name": "Trastuzumab",
          "dose": 8,
          "maintenanceDose": 6,
          "unit": "mg/kg",
          "schedule": "8 mg/kg loading dose, then 6 mg/kg D1, every 21 days",
          "hasLoadingDose": true
        }
      ]
    },
    "Carboplatin-Paclitaxel-Bevacizumab": {
      "name": "Carboplatin + Paclitaxel + Bevacizumab",
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
    "Carboplatin-Paclitaxel": {
      "name": "Carboplatin + Paclitaxel (GOG-209)",
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
    "Lenvatinib-Pembrolizumab-2L": {
      "name": "Lenvatinib + Pembrolizumab (KEYNOTE-775) (NCCN Preferred 2L)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Lenvatinib",
          "dose": 20,
          "unit": "mg",
          "schedule": "PO once daily, continuous"
        },
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Pembrolizumab-dMMR-2L": {
      "name": "Pembrolizumab monotherapy (KEYNOTE-158) (dMMR/MSI-H)",
      "cycles": 35,
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days (or 400 mg every 6 weeks)"
        }
      ]
    },
    "Dostarlimab-dMMR-2L": {
      "name": "Dostarlimab monotherapy (GARNET) (dMMR/MSI-H)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Dostarlimab",
          "dose": 500,
          "unit": "mg",
          "schedule": "D1, every 21 days x 4 doses, then 1000 mg every 6 weeks"
        }
      ]
    },
    "Trastuzumab-Deruxtecan-HER2-2L": {
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
    "Doxorubicin-Cisplatin-2L": {
      "name": "Doxorubicin + Cisplatin",
      "cycles": 6,
      "drugs": [
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
    "Gemcitabine-Docetaxel-2L": {
      "name": "Gemcitabine + Docetaxel",
      "cycles": 6,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 900,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Docetaxel",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D8, every 21 days"
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
    },
    "Ifosfamide-Paclitaxel-Carcinosarcoma": {
      "name": "Ifosfamide + Paclitaxel (carcinosarcoma)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Ifosfamide",
          "dose": 1600,
          "unit": "mg/m²",
          "schedule": "D1-3, every 21 days"
        },
        {
          "name": "Mesna (pre-dose)",
          "dose": 320,
          "unit": "mg/m²",
          "schedule": "before Ifosfamide, D1-3, every 21 days"
        },
        {
          "name": "Mesna (4h post)",
          "dose": 640,
          "unit": "mg/m²",
          "schedule": "4 hours after Ifosfamide, D1-3, every 21 days"
        },
        {
          "name": "Mesna (8h post)",
          "dose": 640,
          "unit": "mg/m²",
          "schedule": "8 hours after Ifosfamide, D1-3, every 21 days"
        },
        {
          "name": "Paclitaxel",
          "dose": 175,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Ifosfamide-Carcinosarcoma": {
      "name": "Ifosfamide monotherapy (carcinosarcoma)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Ifosfamide",
          "dose": 1500,
          "unit": "mg/m²",
          "schedule": "D1-5, every 21 days"
        },
        {
          "name": "Mesna (pre-dose)",
          "dose": 300,
          "unit": "mg/m²",
          "schedule": "before Ifosfamide, D1-5, every 21 days"
        },
        {
          "name": "Mesna (4h post)",
          "dose": 600,
          "unit": "mg/m²",
          "schedule": "4 hours after Ifosfamide, D1-5, every 21 days"
        },
        {
          "name": "Mesna (8h post)",
          "dose": 600,
          "unit": "mg/m²",
          "schedule": "8 hours after Ifosfamide, D1-5, every 21 days"
        }
      ]
    },
    "Doxorubicin-2L": {
      "name": "Doxorubicin monotherapy",
      "cycles": 6,
      "drugs": [
        {
          "name": "Doxorubicin",
          "dose": 60,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Liposomal-Doxorubicin-2L": {
      "name": "Liposomal doxorubicin (PLD)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Liposomal doxorubicin",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "D1, every 28 days"
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
    "Topotecan-2L": {
      "name": "Topotecan monotherapy",
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
    "Megestrol": {
      "name": "Megestrol acetate (hormonal, low-grade ER/PR+)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Megestrol acetate",
          "dose": 160,
          "unit": "mg",
          "schedule": "PO once daily, continuous"
        }
      ]
    },
    "Medroxyprogesterone": {
      "name": "Medroxyprogesterone acetate (hormonal, low-grade ER/PR+)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Medroxyprogesterone acetate",
          "dose": 200,
          "unit": "mg",
          "schedule": "PO once daily, continuous"
        }
      ]
    },
    "Tamoxifen": {
      "name": "Tamoxifen (hormonal, low-grade ER/PR+)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Tamoxifen",
          "dose": 20,
          "unit": "mg",
          "schedule": "PO once daily, continuous"
        }
      ]
    },
    "Letrozole": {
      "name": "Letrozole (aromatase inhibitor, low-grade ER/PR+)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Letrozole",
          "dose": 2.5,
          "unit": "mg",
          "schedule": "PO once daily, continuous"
        }
      ]
    },
    "Everolimus-Letrozole": {
      "name": "Everolimus + Letrozole (mTOR inhibitor + aromatase inhibitor)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Everolimus",
          "dose": 10,
          "unit": "mg",
          "schedule": "PO once daily, continuous"
        },
        {
          "name": "Letrozole",
          "dose": 2.5,
          "unit": "mg",
          "schedule": "PO once daily, continuous"
        }
      ]
    }
  }
};
