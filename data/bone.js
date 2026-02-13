window.protocolData = window.protocolData || {};
window.protocolData.bone = {
  "osteosarcoma": {
    "neoadjuvant": {
      "MAP": {
        "name": "Methotrexate + Doxorubicin + Cisplatin (MAP) (EURAMOS-1) (NCCN Preferred)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Cisplatin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1-D2, every 35 days (cycles 1-4)"
          },
          {
            "name": "Doxorubicin",
            "dose": 37.5,
            "unit": "mg/m²",
            "schedule": "D1-D2, every 35 days (cycles 1-4)"
          },
          {
            "name": "Methotrexate (HD)",
            "dose": 12000,
            "unit": "mg/m²",
            "schedule": "D22, D29, IV over 4 hours (cycles 1-4); D15, D22 (cycles 5-6)"
          },
          {
            "name": "Leucovorin",
            "dose": 15,
            "unit": "mg/m²",
            "schedule": "Every 6 hours starting 24h after MTX, until serum MTX <0.1 µmol/L"
          }
        ]
      },
      "AP": {
        "name": "Doxorubicin + Cisplatin (AP) (NCCN Category 1)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Doxorubicin",
            "dose": 37.5,
            "unit": "mg/m²",
            "schedule": "D1-D2, every 21 days"
          },
          {
            "name": "Cisplatin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1-D2, every 21 days"
          }
        ]
      },
      "IAP": {
        "name": "Ifosfamide + Doxorubicin + Cisplatin (IAP)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Ifosfamide",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days"
          },
          {
            "name": "Mesna",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "Equal to ifosfamide dose, D1-D5 (divided doses or continuous infusion)"
          },
          {
            "name": "Doxorubicin",
            "dose": 37.5,
            "unit": "mg/m²",
            "schedule": "D1-D2, every 21 days"
          },
          {
            "name": "Cisplatin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1-D2, every 21 days"
          }
        ]
      },
      "HD-MTX": {
        "name": "High-Dose Methotrexate (HD-MTX)",
        "cycles": 8,
        "drugs": [
          {
            "name": "Methotrexate (HD)",
            "dose": 12000,
            "unit": "mg/m²",
            "schedule": "IV over 4 hours, every 14 days"
          },
          {
            "name": "Leucovorin",
            "dose": 15,
            "unit": "mg/m²",
            "schedule": "Every 6 hours starting 24h after MTX, until serum MTX <0.1 µmol/L"
          }
        ]
      }
    },
    "adjuvant": {
      "MAP": {
        "name": "Methotrexate + Doxorubicin + Cisplatin (MAP) (EURAMOS-1) (NCCN Preferred)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Cisplatin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1-D2, every 35 days (cycles 1-2); then DA only cycles 3-4"
          },
          {
            "name": "Doxorubicin",
            "dose": 37.5,
            "unit": "mg/m²",
            "schedule": "D1-D2, every 35 days (cycles 1-2); D1-D2 cycles 3-4"
          },
          {
            "name": "Methotrexate (HD)",
            "dose": 12000,
            "unit": "mg/m²",
            "schedule": "D22, D29 each cycle, IV over 4 hours"
          },
          {
            "name": "Leucovorin",
            "dose": 15,
            "unit": "mg/m²",
            "schedule": "Every 6 hours starting 24h after MTX, until serum MTX <0.1 µmol/L"
          }
        ]
      },
      "AP": {
        "name": "Doxorubicin + Cisplatin (AP) (NCCN Category 1)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Doxorubicin",
            "dose": 37.5,
            "unit": "mg/m²",
            "schedule": "D1-D2, every 21 days"
          },
          {
            "name": "Cisplatin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1-D2, every 21 days"
          }
        ]
      },
      "IAP": {
        "name": "Ifosfamide + Doxorubicin + Cisplatin (IAP)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Ifosfamide",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days"
          },
          {
            "name": "Mesna",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "Equal to ifosfamide dose, D1-D5 (divided doses or continuous infusion)"
          },
          {
            "name": "Doxorubicin",
            "dose": 37.5,
            "unit": "mg/m²",
            "schedule": "D1-D2, every 21 days"
          },
          {
            "name": "Cisplatin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1-D2, every 21 days"
          }
        ]
      },
      "HD-MTX": {
        "name": "High-Dose Methotrexate (HD-MTX)",
        "cycles": 8,
        "drugs": [
          {
            "name": "Methotrexate (HD)",
            "dose": 12000,
            "unit": "mg/m²",
            "schedule": "IV over 4 hours, every 14 days"
          },
          {
            "name": "Leucovorin",
            "dose": 15,
            "unit": "mg/m²",
            "schedule": "Every 6 hours starting 24h after MTX, until serum MTX <0.1 µmol/L"
          }
        ]
      }
    },
    "relapsed_refractory": {
      "Ifosfamide-Etoposide": {
        "name": "Ifosfamide + Etoposide (IE) (NCCN Recommended)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Ifosfamide",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days"
          },
          {
            "name": "Mesna",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "Equal to ifosfamide dose, D1-D5 (divided doses or continuous infusion)"
          },
          {
            "name": "Etoposide",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days"
          }
        ]
      },
      "Gemcitabine-Docetaxel": {
        "name": "Gemcitabine + Docetaxel",
        "cycles": 6,
        "drugs": [
          {
            "name": "Gemcitabine",
            "dose": 675,
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
      "Regorafenib": {
        "name": "Regorafenib (SARCOME-13/OS2016) (NCCN Category 1)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Regorafenib",
            "dose": 160,
            "unit": "mg",
            "schedule": "PO once daily D1-D21, every 28 days"
          }
        ]
      },
      "Sorafenib": {
        "name": "Sorafenib",
        "cycles": 12,
        "drugs": [
          {
            "name": "Sorafenib",
            "dose": 400,
            "unit": "mg",
            "schedule": "PO twice daily continuously"
          }
        ]
      },
      "Cabozantinib": {
        "name": "Cabozantinib (CABONE) (Investigational)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Cabozantinib",
            "dose": 60,
            "unit": "mg",
            "schedule": "PO once daily continuously"
          }
        ]
      },
      "HD-Ifosfamide": {
        "name": "High-Dose Ifosfamide (HD-IFO)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Ifosfamide (HD)",
            "dose": 3000,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days (total 15 g/m² per cycle)"
          },
          {
            "name": "Mesna",
            "dose": 3000,
            "unit": "mg/m²",
            "schedule": "Equal to ifosfamide dose, D1-D5 (divided doses or continuous infusion)"
          }
        ]
      },
      "Ifosfamide-Carboplatin-Etoposide": {
        "name": "Ifosfamide + Carboplatin + Etoposide (ICE)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Ifosfamide",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5",
            "unit": "AUC",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Etoposide",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days"
          },
          {
            "name": "Mesna",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "Equal to ifosfamide dose, D1-D5 (divided doses or continuous infusion)"
          }
        ]
      },
      "HDMTX-Etoposide-Ifosfamide": {
        "name": "High-Dose Methotrexate + Etoposide + Ifosfamide",
        "cycles": 6,
        "drugs": [
          {
            "name": "Methotrexate (HD)",
            "dose": 12000,
            "unit": "mg/m²",
            "schedule": "D1, IV over 4 hours, every 21 days"
          },
          {
            "name": "Etoposide",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days"
          },
          {
            "name": "Ifosfamide",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days"
          },
          {
            "name": "Leucovorin",
            "dose": 15,
            "unit": "mg/m²",
            "schedule": "Every 6 hours starting 24h after MTX, until serum MTX <0.1 µmol/L"
          },
          {
            "name": "Mesna",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "Equal to ifosfamide dose, D1-D5 (divided doses or continuous infusion)"
          }
        ]
      }
    }
  },
  "chordoma": {
    "relapsed_refractory": {
      "Imatinib": {
        "name": "Imatinib",
        "cycles": 12,
        "drugs": [
          {
            "name": "Imatinib",
            "dose": 800,
            "unit": "mg",
            "schedule": "PO once daily continuously"
          }
        ]
      },
      "Dasatinib": {
        "name": "Dasatinib",
        "cycles": 12,
        "drugs": [
          {
            "name": "Dasatinib",
            "dose": 100,
            "unit": "mg",
            "schedule": "PO once daily continuously"
          }
        ]
      },
      "Sunitinib": {
        "name": "Sunitinib",
        "cycles": 12,
        "drugs": [
          {
            "name": "Sunitinib",
            "dose": 50,
            "unit": "mg",
            "schedule": "PO once daily D1-D28, every 42 days (4 weeks on, 2 weeks off)"
          }
        ]
      },
      "Imatinib-Cisplatin": {
        "name": "Imatinib + Cisplatin",
        "cycles": 6,
        "drugs": [
          {
            "name": "Imatinib",
            "dose": 400,
            "unit": "mg",
            "schedule": "PO once daily continuously"
          },
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Imatinib-Sirolimus": {
        "name": "Imatinib + Sirolimus",
        "cycles": 12,
        "drugs": [
          {
            "name": "Imatinib",
            "dose": 400,
            "unit": "mg",
            "schedule": "PO once daily continuously"
          },
          {
            "name": "Sirolimus",
            "dose": 2,
            "unit": "mg",
            "schedule": "PO once daily continuously"
          }
        ]
      },
      "Erlotinib": {
        "name": "Erlotinib",
        "cycles": 12,
        "drugs": [
          {
            "name": "Erlotinib",
            "dose": 150,
            "unit": "mg",
            "schedule": "PO once daily continuously"
          }
        ]
      },
      "Lapatinib": {
        "name": "Lapatinib (EGFR positive)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Lapatinib",
            "dose": 1500,
            "unit": "mg",
            "schedule": "PO once daily continuously"
          }
        ]
      },
      "Sorafenib": {
        "name": "Sorafenib",
        "cycles": 12,
        "drugs": [
          {
            "name": "Sorafenib",
            "dose": 400,
            "unit": "mg",
            "schedule": "PO twice daily continuously"
          }
        ]
      }
    }
  },
  "ewings_sarcoma": {
    "neoadjuvant": {
      "VDC-IE": {
        "name": "Vincristine + Doxorubicin + Cyclophosphamide / Ifosfamide + Etoposide (VDC/IE) (AEWS0031) (NCCN Preferred)",
        "cycles": 14,
        "drugs": [
          {
            "name": "Vincristine",
            "dose": 2,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days (VDC cycles, max 2mg)"
          },
          {
            "name": "Doxorubicin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days (VDC cycles; omit after cumulative 375 mg/m²)"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 1200,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days (VDC cycles)"
          },
          {
            "name": "Mesna (for cyclophosphamide)",
            "dose": 1200,
            "unit": "mg/m²",
            "schedule": "Equal to cyclophosphamide dose, D1 (VDC cycles)"
          },
          {
            "name": "Ifosfamide",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 14 days (IE cycles, alternating with VDC)"
          },
          {
            "name": "Etoposide",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 14 days (IE cycles, alternating with VDC)"
          },
          {
            "name": "Mesna (for ifosfamide)",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "Equal to ifosfamide dose, D1-D5 (IE cycles)"
          }
        ]
      },
      "VAC": {
        "name": "Vincristine + Dactinomycin + Cyclophosphamide (VAC)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Vincristine",
            "dose": 2,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days (max 2mg)"
          },
          {
            "name": "Dactinomycin",
            "dose": 1.25,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days (max 2mg total dose)"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 1200,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Mesna",
            "dose": 1200,
            "unit": "mg/m²",
            "schedule": "Equal to cyclophosphamide dose, D1, every 21 days"
          }
        ]
      },
      "IE": {
        "name": "Ifosfamide + Etoposide (IE)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Ifosfamide",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days"
          },
          {
            "name": "Etoposide",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days"
          },
          {
            "name": "Mesna",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "Equal to ifosfamide dose, D1-D5, every 21 days"
          }
        ]
      },
      "VIDE": {
        "name": "Vincristine + Ifosfamide + Doxorubicin + Etoposide (VIDE) (Euro-EWING-99)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Vincristine",
            "dose": 1.5,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days (max 2mg)"
          },
          {
            "name": "Ifosfamide",
            "dose": 3000,
            "unit": "mg/m²",
            "schedule": "D1-D3, every 21 days"
          },
          {
            "name": "Doxorubicin",
            "dose": 20,
            "unit": "mg/m²",
            "schedule": "D1-D3, every 21 days"
          },
          {
            "name": "Etoposide",
            "dose": 150,
            "unit": "mg/m²",
            "schedule": "D1-D3, every 21 days"
          },
          {
            "name": "Mesna",
            "dose": 3000,
            "unit": "mg/m²",
            "schedule": "Equal to ifosfamide dose, D1-D3, every 21 days"
          }
        ]
      },
      "VAIA": {
        "name": "Vincristine + Doxorubicin + Ifosfamide + Dactinomycin (VAIA) (EICESS-92)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Vincristine",
            "dose": 1.5,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days (max 2mg)"
          },
          {
            "name": "Doxorubicin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Ifosfamide",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days"
          },
          {
            "name": "Dactinomycin",
            "dose": 0.5,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Mesna",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "Equal to ifosfamide dose, D1-D5, every 21 days"
          }
        ]
      }
    },
    "adjuvant": {
      "VDC-IE": {
        "name": "Vincristine + Doxorubicin + Cyclophosphamide / Ifosfamide + Etoposide (VDC/IE) (AEWS0031) (NCCN Preferred)",
        "cycles": 14,
        "drugs": [
          {
            "name": "Vincristine",
            "dose": 2,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days (VDC cycles, max 2mg)"
          },
          {
            "name": "Doxorubicin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days (VDC cycles; omit after cumulative 375 mg/m²)"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 1200,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days (VDC cycles)"
          },
          {
            "name": "Mesna (for cyclophosphamide)",
            "dose": 1200,
            "unit": "mg/m²",
            "schedule": "Equal to cyclophosphamide dose, D1 (VDC cycles)"
          },
          {
            "name": "Ifosfamide",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 14 days (IE cycles, alternating with VDC)"
          },
          {
            "name": "Etoposide",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 14 days (IE cycles, alternating with VDC)"
          },
          {
            "name": "Mesna (for ifosfamide)",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "Equal to ifosfamide dose, D1-D5 (IE cycles)"
          }
        ]
      },
      "VAC": {
        "name": "Vincristine + Dactinomycin + Cyclophosphamide (VAC)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Vincristine",
            "dose": 2,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days (max 2mg)"
          },
          {
            "name": "Dactinomycin",
            "dose": 1.25,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days (max 2mg total dose)"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 1200,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Mesna",
            "dose": 1200,
            "unit": "mg/m²",
            "schedule": "Equal to cyclophosphamide dose, D1, every 21 days"
          }
        ]
      },
      "IE": {
        "name": "Ifosfamide + Etoposide (IE)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Ifosfamide",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days"
          },
          {
            "name": "Etoposide",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days"
          },
          {
            "name": "Mesna",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "Equal to ifosfamide dose, D1-D5, every 21 days"
          }
        ]
      },
      "VIDE": {
        "name": "Vincristine + Ifosfamide + Doxorubicin + Etoposide (VIDE) (Euro-EWING-99)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Vincristine",
            "dose": 1.5,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days (max 2mg)"
          },
          {
            "name": "Ifosfamide",
            "dose": 3000,
            "unit": "mg/m²",
            "schedule": "D1-D3, every 21 days"
          },
          {
            "name": "Doxorubicin",
            "dose": 20,
            "unit": "mg/m²",
            "schedule": "D1-D3, every 21 days"
          },
          {
            "name": "Etoposide",
            "dose": 150,
            "unit": "mg/m²",
            "schedule": "D1-D3, every 21 days"
          },
          {
            "name": "Mesna",
            "dose": 3000,
            "unit": "mg/m²",
            "schedule": "Equal to ifosfamide dose, D1-D3, every 21 days"
          }
        ]
      },
      "VAIA": {
        "name": "Vincristine + Doxorubicin + Ifosfamide + Dactinomycin (VAIA) (EICESS-92)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Vincristine",
            "dose": 1.5,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days (max 2mg)"
          },
          {
            "name": "Doxorubicin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Ifosfamide",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days"
          },
          {
            "name": "Dactinomycin",
            "dose": 0.5,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Mesna",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "Equal to ifosfamide dose, D1-D5, every 21 days"
          }
        ]
      }
    },
    "metastatic": {
      "VDC-IE": {
        "name": "Vincristine + Doxorubicin + Cyclophosphamide / Ifosfamide + Etoposide (VDC/IE) (AEWS0031) (NCCN Preferred)",
        "cycles": 14,
        "drugs": [
          {
            "name": "Vincristine",
            "dose": 2,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days (VDC cycles, max 2mg)"
          },
          {
            "name": "Doxorubicin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days (VDC cycles; omit after cumulative 375 mg/m²)"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 1200,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days (VDC cycles)"
          },
          {
            "name": "Mesna (for cyclophosphamide)",
            "dose": 1200,
            "unit": "mg/m²",
            "schedule": "Equal to cyclophosphamide dose, D1 (VDC cycles)"
          },
          {
            "name": "Ifosfamide",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 14 days (IE cycles, alternating with VDC)"
          },
          {
            "name": "Etoposide",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 14 days (IE cycles, alternating with VDC)"
          },
          {
            "name": "Mesna (for ifosfamide)",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "Equal to ifosfamide dose, D1-D5 (IE cycles)"
          }
        ]
      },
      "VAIA": {
        "name": "Vincristine + Doxorubicin + Ifosfamide + Dactinomycin (VAIA) (EICESS-92) (NCCN Preferred)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Vincristine",
            "dose": 1.5,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days (max 2mg)"
          },
          {
            "name": "Doxorubicin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Ifosfamide",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days"
          },
          {
            "name": "Dactinomycin",
            "dose": 0.5,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Mesna",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "Equal to ifosfamide dose, D1-D5, every 21 days"
          }
        ]
      },
      "VDC": {
        "name": "Vincristine + Doxorubicin + Cyclophosphamide (VDC) (NCCN Preferred)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Vincristine",
            "dose": 2,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days (max 2mg)"
          },
          {
            "name": "Doxorubicin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 1200,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Mesna",
            "dose": 1200,
            "unit": "mg/m²",
            "schedule": "Equal to cyclophosphamide dose, D1, every 21 days"
          }
        ]
      },
      "VIDE": {
        "name": "Vincristine + Ifosfamide + Doxorubicin + Etoposide (VIDE) (Euro-EWING-99) (NCCN Preferred)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Vincristine",
            "dose": 1.5,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days (max 2mg)"
          },
          {
            "name": "Ifosfamide",
            "dose": 3000,
            "unit": "mg/m²",
            "schedule": "D1-D3, every 21 days"
          },
          {
            "name": "Doxorubicin",
            "dose": 20,
            "unit": "mg/m²",
            "schedule": "D1-D3, every 21 days"
          },
          {
            "name": "Etoposide",
            "dose": 150,
            "unit": "mg/m²",
            "schedule": "D1-D3, every 21 days"
          },
          {
            "name": "Mesna",
            "dose": 3000,
            "unit": "mg/m²",
            "schedule": "Equal to ifosfamide dose, D1-D3, every 21 days"
          }
        ]
      }
    },
    "relapsed_refractory": {
      "Cyclophosphamide-Topotecan": {
        "name": "Cyclophosphamide + Topotecan (NCCN Preferred)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Cyclophosphamide",
            "dose": 250,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days"
          },
          {
            "name": "Topotecan",
            "dose": 0.75,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days"
          }
        ]
      },
      "Irinotecan-Temozolomide": {
        "name": "Irinotecan + Temozolomide (NCCN Preferred)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Irinotecan",
            "dose": 50,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days"
          },
          {
            "name": "Temozolomide",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "PO D1-D5, every 21 days"
          }
        ]
      },
      "Irinotecan-Temozolomide-Vincristine": {
        "name": "Irinotecan + Temozolomide + Vincristine (VIT) (NCCN Preferred)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Irinotecan",
            "dose": 50,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days"
          },
          {
            "name": "Temozolomide",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "PO D1-D5, every 21 days"
          },
          {
            "name": "Vincristine",
            "dose": 2,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days (max 2mg)"
          }
        ]
      },
      "Ifosfamide-Carboplatin-Etoposide": {
        "name": "Ifosfamide + Carboplatin + Etoposide (ICE)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Ifosfamide",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5",
            "unit": "AUC",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Etoposide",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days"
          },
          {
            "name": "Mesna",
            "dose": 1800,
            "unit": "mg/m²",
            "schedule": "Equal to ifosfamide dose, D1-D5, every 21 days"
          }
        ]
      },
      "Docetaxel-Gemcitabine": {
        "name": "Docetaxel + Gemcitabine",
        "cycles": 6,
        "drugs": [
          {
            "name": "Gemcitabine",
            "dose": 675,
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
      "HD-Ifosfamide": {
        "name": "High-Dose Ifosfamide (HD-IFO)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Ifosfamide (HD)",
            "dose": 3000,
            "unit": "mg/m²",
            "schedule": "D1-D5, every 21 days (total 15 g/m² per cycle)"
          },
          {
            "name": "Mesna",
            "dose": 3000,
            "unit": "mg/m²",
            "schedule": "Equal to ifosfamide dose, D1-D5, every 21 days"
          }
        ]
      },
      "Regorafenib": {
        "name": "Regorafenib",
        "cycles": 12,
        "drugs": [
          {
            "name": "Regorafenib",
            "dose": 160,
            "unit": "mg",
            "schedule": "PO once daily D1-D21, every 28 days"
          }
        ]
      },
      "Cabozantinib": {
        "name": "Cabozantinib",
        "cycles": 12,
        "drugs": [
          {
            "name": "Cabozantinib",
            "dose": 60,
            "unit": "mg",
            "schedule": "PO once daily continuously"
          }
        ]
      },
      "Lurbinectedin": {
        "name": "Lurbinectedin (NCCN Category 2B)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Lurbinectedin",
            "dose": 3.2,
            "unit": "mg/m²",
            "schedule": "IV over 1 hour, D1, every 21 days"
          }
        ]
      }
    }
  },
  "chondrosarcoma": {
    "relapsed_refractory": {
      "Ivosidenib": {
        "name": "Ivosidenib (IDH1 mutant)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Ivosidenib",
            "dose": 500,
            "unit": "mg",
            "schedule": "PO once daily (IDH1 mutation required)"
          }
        ]
      },
      "Pazopanib": {
        "name": "Pazopanib (VEGFR inhibitor)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Pazopanib",
            "dose": 800,
            "unit": "mg",
            "schedule": "PO once daily"
          }
        ]
      },
      "Dasatinib": {
        "name": "Dasatinib (Src/PDGFR inhibitor)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Dasatinib",
            "dose": 100,
            "unit": "mg",
            "schedule": "PO once daily"
          }
        ]
      },
      "Doxorubicin": {
        "name": "Doxorubicin (dedifferentiated/mesenchymal subtypes)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Doxorubicin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Doxorubicin-Ifosfamide": {
        "name": "Doxorubicin + Ifosfamide (AI) (dedifferentiated/mesenchymal subtypes)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Doxorubicin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Ifosfamide",
            "dose": 2500,
            "unit": "mg/m²",
            "schedule": "D1-D3, every 21 days"
          },
          {
            "name": "Mesna",
            "dose": 2500,
            "unit": "mg/m²",
            "schedule": "Equal to ifosfamide dose, D1-D3, every 21 days"
          }
        ]
      },
      "Gemcitabine-Docetaxel": {
        "name": "Gemcitabine + Docetaxel",
        "cycles": 6,
        "drugs": [
          {
            "name": "Gemcitabine",
            "dose": 675,
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
      }
    }
  },
  "giant_cell_tumor": {
    "unresectable_recurrent": {
      "Denosumab": {
        "name": "Denosumab (RANKL inhibitor) (NCCN Preferred)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Denosumab",
            "dose": 120,
            "unit": "mg",
            "schedule": "SC D1, D8, D15, then every 28 days"
          }
        ]
      },
      "Interferon-Alfa-2a": {
        "name": "Interferon Alfa-2a",
        "cycles": 12,
        "drugs": [
          {
            "name": "Interferon Alfa-2a",
            "dose": 3,
            "unit": "MIU",
            "schedule": "SC 3 times per week"
          }
        ]
      },
      "Peginterferon-Alfa-2a": {
        "name": "Peginterferon Alfa-2a",
        "cycles": 12,
        "drugs": [
          {
            "name": "Peginterferon Alfa-2a",
            "dose": 180,
            "unit": "mcg",
            "schedule": "SC once weekly"
          }
        ]
      }
    }
  }
};
