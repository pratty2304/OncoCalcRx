window.protocolData = window.protocolData || {};
window.protocolData.testicular = {
  "adjuvant": {
    "BEP": {
      "name": "Bleomycin + Etoposide + Cisplatin (BEP) (stage I NSGCT)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Bleomycin",
          "dose": 30,
          "unit": "units",
          "schedule": "D1, D8, D15, every 21 days x 1 cycle"
        },
        {
          "name": "Etoposide",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1-D5, every 21 days x 1 cycle"
        },
        {
          "name": "Cisplatin",
          "dose": 20,
          "unit": "mg/m²",
          "schedule": "D1-D5, every 21 days x 1 cycle"
        }
      ]
    },
    "Carboplatin": {
      "name": "Carboplatin (stage I seminoma)",
      "cycles": 2,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 7",
          "unit": "AUC",
          "schedule": "single dose, x 1-2 cycles (every 21 days if 2 cycles)"
        }
      ]
    }
  },
  "metastatic": {
    "BEP": {
      "name": "Bleomycin + Etoposide + Cisplatin (BEP) (NCCN Preferred)",
      "cycles": 4,
      "drugs": [
        {
          "name": "Bleomycin",
          "dose": 30,
          "unit": "units",
          "schedule": "D1, D8, D15, every 21 days x 3 cycles (good risk) or x 4 cycles (intermediate/poor risk)"
        },
        {
          "name": "Etoposide",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1-D5, every 21 days x 3 cycles (good risk) or x 4 cycles (intermediate/poor risk)"
        },
        {
          "name": "Cisplatin",
          "dose": 20,
          "unit": "mg/m²",
          "schedule": "D1-D5, every 21 days x 3 cycles (good risk) or x 4 cycles (intermediate/poor risk)"
        }
      ]
    },
    "EP": {
      "name": "Etoposide + Cisplatin (EP) (good risk, bleomycin contraindicated)",
      "cycles": 4,
      "drugs": [
        {
          "name": "Etoposide",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1-D5, every 21 days x 4 cycles"
        },
        {
          "name": "Cisplatin",
          "dose": 20,
          "unit": "mg/m²",
          "schedule": "D1-D5, every 21 days x 4 cycles"
        }
      ]
    },
    "VIP": {
      "name": "Etoposide + Ifosfamide + Cisplatin (VIP) (intermediate/poor risk, bleomycin contraindicated)",
      "cycles": 4,
      "drugs": [
        {
          "name": "Etoposide",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1-D5, every 21 days x 4 cycles"
        },
        {
          "name": "Ifosfamide",
          "dose": 1200,
          "unit": "mg/m²",
          "schedule": "D1-D5, every 21 days x 4 cycles (total 6000 mg/m²/cycle)"
        },
        {
          "name": "Mesna",
          "dose": 1200,
          "unit": "mg/m²",
          "schedule": "equal to ifosfamide dose, D1-D5, every 21 days x 4 cycles"
        },
        {
          "name": "Cisplatin",
          "dose": 20,
          "unit": "mg/m²",
          "schedule": "D1-D5, every 21 days x 4 cycles"
        }
      ]
    },
    "TIP": {
      "name": "Paclitaxel + Ifosfamide + Cisplatin (TIP) (Motzer/Kondagunta) (first salvage)",
      "cycles": 4,
      "drugs": [
        {
          "name": "Paclitaxel",
          "dose": 250,
          "unit": "mg/m²",
          "schedule": "D1 (24-hour infusion), every 21 days x 4 cycles"
        },
        {
          "name": "Ifosfamide",
          "dose": 1500,
          "unit": "mg/m²",
          "schedule": "D2-D5, every 21 days x 4 cycles (total 6000 mg/m²/cycle)"
        },
        {
          "name": "Mesna",
          "dose": 1500,
          "unit": "mg/m²",
          "schedule": "equal to ifosfamide dose, D2-D5, every 21 days x 4 cycles"
        },
        {
          "name": "Cisplatin",
          "dose": 25,
          "unit": "mg/m²",
          "schedule": "D2-D5, every 21 days x 4 cycles"
        }
      ]
    },
    "VeIP": {
      "name": "Vinblastine + Ifosfamide + Cisplatin (VeIP) (Loehrer) (salvage)",
      "cycles": 4,
      "drugs": [
        {
          "name": "Vinblastine",
          "dose": 0.11,
          "unit": "mg/kg",
          "schedule": "D1-D2, every 21 days x 4 cycles"
        },
        {
          "name": "Ifosfamide",
          "dose": 1200,
          "unit": "mg/m²",
          "schedule": "D1-D5, every 21 days x 4 cycles (total 6000 mg/m²/cycle)"
        },
        {
          "name": "Mesna",
          "dose": 1200,
          "unit": "mg/m²",
          "schedule": "equal to ifosfamide dose, D1-D5, every 21 days x 4 cycles"
        },
        {
          "name": "Cisplatin",
          "dose": 20,
          "unit": "mg/m²",
          "schedule": "D1-D5, every 21 days x 4 cycles"
        }
      ]
    },
    "Paclitaxel-Gemcitabine-Oxaliplatin": {
      "name": "Gemcitabine + Paclitaxel + Oxaliplatin (GTP) (second/third salvage)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Paclitaxel",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days x 6 cycles"
        },
        {
          "name": "Gemcitabine",
          "dose": 800,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days x 6 cycles"
        },
        {
          "name": "Oxaliplatin",
          "dose": 130,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles"
        }
      ]
    },
    "Paclitaxel-Gemcitabine": {
      "name": "Gemcitabine + Paclitaxel (GT) (Einhorn) (second/third salvage)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Paclitaxel",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, every 28 days x 6 cycles"
        },
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, every 28 days x 6 cycles"
        }
      ]
    },
    "Gemcitabine-Oxaliplatin": {
      "name": "Gemcitabine + Oxaliplatin (GEMOX) (second/third salvage)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days x 6 cycles"
        },
        {
          "name": "Oxaliplatin",
          "dose": 130,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles"
        }
      ]
    },
    "HD-CE": {
      "name": "High-dose Carboplatin + Etoposide (HD-CE) (Indiana/Einhorn) (with ASCT)",
      "cycles": 2,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": 700,
          "unit": "mg/m²",
          "schedule": "D1-D3, x 2 cycles with ASCT (total 2100 mg/m²/cycle)"
        },
        {
          "name": "Etoposide",
          "dose": 750,
          "unit": "mg/m²",
          "schedule": "D1-D3, x 2 cycles with ASCT (total 2250 mg/m²/cycle)"
        }
      ]
    },
    "Carboplatin-Etoposide": {
      "name": "Carboplatin + Etoposide (CE) (cisplatin-ineligible only, limited evidence)",
      "cycles": 4,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 5",
          "unit": "AUC",
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
    "Etoposide-Oral": {
      "name": "Oral Etoposide (third-line/palliative)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Etoposide (oral)",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "PO daily x 21 days, every 28 days"
        }
      ]
    },
    "Pembrolizumab": {
      "name": "Pembrolizumab (PD-1 inhibitor) (MSI-H/dMMR or TMB-H)",
      "cycles": 35,
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days (or 400mg q6weeks)"
        }
      ]
    }
  }
};
