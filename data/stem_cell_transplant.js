window.protocolData = window.protocolData || {};
window.protocolData.stem_cell_transplant = {
  "autologous": {
    "Melphalan-200": {
      "name": "High-dose Melphalan (MEL-200) (multiple myeloma)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Melphalan",
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "D-1 (30-minute infusion)"
        }
      ]
    },
    "Melphalan-140": {
      "name": "Melphalan 140 (multiple myeloma, elderly/renal impairment)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Melphalan",
          "dose": 140,
          "unit": "mg/m²",
          "schedule": "D-1 (30-minute infusion)"
        }
      ]
    },
    "BEAM": {
      "name": "BEAM (BCNU + Etoposide + Cytarabine + Melphalan) (lymphoma)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Carmustine (BCNU)",
          "dose": 300,
          "unit": "mg/m²",
          "schedule": "D-6"
        },
        {
          "name": "Etoposide",
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "once daily D-5 to D-2 (4 doses, total 800 mg/m²)"
        },
        {
          "name": "Cytarabine",
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "twice daily D-5 to D-2 (8 doses, total 1600 mg/m²)"
        },
        {
          "name": "Melphalan",
          "dose": 140,
          "unit": "mg/m²",
          "schedule": "D-1"
        }
      ]
    },
    "BeEAM": {
      "name": "BeEAM (Bendamustine + Etoposide + Cytarabine + Melphalan) (lymphoma, BCNU alternative)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Bendamustine",
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "D-7 and D-6"
        },
        {
          "name": "Etoposide",
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "once daily D-5 to D-2 (4 doses, total 800 mg/m²)"
        },
        {
          "name": "Cytarabine",
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "twice daily D-5 to D-2 (8 doses, total 1600 mg/m²)"
        },
        {
          "name": "Melphalan",
          "dose": 140,
          "unit": "mg/m²",
          "schedule": "D-1"
        }
      ]
    },
    "CBV": {
      "name": "CBV (Cyclophosphamide + BCNU + Etoposide) (lymphoma, alternative to BEAM)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Cyclophosphamide",
          "dose": 1800,
          "unit": "mg/m²",
          "schedule": "daily D-6 to D-3 (total 7200 mg/m²)"
        },
        {
          "name": "Carmustine (BCNU)",
          "dose": 300,
          "unit": "mg/m²",
          "schedule": "D-6"
        },
        {
          "name": "Etoposide",
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "twice daily D-6 to D-3"
        }
      ]
    },
    "LACE": {
      "name": "LACE (Lomustine + Cytarabine + Cyclophosphamide + Etoposide) (lymphoma, BCNU alternative)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Lomustine (CCNU)",
          "dose": 200,
          "unit": "mg/m²",
          "schedule": "PO D-7 (single dose)"
        },
        {
          "name": "Etoposide",
          "dose": 1000,
          "unit": "mg/m²",
          "schedule": "IV D-7 (single dose)"
        },
        {
          "name": "Cytarabine",
          "dose": 2000,
          "unit": "mg/m²",
          "schedule": "IV twice daily D-6 and D-5 (4 doses)"
        },
        {
          "name": "Cyclophosphamide",
          "dose": 1800,
          "unit": "mg/m²",
          "schedule": "IV daily D-4 to D-2 (3 doses, total 5400 mg/m²)"
        }
      ]
    }
  },
  "allogeneic_mac": {
    "Busulfan-Cyclophosphamide": {
      "name": "Busulfan + Cyclophosphamide (BuCy2)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Busulfan",
          "dose": 3.2,
          "unit": "mg/kg",
          "schedule": "IV once daily D-7 to D-4 (4 days, total 12.8 mg/kg) (or 0.8 mg/kg q6h x 16 doses)"
        },
        {
          "name": "Cyclophosphamide",
          "dose": 60,
          "unit": "mg/kg",
          "schedule": "D-3 and D-2"
        }
      ]
    },
    "Fludarabine-Busulfan-4day": {
      "name": "Fludarabine + Busulfan 4-day (FluBu4) (preferred over BuCy for AML)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Fludarabine",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "daily D-6 to D-3 (4 days)"
        },
        {
          "name": "Busulfan",
          "dose": 3.2,
          "unit": "mg/kg",
          "schedule": "IV once daily D-5 to D-2 (4 days, total 12.8 mg/kg) (or 0.8 mg/kg q6h x 16 doses)"
        }
      ]
    },
    "Cyclophosphamide-TBI": {
      "name": "Cyclophosphamide + Total Body Irradiation (Cy/TBI)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Total Body Irradiation",
          "dose": 1200,
          "unit": "cGy",
          "schedule": "fractionated D-7 to D-4 (200 cGy twice daily, 6 fractions)"
        },
        {
          "name": "Cyclophosphamide",
          "dose": 60,
          "unit": "mg/kg",
          "schedule": "D-3 and D-2"
        }
      ]
    },
    "Treosulfan-Fludarabine": {
      "name": "Treosulfan + Fludarabine (TreoFlu) (reduced-toxicity MAC)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Treosulfan",
          "dose": 14,
          "unit": "g/m²",
          "schedule": "daily D-6 to D-4 (3 days, total 42 g/m²)"
        },
        {
          "name": "Fludarabine",
          "dose": 30,
          "unit": "mg/m²",
          "schedule": "daily D-6 to D-2 (5 days)"
        }
      ]
    },
    "Thiotepa-Busulfan-Fludarabine": {
      "name": "Thiotepa + Busulfan + Fludarabine (TBF) (haploidentical/high-risk)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Thiotepa",
          "dose": 5,
          "unit": "mg/kg",
          "schedule": "D-7 and D-6 (2 doses, total 10 mg/kg)"
        },
        {
          "name": "Busulfan",
          "dose": 3.2,
          "unit": "mg/kg",
          "schedule": "IV once daily D-5 to D-3 (3 days, total 9.6 mg/kg) (or 0.8 mg/kg q6h x 12 doses)"
        },
        {
          "name": "Fludarabine",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "daily D-6 to D-3 (4 days)"
        }
      ]
    }
  },
  "allogeneic_ric": {
    "Fludarabine-Busulfan-2day": {
      "name": "Fludarabine + Busulfan 2-day (FluBu2) (RIC)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Fludarabine",
          "dose": 40,
          "unit": "mg/m²",
          "schedule": "daily D-5 to D-2 (4 days)"
        },
        {
          "name": "Busulfan",
          "dose": 3.2,
          "unit": "mg/kg",
          "schedule": "IV once daily D-3 and D-2 (2 days, total 6.4 mg/kg) (or 0.8 mg/kg q6h x 8 doses)"
        }
      ]
    },
    "Fludarabine-Melphalan": {
      "name": "Fludarabine + Melphalan (FluMel) (RIC)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Fludarabine",
          "dose": 25,
          "unit": "mg/m²",
          "schedule": "daily D-5 to D-1 (5 days)"
        },
        {
          "name": "Melphalan",
          "dose": 140,
          "unit": "mg/m²",
          "schedule": "D-1"
        }
      ]
    },
    "Fludarabine-Cyclophosphamide": {
      "name": "Fludarabine + Cyclophosphamide (FluCy) (NMA)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Fludarabine",
          "dose": 30,
          "unit": "mg/m²",
          "schedule": "daily D-6 to D-2 (5 days)"
        },
        {
          "name": "Cyclophosphamide",
          "dose": 300,
          "unit": "mg/m²",
          "schedule": "daily D-6 to D-2 (5 days, total 1500 mg/m²)"
        }
      ]
    },
    "Fludarabine-TBI-200": {
      "name": "Fludarabine + Low-dose TBI (Seattle NMA)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Fludarabine",
          "dose": 30,
          "unit": "mg/m²",
          "schedule": "daily D-4 to D-2 (3 days)"
        },
        {
          "name": "Total Body Irradiation",
          "dose": 200,
          "unit": "cGy",
          "schedule": "single fraction on D0"
        }
      ]
    },
    "Baltimore-Haplo-NMA": {
      "name": "Baltimore NMA Haplo (Flu + Cy + TBI) (haploidentical with post-transplant Cy)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Fludarabine",
          "dose": 30,
          "unit": "mg/m²",
          "schedule": "daily D-6 to D-2 (5 days)"
        },
        {
          "name": "Cyclophosphamide",
          "dose": 14.5,
          "unit": "mg/kg",
          "schedule": "D-6 and D-5 (total 29 mg/kg pre-transplant)"
        },
        {
          "name": "Total Body Irradiation",
          "dose": 200,
          "unit": "cGy",
          "schedule": "single fraction D-1"
        }
      ]
    },
    "FLAMSA-RIC": {
      "name": "FLAMSA-RIC (Flu + Amsacrine + AraC then TBI + Cy) (high-risk/refractory AML)",
      "cycles": 1,
      "drugs": [
        {
          "name": "Fludarabine",
          "dose": 30,
          "unit": "mg/m²",
          "schedule": "daily D-12 to D-9 (FLAMSA phase, 4 days)"
        },
        {
          "name": "Amsacrine",
          "dose": 100,
          "unit": "mg/m²",
          "schedule": "daily D-12 to D-9 (FLAMSA phase, 4 days)"
        },
        {
          "name": "Cytarabine",
          "dose": 2000,
          "unit": "mg/m²",
          "schedule": "daily D-12 to D-9 (FLAMSA phase, 4 days)"
        },
        {
          "name": "Total Body Irradiation",
          "dose": 400,
          "unit": "cGy",
          "schedule": "200 cGy on D-5 and D-4 (RIC phase, after 3-day rest)"
        },
        {
          "name": "Cyclophosphamide",
          "dose": 40,
          "unit": "mg/kg",
          "schedule": "D-3 and D-2 (RIC phase)"
        }
      ]
    }
  }
};
