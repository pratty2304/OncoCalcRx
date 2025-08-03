// Chemotherapy Protocol Calculator
// BSA calculation using Mosteller's formula: BSA = sqrt((height × weight) / 3600)

const protocolDatabase = {
    breast: {
        'hormone_positive': {
            // Neoadjuvant/Adjuvant Therapy
            'AC-T': {
                name: 'Doxorubicin + Cyclophosphamide → Paclitaxel (AC-T) (Neoadjuvant/Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles (after 4 cycles AC)' }
                ]
            },
            'EC-T': {
                name: 'Epirubicin + Cyclophosphamide → Paclitaxel (EC-T) (Neoadjuvant/Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Epirubicin', dose: 90, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles (after 4 cycles EC)' }
                ]
            },
            'TAC': {
                name: 'Docetaxel + Doxorubicin + Cyclophosphamide (TAC) (BCIRG-001) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'TC': {
                name: 'Docetaxel + Cyclophosphamide (TC) (USOR-06-090/TAILORx) (Neoadjuvant/Adjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Dose-Dense-AC': {
                name: 'Dose Dense AC (ddAC) (CALGB-9741) (Neoadjuvant/Adjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 14 days' }
                ]
            },
            'Dose-Dense-Paclitaxel': {
                name: 'Dose Dense Paclitaxel (Neoadjuvant/Adjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 14 days' }
                ]
            },
            'FEC-T': {
                name: '5-Fluorouracil + Epirubicin + Cyclophosphamide → Docetaxel (FEC-T) (Neoadjuvant/Adjuvant)',
                cycles: 9,
                drugs: [
                    { name: '5-Fluorouracil', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days x 3 cycles' },
                    { name: 'Epirubicin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days x 3 cycles' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days x 3 cycles' },
                    { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days x 3 cycles (after 3 cycles 5-Fluorouracil + Epirubicin + Cyclophosphamide)' }
                ]
            },
            'CAF': {
                name: 'Cyclophosphamide + Doxorubicin + 5-Fluorouracil (CAF) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: '5-Fluorouracil', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'CMF': {
                name: 'Cyclophosphamide + Methotrexate + 5-Fluorouracil (CMF) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Methotrexate', dose: 40, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: '5-Fluorouracil', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Epirubicin-CMF': {
                name: 'Epirubicin + CMF (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Epirubicin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Methotrexate', dose: 40, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: '5-Fluorouracil', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Olaparib-Adjuvant': {
                name: 'Olaparib (PARP inhibitor) (OlympiA) (Adjuvant - germline BRCA1/2 mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Olaparib', dose: 300, unit: 'mg', schedule: 'PO twice daily' }
                ]
            },
            'Abemaciclib-Tamoxifen': {
                name: 'Abemaciclib + Tamoxifen (monarchE) (Adjuvant)',
                cycles: 24,
                drugs: [
                    { name: 'Abemaciclib', dose: 150, unit: 'mg', schedule: 'PO twice daily' },
                    { name: 'Tamoxifen', dose: 20, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Ribociclib-AI-Adjuvant': {
                name: 'Ribociclib + Anastrozole (NATALEE) (Adjuvant - high-risk early breast cancer)',
                cycles: 36,
                drugs: [
                    { name: 'Ribociclib', dose: 400, unit: 'mg', schedule: 'PO once daily, D1-21, every 28 days x 3 years' },
                    { name: 'Anastrozole', dose: 1, unit: 'mg', schedule: 'PO once daily x 3 years' }
                ]
            },
            'Ribociclib-Letrozole-Adjuvant': {
                name: 'Ribociclib + Letrozole (NATALEE) (Adjuvant - high-risk early breast cancer)',
                cycles: 36,
                drugs: [
                    { name: 'Ribociclib', dose: 400, unit: 'mg', schedule: 'PO once daily, D1-21, every 28 days x 3 years' },
                    { name: 'Letrozole', dose: 2.5, unit: 'mg', schedule: 'PO once daily x 3 years' }
                ]
            },
            'Paclitaxel-Weekly-Adjuvant': {
                name: 'Paclitaxel weekly (Adjuvant)', 
                cycles: 12,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, every 7 days' }
                ]
            },
            // Hormone Therapy (Adjuvant/Metastatic)
            'Tamoxifen': {
                name: 'Tamoxifen (Adjuvant/Metastatic)',
                cycles: 60,
                drugs: [
                    { name: 'Tamoxifen', dose: 20, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Anastrozole': {
                name: 'Anastrozole (Adjuvant/Metastatic)',
                cycles: 60,
                drugs: [
                    { name: 'Anastrozole', dose: 1, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Letrozole': {
                name: 'Letrozole (Adjuvant/Metastatic)',
                cycles: 60,
                drugs: [
                    { name: 'Letrozole', dose: 2.5, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Tamoxifen-Exemestane': {
                name: 'Tamoxifen → Exemestane (Adjuvant)',
                cycles: 60,
                drugs: [
                    { name: 'Tamoxifen', dose: 20, unit: 'mg', schedule: 'PO once daily for 2-3 years' },
                    { name: 'Exemestane', dose: 25, unit: 'mg', schedule: 'PO once daily for remaining 5 years' }
                ]
            },
            'Tamoxifen-Goserelin': {
                name: 'Tamoxifen + Goserelin (Adjuvant/Metastatic - Premenopausal)',
                cycles: 60,
                drugs: [
                    { name: 'Tamoxifen', dose: 20, unit: 'mg', schedule: 'PO once daily' },
                    { name: 'Goserelin', dose: 3.6, unit: 'mg', schedule: 'SC D1, every 28 days' }
                ]
            },
            'Anastrozole-Goserelin': {
                name: 'Anastrozole + Goserelin (Adjuvant/Metastatic - Premenopausal)',
                cycles: 60,
                drugs: [
                    { name: 'Anastrozole', dose: 1, unit: 'mg', schedule: 'PO once daily' },
                    { name: 'Goserelin', dose: 3.6, unit: 'mg', schedule: 'SC D1, every 28 days' }
                ]
            },
            // Metastatic - 1L Therapy
            'Palbociclib-Letrozole': {
                name: 'Palbociclib + Letrozole (PALOMA-1/2) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Palbociclib', dose: 125, unit: 'mg', schedule: 'PO once daily D1-21, every 28 days' },
                    { name: 'Letrozole', dose: 2.5, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Ribociclib-Letrozole': {
                name: 'Ribociclib + Letrozole (MONALEESA-2) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Ribociclib', dose: 600, unit: 'mg', schedule: 'PO once daily D1-21, every 28 days' },
                    { name: 'Letrozole', dose: 2.5, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Abemaciclib-Letrozole': {
                name: 'Abemaciclib + Letrozole (MONARCH-3) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Abemaciclib', dose: 150, unit: 'mg', schedule: 'PO twice daily' },
                    { name: 'Letrozole', dose: 2.5, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            // Metastatic+ Therapy
            'Palbociclib-Fulvestrant': {
                name: 'Palbociclib + Fulvestrant (PALOMA-3) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Palbociclib', dose: 125, unit: 'mg', schedule: 'PO once daily D1-21, every 28 days' },
                    { name: 'Fulvestrant', dose: 500, unit: 'mg', schedule: 'IM D1, every 28 days' }
                ]
            },
            'Ribociclib-Fulvestrant': {
                name: 'Ribociclib + Fulvestrant (MONALEESA-3) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Ribociclib', dose: 600, unit: 'mg', schedule: 'PO once daily D1-21, every 28 days' },
                    { name: 'Fulvestrant', dose: 500, unit: 'mg', schedule: 'IM D1, every 28 days' }
                ]
            },
            'Abemaciclib-Fulvestrant': {
                name: 'Abemaciclib + Fulvestrant (MONARCH-2) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Abemaciclib', dose: 150, unit: 'mg', schedule: 'PO twice daily' },
                    { name: 'Fulvestrant', dose: 500, unit: 'mg', schedule: 'IM D1, every 28 days' }
                ]
            },
            'Everolimus-Exemestane': {
                name: 'Everolimus + Exemestane (BOLERO-2) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'PO once daily' },
                    { name: 'Exemestane', dose: 25, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Alpelisib-Fulvestrant': {
                name: 'Alpelisib + Fulvestrant (SOLAR-1) (Metastatic - PIK3CA mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Alpelisib', dose: 300, unit: 'mg', schedule: 'PO once daily' },
                    { name: 'Fulvestrant', dose: 500, unit: 'mg', schedule: 'IM D1, every 28 days' }
                ]
            },
            'Elacestrant': {
                name: 'Elacestrant (EMERALD) (Metastatic - ESR1 mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Elacestrant', dose: 345, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Inavolisib-Palbociclib-Fulvestrant': {
                name: 'Inavolisib + Palbociclib + Fulvestrant (INAVO120) (Metastatic - PIK3CA mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Inavolisib', dose: 9, unit: 'mg', schedule: 'PO once daily' },
                    { name: 'Palbociclib', dose: 125, unit: 'mg', schedule: 'PO once daily D1-21, every 28 days' },
                    { name: 'Fulvestrant', dose: 500, unit: 'mg', schedule: 'IM D1, every 28 days' }
                ]
            },
            'Capivasertib-Fulvestrant': {
                name: 'Capivasertib + Fulvestrant (CAPItello-291) (AKT1/PIK3CA/PTEN alteration)',
                cycles: 12,
                drugs: [
                    { name: 'Capivasertib', dose: 400, unit: 'mg', schedule: 'PO twice daily D1-4, then 3 days off, every 7 days' },
                    { name: 'Fulvestrant', dose: 500, unit: 'mg', schedule: 'IM D1, every 28 days' }
                ]
            },
            'Camizestrant-Palbociclib': {
                name: 'Camizestrant + Palbociclib (Metastatic - ESR1 mutation detected during 1L treatment)',
                cycles: 12,
                drugs: [
                    { name: 'Camizestrant', dose: 75, unit: 'mg', schedule: 'PO once daily' },
                    { name: 'Palbociclib', dose: 125, unit: 'mg', schedule: 'PO once daily, D1-21, every 28 days' }
                ]
            },
            'Camizestrant-Ribociclib': {
                name: 'Camizestrant + Ribociclib (Metastatic - ESR1 mutation detected during 1L treatment)',
                cycles: 12,
                drugs: [
                    { name: 'Camizestrant', dose: 75, unit: 'mg', schedule: 'PO once daily' },
                    { name: 'Ribociclib', dose: 600, unit: 'mg', schedule: 'PO once daily, D1-21, every 28 days' }
                ]
            },
            'Camizestrant-Abemaciclib': {
                name: 'Camizestrant + Abemaciclib (Metastatic - ESR1 mutation detected during 1L treatment)',
                cycles: 12,
                drugs: [
                    { name: 'Camizestrant', dose: 75, unit: 'mg', schedule: 'PO once daily' },
                    { name: 'Abemaciclib', dose: 150, unit: 'mg', schedule: 'PO twice daily' }
                ]
            },
            // Chemotherapy for Metastatic Disease
            'Paclitaxel-Carboplatin-3weekly': {
                name: 'Paclitaxel + Carboplatin (PC) (3-weekly) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin-3weekly': {
                name: 'Nab-paclitaxel + Carboplatin (3-weekly) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 260, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin-weekly': {
                name: 'Nab-paclitaxel + Carboplatin (weekly) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 7 days' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, every 7 days' }
                ]
            },
            'Gemcitabine-Carboplatin': {
                name: 'Gemcitabine + Carboplatin (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Paclitaxel-Carboplatin-weekly': {
                name: 'Paclitaxel + Carboplatin (PC) (weekly) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, every 7 days' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, every 7 days' }
                ]
            },
            'Capecitabine-Docetaxel': {
                name: 'Capecitabine + Docetaxel (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily D1-14, every 21 days' },
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Capecitabine-Paclitaxel': {
                name: 'Capecitabine + Paclitaxel (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-14, every 21 days' },
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Single-Paclitaxel-3weekly': {
                name: 'Paclitaxel 3-weekly monotherapy (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Single-Paclitaxel-weekly': {
                name: 'Paclitaxel weekly monotherapy (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, every 7 days' }
                ]
            },
            'Docetaxel': {
                name: 'Docetaxel (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Single-Capecitabine': {
                name: 'Capecitabine (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily D1-14, every 21 days' }
                ]
            }
        },
        'triple_negative': {
            // Neoadjuvant Therapy
            'Paclitaxel-Carboplatin-Pembrolizumab': {
                name: 'Paclitaxel + Carboplatin + Pembrolizumab (Neoadjuvant - KEYNOTE-522)',
                cycles: 12,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, every 7 days' },
                    { name: 'Carboplatin', dose: 'AUC 1.5', unit: 'AUC', schedule: 'D1, every 7 days' },
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'AC-Pembrolizumab': {
                name: 'Adriamycin + Cyclophosphamide + Pembrolizumab (Neoadjuvant - KEYNOTE-522)',
                cycles: 4,
                drugs: [
                    { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Pembrolizumab-Maintenance': {
                name: 'Pembrolizumab Maintenance (Adjuvant - KEYNOTE-522)',
                cycles: 9,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            // Neoadjuvant/Adjuvant Therapy
            'AC-T': {
                name: 'Adriamycin + Cyclophosphamide → Paclitaxel (AC-T) (Neoadjuvant/Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Paclitaxel (Paclitaxel)', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles (after 4 cycles AC)' }
                ]
            },
            'TAC': {
                name: 'Docetaxel + Adriamycin + Cyclophosphamide (TAC) (BCIRG-001) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Dose-Dense-AC': {
                name: 'Dose Dense AC (ddAC) (CALGB-9741) (Neoadjuvant/Adjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 14 days' }
                ]
            },
            'Dose-Dense-Paclitaxel': {
                name: 'Dose Dense Paclitaxel (Neoadjuvant/Adjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 14 days' }
                ]
            },
            'TC': {
                name: 'Docetaxel + Cyclophosphamide (TC) (Neoadjuvant/Adjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'EC-T': {
                name: 'Epirubicin + Cyclophosphamide → Docetaxel (EC-T) (Neoadjuvant/Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Epirubicin', dose: 90, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles (after 4 cycles EC)' }
                ]
            },
            'FEC-T': {
                name: '5-Fluorouracil + Epirubicin + Cyclophosphamide → Docetaxel (FEC-T) (Neoadjuvant/Adjuvant)',
                cycles: 9,
                drugs: [
                    { name: '5-Fluorouracil', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days x 3 cycles' },
                    { name: 'Epirubicin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days x 3 cycles' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days x 3 cycles' },
                    { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days x 3 cycles (after 3 cycles 5-Fluorouracil + Epirubicin + Cyclophosphamide)' }
                ]
            },
            'CAF': {
                name: 'Cyclophosphamide + Doxorubicin + 5-Fluorouracil (CAF) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: '5-Fluorouracil', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'CMF': {
                name: 'Cyclophosphamide + Methotrexate + 5-Fluorouracil (CMF) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Methotrexate', dose: 40, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: '5-Fluorouracil', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Paclitaxel-Weekly-Adjuvant': {
                name: 'Paclitaxel weekly (Adjuvant)',
                cycles: 12,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, every 7 days' }
                ]
            },
            // PARP Inhibitors (Germline BRCA1/2 mutation)
            'Olaparib-BRCA': {
                name: 'Olaparib (OlympiAD) (Metastatic - germline BRCA1/2 mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Olaparib', dose: 300, unit: 'mg', schedule: 'PO twice daily' }
                ]
            },
            'Talazoparib-BRCA': {
                name: 'Talazoparib (EMBRACA) (Metastatic - germline BRCA1/2 mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Talazoparib', dose: 1, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            // Metastatic - 1L Therapy
            'Sacituzumab-Govitecan-Pembrolizumab': {
                name: 'Sacituzumab Govitecan + Pembrolizumab (KEYNOTE-B42) (Metastatic - PD-L1+)',
                cycles: 6,
                drugs: [
                    { name: 'Sacituzumab Govitecan', dose: 10, unit: 'mg/kg', schedule: 'D1, D8, every 21 days' },
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Paclitaxel-Carboplatin-3weekly': {
                name: 'Paclitaxel + Carboplatin (PC) (3-weekly) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Paclitaxel-Carboplatin-weekly': {
                name: 'Paclitaxel + Carboplatin (PC) (weekly) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, every 7 days' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, every 7 days' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin-3weekly': {
                name: 'Nab-paclitaxel + Carboplatin (3-weekly) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 260, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin-weekly': {
                name: 'Nab-paclitaxel + Carboplatin (weekly) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 7 days' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, every 7 days' }
                ]
            },
            'Gemcitabine-Carboplatin': {
                name: 'Gemcitabine + Carboplatin (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Carboplatin-Docetaxel': {
                name: 'Carboplatin + Docetaxel (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Paclitaxel-Bevacizumab': {
                name: 'Paclitaxel + Bevacizumab (E2100) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Paclitaxel', dose: 90, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                    { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'D1, D15, every 28 days' }
                ]
            },
            // Metastatic+ Therapy
            'Sacituzumab-Govitecan': {
                name: 'Sacituzumab Govitecan (ASCENT) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Sacituzumab Govitecan', dose: 10, unit: 'mg/kg', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Capecitabine-Docetaxel': {
                name: 'Capecitabine + Docetaxel (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily D1-14, every 21 days' },
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Capecitabine-Paclitaxel': {
                name: 'Capecitabine + Paclitaxel (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-14, every 21 days' },
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Capecitabine-Navelbine': {
                name: 'Capecitabine + Vinorelbine (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-14, every 21 days' },
                    { name: 'Vinorelbine (Navelbine)', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Capecitabine-Ixabepilone': {
                name: 'Capecitabine + Ixabepilone (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-14, every 21 days' },
                    { name: 'Ixabepilone', dose: 40, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Docetaxel-Doxorubicin': {
                name: 'Docetaxel + Doxorubicin (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Doxorubicin-Liposome-Docetaxel': {
                name: 'Doxorubicin liposome + Docetaxel (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Doxorubicin liposome', dose: 30, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Docetaxel', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Doxorubicin-Paclitaxel': {
                name: 'Doxorubicin + Paclitaxel (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Gemcitabine-Paclitaxel': {
                name: 'Gemcitabine + Paclitaxel (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Gemcitabine-Capecitabine': {
                name: 'Gemcitabine + Capecitabine (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Capecitabine', dose: 1500, unit: 'mg', schedule: 'PO twice daily D1-14, every 21 days' }
                ]
            },
            // Single Agent Therapies
            'Single-Paclitaxel-3weekly': {
                name: 'Paclitaxel monotherapy (3-weekly) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Single-Paclitaxel-weekly': {
                name: 'Paclitaxel monotherapy (weekly) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, every 7 days' }
                ]
            },
            'Single-Nab-Paclitaxel-3weekly': {
                name: 'Nab-paclitaxel monotherapy (3-weekly) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 260, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Single-Nab-Paclitaxel-weekly': {
                name: 'Nab-paclitaxel monotherapy (weekly) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 7 days' }
                ]
            },
            'Docetaxel': {
                name: 'Docetaxel monotherapy (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Single-Capecitabine': {
                name: 'Capecitabine monotherapy (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily D1-14, every 21 days' }
                ]
            },
            'Single-Vinorelbine': {
                name: 'Vinorelbine monotherapy (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Vinorelbine', dose: 30, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Eribulin': {
                name: 'Eribulin monotherapy (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Eribulin', dose: 1.4, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            }
        },
        'her2_positive': {
            // Neoadjuvant/Adjuvant Therapy
            'TCHP': {
                name: 'Docetaxel + Carboplatin + Trastuzumab + Pertuzumab (TCHP) (KATHERINE/PHERGain) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days', hasLoadingDose: true },
                    { name: 'Pertuzumab', dose: 840, maintenanceDose: 420, unit: 'mg', schedule: 'D1, 840 mg loading dose, then 420 mg D1, every 21 days', hasLoadingDose: true }
                ]
            },
            'TCH': {
                name: 'Docetaxel + Carboplatin + Trastuzumab (TCH) (BCIRG-006) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days', hasLoadingDose: true }
                ]
            },
            'THP': {
                name: 'Docetaxel + Trastuzumab + Pertuzumab (THP) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days', hasLoadingDose: true },
                    { name: 'Pertuzumab', dose: 840, maintenanceDose: 420, unit: 'mg', schedule: 'D1, 840 mg loading dose, then 420 mg D1, every 21 days', hasLoadingDose: true }
                ]
            },
            'PCHP': {
                name: 'Paclitaxel + Carboplatin + Trastuzumab + Pertuzumab (Pacli-CHP) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days', hasLoadingDose: true },
                    { name: 'Pertuzumab', dose: 840, maintenanceDose: 420, unit: 'mg', schedule: 'D1, 840 mg loading dose, then 420 mg D1, every 21 days', hasLoadingDose: true }
                ]
            },
            'PCH': {
                name: 'Paclitaxel + Carboplatin + Trastuzumab (Pacli-CH) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days', hasLoadingDose: true }
                ]
            },
            'PHP': {
                name: 'Paclitaxel + Trastuzumab + Pertuzumab (Pacli-HP) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days', hasLoadingDose: true },
                    { name: 'Pertuzumab', dose: 840, maintenanceDose: 420, unit: 'mg', schedule: 'D1, 840 mg loading dose, then 420 mg D1, every 21 days', hasLoadingDose: true }
                ]
            },
            'AC-TH': {
                name: 'AC → Paclitaxel + Trastuzumab (AC-TH) (NSABP-B31/N9831) (Neoadjuvant/Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles (after 4 cycles AC)' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days', hasLoadingDose: true }
                ]
            },
            'Dose-Dense-AC': {
                name: 'Dose Dense AC (ddAC) (CALGB-9741) (Neoadjuvant/Adjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 14 days' }
                ]
            },
            'Dose-Dense-Paclitaxel-Trastuzumab': {
                name: 'Dose Dense Paclitaxel + Trastuzumab (CALGB-9741) (Neoadjuvant/Adjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 14 days', hasLoadingDose: true }
                ]
            },
            'TC': {
                name: 'Docetaxel + Cyclophosphamide (TC) (Neoadjuvant/Adjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'FEC': {
                name: '5-Fluorouracil + Epirubicin + Cyclophosphamide (FEC) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: '5-Fluorouracil', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Epirubicin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'CAF': {
                name: 'Cyclophosphamide + Doxorubicin + 5-Fluorouracil (CAF) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: '5-Fluorouracil', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'CMF': {
                name: 'Cyclophosphamide + Methotrexate + 5-Fluorouracil (CMF) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Methotrexate', dose: 40, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: '5-Fluorouracil', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Trastuzumab-Adjuvant': {
                name: 'Trastuzumab (Adjuvant)',
                cycles: 17,
                drugs: [
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days for 1 year', hasLoadingDose: true }
                ]
            },
            'Paclitaxel-Weekly-Adjuvant': {
                name: 'Paclitaxel weekly (Adjuvant)',
                cycles: 12,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, every 7 days' }
                ]
            },
            'EC-T': {
                name: 'Epirubicin + Cyclophosphamide → Docetaxel (EC-T) (Neoadjuvant/Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Epirubicin', dose: 90, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles (after 4 cycles EC)' }
                ]
            },
            
            // Metastatic - 1L
            'TDM1': {
                name: 'Trastuzumab emtansine (EMILIA) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab emtansine', dose: 3.6, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'TDxd-DESTINY-Breast03': {
                name: 'Trastuzumab deruxtecan (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'TDxd-DESTINY-Breast02': {
                name: 'Trastuzumab deruxtecan (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'Trastuzumab-Paclitaxel': {
                name: 'Trastuzumab + Paclitaxel (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days', hasLoadingDose: true },
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Trastuzumab-Docetaxel': {
                name: 'Trastuzumab + Docetaxel (CLEOPATRA/M77001) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days', hasLoadingDose: true },
                    { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Paclitaxel-Carboplatin-3weekly': {
                name: 'Paclitaxel + Carboplatin (PC) (3-weekly) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Paclitaxel-Carboplatin-weekly': {
                name: 'Paclitaxel + Carboplatin (PC) (weekly) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, D8, D15, every 28 days' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin-3weekly': {
                name: 'Nab-paclitaxel + Carboplatin (3 weekly) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 260, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin-weekly': {
                name: 'Nab-paclitaxel + Carboplatin (weekly) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, D8, D15, every 28 days' }
                ]
            },
            'Gemcitabine-Carboplatin': {
                name: 'Gemcitabine + Carboplatin (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Gemcitabine-Carboplatin-Trastuzumab': {
                name: 'Gemcitabine + Carboplatin + Trastuzumab (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, D8, every 21 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days', hasLoadingDose: true }
                ]
            },
            'Trastuzumab-Lapatinib': {
                name: 'Trastuzumab + Lapatinib (EGF104900) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days', hasLoadingDose: true },
                    { name: 'Lapatinib', dose: 1000, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Capecitabine-Lapatinib': {
                name: 'Capecitabine + Lapatinib (EGF100151) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-14, every 21 days' },
                    { name: 'Lapatinib', dose: 1250, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Trastuzumab-Navelbine': {
                name: 'Trastuzumab + Navelbine (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab', dose: 4, maintenanceDose: 2, unit: 'mg/kg', schedule: 'D1, 4 mg/kg loading dose, then 2 mg/kg every 7 days', hasLoadingDose: true },
                    { name: 'Vinorelbine (Navelbine)', dose: 25, unit: 'mg/m²', schedule: 'D1, every 7 days' }
                ]
            },
            'Trastuzumab-Capecitabine': {
                name: 'Trastuzumab + Capecitabine (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days', hasLoadingDose: true },
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily D1-14, every 21 days' }
                ]
            },
            'CHP': {
                name: 'Paclitaxel + Cyclophosphamide + Trastuzumab (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days', hasLoadingDose: true }
                ]
            },
            'CH': {
                name: 'Paclitaxel + Trastuzumab (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days', hasLoadingDose: true }
                ]
            },
            
            // Metastatic
            'Tucatinib-Trastuzumab-Capecitabine': {
                name: 'Tucatinib + Trastuzumab + Capecitabine (HER2CLIMB) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Tucatinib', dose: 300, unit: 'mg', schedule: 'PO twice daily' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg D1, every 21 days', hasLoadingDose: true },
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-14, every 21 days' }
                ]
            },
            'Capecitabine-Neratinib': {
                name: 'Capecitabine + Neratinib (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 750, unit: 'mg/m²', schedule: 'PO twice daily D1-14, every 21 days' },
                    { name: 'Neratinib', dose: 240, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Margetuximab-Capecitabine': {
                name: 'Margetuximab + Capecitabine (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Margetuximab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-14, every 21 days' }
                ]
            },
            'Margetuximab-Eribulin': {
                name: 'Margetuximab + Eribulin (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Margetuximab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Eribulin', dose: 1.4, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Margetuximab-Vinorelbine': {
                name: 'Margetuximab + Vinorelbine (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Margetuximab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Vinorelbine', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Margetuximab-Gemcitabine': {
                name: 'Margetuximab + Gemcitabine (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Margetuximab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Single-Neratinib': {
                name: 'Neratinib (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Neratinib', dose: 240, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Single-Capecitabine': {
                name: 'Capecitabine monotherapy (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily D1-14, every 21 days' }
                ]
            },
            'Single-Docetaxel': {
                name: 'Docetaxel monotherapy (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            }
        },
        'her2_low_ultralow': {
            // HER2-Low/Ultralow: IHC 1+ or IHC 2+/ISH- or IHC 0 with membrane staining
            
            // Post-endocrine therapy (DESTINY-Breast06)
            'TDxd-DESTINY-Breast06': {
                name: 'Trastuzumab deruxtecan (DESTINY-Breast06) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            
            // Post-chemotherapy (DESTINY-Breast04)  
            'TDxd-DESTINY-Breast04': {
                name: 'Trastuzumab deruxtecan (DESTINY-Breast04) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            }
        }
    },
    gastric: {
        // PERIOPERATIVE THERAPY
        'FLOT4-Perioperative': {
            name: 'Docetaxel + Oxaliplatin + Leucovorin + 5-Fluorouracil (FLOT4) (Perioperative)',
            cycles: 8,
            drugs: [
                { name: 'Docetaxel', dose: 50, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 2600, unit: 'mg/m²', schedule: 'CI over 24 hours D1, every 14 days' }
            ]
        },
        'Durvalumab-FLOT-MATTERHORN': {
            name: 'Durvalumab (PD-L1 inhibitor) + FLOT (MATTERHORN) (Perioperative)',
            cycles: 8,
            drugs: [
                { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 14 days' },
                { name: 'Docetaxel', dose: 50, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 2600, unit: 'mg/m²', schedule: 'CI over 24 hours D1, every 14 days' }
            ]
        },

        // NEOADJUVANT THERAPY
        'ECF-Neoadjuvant': {
            name: 'Epirubicin + Cisplatin + 5-Fluorouracil (ECF) (Neoadjuvant)',
            cycles: 3,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 200, unit: 'mg/m²', schedule: 'CI D1-D21, every 21 days' }
            ]
        },
        'DCF-Neoadjuvant': {
            name: 'Docetaxel + Cisplatin + 5-Fluorouracil (DCF) (Neoadjuvant)',
            cycles: 3,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 750, unit: 'mg/m²', schedule: 'CI over 5 days D1-D5, every 21 days' }
            ]
        },

        // NEOADJUVANT/ADJUVANT THERAPY
        'mFOLFOX6': {
            name: 'Oxaliplatin + Leucovorin + 5-Fluorouracil (mFOLFOX6) (Neoadjuvant/Adjuvant)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: 'CI over 46 hours D1-D2, every 14 days' }
            ]
        },
        'CapeOX': {
            name: 'Capecitabine + Oxaliplatin (CAPOX/XELOX) (Neoadjuvant/Adjuvant)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
            ]
        },

        // ADJUVANT THERAPY
        'Capecitabine-Adjuvant': {
            name: 'Capecitabine monotherapy (Adjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
            ]
        },
        '5FU-LV-Adjuvant': {
            name: '5-Fluorouracil + Leucovorin (Adjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Leucovorin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5, every 28 days' },
                { name: '5-Fluorouracil', dose: 425, unit: 'mg/m²', schedule: 'D1-D5, every 28 days' }
            ]
        },

        // METASTATIC THERAPY - FIRST LINE
        'Pembrolizumab-5FU-Cisplatin-1L': {
            name: 'Pembrolizumab (PD-1 inhibitor) + 5-Fluorouracil + Cisplatin (KEYNOTE-590) (PD-L1 CPS≥1) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 800, unit: 'mg/m²', schedule: 'CI over 5 days D1-D5, every 21 days' }
            ]
        },
        'Nivolumab-Ipilimumab-MSI-1L': {
            name: 'Nivolumab (PD-1 inhibitor) + Ipilimumab (CTLA-4 inhibitor) (CheckMate-032) (MSI-H/dMMR) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 14 days x 4, then 480mg flat dose every 28 days' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 6 weeks x 4 doses' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (KEYNOTE-059) (dMMR/MSI-H/PD-L1 CPS ≥1) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400mg every 6 weeks' }
            ]
        },
        '5FU-Oxaliplatin-Zolbetuximab': {
            name: '5-Fluorouracil + Oxaliplatin + Zolbetuximab (SPOTLIGHT) (CLDN18.2+) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Zolbetuximab', dose: 800, unit: 'mg/m²', schedule: 'D1, cycle 1, then 600 mg/m² every 21 days' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 1200, unit: 'mg/m²', schedule: 'CI over 46 hours D1-D2, every 14 days' }
            ]
        },
        // HER2+ TARGETED THERAPY - FIRST LINE
        'Trastuzumab-Pertuzumab-HER2-1L': {
            name: 'Trastuzumab + Pertuzumab (CLEOPATRA) (HER2+) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: '8 mg/kg loading dose, then 6 mg/kg D1, every 21 days', hasLoadingDose: true },
                { name: 'Pertuzumab', dose: 840, maintenanceDose: 420, unit: 'mg', schedule: '840 mg loading dose, then 420 mg D1, every 21 days', hasLoadingDose: true }
            ]
        },
        'XP-Trastuzumab-HER2-1L': {
            name: 'Capecitabine + Cisplatin + Trastuzumab (ToGA) (HER2+) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: '8 mg/kg loading dose, then 6 mg/kg D1, every 21 days', hasLoadingDose: true }
            ]
        },
        '5FU-Oxaliplatin-Trastuzumab': {
            name: '5-Fluorouracil + Oxaliplatin + Trastuzumab (HER2+) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 1200, unit: 'mg/m²', schedule: 'D1-D2, CI over 46 hours, every 14 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg D1, every 21 days', hasLoadingDose: true }
            ]
        },
        '5FU-Oxaliplatin-Trastuzumab-Pembrolizumab': {
            name: '5-FU + Oxaliplatin + Trastuzumab + Pembrolizumab (HER2+ and PD-L1 CPS >1) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 1200, unit: 'mg/m²', schedule: 'D1-D2, CI over 46 hours, every 14 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg D1, every 21 days', hasLoadingDose: true },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        '5FU-Cisplatin-Trastuzumab': {
            name: '5-Fluorouracil + Cisplatin + Trastuzumab (HER2+) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 800, unit: 'mg/m²', schedule: 'D1-D5, CI over 5 days, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg D1, every 21 days', hasLoadingDose: true }
            ]
        },
        '5FU-Cisplatin-Trastuzumab-Pembrolizumab': {
            name: '5-FU + Cisplatin + Trastuzumab + Pembrolizumab (HER2+ and PD-L1 CPS >1) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 800, unit: 'mg/m²', schedule: 'D1-D5, CI over 5 days, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg D1, every 21 days', hasLoadingDose: true },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        // STANDARD CHEMOTHERAPY COMBINATIONS - FIRST LINE
        'ECX-1L': {
            name: 'Epirubicin + Cisplatin + Capecitabine (ECX) (REAL-2) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
            ]
        },
        'EOX-1L': {
            name: 'Epirubicin + Oxaliplatin + Capecitabine (EOX) (REAL-2) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
            ]
        },
        'DCF-1L': {
            name: 'Docetaxel + Cisplatin + 5-Fluorouracil (DCF) (V325) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 750, unit: 'mg/m²', schedule: 'CI over 5 days D1-D5, every 21 days' }
            ]
        },
        'FLO-1L': {
            name: 'Oxaliplatin + Leucovorin + 5-Fluorouracil (FLO) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 2600, unit: 'mg/m²', schedule: 'CI over 24 hours D1, every 14 days' }
            ]
        },
        'mFOLFOX6-Metastatic': {
            name: 'Oxaliplatin + Leucovorin + 5-Fluorouracil (mFOLFOX6) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: 'CI over 46 hours D1-D2, every 14 days' }
            ]
        },
        'CapeOX-Metastatic': {
            name: 'Capecitabine + Oxaliplatin (CAPOX/XELOX) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
            ]
        },
        '5FU-Oxaliplatin-Nivolumab': {
            name: '5-FU + Oxaliplatin + Nivolumab (PD-1 inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 1200, unit: 'mg/m²', schedule: 'D1-D2, CI over 46 hours, every 14 days' },
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days or 480mg every 28 days' }
            ]
        },
        '5FU-Oxaliplatin-Pembrolizumab': {
            name: '5-FU + Oxaliplatin + Pembrolizumab (PD-1 inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 1200, unit: 'mg/m²', schedule: 'D1-D2, CI over 46 hours, every 14 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        '5FU-Cisplatin-Pembrolizumab': {
            name: '5-FU + Cisplatin + Pembrolizumab (PD-1 inhibitor) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 800, unit: 'mg/m²', schedule: 'D1-D5, CI over 5 days, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        '5FU-Cisplatin-Tislelizumab': {
            name: '5-FU + Cisplatin + Tislelizumab (PD-1 inhibitor) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 800, unit: 'mg/m²', schedule: 'D1-D5, CI over 5 days, every 21 days' },
                { name: 'Tislelizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        // CAPECITABINE-BASED COMBINATIONS
        'Capecitabine-Oxaliplatin-Trastuzumab': {
            name: 'Capecitabine + Oxaliplatin + Trastuzumab (HER2+) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg D1, every 21 days', hasLoadingDose: true }
            ]
        },
        'Capecitabine-Oxaliplatin-Trastuzumab-Pembrolizumab': {
            name: 'Capecitabine + Oxaliplatin + Trastuzumab + Pembrolizumab (HER2+ and PD-L1 CPS >1) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg D1, every 21 days', hasLoadingDose: true },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Capecitabine-Cisplatin-Trastuzumab': {
            name: 'Capecitabine + Cisplatin + Trastuzumab (HER2+) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg D1, every 21 days', hasLoadingDose: true }
            ]
        },
        'Capecitabine-Cisplatin-Trastuzumab-Pembrolizumab': {
            name: 'Capecitabine + Cisplatin + Trastuzumab + Pembrolizumab (HER2+ and PD-L1 CPS >1) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg D1, every 21 days', hasLoadingDose: true },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Capecitabine-Oxaliplatin-Nivolumab': {
            name: 'Capecitabine + Oxaliplatin + Nivolumab (PD-1 inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days or 480mg every 28 days' }
            ]
        },
        'Capecitabine-Oxaliplatin-Pembrolizumab': {
            name: 'Capecitabine + Oxaliplatin + Pembrolizumab (PD-1 inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Capecitabine-Oxaliplatin-Tislelizumab': {
            name: 'Capecitabine + Oxaliplatin + Tislelizumab (PD-1 inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                { name: 'Tislelizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Capecitabine-Oxaliplatin-Zolbetuximab': {
            name: 'Capecitabine + Oxaliplatin + Zolbetuximab (CLDN18.2+) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Zolbetuximab', dose: 800, unit: 'mg/m²', schedule: 'D1, cycle 1, then 600 mg/m² every 21 days' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
            ]
        },
        'Capecitabine-Cisplatin-Pembrolizumab': {
            name: 'Capecitabine + Cisplatin + Pembrolizumab (PD-1 inhibitor) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Capecitabine-Cisplatin-Tislelizumab': {
            name: 'Capecitabine + Cisplatin + Tislelizumab (PD-1 inhibitor) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                { name: 'Tislelizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Atezolizumab-Trastuzumab-XELOX': {
            name: 'Atezolizumab (PD-L1 inhibitor) + Trastuzumab + XELOX (HER2+) (Perioperative/Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg D1, every 21 days', hasLoadingDose: true },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
            ]
        },
        'Durvalumab-FLOT-MATTERHORN': {
            name: 'Durvalumab (PD-L1 inhibitor) + FLOT (MATTERHORN) (Perioperative)',
            cycles: 8,
            drugs: [
                { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 14 days (4 cycles preoperative + 4 cycles postoperative)' },
                { name: 'Docetaxel', dose: 50, unit: 'mg/m²', schedule: 'D1, every 14 days (4 cycles preoperative + 4 cycles postoperative)' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days (4 cycles preoperative + 4 cycles postoperative)' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, every 14 days (4 cycles preoperative + 4 cycles postoperative)' },
                { name: '5-Fluorouracil', dose: 2600, unit: 'mg/m²', schedule: 'D1, CI over 24 hours, every 14 days (4 cycles preoperative + 4 cycles postoperative)' }
            ]
        },

        // METASTATIC THERAPY
        // SECOND LINE THERAPY
        'Paclitaxel-Ramucirumab-2L': {
            name: 'Paclitaxel + Ramucirumab (VEGFR2 inhibitor) (RAINBOW) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'D1, D15, every 28 days' }
            ]
        },
        'FOLFIRI-Ramucirumab-2L': {
            name: 'Irinotecan + Leucovorin + 5-Fluorouracil + Ramucirumab (FOLFIRI + Ramucirumab) (RAINBOW) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: 'CI over 46 hours D1-D2, every 14 days' },
                { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'D1, every 14 days' }
            ]
        },
        'Irinotecan-Ramucirumab-2L': {
            name: 'Irinotecan + Ramucirumab (VEGFR2 inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 150, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'D1, every 14 days' }
            ]
        },
        'T-DXd-HER2-2L': {
            name: 'Trastuzumab Deruxtecan (T-DXd) (DESTINY-Gastric01) (HER2+) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab Deruxtecan', dose: 6.4, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'mFOLFIRI-2L': {
            name: 'mFOLFIRI (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: 'D1-D2, CI over 46 hours, every 14 days' }
            ]
        },
        'Docetaxel-2L': {
            name: 'Docetaxel monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Paclitaxel-2L': {
            name: 'Paclitaxel monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, every 7 days' }
            ]
        },
        'Irinotecan-2L': {
            name: 'Irinotecan monotherapy (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Irinotecan', dose: 350, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },

        // METASTATIC - 3L+ THERAPY
        'TAS-102-3L': {
            name: 'Trifluridine/Tipiracil (TAS-102) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'TAS-102', dose: 35, unit: 'mg/m²', schedule: 'PO twice daily D1-D5, D8-D12, every 28 days' }
            ]
        },
        'Ramucirumab-3L': {
            name: 'Ramucirumab monotherapy (VEGFR2 inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'D1, every 14 days' }
            ]
        },
        'Nivolumab-3L': {
            name: 'Nivolumab monotherapy (PD-1 inhibitor) (ATTRACTION-2) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days or 480mg every 28 days' }
            ]
        },
        'Dostarlimab-MSI-3L': {
            name: 'Dostarlimab monotherapy (PD-1 inhibitor) (MSI-H/dMMR) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'D1, every 21 days x 4, then 1000mg every 6 weeks' }
            ]
        },
        'Capecitabine-Docetaxel-3L': {
            name: 'Capecitabine + Docetaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-3L': {
            name: 'Cisplatin monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        '5FU-3L': {
            name: '5-Fluorouracil monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: '5-Fluorouracil', dose: 2600, unit: 'mg/m²', schedule: 'CI over 24 hours D1, every 7 days' }
            ]
        }
    },
    lymphoma: {
        'hodgkins_lymphoma': {
            // Classical Hodgkin Lymphoma - First Line
            'ABVD': {
                name: 'ABVD (Early Stage and Advanced Classical HL)',
                cycles: 6,
                drugs: [
                    { name: 'Doxorubicin', dose: 25, unit: 'mg/m²', schedule: 'D1, D15, every 28 days' },
                    { name: 'Bleomycin', dose: 10, unit: 'units/m²', schedule: 'D1, D15, every 28 days' },
                    { name: 'Vinblastine', dose: 6, unit: 'mg/m²', schedule: 'D1, D15, every 28 days' },
                    { name: 'Dacarbazine', dose: 375, unit: 'mg/m²', schedule: 'D1, D15, every 28 days' }
                ]
            },
            'Nivolumab-AVD': {
                name: 'Nivolumab + AVD (Advanced Classical HL - NCCN Preferred)',
                cycles: 6,
                drugs: [
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days x 12 doses' },
                    { name: 'Doxorubicin', dose: 25, unit: 'mg/m²', schedule: 'D1, D15, every 28 days' },
                    { name: 'Vinblastine', dose: 6, unit: 'mg/m²', schedule: 'D1, D15, every 28 days' },
                    { name: 'Dacarbazine', dose: 375, unit: 'mg/m²', schedule: 'D1, D15, every 28 days' }
                ]
            },
            'BrECADD': {
                name: 'BrECADD (Advanced Classical HL - NCCN Preferred)',
                cycles: 6,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 650, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 25, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Dacarbazine', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1-D4, every 21 days' }
                ]
            },
            'Brentuximab-AVD': {
                name: 'Brentuximab vedotin + AVD (Advanced Classical HL)',
                cycles: 6,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.2, unit: 'mg/kg', schedule: 'D1, every 28 days' },
                    { name: 'Doxorubicin', dose: 25, unit: 'mg/m²', schedule: 'D1, D15, every 28 days' },
                    { name: 'Vinblastine', dose: 6, unit: 'mg/m²', schedule: 'D1, D15, every 28 days' },
                    { name: 'Dacarbazine', dose: 375, unit: 'mg/m²', schedule: 'D1, D15, every 28 days' }
                ]
            },
            // NLPHL (Nodular Lymphocyte Predominant Hodgkin Lymphoma)
            'R-CHOP-NLPHL': {
                name: 'R-CHOP - NLPHL Advanced Stage (First Line)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'Brentuximab-Vedotin': {
                name: 'Brentuximab vedotin (BV)',
                cycles: 8,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'BV-Nivolumab': {
                name: 'Brentuximab vedotin + Nivolumab',
                cycles: 8,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days x 16 doses' }
                ]
            },
            'ICE-Nivolumab': {
                name: 'ICE + Nivolumab (Metastatic)',
                cycles: 3,
                drugs: [
                    { name: 'Ifosfamide', dose: 5000, unit: 'mg/m²', schedule: 'day 2, every 21 days' },
                    { name: 'Mesna (pre-dose)', dose: 1000, unit: 'mg/m²', schedule: 'before Ifosfamide, day 2, every 21 days' },
                    { name: 'Mesna (4h post)', dose: 2000, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, day 2, every 21 days' },
                    { name: 'Mesna (8h post)', dose: 2000, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, day 2, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 2, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days x 6 doses' }
                ]
            },
            'ICE-Pembrolizumab': {
                name: 'ICE + Pembrolizumab (Metastatic)',
                cycles: 3,
                drugs: [
                    { name: 'Ifosfamide', dose: 5000, unit: 'mg/m²', schedule: 'day 2, every 21 days' },
                    { name: 'Mesna (pre-dose)', dose: 1000, unit: 'mg/m²', schedule: 'before Ifosfamide, day 2, every 21 days' },
                    { name: 'Mesna (4h post)', dose: 2000, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, day 2, every 21 days' },
                    { name: 'Mesna (8h post)', dose: 2000, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, day 2, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 2, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'DHAP': {
                name: 'DHAP (Dexamethasone + High-dose Ara-C + Cisplatin)',
                cycles: 3,
                drugs: [
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 1-4, every 21 days' },
                    { name: 'Cytarabine (High-dose Ara-C)', dose: 2000, unit: 'mg/m²', schedule: 'day 2, q12h x 2 doses, every 21 days' },
                    { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'ICE-BV': {
                name: 'ICE + Brentuximab vedotin (Metastatic)',
                cycles: 3,
                drugs: [
                    { name: 'Ifosfamide', dose: 5000, unit: 'mg/m²', schedule: 'day 2, every 21 days' },
                    { name: 'Mesna (pre-dose)', dose: 1000, unit: 'mg/m²', schedule: 'before Ifosfamide, day 2, every 21 days' },
                    { name: 'Mesna (4h post)', dose: 2000, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, day 2, every 21 days' },
                    { name: 'Mesna (8h post)', dose: 2000, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, day 2, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 2, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'D1-D3, every 21 days' },
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'IGEV': {
                name: 'IGEV (Ifosfamide + Gemcitabine + Vinorelbine + Prednisone)',
                cycles: 4,
                drugs: [
                    { name: 'Ifosfamide', dose: 2000, unit: 'mg/m²', days: 'D1-D4', schedule: 'days 1-4, every 21 days' },
                    { name: 'Mesna (pre-dose)', dose: 400, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D4, every 21 days' },
                    { name: 'Mesna (4h post)', dose: 800, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D4, every 21 days' },
                    { name: 'Mesna (8h post)', dose: 800, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D4, every 21 days' },
                    { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', schedule: 'D1, D4, every 21 days' },
                    { name: 'Vinorelbine', dose: 20, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'Bendamustine': {
                name: 'Bendamustine (Single Agent)',
                cycles: 6,
                drugs: [
                    { name: 'Bendamustine', dose: 120, unit: 'mg/m²', days: 'D1-D2', schedule: 'days 1-2, every 28 days' }
                ]
            },
            'Bendamustine-Carboplatin-Etoposide': {
                name: 'Bendamustine + Carboplatin + Etoposide',
                cycles: 4,
                drugs: [
                    { name: 'Bendamustine', dose: 90, unit: 'mg/m²', days: 'D1-D2', schedule: 'days 1-2, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'D1-D3, every 21 days' }
                ]
            },
            'GEMOX': {
                name: 'GEMOX (Gemcitabine + Oxaliplatin)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Oxaliplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 14 days' }
                ]
            },
            'Vorinostat-Pembrolizumab': {
                name: 'Vorinostat + Pembrolizumab (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Vorinostat', dose: 400, unit: 'mg', schedule: 'daily, continuous' },
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Brentuximab-AVD': {
                name: 'Brentuximab vedotin + AVD (Advanced Stage cHL)',
                cycles: 6,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.2, unit: 'mg/kg', schedule: 'D1, every 14 days x 12 doses' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 25, unit: 'mg/m²', schedule: 'days 1, 15, every 28 days' },
                    { name: 'Vinblastine', dose: 6, unit: 'mg/m²', schedule: 'days 1, 15, every 28 days' },
                    { name: 'Dacarbazine', dose: 375, unit: 'mg/m²', schedule: 'days 1, 15, every 28 days' }
                ]
            },
            'MOPP': {
                name: 'MOPP (Mechlorethamine + Oncovin + Procarbazine + Prednisone)',
                cycles: 6,
                drugs: [
                    { name: 'Mechlorethamine', dose: 6, unit: 'mg/m²', schedule: 'days 1, 8, every 28 days' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'days 1, 8, every 28 days (max 2mg)' },
                    { name: 'Procarbazine', dose: 100, unit: 'mg/m²', schedule: 'days 1-14, every 28 days' },
                    { name: 'Prednisone', dose: 40, unit: 'mg/m²', schedule: 'days 1-14, every 28 days' }
                ]
            },
            'MOPP-ABVD': {
                name: 'MOPP/ABVD (Alternating)',
                cycles: 8,
                drugs: [
                    { name: 'Mechlorethamine', dose: 6, unit: 'mg/m²', schedule: 'days 1, 8 (MOPP cycles)' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'days 1, 8 (MOPP cycles), max 2mg' },
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
                    { name: 'Etoposide', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vinblastine', dose: 6, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'EVAP': {
                name: 'EVAP (Etoposide + Vinblastine + Adriamycin + Prednisone)',
                cycles: 6,
                drugs: [
                    { name: 'Etoposide', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vinblastine', dose: 6, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Prednisone', dose: 40, unit: 'mg/m²', schedule: 'days 1-14, every 21 days' }
                ]
            },
            'Mini-BEAM': {
                name: 'Mini-BEAM (Carmustine + Etoposide + Cytarabine + Melphalan)',
                cycles: 3,
                drugs: [
                    { name: 'Carmustine (BCNU)', dose: 60, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                    { name: 'Etoposide', dose: 75, unit: 'mg/m²', days: 'D2-D5', schedule: 'days 2-5, every 28 days' },
                    { name: 'Cytarabine (Ara-C)', dose: 100, unit: 'mg/m²', schedule: 'q12h days 2-5, every 28 days' },
                    { name: 'Melphalan', dose: 30, unit: 'mg/m²', schedule: 'day 6, every 28 days' }
                ]
            },
            'BEACOPP': {
                name: 'BEACOPP (Bleomycin + Etoposide + Adriamycin + Cyclophosphamide + Oncovin + Procarbazine + Prednisone)',
                cycles: 8,
                drugs: [
                    { name: 'Bleomycin', dose: 10, unit: 'units/m²', schedule: 'day 8, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'D1-D3, every 21 days' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 25, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 650, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'day 8, every 21 days (max 2mg)' },
                    { name: 'Procarbazine', dose: 100, unit: 'mg/m²', days: 'D1-D7', schedule: 'days 1-7, every 21 days' },
                    { name: 'Prednisone', dose: 40, unit: 'mg/m²', days: 'D1-D14', schedule: 'days 1-14, every 21 days' }
                ]
            },
            'BEACOPP-Escalated': {
                name: 'BEACOPP Escalated (High-dose)',
                cycles: 8,
                drugs: [
                    { name: 'Bleomycin', dose: 10, unit: 'units/m²', schedule: 'day 8, every 21 days' },
                    { name: 'Etoposide', dose: 200, unit: 'mg/m²', days: 'D1-D3', schedule: 'D1-D3, every 21 days' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 35, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 1250, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Mesna', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days (80% of Cyclophosphamide dose)' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'day 8, every 21 days (max 2mg)' },
                    { name: 'Procarbazine', dose: 100, unit: 'mg/m²', days: 'D1-D7', schedule: 'days 1-7, every 21 days' },
                    { name: 'Prednisone', dose: 40, unit: 'mg/m²', days: 'D1-D14', schedule: 'days 1-14, every 21 days' }
                ]
            },
            'GVD': {
                name: 'GVD (Gemcitabine + Vinorelbine + Doxorubicin)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Vinorelbine', dose: 20, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Doxorubicin (Liposomal)', dose: 15, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Gemcitabine-Single': {
                name: 'Gemcitabine (Single Agent)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Brentuximab-Single': {
                name: 'Brentuximab vedotin (Single Agent)',
                cycles: 8,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'Nivolumab-Single': {
                name: 'Nivolumab (Single Agent)',
                cycles: 8,
                drugs: [
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 14 days, then 480mg every 28 days' }
                ]
            },
            'Pembrolizumab-Single': {
                name: 'Pembrolizumab (Single Agent)',
                cycles: 8,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days, then 400mg every 6 weeks' }
                ]
            },
            'Bendamustine-Single': {
                name: 'Bendamustine (Single Agent)',
                cycles: 6,
                drugs: [
                    { name: 'Bendamustine', dose: 120, unit: 'mg/m²', days: 'D1-D2', schedule: 'days 1-2, every 28 days' }
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
                    { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'days 1-21, every 28 days' }
                ]
            }
        },
        'b_cell_nhl': {
            // First-line regimens for multiple B-cell lymphomas
            'R-CHOP': {
                name: 'R-CHOP (First-line DLBCL/FL/PMBCL/MZL)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'Pola-R-CHP': {
                name: 'Polatuzumab vedotin + R-CHP (First-line DLBCL)',
                cycles: 6,
                drugs: [
                    { name: 'Polatuzumab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'R-CVP': {
                name: 'R-CVP (First-line FL/MZL)',
                cycles: 8,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Mesna', dose: 800, unit: 'mg/m²', schedule: 'D1, every 21 days (80% of Cyclophosphamide dose)' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'R-Bendamustine': {
                name: 'R-Bendamustine (First-line FL/MCL/MZL)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                    { name: 'Bendamustine', dose: 90, unit: 'mg/m²', days: 'D1-D2', schedule: 'days 1-2, every 28 days' }
                ]
            },
            'Obinutuzumab-Bendamustine': {
                name: 'Obinutuzumab + Bendamustine (First-line FL)',
                cycles: 6,
                drugs: [
                    { name: 'Obinutuzumab', dose: 1000, unit: 'mg', schedule: 'cycle 1: days 1,8,15; then D1, every 28 days' },
                    { name: 'Bendamustine', dose: 90, unit: 'mg/m²', days: 'D1-D2', schedule: 'days 1-2, every 28 days' }
                ]
            },
            'R-mini-CHOP': {
                name: 'R-mini-CHOP (Elderly DLBCL/FL)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 400, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 25, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine', dose: 1, unit: 'mg', schedule: 'D1, every 21 days (max 1mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'R-EPOCH': {
                name: 'R-EPOCH (First-line DLBCL/PMBCL/High-grade B-cell)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 50, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, every 21 days' },
                    { name: 'Prednisone', dose: 60, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Vincristine', dose: 0.4, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'day 5, every 21 days' },
                    { name: 'Doxorubicin', dose: 10, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, every 21 days' }
                ]
            },
            'DA-R-EPOCH': {
                name: 'DA-R-EPOCH (First-line DLBCL/PMBCL/High-grade B-cell)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 50, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, every 21 days (dose-adjusted)' },
                    { name: 'Prednisone', dose: 60, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Vincristine', dose: 0.4, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'day 5, every 21 days (dose-adjusted)' },
                    { name: 'Doxorubicin', dose: 10, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, every 21 days (dose-adjusted)' }
                ]
            },
            'Rituximab-Monotherapy': {
                name: 'Rituximab Monotherapy (First-line FL/MZL)',
                cycles: 4,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'weekly x 4 doses, then maintenance q8weeks' }
                ]
            },
            // MCL First-line regimens
            'R-HyperCVAD-MCL': {
                name: 'R-HyperCVAD/MA (First-line MCL)',
                cycles: 8,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, alternating cycles' },
                    { name: 'Cyclophosphamide', dose: 300, unit: 'mg/m²', schedule: 'q12h x 6 doses (Hyper-CVAD)' },
                    { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'days 4, 11 (Hyper-CVAD)' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'day 4 (Hyper-CVAD)' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 1-4, 11-14 (Hyper-CVAD)' },
                    { name: 'Methotrexate (High-dose)', dose: 1000, unit: 'mg/m²', schedule: 'day 1 (MA)' },
                    { name: 'Leucovorin', dose: 50, unit: 'mg/m²', schedule: 'q6h x 8 doses starting 12h after MTX (MA)' },
                    { name: 'Cytarabine (High-dose)', dose: 3000, unit: 'mg/m²', schedule: 'q12h days 2-3 (MA)' }
                ]
            },
            // Burkitt and High-grade B-cell
            'HyperCVAD-MA-R': {
                name: 'HyperCVAD/MA + R (Burkitt/High-grade B-cell)',
                cycles: 8,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, alternating cycles' },
                    { name: 'Cyclophosphamide', dose: 300, unit: 'mg/m²', schedule: 'q12h x 6 doses (Hyper-CVAD)' },
                    { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'days 4, 11 (Hyper-CVAD)' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'day 4 (Hyper-CVAD)' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 1-4, 11-14 (Hyper-CVAD)' },
                    { name: 'Methotrexate (High-dose)', dose: 1000, unit: 'mg/m²', schedule: 'day 1 (MA)' },
                    { name: 'Leucovorin', dose: 50, unit: 'mg/m²', schedule: 'q6h x 8 doses starting 12h after MTX (MA)' },
                    { name: 'Cytarabine (High-dose)', dose: 3000, unit: 'mg/m²', schedule: 'q12h days 2-3 (MA)' }
                ]
            },
            'R-CODOX-M-IVAC': {
                name: 'R-CODOX-M/IVAC (Burkitt/High-grade B-cell)',
                cycles: 4,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'per protocol schedule' },
                    { name: 'Cyclophosphamide', dose: 800, unit: 'mg/m²', schedule: 'day 1 (CODOX-M)' },
                    { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'days 1, 8 (CODOX-M) max 2mg' },
                    { name: 'Doxorubicin', dose: 40, unit: 'mg/m²', schedule: 'day 1 (CODOX-M)' },
                    { name: 'Methotrexate (High-dose)', dose: 3000, unit: 'mg/m²', schedule: 'day 10 (CODOX-M)' },
                    { name: 'Leucovorin', dose: 50, unit: 'mg/m²', schedule: 'q6h starting 12h after MTX until level <0.05' },
                    { name: 'Ifosfamide', dose: 1500, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5 (IVAC)' },
                    { name: 'Mesna (pre-dose)', dose: 300, unit: 'mg/m²', schedule: 'before Ifosfamide, days 1-5 (IVAC)' },
                    { name: 'Mesna (4h post)', dose: 600, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, days 1-5 (IVAC)' },
                    { name: 'Mesna (8h post)', dose: 600, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, days 1-5 (IVAC)' },
                    { name: 'Etoposide', dose: 60, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5 (IVAC)' },
                    { name: 'Cytarabine (High-dose)', dose: 2000, unit: 'mg/m²', schedule: 'days 1, 2 (IVAC)' }
                ]
            },
            // Primary CNS Lymphoma
            'MTX-Ara-C-PCNSL': {
                name: 'High-dose MTX + Ara-C (First-line PCNSL)',
                cycles: 6,
                drugs: [
                    { name: 'Methotrexate (High-dose)', dose: 3500, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 20, unit: 'mg/m²', schedule: 'q6h starting 24h after MTX until level <0.05' },
                    { name: 'Cytarabine (High-dose)', dose: 2000, unit: 'mg/m²', schedule: 'day 2-3, every 14 days' }
                ]
            },
            'R-MPV-PCNSL': {
                name: 'R-MPV (First-line PCNSL)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Methotrexate (High-dose)', dose: 3500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Leucovorin', dose: 20, unit: 'mg/m²', schedule: 'q6h starting 24h after MTX until level <0.05' },
                    { name: 'Procarbazine', dose: 100, unit: 'mg/m²', days: 'D1-D7', schedule: 'days 1-7, every 21 days' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' }
                ]
            },
            'MTR-PCNSL': {
                name: 'MTR (Methotrexate + Temozolomide + Rituximab) - PCNSL',
                cycles: 8,
                drugs: [
                    { name: 'Methotrexate (High-dose)', dose: 3500, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 20, unit: 'mg/m²', schedule: 'q6h starting 24h after MTX until level <0.05' },
                    { name: 'Temozolomide', dose: 150, unit: 'mg/m²', schedule: 'days 1-7, every 14 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 14 days' }
                ]
            },
            // Waldenström Macroglobulinemia
            'DRC-WM': {
                name: 'DRC (First-line Waldenström Macroglobulinemia)',
                cycles: 6,
                drugs: [
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 1, 8, 15, 22, q5weeks' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q5weeks' },
                    { name: 'Cyclophosphamide', dose: 100, unit: 'mg/m²', schedule: 'days 1-5, q5weeks' }
                ]
            },
            'BDR-WM': {
                name: 'BDR (First-line Waldenström Macroglobulinemia)',
                cycles: 6,
                drugs: [
                    { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'days 1, 4, 8, 11, every 21 days' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 1, 4, 8, 11, every 21 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'BR-WM': {
                name: 'BR (Bendamustine + Rituximab) - WM',
                cycles: 6,
                drugs: [
                    { name: 'Bendamustine', dose: 90, unit: 'mg/m²', days: 'D1-D2', schedule: 'days 1-2, every 28 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 28 days' }
                ]
            },
            // Relapsed/Refractory regimens (multiple B-cell lymphomas)
            'R-ICE': {
                name: 'R-ICE (Relapsed/Refractory DLBCL/FL/MCL)',
                cycles: 3,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Ifosfamide', dose: 5000, unit: 'mg/m²', schedule: 'day 2, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 2, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'D1-D3, every 21 days' }
                ]
            },
            'R-DHAP': {
                name: 'R-DHAP (Relapsed/Refractory DLBCL/FL)',
                cycles: 3,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 1-4, every 21 days' },
                    { name: 'Cytarabine (High-dose)', dose: 2000, unit: 'mg/m²', schedule: 'day 2, q12h x 2 doses, every 21 days' },
                    { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'R-ESHAP': {
                name: 'R-ESHAP (Relapsed/Refractory DLBCL/FL)',
                cycles: 3,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 40, unit: 'mg/m²', days: 'D1-D4', schedule: 'days 1-4, every 21 days' },
                    { name: 'Methylprednisolone (Solu-Medrol)', dose: 500, unit: 'mg', days: 'D1-D5', schedule: 'D1-D5, every 21 days' },
                    { name: 'Cytarabine (High-dose)', dose: 2000, unit: 'mg/m²', schedule: 'day 5, every 21 days' },
                    { name: 'Cisplatin', dose: 25, unit: 'mg/m²', days: 'D1-D4', schedule: 'days 1-4, every 21 days' }
                ]
            },
            'R-GDP': {
                name: 'R-GDP (Relapsed/Refractory DLBCL/FL)',
                cycles: 3,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', days: 'D1-D4', schedule: 'days 1-4, every 21 days' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'R-GemOx': {
                name: 'R-GemOx (Relapsed/Refractory DLBCL/FL)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Oxaliplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 14 days' }
                ]
            },
            'R-CEPP': {
                name: 'R-CEPP (Relapsed/Refractory B-cell NHL)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'days 1, 8, every 28 days' },
                    { name: 'Etoposide', dose: 70, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 28 days' },
                    { name: 'Procarbazine', dose: 60, unit: 'mg/m²', days: 'D1-D10', schedule: 'days 1-10, every 28 days' },
                    { name: 'Prednisone', dose: 60, unit: 'mg/m²', days: 'D1-D10', schedule: 'days 1-10, every 28 days' }
                ]
            },
            'R-CDOP': {
                name: 'R-CDOP (Relapsed/Refractory B-cell NHL)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'Pola-BR': {
                name: 'Pola-BR (Relapsed/Refractory DLBCL)',
                cycles: 6,
                drugs: [
                    { name: 'Polatuzumab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Bendamustine', dose: 90, unit: 'mg/m²', days: 'D1-D2', schedule: 'days 1-2, every 21 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Tafasitamab-Lenalidomide': {
                name: 'Tafasitamab + Lenalidomide (Relapsed/Refractory DLBCL)',
                cycles: 12,
                drugs: [
                    { name: 'Tafasitamab', dose: 12, unit: 'mg/kg', schedule: 'days 1, 8, 15, 22 (cycle 1); days 1, 15 (cycles 2-3); day 1 (cycles 4-12)' },
                    { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'days 1-21, every 28 days' }
                ]
            },
            // Follicular Lymphoma specific relapsed/refractory
            'Lenalidomide-Rituximab': {
                name: 'Lenalidomide + Rituximab (Relapsed/Refractory FL)',
                cycles: 12,
                drugs: [
                    { name: 'Lenalidomide', dose: 20, unit: 'mg', schedule: 'days 1-21, every 28 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'weekly x 4, then q8weeks x 5 doses' }
                ]
            },
            'Tazemetostat-FL': {
                name: 'Tazemetostat (EZH2-mutated FL)',
                cycles: 12,
                drugs: [
                    { name: 'Tazemetostat', dose: 800, unit: 'mg', schedule: 'twice daily, continuous' }
                ]
            },
            'Copanlisib-FL': {
                name: 'Copanlisib (Relapsed/Refractory FL)',
                cycles: 6,
                drugs: [
                    { name: 'Copanlisib', dose: 60, unit: 'mg', schedule: 'D1, D8, D15, every 28 days' }
                ]
            },
            'Duvelisib-FL': {
                name: 'Duvelisib (Relapsed/Refractory FL)',
                cycles: 12,
                drugs: [
                    { name: 'Duvelisib', dose: 25, unit: 'mg', schedule: 'twice daily, continuous' }
                ]
            },
            'Idelalisib-Rituximab-FL': {
                name: 'Idelalisib + Rituximab (Relapsed/Refractory FL)',
                cycles: 12,
                drugs: [
                    { name: 'Idelalisib', dose: 150, unit: 'mg', schedule: 'twice daily, continuous' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'weekly x 8, then q12weeks' }
                ]
            },
            // MCL relapsed/refractory
            'Ibrutinib-MCL': {
                name: 'Ibrutinib (Relapsed/Refractory MCL)',
                cycles: 12,
                drugs: [
                    { name: 'Ibrutinib', dose: 560, unit: 'mg', schedule: 'daily, continuous' }
                ]
            },
            'Acalabrutinib-MCL': {
                name: 'Acalabrutinib (Relapsed/Refractory MCL)',
                cycles: 12,
                drugs: [
                    { name: 'Acalabrutinib', dose: 100, unit: 'mg', schedule: 'twice daily, continuous' }
                ]
            },
            'Zanubrutinib-MCL': {
                name: 'Zanubrutinib (Relapsed/Refractory MCL)',
                cycles: 12,
                drugs: [
                    { name: 'Zanubrutinib', dose: 160, unit: 'mg', schedule: 'twice daily, continuous' }
                ]
            },
            'Bortezomib-MCL': {
                name: 'Bortezomib (Relapsed/Refractory MCL)',
                cycles: 8,
                drugs: [
                    { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'days 1, 4, 8, 11, every 21 days' }
                ]
            },
            'Lenalidomide-MCL': {
                name: 'Lenalidomide (Relapsed/Refractory MCL)',
                cycles: 12,
                drugs: [
                    { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'days 1-21, every 28 days' }
                ]
            },
            // WM additional regimens
            'Ibrutinib-WM': {
                name: 'Ibrutinib (Waldenström Macroglobulinemia)',
                cycles: 12,
                drugs: [
                    { name: 'Ibrutinib', dose: 420, unit: 'mg', schedule: 'daily, continuous' }
                ]
            },
            'Zanubrutinib-WM': {
                name: 'Zanubrutinib (Waldenström Macroglobulinemia)',
                cycles: 12,
                drugs: [
                    { name: 'Zanubrutinib', dose: 160, unit: 'mg', schedule: 'twice daily, continuous' }
                ]
            },
            'Carfilzomib-Rituximab-Dex-WM': {
                name: 'CaRD (Carfilzomib + Rituximab + Dexamethasone) - WM',
                cycles: 6,
                drugs: [
                    { name: 'Carfilzomib', dose: 36, unit: 'mg/m²', schedule: 'days 1, 2, 8, 9, 15, 16, every 28 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 1, 8, 15, 22, every 28 days' }
                ]
            },
            'CAR-T-DLBCL': {
                name: 'CAR-T Cell Therapy (Relapsed/Refractory DLBCL)',
                cycles: 1,
                drugs: [
                    { name: 'CAR-T Cell Infusion', dose: 'per protocol', unit: 'infusion', schedule: 'single infusion after lymphodepletion' }
                ]
            },
            // Primary CNS Lymphoma - First-line
            // Burkitt Lymphoma - First-line
            'R-CODOX-M-IVAC-Burkitt': {
                name: 'R-CODOX-M/IVAC (First-line Burkitt Lymphoma)',
                cycles: 4,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'per protocol schedule' },
                    { name: 'Cyclophosphamide', dose: 800, unit: 'mg/m²', schedule: 'day 1 (CODOX-M)' },
                    { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'days 1, 8 (CODOX-M) max 2mg' },
                    { name: 'Doxorubicin', dose: 40, unit: 'mg/m²', schedule: 'day 1 (CODOX-M)' },
                    { name: 'Methotrexate (High-dose)', dose: 3000, unit: 'mg/m²', schedule: 'day 10 (CODOX-M)' },
                    { name: 'Leucovorin', dose: 50, unit: 'mg/m²', schedule: 'q6h starting 12h after MTX until level <0.05' },
                    { name: 'Ifosfamide', dose: 1500, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5 (IVAC)' },
                    { name: 'Mesna (pre-dose)', dose: 300, unit: 'mg/m²', schedule: 'before Ifosfamide, days 1-5 (IVAC)' },
                    { name: 'Mesna (4h post)', dose: 600, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, days 1-5 (IVAC)' },
                    { name: 'Mesna (8h post)', dose: 600, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, days 1-5 (IVAC)' },
                    { name: 'Etoposide', dose: 60, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5 (IVAC)' },
                    { name: 'Cytarabine (High-dose)', dose: 2000, unit: 'mg/m²', schedule: 'days 1, 2 (IVAC)' }
                ]
            },
            // CAR-T Cell Therapy for B-cell NHL
            'Axicabtagene-ciloleucel': {
                name: 'Axicabtagene ciloleucel (CAR-T for DLBCL/PMBCL)',
                cycles: 1,
                drugs: [
                    { name: 'Fludarabine', dose: 25, unit: 'mg/m²', days: 'D-5 to D-3', schedule: 'lymphodepletion' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', days: 'D-5 to D-3', schedule: 'lymphodepletion' },
                    { name: 'Axicabtagene ciloleucel', dose: '2 x 10^6', unit: 'CAR+ T cells/kg', schedule: 'single infusion on day 0' }
                ]
            },
            'Tisagenlecleucel': {
                name: 'Tisagenlecleucel (CAR-T for DLBCL/FL)',
                cycles: 1,
                drugs: [
                    { name: 'Fludarabine', dose: 25, unit: 'mg/m²', days: 'D-4 to D-2', schedule: 'lymphodepletion' },
                    { name: 'Cyclophosphamide', dose: 250, unit: 'mg/m²', days: 'D-4 to D-2', schedule: 'lymphodepletion' },
                    { name: 'Tisagenlecleucel', dose: '0.6-6 x 10^8', unit: 'CAR+ T cells', schedule: 'single infusion on day 0' }
                ]
            },
            'Lisocabtagene-maraleucel': {
                name: 'Lisocabtagene maraleucel (CAR-T for DLBCL)',
                cycles: 1,
                drugs: [
                    { name: 'Fludarabine', dose: 30, unit: 'mg/m²', days: 'D-5 to D-3', schedule: 'lymphodepletion' },
                    { name: 'Cyclophosphamide', dose: 300, unit: 'mg/m²', days: 'D-5 to D-3', schedule: 'lymphodepletion' },
                    { name: 'Lisocabtagene maraleucel', dose: '100 x 10^6', unit: 'CAR+ T cells', schedule: 'single infusion on day 0' }
                ]
            }
        },
        't_cell_nhl': {
            // Peripheral T-cell Lymphoma - First-line
            'CHOP-PTCL': {
                name: 'CHOP (First-line PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'CHOEP-PTCL': {
                name: 'CHOEP (First-line PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'D1-D3, every 21 days' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'Brentuximab-CHP-CD30': {
                name: 'Brentuximab vedotin + CHP (CD30+ PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'D1-D5, every 21 days' }
                ]
            },
            // Anaplastic Large Cell Lymphoma - First-line
            'CHOP-ALCL': {
                name: 'CHOP (First-line ALCL)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'Brentuximab-CHP-ALCL': {
                name: 'Brentuximab vedotin + CHP (ALK-negative ALCL)',
                cycles: 6,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'D1-D5, every 21 days' }
                ]
            },
            // ALK-positive ALCL
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
            // Extranodal NK/T-cell Lymphoma
            'SMILE-ENKTL': {
                name: 'SMILE (Extranodal NK/T-cell Lymphoma)',
                cycles: 3,
                drugs: [
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 2-4, every 21 days' },
                    { name: 'Methotrexate', dose: 2000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Leucovorin', dose: 15, unit: 'mg/m²', schedule: 'q6h starting 24h after MTX until level <0.05' },
                    { name: 'Ifosfamide', dose: 1500, unit: 'mg/m²', schedule: 'days 2-4, every 21 days' },
                    { name: 'L-asparaginase', dose: 6000, unit: 'units/m²', schedule: 'days 8, 10, 12, 14, 16, 18, 20, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'days 2-4, every 21 days' }
                ]
            },
            'AspaMetDex-ENKTL': {
                name: 'AspaMetDex (Extranodal NK/T-cell Lymphoma)',
                cycles: 6,
                drugs: [
                    { name: 'L-asparaginase', dose: 6000, unit: 'units/m²', schedule: 'days 1, 3, 5, 7, 9, 11, every 21 days' },
                    { name: 'Methotrexate', dose: 3000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Leucovorin', dose: 15, unit: 'mg/m²', schedule: 'q6h starting 24h after MTX until level <0.05' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 1-4, every 21 days' }
                ]
            },
            // T-cell Lymphoma - Relapsed/Refractory
            'Brentuximab-PTCL': {
                name: 'Brentuximab vedotin (Relapsed/Refractory CD30+ PTCL)',
                cycles: 8,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'Belinostat-PTCL': {
                name: 'Belinostat (Relapsed/Refractory PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Belinostat', dose: 1000, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'Romidepsin-PTCL': {
                name: 'Romidepsin (Relapsed/Refractory PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Romidepsin', dose: 14, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
                ]
            },
            'Pralatrexate-PTCL': {
                name: 'Pralatrexate (Relapsed/Refractory PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Pralatrexate', dose: 30, unit: 'mg/m²', schedule: 'weekly x 6 weeks, then 1 week rest' }
                ]
            },
            'Alemtuzumab-PTCL': {
                name: 'Alemtuzumab (Relapsed/Refractory T-cell Lymphoma)',
                cycles: 6,
                drugs: [
                    { name: 'Alemtuzumab', dose: 30, unit: 'mg', schedule: 'days 1, 3, 5 weekly' }
                ]
            },
            // Cutaneous T-cell Lymphoma
            'Mogamulizumab-CTCL': {
                name: 'Mogamulizumab (Relapsed/Refractory CTCL)',
                cycles: 8,
                drugs: [
                    { name: 'Mogamulizumab', dose: 1, unit: 'mg/kg', schedule: 'weekly for 5 doses, then every 14 days' }
                ]
            },
            'Romidepsin-CTCL': {
                name: 'Romidepsin (Relapsed/Refractory CTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Romidepsin', dose: 14, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
                ]
            },
            'Vorinostat-CTCL': {
                name: 'Vorinostat (Relapsed/Refractory CTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Vorinostat', dose: 400, unit: 'mg', schedule: 'daily, continuous' }
                ]
            }
        }
    },
    melanoma: {
        // First-line Immunotherapy - Preferred (Metastatic)
        'Pembrolizumab': {
            name: 'Pembrolizumab (KEYNOTE-006) - Metastatic - 1L',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Nivolumab': {
            name: 'Nivolumab (CheckMate 066) - Metastatic - 1L',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days' }
            ]
        },
        'Nivolumab-Ipilimumab': {
            name: 'Nivolumab + Ipilimumab (CheckMate 067) - Metastatic - 1L',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 21 days x4 cycles' },
                { name: 'Ipilimumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 21 days x4 cycles' }
            ]
        },
        'Nivolumab-Relatlimab': {
            name: 'Nivolumab + Relatlimab (RELATIVITY-047) - Metastatic - 1L',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 480, unit: 'mg', schedule: 'D1, every 28 days' },
                { name: 'Relatlimab', dose: 160, unit: 'mg', schedule: 'D1, every 28 days' }
            ]
        },
        'Ipilimumab': {
            name: 'Ipilimumab (MDX010-20) - Metastatic - 1L',
            cycles: 4,
            drugs: [
                { name: 'Ipilimumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 21 days x4 cycles' }
            ]
        },
        
        // BRAF-mutated Melanoma - Combination Therapy (Metastatic)
        'Dabrafenib-Trametinib': {
            name: 'Dabrafenib + Trametinib (COMBI-d/v) - BRAF V600E/K - Metastatic',
            cycles: 12,
            drugs: [
                { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'PO twice daily continuously' },
                { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'daily continuously' }
            ]
        },
        'Vemurafenib-Cobimetinib': {
            name: 'Vemurafenib + Cobimetinib (coBRIM) - BRAF V600E/K - Metastatic',
            cycles: 12,
            drugs: [
                { name: 'Vemurafenib', dose: 960, unit: 'mg', schedule: 'PO twice daily continuously' },
                { name: 'Cobimetinib', dose: 60, unit: 'mg', schedule: 'daily D1-21, every 28 days' }
            ]
        },
        'Encorafenib-Binimetinib': {
            name: 'Encorafenib + Binimetinib (COLUMBUS) - BRAF V600E/K - Metastatic',
            cycles: 12,
            drugs: [
                { name: 'Encorafenib', dose: 450, unit: 'mg', schedule: 'daily continuously' },
                { name: 'Binimetinib', dose: 45, unit: 'mg', schedule: 'PO twice daily continuously' }
            ]
        },
        'Atezolizumab-Vemurafenib-Cobimetinib': {
            name: 'Atezolizumab + Vemurafenib + Cobimetinib (IMspire150) - BRAF V600 - Metastatic',
            cycles: 8,
            drugs: [
                { name: 'Atezolizumab', dose: 840, unit: 'mg', schedule: 'D1, D15, every 28 days' },
                { name: 'Vemurafenib', dose: 720, unit: 'mg', schedule: 'PO twice daily continuously' },
                { name: 'Cobimetinib', dose: 60, unit: 'mg', schedule: 'daily D1-21, every 28 days' }
            ]
        },
        
        // Adjuvant Therapy
        'Pembrolizumab-Adjuvant': {
            name: 'Pembrolizumab (KEYNOTE-716) - Adjuvant - Stage IIB/IIC/III',
            cycles: 17,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days x17 cycles' }
            ]
        },
        'Nivolumab-Adjuvant': {
            name: 'Nivolumab (CheckMate 238) - Adjuvant - Stage III/IV',
            cycles: 26,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days x12 months' }
            ]
        },
        'Dabrafenib-Trametinib-Adjuvant': {
            name: 'Dabrafenib + Trametinib (COMBI-AD) - Adjuvant - BRAF V600E/K - Stage III',
            cycles: 26,
            drugs: [
                { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'PO twice daily continuously x12 months' },
                { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'daily continuously x12 months' }
            ]
        },
        'Interferon-alpha-2b-Adjuvant': {
            name: 'Interferon alfa-2b (E1684) - Adjuvant - High-risk',
            cycles: 12,
            drugs: [
                { name: 'Interferon alfa-2b', dose: 20, unit: 'MIU/m²', schedule: 'D1-5 weekly x4 weeks, then 10 MIU/m² TIW x48 weeks' }
            ]
        },
        'Peg-Interferon-alpha-2b-Adjuvant': {
            name: 'Peginterferon alfa-2b (EORTC 18991) - Adjuvant - High-risk',
            cycles: 12,
            drugs: [
                { name: 'Peginterferon alfa-2b', dose: 6, unit: 'mcg/kg', schedule: 'SC weekly x8 weeks, then 3 mcg/kg weekly' }
            ]
        },
        
        // Neoadjuvant Therapy
        'Pembrolizumab-Neoadjuvant': {
            name: 'Pembrolizumab (KEYNOTE-716) - Neoadjuvant - Stage III/IV',
            cycles: 3,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days x3 cycles' }
            ]
        },
        'Nivolumab-Ipilimumab-Neoadjuvant': {
            name: 'Nivolumab + Ipilimumab (OpACIN-neo) - Neoadjuvant - Stage III',
            cycles: 2,
            drugs: [
                { name: 'Nivolumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 21 days x2 cycles' },
                { name: 'Ipilimumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 21 days x2 cycles' }
            ]
        },
        
        // Uveal Melanoma
        'Tebentafusp': {
            name: 'Tebentafusp (IMCnyanza) - Uveal Melanoma - Metastatic',
            cycles: 12,
            drugs: [
                { name: 'Tebentafusp', dose: 68, unit: 'mcg', schedule: 'D1, every 7 days' }
            ]
        },
        
        // Intralesional Therapy
        'Talimogene-laherparepvec': {
            name: 'Talimogene laherparepvec (OPTiM) - Intralesional - Metastatic',
            cycles: 12,
            drugs: [
                { name: 'Talimogene laherparepvec', dose: '10^6 PFU/mL initial, then 10^8 PFU/mL', unit: 'PFU/mL', schedule: 'intralesional D1, then every 14 days' }
            ]
        },
        
        // Chemotherapy Options (Metastatic)
        'Dacarbazine': {
            name: 'Dacarbazine - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Dacarbazine', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Temozolomide': {
            name: 'Temozolomide - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 200, unit: 'mg/m²', schedule: 'D1-5, every 28 days' }
            ]
        },
        'Carboplatin-Paclitaxel': {
            name: 'Paclitaxel + Carboplatin (PC) - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Dacarbazine': {
            name: 'Cisplatin + Dacarbazine - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-4, every 21 days' },
                { name: 'Dacarbazine', dose: 800, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Dacarbazine-Carmustine-Cisplatin': {
            name: 'DCC (Dacarbazine + Carmustine + Cisplatin) - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Dacarbazine', dose: 220, unit: 'mg/m²', schedule: 'D1-3, every 28 days' },
                { name: 'Carmustine (BCNU)', dose: 150, unit: 'mg/m²', schedule: 'D1, every 6 weeks (cycles 1, 3, 5)' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1-3, every 28 days' }
            ]
        },
        
        // Interleukin-2 (High-dose)
        'Aldesleukin': {
            name: 'Aldesleukin (High-dose IL-2) - Metastatic',
            cycles: 2,
            drugs: [
                { name: 'Aldesleukin (IL-2)', dose: 600000, unit: 'IU/kg', schedule: 'every 8 hours x14 doses, repeat x2 cycles' }
            ]
        },
        
        // Combination Chemotherapy
        'IFN-Dacarbazine': {
            name: 'Interferon + Dacarbazine - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Interferon alfa-2b', dose: 15, unit: 'MIU/m²', schedule: 'SC daily x5 days/week' },
                { name: 'Dacarbazine', dose: 200, unit: 'mg/m²', schedule: 'D1-5, every 21 days' }
            ]
        },
        'Temozolomide-Thalidomide': {
            name: 'Temozolomide + Thalidomide - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 150, unit: 'mg/m²', schedule: 'D1-5, every 28 days' },
                { name: 'Thalidomide', dose: 200, unit: 'mg', schedule: 'daily continuously' }
            ]
        },
        
        // BRAF inhibitor monotherapy (less preferred)
        'Dabrafenib': {
            name: 'Dabrafenib - BRAF V600E/K - Metastatic',
            cycles: 12,
            drugs: [
                { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'PO twice daily continuously' }
            ]
        },
        'Vemurafenib': {
            name: 'Vemurafenib (BRIM-3) - BRAF V600E/K - Metastatic',
            cycles: 12,
            drugs: [
                { name: 'Vemurafenib', dose: 960, unit: 'mg', schedule: 'PO twice daily continuously' }
            ]
        },
        'Encorafenib': {
            name: 'Encorafenib - BRAF V600E/K - Metastatic',
            cycles: 12,
            drugs: [
                { name: 'Encorafenib', dose: 450, unit: 'mg', schedule: 'daily continuously' }
            ]
        },
        
        // MEK inhibitor monotherapy (less preferred)
        'Trametinib': {
            name: 'Trametinib - MEK inhibitor - Metastatic',
            cycles: 12,
            drugs: [
                { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'daily continuously' }
            ]
        },
        'Cobimetinib': {
            name: 'Cobimetinib - MEK inhibitor - Metastatic',
            cycles: 12,
            drugs: [
                { name: 'Cobimetinib', dose: 60, unit: 'mg', schedule: 'daily D1-21, every 28 days' }
            ]
        },
        'Binimetinib': {
            name: 'Binimetinib - MEK inhibitor - Metastatic',
            cycles: 12,
            drugs: [
                { name: 'Binimetinib', dose: 45, unit: 'mg', schedule: 'PO twice daily continuously' }
            ]
        }
    },
    ovarian: {
        'Carboplatin-Paclitaxel': {
            name: 'Paclitaxel + Carboplatin (PC) (GOG-158) - (Neoadjuvant/Adjuvant/Advanced)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Docetaxel': {
            name: 'Carboplatin + Docetaxel (Metastatic alternative)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Doxorubicin-Liposomal': {
            name: 'Carboplatin + Doxorubicin liposomal (Recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 28 days' },
                { name: 'Doxorubicin liposomal', dose: 40, unit: 'mg/m²', schedule: 'D1, every 28 days' }
            ]
        },
        'Gemcitabine-Doxorubicin-Liposomal': {
            name: 'Gemcitabine + Doxorubicin liposomal (Recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Doxorubicin liposomal', dose: 30, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Cisplatin': {
            name: 'Gemcitabine + Cisplatin (GC) (Recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Carboplatin': {
            name: 'Gemcitabine + Carboplatin (Recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 4', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'IP-Cisplatin-Paclitaxel': {
            name: 'IP Cisplatin + IV Paclitaxel + IP Paclitaxel (Metastatic optimal debulking)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel (IV)', dose: 135, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin (IP)', dose: 75, unit: 'mg/m²', schedule: 'day 2, every 21 days' },
                { name: 'Paclitaxel (IP)', dose: 60, unit: 'mg/m²', schedule: 'day 8, every 21 days' }
            ]
        },
        'Pemetrexed-Carboplatin': {
            name: 'Pemetrexed + Carboplatin (Recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'Olaparib-Bevacizumab': {
            name: 'Olaparib + Bevacizumab (First-line maintenance - HRD+)',
            cycles: 24,
            drugs: [
                { name: 'Olaparib', dose: 300, unit: 'mg', schedule: 'twice daily, continuous' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'every 21 days, then olaparib alone' }
            ]
        },
        'Niraparib-Bevacizumab': {
            name: 'Niraparib + Bevacizumab (First-line maintenance)',
            cycles: 24,
            drugs: [
                { name: 'Niraparib', dose: 200, unit: 'mg', schedule: 'daily, continuous (individualized dosing)' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'every 21 days, then niraparib alone' }
            ]
        },
        'Carboplatin-Cyclophosphamide': {
            name: 'Carboplatin + Cyclophosphamide (Elderly/frail)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 28 days' },
                { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 28 days' }
            ]
        },
        'Cisplatin-Cyclophosphamide': {
            name: 'Cisplatin + Cyclophosphamide (Historical metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Mirvetuximab-soravtansine': {
            name: 'Mirvetuximab soravtansine (FRα+ recurrent)',
            cycles: 8,
            drugs: [
                { name: 'Mirvetuximab soravtansine', dose: 6, unit: 'mg/kg', schedule: 'every 21 days (FRα high)' }
            ]
        },
        'Altretamine': {
            name: 'Altretamine (- recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Altretamine', dose: 260, unit: 'mg/m²', schedule: 'daily x 14 days, every 28 days' }
            ]
        },
        'Doxorubicin-Liposomal': {
            name: 'Doxorubicin liposomal (- recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin liposomal', dose: 40, unit: 'mg/m²', schedule: 'every 28 days' }
            ]
        },
        'Paclitaxel-Single': {
            name: 'Paclitaxel (- recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly x 18 weeks' }
            ]
        },
        'Ixabepilone': {
            name: 'Ixabepilone (- recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Ixabepilone', dose: 40, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Topotecan': {
            name: 'Topotecan (- recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', days: 'D1-D5', schedule: 'D1-D5, every 21 days' }
            ]
        },
        'Gemcitabine-Single': {
            name: 'Gemcitabine (- recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        'Etoposide': {
            name: 'Etoposide (- recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 50, unit: 'mg/m²', days: 'D1-D21', schedule: 'daily x 21 days, every 28 days' }
            ]
        },
        'Vinorelbine': {
            name: 'Vinorelbine (- recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Vinorelbine', dose: 30, unit: 'mg/m²', schedule: 'weekly x 18 weeks' }
            ]
        },
        'Pemetrexed-Single': {
            name: 'Pemetrexed (- recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Bevacizumab-Single': {
            name: 'Bevacizumab (- recurrent)',
            cycles: 8,
            drugs: [
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Capecitabine': {
            name: 'Capecitabine (- recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'twice daily x 14 days, every 21 days' }
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
            name: 'Veliparib + Paclitaxel + Carboplatin (BRCA+ metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Veliparib', dose: 150, unit: 'mg', schedule: 'twice daily, continuous' },
                { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Dostarlimab': {
            name: 'Dostarlimab (PD-1 inhibitor) (dMMR/MSI-H recurrent)',
            cycles: 8,
            drugs: [
                { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'every 21 days, then 1000mg every 6 weeks' }
            ]
        },
        'Pembrolizumab-Ovarian': {
            name: 'Pembrolizumab (MSI-H/dMMR recurrent)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days, then 400mg every 6 weeks' }
            ]
        },
        'BEP': {
            name: 'BEP (Bleomycin + Etoposide + Cisplatin) - Germ Cell',
            cycles: 3,
            drugs: [
                { name: 'Bleomycin', dose: 30, unit: 'units', schedule: 'D1, D8, D15, every 21 days' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        'Durvalumab-Olaparib-Bevacizumab-Carboplatin-Paclitaxel': {
            name: 'Durvalumab + Olaparib + Bevacizumab + Paclitaxel + Carboplatin (DUO-O) - (Advanced)',
            cycles: 6,
            drugs: [
                { name: 'Durvalumab', dose: 1120, unit: 'mg', schedule: 'D1, every 21 days' },
                { name: 'Olaparib', dose: 300, unit: 'mg', schedule: 'twice daily, from cycle 1' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Weekly': {
            name: 'Paclitaxel + Carboplatin (PC) Weekly (GOG-262) - (Neoadjuvant/Advanced)',
            cycles: 18,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, every 7 days' },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, every 7 days' }
            ]
        },
        'Docetaxel-Carboplatin': {
            name: 'Docetaxel + Carboplatin (SCOTROC) - (Neoadjuvant/Advanced)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'Bevacizumab-Carboplatin-Paclitaxel': {
            name: 'Bevacizumab + Paclitaxel + Carboplatin (GOG-218/ICON7) - (Advanced)',
            cycles: 6,
            drugs: [
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Pegylated-Liposomal-Doxorubicin': {
            name: 'Carboplatin + Pegylated Liposomal Doxorubicin (CALYPSO) - (Platinum-sensitive recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 28 days' },
                { name: 'Pegylated Liposomal Doxorubicin', dose: 30, unit: 'mg/m²', schedule: 'D1, every 28 days' }
            ]
        },
        'Carboplatin-Gemcitabine': {
            name: 'Gemcitabine + Carboplatin (AGO-OVAR-2.5) - (Platinum-sensitive recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 4', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Topotecan': {
            name: 'Topotecan (Platinum-resistant recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        'Trabectedin': {
            name: 'Trabectedin (Platinum-resistant recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Trabectedin', dose: 1.3, unit: 'mg/m²', schedule: 'D1, every 21 days (24-hour infusion)' }
            ]
        },
        'Mirvetuximab-Soravtansine': {
            name: 'Mirvetuximab Soravtansine (SORAYA/MIRASOL) - (FRα+ platinum-resistant)',
            cycles: 6,
            drugs: [
                { name: 'Mirvetuximab Soravtansine', dose: 6, unit: 'mg/kg', schedule: 'D1, every 21 days (folate receptor α positive)' }
            ]
        },
        'Bevacizumab-Maintenance': {
            name: 'Bevacizumab Maintenance (GOG-218) - (After primary therapy)',
            cycles: 22,
            drugs: [
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        }
    },
    prostate: {
        'Docetaxel-Prednisone': {
            name: 'Docetaxel + Prednisone (TAX-327) (mCSPC/mCRPC)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Prednisone', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Docetaxel-ADT': {
            name: 'Docetaxel + ADT (CHAARTED/STAMPEDE) (mCSPC)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'ADT (Leuprolide or equivalent)', dose: 22.5, unit: 'mg', schedule: 'IM every 3 months, continuous' },
                { name: 'Prednisone', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Docetaxel-Prednisone-Bevacizumab': {
            name: 'Docetaxel + Prednisone + Bevacizumab (mCRPC)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Prednisone', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Cabazitaxel-Prednisone': {
            name: 'Cabazitaxel + Prednisone (TROPIC) (mCRPC post-docetaxel)',
            cycles: 8,
            drugs: [
                { name: 'Cabazitaxel', dose: 20, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Prednisone', dose: 10, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Cabazitaxel-25': {
            name: 'Cabazitaxel 25mg/m² + Prednisone (PROSELICA) (mCRPC post-docetaxel)',
            cycles: 8,
            drugs: [
                { name: 'Cabazitaxel', dose: 25, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Prednisone', dose: 10, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Cabazitaxel-Carboplatin': {
            name: 'Cabazitaxel + Carboplatin (mCRPC - DNA repair defects)',
            cycles: 6,
            drugs: [
                { name: 'Cabazitaxel', dose: 20, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 4', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'Abiraterone-Prednisone-mCSPC': {
            name: 'Abiraterone + Prednisone (LATITUDE/STAMPEDE) (mCSPC)',
            cycles: 12,
            drugs: [
                { name: 'Abiraterone acetate', dose: 1000, unit: 'mg', schedule: 'daily on empty stomach, continuous' },
                { name: 'Prednisone', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Abiraterone-Prednisone-mCRPC': {
            name: 'Abiraterone + Prednisone (COU-AA-301/302) (mCRPC)',
            cycles: 12,
            drugs: [
                { name: 'Abiraterone acetate', dose: 1000, unit: 'mg', schedule: 'daily on empty stomach, continuous' },
                { name: 'Prednisone', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Abiraterone-Docetaxel-ADT': {
            name: 'Abiraterone + Docetaxel + ADT (PEACE-1) (mCSPC)',
            cycles: 6,
            drugs: [
                { name: 'Abiraterone acetate', dose: 1000, unit: 'mg', schedule: 'daily on empty stomach, continuous' },
                { name: 'Prednisone', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days x 6 cycles' },
                { name: 'ADT (Leuprolide or equivalent)', dose: 22.5, unit: 'mg', schedule: 'IM every 3 months, continuous' }
            ]
        },
        'Darolutamide-Docetaxel-ADT': {
            name: 'Darolutamide + Docetaxel + ADT (ARASENS) (mCSPC)',
            cycles: 6,
            drugs: [
                { name: 'Darolutamide', dose: 600, unit: 'mg', schedule: 'twice daily, continuous' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days x 6 cycles' },
                { name: 'ADT (Leuprolide or equivalent)', dose: 22.5, unit: 'mg', schedule: 'IM every 3 months, continuous' }
            ]
        },
        'Niraparib-Abiraterone-Prednisone': {
            name: 'Niraparib + Abiraterone + Prednisone (MAGNITUDE) (mCRPC - HRR mutations)',
            cycles: 12,
            drugs: [
                { name: 'Niraparib', dose: 200, unit: 'mg', schedule: 'daily, continuous (HRR gene mutations)' },
                { name: 'Abiraterone acetate', dose: 1000, unit: 'mg', schedule: 'daily on empty stomach, continuous' },
                { name: 'Prednisone', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Niraparib-Abiraterone-mCSPC': {
            name: 'Niraparib + Abiraterone + Prednisone (AMPLITUDE) (mCSPC)',
            cycles: 12,
            drugs: [
                { name: 'Niraparib', dose: 200, unit: 'mg', schedule: 'daily, continuous' },
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
                { name: 'Mitoxantrone', dose: 12, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Prednisone', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Estramustine-Etoposide': {
            name: 'Estramustine + Etoposide (mCRPC)',
            cycles: 6,
            drugs: [
                { name: 'Estramustine', dose: 280, unit: 'mg', schedule: 'three times daily x 21 days' },
                { name: 'Etoposide', dose: 50, unit: 'mg/m²', days: 'D1-D21', schedule: 'daily x 21 days, every 28 days' }
            ]
        },
        'Estramustine-Vinblastine': {
            name: 'Estramustine + Vinblastine (mCRPC)',
            cycles: 6,
            drugs: [
                { name: 'Estramustine', dose: 280, unit: 'mg', schedule: 'three times daily, continuous' },
                { name: 'Vinblastine', dose: 4, unit: 'mg/m²', schedule: 'weekly x 6 weeks, then every 14 days' }
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
                { name: 'Docetaxel', dose: 70, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Estramustine', dose: 280, unit: 'mg', schedule: 'three times daily, days 1-5' }
            ]
        },
        'Flutamide-Leuprolide': {
            name: 'Flutamide + Leuprolide (Combined androgen blockade)',
            cycles: 12,
            drugs: [
                { name: 'Flutamide', dose: 250, unit: 'mg', schedule: 'three times daily, continuous' },
                { name: 'Leuprolide', dose: 22.5, unit: 'mg', schedule: 'IM D1, every 84 days, continuous' }
            ]
        },
        'Flutamide-Goserelin': {
            name: 'Flutamide + Goserelin (Combined androgen blockade)',
            cycles: 12,
            drugs: [
                { name: 'Flutamide', dose: 250, unit: 'mg', schedule: 'three times daily, continuous' },
                { name: 'Goserelin', dose: 10.8, unit: 'mg', schedule: 'SC D1, every 84 days, continuous' }
            ]
        },
        'Enzalutamide-mCSPC': {
            name: 'Enzalutamide + ADT (ARCHES/ENZAMET) (mCSPC)',
            cycles: 12,
            drugs: [
                { name: 'Enzalutamide', dose: 160, unit: 'mg', schedule: 'daily, continuous' },
                { name: 'ADT (Leuprolide or equivalent)', dose: 22.5, unit: 'mg', schedule: 'IM every 3 months, continuous' }
            ]
        },
        'Enzalutamide-mCRPC': {
            name: 'Enzalutamide (AFFIRM/PREVAIL) (mCRPC)',
            cycles: 12,
            drugs: [
                { name: 'Enzalutamide', dose: 160, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Enzalutamide-M0HSPC': {
            name: 'Enzalutamide ± Leuprolide (EMBARK) (M0 high-risk HSPC)',
            cycles: 12,
            drugs: [
                { name: 'Enzalutamide', dose: 160, unit: 'mg', schedule: 'daily, continuous' },
                { name: 'Leuprolide (optional)', dose: 22.5, unit: 'mg', schedule: 'IM every 3 months, continuous' }
            ]
        },
        'Apalutamide-nmCRPC': {
            name: 'Apalutamide + ADT (SPARTAN) (nmCRPC)',
            cycles: 12,
            drugs: [
                { name: 'Apalutamide', dose: 240, unit: 'mg', schedule: 'daily, continuous' },
                { name: 'ADT (Leuprolide or equivalent)', dose: 22.5, unit: 'mg', schedule: 'IM every 3 months, continuous' }
            ]
        },
        'Apalutamide-mCSPC': {
            name: 'Apalutamide + ADT (TITAN) (mCSPC)',
            cycles: 12,
            drugs: [
                { name: 'Apalutamide', dose: 240, unit: 'mg', schedule: 'daily, continuous' },
                { name: 'ADT (Leuprolide or equivalent)', dose: 22.5, unit: 'mg', schedule: 'IM every 3 months, continuous' }
            ]
        },
        'Darolutamide-nmCRPC': {
            name: 'Darolutamide + ADT (ARAMIS) (nmCRPC)',
            cycles: 12,
            drugs: [
                { name: 'Darolutamide', dose: 600, unit: 'mg', schedule: 'twice daily, continuous' },
                { name: 'ADT (Leuprolide or equivalent)', dose: 22.5, unit: 'mg', schedule: 'IM every 3 months, continuous' }
            ]
        },
        'Olaparib': {
            name: 'Olaparib (PROfound) (mCRPC - HRR gene mutations)',
            cycles: 12,
            drugs: [
                { name: 'Olaparib', dose: 400, unit: 'mg', schedule: 'twice daily, continuous (germline/somatic HRR mutations)' }
            ]
        },
        'Rucaparib': {
            name: 'Rucaparib (TRITON2) (mCRPC - BRCA mutations)',
            cycles: 12,
            drugs: [
                { name: 'Rucaparib', dose: 600, unit: 'mg', schedule: 'twice daily, continuous (BRCA1/2 mutations)' }
            ]
        },
        'Pembrolizumab-Prostate': {
            name: 'Pembrolizumab (mCRPC - MSI-H/dMMR)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days (MSI-H/dMMR)' }
            ]
        },
        'Leuprolide': {
            name: 'Leuprolide (ADT monotherapy)',
            cycles: 12,
            drugs: [
                { name: 'Leuprolide', dose: 22.5, unit: 'mg', schedule: 'IM D1, every 84 days, continuous' }
            ]
        },
        'Leuprolide-Monthly': {
            name: 'Leuprolide monthly (ADT monotherapy)',
            cycles: 12,
            drugs: [
                { name: 'Leuprolide', dose: 7.5, unit: 'mg', schedule: 'IM D1, every 28 days, continuous' }
            ]
        },
        'Goserelin': {
            name: 'Goserelin (ADT monotherapy)',
            cycles: 12,
            drugs: [
                { name: 'Goserelin', dose: 10.8, unit: 'mg', schedule: 'SC D1, every 84 days, continuous' }
            ]
        },
        'Goserelin-Monthly': {
            name: 'Goserelin monthly (ADT monotherapy)',
            cycles: 12,
            drugs: [
                { name: 'Goserelin', dose: 3.6, unit: 'mg', schedule: 'SC D1, every 28 days, continuous' }
            ]
        },
        'Degarelix': {
            name: 'Degarelix (GnRH antagonist)',
            cycles: 12,
            drugs: [
                { name: 'Degarelix', dose: 240, maintenanceDose: 80, unit: 'mg', schedule: 'SC loading dose D1, then 80mg every 28 days', hasLoadingDose: true }
            ]
        },
        'Relugolix': {
            name: 'Relugolix (HERO) (Oral GnRH antagonist)',
            cycles: 12,
            drugs: [
                { name: 'Relugolix', dose: 360, maintenanceDose: 120, unit: 'mg', schedule: 'loading dose D1, then 120mg daily, continuous', hasLoadingDose: true }
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
                { name: 'Nilutamide', dose: 300, maintenanceDose: 150, unit: 'mg', schedule: 'daily x 30 days, then 150mg daily', hasLoadingDose: true }
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
            name: 'Sipuleucel-T (IMPACT) (Immunotherapy)',
            cycles: 1,
            drugs: [
                { name: 'Sipuleucel-T', dose: '50×10⁶', unit: 'autologous CD54+ cells', schedule: '3 infusions D1, D15, D29' }
            ]
        },
        'Paclitaxel-Single': {
            name: 'Paclitaxel (- mCRPC)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        'Docetaxel-Single': {
            name: 'Docetaxel (- mCRPC)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Estramustine': {
            name: 'Estramustine (- mCRPC)',
            cycles: 6,
            drugs: [
                { name: 'Estramustine', dose: 280, unit: 'mg', schedule: 'three times daily, continuous' }
            ]
        },
        'Radium-223': {
            name: 'Radium-223 (ALSYMPCA) (Bone-targeted therapy)',
            cycles: 6,
            drugs: [
                { name: 'Radium-223 dichloride', dose: 55, unit: 'kBq/kg', schedule: 'IV D1, every 28 days (bone metastases)' }
            ]
        },
        'Lutetium-177-PSMA': {
            name: 'Lutetium-177 PSMA-617 (VISION) (PSMA-targeted therapy)',
            cycles: 6,
            drugs: [
                { name: 'Lutetium-177 PSMA-617', dose: 7400, unit: 'MBq', schedule: 'IV D1, every 42 days (PSMA+ mCRPC)' }
            ]
        },
        'Carboplatin-Cabazitaxel': {
            name: 'Carboplatin + Cabazitaxel (Aggressive variant CRPC)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 4', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Cabazitaxel', dose: 20, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Docetaxel-NEPC': {
            name: 'Carboplatin + Docetaxel (Neuroendocrine prostate cancer)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Etoposide-NEPC': {
            name: 'Cisplatin + Etoposide (Neuroendocrine prostate cancer)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' }
            ]
        },
        'Triptorelin': {
            name: 'Triptorelin (ADT monotherapy)',
            cycles: 12,
            drugs: [
                { name: 'Triptorelin', dose: 22.5, unit: 'mg', schedule: 'IM D1, every 84 days, continuous' }
            ]
        },
        'Histrelin': {
            name: 'Histrelin (ADT monotherapy)',
            cycles: 12,
            drugs: [
                { name: 'Histrelin', dose: 50, unit: 'mg', schedule: 'SC implant, every 12 months' }
            ]
        },
        'Orchiectomy': {
            name: 'Bilateral orchiectomy (Surgical castration)',
            cycles: 1,
            drugs: [
                { name: 'Surgical castration', dose: 'N/A', unit: 'procedure', schedule: 'One-time surgical procedure' }
            ]
        }
    },
    renal: {
        'Nivolumab-Ipilimumab': {
            name: 'Nivolumab + Ipilimumab (CheckMate-214) (Metastatic intermediate/poor risk)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 21 days x 4 cycles, then 240mg every 14 days' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 21 days x 4 cycles only' }
            ]
        },
        'Nivolumab-Ipilimumab-Favorable': {
            name: 'Nivolumab + Ipilimumab (CheckMate-214) (Metastatic favorable risk)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 21 days x 4 cycles, then 240mg every 14 days' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 21 days x 4 cycles only' }
            ]
        },
        'Pembrolizumab-Axitinib': {
            name: 'Pembrolizumab + Axitinib (KEYNOTE-426) (Metastatic all risk groups)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days, then 400mg every 42 days' },
                { name: 'Axitinib', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Avelumab-Axitinib': {
            name: 'Avelumab + Axitinib (JAVELIN Renal 101) (Metastatic all risk groups)',
            cycles: 8,
            drugs: [
                { name: 'Avelumab', dose: 800, unit: 'mg', schedule: 'D1, every 14 days' },
                { name: 'Axitinib', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Lenvatinib-Pembrolizumab': {
            name: 'Lenvatinib + Pembrolizumab (CLEAR) (Metastatic all risk groups)',
            cycles: 8,
            drugs: [
                { name: 'Lenvatinib', dose: 20, unit: 'mg', schedule: 'daily, continuous' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days, then 400mg every 42 days' }
            ]
        },
        'Nivolumab-Cabozantinib': {
            name: 'Nivolumab + Cabozantinib (CheckMate-9ER) (Metastatic all risk groups)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days, then 480mg every 28 days' },
                { name: 'Cabozantinib', dose: 40, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Cabozantinib-Nivolumab-Ipilimumab': {
            name: 'Cabozantinib + Nivolumab + Ipilimumab (COSMIC-313) (Metastatic intermediate/poor risk)',
            cycles: 8,
            drugs: [
                { name: 'Cabozantinib', dose: 40, unit: 'mg', schedule: 'daily, continuous' },
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 21 days x 4 cycles, then 240mg every 14 days' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 21 days x 4 cycles only' }
            ]
        },
        'Pembrolizumab-Adjuvant': {
            name: 'Pembrolizumab (KEYNOTE-564) (Adjuvant high-risk clear cell)',
            cycles: 17,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days x 17 cycles (1 year)' }
            ]
        },
        'Lenvatinib-Everolimus': {
            name: 'Lenvatinib + Everolimus (Study 205) (Metastatic second-line)',
            cycles: 8,
            drugs: [
                { name: 'Lenvatinib', dose: 18, unit: 'mg', schedule: 'daily, continuous' },
                { name: 'Everolimus', dose: 5, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Lenvatinib-Belzutifan': {
            name: 'Lenvatinib + Belzutifan (KEYMAKER-U03) (Metastatic second-line)',
            cycles: 8,
            drugs: [
                { name: 'Lenvatinib', dose: 20, unit: 'mg', schedule: 'daily, continuous' },
                { name: 'Belzutifan', dose: 120, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Bevacizumab-Everolimus': {
            name: 'Bevacizumab + Everolimus (Metastatic second-line)',
            cycles: 8,
            drugs: [
                { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'D1, every 14 days' },
                { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Erlotinib-Bevacizumab': {
            name: 'Erlotinib + Bevacizumab (Hereditary leiomyomatosis RCC)',
            cycles: 8,
            drugs: [
                { name: 'Erlotinib', dose: 150, unit: 'mg', schedule: 'daily, continuous' },
                { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'D1, every 14 days' }
            ]
        },
        'Bevacizumab-Interferon': {
            name: 'Bevacizumab + Interferon alfa-2a (Historical metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'D1, every 14 days' },
                { name: 'Interferon alfa-2a', dose: 9, unit: 'MIU', schedule: 'SC 3x/week, continuous' }
            ]
        },
        'Sunitinib': {
            name: 'Sunitinib (Metastatic all risk groups)',
            cycles: 8,
            drugs: [
                { name: 'Sunitinib', dose: 50, unit: 'mg', schedule: 'daily D1-28, then 14 days off (6-week cycle)' }
            ]
        },
        'Sunitinib-Continuous': {
            name: 'Sunitinib continuous (Metastatic all risk groups)',
            cycles: 8,
            drugs: [
                { name: 'Sunitinib', dose: 37.5, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Pazopanib': {
            name: 'Pazopanib (Metastatic all risk groups)',
            cycles: 8,
            drugs: [
                { name: 'Pazopanib', dose: 800, unit: 'mg', schedule: 'daily on empty stomach, continuous' }
            ]
        },
        'Regorafenib': {
            name: 'Regorafenib (Metastatic second-line)',
            cycles: 8,
            drugs: [
                { name: 'Regorafenib', dose: 160, unit: 'mg', schedule: 'daily D1-21, then 7 days off (28-day cycle)' }
            ]
        },
        'Cabozantinib': {
            name: 'Cabozantinib (METEOR) (Metastatic second-line)',
            cycles: 8,
            drugs: [
                { name: 'Cabozantinib', dose: 60, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Nivolumab': {
            name: 'Nivolumab (CheckMate-025) (Metastatic second-line)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days, then 480mg every 28 days' }
            ]
        },
        'Axitinib': {
            name: 'Axitinib (AXIS) (Metastatic second-line)',
            cycles: 8,
            drugs: [
                { name: 'Axitinib', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Sorafenib': {
            name: 'Sorafenib (TARGET) (Metastatic all risk groups)',
            cycles: 8,
            drugs: [
                { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Lenvatinib': {
            name: 'Lenvatinib (Metastatic second-line)',
            cycles: 8,
            drugs: [
                { name: 'Lenvatinib', dose: 24, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Everolimus': {
            name: 'Everolimus (RECORD-1) (Metastatic second-line)',
            cycles: 8,
            drugs: [
                { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Belzutifan': {
            name: 'Belzutifan (von Hippel-Lindau disease)',
            cycles: 8,
            drugs: [
                { name: 'Belzutifan', dose: 120, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Temsirolimus': {
            name: 'Temsirolimus (ARCC) (Metastatic poor-risk)',
            cycles: 8,
            drugs: [
                { name: 'Temsirolimus', dose: 25, unit: 'mg', schedule: 'IV D1, every 7 days' }
            ]
        },
        'Tivozanib': {
            name: 'Tivozanib (TIVO-1) (Metastatic second-line)',
            cycles: 8,
            drugs: [
                { name: 'Tivozanib', dose: 1340, unit: 'mcg', schedule: 'daily D1-21, then 7 days off (28-day cycle)' }
            ]
        },
        'Bevacizumab': {
            name: 'Bevacizumab',
            cycles: 8,
            drugs: [
                { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'D1, every 14 days' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab (Metastatic second-line)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days, then 400mg every 42 days' }
            ]
        },
        'Interleukin-2': {
            name: 'Interleukin-2 (High-dose) (Historical)',
            cycles: 2,
            drugs: [
                { name: 'Interleukin-2 (IL-2)', dose: 600000, unit: 'IU/kg', schedule: 'every 8 hours x 14 doses (cycle 1), then every 8 hours x 14 doses (cycle 2)' }
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
    stem_cell_transplant: {
        // Myeloablative Conditioning (MAC) - Autologous
        'Melphalan-200': {
            name: 'High-Dose Melphalan (MEL-200) - Multiple Myeloma',
            cycles: 1,
            drugs: [
                { name: 'Melphalan', dose: 200, unit: 'mg/m²', schedule: 'single dose D-1 (autologous SCT)', days: 'D-1' }
            ]
        },
        'BEAM': {
            name: 'BEAM - Lymphoma Autologous SCT',
            cycles: 1,
            drugs: [
                { name: 'BCNU (Carmustine)', dose: 300, unit: 'mg/m²', schedule: 'D-6', days: 'D-6' },
                { name: 'Etoposide', dose: 200, unit: 'mg/m²', schedule: 'D-5 to D-2 (q12h x 8 doses)', days: 'D-5 to D-2' },
                { name: 'Cytarabine (Ara-C)', dose: 200, unit: 'mg/m²', schedule: 'D-5 to D-2 (q12h x 8 doses)', days: 'D-5 to D-2' },
                { name: 'Melphalan', dose: 140, unit: 'mg/m²', schedule: 'D-1', days: 'D-1' }
            ]
        },
        'BEAC': {
            name: 'BEAC - Lymphoma Autologous SCT',
            cycles: 1,
            drugs: [
                { name: 'BCNU (Carmustine)', dose: 300, unit: 'mg/m²', schedule: 'D-6', days: 'D-6' },
                { name: 'Etoposide', dose: 200, unit: 'mg/m²', schedule: 'D-5 to D-2 (q12h x 8 doses)', days: 'D-5 to D-2' },
                { name: 'Cytarabine (Ara-C)', dose: 200, unit: 'mg/m²', schedule: 'D-5 to D-2 (q12h x 8 doses)', days: 'D-5 to D-2' },
                { name: 'Cyclophosphamide', dose: 140, unit: 'mg/kg', schedule: 'D-1', days: 'D-1' }
            ]
        },
        'CBV': {
            name: 'CBV - Lymphoma Autologous SCT',
            cycles: 1,
            drugs: [
                { name: 'BCNU (Carmustine)', dose: 300, unit: 'mg/m²', schedule: 'D-6', days: 'D-6' },
                { name: 'Cyclophosphamide', dose: 7200, unit: 'mg/m²', schedule: 'D-5 to D-2 (1800 mg/m² daily)', days: 'D-5 to D-2' },
                { name: 'Mesna (pre-dose)', dose: 1440, unit: 'mg/m²', schedule: 'before Cyclophosphamide, D-5 to D-2 (360 mg/m² daily)', days: 'D-5 to D-2' },
                { name: 'Mesna (4h post)', dose: 1440, unit: 'mg/m²', schedule: '4 hours after Cyclophosphamide, D-5 to D-2 (360 mg/m² daily)', days: 'D-5 to D-2' },
                { name: 'Mesna (8h post)', dose: 1440, unit: 'mg/m²', schedule: '8 hours after Cyclophosphamide, D-5 to D-2 (360 mg/m² daily)', days: 'D-5 to D-2' },
                { name: 'Etoposide', dose: 2400, unit: 'mg/m²', schedule: 'D-5 to D-2 (600 mg/m² daily)', days: 'D-5 to D-2' }
            ]
        },
        'Bu-Cy': {
            name: 'Busulfan + Cyclophosphamide (BuCy) - AML/MDS',
            cycles: 1,
            drugs: [
                { name: 'Busulfan', dose: 3.2, unit: 'mg/kg', schedule: 'D-7 to D-4 (q6h x 16 doses, IV)', days: 'D-7 to D-4' },
                { name: 'Cyclophosphamide', dose: 60, unit: 'mg/kg', schedule: 'D-3, D-2', days: 'D-3, D-2' },
                { name: 'Mesna (pre-dose)', dose: 12, unit: 'mg/kg', schedule: 'before Cyclophosphamide, D-3, D-2', days: 'D-3, D-2' },
                { name: 'Mesna (4h post)', dose: 12, unit: 'mg/kg', schedule: '4 hours after Cyclophosphamide, D-3, D-2', days: 'D-3, D-2' },
                { name: 'Mesna (8h post)', dose: 12, unit: 'mg/kg', schedule: '8 hours after Cyclophosphamide, D-3, D-2', days: 'D-3, D-2' }
            ]
        },
        'Bu-Mel': {
            name: 'Busulfan + Melphalan (BuMel) - AML/MDS',
            cycles: 1,
            drugs: [
                { name: 'Busulfan', dose: 3.2, unit: 'mg/kg', schedule: 'D-5 to D-2 (q6h x 16 doses, IV)', days: 'D-5 to D-2' },
                { name: 'Melphalan', dose: 140, unit: 'mg/m²', schedule: 'D-1', days: 'D-1' }
            ]
        },
        'Bu-Cy-Eto': {
            name: 'Busulfan + Cyclophosphamide + Etoposide - Pediatric',
            cycles: 1,
            drugs: [
                { name: 'Busulfan', dose: 1.1, unit: 'mg/kg', schedule: 'D-9 to D-6 (q6h x 16 doses)', days: 'D-9 to D-6' },
                { name: 'Cyclophosphamide', dose: 50, unit: 'mg/kg', schedule: 'D-5 to D-2', days: 'D-5 to D-2' },
                { name: 'Mesna (pre-dose)', dose: 10, unit: 'mg/kg', schedule: 'before Cyclophosphamide, D-5 to D-2', days: 'D-5 to D-2' },
                { name: 'Mesna (4h post)', dose: 10, unit: 'mg/kg', schedule: '4 hours after Cyclophosphamide, D-5 to D-2', days: 'D-5 to D-2' },
                { name: 'Mesna (8h post)', dose: 10, unit: 'mg/kg', schedule: '8 hours after Cyclophosphamide, D-5 to D-2', days: 'D-5 to D-2' },
                { name: 'Etoposide', dose: 60, unit: 'mg/kg', schedule: 'D-3 (single dose)', days: 'D-3' }
            ]
        },
        
        // Myeloablative Conditioning (MAC) - Allogeneic
        'Bu-Flu': {
            name: 'Busulfan + Fludarabine (BuFlu) - Myeloablative',
            cycles: 1,
            drugs: [
                { name: 'Busulfan', dose: 3.2, unit: 'mg/kg', schedule: 'D-5 to D-2 (q6h x 16 doses, IV)', days: 'D-5 to D-2' },
                { name: 'Fludarabine', dose: 40, unit: 'mg/m²', schedule: 'D-6 to D-2', days: 'D-6 to D-2' }
            ]
        },
        'Cy-TBI': {
            name: 'Cyclophosphamide + TBI (CyTBI) - ALL/AML',
            cycles: 1,
            drugs: [
                { name: 'Cyclophosphamide', dose: 60, unit: 'mg/kg', schedule: 'D-3, D-2', days: 'D-3, D-2' },
                { name: 'Total Body Irradiation (TBI)', dose: 1200, unit: 'cGy', schedule: 'D-1 (fractionated 200 cGy BID)', days: 'D-1' }
            ]
        },
        'Bu-Cy-ATG': {
            name: 'Busulfan + Cyclophosphamide + ATG - Unrelated Donor',
            cycles: 1,
            drugs: [
                { name: 'Busulfan', dose: 3.2, unit: 'mg/kg', schedule: 'D-7 to D-4 (q6h x 16 doses)', days: 'D-7 to D-4' },
                { name: 'Cyclophosphamide', dose: 60, unit: 'mg/kg', schedule: 'D-3, D-2', days: 'D-3, D-2' },
                { name: 'Mesna (pre-dose)', dose: 12, unit: 'mg/kg', schedule: 'before Cyclophosphamide, D-3, D-2', days: 'D-3, D-2' },
                { name: 'Mesna (4h post)', dose: 12, unit: 'mg/kg', schedule: '4 hours after Cyclophosphamide, D-3, D-2', days: 'D-3, D-2' },
                { name: 'Mesna (8h post)', dose: 12, unit: 'mg/kg', schedule: '8 hours after Cyclophosphamide, D-3, D-2', days: 'D-3, D-2' },
                { name: 'Anti-thymocyte Globulin', dose: 2.5, unit: 'mg/kg', schedule: 'D-3, D-2, D-1', days: 'D-3, D-2, D-1' }
            ]
        },
        'Flu-TBI': {
            name: 'Fludarabine + TBI (FluTBI) - ALL',
            cycles: 1,
            drugs: [
                { name: 'Fludarabine', dose: 25, unit: 'mg/m²', schedule: 'D-4 to D-2', days: 'D-4 to D-2' },
                { name: 'Total Body Irradiation (TBI)', dose: 1200, unit: 'cGy', schedule: 'D-1 (fractionated)', days: 'D-1' }
            ]
        },
        
        // Reduced Intensity Conditioning (RIC)
        'Flu-Mel-RIC': {
            name: 'Fludarabine + Melphalan (RIC) - Elderly/Comorbid',
            cycles: 1,
            drugs: [
                { name: 'Fludarabine', dose: 30, unit: 'mg/m²', schedule: 'D-6 to D-2', days: 'D-6 to D-2' },
                { name: 'Melphalan', dose: 140, unit: 'mg/m²', schedule: 'D-1', days: 'D-1' }
            ]
        },
        'Flu-Bu-RIC': {
            name: 'Fludarabine + Busulfan (RIC) - Elderly/Comorbid',
            cycles: 1,
            drugs: [
                { name: 'Fludarabine', dose: 30, unit: 'mg/m²', schedule: 'D-6 to D-2', days: 'D-6 to D-2' },
                { name: 'Busulfan', dose: 0.8, unit: 'mg/kg', schedule: 'D-3, D-2 (q6h x 8 doses)', days: 'D-3, D-2' }
            ]
        },
        'Flu-Cy-TBI-RIC': {
            name: 'Fludarabine + Cyclophosphamide + Low-dose TBI (RIC)',
            cycles: 1,
            drugs: [
                { name: 'Fludarabine', dose: 30, unit: 'mg/m²', schedule: 'D-4 to D-2', days: 'D-4 to D-2' },
                { name: 'Cyclophosphamide', dose: 50, unit: 'mg/kg', schedule: 'D-1', days: 'D-1' },
                { name: 'Total Body Irradiation (TBI)', dose: 200, unit: 'cGy', schedule: 'D0 (single fraction)', days: 'D0' }
            ]
        },
        'Flu-Mel-Alemtuzumab': {
            name: 'Fludarabine + Melphalan + Alemtuzumab (RIC)',
            cycles: 1,
            drugs: [
                { name: 'Fludarabine', dose: 30, unit: 'mg/m²', schedule: 'D-7 to D-3', days: 'D-7 to D-3' },
                { name: 'Melphalan', dose: 140, unit: 'mg/m²', schedule: 'D-2', days: 'D-2' },
                { name: 'Alemtuzumab', dose: 20, unit: 'mg', schedule: 'D-8 to D-4', days: 'D-8 to D-4' }
            ]
        },
        
        // Non-Myeloablative (NMA)
        'Flu-Cy-NMA': {
            name: 'Fludarabine + Cyclophosphamide (Non-myeloablative)',
            cycles: 1,
            drugs: [
                { name: 'Fludarabine', dose: 30, unit: 'mg/m²', schedule: 'D-4 to D-2', days: 'D-4 to D-2' },
                { name: 'Cyclophosphamide', dose: 50, unit: 'mg/kg', schedule: 'D-1', days: 'D-1' }
            ]
        },
        'TBI-NMA': {
            name: 'Low-dose TBI (Non-myeloablative)',
            cycles: 1,
            drugs: [
                { name: 'Total Body Irradiation (TBI)', dose: 200, unit: 'cGy', schedule: 'D0 (single fraction)', days: 'D0' }
            ]
        },
        
        // Haploidentical Conditioning
        'PT-Cy': {
            name: 'Post-Transplant Cyclophosphamide (Haploidentical)',
            cycles: 1,
            drugs: [
                { name: 'Cyclophosphamide', dose: 50, unit: 'mg/kg', schedule: 'D+3, D+4 (post-transplant)', days: 'D+3, D+4' },
                { name: 'Mycophenolate Mofetil', dose: 15, unit: 'mg/kg', schedule: 'D+5 to D+35 (BID)', days: 'D+5 to D+35' },
                { name: 'Tacrolimus', dose: 0.02, unit: 'mg/kg', schedule: 'D+5 to D+180 (target 5-15 ng/mL)', days: 'D+5 to D+180' }
            ]
        },
        'Flu-Cy-TBI-Haplo': {
            name: 'Fludarabine + Cyclophosphamide + TBI (Haploidentical)',
            cycles: 1,
            drugs: [
                { name: 'Fludarabine', dose: 30, unit: 'mg/m²', schedule: 'D-6 to D-2', days: 'D-6 to D-2' },
                { name: 'Cyclophosphamide', dose: 14.5, unit: 'mg/kg', schedule: 'D-6, D-5', days: 'D-6, D-5' },
                { name: 'Total Body Irradiation (TBI)', dose: 400, unit: 'cGy', schedule: 'D-1 (single fraction)', days: 'D-1' }
            ]
        },
        
        // Alternative/Specialized Regimens
        'Thiotepa-Busulfan-Flu': {
            name: 'Thiotepa + Busulfan + Fludarabine (TBF)',
            cycles: 1,
            drugs: [
                { name: 'Thiotepa', dose: 5, unit: 'mg/kg', schedule: 'D-7, D-6', days: 'D-7, D-6' },
                { name: 'Busulfan', dose: 3.2, unit: 'mg/kg', schedule: 'D-5 to D-3 (q6h x 12 doses)', days: 'D-5 to D-3' },
                { name: 'Fludarabine', dose: 40, unit: 'mg/m²', schedule: 'D-6 to D-3', days: 'D-6 to D-3' }
            ]
        },
        'Treosulfan-Fludarabine': {
            name: 'Treosulfan + Fludarabine (TreoFlu)',
            cycles: 1,
            drugs: [
                { name: 'Treosulfan', dose: 14, unit: 'g/m²', schedule: 'D-6 to D-4', days: 'D-6 to D-4' },
                { name: 'Fludarabine', dose: 30, unit: 'mg/m²', schedule: 'D-6 to D-2', days: 'D-6 to D-2' }
            ]
        },
        'FLAMSA-RIC': {
            name: 'FLAMSA-RIC (Sequential Conditioning)',
            cycles: 1,
            drugs: [
                { name: 'Fludarabine', dose: 30, unit: 'mg/m²', schedule: 'D-12 to D-9, D-6 to D-2', days: 'D-12 to D-9, D-6 to D-2' },
                { name: 'Cytarabine (Ara-C)', dose: 2000, unit: 'mg/m²', schedule: 'D-12 to D-9', days: 'D-12 to D-9' },
                { name: 'Amsacrine', dose: 100, unit: 'mg/m²', schedule: 'D-12 to D-9', days: 'D-12 to D-9' },
                { name: 'ATG or Alemtuzumab', dose: 10, unit: 'mg/kg', schedule: 'D-8 to D-6', days: 'D-8 to D-6' }
            ]
        }
    },
    testicular: {
        'BEP': {
            name: 'BEP (Bleomycin + Etoposide + Cisplatin) (Good risk/Intermediate risk/Poor risk/Adjuvant)',
            cycles: '3-4',
            drugs: [
                { name: 'Bleomycin', dose: 30, unit: 'units', schedule: 'D1, D8, D15 every 21 days' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' }
            ]
        },
        'EP': {
            name: 'EP (Etoposide + Cisplatin) - Good risk (Adjuvant)',
            cycles: 4,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' }
            ]
        },
        'Carboplatin-Single': {
            name: 'Carboplatin (- Stage I seminoma) (Adjuvant)',
            cycles: 1,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 7', unit: 'AUC', schedule: 'single dose' }
            ]
        },
        'VIP': {
            name: 'VIP (Etoposide + Ifosfamide + Cisplatin) - Intermediate risk (Adjuvant)',
            cycles: 4,
            drugs: [
                { name: 'Etoposide', dose: 75, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Mesna (pre-dose)', dose: 240, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D5 every 21 days' },
                { name: 'Mesna (4h post)', dose: 480, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D5 every 21 days' },
                { name: 'Mesna (8h post)', dose: 480, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D5 every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' }
            ]
        },
        'TIP': {
            name: 'TIP (Paclitaxel + Ifosfamide + Cisplatin) - Salvage (Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Paclitaxel', dose: 250, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Ifosfamide', dose: 1500, unit: 'mg/m²', schedule: 'D2-D5 every 21 days' },
                { name: 'Mesna (pre-dose)', dose: 300, unit: 'mg/m²', schedule: 'before Ifosfamide, D2-D5 every 21 days' },
                { name: 'Mesna (4h post)', dose: 600, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D2-D5 every 21 days' },
                { name: 'Mesna (8h post)', dose: 600, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D2-D5 every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D2-D5 every 21 days' }
            ]
        },
        'VeIP': {
            name: 'VeIP (Vinblastine + Ifosfamide + Cisplatin) - Salvage (Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Vinblastine', dose: 0.11, unit: 'mg/kg', schedule: 'D1-D2 every 21 days' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Mesna (pre-dose)', dose: 240, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D5 every 21 days' },
                { name: 'Mesna (4h post)', dose: 480, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D5 every 21 days' },
                { name: 'Mesna (8h post)', dose: 480, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D5 every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' }
            ]
        },
        'PVB': {
            name: 'PVB (Cisplatin + Vinblastine + Bleomycin) - Historical (Adjuvant)',
            cycles: 3,
            drugs: [
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Vinblastine', dose: 0.15, unit: 'mg/kg', schedule: 'D1-D2 every 21 days' },
                { name: 'Bleomycin', dose: 30, unit: 'units', schedule: 'D1, D8, D15 every 21 days' }
            ]
        },
        'VAB-6': {
            name: 'VAB-6 (Vinblastine + Actinomycin D + Bleomycin + Cisplatin + Cyclophosphamide) - Historical (Adjuvant)',
            cycles: 3,
            drugs: [
                { name: 'Vinblastine', dose: 4, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Actinomycin D', dose: 1, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Bleomycin', dose: 30, unit: 'units', schedule: 'D1, D8, D15 every 21 days' },
                { name: 'Cisplatin', dose: 120, unit: 'mg/m²', schedule: 'D4 every 21 days' },
                { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Paclitaxel-Gemcitabine': {
            name: 'Paclitaxel + Gemcitabine (Salvage) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, D8, D15 every 28 days' },
                { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', schedule: 'D1, D8, D15 every 28 days' }
            ]
        },
        'Paclitaxel-Gemcitabine-Oxaliplatin': {
            name: 'Paclitaxel + Gemcitabine + Oxaliplatin (Salvage) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, D8 every 21 days' },
                { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', schedule: 'D1, D8 every 21 days' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Gemcitabine-Oxaliplatin': {
            name: 'Gemcitabine + Oxaliplatin (Salvage) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8 every 21 days' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Etoposide-Single': {
            name: 'Etoposide (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' }
            ]
        },
        
        // High-dose Chemotherapy
        'Carboplatin-Etoposide-HD': {
            name: 'Carboplatin + Etoposide (High-dose) (Metastatic)',
            cycles: 3,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 7', unit: 'AUC', schedule: 'D1-D3 every 21 days' },
                { name: 'Etoposide', dose: 750, unit: 'mg/m²', schedule: 'D1-D3 every 21 days' }
            ]
        },
        
        // Standard dose Carboplatin + Etoposide
        'Carboplatin-Etoposide': {
            name: 'Carboplatin + Etoposide (Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1 every 21 days' },
                { name: 'Etoposide', dose: 120, unit: 'mg/m²', schedule: 'D1-D3 every 21 days' }
            ]
        },
        
        // Paclitaxel + Ifosfamide + Carboplatin + Etoposide (PICE)
        'PICE': {
            name: 'Paclitaxel + Ifosfamide + Carboplatin + Etoposide (PICE) (Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Ifosfamide', dose: 1500, unit: 'mg/m²', schedule: 'D1-D3 every 21 days' },
                { name: 'Mesna', dose: 1500, unit: 'mg/m²', schedule: '300 mg/m² before Ifosfamide, then 600 mg/m² at 4h and 8h post-Ifosfamide, D1-D3 every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1 every 21 days' },
                { name: 'Etoposide', dose: 120, unit: 'mg/m²', schedule: 'D1-D3 every 21 days' }
            ]
        },
        
        // Pembrolizumab for select cases
        'Pembrolizumab': {
            name: 'Pembrolizumab (MSI-H/dMMR/TMB-H) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1 every 21 days' }
            ]
        },
        
        // Oral Etoposide
        'Etoposide-Oral': {
            name: 'Etoposide (Oral) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Etoposide (oral)', dose: 50, unit: 'mg', schedule: 'twice daily D1-D10 every 21 days' }
            ]
        }
    },
    sarcoma: {
        'AD': {
            name: 'AD (Doxorubicin + Dacarbazine) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Dacarbazine', dose: 1000, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'AIM': {
            name: 'AIM (Doxorubicin + Ifosfamide + Mesna) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 25, unit: 'mg/m²', schedule: 'D1-D3 every 21 days' },
                { name: 'Ifosfamide', dose: 2500, unit: 'mg/m²', schedule: 'D1-D4 every 21 days' },
                { name: 'Mesna (pre-dose)', dose: 500, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D4 every 21 days' },
                { name: 'Mesna (4h post)', dose: 1000, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D4 every 21 days' },
                { name: 'Mesna (8h post)', dose: 1000, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D4 every 21 days' }
            ]
        },
        'MAID': {
            name: 'MAID (Mesna + Doxorubicin + Ifosfamide + Dacarbazine) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Mesna', dose: 2500, unit: 'mg/m²', schedule: 'D1-D4 every 21 days (uroprotection)' },
                { name: 'Doxorubicin', dose: 20, unit: 'mg/m²', schedule: 'D1-D3 every 21 days' },
                { name: 'Ifosfamide', dose: 2500, unit: 'mg/m²', schedule: 'D1-D3 every 21 days' },
                { name: 'Dacarbazine', dose: 300, unit: 'mg/m²', schedule: 'D1-D3 every 21 days' }
            ]
        },
        'CYVADIC': {
            name: 'CYVADIC (Cyclophosphamide + Vincristine + Doxorubicin + Dacarbazine) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D1, D8 every 21 days (max 2mg)' },
                { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Dacarbazine', dose: 250, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' }
            ]
        },
        'IAP': {
            name: 'IAP (Ifosfamide + Doxorubicin + Cisplatin) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 1800, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Mesna (pre-dose)', dose: 360, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D5 every 21 days' },
                { name: 'Mesna (4h post)', dose: 720, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D5 every 21 days' },
                { name: 'Mesna (8h post)', dose: 720, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D5 every 21 days' },
                { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' }
            ]
        },
        'IAC': {
            name: 'IAC (Ifosfamide + Actinomycin + Cisplatin) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 1800, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Mesna (pre-dose)', dose: 360, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D5 every 21 days' },
                { name: 'Mesna (4h post)', dose: 720, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D5 every 21 days' },
                { name: 'Mesna (8h post)', dose: 720, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D5 every 21 days' },
                { name: 'Actinomycin D', dose: 0.5, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' }
            ]
        },
        'AP': {
            name: 'AP (Doxorubicin + Cisplatin) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Gemcitabine-Docetaxel': {
            name: 'Gemcitabine + Docetaxel (Leiomyosarcoma/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 900, unit: 'mg/m²', schedule: 'D1, D8 every 21 days' },
                { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D8 every 21 days' }
            ]
        },
        'Gemcitabine-Vinorelbine': {
            name: 'Gemcitabine + Vinorelbine (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', schedule: 'D1, D8 every 21 days' },
                { name: 'Vinorelbine', dose: 25, unit: 'mg/m²', schedule: 'D1, D8 every 21 days' }
            ]
        },
        'Doxorubicin': {
            name: 'Doxorubicin (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Ifosfamide': {
            name: 'Ifosfamide (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 3000, unit: 'mg/m²', schedule: 'D1-D3 every 21 days' },
                { name: 'Mesna', dose: 600, unit: 'mg/m²', schedule: '120 mg/m² before Ifosfamide, then 240 mg/m² at 4h and 8h post-Ifosfamide, D1-D3 every 21 days' }
            ]
        },
        'Gemcitabine': {
            name: 'Gemcitabine (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15 every 28 days' }
            ]
        },
        'Doxorubicin-Liposomal': {
            name: 'Doxorubicin liposomal (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin liposomal', dose: 50, unit: 'mg/m²', schedule: 'D1 every 28 days' }
            ]
        },
        'Pazopanib': {
            name: 'Pazopanib (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pazopanib', dose: 800, unit: 'mg', schedule: 'daily on empty stomach continuously' }
            ]
        },
        'Trabectedin': {
            name: 'Trabectedin (Liposarcoma/Leiomyosarcoma/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Trabectedin', dose: 1.5, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Eribulin': {
            name: 'Eribulin (Liposarcoma/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Eribulin', dose: 1.4, unit: 'mg/m²', schedule: 'D1, D8 every 21 days' }
            ]
        },
        'Tazemetostat': {
            name: 'Tazemetostat (EZH2 inhibitor) (Epithelioid sarcoma/Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Tazemetostat', dose: 800, unit: 'mg', schedule: 'twice daily continuously' }
            ]
        },
        'Pexidartinib': {
            name: 'Pexidartinib (CSF1R inhibitor) (Tenosynovial Giant Cell Tumor/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pexidartinib', dose: 400, unit: 'mg', schedule: 'twice daily continuously' }
            ]
        },
        'Atezolizumab': {
            name: 'Atezolizumab (PD-L1 inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Atezolizumab', dose: 840, unit: 'mg', schedule: 'D1 every 14 days, then 1200mg every 21 days' }
            ]
        },
        
        // Additional Single Agent Regimens
        'Epirubicin': {
            name: 'Epirubicin (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Ifosfamide-Epirubicin': {
            name: 'Ifosfamide + Epirubicin (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 2000, unit: 'mg/m²', schedule: 'D1-D3 every 21 days' },
                { name: 'Epirubicin', dose: 60, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Mesna (pre-dose)', dose: 400, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D3 every 21 days' },
                { name: 'Mesna (4h post)', dose: 800, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D3 every 21 days' },
                { name: 'Mesna (8h post)', dose: 800, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D3 every 21 days' }
            ]
        },
        'Trabectedin-Doxorubicin': {
            name: 'Trabectedin + Doxorubicin (Liposarcoma/Leiomyosarcoma/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Trabectedin', dose: 1.1, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Gemcitabine-Dacarbazine': {
            name: 'Gemcitabine + Dacarbazine (Leiomyosarcoma/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8 every 21 days' },
                { name: 'Dacarbazine', dose: 500, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        
        // Pediatric Regimens
        'VAC': {
            name: 'VAC (Vincristine + Actinomycin D + Cyclophosphamide) (Rhabdomyosarcoma/Neoadjuvant/Adjuvant)',
            cycles: 12,
            drugs: [
                { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D1 every 21 days (max 2mg)' },
                { name: 'Actinomycin D', dose: 0.015, unit: 'mg/kg', schedule: 'D1 every 21 days' },
                { name: 'Cyclophosphamide', dose: 2200, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Mesna (pre-dose)', dose: 440, unit: 'mg/m²', schedule: 'before Cyclophosphamide, D1 every 21 days' },
                { name: 'Mesna (4h post)', dose: 440, unit: 'mg/m²', schedule: '4 hours after Cyclophosphamide, D1 every 21 days' },
                { name: 'Mesna (8h post)', dose: 440, unit: 'mg/m²', schedule: '8 hours after Cyclophosphamide, D1 every 21 days' }
            ]
        },
        'Cyclophosphamide-Topotecan': {
            name: 'Cyclophosphamide + Topotecan (Rhabdomyosarcoma/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 250, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Topotecan', dose: 0.75, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' }
            ]
        },
        'Vincristine-Irinotecan-Temozolomide': {
            name: 'Vincristine + Irinotecan + Temozolomide (VIT) (Rhabdomyosarcoma/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D1, D8 every 21 days (max 2mg)' },
                { name: 'Irinotecan', dose: 50, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Temozolomide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' }
            ]
        },
        'Vinorelbine': {
            name: 'Vinorelbine (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Vinorelbine', dose: 30, unit: 'mg/m²', schedule: 'D1, D8 every 21 days' }
            ]
        },
        'Docetaxel': {
            name: 'Docetaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        
        // Immunotherapy Regimens
        'Pembrolizumab': {
            name: 'Pembrolizumab (TMB-H) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1 every 21 days' }
            ]
        },
        'Pembrolizumab-Axitinib': {
            name: 'Pembrolizumab + Axitinib (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1 every 21 days' },
                { name: 'Axitinib', dose: 5, unit: 'mg', schedule: 'twice daily continuously' }
            ]
        },
        'Ipilimumab-Nivolumab': {
            name: 'Ipilimumab + Nivolumab (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1 every 6 weeks' },
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'D1 every 14 days' }
            ]
        },
        'Bevacizumab': {
            name: 'Bevacizumab (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1 every 21 days' }
            ]
        },
        
        // Targeted Therapy - Histology Specific
        'Imatinib-DFSP': {
            name: 'Imatinib (DFSP) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Imatinib', dose: 400, unit: 'mg', schedule: 'daily continuously' }
            ]
        },
        'Larotrectinib': {
            name: 'Larotrectinib (NTRK fusion-positive) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Larotrectinib', dose: 100, unit: 'mg', schedule: 'twice daily continuously' }
            ]
        },
        'Entrectinib': {
            name: 'Entrectinib (NTRK fusion-positive) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'daily continuously' }
            ]
        },
        'Repotrectinib': {
            name: 'Repotrectinib (NTRK fusion-positive) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Repotrectinib', dose: 160, unit: 'mg', schedule: 'daily continuously' }
            ]
        },
        'Crizotinib': {
            name: 'Crizotinib (ALK-positive) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Crizotinib', dose: 250, unit: 'mg', schedule: 'twice daily continuously' }
            ]
        },
        'Alectinib': {
            name: 'Alectinib (ALK-positive) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Alectinib', dose: 600, unit: 'mg', schedule: 'twice daily continuously' }
            ]
        },
        'Brigatinib': {
            name: 'Brigatinib (ALK-positive) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Brigatinib', dose: 180, unit: 'mg', schedule: 'daily continuously (after 7-day lead-in at 90mg)' }
            ]
        },
        'Sirolimus': {
            name: 'Sirolimus (PEComa) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Sirolimus', dose: 2, unit: 'mg', schedule: 'daily continuously' }
            ]
        },
        'Temsirolimus': {
            name: 'Temsirolimus (PEComa) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Temsirolimus', dose: 25, unit: 'mg', schedule: 'IV weekly' }
            ]
        },
        'Everolimus': {
            name: 'Everolimus (PEComa) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'daily continuously' }
            ]
        },
        'Nirogacestat': {
            name: 'Nirogacestat (Desmoid tumors) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Nirogacestat', dose: 150, unit: 'mg', schedule: 'twice daily continuously' }
            ]
        },
        
        // Rare Sarcoma Subtypes
        'Carboplatin-Paclitaxel-Bevacizumab': {
            name: 'Paclitaxel + Carboplatin + Bevacizumab (Angiosarcoma) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1 every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1 every 21 days' }
            ]
        },
        'Propranolol': {
            name: 'Propranolol (Angiosarcoma) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Propranolol', dose: 40, unit: 'mg', schedule: 'twice daily continuously' }
            ]
        },
        'Sorafenib': {
            name: 'Sorafenib (Epithelioid Hemangioendothelioma) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'twice daily continuously' }
            ]
        },
        'Sunitinib-SFT': {
            name: 'Sunitinib (Solitary Fibrous Tumor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Sunitinib', dose: 50, unit: 'mg', schedule: 'daily for 4 weeks, then 2 weeks off' }
            ]
        },
        'Temozolomide': {
            name: 'Temozolomide (Extraskeletal Myxoid Chondrosarcoma) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 150, unit: 'mg/m²', schedule: 'D1-D5 every 28 days' }
            ]
        }
    },
    hepatocellular: {
        // METASTATIC THERAPY - First-Line (Most Common)
        'Atezolizumab-Bevacizumab': {
            name: 'Atezolizumab (PD-L1 inhibitor) + Bevacizumab (VEGF inhibitor) (IMbrave150) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Durvalumab-Tremelimumab': {
            name: 'Durvalumab (PD-L1 inhibitor) + Tremelimumab (CTLA-4 inhibitor) (HIMALAYA) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 28 days' },
                { name: 'Tremelimumab', dose: 300, unit: 'mg', schedule: 'D1, cycle 1 only (single dose)' }
            ]
        },
        'Sorafenib': {
            name: 'Sorafenib (multi-kinase inhibitor) (SHARP) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'PO twice daily, continuous' }
            ]
        },
        'Lenvatinib': {
            name: 'Lenvatinib (multi-kinase inhibitor) (REFLECT) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Lenvatinib', dose: 12, unit: 'mg', schedule: 'PO once daily (≥60kg) or 8mg daily (<60kg)' }
            ]
        },

        // METASTATIC THERAPY - Second-Line  
        'Cabozantinib': {
            name: 'Cabozantinib (multi-kinase inhibitor) (CELESTIAL) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Cabozantinib', dose: 60, unit: 'mg', schedule: 'PO once daily, continuous' }
            ]
        },
        'Regorafenib': {
            name: 'Regorafenib (multi-kinase inhibitor) (RESORCE) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Regorafenib', dose: 160, unit: 'mg', schedule: 'PO once daily D1-21, then 7 days off, every 28 days' }
            ]
        },
        'Ramucirumab': {
            name: 'Ramucirumab (VEGFR-2 inhibitor) (REACH-2) (AFP ≥400 ng/mL) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'D1, every 14 days' }
            ]
        },

        // METASTATIC THERAPY - Immunotherapy Combinations
        'Ipilimumab-Nivolumab': {
            name: 'Ipilimumab (CTLA-4 inhibitor) + Nivolumab (PD-1 inhibitor) (CheckMate-040) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Ipilimumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 21 days x 4 cycles' },
                { name: 'Nivolumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 21 days x 4 cycles, then 240mg every 14 days' }
            ]
        },

        // METASTATIC THERAPY - Immunotherapy Monotherapy
        'Nivolumab-Monotherapy': {
            name: 'Nivolumab monotherapy (PD-1 inhibitor) (CheckMate-040) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days or 480mg every 28 days' }
            ]
        },
        'Pembrolizumab-Monotherapy': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (KEYNOTE-224) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Durvalumab-Monotherapy': {
            name: 'Durvalumab monotherapy (PD-L1 inhibitor) (HIMALAYA) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 28 days' }
            ]
        },
        'Tislelizumab-Monotherapy': {
            name: 'Tislelizumab monotherapy (PD-1 inhibitor) (RATIONALE-301) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Tislelizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },

        // METASTATIC THERAPY - Other Targeted Therapies
        'Donafenib': {
            name: 'Donafenib (multi-kinase inhibitor) (ZGDH3) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Donafenib', dose: 200, unit: 'mg', schedule: 'PO twice daily, continuous' }
            ]
        },
        'Apatinib': {
            name: 'Apatinib (VEGFR-2 inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Apatinib', dose: 500, unit: 'mg', schedule: 'PO once daily, continuous' }
            ]
        },

        // LOCOREGIONAL THERAPY
        'GEMOX-Locoregional': {
            name: 'Gemcitabine + Oxaliplatin (GEMOX) (Locoregional)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' }
            ]
        },
        'FOLFOX4-Locoregional': {
            name: 'FOLFOX4 (Oxaliplatin + 5-FU + Leucovorin) (Locoregional)',
            cycles: 6,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 600, unit: 'mg/m²', schedule: 'CI over 22 hours D1-D2, every 14 days' }
            ]
        },
        'Doxorubicin-TACE': {
            name: 'Doxorubicin (TACE) (Locoregional)',
            cycles: 4,
            drugs: [
                { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'Intra-arterial, every 6-8 weeks' }
            ]
        }
    },
    bone: {
        osteosarcoma: {
            'AP': {
                name: 'Adriamycin + Cisplatin (AP) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 25, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                    { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'MAP-EURAMOS-Neoadjuvant': {
                name: 'Methotrexate + Adriamycin + Cisplatin (MAP) (EURAMOS-1) (Neoadjuvant)',
                cycles: 10,
                drugs: [
                    { name: 'Methotrexate (HD)', dose: 12000, unit: 'mg/m²', schedule: 'Week 1, 3, 4, 6, 7, 9, 10 - IV over 4 hours (with leucovorin rescue)' },
                    { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'Week 2, 5, 8 - D1' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 25, unit: 'mg/m²', schedule: 'Week 2, 5, 8 - D1-D3' },
                    { name: 'Leucovorin', dose: 15, unit: 'mg/m²', schedule: '15 mg/m² start 24 hours after MTX, every 6 hours until serum MTX <0.1 µmol/L' }
                ]
            },
            'MAP-EURAMOS-Adjuvant': {
                name: 'Methotrexate + Adriamycin + Cisplatin (MAP) (EURAMOS-1) (Adjuvant)',
                cycles: 19,
                drugs: [
                    { name: 'Methotrexate (HD)', dose: 12000, unit: 'mg/m²', schedule: 'Week 11, 13, 14, 16, 17, 19, 20 - IV over 4 hours (with leucovorin rescue)' },
                    { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'Week 12, 15, 18 - D1' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 25, unit: 'mg/m²', schedule: 'Week 12, 15, 18 - D1-D3' },
                    { name: 'Leucovorin', dose: 15, unit: 'mg/m²', schedule: '15 mg/m² start 24 hours after MTX, every 6 hours until serum MTX <0.1 µmol/L' }
                ]
            },
            'IAP': {
                name: 'Ifosfamide + Adriamycin + Cisplatin (IAP) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Ifosfamide', dose: 1800, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Mesna (pre-dose)', dose: 360, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D5, every 21 days' },
                    { name: 'Mesna (4h post)', dose: 720, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D5, every 21 days' },
                    { name: 'Mesna (8h post)', dose: 720, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D5, every 21 days' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 25, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                    { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'HD-MTX': {
                name: 'High-Dose Methotrexate (HD-MTX) (Neoadjuvant/Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Methotrexate (HD)', dose: 12000, unit: 'mg/m²', schedule: 'D1, every 14 days (with leucovorin rescue)' },
                    { name: 'Leucovorin', dose: 15, unit: 'mg/m²', schedule: '15 mg/m² start 24 hours after MTX, every 6 hours until serum MTX <0.1 µmol/L' }
                ]
            },
            'Gemcitabine-Docetaxel': {
                name: 'Gemcitabine + Docetaxel (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 675, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D8, every 21 days' }
                ]
            },
            'Sorafenib': {
                name: 'Sorafenib (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'PO twice daily continuously' }
                ]
            },
            'Cyclophosphamide-Etoposide': {
                name: 'Cyclophosphamide + Etoposide (CE) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'Cabozantinib': {
                name: 'Cabozantinib (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Cabozantinib', dose: 60, unit: 'mg', schedule: 'PO once daily continuously' }
                ]
            },
            'Sorafenib-Everolimus': {
                name: 'Sorafenib + Everolimus (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'PO twice daily continuously' },
                    { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'PO once daily continuously' }
                ]
            },
            'Cyclophosphamide-Topotecan': {
                name: 'Cyclophosphamide + Topotecan (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 250, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Topotecan', dose: 0.75, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'Ifosfamide-Carboplatin-Etoposide': {
                name: 'Ifosfamide + Carboplatin + Etoposide (ICE) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Ifosfamide', dose: 1800, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Mesna (pre-dose)', dose: 360, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D5, every 21 days' },
                    { name: 'Mesna (4h post)', dose: 720, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D5, every 21 days' },
                    { name: 'Mesna (8h post)', dose: 720, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D5, every 21 days' }
                ]
            },
            'HDMTX-Etoposide-Ifosfamide': {
                name: 'High-Dose Methotrexate + Etoposide + Ifosfamide (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Methotrexate (HD)', dose: 12000, unit: 'mg/m²', schedule: 'D1, every 21 days (with leucovorin rescue)' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Ifosfamide', dose: 1800, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Leucovorin', dose: 15, unit: 'mg/m²', schedule: '15 mg/m² start 24 hours after MTX, every 6 hours until serum MTX <0.1 µmol/L' },
                    { name: 'Mesna (pre-dose)', dose: 360, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D5, every 21 days' },
                    { name: 'Mesna (4h post)', dose: 720, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D5, every 21 days' },
                    { name: 'Mesna (8h post)', dose: 720, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D5, every 21 days' }
                ]
            }
        },
        chordoma: {
            'Imatinib': {
                name: 'Imatinib (Recurrent/Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Imatinib', dose: 400, unit: 'mg', schedule: 'PO once daily continuously' }
                ]
            },
            'Dasatinib': {
                name: 'Dasatinib (Recurrent/Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Dasatinib', dose: 100, unit: 'mg', schedule: 'PO once daily continuously' }
                ]
            },
            'Sunitinib': {
                name: 'Sunitinib (Recurrent/Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Sunitinib', dose: 50, unit: 'mg', schedule: 'PO once daily D1-D28, every 42 days (4 weeks on, 2 weeks off)' }
                ]
            },
            'Imatinib-Cisplatin': {
                name: 'Imatinib + Cisplatin (Recurrent/Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Imatinib', dose: 400, unit: 'mg', schedule: 'PO once daily continuously' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Imatinib-Sirolimus': {
                name: 'Imatinib + Sirolimus (Recurrent/Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Imatinib', dose: 400, unit: 'mg', schedule: 'PO once daily continuously' },
                    { name: 'Sirolimus', dose: 2, unit: 'mg', schedule: 'PO once daily continuously' }
                ]
            },
            'Erlotinib': {
                name: 'Erlotinib (Recurrent/Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Erlotinib', dose: 150, unit: 'mg', schedule: 'PO once daily continuously' }
                ]
            },
            'Lapatinib': {
                name: 'Lapatinib (EGFR positive) (Recurrent/Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Lapatinib', dose: 1500, unit: 'mg', schedule: 'PO once daily continuously (EGFR positive)' }
                ]
            },
            'Sorafenib': {
                name: 'Sorafenib (Recurrent/Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'PO twice daily continuously' }
                ]
            }
        },
        ewings_sarcoma: {
            'VDC-IE': {
                name: 'Vincristine + Dactinomycin + Cyclophosphamide/Ifosfamide + Etoposide Alternating (VDC/IE) (EE2012) (Neoadjuvant/Adjuvant)',
                cycles: 14,
                drugs: [
                    { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Dactinomycin', dose: 1.25, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 1200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Mesna (for cyclophosphamide)', dose: 240, unit: 'mg/m²', schedule: 'every 4 hours x 3 doses on D1, every 21 days' },
                    { name: 'Ifosfamide', dose: 1800, unit: 'mg/m²', schedule: 'D1-D5, every 21 days (alternating)' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5, every 21 days (alternating)' },
                    { name: 'Mesna (pre-dose)', dose: 360, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D5, every 21 days (alternating)' },
                    { name: 'Mesna (4h post)', dose: 720, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D5, every 21 days (alternating)' },
                    { name: 'Mesna (8h post)', dose: 720, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D5, every 21 days (alternating)' }
                ]
            },
            'VAC-IE': {
                name: 'Vincristine + Doxorubicin + Cyclophosphamide/Ifosfamide + Etoposide Alternating (VAC/IE) (Neoadjuvant/Adjuvant/Relapsed/Refractory)',
                cycles: 14,
                drugs: [
                    { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 1200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Mesna (for cyclophosphamide)', dose: 240, unit: 'mg/m²', schedule: 'every 4 hours x 3 doses on D1, every 21 days' },
                    { name: 'Ifosfamide', dose: 1800, unit: 'mg/m²', schedule: 'D1-D5, every 21 days (alternating)' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5, every 21 days (alternating)' },
                    { name: 'Mesna (pre-dose)', dose: 360, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D5, every 21 days (alternating)' },
                    { name: 'Mesna (4h post)', dose: 720, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D5, every 21 days (alternating)' },
                    { name: 'Mesna (8h post)', dose: 720, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D5, every 21 days (alternating)' }
                ]
            },
            'VAC': {
                name: 'Vincristine + Doxorubicin + Cyclophosphamide (VAC) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 1200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Mesna (for cyclophosphamide)', dose: 240, unit: 'mg/m²', schedule: 'every 4 hours x 3 doses on D1, every 21 days' }
                ]
            },
            'VDC': {
                name: 'Vincristine + Dactinomycin + Cyclophosphamide (VDC) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Dactinomycin', dose: 1.25, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 1200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Mesna (for cyclophosphamide)', dose: 240, unit: 'mg/m²', schedule: 'every 4 hours x 3 doses on D1, every 21 days' }
                ]
            },
            'IE': {
                name: 'Ifosfamide + Etoposide (IE) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Ifosfamide', dose: 1800, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Mesna (pre-dose)', dose: 360, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D5, every 21 days' },
                    { name: 'Mesna (4h post)', dose: 720, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D5, every 21 days' },
                    { name: 'Mesna (8h post)', dose: 720, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D5, every 21 days' }
                ]
            },
            'VIDE': {
                name: 'Vincristine + Ifosfamide + Doxorubicin + Etoposide (VIDE) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Ifosfamide', dose: 3000, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                    { name: 'Doxorubicin', dose: 20, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                    { name: 'Etoposide', dose: 150, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                    { name: 'Mesna', dose: 3000, unit: 'mg/m²', schedule: 'D1-D3, every 21 days (uroprotection)' }
                ]
            },
            'VAIA': {
                name: 'Vincristine + Doxorubicin + Ifosfamide + Actinomycin (VAIA) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Ifosfamide', dose: 1800, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Actinomycin D', dose: 0.5, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Mesna (pre-dose)', dose: 360, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D5, every 21 days' },
                    { name: 'Mesna (4h post)', dose: 720, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D5, every 21 days' },
                    { name: 'Mesna (8h post)', dose: 720, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D5, every 21 days' }
                ]
            },
            'Cyclophosphamide-Topotecan': {
                name: 'Cyclophosphamide + Topotecan (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 250, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Topotecan', dose: 0.75, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'Irinotecan-Temozolomide-Vincristine': {
                name: 'Irinotecan + Temozolomide + Vincristine (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Irinotecan', dose: 50, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Temozolomide', dose: 100, unit: 'mg/m²', schedule: 'PO D1-D5, every 21 days' },
                    { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' }
                ]
            },
            'Cabozantinib': {
                name: 'Cabozantinib (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Cabozantinib', dose: 60, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Docetaxel-Gemcitabine': {
                name: 'Docetaxel + Gemcitabine (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D8, every 21 days' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Ifosfamide-High-Dose': {
                name: 'Ifosfamide High-Dose (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Ifosfamide', dose: 3000, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                    { name: 'Mesna', dose: 3000, unit: 'mg/m²', schedule: 'D1-D3, every 21 days (uroprotection)' }
                ]
            },
            'Regorafenib': {
                name: 'Regorafenib (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Regorafenib', dose: 160, unit: 'mg', schedule: 'PO once daily D1-D21, every 28 days' }
                ]
            }
        },
        chondrosarcoma: {
            'Pazopanib': {
                name: 'Pazopanib (VEGFR inhibitor) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Pazopanib', dose: 800, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Dasatinib': {
                name: 'Dasatinib (BCR-ABL inhibitor) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Dasatinib', dose: 100, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Ivosidenib': {
                name: 'Ivosidenib (IDH1 inhibitor) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Ivosidenib', dose: 500, unit: 'mg', schedule: 'PO once daily (IDH1 mutation required)' }
                ]
            }
        },
        giant_cell_tumor: {
            'Denosumab': {
                name: 'Denosumab (RANKL inhibitor) (Unresectable)',
                cycles: 12,
                drugs: [
                    { name: 'Denosumab', dose: 120, unit: 'mg', schedule: 'SC D1, D8, D15, then every 28 days' }
                ]
            }
        }
    },
    thymoma: {
        'CAP': {
            name: 'Cyclophosphamide + Adriamycin + Cisplatin (CAP) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Doxorubicin (Adriamycin)', dose: 50, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'ADOC': {
            name: 'Adriamycin + Cisplatin + Vincristine + Cyclophosphamide (ADOC) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin (Adriamycin)', dose: 40, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Vincristine', dose: 0.6, unit: 'mg/m²', schedule: 'D3 every 21 days (max 2mg)' },
                { name: 'Cyclophosphamide', dose: 700, unit: 'mg/m²', schedule: 'D4 every 21 days' }
            ]
        },
        'Cisplatin-Etoposide': {
            name: 'Cisplatin + Etoposide (PE) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3 every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Ramucirumab': {
            name: 'Paclitaxel + Carboplatin + Ramucirumab (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1 every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Ramucirumab', dose: 10, unit: 'mg/kg', schedule: 'D1 every 21 days' }
            ]
        },
        'VIP': {
            name: 'Etoposide + Ifosfamide + Cisplatin (VIP) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Etoposide', dose: 75, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Mesna', dose: 1200, unit: 'mg/m²', schedule: '360 mg/m² before Ifosfamide, then 720 mg/m² at 4h and 8h post-Ifosfamide, D1-D5 every 21 days' }
            ]
        },
        'Gemcitabine-Docetaxel': {
            name: 'Gemcitabine + Docetaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D8 every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel': {
            name: 'Paclitaxel + Carboplatin (PC) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1 every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab (PD-1 inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Octreotide': {
            name: 'Octreotide (for thymic neuroendocrine tumors) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Octreotide LAR', dose: 30, unit: 'mg', schedule: 'monthly injection' }
            ]
        },
        
        // Single Agent Regimens
        'Gemcitabine-Single': {
            name: 'Gemcitabine (single agent) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Gemcitabine-Capecitabine': {
            name: 'Gemcitabine + Capecitabine (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Capecitabine', dose: 650, unit: 'mg/m²', schedule: 'twice daily D1-D14 every 21 days' }
            ]
        },
        'Sunitinib': {
            name: 'Sunitinib (single agent) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Sunitinib', dose: 50, unit: 'mg', schedule: 'daily for 4 weeks, then 2 weeks off (6-week cycles)' }
            ]
        },
        'Avelumab-Axitinib': {
            name: 'Avelumab + Axitinib (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Avelumab', dose: 10, unit: 'mg/kg', schedule: 'D1,D15 every 28 days' },
                { name: 'Axitinib', dose: 5, unit: 'mg', schedule: 'twice daily continuously' }
            ]
        },
        '5FU-Leucovorin': {
            name: '5-FU + Leucovorin (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: 'D1-D2 (46hr CI) every 14 days' }
            ]
        },
        'Paclitaxel-Single': {
            name: 'Paclitaxel (single agent) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Pemetrexed-Single': {
            name: 'Pemetrexed (single agent) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Etoposide-Single': {
            name: 'Etoposide (single agent) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3 every 21 days' }
            ]
        },
        'Ifosfamide-Single': {
            name: 'Ifosfamide (single agent) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Mesna', dose: 1200, unit: 'mg/m²', schedule: '360 mg/m² before Ifosfamide, then 720 mg/m² at 4h and 8h post-Ifosfamide, D1-D5 every 21 days' }
            ]
        }
    },
    thyroid: {
        'differentiated': {
            // Radioactive Iodine-Refractory Differentiated Thyroid Cancer
            'Lenvatinib-DTC': {
                name: 'Lenvatinib (SELECT) - RAI-refractory DTC',
                cycles: 12,
                drugs: [
                    { name: 'Lenvatinib', dose: 24, unit: 'mg', schedule: 'PO once daily until progression' }
                ]
            },
            'Sorafenib-DTC': {
                name: 'Sorafenib (DECISION) - RAI-refractory DTC',
                cycles: 12,
                drugs: [
                    { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'twice PO once daily until progression' }
                ]
            },
            'Pazopanib-DTC': {
                name: 'Pazopanib - Follicular/Hurthle Cell Thyroid Cancer',
                cycles: 12,
                drugs: [
                    { name: 'Pazopanib', dose: 800, unit: 'mg', schedule: 'PO once daily until progression' }
                ]
            },
            'Selpercatinib-RET-DTC': {
                name: 'Selpercatinib - RET-altered DTC',
                cycles: 12,
                drugs: [
                    { name: 'Selpercatinib', dose: 160, unit: 'mg', schedule: 'twice PO once daily until progression' }
                ]
            },
            'Pralsetinib-RET-DTC': {
                name: 'Pralsetinib - RET-altered DTC',
                cycles: 12,
                drugs: [
                    { name: 'Pralsetinib', dose: 400, unit: 'mg', schedule: 'PO once daily until progression' }
                ]
            },
            'Larotrectinib-NTRK-DTC': {
                name: 'Larotrectinib - NTRK fusion-positive DTC',
                cycles: 12,
                drugs: [
                    { name: 'Larotrectinib', dose: 100, unit: 'mg', schedule: 'twice PO once daily until progression' }
                ]
            },
            'Entrectinib-NTRK-DTC': {
                name: 'Entrectinib - NTRK fusion-positive DTC',
                cycles: 12,
                drugs: [
                    { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'PO once daily until progression' }
                ]
            },
            'Repotrectinib-NTRK-DTC': {
                name: 'Repotrectinib - NTRK fusion-positive DTC',
                cycles: 12,
                drugs: [
                    { name: 'Repotrectinib', dose: 160, unit: 'mg', schedule: 'PO once daily until progression' }
                ]
            }
        },
        'medullary': {
            // Metastatic Targeted Therapy for Advanced MTC
            'Selpercatinib-RET-MTC': {
                name: 'Selpercatinib - RET-mutant MTC (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Selpercatinib', dose: 160, unit: 'mg', schedule: 'twice PO once daily until progression' }
                ]
            },
            'Pralsetinib-RET-MTC': {
                name: 'Pralsetinib - RET-mutant MTC (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Pralsetinib', dose: 400, unit: 'mg', schedule: 'PO once daily until progression' }
                ]
            },
            'Vandetanib-MTC': {
                name: 'Vandetanib - Advanced MTC',
                cycles: 12,
                drugs: [
                    { name: 'Vandetanib', dose: 300, unit: 'mg', schedule: 'PO once daily until progression' }
                ]
            },
            'Cabozantinib-MTC': {
                name: 'Cabozantinib - Advanced MTC',
                cycles: 12,
                drugs: [
                    { name: 'Cabozantinib', dose: 140, unit: 'mg', schedule: 'PO once daily until progression' }
                ]
            },
            'Sunitinib-MTC': {
                name: 'Sunitinib - Advanced MTC',
                cycles: 12,
                drugs: [
                    { name: 'Sunitinib', dose: 50, unit: 'mg', schedule: 'daily for 4 weeks, then 2 weeks off' }
                ]
            },
            'Sorafenib-MTC': {
                name: 'Sorafenib - Advanced MTC',
                cycles: 12,
                drugs: [
                    { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'twice PO once daily until progression' }
                ]
            },
            'Lenvatinib-MTC': {
                name: 'Lenvatinib - Advanced MTC',
                cycles: 12,
                drugs: [
                    { name: 'Lenvatinib', dose: 20, unit: 'mg', schedule: 'PO once daily until progression' }
                ]
            },
            'Larotrectinib-NTRK-MTC': {
                name: 'Larotrectinib - NTRK fusion-positive MTC',
                cycles: 12,
                drugs: [
                    { name: 'Larotrectinib', dose: 100, unit: 'mg', schedule: 'twice PO once daily until progression' }
                ]
            },
            'Entrectinib-NTRK-MTC': {
                name: 'Entrectinib - NTRK fusion-positive MTC',
                cycles: 12,
                drugs: [
                    { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'PO once daily until progression' }
                ]
            },
            'Pembrolizumab-TMB-MTC': {
                name: 'Pembrolizumab - High TMB MTC (≥10 mut/Mb)',
                cycles: 8,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            }
        },
        'anaplastic': {
            // BRAF V600E-mutant Anaplastic Thyroid Cancer
            'Dabrafenib-Trametinib-ATC': {
                name: 'Dabrafenib + Trametinib - BRAF V600E-mutant ATC',
                cycles: 12,
                drugs: [
                    { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'twice PO once daily until progression' },
                    { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'PO once daily until progression' }
                ]
            },
            'Vemurafenib-Cobimetinib-ATC': {
                name: 'Vemurafenib + Cobimetinib - BRAF V600E-mutant ATC',
                cycles: 12,
                drugs: [
                    { name: 'Vemurafenib', dose: 960, unit: 'mg', schedule: 'twice PO once daily until progression' },
                    { name: 'Cobimetinib', dose: 60, unit: 'mg', schedule: 'daily for 21 days, then 7 days off' }
                ]
            },
            // RET-altered Anaplastic Thyroid Cancer
            'Selpercatinib-RET-ATC': {
                name: 'Selpercatinib - RET-altered ATC',
                cycles: 12,
                drugs: [
                    { name: 'Selpercatinib', dose: 160, unit: 'mg', schedule: 'twice PO once daily until progression' }
                ]
            },
            'Pralsetinib-RET-ATC': {
                name: 'Pralsetinib - RET-altered ATC',
                cycles: 12,
                drugs: [
                    { name: 'Pralsetinib', dose: 400, unit: 'mg', schedule: 'PO once daily until progression' }
                ]
            },
            // NTRK fusion-positive Anaplastic Thyroid Cancer
            'Larotrectinib-NTRK-ATC': {
                name: 'Larotrectinib - NTRK fusion-positive ATC',
                cycles: 12,
                drugs: [
                    { name: 'Larotrectinib', dose: 100, unit: 'mg', schedule: 'twice PO once daily until progression' }
                ]
            },
            'Entrectinib-NTRK-ATC': {
                name: 'Entrectinib - NTRK fusion-positive ATC',
                cycles: 12,
                drugs: [
                    { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'PO once daily until progression' }
                ]
            },
            'Repotrectinib-NTRK-ATC': {
                name: 'Repotrectinib - NTRK fusion-positive ATC',
                cycles: 12,
                drugs: [
                    { name: 'Repotrectinib', dose: 160, unit: 'mg', schedule: 'PO once daily until progression' }
                ]
            },
            // Multi-kinase Inhibitors for ATC
            'Lenvatinib-ATC': {
                name: 'Lenvatinib - Advanced ATC',
                cycles: 12,
                drugs: [
                    { name: 'Lenvatinib', dose: 24, unit: 'mg', schedule: 'PO once daily until progression' }
                ]
            },
            'Sorafenib-ATC': {
                name: 'Sorafenib - Advanced ATC',
                cycles: 12,
                drugs: [
                    { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'twice PO once daily until progression' }
                ]
            },
            'Cabozantinib-ATC': {
                name: 'Cabozantinib - Advanced ATC',
                cycles: 12,
                drugs: [
                    { name: 'Cabozantinib', dose: 140, unit: 'mg', schedule: 'PO once daily until progression' }
                ]
            },
            // Immunotherapy for ATC
            'Pembrolizumab-ATC': {
                name: 'Pembrolizumab - Advanced ATC',
                cycles: 8,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Nivolumab-ATC': {
                name: 'Nivolumab - Advanced ATC',
                cycles: 8,
                drugs: [
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 14 days or 480 mg every 28 days' }
                ]
            },
            'Spartalizumab-ATC': {
                name: 'Spartalizumab - Advanced ATC',
                cycles: 8,
                drugs: [
                    { name: 'Spartalizumab', dose: 300, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            // Chemotherapy for ATC
            'Doxorubicin-Cisplatin-ATC': {
                name: 'Doxorubicin + Cisplatin - Advanced ATC',
                cycles: 6,
                drugs: [
                    { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Doxorubicin-ATC': {
                name: 'Doxorubicin - Advanced ATC',
                cycles: 6,
                drugs: [
                    { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Paclitaxel-Carboplatin-ATC': {
                name: 'Paclitaxel + Carboplatin - Advanced ATC',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Docetaxel-ATC': {
                name: 'Docetaxel - Advanced ATC',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            }
        }
    },
    pancreatic: {
        'mFOLFIRINOX': {
            name: 'mFOLFIRINOX (Modified FOLFIRINOX) - (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Irinotecan', dose: 150, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' }
            ]
        },
        'Gemcitabine-Nabpaclitaxel': {
            name: 'Gemcitabine + Nab-paclitaxel - (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Nab-paclitaxel', dose: 125, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Gemcitabine-Capecitabine-ESPAC': {
            name: 'Gemcitabine + Capecitabine (ESPAC-4) - Adjuvant',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Capecitabine', dose: 830, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
            ]
        },
        'Single-Gemcitabine-CONKO': {
            name: 'Gemcitabine (CONKO-001) - Adjuvant',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        'Single-Capecitabine-Metastatic': {
            name: 'Capecitabine - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
            ]
        },
        'Capecitabine-RT': {
            name: 'Capecitabine + Radiation Therapy - Neoadjuvant/Adjuvant',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'PO twice daily during RT' },
                { name: 'Radiation Therapy', dose: 50.4, unit: 'Gy', schedule: '28 fractions over 5.5 weeks' }
            ]
        },
        'Gemcitabine-RT': {
            name: 'Gemcitabine + Radiation Therapy - Neoadjuvant/Adjuvant',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 600, unit: 'mg/m²', schedule: 'D1, D8 during RT' },
                { name: 'Radiation Therapy', dose: 50.4, unit: 'Gy', schedule: '28 fractions over 5.5 weeks' }
            ]
        },
        'SCALOP': {
            name: 'SCALOP Regimen (Gem + Cap + RT) - Neoadjuvant',
            cycles: 4,
            drugs: [
                { name: 'Gemcitabine', dose: 300, unit: 'mg/m²', schedule: 'D1, D8, every 21 days, then with RT' },
                { name: 'Capecitabine', dose: 830, unit: 'mg/m²', schedule: 'twice daily, days 1-14, every 21 days, then with RT' }
            ]
        },
        '5FU-LV': {
            name: '5-Fluorouracil + Leucovorin - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' }
            ]
        },
        'GTX': {
            name: 'Gemcitabine + Docetaxel + Capecitabine (GTX) - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 750, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Docetaxel', dose: 30, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Capecitabine', dose: 750, unit: 'mg/m²', schedule: 'twice daily, days 1-14, every 21 days' }
            ]
        },
        'GEMOX': {
            name: 'Gemcitabine + Oxaliplatin (GEMOX) - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Oxaliplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Erlotinib': {
            name: 'Gemcitabine + Erlotinib - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Erlotinib', dose: 100, unit: 'mg', schedule: 'PO once daily, continuous' }
            ]
        },
        'Capecitabine-Erlotinib': {
            name: 'Capecitabine + Erlotinib - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                { name: 'Erlotinib', dose: 100, unit: 'mg', schedule: 'PO once daily, continuous' }
            ]
        },
        'Liposomal-Irinotecan-5FU-LV-NAPOLI': {
            name: 'Liposomal Irinotecan + 5-FU + LV (NAPOLI-1) - Second-line',
            cycles: 12,
            drugs: [
                { name: 'Liposomal Irinotecan', dose: 70, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' }
            ]
        },
        'Olaparib-Maintenance': {
            name: 'Olaparib (Maintenance) - Metastatic (BRCA1/2+)',
            cycles: 24,
            drugs: [
                { name: 'Olaparib', dose: 300, unit: 'mg', schedule: 'twice daily' }
            ]
        },
        'Pembrolizumab-Monotherapy-MSI': {
            name: 'Pembrolizumab monotherapy - Metastatic (MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400mg every 6 weeks' }
            ]
        },
        'NALIRIFOX-Metastatic': {
            name: 'NALIRIFOX (NAPOLI-3) - Metastatic (Preferred)',
            cycles: 12,
            drugs: [
                { name: 'Nanoliposomal irinotecan', dose: 50, unit: 'mg/m²', schedule: 'D1, D15, every 28 days' },
                { name: 'Oxaliplatin', dose: 60, unit: 'mg/m²', schedule: 'D1, D15, every 28 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, D15, every 28 days' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1, D15, every 28 days' }
            ]
        },
        'Gemcitabine-Cisplatin-POLO': {
            name: 'Gemcitabine + Cisplatin (GC) (POLO) - Metastatic (BRCA1/2/PALB2+)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'NABPLAGEM-PLATINUM': {
            name: 'Nab-paclitaxel + Gemcitabine + Cisplatin (PLATINUM) - Second-line (BRCA1/2/PALB2+)',
            cycles: 6,
            drugs: [
                { name: 'Nab-paclitaxel', dose: 125, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Sotorasib-KRAS': {
            name: 'Sotorasib - Metastatic (KRAS G12C+)',
            cycles: 12,
            drugs: [
                { name: 'Sotorasib', dose: 960, unit: 'mg', schedule: 'PO once daily, continuous' }
            ]
        },
        'Adagrasib-KRAS': {
            name: 'Adagrasib - Metastatic (KRAS G12C+)',
            cycles: 12,
            drugs: [
                { name: 'Adagrasib', dose: 600, unit: 'mg', schedule: 'PO twice daily, continuous' }
            ]
        },
        'mFOLFOX6': {
            name: 'mFOLFOX6 (Modified FOLFOX6) - Metastatic',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' }
            ]
        },
        'mFOLFIRI': {
            name: 'mFOLFIRI (Modified FOLFIRI) - Metastatic',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' }
            ]
        },
        'Fixed-Dose-Rate-Gemcitabine': {
            name: 'Fixed Dose Rate Gemcitabine - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine (FDR)', dose: 10, unit: 'mg/m²/min', schedule: 'D1, D8, D15, every 28 days' }
            ]
        }
    },
    anal: {
        // Definitive Concurrent Chemoradiotherapy (Most Common)
        '5FU-MMC-RT-RTOG': {
            name: '5-FU + Mitomycin-C + RT (Definitive)',
            cycles: 2,
            drugs: [
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'CI D1-D4 and D29-D32' },
                { name: 'Mitomycin-C', dose: 10, unit: 'mg/m²', schedule: 'D1, D29' }
            ]
        },
        '5FU-Cisplatin-RT': {
            name: '5-FU + Cisplatin + RT (Definitive)',
            cycles: 2,
            drugs: [
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'CI D1-D4 and D29-D32' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, D29' }
            ]
        },
        // Definitive Concurrent Chemoradiotherapy (Alternative)
        'Capecitabine-MMC-RT': {
            name: 'Capecitabine + Mitomycin-C + RT (Definitive)',
            cycles: 2,
            drugs: [
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'PO BID on days of RT' },
                { name: 'Mitomycin-C', dose: 10, unit: 'mg/m²', schedule: 'D1, D29' }
            ]
        },
        'CapeOX-RT': {
            name: 'Capecitabine + Oxaliplatin + RT (Definitive)',
            cycles: 2,
            drugs: [
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'PO BID on days of RT' },
                { name: 'Oxaliplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, D29' }
            ]
        },
        'Capecitabine-RT': {
            name: 'Capecitabine + RT (Definitive)',
            cycles: 1,
            drugs: [
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'PO BID on RT days' }
            ]
        },
        // Metastatic Therapy - First-Line (Most Common)
        'Carboplatin-Paclitaxel': {
            name: 'Paclitaxel + Carboplatin (PC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        '5FU-Cisplatin': {
            name: '5-FU + Cisplatin (Metastatic)',
            cycles: 6,
            drugs: [
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'CI D1-D4 every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'mFOLFOX6': {
            name: 'mFOLFOX6 (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: 'D1-D2 (46hr CI), every 14 days' }
            ]
        },
        'FOLCIS': {
            name: 'FOLCIS (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: 'CI over 46 hours every 14 days' }
            ]
        },
        'Modified-DCF': {
            name: 'Modified DCF (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 40, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'CI over 46 hours, every 21 days' }
            ]
        },
        // Metastatic Therapy - Immunotherapy Combinations
        'Carboplatin-Paclitaxel-Retifanlimab': {
            name: 'Paclitaxel + Carboplatin + Retifanlimab-dlwr (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 28 days' },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                { name: 'Retifanlimab-dlwr', dose: 500, unit: 'mg', schedule: 'D1, every 28 days' }
            ]
        },
        // Metastatic Therapy - Immunotherapy Monotherapy (Later Lines)
        'Pembrolizumab-Monotherapy': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Nivolumab-Monotherapy': {
            name: 'Nivolumab monotherapy (PD-1 inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 14 days or 480mg every 28 days' }
            ]
        },
        'Cemiplimab-Monotherapy': {
            name: 'Cemiplimab monotherapy (PD-1 inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Cemiplimab', dose: 350, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        // Metastatic Therapy - Less Common Options
        'Single-Toripalimab': {
            name: 'Toripalimab monotherapy (PD-1 inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Toripalimab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 14 days' }
            ]
        },
        'Single-Tislelizumab': {
            name: 'Tislelizumab monotherapy (PD-1 inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Tislelizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        }
    },
    biliary: {
        // Adjuvant Therapy
        'Single-Capecitabine': {
            name: 'Capecitabine monotherapy (Adjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
            ]
        },
        'Gemcitabine-Cisplatin': {
            name: 'Gemcitabine + Cisplatin (GC) (Adjuvant/Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Capecitabine-RT': {
            name: 'Capecitabine + RT (Adjuvant)',
            cycles: 1,
            drugs: [
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'PO twice daily on days of RT' }
            ]
        },
        // Metastatic Therapy - Most Common First-Line
        'Gemcitabine-Cisplatin-Durvalumab': {
            name: 'Gemcitabine + Cisplatin + Durvalumab (TOPAZ-1) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'GEMOX': {
            name: 'Gemcitabine + Oxaliplatin (GEMOX) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Nabpaclitaxel': {
            name: 'Gemcitabine + Nab-paclitaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Nab-paclitaxel', dose: 125, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Capecitabine-Cisplatin': {
            name: 'Capecitabine + Cisplatin (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Capecitabine': {
            name: 'Gemcitabine + Capecitabine (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Capecitabine', dose: 650, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
            ]
        },
        // Metastatic Therapy - Less Common
        'mFOLFOX6': {
            name: 'mFOLFOX6 (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: 'D1-D2 (46hr CI), every 14 days' }
            ]
        },
        '5FU-Cisplatin': {
            name: '5-FU + Cisplatin (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 1000, unit: 'mg/m²', schedule: 'daily x 4 days, every 21 days' }
            ]
        },
        'CapeOX': {
            name: 'Capecitabine + Oxaliplatin (CAPOX/XELOX) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
            ]
        },
        'Single-Gemcitabine': {
            name: 'Gemcitabine monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Gemcitabine-Cisplatin-Nabpaclitaxel': {
            name: 'Gemcitabine + Cisplatin + Nab-paclitaxel (SWOG S1815) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Gemcitabine-Cisplatin-Pembrolizumab': {
            name: 'Gemcitabine + Cisplatin + Pembrolizumab (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        // Targeted Therapy (Biomarker-directed)
        'Dabrafenib-Trametinib': {
            name: 'Dabrafenib + Trametinib (BRAFV600E mutation) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'PO twice daily', isOralTargeted: true },
                { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'PO once daily', isOralTargeted: true }
            ]
        },
        'Ivosidenib': {
            name: 'Ivosidenib (IDH1 mutation) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Ivosidenib', dose: 500, unit: 'mg', schedule: 'PO once daily', isOralTargeted: true }
            ]
        },
        'Pemigatinib': {
            name: 'Pemigatinib (FGFR2 fusions) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Pemigatinib', dose: 13.5, unit: 'mg', schedule: 'PO once daily for 14 days, then 7 days off', isOralTargeted: true }
            ]
        },
        'Futibatinib': {
            name: 'Futibatinib (FGFR2 fusions) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Futibatinib', dose: 20, unit: 'mg', schedule: 'PO once daily until progression', isOralTargeted: true }
            ]
        },
        'Pembrolizumab-Monotherapy': {
            name: 'Pembrolizumab monotherapy (MSI/dMMR/TMB-H) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        }
    },
    bladder: {
        // Neoadjuvant/Adjuvant Therapy
        'ddMVAC': {
            name: 'Dose-dense MVAC (Neoadjuvant/Adjuvant)',
            cycles: 4,
            drugs: [
                { name: 'Methotrexate', dose: 30, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Vinblastine', dose: 3, unit: 'mg/m²', schedule: 'D2, every 14 days' },
                { name: 'Doxorubicin', dose: 30, unit: 'mg/m²', schedule: 'D2, every 14 days' },
                { name: 'Cisplatin', dose: 70, unit: 'mg/m²', schedule: 'D2, every 14 days' }
            ]
        },
        'GC-Neoadjuvant': {
            name: 'Gemcitabine + Cisplatin (GC) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 70, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Perioperative Therapy
        'GC-Durvalumab-Perioperative': {
            name: 'Gemcitabine + Cisplatin + Durvalumab (NIAGARA) (Perioperative)',
            cycles: 4,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 70, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Durvalumab-Maintenance': {
            name: 'Durvalumab monotherapy (Maintenance after NIAGARA)',
            cycles: 8,
            drugs: [
                { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 28 days' }
            ]
        },
        
        // Adjuvant Therapy
        'Nivolumab-Adjuvant': {
            name: 'Nivolumab monotherapy (PD-1 inhibitor) (Adjuvant/Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days' }
            ]
        },
        'Pembrolizumab-Adjuvant': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (Adjuvant/Metastatic)',
            cycles: 17,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Definitive Therapy (Concurrent Chemoradiation)
        '5FU-MMC-RT': {
            name: '5-FU + Mitomycin-C + RT (Definitive - Concurrent chemoRT)',
            cycles: 2,
            drugs: [
                { name: '5-Fluorouracil', dose: 500, unit: 'mg/m²', schedule: 'CI daily D1-D5 and D16-D20 of RT' },
                { name: 'Mitomycin-C', dose: 12, unit: 'mg/m²', schedule: 'D1' }
            ]
        },
        
        // Metastatic Therapy (Most commonly used to least commonly used)
        'Enfortumab-Vedotin-Pembrolizumab': {
            name: 'Enfortumab Vedotin + Pembrolizumab (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Enfortumab Vedotin', dose: 1.25, unit: 'mg/kg', schedule: 'D1, D8, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Cisplatin-Nivolumab': {
            name: 'Gemcitabine + Cisplatin + Nivolumab (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 70, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Avelumab-Maintenance': {
            name: 'Avelumab monotherapy (PD-L1 inhibitor) (Maintenance after 1st line chemotherapy) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Avelumab', dose: 800, unit: 'mg', schedule: 'D1, every 14 days' }
            ]
        },
        'Erdafitinib': {
            name: 'Erdafitinib (FGFR inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Erdafitinib', dose: 8, unit: 'mg', schedule: 'PO once daily' }
            ]
        },
        'Sacituzumab-Govitecan': {
            name: 'Sacituzumab Govitecan monotherapy (Trop-2 ADC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Sacituzumab Govitecan', dose: 10, unit: 'mg/kg', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'PC-Cisplatin-Ineligible': {
            name: 'Paclitaxel + Carboplatin (cisplatin-ineligible) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'GCa-Cisplatin-Ineligible': {
            name: 'Gemcitabine + Carboplatin (cisplatin-ineligible) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'DC': {
            name: 'Docetaxel + Cisplatin (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'CAP': {
            name: 'Cyclophosphamide + Doxorubicin + Cisplatin (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 400, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Doxorubicin', dose: 40, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D2, every 21 days' }
            ]
        },
        'CMV': {
            name: 'Cisplatin + Methotrexate + Vinblastine (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D2, every 21 days' },
                { name: 'Methotrexate', dose: 30, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Vinblastine', dose: 4, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'MCV-Cisplatin-Ineligible': {
            name: 'Methotrexate + Carboplatin + Vinblastine (cisplatin-ineligible) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Methotrexate', dose: 30, unit: 'mg/m²', schedule: 'D1, D15, D22, every 28 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 28 days' },
                { name: 'Vinblastine', dose: 4, unit: 'mg/m²', schedule: 'D1, D15, D22, every 28 days' }
            ]
        },
        'ITP': {
            name: 'Ifosfamide + Paclitaxel + Cisplatin (Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Ifosfamide', dose: 1500, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Mesna (pre-dose)', dose: 300, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D3, every 21 days' },
                { name: 'Mesna (4h post)', dose: 600, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D3, every 21 days' },
                { name: 'Mesna (8h post)', dose: 600, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D3, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Ifosfamide-Doxorubicin-Gemcitabine': {
            name: 'Ifosfamide + Doxorubicin + Gemcitabine (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 1500, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Mesna (pre-dose)', dose: 300, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D3, every 21 days' },
                { name: 'Mesna (4h post)', dose: 600, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D3, every 21 days' },
                { name: 'Mesna (8h post)', dose: 600, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D3, every 21 days' },
                { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Single-Gemcitabine': {
            name: 'Gemcitabine monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        'Single-Paclitaxel': {
            name: 'Paclitaxel monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'GP': {
            name: 'Gemcitabine + Paclitaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'GD': {
            name: 'Gemcitabine + Docetaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        }
    },
    multiple_myeloma: {
        // Transplant-Eligible Patients - Induction Therapy
        'VRd': {
            name: 'Bortezomib + Lenalidomide + Dexamethasone (VRd / SWOG S0777) - Transplant Eligible',
            cycles: 4,
            drugs: [
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1, D8, D15, every 21 days' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'PO D1-D14, every 21 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1, D8, D15, every 21 days' }
            ]
        },
        'VTD': {
            name: 'Bortezomib + Thalidomide + Dexamethasone (VTD / GIMEMA) - Transplant Eligible',
            cycles: 4,
            drugs: [
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1, D8, D15, D22, every 28 days' },
                { name: 'Thalidomide', dose: 100, unit: 'mg', schedule: 'PO once daily' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1, D8, D15, D22, every 28 days' }
            ]
        },
        'CyBorD': {
            name: 'Cyclophosphamide + Bortezomib + Dexamethasone (CyBorD) - Transplant Eligible',
            cycles: 4,
            drugs: [
                { name: 'Cyclophosphamide', dose: 300, unit: 'mg/m²', schedule: 'D1, D8, D15, D22, every 28 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1, D8, D15, D22, every 28 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1, D8, D15, D22, every 28 days' }
            ]
        },
        'Dara-VTD': {
            name: 'Daratumumab + Bortezomib + Thalidomide + Dexamethasone (Dara-VTD / CASSIOPEIA) - Transplant Eligible',
            cycles: 4,
            drugs: [
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 14 days x 8 weeks, then every 28 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1, D8, D15, D22, every 28 days' },
                { name: 'Thalidomide', dose: 100, unit: 'mg', schedule: 'PO once daily' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1, D8, D15, D22, every 28 days' }
            ]
        },
        'Dara-VRd': {
            name: 'Daratumumab + Bortezomib + Lenalidomide + Dexamethasone (Dara-VRd / GRIFFIN) - Transplant Eligible',
            cycles: 4,
            drugs: [
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 14 days x 8 weeks, then every 28 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1, D8, D15, every 21 days' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'PO D1-D14, every 21 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1, D8, D15, every 21 days' }
            ]
        },
        'Isa-VRd': {
            name: 'Isatuximab + Bortezomib + Lenalidomide + Dexamethasone (Isa-VRd / GMMG-HD7) - Transplant Eligible',
            cycles: 4,
            drugs: [
                { name: 'Isatuximab', dose: 10, unit: 'mg/kg', schedule: 'weekly x 4 weeks, then every 14 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1, D8, D15, every 21 days' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'PO D1-D14, every 21 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1, D8, D15, every 21 days' }
            ]
        },
        // Transplant-Ineligible Patients - Initial Therapy
        'VRd-Lite': {
            name: 'Bortezomib + Lenalidomide + Dexamethasone (VRd-Lite / SWOG S0777) - Transplant Ineligible',
            cycles: 9,
            drugs: [
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days x 9 cycles' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'PO D1-D21, every 28 days x 9 cycles' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1, D8, D15, every 28 days x 9 cycles' }
            ]
        },
        'Dara-Rd': {
            name: 'Daratumumab + Lenalidomide + Dexamethasone (Dara-Rd / MAIA) - Transplant Ineligible',
            cycles: 12,
            drugs: [
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 14 days x 16 weeks, then every 28 days' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'PO D1-D21, every 28 days until progression' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1, D8, D15, D22, every 28 days until progression' }
            ]
        },
        'Dara-VMP': {
            name: 'Daratumumab + Bortezomib + Melphalan + Prednisone (Dara-VMP / ALCYONE) - Transplant Ineligible',
            cycles: 9,
            drugs: [
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 6 weeks, then every 21 days x 16 weeks, then every 28 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1, D8, D15, D22, every 6 weeks' },
                { name: 'Melphalan', dose: 9, unit: 'mg/m²', schedule: 'D1-D4, every 6 weeks x 9 cycles' },
                { name: 'Prednisone', dose: 60, unit: 'mg/m²', schedule: 'D1-D4, every 6 weeks x 9 cycles' }
            ]
        },
        'Dara-CyBorD': {
            name: 'Daratumumab + Cyclophosphamide + Bortezomib + Dexamethasone (Dara-CyBorD) - Transplant Ineligible',
            cycles: 9,
            drugs: [
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 14 days x 16 weeks, then every 28 days' },
                { name: 'Cyclophosphamide', dose: 300, unit: 'mg/m²', schedule: 'D1, D8, D15, D22, every 28 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1, D8, D15, D22, every 28 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1, D8, D15, D22, every 28 days' }
            ]
        },
        'MPT': {
            name: 'Melphalan + Prednisone + Thalidomide (MPT) - Transplant Ineligible',
            cycles: 12,
            drugs: [
                { name: 'Melphalan', dose: 0.25, unit: 'mg/kg', schedule: 'D1-D4 every 6 weeks' },
                { name: 'Prednisone', dose: 2, unit: 'mg/kg', schedule: 'D1-D4 every 6 weeks' },
                { name: 'Thalidomide', dose: 100, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        },
        'Rd': {
            name: 'Lenalidomide + Dexamethasone (Rd) - Transplant Ineligible',
            cycles: 12,
            drugs: [
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'D1-D21 every 28 days until progression' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1,D8,D15,D22 every 28 days until progression' }
            ]
        },
        // Relapsed/Refractory regimens
        'KRd': {
            name: 'Carfilzomib + Lenalidomide + Dexamethasone (KRd / ASPIRE) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Carfilzomib', dose: 56, unit: 'mg/m²', schedule: 'D1-D2, D8-D9, D15-D16, every 28 days' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'PO D1-D21, every 28 days' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1-D2, D8-D9, D15-D16, D22-D23, every 28 days' }
            ]
        },
        'Kd': {
            name: 'Carfilzomib + Dexamethasone (Kd / ENDEAVOR) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Carfilzomib', dose: 56, unit: 'mg/m²', schedule: 'D1-D2, D8-D9, D15-D16, every 28 days' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1-D2, D8-D9, D15-D16, D22-D23, every 28 days' }
            ]
        },
        'PVd': {
            name: 'Pomalidomide + Bortezomib + Dexamethasone (PVd) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Pomalidomide', dose: 4, unit: 'mg', schedule: 'D1-D14 every 21 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1,D4,D8,D11 every 21 days' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1,D2,D4,D5,D8,D9,D11,D12 every 21 days' }
            ]
        },
        'Pd': {
            name: 'Pomalidomide + Dexamethasone (Pd) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Pomalidomide', dose: 4, unit: 'mg', schedule: 'D1-D21 every 28 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1,D8,D15,D22 every 28 days' }
            ]
        },
        'Dara-Pd': {
            name: 'Daratumumab + Pomalidomide + Dexamethasone (Dara-Pd) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 14 days x 16 weeks, then every 28 days' },
                { name: 'Pomalidomide', dose: 4, unit: 'mg', schedule: 'D1-D21 every 28 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1,D8,D15,D22 every 28 days' }
            ]
        },
        'Isa-Pd': {
            name: 'Isatuximab + Pomalidomide + Dexamethasone (Isa-Pd) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Isatuximab', dose: 10, unit: 'mg/kg', schedule: 'weekly x 4 weeks, then every 14 days' },
                { name: 'Pomalidomide', dose: 4, unit: 'mg', schedule: 'D1-D21 every 28 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1,D8,D15,D22 every 28 days' }
            ]
        },
        'Dara-Vd': {
            name: 'Daratumumab + Bortezomib + Dexamethasone (Dara-Vd) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 14 days x 16 weeks, then every 28 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1,D4,D8,D11 every 21 days' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1,D2,D4,D5,D8,D9,D11,D12 every 21 days' }
            ]
        },
        'Elo-Rd': {
            name: 'Elotuzumab + Lenalidomide + Dexamethasone (Elo-Rd) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Elotuzumab', dose: 10, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 14 days' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'D1-D21 every 28 days' },
                { name: 'Dexamethasone', dose: 28, unit: 'mg', schedule: 'D1,D8,D15,D22 every 28 days' }
            ]
        },
        'Panobinostat-Vd': {
            name: 'Panobinostat + Bortezomib + Dexamethasone (Panobinostat-Vd) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Panobinostat', dose: 20, unit: 'mg', schedule: 'D1,D3,D5,D8,D10,D12 every 21 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1,D4,D8,D11 every 21 days' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1,D2,D4,D5,D8,D9,D11,D12 every 21 days' }
            ]
        },
        'IRd': {
            name: 'Ixazomib + Lenalidomide + Dexamethasone (IRd) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Ixazomib', dose: 4, unit: 'mg', schedule: 'D1,D8,D15 every 28 days' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'D1-D21 every 28 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1,D8,D15,D22 every 28 days' }
            ]
        },
        'Selinexor-d': {
            name: 'Selinexor + Dexamethasone (Selinexor-d) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Selinexor', dose: 80, unit: 'mg', schedule: 'twice weekly' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'twice weekly' }
            ]
        },
        'Melflufen-d': {
            name: 'Melphalan Flufenamide + Dexamethasone (Melflufen-d) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Melphalan Flufenamide', dose: 40, unit: 'mg', schedule: 'D1 every 28 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1,D8,D15,D22 every 28 days' }
            ]
        },
        // High-dose regimens
        'VTD-PACE': {
            name: 'Bortezomib + Thalidomide + Dexamethasone + Cisplatin + Adriamycin + Cyclophosphamide + Etoposide (VTD-PACE)',
            cycles: 2,
            drugs: [
                { name: 'Bortezomib', dose: 1, unit: 'mg/m²', schedule: 'D1,D4,D8,D11 every 21 days' },
                { name: 'Thalidomide', dose: 400, unit: 'mg', schedule: 'PO once daily' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1-D4 every 21 days' },
                { name: 'Cisplatin', dose: 10, unit: 'mg/m²', schedule: 'D1-D4 every 21 days' },
                { name: 'Doxorubicin', dose: 10, unit: 'mg/m²', schedule: 'D1-D4 every 21 days' },
                { name: 'Cyclophosphamide', dose: 400, unit: 'mg/m²', schedule: 'D1-D4 every 21 days' },
                { name: 'Etoposide', dose: 40, unit: 'mg/m²', schedule: 'D1-D4 every 21 days' }
            ]
        },
        'VAD': {
            name: 'Vincristine + Adriamycin + Dexamethasone (VAD) - Historical',
            cycles: 4,
            drugs: [
                { name: 'Vincristine', dose: 0.4, unit: 'mg', schedule: 'D1-D4 continuous infusion every 28 days' },
                { name: 'Doxorubicin (Adriamycin)', dose: 9, unit: 'mg/m²', schedule: 'D1-D4 continuous infusion every 28 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1-D4,D9-D12,D17-D20 every 28 days' }
            ]
        },
        'DVD': {
            name: 'Doxorubicin Liposomal + Vincristine + Dexamethasone (DVD) - Relapsed/Refractory',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin Liposomal', dose: 40, unit: 'mg/m²', schedule: 'D1 every 28 days' },
                { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'D1 every 28 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1-D4 every 28 days' }
            ]
        },
        // Single agents
        'Bortezomib': {
            name: 'Bortezomib (single agent) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1,D4,D8,D11 every 21 days' }
            ]
        },
        'Carfilzomib': {
            name: 'Carfilzomib (single agent) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Carfilzomib', dose: 56, unit: 'mg/m²', schedule: 'D1-D2, D8-D9, D15-D16, every 28 days' }
            ]
        },
        'Lenalidomide': {
            name: 'Lenalidomide (single agent) - Maintenance',
            cycles: 12,
            drugs: [
                { name: 'Lenalidomide', dose: 10, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        },
        'Thalidomide': {
            name: 'Thalidomide (single agent) - Maintenance',
            cycles: 12,
            drugs: [
                { name: 'Thalidomide', dose: 200, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        },
        'Dexamethasone': {
            name: 'Dexamethasone (single agent) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1-D4,D9-D12,D17-D20 every 28 days' }
            ]
        },
        'Daratumumab': {
            name: 'Daratumumab (single agent) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 14 days x 16 weeks, then every 28 days' }
            ]
        },
        'Daratumumab-Hyaluronidase': {
            name: 'Daratumumab + Hyaluronidase (subcutaneous) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Daratumumab', dose: 1800, unit: 'mg', schedule: 'weekly x 8 weeks, then every 14 days x 16 weeks, then every 28 days (subcutaneous)' },
                { name: 'Hyaluronidase', dose: 30000, unit: 'units', schedule: 'with daratumumab' }
            ]
        },
        'Belantamab-Mafodotin': {
            name: 'Belantamab Mafodotin (BCMA-ADC) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Belantamab Mafodotin', dose: 2.5, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Teclistamab': {
            name: 'Teclistamab (BCMA BiTE) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Teclistamab', dose: 1.5, unit: 'mg/kg', schedule: 'weekly after step-up dosing' }
            ]
        },
        'Talquetamab': {
            name: 'Talquetamab (GPRC5D BiTE) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Talquetamab', dose: 405, unit: 'mcg/kg', schedule: 'weekly after step-up dosing' }
            ]
        },
        'Idecabtagene-Vicleucel': {
            name: 'Idecabtagene Vicleucel (IDE-CEL CAR-T) - Relapsed/Refractory',
            cycles: 1,
            drugs: [
                { name: 'Idecabtagene Vicleucel', dose: 450, unit: 'million cells', schedule: 'single infusion after lymphodepletion' }
            ]
        },
        'Ciltacabtagene-Vicleucel': {
            name: 'Ciltacabtagene Vicleucel (CILTA-CEL CAR-T) - Relapsed/Refractory',
            cycles: 1,
            drugs: [
                { name: 'Ciltacabtagene Vicleucel', dose: 0.75, unit: 'million cells/kg', schedule: 'single infusion after lymphodepletion' }
            ]
        },
        'Ibrutinib': {
            name: 'Ibrutinib (BTK inhibitor) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Ibrutinib', dose: 560, unit: 'mg', schedule: 'PO once daily' }
            ]
        },
        // Additional NCCN regimens
        'Melphalan': {
            name: 'Melphalan (single agent) - Palliative',
            cycles: 8,
            drugs: [
                { name: 'Melphalan', dose: 0.25, unit: 'mg/kg', schedule: 'D1-D4 every 6 weeks' }
            ]
        },
        'MP': {
            name: 'Melphalan + Prednisone (MP) - Transplant Ineligible',
            cycles: 12,
            drugs: [
                { name: 'Melphalan', dose: 0.25, unit: 'mg/kg', schedule: 'D1-D4 every 6 weeks' },
                { name: 'Prednisone', dose: 2, unit: 'mg/kg', schedule: 'D1-D4 every 6 weeks' }
            ]
        },
        'Td': {
            name: 'Thalidomide + Dexamethasone (Td) - Transplant Ineligible',
            cycles: 8,
            drugs: [
                { name: 'Thalidomide', dose: 200, unit: 'mg', schedule: 'PO once daily' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1-D4 every 28 days' }
            ]
        },
        'Vd': {
            name: 'Bortezomib + Dexamethasone (Vd) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1,D4,D8,D11 every 21 days' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1,D2,D4,D5,D8,D9,D11,D12 every 21 days' }
            ]
        }
    },
    penile: {
        'TIP': {
            name: 'Paclitaxel + Ifosfamide + Cisplatin (TIP) - (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Mesna', dose: 1200, unit: 'mg/m²', schedule: '240 mg/m² before Ifosfamide, then 480 mg/m² at 4h and 8h post-Ifosfamide, D1-D3, every 21 days' }
            ]
        },
        'TPF': {
            name: 'Docetaxel + Cisplatin + 5-FU (TPF) - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 750, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        'Cisplatin-RT': {
            name: 'Cisplatin + Radiation Therapy - Locally Advanced',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'weekly during RT' },
                { name: 'Radiation Therapy', dose: 54, unit: 'Gy', schedule: '54-57 Gy nodal, 63 Gy primary' }
            ]
        },
        'TIP-RT-InPACT': {
            name: 'TIP + Radiation Therapy (InPACT) - Locally Advanced',
            cycles: 4,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days (4 cycles)' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', schedule: 'D1-D3, every 21 days (4 cycles)' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1-D3, every 21 days (4 cycles)' },
                { name: 'Mesna', dose: 1200, unit: 'mg/m²', schedule: '240 mg/m² before Ifosfamide, then 480 mg/m² at 4h and 8h post-Ifosfamide, D1-D3, every 21 days' },
                { name: 'Radiation Therapy', dose: 45, unit: 'Gy', schedule: 'with concurrent weekly cisplatin' }
            ]
        },
        'Cisplatin-5FU': {
            name: 'Cisplatin + 5-Fluorouracil - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        'Cisplatin-5FU-Pembrolizumab-HERCULES': {
            name: 'Cisplatin + 5-FU + Pembrolizumab (HERCULES) - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 70, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'D1-D4, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days (continue maintenance up to 34 cycles)' }
            ]
        },
        'Carboplatin-5FU-Pembrolizumab-HERCULES': {
            name: 'Carboplatin + 5-FU + Pembrolizumab (HERCULES) - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'D1-D4, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days (continue maintenance up to 34 cycles)' }
            ]
        },
        'Carboplatin-Paclitaxel': {
            name: 'Paclitaxel + Carboplatin (PC) - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Paclitaxel': {
            name: 'Cisplatin + Paclitaxel - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Pembrolizumab-Single': {
            name: 'Pembrolizumab (Single Agent) - Metastatic (dMMR/MSI-H/TMB-H)',
            cycles: 35,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-5FU-Pembrolizumab': {
            name: 'Carboplatin + 5-FU + Pembrolizumab - Metastatic - 1L',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC', unit: 'mg', schedule: 'D1 every 21 days', requiresAUC: true },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'D1-D4 every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1 every 21 days until progression' }
            ]
        },
        'Pembrolizumab-Maintenance': {
            name: 'Pembrolizumab (Maintenance) - Metastatic',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Capecitabine-RT': {
            name: 'Capecitabine + RT - Neoadjuvant/Adjuvant',
            cycles: 2,
            drugs: [
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'twice daily during RT' }
            ]
        },
        '5FU-Mitomycin': {
            name: '5-Fluorouracil + Mitomycin-C - Neoadjuvant/Adjuvant',
            cycles: 2,
            drugs: [
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'D1-D4 every 21 days' },
                { name: 'Mitomycin-C', dose: 15, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Paclitaxel': {
            name: 'Paclitaxel (single agent) - Metastatic',
            cycles: 8,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Cetuximab': {
            name: 'Cetuximab (EGFR inhibitor) - Metastatic',
            cycles: 8,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'D1, every 7 days (loading dose 400 mg/m², then 250 mg/m²)', hasLoadingDose: true }
            ]
        }
    },
    vulvar_vaginal: {
        'Cisplatin-RT': {
            name: 'Cisplatin + RT (Definitive)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'D1, every 7 days during RT x 6 weeks' }
            ]
        },
        'Carboplatin-RT': {
            name: 'Carboplatin + RT (Definitive)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, every 7 days during RT x 6 weeks', requiresAUC: true }
            ]
        },
        'Carboplatin-Paclitaxel': {
            name: 'Paclitaxel + Carboplatin (PC) - Metastatic - 1L',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC', unit: 'mg', schedule: 'D1 every 21 days', requiresAUC: true },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Cisplatin-Paclitaxel': {
            name: 'Cisplatin + Paclitaxel - Metastatic - 1L',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Capecitabine-RT': {
            name: 'Capecitabine + RT (Definitive)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'twice daily during RT x 6 weeks' }
            ]
        },
        'Gemcitabine-Cisplatin': {
            name: 'Gemcitabine + Cisplatin (GC) - Metastatic - 1L',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 70, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Cisplatin-Docetaxel': {
            name: 'Cisplatin + Docetaxel - Metastatic - 1L',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Cisplatin-Cetuximab': {
            name: 'Cisplatin + Cetuximab - Metastatic - 1L',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'D1, every 7 days (loading dose 400 mg/m², then 250 mg/m²)', hasLoadingDose: true }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab (PD-L1 CPS >1, dMMR/MSI-H) - Metastatic',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Weekly': {
            name: 'Paclitaxel + Carboplatin (PC) (Weekly) - Metastatic - 1L',
            cycles: 12,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC', unit: 'mg', schedule: 'D1 weekly', requiresAUC: true },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1 weekly' }
            ]
        },
        'Topotecan': {
            name: 'Topotecan (single agent) - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Topotecan', dose: 1.25, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        'Cisplatin-Paclitaxel-Bevacizumab': {
            name: 'Cisplatin + Paclitaxel + Bevacizumab (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Bevacizumab': {
            name: 'Paclitaxel + Carboplatin + Bevacizumab (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 28 days', requiresAUC: true },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Paclitaxel-Bevacizumab-Pembrolizumab': {
            name: 'Cisplatin + Paclitaxel + Bevacizumab + Pembrolizumab (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Bevacizumab-Pembrolizumab': {
            name: 'Paclitaxel + Carboplatin + Bevacizumab + Pembrolizumab (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 28 days', requiresAUC: true },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Cemiplimab': {
            name: 'Cemiplimab (Advanced/Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Cemiplimab', dose: 350, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Nivolumab-HPV': {
            name: 'Nivolumab (HPV-related tumor)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days or 480mg every 4 weeks' }
            ]
        },
        'Trastuzumab-Deruxtecan-HER2': {
            name: 'Trastuzumab Deruxtecan (T-DXd) (HER2+ tumors)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab Deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-5FU-RT': {
            name: 'Cisplatin + 5-FU + RT (Definitive)',
            cycles: 2,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, week 1 and 5 with RT' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'D1-D4, CI, week 1 and 5 with RT' }
            ]
        },
        'Mitomycin-Capecitabine-RT': {
            name: 'Mitomycin + Capecitabine + RT (Definitive)',
            cycles: 2,
            drugs: [
                { name: 'Mitomycin', dose: 10, unit: 'mg/m²', schedule: 'D1, D29 with RT' },
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'twice daily during RT' }
            ]
        },
        'Erlotinib': {
            name: 'Erlotinib (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Erlotinib', dose: 150, unit: 'mg', schedule: 'PO once daily' }
            ]
        },
        'Larotrectinib-NTRK': {
            name: 'Larotrectinib (NTRK gene fusion-positive tumors)',
            cycles: 12,
            drugs: [
                { name: 'Larotrectinib', dose: 100, unit: 'mg', schedule: 'PO twice daily' }
            ]
        },
        'Entrectinib-NTRK': {
            name: 'Entrectinib (NTRK gene fusion-positive tumors)',
            cycles: 12,
            drugs: [
                { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'PO once daily' }
            ]
        }
    },
    mesothelioma: {
        // First-Line Therapy for Unresectable Pleural Mesothelioma
        'Pemetrexed-Cisplatin': {
            name: 'Pemetrexed + Cisplatin (Standard of Care) - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'PO once daily (start 1-2 weeks before treatment)' },
                { name: 'Vitamin B12', dose: 1000, unit: 'mcg', schedule: 'IM every 9 weeks (start 1-2 weeks before treatment)' }
            ]
        },
        'Pemetrexed-Carboplatin': {
            name: 'Pemetrexed + Carboplatin (Cisplatin-ineligible) - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'PO once daily (start 1-2 weeks before treatment)' },
                { name: 'Vitamin B12', dose: 1000, unit: 'mcg', schedule: 'IM every 9 weeks (start 1-2 weeks before treatment)' }
            ]
        },
        'Nivolumab-Ipilimumab': {
            name: 'Nivolumab + Ipilimumab (CheckMate 743) - (Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'D1, every 21 days x 4 cycles, then 480mg every 28 days' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 6 weeks x 4 cycles' }
            ]
        },
        'Pemetrexed-Cisplatin-Bevacizumab': {
            name: 'Pemetrexed + Cisplatin + Bevacizumab (MAPS Trial) - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'PO once daily (start 1-2 weeks before treatment)' },
                { name: 'Vitamin B12', dose: 1000, unit: 'mcg', schedule: 'IM every 9 weeks (start 1-2 weeks before treatment)' }
            ]
        },
        'Pemetrexed-Carboplatin-Bevacizumab': {
            name: 'Pemetrexed + Carboplatin + Bevacizumab (Cisplatin-ineligible) - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'PO once daily (start 1-2 weeks before treatment)' },
                { name: 'Vitamin B12', dose: 1000, unit: 'mcg', schedule: 'IM every 9 weeks (start 1-2 weeks before treatment)' }
            ]
        },
        
        // Second-Line Therapy
        'Gemcitabine-Cisplatin': {
            name: 'Gemcitabine + Cisplatin (GC) - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Carboplatin': {
            name: 'Gemcitabine + Carboplatin - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Vinorelbine': {
            name: 'Gemcitabine + Vinorelbine - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Vinorelbine', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Vinorelbine-Cisplatin': {
            name: 'Vinorelbine + Cisplatin - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Vinorelbine', dose: 30, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Lurbinectedin': {
            name: 'Lurbinectedin (PM1183) - (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Lurbinectedin', dose: 3.2, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Maintenance Therapy
        'Pemetrexed-Maintenance': {
            name: 'Pemetrexed Maintenance (after platinum-based therapy) - (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'PO once daily' },
                { name: 'Vitamin B12', dose: 1000, unit: 'mcg', schedule: 'IM every 9 weeks' }
            ]
        },
        'Bevacizumab-Maintenance': {
            name: 'Bevacizumab Maintenance (after platinum-based therapy) - (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Immunotherapy
        'Pembrolizumab': {
            name: 'Pembrolizumab (KEYNOTE-158) - (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Nivolumab': {
            name: 'Nivolumab (MERIT) - (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days' }
            ]
        },
        'Atezolizumab': {
            name: 'Atezolizumab (ETOP 9-15) - (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Single Agents
        'Gemcitabine': {
            name: 'Gemcitabine (single agent) - (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Vinorelbine': {
            name: 'Vinorelbine (single agent) - (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Vinorelbine', dose: 30, unit: 'mg/m²', schedule: 'D1, every 7 days' }
            ]
        },
        'Doxorubicin': {
            name: 'Doxorubicin (single agent) - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Neoadjuvant/Adjuvant Therapy (Limited Evidence)
        'Pemetrexed-Cisplatin-Neoadjuvant': {
            name: 'Pemetrexed + Cisplatin (Neoadjuvant)',
            cycles: 3,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'PO once daily (start 1-2 weeks before treatment)' },
                { name: 'Vitamin B12', dose: 1000, unit: 'mcg', schedule: 'IM every 9 weeks (start 1-2 weeks before treatment)' }
            ]
        },
        'Pemetrexed-Cisplatin-Adjuvant': {
            name: 'Pemetrexed + Cisplatin (Adjuvant)',
            cycles: 4,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'PO once daily (start 1-2 weeks before treatment)' },
                { name: 'Vitamin B12', dose: 1000, unit: 'mcg', schedule: 'IM every 9 weeks (start 1-2 weeks before treatment)' }
            ]
        }
    },
    merkel_cell: {
        // First-Line Immunotherapy (Preferred)
        'Avelumab': {
            name: 'Avelumab (JAVELIN Merkel 200) - (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Avelumab', dose: 800, unit: 'mg', schedule: 'D1, every 14 days' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab (KEYNOTE-017) - (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Nivolumab': {
            name: 'Nivolumab (CheckMate 358) - (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days' }
            ]
        },
        'Retifanlimab': {
            name: 'Retifanlimab (POD1UM-201) - (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Retifanlimab', dose: 500, unit: 'mg', schedule: 'D1, every 28 days' }
            ]
        },
        
        // Neoadjuvant/Adjuvant Immunotherapy
        'Avelumab-Neoadjuvant': {
            name: 'Avelumab (Neoadjuvant)',
            cycles: 3,
            drugs: [
                { name: 'Avelumab', dose: 800, unit: 'mg', schedule: 'D1, every 14 days' }
            ]
        },
        'Avelumab-Adjuvant': {
            name: 'Avelumab (Adjuvant)',
            cycles: 12,
            drugs: [
                { name: 'Avelumab', dose: 800, unit: 'mg', schedule: 'D1, every 14 days' }
            ]
        },
        'Pembrolizumab-Neoadjuvant': {
            name: 'Pembrolizumab (PD-1 inhibitor) (Neoadjuvant)',
            cycles: 3,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Pembrolizumab-Adjuvant': {
            name: 'Pembrolizumab (PD-1 inhibitor) (Adjuvant)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        
        // First-Line Chemotherapy (Alternative)
        'EP': {
            name: 'Etoposide + Cisplatin (EP) - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'EC': {
            name: 'Etoposide + Carboplatin (EC) - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'CAV': {
            name: 'Cyclophosphamide + Adriamycin + Vincristine (CAV) - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Doxorubicin (Adriamycin)', dose: 45, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'D1, every 21 days (max 2mg)' }
            ]
        },
        'Topotecan-Cyclophosphamide': {
            name: 'Topotecan + Cyclophosphamide - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Topotecan', dose: 1.7, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Second-Line Chemotherapy
        'Temozolomide': {
            name: 'Temozolomide (single agent) - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 200, unit: 'mg/m²', schedule: 'D1-D5, every 28 days' }
            ]
        },
        'Paclitaxel': {
            name: 'Paclitaxel (single agent) - (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, every 7 days' }
            ]
        },
        'Docetaxel': {
            name: 'Docetaxel (single agent) - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine': {
            name: 'Gemcitabine (single agent) - (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Vinorelbine': {
            name: 'Vinorelbine (single agent) - (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Vinorelbine', dose: 30, unit: 'mg/m²', schedule: 'D1, every 7 days' }
            ]
        },
        'Doxorubicin': {
            name: 'Doxorubicin (single agent) - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Cyclophosphamide': {
            name: 'Cyclophosphamide (single agent) - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Combination Chemotherapy Options
        'Paclitaxel-Carboplatin': {
            name: 'Paclitaxel + Carboplatin - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Carboplatin': {
            name: 'Gemcitabine + Carboplatin - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'Docetaxel-Carboplatin': {
            name: 'Docetaxel + Carboplatin - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Investigational/Newer Agents
        'Ipilimumab-Nivolumab': {
            name: 'Ipilimumab + Nivolumab (Investigational) - (Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 6 weeks x 4 cycles' },
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days' }
            ]
        },
        'Dostarlimab': {
            name: 'Dostarlimab (Investigational) - (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'D1, every 21 days x 4 cycles, then 1000mg every 42 days' }
            ]
        }
    },
    carcinoma_unknown_primary: {
        // Neuroendocrine Features
        'Paclitaxel-Carboplatin-Etoposide': {
            name: 'Paclitaxel + Carboplatin + Etoposide (PCE) (Neuroendocrine Features) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Etoposide', dose: 50, unit: 'mg/day', schedule: 'PO alternating with 100mg PO D1-D10, every 21 days' }
            ]
        },
        'Etoposide-Cisplatin': {
            name: 'Etoposide + Cisplatin (EP) (Neuroendocrine Features) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Germ Cell Features
        'BEP': {
            name: 'Bleomycin + Etoposide + Cisplatin (BEP) (Germ Cell Features) (Metastatic)',
            cycles: 3,
            drugs: [
                { name: 'Bleomycin', dose: 30, unit: 'units', schedule: 'D1, D8, D15, every 21 days' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        
        // Adenocarcinoma - Triple combinations
        'Gemcitabine-Carboplatin-Paclitaxel': {
            name: 'Gemcitabine + Paclitaxel + Carboplatin (GCP) (Adenocarcinoma) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Cisplatin-Paclitaxel': {
            name: 'Gemcitabine + Cisplatin + Paclitaxel (GCP) (Adenocarcinoma) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Targeted therapy combinations
        'Bevacizumab-Erlotinib': {
            name: 'Bevacizumab + Erlotinib (Adenocarcinoma) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                { name: 'Erlotinib', dose: 150, unit: 'mg', schedule: 'PO once daily' }
            ]
        },
        
        // Standard doublets - Adenocarcinoma/Squamous
        'Carboplatin-Paclitaxel': {
            name: 'Paclitaxel + Carboplatin (PC) (Adenocarcinoma/Squamous) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Cisplatin': {
            name: 'Gemcitabine + Cisplatin (GC) (Adenocarcinoma/Squamous) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Weekly regimens
        'Carboplatin-Paclitaxel-Weekly': {
            name: 'Paclitaxel + Carboplatin (PC) (weekly) (Adenocarcinoma/Squamous) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, every 7 days' },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, every 7 days' }
            ]
        },
        
        // Docetaxel combinations - Squamous
        'Docetaxel-Cisplatin': {
            name: 'Docetaxel + Cisplatin (Squamous) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Docetaxel-Carboplatin': {
            name: 'Docetaxel + Carboplatin (Squamous) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Carboplatin': {
            name: 'Gemcitabine + Carboplatin (Squamous) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Other combinations
        'Gemcitabine-Irinotecan': {
            name: 'Gemcitabine + Irinotecan (GI) (Adenocarcinoma) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Irinotecan', dose: 100, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'CapeOX': {
            name: 'Capecitabine + Oxaliplatin (CAPOX/XELOX) (Colorectal Features) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-14, every 21 days' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Immunotherapy
        'Pembrolizumab': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (MSI-H/dMMR, TMB-H) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Nivolumab': {
            name: 'Nivolumab monotherapy (PD-1 inhibitor) (MSI-H/dMMR) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days' }
            ]
        },
        
        // Single agents - Metastatic
        'Docetaxel': {
            name: 'Docetaxel monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine': {
            name: 'Gemcitabine monotherapy (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Paclitaxel': {
            name: 'Paclitaxel monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Capecitabine': {
            name: 'Capecitabine monotherapy (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily D1-14, every 21 days' }
            ]
        }
    },
    adrenocortical: {
        // Adjuvant/Maintenance Therapy
        'Mitotane': {
            name: 'Mitotane monotherapy (Adjuvant/Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Mitotane', dose: 2000, unit: 'mg', schedule: 'PO 2000 mg daily escalate to 4-6 g daily target serum levels 14-20 mcg/ml' }
            ]
        },
        // Metastatic Therapy - First-Line (Most Common)
        'EDP-M': {
            name: 'Etoposide + Doxorubicin + Cisplatin + Mitotane (EDP-M) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D2-D4, every 28 days' },
                { name: 'Doxorubicin', dose: 40, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                { name: 'Mitotane', dose: 2000, unit: 'mg', schedule: 'PO continuous dosing to maintain serum levels 14-20 mcg/ml (FIRM-ACT)' }
            ]
        },
        'Streptozocin-Mitotane': {
            name: 'Streptozocin + Mitotane (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Streptozocin', dose: 1000, unit: 'mg/m²', schedule: '1000 mg/m² x 5 days followed by 2000 mg/m² every 28 days' },
                { name: 'Mitotane', dose: 1000, unit: 'mg', schedule: 'PO 1000 mg daily titrate to 1000-4000 mg daily, target >14 mcg/ml' }
            ]
        },
        // Metastatic Therapy - Alternative Regimens
        'EDP-M-Carboplatin': {
            name: 'Etoposide + Doxorubicin + Carboplatin + Mitotane (EDP-M) (cisplatin-ineligible) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D2-D4, every 28 days' },
                { name: 'Doxorubicin', dose: 40, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 28 days' },
                { name: 'Mitotane', dose: 2000, unit: 'mg', schedule: 'PO continuous dosing to maintain serum levels 14-20 mcg/ml (FIRM-ACT)' }
            ]
        },
        'Gemcitabine-Capecitabine': {
            name: 'Gemcitabine + Capecitabine (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
            ]
        },
        'Gemcitabine-Capecitabine-Mitotane': {
            name: 'Gemcitabine + Capecitabine + Mitotane (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                { name: 'Mitotane', dose: 2000, unit: 'mg', schedule: 'PO continuous dosing to maintain serum levels 14-20 mcg/ml' }
            ]
        },
        'Docetaxel-Cisplatin': {
            name: 'Docetaxel + Cisplatin (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        // Metastatic Therapy - Later Lines/Less Common
        'Temozolomide': {
            name: 'Temozolomide monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 200, unit: 'mg/m²', schedule: 'PO D1-D5, every 28 days' }
            ]
        },
        // Metastatic Therapy - Investigational/Clinical Trials
        'Nivolumab-Ipilimumab': {
            name: 'Nivolumab + Ipilimumab (PD-1 + CTLA-4 inhibitors) (Metastatic/Investigational)',
            cycles: 6,
            drugs: [
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Cabozantinib': {
            name: 'Cabozantinib (Metastatic/Investigational)',
            cycles: 12,
            drugs: [
                { name: 'Cabozantinib', dose: 60, unit: 'mg', schedule: 'PO once daily' }
            ]
        },
    },
    basal_cell: {
        'Vismodegib': {
            name: 'Vismodegib (Hedgehog pathway inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Vismodegib', dose: 150, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        },
        'Sonidegib': {
            name: 'Sonidegib (Hedgehog pathway inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Sonidegib', dose: 200, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        },
        'Cemiplimab': {
            name: 'Cemiplimab monotherapy (PD-1 inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Cemiplimab', dose: 350, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Nivolumab': {
            name: 'Nivolumab monotherapy (PD-1 inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days' }
            ]
        }
    },
    brain: {
        'Temozolomide-RT': {
            name: 'Temozolomide + Radiotherapy (Stupp Protocol) (Definitive)',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 75, unit: 'mg/m²', schedule: 'PO once daily during RT, then 150-200mg/m² PO once daily D1-D5, every 28 days' }
            ]
        },
        'PCV': {
            name: 'Procarbazine + CCNU + Vincristine (PCV) (Definitive)',
            cycles: 6,
            drugs: [
                { name: 'Procarbazine', dose: 60, unit: 'mg/m²', schedule: 'PO once daily D8-D21, every 8 weeks' },
                { name: 'CCNU (Lomustine)', dose: 130, unit: 'mg/m²', schedule: 'PO once daily D1, every 8 weeks' },
                { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D8, D29, every 8 weeks (max 2mg)' }
            ]
        },
        'Temozolomide-Bevacizumab': {
            name: 'Temozolomide + Bevacizumab (Anti-VEGF) (Relapsed/Refractory)',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 150, unit: 'mg/m²', schedule: 'PO once daily D1-D5, every 28 days' },
                { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'D1, D15, every 28 days' }
            ]
        },
        'Irinotecan-Bevacizumab': {
            name: 'Irinotecan + Bevacizumab (Anti-VEGF) (Relapsed/Refractory)',
            cycles: 6,
            drugs: [
                { name: 'Irinotecan', dose: 125, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'D1, every 14 days' }
            ]
        },
        'Carboplatin-Irinotecan-Bevacizumab': {
            name: 'Carboplatin + Irinotecan + Bevacizumab (Anti-VEGF) (Relapsed/Refractory)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 4-5', unit: 'AUC', schedule: 'D1, every 28 days', requiresAUC: true },
                { name: 'Irinotecan', dose: 340, unit: 'mg/m²', schedule: 'D1, D14, every 28 days' },
                { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'D1, D14, every 28 days' }
            ]
        },
        'Temozolomide-Lomustine': {
            name: 'Temozolomide + Lomustine (CCNU) (Relapsed/Refractory)',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 100, unit: 'mg/m²', schedule: 'PO once daily D2-D6, every 28 days' },
                { name: 'Lomustine (CCNU)', dose: 100, unit: 'mg/m²', schedule: 'PO once daily D1, every 28 days' }
            ]
        },
        'Carmustine': {
            name: 'Carmustine (BCNU) monotherapy (Relapsed/Refractory)',
            cycles: 6,
            drugs: [
                { name: 'Carmustine (BCNU)', dose: 200, unit: 'mg/m²', schedule: 'D1 every 6 weeks' }
            ]
        },
        'Lomustine': {
            name: 'Lomustine (CCNU) monotherapy (Relapsed/Refractory)',
            cycles: 6,
            drugs: [
                { name: 'Lomustine (CCNU)', dose: 130, unit: 'mg/m²', schedule: 'D1 every 6 weeks' }
            ]
        },
        'Procarbazine': {
            name: 'Procarbazine monotherapy (Relapsed/Refractory)',
            cycles: 6,
            drugs: [
                { name: 'Procarbazine', dose: 150, unit: 'mg/m²', schedule: 'PO divided into 3 doses daily' }
            ]
        },
        'Temozolomide': {
            name: 'Temozolomide monotherapy (Relapsed/Refractory)',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 200, unit: 'mg/m²', schedule: 'PO once daily D1-D5, every 28 days' }
            ]
        },
        'Irinotecan': {
            name: 'Irinotecan monotherapy (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Irinotecan', dose: 350, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Bevacizumab': {
            name: 'Bevacizumab (Anti-VEGF) monotherapy (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Tumor-Treating-Fields': {
            name: 'Tumor Treating Fields (TTFields) + Temozolomide (Definitive)',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 150, unit: 'mg/m²', schedule: 'PO once daily D1-D5, every 28 days' },
                { name: 'TTFields', dose: 'Device', unit: 'continuous', schedule: '18+ hours daily' }
            ]
        },
        // Ependymoma Regimens
        'Cisplatin-Etoposide-Ependymoma': {
            name: 'Cisplatin + Etoposide (Ependymoma) (Adjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        // Adult Medulloblastoma Regimens
        'Cisplatin-Cyclophosphamide-Vincristine': {
            name: 'Cisplatin + Cyclophosphamide + Vincristine (Medulloblastoma) (Adjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cyclophosphamide', dose: 1500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Mesna', dose: 1200, unit: 'mg/m²', schedule: 'D1, every 21 days (80% of Cyclophosphamide dose)' },
                { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' }
            ]
        },
        'Carboplatin-Etoposide-Cyclophosphamide': {
            name: 'Carboplatin + Etoposide + Cyclophosphamide (Medulloblastoma) (Adjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days', requiresAUC: true },
                { name: 'Etoposide', dose: 150, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Mesna', dose: 800, unit: 'mg/m²', schedule: 'D1, every 21 days (80% of Cyclophosphamide dose)' }
            ]
        },
        'Cisplatin-Etoposide-Cyclophosphamide': {
            name: 'Cisplatin + Etoposide + Cyclophosphamide (Medulloblastoma) (Adjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Etoposide', dose: 150, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Cyclophosphamide', dose: 1500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Mesna', dose: 1200, unit: 'mg/m²', schedule: 'D1, every 21 days (80% of Cyclophosphamide dose)' }
            ]
        },
        'Cisplatin-Lomustine-Vincristine': {
            name: 'Cisplatin + Lomustine + Vincristine (Medulloblastoma) (Adjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 42 days' },
                { name: 'Lomustine (CCNU)', dose: 75, unit: 'mg/m²', schedule: 'PO once daily D1, every 42 days' },
                { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D1, D8, every 42 days (max 2mg)' }
            ]
        }
    },
    gist: {
        // NEOADJUVANT THERAPY
        'Imatinib-Neoadjuvant': {
            name: 'Imatinib (BCR-ABL/KIT inhibitor) (Neoadjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Imatinib', dose: 400, unit: 'mg', schedule: 'PO once daily' }
            ]
        },
        'Avapritinib-Neoadjuvant': {
            name: 'Avapritinib (KIT/PDGFRA inhibitor) (PDGFRA D842V+) (Neoadjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Avapritinib', dose: 300, unit: 'mg', schedule: 'PO once daily' }
            ]
        },
        'Larotrectinib-Neoadjuvant': {
            name: 'Larotrectinib (TRK inhibitor) (NAVIGATE) (NTRK+) (Neoadjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Larotrectinib', dose: 100, unit: 'mg', schedule: 'PO twice daily' }
            ]
        },
        'Entrectinib-Neoadjuvant': {
            name: 'Entrectinib (TRK inhibitor) (STARTRK-2) (NTRK+) (Neoadjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'PO once daily' }
            ]
        },
        'Repotrectinib-Neoadjuvant': {
            name: 'Repotrectinib (TRK inhibitor) (TRIDENT-1) (NTRK+) (Neoadjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Repotrectinib', dose: 160, unit: 'mg', schedule: 'PO once daily' }
            ]
        },
        'Sunitinib-Neoadjuvant-SDH': {
            name: 'Sunitinib (multi-kinase inhibitor) (SDH-deficient) (Neoadjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Sunitinib', dose: 50, unit: 'mg', schedule: 'PO once daily D1-28, every 42 days' }
            ]
        },
        'Dabrafenib-Trametinib-Neoadjuvant': {
            name: 'Dabrafenib (BRAF inhibitor) + Trametinib (MEK inhibitor) (BRAF V600E+) (Neoadjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'PO twice daily' },
                { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'PO once daily' }
            ]
        },

        // ADJUVANT THERAPY
        'Imatinib-Adjuvant': {
            name: 'Imatinib (BCR-ABL/KIT inhibitor) (ACOSOG Z9001) (Adjuvant)',
            cycles: 36,
            drugs: [
                { name: 'Imatinib', dose: 400, unit: 'mg', schedule: 'PO once daily x 3 years' }
            ]
        },

        // METASTATIC THERAPY - FIRST LINE
        'Imatinib-Metastatic': {
            name: 'Imatinib (BCR-ABL/KIT inhibitor) (B2222) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Imatinib', dose: 400, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        },
        'Avapritinib-PDGFRA': {
            name: 'Avapritinib (KIT/PDGFRA inhibitor) (NAVIGATOR) (PDGFRA D842V+) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Avapritinib', dose: 300, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        },

        // METASTATIC THERAPY - SECOND LINE
        'Sunitinib': {
            name: 'Sunitinib (multi-kinase inhibitor) (A6181004) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Sunitinib', dose: 50, unit: 'mg', schedule: 'PO once daily D1-28, every 42 days' }
            ]
        },

        // METASTATIC THERAPY - THIRD LINE
        'Regorafenib': {
            name: 'Regorafenib (multi-kinase inhibitor) (GRID) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Regorafenib', dose: 160, unit: 'mg', schedule: 'PO once daily D1-21, every 28 days' }
            ]
        },

        // METASTATIC THERAPY - FOURTH LINE+
        'Ripretinib': {
            name: 'Ripretinib (KIT/PDGFRA inhibitor) (INVICTUS) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Ripretinib', dose: 150, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        },

        // ADDITIONAL TARGETED THERAPY OPTIONS
        'Nilotinib': {
            name: 'Nilotinib (BCR-ABL/KIT inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Nilotinib', dose: 400, unit: 'mg', schedule: 'PO twice daily until progression' }
            ]
        },
        'Dasatinib': {
            name: 'Dasatinib (BCR-ABL/KIT inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Dasatinib', dose: 70, unit: 'mg', schedule: 'PO twice daily until progression' }
            ]
        },
        'Sorafenib': {
            name: 'Sorafenib (multi-kinase inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'PO twice daily until progression' }
            ]
        },
        'Pazopanib': {
            name: 'Pazopanib (VEGFR inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pazopanib', dose: 800, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        },
        'Cabozantinib': {
            name: 'Cabozantinib (multi-kinase inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Cabozantinib', dose: 60, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        },
        'Everolimus': {
            name: 'Everolimus (mTOR inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        }
    },
    tumor_agnostic: {
        'Pembrolizumab-MSI-H': {
            name: 'Pembrolizumab - MSI-H/dMMR Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Pembrolizumab-TMB-H': {
            name: 'Pembrolizumab - TMB-H (≥10 mut/Mb) Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Larotrectinib': {
            name: 'Larotrectinib - NTRK Fusion-positive Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Larotrectinib', dose: 100, unit: 'mg', schedule: 'twice PO once daily until progression' }
            ]
        },
        'Entrectinib': {
            name: 'Entrectinib - NTRK Fusion-positive Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        },
        'Repotrectinib': {
            name: 'Repotrectinib - NTRK Fusion-positive Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Repotrectinib', dose: 160, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        },
        'Selpercatinib': {
            name: 'Selpercatinib - RET Fusion-positive Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Selpercatinib', dose: 160, unit: 'mg', schedule: 'twice PO once daily until progression' }
            ]
        },
        'Pralsetinib': {
            name: 'Pralsetinib - RET Fusion-positive Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Pralsetinib', dose: 400, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        },
        'Dabrafenib-Trametinib': {
            name: 'Dabrafenib + Trametinib - BRAF V600E-mutant Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'twice PO once daily until progression' },
                { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        },
        'Dostarlimab-MSI-H': {
            name: 'Dostarlimab - MSI-H/dMMR Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'every 21 days for 4 cycles, then 1000 mg every 42 days' }
            ]
        },
        'Nivolumab-MSI-H': {
            name: 'Nivolumab - MSI-H/dMMR Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 14 days or 480 mg every 28 days' }
            ]
        },
        'Vemurafenib': {
            name: 'Vemurafenib - BRAF V600E-mutant Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Vemurafenib', dose: 960, unit: 'mg', schedule: 'twice PO once daily until progression' }
            ]
        },
        'Enfortumab-Vedotin-NECTIN4': {
            name: 'Enfortumab Vedotin - NECTIN-4+ Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Enfortumab Vedotin', dose: 1.25, unit: 'mg/kg', schedule: 'D1, D8, D15 every 28 days' }
            ]
        },
        'Tisotumab-Vedotin-TROP2': {
            name: 'Tisotumab Vedotin - TROP-2+ Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Tisotumab Vedotin', dose: 2.0, unit: 'mg/kg', schedule: 'every 21 days until progression' }
            ]
        }
    },
    neuroendocrine: {
        // Somatostatin Analogs - First Line for Functional NETs
        'Octreotide-LAR': {
            name: 'Octreotide LAR (PROMID Trial) - (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Octreotide LAR', dose: 30, unit: 'mg', schedule: 'D1, every 28 days' }
            ]
        },
        'Lanreotide': {
            name: 'Lanreotide (CLARINET Trial) - (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Lanreotide', dose: 120, unit: 'mg', schedule: 'D1, every 28 days' }
            ]
        },
        
        // Targeted Therapy for Advanced NETs
        'Everolimus': {
            name: 'Everolimus (RADIANT-4 Trial) - (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'PO once daily, continuous' }
            ]
        },
        'Everolimus-Octreotide': {
            name: 'Everolimus + Octreotide LAR (RADIANT-2 Trial) - (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'PO once daily, continuous' },
                { name: 'Octreotide LAR', dose: 30, unit: 'mg', schedule: 'D1, every 28 days' }
            ]
        },
        'Sunitinib': {
            name: 'Sunitinib (Pancreatic NETs) - (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Sunitinib', dose: 37.5, unit: 'mg', schedule: 'PO once daily, continuous' }
            ]
        },
        
        // Peptide Receptor Radionuclide Therapy
        'Lutetium-177': {
            name: 'Lutetium Lu 177 Dotatate (NETTER-1 Trial) - (Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Lutetium Lu 177 Dotatate', dose: 7.4, unit: 'GBq', schedule: 'D1, every 8 weeks' }
            ]
        },
        
        // Chemotherapy for High-Grade NETs
        'Cisplatin-Etoposide': {
            name: 'Cisplatin + Etoposide (High-Grade NETs) - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' }
            ]
        },
        'Carboplatin-Etoposide': {
            name: 'Carboplatin + Etoposide (High-Grade NETs) - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' }
            ]
        },
        'Temozolomide': {
            name: 'Temozolomide (Pancreatic NETs) - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 200, unit: 'mg/m²', schedule: 'D1-D5, every 28 days' }
            ]
        },
        'Capecitabine-Temozolomide': {
            name: 'Capecitabine + Temozolomide (CAPTEM) - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 750, unit: 'mg/m²', schedule: 'PO BID D1-D14, every 28 days' },
                { name: 'Temozolomide', dose: 200, unit: 'mg/m²', schedule: 'D10-D14, every 28 days' }
            ]
        },
        
        // Alkylating Agents for Pancreatic NETs
        'Streptozocin-5FU': {
            name: 'Streptozocin + 5-FU (Pancreatic NETs) - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Streptozocin', dose: 500, unit: 'mg/m²', schedule: 'D1-D5, every 6 weeks' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'D1-D5, every 6 weeks' }
            ]
        },
        'Streptozocin-Doxorubicin': {
            name: 'Streptozocin + Doxorubicin (Pancreatic NETs) - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Streptozocin', dose: 500, unit: 'mg/m²', schedule: 'D1-D5, every 6 weeks' },
                { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 6 weeks' }
            ]
        },
        'Dacarbazine': {
            name: 'Dacarbazine (DTIC) - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Dacarbazine', dose: 200, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        
        // Newer Targeted Agents
        'Cabozantinib': {
            name: 'Cabozantinib (Advanced NETs) - (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Cabozantinib', dose: 60, unit: 'mg', schedule: 'PO once daily, continuous' }
            ]
        },
        'Lenvatinib': {
            name: 'Lenvatinib (Advanced NETs) - (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Lenvatinib', dose: 24, unit: 'mg', schedule: 'PO once daily, continuous' }
            ]
        },
        'Axitinib': {
            name: 'Axitinib (Advanced NETs) - (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Axitinib', dose: 5, unit: 'mg', schedule: 'PO BID, continuous' }
            ]
        },
        
        // Interferon (Historical)
        'Interferon-Alpha': {
            name: 'Interferon Alpha-2b (Historical) - (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Interferon Alpha-2b', dose: 5, unit: 'MU', schedule: 'SC TIW, continuous' }
            ]
        }
    },
    cervical: {
        // Neoadjuvant/Adjuvant Therapy
        'Cisplatin-Paclitaxel-Neo-Adj': {
            name: 'Cisplatin + Paclitaxel (Neoadjuvant/Adjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Neo-Adj': {
            name: 'Paclitaxel + Carboplatin (PC) (Neoadjuvant/Adjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'BIP-Neo-Adj': {
            name: 'Bleomycin + Ifosfamide + Cisplatin (Neoadjuvant/Adjuvant)',
            cycles: 3,
            drugs: [
                { name: 'Bleomycin', dose: 30, unit: 'units', schedule: 'D1, every 21 days' },
                { name: 'Ifosfamide', dose: 1500, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                { name: 'Mesna (pre-dose)', dose: 300, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D5, every 21 days' },
                { name: 'Mesna (4h post)', dose: 600, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D5, every 21 days' },
                { name: 'Mesna (8h post)', dose: 600, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D5, every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        'BIC-Neo-Adj': {
            name: 'Bleomycin + Ifosfamide + Carboplatin (Neoadjuvant/Adjuvant)',
            cycles: 3,
            drugs: [
                { name: 'Bleomycin', dose: 30, unit: 'units', schedule: 'D1, every 21 days' },
                { name: 'Ifosfamide', dose: 1500, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                { name: 'Mesna', dose: 1500, unit: 'mg/m²', schedule: '300 mg/m² before Ifosfamide, then 600 mg/m² at 4h and 8h post-Ifosfamide, D1-D5, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },

        // Definitive Chemoradiotherapy
        'Cisplatin-RT': {
            name: 'Cisplatin + RT (Definitive)',
            cycles: 5,
            drugs: [
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'D1, every 7 days during radiation therapy x 5-6 weeks' }
            ]
        },
        'Cisplatin-Pembrolizumab-RT': {
            name: 'Cisplatin + Pembrolizumab + RT (Definitive)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'D1, every 7 days during radiation therapy x 5-6 weeks' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Pembrolizumab-RT': {
            name: 'Carboplatin + Pembrolizumab + RT (Definitive)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, every 7 days during radiation therapy' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Mitomycin-5FU-RT': {
            name: 'Mitomycin + 5-Fluorouracil + RT (Definitive)',
            cycles: 2,
            drugs: [
                { name: 'Mitomycin', dose: 10, unit: 'mg/m²', schedule: 'D1, D29' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²/day', schedule: 'continuous infusion D1-4, D29-32' }
            ]
        },

        // Metastatic - 1L
        'Cisplatin-Paclitaxel-Metastatic': {
            name: 'Cisplatin + Paclitaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Metastatic': {
            name: 'Paclitaxel + Carboplatin (PC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Weekly-Metastatic': {
            name: 'Paclitaxel + Carboplatin (PC) Weekly (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, every 7 days' },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, every 7 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Pembrolizumab-Metastatic': {
            name: 'Paclitaxel + Carboplatin + Pembrolizumab (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Paclitaxel-Pembrolizumab-Metastatic': {
            name: 'Cisplatin + Paclitaxel + Pembrolizumab (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Paclitaxel-Bevacizumab-Metastatic': {
            name: 'Cisplatin + Paclitaxel + Bevacizumab (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Bevacizumab-Metastatic': {
            name: 'Paclitaxel + Carboplatin + Bevacizumab (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Atezolizumab-Bevacizumab-Metastatic': {
            name: 'Paclitaxel + Carboplatin + Atezolizumab + Bevacizumab (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Paclitaxel-Atezolizumab-Bevacizumab-Metastatic': {
            name: 'Cisplatin + Paclitaxel + Atezolizumab + Bevacizumab (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Pembrolizumab-Bevacizumab-Metastatic': {
            name: 'Paclitaxel + Carboplatin + Pembrolizumab + Bevacizumab (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Paclitaxel-Pembrolizumab-Bevacizumab-Metastatic': {
            name: 'Cisplatin + Paclitaxel + Pembrolizumab + Bevacizumab (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Carboplatin-Pembrolizumab-Metastatic': {
            name: 'Gemcitabine + Carboplatin + Pembrolizumab (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Cisplatin-Pembrolizumab-Metastatic': {
            name: 'Gemcitabine + Cisplatin + Pembrolizumab (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },

        // Metastatic
        'Pembrolizumab-Metastatic-2L': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Tisotumab-Vedotin-Metastatic-2L': {
            name: 'Tisotumab vedotin (Trop-2 ADC) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Tisotumab vedotin', dose: 2.0, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Topotecan-Metastatic-2L': {
            name: 'Topotecan monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', schedule: 'D1-5, every 21 days' }
            ]
        },
        'Topotecan-Weekly-Metastatic-2L': {
            name: 'Topotecan monotherapy (weekly) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Topotecan', dose: 4.0, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        'Pemetrexed-Metastatic-2L': {
            name: 'Pemetrexed monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Metastatic-2L': {
            name: 'Gemcitabine monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Docetaxel-Metastatic-2L': {
            name: 'Docetaxel monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Paclitaxel-Metastatic-2L': {
            name: 'Paclitaxel monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Irinotecan-Metastatic-2L': {
            name: 'Irinotecan monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Irinotecan', dose: 125, unit: 'mg/m²', schedule: 'D1, D8, D15, D22, every 42 days' }
            ]
        },
        'Cisplatin-Topotecan-Metastatic-2L': {
            name: 'Cisplatin + Topotecan (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Topotecan', dose: 0.75, unit: 'mg/m²', schedule: 'D1-3, every 21 days' }
            ]
        },
        'Paclitaxel-Topotecan-Metastatic-2L': {
            name: 'Paclitaxel + Topotecan (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Topotecan', dose: 0.75, unit: 'mg/m²', schedule: 'D1-3, every 21 days' }
            ]
        },
        'Paclitaxel-Topotecan-Bevacizumab-Metastatic-2L': {
            name: 'Paclitaxel + Topotecan + Bevacizumab (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Topotecan', dose: 0.75, unit: 'mg/m²', schedule: 'D1-3, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Gemcitabine-Metastatic-2L': {
            name: 'Gemcitabine + Cisplatin (GC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Cisplatin-Docetaxel-Metastatic-2L': {
            name: 'Cisplatin + Docetaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Docetaxel-Metastatic-2L': {
            name: 'Carboplatin + Docetaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        }
    },
    endometrial: {
        // Neoadjuvant/Adjuvant Therapy
        'Carboplatin-Paclitaxel-Neo-Adj': {
            name: 'Paclitaxel + Carboplatin (PC) (Neoadjuvant/Adjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Pembrolizumab-Neo-Adj-Met': {
            name: 'Paclitaxel + Carboplatin + Pembrolizumab (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Dostarlimab-Neo-Adj-Met': {
            name: 'Paclitaxel + Carboplatin + Dostarlimab (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Durvalumab-dMMR-Neo-Adj-Met': {
            name: 'Paclitaxel + Carboplatin + Durvalumab (dMMR/MSI-H) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Durvalumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Trastuzumab-HER2-Neo-Adj-Met': {
            name: 'Paclitaxel + Carboplatin + Trastuzumab (HER2+) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: '8 mg/kg loading dose, then 6 mg/kg D1, every 21 days', hasLoadingDose: true }
            ]
        },
        'Carboplatin-Paclitaxel-Bevacizumab-Neo-Adj-Met': {
            name: 'Paclitaxel + Carboplatin + Bevacizumab (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },

        // Definitive Therapy (with Radiation)
        'Cisplatin-RT': {
            name: 'Cisplatin + RT (Definitive)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'D1, every 7 days during radiation therapy' }
            ]
        },

        // Metastatic - 1L
        'Carboplatin-Paclitaxel-Metastatic': {
            name: 'Paclitaxel + Carboplatin (PC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Docetaxel-Metastatic': {
            name: 'Carboplatin + Docetaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Lenvatinib-Pembrolizumab-Metastatic': {
            name: 'Lenvatinib + Pembrolizumab (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Lenvatinib', dose: 20, unit: 'mg', schedule: 'PO once daily, continuous' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },

        // Metastatic
        'AP-Metastatic': {
            name: 'Doxorubicin + Cisplatin (AP) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'CAP-Metastatic': {
            name: 'Cyclophosphamide + Doxorubicin + Cisplatin (CAP) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'TAP-Metastatic': {
            name: 'Cisplatin + Doxorubicin + Paclitaxel (TAP) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Doxorubicin', dose: 45, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 160, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'AC-Metastatic': {
            name: 'Doxorubicin + Cyclophosphamide (AC) (Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Docetaxel-Metastatic': {
            name: 'Gemcitabine + Docetaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 900, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D8, every 21 days' }
            ]
        },
        'Gemcitabine-Cisplatin-Metastatic': {
            name: 'Gemcitabine + Cisplatin (GC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },

        // Carcinosarcoma-specific regimens
        'Ifosfamide-Carcinosarcoma': {
            name: 'Ifosfamide monotherapy (Carcinosarcoma) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 1500, unit: 'mg/m²', schedule: 'D1-5, every 21 days' },
                { name: 'Mesna (pre-dose)', dose: 300, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-5, every 21 days' },
                { name: 'Mesna (4h post)', dose: 600, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-5, every 21 days' },
                { name: 'Mesna (8h post)', dose: 600, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-5, every 21 days' }
            ]
        },
        'Ifosfamide-Paclitaxel-Carcinosarcoma': {
            name: 'Ifosfamide + Paclitaxel (Carcinosarcoma) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 1600, unit: 'mg/m²', schedule: 'D1-3, every 21 days' },
                { name: 'Mesna (pre-dose)', dose: 320, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-3, every 21 days' },
                { name: 'Mesna (4h post)', dose: 640, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-3, every 21 days' },
                { name: 'Mesna (8h post)', dose: 640, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-3, every 21 days' },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },

        // Single agents and targeted therapy for dMMR/MSI-H
        'Pembrolizumab-Monotherapy-dMMR': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (dMMR/MSI-H) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Dostarlimab-Monotherapy-dMMR': {
            name: 'Dostarlimab monotherapy (PD-1 inhibitor) (dMMR/MSI-H) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'D1, every 21 days x 4, then 1000mg every 6 weeks' }
            ]
        },

        // Single agents
        'Single-Topotecan': {
            name: 'Topotecan monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', schedule: 'D1-5, every 21 days' }
            ]
        },
        'Single-Doxorubicin': {
            name: 'Doxorubicin monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Single-Paclitaxel': {
            name: 'Paclitaxel monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },

        // Hormonal therapy
        'Megestrol': {
            name: 'Megestrol Acetate (Hormonal therapy) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Megestrol Acetate', dose: 160, unit: 'mg', schedule: 'PO once daily, continuous' }
            ]
        },
        'Medroxyprogesterone': {
            name: 'Medroxyprogesterone Acetate (Hormonal therapy) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Medroxyprogesterone Acetate', dose: 200, unit: 'mg', schedule: 'PO once daily, continuous' }
            ]
        }
    },
    colorectal: {
        colon_cancer: {
            // Adjuvant Therapy
            'Capecitabine-Adjuvant': {
                name: 'Capecitabine monotherapy (Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
                ]
            },
            '5FU-LV-Adjuvant': {
                name: '5-Fluorouracil + Leucovorin (Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: '5-Fluorouracil', dose: 425, unit: 'mg/m²', schedule: 'D1-5, every 28 days' },
                    { name: 'Leucovorin', dose: 20, unit: 'mg/m²', schedule: 'D1-5, every 28 days' }
                ]
            },
            'mFOLFOX6-Neo-Adj': {
                name: 'mFOLFOX6 (Neoadjuvant/Adjuvant)',
                cycles: 12,
                drugs: [
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' }
                ]
            },
            'CapeOX-Neo-Adj': {
                name: 'Capecitabine + Oxaliplatin (CAPOX/XELOX) (Neoadjuvant/Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
                ]
            },
            'Nivolumab-Ipilimumab-Neo-NICHE2': {
                name: 'Nivolumab + Ipilimumab (NICHE-2) (dMMR/MSI-H/POLE mutation) (Neoadjuvant)',
                cycles: 2,
                drugs: [
                    { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'D1, D15' },
                    { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1 only' }
                ]
            },
            'Pembrolizumab-Neo-dMMR': {
                name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (dMMR/MSI-H/POLE mutation) (Neoadjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Cemiplimab-Neo-dMMR': {
                name: 'Cemiplimab monotherapy (PD-1 inhibitor) (dMMR/MSI-H/POLE mutation) (Neoadjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Cemiplimab', dose: 350, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Dostarlimab-Neo-dMMR': {
                name: 'Dostarlimab monotherapy (PD-1 inhibitor) (dMMR/MSI-H/POLE mutation) (Neoadjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Retifanlimab-Neo-dMMR': {
                name: 'Retifanlimab monotherapy (PD-1 inhibitor) (dMMR/MSI-H/POLE mutation) (Neoadjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Retifanlimab', dose: 500, unit: 'mg', schedule: 'D1, every 28 days' }
                ]
            },
            'Toripalimab-Neo-dMMR': {
                name: 'Toripalimab monotherapy (PD-1 inhibitor) (dMMR/MSI-H/POLE mutation) (Neoadjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Toripalimab', dose: 240, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Tislelizumab-Neo-dMMR': {
                name: 'Tislelizumab monotherapy (PD-1 inhibitor) (dMMR/MSI-H/POLE mutation) (Neoadjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Tislelizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'mFOLFOX6-Atezolizumab-Adj-dMMR': {
                name: 'mFOLFOX6 + Atezolizumab (dMMR/MSI-H/POLE mutation) (Adjuvant)',
                cycles: 12,
                drugs: [
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' },
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'CapeOX-Atezolizumab-Adj-dMMR': {
                name: 'Capecitabine + Oxaliplatin + Atezolizumab (dMMR/MSI-H/POLE mutation) (Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            }
        },

        rectal_cancer: {
            // Neoadjuvant/Adjuvant Therapy
            'mFOLFOX6-Rectal-Neo-Adj': {
                name: 'mFOLFOX6 (Neoadjuvant/Adjuvant)',
                cycles: 12,
                drugs: [
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' }
                ]
            },
            'CapeOX-Rectal-Neo-Adj': {
                name: 'Capecitabine + Oxaliplatin (CAPOX/XELOX) (Neoadjuvant/Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
                ]
            },
            'Dostarlimab-Rectal-Neo-dMMR': {
                name: 'Dostarlimab monotherapy (PD-1 inhibitor) (dMMR/MSI-H) (Neoadjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            '5FU-RT-German-AIO': {
                name: '5-FU + RT (German AIO) (Neoadjuvant/Adjuvant)',
                cycles: 2,
                drugs: [
                    { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'continuous infusion D1-D5, every 28 days during RT' }
                ]
            },
            'Capecitabine-RT-Neo-Adj': {
                name: 'Capecitabine + RT (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'PO twice daily on days of radiation therapy' }
                ]
            },
            '5FU-Oxaliplatin-RT-Neo': {
                name: '5-FU + Oxaliplatin + RT (Neoadjuvant)',
                cycles: 6,
                drugs: [
                    { name: '5-Fluorouracil', dose: 200, unit: 'mg/m²', schedule: 'continuous infusion throughout entire course of RT' },
                    { name: 'Oxaliplatin', dose: 60, unit: 'mg/m²', schedule: 'D1, D8, D15, D22, D29, D36 during RT' }
                ]
            },
            'CapeOX-RT-Neo': {
                name: 'Capecitabine + Oxaliplatin + RT (Neoadjuvant)',
                cycles: 5,
                drugs: [
                    { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'PO twice daily D1-D14 and D22-D35 during RT' },
                    { name: 'Oxaliplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, D8, D22, D29 during RT' }
                ]
            },
            '5FU-LV-Weekly-Adj': {
                name: '5-FU + Leucovorin (Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: '5-Fluorouracil', dose: 500, unit: 'mg/m²', schedule: 'D1, every 7 days' },
                    { name: 'Leucovorin', dose: 500, unit: 'mg/m²', schedule: 'D1, every 7 days' }
                ]
            },
            'FOLFOX4-Adj': {
                name: 'FOLFOX4 (Adjuvant)',
                cycles: 12,
                drugs: [
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (continuous infusion)', dose: 600, unit: 'mg/m²', schedule: '22-hour infusion D1-D2, every 14 days' },
                    { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, D2, every 14 days' }
                ]
            },
            '5FU-LV-deGramont-Adj': {
                name: '5-FU + Leucovorin (deGramont) (Adjuvant)',
                cycles: 12,
                drugs: [
                    { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, D2, every 14 days' },
                    { name: '5-Fluorouracil (continuous infusion)', dose: 600, unit: 'mg/m²', schedule: '22-hour infusion D1, D2, every 14 days' },
                    { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, D2, every 14 days' }
                ]
            },
            'Capecitabine-Rectal-Adj': {
                name: 'Capecitabine monotherapy (Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
                ]
            }
        },

        metastatic_colorectal: {
            // Metastatic - 1L
            'Modified-IFL-Saltz': {
                name: 'Modified IFL (Saltz) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Irinotecan', dose: 125, unit: 'mg/m²', schedule: 'D1, D8, D15, D22, every 6 weeks' },
                    { name: '5-Fluorouracil (bolus)', dose: 500, unit: 'mg/m²', schedule: 'D1, D8, D15, D22, every 6 weeks' },
                    { name: 'Leucovorin', dose: 20, unit: 'mg/m²', schedule: 'D1, D8, D15, D22, every 6 weeks' }
                ]
            },
            'Douillard-Regimen': {
                name: 'Douillard Regimen (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (continuous infusion)', dose: 600, unit: 'mg/m²', schedule: '22-hour infusion D1-D2, every 14 days' },
                    { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, every 14 days' }
                ]
            },
            'mFOLFIRI-Metastatic': {
                name: 'mFOLFIRI (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' }
                ]
            },
            'mFOLFOX6-Metastatic': {
                name: 'mFOLFOX6 (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' }
                ]
            },
            'FOLFOXIRI-Metastatic': {
                name: 'FOLFOXIRI (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Irinotecan', dose: 165, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (continuous infusion)', dose: 3200, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' },
                    { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, D2, every 14 days' }
                ]
            },
            'mFOLFOX6-Bevacizumab-Metastatic': {
                name: 'mFOLFOX6 + Bevacizumab (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' },
                    { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'D1, every 14 days' }
                ]
            },
            'CapeOX-Bevacizumab-Metastatic': {
                name: 'Capecitabine + Oxaliplatin + Bevacizumab (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                    { name: 'Bevacizumab', dose: 7.5, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'FOLFIRI-Bevacizumab-Metastatic': {
                name: 'FOLFIRI + Bevacizumab (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' },
                    { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'D1, every 14 days' }
                ]
            },
            'FOLFIRINOX-Metastatic': {
                name: 'FOLFIRINOX (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' }
                ]
            },
            'FOLFIRINOX-Bevacizumab-Metastatic': {
                name: 'FOLFIRINOX + Bevacizumab (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' },
                    { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'D1, every 14 days' }
                ]
            },
            'FOLFOXIRI-Bevacizumab-Metastatic': {
                name: 'FOLFOXIRI + Bevacizumab (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Irinotecan', dose: 165, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (continuous infusion)', dose: 3200, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' },
                    { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, D2, every 14 days' },
                    { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'D1, every 14 days' }
                ]
            },
            'mFOLFOX6-Cetuximab-Metastatic': {
                name: 'mFOLFOX6 + Cetuximab (KRAS/NRAS/BRAF WT/Left-sided) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Cetuximab', dose: 500, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' }
                ]
            },
            'mFOLFOX6-Panitumumab-Metastatic': {
                name: 'mFOLFOX6 + Panitumumab (KRAS/NRAS/BRAF WT/Left-sided) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Panitumumab', dose: 6, unit: 'mg/kg', schedule: 'D1, every 14 days' },
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' }
                ]
            },
            'CapeOX-Cetuximab-Metastatic': {
                name: 'Capecitabine + Oxaliplatin + Cetuximab (KRAS/NRAS/BRAF WT/Left-sided) (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'D1, every 7 days (loading dose 400 mg/m², then 250 mg/m²)', hasLoadingDose: true },
                    { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
                ]
            },
            'CapeOX-Panitumumab-Metastatic': {
                name: 'Capecitabine + Oxaliplatin + Panitumumab (KRAS/NRAS/BRAF WT/Left-sided) (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Panitumumab', dose: 6, unit: 'mg/kg', schedule: 'D1, every 14 days' },
                    { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
                ]
            },
            'FOLFIRI-Cetuximab-Metastatic': {
                name: 'FOLFIRI + Cetuximab (KRAS/NRAS/BRAF WT/Left-sided) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Cetuximab', dose: 500, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' }
                ]
            },
            'FOLFIRI-Panitumumab-Metastatic': {
                name: 'FOLFIRI + Panitumumab (KRAS/NRAS/BRAF WT/Left-sided) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Panitumumab', dose: 6, unit: 'mg/kg', schedule: 'D1, every 14 days' },
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' }
                ]
            },

            // Metastatic and Later
            'Cetuximab-Irinotecan-Metastatic': {
                name: 'Cetuximab + Irinotecan (KRAS/NRAS/BRAF WT) (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'D1, every 7 days (loading dose 400 mg/m², then 250 mg/m²)', hasLoadingDose: true },
                    { name: 'Irinotecan', dose: 350, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'CapeOX-Metastatic': {
                name: 'Capecitabine + Oxaliplatin (CAPOX/XELOX) (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
                ]
            },
            'XELIRI-Metastatic': {
                name: 'Capecitabine + Irinotecan (mXELIRI/CapIRI / Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                    { name: 'Irinotecan', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Capecitabine-Mitomycin-C-Metastatic': {
                name: 'Capecitabine + Mitomycin-C (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                    { name: 'Mitomycin-C', dose: 7, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Oxaliplatin-Irinotecan-Metastatic': {
                name: 'Oxaliplatin + Irinotecan (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Irinotecan', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            '5FU-LV-Roswell-Park-Metastatic': {
                name: '5-FU + Leucovorin (Roswell Park) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: '5-Fluorouracil', dose: 500, unit: 'mg/m²', schedule: 'D1, every 7 days D1, D8, D15, D22, D29, D36, every 56 days' },
                    { name: 'Leucovorin', dose: 500, unit: 'mg/m²', schedule: 'D1, every 7 days D1, D8, D15, D22, D29, D36, every 56 days' }
                ]
            },
            '5FU-LV-Bevacizumab-Metastatic': {
                name: '5-FU + Leucovorin + Bevacizumab (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: '5-Fluorouracil', dose: 500, unit: 'mg/m²', schedule: 'D1, every 7 days' },
                    { name: 'Leucovorin', dose: 500, unit: 'mg/m²', schedule: 'D1, every 7 days' },
                    { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'D1, every 14 days' }
                ]
            },
            'TAS-102-Bevacizumab-Metastatic': {
                name: 'TAS-102 + Bevacizumab (SUNLIGHT) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'TAS-102', dose: 35, unit: 'mg/m²', schedule: 'PO twice daily D1-5, D8-12, every 28 days' },
                    { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'D1, every 14 days' }
                ]
            },
            'TAS-102-Metastatic': {
                name: 'TAS-102 monotherapy (RECOURSE) (Trifluridine/Tipiracil) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'TAS-102', dose: 35, unit: 'mg/m²', schedule: 'PO twice daily D1-5, D8-12, every 28 days' }
                ]
            },
            'Cetuximab-Bevacizumab-Irinotecan-Metastatic': {
                name: 'Cetuximab + Bevacizumab + Irinotecan (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Cetuximab', dose: 500, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'D1, every 14 days' },
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 14 days' }
                ]
            },
            'Cetuximab-Bevacizumab-Metastatic': {
                name: 'Cetuximab + Bevacizumab (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Cetuximab', dose: 500, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'D1, every 14 days' }
                ]
            },
            'Irinotecan-Cetuximab-Metastatic': {
                name: 'Irinotecan + Cetuximab (CRYSTAL/OPUS) (KRAS/NRAS/BRAF WT) (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Irinotecan', dose: 350, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'D1, every 7 days (loading dose 400 mg/m², then 250 mg/m²)', hasLoadingDose: true }
                ]
            },
            'XELIRI-Bevacizumab-Metastatic': {
                name: 'mXELIRI/CapIRI + Bevacizumab (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                    { name: 'Irinotecan', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Bevacizumab', dose: 7.5, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'FOLFIRI-Ziv-Aflibercept-Metastatic': {
                name: 'FOLFIRI + Ziv-aflibercept (VELOUR) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' },
                    { name: 'Ziv-aflibercept', dose: 4, unit: 'mg/kg', schedule: 'D1, every 14 days' }
                ]
            },
            'FOLFIRI-Ramucirumab-Metastatic': {
                name: 'FOLFIRI + Ramucirumab (RAISE) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' },
                    { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'D1, every 14 days' }
                ]
            },

            // BRAF V600E Targeted Therapy
            'mFOLFOX6-Encorafenib-Cetuximab-BRAF': {
                name: 'mFOLFOX6 + Encorafenib + Cetuximab (BREAKWATER) (BRAF V600E mutation) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' },
                    { name: 'Encorafenib', dose: 300, unit: 'mg', schedule: 'PO once daily' },
                    { name: 'Cetuximab', dose: 500, unit: 'mg/m²', schedule: 'D1, every 14 days' }
                ]
            },
            'mFOLFOX6-Encorafenib-Panitumumab-BRAF': {
                name: 'mFOLFOX6 + Encorafenib + Panitumumab (BRAF V600E mutation) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' },
                    { name: 'Encorafenib', dose: 300, unit: 'mg', schedule: 'PO once daily' },
                    { name: 'Panitumumab', dose: 6, unit: 'mg/kg', schedule: 'D1, every 14 days' }
                ]
            },
            'Vemurafenib-Irinotecan-Cetuximab-BRAF': {
                name: 'Vemurafenib + Irinotecan + Cetuximab (SWOG-1406) (BRAF V600E mutation) (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Vemurafenib', dose: 960, unit: 'mg', schedule: 'PO twice daily' },
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Cetuximab', dose: 500, unit: 'mg/m²', schedule: 'D1, every 14 days' }
                ]
            },
            'Binimetinib-Encorafenib-Cetuximab-BRAF': {
                name: 'Binimetinib + Encorafenib + Cetuximab (BEACON CRC) (BRAF V600E mutation) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Binimetinib', dose: 45, unit: 'mg', schedule: 'PO twice daily' },
                    { name: 'Encorafenib', dose: 300, unit: 'mg', schedule: 'PO once daily' },
                    { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'D1, every 7 days (loading dose 400 mg/m², then 250 mg/m²)', hasLoadingDose: true }
                ]
            },
            'Encorafenib-Cetuximab-BRAF': {
                name: 'Encorafenib + Cetuximab (BEACON CRC) (BRAF V600E mutation) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Encorafenib', dose: 300, unit: 'mg', schedule: 'PO once daily' },
                    { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'D1, every 7 days (loading dose 400 mg/m², then 250 mg/m²)', hasLoadingDose: true }
                ]
            },
            'Encorafenib-Panitumumab-BRAF': {
                name: 'Encorafenib + Panitumumab (BRAF V600E mutation) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Encorafenib', dose: 300, unit: 'mg', schedule: 'PO once daily' },
                    { name: 'Panitumumab', dose: 6, unit: 'mg/kg', schedule: 'D1, every 14 days' }
                ]
            },

            // Immunotherapy (dMMR/MSI-H)
            'Nivolumab-Ipilimumab-dMMR': {
                name: 'Nivolumab + Ipilimumab (CheckMate-142) (dMMR/MSI-H) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 14 days' },
                    { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'every 6 weeks for 4 doses' }
                ]
            },

            // HER2 Targeted Therapy
            'Trastuzumab-Lapatinib-HER2': {
                name: 'Trastuzumab + Lapatinib (HER2 positive) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, every 7 days (loading dose 8 mg/kg, then 6 mg/kg)', hasLoadingDose: true },
                    { name: 'Lapatinib', dose: 1000, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Trastuzumab-Tucatinib-HER2': {
                name: 'Trastuzumab + Tucatinib (HER2 positive) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, every 7 days (loading dose 8 mg/kg, then 6 mg/kg)', hasLoadingDose: true },
                    { name: 'Tucatinib', dose: 300, unit: 'mg', schedule: 'PO twice daily' }
                ]
            },
            'Trastuzumab-Pertuzumab-HER2': {
                name: 'Trastuzumab + Pertuzumab (HER2 positive) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, every 7 days (loading dose 8 mg/kg, then 6 mg/kg)', hasLoadingDose: true },
                    { name: 'Pertuzumab', dose: 840, maintenanceDose: 420, unit: 'mg', schedule: 'every 21 days (loading dose 840 mg, then 420 mg)', hasLoadingDose: true }
                ]
            },

            // Single Agents
            'Capecitabine-Single': {
                name: 'Capecitabine monotherapy (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
                ]
            },
            'Irinotecan-Weekly-Single': {
                name: 'Irinotecan monotherapy (weekly) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Irinotecan', dose: 125, unit: 'mg/m²', schedule: 'weekly D1, D8, D15, D22, every 42 days' }
                ]
            },
            'Irinotecan-Monthly-Single': {
                name: 'Irinotecan monotherapy (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Irinotecan', dose: 350, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Cetuximab-Single': {
                name: 'Cetuximab monotherapy (KRAS/NRAS/BRAF WT) (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'D1, every 7 days (loading dose 400 mg/m², then 250 mg/m²)', hasLoadingDose: true }
                ]
            },
            'Panitumumab-Single': {
                name: 'Panitumumab monotherapy (KRAS/NRAS/BRAF WT) (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Panitumumab', dose: 6, unit: 'mg/kg', schedule: 'D1, every 14 days' }
                ]
            },
            'Trastuzumab-Deruxtecan-HER2': {
                name: 'Trastuzumab deruxtecan (HER2 positive) (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Trastuzumab deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'Regorafenib-Single': {
                name: 'Regorafenib (CORRECT) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Regorafenib', dose: 160, unit: 'mg', schedule: 'daily D1-D21, every 28 days' }
                ]
            },
            'Pembrolizumab-dMMR': {
                name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (KEYNOTE-177) (dMMR/MSI-H) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Nivolumab-dMMR': {
                name: 'Nivolumab monotherapy (PD-1 inhibitor) (dMMR/MSI-H) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days' }
                ]
            },
            'Larotrectinib-NTRK': {
                name: 'Larotrectinib (NAVIGATE) (NTRK fusion) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Larotrectinib', dose: 100, unit: 'mg', schedule: 'PO twice daily' }
                ]
            },
            'Entrectinib-NTRK': {
                name: 'Entrectinib (STARTRK-2) (NTRK fusion) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Sotorasib-KRAS-G12C': {
                name: 'Sotorasib (CodeBreaK 100) (KRAS G12C mutation) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Sotorasib', dose: 960, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Adagrasib-KRAS-G12C': {
                name: 'Adagrasib (KRYSTAL-1) (KRAS G12C mutation) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Adagrasib', dose: 600, unit: 'mg', schedule: 'PO twice daily' }
                ]
            },
            'Selpercatinib-RET': {
                name: 'Selpercatinib (LIBRETTO-001) (RET gene fusion) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Selpercatinib', dose: 160, unit: 'mg', schedule: 'PO twice daily' }
                ]
            },
            'Dostarlimab-dMMR': {
                name: 'Dostarlimab monotherapy (PD-1 inhibitor) (dMMR/MSI-H) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Cemiplimab-dMMR': {
                name: 'Cemiplimab monotherapy (PD-1 inhibitor) (dMMR/MSI-H) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Cemiplimab', dose: 350, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Trifluridine-Tipiracil-Bevacizumab': {
                name: 'Trifluridine + Tipiracil + Bevacizumab (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Trifluridine + Tipiracil', dose: 35, unit: 'mg/m²', schedule: 'PO twice daily D1-5, D8-12, every 28 days' },
                    { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'D1, every 14 days' }
                ]
            },
            'Retifanlimab-dMMR': {
                name: 'Retifanlimab monotherapy (PD-1 inhibitor) (dMMR/MSI-H) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Retifanlimab', dose: 500, unit: 'mg', schedule: 'D1, every 28 days' }
                ]
            },
            'Tislelizumab-dMMR': {
                name: 'Tislelizumab monotherapy (PD-1 inhibitor) (dMMR/MSI-H) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Tislelizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Toripalimab-dMMR': {
                name: 'Toripalimab monotherapy (PD-1 inhibitor) (dMMR/MSI-H) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Toripalimab', dose: 240, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Fruquintinib': {
                name: 'Fruquintinib (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Fruquintinib', dose: 5, unit: 'mg', schedule: 'daily D1-D21, every 28 days' }
                ]
            },
            'Nivolumab-Ipilimumab-dMMR': {
                name: 'Nivolumab + Ipilimumab (dMMR/MSI-H) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 21 days x 4 doses, then 240mg every 14 days or 480mg every 4 weeks' },
                    { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 21 days x 4 doses only' }
                ]
            }
        }
    },
    esophageal: {
        // NEOADJUVANT/PERIOPERATIVE THERAPY
        'CROSS-Neoadjuvant': {
            name: 'CROSS Protocol (Neoadjuvant) - Paclitaxel + Carboplatin + RT',
            cycles: 5,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, every 7 days x 5 weeks (with concurrent RT)' },
                { name: 'Paclitaxel', dose: 50, unit: 'mg/m²', schedule: 'D1, every 7 days x 5 weeks (with concurrent RT)' }
            ]
        },
        'PRODIGES-ACCORD17-Neoadjuvant': {
            name: 'PRODIGES/ACCORD17 (Neoadjuvant) - 5-FU + Cisplatin + RT',
            cycles: 2,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, week 1 and 5 (with concurrent RT)' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'CI D1-D4, week 1 and 5 (with concurrent RT)' }
            ]
        },
        'FLOT4-Perioperative': {
            name: 'FLOT4 (Perioperative) - Docetaxel + Oxaliplatin + Leucovorin + 5-FU',
            cycles: 8,
            drugs: [
                { name: 'Docetaxel', dose: 50, unit: 'mg/m²', schedule: 'D1, every 14 days (4 cycles preop + 4 cycles postop)' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days (4 cycles preop + 4 cycles postop)' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, every 14 days (4 cycles preop + 4 cycles postop)' },
                { name: '5-Fluorouracil', dose: 2600, unit: 'mg/m²', schedule: 'CI over 24 hours D1, every 14 days (4 cycles preop + 4 cycles postop)' }
            ]
        },
        'ECF-MAGIC-Perioperative': {
            name: 'ECF MAGIC (Perioperative) - Epirubicin + Cisplatin + 5-FU',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days (3 cycles preop + 3 cycles postop)' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days (3 cycles preop + 3 cycles postop)' },
                { name: '5-Fluorouracil', dose: 200, unit: 'mg/m²', schedule: 'CI D1-D21, every 21 days (3 cycles preop + 3 cycles postop)' }
            ]
        },
        'Nivolumab-Ipilimumab': {
            name: 'Nivolumab (PD-1 inhibitor) + Ipilimumab (CTLA-4 inhibitor) (CheckMate-032) (MSI-H/dMMR) (Neoadjuvant/Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 14 days x 4, then 480mg flat dose every 28 days' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 6 weeks x 4 doses' }
            ]
        },
        'Neoadjuvant-FOLFOX-Pembrolizumab': {
            name: 'mFOLFOX6 + Pembrolizumab (Neoadjuvant)',
            cycles: 4,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days x 8 cycles (preoperative)' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days x 8 cycles (preoperative)' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days x 8 cycles (preoperative)' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: 'CI over 46 hours D1-D2, every 14 days x 8 cycles (preoperative)' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days x 4 cycles (preoperative)' }
            ]
        },
        'Neoadjuvant-CapeOX-Trastuzumab-HER2': {
            name: 'Capecitabine + Oxaliplatin + Trastuzumab (Neoadjuvant, HER2+)',
            cycles: 6,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days x 6 cycles (preoperative)' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days x 6 cycles (preoperative)' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg D1, every 21 days x 6 cycles (preoperative)', hasLoadingDose: true }
            ]
        },

        // ADJUVANT THERAPY
        'Adjuvant-Nivolumab': {
            name: 'Nivolumab monotherapy (PD-1 inhibitor) (Adjuvant) - post-CRT with residual disease',
            cycles: 16,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days x 16 cycles (postoperative)' }
            ]
        },
        // DEFINITIVE CHEMORADIATION (SQUAMOUS CELL CARCINOMA)
        'Definitive-5FU-Cisplatin-RT': {
            name: '5-FU + Cisplatin + RT (Definitive, Squamous)',
            cycles: 2,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, week 1 and 5 (with concurrent RT)' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'CI D1-D4, week 1 and 5 (with concurrent RT)' }
            ]
        },

        // METASTATIC THERAPY
        'Pembrolizumab': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (MSI-H/dMMR or PD-L1 CPS ≥1) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 17,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Metastatic-FOLFOX-Pembrolizumab': {
            name: 'mFOLFOX6 + Pembrolizumab (PD-L1 CPS≥1) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: 'CI over 46 hours D1-D2, every 14 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days (given with every other FOLFOX cycle)' }
            ]
        },
        'Metastatic-CapeOX-Trastuzumab-HER2': {
            name: 'Capecitabine + Oxaliplatin + Trastuzumab (HER2+) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg D1, every 21 days', hasLoadingDose: true }
            ]
        },
        'Metastatic-FOLFOX-Trastuzumab-HER2': {
            name: 'mFOLFOX6 + Trastuzumab (HER2+) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: 'CI over 46 hours D1-D2, every 14 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg D1, every 21 days', hasLoadingDose: true }
            ]
        },
        'Metastatic-CapeOX-Trastuzumab-Pembrolizumab-HER2': {
            name: 'Capecitabine + Oxaliplatin + Trastuzumab + Pembrolizumab (HER2+/PD-L1 CPS≥1) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg D1, every 21 days', hasLoadingDose: true },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Metastatic-FOLFOX': {
            name: 'mFOLFOX6 (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: 'D1-D2, CI over 46 hours, every 14 days' }
            ]
        },
        'Metastatic-CapeOX': {
            name: 'Capecitabine + Oxaliplatin (CAPOX/XELOX) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
            ]
        },
        'Metastatic-Carboplatin-Paclitaxel': {
            name: 'Paclitaxel + Carboplatin (PC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Metastatic-Cisplatin-Paclitaxel': {
            name: 'Cisplatin + Paclitaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Metastatic-ECX': {
            name: 'ECX (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 625, unit: 'mg/m²', schedule: 'PO twice daily D1-D21, every 21 days' }
            ]
        },
        'Metastatic-EOX': {
            name: 'EOX (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 625, unit: 'mg/m²', schedule: 'PO twice daily D1-D21, every 21 days' }
            ]
        },

        // METASTATIC THERAPY
        'Metastatic-FOLFIRI-2L': {
            name: 'FOLFIRI (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: 'D1-D2, CI over 46 hours, every 14 days' }
            ]
        },
        'Metastatic-Ramucirumab-Paclitaxel-2L': {
            name: 'Ramucirumab + Paclitaxel (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'D1, D15, every 28 days' },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        'Metastatic-T-DXd-HER2-2L': {
            name: 'Trastuzumab Deruxtecan (T-DXd) (HER2+) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab Deruxtecan', dose: 6.4, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Metastatic-Trastuzumab-Pertuzumab-HER2-2L': {
            name: 'Trastuzumab + Pertuzumab (HER2+) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg D1, every 21 days', hasLoadingDose: true },
                { name: 'Pertuzumab', dose: 840, maintenanceDose: 420, unit: 'mg', schedule: 'loading dose D1, then 420 mg D1, every 21 days', hasLoadingDose: true }
            ]
        },
        'Metastatic-Paclitaxel-2L': {
            name: 'Paclitaxel monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Metastatic-Paclitaxel-Weekly-2L': {
            name: 'Paclitaxel monotherapy (Metastatic, weekly)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, every 7 days x 18 doses' }
            ]
        },
        'Metastatic-Docetaxel-2L': {
            name: 'Docetaxel monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Metastatic-Irinotecan-2L': {
            name: 'Irinotecan monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Irinotecan', dose: 350, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Metastatic-Cisplatin-Irinotecan-2L': {
            name: 'Cisplatin + Irinotecan (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 30, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Irinotecan', dose: 65, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Metastatic-5FU-Paclitaxel-2L': {
            name: '5-FU + Paclitaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'CI over 46 hours D1-D2, every 14 days' },
                { name: 'Paclitaxel', dose: 150, unit: 'mg/m²', schedule: 'D1, every 14 days' }
            ]
        },

        // METASTATIC - 3L+ THERAPY
        'Metastatic-Pembrolizumab-3L': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (PD-L1 CPS≥10) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Metastatic-Regorafenib-3L': {
            name: 'Regorafenib (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Regorafenib', dose: 160, unit: 'mg', schedule: 'PO once daily D1-D21, every 28 days' }
            ]
        },
        'Metastatic-Trifluridine-Tipiracil-3L': {
            name: 'Trifluridine/Tipiracil (TAS-102) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Trifluridine/Tipiracil', dose: 35, unit: 'mg/m²', schedule: 'PO twice daily D1-D5, D8-D12, every 28 days' }
            ]
        }
    },
    head_neck: {
        // DEFINITIVE CHEMORADIOTHERAPY
        'Cisplatin-RT': {
            name: 'Cisplatin + Radiotherapy (Definitive/Adjuvant Chemoradiotherapy)',
            cycles: 3,
            drugs: [
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days concurrent with RT' }
            ]
        },
        'Cisplatin-RT-Weekly': {
            name: 'Cisplatin + Radiotherapy (weekly) (Definitive/Adjuvant Chemoradiotherapy)',
            cycles: 7,
            drugs: [
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'D1, every 7 days x 7 weeks concurrent with RT' }
            ]
        },
        'Cetuximab-RT': {
            name: 'Cetuximab (EGFR inhibitor) + Radiotherapy (Definitive Chemoradiotherapy)',
            cycles: 7,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: '400 mg/m² loading dose, then 250 mg/m² weekly concurrent with RT', hasLoadingDose: true }
            ]
        },
        'Carboplatin-Paclitaxel-RT': {
            name: 'Paclitaxel + Carboplatin + Radiotherapy (weekly) (Definitive Chemoradiotherapy)',
            cycles: 7,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, every 7 days x 7 weeks concurrent with RT' },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, every 7 days x 7 weeks concurrent with RT' }
            ]
        },

        // NEOADJUVANT THERAPY
        'TPF-Neoadjuvant': {
            name: 'Docetaxel + Cisplatin + 5-Fluorouracil (TPF) (TAX-323/324) (Neoadjuvant)',
            cycles: 3,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'CI over 4 days D1-D4, every 21 days' }
            ]
        },
        'TPF-Modified-Neoadjuvant': {
            name: 'Docetaxel + Cisplatin + 5-Fluorouracil (TPF Modified) (Neoadjuvant)',
            cycles: 3,
            drugs: [
                { name: 'Docetaxel', dose: 70, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'CI over 4 days D1-D4, every 21 days' }
            ]
        },
        'DIC-Neoadjuvant': {
            name: 'Docetaxel + Ifosfamide + Cisplatin (DIC) (Neoadjuvant)',
            cycles: 4,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Mesna (pre-dose)', dose: 240, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D3 every 21 days' },
                { name: 'Mesna (4h post)', dose: 480, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D3 every 21 days' },
                { name: 'Mesna (8h post)', dose: 480, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D3 every 21 days' }
            ]
        },
        'TIP-Neoadjuvant': {
            name: 'Paclitaxel + Ifosfamide + Cisplatin (TIP) (Neoadjuvant)',
            cycles: 4,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Mesna (pre-dose)', dose: 240, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D3 every 21 days' },
                { name: 'Mesna (4h post)', dose: 480, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D3 every 21 days' },
                { name: 'Mesna (8h post)', dose: 480, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D3 every 21 days' }
            ]
        },
        'Paclitaxel-Ifosfamide-Carboplatin-Neoadjuvant': {
            name: 'Paclitaxel + Ifosfamide + Carboplatin (Neoadjuvant)',
            cycles: 4,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Mesna (pre-dose)', dose: 240, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D3 every 21 days' },
                { name: 'Mesna (4h post)', dose: 480, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D3 every 21 days' },
                { name: 'Mesna (8h post)', dose: 480, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D3 every 21 days' }
            ]
        },
        'Cisplatin-5FU-Neoadjuvant': {
            name: 'Cisplatin + 5-Fluorouracil (Neoadjuvant)',
            cycles: 3,
            drugs: [
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'CI over 4 days D1-D4, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Neoadjuvant': {
            name: 'Paclitaxel + Carboplatin (Neoadjuvant)',
            cycles: 3,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },

        // ADJUVANT THERAPY
        'Carboplatin-Paclitaxel-RT-Adjuvant': {
            name: 'Paclitaxel + Carboplatin + Radiotherapy (weekly) (Adjuvant Chemoradiotherapy)',
            cycles: 7,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, every 7 days x 7 weeks concurrent with RT' },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, every 7 days x 7 weeks concurrent with RT' }
            ]
        },

        // METASTATIC THERAPY - FIRST LINE
        'Pembrolizumab-Cisplatin-5FU-1L': {
            name: 'Pembrolizumab (PD-1 inhibitor) + Cisplatin + 5-Fluorouracil (KEYNOTE-048) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'CI over 4 days D1-D4, every 21 days' }
            ]
        },
        'Pembrolizumab-Carboplatin-5FU-1L': {
            name: 'Pembrolizumab (PD-1 inhibitor) + Carboplatin + 5-Fluorouracil (KEYNOTE-048) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'CI over 4 days D1-D4, every 21 days' }
            ]
        },
        'Pembrolizumab-Carboplatin-Paclitaxel-1L': {
            name: 'Pembrolizumab (PD-1 inhibitor) + Paclitaxel + Carboplatin (KEYNOTE-048) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Pembrolizumab-Monotherapy-CPS20-1L': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (KEYNOTE-048) (PD-L1 CPS≥20) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Cisplatin-5FU-Cetuximab-1L': {
            name: 'Cisplatin + 5-Fluorouracil + Cetuximab (EGFR inhibitor) (EXTREME) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: '400 mg/m² loading dose, then 250 mg/m² weekly', hasLoadingDose: true },
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'CI over 4 days D1-D4, every 21 days' }
            ]
        },
        'Carboplatin-5FU-Cetuximab-1L': {
            name: 'Carboplatin + 5-Fluorouracil + Cetuximab (EGFR inhibitor) (EXTREME) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: '400 mg/m² loading dose, then 250 mg/m² weekly', hasLoadingDose: true },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'CI over 4 days D1-D4, every 21 days' }
            ]
        },
        'Cisplatin-5FU-1L': {
            name: 'Cisplatin + 5-Fluorouracil (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'CI over 4 days D1-D4, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-1L': {
            name: 'Paclitaxel + Carboplatin (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Paclitaxel-1L': {
            name: 'Cisplatin + Paclitaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },

        // NASOPHARYNGEAL CARCINOMA
        'Toripalimab-Gemcitabine-Cisplatin-NPC': {
            name: 'Toripalimab (PD-1 inhibitor) + Gemcitabine + Cisplatin (JUPITER-02) (Nasopharyngeal) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Toripalimab', dose: 240, unit: 'mg', schedule: 'D1, every 21 days' },
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Cisplatin-NPC': {
            name: 'Gemcitabine + Cisplatin (Nasopharyngeal) (Neoadjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Vinorelbine-NPC': {
            name: 'Cisplatin + Vinorelbine (Nasopharyngeal) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Vinorelbine', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },

        // SECOND LINE THERAPY
        'Pembrolizumab-Monotherapy-CPS1-2L': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (KEYNOTE-040) (PD-L1 CPS≥1) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Nivolumab-Monotherapy-CPS1-2L': {
            name: 'Nivolumab monotherapy (PD-1 inhibitor) (CheckMate-141) (PD-L1 CPS≥1) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days or 480mg every 28 days' }
            ]
        },
        'Cetuximab-Monotherapy-2L': {
            name: 'Cetuximab monotherapy (EGFR inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: '400 mg/m² loading dose, then 250 mg/m² weekly', hasLoadingDose: true }
            ]
        },
        'Docetaxel-Monotherapy-2L': {
            name: 'Docetaxel monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Paclitaxel-Monotherapy-2L': {
            name: 'Paclitaxel monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Paclitaxel-Weekly-2L': {
            name: 'Paclitaxel monotherapy (weekly) (Metastatic)',
            cycles: 18,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, every 7 days' }
            ]
        },
        'Methotrexate-Monotherapy-2L': {
            name: 'Methotrexate monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Methotrexate', dose: 40, unit: 'mg/m²', schedule: 'D1, every 7 days' }
            ]
        },
        'Capecitabine-Monotherapy-2L': {
            name: 'Capecitabine monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
            ]
        },
        'Carboplatin-Cetuximab-2L': {
            name: 'Carboplatin + Cetuximab (EGFR inhibitor) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: '400 mg/m² loading dose, then 250 mg/m² weekly', hasLoadingDose: true },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'Paclitaxel-Carboplatin-Cetuximab-2L': {
            name: 'Paclitaxel + Carboplatin + Cetuximab (EGFR inhibitor) (PCE) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: '400 mg/m² loading dose, then 250 mg/m² weekly', hasLoadingDose: true },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },

        // TARGETED THERAPY
        'Afatinib': {
            name: 'Afatinib (EGFR inhibitor) (EGFR mutation+) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Afatinib', dose: 40, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        }
    },
    leukemia: {
        cml: {
            // FIRST-LINE THERAPY (Newly Diagnosed)
            'Imatinib-First-Line': {
                name: 'Imatinib (BCR-ABL inhibitor) (IRIS) (First-Line)',
                cycles: 12,
                drugs: [
                    { name: 'Imatinib', dose: 400, unit: 'mg', schedule: 'PO once daily continuously' }
                ]
            },
            'Dasatinib-First-Line': {
                name: 'Dasatinib (BCR-ABL inhibitor) (DASISION) (First-Line)',
                cycles: 12,
                drugs: [
                    { name: 'Dasatinib', dose: 100, unit: 'mg', schedule: 'PO once daily continuously' }
                ]
            },
            'Nilotinib-First-Line': {
                name: 'Nilotinib (BCR-ABL inhibitor) (ENESTnd) (First-Line)',
                cycles: 12,
                drugs: [
                    { name: 'Nilotinib', dose: 300, unit: 'mg', schedule: 'PO twice daily continuously' }
                ]
            },
            'Bosutinib-First-Line': {
                name: 'Bosutinib (BCR-ABL inhibitor) (BFORE) (First-Line)',
                cycles: 12,
                drugs: [
                    { name: 'Bosutinib', dose: 400, unit: 'mg', schedule: 'PO once daily continuously' }
                ]
            },

            // SECOND-LINE THERAPY (First TKI Failure)
            'Dasatinib-Second-Line': {
                name: 'Dasatinib (BCR-ABL inhibitor) (Second-Line)',
                cycles: 12,
                drugs: [
                    { name: 'Dasatinib', dose: 100, unit: 'mg', schedule: 'PO once daily continuously (chronic phase)' }
                ]
            },
            'Dasatinib-Second-Line-AP': {
                name: 'Dasatinib (BCR-ABL inhibitor) (Accelerated/Blast Phase) (Second-Line)',
                cycles: 12,
                drugs: [
                    { name: 'Dasatinib', dose: 140, unit: 'mg', schedule: 'PO once daily continuously' }
                ]
            },
            'Nilotinib-Second-Line': {
                name: 'Nilotinib (BCR-ABL inhibitor) (Second-Line)',
                cycles: 12,
                drugs: [
                    { name: 'Nilotinib', dose: 400, unit: 'mg', schedule: 'PO twice daily continuously' }
                ]
            },
            'Bosutinib-Second-Line': {
                name: 'Bosutinib (BCR-ABL inhibitor) (Second-Line)',
                cycles: 12,
                drugs: [
                    { name: 'Bosutinib', dose: 500, unit: 'mg', schedule: 'PO once daily continuously' }
                ]
            },

            // THIRD-LINE THERAPY AND T315I MUTATION
            'Ponatinib': {
                name: 'Ponatinib (BCR-ABL inhibitor) (PACE) (T315I mutation/Multiple TKI resistance) (Third-Line)',
                cycles: 12,
                drugs: [
                    { name: 'Ponatinib', dose: 45, unit: 'mg', schedule: 'PO once daily continuously (reduce to 30mg or 15mg based on response)' }
                ]
            },
            'Asciminib-T315I': {
                name: 'Asciminib (STAMP allosteric inhibitor) (ASCEMBL) (T315I mutation) (Third-Line)',
                cycles: 12,
                drugs: [
                    { name: 'Asciminib', dose: 200, unit: 'mg', schedule: 'PO twice daily continuously' }
                ]
            },
            'Asciminib-Non-T315I': {
                name: 'Asciminib (STAMP allosteric inhibitor) (ASCEMBL) (Non-T315I resistance) (Third-Line)',
                cycles: 12,
                drugs: [
                    { name: 'Asciminib', dose: 40, unit: 'mg', schedule: 'PO twice daily continuously' }
                ]
            },

            // RELAPSED/REFRACTORY THERAPY
            'Omacetaxine': {
                name: 'Omacetaxine (protein synthesis inhibitor) (T315I resistant/Multi-TKI failure) (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Omacetaxine', dose: 1.25, unit: 'mg/m²', schedule: 'SC twice daily D1-14, every 28 days' }
                ]
            },

            // BLAST CRISIS THERAPY
            'Imatinib-High-Dose': {
                name: 'Imatinib (high-dose) (BCR-ABL inhibitor) (Blast Crisis)',
                cycles: 12,
                drugs: [
                    { name: 'Imatinib', dose: 600, unit: 'mg', schedule: 'PO once daily continuously (may increase to 800mg)' }
                ]
            },

            // BRIDGE/CYTOREDUCTIVE THERAPY
            'Hydroxyurea': {
                name: 'Hydroxyurea (cytoreductive therapy) (Bridge/Initial cytoreduction)',
                cycles: 6,
                drugs: [
                    { name: 'Hydroxyurea', dose: 1000, unit: 'mg', schedule: 'PO twice daily (titrate 500-3000mg daily based on counts)' }
                ]
            },

            // HISTORICAL/SPECIAL CIRCUMSTANCES
            'Interferon-alpha-2a': {
                name: 'Interferon alpha-2a (historical/pregnancy/special circumstances)',
                cycles: 12,
                drugs: [
                    { name: 'Interferon alpha-2a', dose: 5, unit: 'MIU', schedule: 'SC daily continuously' }
                ]
            },
            'Interferon-Cytarabine': {
                name: 'Interferon alpha + Cytarabine (historical pre-TKI era)',
                cycles: 12,
                drugs: [
                    { name: 'Interferon alpha-2a', dose: 5, unit: 'MIU', schedule: 'SC daily continuously' },
                    { name: 'Cytarabine', dose: 20, unit: 'mg/m²', schedule: 'SC daily D1-10, every 28 days' }
                ]
            }
        },
        cll: {
            // FIRST-LINE THERAPY - Fit Patients (No 17p deletion/TP53 mutation)
            'FCR-First-Line': {
                name: 'Fludarabine + Cyclophosphamide + Rituximab (FCR) (CLL8) (First-Line, Fit Patients)',
                cycles: 6,
                drugs: [
                    { name: 'Fludarabine', dose: 25, unit: 'mg/m²', schedule: 'D1-D3, every 28 days' },
                    { name: 'Cyclophosphamide', dose: 250, unit: 'mg/m²', schedule: 'D1-D3, every 28 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1 cycle 1, then 500 mg/m² D1, every 28 days' }
                ]
            },
            'Obinutuzumab-Venetoclax-First-Line': {
                name: 'Obinutuzumab (CD20 mAb) + Venetoclax (BCL-2 inhibitor) (CLL14) (First-Line)',
                cycles: 12,
                drugs: [
                    { name: 'Obinutuzumab', dose: 1000, unit: 'mg', schedule: 'D1, D8, D15 cycle 1, then D1 every 28 days x 6 cycles' },
                    { name: 'Venetoclax', dose: 400, unit: 'mg', schedule: 'PO daily continuously (ramp-up: 20mg→50mg→100mg→200mg→400mg weekly)' }
                ]
            },
            'Acalabrutinib-Obinutuzumab-First-Line': {
                name: 'Acalabrutinib (BTK inhibitor) + Obinutuzumab (CD20 mAb) (ELEVATE-TN) (First-Line)',
                cycles: 6,
                drugs: [
                    { name: 'Acalabrutinib', dose: 100, unit: 'mg', schedule: 'PO twice daily continuously' },
                    { name: 'Obinutuzumab', dose: 1000, unit: 'mg', schedule: 'D1, D8, D15 cycle 1, then D1 every 28 days x 6 cycles' }
                ]
            },
            'Ibrutinib-Rituximab-First-Line': {
                name: 'Ibrutinib (BTK inhibitor) + Rituximab (CD20 mAb) (ECOG-ACRIN E1912) (First-Line)',
                cycles: 6,
                drugs: [
                    { name: 'Ibrutinib', dose: 420, unit: 'mg', schedule: 'PO once daily continuously' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1 cycle 1, then 500 mg/m² D1, every 28 days x 6 cycles' }
                ]
            },
            'Zanubrutinib-First-Line': {
                name: 'Zanubrutinib monotherapy (BTK inhibitor) (SEQUOIA) (First-Line)',
                cycles: 12,
                drugs: [
                    { name: 'Zanubrutinib', dose: 160, unit: 'mg', schedule: 'PO twice daily continuously' }
                ]
            },
            
            // FIRST-LINE THERAPY - Elderly/Unfit Patients
            'Obinutuzumab-Chlorambucil-First-Line': {
                name: 'Obinutuzumab (CD20 mAb) + Chlorambucil (CLL11) (First-Line, Elderly/Unfit)',
                cycles: 6,
                drugs: [
                    { name: 'Obinutuzumab', dose: 1000, unit: 'mg', schedule: 'D1, D8, D15 cycle 1, then D1 every 28 days' },
                    { name: 'Chlorambucil', dose: 0.5, unit: 'mg/kg', schedule: 'PO D1, D15 every 28 days' }
                ]
            },
            'BR-First-Line': {
                name: 'Bendamustine + Rituximab (BR) (CLL2M) (First-Line, Elderly)',
                cycles: 6,
                drugs: [
                    { name: 'Bendamustine', dose: 90, unit: 'mg/m²', schedule: 'D1-D2, every 28 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1 cycle 1, then 500 mg/m² D1, every 28 days' }
                ]
            },
            'Acalabrutinib-First-Line': {
                name: 'Acalabrutinib monotherapy (BTK inhibitor) (ELEVATE-TN) (First-Line)',
                cycles: 12,
                drugs: [
                    { name: 'Acalabrutinib', dose: 100, unit: 'mg', schedule: 'PO twice daily continuously' }
                ]
            },
            'Ibrutinib-First-Line': {
                name: 'Ibrutinib monotherapy (BTK inhibitor) (RESONATE-2) (First-Line)',
                cycles: 12,
                drugs: [
                    { name: 'Ibrutinib', dose: 420, unit: 'mg', schedule: 'PO once daily continuously' }
                ]
            },

            // FIRST-LINE THERAPY - 17p deletion/TP53 mutation
            'Venetoclax-Obinutuzumab-17p': {
                name: 'Venetoclax (BCL-2 inhibitor) + Obinutuzumab (CD20 mAb) (17p deletion/TP53 mutation) (First-Line)',
                cycles: 12,
                drugs: [
                    { name: 'Venetoclax', dose: 400, unit: 'mg', schedule: 'PO daily continuously (ramp-up: 20mg→50mg→100mg→200mg→400mg weekly)' },
                    { name: 'Obinutuzumab', dose: 1000, unit: 'mg', schedule: 'D1, D8, D15 cycle 1, then D1 every 28 days x 6 cycles' }
                ]
            },
            'Ibrutinib-17p': {
                name: 'Ibrutinib monotherapy (BTK inhibitor) (RESONATE-17) (17p deletion/TP53 mutation) (First-Line)',
                cycles: 12,
                drugs: [
                    { name: 'Ibrutinib', dose: 420, unit: 'mg', schedule: 'PO once daily continuously' }
                ]
            },
            'Acalabrutinib-17p': {
                name: 'Acalabrutinib monotherapy (BTK inhibitor) (17p deletion/TP53 mutation) (First-Line)',
                cycles: 12,
                drugs: [
                    { name: 'Acalabrutinib', dose: 100, unit: 'mg', schedule: 'PO twice daily continuously' }
                ]
            },

            // SECOND-LINE THERAPY
            'Venetoclax-Rituximab-Second-Line': {
                name: 'Venetoclax (BCL-2 inhibitor) + Rituximab (CD20 mAb) (MURANO) (Second-Line)',
                cycles: 24,
                drugs: [
                    { name: 'Venetoclax', dose: 400, unit: 'mg', schedule: 'PO daily x 24 months (ramp-up: 20mg→50mg→100mg→200mg→400mg weekly)' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1 cycle 1, then 500 mg/m² D1, every 28 days x 6 cycles' }
                ]
            },
            'Ibrutinib-Second-Line': {
                name: 'Ibrutinib monotherapy (BTK inhibitor) (RESONATE) (Second-Line)',
                cycles: 12,
                drugs: [
                    { name: 'Ibrutinib', dose: 420, unit: 'mg', schedule: 'PO once daily continuously' }
                ]
            },
            'Acalabrutinib-Second-Line': {
                name: 'Acalabrutinib monotherapy (BTK inhibitor) (ASCEND) (Second-Line)',
                cycles: 12,
                drugs: [
                    { name: 'Acalabrutinib', dose: 100, unit: 'mg', schedule: 'PO twice daily continuously' }
                ]
            },
            'Zanubrutinib-Second-Line': {
                name: 'Zanubrutinib monotherapy (BTK inhibitor) (ALPINE) (Second-Line)',
                cycles: 12,
                drugs: [
                    { name: 'Zanubrutinib', dose: 160, unit: 'mg', schedule: 'PO twice daily continuously' }
                ]
            },
            'Idelalisib-Rituximab-Second-Line': {
                name: 'Idelalisib (PI3K inhibitor) + Rituximab (CD20 mAb) (Second-Line)',
                cycles: 8,
                drugs: [
                    { name: 'Idelalisib', dose: 150, unit: 'mg', schedule: 'PO twice daily continuously' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'weekly x 8 doses, then every 4 weeks' }
                ]
            },

            // RELAPSED/REFRACTORY THERAPY - BTK Inhibitor Resistance
            'Pirtobrutinib': {
                name: 'Pirtobrutinib (non-covalent BTK inhibitor) (BRUIN) (BTK inhibitor-resistant) (Relapsed/Refractory)',
                cycles: 12,
                drugs: [
                    { name: 'Pirtobrutinib', dose: 200, unit: 'mg', schedule: 'PO once daily continuously' }
                ]
            },
            'Lisocabtagene-maraleucel': {
                name: 'Lisocabtagene maraleucel (CAR-T therapy) (TRANSCEND CLL 004) (Relapsed/Refractory)',
                cycles: 1,
                drugs: [
                    { name: 'Lisocabtagene maraleucel', dose: '50-110 x 10⁶', unit: 'CAR+ T cells', schedule: 'Single infusion (after lymphodepletion)' }
                ]
            },

            // RELAPSED/REFRACTORY THERAPY - Multi-Drug Resistant
            'Alemtuzumab': {
                name: 'Alemtuzumab (CD52 mAb) (17p deletion/TP53 mutation/Multi-resistant) (Relapsed/Refractory)',
                cycles: 3,
                drugs: [
                    { name: 'Alemtuzumab', dose: 30, unit: 'mg', schedule: 'IV 3x weekly x 12 weeks (escalate: 3mg→10mg→30mg)' }
                ]
            },
            'Lenalidomide-Rituximab': {
                name: 'Lenalidomide (immunomodulator) + Rituximab (CD20 mAb) (Relapsed/Refractory)',
                cycles: 8,
                drugs: [
                    { name: 'Lenalidomide', dose: 10, unit: 'mg', schedule: 'PO D1-21, every 28 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'weekly x 4, then monthly x 4' }
                ]
            },

            // SALVAGE CHEMOTHERAPY
            'Bendamustine-Rituximab-Salvage': {
                name: 'Bendamustine + Rituximab (BR) (Salvage) (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Bendamustine', dose: 90, unit: 'mg/m²', schedule: 'D1-D2, every 28 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1 cycle 1, then 500 mg/m² D1, every 28 days' }
                ]
            },
            'FCR-Salvage': {
                name: 'Fludarabine + Cyclophosphamide + Rituximab (FCR) (Salvage) (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Fludarabine', dose: 25, unit: 'mg/m²', schedule: 'D1-D3, every 28 days' },
                    { name: 'Cyclophosphamide', dose: 250, unit: 'mg/m²', schedule: 'D1-D3, every 28 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1 cycle 1, then 500 mg/m² D1, every 28 days' }
                ]
            },

            // MAINTENANCE THERAPY
            'Rituximab-Maintenance': {
                name: 'Rituximab (CD20 mAb) (Maintenance)',
                cycles: 8,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'every 3 months x 2 years' }
                ]
            },

            // HISTORICAL/SPECIAL CIRCUMSTANCES
            'Chlorambucil-Historical': {
                name: 'Chlorambucil monotherapy (historical/special circumstances)',
                cycles: 12,
                drugs: [
                    { name: 'Chlorambucil', dose: 0.5, unit: 'mg/kg', schedule: 'PO D1, D15 every 28 days' }
                ]
            },
            'PCR-Historical': {
                name: 'Pentostatin + Cyclophosphamide + Rituximab (PCR) (historical alternative to FCR)',
                cycles: 6,
                drugs: [
                    { name: 'Pentostatin', dose: 2, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1 cycle 1, then 500 mg/m² D1, every 21 days' }
                ]
            },

            // NEWER AGENTS - PI3K/BTK INHIBITORS
            'Duvelisib': {
                name: 'Duvelisib (PI3K inhibitor) (COPIKTRA) (Relapsed/Refractory)',
                cycles: 8,
                drugs: [
                    { name: 'Duvelisib', dose: 25, unit: 'mg', schedule: 'PO twice daily continuously' }
                ]
            }
        },
        hcl: {
            // FIRST-LINE THERAPY - Standard Treatment
            'Cladribine-First-Line': {
                name: 'Cladribine monotherapy (purine nucleoside analog) (Standard First-Line)',
                cycles: 1,
                drugs: [
                    { name: 'Cladribine', dose: 0.15, unit: 'mg/kg', schedule: 'CI D1-7, single cycle (may repeat once if partial response)' }
                ]
            },
            'Cladribine-SC-First-Line': {
                name: 'Cladribine monotherapy (purine nucleoside analog) (subcutaneous) (First-Line)',
                cycles: 1,
                drugs: [
                    { name: 'Cladribine', dose: 0.15, unit: 'mg/kg', schedule: 'SC D1-5, single cycle (may repeat once if partial response)' }
                ]
            },
            'Pentostatin-First-Line': {
                name: 'Pentostatin monotherapy (purine nucleoside analog) (Alternative First-Line)',
                cycles: 6,
                drugs: [
                    { name: 'Pentostatin', dose: 4, unit: 'mg/m²', schedule: 'D1 every 14 days until CR, then 2 additional cycles' }
                ]
            },

            // FIRST-LINE THERAPY - Combination with Rituximab  
            'Cladribine-Rituximab-First-Line': {
                name: 'Cladribine (purine nucleoside analog) + Rituximab (CD20 monoclonal antibody) (First-Line combination)',
                cycles: 1,
                drugs: [
                    { name: 'Cladribine', dose: 0.15, unit: 'mg/kg', schedule: 'CI D1-7, single cycle' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, then weekly x 7 doses' }
                ]
            },
            'Pentostatin-Rituximab-First-Line': {
                name: 'Pentostatin (purine nucleoside analog) + Rituximab (CD20 monoclonal antibody) (First-Line combination)',
                cycles: 6,
                drugs: [
                    { name: 'Pentostatin', dose: 4, unit: 'mg/m²', schedule: 'D1 every 14 days until CR' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1 every 14 days until CR' }
                ]
            },

            // SECOND-LINE THERAPY - After First Relapse
            'Cladribine-Rituximab-Second-Line': {
                name: 'Cladribine (purine nucleoside analog) + Rituximab (CD20 monoclonal antibody) (Second-Line)',
                cycles: 1,
                drugs: [
                    { name: 'Cladribine', dose: 0.15, unit: 'mg/kg', schedule: 'CI D1-7 or SC D1-5, may repeat once' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'weekly x 8 doses' }
                ]
            },
            'Rituximab-Monotherapy-Second-Line': {
                name: 'Rituximab monotherapy (CD20 monoclonal antibody) (Minimal residual disease/Second-Line)',
                cycles: 2,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'weekly x 8 doses, may repeat course' }
                ]
            },

            // RELAPSED/REFRACTORY THERAPY - Targeted Agents
            'Moxetumomab-RR': {
                name: 'Moxetumomab pasudotox-tdfk (CD22-directed immunotoxin) (FDA approved) (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Moxetumomab pasudotox-tdfk', dose: 40, unit: 'mcg/kg', schedule: 'D1, D3, D5 every 28 days x 6 cycles maximum' }
                ]
            },
            'Vemurafenib-BRAF-RR': {
                name: 'Vemurafenib (BRAF inhibitor) (BRAF V600E+ HCL) (Relapsed/Refractory)',
                cycles: 8,
                drugs: [
                    { name: 'Vemurafenib', dose: 960, unit: 'mg', schedule: 'PO twice daily until progression or maximum response' }
                ]
            },
            'Vemurafenib-Cobimetinib-BRAF-RR': {
                name: 'Vemurafenib (BRAF inhibitor) + Cobimetinib (MEK inhibitor) (BRAF V600E+ HCL) (Relapsed/Refractory)',
                cycles: 8,
                drugs: [
                    { name: 'Vemurafenib', dose: 960, unit: 'mg', schedule: 'PO twice daily continuously' },
                    { name: 'Cobimetinib', dose: 60, unit: 'mg', schedule: 'PO daily D1-21, then 7 days off, every 28 days' }
                ]
            },
            'Dabrafenib-Trametinib-BRAF-RR': {
                name: 'Dabrafenib (BRAF inhibitor) + Trametinib (MEK inhibitor) (BRAF V600E+ HCL) (Relapsed/Refractory)',
                cycles: 8,
                drugs: [
                    { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'PO twice daily continuously' },
                    { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'PO daily continuously' }
                ]
            },

            // RELAPSED/REFRACTORY THERAPY - Chemotherapy Options
            'Bendamustine-Rituximab-RR': {
                name: 'Bendamustine (alkylating agent) + Rituximab (CD20 monoclonal antibody) (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Bendamustine', dose: 90, unit: 'mg/m²', schedule: 'D1, D2 every 28 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1 every 28 days' }
                ]
            },
            'Fludarabine-Rituximab-RR': {
                name: 'Fludarabine (purine nucleoside analog) + Rituximab (CD20 monoclonal antibody) (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Fludarabine', dose: 25, unit: 'mg/m²', schedule: 'D1-5 every 28 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1 every 28 days' }
                ]
            },

            // SPECIAL CIRCUMSTANCES - Historical/Alternative Options
            'Interferon-alpha-Historical': {
                name: 'Interferon alpha-2a (immunomodulator) (Historical/contraindication to purine analogs)',
                cycles: 12,
                drugs: [
                    { name: 'Interferon alpha-2a', dose: 2000000, unit: 'units/m²', schedule: 'SC daily or 3 times weekly' }
                ]
            },
            'Ibrutinib-Investigational': {
                name: 'Ibrutinib (BTK inhibitor) (investigational) (Multiply relapsed/refractory HCL)',
                cycles: 12,
                drugs: [
                    { name: 'Ibrutinib', dose: 420, unit: 'mg', schedule: 'PO daily continuously (investigational)' }
                ]
            }
        },
        all: {
            // INDUCTION THERAPY - Adult ALL (First-Line)
            'Hyper-CVAD-A-Induction': {
                name: 'Hyper-CVAD Part A (Cyclophosphamide + Vincristine + Doxorubicin + Dexamethasone) (MDACC) (Adult B-ALL) (Induction)',
                cycles: 4,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 300, unit: 'mg/m²', schedule: 'every 12 hours D1-3, every 21 days' },
                    { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'D4, D11, every 21 days (max 2mg)' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'CI over 24 hours D4, every 21 days' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1-4, D11-14, every 21 days' },
                    { name: 'Methotrexate (IT)', dose: 12, unit: 'mg', schedule: 'D2 (CNS prophylaxis)' },
                    { name: 'Cytarabine (IT)', dose: 100, unit: 'mg', schedule: 'D8 (CNS prophylaxis)' }
                ]
            },
            'Hyper-CVAD-B-Consolidation': {
                name: 'Hyper-CVAD Part B (High-dose Methotrexate + Cytarabine) (MDACC) (Adult B-ALL) (Consolidation)',
                cycles: 4,
                drugs: [
                    { name: 'Methotrexate', dose: 1000, unit: 'mg/m²', schedule: 'CI over 24 hours D1, every 21 days' },
                    { name: 'Cytarabine', dose: 3000, unit: 'mg/m²', schedule: 'every 12 hours D2-3, every 21 days' },
                    { name: 'Leucovorin', dose: 50, unit: 'mg', schedule: 'every 6 hours x 8 doses (MTX rescue)' },
                    { name: 'Methotrexate (IT)', dose: 12, unit: 'mg', schedule: 'D2 (CNS prophylaxis)' },
                    { name: 'Cytarabine (IT)', dose: 100, unit: 'mg', schedule: 'D8 (CNS prophylaxis)' }
                ]
            },
            'CALGB-8811-Induction': {
                name: 'CALGB-8811 (Cyclophosphamide + Daunorubicin + Vincristine + Prednisone + L-Asparaginase) (Adult ALL) (Induction)',
                cycles: 1,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 1200, unit: 'mg/m²', schedule: 'D1, D29, every 28 days' },
                    { name: 'Daunorubicin', dose: 45, unit: 'mg/m²', schedule: 'D1-3, D29-31, every 28 days' },
                    { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'D1, D8, D15, D22, D29, D36 (max 2mg)' },
                    { name: 'Prednisone', dose: 60, unit: 'mg/m²', schedule: 'D1-21, every 28 days' },
                    { name: 'L-Asparaginase', dose: 6000, unit: 'units/m²', schedule: 'D5, D8, D11, D15, D18, D22' }
                ]
            },

            // INDUCTION THERAPY - Philadelphia Chromosome-Positive (Ph+) ALL
            'Imatinib-Hyper-CVAD': {
                name: 'Imatinib (BCR-ABL inhibitor) + Hyper-CVAD (MDACC) (Ph+ ALL) (First-Line)',
                cycles: 8,
                drugs: [
                    { name: 'Imatinib', dose: 600, unit: 'mg', schedule: 'PO daily continuously' },
                    { name: 'Cyclophosphamide', dose: 300, unit: 'mg/m²', schedule: 'every 12 hours D1-3, every 21 days' },
                    { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'D4, D11, every 21 days (max 2mg)' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'CI over 24 hours D4, every 21 days' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1-4, D11-14, every 21 days' }
                ]
            },
            'Dasatinib-Hyper-CVAD': {
                name: 'Dasatinib (BCR-ABL inhibitor) + Hyper-CVAD (MDACC) (Ph+ ALL) (First-Line)',
                cycles: 8,
                drugs: [
                    { name: 'Dasatinib', dose: 100, unit: 'mg', schedule: 'PO daily continuously' },
                    { name: 'Cyclophosphamide', dose: 300, unit: 'mg/m²', schedule: 'every 12 hours D1-3, every 21 days' },
                    { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'D4, D11, every 21 days (max 2mg)' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'CI over 24 hours D4, every 21 days' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1-4, D11-14, every 21 days' }
                ]
            },
            'Ponatinib-Hyper-CVAD': {
                name: 'Ponatinib (BCR-ABL inhibitor) + Hyper-CVAD (OPTIC) (T315I+ Ph+ ALL) (First-Line)',
                cycles: 8,
                drugs: [
                    { name: 'Ponatinib', dose: 30, unit: 'mg', schedule: 'PO daily continuously (dose-optimized)' },
                    { name: 'Cyclophosphamide', dose: 300, unit: 'mg/m²', schedule: 'every 12 hours D1-3, every 21 days' },
                    { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'D4, D11, every 21 days (max 2mg)' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'CI over 24 hours D4, every 21 days' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1-4, D11-14, every 21 days' }
                ]
            },

            // INDUCTION THERAPY - Elderly/Unfit Patients
            'Mini-Hyper-CVAD-Elderly': {
                name: 'Mini-Hyper-CVAD (dose-reduced) (Elderly/Unfit ALL) (Induction)',
                cycles: 8,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 150, unit: 'mg/m²', schedule: 'every 12 hours D1-3, every 21 days' },
                    { name: 'Vincristine', dose: 1, unit: 'mg', schedule: 'D4, D11, every 21 days (max 1mg elderly)' },
                    { name: 'Doxorubicin', dose: 25, unit: 'mg/m²', schedule: 'CI over 24 hours D4, every 21 days' },
                    { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1-4, D11-14, every 21 days' }
                ]
            },

            // PEDIATRIC INDUCTION PROTOCOLS  
            'BFM-ALL-Pediatric': {
                name: 'BFM Protocol (Berlin-Frankfurt-Münster) (Pediatric B-ALL) (Induction)',
                cycles: 1,
                drugs: [
                    { name: 'Prednisone', dose: 60, unit: 'mg/m²', schedule: 'D1-28, then taper' },
                    { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D8, D15, D22, D29 (max 2mg)' },
                    { name: 'Daunorubicin', dose: 30, unit: 'mg/m²', schedule: 'D8, D15, D22, D29' },
                    { name: 'L-Asparaginase', dose: 10000, unit: 'units/m²', schedule: 'D12, D15, D18, D21, D24, D27, D30, D33' }
                ]
            },

            // MAINTENANCE THERAPY
            'ALL-Maintenance': {
                name: 'ALL Maintenance (Mercaptopurine + Methotrexate) (Maintenance)',
                cycles: 24,
                drugs: [
                    { name: 'Mercaptopurine', dose: 75, unit: 'mg/m²', schedule: 'PO daily continuously' },
                    { name: 'Methotrexate', dose: 20, unit: 'mg/m²', schedule: 'PO weekly' },
                    { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'D1 every 28 days (max 2mg)' },
                    { name: 'Prednisone', dose: 40, unit: 'mg/m²', schedule: 'D1-5 every 28 days' }
                ]
            },

            // RELAPSED/REFRACTORY THERAPY - Immunotherapy
            'Blinatumomab-RR': {
                name: 'Blinatumomab monotherapy (CD19/CD3 BiTE) (TOWER) (B-ALL) (Relapsed/Refractory)',
                cycles: 5,
                drugs: [
                    { name: 'Blinatumomab', dose: 28, unit: 'mcg/day', schedule: 'CI D1-28 (cycle 1: 9mcg/day week 1, 28mcg/day weeks 2-4), every 42 days' },
                    { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'premedication for CRS prevention' }
                ]
            },
            'Inotuzumab-RR': {
                name: 'Inotuzumab ozogamicin monotherapy (CD22 ADC) (INO-VATE) (B-ALL) (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Inotuzumab ozogamicin', dose: 1.8, unit: 'mg/m²', schedule: 'D1, D8, D15 (cycle 1: 0.8+0.5+0.5 mg/m²), then D1 every 21-28 days' }
                ]
            },

            // RELAPSED/REFRACTORY THERAPY - CAR-T Cell Therapy
            'Tisagenlecleucel-CAR-T': {
                name: 'Tisagenlecleucel (CD19 CAR-T) (ELIANA) (Pediatric/Young Adult B-ALL ≤25 years) (Relapsed/Refractory)',
                cycles: 1,
                drugs: [
                    { name: 'Fludarabine', dose: 30, unit: 'mg/m²', schedule: 'D-4 to D-2 (lymphodepletion)' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D-4 to D-2 (lymphodepletion)' },
                    { name: 'Tisagenlecleucel', dose: 0.2, unit: 'million cells/kg', schedule: 'single infusion D0 (2-14 days post lymphodepletion)' }
                ]
            },
            'Brexucabtagene-CAR-T': {
                name: 'Brexucabtagene autoleucel (CD19 CAR-T) (ZUMA-3) (Adult B-ALL) (Relapsed/Refractory)',
                cycles: 1,
                drugs: [
                    { name: 'Fludarabine', dose: 30, unit: 'mg/m²', schedule: 'D-5 to D-3 (lymphodepletion)' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D-5 to D-3 (lymphodepletion)' },
                    { name: 'Brexucabtagene autoleucel', dose: 1, unit: 'million cells/kg', schedule: 'single infusion D0 (2-7 days post lymphodepletion)' }
                ]
            },

            // RELAPSED/REFRACTORY THERAPY - Salvage Chemotherapy
            'Clofarabine-RR': {
                name: 'Clofarabine monotherapy (purine nucleoside analog) (Pediatric ALL) (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Clofarabine', dose: 52, unit: 'mg/m²', schedule: 'D1-5, every 21-42 days' }
                ]
            },
            'Nelarabine-T-ALL': {
                name: 'Nelarabine monotherapy (purine nucleoside analog) (T-ALL/T-LBL specific) (Relapsed/Refractory)',
                cycles: 3,
                drugs: [
                    { name: 'Nelarabine', dose: 1500, unit: 'mg/m²', schedule: 'D1, D3, D5, every 21 days' }
                ]
            },

            // CNS-DIRECTED THERAPY
            'CNS-Prophylaxis-IT': {
                name: 'CNS Prophylaxis (Triple intrathecal therapy) (CNS Prevention)',
                cycles: 8,
                drugs: [
                    { name: 'Methotrexate (IT)', dose: 12, unit: 'mg', schedule: 'weekly x 8 doses' },
                    { name: 'Cytarabine (IT)', dose: 30, unit: 'mg', schedule: 'weekly x 8 doses' },
                    { name: 'Hydrocortisone (IT)', dose: 15, unit: 'mg', schedule: 'weekly x 8 doses' }
                ]
            },
            'CNS-Treatment-RT': {
                name: 'CNS Treatment (Cranial radiation + intrathecal therapy) (CNS Leukemia)',
                cycles: 4,
                drugs: [
                    { name: 'Cranial radiation', dose: 1800, unit: 'cGy', schedule: 'total dose over 2-3 weeks' },
                    { name: 'Methotrexate (IT)', dose: 15, unit: 'mg', schedule: 'twice weekly x 4 weeks' },
                    { name: 'Cytarabine (IT)', dose: 50, unit: 'mg', schedule: 'twice weekly x 4 weeks' }
                ]
            }
        },
        aml: {
            // INDUCTION THERAPY - Fit Patients (<60 years)
            '7+3-Daunorubicin-Induction': {
                name: 'Cytarabine + Daunorubicin (7+3) (Standard Induction)',
                cycles: 1,
                drugs: [
                    { name: 'Cytarabine', dose: 100, unit: 'mg/m²', schedule: 'CI D1-7, every 21-35 days' },
                    { name: 'Daunorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1-3, every 21-35 days (age <60 years)' }
                ]
            },
            '7+3-Idarubicin-Induction': {
                name: 'Cytarabine + Idarubicin (7+3) (Standard Induction)',
                cycles: 1,
                drugs: [
                    { name: 'Cytarabine', dose: 100, unit: 'mg/m²', schedule: 'CI D1-7, every 21-35 days' },
                    { name: 'Idarubicin', dose: 12, unit: 'mg/m²', schedule: 'D1-3, every 21-35 days' }
                ]
            },
            'CPX-351-Induction': {
                name: 'CPX-351 (liposomal daunorubicin/cytarabine) (VYXEOS) (Therapy-related AML/MDS-related changes) (Induction)',
                cycles: 1,
                drugs: [
                    { name: 'CPX-351', dose: 44, unit: 'units/m²', schedule: 'D1, 3, 5 every 28-42 days (daunorubicin 44mg/m²: cytarabine 100mg/m²)' }
                ]
            },

            // INDUCTION THERAPY - FLT3+ AML
            'Midostaurin-7+3-Induction': {
                name: 'Cytarabine + Daunorubicin + Midostaurin (FLT3 inhibitor) (RATIFY) (FLT3+ AML) (Induction)',
                cycles: 1,
                drugs: [
                    { name: 'Cytarabine', dose: 100, unit: 'mg/m²', schedule: 'CI D1-7, every 21-35 days' },
                    { name: 'Daunorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1-3, every 21-35 days' },
                    { name: 'Midostaurin', dose: 50, unit: 'mg', schedule: 'PO twice daily D8-21, every 21-35 days' }
                ]
            },
            'Quizartinib-7+3-Induction': {
                name: 'Cytarabine + Daunorubicin + Quizartinib (FLT3 inhibitor) (QuANTUM-First) (FLT3-ITD+ AML) (Induction)',
                cycles: 1,
                drugs: [
                    { name: 'Cytarabine', dose: 100, unit: 'mg/m²', schedule: 'CI D1-7, every 21-35 days' },
                    { name: 'Daunorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1-3, every 21-35 days' },
                    { name: 'Quizartinib', dose: 40, unit: 'mg', schedule: 'PO daily D8-21, every 21-35 days' }
                ]
            },
            'Gemtuzumab-7+3-Induction': {
                name: 'Cytarabine + Daunorubicin + Gemtuzumab ozogamicin (CD33 ADC) (ALFA-0701) (CD33+ AML) (Induction)',
                cycles: 1,
                drugs: [
                    { name: 'Cytarabine', dose: 100, unit: 'mg/m²', schedule: 'CI D1-7, every 21-35 days' },
                    { name: 'Daunorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1-3, every 21-35 days' },
                    { name: 'Gemtuzumab ozogamicin', dose: 3, unit: 'mg/m²', schedule: 'D1, 4, 7 every 21-35 days' }
                ]
            },

            // INDUCTION THERAPY - Elderly/Unfit Patients (≥60 years)
            'Venetoclax-Azacitidine-Induction': {
                name: 'Venetoclax (BCL-2 inhibitor) + Azacitidine (hypomethylating agent) (VIALE-A) (Elderly/Unfit) (Induction)',
                cycles: 12,
                drugs: [
                    { name: 'Azacitidine', dose: 75, unit: 'mg/m²', schedule: 'D1-7, every 28 days' },
                    { name: 'Venetoclax', dose: 400, unit: 'mg', schedule: 'PO daily D1-28 (ramp-up: 100mg→200mg→400mg over 3 days)' }
                ]
            },
            'Venetoclax-Decitabine-Induction': {
                name: 'Venetoclax (BCL-2 inhibitor) + Decitabine (hypomethylating agent) (VIALE-A) (Elderly/Unfit) (Induction)',
                cycles: 12,
                drugs: [
                    { name: 'Decitabine', dose: 20, unit: 'mg/m²', schedule: 'D1-5, every 28 days' },
                    { name: 'Venetoclax', dose: 400, unit: 'mg', schedule: 'PO daily D1-28 (ramp-up: 100mg→200mg→400mg over 3 days)' }
                ]
            },
            'Venetoclax-LDAC-Induction': {
                name: 'Venetoclax (BCL-2 inhibitor) + Low-dose cytarabine (VIALE-C) (Elderly/Unfit) (Induction)',
                cycles: 12,
                drugs: [
                    { name: 'Cytarabine', dose: 20, unit: 'mg/m²', schedule: 'SC twice daily D1-10, every 28 days' },
                    { name: 'Venetoclax', dose: 600, unit: 'mg', schedule: 'PO daily D1-28 (ramp-up: 100mg→200mg→400mg→600mg over 4 days)' }
                ]
            },
            'Glasdegib-LDAC-Induction': {
                name: 'Glasdegib (Hedgehog pathway inhibitor) + Low-dose cytarabine (BRIGHT AML 1003) (Elderly/Unfit) (Induction)',
                cycles: 12,
                drugs: [
                    { name: 'Glasdegib', dose: 100, unit: 'mg', schedule: 'PO daily continuously' },
                    { name: 'Cytarabine', dose: 20, unit: 'mg/m²', schedule: 'SC twice daily D1-10, every 28 days' }
                ]
            },

            // ACUTE PROMYELOCYTIC LEUKEMIA (APL) - INDUCTION
            'ATRA-Arsenic-APL': {
                name: 'ATRA + Arsenic trioxide (APL0406) (Low-risk APL) (Induction)',
                cycles: 1,
                drugs: [
                    { name: 'Tretinoin (ATRA)', dose: 45, unit: 'mg/m²', schedule: 'PO daily until CR or 90 days' },
                    { name: 'Arsenic trioxide', dose: 0.15, unit: 'mg/kg', schedule: 'IV daily until CR or 60 doses' }
                ]
            },
            'AIDA-APL': {
                name: 'ATRA + Idarubicin (AIDA) (High-risk APL) (Induction)',
                cycles: 1,
                drugs: [
                    { name: 'Tretinoin (ATRA)', dose: 45, unit: 'mg/m²', schedule: 'PO daily until CR or 90 days' },
                    { name: 'Idarubicin', dose: 12, unit: 'mg/m²', schedule: 'D2, 4, 6, 8' }
                ]
            },

            // CONSOLIDATION THERAPY
            'HiDAC-Consolidation': {
                name: 'High-dose cytarabine (HiDAC) (Consolidation)',
                cycles: 3,
                drugs: [
                    { name: 'Cytarabine', dose: 3000, unit: 'mg/m²', schedule: 'every 12 hours D1, 3, 5 every 28-42 days' }
                ]
            },
            'Intermediate-Dose-AraC-Consolidation': {
                name: 'Intermediate-dose cytarabine (Consolidation)',
                cycles: 4,
                drugs: [
                    { name: 'Cytarabine', dose: 1000, unit: 'mg/m²', schedule: 'every 12 hours D1-6, every 28 days' }
                ]
            },
            'Standard-Dose-AraC-Consolidation': {
                name: 'Standard-dose cytarabine (Consolidation)',
                cycles: 4,
                drugs: [
                    { name: 'Cytarabine', dose: 100, unit: 'mg/m²', schedule: 'CI D1-5, every 28 days' }
                ]
            },
            'Midostaurin-Maintenance': {
                name: 'Midostaurin monotherapy (FLT3 inhibitor) (RATIFY) (FLT3+ AML maintenance) (Maintenance)',
                cycles: 12,
                drugs: [
                    { name: 'Midostaurin', dose: 50, unit: 'mg', schedule: 'PO twice daily continuously x 12 months' }
                ]
            },

            // RELAPSED/REFRACTORY THERAPY - FLT3+ AML
            'Gilteritinib-RR': {
                name: 'Gilteritinib monotherapy (FLT3 inhibitor) (ADMIRAL) (FLT3+ AML) (Relapsed/Refractory)',
                cycles: 12,
                drugs: [
                    { name: 'Gilteritinib', dose: 120, unit: 'mg', schedule: 'PO daily continuously' }
                ]
            },
            'Quizartinib-RR': {
                name: 'Quizartinib monotherapy (FLT3 inhibitor) (QuANTUM-R) (FLT3-ITD+ AML) (Relapsed/Refractory)',
                cycles: 12,
                drugs: [
                    { name: 'Quizartinib', dose: 60, unit: 'mg', schedule: 'PO daily continuously' }
                ]
            },

            // RELAPSED/REFRACTORY THERAPY - IDH+ AML
            'Ivosidenib-RR': {
                name: 'Ivosidenib monotherapy (IDH1 inhibitor) (IDH1+ AML) (Relapsed/Refractory)',
                cycles: 12,
                drugs: [
                    { name: 'Ivosidenib', dose: 500, unit: 'mg', schedule: 'PO daily continuously' }
                ]
            },
            'Enasidenib-RR': {
                name: 'Enasidenib monotherapy (IDH2 inhibitor) (IDH2+ AML) (Relapsed/Refractory)',
                cycles: 12,
                drugs: [
                    { name: 'Enasidenib', dose: 100, unit: 'mg', schedule: 'PO daily continuously' }
                ]
            },
            'Olutasidenib-RR': {
                name: 'Olutasidenib monotherapy (IDH1 inhibitor) (IDH1+ AML) (Relapsed/Refractory)',
                cycles: 12,
                drugs: [
                    { name: 'Olutasidenib', dose: 150, unit: 'mg', schedule: 'PO twice daily continuously' }
                ]
            },

            // RELAPSED/REFRACTORY THERAPY - Salvage Chemotherapy
            'FLAG-IDA-RR': {
                name: 'Fludarabine + Cytarabine + G-CSF + Idarubicin (FLAG-IDA) (Relapsed/Refractory)',
                cycles: 2,
                drugs: [
                    { name: 'G-CSF', dose: 5, unit: 'mcg/kg', schedule: 'SC daily D1-6' },
                    { name: 'Fludarabine', dose: 30, unit: 'mg/m²', schedule: 'D2-6' },
                    { name: 'Cytarabine', dose: 2000, unit: 'mg/m²', schedule: 'D2-6 (2 hours after fludarabine)' },
                    { name: 'Idarubicin', dose: 10, unit: 'mg/m²', schedule: 'D2-4' }
                ]
            },
            'HiDAC-Mitoxantrone-RR': {
                name: 'High-dose cytarabine + Mitoxantrone (Relapsed/Refractory)',
                cycles: 2,
                drugs: [
                    { name: 'Cytarabine', dose: 3000, unit: 'mg/m²', schedule: 'every 12 hours D1, 3, 5' },
                    { name: 'Mitoxantrone', dose: 10, unit: 'mg/m²', schedule: 'D2-6' }
                ]
            },
            'Gemtuzumab-Ozogamicin-RR': {
                name: 'Gemtuzumab ozogamicin monotherapy (CD33 ADC) (CD33+ AML) (Relapsed/Refractory)',
                cycles: 2,
                drugs: [
                    { name: 'Gemtuzumab ozogamicin', dose: 3, unit: 'mg/m²', schedule: 'D1, 8, 15 (cycle 1), then D1 (subsequent cycles)' }
                ]
            },

            // RELAPSED/REFRACTORY THERAPY - Novel Agents
            'Menin-Inhibitors-RR': {
                name: 'Menin inhibitors (investigational) (KMT2A-rearranged/NPM1-mutant AML) (Relapsed/Refractory)',
                cycles: 12,
                drugs: [
                    { name: 'Revumenib (SNDX-5613)', dose: 163, unit: 'mg/m²', schedule: 'PO twice daily continuously (investigational)' }
                ]
            },

            // HYPOMETHYLATING AGENTS - Monotherapy
            'Azacitidine-Monotherapy': {
                name: 'Azacitidine monotherapy (hypomethylating agent) (Elderly/Unfit)',
                cycles: 12,
                drugs: [
                    { name: 'Azacitidine', dose: 75, unit: 'mg/m²', schedule: 'D1-7, every 28 days' }
                ]
            },
            'Decitabine-Monotherapy': {
                name: 'Decitabine monotherapy (hypomethylating agent) (Elderly/Unfit)',
                cycles: 12,
                drugs: [
                    { name: 'Decitabine', dose: 20, unit: 'mg/m²', schedule: 'D1-5, every 28 days' }
                ]
            },

            // APL MAINTENANCE
            'ATRA-Maintenance-APL': {
                name: 'ATRA maintenance (APL Maintenance)',
                cycles: 8,
                drugs: [
                    { name: 'Tretinoin (ATRA)', dose: 45, unit: 'mg/m²', schedule: 'PO daily D1-15 every 3 months x 2 years' }
                ]
            },

            // ORAL AZACITIDINE MAINTENANCE
            'Oral-Azacitidine-Maintenance': {
                name: 'Oral azacitidine (CC-486) (QUAZAR AML-001) (Maintenance after CR)',
                cycles: 12,
                drugs: [
                    { name: 'Oral azacitidine (CC-486)', dose: 300, unit: 'mg', schedule: 'PO daily D1-14, every 28 days' }
                ]
            },

            // INTENSIVE INDUCTION ALTERNATIVES  
            'MEC-Induction': {
                name: 'Mitoxantrone + Etoposide + Cytarabine (MEC) (Relapsed/Refractory)',
                cycles: 2,
                drugs: [
                    { name: 'Mitoxantrone', dose: 8, unit: 'mg/m²', schedule: 'D1-5, every 28-42 days' },
                    { name: 'Etoposide', dose: 80, unit: 'mg/m²', schedule: 'D1-5, every 28-42 days' },
                    { name: 'Cytarabine', dose: 1000, unit: 'mg/m²', schedule: 'D1-5, every 28-42 days' }
                ]
            },

            // COMBINATION TARGETED THERAPY
            'Ivosidenib-Azacitidine': {
                name: 'Ivosidenib (IDH1 inhibitor) + Azacitidine (hypomethylating agent) (AGILE) (IDH1+ AML) (First-Line/Elderly)',
                cycles: 12,
                drugs: [
                    { name: 'Ivosidenib', dose: 500, unit: 'mg', schedule: 'PO daily continuously' },
                    { name: 'Azacitidine', dose: 75, unit: 'mg/m²', schedule: 'D1-7, every 28 days' }
                ]
            }
        }
    },
    lung: {
        nsclc: {
            // NEOADJUVANT THERAPY
            'Nivolumab-Cisplatin-Pemetrexed-Neoadjuvant': {
                name: 'Nivolumab + Cisplatin + Pemetrexed (CheckMate 816) - Neoadjuvant',
                cycles: 3,
                drugs: [
                    { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'D1, every 21 days x3 cycles' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days (non-squamous)' }
                ]
            },
            'Carboplatin-Paclitaxel-Neoadjuvant': {
                name: 'Paclitaxel + Carboplatin (PC) (CP) - Neoadjuvant',
                cycles: 3,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Cisplatin-Pemetrexed-Neoadjuvant': {
                name: 'Cisplatin + Pemetrexed (CP) (Non-squamous) - Neoadjuvant',
                cycles: 3,
                drugs: [
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Cisplatin-Gemcitabine-Neoadjuvant': {
                name: 'Gemcitabine + Cisplatin (GC) (Squamous) - Neoadjuvant',
                cycles: 3,
                drugs: [
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            
            // ADJUVANT THERAPY
            'Osimertinib-Adjuvant': {
                name: 'Osimertinib (ADAURA) - Adjuvant - EGFR mutation',
                cycles: 36,
                drugs: [
                    { name: 'Osimertinib', dose: 80, unit: 'mg', schedule: 'daily x36 months' }
                ]
            },
            'Alectinib-Adjuvant': {
                name: 'Alectinib (ALINA) - Adjuvant - ALK rearrangement',
                cycles: 24,
                drugs: [
                    { name: 'Alectinib', dose: 600, unit: 'mg', schedule: 'BID x24 months' }
                ]
            },
            'Atezolizumab-Adjuvant': {
                name: 'Atezolizumab (IMpower010) - Adjuvant - PD-L1 ≥1%',
                cycles: 16,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days x16 cycles' }
                ]
            },
            'Cisplatin-Vinorelbine-Adjuvant': {
                name: 'Cisplatin + Vinorelbine - Adjuvant',
                cycles: 4,
                drugs: [
                    { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vinorelbine', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Carboplatin-Paclitaxel-Adjuvant': {
                name: 'Paclitaxel + Carboplatin (PC) - Adjuvant',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            
            // CONCURRENT CHEMORADIOTHERAPY
            'Cisplatin-Etoposide-CRT': {
                name: 'Cisplatin + Etoposide + RT - Concurrent CRT',
                cycles: 2,
                drugs: [
                    { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, D8, every 28 days' },
                    { name: 'Etoposide', dose: 50, unit: 'mg/m²', schedule: 'D1-5, every 28 days' }
                ]
            },
            'Weekly-Paclitaxel-Carboplatin-CRT': {
                name: 'Weekly Paclitaxel + Carboplatin + RT - Concurrent CRT',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 45, unit: 'mg/m²', schedule: 'D1, every 7 days' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, every 7 days' }
                ]
            },
            'Durvalumab-PACIFIC': {
                name: 'Durvalumab Maintenance (PACIFIC) - Post-Concurrent CRT',
                cycles: 12,
                drugs: [
                    { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 28 days' }
                ]
            },
            
            // METASTATIC - FIRST LINE IMMUNOTHERAPY COMBINATIONS
            'Nivolumab-Ipilimumab': {
                name: 'Nivolumab + Ipilimumab (CheckMate 227) - Metastatic - 1L',
                cycles: 4,
                drugs: [
                    { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 14 days' },
                    { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 42 days x4 cycles' }
                ]
            },
            'Pembrolizumab-Cisplatin-Pemetrexed': {
                name: 'Pembrolizumab + Cisplatin + Pemetrexed (KEYNOTE-189) - Metastatic - 1L - Non-squamous',
                cycles: 4,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Pembrolizumab-Carboplatin-Pemetrexed': {
                name: 'Pembrolizumab + Carboplatin + Pemetrexed (KEYNOTE-189) - Metastatic - 1L - Non-squamous',
                cycles: 4,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Pembrolizumab-Carboplatin-Paclitaxel': {
                name: 'Pembrolizumab + Paclitaxel + Carboplatin (KEYNOTE-407) - Metastatic - 1L - Squamous',
                cycles: 4,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Pembrolizumab-Carboplatin-Nab-Paclitaxel': {
                name: 'Pembrolizumab + Carboplatin + Nab-paclitaxel (KEYNOTE-407) - Metastatic - 1L - Squamous',
                cycles: 4,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, D8, D15, every 21 days' }
                ]
            },
            'Nivolumab-Carboplatin-Pemetrexed': {
                name: 'Nivolumab + Carboplatin + Pemetrexed (CheckMate 9LA) - Metastatic - 1L - Non-squamous',
                cycles: 4,
                drugs: [
                    { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Nivolumab-Cisplatin-Pemetrexed': {
                name: 'Nivolumab + Cisplatin + Pemetrexed (CheckMate 9LA) - Metastatic - 1L - Non-squamous',
                cycles: 4,
                drugs: [
                    { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'D1, every 21 days' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Atezolizumab-Bevacizumab-Carboplatin-Paclitaxel': {
                name: 'Atezolizumab + Bevacizumab + Carboplatin + Paclitaxel (IMpower150) - Metastatic - 1L',
                cycles: 4,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Atezolizumab-Carboplatin-Nab-Paclitaxel': {
                name: 'Atezolizumab + Carboplatin + Nab-paclitaxel (IMpower130) - Metastatic - 1L - Non-squamous',
                cycles: 4,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, D8, D15, every 21 days' }
                ]
            },
            'Cemiplimab-Cisplatin-Pemetrexed': {
                name: 'Cemiplimab + Cisplatin + Pemetrexed (EMPOWER-Lung 3) - Metastatic - Non-squamous',
                cycles: 4,
                drugs: [
                    { name: 'Cemiplimab', dose: 350, unit: 'mg', schedule: 'D1, every 21 days' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days (non-squamous)' }
                ]
            },
            'Durvalumab-Tremelimumab-Cisplatin-Pemetrexed': {
                name: 'Durvalumab + Tremelimumab + Cisplatin + Pemetrexed (POSEIDON) - Metastatic - Non-squamous',
                cycles: 4,
                drugs: [
                    { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 21 days' },
                    { name: 'Tremelimumab', dose: 75, unit: 'mg', schedule: 'D1, every 21 days x4 cycles' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Pemetrexed-Cisplatin': {
                name: 'Pemetrexed + Cisplatin - Metastatic - Non-squamous',
                cycles: 4,
                drugs: [
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Pemetrexed-Carboplatin': {
                name: 'Pemetrexed + Carboplatin - Metastatic - Non-squamous',
                cycles: 4,
                drugs: [
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Pemetrexed-Carboplatin-Bevacizumab': {
                name: 'Pemetrexed + Carboplatin + Bevacizumab - Metastatic - Non-squamous',
                cycles: 4,
                drugs: [
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days, continue as maintenance' }
                ]
            },
            'Atezolizumab-Bevacizumab-Carboplatin-Paclitaxel': {
                name: 'Atezolizumab + Bevacizumab + Carboplatin + Paclitaxel (IMpower150) - Metastatic',
                cycles: 4,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days, continue as maintenance' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Atezolizumab-Nab-Paclitaxel-Carboplatin': {
                name: 'Atezolizumab + Carboplatin + Nab-paclitaxel (IMpower130) - Metastatic - Non-squamous',
                cycles: 4,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            // EGFR-targeted therapy
            'Amivantamab-Lazertinib': {
                name: 'Amivantamab + Lazertinib (MARIPOSA) (EGFR exon19del/L858R) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Amivantamab', dose: 1400, unit: 'mg', schedule: 'loading dose 1400mg, then 1050mg every 14 days' },
                    { name: 'Lazertinib', dose: 240, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Osimertinib': {
                name: 'Osimertinib (FLAURA/AURA3) (EGFR exon19del/L858R/T790M) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Osimertinib', dose: 80, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Amivantamab-Exon20': {
                name: 'Amivantamab - Metastatic - EGFR exon20 insertion',
                cycles: 12,
                drugs: [
                    { name: 'Amivantamab', dose: 1400, unit: 'mg', schedule: 'loading dose 1400mg, then 1050mg every 14 days' }
                ]
            },
            'Mobocertinib': {
                name: 'Mobocertinib - Metastatic - EGFR exon20 insertion',
                cycles: 12,
                drugs: [
                    { name: 'Mobocertinib', dose: 160, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            // Maintenance therapy
            'Maintenance-Pemetrexed': {
                name: 'Maintenance Pemetrexed (Non-squamous)',
                cycles: 12,
                drugs: [
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days maintenance' }
                ]
            },
            // Metastatic therapy
            'Docetaxel-Ramucirumab': {
                name: 'Docetaxel + Ramucirumab (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Ramucirumab', dose: 10, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'T-DXd-HER2': {
                name: 'Trastuzumab Deruxtecan (HER2 mutation) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Trastuzumab Deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            // Additional NSCLC protocols from user's comprehensive list
            'Nivolumab-Paclitaxel-Carboplatin': {
                name: 'Nivolumab + Paclitaxel + Carboplatin',
                cycles: 4,
                drugs: [
                    { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Nivolumab-Paclitaxel-Cisplatin': {
                name: 'Nivolumab + Paclitaxel + Cisplatin',
                cycles: 4,
                drugs: [
                    { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Pembrolizumab-Cisplatin-Gemcitabine-NSCLC': {
                name: 'Pembrolizumab + Gemcitabine + Cisplatin',
                cycles: 4,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Cisplatin-Etoposide-RT-NSCLC': {
                name: 'Cisplatin + Etoposide + RT - Concurrent Chemoradiotherapy',
                cycles: 2,
                drugs: [
                    { name: 'Cisplatin', dose: 50, unit: 'mg/m²', days: 'D1,D8,D29,D36', schedule: 'D1, D8, D29, D36 with concurrent RT' },
                    { name: 'Etoposide', dose: 50, unit: 'mg/m²', days: 'D1-D5,D29-D33', schedule: 'D1-D5, D29-D33 with concurrent RT' },
                    { name: 'RT', dose: 'concurrent', unit: 'RT', schedule: 'concurrent with chemotherapy' }
                ]
            },
            'Weekly-Paclitaxel-Carboplatin-RT': {
                name: 'Weekly Paclitaxel + Carboplatin + RT - Concurrent Chemoradiotherapy',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 45, unit: 'mg/m²', schedule: 'weekly x 6 with concurrent RT' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly x 6 with concurrent RT' },
                    { name: 'RT', dose: 'concurrent', unit: 'RT', schedule: 'concurrent with chemotherapy' }
                ]
            },
            'Paclitaxel-Carboplatin-3weekly': {
                name: 'Paclitaxel + Carboplatin (3 weekly) - Metastatic',
                cycles: 4,
                drugs: [
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Vinorelbine-Cisplatin': {
                name: 'Vinorelbine + Cisplatin - Metastatic',
                cycles: 4,
                drugs: [
                    { name: 'Vinorelbine', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Cisplatin-Vinblastine': {
                name: 'Cisplatin + Vinblastine - Metastatic',
                cycles: 4,
                drugs: [
                    { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                    { name: 'Vinblastine', dose: 4, unit: 'mg/m²', schedule: 'days 1, 8, every 28 days' }
                ]
            },
            'Cisplatin-Etoposide-NSCLC': {
                name: 'Cisplatin + Etoposide - Metastatic',
                cycles: 4,
                drugs: [
                    { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 120, unit: 'mg/m²', days: 'D1-D3', schedule: 'D1-D3, every 21 days' }
                ]
            },
            'Atezolizumab-Monotherapy': {
                name: 'Atezolizumab monotherapy - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Carboplatin-Nab-Paclitaxel': {
                name: 'Carboplatin + Nab-paclitaxel - Metastatic',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
                ]
            },
            'Carboplatin-Paclitaxel-Weekly': {
                name: 'Paclitaxel + Carboplatin (PC) (weekly) - Metastatic',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly x 12 weeks' },
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly x 12 weeks' }
                ]
            },
            'Carboplatin-Paclitaxel-Bevacizumab': {
                name: 'Paclitaxel + Carboplatin + Bevacizumab - Metastatic - Non-squamous',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days, then maintenance' }
                ]
            },
            'ABCP': {
                name: 'Atezolizumab + Bevacizumab + Carboplatin + Paclitaxel (ABCP) - Metastatic',
                cycles: 4,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Gemcitabine-Cisplatin-Bevacizumab': {
                name: 'Gemcitabine + Cisplatin + Bevacizumab - Metastatic - Squamous',
                cycles: 4,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'Cisplatin-Paclitaxel': {
                name: 'Cisplatin + Paclitaxel - Metastatic',
                cycles: 4,
                drugs: [
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Docetaxel-Carboplatin': {
                name: 'Docetaxel + Carboplatin - Metastatic',
                cycles: 4,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Docetaxel-Cisplatin': {
                name: 'Docetaxel + Cisplatin - Metastatic',
                cycles: 4,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Docetaxel-Gemcitabine': {
                name: 'Docetaxel + Gemcitabine - Metastatic',
                cycles: 4,
                drugs: [
                    { name: 'Docetaxel', dose: 85, unit: 'mg/m²', schedule: 'day 8, every 21 days' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Gemcitabine-Cisplatin': {
                name: 'Gemcitabine + Cisplatin (GC) - Metastatic - Squamous',
                cycles: 4,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Gemcitabine-Carboplatin': {
                name: 'Gemcitabine + Carboplatin - Metastatic - Squamous',
                cycles: 4,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Gemcitabine-Vinorelbine': {
                name: 'Gemcitabine + Vinorelbine - Metastatic',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Vinorelbine', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Docetaxel-Bevacizumab': {
                name: 'Docetaxel + Bevacizumab - Metastatic - Non-squamous',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'Pemetrexed-Carboplatin-Bevacizumab': {
                name: 'Pemetrexed + Carboplatin + Bevacizumab - Metastatic - Non-squamous',
                cycles: 4,
                drugs: [
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'Maintenance-Pemetrexed': {
                name: 'Maintenance Pemetrexed - Metastatic - Non-squamous',
                cycles: 12,
                drugs: [
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days maintenance' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin': {
                name: 'Nab-paclitaxel + Carboplatin - Metastatic',
                cycles: 4,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 28 days' }
                ]
            },
            'Docetaxel-Ramucirumab': {
                name: 'Docetaxel + Ramucirumab - Metastatic',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Ramucirumab', dose: 10, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'Gemcitabine-Cisplatin-Necitumumab': {
                name: 'Gemcitabine + Cisplatin + Necitumumab - Metastatic - Squamous',
                cycles: 4,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Necitumumab', dose: 800, unit: 'mg', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Dabrafenib-Trametinib': {
                name: 'Dabrafenib + Trametinib (PHAROS) (BRAF V600E mutation) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'twice daily' },
                    { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Carboplatin-Paclitaxel-Pembrolizumab': {
                name: 'Paclitaxel + Carboplatin + Pembrolizumab (KEYNOTE-407) - Metastatic - Squamous',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' }
                ]
            },
            'Carboplatin-Nab-Paclitaxel-Pembrolizumab': {
                name: 'Carboplatin + Nab-paclitaxel + Pembrolizumab (KEYNOTE-407) - Metastatic - Squamous',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' }
                ]
            },
            'Atezolizumab-Nab-Paclitaxel-Carboplatin': {
                name: 'Atezolizumab + Nab-paclitaxel + Carboplatin - Metastatic',
                cycles: 4,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Ramucirumab-Erlotinib': {
                name: 'Ramucirumab + Erlotinib (EGFR mutation) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Ramucirumab', dose: 10, unit: 'mg/kg', schedule: 'D1, every 14 days' },
                    { name: 'Erlotinib', dose: 150, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Ipilimumab-Nivolumab': {
                name: 'Ipilimumab + Nivolumab (CheckMate-227) - Metastatic',
                cycles: 4,
                drugs: [
                    { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'day 1, every 6 weeks' },
                    { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' }
                ]
            },
            'Durvalumab-Tremelimumab': {
                name: 'Durvalumab + Tremelimumab (POSEIDON) - Metastatic',
                cycles: 4,
                drugs: [
                    { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 28 days, then maintenance' },
                    { name: 'Tremelimumab', dose: 75, unit: 'mg', schedule: 'D1, every 28 days' }
                ]
            },
            // Single agents
            'Single-Paclitaxel': {
                name: 'Paclitaxel - Metastatic',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Single-Nab-Paclitaxel': {
                name: 'Nab-paclitaxel - Metastatic',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 260, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Single-Docetaxel': {
                name: 'Docetaxel - Metastatic',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Single-Pemetrexed': {
                name: 'Pemetrexed - Metastatic - Non-squamous',
                cycles: 6,
                drugs: [
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Single-Gemcitabine': {
                name: 'Gemcitabine - Metastatic',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
                ]
            },
            'Single-Vinorelbine': {
                name: 'Vinorelbine - Metastatic',
                cycles: 6,
                drugs: [
                    { name: 'Vinorelbine', dose: 30, unit: 'mg/m²', schedule: 'D1, every 7 days' }
                ]
            },
            // EGFR inhibitors
            'Gefitinib': {
                name: 'Gefitinib (EGFR exon19del) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Gefitinib', dose: 250, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Erlotinib': {
                name: 'Erlotinib (EGFR exon19del) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Erlotinib', dose: 150, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Afatinib': {
                name: 'Afatinib (EGFR exon19del) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Afatinib', dose: 40, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Dacomitinib': {
                name: 'Dacomitinib (EGFR exon19del) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Dacomitinib', dose: 45, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Nivolumab-Monotherapy': {
                name: 'Nivolumab monotherapy - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days' }
                ]
            },
            // ALK/ROS1 inhibitors
            'Crizotinib': {
                name: 'Crizotinib (ALK or ROS1 positive) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Crizotinib', dose: 250, unit: 'mg', schedule: 'twice daily' }
                ]
            },
            'Ceritinib': {
                name: 'Ceritinib (ALK or ROS1 positive) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Ceritinib', dose: 450, unit: 'mg', schedule: 'daily with food' }
                ]
            },
            'Alectinib': {
                name: 'Alectinib (ALK rearrangements) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Alectinib', dose: 600, unit: 'mg', schedule: 'twice daily' }
                ]
            },
            'Brigatinib': {
                name: 'Brigatinib (ALK rearrangements) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Brigatinib', dose: 180, unit: 'mg', schedule: 'daily (after 7-day lead-in at 90mg)' }
                ]
            },
            'Lorlatinib': {
                name: 'Lorlatinib (ALK rearrangements/ROS1) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Lorlatinib', dose: 100, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Entrectinib': {
                name: 'Entrectinib (NTRK fusion) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Osimertinib-T790M': {
                name: 'Osimertinib - Metastatic - EGFR exon19del/T790M mutation',
                cycles: 12,
                drugs: [
                    { name: 'Osimertinib', dose: 80, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Selpercatinib': {
                name: 'Selpercatinib (RET fusion-positive) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Selpercatinib', dose: 160, unit: 'mg', schedule: 'twice daily' }
                ]
            },
            'Pralsetinib': {
                name: 'Pralsetinib (RET fusion-positive) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Pralsetinib', dose: 400, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Capmatinib': {
                name: 'Capmatinib (MET exon14 skipping) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Capmatinib', dose: 400, unit: 'mg', schedule: 'twice daily' }
                ]
            },
            'Tepotinib': {
                name: 'Tepotinib (MET exon14 skipping) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Tepotinib', dose: 450, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Sotorasib': {
                name: 'Sotorasib (KRAS G12C mutation) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Sotorasib', dose: 960, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Adagrasib': {
                name: 'Adagrasib (KRAS G12C mutation) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Adagrasib', dose: 600, unit: 'mg', schedule: 'twice daily' }
                ]
            },
            'Pembrolizumab-Monotherapy': {
                name: 'Pembrolizumab monotherapy (KEYNOTE-024/042) (PD-L1 ≥50%) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Single-Durvalumab': {
                name: 'Durvalumab (PACIFIC) - Maintenance Post-CRT',
                cycles: 12,
                drugs: [
                    { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'every 28 days' }
                ]
            },
            'Cemiplimab-Monotherapy': {
                name: 'Cemiplimab monotherapy - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Cemiplimab', dose: 350, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            }
        },
        sclc: {
            // LIMITED STAGE SCLC
            'Cisplatin-Etoposide-Concurrent-RT': {
                name: 'Cisplatin + Etoposide + Concurrent RT - Limited Stage',
                cycles: 2,
                drugs: [
                    { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, D8, D29, D36' },
                    { name: 'Etoposide', dose: 50, unit: 'mg/m²', days: 'D1-D5, D29-D33', schedule: 'D1-D5, D29-D33' },
                    { name: 'Concurrent RT', dose: 'concurrent', unit: 'RT', schedule: 'concurrent with chemotherapy' }
                ]
            },
            'Carboplatin-Etoposide-Concurrent-RT': {
                name: 'Carboplatin + Etoposide + Concurrent RT - Limited Stage',
                cycles: 2,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, D29' },
                    { name: 'Etoposide', dose: 50, unit: 'mg/m²', days: 'D1-D5, D29-D33', schedule: 'D1-D5, D29-D33' },
                    { name: 'Concurrent RT', dose: 'concurrent', unit: 'RT', schedule: 'concurrent with chemotherapy' }
                ]
            },
            'Prophylactic-Cranial-Irradiation': {
                name: 'Prophylactic Cranial Irradiation (PCI) - Limited Stage',
                cycles: 1,
                drugs: [
                    { name: 'PCI', dose: '25 Gy', unit: 'Gy', schedule: '25 Gy in 10 fractions' }
                ]
            },
            
            // EXTENSIVE STAGE SCLC
            'Atezolizumab-Carboplatin-Etoposide': {
                name: 'Atezolizumab + Carboplatin + Etoposide (IMpower133) - Extensive Stage',
                cycles: 4,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'D1-D3, every 21 days' }
                ]
            },
            'Durvalumab-Carboplatin-Etoposide': {
                name: 'Durvalumab + Carboplatin + Etoposide (CASPIAN) - Extensive Stage',
                cycles: 4,
                drugs: [
                    { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'D1-D3, every 21 days' }
                ]
            },
            'Carboplatin-Etoposide': {
                name: 'Carboplatin + Etoposide - Extensive Stage',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'D1-D3, every 21 days' }
                ]
            },
            'Cisplatin-Etoposide-SCLC': {
                name: 'Cisplatin + Etoposide - Extensive Stage',
                cycles: 4,
                drugs: [
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'D1-D3, every 21 days' }
                ]
            },
            
            // METASTATIC SCLC - SECOND LINE
            'Topotecan-SCLC': {
                name: 'Topotecan - Metastatic (Second Line)',
                cycles: 6,
                drugs: [
                    { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', days: 'D1-D5', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'Lurbinectedin': {
                name: 'Lurbinectedin (ATLANTIS) - Metastatic (Second Line)',
                cycles: 6,
                drugs: [
                    { name: 'Lurbinectedin', dose: 3.2, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'CAV-SCLC': {
                name: 'CAV (Cyclophosphamide + Adriamycin + Vincristine)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 45, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Irinotecan-Cisplatin': {
                name: 'Irinotecan + Cisplatin - Extensive Stage',
                cycles: 4,
                drugs: [
                    { name: 'Irinotecan', dose: 60, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                    { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 28 days' }
                ]
            },
            'Topotecan-Cisplatin': {
                name: 'Topotecan + Cisplatin - Extensive Stage',
                cycles: 4,
                drugs: [
                    { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', days: 'D1-D5', schedule: 'D1-D5, every 21 days' },
                    { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Carboplatin-Paclitaxel-Etoposide': {
                name: 'Paclitaxel + Carboplatin + Etoposide - Extensive Stage',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 50, unit: 'mg/m²', days: 'D1-D10', schedule: 'D1-D10, every 21 days' }
                ]
            },
            'Carboplatin-Paclitaxel-SCLC': {
                name: 'Paclitaxel + Carboplatin (PC) - Extensive Stage',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'CAE-SCLC': {
                name: 'CAE (Cyclophosphamide + Adriamycin + Etoposide) - Extensive Stage',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 45, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'D1-D3, every 21 days' }
                ]
            },
            'Etoposide-Single': {
                name: 'Etoposide - Metastatic (Second Line)',
                cycles: 6,
                drugs: [
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'D1-D3, every 21 days' }
                ]
            },
            'Paclitaxel-Single-SCLC': {
                name: 'Paclitaxel - Metastatic (Second Line)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Gemcitabine-Single-SCLC': {
                name: 'Gemcitabine - Metastatic (Second Line)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Nivolumab-SCLC': {
                name: 'Nivolumab (PD-L1 CPS ≥1%) - Metastatic (Second Line)',
                cycles: 8,
                drugs: [
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 14 days, then 480mg every 28 days' }
                ]
            },
            'Pembrolizumab-SCLC': {
                name: 'Pembrolizumab (PD-L1 CPS ≥1%) - Metastatic (Second Line)',
                cycles: 8,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days, then 400mg every 6 weeks' }
                ]
            },
            // Missing SCLC regimens from NCCN guidelines
            'Durvalumab-Tremelimumab-Carboplatin-Etoposide': {
                name: 'Durvalumab + Tremelimumab + Carboplatin + Etoposide (CASPIAN) - Extensive Stage',
                cycles: 4,
                drugs: [
                    { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Tremelimumab', dose: 75, unit: 'mg', schedule: 'D1, every 21 days x4 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'D1-D3, every 21 days' }
                ]
            },
            
            // METASTATIC SCLC - THIRD LINE
            'Ipilimumab-Nivolumab-SCLC': {
                name: 'Ipilimumab + Nivolumab (CheckMate-451) - Metastatic (Third Line)',
                cycles: 4,
                drugs: [
                    { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 6 weeks x4' },
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days, then 480mg every 4 weeks' }
                ]
            },
            'Topotecan-Oral': {
                name: 'Topotecan (Oral) - Metastatic (Second Line)',
                cycles: 6,
                drugs: [
                    { name: 'Topotecan (Oral)', dose: 2.3, unit: 'mg/m²', days: 'D1-D5', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'Temozolomide-SCLC': {
                name: 'Temozolomide - Metastatic (Second Line)',
                cycles: 6,
                drugs: [
                    { name: 'Temozolomide', dose: 150, unit: 'mg/m²', days: 'D1-D5', schedule: 'D1-D5, every 28 days' }
                ]
            },
            'Vincristine-Single': {
                name: 'Vincristine - Metastatic (Second Line)',
                cycles: 6,
                drugs: [
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days, max 2mg' }
                ]
            },
            'Bendamustine-Single': {
                name: 'Bendamustine - Metastatic (Second Line)',
                cycles: 6,
                drugs: [
                    { name: 'Bendamustine', dose: 120, unit: 'mg/m²', days: 'D1-D2', schedule: 'D1-D2, every 21 days' }
                ]
            },
            'Cyclophosphamide-Single': {
                name: 'Cyclophosphamide - Metastatic (Second Line)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Doxorubicin-Single': {
                name: 'Doxorubicin - Metastatic (Second Line)',
                cycles: 6,
                drugs: [
                    { name: 'Doxorubicin', dose: 45, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Amrubicin-SCLC': {
                name: 'Amrubicin - Metastatic (Second Line)',
                cycles: 6,
                drugs: [
                    { name: 'Amrubicin', dose: 40, unit: 'mg/m²', days: 'D1-D3', schedule: 'D1-D3, every 21 days' }
                ]
            },
            'Tarlatamab-SCLC': {
                name: 'Tarlatamab (DLL3-targeted BiTE) - Metastatic (Third Line)',
                cycles: 12,
                drugs: [
                    { name: 'Tarlatamab', dose: 10, unit: 'mg', schedule: 'D1, D8, D15, D22, D29, D36 (cycle 1), then D1, D15 (subsequent cycles)' }
                ]
            },
            'Rovalpituzumab-Tesirine': {
                name: 'Rovalpituzumab Tesirine (DLL3+ tumors) - Metastatic (Third Line)',
                cycles: 6,
                drugs: [
                    { name: 'Rovalpituzumab Tesirine', dose: 0.3, unit: 'mg/kg', schedule: 'D1, every 42 days' }
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
            'her2_positive': 'HER2 Positive',
            'her2_low_ultralow': 'HER2-Low/Ultralow'
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
            'hodgkins_lymphoma': 'Hodgkin Lymphoma',
            'b_cell_nhl': 'B-Cell Non-Hodgkin Lymphoma',
            't_cell_nhl': 'T-Cell Non-Hodgkin Lymphoma'
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
    } else if (cancerType === 'leukemia') {
        subtypeGroup.style.display = 'block';
        subtypeSelect.disabled = false;
        subtypeSelect.required = true;
        subtypeSelect.innerHTML = '<option value="">Select leukemia type</option>';
        
        const subtypes = {
            'cml': 'Chronic Myeloid Leukemia (CML)',
            'cll': 'Chronic Lymphocytic Leukemia (CLL)',
            'all': 'Acute Lymphoblastic Leukemia (ALL)',
            'aml': 'Acute Myeloid Leukemia (AML)',
            'hcl': 'Hairy Cell Leukemia (HCL)'
        };
        
        Object.keys(subtypes).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = subtypes[key];
            subtypeSelect.appendChild(option);
        });
        
        // Reset protocol dropdown
        protocolSelect.innerHTML = '<option value="">Select leukemia type first</option>';
        protocolSelect.disabled = true;
    } else if (cancerType === 'colorectal') {
        subtypeGroup.style.display = 'block';
        subtypeSelect.disabled = false;
        subtypeSelect.required = true;
        subtypeSelect.innerHTML = '<option value="">Select colorectal type</option>';
        
        const subtypes = {
            'colon_cancer': 'Colon Cancer',
            'rectal_cancer': 'Rectal Cancer',
            'metastatic_colorectal': 'Metastatic Colorectal Cancer'
        };
        
        Object.keys(subtypes).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = subtypes[key];
            subtypeSelect.appendChild(option);
        });
        
        // Reset protocol dropdown
        protocolSelect.innerHTML = '<option value="">Select colorectal type first</option>';
        protocolSelect.disabled = true;
    } else if (cancerType === 'thyroid') {
        subtypeGroup.style.display = 'block';
        subtypeSelect.disabled = false;
        subtypeSelect.required = true;
        subtypeSelect.innerHTML = '<option value="">Select thyroid cancer type</option>';
        
        const subtypes = {
            'differentiated': 'Differentiated Thyroid Cancer (DTC)',
            'medullary': 'Medullary Thyroid Cancer (MTC)',
            'anaplastic': 'Anaplastic Thyroid Cancer (ATC)'
        };
        
        Object.keys(subtypes).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = subtypes[key];
            subtypeSelect.appendChild(option);
        });
        
        // Reset protocol dropdown
        protocolSelect.innerHTML = '<option value="">Select thyroid cancer type first</option>';
        protocolSelect.disabled = true;
    } else if (cancerType === 'bone') {
        subtypeGroup.style.display = 'block';
        subtypeSelect.disabled = false;
        subtypeSelect.required = true;
        
        // Force clear the dropdown first
        subtypeSelect.innerHTML = '';
        
        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select bone cancer type';
        subtypeSelect.appendChild(defaultOption);
        
        const subtypes = {
            'osteosarcoma': 'Osteosarcoma',
            'chordoma': 'Chordoma',
            'ewings_sarcoma': 'Ewing\'s Sarcoma',
            'chondrosarcoma': 'Chondrosarcoma',
            'giant_cell_tumor': 'Giant Cell Tumor of Bone'
        };
        
        Object.keys(subtypes).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = subtypes[key];
            subtypeSelect.appendChild(option);
        });
        
        // Force refresh the select element on mobile
        setTimeout(() => {
            subtypeSelect.blur();
            subtypeSelect.focus();
            subtypeSelect.blur();
        }, 10);
        
        // Reset protocol dropdown
        protocolSelect.innerHTML = '<option value="">Select bone cancer type first</option>';
        protocolSelect.disabled = true;
    } else {
        subtypeGroup.style.display = 'none';
        subtypeSelect.disabled = true;
        subtypeSelect.required = false;
        subtypeSelect.value = '';
        populateProtocols(cancerType, null);
    }
    
    // Show and enable cancer-specific search when cancer type is selected
    const cancerSearchGroup = document.getElementById('cancerSearchGroup');
    const cancerSpecificSearchInput = document.getElementById('cancerSpecificSearchInput');
    
    if (cancerType) {
        cancerSearchGroup.style.display = 'block';
        cancerSpecificSearchInput.disabled = false;
        cancerSpecificSearchInput.placeholder = `Type drug name to search regimens in ${getCancerDisplayName(cancerType)}...`;
        buildCancerSpecificIndex(cancerType);
        clearCancerSearchSection(); // Clear any previous selections
    } else {
        cancerSearchGroup.style.display = 'none';
        cancerSpecificSearchInput.disabled = true;
        clearCancerSearchSection();
    }
}

// Populate protocol dropdown based on cancer type and subtype
function populateProtocols(cancerType, subtype) {
    const protocolSelect = document.getElementById('protocol');
    protocolSelect.innerHTML = '<option value="">Select regimen</option>';
    
    if (cancerType && protocolDatabase[cancerType]) {
        let protocols;
        
        if ((cancerType === 'breast' || cancerType === 'lung' || cancerType === 'lymphoma' || cancerType === 'leukemia' || cancerType === 'colorectal' || cancerType === 'thyroid' || cancerType === 'bone') && subtype) {
            protocols = protocolDatabase[cancerType][subtype];
        } else if (cancerType !== 'breast' && cancerType !== 'lung' && cancerType !== 'lymphoma' && cancerType !== 'leukemia' && cancerType !== 'colorectal' && cancerType !== 'thyroid' && cancerType !== 'bone') {
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
    const carboplatinParams = document.getElementById('carboplatinParams');
    const ageInput = document.getElementById('age');
    const creatinineInput = document.getElementById('creatinine');
    const browseBSAAdditionalFields = document.getElementById('browseBSAAdditionalFields');
    const browseWeightInput = document.getElementById('browseWeight');
    const browseSexInputs = document.querySelectorAll('input[name="browseSex"]');
    
    if (protocolKey && cancerType && protocolDatabase[cancerType]) {
        let protocolData;
        
        if ((cancerType === 'breast' || cancerType === 'lung' || cancerType === 'lymphoma' || cancerType === 'leukemia' || cancerType === 'colorectal' || cancerType === 'thyroid' || cancerType === 'bone') && subtype && protocolDatabase[cancerType][subtype]) {
            protocolData = protocolDatabase[cancerType][subtype][protocolKey];
        } else if (cancerType !== 'breast' && cancerType !== 'lung' && cancerType !== 'lymphoma' && cancerType !== 'leukemia' && cancerType !== 'colorectal' && cancerType !== 'thyroid' && cancerType !== 'bone') {
            protocolData = protocolDatabase[cancerType][protocolKey];
        }
        
        // Check if BSA was entered directly (need additional weight and sex for carboplatin)
        const directBSA = document.getElementById('directBSA').value;
        const isBSADirectlyEntered = directBSA && parseFloat(directBSA) > 0;
        
        if (protocolData) {
            const hasCarboplatin = protocolData.drugs.some(drug => drug.name.toLowerCase().includes('carboplatin'));
            
            if (hasCarboplatin) {
                carboplatinParams.style.display = 'block';
                aucGroup.style.display = 'block';
                aucSelect.required = true;
                ageInput.required = true;
                creatinineInput.required = true;
                
                // Show additional weight and sex fields if BSA was entered directly
                if (isBSADirectlyEntered) {
                    browseBSAAdditionalFields.style.display = 'block';
                    browseWeightInput.required = true;
                    // Make one of the sex radio buttons required by adding required to both
                    browseSexInputs.forEach(input => input.required = true);
                } else {
                    browseBSAAdditionalFields.style.display = 'none';
                    browseWeightInput.required = false;
                    browseWeightInput.value = '';
                    browseSexInputs.forEach(input => {
                        input.required = false;
                        input.checked = false;
                    });
                }
            } else {
                carboplatinParams.style.display = 'none';
                aucGroup.style.display = 'none';
                browseBSAAdditionalFields.style.display = 'none';
                aucSelect.required = false;
                aucSelect.value = '';
                ageInput.required = false;
                ageInput.value = '';
                creatinineInput.required = false;
                creatinineInput.value = '';
                browseWeightInput.required = false;
                browseWeightInput.value = '';
                browseSexInputs.forEach(input => {
                    input.required = false;
                    input.checked = false;
                });
            }
        } else {
            carboplatinParams.style.display = 'none';
            aucGroup.style.display = 'none';
            browseBSAAdditionalFields.style.display = 'none';
            aucSelect.required = false;
            aucSelect.value = '';
            ageInput.required = false;
            ageInput.value = '';
            creatinineInput.required = false;
            creatinineInput.value = '';
            browseWeightInput.required = false;
            browseWeightInput.value = '';
            browseSexInputs.forEach(input => {
                input.required = false;
                input.checked = false;
            });
        }
    } else {
        carboplatinParams.style.display = 'none';
        aucGroup.style.display = 'none';
        browseBSAAdditionalFields.style.display = 'none';
        aucSelect.required = false;
        aucSelect.value = '';
        ageInput.required = false;
        ageInput.value = '';
        creatinineInput.required = false;
        creatinineInput.value = '';
    }
}

// Dose rounding function
function roundDose(dose, drugName, protocolName = '') {
    // Convert dose to number if it's a string
    const numDose = parseFloat(dose);
    
    // Never round bortezomib
    if (drugName.toLowerCase().includes('bortezomib')) {
        return numDose;
    }
    
    // Never round pertuzumab - it has fixed doses (840mg loading, 420mg maintenance)
    if (drugName.toLowerCase().includes('pertuzumab')) {
        return numDose;
    }
    
    // Never round immunotherapy drugs - they have constant/fixed doses
    const immunotherapyDrugs = [
        'pembrolizumab',
        'nivolumab', 
        'ipilimumab',
        'atezolizumab',
        'relatlimab',
        'cemiplimab',
        'dostarlimab',
        'toripalimab',
        'tislelizumab',
        'avelumab',
        'durvalumab',
        'tremelimumab',
        'spartalizumab',
        'retifanlimab'
    ];
    
    // Never round oral targeted therapy drugs - they have specific dosing requirements
    const oralTargetedTherapyDrugs = [
        // CDK4/6 inhibitors
        'palbociclib', 'ribociclib', 'abemaciclib',
        // PARP inhibitors
        'olaparib', 'rucaparib', 'niraparib', 'talazoparib',
        // EGFR inhibitors
        'erlotinib', 'gefitinib', 'osimertinib', 'afatinib', 'dacomitinib', 'mobocertinib',
        // ALK/ROS1 inhibitors
        'crizotinib', 'alectinib', 'ceritinib', 'brigatinib', 'lorlatinib',
        // BTK inhibitors
        'ibrutinib', 'acalabrutinib', 'zanubrutinib',
        // Tyrosine kinase inhibitors
        'imatinib', 'dasatinib', 'nilotinib', 'bosutinib', 'ponatinib',
        // PI3K inhibitors
        'idelalisib', 'duvelisib', 'umbralisib',
        // BCL-2 inhibitors
        'venetoclax',
        // FLT3 inhibitors
        'midostaurin', 'gilteritinib', 'quizartinib',
        // IDH inhibitors
        'ivosidenib', 'enasidenib', 'olutasidenib',
        // FGFR inhibitors
        'erdafitinib', 'pemigatinib', 'futibatinib', 'infigratinib',
        // Hedgehog pathway inhibitors
        'vismodegib', 'sonidegib', 'glasdegib',
        // RET inhibitors
        'selpercatinib', 'pralsetinib',
        // TRK inhibitors
        'larotrectinib', 'entrectinib', 'repotrectinib',
        // BRAF/MEK inhibitors
        'dabrafenib', 'trametinib', 'vemurafenib', 'cobimetinib', 'encorafenib', 'binimetinib',
        // HCC multi-kinase inhibitors
        'sorafenib', 'lenvatinib', 'cabozantinib', 'regorafenib', 'donafenib',
        // VEGFR inhibitors
        'apatinib', 'ramucirumab', 'sunitinib', 'pazopanib', 'axitinib', 'tivozanib',
        // mTOR inhibitors
        'everolimus', 'temsirolimus',
        // GIST-specific
        'avapritinib', 'ripretinib',
        // Other oral targeted therapies
        'tucatinib', 'ruxolitinib', 'fedratinib', 'pacritinib'
    ];
    
    // Never round hormonal therapy drugs - they have standard fixed doses
    const hormonalTherapyDrugs = [
        // SERMs
        'tamoxifen', 'toremifene',
        // Aromatase Inhibitors
        'anastrozole', 'letrozole', 'exemestane',
        // SERDs
        'fulvestrant', 'elacestrant', 'camizestrant',
        // GnRH agonists
        'goserelin', 'leuprolide', 'triptorelin',
        // Anti-androgens
        'bicalutamide', 'flutamide', 'enzalutamide', 'apalutamide', 'darolutamide',
        // Other hormonal agents
        'abiraterone', 'degarelix'
    ];
    
    const drugNameLower = drugName.toLowerCase();
    
    // Check immunotherapy exclusion
    if (immunotherapyDrugs.some(immunoDrug => drugNameLower.includes(immunoDrug))) {
        return numDose;
    }
    
    // Check oral targeted therapy exclusion
    if (oralTargetedTherapyDrugs.some(targetedDrug => drugNameLower.includes(targetedDrug))) {
        return numDose;
    }
    
    // Check hormonal therapy exclusion
    if (hormonalTherapyDrugs.some(hormonalDrug => drugNameLower.includes(hormonalDrug))) {
        return numDose;
    }
    
    // Apply rounding logic for all other drugs
    let roundedDose;
    if (numDose < 10) {
        // Round to nearest 1mg
        roundedDose = Math.round(numDose);
    } else if (numDose >= 10 && numDose < 100) {
        // Round to nearest 5-10mg - using 5mg as the rounding increment
        roundedDose = Math.round(numDose / 5) * 5;
    } else if (numDose >= 100 && numDose < 1000) {
        // Round to nearest 10mg or 50mg - using 10mg for 100-500, 50mg for 500-1000
        if (numDose < 500) {
            roundedDose = Math.round(numDose / 10) * 10;
        } else {
            roundedDose = Math.round(numDose / 50) * 50;
        }
    } else if (numDose >= 1000) {
        // Round to nearest 50mg or 100mg - using 50mg for 1000-2000, 100mg for >2000
        if (numDose < 2000) {
            roundedDose = Math.round(numDose / 50) * 50;
        } else {
            roundedDose = Math.round(numDose / 100) * 100;
        }
    }
    
    // Vincristine special logic
    if (drugNameLower.includes('vincristine')) {
        const protocolNameLower = protocolName.toLowerCase();
        const isEpochRegimen = protocolNameLower.includes('epoch');
        
        if (isEpochRegimen) {
            // All EPOCH regimens (R-DA-EPOCH, DA-EPOCH, R-EPOCH, EPOCH): No rounding at all - return original dose
            return numDose;
        } else {
            // Regular regimens: Cap at 2mg after normal rounding
            if (roundedDose > 2) {
                roundedDose = 2;
            }
        }
    }
    
    return roundedDose;
}

// Calculate drug doses
function calculateDoses(formData) {
    const { height, weight, directBSA, age, sex, creatinine, cancerType, cancerSubtype, protocol, auc } = formData;
    
    // Use direct BSA if provided, otherwise calculate from height/weight
    let bsa;
    if (directBSA && parseFloat(directBSA) > 0) {
        bsa = parseFloat(parseFloat(directBSA).toFixed(2)); // Use provided BSA
    } else {
        const rawBsa = calculateBSA(parseFloat(height), parseFloat(weight));
        bsa = parseFloat(rawBsa.toFixed(2)); // Use calculated BSA
    }
    
    // Only calculate crCl for carboplatin-containing regimens
    let crCl = null;
    if (age && creatinine) {
        crCl = calculateCrCl(parseInt(age), parseFloat(weight), parseFloat(creatinine), sex);
    }
    
    let protocolData;
    if ((cancerType === 'breast' || cancerType === 'lung' || cancerType === 'lymphoma' || cancerType === 'leukemia' || cancerType === 'colorectal' || cancerType === 'thyroid' || cancerType === 'bone') && cancerSubtype) {
        protocolData = protocolDatabase[cancerType][cancerSubtype][protocol];
    } else {
        protocolData = protocolDatabase[cancerType][protocol];
    }
    const calculatedDrugs = [];
    
    protocolData.drugs.forEach(drug => {
        let calculatedDose;
        let doseUnit;
        
        if (drug.unit === 'mg/m²') {
            if (drug.hasLoadingDose) {
                let loadingDose = drug.dose * bsa;
                let maintenanceDose = drug.maintenanceDose * bsa;
                
                
                calculatedDose = `${loadingDose.toFixed(1)} → ${maintenanceDose.toFixed(1)}`;
                doseUnit = 'mg';
            } else {
                let dose = drug.dose * bsa;
                
                
                calculatedDose = dose.toFixed(1);
                doseUnit = 'mg';
            }
        } else if (drug.unit === 'AUC') {
            const selectedAuc = auc ? parseFloat(auc) : 6;
            calculatedDose = calculateCarboplatinDose(selectedAuc, crCl).toFixed(1);
            doseUnit = 'mg';
        } else if (drug.unit === 'mg/kg') {
            if (drug.hasLoadingDose) {
                let loadingDose = drug.dose * parseFloat(weight);
                let maintenanceDose = drug.maintenanceDose * parseFloat(weight);
                
                
                calculatedDose = `${loadingDose.toFixed(1)} → ${maintenanceDose.toFixed(1)}`;
                doseUnit = 'mg';
            } else {
                let dose = drug.dose * parseFloat(weight);
                
                
                calculatedDose = dose.toFixed(1);
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
    
    // Get appropriate reference
    const reference = getReference(cancerType, cancerSubtype);
    
    return {
        bsa: bsa.toFixed(2),
        crCl: crCl ? crCl.toFixed(1) : null,
        protocolName: protocolData.name,
        cycles: protocolData.cycles,
        drugs: calculatedDrugs,
        hasCarboplatin: hasCarboplatin,
        selectedAuc: auc ? parseFloat(auc) : null,
        reference: reference
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
    
    // Track page view
    const pageNames = {
        1: 'Patient Information',
        2: 'Regimen Selection', 
        3: 'Dose Results',
        4: 'Dose Adjustment',
        5: 'Final Prescription'
    };
    
    if (typeof trackPageView !== 'undefined') {
        trackPageView(pageNames[pageNumber] || `Page ${pageNumber}`);
    }
    
    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    const maxPages = 5; // Now we have 5 pages
    const progressPercent = (pageNumber / maxPages) * 100;
    progressFill.style.width = `${progressPercent}%`;
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function validatePage1() {
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const directBSA = document.getElementById('directBSA').value;
    const sexMale = document.getElementById('sexMale');
    const sexFemale = document.getElementById('sexFemale');
    
    // Check if at least one sex checkbox is checked
    const sexValid = sexMale && sexFemale && (sexMale.checked || sexFemale.checked);
    
    // Either height/weight/sex OR direct BSA should be provided
    const heightWeightValid = height && weight && sexValid;
    const directBSAValid = directBSA && parseFloat(directBSA) > 0;
    
    return heightWeightValid || directBSAValid;
}

function updatePatientInfoCard() {
    // Patient info card elements were removed during cleanup
    // This function is no longer needed but kept for compatibility
    console.log('updatePatientInfoCard called - patient info card elements not present');
    return;
}

function validatePage2() {
    console.log('Validating page 2, selectedSearchProtocol:', selectedSearchProtocol); // Debug log
    
    // Check if protocol is selected via global search
    if (selectedSearchProtocol) {
        console.log('Using global search protocol'); // Debug log
        // Check if carboplatin protocol requires AUC, age, and creatinine from search section
        const searchCarboplatinParams = document.getElementById('searchCarboplatinParams');
        if (searchCarboplatinParams.style.display !== 'none') {
            const auc = document.getElementById('searchAuc').value;
            const age = document.getElementById('searchAge').value;
            const creatinine = document.getElementById('searchCreatinine').value;
            
            if (!auc || auc < 1 || auc > 10) {
                alert('Please enter a valid AUC value (1-10) for this carboplatin protocol.');
                return false;
            }
            if (!age) {
                alert('Please enter the patient age for carboplatin dosing calculation.');
                return false;
            }
            if (!creatinine) {
                alert('Please enter the patient creatinine level for carboplatin dosing calculation.');
                return false;
            }
        }
        return true;
    }
    
    // Check if protocol is selected via cancer-specific search
    if (selectedCancerSearchProtocol) {
        console.log('Using cancer-specific search protocol'); // Debug log
        // Check if carboplatin protocol requires AUC, age, and creatinine
        const aucGroup = document.getElementById('aucGroup');
        if (aucGroup.style.display !== 'none') {
            const auc = document.getElementById('auc').value;
            const age = document.getElementById('age').value;
            const creatinine = document.getElementById('creatinine').value;
            
            if (!auc || auc < 1 || auc > 10) {
                alert('Please enter a valid AUC value (1-10) for this carboplatin protocol.');
                return false;
            }
            if (!age) {
                alert('Please enter the patient age for carboplatin dosing calculation.');
                return false;
            }
            if (!creatinine) {
                alert('Please enter the patient creatinine level for carboplatin dosing calculation.');
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
    
    // Check if breast cancer, lung cancer, lymphoma, leukemia, colorectal cancer, thyroid cancer, or bone cancer requires subtype
    if (cancerType === 'breast' || cancerType === 'lung' || cancerType === 'lymphoma' || cancerType === 'leukemia' || cancerType === 'colorectal' || cancerType === 'thyroid' || cancerType === 'bone') {
        const subtype = document.getElementById('cancerSubtype').value;
        if (!subtype) {
            let cancerTypeName = 'cancer';
            if (cancerType === 'breast') cancerTypeName = 'breast cancer';
            else if (cancerType === 'lung') cancerTypeName = 'lung cancer';
            else if (cancerType === 'lymphoma') cancerTypeName = 'lymphoma';
            else if (cancerType === 'leukemia') cancerTypeName = 'leukemia';
            else if (cancerType === 'colorectal') cancerTypeName = 'colorectal cancer';
            else if (cancerType === 'thyroid') cancerTypeName = 'thyroid cancer';
            else if (cancerType === 'bone') cancerTypeName = 'bone cancer';
            alert(`Please select a ${cancerTypeName} subtype.`);
            return false;
        }
    }
    
    // Check if carboplatin protocol requires AUC, age, and creatinine
    const aucGroup = document.getElementById('aucGroup');
    if (aucGroup.style.display !== 'none') {
        const auc = document.getElementById('auc').value;
        const age = document.getElementById('age').value;
        const creatinine = document.getElementById('creatinine').value;
        
        if (!auc) {
            alert('Please select an AUC value for this carboplatin protocol.');
            return false;
        }
        if (!age) {
            alert('Please enter the patient age for carboplatin dosing calculation.');
            return false;
        }
        if (!creatinine) {
            alert('Please enter the patient creatinine level for carboplatin dosing calculation.');
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
    
    // Helper function to generate search aliases for common drug abbreviations
    function generateSearchAliases(text) {
        let aliases = text;
        
        // 5-FU variations
        if (text.includes('5-fluorouracil')) {
            aliases += ' 5fu 5 fu 5-fu';
        }
        
        // Protocol abbreviations
        if (text.includes('oxaliplatin') && text.includes('5-fluorouracil') && text.includes('leucovorin')) {
            if (text.includes('docetaxel')) {
                aliases += ' flot';
            } else {
                aliases += ' folfox';
            }
        }
        if (text.includes('irinotecan') && text.includes('5-fluorouracil') && text.includes('leucovorin')) {
            aliases += ' folfiri';
        }
        if (text.includes('capecitabine') && text.includes('oxaliplatin')) {
            aliases += ' xelox capox';
        }
        if (text.includes('capecitabine') && text.includes('irinotecan')) {
            aliases += ' xeliri capiri';
        }
        
        // Other common drug abbreviations
        if (text.includes('cisplatin')) {
            aliases += ' cis';
        }
        if (text.includes('carboplatin')) {
            aliases += ' carbo';
        }
        if (text.includes('cyclophosphamide')) {
            aliases += ' cyclo';
        }
        if (text.includes('doxorubicin')) {
            aliases += ' dox';
        }
        if (text.includes('docetaxel')) {
            aliases += ' doc';
        }
        if (text.includes('paclitaxel')) {
            aliases += ' pac';
        }
        if (text.includes('vincristine')) {
            aliases += ' vcr';
        }
        if (text.includes('vinblastine')) {
            aliases += ' vlb';
        }
        if (text.includes('etoposide')) {
            aliases += ' vp16';
        }
        
        return aliases;
    }
    
    Object.keys(protocolDatabase).forEach(cancerType => {
        const cancerName = getCancerDisplayName(cancerType);
        
        if (cancerType === 'breast' || cancerType === 'lung' || cancerType === 'lymphoma' || cancerType === 'leukemia' || cancerType === 'colorectal' || cancerType === 'thyroid' || cancerType === 'bone') {
            // Handle breast cancer, lung cancer, lymphoma, leukemia, colorectal, thyroid, and bone cancer subtypes
            Object.keys(protocolDatabase[cancerType]).forEach(subtype => {
                const subtypeName = getSubtypeDisplayName(subtype);
                Object.keys(protocolDatabase[cancerType][subtype]).forEach(protocolKey => {
                    const protocol = protocolDatabase[cancerType][subtype][protocolKey];
                    const drugNames = protocol.drugs ? protocol.drugs.map(drug => drug.name).join(' ') : '';
                    const baseSearchText = `${protocol.name} ${cancerName} ${subtypeName} ${drugNames}`.toLowerCase();
                    const searchText = generateSearchAliases(baseSearchText);
                    
                    allProtocols.push({
                        key: protocolKey,
                        name: protocol.name,
                        cancerType: cancerType,
                        cancerName: `${cancerName} - ${subtypeName}`,
                        subtype: subtype,
                        searchText: searchText
                    });
                });
            });
        } else {
            // Handle other cancer types
            Object.keys(protocolDatabase[cancerType]).forEach(protocolKey => {
                const protocol = protocolDatabase[cancerType][protocolKey];
                const drugNames = protocol.drugs ? protocol.drugs.map(drug => drug.name).join(' ') : '';
                const baseSearchText = `${protocol.name} ${cancerName} ${drugNames}`.toLowerCase();
                const searchText = generateSearchAliases(baseSearchText);
                
                allProtocols.push({
                    key: protocolKey,
                    name: protocol.name,
                    cancerType: cancerType,
                    cancerName: cancerName,
                    subtype: null,
                    searchText: searchText
                });
            });
        }
    });
    
    console.log('Protocol index built, total protocols:', allProtocols.length); // Debug log
    console.log('First few protocols:', allProtocols.slice(0, 3)); // Debug log
}

function getCancerDisplayName(cancerType) {
    const names = {
        adrenocortical: 'Adrenocortical Cancer',
        anal: 'Anal Cancer',
        basal_cell: 'Basal Cell Carcinoma',
        biliary: 'Biliary Tract Cancer',
        bladder: 'Bladder Cancer',
        bone: 'Bone Cancer',
        brain: 'Brain Cancer',
        breast: 'Breast Cancer',
        carcinoma_unknown_primary: 'Carcinoma of Unknown Primary',
        cervical: 'Cervical Cancer',
        colorectal: 'Colorectal Cancer',
        endometrial: 'Endometrial Cancer',
        esophageal: 'Esophageal & Esophagogastric Junction Cancer',
        gastric: 'Gastric Cancer',
        gist: 'Gastrointestinal Stromal Tumor (GIST)',
        head_neck: 'Head & Neck Cancer',
        hepatocellular: 'Hepatocellular Carcinoma',
        leukemia: 'Leukemia',
        lung: 'Lung Cancer',
        lymphoma: 'Lymphoma',
        melanoma: 'Malignant Melanoma',
        merkel_cell: 'Merkel Cell Carcinoma',
        mesothelioma: 'Mesothelioma',
        multiple_myeloma: 'Multiple Myeloma',
        neuroendocrine: 'Neuroendocrine Tumors',
        ovarian: 'Ovarian Cancer',
        pancreatic: 'Pancreatic Cancer',
        penile: 'Penile Cancer',
        prostate: 'Prostate Cancer',
        renal: 'Renal Cell Cancer',
        sarcoma: 'Soft Tissue Sarcoma',
        testicular: 'Testicular Cancer',
        thymoma: 'Thymoma',
        thyroid: 'Thyroid Cancer',
        stem_cell_transplant: 'Stem Cell Transplant Conditioning',
        tumor_agnostic: 'Tumor Agnostic Therapy',
        vulvar_vaginal: 'Vulvar & Vaginal Cancer'
    };
    return names[cancerType] || cancerType;
}

function getSubtypeDisplayName(subtype) {
    const names = {
        hormone_positive: 'Hormone Positive (ER+/PR+)',
        triple_negative: 'Triple Negative (ER-/PR-/HER2-)',
        her2_positive: 'HER2 Positive',
        her2_low_ultralow: 'HER2-Low/Ultralow',
        nsclc: 'Non-Small Cell Lung Cancer (NSCLC)',
        sclc: 'Small Cell Lung Cancer (SCLC)',
        hodgkins: 'Hodgkin\'s Lymphoma',
        non_hodgkins: 'Non-Hodgkin\'s Lymphoma',
        all: 'Acute Lymphoblastic Leukemia (ALL)',
        aml: 'Acute Myeloid Leukemia (AML)',
        cml: 'Chronic Myeloid Leukemia (CML)',
        cll: 'Chronic Lymphocytic Leukemia (CLL)',
        hairy_cell: 'Hairy Cell Leukemia',
        colon_cancer: 'Colon Cancer',
        rectal_cancer: 'Rectal Cancer',
        metastatic_colorectal: 'Metastatic Colorectal Cancer',
        osteosarcoma: 'Osteosarcoma',
        chordoma: 'Chordoma',
        ewings_sarcoma: 'Ewing\'s Sarcoma',
        chondrosarcoma: 'Chondrosarcoma',
        giant_cell_tumor: 'Giant Cell Tumor of Bone',
        differentiated_thyroid: 'Differentiated Thyroid Cancer',
        medullary_thyroid: 'Medullary Thyroid Cancer',
        anaplastic_thyroid: 'Anaplastic Thyroid Cancer'
    };
    return names[subtype] || subtype;
}

// Fuzzy search functionality for auto-correction
function calculateLevenshteinDistance(str1, str2) {
    const matrix = [];
    
    // Create matrix
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }
    
    // Fill matrix
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    
    return matrix[str2.length][str1.length];
}

function fuzzyMatch(query, text, threshold = 0.6) {
    const queryLower = query.toLowerCase();
    const textLower = text.toLowerCase();
    
    // Direct substring match (highest priority)
    if (textLower.includes(queryLower)) {
        return 1.0;
    }
    
    // Split query and text into words for drug name matching
    const queryWords = queryLower.split(/\s+/);
    const textWords = textLower.split(/\s+/);
    
    let bestScore = 0;
    
    // Check each query word against each text word
    for (const queryWord of queryWords) {
        if (queryWord.length < 3) continue; // Skip very short words
        
        for (const textWord of textWords) {
            const distance = calculateLevenshteinDistance(queryWord, textWord);
            const maxLength = Math.max(queryWord.length, textWord.length);
            const similarity = 1 - (distance / maxLength);
            
            if (similarity > bestScore) {
                bestScore = similarity;
            }
        }
    }
    
    return bestScore >= threshold ? bestScore : 0;
}

function searchProtocols(query) {
    if (!query || query.length < 2) return [];
    
    const queryLower = query.toLowerCase();
    
    // First try exact/substring matches
    const exactResults = allProtocols.filter(protocol => 
        protocol.searchText.includes(queryLower)
    );
    
    // If we have exact matches, prioritize them
    if (exactResults.length > 0) {
        exactResults.sort((a, b) => {
            const aExact = a.name.toLowerCase().startsWith(queryLower) ? 0 : 1;
            const bExact = b.name.toLowerCase().startsWith(queryLower) ? 0 : 1;
            return aExact - bExact;
        });
        return exactResults.slice(0, 50);
    }
    
    // If no exact matches, try fuzzy matching for auto-correction
    const fuzzyResults = allProtocols.map(protocol => {
        const score = fuzzyMatch(query, protocol.searchText, 0.5);
        return { protocol, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.protocol);
    
    return fuzzyResults.slice(0, 50);
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
    
    // Hide and clear search section carboplatin parameters
    const searchCarboplatinParams = document.getElementById('searchCarboplatinParams');
    const searchAgeInput = document.getElementById('searchAge');
    const searchCreatinineInput = document.getElementById('searchCreatinine');
    const searchAucSelect = document.getElementById('searchAuc');
    
    searchCarboplatinParams.style.display = 'none';
    searchAgeInput.required = false;
    searchCreatinineInput.required = false;
    searchAucSelect.required = false;
    searchAgeInput.value = '';
    searchCreatinineInput.value = '';
    searchAucSelect.value = '';
    
    selectedSearchProtocol = null;
}

function checkForCarboplatinSearch(protocol) {
    let protocolData;
    
    if ((protocol.cancerType === 'breast' || protocol.cancerType === 'lung' || protocol.cancerType === 'lymphoma' || protocol.cancerType === 'leukemia') && protocol.subtype) {
        protocolData = protocolDatabase[protocol.cancerType][protocol.subtype][protocol.key];
    } else {
        protocolData = protocolDatabase[protocol.cancerType][protocol.key];
    }
    
    if (protocolData) {
        const hasCarboplatin = protocolData.drugs.some(drug => drug.name.toLowerCase().includes('carboplatin'));
        
        // Get search section carboplatin elements
        const searchCarboplatinParams = document.getElementById('searchCarboplatinParams');
        const searchAgeInput = document.getElementById('searchAge');
        const searchCreatinineInput = document.getElementById('searchCreatinine');
        const searchAucSelect = document.getElementById('searchAuc');
        const searchBSAAdditionalFields = document.getElementById('searchBSAAdditionalFields');
        const searchWeightInput = document.getElementById('searchWeight');
        const searchSexInputs = document.querySelectorAll('input[name="searchSex"]');
        
        // Get browse section carboplatin elements (keep hidden when using search)
        const browseCarboplatinParams = document.getElementById('carboplatinParams');
        const browseAucGroup = document.getElementById('aucGroup');
        const browseAucSelect = document.getElementById('auc');
        const browseAgeInput = document.getElementById('age');
        const browseCreatinineInput = document.getElementById('creatinine');
        
        // Check if BSA was entered directly (need additional weight and sex for carboplatin)
        const directBSA = document.getElementById('directBSA').value;
        const isBSADirectlyEntered = directBSA && parseFloat(directBSA) > 0;
        
        if (hasCarboplatin) {
            // Show carboplatin parameters in search section
            searchCarboplatinParams.style.display = 'block';
            searchAgeInput.required = true;
            searchCreatinineInput.required = true;
            searchAucSelect.required = true;
            
            // Show additional weight and sex fields if BSA was entered directly
            if (isBSADirectlyEntered) {
                searchBSAAdditionalFields.style.display = 'block';
                searchWeightInput.required = true;
                // Make one of the sex radio buttons required by adding required to both
                searchSexInputs.forEach(input => input.required = true);
            } else {
                searchBSAAdditionalFields.style.display = 'none';
                searchWeightInput.required = false;
                searchWeightInput.value = '';
                searchSexInputs.forEach(input => {
                    input.required = false;
                    input.checked = false;
                });
            }
            
            // Hide browse section carboplatin parameters
            browseCarboplatinParams.style.display = 'none';
            browseAucGroup.style.display = 'none';
            browseAucSelect.required = false;
            browseAgeInput.required = false;
            browseCreatinineInput.required = false;
        } else {
            // Hide search section carboplatin parameters
            searchCarboplatinParams.style.display = 'none';
            searchBSAAdditionalFields.style.display = 'none';
            searchAgeInput.required = false;
            searchCreatinineInput.required = false;
            searchAucSelect.required = false;
            searchWeightInput.required = false;
            searchSexInputs.forEach(input => input.required = false);
            searchAgeInput.value = '';
            searchCreatinineInput.value = '';
            searchAucSelect.value = '';
            
            // Hide browse section carboplatin parameters as well
            browseCarboplatinParams.style.display = 'none';
            browseAucGroup.style.display = 'none';
            browseAucSelect.required = false;
            browseAgeInput.required = false;
            browseCreatinineInput.required = false;
            browseAucSelect.value = '';
            browseAgeInput.value = '';
            browseCreatinineInput.value = '';
        }
    }
}

// Cancer-specific search functionality
let cancerSpecificProtocols = [];
let selectedCancerSearchProtocol = null;

// Dose adjustment functionality
let originalResults = null;
let currentReductions = {};

function buildCancerSpecificIndex(cancerType, subtype = null) {
    console.log('Building cancer-specific index for:', cancerType, subtype);
    cancerSpecificProtocols = [];
    
    if (!protocolDatabase[cancerType]) return;
    
    const cancerName = getCancerDisplayName(cancerType);
    
    if ((cancerType === 'breast' || cancerType === 'lung' || cancerType === 'lymphoma' || cancerType === 'leukemia' || cancerType === 'colorectal' || cancerType === 'thyroid' || cancerType === 'bone') && subtype) {
        const subtypeName = getSubtypeDisplayName(subtype);
        if (protocolDatabase[cancerType][subtype]) {
            Object.keys(protocolDatabase[cancerType][subtype]).forEach(protocolKey => {
                const protocol = protocolDatabase[cancerType][subtype][protocolKey];
                const drugNames = protocol.drugs ? protocol.drugs.map(drug => drug.name).join(' ') : '';
                cancerSpecificProtocols.push({
                    key: protocolKey,
                    name: protocol.name,
                    cancerType: cancerType,
                    cancerName: `${cancerName} - ${subtypeName}`,
                    subtype: subtype,
                    searchText: `${protocol.name} ${drugNames}`.toLowerCase()
                });
            });
        }
    } else if (cancerType === 'breast' || cancerType === 'lung' || cancerType === 'lymphoma' || cancerType === 'leukemia' || cancerType === 'colorectal' || cancerType === 'thyroid' || cancerType === 'bone') {
        // Handle cancer types with subtypes but no specific subtype selected yet
        Object.keys(protocolDatabase[cancerType]).forEach(subtypeKey => {
            const subtypeName = getSubtypeDisplayName(subtypeKey);
            Object.keys(protocolDatabase[cancerType][subtypeKey]).forEach(protocolKey => {
                const protocol = protocolDatabase[cancerType][subtypeKey][protocolKey];
                const drugNames = protocol.drugs ? protocol.drugs.map(drug => drug.name).join(' ') : '';
                cancerSpecificProtocols.push({
                    key: protocolKey,
                    name: protocol.name,
                    cancerType: cancerType,
                    cancerName: `${cancerName} - ${subtypeName}`,
                    subtype: subtypeKey,
                    searchText: `${protocol.name} ${drugNames}`.toLowerCase()
                });
            });
        });
    } else {
        // Handle other cancer types without subtypes
        Object.keys(protocolDatabase[cancerType]).forEach(protocolKey => {
            const protocol = protocolDatabase[cancerType][protocolKey];
            const drugNames = protocol.drugs ? protocol.drugs.map(drug => drug.name).join(' ') : '';
            cancerSpecificProtocols.push({
                key: protocolKey,
                name: protocol.name,
                cancerType: cancerType,
                cancerName: cancerName,
                subtype: null,
                searchText: `${protocol.name} ${drugNames}`.toLowerCase()
            });
        });
    }
    
    console.log(`Cancer-specific index built, total protocols for ${cancerType}:`, cancerSpecificProtocols.length);
}

function searchCancerSpecificProtocols(query) {
    if (!query || query.length < 2) return [];
    
    const queryLower = query.toLowerCase();
    
    // First try exact/substring matches
    const exactResults = cancerSpecificProtocols.filter(protocol => 
        protocol.searchText.includes(queryLower)
    );
    
    // If we have exact matches, prioritize them
    if (exactResults.length > 0) {
        exactResults.sort((a, b) => {
            const aExact = a.name.toLowerCase().startsWith(queryLower) ? 0 : 1;
            const bExact = b.name.toLowerCase().startsWith(queryLower) ? 0 : 1;
            return aExact - bExact;
        });
        return exactResults.slice(0, 20);
    }
    
    // If no exact matches, try fuzzy matching for auto-correction
    const fuzzyResults = cancerSpecificProtocols.map(protocol => {
        const score = fuzzyMatch(query, protocol.searchText, 0.5);
        return { protocol, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.protocol);
    
    return fuzzyResults.slice(0, 20); // Limit to 20 suggestions for cancer-specific search
}

function showCancerSearchDropdown(suggestions) {
    const dropdown = document.getElementById('cancerSearchDropdown');
    
    if (suggestions.length === 0) {
        dropdown.style.display = 'none';
        return;
    }
    
    dropdown.innerHTML = suggestions.map(protocol => `
        <div class="cancer-search-item" data-protocol-key="${protocol.key}" data-cancer-type="${protocol.cancerType}" data-subtype="${protocol.subtype || ''}" style="padding: 10px; cursor: pointer; border-bottom: 1px solid #f0f0f0; transition: background 0.2s;" onmouseover="this.style.backgroundColor='#f8f9fa'" onmouseout="this.style.backgroundColor='white'">
            <div style="font-weight: 600; color: #2c3e50; margin-bottom: 2px;">${protocol.name}</div>
            <div style="font-size: 12px; color: #666;">${protocol.cancerName}</div>
        </div>
    `).join('');
    
    dropdown.style.display = 'block';
    
    // Add click handlers
    dropdown.querySelectorAll('.cancer-search-item').forEach(item => {
        item.addEventListener('click', function() {
            selectCancerProtocol({
                key: this.dataset.protocolKey,
                cancerType: this.dataset.cancerType,
                subtype: this.dataset.subtype || null,
                name: this.querySelector('div').textContent
            });
        });
    });
}

function selectCancerProtocol(protocol) {
    console.log('Selecting cancer protocol:', protocol);
    selectedCancerSearchProtocol = protocol;
    
    // Update search input to show selected protocol
    document.getElementById('cancerSpecificSearchInput').value = protocol.name;
    
    // Hide dropdown
    document.getElementById('cancerSearchDropdown').style.display = 'none';
    
    // Update the main protocol dropdown to match selection
    if (protocol.subtype) {
        document.getElementById('cancerSubtype').value = protocol.subtype;
        populateProtocols(protocol.cancerType, protocol.subtype);
    }
    document.getElementById('protocol').value = protocol.key;
    
    // Check for carboplatin
    checkForCarboplatin(protocol.key, protocol.cancerType, protocol.subtype);
    
    // Clear global search
    clearSearchSection();
}

function clearCancerSearchSection() {
    const searchInput = document.getElementById('cancerSpecificSearchInput');
    const dropdown = document.getElementById('cancerSearchDropdown');
    
    if (searchInput) searchInput.value = '';
    if (dropdown) dropdown.style.display = 'none';
    selectedCancerSearchProtocol = null;
}

// Get reference for cancer type
function getReference(cancerType, cancerSubtype) {
    // Skip referencing for stem cell transplant and specific leukemia subtypes
    if (cancerType === 'stem_cell_transplant') {
        return null; // Will be added later
    }
    
    if (cancerType === 'leukemia' && ['all', 'aml', 'cml', 'cll'].includes(cancerSubtype)) {
        return null; // Will be added later
    }
    
    // NCCN references for all other cancer types
    const references = {
        'adrenocortical': 'NCCN Neuroendocrine and Adrenal Tumors Guidelines',
        'anal': 'NCCN Anal Carcinoma Guidelines',
        'basal_cell': 'NCCN Basal Cell Skin Cancer Guidelines',
        'biliary': 'NCCN Hepatobiliary Cancers Guidelines',
        'bladder': 'NCCN Bladder Cancer Guidelines',
        'brain': 'NCCN Central Nervous System Cancers Guidelines',
        'breast': 'NCCN Breast Cancer Guidelines',
        'carcinoma_unknown_primary': 'NCCN Occult Primary Guidelines',
        'cervical': 'NCCN Cervical Cancer Guidelines',
        'colorectal': 'NCCN Colon Cancer Guidelines',
        'endometrial': 'NCCN Uterine Neoplasms Guidelines',
        'esophageal': 'NCCN Esophageal and Esophagogastric Junction Cancers Guidelines',
        'gastric': 'NCCN Gastric Cancer Guidelines',
        'gist': 'NCCN Gastrointestinal Stromal Tumors Guidelines',
        'head_neck': 'NCCN Head and Neck Cancers Guidelines',
        'hepatocellular': 'NCCN Hepatocellular Carcinoma Guidelines',
        'lung': 'NCCN Non-Small Cell Lung Cancer Guidelines',
        'lymphoma': 'NCCN Hodgkin Lymphoma Guidelines',
        'melanoma': 'NCCN Melanoma: Cutaneous Guidelines',
        'merkel_cell': 'NCCN Merkel Cell Carcinoma Guidelines',
        'mesothelioma': 'NCCN Pleural Mesothelioma Guidelines',
        'multiple_myeloma': 'NCCN Multiple Myeloma Guidelines',
        'neuroendocrine': 'NCCN Neuroendocrine and Adrenal Tumors Guidelines',
        'bone': 'NCCN Bone Cancer Guidelines',
        'ovarian': 'NCCN Ovarian Cancer Guidelines',
        'pancreatic': 'NCCN Pancreatic Adenocarcinoma Guidelines',
        'penile': 'NCCN Penile Cancer Guidelines',
        'prostate': 'NCCN Prostate Cancer Guidelines',
        'renal': 'NCCN Kidney Cancer Guidelines',
        'sarcoma': 'NCCN Soft Tissue Sarcoma Guidelines',
        'testicular': 'NCCN Testicular Cancer Guidelines',
        'thymoma': 'NCCN Thymomas and Thymic Carcinomas Guidelines',
        'thyroid': 'NCCN Thyroid Carcinoma Guidelines',
        'tumor_agnostic': 'NCCN Guidelines for Cancer of Unknown Primary',
        'vulvar_vaginal': 'NCCN Vulvar Cancer Guidelines'
    };
    
    // Handle special cases for leukemia (only HCL gets reference now)
    if (cancerType === 'leukemia' && cancerSubtype === 'hcl') {
        return 'NCCN Hairy Cell Leukemia Guidelines';
    }
    
    // Handle lymphoma subtypes
    if (cancerType === 'lymphoma') {
        if (cancerSubtype === 'hodgkins') {
            return 'NCCN Hodgkin Lymphoma Guidelines';
        } else if (cancerSubtype === 'non_hodgkins') {
            return 'NCCN B-Cell Lymphomas Guidelines';
        }
    }
    
    // Handle lung cancer subtypes
    if (cancerType === 'lung') {
        if (cancerSubtype === 'nsclc') {
            return 'NCCN Non-Small Cell Lung Cancer Guidelines';
        } else if (cancerSubtype === 'sclc') {
            return 'NCCN Small Cell Lung Cancer Guidelines';
        }
    }
    
    return references[cancerType] || 'NCCN Clinical Practice Guidelines';
}

// Display results
function displayResults(results, patientData) {
    // Store original results for dose adjustment functionality
    originalResults = {
        results: results,
        patientData: patientData
    };
    currentReductions = {}; // Reset reductions
    
    const resultsContent = document.getElementById('resultsContent');
    
    resultsContent.innerHTML = `
        <div style="margin-bottom: 20px;">
            <h3 style="color: #2c3e50; margin-bottom: 15px;">Drug Calculations:</h3>
            <div class="responsive-table">
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                        <tr style="background-color: #f8f9fa; border-bottom: 2px solid #dee2e6;">
                            <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Drug Name</th>
                            <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Standard Dose</th>
                            <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Calculated Dose</th>
                            <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Rounded Dose</th>
                            <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Schedule</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${results.drugs.map(drug => `
                            <tr style="border-bottom: 1px solid #dee2e6;">
                                <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: 600;">${drug.name}${drug.days ? ` (${drug.days})` : ''}</td>
                                <td style="padding: 12px; border: 1px solid #dee2e6;">
                                    ${drug.hasLoadingDose ? 
                                        `<div style="font-size: 12px; line-height: 1.3;">
                                            <div style="color: #007bff; font-weight: 600;">Loading</div>
                                            <div style="color: #007bff; margin-bottom: 8px;">${drug.originalDose.split(' → ')[0]} ${drug.originalUnit}</div>
                                            <div style="color: #28a745; font-weight: 600;">Maintenance</div>
                                            <div style="color: #28a745;">${drug.originalDose.split(' → ')[1]} ${drug.originalUnit}</div>
                                        </div>` 
                                        : `${drug.originalDose}${drug.originalUnit === 'AUC' && drug.originalDose.toString().includes('AUC') ? '' : ' ' + drug.originalUnit}`}
                                </td>
                                <td style="padding: 12px; border: 1px solid #dee2e6; background-color: #e8f5e8; font-weight: 600;">
                                    ${drug.hasLoadingDose ? 
                                        `<div style="font-size: 12px; line-height: 1.3;">
                                            <div style="color: #007bff; font-weight: 600;">Loading</div>
                                            <div style="color: #007bff; margin-bottom: 8px;">${drug.calculatedDose.split(' → ')[0]} ${drug.doseUnit}</div>
                                            <div style="color: #28a745; font-weight: 600;">Maintenance</div>
                                            <div style="color: #28a745;">${drug.calculatedDose.split(' → ')[1]} ${drug.doseUnit}</div>
                                        </div>` 
                                        : `${drug.calculatedDose} ${drug.doseUnit}`}
                                </td>
                                <td style="padding: 12px; border: 1px solid #dee2e6; background-color: #fff3cd; font-weight: 600; color: #856404;">
                                    ${drug.hasLoadingDose ? 
                                        (() => {
                                            const loadingDose = parseFloat(drug.calculatedDose.split(' → ')[0]);
                                            const maintenanceDose = parseFloat(drug.calculatedDose.split(' → ')[1]);
                                            return `<div style="font-size: 12px; line-height: 1.3;">
                                                <div style="color: #007bff; font-weight: 600;">Loading</div>
                                                <div style="color: #007bff; margin-bottom: 8px;">${roundDose(loadingDose, drug.name, results.protocolName)} ${drug.doseUnit}</div>
                                                <div style="color: #28a745; font-weight: 600;">Maintenance</div>
                                                <div style="color: #28a745;">${roundDose(maintenanceDose, drug.name, results.protocolName)} ${drug.doseUnit}</div>
                                            </div>`;
                                        })()
                                        : `${roundDose(parseFloat(drug.calculatedDose), drug.name, results.protocolName)} ${drug.doseUnit}`}
                                </td>
                                <td style="padding: 12px; border: 1px solid #dee2e6; font-size: 13px; color: #6c757d;">
                                    ${(() => {
                                        let schedule = drug.schedule || 'Per protocol';
                                        // Add vincristine capping logic (except for EPOCH/DA-EPOCH regimens)
                                        if (drug.name.toLowerCase().includes('vincristine') && 
                                            !results.protocolName.toLowerCase().includes('epoch')) {
                                            schedule += '<br><span style="color: #e74c3c; font-weight: 600; font-size: 11px;">⚠️ Cap at 2mg</span>';
                                        }
                                        return schedule;
                                    })()}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        
        ${results.reference ? `
        <div style="margin-bottom: 20px; padding: 8px 12px; background-color: #f8f9fa; border-left: 3px solid #6c757d; border-radius: 3px; font-size: 12px;">
            <strong>📚 Reference:</strong> ${results.reference}
        </div>
        ` : ''}
        
        <div class="result-item" style="margin-bottom: 20px;">
            <strong>Patient Summary</strong><br>
            ${results.hasCarboplatin ? 
                `Weight: ${patientData.weight} kg | Height: ${patientData.height} cm<br>
                BSA: ${results.bsa} m² | CrCl: ${results.crCl} mL/min<br>
                Regimen: ${results.protocolName}${results.selectedAuc ? ` | AUC ${results.selectedAuc}` : ''}` :
                `Weight: ${patientData.weight} kg | Height: ${patientData.height} cm<br>
                BSA: ${results.bsa} m²<br>
                Regimen: ${results.protocolName}`
            }
        </div>
        
        <div style="margin-top: 20px; padding: 8px 12px; background-color: #fff3cd; border-left: 3px solid #ffc107; border-radius: 3px; font-size: 12px;">
            <strong>⚠️ Important:</strong> Please verify all calculations and check for contraindications before administration. This tool is for reference only.
        </div>
    `;
    
    // Show results page
    showPage(3);
}

// Dose adjustment functions
function showDoseAdjustmentPage() {
    if (!originalResults) return;
    
    const { results, patientData } = originalResults;
    
    // Initialize current reductions if empty
    results.drugs.forEach(drug => {
        if (!(drug.name in currentReductions)) {
            currentReductions[drug.name] = 0;
        }
    });
    
    // Build dose adjustment table
    buildDoseAdjustmentTable();
    
    showPage(4);
}

function buildDoseAdjustmentTable() {
    if (!originalResults) return;
    
    const { results } = originalResults;
    const tableContainer = document.getElementById('doseAdjustmentTable');
    
    // Helper function to check if drug is non-reducible (Trastuzumab/Pertuzumab/Immunotherapy)
    function isImmunotherapyDrug(drugName) {
        const immunotherapyDrugs = [
            // Monoclonal antibodies and targeted IV agents
            'trastuzumab', 
            'pertuzumab',
            // Checkpoint inhibitors and immunotherapy drugs
            'pembrolizumab',
            'nivolumab',
            'ipilimumab',
            'atezolizumab',
            'relatlimab',
            'cemiplimab',
            'dostarlimab',
            'toripalimab',
            'tislelizumab',
            'avelumab',
            'durvalumab',
            'tremelimumab',
            'spartalizumab',
            'retifanlimab'
        ];
        return immunotherapyDrugs.some(drug => drugName.toLowerCase().includes(drug));
    }

    function isTargetedTherapyDrug(drugName) {
        const targetedTherapyDrugs = [
            // CDK4/6 inhibitors
            'ribociclib',
            'abemaciclib', 
            'palbociclib',
            // PARP inhibitors
            'olaparib',
            'niraparib',
            'rucaparib',
            'talazoparib',
            // Tyrosine kinase inhibitors (TKIs)
            'erlotinib',
            'gefitinib',
            'osimertinib',
            'crizotinib',
            'alectinib',
            'brigatinib',
            'lorlatinib',
            'ceritinib',
            'lapatinib',
            'afatinib',
            'dacomitinib',
            'mobocertinib',
            'amivantamab',
            'sotorasib',
            'adagrasib',
            'imatinib',
            'dasatinib',
            'nilotinib',
            'bosutinib',
            'ponatinib',
            'midostaurin',
            'gilteritinib',
            'sorafenib',
            'sunitinib',
            'pazopanib',
            'axitinib',
            'cabozantinib',
            'lenvatinib',
            'regorafenib',
            'tivozanib',
            'donafenib',
            'apatinib',
            'ramucirumab',
            // mTOR inhibitors
            'everolimus',
            'temsirolimus',
            // Other oral targeted therapies
            'ibrutinib',
            'acalabrutinib',
            'zanubrutinib',
            'idelalisib',
            'venetoclax',
            'ruxolitinib',
            'fedratinib',
            'pacritinib',
            'vismodegib',
            'sonidegib',
            'glasdegib',
            'tucatinib',
            // GIST-specific targeted therapies
            'avapritinib',
            'ripretinib',
            // TRK inhibitors
            'larotrectinib',
            'entrectinib',
            'repotrectinib',
            // BRAF/MEK inhibitors
            'dabrafenib',
            'trametinib',
            'vemurafenib',
            'cobimetinib',
            'encorafenib',
            'binimetinib'
        ];
        return targetedTherapyDrugs.some(drug => drugName.toLowerCase().includes(drug));
    }

    function isHormonalTherapyDrug(drugName) {
        const hormonalTherapyDrugs = [
            // SERMs (Selective Estrogen Receptor Modulators)
            'tamoxifen',
            'toremifene',
            // Aromatase Inhibitors
            'anastrozole',
            'letrozole',
            'exemestane',
            // SERDs (Selective Estrogen Receptor Degraders)
            'fulvestrant',
            'elacestrant',
            'camizestrant',
            // GnRH Agonists
            'goserelin',
            'leuprolide',
            'triptorelin',
            'histrelin',
            // Anti-androgens
            'bicalutamide',
            'flutamide',
            'enzalutamide',
            'apalutamide',
            'darolutamide',
            // Other hormonal agents
            'abiraterone',
            'degarelix'
        ];
        return hormonalTherapyDrugs.some(drug => drugName.toLowerCase().includes(drug));
    }

    function isNonReducibleDrug(drugName) {
        return isImmunotherapyDrug(drugName) || isTargetedTherapyDrug(drugName) || isHormonalTherapyDrug(drugName);
    }
    
    tableContainer.innerHTML = `
        <div class="responsive-table">
            <table>
                <thead>
                    <tr>
                        <th style="font-weight: 600;">Drug</th>
                        <th style="font-weight: 600;">Original</th>
                        <th style="font-weight: 600;">Reduce</th>
                        <th style="font-weight: 600;">Final</th>
                    </tr>
                </thead>
                <tbody>
                    ${results.drugs.map(drug => {
                        const isNonReducible = isNonReducibleDrug(drug.name);
                        const reduction = currentReductions[drug.name] || 0;
                        const originalDose = drug.calculatedDose;
                        const finalDose = originalDose * (1 - reduction / 100);
                        
                        if (isNonReducible) {
                            const isImmuno = isImmunotherapyDrug(drug.name);
                            const isHormonal = isHormonalTherapyDrug(drug.name);
                            const noteText = (isImmuno || isHormonal) ? "*Dose reduction not recommended" : "*Standard dose level reductions apply";
                            
                            // For Immunotherapy/Targeted therapy - show original dose, different notes
                            return `
                                <tr>
                                    <td style="font-weight: 600; color: #2c3e50;">
                                        ${drug.name}
                                        <div style="font-size: 11px; color: #e67e22; font-weight: 500; margin-top: 2px;">
                                            ${noteText}
                                        </div>
                                    </td>
                                    <td>
                                        ${drug.hasLoadingDose ? 
                                            `<div style="font-size: 11px; line-height: 1.3;">
                                                <div style="color: #007bff; font-weight: 600;">Loading</div>
                                                <div style="color: #007bff; margin-bottom: 4px;">${drug.calculatedDose.split(' → ')[0]}</div>
                                                <div style="color: #28a745; font-weight: 600;">Maintenance</div>
                                                <div style="color: #28a745;">${drug.calculatedDose.split(' → ')[1]}</div>
                                            </div>` 
                                            : originalDose}
                                    </td>
                                    <td style="text-align: center; color: #95a5a6; font-style: italic;">
                                        N/A
                                    </td>
                                    <td style="font-weight: 600; color: #2c3e50;">
                                        ${drug.hasLoadingDose ? 
                                            `<div style="font-size: 11px; line-height: 1.3;">
                                                <div style="color: #007bff; font-weight: 600;">Loading</div>
                                                <div style="color: #007bff; margin-bottom: 4px;">${drug.calculatedDose.split(' → ')[0]}</div>
                                                <div style="color: #28a745; font-weight: 600;">Maintenance</div>
                                                <div style="color: #28a745;">${drug.calculatedDose.split(' → ')[1]}</div>
                                                <div style="font-size: 10px; color: #7f8c8d; font-weight: 400; margin-top: 3px; white-space: normal; word-wrap: break-word;">${(isImmuno || isHormonal) ? 'Withhold if toxicity' : 'Per dose level schedule'}</div>
                                            </div>` 
                                            : `${originalDose}<div style="font-size: 11px; color: #7f8c8d; font-weight: 400; margin-top: 2px; white-space: normal; word-wrap: break-word;">${(isImmuno || isHormonal) ? 'Withhold if toxicity' : 'Per dose level schedule'}</div>`}
                                    </td>
                                </tr>
                            `;
                        } else {
                            // Regular drugs with dose reduction capability
                            return `
                                <tr>
                                    <td style="font-weight: 600; color: #2c3e50;">${drug.name}</td>
                                    <td>${originalDose}</td>
                                    <td style="position: relative;">
                                        <input type="number" 
                                               id="reduction_${drug.name.replace(/\s+/g, '_')}" 
                                               value="${reduction}" 
                                               min="0" 
                                               max="100" 
                                               placeholder="%" 
                                               onchange="updateDrugReduction('${drug.name}', this.value)">
                                        <span class="percentage-symbol">%</span>
                                    </td>
                                    <td id="final_${drug.name.replace(/\s+/g, '_')}" style="font-weight: 600; color: #27ae60;">
                                        ${finalDose.toFixed(1)}${drug.unit || 'mg'}
                                    </td>
                                </tr>
                            `;
                        }
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function updateDrugReduction(drugName, reductionValue) {
    const reduction = Math.max(0, Math.min(100, parseFloat(reductionValue) || 0));
    currentReductions[drugName] = reduction;
    
    // Update the final dose display
    const drug = originalResults.results.drugs.find(d => d.name === drugName);
    if (drug) {
        const finalDose = drug.calculatedDose * (1 - reduction / 100);
        const finalElement = document.getElementById(`final_${drugName.replace(/\s+/g, '_')}`);
        if (finalElement) {
            finalElement.textContent = `${finalDose.toFixed(1)}${drug.unit || 'mg'}`;
        }
    }
}

function applyGlobalReduction() {
    const globalValue = parseFloat(document.getElementById('globalReduction').value) || 0;
    const clampedValue = Math.max(0, Math.min(100, globalValue));
    
    // Update all drug reductions
    Object.keys(currentReductions).forEach(drugName => {
        currentReductions[drugName] = clampedValue;
        const inputElement = document.getElementById(`reduction_${drugName.replace(/\s+/g, '_')}`);
        if (inputElement) {
            inputElement.value = clampedValue;
        }
    });
    
    // Rebuild the table to update all final doses
    buildDoseAdjustmentTable();
}

function resetAllReductions() {
    // Reset all reductions to 0
    Object.keys(currentReductions).forEach(drugName => {
        currentReductions[drugName] = 0;
    });
    
    // Clear global input
    document.getElementById('globalReduction').value = '';
    
    // Rebuild the table
    buildDoseAdjustmentTable();
}

function showFinalPrescription() {
    if (!originalResults) return;
    
    const { results, patientData } = originalResults;
    
    // Build the final results table
    const finalResultsContent = document.getElementById('finalResultsContent');
    
    finalResultsContent.innerHTML = `
        <div style="margin-bottom: 20px;">
            <h3 style="color: #2c3e50; margin-bottom: 15px;">Final Prescription Doses:</h3>
            <div class="responsive-table">
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                        <tr style="background-color: #f8f9fa; border-bottom: 2px solid #dee2e6;">
                            <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Drug Name</th>
                            <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Standard Dose</th>
                            <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Calculated Dose</th>
                            <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Reduced Dose</th>
                            <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Rounded Dose</th>
                            <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Schedule</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${results.drugs.map(drug => {
                            // Check if drug is non-reducible (Immunotherapy/Targeted agents/Hormonal therapies)
                            const isImmuno = isImmunotherapyDrug(drug.name);
                            const isTargeted = isTargetedTherapyDrug(drug.name);
                            const isHormonal = isHormonalTherapyDrug(drug.name);
                            const isNonReducible = [
                                // Monoclonal antibodies and targeted IV agents
                                'trastuzumab', 
                                'pertuzumab',
                                // Checkpoint inhibitors and immunotherapy drugs
                                'pembrolizumab',
                                'nivolumab',
                                'ipilimumab',
                                'atezolizumab',
                                'relatlimab',
                                'cemiplimab',
                                'dostarlimab',
                                'toripalimab',
                                'tislelizumab',
                                'avelumab',
                                'durvalumab',
                                'tremelimumab',
                                'spartalizumab',
                                'retifanlimab',
                                // CDK4/6 inhibitors
                                'ribociclib',
                                'abemaciclib', 
                                'palbociclib',
                                // Hormonal agents
                                'tamoxifen',
                                'letrozole',
                                'anastrozole',
                                'exemestane',
                                'fulvestrant',
                                // PARP inhibitors
                                'olaparib',
                                'niraparib',
                                'rucaparib',
                                'talazoparib',
                                // Tyrosine kinase inhibitors (TKIs)
                                'erlotinib',
                                'gefitinib',
                                'osimertinib',
                                'crizotinib',
                                'alectinib',
                                'brigatinib',
                                'lorlatinib',
                                'ceritinib',
                                'lapatinib',
                                'afatinib',
                                'dacomitinib',
                                'mobocertinib',
                                'amivantamab',
                                'sotorasib',
                                'adagrasib',
                                'imatinib',
                                'dasatinib',
                                'nilotinib',
                                'bosutinib',
                                'ponatinib',
                                'midostaurin',
                                'gilteritinib',
                                'sorafenib',
                                'sunitinib',
                                'pazopanib',
                                'axitinib',
                                'cabozantinib',
                                'lenvatinib',
                                'regorafenib',
                                'tivozanib',
                                // mTOR inhibitors
                                'everolimus',
                                'temsirolimus',
                                // Other oral targeted therapies
                                'ibrutinib',
                                'acalabrutinib',
                                'zanubrutinib',
                                'idelalisib',
                                'venetoclax',
                                'ruxolitinib',
                                'fedratinib',
                                'pacritinib',
                                'vismodegib',
                                'sonidegib',
                                'glasdegib',
                                'tucatinib',
                                // GIST-specific targeted therapies
                                'avapritinib',
                                'ripretinib',
                                // TRK inhibitors
                                'larotrectinib',
                                'entrectinib',
                                'repotrectinib',
                                // BRAF/MEK inhibitors
                                'dabrafenib',
                                'trametinib',
                                'vemurafenib',
                                'cobimetinib',
                                'encorafenib',
                                'binimetinib'
                            ].some(nonReducibleDrug => 
                                drug.name.toLowerCase().includes(nonReducibleDrug));
                            
                            const reduction = currentReductions[drug.name] || 0;
                            const reducedDose = drug.calculatedDose * (1 - reduction / 100);
                            
                            return `
                                <tr style="border-bottom: 1px solid #dee2e6;">
                                    <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: 600;">
                                        ${drug.name}${drug.days ? ` (${drug.days})` : ''}
                                        ${isNonReducible ? `<div style="font-size: 10px; color: #e67e22; margin-top: 2px;">${(isImmuno || isHormonal) ? '*No dose reduction' : '*Standard dose level reductions apply'}</div>` : ''}
                                    </td>
                                    <td style="padding: 12px; border: 1px solid #dee2e6;">
                                        ${drug.hasLoadingDose ? 
                                            `<div style="font-size: 12px; line-height: 1.3;">
                                                <div style="color: #007bff; font-weight: 600;">Loading</div>
                                                <div style="color: #007bff; margin-bottom: 8px;">${drug.originalDose.split(' → ')[0]} ${drug.originalUnit}</div>
                                                <div style="color: #28a745; font-weight: 600;">Maintenance</div>
                                                <div style="color: #28a745;">${drug.originalDose.split(' → ')[1]} ${drug.originalUnit}</div>
                                            </div>` 
                                            : `${drug.originalDose}${drug.originalUnit === 'AUC' && drug.originalDose.toString().includes('AUC') ? '' : ' ' + drug.originalUnit}`}
                                    </td>
                                    <td style="padding: 12px; border: 1px solid #dee2e6; background-color: #e8f5e8; font-weight: 600;">
                                        ${drug.hasLoadingDose ? 
                                            `<div style="font-size: 12px; line-height: 1.3;">
                                                <div style="color: #007bff; font-weight: 600;">Loading</div>
                                                <div style="color: #007bff; margin-bottom: 8px;">${drug.calculatedDose.split(' → ')[0]} ${drug.doseUnit}</div>
                                                <div style="color: #28a745; font-weight: 600;">Maintenance</div>
                                                <div style="color: #28a745;">${drug.calculatedDose.split(' → ')[1]} ${drug.doseUnit}</div>
                                            </div>` 
                                            : `${drug.calculatedDose} ${drug.doseUnit}`}
                                    </td>
                                    <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: 600; color: ${isNonReducible ? '#2c3e50' : (reduction > 0 ? '#e74c3c' : '#27ae60')}; background-color: ${isNonReducible ? '#f8f9fa' : (reduction > 0 ? '#fdf2f2' : '#f8f9fa')};">
                                        ${isNonReducible ? 
                                            // For non-reducible drugs, show same as calculated dose
                                            (drug.hasLoadingDose ? 
                                                `<div style="font-size: 12px; line-height: 1.3;">
                                                    <div style="color: #007bff; font-weight: 600;">Loading</div>
                                                    <div style="color: #007bff; margin-bottom: 8px;">${drug.calculatedDose.split(' → ')[0]} ${drug.doseUnit}</div>
                                                    <div style="color: #28a745; font-weight: 600;">Maintenance</div>
                                                    <div style="color: #28a745;">${drug.calculatedDose.split(' → ')[1]} ${drug.doseUnit}</div>
                                                    <div style="font-size: 10px; color: #7f8c8d; margin-top: 4px; font-style: italic; white-space: normal; word-wrap: break-word;">${(isImmuno || isHormonal) ? 'Withhold if toxicity' : 'Per dose level schedule'}</div>
                                                </div>` 
                                                : `${drug.calculatedDose} ${drug.doseUnit}<div style="font-size: 10px; color: #7f8c8d; margin-top: 2px; font-style: italic; white-space: normal; word-wrap: break-word;">${(isImmuno || isHormonal) ? 'Withhold if toxicity' : 'Per dose level schedule'}</div>`)
                                            :
                                            // For regular drugs, show reduced dose
                                            (drug.hasLoadingDose ? 
                                                (() => {
                                                    const loadingDose = parseFloat(drug.calculatedDose.split(' → ')[0]) * (1 - reduction / 100);
                                                    const maintenanceDose = parseFloat(drug.calculatedDose.split(' → ')[1]) * (1 - reduction / 100);
                                                    return `<div style="font-size: 12px; line-height: 1.3;">
                                                        <div style="font-weight: 600;">Loading</div>
                                                        <div style="margin-bottom: 8px;">${loadingDose.toFixed(1)} ${drug.doseUnit}</div>
                                                        <div style="font-weight: 600;">Maintenance</div>
                                                        <div>${maintenanceDose.toFixed(1)} ${drug.doseUnit}</div>
                                                    </div>`;
                                                })()
                                                : `${reducedDose.toFixed(1)} ${drug.doseUnit}`)
                                        }
                                    </td>
                                    <td style="padding: 12px; border: 1px solid #dee2e6; background-color: #fff3cd; font-weight: 600; color: #856404;">
                                        ${isNonReducible ? 
                                            // For non-reducible drugs, show same as calculated dose rounded
                                            (drug.hasLoadingDose ? 
                                                (() => {
                                                    const calcLoadingDose = parseFloat(drug.calculatedDose.split(' → ')[0]);
                                                    const calcMaintenanceDose = parseFloat(drug.calculatedDose.split(' → ')[1]);
                                                    return `<div style="font-size: 12px; line-height: 1.3;">
                                                        <div style="color: #007bff; font-weight: 600;">Loading</div>
                                                        <div style="color: #007bff; margin-bottom: 8px;">${roundDose(calcLoadingDose, drug.name, results.protocolName)} ${drug.doseUnit}</div>
                                                        <div style="color: #28a745; font-weight: 600;">Maintenance</div>
                                                        <div style="color: #28a745;">${roundDose(calcMaintenanceDose, drug.name, results.protocolName)} ${drug.doseUnit}</div>
                                                        <div style="font-size: 10px; color: #7f8c8d; margin-top: 4px; font-style: italic; white-space: normal; word-wrap: break-word;">${(isImmuno || isHormonal) ? 'Withhold if toxicity' : 'Per dose level schedule'}</div>
                                                    </div>`;
                                                })()
                                                : `${roundDose(parseFloat(drug.calculatedDose), drug.name, results.protocolName)} ${drug.doseUnit}<div style="font-size: 10px; color: #7f8c8d; margin-top: 2px; font-style: italic; white-space: normal; word-wrap: break-word;">${(isImmuno || isHormonal) ? 'Withhold if toxicity' : 'Per dose level schedule'}</div>`)
                                            :
                                            // For regular drugs, show rounded reduced dose
                                            (drug.hasLoadingDose ? 
                                                (() => {
                                                    const loadingDose = parseFloat(drug.calculatedDose.split(' → ')[0]) * (1 - reduction / 100);
                                                    const maintenanceDose = parseFloat(drug.calculatedDose.split(' → ')[1]) * (1 - reduction / 100);
                                                    return `<div style="font-size: 12px; line-height: 1.3;">
                                                        <div style="font-weight: 600;">Loading</div>
                                                        <div style="margin-bottom: 8px;">${roundDose(loadingDose, drug.name, results.protocolName)} ${drug.doseUnit}</div>
                                                        <div style="font-weight: 600;">Maintenance</div>
                                                        <div>${roundDose(maintenanceDose, drug.name, results.protocolName)} ${drug.doseUnit}</div>
                                                    </div>`;
                                                })()
                                                : `${roundDose(reducedDose, drug.name, results.protocolName)} ${drug.doseUnit}`)
                                        }
                                    </td>
                                    <td style="padding: 12px; border: 1px solid #dee2e6; font-size: 13px; color: #6c757d;">
                                        ${(() => {
                                            let schedule = drug.schedule || 'Per protocol';
                                            // Add vincristine capping logic (except for EPOCH/DA-EPOCH regimens)
                                            if (drug.name.toLowerCase().includes('vincristine') && 
                                                !results.protocolName.toLowerCase().includes('epoch')) {
                                                schedule += '<br><span style="color: #e74c3c; font-weight: 600; font-size: 11px;">⚠️ Cap at 2mg</span>';
                                            }
                                            return schedule;
                                        })()}
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div style="margin-top: 15px; padding: 8px 12px; background-color: #e8f5e8; border-left: 3px solid #27ae60; border-radius: 3px; font-size: 14px;">
            <strong>Patient Summary:</strong><br>
            ${patientData.creatinine ? 
                `Weight: ${patientData.weight} kg | Height: ${patientData.height} cm<br>
                BSA: ${results.bsa} m² | CrCl: ${results.crCl} mL/min<br>
                Regimen: ${results.protocolName}${results.selectedAuc ? ` | AUC ${results.selectedAuc}` : ''}` :
                `Weight: ${patientData.weight} kg | Height: ${patientData.height} cm<br>
                BSA: ${results.bsa} m²<br>
                Regimen: ${results.protocolName}`
            }
        </div>
    `;
    
    // Build reduction summary - exclude non-reducible drugs
    const reductionList = document.getElementById('reductionList');
    
    // Helper function to check if drug is non-reducible (Trastuzumab/Pertuzumab/Immunotherapy)
    function isImmunotherapyDrug(drugName) {
        const immunotherapyDrugs = [
            // Monoclonal antibodies and targeted IV agents
            'trastuzumab', 
            'pertuzumab',
            // Checkpoint inhibitors and immunotherapy drugs
            'pembrolizumab',
            'nivolumab',
            'ipilimumab',
            'atezolizumab',
            'relatlimab',
            'cemiplimab',
            'dostarlimab',
            'toripalimab',
            'tislelizumab',
            'avelumab',
            'durvalumab',
            'tremelimumab',
            'spartalizumab',
            'retifanlimab'
        ];
        return immunotherapyDrugs.some(drug => drugName.toLowerCase().includes(drug));
    }

    function isTargetedTherapyDrug(drugName) {
        const targetedTherapyDrugs = [
            // CDK4/6 inhibitors
            'ribociclib',
            'abemaciclib', 
            'palbociclib',
            // PARP inhibitors
            'olaparib',
            'niraparib',
            'rucaparib',
            'talazoparib',
            // Tyrosine kinase inhibitors (TKIs)
            'erlotinib',
            'gefitinib',
            'osimertinib',
            'crizotinib',
            'alectinib',
            'brigatinib',
            'lorlatinib',
            'ceritinib',
            'lapatinib',
            'afatinib',
            'dacomitinib',
            'mobocertinib',
            'amivantamab',
            'sotorasib',
            'adagrasib',
            'imatinib',
            'dasatinib',
            'nilotinib',
            'bosutinib',
            'ponatinib',
            'midostaurin',
            'gilteritinib',
            'sorafenib',
            'sunitinib',
            'pazopanib',
            'axitinib',
            'cabozantinib',
            'lenvatinib',
            'regorafenib',
            'tivozanib',
            'donafenib',
            'apatinib',
            'ramucirumab',
            // mTOR inhibitors
            'everolimus',
            'temsirolimus',
            // Other oral targeted therapies
            'ibrutinib',
            'acalabrutinib',
            'zanubrutinib',
            'idelalisib',
            'venetoclax',
            'ruxolitinib',
            'fedratinib',
            'pacritinib',
            'vismodegib',
            'sonidegib',
            'glasdegib',
            'tucatinib',
            // GIST-specific targeted therapies
            'avapritinib',
            'ripretinib',
            // TRK inhibitors
            'larotrectinib',
            'entrectinib',
            'repotrectinib',
            // BRAF/MEK inhibitors
            'dabrafenib',
            'trametinib',
            'vemurafenib',
            'cobimetinib',
            'encorafenib',
            'binimetinib'
        ];
        return targetedTherapyDrugs.some(drug => drugName.toLowerCase().includes(drug));
    }

    function isHormonalTherapyDrug(drugName) {
        const hormonalTherapyDrugs = [
            // SERMs (Selective Estrogen Receptor Modulators)
            'tamoxifen',
            'toremifene',
            // Aromatase Inhibitors
            'anastrozole',
            'letrozole',
            'exemestane',
            // SERDs (Selective Estrogen Receptor Degraders)
            'fulvestrant',
            'elacestrant',
            'camizestrant',
            // GnRH Agonists
            'goserelin',
            'leuprolide',
            'triptorelin',
            'histrelin',
            // Anti-androgens
            'bicalutamide',
            'flutamide',
            'enzalutamide',
            'apalutamide',
            'darolutamide',
            // Other hormonal agents
            'abiraterone',
            'degarelix'
        ];
        return hormonalTherapyDrugs.some(drug => drugName.toLowerCase().includes(drug));
    }

    function isNonReducibleDrug(drugName) {
        return isImmunotherapyDrug(drugName) || isTargetedTherapyDrug(drugName) || isHormonalTherapyDrug(drugName);
    }
    
    const appliedReductions = Object.entries(currentReductions).filter(([drugName, reduction]) => 
        reduction > 0 && !isNonReducibleDrug(drugName)
    );
    
    if (appliedReductions.length === 0) {
        reductionList.innerHTML = '<div style="color: #27ae60; font-style: italic;">No dose reductions applied</div>';
    } else {
        reductionList.innerHTML = appliedReductions.map(([drugName, reduction]) => 
            `<div style="margin-bottom: 5px;">• <strong>${drugName}:</strong> ${reduction}% reduction</div>`
        ).join('');
    }
    
    // Add caution message after reduction summary (check if not already exists)
    const reductionSummary = document.getElementById('reductionSummary');
    
    // Remove any existing caution message to prevent duplication
    const existingCaution = reductionSummary.querySelector('.caution-message');
    if (existingCaution) {
        existingCaution.remove();
    }
    
    const cautionMessage = document.createElement('div');
    cautionMessage.className = 'caution-message';
    cautionMessage.style.cssText = 'margin-top: 20px; padding: 8px 12px; background-color: #fff3cd; border-left: 3px solid #ffc107; border-radius: 3px; font-size: 12px;';
    cautionMessage.innerHTML = '<strong>⚠️ Important:</strong> Please verify all calculations and check for contraindications before administration. This tool is for reference only.';
    reductionSummary.appendChild(cautionMessage);
    
    showPage(5);
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
    
    // Rebuild cancer-specific search index with subtype
    if (cancerType && this.value) {
        buildCancerSpecificIndex(cancerType, this.value);
        const searchInput = document.getElementById('cancerSpecificSearchInput');
        const cancerName = getCancerDisplayName(cancerType);
        const subtypeName = getSubtypeDisplayName(this.value);
        if (searchInput) {
            searchInput.placeholder = `Type drug name to filter regimens in ${cancerName} - ${subtypeName}...`;
        }
        clearCancerSearchSection();
    }
});

document.getElementById('protocol').addEventListener('change', function() {
    const cancerType = document.getElementById('cancerType').value;
    const subtype = document.getElementById('cancerSubtype').value;
    checkForCarboplatin(this.value, cancerType, subtype);
});

// Validate carboplatin parameters
function validateCarboplatinParameters(formData) {
    // Find the protocol data by searching through the protocol database
    let protocolData = null;
    
    // Search through all cancer types and subtypes to find the protocol
    for (const cancerType in protocolDatabase) {
        if (typeof protocolDatabase[cancerType] === 'object') {
            // Check if this cancer type has subtypes
            for (const key in protocolDatabase[cancerType]) {
                if (key === formData.protocol) {
                    protocolData = protocolDatabase[cancerType][key];
                    break;
                } else if (typeof protocolDatabase[cancerType][key] === 'object' && protocolDatabase[cancerType][key][formData.protocol]) {
                    protocolData = protocolDatabase[cancerType][key][formData.protocol];
                    break;
                }
            }
        }
        if (protocolData) break;
    }
    
    if (!protocolData) return true; // If protocol not found, allow to proceed
    
    const containsCarboplatin = protocolData.drugs.some(drug => 
        drug.name.toLowerCase().includes('carboplatin')
    );
    
    if (!containsCarboplatin) return true; // No carboplatin, no validation needed
    
    // Check required carboplatin parameters
    const requiredFields = [];
    
    if (!formData.age || formData.age === '') {
        requiredFields.push('Age');
    }
    
    if (!formData.creatinine || formData.creatinine === '') {
        requiredFields.push('Creatinine');
    }
    
    if (!formData.auc || formData.auc === '') {
        requiredFields.push('AUC');
    }
    
    if (requiredFields.length > 0) {
        alert(`Please fill in the following required fields for carboplatin calculation:\n\n${requiredFields.join('\n')}`);
        return false;
    }
    
    // Special validation for KEYNOTE-522 regimen (Paclitaxel-Carboplatin-Pembrolizumab)
    if (formData.protocol === 'Paclitaxel-Carboplatin-Pembrolizumab') {
        const aucValue = parseFloat(formData.auc);
        if (aucValue > 1.5) {
            alert('For KEYNOTE-522 protocol (Paclitaxel + Carboplatin + Pembrolizumab), the maximum allowed AUC is 1.5.\n\nPlease enter an AUC value of 1.5 or lower.');
            return false;
        }
    }
    
    // Serum creatinine floor validation to prevent dose overestimation
    const creatinineValue = parseFloat(formData.creatinine);
    if (creatinineValue < 0.7) {
        const userConfirm = confirm('⚠️ CARBOPLATIN DOSING WARNING\n\nSerum creatinine values < 0.7 mg/dL may overestimate GFR and lead to carboplatin overdosing, especially in patients with:\n• Low muscle mass\n• Malnutrition\n• Elderly patients\n\nClinical Recommendation:\nConsider using a minimum creatinine value of 0.7 mg/dL for safer dosing.\n\nClick OK to proceed with the entered value, or Cancel to modify the creatinine value.');
        if (!userConfirm) {
            return false;
        }
    }
    
    return true;
}

// Event listeners moved to DOMContentLoaded

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('OncoCalcRx loaded successfully');
    buildProtocolIndex(); // Build search index
    
    // Page navigation event listeners
    document.getElementById('nextToPage2').addEventListener('click', function() {
        if (validatePage1()) {
            // Track patient info completion
            trackEvent('patient_info_completed', {
                custom_parameter_1: 'page_navigation',
                custom_parameter_2: 'patient_to_regimen'
            });
            updatePatientInfoCard(); // Ensure patient card is updated
            showPage(2);
        } else {
            alert('Please fill in either Height/Weight/Sex OR Direct BSA.');
        }
    });

    document.getElementById('backToPage1').addEventListener('click', function() {
        showPage(1);
    });

    document.getElementById('calculateDoses').addEventListener('click', function() {
        if (selectedSearchProtocol) {
            // Track protocol selection via search
            trackEvent('protocol_selected', {
                custom_parameter_1: 'search_method',
                custom_parameter_2: selectedSearchProtocol.cancer,
                custom_parameter_3: selectedSearchProtocol.name
            });
            
            // Using global search selection - check if using search section carboplatin fields
            const searchCarboplatinParams = document.getElementById('searchCarboplatinParams');
            const useSearchCarboplatin = searchCarboplatinParams.style.display !== 'none';
            
            // Check if BSA was entered directly and carboplatin params are visible
            const directBSA = document.getElementById('directBSA').value;
            const isBSADirectlyEntered = directBSA && parseFloat(directBSA) > 0;
            const searchBSAAdditionalFields = document.getElementById('searchBSAAdditionalFields');
            const useSearchBSAAdditional = searchBSAAdditionalFields && searchBSAAdditionalFields.style.display !== 'none';
            
            formData = {
                height: document.getElementById('height').value,
                weight: (isBSADirectlyEntered && useSearchBSAAdditional && useSearchCarboplatin) ? 
                    document.getElementById('searchWeight').value : 
                    document.getElementById('weight').value,
                directBSA: directBSA,
                age: useSearchCarboplatin ? document.getElementById('searchAge').value : document.getElementById('age').value,
                sex: (isBSADirectlyEntered && useSearchBSAAdditional && useSearchCarboplatin) ?
                    (document.getElementById('searchSexMale').checked ? 'male' : (document.getElementById('searchSexFemale').checked ? 'female' : '')) :
                    (document.getElementById('sexMale').checked ? 'male' : (document.getElementById('sexFemale').checked ? 'female' : '')),
                creatinine: useSearchCarboplatin ? document.getElementById('searchCreatinine').value : document.getElementById('creatinine').value,
                cancerType: selectedSearchProtocol.cancerType,
                cancerSubtype: selectedSearchProtocol.subtype,
                protocol: selectedSearchProtocol.key,
                auc: useSearchCarboplatin ? document.getElementById('searchAuc').value : document.getElementById('auc').value
            };
        } else if (selectedCancerSearchProtocol) {
            // Track protocol selection via cancer-specific search
            trackEvent('protocol_selected', {
                custom_parameter_1: 'cancer_search_method',
                custom_parameter_2: selectedCancerSearchProtocol.cancerType,
                custom_parameter_3: selectedCancerSearchProtocol.name
            });
            
            // Using cancer-specific search selection - check if BSA was entered directly
            const directBSA = document.getElementById('directBSA').value;
            const isBSADirectlyEntered = directBSA && parseFloat(directBSA) > 0;
            const browseBSAAdditionalFields = document.getElementById('browseBSAAdditionalFields');
            const useBrowseBSAAdditional = browseBSAAdditionalFields && browseBSAAdditionalFields.style.display !== 'none';
            
            formData = {
                height: document.getElementById('height').value,
                weight: (isBSADirectlyEntered && useBrowseBSAAdditional) ? 
                    document.getElementById('browseWeight').value : 
                    document.getElementById('weight').value,
                directBSA: directBSA,
                age: document.getElementById('age').value,
                sex: (isBSADirectlyEntered && useBrowseBSAAdditional) ?
                    (document.getElementById('browseSexMale').checked ? 'male' : (document.getElementById('browseSexFemale').checked ? 'female' : '')) :
                    (document.getElementById('sexMale').checked ? 'male' : (document.getElementById('sexFemale').checked ? 'female' : '')),
                creatinine: document.getElementById('creatinine').value,
                cancerType: selectedCancerSearchProtocol.cancerType,
                cancerSubtype: selectedCancerSearchProtocol.subtype,
                protocol: selectedCancerSearchProtocol.key,
                auc: document.getElementById('auc').value
            };
        } else {
            // Track protocol selection via browse method
            const cancerType = document.getElementById('cancerType').value;
            const protocol = document.getElementById('protocol').value;
            trackEvent('protocol_selected', {
                custom_parameter_1: 'browse_method',
                custom_parameter_2: cancerType,
                custom_parameter_3: protocol
            });
            
            // Using browse selection - check if BSA was entered directly
            const directBSA = document.getElementById('directBSA').value;
            const isBSADirectlyEntered = directBSA && parseFloat(directBSA) > 0;
            const browseBSAAdditionalFields = document.getElementById('browseBSAAdditionalFields');
            const useBrowseBSAAdditional = browseBSAAdditionalFields && browseBSAAdditionalFields.style.display !== 'none';
            
            formData = {
                height: document.getElementById('height').value,
                weight: (isBSADirectlyEntered && useBrowseBSAAdditional) ? 
                    document.getElementById('browseWeight').value : 
                    document.getElementById('weight').value,
                directBSA: directBSA,
                age: document.getElementById('age').value,
                sex: (isBSADirectlyEntered && useBrowseBSAAdditional) ?
                    (document.getElementById('browseSexMale').checked ? 'male' : (document.getElementById('browseSexFemale').checked ? 'female' : '')) :
                    (document.getElementById('sexMale').checked ? 'male' : (document.getElementById('sexFemale').checked ? 'female' : '')),
                creatinine: document.getElementById('creatinine').value,
                cancerType: document.getElementById('cancerType').value,
                cancerSubtype: document.getElementById('cancerSubtype').value,
                protocol: document.getElementById('protocol').value,
                auc: document.getElementById('auc').value
            };
        }
        
        // Validate carboplatin parameters if needed
        if (!validateCarboplatinParameters(formData)) {
            return; // Stop execution if validation fails
        }
        
        // Track dose calculation
        trackEvent('dose_calculated', {
            custom_parameter_1: formData.cancerType,
            custom_parameter_2: formData.protocol,
            custom_parameter_3: formData.directBSA ? `BSA_${formData.directBSA}m2` : `${formData.height}cm_${formData.weight}kg`,
            value: 1
        });
        
        const results = calculateDoses(formData);
        displayResults(results, formData);
        showPage(3);
    });

    document.getElementById('backToPage2').addEventListener('click', function() {
        showPage(2);
    });

    document.getElementById('startOver').addEventListener('click', function() {
        // Reset all form fields
        document.getElementById('height').value = '';
        document.getElementById('weight').value = '';
        document.getElementById('directBSA').value = '';
        document.getElementById('age').value = '';
        document.getElementById('sexMale').checked = false;
        document.getElementById('sexFemale').checked = false;
        document.getElementById('creatinine').value = '';
        document.getElementById('cancerType').value = '';
        document.getElementById('cancerSubtype').value = '';
        document.getElementById('protocol').value = '';
        document.getElementById('auc').value = '';
        
        // Reset search
        clearSearchSection();
        clearCancerSearchSection();
        
        // Reset UI state
        document.getElementById('subtypeGroup').style.display = 'none';
        document.getElementById('aucGroup').style.display = 'none';
        document.getElementById('carboplatinParams').style.display = 'none';
        document.getElementById('protocol').disabled = true;
        document.getElementById('cancerSubtype').disabled = true;
        
        // Go back to first page
        showPage(1);
    });
    
    // Add event listeners for patient information card updates (page 1 fields only)
    const patientFields = ['height', 'weight'];
    patientFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', updatePatientInfoCard);
            field.addEventListener('change', updatePatientInfoCard);
        }
    });
    
    // Add event listeners for sex checkboxes
    const sexMale = document.getElementById('sexMale');
    const sexFemale = document.getElementById('sexFemale');
    if (sexMale) {
        sexMale.addEventListener('change', updatePatientInfoCard);
    }
    if (sexFemale) {
        sexFemale.addEventListener('change', updatePatientInfoCard);
    }
    
    // Dose adjustment event handlers
    document.getElementById('adjustDoses').addEventListener('click', function() {
        trackEvent('dose_adjustment_started', {
            custom_parameter_1: 'manual_adjustment',
            custom_parameter_2: 'page_navigation'
        });
        showDoseAdjustmentPage();
    });
    document.getElementById('backToPage3').addEventListener('click', () => showPage(3));
    document.getElementById('finalDoses').addEventListener('click', function() {
        trackEvent('final_prescription_generated', {
            custom_parameter_1: 'calculation_completed',
            custom_parameter_2: 'prescription_ready'
        });
        showFinalPrescription();
    });
    document.getElementById('backToPage4').addEventListener('click', () => showPage(4));
    document.getElementById('newCalculationFromPage5').addEventListener('click', function() {
        // Reset all form fields
        document.getElementById('height').value = '';
        document.getElementById('weight').value = '';
        document.getElementById('directBSA').value = '';
        document.getElementById('age').value = '';
        document.getElementById('sexMale').checked = false;
        document.getElementById('sexFemale').checked = false;
        document.getElementById('creatinine').value = '';
        document.getElementById('cancerType').value = '';
        document.getElementById('cancerSubtype').value = '';
        document.getElementById('protocol').value = '';
        document.getElementById('auc').value = '';
        
        // Reset search
        clearSearchSection();
        clearCancerSearchSection();
        
        // Reset dose adjustment data
        originalResults = null;
        currentReductions = {};
        
        // Reset UI state
        document.getElementById('subtypeGroup').style.display = 'none';
        document.getElementById('aucGroup').style.display = 'none';
        document.getElementById('carboplatinParams').style.display = 'none';
        document.getElementById('protocol').disabled = true;
        document.getElementById('cancerSubtype').disabled = true;
        
        // Go back to first page
        showPage(1);
    });
    
    // Global dose adjustment controls
    document.getElementById('applyGlobalReduction').addEventListener('click', applyGlobalReduction);
    document.getElementById('resetReductions').addEventListener('click', resetAllReductions);
    
    document.getElementById('protocol').addEventListener('change', function() {
        const protocolKey = this.value;
        const cancerType = document.getElementById('cancerType').value;
        const subtype = document.getElementById('cancerSubtype').value;
        
        // Check for carboplatin and show/hide fields accordingly
        checkForCarboplatin(protocolKey, cancerType, subtype);
    });
    
    // Cancer-specific search event listeners
    document.getElementById('cancerSpecificSearchInput').addEventListener('input', function() {
        const query = this.value.trim();
        
        if (query.length >= 2) {
            const suggestions = searchCancerSpecificProtocols(query);
            showCancerSearchDropdown(suggestions);
        } else {
            document.getElementById('cancerSearchDropdown').style.display = 'none';
        }
    });
    
    document.getElementById('cancerSpecificSearchInput').addEventListener('blur', function() {
        // Hide dropdown after a delay to allow clicks
        setTimeout(() => {
            document.getElementById('cancerSearchDropdown').style.display = 'none';
        }, 300);
    });
    
    document.getElementById('cancerSpecificSearchInput').addEventListener('focus', function() {
        const query = this.value.trim();
        if (query.length >= 2) {
            const suggestions = searchCancerSpecificProtocols(query);
            showCancerSearchDropdown(suggestions);
        }
    });
    
    // Global search event listeners
    document.getElementById('protocolSearch').addEventListener('input', function() {
        const query = this.value.trim();
        const clearButton = document.getElementById('clearSearch');
        console.log('Search query:', query); // Debug log
        
        if (query.length >= 2) {
            clearButton.style.display = 'flex';
            
            // Make sure index is built
            if (allProtocols.length === 0) {
                buildProtocolIndex();
            }
            
            const suggestions = searchProtocols(query);
            console.log('Search suggestions:', suggestions); // Debug log
            displaySearchSuggestions(suggestions);
            
            // Clear browse section when searching
            clearBrowseSection();
        } else {
            clearButton.style.display = 'none';
            document.getElementById('searchSuggestions').style.display = 'none';
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
    
    // Note: showPage(1) removed to allow splash screen to display first
});