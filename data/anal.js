window.protocolData = window.protocolData || {};
window.protocolData.anal = {
    "definitive": {
        "5FU-MMC-RT-RTOG": {
            "name": "5-FU + Mitomycin-C + RT",
            "cycles": 2,
            "drugs": [
                {
                    "name": "5-Fluorouracil",
                    "dose": 1000,
                    "unit": "mg/m²",
                    "schedule": "CI D1-D4 and D29-D32"
                },
                {
                    "name": "Mitomycin-C",
                    "dose": 10,
                    "unit": "mg/m²",
                    "schedule": "D1, D29"
                }
            ]
        },
        "5FU-Cisplatin-RT": {
            "name": "5-FU + Cisplatin + RT",
            "cycles": 2,
            "drugs": [
                {
                    "name": "5-Fluorouracil",
                    "dose": 1000,
                    "unit": "mg/m²",
                    "schedule": "CI D1-D4 and D29-D32"
                },
                {
                    "name": "Cisplatin",
                    "dose": 75,
                    "unit": "mg/m²",
                    "schedule": "D1, D29"
                }
            ]
        },
        "Capecitabine-MMC-RT": {
            "name": "Capecitabine + Mitomycin-C + RT",
            "cycles": 2,
            "drugs": [
                {
                    "name": "Capecitabine",
                    "dose": 825,
                    "unit": "mg/m²",
                    "schedule": "PO BID on days of RT"
                },
                {
                    "name": "Mitomycin-C",
                    "dose": 10,
                    "unit": "mg/m²",
                    "schedule": "D1, D29"
                }
            ]
        }
    },
    "metastatic": {
        "Carboplatin-Paclitaxel": {
            "name": "Paclitaxel + Carboplatin (PC)",
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
                    "dose": "AUC 5",
                    "unit": "AUC",
                    "schedule": "D1, every 21 days"
                }
            ]
        },
        "5FU-Cisplatin": {
            "name": "5-FU + Cisplatin",
            "cycles": 6,
            "drugs": [
                {
                    "name": "5-Fluorouracil",
                    "dose": 1000,
                    "unit": "mg/m²",
                    "schedule": "CI D1-D4, every 21 days"
                },
                {
                    "name": "Cisplatin",
                    "dose": 60,
                    "unit": "mg/m²",
                    "schedule": "D1, every 21 days"
                }
            ]
        },
        "mFOLFOX6": {
            "name": "mFOLFOX6",
            "cycles": 12,
            "drugs": [
                {
                    "name": "Oxaliplatin",
                    "dose": 85,
                    "unit": "mg/m²",
                    "schedule": "D1, every 14 days"
                },
                {
                    "name": "Leucovorin",
                    "dose": 400,
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
                    "name": "5-Fluorouracil (continuous infusion)",
                    "dose": 2400,
                    "unit": "mg/m²",
                    "schedule": "D1-D2 (46hr CI), every 14 days"
                }
            ]
        },
        "FOLCIS": {
            "name": "FOLFCIS",
            "cycles": 12,
            "drugs": [
                {
                    "name": "Cisplatin",
                    "dose": 40,
                    "unit": "mg/m²",
                    "schedule": "D1, every 14 days"
                },
                {
                    "name": "Leucovorin",
                    "dose": 400,
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
                    "name": "5-Fluorouracil (continuous infusion)",
                    "dose": 2400,
                    "unit": "mg/m²",
                    "schedule": "CI over 46 hours, every 14 days"
                }
            ]
        },
        "Modified-DCF": {
            "name": "Modified DCF",
            "cycles": 8,
            "drugs": [
                {
                    "name": "Docetaxel",
                    "dose": 40,
                    "unit": "mg/m²",
                    "schedule": "D1, every 14 days"
                },
                {
                    "name": "Cisplatin",
                    "dose": 40,
                    "unit": "mg/m²",
                    "schedule": "D1, every 14 days"
                },
                {
                    "name": "5-Fluorouracil",
                    "dose": 2400,
                    "unit": "mg/m²",
                    "schedule": "CI over 46 hours, every 14 days"
                }
            ]
        },
        "Carboplatin-Paclitaxel-Retifanlimab": {
            "name": "Paclitaxel + Carboplatin + Retifanlimab-dlwr",
            "cycles": 6,
            "drugs": [
                {
                    "name": "Carboplatin",
                    "dose": "AUC 5",
                    "unit": "AUC",
                    "schedule": "D1, every 28 days"
                },
                {
                    "name": "Paclitaxel",
                    "dose": 80,
                    "unit": "mg/m²",
                    "schedule": "D1, D8, D15, every 28 days"
                },
                {
                    "name": "Retifanlimab-dlwr",
                    "dose": 500,
                    "unit": "mg",
                    "schedule": "D1, every 28 days"
                }
            ]
        },
        "Pembrolizumab-Monotherapy": {
            "name": "Pembrolizumab monotherapy (PD-1 inhibitor)",
            "cycles": 12,
            "drugs": [
                {
                    "name": "Pembrolizumab",
                    "dose": 200,
                    "unit": "mg",
                    "schedule": "D1, every 21 days or 400mg every 6 weeks"
                }
            ]
        },
        "Nivolumab-Monotherapy": {
            "name": "Nivolumab monotherapy (PD-1 inhibitor)",
            "cycles": 12,
            "drugs": [
                {
                    "name": "Nivolumab",
                    "dose": 240,
                    "unit": "mg",
                    "schedule": "every 14 days or 480mg every 28 days"
                }
            ]
        },
        "Cemiplimab-Monotherapy": {
            "name": "Cemiplimab monotherapy (PD-1 inhibitor)",
            "cycles": 12,
            "drugs": [
                {
                    "name": "Cemiplimab",
                    "dose": 350,
                    "unit": "mg",
                    "schedule": "D1, every 21 days"
                }
            ]
        },
        "Single-Toripalimab": {
            "name": "Toripalimab monotherapy (PD-1 inhibitor)",
            "cycles": 12,
            "drugs": [
                {
                    "name": "Toripalimab",
                    "dose": 3,
                    "unit": "mg/kg",
                    "schedule": "D1, every 14 days"
                }
            ]
        },
        "Single-Tislelizumab": {
            "name": "Tislelizumab monotherapy (PD-1 inhibitor)",
            "cycles": 12,
            "drugs": [
                {
                    "name": "Tislelizumab",
                    "dose": 200,
                    "unit": "mg",
                    "schedule": "D1, every 21 days"
                }
            ]
        },
        "Dostarlimab-Monotherapy": {
            "name": "Dostarlimab monotherapy (PD-1 inhibitor)",
            "cycles": 12,
            "drugs": [
                {
                    "name": "Dostarlimab",
                    "dose": 500,
                    "unit": "mg",
                    "schedule": "IV every 21 days x 4 doses, then 1000 mg IV every 42 days"
                }
            ]
        },
        "Retifanlimab-Monotherapy": {
            "name": "Retifanlimab-dlwr monotherapy (PD-1 inhibitor)",
            "cycles": 12,
            "drugs": [
                {
                    "name": "Retifanlimab-dlwr",
                    "dose": 500,
                    "unit": "mg",
                    "schedule": "IV every 28 days, up to 24 months"
                }
            ]
        }
    }
};
