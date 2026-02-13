window.protocolData = window.protocolData || {};
window.protocolData.brain = {
  "glioblastoma": {
    "primary_treatment": {
      "Temozolomide-RT": {
        "name": "Temozolomide + Radiotherapy (Stupp Protocol) (NCCN Preferred)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Temozolomide",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "PO daily during RT (6 weeks), then 150-200 mg/m² PO D1-D5, every 28 days x 6 cycles"
          }
        ]
      },
      "Tumor-Treating-Fields": {
        "name": "TTFields + Temozolomide (EF-14) (NCCN Preferred)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Temozolomide",
            "dose": 150,
            "unit": "mg/m²",
            "schedule": "PO D1-D5, every 28 days"
          },
          {
            "name": "TTFields",
            "dose": "Device",
            "unit": "continuous",
            "schedule": "18+ hours daily"
          }
        ]
      }
    },
    "recurrent_progressive": {
      "Bevacizumab": {
        "name": "Bevacizumab",
        "cycles": 12,
        "drugs": [
          {
            "name": "Bevacizumab",
            "dose": 10,
            "unit": "mg/kg",
            "schedule": "IV D1, every 14 days"
          }
        ]
      },
      "Bevacizumab-Lomustine": {
        "name": "Bevacizumab + Lomustine (EORTC 26101)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Bevacizumab",
            "dose": 10,
            "unit": "mg/kg",
            "schedule": "IV D1, D15, every 42 days"
          },
          {
            "name": "Lomustine (CCNU)",
            "dose": 90,
            "unit": "mg/m²",
            "schedule": "PO D1, every 42 days"
          }
        ]
      },
      "Temozolomide": {
        "name": "Temozolomide (rechallenge)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Temozolomide",
            "dose": 150,
            "unit": "mg/m²",
            "schedule": "PO D1-D5, every 28 days (escalate to 200 mg/m² if tolerated)"
          }
        ]
      },
      "Lomustine": {
        "name": "Lomustine (CCNU)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Lomustine (CCNU)",
            "dose": 110,
            "unit": "mg/m²",
            "schedule": "PO D1, every 6 weeks"
          }
        ]
      },
      "Carmustine": {
        "name": "Carmustine (BCNU)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Carmustine (BCNU)",
            "dose": 200,
            "unit": "mg/m²",
            "schedule": "IV D1, every 6 weeks"
          }
        ]
      },
      "Temozolomide-Bevacizumab": {
        "name": "Temozolomide + Bevacizumab",
        "cycles": 6,
        "drugs": [
          {
            "name": "Temozolomide",
            "dose": 150,
            "unit": "mg/m²",
            "schedule": "PO D1-D5, every 28 days"
          },
          {
            "name": "Bevacizumab",
            "dose": 10,
            "unit": "mg/kg",
            "schedule": "IV D1, D15, every 28 days"
          }
        ]
      },
      "Irinotecan-Bevacizumab": {
        "name": "Irinotecan + Bevacizumab",
        "cycles": 6,
        "drugs": [
          {
            "name": "Irinotecan",
            "dose": 125,
            "unit": "mg/m²",
            "schedule": "IV D1, every 14 days"
          },
          {
            "name": "Bevacizumab",
            "dose": 10,
            "unit": "mg/kg",
            "schedule": "IV D1, every 14 days"
          }
        ]
      },
      "Temozolomide-Lomustine": {
        "name": "Temozolomide + Lomustine (CeTeG)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Temozolomide",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "PO D2-D6, every 28 days"
          },
          {
            "name": "Lomustine (CCNU)",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "PO D1, every 28 days"
          }
        ]
      },
      "Regorafenib": {
        "name": "Regorafenib (REGOMA)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Regorafenib",
            "dose": 160,
            "unit": "mg",
            "schedule": "PO once daily D1-D21, every 28 days"
          }
        ]
      }
    }
  },
  "glioma_grade2_3": {
    "primary_treatment": {
      "PCV": {
        "name": "Procarbazine + Lomustine + Vincristine (PCV) (RTOG 9802)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Lomustine (CCNU)",
            "dose": 110,
            "unit": "mg/m²",
            "schedule": "PO D1, every 42 days"
          },
          {
            "name": "Procarbazine",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "PO daily D8-D21, every 42 days"
          },
          {
            "name": "Vincristine",
            "dose": 1.4,
            "unit": "mg/m²",
            "schedule": "IV D8, D29, every 42 days (max 2mg)"
          }
        ]
      },
      "Temozolomide-RT": {
        "name": "Temozolomide + Radiotherapy",
        "cycles": 6,
        "drugs": [
          {
            "name": "Temozolomide",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "PO daily during RT (6 weeks), then 150-200 mg/m² PO D1-D5, every 28 days x 6-12 cycles"
          }
        ]
      }
    },
    "recurrent_progressive": {
      "Temozolomide": {
        "name": "Temozolomide",
        "cycles": 12,
        "drugs": [
          {
            "name": "Temozolomide",
            "dose": 150,
            "unit": "mg/m²",
            "schedule": "PO D1-D5, every 28 days (escalate to 200 mg/m² if tolerated)"
          }
        ]
      },
      "Lomustine": {
        "name": "Lomustine (CCNU)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Lomustine (CCNU)",
            "dose": 110,
            "unit": "mg/m²",
            "schedule": "PO D1, every 6 weeks"
          }
        ]
      },
      "Bevacizumab": {
        "name": "Bevacizumab",
        "cycles": 12,
        "drugs": [
          {
            "name": "Bevacizumab",
            "dose": 10,
            "unit": "mg/kg",
            "schedule": "IV D1, every 14 days"
          }
        ]
      },
      "PCV": {
        "name": "Procarbazine + Lomustine + Vincristine (PCV)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Lomustine (CCNU)",
            "dose": 110,
            "unit": "mg/m²",
            "schedule": "PO D1, every 42 days"
          },
          {
            "name": "Procarbazine",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "PO daily D8-D21, every 42 days"
          },
          {
            "name": "Vincristine",
            "dose": 1.4,
            "unit": "mg/m²",
            "schedule": "IV D8, D29, every 42 days (max 2mg)"
          }
        ]
      },
      "Vorasidenib": {
        "name": "Vorasidenib (INDIGO) (IDH-mutant)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Vorasidenib",
            "dose": 40,
            "unit": "mg",
            "schedule": "PO once daily continuously"
          }
        ]
      },
      "Tovorafenib": {
        "name": "Tovorafenib (Ojemda) (FIREFLY-1) (RAF inhibitor) (BRAF fusion/V600 mutation, pediatric LGG)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Tovorafenib",
            "dose": 380,
            "unit": "mg/m²",
            "schedule": "PO once weekly (max 600mg) until progression",
            "isOralTargeted": true
          }
        ]
      }
    }
  },
  "medulloblastoma": {
    "adjuvant": {
      "Cisplatin-Lomustine-Vincristine": {
        "name": "Cisplatin + Lomustine + Vincristine (Packer)",
        "cycles": 8,
        "drugs": [
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "IV D1, every 42 days"
          },
          {
            "name": "Lomustine (CCNU)",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "PO D1, every 42 days"
          },
          {
            "name": "Vincristine",
            "dose": 1.5,
            "unit": "mg/m²",
            "schedule": "IV D1, D8, D15, every 42 days (max 2mg)"
          }
        ]
      },
      "Cisplatin-Cyclophosphamide-Vincristine": {
        "name": "Cisplatin + Cyclophosphamide + Vincristine",
        "cycles": 6,
        "drugs": [
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "IV D1, every 21 days"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 1500,
            "unit": "mg/m²",
            "schedule": "IV D1, every 21 days"
          },
          {
            "name": "Mesna",
            "dose": 1200,
            "unit": "mg/m²",
            "schedule": "Equal to 80% of cyclophosphamide dose, D1, every 21 days"
          },
          {
            "name": "Vincristine",
            "dose": 1.5,
            "unit": "mg/m²",
            "schedule": "IV D1, every 21 days (max 2mg)"
          }
        ]
      },
      "Carboplatin-Etoposide-Cyclophosphamide": {
        "name": "Carboplatin + Etoposide + Cyclophosphamide",
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
            "name": "Etoposide",
            "dose": 150,
            "unit": "mg/m²",
            "schedule": "IV D1-D3, every 21 days"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 1000,
            "unit": "mg/m²",
            "schedule": "IV D1, every 21 days"
          },
          {
            "name": "Mesna",
            "dose": 800,
            "unit": "mg/m²",
            "schedule": "Equal to 80% of cyclophosphamide dose, D1, every 21 days"
          }
        ]
      },
      "Cisplatin-Etoposide-Cyclophosphamide": {
        "name": "Cisplatin + Etoposide + Cyclophosphamide",
        "cycles": 6,
        "drugs": [
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "IV D1, every 21 days"
          },
          {
            "name": "Etoposide",
            "dose": 150,
            "unit": "mg/m²",
            "schedule": "IV D1-D3, every 21 days"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 1500,
            "unit": "mg/m²",
            "schedule": "IV D1, every 21 days"
          },
          {
            "name": "Mesna",
            "dose": 1200,
            "unit": "mg/m²",
            "schedule": "Equal to 80% of cyclophosphamide dose, D1, every 21 days"
          }
        ]
      }
    }
  },
  "ependymoma": {
    "recurrent_progressive": {
      "Cisplatin-Etoposide": {
        "name": "Cisplatin + Etoposide (EP)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "IV D1, every 21 days"
          },
          {
            "name": "Etoposide",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "IV D1-D3, every 21 days"
          }
        ]
      }
    }
  },
  "diffuse_midline_glioma": {
    "recurrent_progressive": {
      "Dordaviprone": {
        "name": "Dordaviprone (Modeyso) (ClpP activator) (H3 K27M-mutant)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Dordaviprone",
            "dose": 625,
            "unit": "mg",
            "schedule": "PO once weekly (weight-based: 625mg if >=52.5kg, 500mg 42.5-52.5kg, 375mg 27.5-42.5kg, 250mg 12.5-27.5kg, 125mg 10-12.5kg)",
            "isOralTargeted": true
          }
        ]
      }
    }
  }
};
