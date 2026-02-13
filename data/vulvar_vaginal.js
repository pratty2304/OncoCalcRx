window.protocolData = window.protocolData || {};
window.protocolData.vulvar_vaginal = {
  "definitive": {
    "Cisplatin-RT": {
      "name": "Weekly Cisplatin + RT (GOG-205) (NCCN Preferred)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "weekly (max 70mg) x 6-7 weeks concurrent with RT"
        }
      ]
    },
    "Carboplatin-RT": {
      "name": "Weekly Carboplatin + RT (cisplatin-ineligible)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 2",
          "unit": "AUC",
          "schedule": "weekly x 6-7 weeks concurrent with RT",
          "requiresAUC": true
        }
      ]
    },
    "Cisplatin-5FU-RT": {
      "name": "Cisplatin + 5-FU + RT (NCCN Other Recommended)",
      "cycles": 2,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1, weeks 1 and 5 concurrent with RT"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "CI D1-D4, weeks 1 and 5 concurrent with RT"
        }
      ]
    },
    "Mitomycin-Capecitabine-RT": {
      "name": "Mitomycin-C + Capecitabine + RT (platinum unavailable)",
      "cycles": 2,
      "drugs": [
        {
          "name": "Mitomycin-C",
          "dose": 10,
          "unit": "mg/m²",
          "schedule": "D1 and D29 concurrent with RT"
        },
        {
          "name": "Capecitabine",
          "dose": 825,
          "unit": "mg/m²",
          "schedule": "PO twice daily Mon-Fri during RT"
        }
      ]
    }
  },
  "adjuvant": {
    "Cisplatin-RT-Adjuvant": {
      "name": "Weekly Cisplatin + RT (positive nodes/margins)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "weekly (max 70mg) x 6 weeks concurrent with adjuvant RT"
        }
      ]
    },
    "Carboplatin-RT-Adjuvant": {
      "name": "Weekly Carboplatin + RT (cisplatin-ineligible, positive nodes/margins)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 2",
          "unit": "AUC",
          "schedule": "weekly x 6 weeks concurrent with adjuvant RT",
          "requiresAUC": true
        }
      ]
    }
  },
  "metastatic": {
    "Pembrolizumab-Cisplatin-Paclitaxel-Bev": {
      "name": "Pembrolizumab + Cisplatin + Paclitaxel ± Bevacizumab (PD-1 inhibitor + chemo ± VEGF inhibitor) (KEYNOTE-826) (vaginal SCC, PD-L1 CPS ≥1)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        },
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
          "name": "Bevacizumab (optional)",
          "dose": 15,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Pembrolizumab-Carboplatin-Paclitaxel-Bev": {
      "name": "Pembrolizumab + Carboplatin + Paclitaxel ± Bevacizumab (PD-1 inhibitor + chemo ± VEGF inhibitor) (KEYNOTE-826) (cisplatin-ineligible, vaginal SCC, PD-L1 CPS ≥1)",
      "cycles": 6,
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
          "schedule": "D1, every 21 days",
          "requiresAUC": true
        },
        {
          "name": "Paclitaxel",
          "dose": 175,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Bevacizumab (optional)",
          "dose": 15,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Cisplatin-Paclitaxel-Bevacizumab": {
      "name": "Cisplatin + Paclitaxel + Bevacizumab (VEGF inhibitor) (GOG-240 extrapolation)",
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
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Carboplatin-Paclitaxel-Bevacizumab": {
      "name": "Carboplatin + Paclitaxel + Bevacizumab (VEGF inhibitor) (cisplatin-ineligible)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 5",
          "unit": "AUC",
          "schedule": "IV D1, every 21 days",
          "requiresAUC": true
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
      "name": "Carboplatin + Paclitaxel (cisplatin-ineligible)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 5",
          "unit": "AUC",
          "schedule": "D1, every 21 days",
          "requiresAUC": true
        },
        {
          "name": "Paclitaxel",
          "dose": 175,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Cisplatin-5FU": {
      "name": "Cisplatin + 5-FU",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "CI D1-D4, every 21 days"
        }
      ]
    },
    "Cisplatin-Monotherapy": {
      "name": "Cisplatin monotherapy",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cisplatin",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Carboplatin-Monotherapy": {
      "name": "Carboplatin monotherapy (cisplatin-ineligible)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 5",
          "unit": "AUC",
          "schedule": "D1, every 21 days",
          "requiresAUC": true
        }
      ]
    },
    "Pembrolizumab": {
      "name": "Pembrolizumab monotherapy (PD-1 inhibitor) (PD-L1 CPS ≥1 or MSI-H/dMMR or TMB-H)",
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
    "Cemiplimab": {
      "name": "Cemiplimab monotherapy (PD-1 inhibitor) (NCCN Other Recommended)",
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
    "Nivolumab": {
      "name": "Nivolumab monotherapy (PD-1 inhibitor) (CheckMate 358) (HPV-associated)",
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
    "Tisotumab-Vedotin": {
      "name": "Tisotumab vedotin (tissue factor-directed ADC) (innovaTV 301) (vaginal SCC extrapolation)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Tisotumab vedotin",
          "dose": 2.0,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days (max 100mg)"
        }
      ]
    },
    "Gemcitabine-Cisplatin": {
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
    "Cisplatin-Docetaxel": {
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
    "Erlotinib": {
      "name": "Erlotinib (EGFR inhibitor) (vulvar SCC)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Erlotinib",
          "dose": 150,
          "unit": "mg",
          "schedule": "PO once daily",
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
    "Larotrectinib": {
      "name": "Larotrectinib (TRK inhibitor) (NTRK gene fusion-positive)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Larotrectinib",
          "dose": 100,
          "unit": "mg",
          "schedule": "PO twice daily",
          "isOralTargeted": true
        }
      ]
    },
    "Entrectinib": {
      "name": "Entrectinib (TRK inhibitor) (NTRK gene fusion-positive)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Entrectinib",
          "dose": 600,
          "unit": "mg",
          "schedule": "PO once daily",
          "isOralTargeted": true
        }
      ]
    }
  }
};
