window.protocolData = window.protocolData || {};
window.protocolData.adrenocortical = {
    "neoadjuvant": {},
    "adjuvant": {
        "Mitotane": {
            "name": "Mitotane monotherapy",
            "cycles": 12,
            "drugs": [
                {
                    "name": "Mitotane",
                    "dose": 2000,
                    "unit": "mg",
                    "schedule": "PO 1000-2000mg/day, divided into 2-3 doses, escalate by 500mg-1000mg every 1-2 weeks, target dose 3000mg-6000mg/day. Plasma target levels 14mg/L to 20mg/L. Duration: minimum 2 years, maximum 5 years (if tolerated and high risk features)"
                }
            ]
        }
    },
    "perioperative": {},
    "metastatic": {
        "Mitotane": {
            "name": "Mitotane monotherapy",
            "cycles": 12,
            "drugs": [
                {
                    "name": "Mitotane",
                    "dose": 2000,
                    "unit": "mg",
                    "schedule": "PO 1000-2000mg/day, divided into 2-3 doses, escalate by 500mg-1000mg every 1-2 weeks, target dose 3000mg-6000mg/day. Plasma target levels 14mg/L to 20mg/L. Duration: minimum 2 years, maximum 5 years (if tolerated and high risk features)"
                }
            ]
        },
        "EDP-M": {
            "name": "Etoposide + Doxorubicin + Cisplatin + Mitotane (EDP-M)",
            "cycles": 6,
            "drugs": [
                {
                    "name": "Etoposide",
                    "dose": 100,
                    "unit": "mg/m²",
                    "schedule": "D2-D4, every 28 days"
                },
                {
                    "name": "Doxorubicin",
                    "dose": 40,
                    "unit": "mg/m²",
                    "schedule": "D1, every 28 days"
                },
                {
                    "name": "Cisplatin",
                    "dose": 40,
                    "unit": "mg/m²",
                    "schedule": "D3-D4, every 28 days"
                },
                {
                    "name": "Mitotane",
                    "dose": 2000,
                    "unit": "mg",
                    "schedule": "PO continuous dosing to maintain serum levels 14-20 mcg/ml"
                }
            ]
        },
        "EP-M": {
            "name": "Etoposide + Cisplatin + Mitotane (EP-M) (NCCN Preferred)",
            "cycles": 6,
            "drugs": [
                {
                    "name": "Etoposide",
                    "dose": 100,
                    "unit": "mg/m²",
                    "schedule": "D2-D4, every 28 days"
                },
                {
                    "name": "Cisplatin",
                    "dose": 40,
                    "unit": "mg/m²",
                    "schedule": "D3-D4, every 28 days"
                },
                {
                    "name": "Mitotane",
                    "dose": 2000,
                    "unit": "mg",
                    "schedule": "PO continuous dosing to maintain serum levels 14-20 mcg/ml"
                }
            ]
        },
        "Streptozocin-Mitotane": {
            "name": "Streptozocin + Mitotane",
            "cycles": 6,
            "drugs": [
                {
                    "name": "Streptozocin",
                    "dose": 1000,
                    "unit": "mg/m²",
                    "schedule": "1000 mg/m² x 5 days followed by 2000 mg/m² every 28 days"
                },
                {
                    "name": "Mitotane",
                    "dose": 1000,
                    "unit": "mg",
                    "schedule": "PO 1000 mg daily titrate to 1000-4000 mg daily, target >14 mcg/ml"
                }
            ]
        },
        "EDP-M-Carboplatin": {
            "name": "Etoposide + Doxorubicin + Carboplatin + Mitotane (EDP-M) (cisplatin-ineligible)",
            "cycles": 6,
            "drugs": [
                {
                    "name": "Etoposide",
                    "dose": 100,
                    "unit": "mg/m²",
                    "schedule": "D2-D4, every 28 days"
                },
                {
                    "name": "Doxorubicin",
                    "dose": 40,
                    "unit": "mg/m²",
                    "schedule": "D1, every 28 days"
                },
                {
                    "name": "Carboplatin",
                    "dose": "AUC 5",
                    "unit": "AUC",
                    "schedule": "D1, every 28 days"
                },
                {
                    "name": "Mitotane",
                    "dose": 2000,
                    "unit": "mg",
                    "schedule": "PO continuous dosing to maintain serum levels 14-20 mcg/ml"
                }
            ]
        },
        "Gemcitabine-Capecitabine": {
            "name": "Gemcitabine + Capecitabine",
            "cycles": 6,
            "drugs": [
                {
                    "name": "Gemcitabine",
                    "dose": 800,
                    "unit": "mg/m²",
                    "schedule": "IV over 30 min, D1, D8, every 21 days"
                },
                {
                    "name": "Capecitabine",
                    "dose": 1500,
                    "unit": "mg",
                    "schedule": "PO daily, continuous"
                }
            ]
        },
        "Gemcitabine-Capecitabine-Mitotane": {
            "name": "Gemcitabine + Capecitabine + Mitotane",
            "cycles": 6,
            "drugs": [
                {
                    "name": "Gemcitabine",
                    "dose": 800,
                    "unit": "mg/m²",
                    "schedule": "IV over 30 min, D1, D8, every 21 days"
                },
                {
                    "name": "Capecitabine",
                    "dose": 1500,
                    "unit": "mg",
                    "schedule": "PO daily, continuous"
                },
                {
                    "name": "Mitotane",
                    "dose": 2000,
                    "unit": "mg",
                    "schedule": "PO continuous dosing to maintain serum levels 14-20 mcg/ml"
                }
            ]
        },
        "Docetaxel-Cisplatin": {
            "name": "Docetaxel + Cisplatin",
            "cycles": 6,
            "drugs": [
                {
                    "name": "Docetaxel",
                    "dose": 60,
                    "unit": "mg/m²",
                    "schedule": "D1, every 21 days"
                },
                {
                    "name": "Cisplatin",
                    "dose": 50,
                    "unit": "mg/m²",
                    "schedule": "D1, every 21 days"
                }
            ]
        },
        "Temozolomide": {
            "name": "Temozolomide monotherapy",
            "cycles": 6,
            "drugs": [
                {
                    "name": "Temozolomide",
                    "dose": 200,
                    "unit": "mg/m²",
                    "schedule": "PO D1-D5, every 28 days"
                }
            ]
        },
        "Nivolumab-Ipilimumab": {
            "name": "Nivolumab + Ipilimumab (PD-1 + CTLA-4 inhibitors) (Investigational)",
            "cycles": 4,
            "drugs": [
                {
                    "name": "Nivolumab",
                    "dose": 3,
                    "unit": "mg/kg",
                    "schedule": "IV D1, every 21 days x 4 cycles (induction), then 3 mg/kg IV every 14 days (maintenance, up to 96 weeks)"
                },
                {
                    "name": "Ipilimumab",
                    "dose": 1,
                    "unit": "mg/kg",
                    "schedule": "IV D1, every 21 days x 4 cycles (induction only)"
                }
            ]
        },
        "Pembrolizumab": {
            "name": "Pembrolizumab ± Mitotane (NCCN Other Recommended)",
            "cycles": 12,
            "drugs": [
                {
                    "name": "Pembrolizumab",
                    "dose": 200,
                    "unit": "mg",
                    "schedule": "IV every 21 days"
                }
            ]
        },
        "Cabozantinib": {
            "name": "Cabozantinib (Investigational)",
            "cycles": 12,
            "drugs": [
                {
                    "name": "Cabozantinib",
                    "dose": 60,
                    "unit": "mg",
                    "schedule": "PO once daily"
                }
            ]
        }
    }
};
