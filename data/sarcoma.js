window.protocolData = window.protocolData || {};
window.protocolData.sarcoma = {
  "neoadjuvant": {
    "Doxorubicin-Ifosfamide": {
      "name": "Doxorubicin + Ifosfamide + Mesna (AI)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Doxorubicin",
          "dose": 25,
          "unit": "mg/m²",
          "schedule": "D1-D3 (CI), every 21 days x 3-6 cycles"
        },
        {
          "name": "Ifosfamide",
          "dose": 2500,
          "unit": "mg/m²",
          "schedule": "D1-D3, every 21 days x 3-6 cycles"
        },
        {
          "name": "Mesna",
          "dose": 2500,
          "unit": "mg/m²",
          "schedule": "equal to ifosfamide dose, D1-D3, every 21 days x 3-6 cycles"
        }
      ]
    },
    "Doxorubicin": {
      "name": "Doxorubicin monotherapy",
      "cycles": 6,
      "drugs": [
        {
          "name": "Doxorubicin",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles"
        }
      ]
    },
    "MAID": {
      "name": "Doxorubicin + Ifosfamide + Dacarbazine (MAID)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Doxorubicin",
          "dose": 20,
          "unit": "mg/m²",
          "schedule": "D1-D3 (CI), every 21 days x 6 cycles"
        },
        {
          "name": "Ifosfamide",
          "dose": 2500,
          "unit": "mg/m²",
          "schedule": "D1-D3 (CI), every 21 days x 6 cycles"
        },
        {
          "name": "Dacarbazine (DTIC)",
          "dose": 300,
          "unit": "mg/m²",
          "schedule": "D1-D3 (CI), every 21 days x 6 cycles"
        },
        {
          "name": "Mesna",
          "dose": 2500,
          "unit": "mg/m²",
          "schedule": "D1-D4 (CI), every 21 days x 6 cycles"
        }
      ]
    }
  },
  "adjuvant": {
    "Doxorubicin-Ifosfamide": {
      "name": "Doxorubicin + Ifosfamide + Mesna (AI)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Doxorubicin",
          "dose": 25,
          "unit": "mg/m²",
          "schedule": "D1-D3 (CI), every 21 days x 3-6 cycles"
        },
        {
          "name": "Ifosfamide",
          "dose": 2500,
          "unit": "mg/m²",
          "schedule": "D1-D3, every 21 days x 3-6 cycles"
        },
        {
          "name": "Mesna",
          "dose": 2500,
          "unit": "mg/m²",
          "schedule": "equal to ifosfamide dose, D1-D3, every 21 days x 3-6 cycles"
        }
      ]
    },
    "Doxorubicin": {
      "name": "Doxorubicin monotherapy",
      "cycles": 6,
      "drugs": [
        {
          "name": "Doxorubicin",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles"
        }
      ]
    },
    "MAID": {
      "name": "Doxorubicin + Ifosfamide + Dacarbazine (MAID)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Doxorubicin",
          "dose": 20,
          "unit": "mg/m²",
          "schedule": "D1-D3 (CI), every 21 days x 6 cycles"
        },
        {
          "name": "Ifosfamide",
          "dose": 2500,
          "unit": "mg/m²",
          "schedule": "D1-D3 (CI), every 21 days x 6 cycles"
        },
        {
          "name": "Dacarbazine (DTIC)",
          "dose": 300,
          "unit": "mg/m²",
          "schedule": "D1-D3 (CI), every 21 days x 6 cycles"
        },
        {
          "name": "Mesna",
          "dose": 2500,
          "unit": "mg/m²",
          "schedule": "D1-D4 (CI), every 21 days x 6 cycles"
        }
      ]
    }
  },
  "metastatic": {
    "Doxorubicin": {
      "name": "Doxorubicin monotherapy",
      "cycles": 6,
      "drugs": [
        {
          "name": "Doxorubicin",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles (max cumulative 450-550 mg/m²)"
        }
      ]
    },
    "Doxorubicin-Ifosfamide": {
      "name": "Doxorubicin + Ifosfamide + Mesna (AI) (EORTC 62012)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Doxorubicin",
          "dose": 25,
          "unit": "mg/m²",
          "schedule": "D1-D3 (CI), every 21 days x 6 cycles"
        },
        {
          "name": "Ifosfamide",
          "dose": 2500,
          "unit": "mg/m²",
          "schedule": "D1-D3, every 21 days x 6 cycles"
        },
        {
          "name": "Mesna",
          "dose": 2500,
          "unit": "mg/m²",
          "schedule": "equal to ifosfamide dose, D1-D3, every 21 days x 6 cycles"
        }
      ]
    },
    "Doxorubicin-Dacarbazine": {
      "name": "Doxorubicin + Dacarbazine (AD) (4-day CIVI) (LMS preferred)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Doxorubicin",
          "dose": 15,
          "unit": "mg/m²",
          "schedule": "D1-D4 (CI), every 21 days x 6 cycles (total 60 mg/m²/cycle)"
        },
        {
          "name": "Dacarbazine (DTIC)",
          "dose": 187.5,
          "unit": "mg/m²",
          "schedule": "D1-D4 (CI), every 21 days x 6 cycles (total 750 mg/m²/cycle)"
        }
      ]
    },
    "Doxorubicin-Trabectedin": {
      "name": "Doxorubicin + Trabectedin (LMS-04) (LMS first-line)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Doxorubicin",
          "dose": 60,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles"
        },
        {
          "name": "Trabectedin",
          "dose": 1.1,
          "unit": "mg/m²",
          "schedule": "D1 (24h infusion), every 21 days x 6 cycles, then 1.5 mg/m² maintenance"
        }
      ]
    },
    "Gemcitabine-Docetaxel": {
      "name": "Gemcitabine + Docetaxel (GemDoc) (LMS/UPS)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 900,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days x 6 cycles"
        },
        {
          "name": "Docetaxel",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D8, every 21 days x 6 cycles"
        }
      ]
    },
    "MAID": {
      "name": "Doxorubicin + Ifosfamide + Dacarbazine (MAID)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Doxorubicin",
          "dose": 20,
          "unit": "mg/m²",
          "schedule": "D1-D3 (CI), every 21 days x 6 cycles"
        },
        {
          "name": "Ifosfamide",
          "dose": 2500,
          "unit": "mg/m²",
          "schedule": "D1-D3 (CI), every 21 days x 6 cycles"
        },
        {
          "name": "Dacarbazine (DTIC)",
          "dose": 300,
          "unit": "mg/m²",
          "schedule": "D1-D3 (CI), every 21 days x 6 cycles"
        },
        {
          "name": "Mesna",
          "dose": 2500,
          "unit": "mg/m²",
          "schedule": "D1-D4 (CI), every 21 days x 6 cycles"
        }
      ]
    },
    "Ifosfamide-Epirubicin": {
      "name": "Ifosfamide + Epirubicin (ISG-STS 1001)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Ifosfamide",
          "dose": 3000,
          "unit": "mg/m²",
          "schedule": "D1-D3, every 21 days x 6 cycles"
        },
        {
          "name": "Epirubicin",
          "dose": 60,
          "unit": "mg/m²",
          "schedule": "D1-D2, every 21 days x 6 cycles (total 120 mg/m²/cycle)"
        },
        {
          "name": "Mesna",
          "dose": 3000,
          "unit": "mg/m²",
          "schedule": "equal to ifosfamide dose, D1-D3, every 21 days x 6 cycles"
        }
      ]
    },
    "Epirubicin": {
      "name": "Epirubicin monotherapy",
      "cycles": 6,
      "drugs": [
        {
          "name": "Epirubicin",
          "dose": 150,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles (max cumulative ~900 mg/m²)"
        }
      ]
    },
    "Trabectedin": {
      "name": "Trabectedin (LPS/LMS)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Trabectedin",
          "dose": 1.5,
          "unit": "mg/m²",
          "schedule": "D1 (24h infusion via central line), every 21 days, until progression"
        }
      ]
    },
    "Eribulin": {
      "name": "Eribulin (liposarcoma)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Eribulin",
          "dose": 1.4,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days, until progression"
        }
      ]
    },
    "Ifosfamide-HighDose": {
      "name": "Ifosfamide high-dose + Mesna (synovial sarcoma/DDLPS)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Ifosfamide",
          "dose": 2000,
          "unit": "mg/m²",
          "schedule": "D1-D7 (CI via ambulatory pump), every 28 days x 4-6 cycles (total 14 g/m²/cycle)"
        },
        {
          "name": "Mesna",
          "dose": 2000,
          "unit": "mg/m²",
          "schedule": "equal to ifosfamide dose, D1-D8 (extend 24h beyond ifo), every 28 days x 4-6 cycles"
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
          "schedule": "D1, D8, every 21 days x 6 cycles"
        }
      ]
    },
    "Dacarbazine": {
      "name": "Dacarbazine (DTIC) monotherapy",
      "cycles": 6,
      "drugs": [
        {
          "name": "Dacarbazine (DTIC)",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles"
        }
      ]
    },
    "Gemcitabine-Dacarbazine": {
      "name": "Gemcitabine + Dacarbazine (LMS)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 1800,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days x 6 cycles"
        },
        {
          "name": "Dacarbazine (DTIC)",
          "dose": 500,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days x 6 cycles"
        }
      ]
    },
    "Doxorubicin-Liposomal": {
      "name": "Pegylated liposomal doxorubicin",
      "cycles": 6,
      "drugs": [
        {
          "name": "Doxorubicin liposomal",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1, every 28 days x 6 cycles"
        }
      ]
    },
    "Vinorelbine": {
      "name": "Vinorelbine monotherapy",
      "cycles": 6,
      "drugs": [
        {
          "name": "Vinorelbine",
          "dose": 25,
          "unit": "mg/m²",
          "schedule": "weekly x 6 cycles (21-day cycles)"
        }
      ]
    },
    "Docetaxel": {
      "name": "Docetaxel monotherapy",
      "cycles": 6,
      "drugs": [
        {
          "name": "Docetaxel",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles"
        }
      ]
    },
    "Gemcitabine-Vinorelbine": {
      "name": "Gemcitabine + Vinorelbine",
      "cycles": 6,
      "drugs": [
        {
          "name": "Gemcitabine",
          "dose": 800,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days x 6 cycles"
        },
        {
          "name": "Vinorelbine",
          "dose": 25,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days x 6 cycles"
        }
      ]
    },
    "Pazopanib": {
      "name": "Pazopanib (PALETTE) (non-adipocytic STS)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Pazopanib",
          "dose": 800,
          "unit": "mg",
          "schedule": "PO daily on empty stomach, continuously"
        }
      ]
    },
    "Paclitaxel-Angio": {
      "name": "Paclitaxel weekly (angiosarcoma)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Paclitaxel",
          "dose": 80,
          "unit": "mg/m²",
          "schedule": "D1, D8, D15, every 28 days x 6 cycles"
        }
      ]
    },
    "Carboplatin-Paclitaxel-Bevacizumab": {
      "name": "Paclitaxel + Carboplatin + Bevacizumab (angiosarcoma)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Paclitaxel",
          "dose": 175,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles"
        },
        {
          "name": "Carboplatin",
          "dose": "AUC 6",
          "unit": "AUC",
          "schedule": "D1, every 21 days x 6 cycles"
        },
        {
          "name": "Bevacizumab",
          "dose": 15,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days x 6 cycles"
        }
      ]
    },
    "Temozolomide-Bevacizumab": {
      "name": "Temozolomide + Bevacizumab (SFT)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Temozolomide",
          "dose": 150,
          "unit": "mg/m²",
          "schedule": "PO D1-D7 and D15-D21, every 28 days"
        },
        {
          "name": "Bevacizumab",
          "dose": 5,
          "unit": "mg/kg",
          "schedule": "D8, D22, every 28 days"
        }
      ]
    },
    "Sunitinib-SFT": {
      "name": "Sunitinib (SFT)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Sunitinib",
          "dose": 37.5,
          "unit": "mg",
          "schedule": "PO daily, continuously"
        }
      ]
    },
    "Tazemetostat": {
      "name": "Tazemetostat (EZH2 inhibitor) (epithelioid sarcoma, INI1-loss)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Tazemetostat",
          "dose": 800,
          "unit": "mg",
          "schedule": "PO twice daily, continuously"
        }
      ]
    },
    "Nirogacestat": {
      "name": "Nirogacestat (DeFi) (gamma-secretase inhibitor) (desmoid tumors) (NCCN Preferred)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Nirogacestat",
          "dose": 150,
          "unit": "mg",
          "schedule": "PO twice daily, continuously"
        }
      ]
    },
    "Sorafenib-Desmoid": {
      "name": "Sorafenib (Alliance A091105) (desmoid tumors)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Sorafenib",
          "dose": 400,
          "unit": "mg",
          "schedule": "PO once daily, continuously"
        }
      ]
    },
    "Methotrexate-Vinblastine": {
      "name": "Methotrexate + Vinblastine (desmoid tumors)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Methotrexate",
          "dose": 30,
          "unit": "mg/m²",
          "schedule": "weekly, up to 1 year"
        },
        {
          "name": "Vinblastine",
          "dose": 6,
          "unit": "mg/m²",
          "schedule": "weekly (max 10mg), up to 1 year"
        }
      ]
    },
    "Pexidartinib": {
      "name": "Pexidartinib (ENLIVEN) (CSF1R inhibitor) (tenosynovial giant cell tumor)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Pexidartinib",
          "dose": 250,
          "unit": "mg",
          "schedule": "PO twice daily with low-fat meal (125mg capsules x 2), continuously"
        }
      ]
    },
    "Imatinib-DFSP": {
      "name": "Imatinib (PDGFR inhibitor) (dermatofibrosarcoma protuberans)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Imatinib",
          "dose": 400,
          "unit": "mg",
          "schedule": "PO daily, continuously (escalate to 800mg if needed)"
        }
      ]
    },
    "Sorafenib-EHE": {
      "name": "Sorafenib (epithelioid hemangioendothelioma)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Sorafenib",
          "dose": 400,
          "unit": "mg",
          "schedule": "PO twice daily, continuously"
        }
      ]
    },
    "Temozolomide": {
      "name": "Temozolomide (extraskeletal myxoid chondrosarcoma)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Temozolomide",
          "dose": 150,
          "unit": "mg/m²",
          "schedule": "PO D1-D5, every 28 days x 6 cycles"
        }
      ]
    },
    "Afamitresgene": {
      "name": "Afamitresgene autoleucel (Tecelra) (TCR T-cell therapy) (synovial sarcoma, HLA-A*02+/MAGE-A4+)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Fludarabine",
          "dose": 30,
          "unit": "mg/m²",
          "schedule": "D-7 to D-4 (4 days, lymphodepletion)"
        },
        {
          "name": "Cyclophosphamide",
          "dose": 600,
          "unit": "mg/m²",
          "schedule": "D-7 to D-5 (3 days, lymphodepletion)"
        },
        {
          "name": "Afamitresgene autoleucel",
          "dose": "1-10 x 10^9",
          "unit": "TCR+ T cells",
          "schedule": "single infusion on day 0"
        }
      ]
    },
    "Atezolizumab": {
      "name": "Atezolizumab (ASPS) (PD-L1 inhibitor) (alveolar soft part sarcoma)",
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
    "Pembrolizumab": {
      "name": "Pembrolizumab (SARC028) (UPS/DDLPS/angiosarcoma/MSI-H/TMB-H)",
      "cycles": 35,
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days (or 400mg q6weeks)"
        }
      ]
    },
    "Nivolumab-Ipilimumab": {
      "name": "Nivolumab + Ipilimumab (angiosarcoma)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Nivolumab",
          "dose": 3,
          "unit": "mg/kg",
          "schedule": "D1, every 14 days"
        },
        {
          "name": "Ipilimumab",
          "dose": 1,
          "unit": "mg/kg",
          "schedule": "D1, every 6 weeks"
        }
      ]
    },
    "Sirolimus": {
      "name": "Sirolimus (mTOR inhibitor) (PEComa)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Sirolimus",
          "dose": 2,
          "unit": "mg",
          "schedule": "PO daily, continuously"
        }
      ]
    },
    "Temsirolimus": {
      "name": "Temsirolimus (mTOR inhibitor) (PEComa)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Temsirolimus",
          "dose": 25,
          "unit": "mg",
          "schedule": "IV weekly"
        }
      ]
    },
    "Everolimus": {
      "name": "Everolimus (mTOR inhibitor) (PEComa)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Everolimus",
          "dose": 10,
          "unit": "mg",
          "schedule": "PO daily, continuously"
        }
      ]
    },
    "Larotrectinib": {
      "name": "Larotrectinib (NTRK fusion inhibitor) (NTRK fusion-positive)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Larotrectinib",
          "dose": 100,
          "unit": "mg",
          "schedule": "PO twice daily, continuously"
        }
      ]
    },
    "Entrectinib": {
      "name": "Entrectinib (NTRK fusion inhibitor) (NTRK fusion-positive)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Entrectinib",
          "dose": 600,
          "unit": "mg",
          "schedule": "PO daily, continuously"
        }
      ]
    },
    "Repotrectinib": {
      "name": "Repotrectinib (NTRK fusion inhibitor) (NTRK fusion-positive)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Repotrectinib",
          "dose": 160,
          "unit": "mg",
          "schedule": "PO daily, continuously"
        }
      ]
    },
    "Crizotinib": {
      "name": "Crizotinib (ALK inhibitor) (inflammatory myofibroblastic tumor)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Crizotinib",
          "dose": 250,
          "unit": "mg",
          "schedule": "PO twice daily, continuously"
        }
      ]
    },
    "VAC": {
      "name": "Vincristine + Dactinomycin + Cyclophosphamide (VAC) (rhabdomyosarcoma)",
      "cycles": 14,
      "drugs": [
        {
          "name": "Vincristine",
          "dose": 1.5,
          "unit": "mg/m²",
          "schedule": "D1, weekly x 42 weeks (max 2mg) (per COG protocol)"
        },
        {
          "name": "Dactinomycin",
          "dose": 0.045,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days x 14 cycles (max 2.5mg) (per COG protocol)"
        },
        {
          "name": "Cyclophosphamide",
          "dose": 1200,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 14 cycles (per COG protocol)"
        },
        {
          "name": "Mesna",
          "dose": 1200,
          "unit": "mg/m²",
          "schedule": "equal to cyclophosphamide dose, D1, every 21 days x 14 cycles"
        }
      ]
    },
    "Cyclophosphamide-Topotecan": {
      "name": "Cyclophosphamide + Topotecan (rhabdomyosarcoma)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cyclophosphamide",
          "dose": 250,
          "unit": "mg/m²",
          "schedule": "D1-D5, every 21 days x 6 cycles"
        },
        {
          "name": "Topotecan",
          "dose": 0.75,
          "unit": "mg/m²",
          "schedule": "D1-D5, every 21 days x 6 cycles"
        }
      ]
    },
    "VIT": {
      "name": "Vincristine + Irinotecan + Temozolomide (VIT) (rhabdomyosarcoma)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Vincristine",
          "dose": 1.5,
          "unit": "mg/m²",
          "schedule": "D1, D8, every 21 days x 6 cycles (max 2mg)"
        },
        {
          "name": "Irinotecan",
          "dose": 50,
          "unit": "mg/m²",
          "schedule": "D1-D5, every 21 days x 6 cycles"
        },
        {
          "name": "Temozolomide",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1-D5, every 21 days x 6 cycles"
        }
      ]
    }
  }
};
