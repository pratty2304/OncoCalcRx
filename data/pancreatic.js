window.protocolData = window.protocolData || {};
window.protocolData.pancreatic = {
  "neoadjuvant": {
    "mFOLFIRINOX": {
      "name": "mFOLFIRINOX (PRODIGE-4)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Oxaliplatin",
          "dose": 85,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days x 8 cycles"
        },
        {
          "name": "Irinotecan",
          "dose": 150,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days x 8 cycles"
        },
        {
          "name": "Leucovorin",
          "dose": 400,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days x 8 cycles"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 2400,
          "unit": "mg/m²",
          "schedule": "CIV over 46h, every 14 days x 8 cycles"
        }
      ]
    },
    "Gemcitabine-Nabpaclitaxel": {
      "name": "Gemcitabine + Nab-paclitaxel",
      "cycles": 6,
      "drugs": [
        {
          "name": "Nab-paclitaxel",
          "dose": 125,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days x 6 cycles"
        },
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days x 6 cycles"
        }
      ]
    },
    "Capecitabine-RT": {
      "name": "Capecitabine + Radiation Therapy (chemoradiation)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Capecitabine",
          "dose": 825,
          "unit": "mg/m²",
          "schedule": "PO twice daily on days of RT x 5.5 weeks"
        },
        {
          "name": "Radiation Therapy",
          "dose": 50.4,
          "unit": "Gy",
          "schedule": "28 fractions over 5.5 weeks"
        }
      ]
    },
    "Gemcitabine-RT": {
      "name": "Gemcitabine + Radiation Therapy (chemoradiation)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 600,
          "unit": "mg/m²",
          "schedule": "D1, D8 during RT x 5.5 weeks"
        },
        {
          "name": "Radiation Therapy",
          "dose": 50.4,
          "unit": "Gy",
          "schedule": "28 fractions over 5.5 weeks"
        }
      ]
    }
  },
  "adjuvant": {
    "mFOLFIRINOX": {
      "name": "mFOLFIRINOX (PRODIGE-24)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Oxaliplatin",
          "dose": 85,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days x 12 cycles"
        },
        {
          "name": "Irinotecan",
          "dose": 150,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days x 12 cycles"
        },
        {
          "name": "Leucovorin",
          "dose": 400,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days x 12 cycles"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 2400,
          "unit": "mg/m²",
          "schedule": "CIV over 46h, every 14 days x 12 cycles"
        }
      ]
    },
    "Gemcitabine-Capecitabine": {
      "name": "Gemcitabine + Capecitabine (ESPAC-4)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, every 28 days x 6 cycles"
        },
        {
          "name": "Capecitabine",
          "dose": 830,
          "unit": "mg/m²",
          "schedule": "PO twice daily D1-D21, every 28 days x 6 cycles"
        }
      ]
    },
    "Gemcitabine": {
      "name": "Gemcitabine monotherapy (CONKO-001)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, every 28 days x 6 cycles"
        }
      ]
    },
    "Gemcitabine-Nabpaclitaxel": {
      "name": "Gemcitabine + Nab-paclitaxel (APACT)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Nab-paclitaxel",
          "dose": 125,
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
    "Capecitabine-RT": {
      "name": "Capecitabine + Radiation Therapy (adjuvant chemoradiation)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Capecitabine",
          "dose": 825,
          "unit": "mg/m²",
          "schedule": "PO twice daily on days of RT x 5.5 weeks"
        },
        {
          "name": "Radiation Therapy",
          "dose": 50.4,
          "unit": "Gy",
          "schedule": "28 fractions over 5.5 weeks"
        }
      ]
    },
    "5FU-RT": {
      "name": "5-Fluorouracil + Radiation Therapy (adjuvant chemoradiation)",
      "cycles": 1,
      "drugs": [
        {
          "name": "5-Fluorouracil",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "CI daily D1-D4 and D29-D32 of RT"
        },
        {
          "name": "Radiation Therapy",
          "dose": 50.4,
          "unit": "Gy",
          "schedule": "28 fractions over 5.5 weeks"
        }
      ]
    }
  },
  "metastatic": {
    "mFOLFIRINOX": {
      "name": "mFOLFIRINOX (NCCN preferred)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Oxaliplatin",
          "dose": 85,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days"
        },
        {
          "name": "Irinotecan",
          "dose": 150,
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
          "dose": 2400,
          "unit": "mg/m²",
          "schedule": "CIV over 46h, every 14 days"
        }
      ]
    },
    "NALIRIFOX": {
      "name": "NALIRIFOX (NAPOLI-3) (NCCN preferred)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Liposomal Irinotecan",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, D15, every 28 days"
        },
        {
          "name": "Oxaliplatin",
          "dose": 60,
          "unit": "mg/m²",
          "schedule": "D1, D15, every 28 days"
        },
        {
          "name": "Leucovorin",
          "dose": 400,
          "unit": "mg/m²",
          "schedule": "D1, D15, every 28 days"
        },
        {
          "name": "5-Fluorouracil",
          "dose": 2400,
          "unit": "mg/m²",
          "schedule": "CIV over 46h, D1, D15, every 28 days"
        }
      ]
    },
    "Gemcitabine-Nabpaclitaxel": {
      "name": "Gemcitabine + Nab-paclitaxel (MPACT) (NCCN preferred)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Nab-paclitaxel",
          "dose": 125,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, every 28 days"
        },
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, every 28 days"
        }
      ]
    },
    "Gemcitabine": {
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
    "FDR-Gemcitabine": {
      "name": "Fixed-dose rate Gemcitabine",
      "cycles": 6,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, every 28 days (infuse at 10 mg/m²/min)"
        }
      ]
    },
    "5FU-LV": {
      "name": "5-Fluorouracil + Leucovorin",
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
          "name": "5-Fluorouracil",
          "dose": 2400,
          "unit": "mg/m²",
          "schedule": "CIV over 46h, every 14 days"
        }
      ]
    },
    "Capecitabine": {
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
    "Gemcitabine-Erlotinib": {
      "name": "Gemcitabine + Erlotinib",
      "cycles": 6,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, every 28 days"
        },
        {
          "name": "Erlotinib",
          "dose": 100,
          "unit": "mg",
          "schedule": "PO once daily, continuous"
        }
      ]
    },
    "Liposomal-Irinotecan-5FU-LV": {
      "name": "Liposomal Irinotecan + 5-FU/LV (NAPOLI-1) (post-gemcitabine)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Liposomal Irinotecan",
          "dose": 70,
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
          "dose": 2400,
          "unit": "mg/m²",
          "schedule": "CIV over 46h, every 14 days"
        }
      ]
    },
    "mFOLFOX6": {
      "name": "mFOLFOX6",
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
          "schedule": "CIV over 46h, every 14 days"
        }
      ]
    },
    "mFOLFIRI": {
      "name": "mFOLFIRI",
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
          "schedule": "CIV over 46h, every 14 days"
        }
      ]
    },
    "Gemcitabine-Cisplatin": {
      "name": "Gemcitabine + Cisplatin (BRCA1/2/PALB2-mutated)",
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
          "dose": 25,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        }
      ]
    },
    "Nabpaclitaxel-Gemcitabine-Cisplatin": {
      "name": "Nab-paclitaxel + Gemcitabine + Cisplatin (BRCA1/2-mutated)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Nab-paclitaxel",
          "dose": 125,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Cisplatin",
          "dose": 25,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        }
      ]
    },
    "Olaparib": {
      "name": "Olaparib (POLO) (PARP inhibitor) (gBRCA-mutated, maintenance after platinum)",
      "cycles": 24,
      "drugs": [
        {
          "name": "Olaparib",
          "dose": 300,
          "unit": "mg",
          "schedule": "PO twice daily until progression"
        }
      ]
    },
    "Pembrolizumab": {
      "name": "Pembrolizumab (PD-1 inhibitor) (MSI-H/dMMR)",
      "cycles": 35,
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days, up to 2 years (or 400mg every 6 weeks)"
        }
      ]
    },
    "Sotorasib": {
      "name": "Sotorasib (CodeBreaK 100) (KRAS G12C-mutated)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Sotorasib",
          "dose": 960,
          "unit": "mg",
          "schedule": "PO once daily, continuous"
        }
      ]
    },
    "Adagrasib": {
      "name": "Adagrasib (KRYSTAL-1) (KRAS G12C-mutated)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Adagrasib",
          "dose": 600,
          "unit": "mg",
          "schedule": "PO twice daily, continuous"
        }
      ]
    },
    "Zenocutuzumab": {
      "name": "Zenocutuzumab (Bizengri) (eNRGy) (NRG1-fusion-positive)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Zenocutuzumab",
          "dose": 750,
          "unit": "mg",
          "schedule": "IV every 14 days (after loading dose of 750mg D1, D8 cycle 1)"
        }
      ]
    }
  }
};
