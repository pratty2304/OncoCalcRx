window.protocolData = window.protocolData || {};
window.protocolData.tumor_agnostic = {
  "metastatic": {
    "Pembrolizumab-MSI-H": {
      "name": "Pembrolizumab (PD-1 inhibitor) (MSI-H/dMMR solid tumors)",
      "cycles": 35,
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days (or 400 mg every 42 days), until progression (max 35 cycles)"
        }
      ]
    },
    "Pembrolizumab-TMB-H": {
      "name": "Pembrolizumab (PD-1 inhibitor) (TMB-H ≥10 mut/Mb solid tumors)",
      "cycles": 35,
      "drugs": [
        {
          "name": "Pembrolizumab",
          "dose": 200,
          "unit": "mg",
          "schedule": "D1, every 21 days (or 400 mg every 42 days), until progression (max 35 cycles)"
        }
      ]
    },
    "Larotrectinib": {
      "name": "Larotrectinib (TRK inhibitor) (NTRK gene fusion-positive solid tumors)",
      "cycles": 35,
      "drugs": [
        {
          "name": "Larotrectinib",
          "dose": 100,
          "unit": "mg",
          "schedule": "PO twice daily, until progression"
        }
      ]
    },
    "Entrectinib": {
      "name": "Entrectinib (TRK inhibitor) (NTRK gene fusion-positive solid tumors)",
      "cycles": 35,
      "drugs": [
        {
          "name": "Entrectinib",
          "dose": 600,
          "unit": "mg",
          "schedule": "PO once daily, until progression"
        }
      ]
    },
    "Repotrectinib": {
      "name": "Repotrectinib (TRK inhibitor) (NTRK gene fusion-positive solid tumors)",
      "cycles": 35,
      "drugs": [
        {
          "name": "Repotrectinib",
          "dose": 160,
          "unit": "mg",
          "schedule": "PO once daily x 14 days, then 160 mg PO twice daily, until progression"
        }
      ]
    },
    "Selpercatinib": {
      "name": "Selpercatinib (RET inhibitor) (RET gene fusion-positive solid tumors)",
      "cycles": 35,
      "drugs": [
        {
          "name": "Selpercatinib",
          "dose": 160,
          "unit": "mg",
          "schedule": "PO twice daily, until progression"
        }
      ]
    },
    "Dabrafenib-Trametinib": {
      "name": "Dabrafenib + Trametinib (BRAF/MEK inhibitors) (BRAF V600E-mutant solid tumors)",
      "cycles": 35,
      "drugs": [
        {
          "name": "Dabrafenib",
          "dose": 150,
          "unit": "mg",
          "schedule": "PO twice daily, until progression"
        },
        {
          "name": "Trametinib",
          "dose": 2,
          "unit": "mg",
          "schedule": "PO once daily, until progression"
        }
      ]
    },
    "Trastuzumab-Deruxtecan-HER2": {
      "name": "Trastuzumab Deruxtecan (T-DXd) (HER2-directed ADC) (DESTINY-PanTumor02) (HER2 IHC 3+ solid tumors)",
      "cycles": 35,
      "drugs": [
        {
          "name": "Trastuzumab Deruxtecan",
          "dose": 5.4,
          "unit": "mg/kg",
          "schedule": "D1, every 21 days, until progression"
        }
      ]
    }
  }
};
