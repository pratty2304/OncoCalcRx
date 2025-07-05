// Chemotherapy Protocol Calculator
// BSA calculation using Mosteller's formula: BSA = sqrt((height × weight) / 3600)

const protocolDatabase = {
    breast: {
        'hormone_positive': {
            'Palbociclib-Letrozole': {
                name: 'Palbociclib + Letrozole (CDK4/6i)',
                cycles: 12,
                drugs: [
                    { name: 'Palbociclib', dose: 125, unit: 'mg', schedule: 'daily for 21 days, then 7 days off' },
                    { name: 'Letrozole', dose: 2.5, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Ribociclib-Letrozole': {
                name: 'Ribociclib + Letrozole (CDK4/6i)',
                cycles: 12,
                drugs: [
                    { name: 'Ribociclib', dose: 600, unit: 'mg', schedule: 'daily for 21 days, then 7 days off' },
                    { name: 'Letrozole', dose: 2.5, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Abemaciclib-Letrozole': {
                name: 'Abemaciclib + Letrozole (CDK4/6i)',
                cycles: 12,
                drugs: [
                    { name: 'Abemaciclib', dose: 150, unit: 'mg', schedule: 'twice daily' },
                    { name: 'Letrozole', dose: 2.5, unit: 'mg', schedule: 'daily' }
                ]
            },
            'TC': {
                name: 'Docetaxel + Cyclophosphamide (TC)',
                cycles: 4,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 4 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'q3weeks x 4 cycles' }
                ]
            },
            'AC-T': {
                name: 'Adriamycin + Cyclophosphamide → Taxol (AC-T)',
                cycles: 8,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'q3weeks x 4 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'q3weeks x 4 cycles' },
                    { name: 'Paclitaxel (Taxol)', dose: 175, unit: 'mg/m²', schedule: 'q3weeks x 4 cycles (after AC)' }
                ]
            },
            'Palbociclib-Fulvestrant': {
                name: 'Palbociclib + Fulvestrant (CDK4/6i)',
                cycles: 12,
                drugs: [
                    { name: 'Palbociclib', dose: 125, unit: 'mg', schedule: 'daily for 21 days, then 7 days off' },
                    { name: 'Fulvestrant', dose: 500, unit: 'mg', schedule: 'monthly injection' }
                ]
            },
            'Ribociclib-Fulvestrant': {
                name: 'Ribociclib + Fulvestrant (CDK4/6i)',
                cycles: 12,
                drugs: [
                    { name: 'Ribociclib', dose: 600, unit: 'mg', schedule: 'daily for 21 days, then 7 days off' },
                    { name: 'Fulvestrant', dose: 500, unit: 'mg', schedule: 'monthly injection' }
                ]
            },
            'Abemaciclib-Fulvestrant': {
                name: 'Abemaciclib + Fulvestrant (CDK4/6i)',
                cycles: 12,
                drugs: [
                    { name: 'Abemaciclib', dose: 150, unit: 'mg', schedule: 'twice daily' },
                    { name: 'Fulvestrant', dose: 500, unit: 'mg', schedule: 'monthly injection' }
                ]
            },
            'Everolimus-Exemestane': {
                name: 'Everolimus + Exemestane (mTORi)',
                cycles: 12,
                drugs: [
                    { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'daily' },
                    { name: 'Exemestane', dose: 25, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Dose-Dense-AC': {
                name: 'Dose Dense AC (ddAC)',
                cycles: 4,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'q2weeks x 4 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'q2weeks x 4 cycles' }
                ]
            },
            'Dose-Dense-Paclitaxel': {
                name: 'Dose Dense Paclitaxel (ddT)',
                cycles: 4,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'q2weeks x 4 cycles' }
                ]
            },
            'FEC': {
                name: '5-Fluorouracil + Epirubicin + Cyclophosphamide (FEC)',
                cycles: 6,
                drugs: [
                    { name: '5-Fluorouracil', dose: 500, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Epirubicin', dose: 100, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'TAC': {
                name: 'Docetaxel + Adriamycin + Cyclophosphamide (TAC)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 50, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Paclitaxel-Carboplatin': {
                name: 'Paclitaxel + Carboplatin (PC)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin-3weekly': {
                name: '3-weekly Nab-paclitaxel + Carboplatin (3w-nPC)',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 260, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin-weekly': {
                name: 'Weekly Nab-paclitaxel + Carboplatin (w-nPC)',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'weekly x 12 weeks' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly x 12 weeks' }
                ]
            },
            'Gemcitabine-Carboplatin': {
                name: 'Gemcitabine + Carboplatin (GC)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' }
                ]
            },
            'FAC': {
                name: '5-Fluorouracil + Adriamycin + Cyclophosphamide (FAC)',
                cycles: 6,
                drugs: [
                    { name: '5-Fluorouracil', dose: 500, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 50, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'CAF': {
                name: 'Cyclophosphamide + Adriamycin + 5-Fluorouracil (CAF)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: '5-Fluorouracil', dose: 600, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'CMF': {
                name: 'Cyclophosphamide + Methotrexate + 5-Fluorouracil (CMF)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Methotrexate', dose: 40, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: '5-Fluorouracil', dose: 600, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Capecitabine-Docetaxel': {
                name: 'Capecitabine + Docetaxel (XD)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'twice daily, days 1-14, q3weeks x 6 cycles' },
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Capecitabine-Paclitaxel': {
                name: 'Capecitabine + Paclitaxel (XT)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'twice daily, days 1-14, q3weeks x 6 cycles' },
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Single-Capecitabine': {
                name: 'Single agent Capecitabine (X)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'twice daily, days 1-14, q3weeks x 6 cycles' }
                ]
            },
            'Single-Docetaxel': {
                name: 'Single agent Docetaxel (D)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Weekly-Paclitaxel-Carboplatin': {
                name: 'Weekly Paclitaxel + Carboplatin (wPC)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly x 12 weeks' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly x 12 weeks' }
                ]
            }
        },
        'triple_negative': {
            'Paclitaxel-Carboplatin-Pembrolizumab': {
                name: 'Paclitaxel + Carboplatin + Pembrolizumab (KEYNOTE-522)',
                cycles: 12,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly x 12 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly x 12 cycles' },
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks x 4 cycles' }
                ]
            },
            'AC-Pembrolizumab': {
                name: 'Adriamycin + Cyclophosphamide + Pembrolizumab (KEYNOTE-522)',
                cycles: 4,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'q3weeks x 4 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'q3weeks x 4 cycles' },
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks x 4 cycles' }
                ]
            },
            'AC-T': {
                name: 'Adriamycin + Cyclophosphamide → Taxol (AC-T)',
                cycles: 8,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'q3weeks x 4 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'q3weeks x 4 cycles' },
                    { name: 'Paclitaxel (Taxol)', dose: 175, unit: 'mg/m²', schedule: 'q3weeks x 4 cycles (after AC)' }
                ]
            },
            'TAC': {
                name: 'Docetaxel + Adriamycin + Cyclophosphamide (TAC)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 50, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Dose-Dense-AC': {
                name: 'Dose Dense AC (ddAC)',
                cycles: 4,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'q2weeks x 4 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'q2weeks x 4 cycles' }
                ]
            },
            'Dose-Dense-Paclitaxel': {
                name: 'Dose Dense Paclitaxel (ddT)',
                cycles: 4,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'q2weeks x 4 cycles' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin-3weekly': {
                name: '3-weekly Nab-paclitaxel + Carboplatin (3w-nPC)',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 260, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin-weekly': {
                name: 'Weekly Nab-paclitaxel + Carboplatin (w-nPC)',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'weekly x 12 weeks' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly x 12 weeks' }
                ]
            },
            'TC': {
                name: 'Docetaxel + Cyclophosphamide (TC)',
                cycles: 4,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 4 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'q3weeks x 4 cycles' }
                ]
            },
            'Paclitaxel-Carboplatin': {
                name: 'Paclitaxel + Carboplatin (PC)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Gemcitabine-Carboplatin': {
                name: 'Gemcitabine + Carboplatin (GC)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'days 1, 8, q3weeks x 6 cycles' }
                ]
            },
            'FEC': {
                name: '5-Fluorouracil + Epirubicin + Cyclophosphamide (FEC)',
                cycles: 6,
                drugs: [
                    { name: '5-Fluorouracil', dose: 500, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Epirubicin', dose: 100, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'FAC': {
                name: '5-Fluorouracil + Adriamycin + Cyclophosphamide (FAC)',
                cycles: 6,
                drugs: [
                    { name: '5-Fluorouracil', dose: 500, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 50, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'CAF': {
                name: 'Cyclophosphamide + Adriamycin + 5-Fluorouracil (CAF)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: '5-Fluorouracil', dose: 600, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'CMF': {
                name: 'Cyclophosphamide + Methotrexate + 5-Fluorouracil (CMF)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Methotrexate', dose: 40, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: '5-Fluorouracil', dose: 600, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Single-Capecitabine': {
                name: 'Single agent Capecitabine (X)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'twice daily, days 1-14, q3weeks x 6 cycles' }
                ]
            },
            'Eribulin': {
                name: 'Single agent Eribulin (E)',
                cycles: 6,
                drugs: [
                    { name: 'Eribulin', dose: 1.4, unit: 'mg/m²', schedule: 'days 1, 8, q3weeks x 6 cycles' }
                ]
            },
            'Single-Nab-Paclitaxel': {
                name: 'Single agent Nab-paclitaxel (nP)',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 260, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Doxorubicin-Liposome-Docetaxel': {
                name: 'Doxorubicin liposome + Docetaxel (PLD-D)',
                cycles: 6,
                drugs: [
                    { name: 'Doxorubicin liposome', dose: 30, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Single-Docetaxel': {
                name: 'Single agent Docetaxel (D)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Weekly-Paclitaxel-Carboplatin': {
                name: 'Weekly Paclitaxel + Carboplatin (wPC)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly x 12 weeks' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly x 12 weeks' }
                ]
            }
        },
        'her2_positive': {
            'TCHP': {
                name: 'Docetaxel + Carboplatin + Trastuzumab + Pertuzumab (TCHP)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg q3weeks', hasLoadingDose: true },
                    { name: 'Pertuzumab', dose: 840, maintenanceDose: 420, unit: 'mg', schedule: 'loading dose, then 420 mg q3weeks', hasLoadingDose: true }
                ]
            },
            'TCH': {
                name: 'Docetaxel + Carboplatin + Trastuzumab (TCH)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg q3weeks', hasLoadingDose: true }
                ]
            },
            'AC-TH': {
                name: 'AC → Taxol + Trastuzumab (AC-TH)',
                cycles: 8,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'q3weeks x 4 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'q3weeks x 4 cycles' },
                    { name: 'Paclitaxel (Taxol)', dose: 175, unit: 'mg/m²', schedule: 'q3weeks x 4 cycles (after AC)' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg q3weeks', hasLoadingDose: true }
                ]
            },
            'TDM1': {
                name: 'Trastuzumab emtansine (T-DM1)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab emtansine', dose: 3.6, unit: 'mg/kg', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'TDxd': {
                name: 'Trastuzumab deruxtecan (T-DXd)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Trastuzumab-Paclitaxel': {
                name: 'Trastuzumab + Paclitaxel (TH)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg q3weeks', hasLoadingDose: true },
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Trastuzumab-Docetaxel': {
                name: 'Trastuzumab + Docetaxel (TD)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg q3weeks', hasLoadingDose: true },
                    { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Dose-Dense-AC': {
                name: 'Dose Dense AC (ddAC)',
                cycles: 4,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'q2weeks x 4 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'q2weeks x 4 cycles' }
                ]
            },
            'Dose-Dense-Paclitaxel': {
                name: 'Dose Dense Paclitaxel (ddT)',
                cycles: 4,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'q2weeks x 4 cycles' }
                ]
            },
            'TC': {
                name: 'Docetaxel + Cyclophosphamide (TC)',
                cycles: 4,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 4 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'q3weeks x 4 cycles' }
                ]
            },
            'Paclitaxel-Carboplatin': {
                name: 'Paclitaxel + Carboplatin (PC)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Gemcitabine-Carboplatin': {
                name: 'Gemcitabine + Carboplatin (GC)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'days 1, 8, q3weeks x 6 cycles' }
                ]
            },
            'Gemcitabine-Carboplatin-Trastuzumab': {
                name: 'Gemcitabine + Carboplatin + Trastuzumab (GCH)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg q3weeks', hasLoadingDose: true }
                ]
            },
            'FEC': {
                name: '5-Fluorouracil + Epirubicin + Cyclophosphamide (FEC)',
                cycles: 6,
                drugs: [
                    { name: '5-Fluorouracil', dose: 500, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Epirubicin', dose: 100, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'FAC': {
                name: '5-Fluorouracil + Adriamycin + Cyclophosphamide (FAC)',
                cycles: 6,
                drugs: [
                    { name: '5-Fluorouracil', dose: 500, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 50, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'CAF': {
                name: 'Cyclophosphamide + Adriamycin + 5-Fluorouracil (CAF)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: '5-Fluorouracil', dose: 600, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'CMF': {
                name: 'Cyclophosphamide + Methotrexate + 5-Fluorouracil (CMF)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Methotrexate', dose: 40, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: '5-Fluorouracil', dose: 600, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Single-Capecitabine': {
                name: 'Single agent Capecitabine (X)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'twice daily, days 1-14, q3weeks x 6 cycles' }
                ]
            },
            'Trastuzumab-Lapatinib': {
                name: 'Trastuzumab + Lapatinib (dual HER2)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg q3weeks', hasLoadingDose: true },
                    { name: 'Lapatinib', dose: 1000, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Capecitabine-Lapatinib': {
                name: 'Capecitabine + Lapatinib (XL)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'twice daily, days 1-14, q3weeks x 6 cycles' },
                    { name: 'Lapatinib', dose: 1250, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin-3weekly': {
                name: '3-weekly Nab-paclitaxel + Carboplatin (3w-nPC)',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 260, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin-weekly': {
                name: 'Weekly Nab-paclitaxel + Carboplatin (w-nPC)',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'weekly x 12 weeks' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly x 12 weeks' }
                ]
            },
            'Single-Docetaxel': {
                name: 'Single agent Docetaxel (D)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Weekly-Paclitaxel-Carboplatin': {
                name: 'Weekly Paclitaxel + Carboplatin (wPC)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly x 12 weeks' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly x 12 weeks' }
                ]
            }
        }
    },
    colorectal: {
        'mFOLFOX6': {
            name: 'Modified FOLFOX6 (mFOLFOX6)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' }
            ]
        },
        'CAPEOX': {
            name: 'Capecitabine + Oxaliplatin (CAPEOX)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'q3weeks x 8 cycles' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, q3weeks x 8 cycles' }
            ]
        },
        'mFOLFIRI': {
            name: 'Modified FOLFIRI (mFOLFIRI)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' }
            ]
        },
        'mFOLFOX6-Bevacizumab': {
            name: 'mFOLFOX6 + Bevacizumab',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' },
                { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'q2weeks x 12 cycles' }
            ]
        },
        'mFOLFIRI-Bevacizumab': {
            name: 'mFOLFIRI + Bevacizumab',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' },
                { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'q2weeks x 12 cycles' }
            ]
        },
        'CAPEOX-Bevacizumab': {
            name: 'CAPEOX + Bevacizumab',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'q3weeks x 8 cycles' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, q3weeks x 8 cycles' },
                { name: 'Bevacizumab', dose: 7.5, unit: 'mg/kg', schedule: 'q3weeks x 8 cycles' }
            ]
        },
        'mFOLFOX6-Cetuximab': {
            name: 'mFOLFOX6 + Cetuximab (KRAS/NRAS wild-type)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' },
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true }
            ]
        },
        'mFOLFIRI-Cetuximab': {
            name: 'mFOLFIRI + Cetuximab (KRAS/NRAS wild-type)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' },
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true }
            ]
        },
        'mFOLFOX6-Panitumumab': {
            name: 'mFOLFOX6 + Panitumumab (KRAS/NRAS wild-type)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' },
                { name: 'Panitumumab', dose: 6, unit: 'mg/kg', schedule: 'q2weeks x 12 cycles' }
            ]
        },
        'mFOLFIRI-Panitumumab': {
            name: 'mFOLFIRI + Panitumumab (KRAS/NRAS wild-type)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' },
                { name: 'Panitumumab', dose: 6, unit: 'mg/kg', schedule: 'q2weeks x 12 cycles' }
            ]
        },
        'FOLFOXIRI': {
            name: 'FOLFOXIRI',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 165, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 3200, unit: 'mg/m²', days: 'D1-D2 (48hr CI)', schedule: '48-hour infusion, q2weeks x 12 cycles' }
            ]
        },
        'FOLFOXIRI-Bevacizumab': {
            name: 'FOLFOXIRI + Bevacizumab',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 165, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 3200, unit: 'mg/m²', days: 'D1-D2 (48hr CI)', schedule: '48-hour infusion, q2weeks x 12 cycles' },
                { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'q2weeks x 12 cycles' }
            ]
        },
        'FOLFOXIRI-Panitumumab': {
            name: 'FOLFOXIRI + Panitumumab (KRAS/NRAS wild-type)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 165, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 3200, unit: 'mg/m²', days: 'D1-D2 (48hr CI)', schedule: '48-hour infusion, q2weeks x 12 cycles' },
                { name: 'Panitumumab', dose: 6, unit: 'mg/kg', schedule: 'q2weeks x 12 cycles' }
            ]
        },
        'FOLFIRI-Ziv-aflibercept': {
            name: 'FOLFIRI + Ziv-aflibercept (ZALTRAP)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' },
                { name: 'Ziv-aflibercept', dose: 4, unit: 'mg/kg', schedule: 'q2weeks x 12 cycles' }
            ]
        },
        'CAPIRI': {
            name: 'Capecitabine + Irinotecan (CAPIRI)',
            cycles: 8,
            drugs: [
                { name: 'Irinotecan', dose: 250, unit: 'mg/m²', schedule: 'q3weeks x 8 cycles' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, q3weeks x 8 cycles' }
            ]
        },
        'XELIRI-Bevacizumab': {
            name: 'XELIRI + Bevacizumab',
            cycles: 8,
            drugs: [
                { name: 'Irinotecan', dose: 200, unit: 'mg/m²', schedule: 'q3weeks x 8 cycles' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, q3weeks x 8 cycles' },
                { name: 'Bevacizumab', dose: 7.5, unit: 'mg/kg', schedule: 'q3weeks x 8 cycles' }
            ]
        },
        'CPT11-weekly': {
            name: 'Irinotecan weekly schedule (CPT-11)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 125, unit: 'mg/m²', schedule: 'weekly x 4, then 2 weeks rest, repeat' }
            ]
        },
        'CPT11-monthly': {
            name: 'Irinotecan monthly schedule (CPT-11)',
            cycles: 6,
            drugs: [
                { name: 'Irinotecan', dose: 350, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Cetuximab-Irinotecan': {
            name: 'Cetuximab + Irinotecan (KRAS/NRAS wild-type)',
            cycles: 12,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true },
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' }
            ]
        },
        'Irinotecan-Cetuximab': {
            name: 'Irinotecan + Cetuximab (KRAS/NRAS wild-type)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true }
            ]
        },
        'Cetuximab-Bevacizumab-Irinotecan': {
            name: 'Cetuximab + Bevacizumab + Irinotecan',
            cycles: 12,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true },
                { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'q2weeks x 12 cycles' },
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' }
            ]
        },
        '5FU-LV-Oxaliplatin': {
            name: '5-FU/LV + Oxaliplatin',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2000, unit: 'mg/m²', schedule: '22-hour infusion, q2weeks x 12 cycles' }
            ]
        },
        '5FU-LV-deGramont': {
            name: '5-FU + LV (de Gramont regimen)',
            cycles: 12,
            drugs: [
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 600, unit: 'mg/m²', schedule: '22-hour infusion, q2weeks x 12 cycles' }
            ]
        },
        '5FU-LV-Roswell': {
            name: '5-FU + LV (Roswell Park regimen)',
            cycles: 6,
            drugs: [
                { name: 'Leucovorin', dose: 500, unit: 'mg/m²', schedule: 'weekly x 6 weeks, then 2 weeks rest' },
                { name: '5-Fluorouracil', dose: 500, unit: 'mg/m²', schedule: 'weekly x 6 weeks, then 2 weeks rest' }
            ]
        },
        '5FU-LV-Bevacizumab': {
            name: '5-FU + LV + Bevacizumab',
            cycles: 12,
            drugs: [
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 600, unit: 'mg/m²', schedule: '22-hour infusion, q2weeks x 12 cycles' },
                { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'q2weeks x 12 cycles' }
            ]
        },
        'Single-Capecitabine-RT': {
            name: 'Single agent Capecitabine with RT',
            cycles: 2,
            drugs: [
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'twice daily, days 1-14 during radiation therapy' }
            ]
        },
        'Capecitabine-Mitomycin': {
            name: 'Capecitabine + Mitomycin-C',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'twice daily, days 1-14, q3weeks x 6 cycles' },
                { name: 'Mitomycin-C', dose: 7, unit: 'mg/m²', schedule: 'days 1,29' }
            ]
        },
        'TAS-102': {
            name: 'Trifluridine/Tipiracil (TAS-102)',
            cycles: 6,
            drugs: [
                { name: 'TAS-102', dose: 35, unit: 'mg/m²', schedule: 'twice daily, days 1-5 and 8-12, q4weeks x 6 cycles' }
            ]
        },
        'TAS-102-Bevacizumab': {
            name: 'TAS-102 + Bevacizumab',
            cycles: 6,
            drugs: [
                { name: 'TAS-102', dose: 35, unit: 'mg/m²', schedule: 'twice daily, days 1-5 and 8-12, q4weeks x 6 cycles' },
                { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'q2weeks' }
            ]
        },
        'Regorafenib': {
            name: 'Regorafenib',
            cycles: 6,
            drugs: [
                { name: 'Regorafenib', dose: 160, unit: 'mg', schedule: 'daily for 21 days, then 7 days off, q4weeks x 6 cycles' }
            ]
        },
        'Single-Cetuximab': {
            name: 'Single agent Cetuximab (KRAS/NRAS wild-type)',
            cycles: 12,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true }
            ]
        },
        'Single-Panitumumab': {
            name: 'Single agent Panitumumab (KRAS/NRAS wild-type)',
            cycles: 12,
            drugs: [
                { name: 'Panitumumab', dose: 6, unit: 'mg/kg', schedule: 'q2weeks x 12 cycles' }
            ]
        },
        'Vemurafenib-Irinotecan-Cetuximab': {
            name: 'Vemurafenib + Irinotecan + Cetuximab (BRAF V600E)',
            cycles: 12,
            drugs: [
                { name: 'Vemurafenib', dose: 960, unit: 'mg', schedule: 'twice daily' },
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true }
            ]
        },
        'Binimetinib-Encorafenib-Cetuximab': {
            name: 'Binimetinib + Encorafenib + Cetuximab (BRAF V600E)',
            cycles: 12,
            drugs: [
                { name: 'Binimetinib', dose: 45, unit: 'mg', schedule: 'twice daily' },
                { name: 'Encorafenib', dose: 300, unit: 'mg', schedule: 'daily' },
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true }
            ]
        },
        'Nivolumab-Ipilimumab': {
            name: 'Nivolumab + Ipilimumab (MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'q2weeks x 4, then 480mg flat dose q4weeks' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'q6weeks x 4 doses' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab (MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks or 400mg q6weeks' }
            ]
        },
        'Trastuzumab-Lapatinib-CRC': {
            name: 'Trastuzumab + Lapatinib (HER2 positive)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg q3weeks', hasLoadingDose: true },
                { name: 'Lapatinib', dose: 1000, unit: 'mg', schedule: 'daily' }
            ]
        },
        'Trastuzumab-Tucatinib-CRC': {
            name: 'Trastuzumab + Tucatinib (HER2 positive)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg q3weeks', hasLoadingDose: true },
                { name: 'Tucatinib', dose: 300, unit: 'mg', schedule: 'twice daily' }
            ]
        },
        'Trastuzumab-Pertuzumab-CRC': {
            name: 'Trastuzumab + Pertuzumab (HER2 positive)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg q3weeks', hasLoadingDose: true },
                { name: 'Pertuzumab', dose: 840, maintenanceDose: 420, unit: 'mg', schedule: 'loading dose, then 420 mg q3weeks', hasLoadingDose: true }
            ]
        },
        'T-DXd-CRC': {
            name: 'Trastuzumab deruxtecan (T-DXd) (HER2 positive)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'q3weeks x 12 cycles' }
            ]
        }
    },
    gastric: {
        'FLOT4': {
            name: 'Fluorouracil + Leucovorin + Oxaliplatin + Docetaxel (FLOT4)',
            cycles: 8,
            drugs: [
                { name: 'Docetaxel', dose: 50, unit: 'mg/m²', schedule: 'q2weeks x 8 cycles' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 8 cycles' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'q2weeks x 8 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2600, unit: 'mg/m²', days: 'D1 (24hr CI)', schedule: '24-hour infusion, q2weeks x 8 cycles' }
            ]
        },
        'DCF': {
            name: 'Docetaxel + Cisplatin + 5-Fluorouracil (DCF)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: '5-Fluorouracil infusion', dose: 750, unit: 'mg/m²', schedule: 'daily x 5 days, q3weeks x 6 cycles' }
            ]
        },
        'ECF': {
            name: 'Epirubicin + Cisplatin + 5-Fluorouracil (ECF)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: '5-Fluorouracil infusion', dose: 200, unit: 'mg/m²', schedule: 'daily continuous infusion' }
            ]
        },
        'ECX': {
            name: 'Epirubicin + Cisplatin + Capecitabine (ECX)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'twice daily, days 1-14, q3weeks x 6 cycles' }
            ]
        },
        'EOX': {
            name: 'Epirubicin + Oxaliplatin + Capecitabine (EOX)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'twice daily, days 1-14, q3weeks x 6 cycles' }
            ]
        },
        'CAPEOX': {
            name: 'Capecitabine + Oxaliplatin (CAPEOX)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'q3weeks x 8 cycles' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, q3weeks x 8 cycles' }
            ]
        },
        'mFOLFOX6': {
            name: 'Modified FOLFOX6 (mFOLFOX6)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' }
            ]
        },
        'mFOLFIRI': {
            name: 'Modified FOLFIRI (mFOLFIRI)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' }
            ]
        },
        'Cisplatin-5FU': {
            name: 'Cisplatin + 5-Fluorouracil (CF)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: '5-Fluorouracil infusion', dose: 1000, unit: 'mg/m²', schedule: 'daily x 4 days, q3weeks x 6 cycles' }
            ]
        },
        'FLO': {
            name: 'Fluorouracil + Leucovorin + Oxaliplatin (FLO)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 8 cycles' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'q2weeks x 8 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2600, unit: 'mg/m²', days: 'D1 (24hr CI)', schedule: '24-hour infusion, q2weeks x 8 cycles' }
            ]
        },
        'Docetaxel-Cisplatin': {
            name: 'Docetaxel + Cisplatin (DC)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Capecitabine-Cisplatin': {
            name: 'Capecitabine + Cisplatin (XP)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'twice daily, days 1-14, q3weeks x 6 cycles' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'XP-Trastuzumab': {
            name: 'XP + Trastuzumab (HER2 positive)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'twice daily, days 1-14, q3weeks x 6 cycles' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg q3weeks', hasLoadingDose: true }
            ]
        },
        '5FU-Cisplatin-Trastuzumab': {
            name: '5-FU + Cisplatin + Trastuzumab (HER2 positive)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: '5-Fluorouracil infusion', dose: 800, unit: 'mg/m²', schedule: 'daily x 5 days, q3weeks x 6 cycles' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg q3weeks', hasLoadingDose: true }
            ]
        },
        'Paclitaxel-Ramucirumab': {
            name: 'Paclitaxel + Ramucirumab',
            cycles: 8,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly x 12 weeks' },
                { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'q2weeks x 8 cycles' }
            ]
        },
        'FOLFIRI-Ramucirumab': {
            name: 'FOLFIRI + Ramucirumab',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' },
                { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'q2weeks x 12 cycles' }
            ]
        },
        'Irinotecan-Ramucirumab': {
            name: 'Irinotecan + Ramucirumab',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 150, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'q2weeks x 12 cycles' }
            ]
        },
        'Pembrolizumab-Cisplatin-5FU': {
            name: 'Pembrolizumab + Cisplatin + 5-FU (PD-L1 positive)',
            cycles: 6,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks x 6 cycles' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: '5-Fluorouracil infusion', dose: 800, unit: 'mg/m²', schedule: 'daily x 5 days, q3weeks x 6 cycles' }
            ]
        },
        'mFOLFOX6-Nivolumab': {
            name: 'mFOLFOX6 + Nivolumab',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' },
                { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'q3weeks x 8 cycles' }
            ]
        },
        'Nivolumab-CAPEOX': {
            name: 'Nivolumab + CAPEOX',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'q3weeks x 8 cycles' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'q3weeks x 8 cycles' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, q3weeks x 8 cycles' }
            ]
        },
        'Nivolumab-Ipilimumab': {
            name: 'Nivolumab + Ipilimumab (MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'q2weeks x 4, then 480mg flat dose q4weeks' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'q6weeks x 4 doses' }
            ]
        },
        'Pembrolizumab-Trastuzumab-CAPEOX': {
            name: 'Pembrolizumab + Trastuzumab + CAPEOX (HER2+/PD-L1+)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks x 8 cycles' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg q3weeks', hasLoadingDose: true },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'q3weeks x 8 cycles' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, q3weeks x 8 cycles' }
            ]
        },
        'Pembrolizumab-Trastuzumab-5FU-Cisplatin': {
            name: 'Pembrolizumab + Trastuzumab + 5FU + Cisplatin (HER2+/PD-L1+)',
            cycles: 6,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks x 6 cycles' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg q3weeks', hasLoadingDose: true },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: '5-Fluorouracil infusion', dose: 800, unit: 'mg/m²', schedule: 'daily x 5 days, q3weeks x 6 cycles' }
            ]
        },
        '5FU-LV-RT': {
            name: '5-FU + LV with RT',
            cycles: 2,
            drugs: [
                { name: 'Leucovorin', dose: 20, unit: 'mg/m²', schedule: 'daily during radiation therapy' },
                { name: '5-Fluorouracil', dose: 425, unit: 'mg/m²', schedule: 'daily during radiation therapy' }
            ]
        },
        'Capecitabine-RT': {
            name: 'Capecitabine with RT',
            cycles: 2,
            drugs: [
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'twice daily, days 1-14 during radiation therapy' }
            ]
        },
        'Capecitabine-Docetaxel': {
            name: 'Capecitabine + Docetaxel (XD)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'twice daily, days 1-14, q3weeks x 6 cycles' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Trastuzumab-Pertuzumab': {
            name: 'Trastuzumab + Pertuzumab (HER2 positive)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg q3weeks', hasLoadingDose: true },
                { name: 'Pertuzumab', dose: 840, maintenanceDose: 420, unit: 'mg', schedule: 'loading dose, then 420 mg q3weeks', hasLoadingDose: true }
            ]
        },
        'Single-5FU': {
            name: 'Single agent 5-Fluorouracil',
            cycles: 6,
            drugs: [
                { name: '5-Fluorouracil infusion', dose: 2600, unit: 'mg/m²', days: 'D1 (24hr CI)', schedule: '24-hour infusion, weekly x 6 weeks' }
            ]
        },
        'Single-Paclitaxel': {
            name: 'Single agent Paclitaxel',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly x 12 weeks' }
            ]
        },
        'Single-Docetaxel': {
            name: 'Single agent Docetaxel',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Single-Irinotecan-weekly': {
            name: 'Single agent Irinotecan (weekly)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 125, unit: 'mg/m²', schedule: 'weekly x 4, then 2 weeks rest, repeat' }
            ]
        },
        'Single-Irinotecan-2weekly': {
            name: 'Single agent Irinotecan (q2weeks)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' }
            ]
        },
        'Single-Irinotecan-3weekly': {
            name: 'Single agent Irinotecan (q3weeks)',
            cycles: 8,
            drugs: [
                { name: 'Irinotecan', dose: 350, unit: 'mg/m²', schedule: 'q3weeks x 8 cycles' }
            ]
        },
        'Single-Ramucirumab': {
            name: 'Single agent Ramucirumab',
            cycles: 12,
            drugs: [
                { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'q2weeks x 12 cycles' }
            ]
        },
        'Single-Pembrolizumab': {
            name: 'Single agent Pembrolizumab (PD-L1 positive)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks or 400mg q6weeks' }
            ]
        },
        'Single-Nivolumab': {
            name: 'Single agent Nivolumab',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'q2weeks or 480mg q4weeks' }
            ]
        },
        'Single-Cisplatin': {
            name: 'Single agent Cisplatin',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'TAS-102': {
            name: 'Trifluridine/Tipiracil (TAS-102)',
            cycles: 6,
            drugs: [
                { name: 'TAS-102', dose: 35, unit: 'mg/m²', schedule: 'twice daily, days 1-5 and 8-12, q4weeks x 6 cycles' }
            ]
        },
        'Dostarlimab': {
            name: 'Dostarlimab (MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'q3weeks x 4, then 1000mg q6weeks' }
            ]
        },
        'T-DXd-Gastric': {
            name: 'Trastuzumab deruxtecan (T-DXd) (HER2 positive)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab deruxtecan', dose: 6.4, unit: 'mg/kg', schedule: 'q3weeks x 12 cycles' }
            ]
        }
    },
    lymphoma: {
        'hodgkins': {
            'ABVD': {
                name: 'ABVD (Adriamycin + Bleomycin + Vinblastine + Dacarbazine)',
                cycles: 6,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 25, unit: 'mg/m²', schedule: 'days 1, 15, q4weeks x 6 cycles' },
                    { name: 'Bleomycin', dose: 10, unit: 'units/m²', schedule: 'days 1, 15, q4weeks x 6 cycles' },
                    { name: 'Vinblastine', dose: 6, unit: 'mg/m²', schedule: 'days 1, 15, q4weeks x 6 cycles' },
                    { name: 'Dacarbazine', dose: 375, unit: 'mg/m²', schedule: 'days 1, 15, q4weeks x 6 cycles' }
                ]
            },
            'BrECADD': {
                name: 'BrECADD (Brentuximab + Etoposide + Cyclophosphamide + Adriamycin + Dacarbazine + Dexamethasone)',
                cycles: 6,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q3weeks x 6 cycles' },
                    { name: 'Cyclophosphamide', dose: 650, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 25, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Dacarbazine', dose: 375, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 1-4, q3weeks x 6 cycles' }
                ]
            },
            'Nivolumab-AVD': {
                name: 'Nivolumab + AVD (Advanced Stage cHL)',
                cycles: 6,
                drugs: [
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'day 1, q2weeks x 12 doses' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 25, unit: 'mg/m²', schedule: 'days 1, 15, q4weeks x 6 cycles' },
                    { name: 'Vinblastine', dose: 6, unit: 'mg/m²', schedule: 'days 1, 15, q4weeks x 6 cycles' },
                    { name: 'Dacarbazine', dose: 375, unit: 'mg/m²', schedule: 'days 1, 15, q4weeks x 6 cycles' }
                ]
            },
            'CHOP': {
                name: 'CHOP (Cyclophosphamide + Hydroxydaunorubicin + Oncovin + Prednisone)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Hydroxydaunorubicin)', dose: 50, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, q3weeks x 6 cycles' }
                ]
            },
            'Rituximab-CHOP-NLPHL': {
                name: 'Rituximab + CHOP (NLPHL - Nodular Lymphocyte Predominant)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Hydroxydaunorubicin)', dose: 50, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, q3weeks x 6 cycles' }
                ]
            },
            'Brentuximab-Vedotin': {
                name: 'Brentuximab vedotin (BV)',
                cycles: 8,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'day 1, q3weeks x 8 cycles' }
                ]
            },
            'BV-Nivolumab': {
                name: 'Brentuximab vedotin + Nivolumab',
                cycles: 8,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'day 1, q3weeks x 8 cycles' },
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'day 1, q2weeks x 16 doses' }
                ]
            },
            'ICE-Nivolumab': {
                name: 'ICE + Nivolumab (Relapsed/Refractory)',
                cycles: 3,
                drugs: [
                    { name: 'Ifosfamide', dose: 5000, unit: 'mg/m²', schedule: 'day 2, q3weeks x 3 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 2, q3weeks x 3 cycles' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q3weeks x 3 cycles' },
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'day 1, q2weeks x 6 doses' }
                ]
            },
            'ICE-Pembrolizumab': {
                name: 'ICE + Pembrolizumab (Relapsed/Refractory)',
                cycles: 3,
                drugs: [
                    { name: 'Ifosfamide', dose: 5000, unit: 'mg/m²', schedule: 'day 2, q3weeks x 3 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 2, q3weeks x 3 cycles' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q3weeks x 3 cycles' },
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'day 1, q3weeks x 3 cycles' }
                ]
            },
            'DHAP': {
                name: 'DHAP (Dexamethasone + High-dose Ara-C + Cisplatin)',
                cycles: 3,
                drugs: [
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 1-4, q3weeks x 3 cycles' },
                    { name: 'Cytarabine (High-dose Ara-C)', dose: 2000, unit: 'mg/m²', schedule: 'day 2, q12h x 2 doses, q3weeks x 3 cycles' },
                    { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'day 1, q3weeks x 3 cycles' }
                ]
            },
            'ICE-BV': {
                name: 'ICE + Brentuximab vedotin (Relapsed/Refractory)',
                cycles: 3,
                drugs: [
                    { name: 'Ifosfamide', dose: 5000, unit: 'mg/m²', schedule: 'day 2, q3weeks x 3 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 2, q3weeks x 3 cycles' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q3weeks x 3 cycles' },
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'day 1, q3weeks x 3 cycles' }
                ]
            },
            'IGEV': {
                name: 'IGEV (Ifosfamide + Gemcitabine + Vinorelbine + Prednisone)',
                cycles: 4,
                drugs: [
                    { name: 'Ifosfamide', dose: 2000, unit: 'mg/m²', days: 'D1-D4', schedule: 'days 1-4, q3weeks x 4 cycles' },
                    { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', days: 'D1,D4', schedule: 'days 1, 4, q3weeks x 4 cycles' },
                    { name: 'Vinorelbine', dose: 20, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, q3weeks x 4 cycles' }
                ]
            },
            'Bendamustine': {
                name: 'Bendamustine (Single Agent)',
                cycles: 6,
                drugs: [
                    { name: 'Bendamustine', dose: 120, unit: 'mg/m²', days: 'D1-D2', schedule: 'days 1-2, q4weeks x 6 cycles' }
                ]
            },
            'Bendamustine-Carboplatin-Etoposide': {
                name: 'Bendamustine + Carboplatin + Etoposide',
                cycles: 4,
                drugs: [
                    { name: 'Bendamustine', dose: 90, unit: 'mg/m²', days: 'D1-D2', schedule: 'days 1-2, q3weeks x 4 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q3weeks x 4 cycles' }
                ]
            },
            'GEMOX': {
                name: 'GEMOX (Gemcitabine + Oxaliplatin)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'day 1, q2weeks x 6 cycles' },
                    { name: 'Oxaliplatin', dose: 100, unit: 'mg/m²', schedule: 'day 1, q2weeks x 6 cycles' }
                ]
            },
            'Vorinostat-Pembrolizumab': {
                name: 'Vorinostat + Pembrolizumab (Relapsed/Refractory)',
                cycles: 8,
                drugs: [
                    { name: 'Vorinostat', dose: 400, unit: 'mg', schedule: 'daily, continuous' },
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'day 1, q3weeks x 8 cycles' }
                ]
            },
            'Brentuximab-AVD': {
                name: 'Brentuximab vedotin + AVD (Advanced Stage cHL)',
                cycles: 6,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.2, unit: 'mg/kg', schedule: 'day 1, q2weeks x 12 doses' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 25, unit: 'mg/m²', schedule: 'days 1, 15, q4weeks x 6 cycles' },
                    { name: 'Vinblastine', dose: 6, unit: 'mg/m²', schedule: 'days 1, 15, q4weeks x 6 cycles' },
                    { name: 'Dacarbazine', dose: 375, unit: 'mg/m²', schedule: 'days 1, 15, q4weeks x 6 cycles' }
                ]
            },
            'MOPP': {
                name: 'MOPP (Mechlorethamine + Oncovin + Procarbazine + Prednisone)',
                cycles: 6,
                drugs: [
                    { name: 'Mechlorethamine', dose: 6, unit: 'mg/m²', schedule: 'days 1, 8, q4weeks x 6 cycles' },
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'days 1, 8, q4weeks x 6 cycles (max 2mg)' },
                    { name: 'Procarbazine', dose: 100, unit: 'mg/m²', schedule: 'days 1-14, q4weeks x 6 cycles' },
                    { name: 'Prednisone', dose: 40, unit: 'mg/m²', schedule: 'days 1-14, q4weeks x 6 cycles' }
                ]
            },
            'MOPP-ABVD': {
                name: 'MOPP/ABVD (Alternating)',
                cycles: 8,
                drugs: [
                    { name: 'Mechlorethamine', dose: 6, unit: 'mg/m²', schedule: 'days 1, 8 (MOPP cycles)' },
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'days 1, 8 (MOPP cycles), max 2mg' },
                    { name: 'Procarbazine', dose: 100, unit: 'mg/m²', schedule: 'days 1-14 (MOPP cycles)' },
                    { name: 'Prednisone', dose: 40, unit: 'mg/m²', schedule: 'days 1-14 (MOPP cycles)' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 25, unit: 'mg/m²', schedule: 'days 1, 15 (ABVD cycles)' },
                    { name: 'Bleomycin', dose: 10, unit: 'units/m²', schedule: 'days 1, 15 (ABVD cycles)' },
                    { name: 'Vinblastine', dose: 6, unit: 'mg/m²', schedule: 'days 1, 15 (ABVD cycles)' },
                    { name: 'Dacarbazine', dose: 375, unit: 'mg/m²', schedule: 'days 1, 15 (ABVD cycles)' }
                ]
            },
            'Stanford-V': {
                name: 'Stanford V',
                cycles: 3,
                drugs: [
                    { name: 'Doxorubicin', dose: 25, unit: 'mg/m²', schedule: 'weeks 1, 3, 5, 7, 9, 11' },
                    { name: 'Vinblastine', dose: 6, unit: 'mg/m²', schedule: 'weeks 1, 3, 5, 7, 9, 11' },
                    { name: 'Mechlorethamine', dose: 6, unit: 'mg/m²', schedule: 'weeks 1, 5, 9' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'weeks 2, 4, 6, 8, 10, 12 (max 2mg)' },
                    { name: 'Bleomycin', dose: 5, unit: 'units/m²', schedule: 'weeks 2, 4, 6, 8, 10, 12' },
                    { name: 'Etoposide', dose: 60, unit: 'mg/m²', schedule: 'weeks 3, 7, 11' },
                    { name: 'Prednisone', dose: 40, unit: 'mg/m²', schedule: 'weeks 1-10 (taper weeks 11-12)' }
                ]
            },
            'EVA': {
                name: 'EVA (Etoposide + Vinblastine + Adriamycin)',
                cycles: 6,
                drugs: [
                    { name: 'Etoposide', dose: 200, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Vinblastine', dose: 6, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 50, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
                ]
            },
            'EVAP': {
                name: 'EVAP (Etoposide + Vinblastine + Adriamycin + Prednisone)',
                cycles: 6,
                drugs: [
                    { name: 'Etoposide', dose: 200, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Vinblastine', dose: 6, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 50, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Prednisone', dose: 40, unit: 'mg/m²', schedule: 'days 1-14, q3weeks x 6 cycles' }
                ]
            },
            'Mini-BEAM': {
                name: 'Mini-BEAM (Carmustine + Etoposide + Cytarabine + Melphalan)',
                cycles: 3,
                drugs: [
                    { name: 'Carmustine (BCNU)', dose: 60, unit: 'mg/m²', schedule: 'day 1, q4weeks x 3 cycles' },
                    { name: 'Etoposide', dose: 75, unit: 'mg/m²', days: 'D2-D5', schedule: 'days 2-5, q4weeks x 3 cycles' },
                    { name: 'Cytarabine (Ara-C)', dose: 100, unit: 'mg/m²', schedule: 'q12h days 2-5, q4weeks x 3 cycles' },
                    { name: 'Melphalan', dose: 30, unit: 'mg/m²', schedule: 'day 6, q4weeks x 3 cycles' }
                ]
            },
            'BEACOPP': {
                name: 'BEACOPP (Bleomycin + Etoposide + Adriamycin + Cyclophosphamide + Oncovin + Procarbazine + Prednisone)',
                cycles: 8,
                drugs: [
                    { name: 'Bleomycin', dose: 10, unit: 'units/m²', schedule: 'day 8, q3weeks x 8 cycles' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q3weeks x 8 cycles' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 25, unit: 'mg/m²', schedule: 'day 1, q3weeks x 8 cycles' },
                    { name: 'Cyclophosphamide', dose: 650, unit: 'mg/m²', schedule: 'day 1, q3weeks x 8 cycles' },
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'day 8, q3weeks x 8 cycles (max 2mg)' },
                    { name: 'Procarbazine', dose: 100, unit: 'mg/m²', days: 'D1-D7', schedule: 'days 1-7, q3weeks x 8 cycles' },
                    { name: 'Prednisone', dose: 40, unit: 'mg/m²', days: 'D1-D14', schedule: 'days 1-14, q3weeks x 8 cycles' }
                ]
            },
            'BEACOPP-Escalated': {
                name: 'BEACOPP Escalated (High-dose)',
                cycles: 8,
                drugs: [
                    { name: 'Bleomycin', dose: 10, unit: 'units/m²', schedule: 'day 8, q3weeks x 8 cycles' },
                    { name: 'Etoposide', dose: 200, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q3weeks x 8 cycles' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 35, unit: 'mg/m²', schedule: 'day 1, q3weeks x 8 cycles' },
                    { name: 'Cyclophosphamide', dose: 1250, unit: 'mg/m²', schedule: 'day 1, q3weeks x 8 cycles' },
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'day 8, q3weeks x 8 cycles (max 2mg)' },
                    { name: 'Procarbazine', dose: 100, unit: 'mg/m²', days: 'D1-D7', schedule: 'days 1-7, q3weeks x 8 cycles' },
                    { name: 'Prednisone', dose: 40, unit: 'mg/m²', days: 'D1-D14', schedule: 'days 1-14, q3weeks x 8 cycles' }
                ]
            },
            'GVD': {
                name: 'GVD (Gemcitabine + Vinorelbine + Doxorubicin)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                    { name: 'Vinorelbine', dose: 20, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Liposomal)', dose: 15, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' }
                ]
            },
            'Gemcitabine-Single': {
                name: 'Gemcitabine (Single Agent)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' }
                ]
            },
            'Brentuximab-Single': {
                name: 'Brentuximab vedotin (Single Agent)',
                cycles: 8,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'day 1, q3weeks x 8 cycles' }
                ]
            },
            'Nivolumab-Single': {
                name: 'Nivolumab (Single Agent)',
                cycles: 8,
                drugs: [
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'q2weeks x 8 cycles, then 480mg q4weeks' }
                ]
            },
            'Pembrolizumab-Single': {
                name: 'Pembrolizumab (Single Agent)',
                cycles: 8,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks x 8 cycles, then 400mg q6weeks' }
                ]
            },
            'Bendamustine-Single': {
                name: 'Bendamustine (Single Agent)',
                cycles: 6,
                drugs: [
                    { name: 'Bendamustine', dose: 120, unit: 'mg/m²', days: 'D1-D2', schedule: 'days 1-2, q4weeks x 6 cycles' }
                ]
            },
            'Everolimus-Single': {
                name: 'Everolimus (Single Agent)',
                cycles: 12,
                drugs: [
                    { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'daily, continuous' }
                ]
            },
            'Lenalidomide-Single': {
                name: 'Lenalidomide (Single Agent)',
                cycles: 12,
                drugs: [
                    { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'days 1-21, q4weeks x 12 cycles' }
                ]
            }
        },
        'non_hodgkins': {
            'R-CHOP': {
                name: 'R-CHOP (Rituximab + CHOP) - DLBCL',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Hydroxydaunorubicin)', dose: 50, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, q3weeks x 6 cycles' }
                ]
            },
            'Pola-R-CHP': {
                name: 'Polatuzumab vedotin + R-CHP (DLBCL)',
                cycles: 6,
                drugs: [
                    { name: 'Polatuzumab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Hydroxydaunorubicin)', dose: 50, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, q3weeks x 6 cycles' }
                ]
            },
            'R-CVP': {
                name: 'R-CVP (Rituximab + CVP) - Indolent NHL',
                cycles: 8,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q3weeks x 8 cycles' },
                    { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'day 1, q3weeks x 8 cycles' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'day 1, q3weeks x 8 cycles (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, q3weeks x 8 cycles' }
                ]
            },
            'R-Bendamustine': {
                name: 'R-Bendamustine (Rituximab + Bendamustine) - Indolent NHL',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q4weeks x 6 cycles' },
                    { name: 'Bendamustine', dose: 90, unit: 'mg/m²', days: 'D1-D2', schedule: 'days 1-2, q4weeks x 6 cycles' }
                ]
            },
            'Obinutuzumab-Bendamustine': {
                name: 'Obinutuzumab + Bendamustine (Indolent NHL)',
                cycles: 6,
                drugs: [
                    { name: 'Obinutuzumab', dose: 1000, unit: 'mg', schedule: 'cycle 1: days 1,8,15; then day 1, q4weeks x 5 cycles' },
                    { name: 'Bendamustine', dose: 90, unit: 'mg/m²', days: 'D1-D2', schedule: 'days 1-2, q4weeks x 6 cycles' }
                ]
            },
            'FCR': {
                name: 'FCR (Fludarabine + Cyclophosphamide + Rituximab) - CLL',
                cycles: 6,
                drugs: [
                    { name: 'Fludarabine', dose: 25, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q4weeks x 6 cycles' },
                    { name: 'Cyclophosphamide', dose: 250, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q4weeks x 6 cycles' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q4weeks x 6 cycles' }
                ]
            },
            'Venetoclax-Obinutuzumab': {
                name: 'Venetoclax + Obinutuzumab (CLL)',
                cycles: 12,
                drugs: [
                    { name: 'Venetoclax', dose: 400, unit: 'mg', schedule: 'daily (after ramp-up: 20→50→100→200→400mg)' },
                    { name: 'Obinutuzumab', dose: 1000, unit: 'mg', schedule: 'cycle 1: days 1,8,15; then day 1, q4weeks x 5 cycles' }
                ]
            },
            'R-EPOCH': {
                name: 'R-EPOCH (High-grade B-cell, HIV-associated, PMBCL)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Etoposide', dose: 50, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, q3weeks x 6 cycles' },
                    { name: 'Prednisone', dose: 60, unit: 'mg/m²', schedule: 'days 1-5, q3weeks x 6 cycles' },
                    { name: 'Vincristine (Oncovin)', dose: 0.4, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, q3weeks x 6 cycles' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'day 5, q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Hydroxydaunorubicin)', dose: 10, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, q3weeks x 6 cycles' }
                ]
            },
            'DA-R-EPOCH': {
                name: 'DA-R-EPOCH (Dose-Adjusted R-EPOCH)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Etoposide', dose: 50, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, q3weeks x 6 cycles (dose-adjusted)' },
                    { name: 'Prednisone', dose: 60, unit: 'mg/m²', schedule: 'days 1-5, q3weeks x 6 cycles' },
                    { name: 'Vincristine', dose: 0.4, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, q3weeks x 6 cycles' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'day 5, q3weeks x 6 cycles (dose-adjusted)' },
                    { name: 'Doxorubicin', dose: 10, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, q3weeks x 6 cycles (dose-adjusted)' }
                ]
            },
            'Ibrutinib': {
                name: 'Ibrutinib (BTK inhibitor - CLL/MCL)',
                cycles: 12,
                drugs: [
                    { name: 'Ibrutinib', dose: 420, unit: 'mg', schedule: 'daily, continuous' }
                ]
            },
            'Acalabrutinib': {
                name: 'Acalabrutinib (BTK inhibitor - CLL)',
                cycles: 12,
                drugs: [
                    { name: 'Acalabrutinib', dose: 100, unit: 'mg', schedule: 'twice daily, continuous' }
                ]
            },
            'Zanubrutinib': {
                name: 'Zanubrutinib (BTK inhibitor - CLL/MCL)',
                cycles: 12,
                drugs: [
                    { name: 'Zanubrutinib', dose: 160, unit: 'mg', schedule: 'twice daily, continuous' }
                ]
            },
            'Rituximab-Monotherapy': {
                name: 'Rituximab Monotherapy (Indolent NHL)',
                cycles: 4,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'weekly x 4 doses, then maintenance q8weeks' }
                ]
            },
            'Lenalidomide-Rituximab': {
                name: 'Lenalidomide + Rituximab (Indolent NHL)',
                cycles: 12,
                drugs: [
                    { name: 'Lenalidomide', dose: 20, unit: 'mg', schedule: 'days 1-21, q4weeks x 12 cycles' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'weekly x 4, then q8weeks x 5 doses' }
                ]
            },
            'Idelalisib-Rituximab': {
                name: 'Idelalisib + Rituximab (PI3K inhibitor - CLL/FL)',
                cycles: 12,
                drugs: [
                    { name: 'Idelalisib', dose: 150, unit: 'mg', schedule: 'twice daily, continuous' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'weekly x 8, then q12weeks' }
                ]
            },
            'Copanlisib': {
                name: 'Copanlisib (PI3K inhibitor - Relapsed/Refractory FL)',
                cycles: 6,
                drugs: [
                    { name: 'Copanlisib', dose: 60, unit: 'mg', schedule: 'days 1, 8, 15, q4weeks x 6 cycles' }
                ]
            },
            'Tazemetostat': {
                name: 'Tazemetostat (EZH2 inhibitor - EZH2-mutated FL)',
                cycles: 12,
                drugs: [
                    { name: 'Tazemetostat', dose: 800, unit: 'mg', schedule: 'twice daily, continuous' }
                ]
            },
            'Duvelisib': {
                name: 'Duvelisib (PI3K inhibitor - CLL/FL)',
                cycles: 12,
                drugs: [
                    { name: 'Duvelisib', dose: 25, unit: 'mg', schedule: 'twice daily, continuous' }
                ]
            },
            'DRC': {
                name: 'DRC (Dexamethasone + Rituximab + Cyclophosphamide) - WM',
                cycles: 6,
                drugs: [
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 1, 8, 15, 22, q5weeks x 6 cycles' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q5weeks x 6 cycles' },
                    { name: 'Cyclophosphamide', dose: 100, unit: 'mg/m²', schedule: 'days 1-5, q5weeks x 6 cycles' }
                ]
            },
            'BDR': {
                name: 'BDR (Bortezomib + Dexamethasone + Rituximab) - WM',
                cycles: 6,
                drugs: [
                    { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'days 1, 4, 8, 11, q3weeks x 6 cycles' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 1, 4, 8, 11, q3weeks x 6 cycles' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
                ]
            },
            'Bortezomib': {
                name: 'Bortezomib (Proteasome inhibitor - MCL/MM)',
                cycles: 8,
                drugs: [
                    { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'days 1, 4, 8, 11, q3weeks x 8 cycles' }
                ]
            },
            'Carfilzomib': {
                name: 'Carfilzomib (Proteasome inhibitor - MM)',
                cycles: 8,
                drugs: [
                    { name: 'Carfilzomib', dose: 27, unit: 'mg/m²', schedule: 'days 1, 2, 8, 9, 15, 16, q4weeks x 8 cycles' }
                ]
            },
            'FC': {
                name: 'FC (Fludarabine + Cyclophosphamide) - CLL',
                cycles: 6,
                drugs: [
                    { name: 'Fludarabine', dose: 25, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q4weeks x 6 cycles' },
                    { name: 'Cyclophosphamide', dose: 250, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q4weeks x 6 cycles' }
                ]
            },
            'R-FCM': {
                name: 'R-FCM (Rituximab + Fludarabine + Cyclophosphamide + Mitoxantrone)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q4weeks x 6 cycles' },
                    { name: 'Fludarabine', dose: 25, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q4weeks x 6 cycles' },
                    { name: 'Cyclophosphamide', dose: 200, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q4weeks x 6 cycles' },
                    { name: 'Mitoxantrone', dose: 6, unit: 'mg/m²', schedule: 'day 1, q4weeks x 6 cycles' }
                ]
            },
            'R-mini-CHOP': {
                name: 'R-mini-CHOP (Elderly/Frail patients)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Cyclophosphamide', dose: 400, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Doxorubicin', dose: 25, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Vincristine', dose: 1, unit: 'mg', schedule: 'day 1, q3weeks x 6 cycles (max 1mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, q3weeks x 6 cycles' }
                ]
            },
            'R-CEPP': {
                name: 'R-CEPP (Rituximab + CEPP)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q4weeks x 6 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q4weeks x 6 cycles' },
                    { name: 'Etoposide', dose: 70, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q4weeks x 6 cycles' },
                    { name: 'Procarbazine', dose: 60, unit: 'mg/m²', days: 'D1-D10', schedule: 'days 1-10, q4weeks x 6 cycles' },
                    { name: 'Prednisone', dose: 60, unit: 'mg/m²', days: 'D1-D10', schedule: 'days 1-10, q4weeks x 6 cycles' }
                ]
            },
            'R-CDOP': {
                name: 'R-CDOP (Rituximab + CDOP)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, q3weeks x 6 cycles' }
                ]
            },
            'R-ICE': {
                name: 'R-ICE (Relapsed/Refractory)',
                cycles: 3,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q3weeks x 3 cycles' },
                    { name: 'Ifosfamide', dose: 5000, unit: 'mg/m²', schedule: 'day 2, q3weeks x 3 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 2, q3weeks x 3 cycles' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q3weeks x 3 cycles' }
                ]
            },
            'R-DHAP': {
                name: 'R-DHAP (Relapsed/Refractory)',
                cycles: 3,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q3weeks x 3 cycles' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 1-4, q3weeks x 3 cycles' },
                    { name: 'Cytarabine (High-dose)', dose: 2000, unit: 'mg/m²', schedule: 'day 2, q12h x 2 doses, q3weeks x 3 cycles' },
                    { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'day 1, q3weeks x 3 cycles' }
                ]
            },
            'R-ESHAP': {
                name: 'R-ESHAP (Relapsed/Refractory)',
                cycles: 3,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q3weeks x 3 cycles' },
                    { name: 'Etoposide', dose: 40, unit: 'mg/m²', days: 'D1-D4', schedule: 'days 1-4, q3weeks x 3 cycles' },
                    { name: 'Methylprednisolone (Solu-Medrol)', dose: 500, unit: 'mg', days: 'D1-D5', schedule: 'days 1-5, q3weeks x 3 cycles' },
                    { name: 'Cytarabine (High-dose)', dose: 2000, unit: 'mg/m²', schedule: 'day 5, q3weeks x 3 cycles' },
                    { name: 'Cisplatin', dose: 25, unit: 'mg/m²', days: 'D1-D4', schedule: 'days 1-4, q3weeks x 3 cycles' }
                ]
            },
            'R-GDP': {
                name: 'R-GDP (Relapsed/Refractory)',
                cycles: 3,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q3weeks x 3 cycles' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 3 cycles' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', days: 'D1-D4', schedule: 'days 1-4, q3weeks x 3 cycles' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 3 cycles' }
                ]
            },
            'R-GemOx': {
                name: 'R-GemOx (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q2weeks x 6 cycles' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'day 1, q2weeks x 6 cycles' },
                    { name: 'Oxaliplatin', dose: 100, unit: 'mg/m²', schedule: 'day 1, q2weeks x 6 cycles' }
                ]
            },
            'Pola-BR': {
                name: 'Pola-BR (Polatuzumab + Bendamustine + Rituximab) - R/R DLBCL',
                cycles: 6,
                drugs: [
                    { name: 'Polatuzumab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Bendamustine', dose: 90, unit: 'mg/m²', days: 'D1-D2', schedule: 'days 1-2, q3weeks x 6 cycles' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
                ]
            },
            'Tafasitamab-Lenalidomide': {
                name: 'Tafasitamab + Lenalidomide (R/R DLBCL)',
                cycles: 12,
                drugs: [
                    { name: 'Tafasitamab', dose: 12, unit: 'mg/kg', schedule: 'days 1, 8, 15, 22 (cycle 1); days 1, 15 (cycles 2-3); day 1 (cycles 4-12)' },
                    { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'days 1-21, q4weeks x 12 cycles' }
                ]
            },
            'R-CODOX-M-IVAC': {
                name: 'R-CODOX-M/IVAC (Burkitt/High-grade B-cell)',
                cycles: 4,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'per protocol schedule' },
                    { name: 'Cyclophosphamide', dose: 800, unit: 'mg/m²', schedule: 'day 1 (CODOX-M)' },
                    { name: 'Vincristine (Oncovin)', dose: 1.5, unit: 'mg/m²', schedule: 'days 1, 8 (CODOX-M) max 2mg' },
                    { name: 'Doxorubicin', dose: 40, unit: 'mg/m²', schedule: 'day 1 (CODOX-M)' },
                    { name: 'Methotrexate (High-dose)', dose: 3000, unit: 'mg/m²', schedule: 'day 10 (CODOX-M)' },
                    { name: 'Ifosfamide', dose: 1500, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5 (IVAC)' },
                    { name: 'Etoposide', dose: 60, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5 (IVAC)' },
                    { name: 'Cytarabine (High-dose)', dose: 2000, unit: 'mg/m²', schedule: 'days 1, 2 (IVAC)' }
                ]
            },
            'Hyper-CVAD-MA-R': {
                name: 'Hyper-CVAD/MA + R (Burkitt/High-grade B-cell)',
                cycles: 8,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, alternating cycles' },
                    { name: 'Cyclophosphamide', dose: 300, unit: 'mg/m²', schedule: 'q12h x 6 doses (Hyper-CVAD)' },
                    { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'days 4, 11 (Hyper-CVAD)' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'day 4 (Hyper-CVAD)' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 1-4, 11-14 (Hyper-CVAD)' },
                    { name: 'Methotrexate (High-dose)', dose: 1000, unit: 'mg/m²', schedule: 'day 1 (MA)' },
                    { name: 'Cytarabine (High-dose)', dose: 3000, unit: 'mg/m²', schedule: 'q12h days 2-3 (MA)' }
                ]
            },
            'Pembrolizumab-NHL': {
                name: 'Pembrolizumab (PD-L1 positive NHL)',
                cycles: 8,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks x 8 cycles, then 400mg q6weeks' }
                ]
            },
            'CHOP': {
                name: 'CHOP (T-cell lymphomas)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Hydroxydaunorubicin)', dose: 50, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, q3weeks x 6 cycles' }
                ]
            },
            'CHOEP': {
                name: 'CHOEP (T-cell lymphomas)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Hydroxydaunorubicin)', dose: 50, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles (max 2mg)' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q3weeks x 6 cycles' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, q3weeks x 6 cycles' }
                ]
            },
            'CHOP-Brentuximab': {
                name: 'CHOP + Brentuximab vedotin (CD30+ PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Hydroxydaunorubicin)', dose: 50, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, q3weeks x 6 cycles' },
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'day 1, q3weeks x 6 cycles' }
                ]
            },
            'Brentuximab-CHP': {
                name: 'Brentuximab vedotin + CHP (CD30+ PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Hydroxydaunorubicin)', dose: 50, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, q3weeks x 6 cycles' }
                ]
            },
            'Brentuximab-PTCL': {
                name: 'Brentuximab vedotin (CD30+ PTCL)',
                cycles: 8,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'day 1, q3weeks x 8 cycles' }
                ]
            },
            'Belinostat': {
                name: 'Belinostat (HDAC inhibitor - PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Belinostat', dose: 1000, unit: 'mg/m²', schedule: 'days 1-5, q3weeks x 6 cycles' }
                ]
            },
            'Romidepsin': {
                name: 'Romidepsin (HDAC inhibitor - PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Romidepsin', dose: 14, unit: 'mg/m²', schedule: 'days 1, 8, 15, q4weeks x 6 cycles' }
                ]
            },
            'Pralatrexate': {
                name: 'Pralatrexate (PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Pralatrexate', dose: 30, unit: 'mg/m²', schedule: 'weekly x 6 weeks, then 1 week rest' }
                ]
            },
            'Alemtuzumab': {
                name: 'Alemtuzumab (T-cell lymphomas)',
                cycles: 6,
                drugs: [
                    { name: 'Alemtuzumab', dose: 30, unit: 'mg', schedule: 'days 1, 3, 5 weekly x 6 cycles' }
                ]
            },
            'Crizotinib-ALCL': {
                name: 'Crizotinib (ALK-positive ALCL)',
                cycles: 12,
                drugs: [
                    { name: 'Crizotinib', dose: 250, unit: 'mg', schedule: 'twice daily, continuous' }
                ]
            },
            'Alectinib-ALCL': {
                name: 'Alectinib (ALK-positive ALCL)',
                cycles: 12,
                drugs: [
                    { name: 'Alectinib', dose: 600, unit: 'mg', schedule: 'twice daily, continuous' }
                ]
            },
            'SMILE': {
                name: 'SMILE (Extranodal NK/T-cell lymphoma)',
                cycles: 3,
                drugs: [
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 2-4, q3weeks x 3 cycles' },
                    { name: 'Methotrexate', dose: 2000, unit: 'mg/m²', schedule: 'day 1, q3weeks x 3 cycles' },
                    { name: 'Ifosfamide', dose: 1500, unit: 'mg/m²', days: 'D2-D4', schedule: 'days 2-4, q3weeks x 3 cycles' },
                    { name: 'L-asparaginase', dose: 6000, unit: 'units/m²', schedule: 'days 8, 10, 12, 14, 16, 18, 20, q3weeks x 3 cycles' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D2-D4', schedule: 'days 2-4, q3weeks x 3 cycles' }
                ]
            },
            'DDGP': {
                name: 'DDGP (Extranodal NK/T-cell lymphoma)',
                cycles: 6,
                drugs: [
                    { name: 'Cisplatin', dose: 25, unit: 'mg/m²', days: 'D1-D4', schedule: 'days 1-4, q3weeks x 6 cycles' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', days: 'D1-D4', schedule: 'days 1-4, q3weeks x 6 cycles' },
                    { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                    { name: 'Pegaspargase', dose: 2500, unit: 'units/m²', schedule: 'day 1, q3weeks x 6 cycles' }
                ]
            },
            'P-GEMOX': {
                name: 'P-GEMOX (Extranodal NK/T-cell lymphoma)',
                cycles: 6,
                drugs: [
                    { name: 'Pegaspargase', dose: 2500, unit: 'units/m²', schedule: 'day 1, q2weeks x 6 cycles' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'day 1, q2weeks x 6 cycles' },
                    { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'day 1, q2weeks x 6 cycles' }
                ]
            },
            'AspaMetDex': {
                name: 'AspaMetDex (Extranodal NK/T-cell lymphoma)',
                cycles: 6,
                drugs: [
                    { name: 'L-asparaginase', dose: 6000, unit: 'units/m²', schedule: 'days 1, 3, 5, 7, 9, 11, q3weeks x 6 cycles' },
                    { name: 'Methotrexate', dose: 3000, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 1-4, q3weeks x 6 cycles' }
                ]
            },
            'Fludarabine': {
                name: 'Fludarabine (Single agent - CLL/FL)',
                cycles: 6,
                drugs: [
                    { name: 'Fludarabine', dose: 25, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q4weeks x 6 cycles' }
                ]
            },
            'Cladribine': {
                name: 'Cladribine (Single agent - HCL)',
                cycles: 1,
                drugs: [
                    { name: 'Cladribine', dose: 0.1, unit: 'mg/kg', days: 'D1-D7', schedule: 'continuous infusion days 1-7, single cycle' }
                ]
            },
            'MTR': {
                name: 'MTR (Methotrexate + Temozolomide + Rituximab) - PCNSL',
                cycles: 8,
                drugs: [
                    { name: 'Methotrexate (High-dose)', dose: 3500, unit: 'mg/m²', schedule: 'day 1, q2weeks x 8 cycles' },
                    { name: 'Temozolomide', dose: 150, unit: 'mg/m²', days: 'D1-D7', schedule: 'days 1-7, q2weeks x 8 cycles' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q2weeks x 8 cycles' }
                ]
            },
            'HD-Methotrexate': {
                name: 'High-dose Methotrexate (PCNSL)',
                cycles: 8,
                drugs: [
                    { name: 'Methotrexate (High-dose)', dose: 3500, unit: 'mg/m²', schedule: 'day 1, q2weeks x 8 cycles' }
                ]
            },
            'Temozolomide': {
                name: 'Temozolomide (PCNSL)',
                cycles: 6,
                drugs: [
                    { name: 'Temozolomide', dose: 150, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q4weeks x 6 cycles' }
                ]
            },
            'Topotecan-NHL': {
                name: 'Topotecan (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q3weeks x 6 cycles' }
                ]
            },
            'Axi-cel': {
                name: 'Axicabtagene ciloleucel (CAR-T therapy)',
                cycles: 1,
                drugs: [
                    { name: 'Axicabtagene ciloleucel', dose: '2×10⁶', unit: 'CAR+ cells/kg', schedule: 'single infusion after lymphodepletion' }
                ]
            },
            'Liso-cel': {
                name: 'Lisocabtagene maraleucel (CAR-T therapy)',
                cycles: 1,
                drugs: [
                    { name: 'Lisocabtagene maraleucel', dose: '1×10⁸', unit: 'CAR+ cells', schedule: 'single infusion after lymphodepletion' }
                ]
            },
            'Tisa-cel': {
                name: 'Tisagenlecleucel (CAR-T therapy)',
                cycles: 1,
                drugs: [
                    { name: 'Tisagenlecleucel', dose: '0.6-6×10⁸', unit: 'CAR+ cells', schedule: 'single infusion after lymphodepletion' }
                ]
            },
            'Loncastuximab-tesirine': {
                name: 'Loncastuximab tesirine (ADC - R/R DLBCL)',
                cycles: 6,
                drugs: [
                    { name: 'Loncastuximab tesirine', dose: 150, unit: 'mcg/kg', schedule: 'day 1, q3weeks x 2 cycles, then 75 mcg/kg q3weeks x 4 cycles' }
                ]
            },
            'Nordic-Protocol': {
                name: 'Nordic Protocol (MCL)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'per protocol' },
                    { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'per Nordic protocol' },
                    { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'per Nordic protocol' },
                    { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'per Nordic protocol' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'per Nordic protocol' },
                    { name: 'Cytarabine (High-dose)', dose: 3000, unit: 'mg/m²', schedule: 'per Nordic protocol' }
                ]
            }
        }
    },
    melanoma: {
        'Nivolumab': {
            name: 'Nivolumab (Anti-PD-1 - First-line metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'q2weeks x 8 cycles, then 480mg q4weeks' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab (Anti-PD-1 - First-line metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks x 8 cycles, then 400mg q6weeks' }
            ]
        },
        'Nivolumab-Ipilimumab': {
            name: 'Nivolumab + Ipilimumab (Combination immunotherapy)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 1, unit: 'mg/kg', schedule: 'q3weeks x 4 cycles, then 240mg q2weeks' },
                { name: 'Ipilimumab', dose: 3, unit: 'mg/kg', schedule: 'q3weeks x 4 cycles only' }
            ]
        },
        'Nivolumab-Relatlimab': {
            name: 'Nivolumab + Relatlimab (LAG-3 + PD-1 inhibition)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 480, unit: 'mg', schedule: 'q4weeks x 8 cycles' },
                { name: 'Relatlimab', dose: 160, unit: 'mg', schedule: 'q4weeks x 8 cycles' }
            ]
        },
        'Dabrafenib-Trametinib': {
            name: 'Dabrafenib + Trametinib (BRAF V600E/K mutation)',
            cycles: 12,
            drugs: [
                { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'twice daily, continuous' },
                { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Vemurafenib-Cobimetinib': {
            name: 'Vemurafenib + Cobimetinib (BRAF V600E/K mutation)',
            cycles: 12,
            drugs: [
                { name: 'Vemurafenib', dose: 960, unit: 'mg', schedule: 'twice daily, continuous' },
                { name: 'Cobimetinib', dose: 60, unit: 'mg', schedule: 'daily x 21 days, then 7 days off' }
            ]
        },
        'Encorafenib-Binimetinib': {
            name: 'Encorafenib + Binimetinib (BRAF V600E/K mutation)',
            cycles: 12,
            drugs: [
                { name: 'Encorafenib', dose: 450, unit: 'mg', schedule: 'daily, continuous' },
                { name: 'Binimetinib', dose: 45, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Atezolizumab-Vemurafenib-Cobimetinib': {
            name: 'Atezolizumab + Vemurafenib + Cobimetinib (BRAF V600 + PD-L1)',
            cycles: 8,
            drugs: [
                { name: 'Atezolizumab', dose: 840, unit: 'mg', schedule: 'q2weeks x 8 cycles, then 1200mg q3weeks' },
                { name: 'Vemurafenib', dose: 720, unit: 'mg', schedule: 'twice daily, continuous' },
                { name: 'Cobimetinib', dose: 60, unit: 'mg', schedule: 'daily x 21 days, then 7 days off' }
            ]
        },
        'Ipilimumab': {
            name: 'Ipilimumab (Anti-CTLA-4 monotherapy)',
            cycles: 4,
            drugs: [
                { name: 'Ipilimumab', dose: 3, unit: 'mg/kg', schedule: 'q3weeks x 4 cycles' }
            ]
        },
        'Interferon-alpha-2b': {
            name: 'Interferon alfa-2b (High-risk adjuvant)',
            cycles: 12,
            drugs: [
                { name: 'Interferon alfa-2b', dose: 20, unit: 'MIU/m²', schedule: 'IV 5 days/week x 4 weeks, then 10 MIU/m² SC 3x/week' }
            ]
        },
        'Peg-Interferon-alpha-2b': {
            name: 'Peginterferon alfa-2b (High-risk adjuvant)',
            cycles: 12,
            drugs: [
                { name: 'Peginterferon alfa-2b', dose: 6, unit: 'mcg/kg', schedule: 'SC weekly x 8 weeks, then 3 mcg/kg weekly' }
            ]
        },
        'Dacarbazine-Carmustine-Cisplatin': {
            name: 'DCC (Dacarbazine + Carmustine + Cisplatin)',
            cycles: 6,
            drugs: [
                { name: 'Dacarbazine', dose: 220, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q4weeks x 6 cycles' },
                { name: 'Carmustine (BCNU)', dose: 150, unit: 'mg/m²', schedule: 'day 1, q6weeks (cycles 1, 3, 5)' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q4weeks x 6 cycles' }
            ]
        },
        'IFN-Dacarbazine': {
            name: 'Interferon + Dacarbazine',
            cycles: 6,
            drugs: [
                { name: 'Interferon alfa-2b', dose: 15, unit: 'MIU/m²', schedule: 'SC daily x 5 days/week' },
                { name: 'Dacarbazine', dose: 200, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q3weeks x 6 cycles' }
            ]
        },
        'Temozolomide-Thalidomide': {
            name: 'Temozolomide + Thalidomide',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 150, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q4weeks x 6 cycles' },
                { name: 'Thalidomide', dose: 200, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Dacarbazine': {
            name: 'Dacarbazine (Single agent)',
            cycles: 6,
            drugs: [
                { name: 'Dacarbazine', dose: 250, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q3weeks x 6 cycles' }
            ]
        },
        'Aldesleukin': {
            name: 'Aldesleukin (High-dose IL-2)',
            cycles: 2,
            drugs: [
                { name: 'Aldesleukin (IL-2)', dose: 600000, unit: 'IU/kg', schedule: 'q8h x 14 doses (cycle 1), then q8h x 14 doses (cycle 2)' }
            ]
        },
        'Temozolomide': {
            name: 'Temozolomide (Single agent)',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 200, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q4weeks x 6 cycles' }
            ]
        },
        'Trametinib': {
            name: 'Trametinib (Single agent MEK inhibitor)',
            cycles: 12,
            drugs: [
                { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Dabrafenib': {
            name: 'Dabrafenib (Single agent BRAF inhibitor)',
            cycles: 12,
            drugs: [
                { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        }
    },
    ovarian: {
        'Carboplatin-Paclitaxel-3weekly': {
            name: 'Carboplatin + Paclitaxel (3-weekly - First-line)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Carboplatin-Paclitaxel-weekly': {
            name: 'Carboplatin + Paclitaxel (Weekly - First-line)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'day 1, weekly x 18 weeks' },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'day 1, weekly x 18 weeks' }
            ]
        },
        'Carboplatin-Paclitaxel-Bevacizumab': {
            name: 'Carboplatin + Paclitaxel + Bevacizumab (First-line)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'day 1, q3weeks x 6 cycles, then maintenance' }
            ]
        },
        'Bevacizumab-Maintenance': {
            name: 'Bevacizumab Maintenance (Post first-line)',
            cycles: 12,
            drugs: [
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'q3weeks x 12 cycles (maintenance)' }
            ]
        },
        'Carboplatin-Docetaxel': {
            name: 'Carboplatin + Docetaxel (First-line alternative)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Carboplatin-Doxorubicin-Liposomal': {
            name: 'Carboplatin + Doxorubicin liposomal (Recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 1, q4weeks x 6 cycles' },
                { name: 'Doxorubicin liposomal', dose: 40, unit: 'mg/m²', schedule: 'day 1, q4weeks x 6 cycles' }
            ]
        },
        'Gemcitabine-Doxorubicin-Liposomal': {
            name: 'Gemcitabine + Doxorubicin liposomal (Recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Doxorubicin liposomal', dose: 30, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Gemcitabine-Cisplatin': {
            name: 'Gemcitabine + Cisplatin (Recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Gemcitabine-Carboplatin': {
            name: 'Gemcitabine + Carboplatin (Recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Carboplatin', dose: 'AUC 4', unit: 'AUC', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'IP-Cisplatin-Paclitaxel': {
            name: 'IP Cisplatin + IV Paclitaxel + IP Paclitaxel (First-line optimal debulking)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel (IV)', dose: 135, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Cisplatin (IP)', dose: 75, unit: 'mg/m²', schedule: 'day 2, q3weeks x 6 cycles' },
                { name: 'Paclitaxel (IP)', dose: 60, unit: 'mg/m²', schedule: 'day 8, q3weeks x 6 cycles' }
            ]
        },
        'Pemetrexed-Carboplatin': {
            name: 'Pemetrexed + Carboplatin (Recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Olaparib-Bevacizumab': {
            name: 'Olaparib + Bevacizumab (First-line maintenance - HRD+)',
            cycles: 24,
            drugs: [
                { name: 'Olaparib', dose: 300, unit: 'mg', schedule: 'twice daily, continuous' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'q3weeks x 12 cycles, then olaparib alone' }
            ]
        },
        'Niraparib-Bevacizumab': {
            name: 'Niraparib + Bevacizumab (First-line maintenance)',
            cycles: 24,
            drugs: [
                { name: 'Niraparib', dose: 200, unit: 'mg', schedule: 'daily, continuous (individualized dosing)' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'q3weeks x 12 cycles, then niraparib alone' }
            ]
        },
        'Carboplatin-Cyclophosphamide': {
            name: 'Carboplatin + Cyclophosphamide (Elderly/frail)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 1, q4weeks x 6 cycles' },
                { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'day 1, q4weeks x 6 cycles' }
            ]
        },
        'Cisplatin-Cyclophosphamide': {
            name: 'Cisplatin + Cyclophosphamide (Historical first-line)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Mirvetuximab-soravtansine': {
            name: 'Mirvetuximab soravtansine (FRα+ recurrent)',
            cycles: 8,
            drugs: [
                { name: 'Mirvetuximab soravtansine', dose: 6, unit: 'mg/kg', schedule: 'q3weeks x 8 cycles (FRα high)' }
            ]
        },
        'Altretamine': {
            name: 'Altretamine (Single agent - recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Altretamine', dose: 260, unit: 'mg/m²', schedule: 'daily x 14 days, q4weeks x 6 cycles' }
            ]
        },
        'Doxorubicin-Liposomal': {
            name: 'Doxorubicin liposomal (Single agent - recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin liposomal', dose: 40, unit: 'mg/m²', schedule: 'q4weeks x 6 cycles' }
            ]
        },
        'Paclitaxel-Single': {
            name: 'Paclitaxel (Single agent - recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly x 18 weeks' }
            ]
        },
        'Ixabepilone': {
            name: 'Ixabepilone (Single agent - recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Ixabepilone', dose: 40, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Topotecan': {
            name: 'Topotecan (Single agent - recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q3weeks x 6 cycles' }
            ]
        },
        'Gemcitabine-Single': {
            name: 'Gemcitabine (Single agent - recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8,D15', schedule: 'days 1, 8, 15, q4weeks x 6 cycles' }
            ]
        },
        'Etoposide': {
            name: 'Etoposide (Single agent - recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 50, unit: 'mg/m²', days: 'D1-D21', schedule: 'daily x 21 days, q4weeks x 6 cycles' }
            ]
        },
        'Vinorelbine': {
            name: 'Vinorelbine (Single agent - recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Vinorelbine', dose: 30, unit: 'mg/m²', schedule: 'weekly x 18 weeks' }
            ]
        },
        'Pemetrexed-Single': {
            name: 'Pemetrexed (Single agent - recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Bevacizumab-Single': {
            name: 'Bevacizumab (Single agent - recurrent)',
            cycles: 8,
            drugs: [
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'q3weeks x 8 cycles' }
            ]
        },
        'Capecitabine': {
            name: 'Capecitabine (Single agent - recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'twice daily x 14 days, q3weeks x 6 cycles' }
            ]
        },
        'Olaparib': {
            name: 'Olaparib (BRCA+ maintenance/recurrent)',
            cycles: 24,
            drugs: [
                { name: 'Olaparib', dose: 300, unit: 'mg', schedule: 'twice daily, continuous (BRCA1/2 mutation)' }
            ]
        },
        'Rucaparib': {
            name: 'Rucaparib (BRCA+ or HRD+ maintenance/recurrent)',
            cycles: 24,
            drugs: [
                { name: 'Rucaparib', dose: 600, unit: 'mg', schedule: 'twice daily, continuous (BRCA1/2 or HRD+)' }
            ]
        },
        'Niraparib': {
            name: 'Niraparib (Maintenance - all patients)',
            cycles: 24,
            drugs: [
                { name: 'Niraparib', dose: 200, unit: 'mg', schedule: 'daily, continuous (individualized dosing: 200-300mg)' }
            ]
        },
        'Talazoparib': {
            name: 'Talazoparib (BRCA+ recurrent)',
            cycles: 24,
            drugs: [
                { name: 'Talazoparib', dose: 1, unit: 'mg', schedule: 'daily, continuous (BRCA1/2 mutation)' }
            ]
        },
        'Veliparib-Carboplatin-Paclitaxel': {
            name: 'Veliparib + Carboplatin + Paclitaxel (BRCA+ first-line)',
            cycles: 6,
            drugs: [
                { name: 'Veliparib', dose: 150, unit: 'mg', schedule: 'twice daily, continuous' },
                { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Dostarlimab': {
            name: 'Dostarlimab (dMMR/MSI-H recurrent)',
            cycles: 8,
            drugs: [
                { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'q3weeks x 4 cycles, then 1000mg q6weeks' }
            ]
        },
        'Pembrolizumab-Ovarian': {
            name: 'Pembrolizumab (MSI-H/dMMR recurrent)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks x 8 cycles, then 400mg q6weeks' }
            ]
        },
        'BEP': {
            name: 'BEP (Bleomycin + Etoposide + Cisplatin) - Germ Cell',
            cycles: 3,
            drugs: [
                { name: 'Bleomycin', dose: 30, unit: 'units', schedule: 'days 1, 8, 15, q3weeks x 3 cycles' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q3weeks x 3 cycles' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q3weeks x 3 cycles' }
            ]
        }
    },
    prostate: {
        'Docetaxel-Prednisone': {
            name: 'Docetaxel + Prednisone (mCSPC/mCRPC first-line)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Prednisone', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Docetaxel-Leuprolide': {
            name: 'Docetaxel + Leuprolide (mCSPC)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Leuprolide', dose: 22.5, unit: 'mg', schedule: 'IM q3months, continuous' },
                { name: 'Prednisone', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Docetaxel-Prednisone-Bevacizumab': {
            name: 'Docetaxel + Prednisone + Bevacizumab (mCRPC)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Prednisone', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Cabazitaxel-Prednisone': {
            name: 'Cabazitaxel + Prednisone (mCRPC post-docetaxel)',
            cycles: 8,
            drugs: [
                { name: 'Cabazitaxel', dose: 20, unit: 'mg/m²', schedule: 'day 1, q3weeks x 8 cycles' },
                { name: 'Prednisone', dose: 10, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Cabazitaxel-Carboplatin': {
            name: 'Cabazitaxel + Carboplatin (mCRPC - DNA repair defects)',
            cycles: 6,
            drugs: [
                { name: 'Cabazitaxel', dose: 20, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Carboplatin', dose: 'AUC 4', unit: 'AUC', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Abiraterone-Prednisone': {
            name: 'Abiraterone + Prednisone (mCSPC/mCRPC)',
            cycles: 12,
            drugs: [
                { name: 'Abiraterone acetate', dose: 1000, unit: 'mg', schedule: 'daily on empty stomach, continuous' },
                { name: 'Prednisone', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Niraparib-Abiraterone-Prednisone': {
            name: 'Niraparib + Abiraterone + Prednisone (mCRPC - HRR mutations)',
            cycles: 12,
            drugs: [
                { name: 'Niraparib', dose: 200, unit: 'mg', schedule: 'daily, continuous (HRR gene mutations)' },
                { name: 'Abiraterone acetate', dose: 1000, unit: 'mg', schedule: 'daily on empty stomach, continuous' },
                { name: 'Prednisone', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Olaparib-Abiraterone-Prednisone': {
            name: 'Olaparib + Abiraterone + Prednisone (mCRPC - HRR mutations)',
            cycles: 12,
            drugs: [
                { name: 'Olaparib', dose: 300, unit: 'mg', schedule: 'twice daily, continuous (HRR gene mutations)' },
                { name: 'Abiraterone acetate', dose: 1000, unit: 'mg', schedule: 'daily on empty stomach, continuous' },
                { name: 'Prednisone', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Talazoparib-Enzalutamide': {
            name: 'Talazoparib + Enzalutamide (mCRPC - HRR mutations)',
            cycles: 12,
            drugs: [
                { name: 'Talazoparib', dose: 1, unit: 'mg', schedule: 'daily, continuous (HRR gene mutations)' },
                { name: 'Enzalutamide', dose: 160, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Mitoxantrone-Prednisone': {
            name: 'Mitoxantrone + Prednisone (mCRPC - palliation)',
            cycles: 6,
            drugs: [
                { name: 'Mitoxantrone', dose: 12, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Prednisone', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Estramustine-Etoposide': {
            name: 'Estramustine + Etoposide (mCRPC)',
            cycles: 6,
            drugs: [
                { name: 'Estramustine', dose: 280, unit: 'mg', schedule: 'three times daily x 21 days' },
                { name: 'Etoposide', dose: 50, unit: 'mg/m²', days: 'D1-D21', schedule: 'daily x 21 days, q4weeks x 6 cycles' }
            ]
        },
        'Estramustine-Vinblastine': {
            name: 'Estramustine + Vinblastine (mCRPC)',
            cycles: 6,
            drugs: [
                { name: 'Estramustine', dose: 280, unit: 'mg', schedule: 'three times daily, continuous' },
                { name: 'Vinblastine', dose: 4, unit: 'mg/m²', schedule: 'weekly x 6 weeks, then q2weeks' }
            ]
        },
        'Paclitaxel-Estramustine': {
            name: 'Paclitaxel + Estramustine (mCRPC)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'weekly x 6 weeks' },
                { name: 'Estramustine', dose: 280, unit: 'mg', schedule: 'three times daily, continuous' }
            ]
        },
        'Docetaxel-Estramustine': {
            name: 'Docetaxel + Estramustine (mCRPC)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 70, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Estramustine', dose: 280, unit: 'mg', schedule: 'three times daily, days 1-5' }
            ]
        },
        'Flutamide-Leuprolide': {
            name: 'Flutamide + Leuprolide (ADT combination)',
            cycles: 12,
            drugs: [
                { name: 'Flutamide', dose: 250, unit: 'mg', schedule: 'three times daily, continuous' },
                { name: 'Leuprolide', dose: 22.5, unit: 'mg', schedule: 'IM q3months, continuous' }
            ]
        },
        'Flutamide-Goserelin': {
            name: 'Flutamide + Goserelin (ADT combination)',
            cycles: 12,
            drugs: [
                { name: 'Flutamide', dose: 250, unit: 'mg', schedule: 'three times daily, continuous' },
                { name: 'Goserelin', dose: 10.8, unit: 'mg', schedule: 'SC q3months, continuous' }
            ]
        },
        'Enzalutamide': {
            name: 'Enzalutamide (mCSPC/mCRPC)',
            cycles: 12,
            drugs: [
                { name: 'Enzalutamide', dose: 160, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Apalutamide': {
            name: 'Apalutamide (nmCRPC/mCSPC)',
            cycles: 12,
            drugs: [
                { name: 'Apalutamide', dose: 240, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Darolutamide': {
            name: 'Darolutamide (nmCRPC)',
            cycles: 12,
            drugs: [
                { name: 'Darolutamide', dose: 600, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Olaparib': {
            name: 'Olaparib (mCRPC - HRR gene mutations)',
            cycles: 12,
            drugs: [
                { name: 'Olaparib', dose: 400, unit: 'mg', schedule: 'twice daily, continuous (germline/somatic HRR mutations)' }
            ]
        },
        'Rucaparib': {
            name: 'Rucaparib (mCRPC - BRCA mutations)',
            cycles: 12,
            drugs: [
                { name: 'Rucaparib', dose: 600, unit: 'mg', schedule: 'twice daily, continuous (BRCA1/2 mutations)' }
            ]
        },
        'Pembrolizumab-Prostate': {
            name: 'Pembrolizumab (mCRPC - MSI-H/dMMR)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks x 8 cycles (MSI-H/dMMR)' }
            ]
        },
        'Leuprolide': {
            name: 'Leuprolide (ADT monotherapy)',
            cycles: 12,
            drugs: [
                { name: 'Leuprolide', dose: 22.5, unit: 'mg', schedule: 'IM q3months, continuous' }
            ]
        },
        'Goserelin': {
            name: 'Goserelin (ADT monotherapy)',
            cycles: 12,
            drugs: [
                { name: 'Goserelin', dose: 10.8, unit: 'mg', schedule: 'SC q3months, continuous' }
            ]
        },
        'Degarelix': {
            name: 'Degarelix (GnRH antagonist)',
            cycles: 12,
            drugs: [
                { name: 'Degarelix', dose: 240, unit: 'mg', schedule: 'SC loading dose, then 80mg monthly' }
            ]
        },
        'Relugolix': {
            name: 'Relugolix (Oral GnRH antagonist)',
            cycles: 12,
            drugs: [
                { name: 'Relugolix', dose: 120, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Bicalutamide': {
            name: 'Bicalutamide (Antiandrogen monotherapy)',
            cycles: 12,
            drugs: [
                { name: 'Bicalutamide', dose: 50, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Flutamide': {
            name: 'Flutamide (Antiandrogen monotherapy)',
            cycles: 12,
            drugs: [
                { name: 'Flutamide', dose: 250, unit: 'mg', schedule: 'three times daily, continuous' }
            ]
        },
        'Nilutamide': {
            name: 'Nilutamide (Antiandrogen)',
            cycles: 12,
            drugs: [
                { name: 'Nilutamide', dose: 300, unit: 'mg', schedule: 'daily x 30 days, then 150mg daily' }
            ]
        },
        'Ketoconazole': {
            name: 'Ketoconazole (CYP17 inhibitor)',
            cycles: 6,
            drugs: [
                { name: 'Ketoconazole', dose: 400, unit: 'mg', schedule: 'three times daily, continuous' },
                { name: 'Hydrocortisone', dose: 30, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Aminoglutethimide': {
            name: 'Aminoglutethimide (Adrenal enzyme inhibitor)',
            cycles: 6,
            drugs: [
                { name: 'Aminoglutethimide', dose: 250, unit: 'mg', schedule: 'four times daily, continuous' },
                { name: 'Hydrocortisone', dose: 40, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Sipuleucel-T': {
            name: 'Sipuleucel-T (Immunotherapy)',
            cycles: 1,
            drugs: [
                { name: 'Sipuleucel-T', dose: '50×10⁶', unit: 'autologous CD54+ cells', schedule: '3 infusions q2weeks (weeks 0, 2, 4)' }
            ]
        },
        'Paclitaxel-Single': {
            name: 'Paclitaxel (Single agent - mCRPC)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly x 18 weeks' }
            ]
        },
        'Docetaxel-Single': {
            name: 'Docetaxel (Single agent - mCRPC)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Estramustine': {
            name: 'Estramustine (Single agent - mCRPC)',
            cycles: 6,
            drugs: [
                { name: 'Estramustine', dose: 280, unit: 'mg', schedule: 'three times daily, continuous' }
            ]
        },
        'Radium-223': {
            name: 'Radium-223 (Bone-targeted therapy)',
            cycles: 6,
            drugs: [
                { name: 'Radium-223 dichloride', dose: 55, unit: 'kBq/kg', schedule: 'IV q4weeks x 6 cycles (bone metastases)' }
            ]
        },
        'Lutetium-177-PSMA': {
            name: 'Lutetium-177 PSMA-617 (PSMA-targeted therapy)',
            cycles: 6,
            drugs: [
                { name: 'Lutetium-177 PSMA-617', dose: 7400, unit: 'MBq', schedule: 'IV q6weeks x 6 cycles (PSMA+ mCRPC)' }
            ]
        }
    },
    renal: {
        'Nivolumab-Ipilimumab': {
            name: 'Nivolumab + Ipilimumab (First-line intermediate/poor risk)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'q3weeks x 4 cycles, then 240mg q2weeks' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'q3weeks x 4 cycles only' }
            ]
        },
        'Pembrolizumab-Axitinib': {
            name: 'Pembrolizumab + Axitinib (First-line)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks x 8 cycles, then 400mg q6weeks' },
                { name: 'Axitinib', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Avelumab-Axitinib': {
            name: 'Avelumab + Axitinib (First-line)',
            cycles: 8,
            drugs: [
                { name: 'Avelumab', dose: 800, unit: 'mg', schedule: 'q2weeks x 8 cycles' },
                { name: 'Axitinib', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Lenvatinib-Pembrolizumab': {
            name: 'Lenvatinib + Pembrolizumab (First-line)',
            cycles: 8,
            drugs: [
                { name: 'Lenvatinib', dose: 20, unit: 'mg', schedule: 'daily, continuous' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks x 8 cycles, then 400mg q6weeks' }
            ]
        },
        'Nivolumab-Cabozantinib': {
            name: 'Nivolumab + Cabozantinib (First-line)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'q2weeks x 8 cycles, then 480mg q4weeks' },
                { name: 'Cabozantinib', dose: 40, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Lenvatinib-Everolimus': {
            name: 'Lenvatinib + Everolimus (Second-line)',
            cycles: 8,
            drugs: [
                { name: 'Lenvatinib', dose: 18, unit: 'mg', schedule: 'daily, continuous' },
                { name: 'Everolimus', dose: 5, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Bevacizumab-Everolimus': {
            name: 'Bevacizumab + Everolimus (Second-line)',
            cycles: 8,
            drugs: [
                { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'q2weeks x 8 cycles' },
                { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Bevacizumab-Interferon': {
            name: 'Bevacizumab + Interferon alfa-2a (Historical first-line)',
            cycles: 8,
            drugs: [
                { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'q2weeks x 8 cycles' },
                { name: 'Interferon alfa-2a', dose: 9, unit: 'MIU', schedule: 'SC 3x/week, continuous' }
            ]
        },
        'Interferon-IL2': {
            name: 'Interferon alfa + IL-2 (Historical combination)',
            cycles: 6,
            drugs: [
                { name: 'Interferon alfa-2a', dose: 6, unit: 'MIU', schedule: 'SC daily x 5 days/week' },
                { name: 'Interleukin-2 (IL-2)', dose: 18, unit: 'MIU/m²', schedule: 'SC daily x 5 days/week' }
            ]
        },
        'Sunitinib': {
            name: 'Sunitinib (First-line monotherapy)',
            cycles: 8,
            drugs: [
                { name: 'Sunitinib', dose: 50, unit: 'mg', schedule: 'daily x 4 weeks, then 2 weeks off' }
            ]
        },
        'Pazopanib': {
            name: 'Pazopanib (First-line monotherapy)',
            cycles: 8,
            drugs: [
                { name: 'Pazopanib', dose: 800, unit: 'mg', schedule: 'daily on empty stomach, continuous' }
            ]
        },
        'Cabozantinib': {
            name: 'Cabozantinib (Second-line)',
            cycles: 8,
            drugs: [
                { name: 'Cabozantinib', dose: 60, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Nivolumab': {
            name: 'Nivolumab (Second-line)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'q2weeks x 8 cycles, then 480mg q4weeks' }
            ]
        },
        'Axitinib': {
            name: 'Axitinib (Second-line)',
            cycles: 8,
            drugs: [
                { name: 'Axitinib', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Sorafenib': {
            name: 'Sorafenib (Second-line)',
            cycles: 8,
            drugs: [
                { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Lenvatinib': {
            name: 'Lenvatinib (Second-line)',
            cycles: 8,
            drugs: [
                { name: 'Lenvatinib', dose: 24, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Everolimus': {
            name: 'Everolimus (Second-line)',
            cycles: 8,
            drugs: [
                { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Temsirolimus': {
            name: 'Temsirolimus (Poor-risk first-line)',
            cycles: 8,
            drugs: [
                { name: 'Temsirolimus', dose: 25, unit: 'mg', schedule: 'IV weekly, continuous' }
            ]
        },
        'Tivozanib': {
            name: 'Tivozanib (Second-line)',
            cycles: 8,
            drugs: [
                { name: 'Tivozanib', dose: 1340, unit: 'mcg', schedule: 'daily x 21 days, then 7 days off' }
            ]
        },
        'Bevacizumab': {
            name: 'Bevacizumab (Single agent)',
            cycles: 8,
            drugs: [
                { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'q2weeks x 8 cycles' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab (Second-line)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks x 8 cycles, then 400mg q6weeks' }
            ]
        },
        'Interleukin-2': {
            name: 'Interleukin-2 (High-dose)',
            cycles: 2,
            drugs: [
                { name: 'Interleukin-2 (IL-2)', dose: 600000, unit: 'IU/kg', schedule: 'q8h x 14 doses (cycle 1), then q8h x 14 doses (cycle 2)' }
            ]
        },
        'Interferon-alpha': {
            name: 'Interferon alfa-2a (Historical)',
            cycles: 8,
            drugs: [
                { name: 'Interferon alfa-2a', dose: 9, unit: 'MIU', schedule: 'SC 3x/week, continuous' }
            ]
        }
    },
    testicular: {
        'BEP': {
            name: 'BEP (Bleomycin + Etoposide + Cisplatin) - Standard risk',
            cycles: 3,
            drugs: [
                { name: 'Bleomycin', dose: 30, unit: 'units', schedule: 'days 1, 8, 15, q3weeks x 3 cycles' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q3weeks x 3 cycles' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q3weeks x 3 cycles' }
            ]
        },
        'EP': {
            name: 'EP (Etoposide + Cisplatin) - Standard risk',
            cycles: 4,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q3weeks x 4 cycles' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q3weeks x 4 cycles' }
            ]
        },
        'Carboplatin-Single': {
            name: 'Carboplatin (Single agent - Stage I seminoma)',
            cycles: 1,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 7', unit: 'AUC', schedule: 'single dose' }
            ]
        },
        'VIP': {
            name: 'VIP (Vinblastine + Ifosfamide + Cisplatin) - Salvage',
            cycles: 4,
            drugs: [
                { name: 'Vinblastine', dose: 0.11, unit: 'mg/kg', days: 'D1-D2', schedule: 'days 1-2, q3weeks x 4 cycles' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q3weeks x 4 cycles' },
                { name: 'Mesna', dose: 400, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5 (with ifosfamide)' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q3weeks x 4 cycles' }
            ]
        },
        'TIP': {
            name: 'TIP (Paclitaxel + Ifosfamide + Cisplatin) - Salvage',
            cycles: 4,
            drugs: [
                { name: 'Paclitaxel', dose: 250, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                { name: 'Ifosfamide', dose: 1500, unit: 'mg/m²', days: 'D2-D6', schedule: 'days 2-6, q3weeks x 4 cycles' },
                { name: 'Mesna', dose: 500, unit: 'mg/m²', days: 'D2-D6', schedule: 'days 2-6 (with ifosfamide)' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', days: 'D2-D6', schedule: 'days 2-6, q3weeks x 4 cycles' }
            ]
        },
        'VeIP': {
            name: 'VeIP (Vinblastine + Ifosfamide + Cisplatin) - Salvage',
            cycles: 4,
            drugs: [
                { name: 'Vinblastine', dose: 0.11, unit: 'mg/kg', days: 'D1-D2', schedule: 'days 1-2, q3weeks x 4 cycles' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q3weeks x 4 cycles' },
                { name: 'Mesna', dose: 400, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5 (with ifosfamide)' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q3weeks x 4 cycles' }
            ]
        },
        'PVB': {
            name: 'PVB (Cisplatin + Vinblastine + Bleomycin) - Historical',
            cycles: 3,
            drugs: [
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q3weeks x 3 cycles' },
                { name: 'Vinblastine', dose: 0.15, unit: 'mg/kg', days: 'D1-D2', schedule: 'days 1-2, q3weeks x 3 cycles' },
                { name: 'Bleomycin', dose: 30, unit: 'units', schedule: 'days 1, 8, 15, q3weeks x 3 cycles' }
            ]
        },
        'VAB-6': {
            name: 'VAB-6 (Vinblastine + Actinomycin D + Bleomycin + Cisplatin + Cyclophosphamide) - Historical',
            cycles: 3,
            drugs: [
                { name: 'Vinblastine', dose: 4, unit: 'mg/m²', schedule: 'day 1, q3weeks x 3 cycles' },
                { name: 'Actinomycin D', dose: 1, unit: 'mg/m²', schedule: 'day 1, q3weeks x 3 cycles' },
                { name: 'Bleomycin', dose: 30, unit: 'units', schedule: 'days 1, 8, 15, q3weeks x 3 cycles' },
                { name: 'Cisplatin', dose: 120, unit: 'mg/m²', schedule: 'day 4, q3weeks x 3 cycles' },
                { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'day 1, q3weeks x 3 cycles' }
            ]
        },
        'Paclitaxel-Gemcitabine': {
            name: 'Paclitaxel + Gemcitabine (Salvage)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', days: 'D1,D8,D15', schedule: 'days 1, 8, 15, q4weeks x 6 cycles' },
                { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', days: 'D1,D8,D15', schedule: 'days 1, 8, 15, q4weeks x 6 cycles' }
            ]
        },
        'Paclitaxel-Gemcitabine-Oxaliplatin': {
            name: 'Paclitaxel + Gemcitabine + Oxaliplatin (Salvage)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Gemcitabine-Oxaliplatin': {
            name: 'Gemcitabine + Oxaliplatin (Salvage)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Etoposide-Single': {
            name: 'Etoposide (Single agent)',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q3weeks x 6 cycles' }
            ]
        }
    },
    sarcoma: {
        'AD': {
            name: 'AD (Doxorubicin + Dacarbazine)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Dacarbazine', dose: 1000, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'AI': {
            name: 'AI (Doxorubicin + Ifosfamide)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Ifosfamide', dose: 10000, unit: 'mg/m²', schedule: 'continuous infusion days 1-3, q3weeks x 6 cycles' },
                { name: 'Mesna', dose: 2000, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, q3weeks x 6 cycles' }
            ]
        },
        'MAID': {
            name: 'MAID (Mesna + Doxorubicin + Ifosfamide + Dacarbazine)',
            cycles: 6,
            drugs: [
                { name: 'Mesna', dose: 2500, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, q3weeks x 6 cycles' },
                { name: 'Doxorubicin', dose: 20, unit: 'mg/m²', days: 'D1-D3', schedule: 'continuous infusion days 1-3, q3weeks x 6 cycles' },
                { name: 'Ifosfamide', dose: 2500, unit: 'mg/m²', days: 'D1-D3', schedule: 'continuous infusion days 1-3, q3weeks x 6 cycles' },
                { name: 'Dacarbazine', dose: 300, unit: 'mg/m²', days: 'D1-D3', schedule: 'continuous infusion days 1-3, q3weeks x 6 cycles' }
            ]
        },
        'CYVADIC': {
            name: 'CYVADIC (Cyclophosphamide + Vincristine + Doxorubicin + Dacarbazine)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'days 1, 8, q3weeks x 6 cycles (max 2mg)' },
                { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Dacarbazine', dose: 250, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q3weeks x 6 cycles' }
            ]
        },
        'IAP': {
            name: 'IAP (Ifosfamide + Doxorubicin + Cisplatin)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 2000, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q3weeks x 6 cycles' },
                { name: 'Mesna', dose: 400, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5 (with ifosfamide)' },
                { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'AP': {
            name: 'AP (Doxorubicin + Cisplatin)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Gemcitabine-Docetaxel': {
            name: 'Gemcitabine + Docetaxel',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 900, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'day 8, q3weeks x 6 cycles' }
            ]
        },
        'Gemcitabine-Vinorelbine': {
            name: 'Gemcitabine + Vinorelbine',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Vinorelbine', dose: 25, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' }
            ]
        },
        'VAC-IE': {
            name: 'VAC/IE (Vincristine + Dactinomycin + Cyclophosphamide / Ifosfamide + Etoposide) - Ewing sarcoma',
            cycles: 12,
            drugs: [
                { name: 'Vincristine', dose: 2, unit: 'mg/m²', schedule: 'day 1 (VAC cycles), max 2mg' },
                { name: 'Dactinomycin', dose: 1.25, unit: 'mg/m²', schedule: 'day 1 (VAC cycles)' },
                { name: 'Cyclophosphamide', dose: 1200, unit: 'mg/m²', schedule: 'day 1 (VAC cycles)' },
                { name: 'Ifosfamide', dose: 1800, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5 (IE cycles)' },
                { name: 'Mesna', dose: 360, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5 (IE cycles)' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5 (IE cycles)' }
            ]
        },
        'OGS-2012': {
            name: 'OGS-2012 Protocol (TMH Mumbai - Osteosarcoma)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 120, unit: 'mg/m²', schedule: 'day 1, cycles 1, 3, 5' },
                { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'day 1, cycles 2, 4, 6' },
                { name: 'High-dose Methotrexate', dose: 12000, unit: 'mg/m²', schedule: 'day 1, all cycles (with leucovorin rescue)' },
                { name: 'Leucovorin', dose: 15, unit: 'mg/m²', schedule: 'q6h starting 24h post-MTX until levels <0.1' }
            ]
        },
        'Doxorubicin': {
            name: 'Doxorubicin (Single agent)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Ifosfamide': {
            name: 'Ifosfamide (Single agent)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 3000, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q3weeks x 6 cycles' },
                { name: 'Mesna', dose: 600, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3 (with ifosfamide)' }
            ]
        },
        'Gemcitabine': {
            name: 'Gemcitabine (Single agent)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8,D15', schedule: 'days 1, 8, 15, q4weeks x 6 cycles' }
            ]
        },
        'Doxorubicin-Liposomal': {
            name: 'Doxorubicin liposomal (Single agent)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin liposomal', dose: 50, unit: 'mg/m²', schedule: 'q4weeks x 6 cycles' }
            ]
        },
        'Pazopanib': {
            name: 'Pazopanib (Single agent)',
            cycles: 8,
            drugs: [
                { name: 'Pazopanib', dose: 800, unit: 'mg', schedule: 'daily on empty stomach, continuous' }
            ]
        },
        'Trabectedin': {
            name: 'Trabectedin (Single agent)',
            cycles: 6,
            drugs: [
                { name: 'Trabectedin', dose: 1.5, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Eribulin': {
            name: 'Eribulin (Single agent)',
            cycles: 6,
            drugs: [
                { name: 'Eribulin', dose: 1.4, unit: 'mg/m²', schedule: 'days 1, 8, q3weeks x 6 cycles' }
            ]
        },
        'Tazemetostat': {
            name: 'Tazemetostat (EZH2 inhibitor)',
            cycles: 8,
            drugs: [
                { name: 'Tazemetostat', dose: 800, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Pexidartinib': {
            name: 'Pexidartinib (CSF1R inhibitor - TGCT)',
            cycles: 6,
            drugs: [
                { name: 'Pexidartinib', dose: 400, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Atezolizumab': {
            name: 'Atezolizumab (PD-L1 inhibitor)',
            cycles: 8,
            drugs: [
                { name: 'Atezolizumab', dose: 840, unit: 'mg', schedule: 'q2weeks x 8 cycles, then 1200mg q3weeks' }
            ]
        }
    },
    pancreatic: {
        'mFOLFIRINOX': {
            name: 'Modified FOLFIRINOX (mFOLFIRINOX)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Irinotecan', dose: 150, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' }
            ]
        },
        'Gemcitabine-Nabpaclitaxel': {
            name: 'Gemcitabine + Nab-paclitaxel',
            cycles: 6,
            drugs: [
                { name: 'Nab-paclitaxel', dose: 125, unit: 'mg/m²', schedule: 'days 1, 8, 15, q4weeks x 6 cycles' },
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'days 1, 8, 15, q4weeks x 6 cycles' }
            ]
        },
        'Gemcitabine-Capecitabine': {
            name: 'Gemcitabine + Capecitabine',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Capecitabine', dose: 830, unit: 'mg/m²', schedule: 'twice daily, days 1-14, q3weeks x 6 cycles' }
            ]
        },
        'Single-Gemcitabine': {
            name: 'Single agent Gemcitabine',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' }
            ]
        },
        'Single-Capecitabine': {
            name: 'Single agent Capecitabine',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'twice daily, days 1-14, q3weeks x 6 cycles' }
            ]
        },
        'Capecitabine-RT': {
            name: 'Capecitabine with Radiation Therapy',
            cycles: 2,
            drugs: [
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'twice daily, days 1-14 during radiation therapy' }
            ]
        },
        'Gemcitabine-RT': {
            name: 'Gemcitabine with Radiation Therapy',
            cycles: 2,
            drugs: [
                { name: 'Gemcitabine', dose: 600, unit: 'mg/m²', schedule: 'days 1, 8 during radiation therapy' }
            ]
        },
        'SCALOP': {
            name: 'SCALOP Regimen (Gem + Cap + RT)',
            cycles: 4,
            drugs: [
                { name: 'Gemcitabine', dose: 300, unit: 'mg/m²', schedule: 'days 1, 8, q3weeks x 2 cycles, then with RT' },
                { name: 'Capecitabine', dose: 830, unit: 'mg/m²', schedule: 'twice daily, days 1-14, q3weeks x 2 cycles, then with RT' }
            ]
        },
        '5FU-LV': {
            name: '5-Fluorouracil + Leucovorin',
            cycles: 6,
            drugs: [
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 6 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 6 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 6 cycles' }
            ]
        },
        'GTX': {
            name: 'Gemcitabine + Docetaxel + Capecitabine (GTX)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 750, unit: 'mg/m²', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Docetaxel', dose: 30, unit: 'mg/m²', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Capecitabine', dose: 750, unit: 'mg/m²', schedule: 'twice daily, days 1-14, q3weeks x 6 cycles' }
            ]
        },
        'GEMOX': {
            name: 'Gemcitabine + Oxaliplatin (GEMOX)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Oxaliplatin', dose: 100, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Gemcitabine-Erlotinib': {
            name: 'Gemcitabine + Erlotinib',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Erlotinib', dose: 100, unit: 'mg', schedule: 'daily' }
            ]
        },
        'Capecitabine-Erlotinib': {
            name: 'Capecitabine + Erlotinib',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'twice daily, days 1-14, q3weeks x 6 cycles' },
                { name: 'Erlotinib', dose: 100, unit: 'mg', schedule: 'daily' }
            ]
        },
        'Liposomal-Irinotecan-5FU-LV': {
            name: 'Liposomal Irinotecan + 5-FU + LV (NAPOLI-1)',
            cycles: 12,
            drugs: [
                { name: 'Liposomal Irinotecan', dose: 70, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' }
            ]
        },
        'Single-Olaparib': {
            name: 'Single agent Olaparib (BRCA mutation)',
            cycles: 12,
            drugs: [
                { name: 'Olaparib', dose: 300, unit: 'mg', schedule: 'twice daily' }
            ]
        },
        'Single-Pembrolizumab': {
            name: 'Single agent Pembrolizumab (MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks or 400mg q6weeks' }
            ]
        }
    },
    anal: {
        '5FU-MMC-RT-RTOG': {
            name: '5-FU + Mitomycin-C + RT (RTOG/ECOG)',
            cycles: 2,
            drugs: [
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'daily x 4 days, weeks 1 and 5' },
                { name: 'Mitomycin-C', dose: 10, unit: 'mg/m²', schedule: 'day 1 and day 29' }
            ]
        },
        '5FU-MMC-RT-EORTC': {
            name: '5-FU + Mitomycin-C + RT (EORTC)',
            cycles: 2,
            drugs: [
                { name: '5-Fluorouracil', dose: 750, unit: 'mg/m²', schedule: 'daily x 5 days, weeks 1 and 5' },
                { name: 'Mitomycin-C', dose: 15, unit: 'mg/m²', schedule: 'day 1 only' }
            ]
        },
        'Capecitabine-MMC-RT': {
            name: 'Capecitabine + Mitomycin-C + RT',
            cycles: 2,
            drugs: [
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'twice daily, days 1-14 during radiation therapy' },
                { name: 'Mitomycin-C', dose: 12, unit: 'mg/m²', schedule: 'day 1 and day 29' }
            ]
        },
        '5FU-Cisplatin-RT': {
            name: '5-FU + Cisplatin + RT',
            cycles: 2,
            drugs: [
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'daily x 4 days, weeks 1 and 5' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'day 1, weeks 1 and 5' }
            ]
        },
        'CAPEOX-RT': {
            name: 'Capecitabine + Oxaliplatin + RT',
            cycles: 2,
            drugs: [
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'twice daily, days 1-14 during radiation therapy' },
                { name: 'Oxaliplatin', dose: 50, unit: 'mg/m²', schedule: 'weekly during radiation therapy' }
            ]
        },
        '5FU-Cisplatin': {
            name: '5-FU + Cisplatin',
            cycles: 6,
            drugs: [
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'daily x 4 days, q3weeks x 6 cycles' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Carboplatin-Paclitaxel': {
            name: 'Carboplatin + Paclitaxel',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'mFOLFOX6': {
            name: 'Modified FOLFOX6 (mFOLFOX6)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' }
            ]
        },
        'Single-Pembrolizumab': {
            name: 'Single agent Pembrolizumab',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks or 400mg q6weeks' }
            ]
        },
        'Single-Nivolumab': {
            name: 'Single agent Nivolumab',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'q2weeks or 480mg q4weeks' }
            ]
        }
    },
    biliary: {
        'Gemcitabine-Cisplatin-Durvalumab': {
            name: 'Gemcitabine + Cisplatin + Durvalumab',
            cycles: 8,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'days 1, 8, q3weeks x 8 cycles' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'days 1, 8, q3weeks x 8 cycles' },
                { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'q3weeks x 8 cycles' }
            ]
        },
        'Gemcitabine-Cisplatin': {
            name: 'Gemcitabine + Cisplatin',
            cycles: 8,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'days 1, 8, q3weeks x 8 cycles' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'days 1, 8, q3weeks x 8 cycles' }
            ]
        },
        'Single-Capecitabine': {
            name: 'Single agent Capecitabine',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'twice daily, days 1-14, q3weeks x 6 cycles' }
            ]
        },
        'Gemcitabine-Capecitabine': {
            name: 'Gemcitabine + Capecitabine',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Capecitabine', dose: 830, unit: 'mg/m²', schedule: 'twice daily, days 1-14, q3weeks x 6 cycles' }
            ]
        },
        'GEMOX': {
            name: 'Gemcitabine + Oxaliplatin (GEMOX)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Oxaliplatin', dose: 100, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        '5FU-Cisplatin': {
            name: '5-FU + Cisplatin',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: '5-Fluorouracil infusion', dose: 1000, unit: 'mg/m²', schedule: 'daily x 4 days, q3weeks x 6 cycles' }
            ]
        },
        'mFOLFOX6': {
            name: 'Modified FOLFOX6 (mFOLFOX6)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' }
            ]
        },
        'Gemcitabine-Nabpaclitaxel': {
            name: 'Gemcitabine + Nab-paclitaxel',
            cycles: 6,
            drugs: [
                { name: 'Nab-paclitaxel', dose: 125, unit: 'mg/m²', schedule: 'days 1, 8, 15, q4weeks x 6 cycles' },
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'days 1, 8, 15, q4weeks x 6 cycles' }
            ]
        },
        'CAPEOX': {
            name: 'Capecitabine + Oxaliplatin (CAPEOX)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'q3weeks x 8 cycles' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, q3weeks x 8 cycles' }
            ]
        },
        'Dabrafenib-Trametinib': {
            name: 'Dabrafenib + Trametinib (BRAFV600E mutation)',
            cycles: 12,
            drugs: [
                { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'twice daily' },
                { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'daily' }
            ]
        },
        'Single-Gemcitabine': {
            name: 'Single agent Gemcitabine',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' }
            ]
        },
        'Ivosidenib': {
            name: 'Ivosidenib (IDH1 mutation)',
            cycles: 12,
            drugs: [
                { name: 'Ivosidenib', dose: 500, unit: 'mg', schedule: 'daily' }
            ]
        },
        'Pemigatinib': {
            name: 'Pemigatinib (FGFR2 fusions)',
            cycles: 12,
            drugs: [
                { name: 'Pemigatinib', dose: 13.5, unit: 'mg', schedule: 'daily for 14 days, then 7 days off' }
            ]
        },
        'Infigratinib': {
            name: 'Infigratinib (FGFR2 fusions)',
            cycles: 12,
            drugs: [
                { name: 'Infigratinib', dose: 125, unit: 'mg', schedule: 'daily for 21 days, then 7 days off' }
            ]
        }
    },
    bladder: {
        'ddGC': {
            name: 'Dose-dense Gemcitabine + Cisplatin (ddGC)',
            cycles: 4,
            drugs: [
                { name: 'Gemcitabine', dose: 2500, unit: 'mg/m²', schedule: 'day 1, q2weeks x 4 cycles' },
                { name: 'Cisplatin', dose: 35, unit: 'mg/m²', schedule: 'day 1, q2weeks x 4 cycles' }
            ]
        },
        'GC': {
            name: 'Gemcitabine + Cisplatin (GC)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'days 1, 8, 15, q4weeks x 6 cycles' },
                { name: 'Cisplatin', dose: 70, unit: 'mg/m²', schedule: 'day 1, q4weeks x 6 cycles' }
            ]
        },
        'ITP': {
            name: 'Ifosfamide + Paclitaxel + Cisplatin (ITP)',
            cycles: 4,
            drugs: [
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', schedule: 'days 1-3, q3weeks x 4 cycles' },
                { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                { name: 'Cisplatin', dose: 70, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' }
            ]
        },
        'GCa': {
            name: 'Gemcitabine + Carboplatin',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'GP': {
            name: 'Gemcitabine + Paclitaxel (GP)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'GD': {
            name: 'Gemcitabine + Docetaxel (GD)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'ddMVAC': {
            name: 'Dose-dense MVAC (ddMVAC)',
            cycles: 4,
            drugs: [
                { name: 'Methotrexate', dose: 30, unit: 'mg/m²', schedule: 'day 1, q2weeks x 4 cycles' },
                { name: 'Vinblastine', dose: 3, unit: 'mg/m²', schedule: 'day 1, q2weeks x 4 cycles' },
                { name: 'Doxorubicin', dose: 30, unit: 'mg/m²', schedule: 'day 1, q2weeks x 4 cycles' },
                { name: 'Cisplatin', dose: 70, unit: 'mg/m²', schedule: 'day 1, q2weeks x 4 cycles' }
            ]
        },
        'DC': {
            name: 'Docetaxel + Cisplatin (DC)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'PC': {
            name: 'Paclitaxel + Carboplatin (PC)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'CAP': {
            name: 'Cyclophosphamide + Doxorubicin + Cisplatin (CAP)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 400, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Doxorubicin', dose: 40, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'MCV': {
            name: 'Methotrexate + Carboplatin + Vinblastine (MCV)',
            cycles: 6,
            drugs: [
                { name: 'Methotrexate', dose: 30, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Vinblastine', dose: 4, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        '5FU-MMC-RT': {
            name: '5-FU + Mitomycin-C + RT',
            cycles: 2,
            drugs: [
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'daily x 4 days, weeks 1 and 4' },
                { name: 'Mitomycin-C', dose: 12, unit: 'mg/m²', schedule: 'day 1 and day 28' }
            ]
        },
        'Enfortumab-Vedotin': {
            name: 'Enfortumab Vedotin',
            cycles: 6,
            drugs: [
                { name: 'Enfortumab Vedotin', dose: 1.25, unit: 'mg/kg', schedule: 'days 1, 8, 15, q4weeks x 6 cycles' }
            ]
        },
        'Single-Gemcitabine': {
            name: 'Single agent Gemcitabine',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'days 1, 8, 15, q4weeks x 6 cycles' }
            ]
        },
        'Single-Paclitaxel': {
            name: 'Single agent Paclitaxel',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Single-Pembrolizumab': {
            name: 'Single agent Pembrolizumab',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks or 400mg q6weeks' }
            ]
        },
        'Avelumab': {
            name: 'Avelumab maintenance',
            cycles: 12,
            drugs: [
                { name: 'Avelumab', dose: 800, unit: 'mg', schedule: 'q2weeks x 12 cycles' }
            ]
        },
        'Single-Nivolumab': {
            name: 'Single agent Nivolumab',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'q2weeks or 480mg q4weeks' }
            ]
        },
        'Durvalumab': {
            name: 'Durvalumab',
            cycles: 12,
            drugs: [
                { name: 'Durvalumab', dose: 1200, unit: 'mg', schedule: 'q4weeks x 12 cycles' }
            ]
        },
        'Erdafitinib': {
            name: 'Erdafitinib (FGFR mutation)',
            cycles: 12,
            drugs: [
                { name: 'Erdafitinib', dose: 8, unit: 'mg', schedule: 'daily' }
            ]
        },
        'Sacituzumab-Govitecan': {
            name: 'Sacituzumab Govitecan',
            cycles: 6,
            drugs: [
                { name: 'Sacituzumab Govitecan', dose: 10, unit: 'mg/kg', schedule: 'days 1, 8, q3weeks x 6 cycles' }
            ]
        }
    },
    neuroendocrine: {
        'Cisplatin-Etoposide': {
            name: 'Cisplatin + Etoposide',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q3weeks x 6 cycles' }
            ]
        },
        'Octreotide-LAR': {
            name: 'Octreotide LAR',
            cycles: 12,
            drugs: [
                { name: 'Octreotide LAR', dose: 20, unit: 'mg', schedule: 'monthly injection x 12 months' }
            ]
        },
        'Lanreotide': {
            name: 'Lanreotide',
            cycles: 12,
            drugs: [
                { name: 'Lanreotide', dose: 120, unit: 'mg', schedule: 'monthly injection x 12 months' }
            ]
        },
        'Everolimus-Octreotide': {
            name: 'Everolimus + Octreotide LAR',
            cycles: 12,
            drugs: [
                { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'daily' },
                { name: 'Octreotide LAR', dose: 30, unit: 'mg', schedule: 'monthly injection x 12 months' }
            ]
        },
        '5FU-Streptozocin': {
            name: '5-FU + Streptozocin',
            cycles: 6,
            drugs: [
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'days 1-5, q6weeks x 6 cycles' },
                { name: 'Streptozocin', dose: 500, unit: 'mg/m²', schedule: 'days 1-5, q6weeks x 6 cycles' }
            ]
        },
        'Doxorubicin-Streptozocin': {
            name: 'Doxorubicin + Streptozocin',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Streptozocin', dose: 500, unit: 'mg/m²', schedule: 'days 1-5, q3weeks x 6 cycles' }
            ]
        },
        'Capecitabine-Temozolomide': {
            name: 'Capecitabine + Temozolomide (CAPTEM)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 750, unit: 'mg', schedule: 'twice daily, days 1-14, q4weeks x 6 cycles' },
                { name: 'Temozolomide', dose: 200, unit: 'mg/m²', schedule: 'daily, days 10-14, q4weeks x 6 cycles' }
            ]
        },
        'Sunitinib': {
            name: 'Sunitinib',
            cycles: 12,
            drugs: [
                { name: 'Sunitinib', dose: 37.5, unit: 'mg', schedule: 'daily' }
            ]
        },
        'Everolimus': {
            name: 'Everolimus',
            cycles: 12,
            drugs: [
                { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'daily' }
            ]
        },
        'Lutetium-177': {
            name: 'Lutetium Lu 177 Dotatate',
            cycles: 4,
            drugs: [
                { name: 'Lutetium Lu 177 Dotatate', dose: 7.4, unit: 'GBq', schedule: 'q8weeks x 4 cycles' }
            ]
        }
    },
    cervical: {
        'Cisplatin-Paclitaxel': {
            name: 'Cisplatin + Paclitaxel',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Carboplatin-Paclitaxel': {
            name: 'Carboplatin + Paclitaxel (3-weekly)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Carboplatin-Paclitaxel-Weekly': {
            name: 'Carboplatin + Paclitaxel (weekly)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly x 18 weeks' },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly x 18 weeks' }
            ]
        },
        'Cisplatin-RT': {
            name: 'Cisplatin + Radiation Therapy',
            cycles: 5,
            drugs: [
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'weekly during radiation therapy x 5 weeks' }
            ]
        },
        'Carboplatin-Paclitaxel-Pembrolizumab': {
            name: 'Carboplatin + Paclitaxel + Pembrolizumab',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Cisplatin-Topotecan': {
            name: 'Cisplatin + Topotecan',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Topotecan', dose: 0.75, unit: 'mg/m²', schedule: 'days 1-3, q3weeks x 6 cycles' }
            ]
        },
        'Paclitaxel-Topotecan': {
            name: 'Paclitaxel + Topotecan',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Topotecan', dose: 0.75, unit: 'mg/m²', schedule: 'days 1-3, q3weeks x 6 cycles' }
            ]
        },
        'Cisplatin-Paclitaxel-Bevacizumab': {
            name: 'Cisplatin + Paclitaxel + Bevacizumab',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Paclitaxel-Topotecan-Bevacizumab': {
            name: 'Paclitaxel + Topotecan + Bevacizumab',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Topotecan', dose: 0.75, unit: 'mg/m²', schedule: 'days 1-3, q3weeks x 6 cycles' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Cisplatin-Gemcitabine': {
            name: 'Cisplatin + Gemcitabine',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' }
            ]
        },
        'Cisplatin-Docetaxel': {
            name: 'Cisplatin + Docetaxel',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Carboplatin-Docetaxel': {
            name: 'Carboplatin + Docetaxel',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Single-Docetaxel': {
            name: 'Single agent Docetaxel',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Single-Paclitaxel': {
            name: 'Single agent Paclitaxel',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Single-Irinotecan': {
            name: 'Single agent Irinotecan',
            cycles: 6,
            drugs: [
                { name: 'Irinotecan', dose: 125, unit: 'mg/m²', schedule: 'weekly x 4, then 2 weeks rest, repeat x 6 cycles' }
            ]
        }
    },
    endometrial: {
        'Carboplatin-Paclitaxel': {
            name: 'Carboplatin + Paclitaxel (3-weekly)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Carboplatin-Paclitaxel-Weekly': {
            name: 'Carboplatin + Paclitaxel (weekly)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly x 18 weeks' },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly x 18 weeks' }
            ]
        },
        'Dostarlimab-Paclitaxel-Carboplatin': {
            name: 'Dostarlimab + Paclitaxel + Carboplatin',
            cycles: 6,
            drugs: [
                { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'q3weeks x 6 cycles, then 1000mg q6weeks' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'AC': {
            name: 'Doxorubicin + Cyclophosphamide (AC)',
            cycles: 4,
            drugs: [
                { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' }
            ]
        },
        'AP': {
            name: 'Doxorubicin + Cisplatin (AP)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Doxorubicin-Paclitaxel': {
            name: 'Doxorubicin + Paclitaxel',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 45, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Paclitaxel', dose: 160, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'TAP': {
            name: 'Cisplatin + Doxorubicin + Paclitaxel (TAP)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Doxorubicin', dose: 45, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Paclitaxel', dose: 160, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'CAP': {
            name: 'Cyclophosphamide + Doxorubicin + Cisplatin (CAP)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Paclitaxel-Carboplatin-Bevacizumab': {
            name: 'Paclitaxel + Carboplatin + Bevacizumab',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Gemcitabine-Docetaxel': {
            name: 'Gemcitabine + Docetaxel',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 900, unit: 'mg/m²', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'day 8, q3weeks x 6 cycles' }
            ]
        },
        'Pembrolizumab-Lenvatinib': {
            name: 'Pembrolizumab + Lenvatinib',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks x 12 cycles' },
                { name: 'Lenvatinib', dose: 20, unit: 'mg', schedule: 'daily' }
            ]
        },
        'Single-Docetaxel': {
            name: 'Single agent Docetaxel',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Single-Paclitaxel': {
            name: 'Single agent Paclitaxel',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Single-Topotecan': {
            name: 'Single agent Topotecan',
            cycles: 6,
            drugs: [
                { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', schedule: 'days 1-5, q3weeks x 6 cycles' }
            ]
        },
        'Single-Dostarlimab': {
            name: 'Single agent Dostarlimab (MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'q3weeks x 4, then 1000mg q6weeks' }
            ]
        },
        'Single-Pembrolizumab': {
            name: 'Single agent Pembrolizumab (MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks or 400mg q6weeks' }
            ]
        },
        'Single-Doxorubicin': {
            name: 'Single agent Doxorubicin',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Megestrol': {
            name: 'Megestrol Acetate',
            cycles: 12,
            drugs: [
                { name: 'Megestrol Acetate', dose: 160, unit: 'mg', schedule: 'daily' }
            ]
        }
    },
    esophageal: {
        'CROSS': {
            name: 'Carboplatin + Paclitaxel + RT (CROSS)',
            cycles: 5,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly x 5 weeks with RT' },
                { name: 'Paclitaxel', dose: 50, unit: 'mg/m²', schedule: 'weekly x 5 weeks with RT' }
            ]
        },
        'PRODIGES': {
            name: '5-FU + Cisplatin + RT (PRODIGES/ACCORD17)',
            cycles: 2,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'day 1, weeks 1 and 5 with RT' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'daily x 4 days, weeks 1 and 5 with RT' }
            ]
        },
        'FOLFOX-RT': {
            name: 'mFOLFOX6 + RT',
            cycles: 3,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 3 cycles with RT' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 3 cycles with RT' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 3 cycles with RT' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 3 cycles with RT' }
            ]
        },
        'CAPEOX-RT': {
            name: 'CAPEOX + RT',
            cycles: 3,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'q3weeks x 3 cycles with RT' },
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'twice daily, days 1-14 during RT' }
            ]
        },
        'Carboplatin-Paclitaxel': {
            name: 'Carboplatin + Paclitaxel',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'q3weeks x 6 cycles' },
                { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'ECF-MAGIC': {
            name: 'Epirubicin + Cisplatin + 5-FU (MAGIC)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: '5-Fluorouracil infusion', dose: 200, unit: 'mg/m²', days: 'D1-D21', schedule: 'continuous infusion daily x 21 days, q3weeks x 6 cycles' }
            ]
        },
        'FLO': {
            name: 'Oxaliplatin + Leucovorin + 5-FU (FLO)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 8 cycles' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'q2weeks x 8 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2600, unit: 'mg/m²', days: 'D1 (24hr CI)', schedule: '24-hour infusion, q2weeks x 8 cycles' }
            ]
        },
        'FLOT4': {
            name: 'FLOT4 (Docetaxel + Oxaliplatin + Leucovorin + 5-FU)',
            cycles: 8,
            drugs: [
                { name: 'Docetaxel', dose: 50, unit: 'mg/m²', schedule: 'q2weeks x 8 cycles' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 8 cycles' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'q2weeks x 8 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2600, unit: 'mg/m²', days: 'D1 (24hr CI)', schedule: '24-hour infusion, q2weeks x 8 cycles' }
            ]
        },
        'mFOLFOX6': {
            name: 'Modified FOLFOX6 (mFOLFOX6)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' }
            ]
        },
        'CAPEOX': {
            name: 'Capecitabine + Oxaliplatin (CAPEOX)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'q3weeks x 8 cycles' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, q3weeks x 8 cycles' }
            ]
        },
        'EOF': {
            name: 'Epirubicin + Oxaliplatin + 5-FU (EOF)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: '5-Fluorouracil infusion', dose: 200, unit: 'mg/m²', days: 'D1-D21', schedule: 'continuous infusion daily x 21 days, q3weeks x 6 cycles' }
            ]
        },
        'ECX': {
            name: 'Epirubicin + Cisplatin + Capecitabine (ECX)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Capecitabine', dose: 625, unit: 'mg/m²', days: 'D1-D21', schedule: 'twice daily, days 1-21, q3weeks x 6 cycles' }
            ]
        },
        'EOX': {
            name: 'Epirubicin + Oxaliplatin + Capecitabine (EOX)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Capecitabine', dose: 625, unit: 'mg/m²', days: 'D1-D21', schedule: 'twice daily, days 1-21, q3weeks x 6 cycles' }
            ]
        },
        'Cisplatin-Irinotecan': {
            name: 'Cisplatin + Irinotecan',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 30, unit: 'mg/m²', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Irinotecan', dose: 65, unit: 'mg/m²', schedule: 'days 1, 8, q3weeks x 6 cycles' }
            ]
        },
        '5FU-Paclitaxel': {
            name: '5-FU + Paclitaxel',
            cycles: 6,
            drugs: [
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 6 cycles' },
                { name: 'Paclitaxel', dose: 150, unit: 'mg/m²', schedule: 'q2weeks x 6 cycles' }
            ]
        },
        'Cisplatin-Paclitaxel': {
            name: 'Cisplatin + Paclitaxel',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Cisplatin-Docetaxel': {
            name: 'Cisplatin + Docetaxel',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Nivolumab-Maintenance': {
            name: 'Nivolumab (post-CRT maintenance)',
            cycles: 16,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'q2weeks x 16 cycles (post-CRT with residual disease)' }
            ]
        },
        'CAPEOX-Trastuzumab': {
            name: 'CAPEOX + Trastuzumab (HER2+)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'q3weeks x 8 cycles' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, q3weeks x 8 cycles' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg q3weeks', hasLoadingDose: true }
            ]
        },
        'mFOLFOX6-Trastuzumab': {
            name: 'mFOLFOX6 + Trastuzumab (HER2+)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg q3weeks', hasLoadingDose: true }
            ]
        },
        'CAPEOX-Trastuzumab-Pembrolizumab': {
            name: 'CAPEOX + Trastuzumab + Pembrolizumab (HER2+/PD-L1 CPS≥1)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'q3weeks x 8 cycles' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, q3weeks x 8 cycles' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg q3weeks', hasLoadingDose: true },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks x 8 cycles' }
            ]
        },
        'mFOLFOX6-Trastuzumab-Pembrolizumab': {
            name: 'mFOLFOX6 + Trastuzumab + Pembrolizumab (HER2+/PD-L1 CPS≥1)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg q3weeks', hasLoadingDose: true },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks (given with every other FOLFOX cycle)' }
            ]
        },
        'CAPEOX-Nivolumab': {
            name: 'CAPEOX + Nivolumab',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'q3weeks x 8 cycles' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, q3weeks x 8 cycles' },
                { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'q3weeks x 8 cycles' }
            ]
        },
        'mFOLFOX6-Nivolumab': {
            name: 'mFOLFOX6 + Nivolumab',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' },
                { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'q3weeks (given with every other FOLFOX cycle)' }
            ]
        },
        'FOLFIRI': {
            name: 'FOLFIRI',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' }
            ]
        },
        'Nivolumab-Ipilimumab': {
            name: 'Nivolumab + Ipilimumab (MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'q2weeks x 4, then 480mg flat dose q4weeks' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'q6weeks x 4 doses' }
            ]
        },
        'Single-Pembrolizumab': {
            name: 'Single agent Pembrolizumab (MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks or 400mg q6weeks' }
            ]
        },
        'Single-Docetaxel': {
            name: 'Single agent Docetaxel',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Single-Paclitaxel': {
            name: 'Single agent Paclitaxel (3-weekly)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Single-Paclitaxel-Weekly': {
            name: 'Single agent Paclitaxel (weekly)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly x 12 weeks' }
            ]
        },
        'Ramucirumab-Paclitaxel': {
            name: 'Ramucirumab + Paclitaxel',
            cycles: 8,
            drugs: [
                { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'q2weeks x 8 cycles' },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly x 12 weeks' }
            ]
        },
        'T-DXd': {
            name: 'Trastuzumab Deruxtecan (T-DXd) (HER2+)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab Deruxtecan', dose: 6.4, unit: 'mg/kg', schedule: 'q3weeks x 12 cycles' }
            ]
        },
        'Single-Irinotecan': {
            name: 'Single agent Irinotecan',
            cycles: 6,
            drugs: [
                { name: 'Irinotecan', dose: 350, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        }
    },
    esophageal: {
        'CROSS-CRT': {
            name: 'CROSS Protocol (Carboplatin + Paclitaxel + RT)',
            cycles: 5,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly x 5 weeks with RT' },
                { name: 'Paclitaxel', dose: 50, unit: 'mg/m²', schedule: 'weekly x 5 weeks with RT' }
            ]
        },
        'PRODIGES-ACCORD17-CRT': {
            name: 'PRODIGES/ACCORD17 (5-FU + Cisplatin + RT)',
            cycles: 2,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'day 1 of week 1 and 5 with RT' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'continuous infusion days 1-4 of week 1 and 5 with RT' }
            ]
        },
        'FOLFOX-RT': {
            name: 'FOLFOX + RT',
            cycles: 2,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'week 1 and 5 with RT' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'week 1 and 5 with RT' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'week 1 and 5 with RT' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, week 1 and 5 with RT' }
            ]
        },
        'CAPEOX-RT': {
            name: 'CAPEOX + RT',
            cycles: 2,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'week 1 and 5 with RT' },
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'twice daily, days 1-14 of each cycle with RT' }
            ]
        },
        'Carboplatin-Paclitaxel': {
            name: 'Carboplatin + Paclitaxel',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'q3weeks x 6 cycles' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Carboplatin-Paclitaxel-Weekly': {
            name: 'Carboplatin + Paclitaxel (weekly)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly x 18 weeks' },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly x 18 weeks' }
            ]
        },
        'ECF-MAGIC': {
            name: 'ECF (MAGIC trial)',
            cycles: 3,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'q3weeks x 3 cycles pre-op, 3 cycles post-op' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'q3weeks x 3 cycles pre-op, 3 cycles post-op' },
                { name: '5-Fluorouracil', dose: 200, unit: 'mg/m²', days: 'D1-D21', schedule: 'continuous infusion daily x 21 days, q3weeks' }
            ]
        },
        'FLO-Trial': {
            name: 'FLO Trial (Oxaliplatin + Leucovorin + 5-FU)',
            cycles: 4,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 4 cycles' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'q2weeks x 4 cycles' },
                { name: '5-Fluorouracil', dose: 2600, unit: 'mg/m²', days: 'D1 (24hr CI)', schedule: '24-hour infusion, q2weeks x 4 cycles' }
            ]
        },
        'FLOT4': {
            name: 'FLOT4 (Docetaxel + Oxaliplatin + Leucovorin + 5-FU)',
            cycles: 8,
            drugs: [
                { name: 'Docetaxel', dose: 50, unit: 'mg/m²', schedule: 'q2weeks x 4 cycles pre-op, 4 cycles post-op' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 4 cycles pre-op, 4 cycles post-op' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'q2weeks x 4 cycles pre-op, 4 cycles post-op' },
                { name: '5-Fluorouracil', dose: 2600, unit: 'mg/m²', days: 'D1 (24hr CI)', schedule: '24-hour infusion, q2weeks x 4 cycles pre-op, 4 cycles post-op' }
            ]
        },
        'mFOLFOX6-Eso': {
            name: 'mFOLFOX6 (Esophageal)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' }
            ]
        },
        'CAPEOX-Eso': {
            name: 'CAPEOX (Esophageal)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'q3weeks x 8 cycles' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, q3weeks x 8 cycles' }
            ]
        },
        'EOF-Eso': {
            name: 'EOF (Esophageal)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: '5-Fluorouracil', dose: 200, unit: 'mg/m²', days: 'D1-D21', schedule: 'continuous infusion daily x 21 days, q3weeks x 6 cycles' }
            ]
        },
        'ECX-Eso': {
            name: 'ECX (Esophageal)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Capecitabine', dose: 625, unit: 'mg/m²', days: 'D1-D21', schedule: 'twice daily, days 1-21, q3weeks x 6 cycles' }
            ]
        },
        'EOX-Eso': {
            name: 'EOX (Esophageal)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Capecitabine', dose: 625, unit: 'mg/m²', days: 'D1-D21', schedule: 'twice daily, days 1-21, q3weeks x 6 cycles' }
            ]
        },
        'Cisplatin-Irinotecan-Eso': {
            name: 'Cisplatin + Irinotecan (Esophageal)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 30, unit: 'mg/m²', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Irinotecan', dose: 65, unit: 'mg/m²', schedule: 'days 1, 8, q3weeks x 6 cycles' }
            ]
        },
        '5FU-Paclitaxel-Eso': {
            name: '5-FU + Paclitaxel (Esophageal)',
            cycles: 6,
            drugs: [
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 6 cycles' },
                { name: 'Paclitaxel', dose: 150, unit: 'mg/m²', schedule: 'q2weeks x 6 cycles' }
            ]
        },
        'Cisplatin-Paclitaxel-Eso': {
            name: 'Cisplatin + Paclitaxel (Esophageal)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Cisplatin-Docetaxel-Eso': {
            name: 'Cisplatin + Docetaxel (Esophageal)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Nivolumab-Maintenance-Eso': {
            name: 'Nivolumab (post-CRT maintenance)',
            cycles: 16,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'q2weeks x 16 cycles (post-CRT with residual disease)' }
            ]
        },
        'Trastuzumab-Pertuzumab-HER2': {
            name: 'Trastuzumab + Pertuzumab (HER2+)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg q3weeks', hasLoadingDose: true },
                { name: 'Pertuzumab', dose: 840, maintenanceDose: 420, unit: 'mg', schedule: 'loading dose, then 420 mg q3weeks', hasLoadingDose: true }
            ]
        },
        'mFOLFOX6-Trastuzumab-Eso': {
            name: 'mFOLFOX6 + Trastuzumab (HER2+)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg q3weeks', hasLoadingDose: true }
            ]
        },
        'CAPEOX-Trastuzumab-Eso': {
            name: 'CAPEOX + Trastuzumab (HER2+)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'q3weeks x 8 cycles' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, q3weeks x 8 cycles' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg q3weeks', hasLoadingDose: true }
            ]
        },
        'Nivolumab-Ipilimumab-MSI': {
            name: 'Nivolumab + Ipilimumab (MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'q2weeks x 4, then 480mg flat dose q4weeks' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'q6weeks x 4 doses' }
            ]
        },
        'Pembrolizumab-MSI': {
            name: 'Pembrolizumab (MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks or 400mg q6weeks' }
            ]
        },
        'Pembrolizumab-PDL1': {
            name: 'Pembrolizumab (PD-L1 CPS≥10)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks or 400mg q6weeks' }
            ]
        },
        'mFOLFOX6-Pembrolizumab': {
            name: 'mFOLFOX6 + Pembrolizumab (PD-L1 CPS≥1)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'q2weeks x 12 cycles' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, q2weeks x 12 cycles' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks (given with every other FOLFOX cycle)' }
            ]
        },
        'Single-Docetaxel-Eso': {
            name: 'Single agent Docetaxel (Esophageal)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Single-Paclitaxel-Eso': {
            name: 'Single agent Paclitaxel (Esophageal)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Single-Paclitaxel-Weekly-Eso': {
            name: 'Single agent Paclitaxel (weekly, Esophageal)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly x 18 weeks' }
            ]
        },
        'Single-Irinotecan-Eso': {
            name: 'Single agent Irinotecan (Esophageal)',
            cycles: 6,
            drugs: [
                { name: 'Irinotecan', dose: 350, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'T-DXd-Eso': {
            name: 'Trastuzumab Deruxtecan (T-DXd) (HER2+)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab Deruxtecan', dose: 6.4, unit: 'mg/kg', schedule: 'q3weeks x 12 cycles' }
            ]
        }
    },
    head_neck: {
        'TPF': {
            name: 'TPF (Docetaxel + Cisplatin + 5-FU)',
            cycles: 3,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 3 cycles' },
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'day 1, q3weeks x 3 cycles' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', days: 'D1-D4', schedule: 'continuous infusion days 1-4, q3weeks x 3 cycles' }
            ]
        },
        'TPF-Modified': {
            name: 'TPF Modified (Docetaxel + Cisplatin + 5-FU)',
            cycles: 3,
            drugs: [
                { name: 'Docetaxel', dose: 70, unit: 'mg/m²', schedule: 'day 1, q3weeks x 3 cycles' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 3 cycles' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', days: 'D1-D4', schedule: 'continuous infusion days 1-4, q3weeks x 3 cycles' }
            ]
        },
        'TIP': {
            name: 'TIP (Docetaxel + Ifosfamide + Cisplatin)',
            cycles: 4,
            drugs: [
                { name: 'Docetaxel', dose: 30, unit: 'mg/m²', schedule: 'days 1, 8, q3weeks x 4 cycles' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q3weeks x 4 cycles' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q3weeks x 4 cycles' }
            ]
        },
        'Carboplatin-Paclitaxel-HN': {
            name: 'Carboplatin + Paclitaxel (Head & Neck)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'q3weeks x 6 cycles' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Carboplatin-Paclitaxel-Weekly-HN': {
            name: 'Carboplatin + Paclitaxel (weekly, Head & Neck)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly x 18 weeks' },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly x 18 weeks' }
            ]
        },
        'Cisplatin-Paclitaxel-HN': {
            name: 'Cisplatin + Paclitaxel (Head & Neck)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Cisplatin-5FU-HN': {
            name: 'Cisplatin + 5-FU (Head & Neck)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', days: 'D1-D4', schedule: 'continuous infusion days 1-4, q3weeks x 6 cycles' }
            ]
        },
        'Carboplatin-5FU-HN': {
            name: 'Carboplatin + 5-FU (Head & Neck)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', days: 'D1-D4', schedule: 'continuous infusion days 1-4, q3weeks x 6 cycles' }
            ]
        },
        'Pembrolizumab-Carboplatin-5FU': {
            name: 'Pembrolizumab + Carboplatin + 5-FU (all patients)',
            cycles: 6,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'day 1, q3weeks x 6 cycles, then maintenance' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', days: 'D1-D4', schedule: 'continuous infusion days 1-4, q3weeks x 6 cycles' }
            ]
        },
        'Pembrolizumab-Cisplatin-5FU': {
            name: 'Pembrolizumab + Cisplatin + 5-FU (all patients)',
            cycles: 6,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'day 1, q3weeks x 6 cycles, then maintenance' },
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', days: 'D1-D4', schedule: 'continuous infusion days 1-4, q3weeks x 6 cycles' }
            ]
        },
        'Pembrolizumab-Carboplatin-Paclitaxel': {
            name: 'Pembrolizumab + Carboplatin + Paclitaxel',
            cycles: 6,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'day 1, q3weeks x 6 cycles, then maintenance' },
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Carboplatin-5FU-Cetuximab': {
            name: 'Carboplatin + 5-FU + Cetuximab (EXTREME)',
            cycles: 6,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', days: 'D1-D4', schedule: 'continuous infusion days 1-4, q3weeks x 6 cycles' }
            ]
        },
        'Cisplatin-5FU-Cetuximab': {
            name: 'Cisplatin + 5-FU + Cetuximab (EXTREME)',
            cycles: 6,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true },
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', days: 'D1-D4', schedule: 'continuous infusion days 1-4, q3weeks x 6 cycles' }
            ]
        },
        'Cisplatin-Cetuximab': {
            name: 'Cisplatin + Cetuximab',
            cycles: 6,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true },
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Cisplatin-RT': {
            name: 'Cisplatin + Radiation Therapy',
            cycles: 3,
            drugs: [
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'day 1, q3weeks x 3 cycles with concurrent RT' }
            ]
        },
        'Cisplatin-RT-Weekly': {
            name: 'Cisplatin + Radiation Therapy (weekly)',
            cycles: 7,
            drugs: [
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'weekly x 7 weeks with concurrent RT' }
            ]
        },
        'Cisplatin-Vinorelbine-NPC': {
            name: 'Cisplatin + Vinorelbine (Nasopharyngeal)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Vinorelbine', dose: 25, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' }
            ]
        },
        'Gemcitabine-Cisplatin-NPC': {
            name: 'Gemcitabine + Cisplatin (Nasopharyngeal)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Toripalimab-Gemcitabine-Cisplatin': {
            name: 'Toripalimab + Gemcitabine + Cisplatin (Nasopharyngeal)',
            cycles: 6,
            drugs: [
                { name: 'Toripalimab', dose: 240, unit: 'mg', schedule: 'day 1, q3weeks x 6 cycles, then maintenance' },
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Single-Docetaxel-HN': {
            name: 'Single agent Docetaxel (Head & Neck)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Single-Paclitaxel-HN': {
            name: 'Single agent Paclitaxel (Head & Neck)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
            ]
        },
        'Single-Paclitaxel-Weekly-HN': {
            name: 'Single agent Paclitaxel (weekly, Head & Neck)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly x 18 weeks' }
            ]
        },
        'Single-Pembrolizumab-CPS1': {
            name: 'Single agent Pembrolizumab (PD-L1 CPS≥1)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks or 400mg q6weeks' }
            ]
        },
        'Single-Nivolumab-CPS1': {
            name: 'Single agent Nivolumab (PD-L1 CPS≥1)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'q2weeks or 480mg q4weeks' }
            ]
        },
        'Single-Cetuximab': {
            name: 'Single agent Cetuximab',
            cycles: 12,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true }
            ]
        },
        'Single-Methotrexate': {
            name: 'Single agent Methotrexate',
            cycles: 6,
            drugs: [
                { name: 'Methotrexate', dose: 40, unit: 'mg/m²', schedule: 'weekly x 6 cycles' }
            ]
        },
        'Single-Capecitabine-HN': {
            name: 'Single agent Capecitabine (Head & Neck)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'twice daily, days 1-14, q3weeks x 6 cycles' }
            ]
        },
        'Carboplatin-Cetuximab': {
            name: 'Carboplatin + Cetuximab',
            cycles: 6,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Paclitaxel-Carboplatin-Cetuximab': {
            name: 'Paclitaxel + Carboplatin + Cetuximab (PCE)',
            cycles: 6,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 1, q3weeks x 6 cycles' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
            ]
        },
        'Afatinib': {
            name: 'Afatinib (EGFR mutation)',
            cycles: 12,
            drugs: [
                { name: 'Afatinib', dose: 40, unit: 'mg', schedule: 'daily' }
            ]
        }
    },
    lung: {
        nsclc: {
            // First-line combinations with immunotherapy
            'Nivolumab-Carboplatin-Pemetrexed': {
                name: 'Nivolumab + Carboplatin + Pemetrexed (Non-squamous histology)',
                cycles: 4,
                drugs: [
                    { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' }
                ]
            },
            'Nivolumab-Cisplatin-Pemetrexed': {
                name: 'Nivolumab + Cisplatin + Pemetrexed (Non-squamous histology)',
                cycles: 4,
                drugs: [
                    { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' }
                ]
            },
            'Pembrolizumab-Cisplatin-Pemetrexed': {
                name: 'Pembrolizumab + Cisplatin + Pemetrexed (Non-squamous histology)',
                cycles: 4,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' }
                ]
            },
            'Pembrolizumab-Carboplatin-Pemetrexed': {
                name: 'Pembrolizumab + Carboplatin + Pemetrexed (Non-squamous histology)',
                cycles: 4,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' }
                ]
            },
            'Pemetrexed-Cisplatin': {
                name: 'Pemetrexed + Cisplatin (Non-squamous histology)',
                cycles: 4,
                drugs: [
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' }
                ]
            },
            'Pemetrexed-Carboplatin': {
                name: 'Pemetrexed + Carboplatin (Non-squamous histology)',
                cycles: 4,
                drugs: [
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' }
                ]
            },
            'Pemetrexed-Carboplatin-Bevacizumab': {
                name: 'Pemetrexed + Carboplatin + Bevacizumab (Non-squamous)',
                cycles: 4,
                drugs: [
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'day 1, q3weeks, continue as maintenance' }
                ]
            },
            'Atezolizumab-Bevacizumab-Carboplatin-Paclitaxel': {
                name: 'ABCP (Atezolizumab + Bevacizumab + Carboplatin + Paclitaxel)',
                cycles: 4,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'day 1, q3weeks, continue as maintenance' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' }
                ]
            },
            'Atezolizumab-Nab-Paclitaxel-Carboplatin': {
                name: 'Atezolizumab + Nab-paclitaxel + Carboplatin (Non-squamous)',
                cycles: 4,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' },
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', days: 'D1,D8,D15', schedule: 'days 1, 8, 15, q4weeks x 4 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' }
                ]
            },
            // EGFR-targeted therapy
            'Amivantamab-Lazertinib': {
                name: 'Amivantamab + Lazertinib (EGFR exon19del/L858R)',
                cycles: 12,
                drugs: [
                    { name: 'Amivantamab', dose: 1400, unit: 'mg', schedule: 'loading dose 1400mg, then 1050mg q2weeks' },
                    { name: 'Lazertinib', dose: 240, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Osimertinib': {
                name: 'Osimertinib (EGFR exon19del/L858R/T790M)',
                cycles: 12,
                drugs: [
                    { name: 'Osimertinib', dose: 80, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Amivantamab-Exon20': {
                name: 'Amivantamab (EGFR exon20 insertion)',
                cycles: 12,
                drugs: [
                    { name: 'Amivantamab', dose: 1400, unit: 'mg', schedule: 'loading dose 1400mg, then 1050mg q2weeks' }
                ]
            },
            'Mobocertinib': {
                name: 'Mobocertinib (EGFR exon20 insertion)',
                cycles: 12,
                drugs: [
                    { name: 'Mobocertinib', dose: 160, unit: 'mg', schedule: 'daily' }
                ]
            },
            // Maintenance therapy
            'Maintenance-Pemetrexed': {
                name: 'Maintenance Pemetrexed (Non-squamous)',
                cycles: 12,
                drugs: [
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'day 1, q3weeks maintenance' }
                ]
            },
            // Second-line therapy
            'Docetaxel-Ramucirumab': {
                name: 'Docetaxel + Ramucirumab (Second-line)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Ramucirumab', dose: 10, unit: 'mg/kg', schedule: 'day 1, q3weeks x 6 cycles' }
                ]
            },
            'T-DXd-HER2': {
                name: 'Trastuzumab Deruxtecan (HER2 mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Trastuzumab Deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'q3weeks x 12 cycles' }
                ]
            },
            // Additional NSCLC protocols from user's comprehensive list
            'Nivolumab-Paclitaxel-Carboplatin': {
                name: 'Nivolumab + Paclitaxel + Carboplatin',
                cycles: 4,
                drugs: [
                    { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' }
                ]
            },
            'Nivolumab-Paclitaxel-Cisplatin': {
                name: 'Nivolumab + Paclitaxel + Cisplatin',
                cycles: 4,
                drugs: [
                    { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' }
                ]
            },
            'Pembrolizumab-Cisplatin-Gemcitabine-NSCLC': {
                name: 'Pembrolizumab + Cisplatin + Gemcitabine',
                cycles: 4,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 4 cycles' }
                ]
            },
            'Cisplatin-Etoposide-RT-NSCLC': {
                name: 'Cisplatin + Etoposide + RT',
                cycles: 2,
                drugs: [
                    { name: 'Cisplatin', dose: 50, unit: 'mg/m²', days: 'D1,D8,D29,D36', schedule: 'days 1, 8, 29, 36 with concurrent RT' },
                    { name: 'Etoposide', dose: 50, unit: 'mg/m²', days: 'D1-D5,D29-D33', schedule: 'days 1-5, 29-33 with concurrent RT' },
                    { name: 'Radiation Therapy', dose: 'concurrent', unit: 'RT', schedule: 'concurrent with chemotherapy' }
                ]
            },
            'Weekly-Paclitaxel-Carboplatin-RT': {
                name: 'Weekly Paclitaxel + Carboplatin + RT',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 45, unit: 'mg/m²', schedule: 'weekly x 6 with concurrent RT' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly x 6 with concurrent RT' },
                    { name: 'Radiation Therapy', dose: 'concurrent', unit: 'RT', schedule: 'concurrent with chemotherapy' }
                ]
            },
            'Paclitaxel-Carboplatin-3weekly': {
                name: 'Paclitaxel + Carboplatin (3 weekly)',
                cycles: 4,
                drugs: [
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' }
                ]
            },
            'Vinorelbine-Cisplatin': {
                name: 'Vinorelbine + Cisplatin',
                cycles: 4,
                drugs: [
                    { name: 'Vinorelbine', dose: 25, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 4 cycles' },
                    { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' }
                ]
            },
            'Cisplatin-Vinblastine': {
                name: 'Cisplatin + Vinblastine',
                cycles: 4,
                drugs: [
                    { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'day 1, q4weeks x 4 cycles' },
                    { name: 'Vinblastine', dose: 4, unit: 'mg/m²', schedule: 'days 1, 8, q4weeks x 4 cycles' }
                ]
            },
            'Cisplatin-Etoposide-NSCLC': {
                name: 'Cisplatin + Etoposide',
                cycles: 4,
                drugs: [
                    { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Etoposide', dose: 120, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q3weeks x 4 cycles' }
                ]
            },
            'Single-Atezolizumab': {
                name: 'Single agent Atezolizumab',
                cycles: 12,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'q3weeks' }
                ]
            },
            'Carboplatin-Nab-Paclitaxel': {
                name: 'Carboplatin + Nab-paclitaxel',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', days: 'D1,D8,D15', schedule: 'days 1, 8, 15, q4weeks x 4 cycles' }
                ]
            },
            'Carboplatin-Paclitaxel-Weekly': {
                name: 'Carboplatin + Paclitaxel (weekly)',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly x 12 weeks' },
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly x 12 weeks' }
                ]
            },
            'Carboplatin-Paclitaxel-Bevacizumab': {
                name: 'Carboplatin + Paclitaxel + Bevacizumab',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' }
                ]
            },
            'ABCP': {
                name: 'Atezolizumab + Bevacizumab + Carboplatin + Paclitaxel (ABCP)',
                cycles: 4,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' }
                ]
            },
            'Gemcitabine-Cisplatin-Bevacizumab': {
                name: 'Gemcitabine + Cisplatin + Bevacizumab',
                cycles: 4,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 4 cycles' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'day 1, q3weeks x 4 cycles' }
                ]
            },
            'Cisplatin-Paclitaxel': {
                name: 'Cisplatin + Paclitaxel',
                cycles: 4,
                drugs: [
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' }
                ]
            },
            'Docetaxel-Carboplatin': {
                name: 'Docetaxel + Carboplatin',
                cycles: 4,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' }
                ]
            },
            'Docetaxel-Cisplatin': {
                name: 'Docetaxel + Cisplatin',
                cycles: 4,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' }
                ]
            },
            'Docetaxel-Gemcitabine': {
                name: 'Docetaxel + Gemcitabine',
                cycles: 4,
                drugs: [
                    { name: 'Docetaxel', dose: 85, unit: 'mg/m²', schedule: 'day 8, q3weeks x 4 cycles' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 4 cycles' }
                ]
            },
            'Gemcitabine-Cisplatin': {
                name: 'Gemcitabine + Cisplatin',
                cycles: 4,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 4 cycles' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' }
                ]
            },
            'Gemcitabine-Carboplatin': {
                name: 'Gemcitabine + Carboplatin',
                cycles: 4,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 4 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' }
                ]
            },
            'Gemcitabine-Vinorelbine': {
                name: 'Gemcitabine + Vinorelbine',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' },
                    { name: 'Vinorelbine', dose: 25, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' }
                ]
            },
            'Docetaxel-Bevacizumab': {
                name: 'Docetaxel + Bevacizumab',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Pemetrexed-Carboplatin-Bevacizumab': {
                name: 'Pemetrexed + Carboplatin + Bevacizumab (Non-squamous histology)',
                cycles: 4,
                drugs: [
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'day 1, q3weeks x 4 cycles' }
                ]
            },
            'Maintenance-Pemetrexed': {
                name: 'Maintenance Pemetrexed (Non-squamous histology)',
                cycles: 12,
                drugs: [
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'day 1, q3weeks maintenance' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin': {
                name: 'Nab-paclitaxel + Carboplatin',
                cycles: 4,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', days: 'D1,D8,D15', schedule: 'days 1, 8, 15, q4weeks x 4 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q4weeks x 4 cycles' }
                ]
            },
            'Docetaxel-Ramucirumab': {
                name: 'Docetaxel + Ramucirumab',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Ramucirumab', dose: 10, unit: 'mg/kg', schedule: 'day 1, q3weeks x 6 cycles' }
                ]
            },
            'Gemcitabine-Cisplatin-Necitumumab': {
                name: 'Gemcitabine + Cisplatin + Necitumumab',
                cycles: 4,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 4 cycles' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Necitumumab', dose: 800, unit: 'mg', schedule: 'days 1, 8, q3weeks x 4 cycles' }
                ]
            },
            'Dabrafenib-Trametinib': {
                name: 'Dabrafenib + Trametinib (BRAF V600E mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'twice daily' },
                    { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Carboplatin-Paclitaxel-Pembrolizumab': {
                name: 'Carboplatin + Paclitaxel + Pembrolizumab',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' }
                ]
            },
            'Carboplatin-Nab-Paclitaxel-Pembrolizumab': {
                name: 'Carboplatin + Nab-paclitaxel + Pembrolizumab',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', days: 'D1,D8,D15', schedule: 'days 1, 8, 15, q4weeks x 4 cycles' },
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' }
                ]
            },
            'Atezolizumab-Nab-Paclitaxel-Carboplatin': {
                name: 'Atezolizumab + Nab-paclitaxel + Carboplatin',
                cycles: 4,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' },
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', days: 'D1,D8,D15', schedule: 'days 1, 8, 15, q4weeks x 4 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' }
                ]
            },
            'Ramucirumab-Erlotinib': {
                name: 'Ramucirumab + Erlotinib',
                cycles: 12,
                drugs: [
                    { name: 'Ramucirumab', dose: 10, unit: 'mg/kg', schedule: 'q2weeks' },
                    { name: 'Erlotinib', dose: 150, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Ipilimumab-Nivolumab': {
                name: 'Ipilimumab + Nivolumab',
                cycles: 4,
                drugs: [
                    { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'day 1, q6weeks x 4 cycles' },
                    { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' }
                ]
            },
            'Durvalumab-Tremelimumab': {
                name: 'Durvalumab + Tremelimumab',
                cycles: 4,
                drugs: [
                    { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'day 1, q4weeks x 4 cycles, then maintenance' },
                    { name: 'Tremelimumab', dose: 75, unit: 'mg', schedule: 'day 1, q4weeks x 4 cycles' }
                ]
            },
            // Single agents
            'Single-Paclitaxel': {
                name: 'Single agent Paclitaxel',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Single-Nab-Paclitaxel': {
                name: 'Single agent Nab-paclitaxel',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 260, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Single-Docetaxel': {
                name: 'Single agent Docetaxel',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Single-Pemetrexed': {
                name: 'Single agent Pemetrexed (Non-squamous histology)',
                cycles: 6,
                drugs: [
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'q3weeks x 6 cycles' }
                ]
            },
            'Single-Gemcitabine': {
                name: 'Single agent Gemcitabine',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8,D15', schedule: 'days 1, 8, 15, q4weeks x 6 cycles' }
                ]
            },
            'Single-Vinorelbine': {
                name: 'Single agent Vinorelbine',
                cycles: 6,
                drugs: [
                    { name: 'Vinorelbine', dose: 30, unit: 'mg/m²', schedule: 'weekly x 6 cycles' }
                ]
            },
            // EGFR inhibitors
            'Gefitinib': {
                name: 'Gefitinib (EGFR exon19del)',
                cycles: 12,
                drugs: [
                    { name: 'Gefitinib', dose: 250, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Erlotinib': {
                name: 'Erlotinib (EGFR exon19del)',
                cycles: 12,
                drugs: [
                    { name: 'Erlotinib', dose: 150, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Afatinib': {
                name: 'Afatinib (EGFR exon19del)',
                cycles: 12,
                drugs: [
                    { name: 'Afatinib', dose: 40, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Dacomitinib': {
                name: 'Dacomitinib (EGFR exon19del)',
                cycles: 12,
                drugs: [
                    { name: 'Dacomitinib', dose: 45, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Amivantamab-Exon20': {
                name: 'Amivantamab (EGFR exon20 insertion)',
                cycles: 12,
                drugs: [
                    { name: 'Amivantamab', dose: 1400, unit: 'mg', schedule: 'loading dose 1400mg, then 1050mg q2weeks' }
                ]
            },
            'Mobocertinib': {
                name: 'Mobocertinib (EGFR exon20 insertion)',
                cycles: 12,
                drugs: [
                    { name: 'Mobocertinib', dose: 160, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Single-Nivolumab': {
                name: 'Single agent Nivolumab',
                cycles: 12,
                drugs: [
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'q2weeks' }
                ]
            },
            // ALK/ROS1 inhibitors
            'Crizotinib': {
                name: 'Crizotinib (ALK or ROS1 positive)',
                cycles: 12,
                drugs: [
                    { name: 'Crizotinib', dose: 250, unit: 'mg', schedule: 'twice daily' }
                ]
            },
            'Ceritinib': {
                name: 'Ceritinib (ALK or ROS1 positive)',
                cycles: 12,
                drugs: [
                    { name: 'Ceritinib', dose: 450, unit: 'mg', schedule: 'daily with food' }
                ]
            },
            'Alectinib': {
                name: 'Alectinib (ALK rearrangements)',
                cycles: 12,
                drugs: [
                    { name: 'Alectinib', dose: 600, unit: 'mg', schedule: 'twice daily' }
                ]
            },
            'Brigatinib': {
                name: 'Brigatinib (ALK rearrangements)',
                cycles: 12,
                drugs: [
                    { name: 'Brigatinib', dose: 180, unit: 'mg', schedule: 'daily (after 7-day lead-in at 90mg)' }
                ]
            },
            'Lorlatinib': {
                name: 'Lorlatinib (ALK rearrangements, ROS1)',
                cycles: 12,
                drugs: [
                    { name: 'Lorlatinib', dose: 100, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Entrectinib': {
                name: 'Entrectinib (NTRK fusion)',
                cycles: 12,
                drugs: [
                    { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Osimertinib-T790M': {
                name: 'Osimertinib (EGFR exon19del, T790M mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Osimertinib', dose: 80, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Selpercatinib': {
                name: 'Selpercatinib (RET fusion-positive)',
                cycles: 12,
                drugs: [
                    { name: 'Selpercatinib', dose: 160, unit: 'mg', schedule: 'twice daily' }
                ]
            },
            'Pralsetinib': {
                name: 'Pralsetinib (RET fusion-positive)',
                cycles: 12,
                drugs: [
                    { name: 'Pralsetinib', dose: 400, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Capmatinib': {
                name: 'Capmatinib (MET exon14 skipping)',
                cycles: 12,
                drugs: [
                    { name: 'Capmatinib', dose: 400, unit: 'mg', schedule: 'twice daily' }
                ]
            },
            'Tepotinib': {
                name: 'Tepotinib (MET exon14 skipping)',
                cycles: 12,
                drugs: [
                    { name: 'Tepotinib', dose: 450, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Sotorasib': {
                name: 'Sotorasib (KRAS G12C mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Sotorasib', dose: 960, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Adagrasib': {
                name: 'Adagrasib (KRAS G12C mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Adagrasib', dose: 600, unit: 'mg', schedule: 'twice daily' }
                ]
            },
            'Single-Pembrolizumab': {
                name: 'Single agent Pembrolizumab (PD-L1 ≥50%)',
                cycles: 12,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks' }
                ]
            },
            'Single-Durvalumab': {
                name: 'Single agent Durvalumab',
                cycles: 12,
                drugs: [
                    { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'q4weeks' }
                ]
            },
            'Single-Cemiplimab': {
                name: 'Single agent Cemiplimab',
                cycles: 12,
                drugs: [
                    { name: 'Cemiplimab', dose: 350, unit: 'mg', schedule: 'q3weeks' }
                ]
            }
        },
        sclc: {
            // First-line therapy for extensive stage SCLC
            'Atezolizumab-Carboplatin-Etoposide': {
                name: 'Atezolizumab + Carboplatin + Etoposide (ES-SCLC)',
                cycles: 4,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q3weeks x 4 cycles' }
                ]
            },
            'Durvalumab-Carboplatin-Etoposide': {
                name: 'Durvalumab + Carboplatin + Etoposide (ES-SCLC)',
                cycles: 4,
                drugs: [
                    { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'day 1, q3weeks x 4 cycles, then maintenance' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q3weeks x 4 cycles' }
                ]
            },
            'Carboplatin-Etoposide': {
                name: 'Carboplatin + Etoposide (SCLC)',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q3weeks x 4 cycles' }
                ]
            },
            'Cisplatin-Etoposide-SCLC': {
                name: 'Cisplatin + Etoposide (SCLC)',
                cycles: 4,
                drugs: [
                    { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q3weeks x 4 cycles' }
                ]
            },
            'Topotecan-SCLC': {
                name: 'Topotecan (Second-line SCLC)',
                cycles: 6,
                drugs: [
                    { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q3weeks x 6 cycles' }
                ]
            },
            'Lurbinectedin': {
                name: 'Lurbinectedin (Second-line SCLC)',
                cycles: 6,
                drugs: [
                    { name: 'Lurbinectedin', dose: 3.2, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
                ]
            },
            'CAV-SCLC': {
                name: 'CAV (Cyclophosphamide + Adriamycin + Vincristine)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 45, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'day 1, q3weeks x 6 cycles' }
                ]
            },
            'Irinotecan-Cisplatin': {
                name: 'Irinotecan + Cisplatin (SCLC)',
                cycles: 4,
                drugs: [
                    { name: 'Irinotecan', dose: 60, unit: 'mg/m²', days: 'D1,D8,D15', schedule: 'days 1, 8, 15, q4weeks x 4 cycles' },
                    { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'day 1, q4weeks x 4 cycles' }
                ]
            },
            'Topotecan-Cisplatin': {
                name: 'Topotecan + Cisplatin (SCLC)',
                cycles: 4,
                drugs: [
                    { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, q3weeks x 4 cycles' },
                    { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' }
                ]
            },
            'Carboplatin-Paclitaxel-Etoposide': {
                name: 'Carboplatin + Paclitaxel + Etoposide (SCLC)',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Etoposide', dose: 50, unit: 'mg/m²', days: 'D1-D10', schedule: 'days 1-10, q3weeks x 4 cycles' }
                ]
            },
            'Carboplatin-Paclitaxel-SCLC': {
                name: 'Carboplatin + Paclitaxel (SCLC)',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'day 1, q3weeks x 4 cycles' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'day 1, q3weeks x 4 cycles' }
                ]
            },
            'CAE-SCLC': {
                name: 'CAE (Cyclophosphamide + Adriamycin + Etoposide)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 45, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q3weeks x 6 cycles' }
                ]
            },
            'Etoposide-Single': {
                name: 'Etoposide (Single Agent SCLC)',
                cycles: 6,
                drugs: [
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, q3weeks x 6 cycles' }
                ]
            },
            'Paclitaxel-Single-SCLC': {
                name: 'Paclitaxel (Single Agent SCLC)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'day 1, q3weeks x 6 cycles' }
                ]
            },
            'Gemcitabine-Single-SCLC': {
                name: 'Gemcitabine (Single Agent SCLC)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, q3weeks x 6 cycles' }
                ]
            },
            'Nivolumab-SCLC': {
                name: 'Nivolumab (PD-L1 CPS ≥1% SCLC)',
                cycles: 8,
                drugs: [
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'q2weeks x 8 cycles, then 480mg q4weeks' }
                ]
            },
            'Pembrolizumab-SCLC': {
                name: 'Pembrolizumab (PD-L1 CPS ≥1% SCLC)',
                cycles: 8,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'q3weeks x 8 cycles, then 400mg q6weeks' }
                ]
            }
        }
    }
};

// Calculate BSA using Mosteller's formula
function calculateBSA(height, weight) {
    return Math.sqrt((height * weight) / 3600);
}

// Calculate creatinine clearance using Cockcroft-Gault formula
function calculateCrCl(age, weight, creatinine, sex) {
    let crCl = ((140 - age) * weight) / (72 * creatinine);
    if (sex === 'female') {
        crCl *= 0.85;
    }
    return crCl;
}

// Calculate carboplatin dose using Calvert formula
function calculateCarboplatinDose(auc, crCl) {
    const gfr = crCl; // Approximation
    return auc * (gfr + 25);
}

// Populate subtype dropdown for breast cancer and lung cancer
function populateSubtypes(cancerType) {
    const subtypeGroup = document.getElementById('subtypeGroup');
    const subtypeSelect = document.getElementById('cancerSubtype');
    const protocolSelect = document.getElementById('protocol');
    
    if (cancerType === 'breast') {
        subtypeGroup.style.display = 'block';
        subtypeSelect.disabled = false;
        subtypeSelect.required = true;
        subtypeSelect.innerHTML = '<option value="">Select subtype</option>';
        
        const subtypes = {
            'hormone_positive': 'Hormone Positive (ER+/PR+)',
            'triple_negative': 'Triple Negative (ER-/PR-/HER2-)',
            'her2_positive': 'HER2 Positive'
        };
        
        Object.keys(subtypes).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = subtypes[key];
            subtypeSelect.appendChild(option);
        });
        
        // Reset protocol dropdown
        protocolSelect.innerHTML = '<option value="">Select subtype first</option>';
        protocolSelect.disabled = true;
    } else if (cancerType === 'lung') {
        subtypeGroup.style.display = 'block';
        subtypeSelect.disabled = false;
        subtypeSelect.required = true;
        subtypeSelect.innerHTML = '<option value="">Select histology</option>';
        
        const subtypes = {
            'nsclc': 'Non-Small Cell Lung Cancer (NSCLC)',
            'sclc': 'Small Cell Lung Cancer (SCLC)'
        };
        
        Object.keys(subtypes).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = subtypes[key];
            subtypeSelect.appendChild(option);
        });
        
        // Reset protocol dropdown
        protocolSelect.innerHTML = '<option value="">Select histology first</option>';
        protocolSelect.disabled = true;
    } else if (cancerType === 'lymphoma') {
        subtypeGroup.style.display = 'block';
        subtypeSelect.disabled = false;
        subtypeSelect.required = true;
        subtypeSelect.innerHTML = '<option value="">Select lymphoma type</option>';
        
        const subtypes = {
            'hodgkins': 'Hodgkin\'s Lymphoma',
            'non_hodgkins': 'Non-Hodgkin\'s Lymphoma'
        };
        
        Object.keys(subtypes).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = subtypes[key];
            subtypeSelect.appendChild(option);
        });
        
        // Reset protocol dropdown
        protocolSelect.innerHTML = '<option value="">Select lymphoma type first</option>';
        protocolSelect.disabled = true;
    } else {
        subtypeGroup.style.display = 'none';
        subtypeSelect.disabled = true;
        subtypeSelect.required = false;
        subtypeSelect.value = '';
        populateProtocols(cancerType, null);
    }
}

// Populate protocol dropdown based on cancer type and subtype
function populateProtocols(cancerType, subtype) {
    const protocolSelect = document.getElementById('protocol');
    protocolSelect.innerHTML = '<option value="">Select protocol</option>';
    
    if (cancerType && protocolDatabase[cancerType]) {
        let protocols;
        
        if ((cancerType === 'breast' || cancerType === 'lung' || cancerType === 'lymphoma') && subtype) {
            protocols = protocolDatabase[cancerType][subtype];
        } else if (cancerType !== 'breast' && cancerType !== 'lung' && cancerType !== 'lymphoma') {
            protocols = protocolDatabase[cancerType];
        }
        
        if (protocols) {
            protocolSelect.disabled = false;
            Object.keys(protocols).forEach(key => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = protocols[key].name;
                protocolSelect.appendChild(option);
            });
        } else {
            protocolSelect.disabled = true;
        }
    } else {
        protocolSelect.disabled = true;
    }
}

// Check if protocol contains carboplatin and show/hide AUC dropdown
function checkForCarboplatin(protocolKey, cancerType, subtype) {
    const aucGroup = document.getElementById('aucGroup');
    const aucSelect = document.getElementById('auc');
    
    if (protocolKey && cancerType && protocolDatabase[cancerType]) {
        let protocolData;
        
        if ((cancerType === 'breast' || cancerType === 'lung' || cancerType === 'lymphoma') && subtype && protocolDatabase[cancerType][subtype]) {
            protocolData = protocolDatabase[cancerType][subtype][protocolKey];
        } else if (cancerType !== 'breast' && cancerType !== 'lung' && cancerType !== 'lymphoma') {
            protocolData = protocolDatabase[cancerType][protocolKey];
        }
        
        if (protocolData) {
            const hasCarboplatin = protocolData.drugs.some(drug => drug.name.toLowerCase().includes('carboplatin'));
            
            if (hasCarboplatin) {
                aucGroup.style.display = 'block';
                aucSelect.required = true;
            } else {
                aucGroup.style.display = 'none';
                aucSelect.required = false;
                aucSelect.value = '';
            }
        } else {
            aucGroup.style.display = 'none';
            aucSelect.required = false;
            aucSelect.value = '';
        }
    } else {
        aucGroup.style.display = 'none';
        aucSelect.required = false;
        aucSelect.value = '';
    }
}

// Calculate drug doses
function calculateDoses(formData) {
    const { height, weight, age, sex, creatinine, cancerType, cancerSubtype, protocol, auc } = formData;
    
    const bsa = calculateBSA(parseFloat(height), parseFloat(weight));
    const crCl = calculateCrCl(parseInt(age), parseFloat(weight), parseFloat(creatinine), sex);
    
    let protocolData;
    if ((cancerType === 'breast' || cancerType === 'lung' || cancerType === 'lymphoma') && cancerSubtype) {
        protocolData = protocolDatabase[cancerType][cancerSubtype][protocol];
    } else {
        protocolData = protocolDatabase[cancerType][protocol];
    }
    const calculatedDrugs = [];
    
    protocolData.drugs.forEach(drug => {
        let calculatedDose;
        let doseUnit;
        
        if (drug.unit === 'mg/m²') {
            calculatedDose = (drug.dose * bsa).toFixed(1);
            doseUnit = 'mg';
        } else if (drug.unit === 'AUC') {
            const selectedAuc = auc ? parseFloat(auc) : 6;
            calculatedDose = calculateCarboplatinDose(selectedAuc, crCl).toFixed(1);
            doseUnit = 'mg';
        } else if (drug.unit === 'mg/kg') {
            if (drug.hasLoadingDose) {
                const loadingDose = (drug.dose * parseFloat(weight)).toFixed(1);
                const maintenanceDose = (drug.maintenanceDose * parseFloat(weight)).toFixed(1);
                calculatedDose = `${loadingDose} → ${maintenanceDose}`;
                doseUnit = 'mg';
            } else {
                calculatedDose = (drug.dose * parseFloat(weight)).toFixed(1);
                doseUnit = 'mg';
            }
        } else {
            if (drug.hasLoadingDose) {
                calculatedDose = `${drug.dose} → ${drug.maintenanceDose}`;
                doseUnit = drug.unit;
            } else {
                calculatedDose = drug.dose;
                doseUnit = drug.unit;
            }
        }
        
        calculatedDrugs.push({
            name: drug.name,
            originalDose: drug.hasLoadingDose ? `${drug.dose} → ${drug.maintenanceDose}` : drug.dose,
            originalUnit: drug.unit,
            calculatedDose: calculatedDose,
            doseUnit: doseUnit,
            schedule: drug.schedule,
            hasLoadingDose: drug.hasLoadingDose,
            days: drug.days
        });
    });
    
    // Check if protocol has carboplatin
    const hasCarboplatin = protocolData.drugs.some(drug => drug.name.toLowerCase().includes('carboplatin'));
    
    return {
        bsa: bsa.toFixed(2),
        crCl: crCl.toFixed(1),
        protocolName: protocolData.name,
        cycles: protocolData.cycles,
        drugs: calculatedDrugs,
        hasCarboplatin: hasCarboplatin,
        selectedAuc: auc ? parseFloat(auc) : null
    };
}

// Page navigation functions
function showPage(pageNumber) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(`page${pageNumber}`).classList.add('active');
    
    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    const progressPercent = (pageNumber / 3) * 100;
    progressFill.style.width = `${progressPercent}%`;
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function validatePage1() {
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const age = document.getElementById('age').value;
    const sex = document.getElementById('sex').value;
    const creatinine = document.getElementById('creatinine').value;
    
    return height && weight && age && sex && creatinine;
}

function validatePage2() {
    console.log('Validating page 2, selectedSearchProtocol:', selectedSearchProtocol); // Debug log
    
    // Check if protocol is selected via search
    if (selectedSearchProtocol) {
        console.log('Using search protocol'); // Debug log
        // Check if carboplatin protocol requires AUC
        const aucGroup = document.getElementById('aucGroup');
        if (aucGroup.style.display !== 'none') {
            const auc = document.getElementById('auc').value;
            if (!auc) {
                alert('Please select an AUC value for this carboplatin protocol.');
                return false;
            }
        }
        return true;
    }
    
    // Check if protocol is selected via browse
    const cancerType = document.getElementById('cancerType').value;
    const protocol = document.getElementById('protocol').value;
    
    console.log('Browse selection - cancerType:', cancerType, 'protocol:', protocol); // Debug log
    
    if (!cancerType || !protocol) {
        alert('Please either search for a protocol above OR select cancer type and protocol below.');
        return false;
    }
    
    // Check if breast cancer, lung cancer, or lymphoma requires subtype
    if (cancerType === 'breast' || cancerType === 'lung' || cancerType === 'lymphoma') {
        const subtype = document.getElementById('cancerSubtype').value;
        if (!subtype) {
            let cancerTypeName = 'cancer';
            if (cancerType === 'breast') cancerTypeName = 'breast cancer';
            else if (cancerType === 'lung') cancerTypeName = 'lung cancer';
            else if (cancerType === 'lymphoma') cancerTypeName = 'lymphoma';
            alert(`Please select a ${cancerTypeName} subtype.`);
            return false;
        }
    }
    
    // Check if carboplatin protocol requires AUC
    const aucGroup = document.getElementById('aucGroup');
    if (aucGroup.style.display !== 'none') {
        const auc = document.getElementById('auc').value;
        if (!auc) {
            alert('Please select an AUC value for this carboplatin protocol.');
            return false;
        }
    }
    
    return true;
}

// Search functionality
let allProtocols = [];
let selectedSearchProtocol = null;

// Build searchable protocol index
function buildProtocolIndex() {
    console.log('Building protocol index...'); // Debug log
    allProtocols = [];
    
    Object.keys(protocolDatabase).forEach(cancerType => {
        const cancerName = getCancerDisplayName(cancerType);
        
        if (cancerType === 'breast' || cancerType === 'lung' || cancerType === 'lymphoma') {
            // Handle breast cancer, lung cancer, and lymphoma subtypes
            Object.keys(protocolDatabase[cancerType]).forEach(subtype => {
                const subtypeName = getSubtypeDisplayName(subtype);
                Object.keys(protocolDatabase[cancerType][subtype]).forEach(protocolKey => {
                    const protocol = protocolDatabase[cancerType][subtype][protocolKey];
                    allProtocols.push({
                        key: protocolKey,
                        name: protocol.name,
                        cancerType: cancerType,
                        cancerName: `${cancerName} - ${subtypeName}`,
                        subtype: subtype,
                        searchText: `${protocol.name} ${cancerName} ${subtypeName}`.toLowerCase()
                    });
                });
            });
        } else {
            // Handle other cancer types
            Object.keys(protocolDatabase[cancerType]).forEach(protocolKey => {
                const protocol = protocolDatabase[cancerType][protocolKey];
                allProtocols.push({
                    key: protocolKey,
                    name: protocol.name,
                    cancerType: cancerType,
                    cancerName: cancerName,
                    subtype: null,
                    searchText: `${protocol.name} ${cancerName}`.toLowerCase()
                });
            });
        }
    });
    
    console.log('Protocol index built, total protocols:', allProtocols.length); // Debug log
    console.log('First few protocols:', allProtocols.slice(0, 3)); // Debug log
}

function getCancerDisplayName(cancerType) {
    const names = {
        anal: 'Anal Cancer',
        biliary: 'Biliary Tract Cancer',
        bladder: 'Bladder Cancer',
        breast: 'Breast Cancer',
        cervical: 'Cervical Cancer',
        colorectal: 'Colorectal Cancer',
        endometrial: 'Endometrial Cancer',
        esophageal: 'Esophageal & Esophagogastric Junction Cancer',
        gastric: 'Gastric Cancer',
        head_neck: 'Head & Neck Cancer',
        lung: 'Lung Cancer',
        lymphoma: 'Lymphoma',
        neuroendocrine: 'Neuroendocrine Tumors',
        ovarian: 'Ovarian Cancer',
        pancreatic: 'Pancreatic Cancer'
    };
    return names[cancerType] || cancerType;
}

function getSubtypeDisplayName(subtype) {
    const names = {
        hormone_positive: 'Hormone Positive (ER+/PR+)',
        triple_negative: 'Triple Negative (ER-/PR-/HER2-)',
        her2_positive: 'HER2 Positive',
        nsclc: 'Non-Small Cell Lung Cancer (NSCLC)',
        sclc: 'Small Cell Lung Cancer (SCLC)',
        hodgkins: 'Hodgkin\'s Lymphoma',
        non_hodgkins: 'Non-Hodgkin\'s Lymphoma'
    };
    return names[subtype] || subtype;
}

function searchProtocols(query) {
    if (!query || query.length < 2) return [];
    
    const queryLower = query.toLowerCase();
    const results = allProtocols.filter(protocol => 
        protocol.searchText.includes(queryLower)
    );
    
    // Sort by relevance (exact matches first, then partial matches)
    results.sort((a, b) => {
        const aExact = a.name.toLowerCase().startsWith(queryLower) ? 0 : 1;
        const bExact = b.name.toLowerCase().startsWith(queryLower) ? 0 : 1;
        return aExact - bExact;
    });
    
    return results.slice(0, 8); // Limit to 8 suggestions
}

function displaySearchSuggestions(suggestions) {
    const suggestionsDiv = document.getElementById('searchSuggestions');
    console.log('Displaying suggestions, count:', suggestions.length); // Debug log
    
    if (suggestions.length === 0) {
        suggestionsDiv.style.display = 'none';
        console.log('No suggestions to display'); // Debug log
        return;
    }
    
    suggestionsDiv.innerHTML = suggestions.map(protocol => `
        <div class="suggestion-item" data-protocol-key="${protocol.key}" data-cancer-type="${protocol.cancerType}" data-subtype="${protocol.subtype || ''}">
            <div class="suggestion-protocol">${protocol.name}</div>
            <div class="suggestion-cancer">${protocol.cancerName}</div>
        </div>
    `).join('');
    
    suggestionsDiv.style.display = 'block';
    console.log('Suggestions displayed'); // Debug log
    
    // Add click handlers
    suggestionsDiv.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', function() {
            console.log('Suggestion clicked:', this.dataset.protocolKey); // Debug log
            selectSearchProtocol({
                key: this.dataset.protocolKey,
                cancerType: this.dataset.cancerType,
                subtype: this.dataset.subtype || null,
                name: this.querySelector('.suggestion-protocol').textContent,
                cancerName: this.querySelector('.suggestion-cancer').textContent
            });
        });
    });
}

function selectSearchProtocol(protocol) {
    console.log('Selecting search protocol:', protocol); // Debug log
    selectedSearchProtocol = protocol;
    
    // Update search input
    document.getElementById('protocolSearch').value = protocol.name;
    
    // Hide suggestions
    document.getElementById('searchSuggestions').style.display = 'none';
    
    // Show selected protocol info
    document.getElementById('selectedProtocolName').textContent = protocol.name;
    document.getElementById('selectedProtocolCancer').textContent = protocol.cancerName;
    document.getElementById('selectedProtocolInfo').style.display = 'block';
    
    // Clear browse section
    clearBrowseSection();
    
    // Check for carboplatin in selected protocol
    checkForCarboplatinSearch(protocol);
    
    console.log('Protocol selected successfully'); // Debug log
}

function clearBrowseSection() {
    document.getElementById('cancerType').value = '';
    document.getElementById('cancerSubtype').value = '';
    document.getElementById('protocol').value = '';
    document.getElementById('subtypeGroup').style.display = 'none';
    document.getElementById('cancerSubtype').disabled = true;
    document.getElementById('protocol').disabled = true;
}

function clearSearchSection() {
    document.getElementById('protocolSearch').value = '';
    document.getElementById('searchSuggestions').style.display = 'none';
    document.getElementById('selectedProtocolInfo').style.display = 'none';
    selectedSearchProtocol = null;
}

function checkForCarboplatinSearch(protocol) {
    let protocolData;
    
    if ((protocol.cancerType === 'breast' || protocol.cancerType === 'lung' || protocol.cancerType === 'lymphoma') && protocol.subtype) {
        protocolData = protocolDatabase[protocol.cancerType][protocol.subtype][protocol.key];
    } else {
        protocolData = protocolDatabase[protocol.cancerType][protocol.key];
    }
    
    if (protocolData) {
        const hasCarboplatin = protocolData.drugs.some(drug => drug.name.toLowerCase().includes('carboplatin'));
        const aucGroup = document.getElementById('aucGroup');
        const aucSelect = document.getElementById('auc');
        
        if (hasCarboplatin) {
            aucGroup.style.display = 'block';
            aucSelect.required = true;
        } else {
            aucGroup.style.display = 'none';
            aucSelect.required = false;
            aucSelect.value = '';
        }
    }
}

// Display results
function displayResults(results, patientData) {
    const resultsContent = document.getElementById('resultsContent');
    
    resultsContent.innerHTML = `
        <div class="result-item">
            <strong>Patient:</strong> ${patientData.age} year old ${patientData.sex}, ${patientData.weight} kg, ${patientData.height} cm
        </div>
        <div class="result-item">
            <strong>BSA (Mosteller):</strong> ${results.bsa} m²
        </div>
        <div class="result-item">
            <strong>Creatinine Clearance:</strong> ${results.crCl} mL/min
        </div>
        <div class="result-item">
            <strong>Protocol:</strong> ${results.protocolName}
        </div>
        <div class="result-item">
            <strong>Schedule:</strong> ${results.drugs[0].schedule.includes('q3weeks') ? 'Every 3 weeks' : results.drugs[0].schedule.includes('q2weeks') ? 'Every 2 weeks' : 'Per protocol'}
        </div>
        ${results.hasCarboplatin && results.selectedAuc ? `
        <div class="result-item">
            <strong>Chosen AUC value:</strong> AUC ${results.selectedAuc}
        </div>
        ` : ''}
        <div style="margin-top: 20px;">
            <h3 style="color: #2c3e50; margin-bottom: 15px;">Drug Calculations:</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                    <tr style="background-color: #f8f9fa; border-bottom: 2px solid #dee2e6;">
                        <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Drug Name</th>
                        <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Standard Dose</th>
                        <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Calculated Dose</th>
                    </tr>
                </thead>
                <tbody>
                    ${results.drugs.map(drug => `
                        <tr style="border-bottom: 1px solid #dee2e6;">
                            <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: 600;">${drug.name}${drug.days ? ` (${drug.days})` : ''}</td>
                            <td style="padding: 12px; border: 1px solid #dee2e6;">
                                ${drug.hasLoadingDose ? 
                                    `<div style="font-size: 13px;">
                                        <div style="color: #007bff;">🔄 Loading: ${drug.originalDose.split(' → ')[0]} ${drug.originalUnit}</div>
                                        <div style="color: #28a745;">📅 Maintenance: ${drug.originalDose.split(' → ')[1]} ${drug.originalUnit}</div>
                                    </div>` 
                                    : `${drug.originalDose}${drug.originalUnit === 'AUC' && drug.originalDose.toString().includes('AUC') ? '' : ' ' + drug.originalUnit}`}
                            </td>
                            <td style="padding: 12px; border: 1px solid #dee2e6; background-color: #e8f5e8; font-weight: 600;">
                                ${drug.hasLoadingDose ? 
                                    `<div style="font-size: 13px;">
                                        <div style="color: #007bff;">🔄 ${drug.calculatedDose.split(' → ')[0]} ${drug.doseUnit}</div>
                                        <div style="color: #28a745;">📅 ${drug.calculatedDose.split(' → ')[1]} ${drug.doseUnit}</div>
                                    </div>` 
                                    : `${drug.calculatedDose} ${drug.doseUnit}`}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        <div style="margin-top: 20px; padding: 15px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 5px;">
            <strong>⚠️ Important:</strong> Please verify all calculations and check for contraindications before administration. This tool is for reference only.
        </div>
    `;
    
    // Show results page
    showPage(3);
}

// Event listeners
document.getElementById('cancerType').addEventListener('change', function() {
    clearSearchSection(); // Clear search when using browse
    populateSubtypes(this.value);
    checkForCarboplatin('', this.value, '');
});

document.getElementById('cancerSubtype').addEventListener('change', function() {
    const cancerType = document.getElementById('cancerType').value;
    populateProtocols(cancerType, this.value);
    checkForCarboplatin('', cancerType, this.value);
});

document.getElementById('protocol').addEventListener('change', function() {
    const cancerType = document.getElementById('cancerType').value;
    const subtype = document.getElementById('cancerSubtype').value;
    checkForCarboplatin(this.value, cancerType, subtype);
});

// Search event listeners
document.getElementById('protocolSearch').addEventListener('input', function() {
    const query = this.value.trim();
    console.log('Search query:', query); // Debug log
    
    if (query.length < 2) {
        document.getElementById('searchSuggestions').style.display = 'none';
        return;
    }
    
    // Make sure index is built
    if (allProtocols.length === 0) {
        buildProtocolIndex();
    }
    
    const suggestions = searchProtocols(query);
    console.log('Search suggestions:', suggestions); // Debug log
    displaySearchSuggestions(suggestions);
    
    // Clear browse section when searching
    if (query.length > 0) {
        clearBrowseSection();
    }
});

document.getElementById('protocolSearch').addEventListener('blur', function() {
    // Hide suggestions after a longer delay to allow clicks
    setTimeout(() => {
        document.getElementById('searchSuggestions').style.display = 'none';
    }, 300);
});

document.getElementById('protocolSearch').addEventListener('focus', function() {
    const query = this.value.trim();
    if (query.length >= 2) {
        const suggestions = searchProtocols(query);
        displaySearchSuggestions(suggestions);
    }
});

// Page navigation event listeners
document.getElementById('nextToPage2').addEventListener('click', function() {
    if (validatePage1()) {
        showPage(2);
    } else {
        alert('Please fill in all patient information fields.');
    }
});

document.getElementById('backToPage1').addEventListener('click', function() {
    showPage(1);
});

document.getElementById('calculateDoses').addEventListener('click', function() {
    if (validatePage2()) {
        let formData;
        
        // Collect form data based on selection method
        if (selectedSearchProtocol) {
            // Using search selection
            formData = {
                height: document.getElementById('height').value,
                weight: document.getElementById('weight').value,
                age: document.getElementById('age').value,
                sex: document.getElementById('sex').value,
                creatinine: document.getElementById('creatinine').value,
                cancerType: selectedSearchProtocol.cancerType,
                cancerSubtype: selectedSearchProtocol.subtype,
                protocol: selectedSearchProtocol.key,
                auc: document.getElementById('auc').value
            };
        } else {
            // Using browse selection
            formData = {
                height: document.getElementById('height').value,
                weight: document.getElementById('weight').value,
                age: document.getElementById('age').value,
                sex: document.getElementById('sex').value,
                creatinine: document.getElementById('creatinine').value,
                cancerType: document.getElementById('cancerType').value,
                cancerSubtype: document.getElementById('cancerSubtype').value,
                protocol: document.getElementById('protocol').value,
                auc: document.getElementById('auc').value
            };
        }
        
        try {
            const results = calculateDoses(formData);
            displayResults(results, formData);
        } catch (error) {
            alert('Error calculating doses. Please check your inputs and try again.');
            console.error('Calculation error:', error);
        }
    } else {
        alert('Please complete all required selections.');
    }
});

document.getElementById('backToPage2').addEventListener('click', function() {
    showPage(2);
});

document.getElementById('startOver').addEventListener('click', function() {
    // Reset form
    document.getElementById('height').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('age').value = '';
    document.getElementById('sex').value = '';
    document.getElementById('creatinine').value = '';
    document.getElementById('cancerType').value = '';
    document.getElementById('cancerSubtype').value = '';
    document.getElementById('protocol').value = '';
    document.getElementById('auc').value = '';
    
    // Reset search
    clearSearchSection();
    
    // Reset UI state
    document.getElementById('subtypeGroup').style.display = 'none';
    document.getElementById('aucGroup').style.display = 'none';
    document.getElementById('protocol').disabled = true;
    document.getElementById('cancerSubtype').disabled = true;
    
    // Go back to first page
    showPage(1);
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('Chemo Protocol Calculator loaded successfully');
    buildProtocolIndex(); // Build search index
    showPage(1);
});