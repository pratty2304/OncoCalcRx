window.protocolData = window.protocolData || {};
window.protocolData.lung = {
  "nsclc": {
    "neoadjuvant": {
      "Nivolumab-Platinum-Doublet-Neo": {
        "name": "Nivolumab + platinum doublet (CheckMate 816)",
        "cycles": 3,
        "drugs": [
          {
            "name": "Nivolumab",
            "dose": 360,
            "unit": "mg",
            "schedule": "D1, every 21 days x 3 cycles"
          },
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles"
          },
          {
            "name": "Pemetrexed",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles (non-squamous)"
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
      "Cisplatin-Pemetrexed-Neo": {
        "name": "Cisplatin + Pemetrexed (non-squamous)",
        "cycles": 3,
        "drugs": [
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles"
          },
          {
            "name": "Pemetrexed",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles"
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
      "Carboplatin-Paclitaxel-Neo": {
        "name": "Carboplatin + Paclitaxel",
        "cycles": 3,
        "drugs": [
          {
            "name": "Carboplatin",
            "dose": "AUC 6",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 3 cycles"
          },
          {
            "name": "Paclitaxel",
            "dose": 200,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles"
          }
        ]
      },
      "Cisplatin-Gemcitabine-Neo": {
        "name": "Cisplatin + Gemcitabine (squamous)",
        "cycles": 3,
        "drugs": [
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles"
          },
          {
            "name": "Gemcitabine",
            "dose": 1000,
            "unit": "mg/m²",
            "schedule": "D1,8, every 21 days x 3 cycles"
          }
        ]
      },
      "Cisplatin-Vinorelbine-Neo": {
        "name": "Cisplatin + Vinorelbine",
        "cycles": 3,
        "drugs": [
          {
            "name": "Cisplatin",
            "dose": 80,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles"
          },
          {
            "name": "Vinorelbine",
            "dose": 25,
            "unit": "mg/m²",
            "schedule": "D1,8, every 21 days x 3 cycles"
          }
        ]
      }
    },
    "definitive": {
      "Cisplatin-Etoposide-CRT": {
        "name": "Cisplatin + Etoposide concurrent chemoRT",
        "cycles": 2,
        "drugs": [
          {
            "name": "Cisplatin",
            "dose": 50,
            "unit": "mg/m²",
            "schedule": "D1,8 or D1-5 (low dose), every 28 days x 2 cycles concurrent with RT"
          },
          {
            "name": "Etoposide",
            "dose": 50,
            "unit": "mg/m²",
            "schedule": "D1-5, every 28 days x 2 cycles concurrent with RT"
          }
        ]
      },
      "Weekly-Paclitaxel-Carboplatin-CRT": {
        "name": "Weekly Paclitaxel + Carboplatin concurrent chemoRT",
        "cycles": 6,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 45,
            "unit": "mg/m²",
            "schedule": "Weekly concurrent with RT"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 2",
            "unit": "AUC",
            "schedule": "Weekly concurrent with RT"
          }
        ]
      },
      "Cisplatin-Pemetrexed-CRT": {
        "name": "Cisplatin + Pemetrexed concurrent chemoRT (non-squamous)",
        "cycles": 2,
        "drugs": [
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 2-3 cycles concurrent with RT"
          },
          {
            "name": "Pemetrexed",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 2-3 cycles concurrent with RT"
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
      "Osimertinib-Post-CRT": {
        "name": "Osimertinib (LAURA) (post-chemoRT, EGFR exon19del/L858R, unresectable stage III)",
        "drugs": [
          {
            "name": "Osimertinib",
            "dose": 80,
            "unit": "mg",
            "schedule": "PO once daily until progression (after definitive chemoRT)"
          }
        ]
      },
      "Durvalumab-Consolidation": {
        "name": "Durvalumab (PACIFIC) (post-chemoRT consolidation)",
        "cycles": 26,
        "drugs": [
          {
            "name": "Durvalumab",
            "dose": 10,
            "unit": "mg/kg",
            "schedule": "D1, every 14 days for up to 12 months"
          }
        ]
      }
    },
    "perioperative": {
      "Nivolumab-Carbo-Pac-Periop": {
        "name": "Nivolumab + Carboplatin + Paclitaxel (CheckMate 77T)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Nivolumab",
            "dose": 360,
            "unit": "mg",
            "schedule": "D1, every 21 days x 4 neo cycles, then 480mg q4w adj x 1 year"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 4 neo cycles"
          },
          {
            "name": "Paclitaxel",
            "dose": 200,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 neo cycles"
          }
        ]
      },
      "Pembrolizumab-Cis-Pem-Periop": {
        "name": "Pembrolizumab + Cisplatin + Pemetrexed (KEYNOTE-671) (non-squamous, PD-L1 irrespective)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Pembrolizumab",
            "dose": 200,
            "unit": "mg",
            "schedule": "D1, every 21 days x 4 neo cycles, then 200mg q3w adj x 13 cycles"
          },
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 neo cycles"
          },
          {
            "name": "Pemetrexed",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 neo cycles"
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
      "Pembrolizumab-Cis-Gem-Periop": {
        "name": "Pembrolizumab + Cisplatin + Gemcitabine (KEYNOTE-671) (squamous, PD-L1 irrespective)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Pembrolizumab",
            "dose": 200,
            "unit": "mg",
            "schedule": "D1, every 21 days x 4 neo cycles, then 200mg q3w adj x 13 cycles"
          },
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 neo cycles"
          },
          {
            "name": "Gemcitabine",
            "dose": 1000,
            "unit": "mg/m²",
            "schedule": "D1,8, every 21 days x 4 neo cycles"
          }
        ]
      },
      "Durvalumab-Cis-Pem-Periop": {
        "name": "Durvalumab + Cisplatin + Pemetrexed (AEGEAN) (non-squamous, PD-L1 irrespective)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Durvalumab",
            "dose": 1500,
            "unit": "mg",
            "schedule": "D1, every 21 days x 4 neo cycles, then 1500mg q4w adj x 12 cycles"
          },
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 neo cycles"
          },
          {
            "name": "Pemetrexed",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 neo cycles"
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
      "Durvalumab-Carbo-Pem-Periop": {
        "name": "Durvalumab + Carboplatin + Pemetrexed (AEGEAN) (non-squamous, PD-L1 irrespective)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Durvalumab",
            "dose": 1500,
            "unit": "mg",
            "schedule": "D1, every 21 days x 4 neo cycles, then 1500mg q4w adj x 12 cycles"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 4 neo cycles"
          },
          {
            "name": "Pemetrexed",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 neo cycles"
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
      "Durvalumab-Cis-Gem-Periop": {
        "name": "Durvalumab + Cisplatin + Gemcitabine (AEGEAN) (squamous, PD-L1 irrespective)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Durvalumab",
            "dose": 1500,
            "unit": "mg",
            "schedule": "D1, every 21 days x 4 neo cycles, then 1500mg q4w adj x 12 cycles"
          },
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 neo cycles"
          },
          {
            "name": "Gemcitabine",
            "dose": 1250,
            "unit": "mg/m²",
            "schedule": "D1,8, every 21 days x 4 neo cycles"
          }
        ]
      },
      "Durvalumab-Carbo-Gem-Periop": {
        "name": "Durvalumab + Carboplatin + Gemcitabine (AEGEAN) (squamous, PD-L1 irrespective)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Durvalumab",
            "dose": 1500,
            "unit": "mg",
            "schedule": "D1, every 21 days x 4 neo cycles, then 1500mg q4w adj x 12 cycles"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 4 neo cycles"
          },
          {
            "name": "Gemcitabine",
            "dose": 1250,
            "unit": "mg/m²",
            "schedule": "D1,8, every 21 days x 4 neo cycles"
          }
        ]
      },
      "Tislelizumab-Cis-Pem-Periop": {
        "name": "Tislelizumab + Cisplatin + Pemetrexed (RATIONALE-315) (non-squamous, PD-L1 irrespective)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Tislelizumab",
            "dose": 200,
            "unit": "mg",
            "schedule": "D1, every 21 days x 3-4 neo cycles, then 400mg q6w adj x 8 cycles"
          },
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3-4 neo cycles"
          },
          {
            "name": "Pemetrexed",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3-4 neo cycles"
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
      "Tislelizumab-Carbo-Pem-Periop": {
        "name": "Tislelizumab + Carboplatin + Pemetrexed (RATIONALE-315) (non-squamous, PD-L1 irrespective)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Tislelizumab",
            "dose": 200,
            "unit": "mg",
            "schedule": "D1, every 21 days x 3-4 neo cycles, then 400mg q6w adj x 8 cycles"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 3-4 neo cycles"
          },
          {
            "name": "Pemetrexed",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3-4 neo cycles"
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
      "Tislelizumab-Cis-Pac-Periop": {
        "name": "Tislelizumab + Cisplatin + Paclitaxel (RATIONALE-315) (squamous, PD-L1 irrespective)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Tislelizumab",
            "dose": 200,
            "unit": "mg",
            "schedule": "D1, every 21 days x 3-4 neo cycles, then 400mg q6w adj x 8 cycles"
          },
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3-4 neo cycles"
          },
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3-4 neo cycles"
          }
        ]
      },
      "Tislelizumab-Carbo-Pac-Periop": {
        "name": "Tislelizumab + Carboplatin + Paclitaxel (RATIONALE-315) (squamous, PD-L1 irrespective)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Tislelizumab",
            "dose": 200,
            "unit": "mg",
            "schedule": "D1, every 21 days x 3-4 neo cycles, then 400mg q6w adj x 8 cycles"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 3-4 neo cycles"
          },
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3-4 neo cycles"
          }
        ]
      }
    },
    "adjuvant": {
      "Osimertinib-Adj": {
        "name": "Osimertinib (ADAURA) (EGFR exon19del/L858R)",
        "cycles": 36,
        "drugs": [
          {
            "name": "Osimertinib",
            "dose": 80,
            "unit": "mg",
            "schedule": "PO once daily for 3 years"
          }
        ]
      },
      "Alectinib-Adj": {
        "name": "Alectinib (ALINA) (ALK rearrangement)",
        "cycles": 24,
        "drugs": [
          {
            "name": "Alectinib",
            "dose": 600,
            "unit": "mg",
            "schedule": "PO twice daily for 2 years"
          }
        ]
      },
      "Atezolizumab-Adj": {
        "name": "Atezolizumab (IMpower010) (stage II-IIIA, PD-L1 ≥1%)",
        "cycles": 16,
        "drugs": [
          {
            "name": "Atezolizumab",
            "dose": 1200,
            "unit": "mg",
            "schedule": "D1, every 21 days x 16 cycles (1 year)"
          }
        ]
      },
      "Pembrolizumab-Adj": {
        "name": "Pembrolizumab (KEYNOTE-091/PEARLS) (stage IB-IIIA)",
        "cycles": 18,
        "drugs": [
          {
            "name": "Pembrolizumab",
            "dose": 200,
            "unit": "mg",
            "schedule": "D1, every 21 days x 18 cycles (1 year)"
          }
        ]
      },
      "Cisplatin-Vinorelbine-Adj": {
        "name": "Cisplatin + Vinorelbine (LACE)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Cisplatin",
            "dose": 80,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Vinorelbine",
            "dose": 25,
            "unit": "mg/m²",
            "schedule": "D1,8, every 21 days x 4 cycles"
          }
        ]
      },
      "Carboplatin-Paclitaxel-Adj": {
        "name": "Carboplatin + Paclitaxel (cisplatin-ineligible)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Carboplatin",
            "dose": "AUC 6",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Paclitaxel",
            "dose": 200,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          }
        ]
      },
      "Cisplatin-Pemetrexed-Adj": {
        "name": "Cisplatin + Pemetrexed (non-squamous)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Pemetrexed",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
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
      "Cisplatin-Gemcitabine-Adj": {
        "name": "Cisplatin + Gemcitabine (squamous)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Gemcitabine",
            "dose": 1000,
            "unit": "mg/m²",
            "schedule": "D1,8, every 21 days x 4 cycles"
          }
        ]
      },
      "Cisplatin-Docetaxel-Adj": {
        "name": "Cisplatin + Docetaxel",
        "cycles": 4,
        "drugs": [
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Docetaxel",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          }
        ]
      }
    },
    "metastatic": {
      "Pembrolizumab-Monotherapy": {
        "name": "Pembrolizumab monotherapy (KEYNOTE-024) (PD-L1 ≥50%)",
        "drugs": [
          {
            "name": "Pembrolizumab",
            "dose": 200,
            "unit": "mg",
            "schedule": "D1, every 21 days or 400mg every 6 weeks"
          }
        ]
      },
      "Atezolizumab-Monotherapy": {
        "name": "Atezolizumab monotherapy (OAK) (PD-L1+)",
        "drugs": [
          {
            "name": "Atezolizumab",
            "dose": 1200,
            "unit": "mg",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Cemiplimab-Monotherapy": {
        "name": "Cemiplimab monotherapy (EMPOWER-Lung 1) (PD-L1 ≥50%)",
        "drugs": [
          {
            "name": "Cemiplimab",
            "dose": 350,
            "unit": "mg",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Nivolumab-Ipilimumab": {
        "name": "Nivolumab + Ipilimumab (CheckMate 227) (PD-L1 ≥1%)",
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
      "Pembrolizumab-Carboplatin-Pemetrexed": {
        "name": "Pembrolizumab + Carboplatin + Pemetrexed (KEYNOTE-189) (non-squamous, PD-L1 irrespective)",
        "drugs": [
          {
            "name": "Pembrolizumab",
            "dose": 200,
            "unit": "mg",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Pemetrexed",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days (continue as maintenance)"
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
      "Pembrolizumab-Cisplatin-Pemetrexed": {
        "name": "Pembrolizumab + Cisplatin + Pemetrexed (KEYNOTE-189) (non-squamous, PD-L1 irrespective)",
        "drugs": [
          {
            "name": "Pembrolizumab",
            "dose": 200,
            "unit": "mg",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Pemetrexed",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days (continue as maintenance)"
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
      "Pembrolizumab-Carboplatin-Paclitaxel": {
        "name": "Pembrolizumab + Carboplatin + Paclitaxel (KEYNOTE-407) (squamous, PD-L1 irrespective)",
        "drugs": [
          {
            "name": "Pembrolizumab",
            "dose": 200,
            "unit": "mg",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 6",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Paclitaxel",
            "dose": 200,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          }
        ]
      },
      "Pembrolizumab-Carboplatin-NabPaclitaxel": {
        "name": "Pembrolizumab + Carboplatin + Nab-paclitaxel (KEYNOTE-407) (squamous, PD-L1 irrespective)",
        "drugs": [
          {
            "name": "Pembrolizumab",
            "dose": 200,
            "unit": "mg",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 6",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Nab-paclitaxel",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1,8,15, every 21 days x 4 cycles"
          }
        ]
      },
      "Nivolumab-Ipilimumab-Chemotherapy": {
        "name": "Nivolumab + Ipilimumab + platinum doublet (CheckMate 9LA) (PD-L1 irrespective)",
        "drugs": [
          {
            "name": "Nivolumab",
            "dose": 360,
            "unit": "mg",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Ipilimumab",
            "dose": 1,
            "unit": "mg/kg",
            "schedule": "D1, every 6 weeks"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 2 cycles"
          },
          {
            "name": "Pemetrexed",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 2 cycles (non-squamous; or Paclitaxel 200mg/m² for squamous)"
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
      "Atezolizumab-Bevacizumab-Carboplatin-Paclitaxel": {
        "name": "Atezolizumab + Bevacizumab + Carboplatin + Paclitaxel (IMpower150) (non-squamous, PD-L1 irrespective)",
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
            "schedule": "D1, every 21 days (continue as maintenance)"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 6",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 4-6 cycles"
          },
          {
            "name": "Paclitaxel",
            "dose": 200,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4-6 cycles"
          }
        ]
      },
      "Cemiplimab-Carboplatin-Pemetrexed": {
        "name": "Cemiplimab + Carboplatin + Pemetrexed (EMPOWER-Lung 3) (non-squamous, PD-L1 irrespective)",
        "drugs": [
          {
            "name": "Cemiplimab",
            "dose": 350,
            "unit": "mg",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Pemetrexed",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days (continue as maintenance)"
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
      "Osimertinib": {
        "name": "Osimertinib (FLAURA) (EGFR exon19del/L858R)",
        "drugs": [
          {
            "name": "Osimertinib",
            "dose": 80,
            "unit": "mg",
            "schedule": "PO once daily continuously"
          }
        ]
      },
      "Osimertinib-Carboplatin-Pemetrexed": {
        "name": "Osimertinib + Carboplatin + Pemetrexed (FLAURA2) (EGFR-mutated)",
        "drugs": [
          {
            "name": "Osimertinib",
            "dose": 80,
            "unit": "mg",
            "schedule": "PO once daily continuously"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Pemetrexed",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles then maintenance"
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
      "Gefitinib-Carboplatin-Pemetrexed": {
        "name": "Gefitinib + Carboplatin + Pemetrexed (NEJ009) (EGFR exon19del/L858R)",
        "drugs": [
          {
            "name": "Gefitinib",
            "dose": 250,
            "unit": "mg",
            "schedule": "PO once daily continuously"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 4-6 cycles"
          },
          {
            "name": "Pemetrexed",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4-6 cycles then maintenance"
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
      "Amivantamab-Lazertinib": {
        "name": "Amivantamab + Lazertinib (MARIPOSA) (EGFR exon19del/L858R)",
        "drugs": [
          {
            "name": "Amivantamab",
            "dose": 1400,
            "unit": "mg",
            "schedule": "IV weekly x 4 then every 14 days (1050mg if <80kg, 1400mg if ≥80kg)"
          },
          {
            "name": "Lazertinib",
            "dose": 240,
            "unit": "mg",
            "schedule": "PO once daily continuously"
          }
        ]
      },
      "Afatinib": {
        "name": "Afatinib (LUX-Lung 3/6/7) (EGFR uncommon mutations: G719X, L861Q, S768I)",
        "drugs": [
          {
            "name": "Afatinib",
            "dose": 40,
            "unit": "mg",
            "schedule": "PO once daily continuously"
          }
        ]
      },
      "Gefitinib": {
        "name": "Gefitinib (IPASS) (EGFR exon19del/L858R)",
        "drugs": [
          {
            "name": "Gefitinib",
            "dose": 250,
            "unit": "mg",
            "schedule": "PO once daily continuously"
          }
        ]
      },
      "Amivantamab-Exon20": {
        "name": "Amivantamab monotherapy (CHRYSALIS) (EGFR exon 20 insertion)",
        "drugs": [
          {
            "name": "Amivantamab",
            "dose": 1400,
            "unit": "mg",
            "schedule": "IV weekly x 4 then every 14 days (1050mg if <80kg, 1400mg if ≥80kg)"
          }
        ]
      },
      "Amivantamab-Chemo-Exon20": {
        "name": "Amivantamab + Carboplatin + Pemetrexed (PAPILLON) (EGFR exon 20 insertion)",
        "drugs": [
          {
            "name": "Amivantamab",
            "dose": 1400,
            "unit": "mg",
            "schedule": "IV weekly x 4 then every 14 days (1050mg if <80kg, 1400mg if ≥80kg)"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Pemetrexed",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days (continue as maintenance)"
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
      "Alectinib": {
        "name": "Alectinib (ALEX) (ALK rearrangement)",
        "drugs": [
          {
            "name": "Alectinib",
            "dose": 600,
            "unit": "mg",
            "schedule": "PO twice daily continuously"
          }
        ]
      },
      "Brigatinib": {
        "name": "Brigatinib (ALTA-1L) (ALK rearrangement)",
        "drugs": [
          {
            "name": "Brigatinib",
            "dose": 180,
            "unit": "mg",
            "schedule": "PO once daily continuously (90mg daily x 7 days lead-in)"
          }
        ]
      },
      "Lorlatinib": {
        "name": "Lorlatinib (CROWN) (ALK rearrangement)",
        "drugs": [
          {
            "name": "Lorlatinib",
            "dose": 100,
            "unit": "mg",
            "schedule": "PO once daily continuously"
          }
        ]
      },
      "Crizotinib-ROS1": {
        "name": "Crizotinib (PROFILE 1001) (ROS1 rearrangement)",
        "drugs": [
          {
            "name": "Crizotinib",
            "dose": 250,
            "unit": "mg",
            "schedule": "PO twice daily continuously"
          }
        ]
      },
      "Entrectinib-ROS1": {
        "name": "Entrectinib (STARTRK-2) (ROS1 rearrangement)",
        "drugs": [
          {
            "name": "Entrectinib",
            "dose": 600,
            "unit": "mg",
            "schedule": "PO once daily continuously"
          }
        ]
      },
      "Repotrectinib-ROS1": {
        "name": "Repotrectinib (TRIDENT-1) (ROS1 rearrangement)",
        "drugs": [
          {
            "name": "Repotrectinib",
            "dose": 160,
            "unit": "mg",
            "schedule": "PO once daily x 14 days, then 160mg PO twice daily continuously"
          }
        ]
      },
      "Sotorasib": {
        "name": "Sotorasib (CodeBreaK 100) (KRAS G12C)",
        "drugs": [
          {
            "name": "Sotorasib",
            "dose": 960,
            "unit": "mg",
            "schedule": "PO once daily continuously"
          }
        ]
      },
      "Adagrasib": {
        "name": "Adagrasib (KRYSTAL-1) (KRAS G12C)",
        "drugs": [
          {
            "name": "Adagrasib",
            "dose": 600,
            "unit": "mg",
            "schedule": "PO twice daily continuously"
          }
        ]
      },
      "Dabrafenib-Trametinib": {
        "name": "Dabrafenib + Trametinib (BRF113928) (BRAF V600E)",
        "drugs": [
          {
            "name": "Dabrafenib",
            "dose": 150,
            "unit": "mg",
            "schedule": "PO twice daily continuously"
          },
          {
            "name": "Trametinib",
            "dose": 2,
            "unit": "mg",
            "schedule": "PO once daily continuously"
          }
        ]
      },
      "Capmatinib": {
        "name": "Capmatinib (GEOMETRY mono-1) (MET exon 14 skipping)",
        "drugs": [
          {
            "name": "Capmatinib",
            "dose": 400,
            "unit": "mg",
            "schedule": "PO twice daily continuously"
          }
        ]
      },
      "Tepotinib": {
        "name": "Tepotinib (VISION) (MET exon 14 skipping)",
        "drugs": [
          {
            "name": "Tepotinib",
            "dose": 450,
            "unit": "mg",
            "schedule": "PO once daily continuously"
          }
        ]
      },
      "Selpercatinib-RET": {
        "name": "Selpercatinib (LIBRETTO-001) (RET fusion+)",
        "drugs": [
          {
            "name": "Selpercatinib",
            "dose": 160,
            "unit": "mg",
            "schedule": "PO twice daily continuously"
          }
        ]
      },
      "Trastuzumab-Deruxtecan-HER2": {
        "name": "Trastuzumab deruxtecan (DESTINY-Lung02) (HER2 mutation+)",
        "drugs": [
          {
            "name": "Trastuzumab deruxtecan",
            "dose": 5.4,
            "unit": "mg/kg",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Entrectinib-NTRK": {
        "name": "Entrectinib (NTRK fusion+)",
        "drugs": [
          {
            "name": "Entrectinib",
            "dose": 600,
            "unit": "mg",
            "schedule": "PO once daily continuously"
          }
        ]
      },
      "Larotrectinib-NTRK": {
        "name": "Larotrectinib (NTRK fusion+)",
        "drugs": [
          {
            "name": "Larotrectinib",
            "dose": 100,
            "unit": "mg",
            "schedule": "PO twice daily continuously"
          }
        ]
      },
      "Nivolumab-2L": {
        "name": "Nivolumab monotherapy (CheckMate 017/057) (2nd line)",
        "drugs": [
          {
            "name": "Nivolumab",
            "dose": 240,
            "unit": "mg",
            "schedule": "D1, every 14 days or 480mg every 28 days"
          }
        ]
      },
      "Cisplatin-Pemetrexed": {
        "name": "Cisplatin + Pemetrexed (non-squamous)",
        "drugs": [
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4-6 cycles"
          },
          {
            "name": "Pemetrexed",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4-6 cycles then maintenance"
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
      "Carboplatin-Pemetrexed": {
        "name": "Carboplatin + Pemetrexed (non-squamous)",
        "drugs": [
          {
            "name": "Carboplatin",
            "dose": "AUC 5",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 4-6 cycles"
          },
          {
            "name": "Pemetrexed",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4-6 cycles then maintenance"
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
      "Carboplatin-Paclitaxel": {
        "name": "Carboplatin + Paclitaxel",
        "drugs": [
          {
            "name": "Carboplatin",
            "dose": "AUC 6",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 4-6 cycles"
          },
          {
            "name": "Paclitaxel",
            "dose": 200,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4-6 cycles"
          }
        ]
      },
      "Carboplatin-Gemcitabine": {
        "name": "Carboplatin + Gemcitabine (squamous)",
        "drugs": [
          {
            "name": "Carboplatin",
            "dose": "AUC 5",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 4-6 cycles"
          },
          {
            "name": "Gemcitabine",
            "dose": 1000,
            "unit": "mg/m²",
            "schedule": "D1,8, every 21 days x 4-6 cycles"
          }
        ]
      },
      "Docetaxel-Ramucirumab": {
        "name": "Docetaxel + Ramucirumab (REVEL) (2nd line)",
        "drugs": [
          {
            "name": "Docetaxel",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Ramucirumab",
            "dose": 10,
            "unit": "mg/kg",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Datopotamab-Deruxtecan-2L": {
        "name": "Datopotamab deruxtecan (TROPION-Lung01) (TROP2-directed ADC) (2nd line+, non-squamous)",
        "drugs": [
          {
            "name": "Datopotamab deruxtecan",
            "dose": 6,
            "unit": "mg/kg",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Tislelizumab-2L": {
        "name": "Tislelizumab (RATIONALE-303) (2nd/3rd line)",
        "drugs": [
          {
            "name": "Tislelizumab",
            "dose": 200,
            "unit": "mg",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Docetaxel-Monotherapy": {
        "name": "Docetaxel monotherapy (2nd line)",
        "drugs": [
          {
            "name": "Docetaxel",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Pemetrexed-Maintenance": {
        "name": "Pemetrexed maintenance (non-squamous)",
        "drugs": [
          {
            "name": "Pemetrexed",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days until progression"
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
      }
    }
  },
  "sclc": {
    "definitive": {
      "Cisplatin-Etoposide-CRT": {
        "name": "Cisplatin + Etoposide concurrent chemoRT (limited stage)",
        "cycles": 2,
        "drugs": [
          {
            "name": "Cisplatin",
            "dose": 50,
            "unit": "mg/m²",
            "schedule": "D1, D8, D29, D36 concurrent with RT"
          },
          {
            "name": "Etoposide",
            "dose": 50,
            "unit": "mg/m²",
            "schedule": "D1-5, D29-33 concurrent with RT"
          }
        ]
      },
      "Carboplatin-Etoposide-CRT": {
        "name": "Carboplatin + Etoposide concurrent chemoRT (cisplatin-ineligible, limited stage)",
        "cycles": 2,
        "drugs": [
          {
            "name": "Carboplatin",
            "dose": "AUC 5",
            "unit": "AUC",
            "schedule": "D1, D29 concurrent with RT"
          },
          {
            "name": "Etoposide",
            "dose": 50,
            "unit": "mg/m²",
            "schedule": "D1-5, D29-33 concurrent with RT"
          }
        ]
      },
      "Durvalumab-Consolidation": {
        "name": "Durvalumab (ADRIATIC) (post-CRT consolidation, limited stage)",
        "cycles": 24,
        "drugs": [
          {
            "name": "Durvalumab",
            "dose": 1500,
            "unit": "mg",
            "schedule": "D1, every 28 days for up to 2 years"
          }
        ]
      }
    },
    "metastatic": {
      "Atezolizumab-Carboplatin-Etoposide": {
        "name": "Atezolizumab + Carboplatin + Etoposide (IMpower133) (extensive stage 1L)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Atezolizumab",
            "dose": 1200,
            "unit": "mg",
            "schedule": "D1, every 21 days (continue as maintenance)"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Etoposide",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1-3, every 21 days x 4 cycles"
          }
        ]
      },
      "Durvalumab-Carboplatin-Etoposide": {
        "name": "Durvalumab + Carboplatin + Etoposide (CASPIAN) (extensive stage 1L)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Durvalumab",
            "dose": 1500,
            "unit": "mg",
            "schedule": "D1, every 21 days (continue as maintenance q4w)"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Etoposide",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1-3, every 21 days x 4 cycles"
          }
        ]
      },
      "Durvalumab-Cisplatin-Etoposide": {
        "name": "Durvalumab + Cisplatin + Etoposide (CASPIAN) (extensive stage 1L)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Durvalumab",
            "dose": 1500,
            "unit": "mg",
            "schedule": "D1, every 21 days (continue as maintenance q4w)"
          },
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Etoposide",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1-3, every 21 days x 4 cycles"
          }
        ]
      },
      "Durvalumab-Tremelimumab-Carboplatin-Etoposide": {
        "name": "Durvalumab + Tremelimumab + Carboplatin + Etoposide (CASPIAN) (extensive stage 1L)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Durvalumab",
            "dose": 1500,
            "unit": "mg",
            "schedule": "D1, every 21 days (continue as maintenance q4w)"
          },
          {
            "name": "Tremelimumab",
            "dose": 75,
            "unit": "mg",
            "schedule": "D1, every 21 days x 4 cycles only"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Etoposide",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1-3, every 21 days x 4 cycles"
          }
        ]
      },
      "Carboplatin-Etoposide": {
        "name": "Carboplatin + Etoposide (extensive stage)",
        "cycles": 4,
        "drugs": [
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
            "schedule": "D1-3, every 21 days"
          }
        ]
      },
      "Cisplatin-Etoposide": {
        "name": "Cisplatin + Etoposide (extensive stage)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Etoposide",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1-3, every 21 days"
          }
        ]
      },
      "Irinotecan-Cisplatin": {
        "name": "Irinotecan + Cisplatin (JCOG-9511) (extensive stage 1L)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Irinotecan",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1,8,15, every 28 days"
          },
          {
            "name": "Cisplatin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 28 days"
          }
        ]
      },
      "Tarlatamab": {
        "name": "Tarlatamab (DeLLphi-301) (DLL3-targeted BiTE) (2nd line+)",
        "drugs": [
          {
            "name": "Tarlatamab",
            "dose": 10,
            "unit": "mg",
            "schedule": "IV D1 (1mg step-up), D8 (10mg), then 10mg every 14 days"
          }
        ]
      },
      "Topotecan-IV": {
        "name": "Topotecan IV (2nd line+)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Topotecan",
            "dose": 1.5,
            "unit": "mg/m²",
            "schedule": "D1-5, every 21 days"
          }
        ]
      },
      "Topotecan-Oral": {
        "name": "Topotecan oral (2nd line+)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Topotecan",
            "dose": 2.3,
            "unit": "mg/m²",
            "schedule": "PO D1-5, every 21 days"
          }
        ]
      },
      "Lurbinectedin": {
        "name": "Lurbinectedin (2nd line+)",
        "drugs": [
          {
            "name": "Lurbinectedin",
            "dose": 3.2,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "CAV": {
        "name": "Cyclophosphamide + Doxorubicin + Vincristine (CAV) (2nd line+)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Cyclophosphamide",
            "dose": 1000,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Doxorubicin",
            "dose": 45,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Vincristine",
            "dose": 2,
            "unit": "mg",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Temozolomide": {
        "name": "Temozolomide (subsequent line)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Temozolomide",
            "dose": 150,
            "unit": "mg/m²",
            "schedule": "PO D1-5, every 28 days"
          }
        ]
      }
    }
  }
};
