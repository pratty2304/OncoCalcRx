window.protocolData = window.protocolData || {};
window.protocolData.hepatocellular = {
  "adjuvant": {
    "Atezolizumab-Bevacizumab-Adj": {
      "name": "Atezolizumab + Bevacizumab (IMbrave050) (PD-L1 + VEGF inhibitors)",
      "cycles": 17,
      "drugs": [
        {
          "name": "Atezolizumab",
          "dose": 1200,
          "unit": "mg",
          "schedule": "D1, every 21 days for 12 months"
        },
        {
          "name": "Bevacizumab",
          "dose": 15,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days for 12 months"
        }
      ]
    }
  },
  "metastatic": {
    "Atezolizumab-Bevacizumab-1L": {
      "name": "Atezolizumab + Bevacizumab (IMbrave150) (PD-L1 + VEGF inhibitors)",
      "drugs": [
        {
          "name": "Atezolizumab",
          "dose": 1200,
          "unit": "mg",
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
    "Durvalumab-Tremelimumab-1L": {
      "name": "Durvalumab + Tremelimumab (HIMALAYA) (PD-L1 + CTLA-4 inhibitors)",
      "drugs": [
        {
          "name": "Durvalumab",
          "dose": 1500,
          "unit": "mg",
          "schedule": "D1, every 28 days"
        },
        {
          "name": "Tremelimumab",
          "dose": 300,
          "unit": "mg",
          "schedule": "D1, cycle 1 only (single dose)"
        }
      ]
    },
    "Sorafenib-1L": {
      "name": "Sorafenib (SHARP) (multi-kinase inhibitor)",
      "drugs": [
        {
          "name": "Sorafenib",
          "dose": 400,
          "unit": "mg",
          "schedule": "PO twice daily, continuous"
        }
      ]
    },
    "Lenvatinib-1L": {
      "name": "Lenvatinib (REFLECT) (multi-kinase inhibitor)",
      "drugs": [
        {
          "name": "Lenvatinib",
          "dose": 12,
          "unit": "mg",
          "schedule": "PO once daily (12mg if ≥60kg, 8mg if <60kg), continuous"
        }
      ]
    },
    "Durvalumab-Monotherapy-1L": {
      "name": "Durvalumab monotherapy (HIMALAYA) (PD-L1 inhibitor)",
      "drugs": [
        {
          "name": "Durvalumab",
          "dose": 1500,
          "unit": "mg",
          "schedule": "D1, every 28 days"
        }
      ]
    },
    "Tislelizumab-Monotherapy-1L": {
      "name": "Tislelizumab monotherapy (RATIONALE-301) (PD-1 inhibitor)",
      "drugs": [
        {
          "name": "Tislelizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days"
        }
      ]
    },
    "Cabozantinib-2L": {
      "name": "Cabozantinib (CELESTIAL) (multi-kinase inhibitor)",
      "drugs": [
        {
          "name": "Cabozantinib",
          "dose": 60,
          "unit": "mg",
          "schedule": "PO once daily, continuous"
        }
      ]
    },
    "Regorafenib-2L": {
      "name": "Regorafenib (RESORCE) (multi-kinase inhibitor)",
      "drugs": [
        {
          "name": "Regorafenib",
          "dose": 160,
          "unit": "mg",
          "schedule": "PO once daily D1-21, then 7 days off, every 28 days"
        }
      ]
    },
    "Ramucirumab-2L": {
      "name": "Ramucirumab (REACH-2) (AFP ≥400 ng/mL) (VEGFR-2 inhibitor)",
      "drugs": [
        {
          "name": "Ramucirumab",
          "dose": 8,
          "unit": "mg/kg",
          "schedule": "D1, every 14 days"
        }
      ]
    },
    "Ipilimumab-Nivolumab-2L": {
      "name": "Ipilimumab + Nivolumab (CheckMate-040) (CTLA-4 + PD-1 inhibitors)",
      "drugs": [
        {
          "name": "Ipilimumab",
          "dose": 3,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days x 4 cycles"
        },
        {
          "name": "Nivolumab",
          "dose": 1,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days x 4 cycles, then Nivolumab 240mg every 14 days or 480mg every 28 days"
        }
      ]
    },
    "Nivolumab-Monotherapy-2L": {
      "name": "Nivolumab monotherapy (CheckMate-040) (PD-1 inhibitor)",
      "drugs": [
        {
          "name": "Nivolumab",
          "dose": 240,
          "unit": "mg",
          "schedule": "D1, every 14 days or 480mg every 28 days"
        }
      ]
    },
    "Pembrolizumab-Monotherapy-2L": {
      "name": "Pembrolizumab monotherapy (KEYNOTE-224) (PD-1 inhibitor)",
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days or 400mg every 6 weeks"
        }
      ]
    },
    "FOLFOX4-Subsequent": {
      "name": "FOLFOX4 (EACH)",
      "drugs": [
        {
          "name": "Oxaliplatin",
          "dose": 85,
          "unit": "mg/m²",
          "schedule": "D1, every 14 days"
        },
        {
          "name": "Leucovorin",
          "dose": 200,
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
          "dose": 600,
          "unit": "mg/m²",
          "schedule": "CI over 22 hours D1-D2, every 14 days"
        }
      ]
    },
    "Dostarlimab-MSI": {
      "name": "Dostarlimab monotherapy (dMMR/MSI-H) (PD-1 inhibitor)",
      "drugs": [
        {
          "name": "Dostarlimab",
          "dose": 500,
          "unit": "mg",
          "schedule": "D1, every 21 days x 4, then 1000mg every 6 weeks"
        }
      ]
    },
    "Selpercatinib-RET": {
      "name": "Selpercatinib (RET fusion+) (RET inhibitor)",
      "drugs": [
        {
          "name": "Selpercatinib",
          "dose": 160,
          "unit": "mg",
          "schedule": "PO twice daily, continuous"
        }
      ]
    },
    "Larotrectinib-NTRK": {
      "name": "Larotrectinib (NTRK fusion+) (TRK inhibitor)",
      "drugs": [
        {
          "name": "Larotrectinib",
          "dose": 100,
          "unit": "mg",
          "schedule": "PO twice daily, continuous"
        }
      ]
    },
    "Entrectinib-NTRK": {
      "name": "Entrectinib (NTRK fusion+) (TRK inhibitor)",
      "drugs": [
        {
          "name": "Entrectinib",
          "dose": 600,
          "unit": "mg",
          "schedule": "PO once daily, continuous"
        }
      ]
    },
    "Repotrectinib-NTRK": {
      "name": "Repotrectinib (NTRK fusion+) (TRK inhibitor)",
      "drugs": [
        {
          "name": "Repotrectinib",
          "dose": 160,
          "unit": "mg",
          "schedule": "PO once daily x 14 days, then 160mg PO twice daily, continuous"
        }
      ]
    }
  }
};
