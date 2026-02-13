window.protocolData = window.protocolData || {};
window.protocolData.head_neck = {
  "neoadjuvant": {
    "TPF-Neo": {
      "name": "Docetaxel + Cisplatin + 5-Fluorouracil (TPF) (TAX-323/324)",
      "cycles": 3,
      "drugs": [
        {
          "name": "Docetaxel",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "CI over 4 days D1-D4, every 21 days"
        }
      ]
    },
    "Cisplatin-5FU-Neo": {
      "name": "Cisplatin + 5-Fluorouracil (PF)",
      "cycles": 3,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "CI over 4 days D1-D4, every 21 days"
        }
      ]
    },
    "Carboplatin-Paclitaxel-Neo": {
      "name": "Carboplatin + Paclitaxel",
      "cycles": 3,
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
    "Gemcitabine-Cisplatin-NPC-Neo": {
      "name": "Gemcitabine + Cisplatin (Nasopharyngeal)",
      "cycles": 3,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    }
  },
  "definitive": {
    "Cisplatin-RT-Q3W": {
      "name": "Cisplatin + Radiotherapy (high-dose q3w)",
      "cycles": 3,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days concurrent with RT"
        }
      ]
    },
    "Cisplatin-RT-Weekly": {
      "name": "Cisplatin + Radiotherapy (weekly)",
      "cycles": 7,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "D1, every 7 days x 7 weeks concurrent with RT"
        }
      ]
    },
    "Cetuximab-RT": {
      "name": "Cetuximab + Radiotherapy (Bonner) (EGFR inhibitor)",
      "cycles": 7,
      "drugs": [
        {
          "name": "Cetuximab",
          "dose": 400,
          "maintenanceDose": 250,
          "unit": "mg/m²",
          "schedule": "400 mg/m² loading dose, then 250 mg/m² weekly concurrent with RT",
          "hasLoadingDose": true
        }
      ]
    },
    "Carboplatin-Paclitaxel-RT": {
      "name": "Carboplatin + Paclitaxel + Radiotherapy (weekly)",
      "cycles": 7,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 2",
          "unit": "AUC",
          "schedule": "D1, every 7 days x 7 weeks concurrent with RT"
        },
        {
          "name": "Paclitaxel",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, every 7 days x 7 weeks concurrent with RT"
        }
      ]
    }
  },
  "adjuvant": {
    "Cisplatin-RT-Q3W-Adj": {
      "name": "Cisplatin + Radiotherapy (high-dose q3w, post-operative)",
      "cycles": 3,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days concurrent with RT"
        }
      ]
    },
    "Cisplatin-RT-Weekly-Adj": {
      "name": "Cisplatin + Radiotherapy (weekly, post-operative)",
      "cycles": 7,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "D1, every 7 days x 7 weeks concurrent with RT"
        }
      ]
    }
  },
  "metastatic": {
    "Pembrolizumab-Cisplatin-5FU-1L": {
      "name": "Pembrolizumab + Cisplatin + 5-Fluorouracil (KEYNOTE-048) (PD-1 inhibitor)",
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "CI over 4 days D1-D4, every 21 days"
        }
      ]
    },
    "Pembrolizumab-Carboplatin-5FU-1L": {
      "name": "Pembrolizumab + Carboplatin + 5-Fluorouracil (KEYNOTE-048) (PD-1 inhibitor)",
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Carboplatin",
          "dose": "AUC 5",
          "unit": "AUC",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "CI over 4 days D1-D4, every 21 days"
        }
      ]
    },
    "Pembrolizumab-Monotherapy-CPS20-1L": {
      "name": "Pembrolizumab monotherapy (KEYNOTE-048) (PD-L1 CPS≥20) (PD-1 inhibitor)",
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days or 400mg every 6 weeks"
        }
      ]
    },
    "Cisplatin-5FU-Cetuximab-1L": {
      "name": "Cisplatin + 5-Fluorouracil + Cetuximab (EXTREME) (EGFR inhibitor)",
      "drugs": [
        {
          "name": "Cetuximab",
          "dose": 400,
          "maintenanceDose": 250,
          "unit": "mg/m²",
          "schedule": "400 mg/m² loading dose, then 250 mg/m² weekly",
          "hasLoadingDose": true
        },
        {
          "name": "Cisplatin",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "CI over 4 days D1-D4, every 21 days"
        }
      ]
    },
    "Carboplatin-5FU-Cetuximab-1L": {
      "name": "Carboplatin + 5-Fluorouracil + Cetuximab (EXTREME) (EGFR inhibitor)",
      "drugs": [
        {
          "name": "Cetuximab",
          "dose": 400,
          "maintenanceDose": 250,
          "unit": "mg/m²",
          "schedule": "400 mg/m² loading dose, then 250 mg/m² weekly",
          "hasLoadingDose": true
        },
        {
          "name": "Carboplatin",
          "dose": "AUC 5",
          "unit": "AUC",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "CI over 4 days D1-D4, every 21 days"
        }
      ]
    },
    "Cisplatin-5FU-1L": {
      "name": "Cisplatin + 5-Fluorouracil",
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "CI over 4 days D1-D4, every 21 days"
        }
      ]
    },
    "Carboplatin-Paclitaxel-1L": {
      "name": "Carboplatin + Paclitaxel",
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
    "Carboplatin-Paclitaxel-Weekly-1L": {
      "name": "Carboplatin + Paclitaxel (weekly)",
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
    "Cisplatin-Paclitaxel-1L": {
      "name": "Cisplatin + Paclitaxel",
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
    "Toripalimab-Gemcitabine-Cisplatin-NPC": {
      "name": "Toripalimab + Gemcitabine + Cisplatin (JUPITER-02) (Nasopharyngeal) (PD-1 inhibitor)",
      "drugs": [
        {
          "name": "Toripalimab",
          "dose": 240,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Gemcitabine-Cisplatin-NPC": {
      "name": "Gemcitabine + Cisplatin (Nasopharyngeal)",
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Cisplatin-Vinorelbine-NPC": {
      "name": "Cisplatin + Vinorelbine (Nasopharyngeal)",
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Vinorelbine",
          "dose": 25,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        }
      ]
    },
    "Pembrolizumab-Monotherapy-CPS1-2L": {
      "name": "Pembrolizumab monotherapy (KEYNOTE-040) (PD-L1 CPS≥1) (PD-1 inhibitor)",
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days or 400mg every 6 weeks"
        }
      ]
    },
    "Nivolumab-Monotherapy-2L": {
      "name": "Nivolumab monotherapy (CheckMate-141) (PD-1 inhibitor)",
      "drugs": [
        {
          "name": "Nivolumab",
          "dose": 240,
          "unit": "mg",
          "schedule": "D1, every 14 days or 480mg every 28 days"
        }
      ]
    },
    "Cetuximab-Monotherapy-2L": {
      "name": "Cetuximab monotherapy (EGFR inhibitor)",
      "drugs": [
        {
          "name": "Cetuximab",
          "dose": 400,
          "maintenanceDose": 250,
          "unit": "mg/m²",
          "schedule": "400 mg/m² loading dose, then 250 mg/m² weekly",
          "hasLoadingDose": true
        }
      ]
    },
    "Docetaxel-Monotherapy-2L": {
      "name": "Docetaxel monotherapy",
      "drugs": [
        {
          "name": "Docetaxel",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Paclitaxel-Monotherapy-2L": {
      "name": "Paclitaxel monotherapy",
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
      "drugs": [
        {
          "name": "Paclitaxel",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, every 28 days"
        }
      ]
    },
    "Methotrexate-Monotherapy-2L": {
      "name": "Methotrexate monotherapy",
      "drugs": [
        {
          "name": "Methotrexate",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "D1, every 7 days"
        }
      ]
    },
    "Capecitabine-Monotherapy-2L": {
      "name": "Capecitabine monotherapy",
      "drugs": [
        {
          "name": "Capecitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D14, every 21 days"
        }
      ]
    },
    "Carboplatin-Cetuximab-2L": {
      "name": "Carboplatin + Cetuximab (EGFR inhibitor)",
      "drugs": [
        {
          "name": "Cetuximab",
          "dose": 400,
          "maintenanceDose": 250,
          "unit": "mg/m²",
          "schedule": "400 mg/m² loading dose, then 250 mg/m² weekly",
          "hasLoadingDose": true
        },
        {
          "name": "Carboplatin",
          "dose": "AUC 5",
          "unit": "AUC",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Paclitaxel-Carboplatin-Cetuximab-2L": {
      "name": "Paclitaxel + Carboplatin + Cetuximab (PCE) (EGFR inhibitor)",
      "drugs": [
        {
          "name": "Cetuximab",
          "dose": 400,
          "maintenanceDose": 250,
          "unit": "mg/m²",
          "schedule": "400 mg/m² loading dose, then 250 mg/m² weekly",
          "hasLoadingDose": true
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
    "Afatinib-2L": {
      "name": "Afatinib (LUX-Head&Neck 1) (EGFR/HER2 inhibitor)",
      "drugs": [
        {
          "name": "Afatinib",
          "dose": 40,
          "unit": "mg",
          "schedule": "PO once daily until progression"
        }
      ]
    }
  }
};
