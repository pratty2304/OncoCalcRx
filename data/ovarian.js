window.protocolData = window.protocolData || {};
window.protocolData.ovarian = {
  "primary_treatment": {
    "Carboplatin-Paclitaxel": {
      "name": "Carboplatin + Paclitaxel (GOG-158)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 5-6",
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
    "Carboplatin-Paclitaxel-DoseDense": {
      "name": "Carboplatin + Paclitaxel dose-dense (GOG-262/JGOG-3016)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 6",
          "unit": "AUC",
          "schedule": "D1, every 21 days x 6 cycles"
        },
        {
          "name": "Paclitaxel",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, every 21 days x 6 cycles"
        }
      ]
    },
    "Docetaxel-Carboplatin": {
      "name": "Docetaxel + Carboplatin (SCOTROC)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Docetaxel",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles"
        },
        {
          "name": "Carboplatin",
          "dose": "AUC 5",
          "unit": "AUC",
          "schedule": "D1, every 21 days x 6 cycles"
        }
      ]
    },
    "Bevacizumab-Carboplatin-Paclitaxel": {
      "name": "Carboplatin + Paclitaxel + Bevacizumab (GOG-218/ICON7)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 6",
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
          "name": "Bevacizumab",
          "dose": 15,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days x 6 cycles, then maintenance"
        }
      ]
    },
    "DUO-O": {
      "name": "Durvalumab + Olaparib + Bevacizumab + Carboplatin + Paclitaxel (DUO-O) (HRD-positive, non-BRCA)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Durvalumab",
          "dose": 1120,
          "unit": "mg",
          "schedule": "D1, every 21 days x 6 cycles"
        },
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
          "name": "Bevacizumab",
          "dose": 15,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days x 6 cycles, then maintenance"
        },
        {
          "name": "Olaparib",
          "dose": 300,
          "unit": "mg",
          "schedule": "PO twice daily from cycle 1, then maintenance"
        }
      ]
    },
    "IP-Cisplatin-Paclitaxel": {
      "name": "IP Cisplatin + IV/IP Paclitaxel (GOG-172) (intraperitoneal)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Paclitaxel (IV)",
          "dose": 135,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles"
        },
        {
          "name": "Cisplatin (IP)",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D2, every 21 days x 6 cycles"
        },
        {
          "name": "Paclitaxel (IP)",
          "dose": 60,
          "unit": "mg/m²",
          "schedule": "D8, every 21 days x 6 cycles"
        }
      ]
    },
    "Carboplatin-Cyclophosphamide": {
      "name": "Carboplatin + Cyclophosphamide (elderly/frail)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 5",
          "unit": "AUC",
          "schedule": "D1, every 28 days x 6 cycles"
        },
        {
          "name": "Cyclophosphamide",
          "dose": 600,
          "unit": "mg/m²",
          "schedule": "D1, every 28 days x 6 cycles"
        }
      ]
    },
    "BEP": {
      "name": "BEP (bleomycin + etoposide + cisplatin) (ovarian germ cell tumors)",
      "cycles": 3,
      "drugs": [
        {
          "name": "Bleomycin",
          "dose": 30,
          "unit": "units",
          "schedule": "D1, D8, D15, every 21 days x 3 cycles"
        },
        {
          "name": "Etoposide",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1-D5, every 21 days x 3 cycles"
        },
        {
          "name": "Cisplatin",
          "dose": 20,
          "unit": "mg/m²",
          "schedule": "D1-D5, every 21 days x 3 cycles"
        }
      ]
    }
  },
  "maintenance": {
    "Olaparib-Bevacizumab": {
      "name": "Olaparib + Bevacizumab (PAOLA-1) (PARP inhibitor + VEGF inhibitor) (HRD-positive)",
      "cycles": 24,
      "drugs": [
        {
          "name": "Olaparib",
          "dose": 300,
          "unit": "mg",
          "schedule": "PO twice daily, up to 2 years"
        },
        {
          "name": "Bevacizumab",
          "dose": 15,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days, up to 15 months"
        }
      ]
    },
    "Niraparib-Bevacizumab": {
      "name": "Niraparib + Bevacizumab (PARP inhibitor + VEGF inhibitor) (all-comers; HRP: minimal benefit)",
      "cycles": 36,
      "drugs": [
        {
          "name": "Niraparib",
          "dose": 300,
          "unit": "mg",
          "schedule": "PO once daily, up to 3 years (200mg if <77kg and/or platelet <150,000)"
        },
        {
          "name": "Bevacizumab",
          "dose": 15,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days, up to 15 months"
        }
      ]
    },
    "Olaparib": {
      "name": "Olaparib (SOLO1/SOLO2) (PARP inhibitor) (BRCA-mutated)",
      "cycles": 24,
      "drugs": [
        {
          "name": "Olaparib",
          "dose": 300,
          "unit": "mg",
          "schedule": "PO twice daily, up to 2 years"
        }
      ]
    },
    "Niraparib": {
      "name": "Niraparib (PRIMA) (PARP inhibitor) (all-comers; HRP: minimal benefit)",
      "cycles": 36,
      "drugs": [
        {
          "name": "Niraparib",
          "dose": 300,
          "unit": "mg",
          "schedule": "PO once daily, up to 36 months (200mg if <77kg and/or platelet <150,000)"
        }
      ]
    },
    "Rucaparib": {
      "name": "Rucaparib (ARIEL3) (PARP inhibitor) (all-comers; HRP: minimal benefit)",
      "cycles": 24,
      "drugs": [
        {
          "name": "Rucaparib",
          "dose": 600,
          "unit": "mg",
          "schedule": "PO twice daily, up to 24 months (post-primary) or until progression (post-recurrence)"
        }
      ]
    },
    "Bevacizumab": {
      "name": "Bevacizumab (GOG-218) (VEGF inhibitor)",
      "cycles": 22,
      "drugs": [
        {
          "name": "Bevacizumab",
          "dose": 15,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days, up to 15 months after chemo"
        }
      ]
    }
  },
  "recurrent_progressive": {
    "Carboplatin-Paclitaxel": {
      "name": "Carboplatin + Paclitaxel (platinum-sensitive recurrent)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 5-6",
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
    "Carboplatin-PLD": {
      "name": "Carboplatin + Pegylated Liposomal Doxorubicin (CALYPSO) (platinum-sensitive recurrent)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 5",
          "unit": "AUC",
          "schedule": "D1, every 28 days"
        },
        {
          "name": "Pegylated Liposomal Doxorubicin",
          "dose": 30,
          "unit": "mg/m²",
          "schedule": "D1, every 28 days"
        }
      ]
    },
    "Carboplatin-Gemcitabine": {
      "name": "Carboplatin + Gemcitabine (AGO-OVAR-2.5) (platinum-sensitive recurrent)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 4",
          "unit": "AUC",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        }
      ]
    },
    "Carboplatin-Gemcitabine-Bevacizumab": {
      "name": "Carboplatin + Gemcitabine + Bevacizumab (OCEANS) (platinum-sensitive recurrent)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Carboplatin",
          "dose": "AUC 4",
          "unit": "AUC",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Gemcitabine",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days"
        },
        {
          "name": "Bevacizumab",
          "dose": 15,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days, then maintenance until progression"
        }
      ]
    },
    "Carboplatin-Docetaxel": {
      "name": "Carboplatin + Docetaxel (platinum-sensitive recurrent)",
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
    "Gemcitabine-Cisplatin": {
      "name": "Gemcitabine + Cisplatin (platinum-sensitive recurrent)",
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
    "Mirvetuximab-Soravtansine": {
      "name": "Mirvetuximab soravtansine (MIRASOL) (FRα-ADC) (FRα-positive)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Mirvetuximab Soravtansine",
          "dose": 6,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days (folate receptor α positive)"
        }
      ]
    },
    "Pembrolizumab-Paclitaxel": {
      "name": "Pembrolizumab + Paclitaxel (KEYNOTE-B96) (PD-L1 CPS≥1, platinum-resistant)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Paclitaxel",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, every 28 days"
        }
      ]
    },
    "Pembrolizumab-Paclitaxel-Bevacizumab": {
      "name": "Pembrolizumab + Paclitaxel + Bevacizumab (KEYNOTE-B96) (PD-L1 CPS≥1, platinum-resistant)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        },
        {
          "name": "Paclitaxel",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, every 28 days"
        },
        {
          "name": "Bevacizumab",
          "dose": 15,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Paclitaxel-Bevacizumab": {
      "name": "Paclitaxel + Bevacizumab (AURELIA) (platinum-resistant)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Paclitaxel",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, every 28 days"
        },
        {
          "name": "Bevacizumab",
          "dose": 10,
          "unit": "mg/kg",
          "schedule": "D1, D15, every 28 days"
        }
      ]
    },
    "PLD": {
      "name": "Pegylated Liposomal Doxorubicin (platinum-resistant)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Pegylated Liposomal Doxorubicin",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "D1, every 28 days"
        }
      ]
    },
    "Topotecan": {
      "name": "Topotecan (topoisomerase I inhibitor) (platinum-resistant)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Topotecan",
          "dose": 1.5,
          "unit": "mg/m²",
          "schedule": "D1-D5, every 21 days"
        }
      ]
    },
    "Gemcitabine": {
      "name": "Gemcitabine (platinum-resistant)",
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
    "Docetaxel": {
      "name": "Docetaxel (platinum-resistant)",
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
    "Etoposide": {
      "name": "Etoposide oral (platinum-resistant)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Etoposide",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "PO once daily D1-D21, every 28 days"
        }
      ]
    },
    "Pemetrexed": {
      "name": "Pemetrexed (platinum-resistant)",
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
    "Altretamine": {
      "name": "Altretamine (platinum-resistant/refractory)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Altretamine",
          "dose": 260,
          "unit": "mg/m²",
          "schedule": "PO once daily D1-D14, every 28 days"
        }
      ]
    },
    "Avutometinib-Defactinib": {
      "name": "Avutometinib + Defactinib (RAMP 201) (KRAS-mutated recurrent LGSOC)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Avutometinib",
          "dose": 3.2,
          "unit": "mg",
          "schedule": "PO twice weekly (Mon/Thu), 3 weeks on / 1 week off"
        },
        {
          "name": "Defactinib",
          "dose": 200,
          "unit": "mg",
          "schedule": "PO twice daily, 3 weeks on / 1 week off"
        }
      ]
    }
  }
};
