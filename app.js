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
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' }
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
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
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
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
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
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
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
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' }
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
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
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
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
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
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' },
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
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
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
            // FIRST-LINE THERAPY - Classical Hodgkin Lymphoma
            'ABVD': {
                name: 'Doxorubicin + Bleomycin + Vinblastine + Dacarbazine (ABVD) (First-Line)',
                cycles: 6,
                drugs: [
                    { name: 'Doxorubicin', dose: 25, unit: 'mg/m²', schedule: 'D1, D15, every 28 days' },
                    { name: 'Bleomycin', dose: 10, unit: 'units/m²', schedule: 'D1, D15, every 28 days' },
                    { name: 'Vinblastine', dose: 6, unit: 'mg/m²', schedule: 'D1, D15, every 28 days' },
                    { name: 'Dacarbazine', dose: 375, unit: 'mg/m²', schedule: 'D1, D15, every 28 days' }
                ]
            },
            'Nivolumab-AVD': {
                name: 'Nivolumab (PD-1 inhibitor) + Doxorubicin + Vinblastine + Dacarbazine (N-AVD) (SWOG S1826) (First-Line)',
                cycles: 6,
                drugs: [
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days x 12 doses' },
                    { name: 'Doxorubicin', dose: 25, unit: 'mg/m²', schedule: 'D1, D15, every 28 days' },
                    { name: 'Vinblastine', dose: 6, unit: 'mg/m²', schedule: 'D1, D15, every 28 days' },
                    { name: 'Dacarbazine', dose: 375, unit: 'mg/m²', schedule: 'D1, D15, every 28 days' }
                ]
            },
            'BrECADD': {
                name: 'Brentuximab vedotin + Etoposide + Cyclophosphamide + Doxorubicin + Dacarbazine + Dexamethasone (BrECADD) (First-Line)',
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
                name: 'Brentuximab vedotin + Doxorubicin + Vinblastine + Dacarbazine (BV-AVD) (First-Line)',
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
                name: 'Rituximab + Cyclophosphamide + Doxorubicin + Vincristine + Prednisone (R-CHOP) (NLPHL) (First-Line)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'PO D1-D5, every 21 days' }
                ]
            },
            'BEACOPP': {
                name: 'BEACOPP (First-Line)',
                cycles: 8,
                drugs: [
                    { name: 'Bleomycin', dose: 10, unit: 'units/m²', schedule: 'D8, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                    { name: 'Doxorubicin', dose: 25, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 650, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D8, every 21 days (max 2mg)' },
                    { name: 'Procarbazine', dose: 100, unit: 'mg/m²', schedule: 'D1-D7, every 21 days' },
                    { name: 'Prednisone', dose: 40, unit: 'mg/m²', schedule: 'D1-D14, every 21 days' }
                ]
            },
            'BEACOPP-Escalated': {
                name: 'BEACOPP Escalated (high-dose) (HD15 study) (First-Line)',
                cycles: 8,
                drugs: [
                    { name: 'Bleomycin', dose: 10, unit: 'units/m²', schedule: 'D8, every 21 days' },
                    { name: 'Etoposide', dose: 200, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                    { name: 'Doxorubicin', dose: 35, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 1250, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Mesna', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days (80% of Cyclophosphamide dose)' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D8, every 21 days (max 2mg)' },
                    { name: 'Procarbazine', dose: 100, unit: 'mg/m²', schedule: 'D1-D7, every 21 days' },
                    { name: 'Prednisone', dose: 40, unit: 'mg/m²', schedule: 'D1-D14, every 21 days' }
                ]
            },
            
            // RELAPSED/REFRACTORY THERAPY
            'Brentuximab-Vedotin': {
                name: 'Brentuximab vedotin monotherapy (CD30 ADC) (Relapsed/Refractory)',
                cycles: 8,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'BV-Nivolumab': {
                name: 'Brentuximab vedotin (CD30 ADC) + Nivolumab (PD-1 inhibitor) (Relapsed/Refractory)',
                cycles: 8,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days x 16 doses' }
                ]
            },
            'ICE-Nivolumab': {
                name: 'Ifosfamide + Carboplatin + Etoposide + Nivolumab (ICE-N) (Relapsed/Refractory)',
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
                name: 'Ifosfamide + Carboplatin + Etoposide + Pembrolizumab (ICE-P) (Relapsed/Refractory)',
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
                name: 'Dexamethasone + Cytarabine + Cisplatin (DHAP) (Relapsed/Refractory)',
                cycles: 3,
                drugs: [
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'PO D1-D4, every 21 days' },
                    { name: 'Cytarabine (High-dose Ara-C)', dose: 2000, unit: 'mg/m²', schedule: 'day 2, q12h x 2 doses, every 21 days' },
                    { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'ICE-BV': {
                name: 'Ifosfamide + Carboplatin + Etoposide + Brentuximab vedotin (ICE-BV) (Relapsed/Refractory)',
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
                name: 'Ifosfamide + Gemcitabine + Vinorelbine + Prednisone (IGEV) (Relapsed/Refractory)',
                cycles: 4,
                drugs: [
                    { name: 'Ifosfamide', dose: 2000, unit: 'mg/m²', days: 'D1-D4', schedule: 'days 1-4, every 21 days' },
                    { name: 'Mesna (pre-dose)', dose: 400, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D4, every 21 days' },
                    { name: 'Mesna (4h post)', dose: 800, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D4, every 21 days' },
                    { name: 'Mesna (8h post)', dose: 800, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D4, every 21 days' },
                    { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', schedule: 'D1, D4, every 21 days' },
                    { name: 'Vinorelbine', dose: 20, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'PO D1-D5, every 21 days' }
                ]
            },
            'Bendamustine': {
                name: 'Bendamustine monotherapy (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Bendamustine', dose: 120, unit: 'mg/m²', schedule: 'D1-D2, every 28 days' }
                ]
            },
            'Bendamustine-Carboplatin-Etoposide': {
                name: 'Bendamustine + Carboplatin + Etoposide (BeECAR) (Relapsed/Refractory)',
                cycles: 4,
                drugs: [
                    { name: 'Bendamustine', dose: 90, unit: 'mg/m²', schedule: 'D1-D2, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' }
                ]
            },
            'GEMOX': {
                name: 'Gemcitabine + Oxaliplatin (GEMOX) (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Oxaliplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 14 days' }
                ]
            },
            'Pembrolizumab-Monotherapy': {
                name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (KEYNOTE-204) (Relapsed/Refractory)',
                cycles: 35,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400mg every 6 weeks' }
                ]
            },
            'Nivolumab-Monotherapy': {
                name: 'Nivolumab monotherapy (PD-1 inhibitor) (CheckMate 205) (Relapsed/Refractory)',
                cycles: 35,
                drugs: [
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days or 480mg every 28 days' }
                ]
            },
            'Vorinostat-Pembrolizumab': {
                name: 'Vorinostat (HDAC inhibitor) + Pembrolizumab (PD-1 inhibitor) (Relapsed/Refractory)',
                cycles: 8,
                drugs: [
                    { name: 'Vorinostat', dose: 400, unit: 'mg', schedule: 'PO daily, continuous' },
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            
            // HISTORICAL REGIMENS
            'MOPP': {
                name: 'Mechlorethamine + Vincristine + Procarbazine + Prednisone (MOPP) (Historical)',
                cycles: 6,
                drugs: [
                    { name: 'Mechlorethamine', dose: 6, unit: 'mg/m²', schedule: 'days 1, 8, every 28 days' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'days 1, 8, every 28 days (max 2mg)' },
                    { name: 'Procarbazine', dose: 100, unit: 'mg/m²', schedule: 'days 1-14, every 28 days' },
                    { name: 'Prednisone', dose: 40, unit: 'mg/m²', schedule: 'days 1-14, every 28 days' }
                ]
            },
            'MOPP-ABVD': {
                name: 'MOPP/ABVD alternating (Historical)',
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
                name: 'Stanford V (Historical)',
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
            'GVD': {
                name: 'Gemcitabine + Vinorelbine + Doxorubicin (GVD) (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Vinorelbine', dose: 20, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Doxorubicin (Liposomal)', dose: 15, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Gemcitabine-Single': {
                name: 'Gemcitabine monotherapy (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Brentuximab-Single': {
                name: 'Brentuximab vedotin monotherapy (CD30 ADC) (Relapsed/Refractory)',
                cycles: 8,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'Nivolumab-Single': {
                name: 'Nivolumab monotherapy (PD-1 inhibitor) (Relapsed/Refractory)',
                cycles: 8,
                drugs: [
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 14 days, then 480mg every 28 days' }
                ]
            },
            'Pembrolizumab-Single': {
                name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (Relapsed/Refractory)',
                cycles: 8,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days, then 400mg every 6 weeks' }
                ]
            },
            'Bendamustine-Single': {
                name: 'Bendamustine monotherapy (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Bendamustine', dose: 120, unit: 'mg/m²', days: 'D1-D2', schedule: 'days 1-2, every 28 days' }
                ]
            },
            'Everolimus-Single': {
                name: 'Everolimus (mTOR inhibitor) (Relapsed/Refractory)',
                cycles: 12,
                drugs: [
                    { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'daily, continuous' }
                ]
            },
            'Lenalidomide-Single': {
                name: 'Lenalidomide monotherapy (immunomodulatory drug) (Relapsed/Refractory)',
                cycles: 12,
                drugs: [
                    { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'PO D1-D21, every 28 days' }
                ]
            }
        },
        'b_cell_nhl': {
            // First-line regimens for multiple B-cell lymphomas
            'R-CHOP': {
                name: 'Rituximab + Cyclophosphamide + Doxorubicin + Vincristine + Prednisone (R-CHOP) (First-Line DLBCL/FL/PMBCL/MZL)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'PO D1-D5, every 21 days' }
                ]
            },
            'Pola-R-CHP': {
                name: 'Polatuzumab vedotin + Rituximab + Cyclophosphamide + Doxorubicin + Prednisone (Pola-R-CHP) (First-Line DLBCL)',
                cycles: 6,
                drugs: [
                    { name: 'Polatuzumab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'PO D1-D5, every 21 days' }
                ]
            },
            'R-CVP': {
                name: 'Rituximab + Cyclophosphamide + Vincristine + Prednisone (R-CVP) (First-Line FL/MZL)',
                cycles: 8,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Mesna', dose: 800, unit: 'mg/m²', schedule: 'D1, every 21 days (80% of Cyclophosphamide dose)' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'PO D1-D5, every 21 days' }
                ]
            },
            'R-Bendamustine': {
                name: 'Rituximab + Bendamustine (R-Bendamustine) (First-Line FL/MCL/MZL)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                    { name: 'Bendamustine', dose: 90, unit: 'mg/m²', days: 'D1-D2', schedule: 'D1-D2, every 28 days' }
                ]
            },
            'Obinutuzumab-Bendamustine': {
                name: 'Obinutuzumab + Bendamustine (O-Bendamustine) (First-Line FL)',
                cycles: 6,
                drugs: [
                    { name: 'Obinutuzumab', dose: 1000, unit: 'mg', schedule: 'cycle 1: days 1,8,15; then D1, every 28 days' },
                    { name: 'Bendamustine', dose: 90, unit: 'mg/m²', days: 'D1-D2', schedule: 'D1-D2, every 28 days' }
                ]
            },
            'R-mini-CHOP': {
                name: 'Rituximab + Cyclophosphamide + Doxorubicin + Vincristine + Prednisone - Reduced dose (R-mini-CHOP) (First-Line Elderly DLBCL/FL)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 400, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 25, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine', dose: 1, unit: 'mg', schedule: 'D1, every 21 days (max 1mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'PO D1-D5, every 21 days' }
                ]
            },
            'R-EPOCH': {
                name: 'Rituximab + Etoposide + Prednisone + Vincristine + Cyclophosphamide + Doxorubicin (R-EPOCH) (First-Line DLBCL/PMBCL/High-grade B-cell)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 50, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, every 21 days' },
                    { name: 'Prednisone', dose: 60, unit: 'mg/m²', schedule: 'PO D1-D5, every 21 days' },
                    { name: 'Vincristine', dose: 0.4, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'day 5, every 21 days' },
                    { name: 'Doxorubicin', dose: 10, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, every 21 days' }
                ]
            },
            'DA-R-EPOCH': {
                name: 'Dose-Adjusted Rituximab + Etoposide + Prednisone + Vincristine + Cyclophosphamide + Doxorubicin (DA-R-EPOCH) (First-Line DLBCL/PMBCL/High-grade B-cell)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 50, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, every 21 days (dose-adjusted)' },
                    { name: 'Prednisone', dose: 60, unit: 'mg/m²', schedule: 'PO D1-D5, every 21 days' },
                    { name: 'Vincristine', dose: 0.4, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'day 5, every 21 days (dose-adjusted)' },
                    { name: 'Doxorubicin', dose: 10, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, every 21 days (dose-adjusted)' }
                ]
            },
            'Rituximab-Monotherapy': {
                name: 'Rituximab monotherapy (CD20 monoclonal antibody) (First-Line FL/MZL)',
                cycles: 4,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'weekly x 4 doses, then maintenance q8weeks' }
                ]
            },
            // MCL First-line regimens
            'R-HyperCVAD-MCL': {
                name: 'Rituximab + Hyperfractionated Cyclophosphamide + Vincristine + Doxorubicin + Dexamethasone / Methotrexate + Cytarabine (R-HyperCVAD/MA) (First-Line MCL)',
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
                name: 'Hyperfractionated Cyclophosphamide + Vincristine + Doxorubicin + Dexamethasone / Methotrexate + Cytarabine + Rituximab (HyperCVAD/MA-R) (First-Line Burkitt/High-grade B-cell)',
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
                name: 'Rituximab + Cyclophosphamide + Vincristine + Doxorubicin + Methotrexate / Ifosfamide + Etoposide + Cytarabine (R-CODOX-M/IVAC) (First-Line Burkitt/High-grade B-cell)',
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
                name: 'High-dose Methotrexate + Cytarabine (HD-MTX + Ara-C) (First-Line PCNSL)',
                cycles: 6,
                drugs: [
                    { name: 'Methotrexate (High-dose)', dose: 3500, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 20, unit: 'mg/m²', schedule: 'q6h starting 24h after MTX until level <0.05' },
                    { name: 'Cytarabine (High-dose)', dose: 2000, unit: 'mg/m²', schedule: 'day 2-3, every 14 days' }
                ]
            },
            'R-MPV-PCNSL': {
                name: 'Rituximab + Methotrexate + Procarbazine + Vincristine (R-MPV) (First-Line PCNSL)',
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
                name: 'Methotrexate + Temozolomide + Rituximab (MTR) (First-Line PCNSL)',
                cycles: 8,
                drugs: [
                    { name: 'Methotrexate (High-dose)', dose: 3500, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 20, unit: 'mg/m²', schedule: 'q6h starting 24h after MTX until level <0.05' },
                    { name: 'Temozolomide', dose: 150, unit: 'mg/m²', schedule: 'PO D1-D7, every 14 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 14 days' }
                ]
            },
            // Waldenström Macroglobulinemia
            'DRC-WM': {
                name: 'Dexamethasone + Rituximab + Cyclophosphamide (DRC) (First-Line Waldenström Macroglobulinemia)',
                cycles: 6,
                drugs: [
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'PO D1, D8, D15, D22, every 35 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 35 days' },
                    { name: 'Cyclophosphamide', dose: 100, unit: 'mg/m²', schedule: 'PO D1-D5, every 35 days' }
                ]
            },
            'BDR-WM': {
                name: 'Bortezomib + Dexamethasone + Rituximab (BDR) (First-Line Waldenström Macroglobulinemia)',
                cycles: 6,
                drugs: [
                    { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'SC days 1, 4, 8, 11, every 21 days' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'PO D1, D4, D8, D11, every 21 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'BR-WM': {
                name: 'Bendamustine + Rituximab (BR) (First-Line Waldenström Macroglobulinemia)',
                cycles: 6,
                drugs: [
                    { name: 'Bendamustine', dose: 90, unit: 'mg/m²', days: 'D1-D2', schedule: 'D1-D2, every 28 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'IM D1, every 28 days' }
                ]
            },
            // Relapsed/Refractory regimens (multiple B-cell lymphomas)
            'R-ICE': {
                name: 'Rituximab + Ifosfamide + Carboplatin + Etoposide (R-ICE) (Relapsed/Refractory DLBCL/FL/MCL)',
                cycles: 3,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Ifosfamide', dose: 5000, unit: 'mg/m²', schedule: 'D2, every 21 days' },
                    { name: 'Mesna (pre-dose)', dose: 1000, unit: 'mg/m²', schedule: 'before Ifosfamide, D2, every 21 days' },
                    { name: 'Mesna (4h post)', dose: 2000, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D2, every 21 days' },
                    { name: 'Mesna (8h post)', dose: 2000, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D2, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D2, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'D1-D3, every 21 days' }
                ]
            },
            'R-DHAP': {
                name: 'Rituximab + Dexamethasone + Cytarabine + Cisplatin (R-DHAP) (Relapsed/Refractory DLBCL/FL)',
                cycles: 3,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'PO D1-D4, every 21 days' },
                    { name: 'Cytarabine (High-dose)', dose: 2000, unit: 'mg/m²', schedule: 'day 2, q12h x 2 doses, every 21 days' },
                    { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'R-ESHAP': {
                name: 'Rituximab + Etoposide + Methylprednisolone + Cytarabine + Cisplatin (R-ESHAP) (Relapsed/Refractory DLBCL/FL)',
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
                name: 'Rituximab + Gemcitabine + Dexamethasone + Cisplatin (R-GDP) (Relapsed/Refractory DLBCL/FL)',
                cycles: 3,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', days: 'D1-D4', schedule: 'days 1-4, every 21 days' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'R-GemOx': {
                name: 'Rituximab + Gemcitabine + Oxaliplatin (R-GemOx) (Relapsed/Refractory DLBCL/FL)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Oxaliplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 14 days' }
                ]
            },
            'R-CEPP': {
                name: 'Rituximab + Cyclophosphamide + Etoposide + Procarbazine + Prednisone (R-CEPP) (Relapsed/Refractory B-cell NHL)',
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
                name: 'Rituximab + Cyclophosphamide + Doxorubicin + Vincristine + Prednisone (R-CDOP) (Relapsed/Refractory B-cell NHL)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'PO D1-D5, every 21 days' }
                ]
            },
            'Pola-BR': {
                name: 'Polatuzumab vedotin + Bendamustine + Rituximab (Pola-BR) (Relapsed/Refractory DLBCL)',
                cycles: 6,
                drugs: [
                    { name: 'Polatuzumab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Bendamustine', dose: 90, unit: 'mg/m²', days: 'D1-D2', schedule: 'D1-D2, every 21 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Tafasitamab-Lenalidomide': {
                name: 'Tafasitamab + Lenalidomide (Tafa-Len) (Relapsed/Refractory DLBCL)',
                cycles: 12,
                drugs: [
                    { name: 'Tafasitamab', dose: 12, unit: 'mg/kg', schedule: 'days 1, 8, 15, 22 (cycle 1); days 1, 15 (cycles 2-3); day 1 (cycles 4-12)' },
                    { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'PO D1-D21, every 28 days' }
                ]
            },
            // Follicular Lymphoma specific relapsed/refractory
            'Lenalidomide-Rituximab': {
                name: 'Lenalidomide + Rituximab (Len-R) (Relapsed/Refractory FL)',
                cycles: 12,
                drugs: [
                    { name: 'Lenalidomide', dose: 20, unit: 'mg', schedule: 'PO D1-D21, every 28 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'weekly x 4, then q8weeks x 5 doses' }
                ]
            },
            'Tazemetostat-FL': {
                name: 'Tazemetostat (EZH2 inhibitor) (Relapsed/Refractory EZH2-mutated FL)',
                cycles: 12,
                drugs: [
                    { name: 'Tazemetostat', dose: 800, unit: 'mg', schedule: 'PO twice daily, continuous' }
                ]
            },
            'Copanlisib-FL': {
                name: 'Copanlisib (PI3K inhibitor) (Relapsed/Refractory FL)',
                cycles: 6,
                drugs: [
                    { name: 'Copanlisib', dose: 60, unit: 'mg', schedule: 'D1, D8, D15, every 28 days' }
                ]
            },
            'Duvelisib-FL': {
                name: 'Duvelisib (PI3K inhibitor) (Relapsed/Refractory FL)',
                cycles: 12,
                drugs: [
                    { name: 'Duvelisib', dose: 25, unit: 'mg', schedule: 'PO twice daily, continuous' }
                ]
            },
            'Idelalisib-Rituximab-FL': {
                name: 'Idelalisib + Rituximab (Idela-R) (Relapsed/Refractory FL)',
                cycles: 12,
                drugs: [
                    { name: 'Idelalisib', dose: 150, unit: 'mg', schedule: 'PO twice daily, continuous' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'weekly x 8, then q12weeks' }
                ]
            },
            // MCL relapsed/refractory
            'Ibrutinib-MCL': {
                name: 'Ibrutinib (BTK inhibitor) (Relapsed/Refractory MCL)',
                cycles: 12,
                drugs: [
                    { name: 'Ibrutinib', dose: 560, unit: 'mg', schedule: 'PO once daily, continuous' }
                ]
            },
            'Acalabrutinib-MCL': {
                name: 'Acalabrutinib (BTK inhibitor) (Relapsed/Refractory MCL)',
                cycles: 12,
                drugs: [
                    { name: 'Acalabrutinib', dose: 100, unit: 'mg', schedule: 'PO twice daily, continuous' }
                ]
            },
            'Zanubrutinib-MCL': {
                name: 'Zanubrutinib (BTK inhibitor) (Relapsed/Refractory MCL)',
                cycles: 12,
                drugs: [
                    { name: 'Zanubrutinib', dose: 160, unit: 'mg', schedule: 'PO twice daily, continuous' }
                ]
            },
            'Bortezomib-MCL': {
                name: 'Bortezomib monotherapy (proteasome inhibitor) (Relapsed/Refractory MCL)',
                cycles: 8,
                drugs: [
                    { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'SC days 1, 4, 8, 11, every 21 days' }
                ]
            },
            'Lenalidomide-MCL': {
                name: 'Lenalidomide monotherapy (immunomodulatory drug) (Relapsed/Refractory MCL)',
                cycles: 12,
                drugs: [
                    { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'PO D1-D21, every 28 days' }
                ]
            },
            // WM additional regimens
            'Ibrutinib-WM': {
                name: 'Ibrutinib (BTK inhibitor) (First-Line/Relapsed/Refractory Waldenström Macroglobulinemia)',
                cycles: 12,
                drugs: [
                    { name: 'Ibrutinib', dose: 420, unit: 'mg', schedule: 'PO once daily, continuous' }
                ]
            },
            'Zanubrutinib-WM': {
                name: 'Zanubrutinib (BTK inhibitor) (First-Line/Relapsed/Refractory Waldenström Macroglobulinemia)',
                cycles: 12,
                drugs: [
                    { name: 'Zanubrutinib', dose: 160, unit: 'mg', schedule: 'PO twice daily, continuous' }
                ]
            },
            'Carfilzomib-Rituximab-Dex-WM': {
                name: 'Carfilzomib + Rituximab + Dexamethasone (CaRD) (Relapsed/Refractory Waldenström Macroglobulinemia)',
                cycles: 6,
                drugs: [
                    { name: 'Carfilzomib', dose: 36, unit: 'mg/m²', schedule: 'days 1, 2, 8, 9, 15, 16, every 28 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'PO D1, D8, D15, D22, every 28 days' }
                ]
            },
            'CAR-T-DLBCL': {
                name: 'CAR-T Cell Therapy (CD19-directed) (Relapsed/Refractory DLBCL)',
                cycles: 1,
                drugs: [
                    { name: 'CAR-T Cell Infusion', dose: 'per protocol', unit: 'infusion', schedule: 'single infusion after lymphodepletion' }
                ]
            },
            // Primary CNS Lymphoma - First-line
            // Burkitt Lymphoma - First-line
            'R-CODOX-M-IVAC-Burkitt': {
                name: 'Rituximab + Cyclophosphamide + Vincristine + Doxorubicin + Methotrexate / Ifosfamide + Etoposide + Cytarabine (R-CODOX-M/IVAC) (First-Line Burkitt Lymphoma)',
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
                name: 'Axicabtagene ciloleucel (CD19 CAR-T) (Relapsed/Refractory DLBCL/PMBCL)',
                cycles: 1,
                drugs: [
                    { name: 'Fludarabine', dose: 25, unit: 'mg/m²', days: 'D-5 to D-3', schedule: 'lymphodepletion' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', days: 'D-5 to D-3', schedule: 'lymphodepletion' },
                    { name: 'Axicabtagene ciloleucel', dose: '2 x 10^6', unit: 'CAR+ T cells/kg', schedule: 'single infusion on day 0' }
                ]
            },
            'Tisagenlecleucel': {
                name: 'Tisagenlecleucel (CD19 CAR-T) (Relapsed/Refractory DLBCL/FL)',
                cycles: 1,
                drugs: [
                    { name: 'Fludarabine', dose: 25, unit: 'mg/m²', days: 'D-4 to D-2', schedule: 'lymphodepletion' },
                    { name: 'Cyclophosphamide', dose: 250, unit: 'mg/m²', days: 'D-4 to D-2', schedule: 'lymphodepletion' },
                    { name: 'Tisagenlecleucel', dose: '0.6-6 x 10^8', unit: 'CAR+ T cells', schedule: 'single infusion on day 0' }
                ]
            },
            'Lisocabtagene-maraleucel': {
                name: 'Lisocabtagene maraleucel (CD19 CAR-T) (Relapsed/Refractory DLBCL)',
                cycles: 1,
                drugs: [
                    { name: 'Fludarabine', dose: 30, unit: 'mg/m²', days: 'D-5 to D-3', schedule: 'lymphodepletion' },
                    { name: 'Cyclophosphamide', dose: 300, unit: 'mg/m²', days: 'D-5 to D-3', schedule: 'lymphodepletion' },
                    { name: 'Lisocabtagene maraleucel', dose: '100 x 10^6', unit: 'CAR+ T cells', schedule: 'single infusion on day 0' }
                ]
            },
            // Bispecific antibodies
            'Glofitamab-GemOx': {
                name: 'Glofitamab + Gemcitabine + Oxaliplatin (Glofit-GemOx) (STARGLO) (Relapsed/Refractory DLBCL)',
                cycles: 8,
                drugs: [
                    { name: 'Obinutuzumab', dose: 1000, unit: 'mg', schedule: 'D7 (cycle 1 only) - pretreatment' },
                    { name: 'Glofitamab', dose: 2.5, unit: 'mg', schedule: 'D1, every 21 days (cycles 1-8), then monotherapy D1 every 21 days (cycles 9-12)' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days (cycles 1-8)' },
                    { name: 'Oxaliplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days (cycles 1-8)' }
                ]
            },
            'Epcoritamab': {
                name: 'Epcoritamab monotherapy (CD20xCD3 bispecific antibody) (Relapsed/Refractory DLBCL)',
                cycles: 8,
                drugs: [
                    { name: 'Epcoritamab', dose: 48, unit: 'mg', schedule: 'weekly x 3, then every 14 days x 5, then every 28 days' }
                ]
            },
            'Mosunetuzumab': {
                name: 'Mosunetuzumab monotherapy (CD20xCD3 bispecific antibody) (Relapsed/Refractory FL)',
                cycles: 8,
                drugs: [
                    { name: 'Mosunetuzumab', dose: 60, unit: 'mg', schedule: 'D1, D8, D15 (cycle 1); D1, D15 (cycles 2-3); D1 (cycles 4-8)' }
                ]
            },
            'Loncastuximab-tesirine': {
                name: 'Loncastuximab tesirine (CD19 ADC) (Relapsed/Refractory DLBCL)',
                cycles: 8,
                drugs: [
                    { name: 'Loncastuximab tesirine', dose: 150, unit: 'mcg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'Selinexor-Dexamethasone': {
                name: 'Selinexor + Dexamethasone (Sel-Dex) (Relapsed/Refractory DLBCL)',
                cycles: 8,
                drugs: [
                    { name: 'Selinexor', dose: 60, unit: 'mg', schedule: 'PO twice weekly, every 7 days' },
                    { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'PO twice weekly, every 7 days' }
                ]
            },
            'Rituximab-Maintenance': {
                name: 'Rituximab monotherapy (CD20 monoclonal antibody) (Maintenance therapy post-induction)',
                cycles: 12,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 56 days (every 8 weeks)' }
                ]
            },
            'Ibrutinib-Rituximab-MCL': {
                name: 'Ibrutinib + Rituximab (IBR-R) (First-Line MCL)',
                cycles: 6,
                drugs: [
                    { name: 'Ibrutinib', dose: 560, unit: 'mg', schedule: 'PO once daily, continuous' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'weekly x 4 (cycle 1), then D1 every 56 days (cycles 2-6)' }
                ]
            }
        },
        't_cell_nhl': {
            // Peripheral T-cell Lymphoma - First-line
            'CHOP-PTCL': {
                name: 'Cyclophosphamide + Doxorubicin + Vincristine + Prednisone (CHOP) (First-Line PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'PO D1-D5, every 21 days' }
                ]
            },
            'CHOEP-PTCL': {
                name: 'Cyclophosphamide + Doxorubicin + Vincristine + Etoposide + Prednisone (CHOEP) (First-Line PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'D1-D3, every 21 days' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'PO D1-D5, every 21 days' }
                ]
            },
            'Brentuximab-CHP-CD30': {
                name: 'Brentuximab vedotin + Cyclophosphamide + Doxorubicin + Prednisone (BV-CHP) (First-Line CD30+ PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'PO D1-D5, every 21 days' }
                ]
            },
            // Anaplastic Large Cell Lymphoma - First-line
            'CHOP-ALCL': {
                name: 'Cyclophosphamide + Doxorubicin + Vincristine + Prednisone (CHOP) (First-Line ALCL)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'PO D1-D5, every 21 days' }
                ]
            },
            'Brentuximab-CHP-ALCL': {
                name: 'Brentuximab vedotin + Cyclophosphamide + Doxorubicin + Prednisone (BV-CHP) (First-Line ALK-negative ALCL)',
                cycles: 6,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'PO D1-D5, every 21 days' }
                ]
            },
            // ALK-positive ALCL
            'Crizotinib-ALCL': {
                name: 'Crizotinib (ALK inhibitor) (First-Line/Relapsed/Refractory ALK-positive ALCL)',
                cycles: 12,
                drugs: [
                    { name: 'Crizotinib', dose: 250, unit: 'mg', schedule: 'PO twice daily, continuous' }
                ]
            },
            'Alectinib-ALCL': {
                name: 'Alectinib (ALK inhibitor) (First-Line/Relapsed/Refractory ALK-positive ALCL)',
                cycles: 12,
                drugs: [
                    { name: 'Alectinib', dose: 600, unit: 'mg', schedule: 'PO twice daily, continuous' }
                ]
            },
            // Extranodal NK/T-cell Lymphoma
            'SMILE-ENKTL': {
                name: 'Dexamethasone + Methotrexate + Ifosfamide + L-asparaginase + Etoposide (SMILE) (First-Line Extranodal NK/T-cell Lymphoma)',
                cycles: 3,
                drugs: [
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'PO D2-D4, every 21 days' },
                    { name: 'Methotrexate', dose: 2000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Leucovorin', dose: 15, unit: 'mg/m²', schedule: 'q6h starting 24h after MTX until level <0.05' },
                    { name: 'Ifosfamide', dose: 1500, unit: 'mg/m²', schedule: 'D2-D4, every 21 days' },
                    { name: 'Mesna (pre-dose)', dose: 300, unit: 'mg/m²', schedule: 'before Ifosfamide, D2-D4, every 21 days' },
                    { name: 'Mesna (4h post)', dose: 600, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D2-D4, every 21 days' },
                    { name: 'Mesna (8h post)', dose: 600, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D2-D4, every 21 days' },
                    { name: 'L-asparaginase', dose: 6000, unit: 'units/m²', schedule: 'D8, D10, D12, D14, D16, D18, D20, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D2-D4, every 21 days' }
                ]
            },
            'AspaMetDex-ENKTL': {
                name: 'L-asparaginase + Methotrexate + Dexamethasone (AspaMetDex) (First-Line Extranodal NK/T-cell Lymphoma)',
                cycles: 6,
                drugs: [
                    { name: 'L-asparaginase', dose: 6000, unit: 'units/m²', schedule: 'D1, D3, D5, D7, D9, D11, every 21 days' },
                    { name: 'Methotrexate', dose: 3000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Leucovorin', dose: 15, unit: 'mg/m²', schedule: 'q6h starting 24h after MTX until level <0.05' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'PO D1-D4, every 21 days' }
                ]
            },
            // T-cell Lymphoma - Relapsed/Refractory
            'Brentuximab-PTCL': {
                name: 'Brentuximab vedotin monotherapy (CD30 ADC) (Relapsed/Refractory CD30+ PTCL)',
                cycles: 8,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'Belinostat-PTCL': {
                name: 'Belinostat monotherapy (HDAC inhibitor) (Relapsed/Refractory PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Belinostat', dose: 1000, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'Romidepsin-PTCL': {
                name: 'Romidepsin monotherapy (HDAC inhibitor) (Relapsed/Refractory PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Romidepsin', dose: 14, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
                ]
            },
            'Pralatrexate-PTCL': {
                name: 'Pralatrexate monotherapy (antifolate) (Relapsed/Refractory PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Pralatrexate', dose: 30, unit: 'mg/m²', schedule: 'D1, D8, D15, D22, D29, D36, then 1 week rest, every 49 days' }
                ]
            },
            'Alemtuzumab-PTCL': {
                name: 'Alemtuzumab monotherapy (CD52 monoclonal antibody) (Relapsed/Refractory T-cell Lymphoma)',
                cycles: 6,
                drugs: [
                    { name: 'Alemtuzumab', dose: 30, unit: 'mg', schedule: 'D1, D3, D5, every 7 days' }
                ]
            },
            // Cutaneous T-cell Lymphoma
            'Mogamulizumab-CTCL': {
                name: 'Mogamulizumab monotherapy (CCR4 monoclonal antibody) (Relapsed/Refractory CTCL)',
                cycles: 8,
                drugs: [
                    { name: 'Mogamulizumab', dose: 1, unit: 'mg/kg', schedule: 'weekly for 5 doses, then every 14 days' }
                ]
            },
            'Romidepsin-CTCL': {
                name: 'Romidepsin monotherapy (HDAC inhibitor) (Relapsed/Refractory CTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Romidepsin', dose: 14, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
                ]
            },
            'Vorinostat-CTCL': {
                name: 'Vorinostat (HDAC inhibitor) (Relapsed/Refractory CTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Vorinostat', dose: 400, unit: 'mg', schedule: 'PO once daily, continuous' }
                ]
            },
            // Novel targeted agents for PTCL
            'Valemetostat-PTCL': {
                name: 'Valemetostat (EZH1/EZH2 dual inhibitor) (Relapsed/Refractory PTCL)',
                cycles: 12,
                drugs: [
                    { name: 'Valemetostat', dose: 200, unit: 'mg', schedule: 'PO once daily, continuous' }
                ]
            },
            'Chidamide-PTCL': {
                name: 'Chidamide (HDAC inhibitor) (Relapsed/Refractory PTCL)',
                cycles: 12,
                drugs: [
                    { name: 'Chidamide', dose: 30, unit: 'mg', schedule: 'PO twice weekly' }
                ]
            },
            // Additional ALK inhibitors for ALK+ ALCL
            'Ceritinib-ALCL': {
                name: 'Ceritinib (ALK inhibitor) (Relapsed/Refractory ALK-positive ALCL)',
                cycles: 12,
                drugs: [
                    { name: 'Ceritinib', dose: 750, unit: 'mg', schedule: 'PO once daily, continuous' }
                ]
            },
            'Brigatinib-ALCL': {
                name: 'Brigatinib (ALK inhibitor) (Relapsed/Refractory ALK-positive ALCL)',
                cycles: 12,
                drugs: [
                    { name: 'Brigatinib', dose: 180, unit: 'mg', schedule: 'PO once daily, continuous (after 7-day lead-in at 90 mg)' }
                ]
            }
        }
    },
    melanoma: {
        // NEOADJUVANT THERAPY
        'Pembrolizumab-Neoadjuvant': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (KEYNOTE-716) (Neoadjuvant Stage III/IV)',
            cycles: 3,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days x3 cycles' }
            ]
        },
        'Nivolumab-Ipilimumab-Neoadjuvant': {
            name: 'Nivolumab + Ipilimumab (Nivo-Ipi) (OpACIN-neo) (Neoadjuvant Stage III)',
            cycles: 2,
            drugs: [
                { name: 'Nivolumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 21 days x2 cycles' },
                { name: 'Ipilimumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 21 days x2 cycles' }
            ]
        },
        
        // ADJUVANT THERAPY
        'Pembrolizumab-Adjuvant': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (KEYNOTE-716) (Adjuvant Stage IIB/IIC/III)',
            cycles: 17,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days x17 cycles' }
            ]
        },
        'Nivolumab-Adjuvant': {
            name: 'Nivolumab monotherapy (PD-1 inhibitor) (CheckMate 238) (Adjuvant Stage III/IV)',
            cycles: 26,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days x12 months' }
            ]
        },
        'Dabrafenib-Trametinib-Adjuvant': {
            name: 'Dabrafenib + Trametinib (Dab-Tram) (COMBI-AD) (Adjuvant BRAF V600E/K Stage III)',
            cycles: 26,
            drugs: [
                { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'PO twice daily continuously x12 months' },
                { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'daily continuously x12 months' }
            ]
        },
        'Interferon-alpha-2b-Adjuvant': {
            name: 'Interferon alfa-2b monotherapy (E1684) (Adjuvant High-risk)',
            cycles: 12,
            drugs: [
                { name: 'Interferon alfa-2b', dose: 20, unit: 'MIU/m²', schedule: 'D1-5 weekly x4 weeks, then 10 MIU/m² TIW x48 weeks' }
            ]
        },
        'Peg-Interferon-alpha-2b-Adjuvant': {
            name: 'Peginterferon alfa-2b monotherapy (EORTC 18991) (Adjuvant High-risk)',
            cycles: 12,
            drugs: [
                { name: 'Peginterferon alfa-2b', dose: 6, unit: 'mcg/kg', schedule: 'SC weekly x8 weeks, then 3 mcg/kg weekly' }
            ]
        },
        
        // METASTATIC - First-line Immunotherapy (Most Preferred)
        'Pembrolizumab': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (KEYNOTE-006) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Nivolumab': {
            name: 'Nivolumab monotherapy (PD-1 inhibitor) (CheckMate 066) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days' }
            ]
        },
        'Nivolumab-Ipilimumab': {
            name: 'Nivolumab + Ipilimumab (Nivo-Ipi) (CheckMate 067) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 21 days x4 cycles' },
                { name: 'Ipilimumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 21 days x4 cycles' }
            ]
        },
        'Nivolumab-Relatlimab': {
            name: 'Nivolumab + Relatlimab (Nivo-Relat) (RELATIVITY-047) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 480, unit: 'mg', schedule: 'D1, every 28 days' },
                { name: 'Relatlimab', dose: 160, unit: 'mg', schedule: 'D1, every 28 days' }
            ]
        },
        'Ipilimumab': {
            name: 'Ipilimumab monotherapy (CTLA-4 inhibitor) (MDX010-20) (Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Ipilimumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 21 days x4 cycles' }
            ]
        },
        
        // METASTATIC - BRAF-mutated Combination Therapy
        'Dabrafenib-Trametinib': {
            name: 'Dabrafenib + Trametinib (Dab-Tram) (COMBI-d/v) (BRAF V600E/K) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'PO twice daily continuously' },
                { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'PO once daily, continuous' }
            ]
        },
        'Vemurafenib-Cobimetinib': {
            name: 'Vemurafenib + Cobimetinib (Vem-Cobi) (coBRIM) (BRAF V600E/K) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Vemurafenib', dose: 960, unit: 'mg', schedule: 'PO twice daily continuously' },
                { name: 'Cobimetinib', dose: 60, unit: 'mg', schedule: 'PO once daily D1-D21, every 28 days' }
            ]
        },
        'Encorafenib-Binimetinib': {
            name: 'Encorafenib + Binimetinib (Enco-Bini) (COLUMBUS) (BRAF V600E/K) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Encorafenib', dose: 450, unit: 'mg', schedule: 'PO once daily, continuous' },
                { name: 'Binimetinib', dose: 45, unit: 'mg', schedule: 'PO twice daily continuously' }
            ]
        },
        'Atezolizumab-Vemurafenib-Cobimetinib': {
            name: 'Atezolizumab + Vemurafenib + Cobimetinib (Atezo-Vem-Cobi) (IMspire150) (BRAF V600) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Atezolizumab', dose: 840, unit: 'mg', schedule: 'D1, D15, every 28 days' },
                { name: 'Vemurafenib', dose: 720, unit: 'mg', schedule: 'PO twice daily continuously' },
                { name: 'Cobimetinib', dose: 60, unit: 'mg', schedule: 'PO once daily D1-D21, every 28 days' }
            ]
        },
        
        // METASTATIC - Specialized/Niche Therapies
        'Tebentafusp': {
            name: 'Tebentafusp monotherapy (gp100 HLA-A*02:01-restricted TCR mimic) (IMCnyanza) (Metastatic Uveal Melanoma)',
            cycles: 12,
            drugs: [
                { name: 'Tebentafusp', dose: 68, unit: 'mcg', schedule: 'D1, every 7 days' }
            ]
        },
        'Lifileucel': {
            name: 'Lifileucel (TIL therapy - autologous T cells) (Relapsed/Refractory Metastatic)',
            cycles: 1,
            drugs: [
                { name: 'Cyclophosphamide', dose: 60, unit: 'mg/kg', schedule: 'daily x2 days (lymphodepletion)' },
                { name: 'Mesna', dose: 12, unit: 'mg/kg', schedule: 'every 4 hours x15 doses (uroprotection)' },
                { name: 'Fludarabine', dose: 25, unit: 'mg/m²', schedule: 'daily x5 days (lymphodepletion)' },
                { name: 'Lifileucel', dose: '21.1 x 10^9', unit: 'viable cells', schedule: 'single infusion on day 0' },
                { name: 'Aldesleukin (IL-2)', dose: 600000, unit: 'IU/kg', schedule: 'every 8-12 hours x6 doses (post-infusion support)' }
            ]
        },
        'Dostarlimab': {
            name: 'Dostarlimab monotherapy (PD-1 inhibitor) (Advanced Solid Tumors - MSI-H/dMMR)',
            cycles: 8,
            drugs: [
                { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'D1, every 21 days x4 cycles, then 1000 mg every 42 days' }
            ]
        },
        'Talimogene-laherparepvec': {
            name: 'Talimogene laherparepvec (oncolytic virus) (OPTiM) (Intralesional Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Talimogene laherparepvec', dose: '10^6 PFU/mL initial, then 10^8 PFU/mL', unit: 'PFU/mL', schedule: 'intralesional D1, then every 14 days' }
            ]
        },
        
        // METASTATIC - Other Immunotherapy/Biologic
        'Aldesleukin': {
            name: 'Aldesleukin monotherapy (High-dose IL-2) (Metastatic)',
            cycles: 2,
            drugs: [
                { name: 'Aldesleukin (IL-2)', dose: 600000, unit: 'IU/kg', schedule: 'every 8 hours x14 doses, repeat x2 cycles' }
            ]
        },
        
        // METASTATIC - Chemotherapy Options
        'Dacarbazine': {
            name: 'Dacarbazine monotherapy (alkylating agent) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Dacarbazine', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Temozolomide': {
            name: 'Temozolomide monotherapy (alkylating agent) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 200, unit: 'mg/m²', schedule: 'PO D1-D5, every 28 days' }
            ]
        },
        'Carboplatin-Paclitaxel': {
            name: 'Paclitaxel + Carboplatin (PC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Dacarbazine': {
            name: 'Cisplatin + Dacarbazine (Cis-DTIC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D4, every 21 days' },
                { name: 'Dacarbazine', dose: 800, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Dacarbazine-Carmustine-Cisplatin': {
            name: 'Dacarbazine + Carmustine + Cisplatin (DCC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Dacarbazine', dose: 220, unit: 'mg/m²', schedule: 'D1-D3, every 28 days' },
                { name: 'Carmustine (BCNU)', dose: 150, unit: 'mg/m²', schedule: 'D1, every 6 weeks (cycles 1, 3, 5)' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1-D3, every 28 days' }
            ]
        },
        
        // METASTATIC - Combination Chemotherapy/Bio
        'IFN-Dacarbazine': {
            name: 'Interferon alfa-2b + Dacarbazine (IFN-DTIC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Interferon alfa-2b', dose: 15, unit: 'MIU/m²', schedule: 'SC daily x5 days/week' },
                { name: 'Dacarbazine', dose: 200, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        'Temozolomide-Thalidomide': {
            name: 'Temozolomide + Thalidomide (Temo-Thal) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 150, unit: 'mg/m²', schedule: 'PO D1-D5, every 28 days' },
                { name: 'Thalidomide', dose: 200, unit: 'mg', schedule: 'PO once daily, continuous' }
            ]
        },
        
        // METASTATIC - Monotherapy Targeted (Less Preferred)
        'Dabrafenib': {
            name: 'Dabrafenib (BRAF inhibitor) (BRAF V600E/K) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'PO twice daily continuously' }
            ]
        },
        'Vemurafenib': {
            name: 'Vemurafenib (BRAF inhibitor) (BRIM-3) (BRAF V600E/K) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Vemurafenib', dose: 960, unit: 'mg', schedule: 'PO twice daily continuously' }
            ]
        },
        'Encorafenib': {
            name: 'Encorafenib (BRAF inhibitor) (BRAF V600E/K) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Encorafenib', dose: 450, unit: 'mg', schedule: 'PO once daily, continuous' }
            ]
        },
        'Trametinib': {
            name: 'Trametinib (MEK inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'PO once daily, continuous' }
            ]
        },
        'Cobimetinib': {
            name: 'Cobimetinib (MEK inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Cobimetinib', dose: 60, unit: 'mg', schedule: 'PO once daily D1-D21, every 28 days' }
            ]
        },
        'Binimetinib': {
            name: 'Binimetinib (MEK inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Binimetinib', dose: 45, unit: 'mg', schedule: 'PO twice daily continuously' }
            ]
        }
    },
    ovarian: {
        // Standard Doublets - First-Line
        'Carboplatin-Paclitaxel': {
            name: 'Paclitaxel + Carboplatin (PC) (GOG-158) (Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Weekly': {
            name: 'Paclitaxel + Carboplatin (PC) Weekly (GOG-262) (Metastatic)',
            cycles: 18,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, every 7 days' },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, every 7 days' }
            ]
        },
        'Docetaxel-Carboplatin': {
            name: 'Docetaxel + Carboplatin (SCOTROC) (Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        // Advanced Combination Therapy - First-Line
        'Bevacizumab-Carboplatin-Paclitaxel': {
            name: 'Bevacizumab + Paclitaxel + Carboplatin (GOG-218/ICON7) (VEGF inhibitor) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Durvalumab-Olaparib-Bevacizumab-Carboplatin-Paclitaxel': {
            name: 'Durvalumab + Olaparib + Bevacizumab + Paclitaxel + Carboplatin (DUO-O) (PD-L1 inhibitor + PARP inhibitor) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Durvalumab', dose: 1120, unit: 'mg', schedule: 'D1, every 21 days' },
                { name: 'Olaparib', dose: 300, unit: 'mg', schedule: 'PO twice daily from cycle 1' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        // Specialized Approaches - First-Line
        'IP-Cisplatin-Paclitaxel': {
            name: 'IP Cisplatin + IV Paclitaxel + IP Paclitaxel (intraperitoneal therapy) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel (IV)', dose: 135, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin (IP)', dose: 75, unit: 'mg/m²', schedule: 'D2, every 21 days' },
                { name: 'Paclitaxel (IP)', dose: 60, unit: 'mg/m²', schedule: 'D8, every 21 days' }
            ]
        },
        'Veliparib-Carboplatin-Paclitaxel': {
            name: 'Veliparib + Paclitaxel + Carboplatin (PARP inhibitor) (BRCA+ Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Veliparib', dose: 150, unit: 'mg', schedule: 'PO twice daily until progression' },
                { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        // Alternative Regimens - Elderly/Frail
        'Carboplatin-Cyclophosphamide': {
            name: 'Carboplatin + Cyclophosphamide (elderly/frail patients) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 28 days' },
                { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 28 days' }
            ]
        },
        
        // Platinum-Sensitive Recurrent (Most commonly used → Least commonly used)
        'Carboplatin-Pegylated-Liposomal-Doxorubicin': {
            name: 'Carboplatin + Pegylated Liposomal Doxorubicin (CALYPSO) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 28 days' },
                { name: 'Pegylated Liposomal Doxorubicin', dose: 30, unit: 'mg/m²', schedule: 'D1, every 28 days' }
            ]
        },
        'Carboplatin-Gemcitabine': {
            name: 'Gemcitabine + Carboplatin (AGO-OVAR-2.5) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 4', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Gemcitabine-Cisplatin': {
            name: 'Gemcitabine + Cisplatin (GC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Pemetrexed-Carboplatin': {
            name: 'Pemetrexed + Carboplatin (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        // Platinum-Resistant Recurrent
        'Topotecan-Platinum-Resistant': {
            name: 'Topotecan monotherapy (alkylating agent) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        'Trabectedin': {
            name: 'Trabectedin monotherapy (alkylating agent) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Trabectedin', dose: 1.3, unit: 'mg/m²', schedule: 'D1, every 21 days (24-hour infusion)' }
            ]
        },
        'Mirvetuximab-Soravtansine': {
            name: 'Mirvetuximab Soravtansine (SORAYA/MIRASOL) (FRα-ADC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Mirvetuximab Soravtansine', dose: 6, unit: 'mg/kg', schedule: 'D1, every 21 days (folate receptor α positive)' }
            ]
        },
        'Gemcitabine-Doxorubicin-Liposomal': {
            name: 'Gemcitabine + Doxorubicin liposomal (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Doxorubicin liposomal', dose: 30, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        // Monotherapy - Platinum-Resistant  
        'Paclitaxel-Single': {
            name: 'Paclitaxel monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, every 7 days x 18 weeks' }
            ]
        },
        'Doxorubicin-Liposomal': {
            name: 'Doxorubicin liposomal monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin liposomal', dose: 40, unit: 'mg/m²', schedule: 'D1, every 28 days' }
            ]
        },
        'Gemcitabine-Single': {
            name: 'Gemcitabine monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        'Altretamine': {
            name: 'Altretamine monotherapy (alkylating agent) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Altretamine', dose: 260, unit: 'mg/m²', schedule: 'PO once daily D1-D14, every 28 days' }
            ]
        },
        'Ixabepilone': {
            name: 'Ixabepilone monotherapy (microtubule inhibitor) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Ixabepilone', dose: 40, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Etoposide': {
            name: 'Etoposide monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 50, unit: 'mg/m²', schedule: 'PO once daily D1-D21, every 28 days' }
            ]
        },
        'Vinorelbine': {
            name: 'Vinorelbine monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Vinorelbine', dose: 30, unit: 'mg/m²', schedule: 'D1, every 7 days x 18 weeks' }
            ]
        },
        'Pemetrexed-Single': {
            name: 'Pemetrexed monotherapy (antimetabolite) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Capecitabine': {
            name: 'Capecitabine monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
            ]
        },
        // Maintenance Therapy (After primary chemotherapy)
        'Olaparib-Bevacizumab': {
            name: 'Olaparib + Bevacizumab (PARP inhibitor + VEGF inhibitor) (Maintenance)',
            cycles: 24,
            drugs: [
                { name: 'Olaparib', dose: 300, unit: 'mg', schedule: 'PO twice daily until progression' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days, then olaparib alone' }
            ]
        },
        'Niraparib-Bevacizumab': {
            name: 'Niraparib + Bevacizumab (PARP inhibitor + VEGF inhibitor) (Maintenance)',
            cycles: 24,
            drugs: [
                { name: 'Niraparib', dose: 200, unit: 'mg', schedule: 'PO once daily until progression (individualized dosing)' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days, then niraparib alone' }
            ]
        },
        'Bevacizumab-Maintenance': {
            name: 'Bevacizumab (GOG-218) (VEGF inhibitor) (Maintenance)',
            cycles: 22,
            drugs: [
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Olaparib': {
            name: 'Olaparib (PARP inhibitor) (BRCA+ Maintenance)',
            cycles: 24,
            drugs: [
                { name: 'Olaparib', dose: 300, unit: 'mg', schedule: 'PO twice daily until progression (BRCA1/2 mutation)' }
            ]
        },
        'Rucaparib': {
            name: 'Rucaparib (PARP inhibitor) (BRCA+ or HRD+ Maintenance)',
            cycles: 24,
            drugs: [
                { name: 'Rucaparib', dose: 600, unit: 'mg', schedule: 'PO twice daily until progression (BRCA1/2 or HRD+)' }
            ]
        },
        'Niraparib': {
            name: 'Niraparib (PARP inhibitor) (Maintenance)',
            cycles: 24,
            drugs: [
                { name: 'Niraparib', dose: 200, unit: 'mg', schedule: 'PO once daily until progression (individualized dosing: 200-300mg)' }
            ]
        },
        'Talazoparib': {
            name: 'Talazoparib (PARP inhibitor) (BRCA+ Maintenance)',
            cycles: 24,
            drugs: [
                { name: 'Talazoparib', dose: 1, unit: 'mg', schedule: 'PO once daily until progression (BRCA1/2 mutation)' }
            ]
        },
        // Immunotherapy - MSI-H/dMMR
        'Dostarlimab': {
            name: 'Dostarlimab (PD-1 inhibitor) (dMMR/MSI-H Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'D1, every 21 days x 4 cycles, then 1000mg every 42 days' }
            ]
        },
        'Pembrolizumab-Ovarian': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (MSI-H/dMMR Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days x 4 cycles, then 400mg every 42 days' }
            ]
        },
        'Bevacizumab-Single': {
            name: 'Bevacizumab monotherapy (VEGF inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Specialized Populations/Germ Cell
        'BEP': {
            name: 'Bleomycin + Etoposide + Cisplatin (BEP) (Germ Cell Features) (Metastatic)',
            cycles: 3,
            drugs: [
                { name: 'Bleomycin', dose: 30, unit: 'units', schedule: 'D1, D8, D15, every 21 days' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        
        // Historical/Less Common Regimens
        'Cisplatin-Cyclophosphamide': {
            name: 'Cisplatin + Cyclophosphamide (Historical) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
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
            name: 'Enzalutamide Monotherapy (AFFIRM/PREVAIL) (mCRPC)',
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
            name: 'Olaparib Monotherapy (PROfound) (HRR gene mutations) (mCRPC)',
            cycles: 12,
            drugs: [
                { name: 'Olaparib', dose: 400, unit: 'mg', schedule: 'twice daily, continuous (germline/somatic HRR mutations)' }
            ]
        },
        'Rucaparib': {
            name: 'Rucaparib Monotherapy (TRITON2) (BRCA mutations) (mCRPC)',
            cycles: 12,
            drugs: [
                { name: 'Rucaparib', dose: 600, unit: 'mg', schedule: 'twice daily, continuous (BRCA1/2 mutations)' }
            ]
        },
        'Pembrolizumab-Prostate': {
            name: 'Pembrolizumab Monotherapy (MSI-H/dMMR) (mCRPC)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days (MSI-H/dMMR)' }
            ]
        },
        'Leuprolide': {
            name: 'Leuprolide Monotherapy (ADT)',
            cycles: 12,
            drugs: [
                { name: 'Leuprolide', dose: 22.5, unit: 'mg', schedule: 'IM D1, every 84 days, continuous' }
            ]
        },
        'Leuprolide-Monthly': {
            name: 'Leuprolide Monthly Monotherapy (ADT)',
            cycles: 12,
            drugs: [
                { name: 'Leuprolide', dose: 7.5, unit: 'mg', schedule: 'IM D1, every 28 days, continuous' }
            ]
        },
        'Goserelin': {
            name: 'Goserelin Monotherapy (ADT)',
            cycles: 12,
            drugs: [
                { name: 'Goserelin', dose: 10.8, unit: 'mg', schedule: 'SC D1, every 84 days, continuous' }
            ]
        },
        'Goserelin-Monthly': {
            name: 'Goserelin Monthly Monotherapy (ADT)',
            cycles: 12,
            drugs: [
                { name: 'Goserelin', dose: 3.6, unit: 'mg', schedule: 'SC D1, every 28 days, continuous' }
            ]
        },
        'Degarelix': {
            name: 'Degarelix Monotherapy (GnRH antagonist)',
            cycles: 12,
            drugs: [
                { name: 'Degarelix', dose: 240, maintenanceDose: 80, unit: 'mg', schedule: 'SC loading dose D1, then 80mg every 28 days', hasLoadingDose: true }
            ]
        },
        'Relugolix': {
            name: 'Relugolix Monotherapy (HERO) (Oral GnRH antagonist)',
            cycles: 12,
            drugs: [
                { name: 'Relugolix', dose: 360, maintenanceDose: 120, unit: 'mg', schedule: 'loading dose D1, then 120mg daily, continuous', hasLoadingDose: true }
            ]
        },
        'Bicalutamide': {
            name: 'Bicalutamide Monotherapy (Antiandrogen)',
            cycles: 12,
            drugs: [
                { name: 'Bicalutamide', dose: 50, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Flutamide': {
            name: 'Flutamide Monotherapy (Antiandrogen)',
            cycles: 12,
            drugs: [
                { name: 'Flutamide', dose: 250, unit: 'mg', schedule: 'three times daily, continuous' }
            ]
        },
        'Nilutamide': {
            name: 'Nilutamide Monotherapy (Antiandrogen)',
            cycles: 12,
            drugs: [
                { name: 'Nilutamide', dose: 300, maintenanceDose: 150, unit: 'mg', schedule: 'daily x 30 days, then 150mg daily', hasLoadingDose: true }
            ]
        },
        'Ketoconazole': {
            name: 'Ketoconazole + Hydrocortisone (CYP17 inhibitor)',
            cycles: 6,
            drugs: [
                { name: 'Ketoconazole', dose: 400, unit: 'mg', schedule: 'three times daily, continuous' },
                { name: 'Hydrocortisone', dose: 30, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Aminoglutethimide': {
            name: 'Aminoglutethimide + Hydrocortisone (Adrenal enzyme inhibitor)',
            cycles: 6,
            drugs: [
                { name: 'Aminoglutethimide', dose: 250, unit: 'mg', schedule: 'four times daily, continuous' },
                { name: 'Hydrocortisone', dose: 40, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Sipuleucel-T': {
            name: 'Sipuleucel-T Immunotherapy (IMPACT)',
            cycles: 1,
            drugs: [
                { name: 'Sipuleucel-T', dose: '50×10⁶', unit: 'autologous CD54+ cells', schedule: '3 infusions D1, D15, D29' }
            ]
        },
        'Paclitaxel-Single': {
            name: 'Paclitaxel Monotherapy (mCRPC)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        'Docetaxel-Single': {
            name: 'Docetaxel Monotherapy (mCRPC)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Estramustine': {
            name: 'Estramustine Monotherapy (mCRPC)',
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
            name: 'Cisplatin + Etoposide (EP) (Neuroendocrine prostate cancer)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' }
            ]
        },
        'Triptorelin': {
            name: 'Triptorelin Monotherapy (ADT)',
            cycles: 12,
            drugs: [
                { name: 'Triptorelin', dose: 22.5, unit: 'mg', schedule: 'IM D1, every 84 days, continuous' }
            ]
        },
        'Histrelin': {
            name: 'Histrelin Monotherapy (ADT)',
            cycles: 12,
            drugs: [
                { name: 'Histrelin', dose: 50, unit: 'mg', schedule: 'SC implant, every 12 months' }
            ]
        },
        'Orchiectomy': {
            name: 'Bilateral Orchiectomy (Surgical castration)',
            cycles: 1,
            drugs: [
                { name: 'Surgical castration', dose: 'N/A', unit: 'procedure', schedule: 'One-time surgical procedure' }
            ]
        }
    },
    renal: {
        // ADJUVANT THERAPY
        'Pembrolizumab-Adjuvant': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (KEYNOTE-564) (Adjuvant)',
            cycles: 17,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days x 17 cycles (1 year)' }
            ]
        },
        
        // METASTATIC THERAPY - Most Commonly Used
        'Pembrolizumab-Axitinib': {
            name: 'Pembrolizumab (PD-1 inhibitor) + Axitinib (VEGFR inhibitor) (KEYNOTE-426) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days, then 400mg every 42 days' },
                { name: 'Axitinib', dose: 5, unit: 'mg', schedule: 'PO twice daily, continuously' }
            ]
        },
        'Nivolumab-Ipilimumab': {
            name: 'Nivolumab (PD-1 inhibitor) + Ipilimumab (CTLA-4 inhibitor) (CheckMate-214) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 21 days x 4 cycles, then 240mg every 14 days' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 21 days x 4 cycles only' }
            ]
        },
        'Lenvatinib-Pembrolizumab': {
            name: 'Lenvatinib (Multi-kinase inhibitor) + Pembrolizumab (PD-1 inhibitor) (CLEAR) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Lenvatinib', dose: 20, unit: 'mg', schedule: 'PO daily, continuously' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days, then 400mg every 42 days' }
            ]
        },
        'Nivolumab-Cabozantinib': {
            name: 'Nivolumab (PD-1 inhibitor) + Cabozantinib (Multi-kinase inhibitor) (CheckMate-9ER) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days, then 480mg every 28 days' },
                { name: 'Cabozantinib', dose: 40, unit: 'mg', schedule: 'PO daily, continuously' }
            ]
        },
        'Avelumab-Axitinib': {
            name: 'Avelumab (PD-L1 inhibitor) + Axitinib (VEGFR inhibitor) (JAVELIN Renal 101) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Avelumab', dose: 800, unit: 'mg', schedule: 'D1, every 14 days' },
                { name: 'Axitinib', dose: 5, unit: 'mg', schedule: 'PO twice daily, continuously' }
            ]
        },
        'Sunitinib': {
            name: 'Sunitinib (Multi-kinase inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Sunitinib', dose: 50, unit: 'mg', schedule: 'PO daily D1-28, then 14 days off (6-week cycle)' }
            ]
        },
        'Pazopanib': {
            name: 'Pazopanib (VEGFR inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pazopanib', dose: 800, unit: 'mg', schedule: 'PO daily on empty stomach, continuously' }
            ]
        },
        'Cabozantinib': {
            name: 'Cabozantinib (Multi-kinase inhibitor) (METEOR) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Cabozantinib', dose: 60, unit: 'mg', schedule: 'PO daily, continuously' }
            ]
        },
        'Sunitinib-Continuous': {
            name: 'Sunitinib (Multi-kinase inhibitor) (Continuous dosing) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Sunitinib', dose: 37.5, unit: 'mg', schedule: 'PO daily, continuously' }
            ]
        },
        'Axitinib': {
            name: 'Axitinib (VEGFR inhibitor) (AXIS) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Axitinib', dose: 5, unit: 'mg', schedule: 'PO twice daily, continuously' }
            ]
        },
        'Sorafenib': {
            name: 'Sorafenib (Multi-kinase inhibitor) (TARGET) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'PO twice daily, continuously' }
            ]
        },
        'Nivolumab': {
            name: 'Nivolumab monotherapy (PD-1 inhibitor) (CheckMate-025) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days, then 480mg every 28 days' }
            ]
        },
        'Lenvatinib': {
            name: 'Lenvatinib (Multi-kinase inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Lenvatinib', dose: 24, unit: 'mg', schedule: 'PO daily, continuously' }
            ]
        },
        'Everolimus': {
            name: 'Everolimus (mTOR inhibitor) (RECORD-1) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'PO daily, continuously' }
            ]
        },
        'Regorafenib': {
            name: 'Regorafenib (Multi-kinase inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Regorafenib', dose: 160, unit: 'mg', schedule: 'PO daily D1-21, then 7 days off (28-day cycle)' }
            ]
        },
        'Tivozanib': {
            name: 'Tivozanib (VEGFR inhibitor) (TIVO-1) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Tivozanib', dose: 1340, unit: 'mcg', schedule: 'PO daily D1-21, then 7 days off (28-day cycle)' }
            ]
        },
        
        // COMBINATION REGIMENS - Advanced/Less Commonly Used
        'Cabozantinib-Nivolumab-Ipilimumab': {
            name: 'Cabozantinib (Multi-kinase inhibitor) + Nivolumab (PD-1 inhibitor) + Ipilimumab (CTLA-4 inhibitor) (COSMIC-313) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Cabozantinib', dose: 40, unit: 'mg', schedule: 'PO daily, continuously' },
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 21 days x 4 cycles, then 240mg every 14 days' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 21 days x 4 cycles only' }
            ]
        },
        'Lenvatinib-Everolimus': {
            name: 'Lenvatinib (Multi-kinase inhibitor) + Everolimus (mTOR inhibitor) (Study 205) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Lenvatinib', dose: 18, unit: 'mg', schedule: 'PO daily, continuously' },
                { name: 'Everolimus', dose: 5, unit: 'mg', schedule: 'PO daily, continuously' }
            ]
        },
        'Lenvatinib-Belzutifan': {
            name: 'Lenvatinib (Multi-kinase inhibitor) + Belzutifan (HIF-2alpha inhibitor) (KEYMAKER-U03) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Lenvatinib', dose: 20, unit: 'mg', schedule: 'PO daily, continuously' },
                { name: 'Belzutifan', dose: 120, unit: 'mg', schedule: 'PO daily, continuously' }
            ]
        },
        'Bevacizumab-Everolimus': {
            name: 'Bevacizumab (VEGF inhibitor) + Everolimus (mTOR inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'D1, every 14 days' },
                { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'PO daily, continuously' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days, then 400mg every 42 days' }
            ]
        },
        
        // SPECIALIZED/RARE INDICATIONS
        'Belzutifan': {
            name: 'Belzutifan (HIF-2alpha inhibitor) (von Hippel-Lindau disease) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Belzutifan', dose: 120, unit: 'mg', schedule: 'PO daily, continuously' }
            ]
        },
        'Erlotinib-Bevacizumab': {
            name: 'Erlotinib (EGFR inhibitor) + Bevacizumab (VEGF inhibitor) (Hereditary leiomyomatosis RCC) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Erlotinib', dose: 150, unit: 'mg', schedule: 'PO daily, continuously' },
                { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'D1, every 14 days' }
            ]
        },
        'Temsirolimus': {
            name: 'Temsirolimus (mTOR inhibitor) (ARCC) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Temsirolimus', dose: 25, unit: 'mg', schedule: 'D1, every 7 days' }
            ]
        },
        
        // HISTORICAL REGIMENS
        'Bevacizumab-Interferon': {
            name: 'Bevacizumab (VEGF inhibitor) + Interferon alfa-2a (Historical) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'D1, every 14 days' },
                { name: 'Interferon alfa-2a', dose: 9, unit: 'MIU', schedule: 'SC 3x/week, continuously' }
            ]
        },
        'Interleukin-2': {
            name: 'Interleukin-2 (IL-2) (High-dose) (Historical) (Metastatic)',
            cycles: 2,
            drugs: [
                { name: 'Interleukin-2 (IL-2)', dose: 600000, unit: 'IU/kg', schedule: 'every 8 hours x 14 doses (cycle 1), then every 8 hours x 14 doses (cycle 2)' }
            ]
        },
        'Interferon-alpha': {
            name: 'Interferon alfa-2a (Historical) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Interferon alfa-2a', dose: 9, unit: 'MIU', schedule: 'SC 3x/week, continuously' }
            ]
        }
    },
    stem_cell_transplant: {
        // AUTOLOGOUS CONDITIONING - Multiple Myeloma
        'Melphalan-200': {
            name: 'High-dose Melphalan (MEL-200) (Multiple Myeloma) (Autologous SCT)',
            cycles: 1,
            drugs: [
                { name: 'Melphalan', dose: 200, unit: 'mg/m²', schedule: 'D-1 (30-minute infusion)' }
            ]
        },
        'Melphalan-140': {
            name: 'Melphalan 140 mg/m² (Multiple Myeloma) (Elderly/reduced intensity) (Autologous SCT)',
            cycles: 1,
            drugs: [
                { name: 'Melphalan', dose: 140, unit: 'mg/m²', schedule: 'D-1 (30-minute infusion)' }
            ]
        },
        
        // AUTOLOGOUS CONDITIONING - Lymphoma
        'BEAM': {
            name: 'BEAM (BCNU + Etoposide + Cytarabine + Melphalan) (Lymphoma) (Autologous SCT)',
            cycles: 1,
            drugs: [
                { name: 'Carmustine (BCNU)', dose: 300, unit: 'mg/m²', schedule: 'D-6' },
                { name: 'Etoposide', dose: 200, unit: 'mg/m²', schedule: 'Twice daily D-5 to D-2' },
                { name: 'Cytarabine', dose: 200, unit: 'mg/m²', schedule: 'Twice daily D-5 to D-2' },
                { name: 'Melphalan', dose: 140, unit: 'mg/m²', schedule: 'D-1' }
            ]
        },
        'BeEAM': {
            name: 'BeEAM (Bendamustine + Etoposide + Cytarabine + Melphalan) (Lymphoma) (BCNU alternative) (Autologous SCT)',
            cycles: 1,
            drugs: [
                { name: 'Bendamustine', dose: 200, unit: 'mg/m²', schedule: 'D-7 and D-6' },
                { name: 'Etoposide', dose: 200, unit: 'mg/m²', schedule: 'Twice daily D-5 to D-2' },
                { name: 'Cytarabine', dose: 200, unit: 'mg/m²', schedule: 'Twice daily D-5 to D-2' },
                { name: 'Melphalan', dose: 140, unit: 'mg/m²', schedule: 'D-1' }
            ]
        },
        'CBV': {
            name: 'CBV (Cyclophosphamide + BCNU + Etoposide) (Lymphoma) (Alternative to BEAM) (Autologous SCT)',
            cycles: 1,
            drugs: [
                { name: 'Cyclophosphamide', dose: 1800, unit: 'mg/m²', schedule: 'Daily D-6 to D-3' },
                { name: 'Carmustine (BCNU)', dose: 300, unit: 'mg/m²', schedule: 'D-6' },
                { name: 'Etoposide', dose: 200, unit: 'mg/m²', schedule: 'Twice daily D-6 to D-3' }
            ]
        },

        
        // MYELOABLATIVE CONDITIONING (MAC) - Allogeneic
        'Busulfan-Cyclophosphamide': {
            name: 'Busulfan + Cyclophosphamide (BuCy) (Myeloablative conditioning) (Allogeneic SCT)',
            cycles: 1,
            drugs: [
                { name: 'Busulfan', dose: 3.2, unit: 'mg/kg', schedule: 'Every 6 hours D-7 to D-4 (16 doses total)' },
                { name: 'Cyclophosphamide', dose: 60, unit: 'mg/kg', schedule: 'Daily on D-3 and D-2' }
            ]
        },
        'Busulfan-Fludarabine-MAC': {
            name: 'Busulfan + Fludarabine (BuFlu) (Myeloablative conditioning) (Allogeneic SCT)',
            cycles: 1,
            drugs: [
                { name: 'Busulfan', dose: 3.2, unit: 'mg/kg', schedule: 'Every 6 hours D-5 to D-2 (16 doses total)' },
                { name: 'Fludarabine', dose: 40, unit: 'mg/m²', schedule: 'Daily D-6 to D-3' }
            ]
        },
        'Cyclophosphamide-TBI': {
            name: 'Cyclophosphamide + Total Body Irradiation (Cy/TBI) (Myeloablative conditioning) (Allogeneic SCT)',
            cycles: 1,
            drugs: [
                { name: 'Cyclophosphamide', dose: 60, unit: 'mg/kg', schedule: 'Daily on D-3 and D-2' },
                { name: 'Total Body Irradiation', dose: 1200, unit: 'cGy', schedule: 'Fractionated D-4 to D-1 (200 cGy twice daily)' }
            ]
        },
        
        // REDUCED INTENSITY CONDITIONING (RIC) - Allogeneic
        'Fludarabine-Busulfan-2day': {
            name: 'Fludarabine + Busulfan 2-day (FluBu2) (Reduced intensity conditioning) (Allogeneic SCT)',
            cycles: 1,
            drugs: [
                { name: 'Fludarabine', dose: 40, unit: 'mg/m²', schedule: 'Daily D-5 to D-2' },
                { name: 'Busulfan', dose: 3.2, unit: 'mg/kg', schedule: 'Every 6 hours on D-3 and D-2 (8 doses total)' }
            ]
        },
        'Fludarabine-Melphalan': {
            name: 'Fludarabine + Melphalan (FluMel) (Reduced intensity conditioning) (Allogeneic SCT)',
            cycles: 1,
            drugs: [
                { name: 'Fludarabine', dose: 25, unit: 'mg/m²', schedule: 'Daily D-5 to D-1' },
                { name: 'Melphalan', dose: 140, unit: 'mg/m²', schedule: 'D-1' }
            ]
        },
        'Fludarabine-Cyclophosphamide': {
            name: 'Fludarabine + Cyclophosphamide (FluCy) (Reduced intensity conditioning) (Allogeneic SCT)',
            cycles: 1,
            drugs: [
                { name: 'Fludarabine', dose: 30, unit: 'mg/m²', schedule: 'Daily D-6 to D-2' },
                { name: 'Cyclophosphamide', dose: 300, unit: 'mg/m²', schedule: 'Daily D-6 to D-2' }
            ]
        },


        
        // NON-MYELOABLATIVE CONDITIONING (NMA) - Allogeneic
        'Fludarabine-TBI-200': {
            name: 'Fludarabine + Low-dose TBI (Non-myeloablative conditioning) (Allogeneic SCT)',
            cycles: 1,
            drugs: [
                { name: 'Fludarabine', dose: 30, unit: 'mg/m²', schedule: 'Daily D-4 to D-2' },
                { name: 'Total Body Irradiation', dose: 200, unit: 'cGy', schedule: 'Single fraction on D0' }
            ]
        },

        
        // HAPLOIDENTICAL CONDITIONING
        'Fludarabine-Cyclophosphamide-ATG': {
            name: 'Fludarabine + Cyclophosphamide + ATG (Haploidentical conditioning) (Allogeneic SCT)',
            cycles: 1,
            drugs: [
                { name: 'Fludarabine', dose: 30, unit: 'mg/m²', schedule: 'Daily D-6 to D-2' },
                { name: 'Cyclophosphamide', dose: 14.5, unit: 'mg/kg', schedule: 'D-6 and D-5' },
                { name: 'Antithymocyte Globulin (Thymoglobulin)', dose: 2.5, unit: 'mg/kg', schedule: 'Daily D-3 to D-1' }
            ]
        },
        
        // PEDIATRIC CONDITIONING
        'Busulfan-Cyclophosphamide-Pediatric': {
            name: 'Busulfan + Cyclophosphamide (Pediatric myeloablative conditioning) (Age <16 years) (Allogeneic SCT)',
            cycles: 1,
            drugs: [
                { name: 'Busulfan', dose: 1, unit: 'mg/kg', schedule: 'Every 6 hours x 16 doses (D-9 to D-6)' },
                { name: 'Cyclophosphamide', dose: 50, unit: 'mg/kg', schedule: 'Daily D-5 to D-2' }
            ]
        },

        
        // NEWER/ALTERNATIVE CONDITIONING REGIMENS
        'Treosulfan-Fludarabine': {
            name: 'Treosulfan + Fludarabine (TreoFlu) (Myeloablative conditioning) (Alkylator alternative) (Allogeneic SCT)',
            cycles: 1,
            drugs: [
                { name: 'Treosulfan', dose: 14, unit: 'g/m²', schedule: 'Daily D-6 to D-4' },
                { name: 'Fludarabine', dose: 30, unit: 'mg/m²', schedule: 'Daily D-6 to D-2' }
            ]
        },
        'Thiotepa-Busulfan-Fludarabine': {
            name: 'Thiotepa + Busulfan + Fludarabine (TBF) (Primary immunodeficiency) (Allogeneic SCT)',
            cycles: 1,
            drugs: [
                { name: 'Thiotepa', dose: 8, unit: 'mg/kg', schedule: 'D-7' },
                { name: 'Busulfan', dose: 3.2, unit: 'mg/kg', schedule: 'Every 6 hours D-5 to D-3 (12 doses total)' },
                { name: 'Fludarabine', dose: 40, unit: 'mg/m²', schedule: 'Daily D-6 to D-3' }
            ]
        }
    },
    testicular: {
        // FIRST-LINE THERAPY
        'BEP': {
            name: 'Bleomycin + Etoposide + Cisplatin (BEP) (Good/Intermediate/Poor risk NSGCT) (Adjuvant/Metastatic)',
            cycles: '3-4',
            drugs: [
                { name: 'Bleomycin', dose: 30, unit: 'units', schedule: 'D1, D8, D15, every 21 days' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        'EP': {
            name: 'Etoposide + Cisplatin (EP) (Good risk NSGCT) (Bleomycin contraindicated) (Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        
        'Carboplatin': {
            name: 'Carboplatin (Stage I seminoma) (Adjuvant)',
            cycles: '1-2',
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 7', unit: 'AUC', schedule: 'Single dose or every 21 days x2' }
            ]
        },
        
        'VIP': {
            name: 'Etoposide + Ifosfamide + Cisplatin (VIP) (Intermediate/Poor risk NSGCT) (Bleomycin contraindicated) (Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Etoposide', dose: 75, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                { name: 'Mesna', dose: 1200, unit: 'mg/m²', schedule: '240 mg/m² before Ifosfamide, then 240 mg/m² at 4h and 8h post-Ifosfamide, D1-D5, every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        
        // SALVAGE THERAPY
        'TIP': {
            name: 'Paclitaxel + Ifosfamide + Cisplatin (TIP) (First salvage therapy) (Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Paclitaxel', dose: 250, unit: 'mg/m²', schedule: 'D1 (24-hour infusion), every 21 days' },
                { name: 'Ifosfamide', dose: 1500, unit: 'mg/m²', schedule: 'D2-D5, every 21 days' },
                { name: 'Mesna', dose: 1500, unit: 'mg/m²', schedule: '300 mg/m² before Ifosfamide, then 300 mg/m² at 4h and 8h post-Ifosfamide, D2-D5, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D2-D5, every 21 days' }
            ]
        },
        'VeIP': {
            name: 'Vinblastine + Ifosfamide + Cisplatin (VeIP) (Standard salvage therapy) (Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Vinblastine', dose: 0.11, unit: 'mg/kg', schedule: 'D1-D2, every 21 days' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                { name: 'Mesna', dose: 1200, unit: 'mg/m²', schedule: '240 mg/m² before Ifosfamide, then 240 mg/m² at 4h and 8h post-Ifosfamide, D1-D5, every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        
        'Paclitaxel-Gemcitabine-Oxaliplatin': {
            name: 'Paclitaxel + Gemcitabine + Oxaliplatin (GTP) (Second/third salvage therapy) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Paclitaxel-Gemcitabine': {
            name: 'Paclitaxel + Gemcitabine (GT) (Second/third salvage therapy) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        'Gemcitabine-Oxaliplatin': {
            name: 'Gemcitabine + Oxaliplatin (GO) (Second/third salvage therapy) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        
        // HIGH-DOSE CHEMOTHERAPY
        'Carboplatin-Etoposide-HD': {
            name: 'High-dose Carboplatin + Etoposide (HD-CE) (Refractory/multiply relapsed) (With ASCT) (Metastatic)',
            cycles: 3,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 7', unit: 'AUC', schedule: 'D1-D3, every 21 days' },
                { name: 'Etoposide', dose: 750, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' }
            ]
        },
        'Carboplatin-Etoposide': {
            name: 'Carboplatin + Etoposide (CE) (Cisplatin-ineligible patients) (Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Etoposide', dose: 120, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' }
            ]
        },
        
        // ADDITIONAL SALVAGE REGIMENS
        'Gemcitabine-Paclitaxel-Carboplatin': {
            name: 'Gemcitabine + Paclitaxel + Carboplatin (GTC) (Second/third salvage therapy) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 4', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        
        // IMMUNOTHERAPY (Biomarker-Directed)
        'Pembrolizumab-MSI': {
            name: 'Pembrolizumab (PD-1 inhibitor) (MSI-H/dMMR) (Metastatic)',
            cycles: 35,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'IV on D1, every 21 days or 400 mg every 42 days' }
            ]
        },
        'Pembrolizumab-TMB': {
            name: 'Pembrolizumab (PD-1 inhibitor) (TMB-H ≥10 mut/Mb) (Metastatic)',
            cycles: 35,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'IV on D1, every 21 days or 400 mg every 42 days' }
            ]
        },
        
        // HISTORICAL REGIMENS (Limited Use)
        'PVB': {
            name: 'PVB (Cisplatin + Vinblastine + Bleomycin) (Historical regimen) (Metastatic)',
            cycles: 3,
            drugs: [
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                { name: 'Vinblastine', dose: 0.15, unit: 'mg/kg', schedule: 'D1-D2, every 21 days' },
                { name: 'Bleomycin', dose: 30, unit: 'units', schedule: 'D1, D8, D15, every 21 days' }
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
        // NEOADJUVANT/ADJUVANT REGIMENS
        'Doxorubicin-Ifosfamide': {
            name: 'Doxorubicin + Ifosfamide + Mesna (AIM) (Neoadjuvant/Adjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 25, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Ifosfamide', dose: 2500, unit: 'mg/m²', schedule: 'D1-D4, every 21 days' },
                { name: 'Mesna', dose: 2500, unit: 'mg/m²', schedule: '500 mg/m² before Ifosfamide, then 500 mg/m² at 4h and 8h post-Ifosfamide, D1-D4, every 21 days' }
            ]
        },
        'MAID': {
            name: 'Mesna + Doxorubicin + Ifosfamide + Dacarbazine (MAID) (Neoadjuvant/Adjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Mesna', dose: 2500, unit: 'mg/m²', schedule: 'D1-D4, every 21 days (uroprotection)' },
                { name: 'Doxorubicin', dose: 20, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Ifosfamide', dose: 2500, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Dacarbazine (DTIC)', dose: 300, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' }
            ]
        },
        'Doxorubicin-Adjuvant': {
            name: 'Doxorubicin monotherapy (Adjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        
        // METASTATIC REGIMENS - Most Commonly Used
        'Doxorubicin': {
            name: 'Doxorubicin monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Docetaxel': {
            name: 'Gemcitabine + Docetaxel (GemTax) (Leiomyosarcoma) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 900, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D8, every 21 days' }
            ]
        },
        'Trabectedin': {
            name: 'Trabectedin (Liposarcoma/Leiomyosarcoma) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Trabectedin', dose: 1.5, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Eribulin': {
            name: 'Eribulin (Liposarcoma) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Eribulin', dose: 1.4, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Pazopanib': {
            name: 'Pazopanib (VEGFR inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pazopanib', dose: 800, unit: 'mg', schedule: 'PO daily on empty stomach, continuously' }
            ]
        },
        'Ifosfamide': {
            name: 'Ifosfamide + Mesna monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 3000, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Mesna', dose: 600, unit: 'mg/m²', schedule: '120 mg/m² before Ifosfamide, then 240 mg/m² at 4h and 8h post-Ifosfamide, D1-D3, every 21 days' }
            ]
        },
        'Doxorubicin-Dacarbazine': {
            name: 'Doxorubicin + Dacarbazine (AD) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Dacarbazine (DTIC)', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Docetaxel-Alternative': {
            name: 'Gemcitabine + Docetaxel (Alternative dosing - well tolerated) (Leiomyosarcoma) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 900, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Docetaxel', dose: 35, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Gemcitabine': {
            name: 'Gemcitabine monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        'Dacarbazine-Monotherapy': {
            name: 'Dacarbazine (DTIC) monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Dacarbazine (DTIC)', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Doxorubicin-Liposomal': {
            name: 'Doxorubicin liposomal (Pegylated liposomal doxorubicin) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin liposomal', dose: 50, unit: 'mg/m²', schedule: 'D1, every 28 days' }
            ]
        },
        'Gemcitabine-Vinorelbine': {
            name: 'Gemcitabine + Vinorelbine (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Vinorelbine', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Docetaxel': {
            name: 'Docetaxel monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Vinorelbine': {
            name: 'Vinorelbine monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Vinorelbine', dose: 30, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Trabectedin-Doxorubicin': {
            name: 'Trabectedin + Doxorubicin (Liposarcoma/Leiomyosarcoma) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Trabectedin', dose: 1.1, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Dacarbazine': {
            name: 'Gemcitabine + Dacarbazine (DTIC) (Leiomyosarcoma) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Dacarbazine (DTIC)', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        // ADDITIONAL COMBINATION REGIMENS - Less Commonly Used
        'MAID-Metastatic': {
            name: 'Mesna + Doxorubicin + Ifosfamide + Dacarbazine (MAID) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Mesna', dose: 2500, unit: 'mg/m²', schedule: 'D1-D4, every 21 days (uroprotection)' },
                { name: 'Doxorubicin', dose: 20, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Ifosfamide', dose: 2500, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Dacarbazine (DTIC)', dose: 300, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' }
            ]
        },
        'CYVADIC': {
            name: 'Cyclophosphamide + Vincristine + Doxorubicin + Dacarbazine (CYVADIC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D1, D8, every 21 days (max 2mg)' },
                { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Dacarbazine (DTIC)', dose: 250, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        'IAP': {
            name: 'Ifosfamide + Doxorubicin + Cisplatin (IAP) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 1800, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                { name: 'Mesna (pre-dose)', dose: 360, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D5, every 21 days' },
                { name: 'Mesna (4h post)', dose: 720, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D5, every 21 days' },
                { name: 'Mesna (8h post)', dose: 720, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D5, every 21 days' },
                { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        'IAC': {
            name: 'Ifosfamide + Actinomycin D + Cisplatin (IAC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 1800, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                { name: 'Mesna (pre-dose)', dose: 360, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D5, every 21 days' },
                { name: 'Mesna (4h post)', dose: 720, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D5, every 21 days' },
                { name: 'Mesna (8h post)', dose: 720, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D5, every 21 days' },
                { name: 'Actinomycin D (Dactinomycin)', dose: 0.5, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        'AP': {
            name: 'Doxorubicin + Cisplatin (AP) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Epirubicin': {
            name: 'Epirubicin (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Ifosfamide-Epirubicin': {
            name: 'Ifosfamide + Epirubicin (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 2000, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Epirubicin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Mesna (pre-dose)', dose: 400, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D3, every 21 days' },
                { name: 'Mesna (4h post)', dose: 800, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D3, every 21 days' },
                { name: 'Mesna (8h post)', dose: 800, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D3, every 21 days' }
            ]
        },
        
        // TARGETED THERAPY - Histology-Specific
        'Tazemetostat': {
            name: 'Tazemetostat (EZH2 inhibitor) (Epithelioid sarcoma) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Tazemetostat', dose: 800, unit: 'mg', schedule: 'PO twice daily, continuously' }
            ]
        },
        'Pexidartinib': {
            name: 'Pexidartinib (CSF1R inhibitor) (Tenosynovial Giant Cell Tumor) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pexidartinib', dose: 400, unit: 'mg', schedule: 'PO twice daily, continuously' }
            ]
        },
        
        // IMMUNOTHERAPY
        'Pembrolizumab': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (TMB-H) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Atezolizumab': {
            name: 'Atezolizumab monotherapy (PD-L1 inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Atezolizumab', dose: 840, unit: 'mg', schedule: 'D1, every 14 days, then 1200mg every 21 days' }
            ]
        },
        'Ipilimumab-Nivolumab': {
            name: 'Ipilimumab (CTLA-4 inhibitor) + Nivolumab (PD-1 inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 6 weeks' },
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 14 days' }
            ]
        },
        'Pembrolizumab-Axitinib': {
            name: 'Pembrolizumab (PD-1 inhibitor) + Axitinib (VEGFR inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' },
                { name: 'Axitinib', dose: 5, unit: 'mg', schedule: 'PO twice daily, continuously' }
            ]
        },
        'Bevacizumab': {
            name: 'Bevacizumab (VEGF inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Olaratumab-Doxorubicin': {
            name: 'Olaratumab (PDGFR-alpha inhibitor) + Doxorubicin (Investigational - limited evidence) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Olaratumab', dose: 15, unit: 'mg/kg', schedule: 'D1, D8, every 21 days' },
                { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        
        // PEDIATRIC SARCOMA REGIMENS - Rhabdomyosarcoma
        'VAC': {
            name: 'Vincristine + Actinomycin D (Dactinomycin) + Cyclophosphamide (VAC) (Rhabdomyosarcoma) (Neoadjuvant/Adjuvant)',
            cycles: 12,
            drugs: [
                { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                { name: 'Actinomycin D (Dactinomycin)', dose: 0.015, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                { name: 'Cyclophosphamide', dose: 2200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Mesna (pre-dose)', dose: 440, unit: 'mg/m²', schedule: 'before Cyclophosphamide, D1, every 21 days' },
                { name: 'Mesna (4h post)', dose: 440, unit: 'mg/m²', schedule: '4 hours after Cyclophosphamide, D1, every 21 days' },
                { name: 'Mesna (8h post)', dose: 440, unit: 'mg/m²', schedule: '8 hours after Cyclophosphamide, D1, every 21 days' }
            ]
        },
        'Cyclophosphamide-Topotecan': {
            name: 'Cyclophosphamide + Topotecan (Rhabdomyosarcoma) (Relapsed/Refractory)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 250, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                { name: 'Topotecan', dose: 0.75, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        'Vincristine-Irinotecan-Temozolomide': {
            name: 'Vincristine + Irinotecan + Temozolomide (VIT) (Rhabdomyosarcoma) (Relapsed/Refractory)',
            cycles: 6,
            drugs: [
                { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D1, D8, every 21 days (max 2mg)' },
                { name: 'Irinotecan', dose: 50, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                { name: 'Temozolomide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        
        // MOLECULAR TARGETED THERAPY - By Molecular Target
        'Imatinib-DFSP': {
            name: 'Imatinib (BCR-ABL/KIT inhibitor) (Dermatofibrosarcoma Protuberans) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Imatinib', dose: 400, unit: 'mg', schedule: 'PO daily, continuously' }
            ]
        },
        'Larotrectinib': {
            name: 'Larotrectinib (NTRK fusion inhibitor) (NTRK fusion-positive) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Larotrectinib', dose: 100, unit: 'mg', schedule: 'PO twice daily, continuously' }
            ]
        },
        'Entrectinib': {
            name: 'Entrectinib (NTRK fusion inhibitor) (NTRK fusion-positive) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'PO daily, continuously' }
            ]
        },
        'Repotrectinib': {
            name: 'Repotrectinib (NTRK fusion inhibitor) (NTRK fusion-positive) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Repotrectinib', dose: 160, unit: 'mg', schedule: 'PO daily, continuously' }
            ]
        },
        'Crizotinib': {
            name: 'Crizotinib (ALK inhibitor) (ALK fusion-positive) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Crizotinib', dose: 250, unit: 'mg', schedule: 'PO twice daily, continuously' }
            ]
        },
        'Alectinib': {
            name: 'Alectinib (ALK inhibitor) (ALK fusion-positive) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Alectinib', dose: 600, unit: 'mg', schedule: 'PO twice daily, continuously' }
            ]
        },
        'Brigatinib': {
            name: 'Brigatinib (ALK inhibitor) (ALK fusion-positive) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Brigatinib', dose: 180, unit: 'mg', schedule: 'PO daily, continuously (after 7-day lead-in at 90mg)' }
            ]
        },
        'Sirolimus': {
            name: 'Sirolimus (mTOR inhibitor) (Perivascular epithelioid cell tumor - PEComa) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Sirolimus', dose: 2, unit: 'mg', schedule: 'PO daily, continuously' }
            ]
        },
        'Temsirolimus': {
            name: 'Temsirolimus (mTOR inhibitor) (Perivascular epithelioid cell tumor - PEComa) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Temsirolimus', dose: 25, unit: 'mg', schedule: 'weekly' }
            ]
        },
        'Everolimus': {
            name: 'Everolimus (mTOR inhibitor) (Perivascular epithelioid cell tumor - PEComa) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'PO daily, continuously' }
            ]
        },
        'Nirogacestat': {
            name: 'Nirogacestat (Gamma-secretase inhibitor) (Desmoid tumors) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Nirogacestat', dose: 150, unit: 'mg', schedule: 'PO twice daily, continuously' }
            ]
        },
        
        // RARE SARCOMA SUBTYPES - Histology-Specific Regimens
        'Carboplatin-Paclitaxel-Bevacizumab': {
            name: 'Paclitaxel + Carboplatin + Bevacizumab (VEGF inhibitor) (Angiosarcoma) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Propranolol': {
            name: 'Propranolol (Beta-blocker) (Angiosarcoma) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Propranolol', dose: 40, unit: 'mg', schedule: 'PO twice daily, continuously' }
            ]
        },
        'Sorafenib': {
            name: 'Sorafenib (Multi-kinase inhibitor) (Epithelioid Hemangioendothelioma) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'PO twice daily, continuously' }
            ]
        },
        'Sunitinib-SFT': {
            name: 'Sunitinib (Multi-kinase inhibitor) (Solitary Fibrous Tumor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Sunitinib', dose: 50, unit: 'mg', schedule: 'PO daily for 4 weeks, then 2 weeks off' }
            ]
        },
        'Temozolomide': {
            name: 'Temozolomide monotherapy (Extraskeletal Myxoid Chondrosarcoma) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 150, unit: 'mg/m²', schedule: 'PO D1-D5, every 28 days' }
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
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
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
        // First-Line Chemotherapy for Thymoma (Neoadjuvant/Adjuvant/Metastatic)
        'CAP': {
            name: 'Cyclophosphamide + Doxorubicin + Cisplatin (CAP) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'ADOC': {
            name: 'Doxorubicin + Cisplatin + Vincristine + Cyclophosphamide (ADOC) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 40, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Vincristine', dose: 0.6, unit: 'mg/m²', schedule: 'D3, every 21 days (max 2 mg)' },
                { name: 'Cyclophosphamide', dose: 700, unit: 'mg/m²', schedule: 'D4, every 21 days' }
            ]
        },
        'Cisplatin-Etoposide': {
            name: 'Cisplatin + Etoposide (EP) (Non-anthracycline alternative) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' }
            ]
        },
        'VIP': {
            name: 'Etoposide + Ifosfamide + Cisplatin (VIP) (Alternative regimen) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Etoposide', dose: 75, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                { name: 'Mesna', dose: 1200, unit: 'mg/m²', schedule: '360 mg/m² before Ifosfamide, then 720 mg/m² at 4h and 8h post-Ifosfamide, D1-D5, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel': {
            name: 'Paclitaxel + Carboplatin (PC) (Alternative first-line) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        
        // First-Line for Thymic Carcinoma (RELEVENT trial - NEW 2025)
        'Carboplatin-Paclitaxel-Ramucirumab': {
            name: 'Paclitaxel + Carboplatin + Ramucirumab (VEGFR-2 inhibitor) (RELEVENT trial) (Thymic carcinoma first-line) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Ramucirumab', dose: 10, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Targeted Therapy for Thymic Carcinoma (NEW 2025 NCCN)
        'Lenvatinib': {
            name: 'Lenvatinib (Multi-kinase inhibitor) (REMORA trial) (Thymic carcinoma) (Metastatic)',
            cycles: 35,
            drugs: [
                { name: 'Lenvatinib', dose: 24, unit: 'mg', schedule: 'PO once daily' }
            ]
        },
        'Lenvatinib-Pembrolizumab': {
            name: 'Lenvatinib (Multi-kinase inhibitor) + Pembrolizumab (PD-1 inhibitor) (PECATI trial) (Metastatic)',
            cycles: 35,
            drugs: [
                { name: 'Lenvatinib', dose: 20, unit: 'mg', schedule: 'PO once daily' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400 mg every 42 days' }
            ]
        },
        'Avelumab-Axitinib': {
            name: 'Avelumab (PD-L1 inhibitor) + Axitinib (VEGFR inhibitor) (CAVEATT trial) (Metastatic)',
            cycles: 35,
            drugs: [
                { name: 'Avelumab', dose: 10, unit: 'mg/kg', schedule: 'D1, D15, every 28 days' },
                { name: 'Axitinib', dose: 5, unit: 'mg', schedule: 'PO twice daily' }
            ]
        },
        
        // Immunotherapy
        'Pembrolizumab': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (Metastatic)',
            cycles: 35,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400 mg every 42 days' }
            ]
        },
        
        // Alternative Chemotherapy
        'Gemcitabine-Docetaxel': {
            name: 'Gemcitabine + Docetaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D8, every 21 days' }
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
        
        // Monotherapy
        'Gemcitabine-Single': {
            name: 'Gemcitabine monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Sunitinib': {
            name: 'Sunitinib (Multi-kinase inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Sunitinib', dose: 50, unit: 'mg', schedule: 'PO daily for 4 weeks, then 2 weeks off (6-week cycles)' }
            ]
        },
        
        // Specialized Therapy
        'Octreotide': {
            name: 'Octreotide LAR (Somatostatin analog) (Thymic neuroendocrine tumors) (Metastatic)',
            cycles: 35,
            drugs: [
                { name: 'Octreotide LAR', dose: 30, unit: 'mg', schedule: 'IM monthly' }
            ]
        },
        '5FU-Leucovorin': {
            name: '5-FU + Leucovorin (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: 'D1-D2 (46hr CI) every 14 days' }
            ]
        },
        'Paclitaxel-Single': {
            name: 'Paclitaxel monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Pemetrexed-Single': {
            name: 'Pemetrexed monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Etoposide-Single': {
            name: 'Etoposide monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3 every 21 days' }
            ]
        },
        'Ifosfamide-Single': {
            name: 'Ifosfamide monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Mesna', dose: 1200, unit: 'mg/m²', schedule: '360 mg/m² before Ifosfamide, then 720 mg/m² at 4h and 8h post-Ifosfamide, D1-D5 every 21 days' }
            ]
        }
    },
    thyroid: {
        'differentiated': {
            // First-Line Targeted Therapy for RAI-Refractory DTC
            'Lenvatinib-DTC': {
                name: 'Lenvatinib (SELECT) (multi-kinase inhibitor) (RAI-refractory DTC) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Lenvatinib', dose: 24, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Selpercatinib-RET-DTC': {
                name: 'Selpercatinib (RET inhibitor) (RET gene fusion-positive) (RAI-refractory DTC) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Selpercatinib', dose: 160, unit: 'mg', schedule: 'PO twice daily' }
                ]
            },
            'Pralsetinib-RET-DTC': {
                name: 'Pralsetinib (RET inhibitor) (RET gene fusion-positive) (RAI-refractory DTC) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Pralsetinib', dose: 400, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Larotrectinib-NTRK-DTC': {
                name: 'Larotrectinib (TRK inhibitor) (NTRK gene fusion-positive) (RAI-refractory DTC) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Larotrectinib', dose: 100, unit: 'mg', schedule: 'PO twice daily' }
                ]
            },
            'Entrectinib-NTRK-DTC': {
                name: 'Entrectinib (TRK inhibitor) (NTRK gene fusion-positive) (RAI-refractory DTC) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Repotrectinib-NTRK-DTC': {
                name: 'Repotrectinib (TRK inhibitor) (NTRK gene fusion-positive) (RAI-refractory DTC) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Repotrectinib', dose: 160, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            
            // Second-Line Therapy for RAI-Refractory DTC
            'Cabozantinib-DTC': {
                name: 'Cabozantinib (COSMIC-311) (multi-kinase inhibitor) (post-lenvatinib/sorafenib) (RAI-refractory DTC) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Cabozantinib', dose: 60, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Sorafenib-DTC': {
                name: 'Sorafenib (DECISION) (multi-kinase inhibitor) (RAI-refractory DTC) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'PO twice daily' }
                ]
            },
            
            // Combination Therapy
            'Pembrolizumab-Lenvatinib-DTC': {
                name: 'Pembrolizumab + Lenvatinib (PD-1 inhibitor + multi-kinase inhibitor) (post-lenvatinib progression) (RAI-refractory DTC) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400 mg every 42 days' },
                    { name: 'Lenvatinib', dose: 20, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            
            // BRAF-Mutant DTC
            'Dabrafenib-Trametinib-DTC': {
                name: 'Dabrafenib + Trametinib (BRAF/MEK inhibitors) (BRAF V600E-mutant) (post-multi-kinase inhibitor failure) (RAI-refractory DTC) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'PO twice daily' },
                    { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'PO once daily' }
                ]
            }
        },
        'medullary': {
            // First-Line Targeted Therapy for Advanced MTC
            'Selpercatinib-RET-MTC': {
                name: 'Selpercatinib (RET inhibitor) (RET-mutant) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Selpercatinib', dose: 160, unit: 'mg', schedule: 'PO twice daily' }
                ]
            },
            'Pralsetinib-RET-MTC': {
                name: 'Pralsetinib (RET inhibitor) (RET-mutant) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Pralsetinib', dose: 400, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Vandetanib-MTC': {
                name: 'Vandetanib (multi-kinase inhibitor) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Vandetanib', dose: 300, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Cabozantinib-MTC': {
                name: 'Cabozantinib (multi-kinase inhibitor) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Cabozantinib', dose: 140, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            
            // Alternative Multi-Kinase Inhibitors for MTC
            'Sorafenib-MTC': {
                name: 'Sorafenib (multi-kinase inhibitor) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'PO twice daily' }
                ]
            },
            'Lenvatinib-MTC': {
                name: 'Lenvatinib (multi-kinase inhibitor) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Lenvatinib', dose: 20, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Sunitinib-MTC': {
                name: 'Sunitinib (multi-kinase inhibitor) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Sunitinib', dose: 50, unit: 'mg', schedule: 'PO once daily D1-28, every 42 days (4 weeks on, 2 weeks off)' }
                ]
            },
            
            // Biomarker-Directed Therapy for MTC
            'Larotrectinib-NTRK-MTC': {
                name: 'Larotrectinib (TRK inhibitor) (NTRK gene fusion-positive) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Larotrectinib', dose: 100, unit: 'mg', schedule: 'PO twice daily' }
                ]
            },
            'Entrectinib-NTRK-MTC': {
                name: 'Entrectinib (TRK inhibitor) (NTRK gene fusion-positive) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Pembrolizumab-TMB-MTC': {
                name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (TMB-H ≥10 mut/Mb) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400 mg every 42 days' }
                ]
            }
        },
        'anaplastic': {
            // First-line: Biomarker-Directed Targeted Therapy
            // BRAF V600E-mutant (Metastatic)
            'Dabrafenib-Trametinib-ATC': {
                name: 'Dabrafenib (BRAF inhibitor) + Trametinib (MEK inhibitor) (BRAF V600E-mutant) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'PO twice daily' },
                    { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Vemurafenib-Cobimetinib-ATC': {
                name: 'Vemurafenib (BRAF inhibitor) + Cobimetinib (MEK inhibitor) (BRAF V600E-mutant) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Vemurafenib', dose: 960, unit: 'mg', schedule: 'PO twice daily' },
                    { name: 'Cobimetinib', dose: 60, unit: 'mg', schedule: 'PO daily for 21 days, then 7 days off' }
                ]
            },
            // RET-altered (Metastatic)
            'Selpercatinib-RET-ATC': {
                name: 'Selpercatinib monotherapy (RET inhibitor) (RET-altered) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Selpercatinib', dose: 160, unit: 'mg', schedule: 'PO twice daily' }
                ]
            },
            'Pralsetinib-RET-ATC': {
                name: 'Pralsetinib monotherapy (RET inhibitor) (RET-altered) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Pralsetinib', dose: 400, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            // NTRK fusion-positive (Metastatic)
            'Larotrectinib-NTRK-ATC': {
                name: 'Larotrectinib monotherapy (TRK inhibitor) (NTRK fusion-positive) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Larotrectinib', dose: 100, unit: 'mg', schedule: 'PO twice daily' }
                ]
            },
            'Entrectinib-NTRK-ATC': {
                name: 'Entrectinib monotherapy (TRK inhibitor) (NTRK fusion-positive) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Repotrectinib-NTRK-ATC': {
                name: 'Repotrectinib monotherapy (TRK inhibitor) (NTRK fusion-positive) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Repotrectinib', dose: 160, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            // First-line: Multi-kinase Inhibitors (Metastatic)
            'Lenvatinib-ATC': {
                name: 'Lenvatinib monotherapy (Multi-kinase inhibitor) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Lenvatinib', dose: 24, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            'Sorafenib-ATC': {
                name: 'Sorafenib monotherapy (Multi-kinase inhibitor) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'PO twice daily' }
                ]
            },
            'Cabozantinib-ATC': {
                name: 'Cabozantinib monotherapy (Multi-kinase inhibitor) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Cabozantinib', dose: 140, unit: 'mg', schedule: 'PO once daily' }
                ]
            },
            // First-line: Immunotherapy (Metastatic)
            'Pembrolizumab-ATC': {
                name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400 mg every 42 days' }
                ]
            },
            'Nivolumab-ATC': {
                name: 'Nivolumab monotherapy (PD-1 inhibitor) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days or 480 mg every 28 days' }
                ]
            },
            'Spartalizumab-ATC': {
                name: 'Spartalizumab monotherapy (PD-1 inhibitor) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Spartalizumab', dose: 300, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            // First-line: Chemotherapy (Metastatic)
            'Doxorubicin-Cisplatin-ATC': {
                name: 'Doxorubicin + Cisplatin (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Paclitaxel-Carboplatin-ATC': {
                name: 'Paclitaxel + Carboplatin (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Doxorubicin-ATC': {
                name: 'Doxorubicin monotherapy (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Docetaxel-ATC': {
                name: 'Docetaxel monotherapy (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            }
        }
    },
    pancreatic: {
        // Neoadjuvant Therapy (Most commonly used → Least commonly used)
        'mFOLFIRINOX': {
            name: 'mFOLFIRINOX (Modified FOLFIRINOX) (PRODIGE-24/PRODIGE-4) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Irinotecan', dose: 150, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' }
            ]
        },
        'Gemcitabine-Nabpaclitaxel-Neoadjuvant-Adjuvant': {
            name: 'Gemcitabine + Nab-paclitaxel (LAPACT/CONKO-005) (Neoadjuvant/Adjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Nab-paclitaxel', dose: 125, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        
        // Adjuvant Therapy (Most commonly used → Least commonly used)
        'Gemcitabine-Capecitabine': {
            name: 'Gemcitabine + Capecitabine (ESPAC-4) (Adjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Capecitabine', dose: 830, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
            ]
        },
        'Gemcitabine-Adjuvant': {
            name: 'Gemcitabine monotherapy (CONKO-001) (Adjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        
        // Definitive (Concurrent chemoRT)
        'Capecitabine-RT': {
            name: 'Capecitabine + Radiation Therapy (Definitive)',
            cycles: 1,
            drugs: [
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'PO twice daily on days of RT' },
                { name: 'Radiation Therapy', dose: 50.4, unit: 'Gy', schedule: '28 fractions over 5.5 weeks' }
            ]
        },
        'Gemcitabine-RT': {
            name: 'Gemcitabine + Radiation Therapy (Definitive)',
            cycles: 1,
            drugs: [
                { name: 'Gemcitabine', dose: 600, unit: 'mg/m²', schedule: 'D1, D8 during RT' },
                { name: 'Radiation Therapy', dose: 50.4, unit: 'Gy', schedule: '28 fractions over 5.5 weeks' }
            ]
        },
        '5FU-RT': {
            name: '5-Fluorouracil + Radiation Therapy (Definitive)',
            cycles: 1,
            drugs: [
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'CI daily D1-D4 and D29-D32 of RT' },
                { name: 'Radiation Therapy', dose: 50.4, unit: 'Gy', schedule: '28 fractions over 5.5 weeks' }
            ]
        },
        
        // Metastatic - First-Line (Most commonly used → Least commonly used)
        'NALIRIFOX': {
            name: 'NALIRIFOX (NAPOLI-3) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Nanoliposomal irinotecan', dose: 50, unit: 'mg/m²', schedule: 'D1, D15, every 28 days' },
                { name: 'Oxaliplatin', dose: 60, unit: 'mg/m²', schedule: 'D1, D15, every 28 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, D15, every 28 days' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1, D15, every 28 days' }
            ]
        },
        'Gemcitabine-Nabpaclitaxel': {
            name: 'Gemcitabine + Nab-paclitaxel (MPACT) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Nab-paclitaxel', dose: 125, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        // Alternative Doublets - First-Line Metastatic
        'GEMOX': {
            name: 'Gemcitabine + Oxaliplatin (GEMOX) (cisplatin-ineligible) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Oxaliplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'mFOLFOX6': {
            name: 'mFOLFOX6 (Modified FOLFOX6) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' }
            ]
        },
        'mFOLFIRI': {
            name: 'mFOLFIRI (Modified FOLFIRI) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' }
            ]
        },
        '5FU-LV': {
            name: '5-Fluorouracil + Leucovorin (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' }
            ]
        },
        
        // BRCA+ Targeted Therapy - First-Line Metastatic
        'NABPLAGEM-PLATINUM-First-line': {
            name: 'Nab-paclitaxel + Gemcitabine + Cisplatin (BRCA+) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Nab-paclitaxel', dose: 125, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Gemcitabine-Erlotinib': {
            name: 'Gemcitabine + Erlotinib (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Erlotinib', dose: 100, unit: 'mg', schedule: 'PO once daily, continuous' }
            ]
        },
        'Capecitabine-Erlotinib': {
            name: 'Capecitabine + Erlotinib (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                { name: 'Erlotinib', dose: 100, unit: 'mg', schedule: 'PO once daily, continuous' }
            ]
        },
        'Liposomal-Irinotecan-5FU-LV-NAPOLI': {
            name: 'Liposomal Irinotecan + 5-FU + LV (NAPOLI-1) (Second-line Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Liposomal Irinotecan', dose: 70, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' }
            ]
        },
        'Olaparib-Maintenance': {
            name: 'Olaparib (Maintenance) (POLO) (BRCA1/2+) (Metastatic)',
            cycles: 24,
            drugs: [
                { name: 'Olaparib', dose: 300, unit: 'mg', schedule: 'PO twice daily, continuous' }
            ]
        },
        'Pembrolizumab-Monotherapy-MSI': {
            name: 'Pembrolizumab monotherapy (MSI-H/dMMR) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Gemcitabine-Cisplatin-POLO': {
            name: 'Gemcitabine + Cisplatin (GP) (POLO) (BRCA1/2/PALB2+) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'NABPLAGEM-PLATINUM-Second-line': {
            name: 'Nab-paclitaxel + Gemcitabine + Cisplatin (PLATINUM) (BRCA+) (Second-line Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Nab-paclitaxel', dose: 125, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Sotorasib-KRAS': {
            name: 'Sotorasib (KRAS G12C+) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Sotorasib', dose: 960, unit: 'mg', schedule: 'PO once daily, continuous' }
            ]
        },
        'Adagrasib-KRAS': {
            name: 'Adagrasib (KRAS G12C+) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Adagrasib', dose: 600, unit: 'mg', schedule: 'PO twice daily, continuous' }
            ]
        },
        'mFOLFOX6': {
            name: 'mFOLFOX6 (Modified FOLFOX6) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' }
            ]
        },
        'mFOLFIRI': {
            name: 'mFOLFIRI (Modified FOLFIRI) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' }
            ]
        },
        'Gemcitabine-Monotherapy-Metastatic': {
            name: 'Gemcitabine monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        'Fixed-Dose-Rate-Gemcitabine': {
            name: 'Fixed Dose Rate Gemcitabine monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine (FDR)', dose: 10, unit: 'mg/m²/min', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        'Capecitabine-Monotherapy-Metastatic': {
            name: 'Capecitabine monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' }
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
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                { name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: 'D1-D2 (46hr CI), every 14 days' }
            ]
        },
        'FOLCIS': {
            name: 'FOLCIS (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
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
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
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
        // First-Line - Transplant-Eligible Patients
        'VRd': {
            name: 'Bortezomib + Lenalidomide + Dexamethasone (VRd) (SWOG S0777) (transplant-eligible) (First-Line)',
            cycles: 4,
            drugs: [
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'SC D1, D8, D15, every 21 days' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'PO D1-D14, every 21 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1, D8, D15, every 21 days' }
            ]
        },
        'VTD': {
            name: 'Bortezomib + Thalidomide + Dexamethasone (VTD) (GIMEMA) (transplant-eligible) (First-Line)',
            cycles: 4,
            drugs: [
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'SC D1, D8, D15, D22, every 28 days' },
                { name: 'Thalidomide', dose: 100, unit: 'mg', schedule: 'PO once daily' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1, D8, D15, D22, every 28 days' }
            ]
        },
        'CyBorD': {
            name: 'Cyclophosphamide + Bortezomib + Dexamethasone (CyBorD) (transplant-eligible) (First-Line)',
            cycles: 4,
            drugs: [
                { name: 'Cyclophosphamide', dose: 300, unit: 'mg/m²', schedule: 'D1, D8, D15, D22, every 28 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'SC D1, D8, D15, D22, every 28 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1, D8, D15, D22, every 28 days' }
            ]
        },
        'Dara-VTD': {
            name: 'Daratumumab + Bortezomib + Thalidomide + Dexamethasone (Dara-VTD) (CASSIOPEIA) (CD38 mAb) (transplant-eligible) (First-Line)',
            cycles: 4,
            drugs: [
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 14 days x 8 weeks, then every 28 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'SC D1, D8, D15, D22, every 28 days' },
                { name: 'Thalidomide', dose: 100, unit: 'mg', schedule: 'PO once daily' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1, D8, D15, D22, every 28 days' }
            ]
        },
        'Dara-VRd': {
            name: 'Daratumumab + Bortezomib + Lenalidomide + Dexamethasone (Dara-VRd) (GRIFFIN) (CD38 mAb) (transplant-eligible) (First-Line)',
            cycles: 4,
            drugs: [
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 14 days x 8 weeks, then every 28 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'SC D1, D8, D15, every 21 days' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'PO D1-D14, every 21 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1, D8, D15, every 21 days' }
            ]
        },
        'Isa-VRd': {
            name: 'Isatuximab + Bortezomib + Lenalidomide + Dexamethasone (Isa-VRd) (GMMG-HD7) (CD38 mAb) (transplant-eligible) (First-Line)',
            cycles: 4,
            drugs: [
                { name: 'Isatuximab', dose: 10, unit: 'mg/kg', schedule: 'weekly x 4 weeks, then every 14 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'SC D1, D8, D15, every 21 days' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'PO D1-D14, every 21 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1, D8, D15, every 21 days' }
            ]
        },
        
        // First-Line - Transplant-Ineligible Patients
        'VRd-Lite': {
            name: 'Bortezomib + Lenalidomide + Dexamethasone (VRd-Lite) (SWOG S0777) (transplant-ineligible) (First-Line)',
            cycles: 9,
            drugs: [
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'SC D1, D8, D15, every 28 days x 9 cycles' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'PO D1-D21, every 28 days x 9 cycles' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1, D8, D15, every 28 days x 9 cycles' }
            ]
        },
        'Dara-Rd': {
            name: 'Daratumumab + Lenalidomide + Dexamethasone (Dara-Rd) (MAIA) (CD38 mAb) (transplant-ineligible) (First-Line)',
            cycles: 12,
            drugs: [
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 14 days x 16 weeks, then every 28 days' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'PO D1-D21, every 28 days until progression' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1, D8, D15, D22, every 28 days until progression' }
            ]
        },
        'Dara-VMP': {
            name: 'Daratumumab + Bortezomib + Melphalan + Prednisone (Dara-VMP) (ALCYONE) (CD38 mAb) (transplant-ineligible) (First-Line)',
            cycles: 9,
            drugs: [
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 6 weeks, then every 21 days x 16 weeks, then every 28 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'SC D1, D8, D15, D22, every 6 weeks' },
                { name: 'Melphalan', dose: 9, unit: 'mg/m²', schedule: 'D1-D4, every 6 weeks x 9 cycles' },
                { name: 'Prednisone', dose: 60, unit: 'mg/m²', schedule: 'D1-D4, every 6 weeks x 9 cycles' }
            ]
        },
        'Dara-CyBorD': {
            name: 'Daratumumab + Cyclophosphamide + Bortezomib + Dexamethasone (Dara-CyBorD) (CD38 mAb) (transplant-ineligible) (First-Line)',
            cycles: 9,
            drugs: [
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 14 days x 16 weeks, then every 28 days' },
                { name: 'Cyclophosphamide', dose: 300, unit: 'mg/m²', schedule: 'D1, D8, D15, D22, every 28 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'SC D1, D8, D15, D22, every 28 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1, D8, D15, D22, every 28 days' }
            ]
        },
        'MPT': {
            name: 'Melphalan + Prednisone + Thalidomide (MPT) (transplant-ineligible) (First-Line)',
            cycles: 12,
            drugs: [
                { name: 'Melphalan', dose: 0.25, unit: 'mg/kg', schedule: 'D1-D4 every 6 weeks' },
                { name: 'Prednisone', dose: 2, unit: 'mg/kg', schedule: 'D1-D4 every 6 weeks' },
                { name: 'Thalidomide', dose: 100, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        },
        'Rd': {
            name: 'Lenalidomide + Dexamethasone (Rd) (transplant-ineligible) (First-Line)',
            cycles: 12,
            drugs: [
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'D1-D21 every 28 days until progression' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1,D8,D15,D22 every 28 days until progression' }
            ]
        },
        
        // Relapsed/Refractory - Second-Line and Beyond
        'KRd': {
            name: 'Carfilzomib + Lenalidomide + Dexamethasone (KRd) (ASPIRE) (proteasome inhibitor) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Carfilzomib', dose: 56, unit: 'mg/m²', schedule: 'D1-D2, D8-D9, D15-D16, every 28 days' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'PO D1-D21, every 28 days' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1-D2, D8-D9, D15-D16, D22-D23, every 28 days' }
            ]
        },
        'Kd': {
            name: 'Carfilzomib + Dexamethasone (Kd) (ENDEAVOR) (proteasome inhibitor) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Carfilzomib', dose: 56, unit: 'mg/m²', schedule: 'D1-D2, D8-D9, D15-D16, every 28 days' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1-D2, D8-D9, D15-D16, D22-D23, every 28 days' }
            ]
        },
        'PVd': {
            name: 'Pomalidomide + Bortezomib + Dexamethasone (PVd) (IMiD/proteasome inhibitor) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Pomalidomide', dose: 4, unit: 'mg', schedule: 'D1-D14 every 21 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'SC D1,D4,D8,D11 every 21 days' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1,D2,D4,D5,D8,D9,D11,D12 every 21 days' }
            ]
        },
        'Pd': {
            name: 'Pomalidomide + Dexamethasone (Pd) (IMiD) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Pomalidomide', dose: 4, unit: 'mg', schedule: 'D1-D21 every 28 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1,D8,D15,D22 every 28 days' }
            ]
        },
        'Dara-Pd': {
            name: 'Daratumumab + Pomalidomide + Dexamethasone (Dara-Pd) (CD38 mAb) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 14 days x 16 weeks, then every 28 days' },
                { name: 'Pomalidomide', dose: 4, unit: 'mg', schedule: 'D1-D21 every 28 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1,D8,D15,D22 every 28 days' }
            ]
        },
        'Isa-Pd': {
            name: 'Isatuximab + Pomalidomide + Dexamethasone (Isa-Pd) (CD38 mAb) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Isatuximab', dose: 10, unit: 'mg/kg', schedule: 'weekly x 4 weeks, then every 14 days' },
                { name: 'Pomalidomide', dose: 4, unit: 'mg', schedule: 'D1-D21 every 28 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1,D8,D15,D22 every 28 days' }
            ]
        },
        'Dara-Vd': {
            name: 'Daratumumab + Bortezomib + Dexamethasone (Dara-Vd) (CD38 mAb) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 14 days x 16 weeks, then every 28 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'SC D1,D4,D8,D11 every 21 days' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1,D2,D4,D5,D8,D9,D11,D12 every 21 days' }
            ]
        },
        'Elo-Rd': {
            name: 'Elotuzumab + Lenalidomide + Dexamethasone (Elo-Rd) (SLAMF7 mAb) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Elotuzumab', dose: 10, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 14 days' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'D1-D21 every 28 days' },
                { name: 'Dexamethasone', dose: 28, unit: 'mg', schedule: 'D1,D8,D15,D22 every 28 days' }
            ]
        },
        'Panobinostat-Vd': {
            name: 'Panobinostat + Bortezomib + Dexamethasone (Panobinostat-Vd) (HDAC inhibitor) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Panobinostat', dose: 20, unit: 'mg', schedule: 'D1,D3,D5,D8,D10,D12 every 21 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'SC D1,D4,D8,D11 every 21 days' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1,D2,D4,D5,D8,D9,D11,D12 every 21 days' }
            ]
        },
        'IRd': {
            name: 'Ixazomib + Lenalidomide + Dexamethasone (IRd) (proteasome inhibitor) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Ixazomib', dose: 4, unit: 'mg', schedule: 'D1,D8,D15 every 28 days' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'D1-D21 every 28 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1,D8,D15,D22 every 28 days' }
            ]
        },
        'Selinexor-d': {
            name: 'Selinexor + Dexamethasone (Selinexor-d) (XPO1 inhibitor) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Selinexor', dose: 80, unit: 'mg', schedule: 'twice weekly' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'twice weekly' }
            ]
        },
        'Melflufen-d': {
            name: 'Melphalan Flufenamide + Dexamethasone (Melflufen-d) (alkylating agent) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Melphalan Flufenamide', dose: 40, unit: 'mg', schedule: 'D1 every 28 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1,D8,D15,D22 every 28 days' }
            ]
        },
        
        // High-Dose/Intensive Regimens
        'VTD-PACE': {
            name: 'Bortezomib + Thalidomide + Dexamethasone + Cisplatin + Doxorubicin + Cyclophosphamide + Etoposide (VTD-PACE) (High-dose)',
            cycles: 2,
            drugs: [
                { name: 'Bortezomib', dose: 1, unit: 'mg/m²', schedule: 'SC D1,D4,D8,D11 every 21 days' },
                { name: 'Thalidomide', dose: 400, unit: 'mg', schedule: 'PO once daily' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1-D4 every 21 days' },
                { name: 'Cisplatin', dose: 10, unit: 'mg/m²', schedule: 'D1-D4 every 21 days' },
                { name: 'Doxorubicin', dose: 10, unit: 'mg/m²', schedule: 'D1-D4 every 21 days' },
                { name: 'Cyclophosphamide', dose: 400, unit: 'mg/m²', schedule: 'D1-D4 every 21 days' },
                { name: 'Mesna', dose: 320, unit: 'mg/m²', schedule: 'D1-D4 every 21 days (80% of Cyclophosphamide dose)' },
                { name: 'Etoposide', dose: 40, unit: 'mg/m²', schedule: 'D1-D4 every 21 days' }
            ]
        },
        'VAD': {
            name: 'Vincristine + Adriamycin + Dexamethasone (VAD) (Historical)',
            cycles: 4,
            drugs: [
                { name: 'Vincristine', dose: 0.4, unit: 'mg', schedule: 'D1-D4 continuous infusion every 28 days' },
                { name: 'Doxorubicin (Adriamycin)', dose: 9, unit: 'mg/m²', schedule: 'D1-D4 continuous infusion every 28 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1-D4,D9-D12,D17-D20 every 28 days' }
            ]
        },
        'DVD': {
            name: 'Doxorubicin Liposomal + Vincristine + Dexamethasone (DVD) (Relapsed/Refractory)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin Liposomal', dose: 40, unit: 'mg/m²', schedule: 'D1 every 28 days' },
                { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'D1 every 28 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1-D4 every 28 days' }
            ]
        },
        
        // Monotherapy Agents
        'Bortezomib': {
            name: 'Bortezomib monotherapy (proteasome inhibitor) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1,D4,D8,D11 every 21 days' }
            ]
        },
        'Carfilzomib': {
            name: 'Carfilzomib monotherapy (proteasome inhibitor) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Carfilzomib', dose: 56, unit: 'mg/m²', schedule: 'D1-D2, D8-D9, D15-D16, every 28 days' }
            ]
        },
        'Lenalidomide': {
            name: 'Lenalidomide monotherapy (IMiD) (Maintenance)',
            cycles: 12,
            drugs: [
                { name: 'Lenalidomide', dose: 10, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        },
        'Thalidomide': {
            name: 'Thalidomide monotherapy (IMiD) (Maintenance)',
            cycles: 12,
            drugs: [
                { name: 'Thalidomide', dose: 200, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        },
        'Dexamethasone': {
            name: 'Dexamethasone monotherapy (corticosteroid) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1-D4,D9-D12,D17-D20 every 28 days' }
            ]
        },
        'Daratumumab': {
            name: 'Daratumumab monotherapy (CD38 mAb) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 14 days x 16 weeks, then every 28 days' }
            ]
        },
        'Daratumumab-Hyaluronidase': {
            name: 'Daratumumab + Hyaluronidase (subcutaneous) (CD38 mAb) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Daratumumab', dose: 1800, unit: 'mg', schedule: 'weekly x 8 weeks, then every 14 days x 16 weeks, then every 28 days (subcutaneous)' },
                { name: 'Hyaluronidase', dose: 30000, unit: 'units', schedule: 'with daratumumab' }
            ]
        },
        'Belantamab-Mafodotin': {
            name: 'Belantamab Mafodotin monotherapy (BCMA-ADC) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Belantamab Mafodotin', dose: 2.5, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Belantamab-Pd': {
            name: 'Belantamab Mafodotin + Pomalidomide + Dexamethasone (DREAMM-8) (BCMA-ADC) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Belantamab Mafodotin', dose: 2.5, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                { name: 'Pomalidomide', dose: 4, unit: 'mg', schedule: 'D1-D21 every 28 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1,D8,D15,D22 every 28 days' }
            ]
        },
        'Belantamab-Vd': {
            name: 'Belantamab Mafodotin + Bortezomib + Dexamethasone (DREAMM-7) (BCMA-ADC) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Belantamab Mafodotin', dose: 2.5, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'SC D1,D4,D8,D11 every 21 days' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1,D2,D4,D5,D8,D9,D11,D12 every 21 days' }
            ]
        },
        'Teclistamab': {
            name: 'Teclistamab (BCMA BiTE) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Teclistamab', dose: 1.5, unit: 'mg/kg', schedule: 'weekly after step-up dosing' }
            ]
        },
        'Talquetamab': {
            name: 'Talquetamab monotherapy (GPRC5D BiTE) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Talquetamab', dose: 405, unit: 'mcg/kg', schedule: 'weekly after step-up dosing' }
            ]
        },
        'Teclistamab-Talquetamab': {
            name: 'Teclistamab + Talquetamab (BCMA/GPRC5D BiTE combination) (ASCO 2024) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Teclistamab', dose: 1.5, unit: 'mg/kg', schedule: 'weekly after step-up dosing' },
                { name: 'Talquetamab', dose: 405, unit: 'mcg/kg', schedule: 'weekly after step-up dosing' }
            ]
        },
        'Idecabtagene-Vicleucel': {
            name: 'Idecabtagene Vicleucel (IDE-CEL CAR-T) (Relapsed/Refractory)',
            cycles: 1,
            drugs: [
                { name: 'Idecabtagene Vicleucel', dose: 450, unit: 'million cells', schedule: 'single infusion after lymphodepletion' }
            ]
        },
        'Ciltacabtagene-Vicleucel': {
            name: 'Ciltacabtagene Vicleucel (CILTA-CEL CAR-T) (Relapsed/Refractory)',
            cycles: 1,
            drugs: [
                { name: 'Ciltacabtagene Vicleucel', dose: 0.75, unit: 'million cells/kg', schedule: 'single infusion after lymphodepletion' }
            ]
        },
        'Ibrutinib': {
            name: 'Ibrutinib (BTK inhibitor) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Ibrutinib', dose: 560, unit: 'mg', schedule: 'PO once daily' }
            ]
        },
        // Additional NCCN regimens
        'Melphalan': {
            name: 'Melphalan monotherapy (Palliative)',
            cycles: 8,
            drugs: [
                { name: 'Melphalan', dose: 0.25, unit: 'mg/kg', schedule: 'D1-D4 every 6 weeks' }
            ]
        },
        'MP': {
            name: 'Melphalan + Prednisone (MP) (transplant-ineligible) (First-Line)',
            cycles: 12,
            drugs: [
                { name: 'Melphalan', dose: 0.25, unit: 'mg/kg', schedule: 'D1-D4 every 6 weeks' },
                { name: 'Prednisone', dose: 2, unit: 'mg/kg', schedule: 'D1-D4 every 6 weeks' }
            ]
        },
        'Td': {
            name: 'Thalidomide + Dexamethasone (Td) (transplant-ineligible) (First-Line)',
            cycles: 8,
            drugs: [
                { name: 'Thalidomide', dose: 200, unit: 'mg', schedule: 'PO once daily' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1-D4 every 28 days' }
            ]
        },
        'Vd': {
            name: 'Bortezomib + Dexamethasone (Vd) (proteasome inhibitor) (Relapsed/Refractory)',
            cycles: 8,
            drugs: [
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'SC D1,D4,D8,D11 every 21 days' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1,D2,D4,D5,D8,D9,D11,D12 every 21 days' }
            ]
        }
    },
    penile: {
        // NEOADJUVANT/ADJUVANT THERAPY
        'TIP-Neoadjuvant': {
            name: 'Paclitaxel + Ifosfamide + Cisplatin (TIP) (Neoadjuvant/Adjuvant)',
            cycles: 4,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Mesna (pre-dose)', dose: 240, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D3, every 21 days' },
                { name: 'Mesna (4h post)', dose: 480, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D3, every 21 days' },
                { name: 'Mesna (8h post)', dose: 480, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D3, every 21 days' }
            ]
        },
        'Capecitabine-RT': {
            name: 'Capecitabine + Radiation Therapy (Neoadjuvant/Adjuvant)',
            cycles: 2,
            drugs: [
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'PO twice daily during RT' }
            ]
        },
        '5FU-Mitomycin': {
            name: '5-Fluorouracil + Mitomycin-C (Neoadjuvant/Adjuvant)',
            cycles: 2,
            drugs: [
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'CI D1-D4, every 21 days' },
                { name: 'Mitomycin-C', dose: 15, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        
        // DEFINITIVE THERAPY (Concurrent Chemoradiotherapy)
        'Cisplatin-RT': {
            name: 'Cisplatin + Radiation Therapy (Definitive)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'weekly during RT' },
                { name: 'Radiation Therapy', dose: 54, unit: 'Gy', schedule: '54-57 Gy nodal, 63 Gy primary' }
            ]
        },
        'TIP-RT-InPACT': {
            name: 'Paclitaxel + Ifosfamide + Cisplatin + Radiation Therapy (TIP-RT) (InPACT) (Definitive)',
            cycles: 4,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days (4 cycles)' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', schedule: 'D1-D3, every 21 days (4 cycles)' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1-D3, every 21 days (4 cycles)' },
                { name: 'Mesna (pre-dose)', dose: 240, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D3, every 21 days' },
                { name: 'Mesna (4h post)', dose: 480, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D3, every 21 days' },
                { name: 'Mesna (8h post)', dose: 480, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D3, every 21 days' },
                { name: 'Radiation Therapy', dose: 45, unit: 'Gy', schedule: 'with concurrent weekly cisplatin' }
            ]
        },
        
        // METASTATIC THERAPY - Most Commonly Used
        'TIP': {
            name: 'Paclitaxel + Ifosfamide + Cisplatin (TIP) (Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Mesna (pre-dose)', dose: 240, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D3, every 21 days' },
                { name: 'Mesna (4h post)', dose: 480, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D3, every 21 days' },
                { name: 'Mesna (8h post)', dose: 480, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D3, every 21 days' }
            ]
        },
        'TPF': {
            name: 'Docetaxel + Cisplatin + 5-Fluorouracil (TPF) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 750, unit: 'mg/m²', schedule: 'CI D1-D5, every 21 days' }
            ]
        },
        'Cisplatin-5FU-Pembrolizumab-HERCULES': {
            name: 'Cisplatin + 5-Fluorouracil + Pembrolizumab (PD-1 inhibitor) (HERCULES) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 70, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'CI D1-D4, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days (continue maintenance up to 34 cycles)' }
            ]
        },
        'Carboplatin-5FU-Pembrolizumab-HERCULES': {
            name: 'Carboplatin + 5-Fluorouracil + Pembrolizumab (PD-1 inhibitor) (HERCULES) (cisplatin-ineligible) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'CI D1-D4, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days (continue maintenance up to 34 cycles)' }
            ]
        },
        'Cisplatin-5FU': {
            name: 'Cisplatin + 5-Fluorouracil (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'CI D1-D5, every 21 days' }
            ]
        },
        'Cisplatin-Paclitaxel': {
            name: 'Cisplatin + Paclitaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel': {
            name: 'Paclitaxel + Carboplatin (PC) (cisplatin-ineligible) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-5FU-Pembrolizumab': {
            name: 'Carboplatin + 5-Fluorouracil + Pembrolizumab (PD-1 inhibitor) (cisplatin-ineligible) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days', requiresAUC: true },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'CI D1-D4, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days until progression' }
            ]
        },
        
        // SINGLE AGENT THERAPY - Metastatic
        'Paclitaxel': {
            name: 'Paclitaxel monotherapy (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Pembrolizumab-Single': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (dMMR/MSI-H/TMB-H) (Metastatic)',
            cycles: 35,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Pembrolizumab-Maintenance': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (Maintenance) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Cetuximab': {
            name: 'Cetuximab (EGFR inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'D1, every 7 days (loading dose 400 mg/m², then 250 mg/m²)', hasLoadingDose: true }
            ]
        }
    },
    vulvar_vaginal: {
        // Definitive Chemoradiation Regimens
        'Cisplatin-RT': {
            name: 'Cisplatin + RT (Definitive)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'D1, every 7 days during RT' }
            ]
        },
        'Carboplatin-RT': {
            name: 'Carboplatin + RT (cisplatin-ineligible) (Definitive)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, every 7 days during RT', requiresAUC: true }
            ]
        },
        'Cisplatin-5FU-RT': {
            name: 'Cisplatin + 5-Fluorouracil + RT (Definitive)',
            cycles: 2,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, week 1 and 5 with RT' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'CI daily D1-D4, week 1 and 5 with RT' }
            ]
        },
        'Capecitabine-RT': {
            name: 'Capecitabine + RT (Definitive)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'PO twice daily during RT' }
            ]
        },
        'Mitomycin-Capecitabine-RT': {
            name: 'Mitomycin + Capecitabine + RT (Definitive)',
            cycles: 2,
            drugs: [
                { name: 'Mitomycin', dose: 10, unit: 'mg/m²', schedule: 'D1, D29 (with concurrent RT)' },
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'PO twice daily during RT' }
            ]
        },
        
        // First-Line Metastatic Regimens
        'Cisplatin-Paclitaxel': {
            name: 'Cisplatin + Paclitaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel': {
            name: 'Carboplatin + Paclitaxel (PC) (cisplatin-ineligible) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days', requiresAUC: true },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Weekly': {
            name: 'Carboplatin + Paclitaxel (Weekly) (cisplatin-ineligible) (Metastatic)',
            cycles: 18,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, every 7 days', requiresAUC: true },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, every 7 days' }
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
            name: 'Carboplatin + Paclitaxel + Bevacizumab (cisplatin-ineligible) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'IM D1, every 28 days', requiresAUC: true },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Cisplatin': {
            name: 'Gemcitabine + Cisplatin (GC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 70, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Docetaxel': {
            name: 'Cisplatin + Docetaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Immunotherapy Regimens
        'Pembrolizumab': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (PD-L1 CPS ≥1 or dMMR/MSI-H) (Metastatic)',
            cycles: 35,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400 mg every 42 days' }
            ]
        },
        'Cemiplimab': {
            name: 'Cemiplimab monotherapy (PD-1 inhibitor) (Metastatic)',
            cycles: 35,
            drugs: [
                { name: 'Cemiplimab', dose: 350, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Nivolumab': {
            name: 'Nivolumab monotherapy (PD-1 inhibitor) (HPV-associated) (Metastatic)',
            cycles: 35,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days or 480 mg every 28 days' }
            ]
        },
        
        // Single Agent Chemotherapy
        'Topotecan': {
            name: 'Topotecan monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Topotecan', dose: 1.25, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        
        // Targeted Therapy
        'Trastuzumab-Deruxtecan': {
            name: 'Trastuzumab Deruxtecan (T-DXd) (Trop-2 ADC) (HER2-positive) (Metastatic)',
            cycles: 35,
            drugs: [
                { name: 'Trastuzumab Deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Erlotinib': {
            name: 'Erlotinib (EGFR inhibitor) (Metastatic)',
            cycles: 35,
            drugs: [
                { name: 'Erlotinib', dose: 150, unit: 'mg', schedule: 'PO once daily' }
            ]
        },
        'Larotrectinib': {
            name: 'Larotrectinib (TRK inhibitor) (NTRK gene fusion-positive) (Metastatic)',
            cycles: 35,
            drugs: [
                { name: 'Larotrectinib', dose: 100, unit: 'mg', schedule: 'PO twice daily' }
            ]
        },
        'Entrectinib': {
            name: 'Entrectinib (TRK inhibitor) (NTRK gene fusion-positive) (Metastatic)',
            cycles: 35,
            drugs: [
                { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'PO once daily' }
            ]
        }
    },
    mesothelioma: {
        // Combined Treatment Settings
        'Pemetrexed-Cisplatin': {
            name: 'Pemetrexed + Cisplatin (PC) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days (3-6 cycles depending on setting)' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days (3-6 cycles depending on setting)' },
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'PO once daily (start 1-2 weeks before treatment)' },
                { name: 'Vitamin B12', dose: 1000, unit: 'mcg', schedule: 'IM every 9 weeks (start 1-2 weeks before treatment)' }
            ]
        },
        'Pemetrexed-Carboplatin': {
            name: 'Pemetrexed + Carboplatin (PC) (cisplatin-ineligible) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'PO once daily (start 1-2 weeks before treatment)' },
                { name: 'Vitamin B12', dose: 1000, unit: 'mcg', schedule: 'IM every 9 weeks (start 1-2 weeks before treatment)' }
            ]
        },
        'Nivolumab-Ipilimumab': {
            name: 'Nivolumab + Ipilimumab (CheckMate 743) (PD-1/CTLA-4 inhibitors) (Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'D1, every 21 days x 4 cycles, then 480mg every 28 days' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 6 weeks x 4 cycles' }
            ]
        },
        'Pemetrexed-Cisplatin-Bevacizumab': {
            name: 'Pemetrexed + Cisplatin + Bevacizumab (MAPS Trial) (PCB) (Metastatic)',
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
            name: 'Pemetrexed + Carboplatin + Bevacizumab (PCB) (cisplatin-ineligible) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'PO once daily (start 1-2 weeks before treatment)' },
                { name: 'Vitamin B12', dose: 1000, unit: 'mcg', schedule: 'IM every 9 weeks (start 1-2 weeks before treatment)' }
            ]
        },
        'Pemetrexed-Cisplatin-ADI-PEG20': {
            name: 'Pemetrexed + Cisplatin + ADI-PEG20 (ATOMIC-Meso) (nonepithelioid) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'ADI-PEG20 (Pegargiminase)', dose: 36, unit: 'mg/m²', schedule: 'IM weekly' },
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'PO once daily (start 1-2 weeks before treatment)' },
                { name: 'Vitamin B12', dose: 1000, unit: 'mcg', schedule: 'IM every 9 weeks (start 1-2 weeks before treatment)' }
            ]
        },
        'Pemetrexed-Carboplatin-ADI-PEG20': {
            name: 'Pemetrexed + Carboplatin + ADI-PEG20 (ATOMIC-Meso) (nonepithelioid) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'ADI-PEG20 (Pegargiminase)', dose: 36, unit: 'mg/m²', schedule: 'IM weekly' },
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'PO once daily (start 1-2 weeks before treatment)' },
                { name: 'Vitamin B12', dose: 1000, unit: 'mcg', schedule: 'IM every 9 weeks (start 1-2 weeks before treatment)' }
            ]
        },
        
        // Metastatic - Second-Line Therapy
        'Gemcitabine-Cisplatin': {
            name: 'Gemcitabine + Cisplatin (GC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Carboplatin': {
            name: 'Gemcitabine + Carboplatin (GC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Vinorelbine': {
            name: 'Gemcitabine + Vinorelbine (GV) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Vinorelbine', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Vinorelbine-Cisplatin': {
            name: 'Vinorelbine + Cisplatin (VC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Vinorelbine', dose: 30, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Lurbinectedin': {
            name: 'Lurbinectedin monotherapy (PM1183) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Lurbinectedin', dose: 3.2, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Metastatic - Maintenance Therapy
        'Pemetrexed-Maintenance': {
            name: 'Pemetrexed monotherapy (maintenance after platinum-based therapy) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'PO once daily' },
                { name: 'Vitamin B12', dose: 1000, unit: 'mcg', schedule: 'IM every 9 weeks' }
            ]
        },
        'Bevacizumab-Maintenance': {
            name: 'Bevacizumab monotherapy (maintenance after platinum-based therapy) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'ADI-PEG20-Maintenance': {
            name: 'ADI-PEG20 monotherapy (Pegargiminase) (maintenance after ADI-PEG20 combination) (Metastatic)',
            cycles: 24,
            drugs: [
                { name: 'ADI-PEG20 (Pegargiminase)', dose: 36, unit: 'mg/m²', schedule: 'IM weekly' }
            ]
        },
        
        // Metastatic - Immunotherapy
        'Pembrolizumab': {
            name: 'Pembrolizumab monotherapy (KEYNOTE-158) (PD-1 inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Nivolumab': {
            name: 'Nivolumab monotherapy (MERIT) (PD-1 inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days' }
            ]
        },
        'Atezolizumab': {
            name: 'Atezolizumab monotherapy (ETOP 9-15) (PD-L1 inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Metastatic - Targeted Therapy
        'Tazemetostat': {
            name: 'Tazemetostat (EZH2 inhibitor) (BAP1 mutation) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Tazemetostat', dose: 800, unit: 'mg', schedule: 'PO twice daily' }
            ]
        },
        
        // Metastatic - Single Agent Chemotherapy
        'Gemcitabine': {
            name: 'Gemcitabine monotherapy (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Vinorelbine': {
            name: 'Vinorelbine monotherapy (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Vinorelbine', dose: 30, unit: 'mg/m²', schedule: 'D1, every 7 days' }
            ]
        },
        'Doxorubicin': {
            name: 'Doxorubicin monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        }
    },
    merkel_cell: {
        // Neoadjuvant Immunotherapy
        'Avelumab-Neoadjuvant': {
            name: 'Avelumab monotherapy (PD-L1 inhibitor) (Neoadjuvant)',
            cycles: 3,
            drugs: [
                { name: 'Avelumab', dose: 800, unit: 'mg', schedule: 'D1, every 14 days' }
            ]
        },
        'Pembrolizumab-Neoadjuvant': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (Neoadjuvant)',
            cycles: 3,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Adjuvant Immunotherapy
        'Avelumab-Adjuvant': {
            name: 'Avelumab monotherapy (PD-L1 inhibitor) (Adjuvant)',
            cycles: 12,
            drugs: [
                { name: 'Avelumab', dose: 800, unit: 'mg', schedule: 'D1, every 14 days' }
            ]
        },
        'Pembrolizumab-Adjuvant': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (Adjuvant)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Metastatic - First-Line Immunotherapy (Preferred)
        'Avelumab': {
            name: 'Avelumab monotherapy (JAVELIN Merkel 200) (PD-L1 inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Avelumab', dose: 800, unit: 'mg', schedule: 'D1, every 14 days' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab monotherapy (KEYNOTE-017) (PD-1 inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Nivolumab': {
            name: 'Nivolumab monotherapy (CheckMate 358) (PD-1 inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days' }
            ]
        },
        'Retifanlimab': {
            name: 'Retifanlimab monotherapy (POD1UM-201) (PD-1 inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Retifanlimab', dose: 500, unit: 'mg', schedule: 'D1, every 28 days' }
            ]
        },
        'Retifanlimab-dlwr': {
            name: 'Retifanlimab-dlwr (Zynyz) monotherapy (PD-1 inhibitor) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Retifanlimab-dlwr', dose: 500, unit: 'mg', schedule: 'D1, every 28 days' }
            ]
        },
        
        // Metastatic - First-Line Chemotherapy (Alternative)
        'EP': {
            name: 'Etoposide + Cisplatin (EP) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'EC': {
            name: 'Etoposide + Carboplatin (EC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'CAV': {
            name: 'Cyclophosphamide + Doxorubicin + Vincristine (CAV) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Mesna', dose: 800, unit: 'mg/m²', schedule: 'D1, every 21 days (80% of Cyclophosphamide dose)' },
                { name: 'Doxorubicin', dose: 45, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'D1, every 21 days (max 2mg)' }
            ]
        },
        'Topotecan-Cyclophosphamide': {
            name: 'Topotecan + Cyclophosphamide (TC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Topotecan', dose: 1.7, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Mesna', dose: 800, unit: 'mg/m²', schedule: 'D1, every 21 days (80% of Cyclophosphamide dose)' }
            ]
        },
        
        // Metastatic - Second-Line Chemotherapy
        'Temozolomide': {
            name: 'Temozolomide monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 200, unit: 'mg/m²', schedule: 'D1-D5, every 28 days' }
            ]
        },
        'Paclitaxel': {
            name: 'Paclitaxel monotherapy (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, every 7 days' }
            ]
        },
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
        'Vinorelbine': {
            name: 'Vinorelbine monotherapy (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Vinorelbine', dose: 30, unit: 'mg/m²', schedule: 'D1, every 7 days' }
            ]
        },
        'Doxorubicin': {
            name: 'Doxorubicin monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Cyclophosphamide': {
            name: 'Cyclophosphamide monotherapy (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Mesna', dose: 800, unit: 'mg/m²', schedule: 'D1, every 21 days (80% of Cyclophosphamide dose)' }
            ]
        },
        
        // Metastatic - Combination Chemotherapy Options
        'Paclitaxel-Carboplatin': {
            name: 'Paclitaxel + Carboplatin (PC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Carboplatin': {
            name: 'Gemcitabine + Carboplatin (GC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'Docetaxel-Carboplatin': {
            name: 'Docetaxel + Carboplatin (DC) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Metastatic - Investigational/Newer Agents
        'Ipilimumab-Nivolumab': {
            name: 'Ipilimumab + Nivolumab (CTLA-4/PD-1 inhibitors) (ASCO 2024 data) (Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 6 weeks x 4 cycles' },
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days' }
            ]
        },
        'Dostarlimab': {
            name: 'Dostarlimab monotherapy (PD-1 inhibitor) (Investigational) (Metastatic)',
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
            name: 'Cisplatin + Etoposide (EP) (Ependymoma) (Adjuvant)',
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
            name: 'Cisplatin + Etoposide + Cyclophosphamide (EP + Cyclophosphamide) (Medulloblastoma) (Adjuvant)',
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
        // MSI-H/dMMR Biomarker-Directed Therapy
        'Pembrolizumab-MSI-H': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (MSI-H/dMMR solid tumors)',
            cycles: 35,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400 mg every 42 days' }
            ]
        },
        'Dostarlimab-MSI-H': {
            name: 'Dostarlimab monotherapy (PD-1 inhibitor) (MSI-H/dMMR solid tumors)',
            cycles: 35,
            drugs: [
                { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'D1, every 21 days for 4 cycles, then 1000 mg every 42 days' }
            ]
        },
        'Nivolumab-MSI-H': {
            name: 'Nivolumab monotherapy (PD-1 inhibitor) (MSI-H/dMMR solid tumors)',
            cycles: 35,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days or 480 mg every 28 days' }
            ]
        },
        'Nivolumab-Ipilimumab-MSI-H': {
            name: 'Nivolumab + Ipilimumab (CheckMate 8HW) (PD-1/CTLA-4 inhibitors) (MSI-H/dMMR solid tumors)',
            cycles: 35,
            drugs: [
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 14 days' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 42 days for 4 doses' }
            ]
        },

        // TMB-H (Tumor Mutational Burden-High) Biomarker-Directed Therapy
        'Pembrolizumab-TMB-H': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (TMB-H ≥10 mut/Mb solid tumors)',
            cycles: 35,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400 mg every 42 days' }
            ]
        },

        // NTRK Gene Fusion-Positive Biomarker-Directed Therapy
        'Larotrectinib': {
            name: 'Larotrectinib (TRK inhibitor) (NTRK gene fusion-positive solid tumors)',
            cycles: 35,
            drugs: [
                { name: 'Larotrectinib', dose: 100, unit: 'mg', schedule: 'PO twice daily' }
            ]
        },
        'Entrectinib': {
            name: 'Entrectinib (TRK inhibitor) (NTRK gene fusion-positive solid tumors)',
            cycles: 35,
            drugs: [
                { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'PO once daily' }
            ]
        },
        'Repotrectinib': {
            name: 'Repotrectinib (TRK inhibitor) (NTRK gene fusion-positive solid tumors)',
            cycles: 35,
            drugs: [
                { name: 'Repotrectinib', dose: 160, unit: 'mg', schedule: 'PO once daily' }
            ]
        },

        // RET Gene Fusion-Positive Biomarker-Directed Therapy
        'Selpercatinib': {
            name: 'Selpercatinib (RET inhibitor) (RET gene fusion-positive solid tumors)',
            cycles: 35,
            drugs: [
                { name: 'Selpercatinib', dose: 160, unit: 'mg', schedule: 'PO twice daily' }
            ]
        },
        'Pralsetinib': {
            name: 'Pralsetinib (RET inhibitor) (RET gene fusion-positive solid tumors)',
            cycles: 35,
            drugs: [
                { name: 'Pralsetinib', dose: 400, unit: 'mg', schedule: 'PO once daily' }
            ]
        },

        // BRAF V600E Mutation Biomarker-Directed Therapy
        'Dabrafenib-Trametinib': {
            name: 'Dabrafenib + Trametinib (BRAF/MEK inhibitors) (BRAF V600E-mutant solid tumors)',
            cycles: 35,
            drugs: [
                { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'PO twice daily' },
                { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'PO once daily' }
            ]
        },
        'Vemurafenib': {
            name: 'Vemurafenib (BRAF inhibitor) (BRAF V600E-mutant solid tumors)',
            cycles: 35,
            drugs: [
                { name: 'Vemurafenib', dose: 960, unit: 'mg', schedule: 'PO twice daily' }
            ]
        },

        // HER2 Overexpression/Amplification Biomarker-Directed Therapy
        'Trastuzumab-Deruxtecan-HER2': {
            name: 'Trastuzumab Deruxtecan (T-DXd) (HER2-directed ADC) (HER2-positive solid tumors)',
            cycles: 35,
            drugs: [
                { name: 'Trastuzumab Deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        }
    },
    ureteric_urethral: {
        // NEOADJUVANT/ADJUVANT/METASTATIC THERAPY
        'GC-Split-Dose': {
            name: 'Gemcitabine + Cisplatin (Split-dose) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: '4-6',
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 35, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'GC-Standard': {
            name: 'Gemcitabine + Cisplatin (Standard dose) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: '4-6',
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 70, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'MVAC': {
            name: 'Methotrexate + Vinblastine + Doxorubicin + Cisplatin (MVAC) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: '4-6',
            drugs: [
                { name: 'Methotrexate', dose: 30, unit: 'mg/m²', schedule: 'D1, every 28 days (or every 14 days for neoadjuvant/adjuvant)' },
                { name: 'Vinblastine', dose: 3, unit: 'mg/m²', schedule: 'D2, every 28 days (or every 14 days for neoadjuvant/adjuvant)' },
                { name: 'Doxorubicin', dose: 30, unit: 'mg/m²', schedule: 'D2, every 28 days (or every 14 days for neoadjuvant/adjuvant)' },
                { name: 'Cisplatin', dose: 70, unit: 'mg/m²', schedule: 'D2, every 28 days (or every 14 days for neoadjuvant/adjuvant)' },
                { name: 'Leucovorin', dose: 15, unit: 'mg/m²', schedule: 'D1 at 24h post-Methotrexate, every 28 days (or every 14 days for neoadjuvant/adjuvant)' }
            ]
        },
        'ddMVAC': {
            name: 'Dose-dense MVAC (ddMVAC) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: '4-6',
            drugs: [
                { name: 'Methotrexate', dose: 30, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Vinblastine', dose: 3, unit: 'mg/m²', schedule: 'D2, every 14 days' },
                { name: 'Doxorubicin', dose: 30, unit: 'mg/m²', schedule: 'D2, every 14 days' },
                { name: 'Cisplatin', dose: 70, unit: 'mg/m²', schedule: 'D2, every 14 days' },
                { name: 'Leucovorin', dose: 15, unit: 'mg/m²', schedule: 'D1 at 24h post-Methotrexate, every 14 days' }
            ]
        },

        // DEFINITIVE CHEMORADIOTHERAPY - URETHRAL CANCER
        'Cisplatin-RT-Urethral': {
            name: 'Cisplatin + Radiotherapy (Definitive - urethral cancer)',
            cycles: 3,
            drugs: [
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days during RT' }
            ]
        },
        '5FU-MMC-RT-Urethral': {
            name: '5-Fluorouracil + Mitomycin C + Radiotherapy (Definitive - urethral cancer)',
            cycles: 2,
            drugs: [
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'D1-D4, every 28 days during RT' },
                { name: 'Mitomycin C', dose: 10, unit: 'mg/m²', schedule: 'D1, cycle 1 and 2 only' }
            ]
        },
        'TPF-Urethral': {
            name: 'Docetaxel + Cisplatin + 5-Fluorouracil (TPF) (Definitive - urethral cancer)',
            cycles: 3,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 750, unit: 'mg/m²', schedule: 'D1-D5 (continuous infusion), every 21 days' }
            ]
        },

        // METASTATIC THERAPY - CISPLATIN-INELIGIBLE & IMMUNOTHERAPY
        'GC-Carboplatin-Metastatic': {
            name: 'Gemcitabine + Carboplatin (Cisplatin-ineligible) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'Pembrolizumab-Monotherapy': {
            name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (PD-L1+ or cisplatin-ineligible) (Metastatic)',
            cycles: 35,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400 mg every 42 days' }
            ]
        },
        'Atezolizumab-Monotherapy': {
            name: 'Atezolizumab monotherapy (PD-L1 inhibitor) (Cisplatin-ineligible) (Metastatic)',
            cycles: 35,
            drugs: [
                { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Paclitaxel-Monotherapy': {
            name: 'Paclitaxel monotherapy (Cisplatin-ineligible) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Docetaxel-Monotherapy': {
            name: 'Docetaxel monotherapy (Cisplatin-ineligible) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        }
    },
    neuroendocrine: {
        // Adjuvant Therapy
        'Octreotide-LAR-Adjuvant': {
            name: 'Octreotide LAR (somatostatin analog) (Adjuvant)',
            cycles: 12,
            drugs: [
                { name: 'Octreotide LAR', dose: 20, unit: 'mg', schedule: 'IM D1, every 28 days' }
            ]
        },
        
        // Metastatic - First-Line (Most commonly used → Least commonly used)
        
        // Somatostatin Analogs - First-Line for Well-Differentiated NETs
        'Octreotide-LAR': {
            name: 'Octreotide LAR (PROMID) (somatostatin analog) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Octreotide LAR', dose: 30, unit: 'mg', schedule: 'IM D1, every 28 days' }
            ]
        },
        'Lanreotide': {
            name: 'Lanreotide (CLARINET) (somatostatin analog) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Lanreotide', dose: 120, unit: 'mg', schedule: 'SC D1, every 28 days' }
            ]
        },
        
        // Targeted Therapy - mTOR Inhibitors
        'Everolimus': {
            name: 'Everolimus (RADIANT-4) (mTOR inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        },
        'Everolimus-Octreotide': {
            name: 'Everolimus + Octreotide LAR (RADIANT-2) (mTOR inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'PO once daily until progression' },
                { name: 'Octreotide LAR', dose: 30, unit: 'mg', schedule: 'IM D1, every 28 days' }
            ]
        },
        
        // Targeted Therapy - Multi-kinase Inhibitors (Pancreatic NETs)
        'Sunitinib': {
            name: 'Sunitinib (multi-kinase inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Sunitinib', dose: 37.5, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        },
        
        // Peptide Receptor Radionuclide Therapy
        'Lutetium-177': {
            name: 'Lutetium Lu 177 Dotatate (NETTER-1) (PRRT) (Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Lutetium Lu 177 Dotatate', dose: 7.4, unit: 'GBq', schedule: 'D1, every 8 weeks' }
            ]
        },
        
        // Chemotherapy - High-Grade/Poorly Differentiated NETs
        'Cisplatin-Etoposide': {
            name: 'Cisplatin + Etoposide (EP) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' }
            ]
        },
        'Carboplatin-Etoposide': {
            name: 'Carboplatin + Etoposide (cisplatin-ineligible) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' }
            ]
        },
        'Irinotecan-Cisplatin': {
            name: 'Irinotecan + Cisplatin (IP) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Irinotecan', dose: 60, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 28 days' }
            ]
        },
        'Cyclophosphamide-Doxorubicin-Vincristine': {
            name: 'Cyclophosphamide + Doxorubicin + Vincristine (CAV) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Mesna', dose: 800, unit: 'mg/m²', schedule: 'D1, every 21 days (80% of Cyclophosphamide dose)' },
                { name: 'Doxorubicin', dose: 45, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        // Alkylating Agent-Based Therapy (Pancreatic NETs)
        'Capecitabine-Temozolomide': {
            name: 'Capecitabine + Temozolomide (CAPTEM) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 750, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 28 days' },
                { name: 'Temozolomide', dose: 200, unit: 'mg/m²', schedule: 'PO once daily D10-D14, every 28 days' }
            ]
        },
        'Temozolomide': {
            name: 'Temozolomide monotherapy (alkylating agent) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 200, unit: 'mg/m²', schedule: 'PO once daily D1-D5, every 28 days' }
            ]
        },
        'Streptozocin-5FU': {
            name: 'Streptozocin + 5-Fluorouracil (alkylating agent) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Streptozocin', dose: 500, unit: 'mg/m²', schedule: 'D1-D5, every 42 days' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'D1-D5, every 42 days' }
            ]
        },
        'Streptozocin-Doxorubicin': {
            name: 'Streptozocin + Doxorubicin (alkylating agent) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Streptozocin', dose: 500, unit: 'mg/m²', schedule: 'D1-D5, every 42 days' },
                { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 42 days' }
            ]
        },
        // Multi-kinase Inhibitors - Later Lines
        'Cabozantinib': {
            name: 'Cabozantinib (multi-kinase inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Cabozantinib', dose: 60, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        },
        'Lenvatinib': {
            name: 'Lenvatinib (multi-kinase inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Lenvatinib', dose: 24, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        },
        'Axitinib': {
            name: 'Axitinib (VEGFR inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Axitinib', dose: 5, unit: 'mg', schedule: 'PO twice daily until progression' }
            ]
        },
        'Pazopanib': {
            name: 'Pazopanib (multi-kinase inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Pazopanib', dose: 800, unit: 'mg', schedule: 'PO once daily until progression' }
            ]
        },
        'Sorafenib': {
            name: 'Sorafenib (multi-kinase inhibitor) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'PO twice daily until progression' }
            ]
        },
        
        // Historical/Less Common Regimens
        'Dacarbazine': {
            name: 'Dacarbazine monotherapy (DTIC) (alkylating agent) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Dacarbazine', dose: 200, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        'Interferon-Alpha': {
            name: 'Interferon Alpha-2b monotherapy (immunomodulator) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Interferon Alpha-2b', dose: 5, unit: 'MU', schedule: '3 times weekly until progression' }
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
                    { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                    { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' }
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
                    { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                    { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' },
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
                    { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                    { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' }
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
                    { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
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
                    { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
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
                    { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                    { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' }
                ]
            },
            'mFOLFOX6-Metastatic': {
                name: 'mFOLFOX6 (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                    { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' }
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
                    { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                    { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' },
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
                    { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                    { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' },
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
                    { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                    { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' }
                ]
            },
            'FOLFIRINOX-Bevacizumab-Metastatic': {
                name: 'FOLFIRINOX + Bevacizumab (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                    { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' },
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
                    { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                    { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' }
                ]
            },
            'mFOLFOX6-Panitumumab-Metastatic': {
                name: 'mFOLFOX6 + Panitumumab (KRAS/NRAS/BRAF WT/Left-sided) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Panitumumab', dose: 6, unit: 'mg/kg', schedule: 'D1, every 14 days' },
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                    { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' }
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
                    { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                    { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' }
                ]
            },
            'FOLFIRI-Panitumumab-Metastatic': {
                name: 'FOLFIRI + Panitumumab (KRAS/NRAS/BRAF WT/Left-sided) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Panitumumab', dose: 6, unit: 'mg/kg', schedule: 'D1, every 14 days' },
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                    { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' }
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
                    { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                    { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' },
                    { name: 'Ziv-aflibercept', dose: 4, unit: 'mg/kg', schedule: 'D1, every 14 days' }
                ]
            },
            'FOLFIRI-Ramucirumab-Metastatic': {
                name: 'FOLFIRI + Ramucirumab (RAISE) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                    { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                    { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' },
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
                    { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                    { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' },
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
                    { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                    { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' },
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
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' },
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
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'Continuous infusion 46h D1-D2, every 14 days' },
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
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
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
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'Bolus D1, every 14 days' },
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
                name: 'Nivolumab (PD-1 inhibitor) + Cisplatin + Pemetrexed (CheckMate 816) (Non-squamous) (Neoadjuvant)',
                cycles: 3,
                drugs: [
                    { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'D1 every 21 days x 3 cycles' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days x 3 cycles' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1 every 21 days x 3 cycles' }
                ]
            },
            'Pembrolizumab-Carboplatin-Paclitaxel-Neoadjuvant': {
                name: 'Pembrolizumab (PD-1 inhibitor) + Carboplatin + Paclitaxel (KEYNOTE-671) (Squamous) (Neoadjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1 every 21 days x 4 cycles' },
                    { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1 every 21 days x 4 cycles' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1 every 21 days x 4 cycles' }
                ]
            },
            'Cisplatin-Pemetrexed-Neoadjuvant': {
                name: 'Cisplatin + Pemetrexed (Non-squamous) (Neoadjuvant)',
                cycles: 3,
                drugs: [
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days x 3 cycles' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1 every 21 days x 3 cycles' }
                ]
            },
            'Carboplatin-Paclitaxel-Neoadjuvant': {
                name: 'Carboplatin + Paclitaxel (Neoadjuvant)',
                cycles: 3,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1 every 21 days x 3 cycles' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1 every 21 days x 3 cycles' }
                ]
            },
            'Cisplatin-Gemcitabine-Neoadjuvant': {
                name: 'Cisplatin + Gemcitabine (Squamous) (Neoadjuvant)',
                cycles: 3,
                drugs: [
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days x 3 cycles' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8 every 21 days x 3 cycles' }
                ]
            },

            // PERIOPERATIVE THERAPY
            'Nivolumab-Carboplatin-Paclitaxel-Perioperative': {
                name: 'Nivolumab (PD-1 inhibitor) + Carboplatin + Paclitaxel (CheckMate 77T) (Perioperative)',
                cycles: 4,
                drugs: [
                    { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'D1 every 21 days (neoadjuvant + adjuvant)' },
                    { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1 every 21 days x 3 cycles (neoadjuvant only)' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1 every 21 days x 3 cycles (neoadjuvant only)' }
                ]
            },

            // ADJUVANT THERAPY
            'Osimertinib-Adjuvant': {
                name: 'Osimertinib (EGFR inhibitor) (ADAURA) (EGFR exon19del/L858R+) (Adjuvant)',
                cycles: 36,
                drugs: [
                    { name: 'Osimertinib', dose: 80, unit: 'mg', schedule: 'PO daily x 3 years' }
                ]
            },
            'Alectinib-Adjuvant': {
                name: 'Alectinib (ALK inhibitor) (ALINA) (ALK rearrangement+) (Adjuvant)',
                cycles: 24,
                drugs: [
                    { name: 'Alectinib', dose: 600, unit: 'mg', schedule: 'PO twice daily x 2 years' }
                ]
            },
            'Atezolizumab-Adjuvant': {
                name: 'Atezolizumab (PD-L1 inhibitor) (IMpower010) (Stage IB-IIIA, PD-L1 ≥1%) (Adjuvant)',
                cycles: 16,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1 every 21 days x 16 cycles' }
                ]
            },
            'Pembrolizumab-Adjuvant': {
                name: 'Pembrolizumab (PD-1 inhibitor) (KEYNOTE-091/PEARLS) (Stage IB-IIIA) (Adjuvant)',
                cycles: 18,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1 every 21 days x 18 cycles (1 year)' }
                ]
            },
            'Cisplatin-Vinorelbine-Adjuvant': {
                name: 'Cisplatin + Vinorelbine (Adjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1 every 21 days x 4 cycles' },
                    { name: 'Vinorelbine', dose: 25, unit: 'mg/m²', schedule: 'D1, D8 every 21 days x 4 cycles' }
                ]
            },
            'Carboplatin-Paclitaxel-Adjuvant': {
                name: 'Carboplatin + Paclitaxel (cisplatin-ineligible) (Adjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1 every 21 days x 4 cycles' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1 every 21 days x 4 cycles' }
                ]
            },

            // DEFINITIVE THERAPY (Concurrent Chemoradiotherapy)
            'Cisplatin-Etoposide-CRT': {
                name: 'Cisplatin + Etoposide (EP) (Definitive chemoradiotherapy)',
                cycles: 2,
                drugs: [
                    { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, D8, D29, D36 (with concurrent RT)' },
                    { name: 'Etoposide', dose: 50, unit: 'mg/m²', schedule: 'D1-5, D29-33 (with concurrent RT)' }
                ]
            },
            'Weekly-Paclitaxel-Carboplatin-CRT': {
                name: 'Weekly Paclitaxel + Carboplatin (Definitive chemoradiotherapy)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 45, unit: 'mg/m²', schedule: 'weekly D1, D8, D15, D22, D29, D36 (with concurrent RT)' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly D1, D8, D15, D22, D29, D36 (with concurrent RT)' }
                ]
            },
            'Cisplatin-Pemetrexed-CRT': {
                name: 'Cisplatin + Pemetrexed (Non-squamous) (Definitive chemoradiotherapy)',
                cycles: 2,
                drugs: [
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, D22 (with concurrent RT)' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, D22 (with concurrent RT)' }
                ]
            },
            'Durvalumab-Consolidation': {
                name: 'Durvalumab (PD-L1 inhibitor) (PACIFIC) (Post-chemoradiotherapy consolidation)',
                cycles: 26,
                drugs: [
                    { name: 'Durvalumab', dose: 10, unit: 'mg/kg', schedule: 'D1 every 14 days x 12 months (post-CRT)' }
                ]
            },

            // METASTATIC THERAPY - Immunotherapy Monotherapy (PD-L1 ≥50%)
            'Pembrolizumab-Monotherapy': {
                name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (KEYNOTE-024) (PD-L1 ≥50%) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1 every 21 days or 400mg every 6 weeks' }
                ]
            },
            'Atezolizumab-Monotherapy': {
                name: 'Atezolizumab monotherapy (PD-L1 inhibitor) (OAK) (PD-L1+) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1 every 21 days' }
                ]
            },
            'Cemiplimab-Monotherapy': {
                name: 'Cemiplimab monotherapy (PD-1 inhibitor) (EMPOWER-Lung 1) (PD-L1 ≥50%) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Cemiplimab', dose: 350, unit: 'mg', schedule: 'D1 every 21 days' }
                ]
            },

            // METASTATIC THERAPY - Immunotherapy Combinations (Non-squamous)
            'Pembrolizumab-Cisplatin-Pemetrexed': {
                name: 'Pembrolizumab (PD-1 inhibitor) + Cisplatin + Pemetrexed (KEYNOTE-189) (Non-squamous) (Metastatic)',
                cycles: 4,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1 every 21 days (continue maintenance)' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days x 4 cycles' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1 every 21 days (continue maintenance)' }
                ]
            },
            'Pembrolizumab-Carboplatin-Pemetrexed': {
                name: 'Pembrolizumab (PD-1 inhibitor) + Carboplatin + Pemetrexed (KEYNOTE-189) (cisplatin-ineligible) (Non-squamous) (Metastatic)',
                cycles: 4,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1 every 21 days (continue maintenance)' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1 every 21 days x 4 cycles' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1 every 21 days (continue maintenance)' }
                ]
            },
            'Nivolumab-Ipilimumab-Chemotherapy': {
                name: 'Nivolumab (PD-1 inhibitor) + Ipilimumab (CTLA-4 inhibitor) + Chemotherapy (CheckMate 9LA) (Metastatic)',
                cycles: 2,
                drugs: [
                    { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'D1 every 21 days (continue maintenance)' },
                    { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1 every 42 days x 2 cycles only' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1 every 21 days x 2 cycles' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1 every 21 days x 2 cycles (non-squamous)' }
                ]
            },
            'Atezolizumab-Bevacizumab-Carboplatin-Paclitaxel': {
                name: 'Atezolizumab (PD-L1 inhibitor) + Bevacizumab (VEGF inhibitor) + Carboplatin + Paclitaxel (IMpower150) (Metastatic)',
                cycles: 4,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1 every 21 days (continue maintenance)' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1 every 21 days (continue maintenance)' },
                    { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1 every 21 days x 4 cycles' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1 every 21 days x 4 cycles' }
                ]
            },

            // METASTATIC THERAPY - Immunotherapy Combinations (Squamous)
            'Pembrolizumab-Carboplatin-Paclitaxel': {
                name: 'Pembrolizumab (PD-1 inhibitor) + Carboplatin + Paclitaxel (KEYNOTE-407) (Squamous) (Metastatic)',
                cycles: 4,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1 every 21 days (continue maintenance)' },
                    { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1 every 21 days x 4 cycles' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1 every 21 days x 4 cycles' }
                ]
            },
            'Pembrolizumab-Carboplatin-Nab-Paclitaxel': {
                name: 'Pembrolizumab (PD-1 inhibitor) + Carboplatin + Nab-paclitaxel (KEYNOTE-407) (Squamous) (Metastatic)',
                cycles: 4,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1 every 21 days (continue maintenance)' },
                    { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1 every 21 days x 4 cycles' },
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, D8, D15 every 21 days x 4 cycles' }
                ]
            },

            // METASTATIC THERAPY - EGFR-Targeted Therapy (EGFR+)
            'Osimertinib-Metastatic': {
                name: 'Osimertinib (EGFR inhibitor) (FLAURA) (EGFR exon19del/L858R+) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Osimertinib', dose: 80, unit: 'mg', schedule: 'PO daily until progression' }
                ]
            },
            'Amivantamab-Lazertinib': {
                name: 'Amivantamab (EGFR/MET bispecific antibody) + Lazertinib (EGFR inhibitor) (MARIPOSA) (EGFR exon19del/L858R+) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Amivantamab', dose: 1400, unit: 'mg', schedule: 'IV D1 (loading), then 1050mg every 14 days' },
                    { name: 'Lazertinib', dose: 240, unit: 'mg', schedule: 'PO daily continuously' }
                ]
            },
            'Amivantamab-Exon20': {
                name: 'Amivantamab (EGFR/MET bispecific antibody) (CHRYSALIS) (EGFR exon20 insertion+) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Amivantamab', dose: 1400, unit: 'mg', schedule: 'IV D1 (loading), then 1050mg every 14 days' }
                ]
            },
            'Mobocertinib-Exon20': {
                name: 'Mobocertinib (EGFR inhibitor) (EGFR exon20 insertion+) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Mobocertinib', dose: 160, unit: 'mg', schedule: 'PO daily until progression' }
                ]
            },

            // METASTATIC THERAPY - ALK-Targeted Therapy (ALK+)
            'Alectinib-Metastatic': {
                name: 'Alectinib (ALK inhibitor) (ALEX) (ALK rearrangement+) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Alectinib', dose: 600, unit: 'mg', schedule: 'PO twice daily until progression' }
                ]
            },
            'Brigatinib-ALK': {
                name: 'Brigatinib (ALK inhibitor) (ALTA-1L) (ALK rearrangement+) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Brigatinib', dose: 180, unit: 'mg', schedule: 'PO daily (90mg daily x 7 days lead-in)' }
                ]
            },
            'Lorlatinib-ALK': {
                name: 'Lorlatinib (ALK/ROS1 inhibitor) (ALK rearrangement+) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Lorlatinib', dose: 100, unit: 'mg', schedule: 'PO daily until progression' }
                ]
            },

            // METASTATIC THERAPY - Other Targeted Therapy
            'Crizotinib-ROS1': {
                name: 'Crizotinib (ALK/ROS1 inhibitor) (ROS1 rearrangement+) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Crizotinib', dose: 250, unit: 'mg', schedule: 'PO twice daily until progression' }
                ]
            },
            'Entrectinib-NTRK': {
                name: 'Entrectinib (TRK/ROS1/ALK inhibitor) (NTRK fusion+) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'PO daily until progression' }
                ]
            },
            'Trastuzumab-Deruxtecan-HER2': {
                name: 'Trastuzumab deruxtecan (HER2 ADC) (DESTINY-Lung02) (HER2 mutation+) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Trastuzumab deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'IV D1 every 21 days' }
                ]
            },
            'Selpercatinib-RET': {
                name: 'Selpercatinib (RET inhibitor) (LIBRETTO-001) (RET fusion+) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Selpercatinib', dose: 160, unit: 'mg', schedule: 'PO twice daily until progression' }
                ]
            },

            // METASTATIC THERAPY - Chemotherapy Combinations  
            'Cisplatin-Pemetrexed': {
                name: 'Cisplatin + Pemetrexed (Non-squamous) (Metastatic)',
                cycles: 4,
                drugs: [
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days x 4 cycles' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1 every 21 days (continue maintenance)' }
                ]
            },
            'Carboplatin-Paclitaxel': {
                name: 'Carboplatin + Paclitaxel (cisplatin-ineligible) (Metastatic)',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1 every 21 days x 4 cycles' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1 every 21 days x 4 cycles' }
                ]
            },
            'Carboplatin-Gemcitabine': {
                name: 'Carboplatin + Gemcitabine (Squamous) (Metastatic)',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1 every 21 days x 4 cycles' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8 every 21 days x 4 cycles' }
                ]
            },

            // METASTATIC THERAPY - Second-Line Options
            'Docetaxel-Ramucirumab': {
                name: 'Docetaxel + Ramucirumab (VEGFR2 inhibitor) (REVEL) (Second-line) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                    { name: 'Ramucirumab', dose: 10, unit: 'mg/kg', schedule: 'D1 every 21 days' }
                ]
            },
            'Docetaxel-Monotherapy': {
                name: 'Docetaxel monotherapy (Second-line) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' }
                ]
            },
            'Pemetrexed-Maintenance': {
                name: 'Pemetrexed maintenance (Non-squamous) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1 every 21 days (maintenance)' }
                ]
            }
        },
        sclc: {
            // LIMITED STAGE SCLC - DEFINITIVE THERAPY
            'Cisplatin-Etoposide-CRT-Limited': {
                name: 'Cisplatin + Etoposide (EP) (Definitive - Limited Stage)',
                cycles: 2,
                drugs: [
                    { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, D8, D29, D36 (with concurrent RT)' },
                    { name: 'Etoposide', dose: 50, unit: 'mg/m²', schedule: 'D1-D5, D29-D33 (with concurrent RT)' }
                ]
            },
            'Carboplatin-Etoposide-CRT-Limited': {
                name: 'Carboplatin + Etoposide (cisplatin-ineligible) (Definitive - Limited Stage)',
                cycles: 2,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, D29 (with concurrent RT)' },
                    { name: 'Etoposide', dose: 50, unit: 'mg/m²', schedule: 'D1-D5, D29-D33 (with concurrent RT)' }
                ]
            },
            'Durvalumab-Consolidation-Limited': {
                name: 'Durvalumab (PD-L1 inhibitor) (ADRIATIC) (Definitive - Limited Stage post-CRT consolidation)',
                cycles: 34,
                drugs: [
                    { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 28 days x 2 years (post-chemoradiotherapy)' }
                ]
            },
            'Prophylactic-Cranial-Irradiation': {
                name: 'Prophylactic Cranial Irradiation (PCI) (Definitive - Limited Stage)',
                cycles: 1,
                drugs: [
                    { name: 'PCI', dose: '25 Gy', unit: 'Gy', schedule: '25 Gy in 10 fractions' }
                ]
            },
            
            // METASTATIC THERAPY (Extensive Stage SCLC)
            'Atezolizumab-Carboplatin-Etoposide': {
                name: 'Atezolizumab (PD-L1 inhibitor) + Carboplatin + Etoposide (ACE) (IMpower133) (Metastatic)',
                cycles: 4,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days (continue maintenance)' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days x 4 cycles' }
                ]
            },
            'Durvalumab-Carboplatin-Etoposide': {
                name: 'Durvalumab (PD-L1 inhibitor) + Carboplatin + Etoposide (DCE) (CASPIAN) (Metastatic)',
                cycles: 4,
                drugs: [
                    { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 21 days (continue maintenance)' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days x 4 cycles' }
                ]
            },
            'Durvalumab-Cisplatin-Etoposide': {
                name: 'Durvalumab + Cisplatin + Etoposide (Durvalumab-EP) (CASPIAN) (PD-L1 inhibitor) (Metastatic)',
                cycles: 4,
                drugs: [
                    { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 21 days (continue maintenance)' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days x 4 cycles' }
                ]
            },
            'Carboplatin-Etoposide': {
                name: 'Carboplatin + Etoposide (CE) (Metastatic)',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' }
                ]
            },
            'Cisplatin-Etoposide-SCLC': {
                name: 'Cisplatin + Etoposide (EP) (Metastatic)',
                cycles: 4,
                drugs: [
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' }
                ]
            },
            'Irinotecan-Cisplatin': {
                name: 'Irinotecan + Cisplatin (IP) (JCOG-9511) (Metastatic)',
                cycles: 4,
                drugs: [
                    { name: 'Irinotecan', dose: 60, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                    { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 28 days' }
                ]
            },
            'Carboplatin-Paclitaxel-SCLC': {
                name: 'Paclitaxel + Carboplatin (PC) (cisplatin-ineligible) (Metastatic)',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Tarlatamab': {
                name: 'Tarlatamab (DLL3-targeted BiTE) (DeLLphi-304) (Metastatic)',
                cycles: 35,
                drugs: [
                    { name: 'Tarlatamab (step-up)', dose: 10, unit: 'mg', schedule: 'D1, D8, D15 of cycle 1 only (step-up dosing)' },
                    { name: 'Tarlatamab (maintenance)', dose: 100, unit: 'mg', schedule: 'D1, every 14 days from cycle 2 onwards' }
                ]
            },
            'Topotecan-SCLC': {
                name: 'Topotecan monotherapy (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'Lurbinectedin': {
                name: 'Lurbinectedin (ATLANTIS) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Lurbinectedin', dose: 3.2, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'CAV-SCLC': {
                name: 'Cyclophosphamide + Doxorubicin + Vincristine (CAV) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 45, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Topotecan-Cisplatin': {
                name: 'Topotecan + Cisplatin (TC) (Metastatic)',
                cycles: 4,
                drugs: [
                    { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'CAE-SCLC': {
                name: 'Cyclophosphamide + Doxorubicin + Etoposide (CAE) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 45, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' }
                ]
            },
            'Etoposide-Single': {
                name: 'Etoposide monotherapy (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' }
                ]
            },
            'Paclitaxel-Single-SCLC': {
                name: 'Paclitaxel monotherapy (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Gemcitabine-Single-SCLC': {
                name: 'Gemcitabine monotherapy (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Nivolumab-SCLC': {
                name: 'Nivolumab monotherapy (PD-1 inhibitor) (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days or 480mg every 28 days' }
                ]
            },
            'Pembrolizumab-SCLC': {
                name: 'Pembrolizumab monotherapy (PD-1 inhibitor) (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400mg every 6 weeks' }
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
            
            'Ipilimumab-Nivolumab-SCLC': {
                name: 'Ipilimumab (CTLA-4 inhibitor) + Nivolumab (PD-1 inhibitor) (CheckMate-451) (Metastatic)',
                cycles: 4,
                drugs: [
                    { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 42 days x 4 cycles' },
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 14 days' }
                ]
            },
            'Topotecan-Oral': {
                name: 'Topotecan (oral) monotherapy (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Topotecan', dose: 2.3, unit: 'mg/m²', schedule: 'PO D1-D5, every 21 days' }
                ]
            },
            'Temozolomide-SCLC': {
                name: 'Temozolomide monotherapy (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Temozolomide', dose: 150, unit: 'mg/m²', schedule: 'PO D1-D5, every 28 days' }
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
        'erlotinib', 'gefitinib', 'osimertinib', 'afatinib', 'dacomitinib', 'mobocertinib', 'lazertinib',
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
        
        // Multiple Myeloma common abbreviations
        if (text.includes('bortezomib') && text.includes('lenalidomide') && text.includes('dexamethasone')) {
            aliases += ' vrd vld';
            if (text.includes('daratumumab')) {
                aliases += ' dara-vrd daravrd dara vrd';
            }
        }
        if (text.includes('bortezomib') && text.includes('cyclophosphamide') && text.includes('dexamethasone')) {
            aliases += ' vcd';
        }
        if (text.includes('bortezomib') && text.includes('melphalan') && text.includes('prednisone')) {
            aliases += ' vmp';
        }
        if (text.includes('lenalidomide') && text.includes('dexamethasone')) {
            aliases += ' rd len-dex';
        }
        if (text.includes('pomalidomide') && text.includes('dexamethasone')) {
            aliases += ' pd pom-dex';
        }
        if (text.includes('carfilzomib') && text.includes('lenalidomide') && text.includes('dexamethasone')) {
            aliases += ' krd';
        }
        if (text.includes('carfilzomib') && text.includes('cyclophosphamide') && text.includes('dexamethasone')) {
            aliases += ' kcd';
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
        if (text.includes('daratumumab')) {
            aliases += ' dara';
        }
        if (text.includes('bortezomib')) {
            aliases += ' velcade';
        }
        if (text.includes('lenalidomide')) {
            aliases += ' revlimid len';
        }
        if (text.includes('pomalidomide')) {
            aliases += ' pomalyst pom';
        }
        if (text.includes('carfilzomib')) {
            aliases += ' kyprolis';
        }
        if (text.includes('dexamethasone')) {
            aliases += ' dex';
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
                        searchText: searchText,
                        searchTextNormalized: normalizeSearchString(searchText)
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
                    searchText: searchText,
                    searchTextNormalized: normalizeSearchString(searchText)
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
        ureteric_urethral: 'Ureteric & Urethral Cancer',
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

// Helper function to normalize search strings for better matching
function normalizeSearchString(text) {
    return text.toLowerCase()
        .replace(/[\-\+\(\)\/]/g, ' ')  // Replace common punctuation with spaces
        .replace(/\s+/g, ' ')           // Replace multiple spaces with single space
        .trim();
}

function searchProtocols(query) {
    if (!query || query.length < 2) return [];
    
    const queryLower = query.toLowerCase();
    const queryNormalized = normalizeSearchString(query);
    
    // First try exact/substring matches
    const exactResults = allProtocols.filter(protocol => 
        protocol.searchText.includes(queryLower) || 
        protocol.searchTextNormalized.includes(queryNormalized)
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
        const normalizedScore = fuzzyMatch(queryNormalized, protocol.searchTextNormalized, 0.5);
        const bestScore = Math.max(score, normalizedScore);
        return { protocol, score: bestScore };
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
                const searchText = `${protocol.name} ${drugNames}`.toLowerCase();
                cancerSpecificProtocols.push({
                    key: protocolKey,
                    name: protocol.name,
                    cancerType: cancerType,
                    cancerName: `${cancerName} - ${subtypeName}`,
                    subtype: subtype,
                    searchText: searchText,
                    searchTextNormalized: normalizeSearchString(searchText)
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
                const searchText = `${protocol.name} ${drugNames}`.toLowerCase();
                cancerSpecificProtocols.push({
                    key: protocolKey,
                    name: protocol.name,
                    cancerType: cancerType,
                    cancerName: `${cancerName} - ${subtypeName}`,
                    subtype: subtypeKey,
                    searchText: searchText,
                    searchTextNormalized: normalizeSearchString(searchText)
                });
            });
        });
    } else {
        // Handle other cancer types without subtypes
        Object.keys(protocolDatabase[cancerType]).forEach(protocolKey => {
            const protocol = protocolDatabase[cancerType][protocolKey];
            const drugNames = protocol.drugs ? protocol.drugs.map(drug => drug.name).join(' ') : '';
            const searchText = `${protocol.name} ${drugNames}`.toLowerCase();
            cancerSpecificProtocols.push({
                key: protocolKey,
                name: protocol.name,
                cancerType: cancerType,
                cancerName: cancerName,
                subtype: null,
                searchText: searchText,
                searchTextNormalized: normalizeSearchString(searchText)
            });
        });
    }
    
    console.log(`Cancer-specific index built, total protocols for ${cancerType}:`, cancerSpecificProtocols.length);
}

function searchCancerSpecificProtocols(query) {
    if (!query || query.length < 2) return [];
    
    const queryLower = query.toLowerCase();
    const queryNormalized = normalizeSearchString(query);
    
    // First try exact/substring matches
    const exactResults = cancerSpecificProtocols.filter(protocol => 
        protocol.searchText.includes(queryLower) || 
        protocol.searchTextNormalized.includes(queryNormalized)
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
        const normalizedScore = fuzzyMatch(queryNormalized, protocol.searchTextNormalized, 0.5);
        const bestScore = Math.max(score, normalizedScore);
        return { protocol, score: bestScore };
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
    
    // Helper function to check if drug is non-reducible (Trastuzumab/Pertuzumab/Rituximab/Bevacizumab/Immunotherapy)
    function isImmunotherapyDrug(drugName) {
        const immunotherapyDrugs = [
            // Monoclonal antibodies and targeted IV agents
            'trastuzumab', 
            'pertuzumab',
            'rituximab',
            'bevacizumab',
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
            // RET inhibitors
            'selpercatinib',
            'pralsetinib',
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
                                'rituximab',
                                'bevacizumab',
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
                                // RET inhibitors
                                'selpercatinib',
                                'pralsetinib',
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
    
    // Helper function to check if drug is non-reducible (Trastuzumab/Pertuzumab/Rituximab/Bevacizumab/Immunotherapy)
    function isImmunotherapyDrug(drugName) {
        const immunotherapyDrugs = [
            // Monoclonal antibodies and targeted IV agents
            'trastuzumab', 
            'pertuzumab',
            'rituximab',
            'bevacizumab',
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
            // RET inhibitors
            'selpercatinib',
            'pralsetinib',
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