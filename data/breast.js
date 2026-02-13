window.protocolData = window.protocolData || {};
window.protocolData.breast = {
  "hormone_positive": {
    "neoadjuvant": {
      "AC-T": {
        "name": "Doxorubicin + Cyclophosphamide → Paclitaxel (AC-T)",
        "cycles": 8,
        "drugs": [
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles (after 4 cycles AC)"
          }
        ]
      },
      "EC-T": {
        "name": "Epirubicin + Cyclophosphamide → Docetaxel (EC-T)",
        "cycles": 8,
        "drugs": [
          {
            "name": "Epirubicin",
            "dose": 90,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Docetaxel",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles (after 4 cycles EC)"
          }
        ]
      },
      "TAC": {
        "name": "Docetaxel + Doxorubicin + Cyclophosphamide (TAC) (BCIRG-001)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Docetaxel",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Doxorubicin",
            "dose": 50,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          }
        ]
      },
      "TC": {
        "name": "Docetaxel + Cyclophosphamide (TC) (USOR-06-090/TAILORx)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Docetaxel",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          }
        ]
      },
      "Dose-Dense-AC": {
        "name": "Dose Dense AC (ddAC) (CALGB-9741)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days x 4 cycles"
          }
        ]
      },
      "Dose-Dense-Paclitaxel": {
        "name": "Dose Dense Paclitaxel (sequential after ddAC)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days x 4 cycles (after 4 cycles ddAC)"
          }
        ]
      },
      "FEC-T": {
        "name": "5-Fluorouracil + Epirubicin + Cyclophosphamide → Docetaxel (FEC-T)",
        "cycles": 9,
        "drugs": [
          {
            "name": "5-Fluorouracil",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles"
          },
          {
            "name": "Epirubicin",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles"
          },
          {
            "name": "Docetaxel",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles (after 3 cycles 5-Fluorouracil + Epirubicin + Cyclophosphamide)"
          }
        ]
      },
      "CAF": {
        "name": "Cyclophosphamide + Doxorubicin + 5-Fluorouracil (CAF)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "5-Fluorouracil",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          }
        ]
      },
      "CMF": {
        "name": "Cyclophosphamide + Methotrexate + 5-Fluorouracil (CMF)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Methotrexate",
            "dose": 40,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "5-Fluorouracil",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          }
        ]
      },
      "Epirubicin-CMF": {
        "name": "Epirubicin → CMF (E-CMF) (NEAT/BR9601)",
        "cycles": 8,
        "drugs": [
          {
            "name": "Epirubicin",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, D8, every 28 days x 4 cycles (after 4 cycles Epirubicin)"
          },
          {
            "name": "Methotrexate",
            "dose": 40,
            "unit": "mg/m²",
            "schedule": "D1, D8, every 28 days x 4 cycles (after 4 cycles Epirubicin)"
          },
          {
            "name": "5-Fluorouracil",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, D8, every 28 days x 4 cycles (after 4 cycles Epirubicin)"
          }
        ]
      }
    },
    "adjuvant": {
      "AC-T": {
        "name": "Doxorubicin + Cyclophosphamide → Paclitaxel (AC-T)",
        "cycles": 8,
        "drugs": [
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles (after 4 cycles AC)"
          }
        ]
      },
      "EC-T": {
        "name": "Epirubicin + Cyclophosphamide → Docetaxel (EC-T)",
        "cycles": 8,
        "drugs": [
          {
            "name": "Epirubicin",
            "dose": 90,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Docetaxel",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles (after 4 cycles EC)"
          }
        ]
      },
      "TAC": {
        "name": "Docetaxel + Doxorubicin + Cyclophosphamide (TAC) (BCIRG-001)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Docetaxel",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Doxorubicin",
            "dose": 50,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          }
        ]
      },
      "TC": {
        "name": "Docetaxel + Cyclophosphamide (TC) (USOR-06-090/TAILORx)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Docetaxel",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          }
        ]
      },
      "Dose-Dense-AC": {
        "name": "Dose Dense AC (ddAC) (CALGB-9741)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days x 4 cycles"
          }
        ]
      },
      "Dose-Dense-Paclitaxel": {
        "name": "Dose Dense Paclitaxel (sequential after ddAC)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days x 4 cycles (after 4 cycles ddAC)"
          }
        ]
      },
      "FEC-T": {
        "name": "5-Fluorouracil + Epirubicin + Cyclophosphamide → Docetaxel (FEC-T)",
        "cycles": 9,
        "drugs": [
          {
            "name": "5-Fluorouracil",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles"
          },
          {
            "name": "Epirubicin",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles"
          },
          {
            "name": "Docetaxel",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles (after 3 cycles 5-Fluorouracil + Epirubicin + Cyclophosphamide)"
          }
        ]
      },
      "CAF": {
        "name": "Cyclophosphamide + Doxorubicin + 5-Fluorouracil (CAF)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "5-Fluorouracil",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          }
        ]
      },
      "CMF": {
        "name": "Cyclophosphamide + Methotrexate + 5-Fluorouracil (CMF)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Methotrexate",
            "dose": 40,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "5-Fluorouracil",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          }
        ]
      },
      "Epirubicin-CMF": {
        "name": "Epirubicin → CMF (E-CMF) (NEAT/BR9601)",
        "cycles": 8,
        "drugs": [
          {
            "name": "Epirubicin",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, D8, every 28 days x 4 cycles (after 4 cycles Epirubicin)"
          },
          {
            "name": "Methotrexate",
            "dose": 40,
            "unit": "mg/m²",
            "schedule": "D1, D8, every 28 days x 4 cycles (after 4 cycles Epirubicin)"
          },
          {
            "name": "5-Fluorouracil",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, D8, every 28 days x 4 cycles (after 4 cycles Epirubicin)"
          }
        ]
      },
      "Olaparib-Adjuvant": {
        "name": "Olaparib (PARP inhibitor) (OlympiA) (germline BRCA1/2 mutation)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Olaparib",
            "dose": 300,
            "unit": "mg",
            "schedule": "PO twice daily x 1 year"
          }
        ]
      },
      "Abemaciclib-Tamoxifen": {
        "name": "Abemaciclib + Tamoxifen (monarchE)",
        "cycles": 24,
        "drugs": [
          {
            "name": "Abemaciclib",
            "dose": 150,
            "unit": "mg",
            "schedule": "PO twice daily x 2 years"
          },
          {
            "name": "Tamoxifen",
            "dose": 20,
            "unit": "mg",
            "schedule": "PO once daily x 5-10 years"
          }
        ]
      },
      "Ribociclib-AI-Adjuvant": {
        "name": "Ribociclib + Anastrozole (NATALEE) (high-risk early breast cancer)",
        "cycles": 36,
        "drugs": [
          {
            "name": "Ribociclib",
            "dose": 400,
            "unit": "mg",
            "schedule": "PO once daily, D1-21, every 28 days x 3 years"
          },
          {
            "name": "Anastrozole",
            "dose": 1,
            "unit": "mg",
            "schedule": "PO once daily x 3 years"
          }
        ]
      },
      "Ribociclib-Letrozole-Adjuvant": {
        "name": "Ribociclib + Letrozole (NATALEE) (high-risk early breast cancer)",
        "cycles": 36,
        "drugs": [
          {
            "name": "Ribociclib",
            "dose": 400,
            "unit": "mg",
            "schedule": "PO once daily, D1-21, every 28 days x 3 years"
          },
          {
            "name": "Letrozole",
            "dose": 2.5,
            "unit": "mg",
            "schedule": "PO once daily x 3 years"
          }
        ]
      },
      "Paclitaxel-Weekly-Adjuvant": {
        "name": "Paclitaxel weekly (sequential after AC)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 80,
            "unit": "mg/m²",
            "schedule": "D1, every 7 days x 12 cycles (after 4 cycles AC)"
          }
        ]
      },
      "Tamoxifen": {
        "name": "Tamoxifen",
        "cycles": 60,
        "drugs": [
          {
            "name": "Tamoxifen",
            "dose": 20,
            "unit": "mg",
            "schedule": "PO once daily x 5-10 years"
          }
        ]
      },
      "Anastrozole": {
        "name": "Anastrozole",
        "cycles": 60,
        "drugs": [
          {
            "name": "Anastrozole",
            "dose": 1,
            "unit": "mg",
            "schedule": "PO once daily x 5 years"
          }
        ]
      },
      "Letrozole": {
        "name": "Letrozole",
        "cycles": 60,
        "drugs": [
          {
            "name": "Letrozole",
            "dose": 2.5,
            "unit": "mg",
            "schedule": "PO once daily x 5 years"
          }
        ]
      },
      "Tamoxifen-Exemestane": {
        "name": "Tamoxifen → Exemestane",
        "cycles": 60,
        "drugs": [
          {
            "name": "Tamoxifen",
            "dose": 20,
            "unit": "mg",
            "schedule": "PO once daily for 2-3 years"
          },
          {
            "name": "Exemestane",
            "dose": 25,
            "unit": "mg",
            "schedule": "PO once daily for remaining 5 years"
          }
        ]
      },
      "Tamoxifen-Goserelin": {
        "name": "Tamoxifen + Goserelin (Premenopausal)",
        "cycles": 60,
        "drugs": [
          {
            "name": "Tamoxifen",
            "dose": 20,
            "unit": "mg",
            "schedule": "PO once daily x 5 years"
          },
          {
            "name": "Goserelin",
            "dose": 3.6,
            "unit": "mg",
            "schedule": "SC D1, every 28 days x 5 years"
          }
        ]
      },
      "Anastrozole-Goserelin": {
        "name": "Anastrozole + Goserelin (Premenopausal)",
        "cycles": 60,
        "drugs": [
          {
            "name": "Anastrozole",
            "dose": 1,
            "unit": "mg",
            "schedule": "PO once daily x 5 years"
          },
          {
            "name": "Goserelin",
            "dose": 3.6,
            "unit": "mg",
            "schedule": "SC D1, every 28 days x 5 years"
          }
        ]
      }
    },
    "metastatic": {
      "Tamoxifen": {
        "name": "Tamoxifen",
        "cycles": 60,
        "drugs": [
          {
            "name": "Tamoxifen",
            "dose": 20,
            "unit": "mg",
            "schedule": "PO once daily"
          }
        ]
      },
      "Anastrozole": {
        "name": "Anastrozole",
        "cycles": 60,
        "drugs": [
          {
            "name": "Anastrozole",
            "dose": 1,
            "unit": "mg",
            "schedule": "PO once daily"
          }
        ]
      },
      "Letrozole": {
        "name": "Letrozole",
        "cycles": 60,
        "drugs": [
          {
            "name": "Letrozole",
            "dose": 2.5,
            "unit": "mg",
            "schedule": "PO once daily"
          }
        ]
      },
      "Tamoxifen-Goserelin": {
        "name": "Tamoxifen + Goserelin (Premenopausal)",
        "cycles": 60,
        "drugs": [
          {
            "name": "Tamoxifen",
            "dose": 20,
            "unit": "mg",
            "schedule": "PO once daily"
          },
          {
            "name": "Goserelin",
            "dose": 3.6,
            "unit": "mg",
            "schedule": "SC D1, every 28 days"
          }
        ]
      },
      "Anastrozole-Goserelin": {
        "name": "Anastrozole + Goserelin (Premenopausal)",
        "cycles": 60,
        "drugs": [
          {
            "name": "Anastrozole",
            "dose": 1,
            "unit": "mg",
            "schedule": "PO once daily"
          },
          {
            "name": "Goserelin",
            "dose": 3.6,
            "unit": "mg",
            "schedule": "SC D1, every 28 days"
          }
        ]
      },
      "Palbociclib-Letrozole": {
        "name": "Palbociclib + Letrozole (PALOMA-1/2)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Palbociclib",
            "dose": 125,
            "unit": "mg",
            "schedule": "PO once daily D1-21, every 28 days"
          },
          {
            "name": "Letrozole",
            "dose": 2.5,
            "unit": "mg",
            "schedule": "PO once daily"
          }
        ]
      },
      "Ribociclib-Letrozole": {
        "name": "Ribociclib + Letrozole (MONALEESA-2)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Ribociclib",
            "dose": 600,
            "unit": "mg",
            "schedule": "PO once daily D1-21, every 28 days"
          },
          {
            "name": "Letrozole",
            "dose": 2.5,
            "unit": "mg",
            "schedule": "PO once daily"
          }
        ]
      },
      "Abemaciclib-Letrozole": {
        "name": "Abemaciclib + Letrozole (MONARCH-3)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Abemaciclib",
            "dose": 150,
            "unit": "mg",
            "schedule": "PO twice daily"
          },
          {
            "name": "Letrozole",
            "dose": 2.5,
            "unit": "mg",
            "schedule": "PO once daily"
          }
        ]
      },
      "Palbociclib-Fulvestrant": {
        "name": "Palbociclib + Fulvestrant (PALOMA-3)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Palbociclib",
            "dose": 125,
            "unit": "mg",
            "schedule": "PO once daily D1-21, every 28 days"
          },
          {
            "name": "Fulvestrant",
            "dose": 500,
            "unit": "mg",
            "schedule": "IM D1, every 28 days"
          }
        ]
      },
      "Ribociclib-Fulvestrant": {
        "name": "Ribociclib + Fulvestrant (MONALEESA-3)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Ribociclib",
            "dose": 600,
            "unit": "mg",
            "schedule": "PO once daily D1-21, every 28 days"
          },
          {
            "name": "Fulvestrant",
            "dose": 500,
            "unit": "mg",
            "schedule": "IM D1, every 28 days"
          }
        ]
      },
      "Abemaciclib-Fulvestrant": {
        "name": "Abemaciclib + Fulvestrant (MONARCH-2)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Abemaciclib",
            "dose": 150,
            "unit": "mg",
            "schedule": "PO twice daily"
          },
          {
            "name": "Fulvestrant",
            "dose": 500,
            "unit": "mg",
            "schedule": "IM D1, every 28 days"
          }
        ]
      },
      "Everolimus-Exemestane": {
        "name": "Everolimus + Exemestane (BOLERO-2)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Everolimus",
            "dose": 10,
            "unit": "mg",
            "schedule": "PO once daily"
          },
          {
            "name": "Exemestane",
            "dose": 25,
            "unit": "mg",
            "schedule": "PO once daily"
          }
        ]
      },
      "Alpelisib-Fulvestrant": {
        "name": "Alpelisib + Fulvestrant (SOLAR-1) (PIK3CA mutation)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Alpelisib",
            "dose": 300,
            "unit": "mg",
            "schedule": "PO once daily"
          },
          {
            "name": "Fulvestrant",
            "dose": 500,
            "unit": "mg",
            "schedule": "IM D1, every 28 days"
          }
        ]
      },
      "Elacestrant": {
        "name": "Elacestrant (EMERALD) (ESR1 mutation)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Elacestrant",
            "dose": 345,
            "unit": "mg",
            "schedule": "PO once daily"
          }
        ]
      },
      "Inavolisib-Palbociclib-Fulvestrant": {
        "name": "Inavolisib + Palbociclib + Fulvestrant (INAVO120) (PIK3CA mutation)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Inavolisib",
            "dose": 9,
            "unit": "mg",
            "schedule": "PO once daily"
          },
          {
            "name": "Palbociclib",
            "dose": 125,
            "unit": "mg",
            "schedule": "PO once daily D1-21, every 28 days"
          },
          {
            "name": "Fulvestrant",
            "dose": 500,
            "unit": "mg",
            "schedule": "IM D1, every 28 days"
          }
        ]
      },
      "Capivasertib-Fulvestrant": {
        "name": "Capivasertib + Fulvestrant (CAPItello-291) (AKT1/PIK3CA/PTEN alteration)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Capivasertib",
            "dose": 400,
            "unit": "mg",
            "schedule": "PO twice daily D1-4, then 3 days off, every 7 days"
          },
          {
            "name": "Fulvestrant",
            "dose": 500,
            "unit": "mg",
            "schedule": "IM D1, every 28 days"
          }
        ]
      },
      "Paclitaxel-Carboplatin-3weekly": {
        "name": "Paclitaxel + Carboplatin (PC) (3-weekly)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5-6",
            "unit": "AUC",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Nab-Paclitaxel-Carboplatin-3weekly": {
        "name": "Nab-paclitaxel + Carboplatin (3-weekly)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Nab-paclitaxel",
            "dose": 260,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5-6",
            "unit": "AUC",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Nab-Paclitaxel-Carboplatin-weekly": {
        "name": "Nab-paclitaxel + Carboplatin (weekly)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Nab-paclitaxel",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 7 days"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 2",
            "unit": "AUC",
            "schedule": "D1, every 7 days"
          }
        ]
      },
      "Gemcitabine-Carboplatin": {
        "name": "Gemcitabine + Carboplatin",
        "cycles": 6,
        "drugs": [
          {
            "name": "Gemcitabine",
            "dose": 1000,
            "unit": "mg/m²",
            "schedule": "D1, D8, every 21 days"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 2",
            "unit": "AUC",
            "schedule": "D1, D8, every 21 days"
          }
        ]
      },
      "Paclitaxel-Carboplatin-weekly": {
        "name": "Paclitaxel + Carboplatin (PC) (weekly)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 80,
            "unit": "mg/m²",
            "schedule": "D1, every 7 days"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 2",
            "unit": "AUC",
            "schedule": "D1, every 7 days"
          }
        ]
      },
      "Capecitabine-Docetaxel": {
        "name": "Capecitabine + Docetaxel",
        "cycles": 6,
        "drugs": [
          {
            "name": "Capecitabine",
            "dose": 1250,
            "unit": "mg/m²",
            "schedule": "PO twice daily D1-14, every 21 days"
          },
          {
            "name": "Docetaxel",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Capecitabine-Paclitaxel": {
        "name": "Capecitabine + Paclitaxel",
        "cycles": 6,
        "drugs": [
          {
            "name": "Capecitabine",
            "dose": 1000,
            "unit": "mg/m²",
            "schedule": "PO twice daily D1-14, every 21 days"
          },
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Single-Paclitaxel-3weekly": {
        "name": "Paclitaxel 3-weekly monotherapy",
        "cycles": 6,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Single-Paclitaxel-weekly": {
        "name": "Paclitaxel weekly monotherapy",
        "cycles": 12,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 80,
            "unit": "mg/m²",
            "schedule": "D1, every 7 days"
          }
        ]
      },
      "Docetaxel": {
        "name": "Docetaxel",
        "cycles": 6,
        "drugs": [
          {
            "name": "Docetaxel",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Single-Capecitabine": {
        "name": "Capecitabine",
        "cycles": 6,
        "drugs": [
          {
            "name": "Capecitabine",
            "dose": 1250,
            "unit": "mg/m²",
            "schedule": "PO twice daily D1-14, every 21 days"
          }
        ]
      },
      "Sacituzumab-Govitecan": {
        "name": "Sacituzumab Govitecan (TROPiCS-02)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Sacituzumab Govitecan",
            "dose": 10,
            "unit": "mg/kg",
            "schedule": "D1, D8, every 21 days"
          }
        ]
      },
      "Eribulin": {
        "name": "Eribulin (EMBRACE)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Eribulin",
            "dose": 1.4,
            "unit": "mg/m²",
            "schedule": "D1, D8, every 21 days"
          }
        ]
      },
      "Vinorelbine": {
        "name": "Vinorelbine",
        "cycles": 6,
        "drugs": [
          {
            "name": "Vinorelbine",
            "dose": 25,
            "unit": "mg/m²",
            "schedule": "D1, every 7 days"
          }
        ]
      },
      "Datopotamab-Deruxtecan": {
        "name": "Datopotamab Deruxtecan (TROPION-Breast01)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Datopotamab Deruxtecan",
            "dose": 6,
            "unit": "mg/kg",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Single-Gemcitabine": {
        "name": "Gemcitabine",
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
      "Single-Doxorubicin": {
        "name": "Doxorubicin",
        "cycles": 6,
        "drugs": [
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "PLD": {
        "name": "Pegylated Liposomal Doxorubicin (PLD)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Pegylated Liposomal Doxorubicin",
            "dose": 50,
            "unit": "mg/m²",
            "schedule": "D1, every 28 days"
          }
        ]
      },
      "Imlunestrant": {
        "name": "Imlunestrant (EMBER-3) (oral SERD) (ESR1-mutated)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Imlunestrant",
            "dose": 400,
            "unit": "mg",
            "schedule": "PO once daily until progression",
            "isOralTargeted": true
          }
        ]
      }
    }
  },
  "triple_negative": {
    "neoadjuvant": {
      "Paclitaxel-Carboplatin-Pembrolizumab": {
        "name": "Paclitaxel + Carboplatin + Pembrolizumab (KEYNOTE-522) (Phase 1)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 80,
            "unit": "mg/m²",
            "schedule": "D1, D8, D15, every 21 days x 4 cycles"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Pembrolizumab",
            "dose": 200,
            "unit": "mg",
            "schedule": "D1, every 21 days x 4 cycles"
          }
        ]
      },
      "AC-Pembrolizumab": {
        "name": "Doxorubicin + Cyclophosphamide + Pembrolizumab (KEYNOTE-522) (Phase 2)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Pembrolizumab",
            "dose": 200,
            "unit": "mg",
            "schedule": "D1, every 21 days x 4 cycles"
          }
        ]
      },
      "EC-Pembrolizumab": {
        "name": "Epirubicin + Cyclophosphamide + Pembrolizumab (KEYNOTE-522) (Phase 2 variant)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Epirubicin",
            "dose": 90,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Pembrolizumab",
            "dose": 200,
            "unit": "mg",
            "schedule": "D1, every 21 days x 4 cycles"
          }
        ]
      },
      "Paclitaxel-Carboplatin-AC": {
        "name": "Paclitaxel + Carboplatin → AC (BrighTNess) (non-IO candidate)",
        "cycles": 8,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 80,
            "unit": "mg/m²",
            "schedule": "D1, D8, D15, every 21 days x 4 cycles"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 6",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles (after 4 cycles Paclitaxel+Carboplatin)"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles (after 4 cycles Paclitaxel+Carboplatin)"
          }
        ]
      },
      "AC-T": {
        "name": "Doxorubicin + Cyclophosphamide → Paclitaxel (AC-T)",
        "cycles": 8,
        "drugs": [
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles (after 4 cycles AC)"
          }
        ]
      },
      "TAC": {
        "name": "Docetaxel + Doxorubicin + Cyclophosphamide (TAC) (BCIRG-001)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Docetaxel",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Doxorubicin",
            "dose": 50,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          }
        ]
      },
      "Dose-Dense-AC": {
        "name": "Dose Dense AC (ddAC) (CALGB-9741)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days x 4 cycles"
          }
        ]
      },
      "Dose-Dense-Paclitaxel": {
        "name": "Dose Dense Paclitaxel (sequential after ddAC)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days x 4 cycles (after 4 cycles ddAC)"
          }
        ]
      },
      "TC": {
        "name": "Docetaxel + Cyclophosphamide (TC)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Docetaxel",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          }
        ]
      },
      "EC-T": {
        "name": "Epirubicin + Cyclophosphamide → Docetaxel (EC-T)",
        "cycles": 8,
        "drugs": [
          {
            "name": "Epirubicin",
            "dose": 90,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Docetaxel",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles (after 4 cycles EC)"
          }
        ]
      },
      "FEC-T": {
        "name": "5-Fluorouracil + Epirubicin + Cyclophosphamide → Docetaxel (FEC-T)",
        "cycles": 6,
        "drugs": [
          {
            "name": "5-Fluorouracil",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles"
          },
          {
            "name": "Epirubicin",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles"
          },
          {
            "name": "Docetaxel",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles (after 3 cycles FEC)"
          }
        ]
      },
      "CAF": {
        "name": "Cyclophosphamide + Doxorubicin + 5-Fluorouracil (CAF)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "5-Fluorouracil",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          }
        ]
      },
      "CMF": {
        "name": "Cyclophosphamide + Methotrexate + 5-Fluorouracil (CMF)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Methotrexate",
            "dose": 40,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "5-Fluorouracil",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          }
        ]
      }
    },
    "adjuvant": {
      "Pembrolizumab-Maintenance": {
        "name": "Pembrolizumab Maintenance (KEYNOTE-522)",
        "cycles": 9,
        "drugs": [
          {
            "name": "Pembrolizumab",
            "dose": 200,
            "unit": "mg",
            "schedule": "D1, every 21 days x 9 cycles"
          }
        ]
      },
      "Capecitabine-Adjuvant": {
        "name": "Capecitabine (CREATE-X) (residual disease post-neoadjuvant)",
        "cycles": 8,
        "drugs": [
          {
            "name": "Capecitabine",
            "dose": 1250,
            "unit": "mg/m²",
            "schedule": "PO twice daily D1-14, every 21 days x 6-8 cycles"
          }
        ]
      },
      "Olaparib-Adjuvant": {
        "name": "Olaparib (OlympiA) (germline BRCA1/2 mutation, residual disease)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Olaparib",
            "dose": 300,
            "unit": "mg",
            "schedule": "PO twice daily x 1 year"
          }
        ]
      },
      "AC-T": {
        "name": "Doxorubicin + Cyclophosphamide → Paclitaxel (AC-T)",
        "cycles": 8,
        "drugs": [
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles (after 4 cycles AC)"
          }
        ]
      },
      "TAC": {
        "name": "Docetaxel + Doxorubicin + Cyclophosphamide (TAC) (BCIRG-001)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Docetaxel",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Doxorubicin",
            "dose": 50,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          }
        ]
      },
      "Dose-Dense-AC": {
        "name": "Dose Dense AC (ddAC) (CALGB-9741)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days x 4 cycles"
          }
        ]
      },
      "Dose-Dense-Paclitaxel": {
        "name": "Dose Dense Paclitaxel (sequential after ddAC)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days x 4 cycles (after 4 cycles ddAC)"
          }
        ]
      },
      "TC": {
        "name": "Docetaxel + Cyclophosphamide (TC)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Docetaxel",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          }
        ]
      },
      "EC-T": {
        "name": "Epirubicin + Cyclophosphamide → Docetaxel (EC-T)",
        "cycles": 8,
        "drugs": [
          {
            "name": "Epirubicin",
            "dose": 90,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Docetaxel",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles (after 4 cycles EC)"
          }
        ]
      },
      "FEC-T": {
        "name": "5-Fluorouracil + Epirubicin + Cyclophosphamide → Docetaxel (FEC-T)",
        "cycles": 6,
        "drugs": [
          {
            "name": "5-Fluorouracil",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles"
          },
          {
            "name": "Epirubicin",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles"
          },
          {
            "name": "Docetaxel",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles (after 3 cycles FEC)"
          }
        ]
      },
      "CAF": {
        "name": "Cyclophosphamide + Doxorubicin + 5-Fluorouracil (CAF)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "5-Fluorouracil",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          }
        ]
      },
      "CMF": {
        "name": "Cyclophosphamide + Methotrexate + 5-Fluorouracil (CMF)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Methotrexate",
            "dose": 40,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "5-Fluorouracil",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          }
        ]
      },
      "Paclitaxel-Weekly-Adjuvant": {
        "name": "Paclitaxel weekly (sequential after AC)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 80,
            "unit": "mg/m²",
            "schedule": "D1, every 7 days x 12 cycles (after 4 cycles AC)"
          }
        ]
      }
    },
    "metastatic": {
      "Pembrolizumab-Nab-Paclitaxel": {
        "name": "Pembrolizumab + Nab-paclitaxel (KEYNOTE-355) (PD-L1 CPS ≥10)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Pembrolizumab",
            "dose": 200,
            "unit": "mg",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Nab-paclitaxel",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, D8, D15, every 28 days"
          }
        ]
      },
      "Pembrolizumab-Paclitaxel": {
        "name": "Pembrolizumab + Paclitaxel (KEYNOTE-355) (PD-L1 CPS ≥10)",
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
            "dose": 90,
            "unit": "mg/m²",
            "schedule": "D1, D8, D15, every 28 days"
          }
        ]
      },
      "Pembrolizumab-Gemcitabine-Carboplatin": {
        "name": "Pembrolizumab + Gemcitabine + Carboplatin (KEYNOTE-355) (PD-L1 CPS ≥10)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Pembrolizumab",
            "dose": 200,
            "unit": "mg",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Gemcitabine",
            "dose": 1000,
            "unit": "mg/m²",
            "schedule": "D1, D8, every 21 days"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 2",
            "unit": "AUC",
            "schedule": "D1, D8, every 21 days"
          }
        ]
      },
      "Sacituzumab-Govitecan-Pembrolizumab": {
        "name": "Sacituzumab Govitecan + Pembrolizumab (ASCENT-04) (PD-L1 CPS ≥10)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Sacituzumab Govitecan",
            "dose": 10,
            "unit": "mg/kg",
            "schedule": "D1, D8, every 21 days"
          },
          {
            "name": "Pembrolizumab",
            "dose": 200,
            "unit": "mg",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Sacituzumab-Govitecan": {
        "name": "Sacituzumab Govitecan (ASCENT/ASCENT-03) (NCCN Preferred)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Sacituzumab Govitecan",
            "dose": 10,
            "unit": "mg/kg",
            "schedule": "D1, D8, every 21 days"
          }
        ]
      },
      "Olaparib-BRCA": {
        "name": "Olaparib (OlympiAD) (germline BRCA1/2 mutation)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Olaparib",
            "dose": 300,
            "unit": "mg",
            "schedule": "PO twice daily"
          }
        ]
      },
      "Talazoparib-BRCA": {
        "name": "Talazoparib (EMBRACA) (germline BRCA1/2 mutation)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Talazoparib",
            "dose": 1,
            "unit": "mg",
            "schedule": "PO once daily"
          }
        ]
      },
      "Trastuzumab-Deruxtecan-HER2low": {
        "name": "Trastuzumab Deruxtecan (DESTINY-Breast04) (HER2-low)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Trastuzumab Deruxtecan",
            "dose": 5.4,
            "unit": "mg/kg",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Datopotamab-Deruxtecan": {
        "name": "Datopotamab Deruxtecan (TROPION-Breast02)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Datopotamab Deruxtecan",
            "dose": 6,
            "unit": "mg/kg",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Paclitaxel-Carboplatin-3weekly": {
        "name": "Paclitaxel + Carboplatin (PC) (3-weekly)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5-6",
            "unit": "AUC",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Paclitaxel-Carboplatin-weekly": {
        "name": "Paclitaxel + Carboplatin (PC) (weekly)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 80,
            "unit": "mg/m²",
            "schedule": "D1, every 7 days"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 2",
            "unit": "AUC",
            "schedule": "D1, every 7 days"
          }
        ]
      },
      "Nab-Paclitaxel-Carboplatin-3weekly": {
        "name": "Nab-paclitaxel + Carboplatin (3-weekly)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Nab-paclitaxel",
            "dose": 260,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5-6",
            "unit": "AUC",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Nab-Paclitaxel-Carboplatin-weekly": {
        "name": "Nab-paclitaxel + Carboplatin (weekly)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Nab-paclitaxel",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 7 days"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 2",
            "unit": "AUC",
            "schedule": "D1, every 7 days"
          }
        ]
      },
      "Gemcitabine-Carboplatin": {
        "name": "Gemcitabine + Carboplatin",
        "cycles": 6,
        "drugs": [
          {
            "name": "Gemcitabine",
            "dose": 1000,
            "unit": "mg/m²",
            "schedule": "D1, D8, every 21 days"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 2",
            "unit": "AUC",
            "schedule": "D1, D8, every 21 days"
          }
        ]
      },
      "Carboplatin-Docetaxel": {
        "name": "Carboplatin + Docetaxel",
        "cycles": 6,
        "drugs": [
          {
            "name": "Carboplatin",
            "dose": "AUC 5-6",
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
      "Gemcitabine-Paclitaxel": {
        "name": "Gemcitabine + Paclitaxel",
        "cycles": 6,
        "drugs": [
          {
            "name": "Gemcitabine",
            "dose": 1000,
            "unit": "mg/m²",
            "schedule": "D1, D8, every 21 days"
          },
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Gemcitabine-Capecitabine": {
        "name": "Gemcitabine + Capecitabine",
        "cycles": 6,
        "drugs": [
          {
            "name": "Gemcitabine",
            "dose": 1000,
            "unit": "mg/m²",
            "schedule": "D1, D8, every 21 days"
          },
          {
            "name": "Capecitabine",
            "dose": 1250,
            "unit": "mg/m²",
            "schedule": "PO twice daily D1-14, every 21 days"
          }
        ]
      },
      "Capecitabine-Docetaxel": {
        "name": "Capecitabine + Docetaxel",
        "cycles": 6,
        "drugs": [
          {
            "name": "Capecitabine",
            "dose": 1250,
            "unit": "mg/m²",
            "schedule": "PO twice daily D1-14, every 21 days"
          },
          {
            "name": "Docetaxel",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Capecitabine-Paclitaxel": {
        "name": "Capecitabine + Paclitaxel",
        "cycles": 6,
        "drugs": [
          {
            "name": "Capecitabine",
            "dose": 1000,
            "unit": "mg/m²",
            "schedule": "PO twice daily D1-14, every 21 days"
          },
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Capecitabine-Vinorelbine": {
        "name": "Capecitabine + Vinorelbine",
        "cycles": 6,
        "drugs": [
          {
            "name": "Capecitabine",
            "dose": 1000,
            "unit": "mg/m²",
            "schedule": "PO twice daily D1-14, every 21 days"
          },
          {
            "name": "Vinorelbine",
            "dose": 25,
            "unit": "mg/m²",
            "schedule": "D1, D8, every 21 days"
          }
        ]
      },
      "Capecitabine-Ixabepilone": {
        "name": "Capecitabine + Ixabepilone",
        "cycles": 6,
        "drugs": [
          {
            "name": "Capecitabine",
            "dose": 1000,
            "unit": "mg/m²",
            "schedule": "PO twice daily D1-14, every 21 days"
          },
          {
            "name": "Ixabepilone",
            "dose": 40,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Doxorubicin-Paclitaxel": {
        "name": "Doxorubicin + Paclitaxel",
        "cycles": 6,
        "drugs": [
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
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
      "Docetaxel-Doxorubicin": {
        "name": "Docetaxel + Doxorubicin",
        "cycles": 6,
        "drugs": [
          {
            "name": "Docetaxel",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Doxorubicin",
            "dose": 50,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Single-Paclitaxel-3weekly": {
        "name": "Paclitaxel monotherapy (3-weekly)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Single-Paclitaxel-weekly": {
        "name": "Paclitaxel monotherapy (weekly)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 80,
            "unit": "mg/m²",
            "schedule": "D1, every 7 days"
          }
        ]
      },
      "Single-Nab-Paclitaxel-3weekly": {
        "name": "Nab-paclitaxel monotherapy (3-weekly)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Nab-paclitaxel",
            "dose": 260,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Single-Nab-Paclitaxel-weekly": {
        "name": "Nab-paclitaxel monotherapy (weekly)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Nab-paclitaxel",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 7 days"
          }
        ]
      },
      "Docetaxel": {
        "name": "Docetaxel monotherapy",
        "cycles": 6,
        "drugs": [
          {
            "name": "Docetaxel",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Eribulin": {
        "name": "Eribulin (EMBRACE)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Eribulin",
            "dose": 1.4,
            "unit": "mg/m²",
            "schedule": "D1, D8, every 21 days"
          }
        ]
      },
      "Single-Capecitabine": {
        "name": "Capecitabine monotherapy",
        "cycles": 6,
        "drugs": [
          {
            "name": "Capecitabine",
            "dose": 1250,
            "unit": "mg/m²",
            "schedule": "PO twice daily D1-14, every 21 days"
          }
        ]
      },
      "Single-Vinorelbine": {
        "name": "Vinorelbine monotherapy",
        "cycles": 6,
        "drugs": [
          {
            "name": "Vinorelbine",
            "dose": 25,
            "unit": "mg/m²",
            "schedule": "D1, D8, D15, every 28 days"
          }
        ]
      },
      "Single-Gemcitabine": {
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
      "Single-Doxorubicin": {
        "name": "Doxorubicin monotherapy",
        "cycles": 6,
        "drugs": [
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "PLD": {
        "name": "Pegylated Liposomal Doxorubicin (PLD)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Pegylated Liposomal Doxorubicin",
            "dose": 50,
            "unit": "mg/m²",
            "schedule": "D1, every 28 days"
          }
        ]
      },
      "Ixabepilone-Monotherapy": {
        "name": "Ixabepilone monotherapy",
        "cycles": 6,
        "drugs": [
          {
            "name": "Ixabepilone",
            "dose": 40,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Cisplatin-Monotherapy": {
        "name": "Cisplatin monotherapy",
        "cycles": 6,
        "drugs": [
          {
            "name": "Cisplatin",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Carboplatin-Monotherapy": {
        "name": "Carboplatin monotherapy",
        "cycles": 6,
        "drugs": [
          {
            "name": "Carboplatin",
            "dose": "AUC 6",
            "unit": "AUC",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Pembrolizumab-MSI-H": {
        "name": "Pembrolizumab (KEYNOTE-158) (MSI-H/dMMR)",
        "cycles": 24,
        "drugs": [
          {
            "name": "Pembrolizumab",
            "dose": 200,
            "unit": "mg",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Pembrolizumab-TMB-H": {
        "name": "Pembrolizumab (KEYNOTE-158) (TMB-H ≥10 mut/Mb)",
        "cycles": 24,
        "drugs": [
          {
            "name": "Pembrolizumab",
            "dose": 200,
            "unit": "mg",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Dostarlimab-dMMR": {
        "name": "Dostarlimab (GARNET) (dMMR)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Dostarlimab",
            "dose": 500,
            "unit": "mg",
            "schedule": "D1, every 21 days x 4 cycles, then 1000 mg every 42 days"
          }
        ]
      },
      "Larotrectinib-NTRK": {
        "name": "Larotrectinib (NAVIGATE) (NTRK fusion+)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Larotrectinib",
            "dose": 100,
            "unit": "mg",
            "schedule": "PO twice daily"
          }
        ]
      },
      "Entrectinib-NTRK": {
        "name": "Entrectinib (STARTRK-2) (NTRK fusion+)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Entrectinib",
            "dose": 600,
            "unit": "mg",
            "schedule": "PO once daily"
          }
        ]
      }
    }
  },
  "her2_positive": {
    "neoadjuvant": {
      "TCHP": {
        "name": "Docetaxel + Carboplatin + Trastuzumab + Pertuzumab (TCHP) (TRYPHAENA) (NCCN Preferred)",
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
            "dose": "AUC 6",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days x 6 cycles",
            "hasLoadingDose": true
          },
          {
            "name": "Pertuzumab",
            "dose": 840,
            "maintenanceDose": 420,
            "unit": "mg",
            "schedule": "D1, 840 mg loading dose, then 420 mg D1, every 21 days x 6 cycles",
            "hasLoadingDose": true
          }
        ]
      },
      "AC-THP": {
        "name": "AC → Docetaxel + Trastuzumab + Pertuzumab (AC-THP) (TRYPHAENA) (NCCN Preferred)",
        "cycles": 8,
        "drugs": [
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Docetaxel",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles (after 4 cycles AC)"
          },
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days x 4 cycles (after 4 cycles AC)",
            "hasLoadingDose": true
          },
          {
            "name": "Pertuzumab",
            "dose": 840,
            "maintenanceDose": 420,
            "unit": "mg",
            "schedule": "D1, 840 mg loading dose, then 420 mg D1, every 21 days x 4 cycles (after 4 cycles AC)",
            "hasLoadingDose": true
          }
        ]
      },
      "FEC-THP": {
        "name": "FEC → Docetaxel + Trastuzumab + Pertuzumab (FEC-THP) (TRYPHAENA) (NCCN Preferred)",
        "cycles": 6,
        "drugs": [
          {
            "name": "5-Fluorouracil",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles"
          },
          {
            "name": "Epirubicin",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles"
          },
          {
            "name": "Docetaxel",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 3 cycles (after 3 cycles FEC)"
          },
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days x 3 cycles (after 3 cycles FEC)",
            "hasLoadingDose": true
          },
          {
            "name": "Pertuzumab",
            "dose": 840,
            "maintenanceDose": 420,
            "unit": "mg",
            "schedule": "D1, 840 mg loading dose, then 420 mg D1, every 21 days x 3 cycles (after 3 cycles FEC)",
            "hasLoadingDose": true
          }
        ]
      },
      "TCH": {
        "name": "Docetaxel + Carboplatin + Trastuzumab (TCH) (BCIRG-006)",
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
            "dose": "AUC 6",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days x 6 cycles",
            "hasLoadingDose": true
          }
        ]
      },
      "THP": {
        "name": "Docetaxel + Trastuzumab + Pertuzumab (THP) (NeoSphere)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Docetaxel",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days x 6 cycles",
            "hasLoadingDose": true
          },
          {
            "name": "Pertuzumab",
            "dose": 840,
            "maintenanceDose": 420,
            "unit": "mg",
            "schedule": "D1, 840 mg loading dose, then 420 mg D1, every 21 days x 6 cycles",
            "hasLoadingDose": true
          }
        ]
      },
      "PCHP": {
        "name": "Paclitaxel + Carboplatin + Trastuzumab + Pertuzumab (Pacli-CHP)",
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
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days x 6 cycles",
            "hasLoadingDose": true
          },
          {
            "name": "Pertuzumab",
            "dose": 840,
            "maintenanceDose": 420,
            "unit": "mg",
            "schedule": "D1, 840 mg loading dose, then 420 mg D1, every 21 days x 6 cycles",
            "hasLoadingDose": true
          }
        ]
      },
      "PCH": {
        "name": "Paclitaxel + Carboplatin + Trastuzumab (Pacli-CH)",
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
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days x 6 cycles",
            "hasLoadingDose": true
          }
        ]
      },
      "PHP": {
        "name": "Paclitaxel + Trastuzumab + Pertuzumab (Pacli-HP)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days x 6 cycles",
            "hasLoadingDose": true
          },
          {
            "name": "Pertuzumab",
            "dose": 840,
            "maintenanceDose": 420,
            "unit": "mg",
            "schedule": "D1, 840 mg loading dose, then 420 mg D1, every 21 days x 6 cycles",
            "hasLoadingDose": true
          }
        ]
      },
      "AC-TH": {
        "name": "AC → Paclitaxel + Trastuzumab (AC-TH) (NSABP-B31/N9831)",
        "cycles": 8,
        "drugs": [
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles (after 4 cycles AC)"
          },
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days x 4 cycles (starts with paclitaxel phase)",
            "hasLoadingDose": true
          }
        ]
      },
      "Dose-Dense-AC": {
        "name": "Dose Dense AC (ddAC) (CALGB-9741)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days x 4 cycles"
          }
        ]
      },
      "Dose-Dense-Paclitaxel-Trastuzumab": {
        "name": "Dose Dense Paclitaxel + Trastuzumab (CALGB-9741)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days x 4 cycles"
          },
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 14 days x 4 cycles",
            "hasLoadingDose": true
          }
        ]
      },
      "TC": {
        "name": "Docetaxel + Cyclophosphamide (TC)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Docetaxel",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          }
        ]
      },
      "FEC": {
        "name": "5-Fluorouracil + Epirubicin + Cyclophosphamide (FEC)",
        "cycles": 6,
        "drugs": [
          {
            "name": "5-Fluorouracil",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Epirubicin",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          }
        ]
      },
      "CAF": {
        "name": "Cyclophosphamide + Doxorubicin + 5-Fluorouracil (CAF)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "5-Fluorouracil",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          }
        ]
      },
      "CMF": {
        "name": "Cyclophosphamide + Methotrexate + 5-Fluorouracil (CMF)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Methotrexate",
            "dose": 40,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "5-Fluorouracil",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          }
        ]
      },
      "EC-T": {
        "name": "Epirubicin + Cyclophosphamide → Docetaxel (EC-T)",
        "cycles": 8,
        "drugs": [
          {
            "name": "Epirubicin",
            "dose": 90,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Docetaxel",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles (after 4 cycles EC)"
          }
        ]
      }
    },
    "adjuvant": {
      "TCHP": {
        "name": "Docetaxel + Carboplatin + Trastuzumab + Pertuzumab (TCHP) (TRYPHAENA) (NCCN Preferred)",
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
            "dose": "AUC 6",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days x 6 cycles, then complete 1 year",
            "hasLoadingDose": true
          },
          {
            "name": "Pertuzumab",
            "dose": 840,
            "maintenanceDose": 420,
            "unit": "mg",
            "schedule": "D1, 840 mg loading dose, then 420 mg D1, every 21 days x 6 cycles, then complete 1 year",
            "hasLoadingDose": true
          }
        ]
      },
      "AC-THP": {
        "name": "AC → Docetaxel + Trastuzumab + Pertuzumab (AC-THP) (APHINITY) (NCCN Preferred)",
        "cycles": 8,
        "drugs": [
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Docetaxel",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles (after 4 cycles AC)"
          },
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days, then complete 1 year",
            "hasLoadingDose": true
          },
          {
            "name": "Pertuzumab",
            "dose": 840,
            "maintenanceDose": 420,
            "unit": "mg",
            "schedule": "D1, 840 mg loading dose, then 420 mg D1, every 21 days, then complete 1 year",
            "hasLoadingDose": true
          }
        ]
      },
      "TCH": {
        "name": "Docetaxel + Carboplatin + Trastuzumab (TCH) (BCIRG-006) (NCCN Preferred)",
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
            "dose": "AUC 6",
            "unit": "AUC",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days x 6 cycles, then complete 1 year",
            "hasLoadingDose": true
          }
        ]
      },
      "AC-TH": {
        "name": "AC → Paclitaxel + Trastuzumab (AC-TH) (NSABP-B31/N9831) (NCCN Preferred)",
        "cycles": 8,
        "drugs": [
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles (after 4 cycles AC)"
          },
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days x 4 cycles (starts with paclitaxel), then complete 1 year",
            "hasLoadingDose": true
          }
        ]
      },
      "Paclitaxel-Trastuzumab-Weekly": {
        "name": "Paclitaxel weekly + Trastuzumab (APT) (NCCN Preferred) (small node-negative tumors)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 80,
            "unit": "mg/m²",
            "schedule": "D1, every 7 days x 12 weeks"
          },
          {
            "name": "Trastuzumab",
            "dose": 4,
            "maintenanceDose": 2,
            "unit": "mg/kg",
            "schedule": "D1, 4 mg/kg loading dose, then 2 mg/kg weekly x 12 weeks, then 6 mg/kg q3w to complete 1 year",
            "hasLoadingDose": true
          }
        ]
      },
      "Dose-Dense-AC": {
        "name": "Dose Dense AC (ddAC) (CALGB-9741)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days x 4 cycles"
          }
        ]
      },
      "Dose-Dense-Paclitaxel-Trastuzumab": {
        "name": "Dose Dense Paclitaxel + Trastuzumab (CALGB-9741)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 14 days x 4 cycles"
          },
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 14 days x 4 cycles",
            "hasLoadingDose": true
          }
        ]
      },
      "TC": {
        "name": "Docetaxel + Cyclophosphamide (TC)",
        "cycles": 4,
        "drugs": [
          {
            "name": "Docetaxel",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          }
        ]
      },
      "FEC": {
        "name": "5-Fluorouracil + Epirubicin + Cyclophosphamide (FEC)",
        "cycles": 6,
        "drugs": [
          {
            "name": "5-Fluorouracil",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Epirubicin",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 500,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          }
        ]
      },
      "CAF": {
        "name": "Cyclophosphamide + Doxorubicin + 5-Fluorouracil (CAF)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Doxorubicin",
            "dose": 60,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "5-Fluorouracil",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          }
        ]
      },
      "CMF": {
        "name": "Cyclophosphamide + Methotrexate + 5-Fluorouracil (CMF)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "Methotrexate",
            "dose": 40,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          },
          {
            "name": "5-Fluorouracil",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 6 cycles"
          }
        ]
      },
      "EC-T": {
        "name": "Epirubicin + Cyclophosphamide → Docetaxel (EC-T)",
        "cycles": 8,
        "drugs": [
          {
            "name": "Epirubicin",
            "dose": 90,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Cyclophosphamide",
            "dose": 600,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles"
          },
          {
            "name": "Docetaxel",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days x 4 cycles (after 4 cycles EC)"
          }
        ]
      },
      "Trastuzumab-Adjuvant": {
        "name": "Trastuzumab (HERA)",
        "cycles": 17,
        "drugs": [
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days x 1 year (17 cycles)",
            "hasLoadingDose": true
          }
        ]
      },
      "TDM1-KATHERINE": {
        "name": "Trastuzumab emtansine (T-DM1) (KATHERINE) (residual disease after neoadjuvant)",
        "cycles": 14,
        "drugs": [
          {
            "name": "Trastuzumab emtansine",
            "dose": 3.6,
            "unit": "mg/kg",
            "schedule": "D1, every 21 days x 14 cycles"
          }
        ]
      },
      "TDxd-DESTINY-Breast05": {
        "name": "Trastuzumab deruxtecan (T-DXd) (DESTINY-Breast05) (high-risk residual disease)",
        "cycles": 14,
        "drugs": [
          {
            "name": "Trastuzumab deruxtecan",
            "dose": 5.4,
            "unit": "mg/kg",
            "schedule": "D1, every 21 days x 14 cycles"
          }
        ]
      },
      "Neratinib-Extended": {
        "name": "Neratinib extended adjuvant (ExteNET) (HR+/HER2+, after completing trastuzumab)",
        "cycles": 12,
        "drugs": [
          {
            "name": "Neratinib",
            "dose": 240,
            "unit": "mg",
            "schedule": "PO once daily x 1 year"
          }
        ]
      }
    },
    "metastatic": {
      "Pertuzumab-Trastuzumab-Docetaxel": {
        "name": "Pertuzumab + Trastuzumab + Docetaxel (CLEOPATRA) (NCCN Preferred)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Pertuzumab",
            "dose": 840,
            "maintenanceDose": 420,
            "unit": "mg",
            "schedule": "D1, 840 mg loading dose, then 420 mg D1, every 21 days",
            "hasLoadingDose": true
          },
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days",
            "hasLoadingDose": true
          },
          {
            "name": "Docetaxel",
            "dose": 75,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Pertuzumab-Trastuzumab-Paclitaxel": {
        "name": "Pertuzumab + Trastuzumab + Paclitaxel (NCCN Other Recommended)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Pertuzumab",
            "dose": 840,
            "maintenanceDose": 420,
            "unit": "mg",
            "schedule": "D1, 840 mg loading dose, then 420 mg D1, every 21 days",
            "hasLoadingDose": true
          },
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days",
            "hasLoadingDose": true
          },
          {
            "name": "Paclitaxel",
            "dose": 80,
            "unit": "mg/m²",
            "schedule": "D1, D8, D15, every 21 days"
          }
        ]
      },
      "TDxd-Pertuzumab": {
        "name": "Trastuzumab deruxtecan + Pertuzumab (DESTINY-Breast09) (NCCN Preferred)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Trastuzumab deruxtecan",
            "dose": 5.4,
            "unit": "mg/kg",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Pertuzumab",
            "dose": 840,
            "maintenanceDose": 420,
            "unit": "mg",
            "schedule": "D1, 840 mg loading dose, then 420 mg D1, every 21 days",
            "hasLoadingDose": true
          }
        ]
      },
      "TDxd": {
        "name": "Trastuzumab deruxtecan (T-DXd) (DESTINY-Breast03) (NCCN Preferred 2nd-line)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Trastuzumab deruxtecan",
            "dose": 5.4,
            "unit": "mg/kg",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "TDM1": {
        "name": "Trastuzumab emtansine (T-DM1) (EMILIA) (NCCN Other Recommended)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Trastuzumab emtansine",
            "dose": 3.6,
            "unit": "mg/kg",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Trastuzumab-Paclitaxel": {
        "name": "Trastuzumab + Paclitaxel",
        "cycles": 6,
        "drugs": [
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days",
            "hasLoadingDose": true
          },
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Trastuzumab-Docetaxel": {
        "name": "Trastuzumab + Docetaxel (M77001)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days",
            "hasLoadingDose": true
          },
          {
            "name": "Docetaxel",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Tucatinib-Trastuzumab-Capecitabine": {
        "name": "Tucatinib + Trastuzumab + Capecitabine (HER2CLIMB) (NCCN Preferred)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Tucatinib",
            "dose": 300,
            "unit": "mg",
            "schedule": "PO twice daily"
          },
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days",
            "hasLoadingDose": true
          },
          {
            "name": "Capecitabine",
            "dose": 1000,
            "unit": "mg/m²",
            "schedule": "PO twice daily D1-14, every 21 days"
          }
        ]
      },
      "Tucatinib-TDM1": {
        "name": "Tucatinib + Trastuzumab emtansine (HER2CLIMB-02)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Tucatinib",
            "dose": 300,
            "unit": "mg",
            "schedule": "PO twice daily"
          },
          {
            "name": "Trastuzumab emtansine",
            "dose": 3.6,
            "unit": "mg/kg",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Capecitabine-Lapatinib": {
        "name": "Capecitabine + Lapatinib (EGF100151) (NCCN Other Recommended)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Capecitabine",
            "dose": 1000,
            "unit": "mg/m²",
            "schedule": "PO twice daily D1-14, every 21 days"
          },
          {
            "name": "Lapatinib",
            "dose": 1250,
            "unit": "mg",
            "schedule": "PO once daily"
          }
        ]
      },
      "Trastuzumab-Lapatinib": {
        "name": "Trastuzumab + Lapatinib (EGF104900)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days",
            "hasLoadingDose": true
          },
          {
            "name": "Lapatinib",
            "dose": 1000,
            "unit": "mg",
            "schedule": "PO once daily"
          }
        ]
      },
      "Trastuzumab-Vinorelbine": {
        "name": "Trastuzumab + Vinorelbine (NCCN Other Recommended)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Trastuzumab",
            "dose": 4,
            "maintenanceDose": 2,
            "unit": "mg/kg",
            "schedule": "D1, 4 mg/kg loading dose, then 2 mg/kg every 7 days",
            "hasLoadingDose": true
          },
          {
            "name": "Vinorelbine",
            "dose": 25,
            "unit": "mg/m²",
            "schedule": "D1, every 7 days"
          }
        ]
      },
      "Trastuzumab-Capecitabine": {
        "name": "Trastuzumab + Capecitabine",
        "cycles": 6,
        "drugs": [
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days",
            "hasLoadingDose": true
          },
          {
            "name": "Capecitabine",
            "dose": 1250,
            "unit": "mg/m²",
            "schedule": "PO twice daily D1-14, every 21 days"
          }
        ]
      },
      "Capecitabine-Neratinib": {
        "name": "Capecitabine + Neratinib (NALA)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Capecitabine",
            "dose": 750,
            "unit": "mg/m²",
            "schedule": "PO twice daily D1-14, every 21 days"
          },
          {
            "name": "Neratinib",
            "dose": 240,
            "unit": "mg",
            "schedule": "PO once daily"
          }
        ]
      },
      "Trastuzumab-Pertuzumab-Maintenance": {
        "name": "Trastuzumab + Pertuzumab maintenance (after completing chemo)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days",
            "hasLoadingDose": true
          },
          {
            "name": "Pertuzumab",
            "dose": 840,
            "maintenanceDose": 420,
            "unit": "mg",
            "schedule": "D1, 840 mg loading dose, then 420 mg D1, every 21 days",
            "hasLoadingDose": true
          }
        ]
      },
      "Paclitaxel-Carboplatin-3weekly": {
        "name": "Paclitaxel + Carboplatin (PC) (3-weekly)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 175,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5-6",
            "unit": "AUC",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Paclitaxel-Carboplatin-weekly": {
        "name": "Paclitaxel + Carboplatin (PC) (weekly)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Paclitaxel",
            "dose": 80,
            "unit": "mg/m²",
            "schedule": "D1, D8, D15, every 28 days"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 2",
            "unit": "AUC",
            "schedule": "D1, D8, D15, every 28 days"
          }
        ]
      },
      "Nab-Paclitaxel-Carboplatin-3weekly": {
        "name": "Nab-paclitaxel + Carboplatin (3 weekly)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Nab-paclitaxel",
            "dose": 260,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 5-6",
            "unit": "AUC",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Nab-Paclitaxel-Carboplatin-weekly": {
        "name": "Nab-paclitaxel + Carboplatin (weekly)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Nab-paclitaxel",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, D8, D15, every 28 days"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 2",
            "unit": "AUC",
            "schedule": "D1, D8, D15, every 28 days"
          }
        ]
      },
      "Gemcitabine-Carboplatin-Trastuzumab": {
        "name": "Gemcitabine + Carboplatin + Trastuzumab",
        "cycles": 6,
        "drugs": [
          {
            "name": "Gemcitabine",
            "dose": 1000,
            "unit": "mg/m²",
            "schedule": "D1, D8, every 21 days"
          },
          {
            "name": "Carboplatin",
            "dose": "AUC 2",
            "unit": "AUC",
            "schedule": "D1, D8, every 21 days"
          },
          {
            "name": "Trastuzumab",
            "dose": 8,
            "maintenanceDose": 6,
            "unit": "mg/kg",
            "schedule": "D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days",
            "hasLoadingDose": true
          }
        ]
      },
      "Margetuximab-Capecitabine": {
        "name": "Margetuximab + Capecitabine (SOPHIA)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Margetuximab",
            "dose": 15,
            "unit": "mg/kg",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Capecitabine",
            "dose": 1000,
            "unit": "mg/m²",
            "schedule": "PO twice daily D1-14, every 21 days"
          }
        ]
      },
      "Margetuximab-Eribulin": {
        "name": "Margetuximab + Eribulin (SOPHIA)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Margetuximab",
            "dose": 15,
            "unit": "mg/kg",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Eribulin",
            "dose": 1.4,
            "unit": "mg/m²",
            "schedule": "D1, D8, every 21 days"
          }
        ]
      },
      "Margetuximab-Vinorelbine": {
        "name": "Margetuximab + Vinorelbine (SOPHIA)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Margetuximab",
            "dose": 15,
            "unit": "mg/kg",
            "schedule": "D1, every 21 days"
          },
          {
            "name": "Vinorelbine",
            "dose": 25,
            "unit": "mg/m²",
            "schedule": "D1, D8, every 21 days"
          }
        ]
      },
      "Margetuximab-Gemcitabine": {
        "name": "Margetuximab + Gemcitabine (SOPHIA)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Margetuximab",
            "dose": 15,
            "unit": "mg/kg",
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
      "Single-Neratinib": {
        "name": "Neratinib monotherapy",
        "cycles": 6,
        "drugs": [
          {
            "name": "Neratinib",
            "dose": 240,
            "unit": "mg",
            "schedule": "PO once daily"
          }
        ]
      },
      "Single-Capecitabine": {
        "name": "Capecitabine monotherapy",
        "cycles": 6,
        "drugs": [
          {
            "name": "Capecitabine",
            "dose": 1250,
            "unit": "mg/m²",
            "schedule": "PO twice daily D1-14, every 21 days"
          }
        ]
      },
      "Single-Docetaxel": {
        "name": "Docetaxel monotherapy",
        "cycles": 6,
        "drugs": [
          {
            "name": "Docetaxel",
            "dose": 100,
            "unit": "mg/m²",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "Single-Eribulin": {
        "name": "Eribulin monotherapy (EMBRACE)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Eribulin",
            "dose": 1.4,
            "unit": "mg/m²",
            "schedule": "D1, D8, every 21 days"
          }
        ]
      },
      "Single-Vinorelbine": {
        "name": "Vinorelbine monotherapy",
        "cycles": 6,
        "drugs": [
          {
            "name": "Vinorelbine",
            "dose": 25,
            "unit": "mg/m²",
            "schedule": "D1, D8, D15, every 28 days"
          }
        ]
      }
    }
  },
  "her2_low_ultralow": {
    "neoadjuvant": {},
    "adjuvant": {},
    "metastatic": {
      "TDxd-DESTINY-Breast06": {
        "name": "Trastuzumab deruxtecan (T-DXd) (DESTINY-Breast06) (NCCN Preferred) (HR+, after endocrine therapy)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Trastuzumab deruxtecan",
            "dose": 5.4,
            "unit": "mg/kg",
            "schedule": "D1, every 21 days"
          }
        ]
      },
      "TDxd-DESTINY-Breast04": {
        "name": "Trastuzumab deruxtecan (T-DXd) (DESTINY-Breast04) (NCCN Preferred) (after prior chemotherapy)",
        "cycles": 6,
        "drugs": [
          {
            "name": "Trastuzumab deruxtecan",
            "dose": 5.4,
            "unit": "mg/kg",
            "schedule": "D1, every 21 days"
          }
        ]
      }
    }
  }
};
