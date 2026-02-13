window.protocolData = window.protocolData || {};
window.protocolData.merkel_cell = {
  "neoadjuvant": {
    "Avelumab": {
      "name": "Avelumab (PD-L1 inhibitor)",
      "cycles": 3,
      "drugs": [
        {
          "name": "Avelumab",
          "dose": 800,
          "unit": "mg",
          "schedule": "D1, every 14 days x 3 cycles"
        }
      ]
    },
    "Pembrolizumab": {
      "name": "Pembrolizumab (PD-1 inhibitor)",
      "cycles": 3,
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days x 3 cycles"
        }
      ]
    }
  },
  "adjuvant": {
    "Avelumab": {
      "name": "Avelumab (PD-L1 inhibitor)",
      "cycles": 12,
      "drugs": [
        {
          "name": "Avelumab",
          "dose": 800,
          "unit": "mg",
          "schedule": "D1, every 14 days x 12 cycles"
        }
      ]
    },
    "Pembrolizumab": {
      "name": "Pembrolizumab (PD-1 inhibitor)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days x 8 cycles"
        }
      ]
    }
  },
  "metastatic": {
    "Avelumab": {
      "name": "Avelumab (JAVELIN Merkel 200) (PD-L1 inhibitor)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Avelumab",
          "dose": 800,
          "unit": "mg",
          "schedule": "D1, every 14 days"
        }
      ]
    },
    "Pembrolizumab": {
      "name": "Pembrolizumab (KEYNOTE-017) (PD-1 inhibitor)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Nivolumab": {
      "name": "Nivolumab (CheckMate 358) (PD-1 inhibitor)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Nivolumab",
          "dose": 240,
          "unit": "mg",
          "schedule": "D1, every 14 days"
        }
      ]
    },
    "Retifanlimab": {
      "name": "Retifanlimab (POD1UM-201) (PD-1 inhibitor)",
      "cycles": 8,
      "drugs": [
        {
          "name": "Retifanlimab",
          "dose": 500,
          "unit": "mg",
          "schedule": "D1, every 28 days"
        }
      ]
    },
    "Ipilimumab-Nivolumab": {
      "name": "Ipilimumab + Nivolumab (CheckMate 358)",
      "cycles": 4,
      "drugs": [
        {
          "name": "Ipilimumab",
          "dose": 1,
          "unit": "mg/kg",
          "schedule": "D1, every 6 weeks x 4 cycles"
        },
        {
          "name": "Nivolumab",
          "dose": 240,
          "unit": "mg",
          "schedule": "D1, every 14 days"
        }
      ]
    },
    "EP": {
      "name": "Etoposide + Cisplatin (EP)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Etoposide",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1-D3, every 21 days x 6 cycles"
        },
        {
          "name": "Cisplatin",
          "dose": 75,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles"
        }
      ]
    },
    "EC": {
      "name": "Etoposide + Carboplatin (EC)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Etoposide",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "D1-D3, every 21 days x 6 cycles"
        },
        {
          "name": "Carboplatin",
          "dose": "AUC 5",
          "unit": "AUC",
          "schedule": "D1, every 21 days x 6 cycles"
        }
      ]
    },
    "CAV": {
      "name": "Cyclophosphamide + Doxorubicin + Vincristine (CAV)",
      "cycles": 6,
      "drugs": [
        {
          "name": "Cyclophosphamide",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles"
        },
        {
          "name": "Mesna",
          "dose": 800,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days (80% of Cyclophosphamide dose)"
        },
        {
          "name": "Doxorubicin",
          "dose": 45,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles"
        },
        {
          "name": "Vincristine",
          "dose": 2,
          "unit": "mg",
          "schedule": "D1, every 21 days (max 2mg) x 6 cycles"
        }
      ]
    },
    "Topotecan-Cyclophosphamide": {
      "name": "Topotecan + Cyclophosphamide",
      "cycles": 6,
      "drugs": [
        {
          "name": "Topotecan",
          "dose": 1.7,
          "unit": "mg/m²",
          "schedule": "D1-D5, every 21 days x 6 cycles"
        },
        {
          "name": "Cyclophosphamide",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days x 6 cycles"
        },
        {
          "name": "Mesna",
          "dose": 800,
          "unit": "mg/m²",
          "schedule": "D1, every 21 days (80% of Cyclophosphamide dose)"
        }
      ]
    }
  }
};
