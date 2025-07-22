// Chemotherapy Protocol Calculator
// BSA calculation using Mosteller's formula: BSA = sqrt((height × weight) / 3600)

const protocolDatabase = {
    breast: {
        'hormone_positive': {
            // Neoadjuvant/Adjuvant Therapy
            'AC-T': {
                name: 'Adriamycin + Cyclophosphamide → Taxol (Neoadjuvant/Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Paclitaxel (Taxol)', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles (after 4 cycles AC)' }
                ]
            },
            'EC-T': {
                name: 'Epirubicin + Cyclophosphamide → Taxol (Neoadjuvant/Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Epirubicin', dose: 90, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles (after 4 cycles EC)' }
                ]
            },
            'TAC': {
                name: 'Docetaxel + Adriamycin + Cyclophosphamide (BCIRG-001) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'TC': {
                name: 'Docetaxel + Cyclophosphamide (USOR-06-090/TAILORx) (Neoadjuvant/Adjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Dose-Dense-AC': {
                name: 'Dose Dense AC (CALGB-9741) (Neoadjuvant/Adjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'every 2 weeks' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'every 2 weeks' }
                ]
            },
            'Dose-Dense-Paclitaxel': {
                name: 'Dose Dense Paclitaxel (Neoadjuvant/Adjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'every 2 weeks' }
                ]
            },
            'FEC-T': {
                name: 'FEC → Docetaxel (Neoadjuvant/Adjuvant)',
                cycles: 9,
                drugs: [
                    { name: '5-Fluorouracil', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days x 3 cycles' },
                    { name: 'Epirubicin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days x 3 cycles' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days x 3 cycles' },
                    { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days x 3 cycles (after 3 cycles FEC)' }
                ]
            },
            'CAF': {
                name: 'Cyclophosphamide + Adriamycin + 5-Fluorouracil (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: '5-Fluorouracil', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'CMF': {
                name: 'Cyclophosphamide + Methotrexate + 5-Fluorouracil (Neoadjuvant/Adjuvant)',
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
                name: 'Olaparib (OlympiA) (Adjuvant - germline BRCA1/2 mutation)',
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
                    { name: 'Tamoxifen', dose: 20, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            'Ribociclib-AI-Adjuvant': {
                name: 'Ribociclib + Aromatase Inhibitor (NATALEE) (Adjuvant - high-risk early breast cancer)',
                cycles: 36,
                drugs: [
                    { name: 'Ribociclib', dose: 400, unit: 'mg', schedule: 'PO daily, D1-21, every 28 days x 3 years' },
                    { name: 'Anastrozole', dose: 1, unit: 'mg', schedule: 'PO daily x 3 years' }
                ]
            },
            'Ribociclib-Letrozole-Adjuvant': {
                name: 'Ribociclib + Letrozole (NATALEE) (Adjuvant - high-risk early breast cancer)',
                cycles: 36,
                drugs: [
                    { name: 'Ribociclib', dose: 400, unit: 'mg', schedule: 'PO daily, D1-21, every 28 days x 3 years' },
                    { name: 'Letrozole', dose: 2.5, unit: 'mg', schedule: 'PO daily x 3 years' }
                ]
            },
            'Paclitaxel-Weekly-Adjuvant': {
                name: 'Paclitaxel weekly (Adjuvant)',
                cycles: 12,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, weekly x 12 weeks' }
                ]
            },
            // Hormone Therapy (Adjuvant/Metastatic)
            'Tamoxifen': {
                name: 'Tamoxifen (Adjuvant/Metastatic)',
                cycles: 60,
                drugs: [
                    { name: 'Tamoxifen', dose: 20, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            'Anastrozole': {
                name: 'Anastrozole (Adjuvant/Metastatic)',
                cycles: 60,
                drugs: [
                    { name: 'Anastrozole', dose: 1, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            'Letrozole': {
                name: 'Letrozole (Adjuvant/Metastatic)',
                cycles: 60,
                drugs: [
                    { name: 'Letrozole', dose: 2.5, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            'Tamoxifen-Exemestane': {
                name: 'Tamoxifen → Exemestane (Adjuvant)',
                cycles: 60,
                drugs: [
                    { name: 'Tamoxifen', dose: 20, unit: 'mg', schedule: 'PO daily for 2-3 years' },
                    { name: 'Exemestane', dose: 25, unit: 'mg', schedule: 'PO daily for remaining 5 years' }
                ]
            },
            'Tamoxifen-Goserelin': {
                name: 'Tamoxifen + Goserelin (Premenopausal)',
                cycles: 60,
                drugs: [
                    { name: 'Tamoxifen', dose: 20, unit: 'mg', schedule: 'PO daily' },
                    { name: 'Goserelin', dose: 3.6, unit: 'mg', schedule: 'SC every 28 days' }
                ]
            },
            'Anastrozole-Goserelin': {
                name: 'Anastrozole + Goserelin (Premenopausal)',
                cycles: 60,
                drugs: [
                    { name: 'Anastrozole', dose: 1, unit: 'mg', schedule: 'PO daily' },
                    { name: 'Goserelin', dose: 3.6, unit: 'mg', schedule: 'SC every 28 days' }
                ]
            },
            // Metastatic - 1L Therapy
            'Palbociclib-Letrozole': {
                name: 'Palbociclib + Letrozole (PALOMA-1/2) (Metastatic - 1L)',
                cycles: 12,
                drugs: [
                    { name: 'Palbociclib', dose: 125, unit: 'mg', schedule: 'PO daily for 21 days, then 7 days off' },
                    { name: 'Letrozole', dose: 2.5, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            'Ribociclib-Letrozole': {
                name: 'Ribociclib + Letrozole (MONALEESA-2) (Metastatic - 1L)',
                cycles: 12,
                drugs: [
                    { name: 'Ribociclib', dose: 600, unit: 'mg', schedule: 'PO daily for 21 days, then 7 days off' },
                    { name: 'Letrozole', dose: 2.5, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            'Abemaciclib-Letrozole': {
                name: 'Abemaciclib + Letrozole (MONARCH-3) (Metastatic - 1L)',
                cycles: 12,
                drugs: [
                    { name: 'Abemaciclib', dose: 150, unit: 'mg', schedule: 'PO twice daily' },
                    { name: 'Letrozole', dose: 2.5, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            // Metastatic+ Therapy
            'Palbociclib-Fulvestrant': {
                name: 'Palbociclib + Fulvestrant (PALOMA-3) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Palbociclib', dose: 125, unit: 'mg', schedule: 'PO daily for 21 days, then 7 days off' },
                    { name: 'Fulvestrant', dose: 500, unit: 'mg', schedule: 'IM monthly' }
                ]
            },
            'Ribociclib-Fulvestrant': {
                name: 'Ribociclib + Fulvestrant (MONALEESA-3) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Ribociclib', dose: 600, unit: 'mg', schedule: 'PO daily for 21 days, then 7 days off' },
                    { name: 'Fulvestrant', dose: 500, unit: 'mg', schedule: 'IM monthly' }
                ]
            },
            'Abemaciclib-Fulvestrant': {
                name: 'Abemaciclib + Fulvestrant (MONARCH-2) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Abemaciclib', dose: 150, unit: 'mg', schedule: 'PO twice daily' },
                    { name: 'Fulvestrant', dose: 500, unit: 'mg', schedule: 'IM monthly' }
                ]
            },
            'Everolimus-Exemestane': {
                name: 'Everolimus + Exemestane (BOLERO-2) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'PO daily' },
                    { name: 'Exemestane', dose: 25, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            'Alpelisib-Fulvestrant': {
                name: 'Alpelisib + Fulvestrant (SOLAR-1) (PIK3CA mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Alpelisib', dose: 300, unit: 'mg', schedule: 'PO daily' },
                    { name: 'Fulvestrant', dose: 500, unit: 'mg', schedule: 'IM monthly' }
                ]
            },
            'Elacestrant': {
                name: 'Elacestrant (EMERALD) (ESR1 mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Elacestrant', dose: 345, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            'Inavolisib-Palbociclib-Fulvestrant': {
                name: 'Inavolisib + Palbociclib + Fulvestrant (INAVO120) (PIK3CA mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Inavolisib', dose: 9, unit: 'mg', schedule: 'PO daily' },
                    { name: 'Palbociclib', dose: 125, unit: 'mg', schedule: 'PO daily for 21 days, then 7 days off' },
                    { name: 'Fulvestrant', dose: 500, unit: 'mg', schedule: 'IM monthly' }
                ]
            },
            'Capivasertib-Fulvestrant': {
                name: 'Capivasertib + Fulvestrant (CAPItello-291) (AKT1/PIK3CA/PTEN alteration)',
                cycles: 12,
                drugs: [
                    { name: 'Capivasertib', dose: 400, unit: 'mg', schedule: 'PO twice daily for 4 days, then 3 days off' },
                    { name: 'Fulvestrant', dose: 500, unit: 'mg', schedule: 'IM monthly' }
                ]
            },
            'Camizestrant-Palbociclib': {
                name: 'Camizestrant + Palbociclib (ESR1 mutation detected during 1L treatment)',
                cycles: 12,
                drugs: [
                    { name: 'Camizestrant', dose: 75, unit: 'mg', schedule: 'PO daily' },
                    { name: 'Palbociclib', dose: 125, unit: 'mg', schedule: 'PO daily, D1-21, every 28 days' }
                ]
            },
            'Camizestrant-Ribociclib': {
                name: 'Camizestrant + Ribociclib (ESR1 mutation detected during 1L treatment)',
                cycles: 12,
                drugs: [
                    { name: 'Camizestrant', dose: 75, unit: 'mg', schedule: 'PO daily' },
                    { name: 'Ribociclib', dose: 600, unit: 'mg', schedule: 'PO daily, D1-21, every 28 days' }
                ]
            },
            'Camizestrant-Abemaciclib': {
                name: 'Camizestrant + Abemaciclib (ESR1 mutation detected during 1L treatment)',
                cycles: 12,
                drugs: [
                    { name: 'Camizestrant', dose: 75, unit: 'mg', schedule: 'PO daily' },
                    { name: 'Abemaciclib', dose: 150, unit: 'mg', schedule: 'PO twice daily' }
                ]
            },
            // Chemotherapy for Metastatic Disease
            'Paclitaxel-Carboplatin-3weekly': {
                name: 'Paclitaxel + Carboplatin (3-weekly) (Metastatic)',
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
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'weekly' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly' }
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
                name: 'Paclitaxel + Carboplatin (weekly) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly' }
                ]
            },
            'Capecitabine-Docetaxel': {
                name: 'Capecitabine + Docetaxel (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily, days 1-14, every 21 days' },
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Capecitabine-Paclitaxel': {
                name: 'Capecitabine + Paclitaxel (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily, days 1-14, every 21 days' },
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Single-Paclitaxel-3weekly': {
                name: 'Single agent Paclitaxel 3-weekly (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Single-Paclitaxel-weekly': {
                name: 'Single agent Paclitaxel weekly (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly' }
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
                name: 'Single agent Capecitabine (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily, days 1-14, every 21 days' }
                ]
            }
        },
        'triple_negative': {
            // Neoadjuvant Therapy
            'Paclitaxel-Carboplatin-Pembrolizumab': {
                name: 'Paclitaxel + Carboplatin + Pembrolizumab (Neoadjuvant - KEYNOTE-522)',
                cycles: 12,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly' },
                    { name: 'Carboplatin', dose: 'AUC 1.5-2', unit: 'AUC', schedule: 'weekly' },
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
                ]
            },
            'AC-Pembrolizumab': {
                name: 'Adriamycin + Cyclophosphamide + Pembrolizumab (Neoadjuvant - KEYNOTE-522)',
                cycles: 4,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
                ]
            },
            'Pembrolizumab-Maintenance': {
                name: 'Pembrolizumab Maintenance (Adjuvant - KEYNOTE-522)',
                cycles: 9,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
                ]
            },
            // Neoadjuvant/Adjuvant Therapy
            'AC-T': {
                name: 'Adriamycin + Cyclophosphamide → Taxol (Neoadjuvant/Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Paclitaxel (Taxol)', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles (after 4 cycles AC)' }
                ]
            },
            'TAC': {
                name: 'Docetaxel + Adriamycin + Cyclophosphamide (BCIRG-001) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Dose-Dense-AC': {
                name: 'Dose Dense AC (CALGB-9741) (Neoadjuvant/Adjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'every 2 weeks' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'every 2 weeks' }
                ]
            },
            'Dose-Dense-Paclitaxel': {
                name: 'Dose Dense Paclitaxel (Neoadjuvant/Adjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'every 2 weeks' }
                ]
            },
            'TC': {
                name: 'Docetaxel + Cyclophosphamide (Neoadjuvant/Adjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'EC-T': {
                name: 'Epirubicin + Cyclophosphamide → Docetaxel (Neoadjuvant/Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Epirubicin', dose: 90, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles (after 4 cycles EC)' }
                ]
            },
            'FEC-T': {
                name: 'FEC → Docetaxel (Neoadjuvant/Adjuvant)',
                cycles: 9,
                drugs: [
                    { name: '5-Fluorouracil', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days x 3 cycles' },
                    { name: 'Epirubicin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days x 3 cycles' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days x 3 cycles' },
                    { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days x 3 cycles (after 3 cycles FEC)' }
                ]
            },
            'CAF': {
                name: 'Cyclophosphamide + Adriamycin + 5-Fluorouracil (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: '5-Fluorouracil', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'CMF': {
                name: 'Cyclophosphamide + Methotrexate + 5-Fluorouracil (Neoadjuvant/Adjuvant)',
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
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, weekly x 12 weeks' }
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
                    { name: 'Talazoparib', dose: 1, unit: 'mg', schedule: 'PO daily' }
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
                name: 'Paclitaxel + Carboplatin (3-weekly) (Metastatic - 1L)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Paclitaxel-Carboplatin-weekly': {
                name: 'Paclitaxel + Carboplatin (weekly) (Metastatic - 1L)',
                cycles: 12,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin-3weekly': {
                name: 'Nab-paclitaxel + Carboplatin (3-weekly) (Metastatic - 1L)',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 260, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin-weekly': {
                name: 'Nab-paclitaxel + Carboplatin (weekly) (Metastatic - 1L)',
                cycles: 12,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'weekly' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly' }
                ]
            },
            'Gemcitabine-Carboplatin': {
                name: 'Gemcitabine + Carboplatin (Metastatic - 1L)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Carboplatin-Docetaxel': {
                name: 'Carboplatin + Docetaxel (Metastatic - 1L)',
                cycles: 6,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Paclitaxel-Bevacizumab': {
                name: 'Paclitaxel + Bevacizumab (E2100) (Metastatic - 1L)',
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
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily, D1-D14, every 21 days' },
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Capecitabine-Paclitaxel': {
                name: 'Capecitabine + Paclitaxel (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily, D1-D14, every 21 days' },
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Capecitabine-Navelbine': {
                name: 'Capecitabine + Vinorelbine (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily, D1-D14, every 21 days' },
                    { name: 'Vinorelbine (Navelbine)', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Capecitabine-Ixabepilone': {
                name: 'Capecitabine + Ixabepilone (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily, D1-D14, every 21 days' },
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
                    { name: 'Gemcitabine', dose: 1250, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Gemcitabine-Capecitabine': {
                name: 'Gemcitabine + Capecitabine (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Capecitabine', dose: 1500, unit: 'mg', schedule: 'PO twice daily, D1-D14, every 21 days' }
                ]
            },
            // Single Agent Therapies
            'Single-Paclitaxel-3weekly': {
                name: 'Single agent Paclitaxel (3-weekly) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Single-Paclitaxel-weekly': {
                name: 'Single agent Paclitaxel (weekly) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly' }
                ]
            },
            'Single-Nab-Paclitaxel-3weekly': {
                name: 'Single agent Nab-paclitaxel (3-weekly) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 260, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Single-Nab-Paclitaxel-weekly': {
                name: 'Single agent Nab-paclitaxel (weekly) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'weekly' }
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
                name: 'Single agent Capecitabine (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily, days 1-14, every 21 days' }
                ]
            },
            'Single-Vinorelbine': {
                name: 'Single agent Vinorelbine (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Vinorelbine', dose: 30, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Eribulin': {
                name: 'Single agent Eribulin (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Eribulin', dose: 1.4, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            }
        },
        'her2_positive': {
            // Neoadjuvant/Adjuvant Therapy
            'TCHP': {
                name: 'Docetaxel + Carboplatin + Trastuzumab + Pertuzumab (KATHERINE/PHERGain) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                    { name: 'Pertuzumab', dose: 840, maintenanceDose: 420, unit: 'mg', schedule: 'D1, 840 mg loading dose, then 420 mg every 21 days', hasLoadingDose: true }
                ]
            },
            'TCH': {
                name: 'Docetaxel + Carboplatin + Trastuzumab (BCIRG-006) (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true }
                ]
            },
            'THP': {
                name: 'Docetaxel + Trastuzumab + Pertuzumab (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                    { name: 'Pertuzumab', dose: 840, maintenanceDose: 420, unit: 'mg', schedule: 'D1, 840 mg loading dose, then 420 mg every 21 days', hasLoadingDose: true }
                ]
            },
            'PCHP': {
                name: 'Paclitaxel + Carboplatin + Trastuzumab + Pertuzumab (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                    { name: 'Pertuzumab', dose: 840, maintenanceDose: 420, unit: 'mg', schedule: 'D1, 840 mg loading dose, then 420 mg every 21 days', hasLoadingDose: true }
                ]
            },
            'PCH': {
                name: 'Paclitaxel + Carboplatin + Trastuzumab (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true }
                ]
            },
            'PHP': {
                name: 'Paclitaxel + Trastuzumab + Pertuzumab (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                    { name: 'Pertuzumab', dose: 840, maintenanceDose: 420, unit: 'mg', schedule: 'D1, 840 mg loading dose, then 420 mg every 21 days', hasLoadingDose: true }
                ]
            },
            'AC-TH': {
                name: 'AC → Paclitaxel + Trastuzumab (NSABP-B31/N9831) (Neoadjuvant/Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles (after 4 cycles AC)' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true }
                ]
            },
            'Dose-Dense-AC': {
                name: 'Dose Dense AC (CALGB-9741) (Neoadjuvant/Adjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 2 weeks' }
                ]
            },
            'Dose-Dense-Paclitaxel-Trastuzumab': {
                name: 'Dose Dense Paclitaxel + Trastuzumab (CALGB-9741) (Neoadjuvant/Adjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 2 weeks', hasLoadingDose: true }
                ]
            },
            'TC': {
                name: 'Docetaxel + Cyclophosphamide (Neoadjuvant/Adjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'FEC': {
                name: '5-Fluorouracil + Epirubicin + Cyclophosphamide (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: '5-Fluorouracil', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Epirubicin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'CAF': {
                name: 'Cyclophosphamide + Adriamycin + 5-Fluorouracil (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: '5-Fluorouracil', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'CMF': {
                name: 'Cyclophosphamide + Methotrexate + 5-Fluorouracil (Neoadjuvant/Adjuvant)',
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
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days for 1 year', hasLoadingDose: true }
                ]
            },
            'Paclitaxel-Weekly-Adjuvant': {
                name: 'Paclitaxel weekly (Adjuvant)',
                cycles: 12,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, weekly x 12 weeks' }
                ]
            },
            'EC-T': {
                name: 'Epirubicin + Cyclophosphamide → Docetaxel (Neoadjuvant/Adjuvant)',
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
                name: 'Trastuzumab deruxtecan (Metastatic / DESTINY-Breast03)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'TDxd-DESTINY-Breast02': {
                name: 'Trastuzumab deruxtecan (Metastatic - 3L+ / DESTINY-Breast02)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'Trastuzumab-Paclitaxel': {
                name: 'Trastuzumab + Paclitaxel (Metastatic - 1L)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Trastuzumab-Docetaxel': {
                name: 'Trastuzumab + Docetaxel (CLEOPATRA/M77001) (Metastatic - 1L)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                    { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Paclitaxel-Carboplatin-3weekly': {
                name: 'Paclitaxel + Carboplatin (3 weekly) (Metastatic - 1L)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Paclitaxel-Carboplatin-weekly': {
                name: 'Paclitaxel + Carboplatin (weekly) (Metastatic - 1L)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, D8, D15, every 28 days' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin-3weekly': {
                name: 'Nab-paclitaxel + Carboplatin (3 weekly) (Metastatic - 1L)',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 260, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin-weekly': {
                name: 'Nab-paclitaxel + Carboplatin (weekly) (Metastatic - 1L)',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, D8, D15, every 28 days' }
                ]
            },
            'Gemcitabine-Carboplatin': {
                name: 'Gemcitabine + Carboplatin (Metastatic - 1L)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Gemcitabine-Carboplatin-Trastuzumab': {
                name: 'Gemcitabine + Carboplatin + Trastuzumab (Metastatic - 1L)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, D8, every 21 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true }
                ]
            },
            'Trastuzumab-Lapatinib': {
                name: 'Trastuzumab + Lapatinib (EGF104900) (Metastatic - 1L)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                    { name: 'Lapatinib', dose: 1000, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            'Capecitabine-Lapatinib': {
                name: 'Capecitabine + Lapatinib (EGF100151) (Metastatic - 1L)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily, D1-14, every 21 days' },
                    { name: 'Lapatinib', dose: 1250, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            'Trastuzumab-Navelbine': {
                name: 'Trastuzumab + Navelbine (Metastatic - 1L)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab', dose: 4, maintenanceDose: 2, unit: 'mg/kg', schedule: 'D1, 4 mg/kg loading dose, then 2 mg/kg weekly', hasLoadingDose: true },
                    { name: 'Vinorelbine (Navelbine)', dose: 25, unit: 'mg/m²', schedule: 'D1, weekly' }
                ]
            },
            'Trastuzumab-Capecitabine': {
                name: 'Trastuzumab + Capecitabine (Metastatic - 1L)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily, D1-14, every 21 days' }
                ]
            },
            'CHP': {
                name: 'Paclitaxel + Cyclophosphamide + Trastuzumab (Metastatic - 1L)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true }
                ]
            },
            'CH': {
                name: 'Paclitaxel + Trastuzumab (Metastatic - 1L)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true }
                ]
            },
            
            // Metastatic
            'Tucatinib-Trastuzumab-Capecitabine': {
                name: 'Tucatinib + Trastuzumab + Capecitabine (HER2CLIMB) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Tucatinib', dose: 300, unit: 'mg', schedule: 'PO twice daily' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily, D1-14, every 21 days' }
                ]
            },
            'Capecitabine-Neratinib': {
                name: 'Capecitabine + Neratinib (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 750, unit: 'mg/m²', schedule: 'PO twice daily, D1-14, every 21 days' },
                    { name: 'Neratinib', dose: 240, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            'Margetuximab-Capecitabine': {
                name: 'Margetuximab + Capecitabine (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Margetuximab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily, D1-14, every 21 days' }
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
                name: 'Single agent Neratinib (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Neratinib', dose: 240, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            'Single-Capecitabine': {
                name: 'Single agent Capecitabine (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily, D1-14, every 21 days' }
                ]
            },
            'Single-Docetaxel': {
                name: 'Single agent Docetaxel (Metastatic)',
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
                name: 'Trastuzumab deruxtecan (Metastatic / DESTINY-Breast06)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            
            // Post-chemotherapy (DESTINY-Breast04)  
            'TDxd-DESTINY-Breast04': {
                name: 'Trastuzumab deruxtecan (Metastatic / DESTINY-Breast04)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            }
        }
    },
    gastric: {
        // NEOADJUVANT/PERIOPERATIVE THERAPY
        'FLOT4-Perioperative': {
            name: 'FLOT4 (Perioperative) - Docetaxel + Oxaliplatin + Leucovorin + 5-FU',
            cycles: 8,
            drugs: [
                { name: 'Docetaxel', dose: 50, unit: 'mg/m²', schedule: 'D1, every 2 weeks (4 cycles preoperative + 4 cycles postoperative)' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks (4 cycles preoperative + 4 cycles postoperative)' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, every 2 weeks (4 cycles preoperative + 4 cycles postoperative)' },
                { name: '5-Fluorouracil', dose: 2600, unit: 'mg/m²', schedule: 'D1, CI over 24 hours, every 2 weeks (4 cycles preoperative + 4 cycles postoperative)' }
            ]
        },
        'ECF-Neoadjuvant': {
            name: 'ECF (Neoadjuvant) - Epirubicin + Cisplatin + 5-FU',
            cycles: 3,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 200, unit: 'mg/m²', schedule: 'D1-D21, CI over 21 days, every 21 days' }
            ]
        },
        'DCF-Neoadjuvant': {
            name: 'DCF (Neoadjuvant) - Docetaxel + Cisplatin + 5-FU',
            cycles: 3,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 750, unit: 'mg/m²', schedule: 'D1-D5, CI over 5 days, every 21 days' }
            ]
        },
        'mFOLFOX6': {
            name: 'mFOLFOX6 (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'D1, bolus, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'D1-D2, CI over 46 hours, every 2 weeks' }
            ]
        },
        'CAPEOX': {
            name: 'CAPEOX (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1-D14, twice daily, every 21 days' }
            ]
        },
        'Capecitabine-Adjuvant': {
            name: 'Capecitabine (Adjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'D1-D14, twice daily, every 21 days' }
            ]
        },
        '5FU-LV-Adjuvant': {
            name: '5-FU + Leucovorin (Adjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Leucovorin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5, every 28 days' },
                { name: '5-Fluorouracil', dose: 425, unit: 'mg/m²', schedule: 'D1-D5, every 28 days' }
            ]
        },

        // METASTATIC THERAPY
        'Nivolumab-Ipilimumab-MSI-1L': {
            name: 'Nivolumab + Ipilimumab (Metastatic - 1L, MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 2 weeks x 4, then 480mg flat dose every 28 days' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 6 weeks x 4 doses' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab (Metastatic d-MMR/MSI-H/PD-L1 CPS ≥1)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Pembrolizumab-5FU-Cisplatin-1L': {
            name: 'Pembrolizumab + 5-FU + Cisplatin (Metastatic - 1L, PD-L1 CPS≥1)',
            cycles: 6,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 800, unit: 'mg/m²', schedule: 'D1-D5, CI over 5 days, every 21 days' }
            ]
        },
        '5FU-Oxaliplatin-Tislelizumab': {
            name: '5-FU + Oxaliplatin + Tislelizumab',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'D1, bolus, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 1200, unit: 'mg/m²', schedule: 'D1-D2, CI over 46 hours, every 2 weeks' },
                { name: 'Tislelizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        '5FU-Oxaliplatin-Zolbetuximab': {
            name: '5-FU + Oxaliplatin + Zolbetuximab (CLDN18.2+)',
            cycles: 12,
            drugs: [
                { name: 'Zolbetuximab', dose: 800, unit: 'mg/m²', schedule: 'D1, cycle 1, then 600 mg/m² every 21 days' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'D1, bolus, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 1200, unit: 'mg/m²', schedule: 'D1-D2, CI over 46 hours, every 2 weeks' }
            ]
        },
        'Trastuzumab-Pertuzumab-HER2-1L': {
            name: 'Trastuzumab + Pertuzumab (Metastatic - 1L, HER2+)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg every 21 days', hasLoadingDose: true },
                { name: 'Pertuzumab', dose: 840, maintenanceDose: 420, unit: 'mg', schedule: 'loading dose D1, then 420 mg every 21 days', hasLoadingDose: true }
            ]
        },
        'XP-Trastuzumab-HER2-1L': {
            name: 'XP + Trastuzumab (Metastatic - 1L, HER2+)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1-D14, twice daily, every 21 days' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg every 21 days', hasLoadingDose: true }
            ]
        },
        '5FU-Oxaliplatin-Trastuzumab': {
            name: '5-FU + Oxaliplatin + Trastuzumab (Metastatic, HER2+)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'D1, bolus, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 1200, unit: 'mg/m²', schedule: 'D1-D2, CI over 46 hours, every 2 weeks' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg every 21 days', hasLoadingDose: true }
            ]
        },
        '5FU-Oxaliplatin-Trastuzumab-Pembrolizumab': {
            name: '5-FU + Oxaliplatin + Trastuzumab + Pembrolizumab (Metastatic, HER2+ and PD-L1 CPS >1)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'D1, bolus, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 1200, unit: 'mg/m²', schedule: 'D1-D2, CI over 46 hours, every 2 weeks' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg every 21 days', hasLoadingDose: true },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        '5FU-Cisplatin-Trastuzumab': {
            name: '5-FU + Cisplatin + Trastuzumab (Metastatic, HER2+)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 800, unit: 'mg/m²', schedule: 'D1-D5, CI over 5 days, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg every 21 days', hasLoadingDose: true }
            ]
        },
        '5FU-Cisplatin-Trastuzumab-Pembrolizumab': {
            name: '5-FU + Cisplatin + Trastuzumab + Pembrolizumab (Metastatic, HER2+ and PD-L1 CPS >1)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 800, unit: 'mg/m²', schedule: 'D1-D5, CI over 5 days, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg every 21 days', hasLoadingDose: true },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'ECX-1L': {
            name: 'ECX (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1-D14, twice daily, every 21 days' }
            ]
        },
        'EOX-1L': {
            name: 'EOX (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1-D14, twice daily, every 21 days' }
            ]
        },
        'DCF-1L': {
            name: 'DCF (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 750, unit: 'mg/m²', schedule: 'D1-D5, CI over 5 days, every 21 days' }
            ]
        },
        'FLO-1L': {
            name: 'FLO (Metastatic - 1L)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 2600, unit: 'mg/m²', schedule: 'D1, CI over 24 hours, every 2 weeks' }
            ]
        },
        '5FU-Oxaliplatin-Nivolumab': {
            name: '5-FU + Oxaliplatin + Nivolumab (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'D1, bolus, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 1200, unit: 'mg/m²', schedule: 'D1-D2, CI over 46 hours, every 2 weeks' },
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 2 weeks or 480mg every 28 days' }
            ]
        },
        '5FU-Oxaliplatin-Pembrolizumab': {
            name: '5-FU + Oxaliplatin + Pembrolizumab (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'D1, bolus, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 1200, unit: 'mg/m²', schedule: 'D1-D2, CI over 46 hours, every 2 weeks' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        '5FU-Cisplatin-Pembrolizumab': {
            name: '5-FU + Cisplatin + Pembrolizumab (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 800, unit: 'mg/m²', schedule: 'D1-D5, CI over 5 days, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        '5FU-Cisplatin-Tislelizumab': {
            name: '5-FU + Cisplatin + Tislelizumab (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 800, unit: 'mg/m²', schedule: 'D1-D5, CI over 5 days, every 21 days' },
                { name: 'Tislelizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        // CAPECITABINE-BASED COMBINATIONS
        'Capecitabine-Oxaliplatin-Trastuzumab': {
            name: 'Capecitabine + Oxaliplatin + Trastuzumab (Metastatic, HER2+)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1-D14, twice daily, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg every 21 days', hasLoadingDose: true }
            ]
        },
        'Capecitabine-Oxaliplatin-Trastuzumab-Pembrolizumab': {
            name: 'Capecitabine + Oxaliplatin + Trastuzumab + Pembrolizumab (Metastatic, HER2+ and PD-L1 CPS >1)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1-D14, twice daily, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg every 21 days', hasLoadingDose: true },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Capecitabine-Cisplatin-Trastuzumab': {
            name: 'Capecitabine + Cisplatin + Trastuzumab (Metastatic, HER2+)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1-D14, twice daily, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg every 21 days', hasLoadingDose: true }
            ]
        },
        'Capecitabine-Cisplatin-Trastuzumab-Pembrolizumab': {
            name: 'Capecitabine + Cisplatin + Trastuzumab + Pembrolizumab (Metastatic, HER2+ and PD-L1 CPS >1)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1-D14, twice daily, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg every 21 days', hasLoadingDose: true },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Capecitabine-Oxaliplatin-Nivolumab': {
            name: 'Capecitabine + Oxaliplatin + Nivolumab (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1-D14, twice daily, every 21 days' },
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 2 weeks or 480mg every 28 days' }
            ]
        },
        'Capecitabine-Oxaliplatin-Pembrolizumab': {
            name: 'Capecitabine + Oxaliplatin + Pembrolizumab (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1-D14, twice daily, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Capecitabine-Oxaliplatin-Tislelizumab': {
            name: 'Capecitabine + Oxaliplatin + Tislelizumab (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1-D14, twice daily, every 21 days' },
                { name: 'Tislelizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Capecitabine-Oxaliplatin-Zolbetuximab': {
            name: 'Capecitabine + Oxaliplatin + Zolbetuximab (Metastatic, CLDN18.2+)',
            cycles: 8,
            drugs: [
                { name: 'Zolbetuximab', dose: 800, unit: 'mg/m²', schedule: 'D1, cycle 1, then 600 mg/m² every 21 days' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1-D14, twice daily, every 21 days' }
            ]
        },
        'Capecitabine-Cisplatin-Pembrolizumab': {
            name: 'Capecitabine + Cisplatin + Pembrolizumab (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1-D14, twice daily, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Capecitabine-Cisplatin-Tislelizumab': {
            name: 'Capecitabine + Cisplatin + Tislelizumab (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1-D14, twice daily, every 21 days' },
                { name: 'Tislelizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Atezolizumab-Trastuzumab-XELOX': {
            name: 'Atezolizumab + Trastuzumab + XELOX (Perioperative/Metastatic, HER2+)',
            cycles: 8,
            drugs: [
                { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg every 21 days', hasLoadingDose: true },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1-D14, twice daily, every 21 days' }
            ]
        },
        'Durvalumab-FLOT-MATTERHORN': {
            name: 'Durvalumab + FLOT (Perioperative - MATTERHORN)',
            cycles: 8,
            drugs: [
                { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 2 weeks (4 cycles preoperative + 4 cycles postoperative)' },
                { name: 'Docetaxel', dose: 50, unit: 'mg/m²', schedule: 'D1, every 2 weeks (4 cycles preoperative + 4 cycles postoperative)' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks (4 cycles preoperative + 4 cycles postoperative)' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, every 2 weeks (4 cycles preoperative + 4 cycles postoperative)' },
                { name: '5-Fluorouracil', dose: 2600, unit: 'mg/m²', schedule: 'D1, CI over 24 hours, every 2 weeks (4 cycles preoperative + 4 cycles postoperative)' }
            ]
        },

        // METASTATIC THERAPY
        'Paclitaxel-Ramucirumab-2L': {
            name: 'Paclitaxel + Ramucirumab (RAINBOW) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'D1, D15, every 28 days' }
            ]
        },
        'FOLFIRI-Ramucirumab-2L': {
            name: 'FOLFIRI + Ramucirumab (RAINBOW) (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'D1, bolus, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'D1-D2, CI over 46 hours, every 2 weeks' },
                { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'D1, every 2 weeks' }
            ]
        },
        'Irinotecan-Ramucirumab-2L': {
            name: 'Irinotecan + Ramucirumab (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 150, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'D1, every 2 weeks' }
            ]
        },
        'T-DXd-HER2-2L': {
            name: 'Trastuzumab Deruxtecan (T-DXd) (Metastatic, HER2+ DESTINY-Gastric01)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab Deruxtecan', dose: 6.4, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'mFOLFIRI-2L': {
            name: 'mFOLFIRI (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'D1, bolus, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'D1-D2, CI over 46 hours, every 2 weeks' }
            ]
        },
        'Docetaxel-2L': {
            name: 'Docetaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Paclitaxel-2L': {
            name: 'Paclitaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, weekly' }
            ]
        },
        'Irinotecan-2L': {
            name: 'Irinotecan (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Irinotecan', dose: 350, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },

        // METASTATIC - 3L+ THERAPY
        'TAS-102-3L': {
            name: 'Trifluridine/Tipiracil (TAS-102) (Metastatic - 3L+)',
            cycles: 6,
            drugs: [
                { name: 'TAS-102', dose: 35, unit: 'mg/m²', schedule: 'D1-D5, D8-D12, twice daily, every 28 days' }
            ]
        },
        'Ramucirumab-3L': {
            name: 'Ramucirumab (Metastatic - 3L+)',
            cycles: 12,
            drugs: [
                { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'D1, every 2 weeks' }
            ]
        },
        'Nivolumab-3L': {
            name: 'Nivolumab (ATTRACTION-2) (Metastatic - 3L+)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 2 weeks or 480mg every 28 days' }
            ]
        },
        'Dostarlimab-MSI-3L': {
            name: 'Dostarlimab (Metastatic - 3L+, MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'D1, every 21 days x 4, then 1000mg every 6 weeks' }
            ]
        },
        'Capecitabine-Docetaxel-3L': {
            name: 'Capecitabine + Docetaxel (Metastatic - 3L+)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'D1-D14, twice daily, every 21 days' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-3L': {
            name: 'Cisplatin (Metastatic - 3L+)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        '5FU-3L': {
            name: '5-Fluorouracil (Metastatic - 3L+)',
            cycles: 6,
            drugs: [
                { name: '5-Fluorouracil', dose: 2600, unit: 'mg/m²', schedule: 'D1, CI over 24 hours, weekly' }
            ]
        }
    },
    lymphoma: {
        'hodgkins': {
            'ABVD': {
                name: 'ABVD (Adriamycin + Bleomycin + Vinblastine + Dacarbazine)',
                cycles: 6,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 25, unit: 'mg/m²', schedule: 'days 1, 15, every 28 days' },
                    { name: 'Bleomycin', dose: 10, unit: 'units/m²', schedule: 'days 1, 15, every 28 days' },
                    { name: 'Vinblastine', dose: 6, unit: 'mg/m²', schedule: 'days 1, 15, every 28 days' },
                    { name: 'Dacarbazine', dose: 375, unit: 'mg/m²', schedule: 'days 1, 15, every 28 days' }
                ]
            },
            'BrECADD': {
                name: 'BrECADD (Brentuximab + Etoposide + Cyclophosphamide + Adriamycin + Dacarbazine + Dexamethasone)',
                cycles: 6,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'D1-D3, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 650, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 25, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Dacarbazine', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 1-4, every 21 days' }
                ]
            },
            'Nivolumab-AVD': {
                name: 'Nivolumab + AVD (Advanced Stage cHL)',
                cycles: 6,
                drugs: [
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 2 weeks x 12 doses' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 25, unit: 'mg/m²', schedule: 'days 1, 15, every 28 days' },
                    { name: 'Vinblastine', dose: 6, unit: 'mg/m²', schedule: 'days 1, 15, every 28 days' },
                    { name: 'Dacarbazine', dose: 375, unit: 'mg/m²', schedule: 'days 1, 15, every 28 days' }
                ]
            },
            'CHOP': {
                name: 'CHOP (Cyclophosphamide + Hydroxydaunorubicin + Oncovin + Prednisone)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Hydroxydaunorubicin)', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'Rituximab-CHOP-NLPHL': {
                name: 'Rituximab + CHOP (NLPHL - Nodular Lymphocyte Predominant)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Hydroxydaunorubicin)', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
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
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 2 weeks x 16 doses' }
                ]
            },
            'ICE-Nivolumab': {
                name: 'ICE + Nivolumab (Relapsed/Refractory)',
                cycles: 3,
                drugs: [
                    { name: 'Ifosfamide', dose: 5000, unit: 'mg/m²', schedule: 'day 2, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 2, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'D1-D3, every 21 days' },
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 2 weeks x 6 doses' }
                ]
            },
            'ICE-Pembrolizumab': {
                name: 'ICE + Pembrolizumab (Relapsed/Refractory)',
                cycles: 3,
                drugs: [
                    { name: 'Ifosfamide', dose: 5000, unit: 'mg/m²', schedule: 'day 2, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 2, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'D1-D3, every 21 days' },
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
                name: 'ICE + Brentuximab vedotin (Relapsed/Refractory)',
                cycles: 3,
                drugs: [
                    { name: 'Ifosfamide', dose: 5000, unit: 'mg/m²', schedule: 'day 2, every 21 days' },
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
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Oxaliplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 2 weeks' }
                ]
            },
            'Vorinostat-Pembrolizumab': {
                name: 'Vorinostat + Pembrolizumab (Relapsed/Refractory)',
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
                    { name: 'Brentuximab vedotin', dose: 1.2, unit: 'mg/kg', schedule: 'D1, every 2 weeks x 12 doses' },
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
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'days 1, 8, every 28 days (max 2mg)' },
                    { name: 'Procarbazine', dose: 100, unit: 'mg/m²', schedule: 'days 1-14, every 28 days' },
                    { name: 'Prednisone', dose: 40, unit: 'mg/m²', schedule: 'days 1-14, every 28 days' }
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
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'day 8, every 21 days (max 2mg)' },
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
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'day 8, every 21 days (max 2mg)' },
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
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 2 weeks, then 480mg every 28 days' }
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
        'non_hodgkins': {
            'R-CHOP': {
                name: 'R-CHOP (Rituximab + CHOP) - DLBCL',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Hydroxydaunorubicin)', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'Pola-R-CHP': {
                name: 'Polatuzumab vedotin + R-CHP (DLBCL)',
                cycles: 6,
                drugs: [
                    { name: 'Polatuzumab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Hydroxydaunorubicin)', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'R-CVP': {
                name: 'R-CVP (Rituximab + CVP) - Indolent NHL',
                cycles: 8,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'R-Bendamustine': {
                name: 'R-Bendamustine (Rituximab + Bendamustine) - Indolent NHL',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                    { name: 'Bendamustine', dose: 90, unit: 'mg/m²', days: 'D1-D2', schedule: 'days 1-2, every 28 days' }
                ]
            },
            'Obinutuzumab-Bendamustine': {
                name: 'Obinutuzumab + Bendamustine (Indolent NHL)',
                cycles: 6,
                drugs: [
                    { name: 'Obinutuzumab', dose: 1000, unit: 'mg', schedule: 'cycle 1: days 1,8,15; then D1, every 28 days' },
                    { name: 'Bendamustine', dose: 90, unit: 'mg/m²', days: 'D1-D2', schedule: 'days 1-2, every 28 days' }
                ]
            },
            'FCR': {
                name: 'FCR (Fludarabine + Cyclophosphamide + Rituximab) - CLL',
                cycles: 6,
                drugs: [
                    { name: 'Fludarabine', dose: 25, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 28 days' },
                    { name: 'Cyclophosphamide', dose: 250, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 28 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 28 days' }
                ]
            },
            'Venetoclax-Obinutuzumab': {
                name: 'Venetoclax + Obinutuzumab (CLL)',
                cycles: 12,
                drugs: [
                    { name: 'Venetoclax', dose: 400, unit: 'mg', schedule: 'daily (after ramp-up: 20→50→100→200→400mg)' },
                    { name: 'Obinutuzumab', dose: 1000, unit: 'mg', schedule: 'cycle 1: days 1,8,15; then D1, every 28 days' }
                ]
            },
            'R-EPOCH': {
                name: 'R-EPOCH (High-grade B-cell, HIV-associated, PMBCL)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 50, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, every 21 days' },
                    { name: 'Prednisone', dose: 60, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Vincristine (Oncovin)', dose: 0.4, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'day 5, every 21 days' },
                    { name: 'Doxorubicin (Hydroxydaunorubicin)', dose: 10, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, every 21 days' }
                ]
            },
            'DA-R-EPOCH': {
                name: 'DA-R-EPOCH (Dose-Adjusted R-EPOCH)',
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
                    { name: 'Lenalidomide', dose: 20, unit: 'mg', schedule: 'days 1-21, every 28 days' },
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
                    { name: 'Copanlisib', dose: 60, unit: 'mg', schedule: 'D1, D8, D15, every 28 days' }
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
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 1, 8, 15, 22, q5weeks' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'day 1, q5weeks' },
                    { name: 'Cyclophosphamide', dose: 100, unit: 'mg/m²', schedule: 'days 1-5, q5weeks' }
                ]
            },
            'BDR': {
                name: 'BDR (Bortezomib + Dexamethasone + Rituximab) - WM',
                cycles: 6,
                drugs: [
                    { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'days 1, 4, 8, 11, every 21 days' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 1, 4, 8, 11, every 21 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Bortezomib': {
                name: 'Bortezomib (Proteasome inhibitor - MCL/MM)',
                cycles: 8,
                drugs: [
                    { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'days 1, 4, 8, 11, every 21 days' }
                ]
            },
            'Carfilzomib': {
                name: 'Carfilzomib (Proteasome inhibitor - MM)',
                cycles: 8,
                drugs: [
                    { name: 'Carfilzomib', dose: 27, unit: 'mg/m²', schedule: 'D1-D2, D8-D9, D15-D16, every 28 days' }
                ]
            },
            'FC': {
                name: 'FC (Fludarabine + Cyclophosphamide) - CLL',
                cycles: 6,
                drugs: [
                    { name: 'Fludarabine', dose: 25, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 28 days' },
                    { name: 'Cyclophosphamide', dose: 250, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 28 days' }
                ]
            },
            'R-FCM': {
                name: 'R-FCM (Rituximab + Fludarabine + Cyclophosphamide + Mitoxantrone)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                    { name: 'Fludarabine', dose: 25, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 28 days' },
                    { name: 'Cyclophosphamide', dose: 200, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 28 days' },
                    { name: 'Mitoxantrone', dose: 6, unit: 'mg/m²', schedule: 'D1, every 28 days' }
                ]
            },
            'R-mini-CHOP': {
                name: 'R-mini-CHOP (Elderly/Frail patients)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 400, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 25, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine', dose: 1, unit: 'mg', schedule: 'D1, every 21 days (max 1mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'R-CEPP': {
                name: 'R-CEPP (Rituximab + CEPP)',
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
                name: 'R-CDOP (Rituximab + CDOP)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'R-ICE': {
                name: 'R-ICE (Relapsed/Refractory)',
                cycles: 3,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Ifosfamide', dose: 5000, unit: 'mg/m²', schedule: 'day 2, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 2, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'D1-D3, every 21 days' }
                ]
            },
            'R-DHAP': {
                name: 'R-DHAP (Relapsed/Refractory)',
                cycles: 3,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 1-4, every 21 days' },
                    { name: 'Cytarabine (High-dose)', dose: 2000, unit: 'mg/m²', schedule: 'day 2, q12h x 2 doses, every 21 days' },
                    { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'R-ESHAP': {
                name: 'R-ESHAP (Relapsed/Refractory)',
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
                name: 'R-GDP (Relapsed/Refractory)',
                cycles: 3,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', days: 'D1-D4', schedule: 'days 1-4, every 21 days' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'R-GemOx': {
                name: 'R-GemOx (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Oxaliplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 2 weeks' }
                ]
            },
            'Pola-BR': {
                name: 'Pola-BR (Polatuzumab + Bendamustine + Rituximab) - R/R DLBCL',
                cycles: 6,
                drugs: [
                    { name: 'Polatuzumab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Bendamustine', dose: 90, unit: 'mg/m²', days: 'D1-D2', schedule: 'days 1-2, every 21 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Tafasitamab-Lenalidomide': {
                name: 'Tafasitamab + Lenalidomide (R/R DLBCL)',
                cycles: 12,
                drugs: [
                    { name: 'Tafasitamab', dose: 12, unit: 'mg/kg', schedule: 'days 1, 8, 15, 22 (cycle 1); days 1, 15 (cycles 2-3); day 1 (cycles 4-12)' },
                    { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'days 1-21, every 28 days' }
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
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days, then 400mg every 6 weeks' }
                ]
            },
            'CHOP': {
                name: 'CHOP (T-cell lymphomas)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Hydroxydaunorubicin)', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'CHOEP': {
                name: 'CHOEP (T-cell lymphomas)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Hydroxydaunorubicin)', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'D1-D3, every 21 days' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'CHOP-Brentuximab': {
                name: 'CHOP + Brentuximab vedotin (CD30+ PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Hydroxydaunorubicin)', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'D1-D5, every 21 days' },
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'Brentuximab-CHP': {
                name: 'Brentuximab vedotin + CHP (CD30+ PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Hydroxydaunorubicin)', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'Brentuximab-PTCL': {
                name: 'Brentuximab vedotin (CD30+ PTCL)',
                cycles: 8,
                drugs: [
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'Belinostat': {
                name: 'Belinostat (HDAC inhibitor - PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Belinostat', dose: 1000, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'Romidepsin': {
                name: 'Romidepsin (HDAC inhibitor - PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Romidepsin', dose: 14, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
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
                    { name: 'Alemtuzumab', dose: 30, unit: 'mg', schedule: 'days 1, 3, 5 weekly' }
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
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 2-4, every 21 days' },
                    { name: 'Methotrexate', dose: 2000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Ifosfamide', dose: 1500, unit: 'mg/m²', days: 'D2-D4', schedule: 'days 2-4, every 21 days' },
                    { name: 'L-asparaginase', dose: 6000, unit: 'units/m²', schedule: 'days 8, 10, 12, 14, 16, 18, 20, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D2-D4', schedule: 'days 2-4, every 21 days' }
                ]
            },
            'DDGP': {
                name: 'DDGP (Extranodal NK/T-cell lymphoma)',
                cycles: 6,
                drugs: [
                    { name: 'Cisplatin', dose: 25, unit: 'mg/m²', days: 'D1-D4', schedule: 'days 1-4, every 21 days' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', days: 'D1-D4', schedule: 'days 1-4, every 21 days' },
                    { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Pegaspargase', dose: 2500, unit: 'units/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'P-GEMOX': {
                name: 'P-GEMOX (Extranodal NK/T-cell lymphoma)',
                cycles: 6,
                drugs: [
                    { name: 'Pegaspargase', dose: 2500, unit: 'units/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 2 weeks' }
                ]
            },
            'AspaMetDex': {
                name: 'AspaMetDex (Extranodal NK/T-cell lymphoma)',
                cycles: 6,
                drugs: [
                    { name: 'L-asparaginase', dose: 6000, unit: 'units/m²', schedule: 'days 1, 3, 5, 7, 9, 11, every 21 days' },
                    { name: 'Methotrexate', dose: 3000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'days 1-4, every 21 days' }
                ]
            },
            'Fludarabine': {
                name: 'Fludarabine (Single agent - CLL/FL)',
                cycles: 6,
                drugs: [
                    { name: 'Fludarabine', dose: 25, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 28 days' }
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
                    { name: 'Methotrexate (High-dose)', dose: 3500, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Temozolomide', dose: 150, unit: 'mg/m²', days: 'D1-D7', schedule: 'days 1-7, every 2 weeks' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 2 weeks' }
                ]
            },
            'HD-Methotrexate': {
                name: 'High-dose Methotrexate (PCNSL)',
                cycles: 8,
                drugs: [
                    { name: 'Methotrexate (High-dose)', dose: 3500, unit: 'mg/m²', schedule: 'D1, every 2 weeks' }
                ]
            },
            'Temozolomide': {
                name: 'Temozolomide (PCNSL)',
                cycles: 6,
                drugs: [
                    { name: 'Temozolomide', dose: 150, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 28 days' }
                ]
            },
            'Topotecan-NHL': {
                name: 'Topotecan (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', days: 'D1-D5', schedule: 'D1-D5, every 21 days' }
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
                    { name: 'Loncastuximab tesirine', dose: 150, unit: 'mcg/kg', schedule: 'D1, every 21 days, then 75 mcg/kg every 21 days' }
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
                { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'BID continuously' },
                { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'daily continuously' }
            ]
        },
        'Vemurafenib-Cobimetinib': {
            name: 'Vemurafenib + Cobimetinib (coBRIM) - BRAF V600E/K - Metastatic',
            cycles: 12,
            drugs: [
                { name: 'Vemurafenib', dose: 960, unit: 'mg', schedule: 'BID continuously' },
                { name: 'Cobimetinib', dose: 60, unit: 'mg', schedule: 'daily D1-21, every 28 days' }
            ]
        },
        'Encorafenib-Binimetinib': {
            name: 'Encorafenib + Binimetinib (COLUMBUS) - BRAF V600E/K - Metastatic',
            cycles: 12,
            drugs: [
                { name: 'Encorafenib', dose: 450, unit: 'mg', schedule: 'daily continuously' },
                { name: 'Binimetinib', dose: 45, unit: 'mg', schedule: 'BID continuously' }
            ]
        },
        'Atezolizumab-Vemurafenib-Cobimetinib': {
            name: 'Atezolizumab + Vemurafenib + Cobimetinib (IMspire150) - BRAF V600 - Metastatic',
            cycles: 8,
            drugs: [
                { name: 'Atezolizumab', dose: 840, unit: 'mg', schedule: 'D1, D15, every 28 days' },
                { name: 'Vemurafenib', dose: 720, unit: 'mg', schedule: 'BID continuously' },
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
                { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'BID continuously x12 months' },
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
                { name: 'Tebentafusp', dose: 68, unit: 'mcg', schedule: 'weekly' }
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
            name: 'Carboplatin + Paclitaxel - Metastatic',
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
                { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'BID continuously' }
            ]
        },
        'Vemurafenib': {
            name: 'Vemurafenib (BRIM-3) - BRAF V600E/K - Metastatic',
            cycles: 12,
            drugs: [
                { name: 'Vemurafenib', dose: 960, unit: 'mg', schedule: 'BID continuously' }
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
                { name: 'Binimetinib', dose: 45, unit: 'mg', schedule: 'BID continuously' }
            ]
        }
    },
    ovarian: {
        'Carboplatin-Paclitaxel': {
            name: 'Carboplatin + Paclitaxel (GOG-158) - (Neoadjuvant/Adjuvant/Advanced)',
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
            name: 'Gemcitabine + Cisplatin (Recurrent)',
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
            name: 'Altretamine (Single agent - recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Altretamine', dose: 260, unit: 'mg/m²', schedule: 'daily x 14 days, every 28 days' }
            ]
        },
        'Doxorubicin-Liposomal': {
            name: 'Doxorubicin liposomal (Single agent - recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin liposomal', dose: 40, unit: 'mg/m²', schedule: 'every 28 days' }
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
                { name: 'Ixabepilone', dose: 40, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'Topotecan': {
            name: 'Topotecan (Single agent - recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', days: 'D1-D5', schedule: 'D1-D5, every 21 days' }
            ]
        },
        'Gemcitabine-Single': {
            name: 'Gemcitabine (Single agent - recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        'Etoposide': {
            name: 'Etoposide (Single agent - recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 50, unit: 'mg/m²', days: 'D1-D21', schedule: 'daily x 21 days, every 28 days' }
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
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'Bevacizumab-Single': {
            name: 'Bevacizumab (Single agent - recurrent)',
            cycles: 8,
            drugs: [
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'every 21 days' }
            ]
        },
        'Capecitabine': {
            name: 'Capecitabine (Single agent - recurrent)',
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
            name: 'Veliparib + Carboplatin + Paclitaxel (BRCA+ metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Veliparib', dose: 150, unit: 'mg', schedule: 'twice daily, continuous' },
                { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Dostarlimab': {
            name: 'Dostarlimab (dMMR/MSI-H recurrent)',
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
            name: 'Durvalumab + Olaparib + Bevacizumab + Carboplatin + Paclitaxel (DUO-O) - (Advanced)',
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
            name: 'Carboplatin + Paclitaxel Weekly (GOG-262) - (Neoadjuvant/Advanced)',
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
            name: 'Bevacizumab + Carboplatin + Paclitaxel (GOG-218/ICON7) - (Advanced)',
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
            name: 'Carboplatin + Gemcitabine (AGO-OVAR-2.5) - (Platinum-sensitive recurrent)',
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
                { name: 'Vinblastine', dose: 4, unit: 'mg/m²', schedule: 'weekly x 6 weeks, then every 2 weeks' }
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
            name: 'Paclitaxel (Single agent - mCRPC)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        'Docetaxel-Single': {
            name: 'Docetaxel (Single agent - mCRPC)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
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
            name: 'Bevacizumab (Single agent)',
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
                { name: 'Etoposide', dose: 2400, unit: 'mg/m²', schedule: 'D-5 to D-2 (600 mg/m² daily)', days: 'D-5 to D-2' }
            ]
        },
        'Bu-Cy': {
            name: 'Busulfan + Cyclophosphamide (BuCy) - AML/MDS',
            cycles: 1,
            drugs: [
                { name: 'Busulfan', dose: 3.2, unit: 'mg/kg', schedule: 'D-7 to D-4 (q6h x 16 doses, IV)', days: 'D-7 to D-4' },
                { name: 'Cyclophosphamide', dose: 60, unit: 'mg/kg', schedule: 'D-3, D-2', days: 'D-3, D-2' }
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
            name: 'Carboplatin (Single agent - Stage I seminoma) (Adjuvant)',
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
                { name: 'Mesna', dose: 400, unit: 'mg/m²', schedule: 'D1-D5 every 21 days (uroprotection)' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' }
            ]
        },
        'TIP': {
            name: 'TIP (Paclitaxel + Ifosfamide + Cisplatin) - Salvage (Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Paclitaxel', dose: 250, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Ifosfamide', dose: 1500, unit: 'mg/m²', schedule: 'D2-D5 every 21 days' },
                { name: 'Mesna', dose: 500, unit: 'mg/m²', schedule: 'D2-D5 every 21 days (uroprotection)' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D2-D5 every 21 days' }
            ]
        },
        'VeIP': {
            name: 'VeIP (Vinblastine + Ifosfamide + Cisplatin) - Salvage (Metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Vinblastine', dose: 0.11, unit: 'mg/kg', schedule: 'D1-D2 every 21 days' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Mesna', dose: 400, unit: 'mg/m²', schedule: 'D1-D5 every 21 days (uroprotection)' },
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
            name: 'Etoposide (Single agent) (Metastatic)',
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
                { name: 'Mesna', dose: 500, unit: 'mg/m²', schedule: 'D1-D3 every 21 days (uroprotection)' },
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
                { name: 'Mesna', dose: 1500, unit: 'mg/m²', schedule: 'D1-D4 every 21 days (uroprotection)' }
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
                { name: 'Mesna', dose: 360, unit: 'mg/m²', schedule: 'D1-D5 every 21 days (uroprotection)' },
                { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' }
            ]
        },
        'IAC': {
            name: 'IAC (Ifosfamide + Actinomycin + Cisplatin) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 1800, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Mesna', dose: 360, unit: 'mg/m²', schedule: 'D1-D5 every 21 days (uroprotection)' },
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
            name: 'Doxorubicin (Single agent) (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Ifosfamide': {
            name: 'Ifosfamide (Single agent) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 3000, unit: 'mg/m²', schedule: 'D1-D3 every 21 days' },
                { name: 'Mesna', dose: 600, unit: 'mg/m²', schedule: 'D1-D3 every 21 days (uroprotection)' }
            ]
        },
        'Gemcitabine': {
            name: 'Gemcitabine (Single agent) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15 every 28 days' }
            ]
        },
        'Doxorubicin-Liposomal': {
            name: 'Doxorubicin liposomal (Single agent) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin liposomal', dose: 50, unit: 'mg/m²', schedule: 'D1 every 28 days' }
            ]
        },
        'Pazopanib': {
            name: 'Pazopanib (Single agent) (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pazopanib', dose: 800, unit: 'mg', schedule: 'daily on empty stomach continuously' }
            ]
        },
        'Trabectedin': {
            name: 'Trabectedin (Single agent) (Liposarcoma/Leiomyosarcoma/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Trabectedin', dose: 1.5, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Eribulin': {
            name: 'Eribulin (Single agent) (Liposarcoma/Metastatic)',
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
            name: 'Epirubicin (Single agent) (Neoadjuvant/Adjuvant/Metastatic)',
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
                { name: 'Mesna', dose: 400, unit: 'mg/m²', schedule: 'D1-D3 every 21 days (uroprotection)' }
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
                { name: 'Cyclophosphamide', dose: 2200, unit: 'mg/m²', schedule: 'D1 every 21 days' }
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
            name: 'Vinorelbine (Single agent) (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Vinorelbine', dose: 30, unit: 'mg/m²', schedule: 'D1, D8 every 21 days' }
            ]
        },
        'Docetaxel': {
            name: 'Docetaxel (Single agent) (Metastatic)',
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
            name: 'Carboplatin + Paclitaxel + Bevacizumab (Angiosarcoma) (Metastatic)',
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
        // METASTATIC THERAPY
        'Atezolizumab-Bevacizumab': {
            name: 'Atezolizumab + Bevacizumab (IMbrave150)',
            cycles: 8,
            drugs: [
                { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Durvalumab-Tremelimumab': {
            name: 'Durvalumab + Tremelimumab (HIMALAYA)',
            cycles: 6,
            drugs: [
                { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 28 days' },
                { name: 'Tremelimumab', dose: 300, unit: 'mg', schedule: 'D1, cycle 1 only (single dose)' }
            ]
        },
        'Durvalumab-Monotherapy': {
            name: 'Durvalumab (HIMALAYA)',
            cycles: 8,
            drugs: [
                { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 28 days' }
            ]
        },
        'Sorafenib': {
            name: 'Sorafenib (SHARP)',
            cycles: 8,
            drugs: [
                { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'PO twice daily, continuous' }
            ]
        },
        'Lenvatinib': {
            name: 'Lenvatinib (REFLECT)',
            cycles: 8,
            drugs: [
                { name: 'Lenvatinib', dose: 12, unit: 'mg', schedule: 'PO daily (≥60kg) or 8mg daily (<60kg)' }
            ]
        },

        // METASTATIC THERAPY
        'Ipilimumab-Nivolumab': {
            name: 'Ipilimumab + Nivolumab (CheckMate 040)',
            cycles: 6,
            drugs: [
                { name: 'Ipilimumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 21 days x 4 cycles' },
                { name: 'Nivolumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 21 days x 4 cycles, then 240mg every 2 weeks' }
            ]
        },
        'Cabozantinib': {
            name: 'Cabozantinib (CELESTIAL)',
            cycles: 8,
            drugs: [
                { name: 'Cabozantinib', dose: 60, unit: 'mg', schedule: 'PO daily, continuous' }
            ]
        },
        'Regorafenib': {
            name: 'Regorafenib (RESORCE)',
            cycles: 8,
            drugs: [
                { name: 'Regorafenib', dose: 160, unit: 'mg', schedule: 'PO daily D1-D21, then 7 days off, every 28 days' }
            ]
        },
        'Ramucirumab': {
            name: 'Ramucirumab (REACH-2)',
            cycles: 8,
            drugs: [
                { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'D1, every 2 weeks (AFP ≥400)' }
            ]
        },

        // IMMUNOTHERAPY MONOTHERAPY
        'Nivolumab': {
            name: 'Nivolumab (CheckMate 040)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 2 weeks or 480mg every 28 days' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab (KEYNOTE-224)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Tislelizumab': {
            name: 'Tislelizumab (RATIONALE-301)',
            cycles: 8,
            drugs: [
                { name: 'Tislelizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },

        // NEWER TARGETED THERAPIES
        'Donafenib': {
            name: 'Donafenib (ZGDH3)',
            cycles: 8,
            drugs: [
                { name: 'Donafenib', dose: 200, unit: 'mg', schedule: 'PO twice daily, continuous' }
            ]
        },
        'Apatinib': {
            name: 'Apatinib (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Apatinib', dose: 500, unit: 'mg', schedule: 'PO daily, continuous' }
            ]
        },

        // LOCOREGIONAL THERAPY
        'GEMOX': {
            name: 'Gemcitabine + Oxaliplatin (GEMOX)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' }
            ]
        },
        'FOLFOX4': {
            name: 'FOLFOX4 (Oxaliplatin + 5-FU + Leucovorin)',
            cycles: 6,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'D1, bolus, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 600, unit: 'mg/m²', schedule: 'D1-D2, 22-hour infusion, every 2 weeks' }
            ]
        },
        'Doxorubicin-TACE': {
            name: 'Doxorubicin (TACE)',
            cycles: 4,
            drugs: [
                { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'Intra-arterial, every 6-8 weeks' }
            ]
        }
    },
    bone: {
        osteosarcoma: {
            'AP': {
                name: 'AP (Adriamycin + Cisplatin) - (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 25, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                    { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'MAP': {
                name: 'MAP (Methotrexate + Adriamycin + Cisplatin) - (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Methotrexate (HD)', dose: 12000, unit: 'mg/m²', schedule: 'D1, every 21 days (with leucovorin rescue)' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 25, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                    { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Leucovorin', dose: 15, unit: 'mg/m²', schedule: 'rescue per protocol' }
                ]
            },
            'IAP': {
                name: 'IAP (Ifosfamide + Adriamycin + Cisplatin) - (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Ifosfamide', dose: 2000, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 25, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                    { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Mesna', dose: 400, unit: 'mg/m²', schedule: 'every 4 hours, D1-D5, every 21 days (uroprotection)' }
                ]
            },
            'HD-MTX': {
                name: 'HD-MTX (High-Dose Methotrexate) - (Neoadjuvant/Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Methotrexate (HD)', dose: 12000, unit: 'mg/m²', schedule: 'D1, every 14 days (with leucovorin rescue)' },
                    { name: 'Leucovorin', dose: 15, unit: 'mg/m²', schedule: 'rescue per protocol' }
                ]
            },
            'Gemcitabine-Docetaxel': {
                name: 'Gemcitabine + Docetaxel - (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 675, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D8, every 21 days' }
                ]
            },
            'Sorafenib': {
                name: 'Sorafenib - (Relapsed/Refractory)',
                cycles: 8,
                drugs: [
                    { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'PO twice daily, continuous' }
                ]
            },
            'Cyclophosphamide-Etoposide': {
                name: 'Cyclophosphamide + Etoposide (CE) - (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'Cabozantinib': {
                name: 'Cabozantinib - (Relapsed/Refractory)',
                cycles: 12,
                drugs: [
                    { name: 'Cabozantinib', dose: 60, unit: 'mg', schedule: 'PO once daily, continuous' }
                ]
            },
            'Sorafenib-Everolimus': {
                name: 'Sorafenib + Everolimus - (Relapsed/Refractory)',
                cycles: 8,
                drugs: [
                    { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'PO twice daily, continuous' },
                    { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'PO once daily, continuous' }
                ]
            },
            'Cyclophosphamide-Topotecan': {
                name: 'Cyclophosphamide + Topotecan - (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 250, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Topotecan', dose: 0.75, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'Ifosfamide-Carboplatin-Etoposide': {
                name: 'Ifosfamide + Carboplatin + Etoposide (ICE) - (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Ifosfamide', dose: 1800, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Mesna', dose: 360, unit: 'mg/m²', schedule: 'D1-D5, every 21 days (uroprotection)' }
                ]
            },
            'HDMTX-Etoposide-Ifosfamide': {
                name: 'HDMTX + Etoposide + Ifosfamide - (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Methotrexate (HD)', dose: 12000, unit: 'mg/m²', schedule: 'D1, every 21 days (with leucovorin rescue)' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Ifosfamide', dose: 1800, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Leucovorin', dose: 15, unit: 'mg/m²', schedule: 'rescue per protocol' },
                    { name: 'Mesna', dose: 360, unit: 'mg/m²', schedule: 'D1-D5, every 21 days (uroprotection)' }
                ]
            }
        },
        chordoma: {
            'Imatinib': {
                name: 'Imatinib - (Recurrent/Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Imatinib', dose: 400, unit: 'mg', schedule: 'PO once daily, continuous' }
                ]
            },
            'Dasatinib': {
                name: 'Dasatinib - (Recurrent/Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Dasatinib', dose: 100, unit: 'mg', schedule: 'PO once daily, continuous' }
                ]
            },
            'Sunitinib': {
                name: 'Sunitinib - (Recurrent/Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Sunitinib', dose: 50, unit: 'mg', schedule: 'PO once daily, D1-D28 every 42 days (4 weeks on, 2 weeks off)' }
                ]
            },
            'Imatinib-Cisplatin': {
                name: 'Imatinib + Cisplatin - (Recurrent/Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Imatinib', dose: 400, unit: 'mg', schedule: 'PO once daily, continuous' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Imatinib-Sirolimus': {
                name: 'Imatinib + Sirolimus - (Recurrent/Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Imatinib', dose: 400, unit: 'mg', schedule: 'PO once daily, continuous' },
                    { name: 'Sirolimus', dose: 2, unit: 'mg', schedule: 'PO once daily, continuous' }
                ]
            },
            'Erlotinib': {
                name: 'Erlotinib - (Recurrent/Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Erlotinib', dose: 150, unit: 'mg', schedule: 'PO once daily, continuous' }
                ]
            },
            'Lapatinib': {
                name: 'Lapatinib (EGFR positive) - (Recurrent/Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Lapatinib', dose: 1500, unit: 'mg', schedule: 'PO once daily, continuous (EGFR positive)' }
                ]
            },
            'Sorafenib': {
                name: 'Sorafenib - (Recurrent/Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'PO twice daily, continuous' }
                ]
            }
        },
        ewings_sarcoma: {
            'VDC-IE': {
                name: 'VDC/IE Alternating (EE2012) - (Neoadjuvant/Adjuvant)',
                cycles: 14,
                drugs: [
                    { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Dactinomycin', dose: 1.25, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 1200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Mesna (for cyclophosphamide)', dose: 240, unit: 'mg/m²', schedule: 'every 4 hours x 3 doses on D1, every 21 days' },
                    { name: 'Ifosfamide', dose: 1800, unit: 'mg/m²', schedule: 'D1-D5, every 21 days (alternating)' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5, every 21 days (alternating)' },
                    { name: 'Mesna (for ifosfamide)', dose: 360, unit: 'mg/m²', schedule: 'every 4 hours x 3 doses D1-D5, every 21 days (alternating)' }
                ]
            },
            'VAC-IE': {
                name: 'VAC/IE Alternating - (Neoadjuvant/Adjuvant/Metastatic)',
                cycles: 14,
                drugs: [
                    { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 1200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Mesna (for cyclophosphamide)', dose: 240, unit: 'mg/m²', schedule: 'every 4 hours x 3 doses on D1, every 21 days' },
                    { name: 'Ifosfamide', dose: 1800, unit: 'mg/m²', schedule: 'D1-D5, every 21 days (alternating)' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5, every 21 days (alternating)' },
                    { name: 'Mesna (for ifosfamide)', dose: 360, unit: 'mg/m²', schedule: 'every 4 hours x 3 doses D1-D5, every 21 days (alternating)' }
                ]
            },
            'VAC': {
                name: 'VAC (Vincristine + Adriamycin + Cyclophosphamide) - (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 1200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Mesna (for cyclophosphamide)', dose: 240, unit: 'mg/m²', schedule: 'every 4 hours x 3 doses on D1, every 21 days' }
                ]
            },
            'VDC': {
                name: 'VDC (Vincristine + Dactinomycin + Cyclophosphamide) - (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Dactinomycin', dose: 1.25, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 1200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Mesna (for cyclophosphamide)', dose: 240, unit: 'mg/m²', schedule: 'every 4 hours x 3 doses on D1, every 21 days' }
                ]
            },
            'IE': {
                name: 'IE (Ifosfamide + Etoposide) - (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Ifosfamide', dose: 1800, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Mesna', dose: 360, unit: 'mg/m²', schedule: 'D1-D5, every 21 days (uroprotection)' }
                ]
            },
            'VIDE': {
                name: 'VIDE (Vincristine + Ifosfamide + Doxorubicin + Etoposide) - (Neoadjuvant/Adjuvant)',
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
                name: 'VAIA (Vincristine + Adriamycin + Ifosfamide + Actinomycin) - (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Ifosfamide', dose: 1800, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Actinomycin D', dose: 0.5, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Mesna', dose: 360, unit: 'mg/m²', schedule: 'D1-D5, every 21 days (uroprotection)' }
                ]
            },
            'Cyclophosphamide-Topotecan': {
                name: 'Cyclophosphamide + Topotecan - (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 250, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Topotecan', dose: 0.75, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
                ]
            },
            'Irinotecan-Temozolomide-Vincristine': {
                name: 'Irinotecan + Temozolomide + Vincristine - (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Irinotecan', dose: 50, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Temozolomide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                    { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' }
                ]
            },
            'Cabozantinib': {
                name: 'Cabozantinib - (Relapsed/Refractory)',
                cycles: 12,
                drugs: [
                    { name: 'Cabozantinib', dose: 60, unit: 'mg', schedule: 'PO once daily, continuous' }
                ]
            },
            'Docetaxel-Gemcitabine': {
                name: 'Docetaxel + Gemcitabine - (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D8, every 21 days' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Ifosfamide-High-Dose': {
                name: 'Ifosfamide High-Dose - (Relapsed/Refractory)',
                cycles: 6,
                drugs: [
                    { name: 'Ifosfamide', dose: 3000, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                    { name: 'Mesna', dose: 3000, unit: 'mg/m²', schedule: 'D1-D3, every 21 days (uroprotection)' }
                ]
            },
            'Regorafenib': {
                name: 'Regorafenib - (Relapsed/Refractory)',
                cycles: 12,
                drugs: [
                    { name: 'Regorafenib', dose: 160, unit: 'mg', schedule: 'PO once daily, D1-D21 every 28 days' }
                ]
            }
        },
        chondrosarcoma: {
            'Dasatinib': {
                name: 'Dasatinib - (Metastatic/Unresectable)',
                cycles: 12,
                drugs: [
                    { name: 'Dasatinib', dose: 100, unit: 'mg', schedule: 'PO once daily, continuous' }
                ]
            },
            'Pazopanib': {
                name: 'Pazopanib - (Metastatic/Unresectable)',
                cycles: 12,
                drugs: [
                    { name: 'Pazopanib', dose: 800, unit: 'mg', schedule: 'PO once daily, continuous' }
                ]
            },
            'Ivosidenib': {
                name: 'Ivosidenib (IDH1 mutation) - (Advanced/Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Ivosidenib', dose: 500, unit: 'mg', schedule: 'PO once daily, continuous (IDH1 mutation required)' }
                ]
            }
        },
        giant_cell_tumor: {
            'Denosumab': {
                name: 'Denosumab - (Unresectable/Metastatic)',
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
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3 every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Ramucirumab': {
            name: 'Carboplatin + Paclitaxel + Ramucirumab (Metastatic)',
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
                { name: 'Mesna', dose: 240, unit: 'mg/m²', schedule: 'D1-D5 every 21 days (uroprotection)' }
            ]
        },
        'Gemcitabine-Docetaxel': {
            name: 'Gemcitabine + Docetaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1,D8 every 21 days' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D8 every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel': {
            name: 'Carboplatin + Paclitaxel (Neoadjuvant/Adjuvant/Metastatic)',
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
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
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
                { name: 'Gemcitabine', dose: 1250, unit: 'mg/m²', schedule: 'D1,D8 every 21 days' }
            ]
        },
        'Gemcitabine-Capecitabine': {
            name: 'Gemcitabine + Capecitabine (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1,D8 every 21 days' },
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
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1 every 14 days' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1 every 14 days' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: 'D1-D2 (46hr CI) every 14 days' }
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
                { name: 'Mesna', dose: 240, unit: 'mg/m²', schedule: 'D1-D5 every 21 days (uroprotection)' }
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
                    { name: 'Lenvatinib', dose: 24, unit: 'mg', schedule: 'daily until progression' }
                ]
            },
            'Sorafenib-DTC': {
                name: 'Sorafenib (DECISION) - RAI-refractory DTC',
                cycles: 12,
                drugs: [
                    { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'twice daily until progression' }
                ]
            },
            'Pazopanib-DTC': {
                name: 'Pazopanib - Follicular/Hurthle Cell Thyroid Cancer',
                cycles: 12,
                drugs: [
                    { name: 'Pazopanib', dose: 800, unit: 'mg', schedule: 'daily until progression' }
                ]
            },
            'Selpercatinib-RET-DTC': {
                name: 'Selpercatinib - RET-altered DTC',
                cycles: 12,
                drugs: [
                    { name: 'Selpercatinib', dose: 160, unit: 'mg', schedule: 'twice daily until progression' }
                ]
            },
            'Pralsetinib-RET-DTC': {
                name: 'Pralsetinib - RET-altered DTC',
                cycles: 12,
                drugs: [
                    { name: 'Pralsetinib', dose: 400, unit: 'mg', schedule: 'daily until progression' }
                ]
            },
            'Larotrectinib-NTRK-DTC': {
                name: 'Larotrectinib - NTRK fusion-positive DTC',
                cycles: 12,
                drugs: [
                    { name: 'Larotrectinib', dose: 100, unit: 'mg', schedule: 'twice daily until progression' }
                ]
            },
            'Entrectinib-NTRK-DTC': {
                name: 'Entrectinib - NTRK fusion-positive DTC',
                cycles: 12,
                drugs: [
                    { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'daily until progression' }
                ]
            },
            'Repotrectinib-NTRK-DTC': {
                name: 'Repotrectinib - NTRK fusion-positive DTC',
                cycles: 12,
                drugs: [
                    { name: 'Repotrectinib', dose: 160, unit: 'mg', schedule: 'daily until progression' }
                ]
            }
        },
        'medullary': {
            // Metastatic Targeted Therapy for Advanced MTC
            'Selpercatinib-RET-MTC': {
                name: 'Selpercatinib - RET-mutant MTC (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Selpercatinib', dose: 160, unit: 'mg', schedule: 'twice daily until progression' }
                ]
            },
            'Pralsetinib-RET-MTC': {
                name: 'Pralsetinib - RET-mutant MTC (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Pralsetinib', dose: 400, unit: 'mg', schedule: 'daily until progression' }
                ]
            },
            'Vandetanib-MTC': {
                name: 'Vandetanib - Advanced MTC',
                cycles: 12,
                drugs: [
                    { name: 'Vandetanib', dose: 300, unit: 'mg', schedule: 'daily until progression' }
                ]
            },
            'Cabozantinib-MTC': {
                name: 'Cabozantinib - Advanced MTC',
                cycles: 12,
                drugs: [
                    { name: 'Cabozantinib', dose: 140, unit: 'mg', schedule: 'daily until progression' }
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
                    { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'twice daily until progression' }
                ]
            },
            'Lenvatinib-MTC': {
                name: 'Lenvatinib - Advanced MTC',
                cycles: 12,
                drugs: [
                    { name: 'Lenvatinib', dose: 20, unit: 'mg', schedule: 'daily until progression' }
                ]
            },
            'Larotrectinib-NTRK-MTC': {
                name: 'Larotrectinib - NTRK fusion-positive MTC',
                cycles: 12,
                drugs: [
                    { name: 'Larotrectinib', dose: 100, unit: 'mg', schedule: 'twice daily until progression' }
                ]
            },
            'Entrectinib-NTRK-MTC': {
                name: 'Entrectinib - NTRK fusion-positive MTC',
                cycles: 12,
                drugs: [
                    { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'daily until progression' }
                ]
            },
            'Pembrolizumab-TMB-MTC': {
                name: 'Pembrolizumab - High TMB MTC (≥10 mut/Mb)',
                cycles: 8,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
                ]
            }
        },
        'anaplastic': {
            // BRAF V600E-mutant Anaplastic Thyroid Cancer
            'Dabrafenib-Trametinib-ATC': {
                name: 'Dabrafenib + Trametinib - BRAF V600E-mutant ATC',
                cycles: 12,
                drugs: [
                    { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'twice daily until progression' },
                    { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'daily until progression' }
                ]
            },
            'Vemurafenib-Cobimetinib-ATC': {
                name: 'Vemurafenib + Cobimetinib - BRAF V600E-mutant ATC',
                cycles: 12,
                drugs: [
                    { name: 'Vemurafenib', dose: 960, unit: 'mg', schedule: 'twice daily until progression' },
                    { name: 'Cobimetinib', dose: 60, unit: 'mg', schedule: 'daily for 21 days, then 7 days off' }
                ]
            },
            // RET-altered Anaplastic Thyroid Cancer
            'Selpercatinib-RET-ATC': {
                name: 'Selpercatinib - RET-altered ATC',
                cycles: 12,
                drugs: [
                    { name: 'Selpercatinib', dose: 160, unit: 'mg', schedule: 'twice daily until progression' }
                ]
            },
            'Pralsetinib-RET-ATC': {
                name: 'Pralsetinib - RET-altered ATC',
                cycles: 12,
                drugs: [
                    { name: 'Pralsetinib', dose: 400, unit: 'mg', schedule: 'daily until progression' }
                ]
            },
            // NTRK fusion-positive Anaplastic Thyroid Cancer
            'Larotrectinib-NTRK-ATC': {
                name: 'Larotrectinib - NTRK fusion-positive ATC',
                cycles: 12,
                drugs: [
                    { name: 'Larotrectinib', dose: 100, unit: 'mg', schedule: 'twice daily until progression' }
                ]
            },
            'Entrectinib-NTRK-ATC': {
                name: 'Entrectinib - NTRK fusion-positive ATC',
                cycles: 12,
                drugs: [
                    { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'daily until progression' }
                ]
            },
            'Repotrectinib-NTRK-ATC': {
                name: 'Repotrectinib - NTRK fusion-positive ATC',
                cycles: 12,
                drugs: [
                    { name: 'Repotrectinib', dose: 160, unit: 'mg', schedule: 'daily until progression' }
                ]
            },
            // Multi-kinase Inhibitors for ATC
            'Lenvatinib-ATC': {
                name: 'Lenvatinib - Advanced ATC',
                cycles: 12,
                drugs: [
                    { name: 'Lenvatinib', dose: 24, unit: 'mg', schedule: 'daily until progression' }
                ]
            },
            'Sorafenib-ATC': {
                name: 'Sorafenib - Advanced ATC',
                cycles: 12,
                drugs: [
                    { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'twice daily until progression' }
                ]
            },
            'Cabozantinib-ATC': {
                name: 'Cabozantinib - Advanced ATC',
                cycles: 12,
                drugs: [
                    { name: 'Cabozantinib', dose: 140, unit: 'mg', schedule: 'daily until progression' }
                ]
            },
            // Immunotherapy for ATC
            'Pembrolizumab-ATC': {
                name: 'Pembrolizumab - Advanced ATC',
                cycles: 8,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
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
                    { name: 'Spartalizumab', dose: 300, unit: 'mg', schedule: 'every 21 days' }
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
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' }
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
                { name: 'Capecitabine', dose: 830, unit: 'mg/m²', schedule: 'PO BD D1-D14, every 21 days' }
            ]
        },
        'Single-Gemcitabine-CONKO': {
            name: 'Single agent Gemcitabine (CONKO-001) - Adjuvant',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        'Single-Capecitabine-Metastatic': {
            name: 'Single agent Capecitabine - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO BD D1-D14, every 21 days' }
            ]
        },
        'Capecitabine-RT': {
            name: 'Capecitabine + Radiation Therapy - Neoadjuvant/Adjuvant',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'PO BD during RT' },
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
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' }
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
                { name: 'Erlotinib', dose: 100, unit: 'mg', schedule: 'PO daily, continuous' }
            ]
        },
        'Capecitabine-Erlotinib': {
            name: 'Capecitabine + Erlotinib - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO BD D1-D14, every 21 days' },
                { name: 'Erlotinib', dose: 100, unit: 'mg', schedule: 'PO daily, continuous' }
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
        'Single-Pembrolizumab-MSI': {
            name: 'Single agent Pembrolizumab - Metastatic (MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days or 400mg every 6 weeks' }
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
            name: 'Gemcitabine + Cisplatin (POLO) - Metastatic (BRCA1/2/PALB2+)',
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
                { name: 'Sotorasib', dose: 960, unit: 'mg', schedule: 'PO daily, continuous' }
            ]
        },
        'Adagrasib-KRAS': {
            name: 'Adagrasib - Metastatic (KRAS G12C+)',
            cycles: 12,
            drugs: [
                { name: 'Adagrasib', dose: 600, unit: 'mg', schedule: 'PO BD, continuous' }
            ]
        },
        'mFOLFOX6': {
            name: 'mFOLFOX6 (Modified FOLFOX6) - Metastatic',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' }
            ]
        },
        'mFOLFIRI': {
            name: 'mFOLFIRI (Modified FOLFIRI) - Metastatic',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 14 days' }
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
        '5FU-MMC-RT-RTOG': {
            name: '5-FU + Mitomycin-C + RT (RTOG/ECOG)',
            cycles: 2,
            drugs: [
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'daily x 4 days, weeks 1 and 5' },
                { name: 'Mitomycin-C', dose: 10, unit: 'mg/m²', schedule: 'D1, D29' }
            ]
        },
        'Capecitabine-MMC-RT': {
            name: 'Capecitabine + Mitomycin-C + RT',
            cycles: 2,
            drugs: [
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'PO BD on days of RT' },
                { name: 'Mitomycin-C', dose: 10, unit: 'mg/m²', schedule: 'D1, D29' }
            ]
        },
        '5FU-Cisplatin-RT': {
            name: '5-FU + Cisplatin + RT',
            cycles: 3,
            drugs: [
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'CI D1-D4, every 4 weeks' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 4 weeks' }
            ]
        },
        'CAPEOX-RT': {
            name: 'Capecitabine + Oxaliplatin + RT',
            cycles: 2,
            drugs: [
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'PO BD on days of RT' },
                { name: 'Oxaliplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, D8, D22, D29' }
            ]
        },
        '5FU-Cisplatin': {
            name: '5-FU + Cisplatin',
            cycles: 6,
            drugs: [
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'CI D1-D5, every 28 days' },
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D2, every 28 days' }
            ]
        },
        'Carboplatin-Paclitaxel': {
            name: 'Carboplatin + Paclitaxel',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'mFOLFOX6': {
            name: 'mFOLFOX6',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: 'D1-D2 (46hr CI), every 2 weeks' }
            ]
        },
        'FOLCIS': {
            name: 'FOLCIS',
            cycles: 12,
            drugs: [
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2000, unit: 'mg/m²', schedule: 'CI over 46 hours, every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' }
            ]
        },
        'Carboplatin-Paclitaxel-Retifanlimab': {
            name: 'Carboplatin + Paclitaxel + Retifanlimab-dlwr',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 28 days' },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                { name: 'Retifanlimab-dlwr', dose: 500, unit: 'mg', schedule: 'D1, every 28 days' }
            ]
        },
        'Single-Cemiplimab': {
            name: 'Single agent Cemiplimab',
            cycles: 12,
            drugs: [
                { name: 'Cemiplimab', dose: 350, unit: 'mg', schedule: 'every 3 weeks' }
            ]
        },
        'Single-Toripalimab': {
            name: 'Single agent Toripalimab',
            cycles: 12,
            drugs: [
                { name: 'Toripalimab', dose: 3, unit: 'mg/kg', schedule: 'every 2 weeks' }
            ]
        },
        'Single-Tislelizumab': {
            name: 'Single agent Tislelizumab',
            cycles: 12,
            drugs: [
                { name: 'Tislelizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
            ]
        },
        'Modified-DCF': {
            name: 'Modified DCF (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 40, unit: 'mg/m²', schedule: 'D1, every 3 weeks' },
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'D1, every 3 weeks' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'CI over 46 hours, every 3 weeks' }
            ]
        },
        'Capecitabine-RT': {
            name: 'Capecitabine + RT (Concurrent chemoRT)',
            cycles: 1,
            drugs: [
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'PO BD on days of RT' }
            ]
        },
        'Single-Pembrolizumab': {
            name: 'Single agent Pembrolizumab (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Single-Nivolumab': {
            name: 'Single agent Nivolumab (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 2 weeks or 480mg every 28 days' }
            ]
        }
    },
    biliary: {
        // Adjuvant Therapy
        'Single-Capecitabine': {
            name: 'Single agent Capecitabine (Adjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'twice daily, days 1-14, every 21 days' }
            ]
        },
        'Gemcitabine-Cisplatin-Adjuvant': {
            name: 'Gemcitabine + Cisplatin (Adjuvant)',
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
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'PO BD on days of RT' }
            ]
        },
        // Metastatic - 1L Therapy
        'Gemcitabine-Cisplatin-Durvalumab': {
            name: 'Gemcitabine + Cisplatin + Durvalumab (Metastatic - 1L)',
            cycles: 8,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Cisplatin': {
            name: 'Gemcitabine + Cisplatin (Metastatic - 1L)',
            cycles: 8,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Gemcitabine-Capecitabine': {
            name: 'Gemcitabine + Capecitabine (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Capecitabine', dose: 650, unit: 'mg/m²', schedule: 'twice daily D1-D14, every 21 days' }
            ]
        },
        'GEMOX': {
            name: 'Gemcitabine + Oxaliplatin (GEMOX) - (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Oxaliplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Nabpaclitaxel': {
            name: 'Gemcitabine + Nab-paclitaxel (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Nab-paclitaxel', dose: 125, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        'Gemcitabine-Cisplatin-Nabpaclitaxel': {
            name: 'Gemcitabine + Cisplatin + Nab-paclitaxel (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Gemcitabine-Cisplatin-Pembrolizumab': {
            name: 'Gemcitabine + Cisplatin + Pembrolizumab (Metastatic - 1L)',
            cycles: 8,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Capecitabine-Cisplatin': {
            name: 'Capecitabine + Cisplatin (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        // Metastatic Therapy
        'mFOLFOX6': {
            name: 'mFOLFOX6 (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: 'D1-D2 (46hr CI), every 2 weeks' }
            ]
        },
        '5FU-Cisplatin': {
            name: '5-FU + Cisplatin (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil infusion', dose: 1000, unit: 'mg/m²', schedule: 'daily x 4 days, every 21 days' }
            ]
        },
        'CAPEOX': {
            name: 'Capecitabine + Oxaliplatin (CAPEOX) - (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'twice daily, days 1-14, every 21 days' }
            ]
        },
        'Single-Gemcitabine': {
            name: 'Single agent Gemcitabine (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        // Targeted Therapy (Biomarker-directed)
        'Dabrafenib-Trametinib': {
            name: 'Dabrafenib + Trametinib (BRAFV600E mutation)',
            cycles: 12,
            drugs: [
                { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'twice daily' },
                { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'daily' }
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
        },
        'Single-Pembrolizumab': {
            name: 'Single agent Pembrolizumab (MSI/dMMR/TMB-H)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Futibatinib': {
            name: 'Futibatinib (FGFR2 fusions)',
            cycles: 12,
            drugs: [
                { name: 'Futibatinib', dose: 20, unit: 'mg', schedule: 'PO daily until progression' }
            ]
        }
    },
    bladder: {
        // Neoadjuvant/Adjuvant Therapy
        'ddGC': {
            name: 'Dose-dense Gemcitabine + Cisplatin (Neoadjuvant/Adjuvant)',
            cycles: 4,
            drugs: [
                { name: 'Gemcitabine', dose: 2500, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: 'Cisplatin', dose: 35, unit: 'mg/m²', schedule: 'D1, D2, every 2 weeks' }
            ]
        },
        'ddMVAC': {
            name: 'Dose-dense MVAC (Neoadjuvant/Adjuvant)',
            cycles: 4,
            drugs: [
                { name: 'Methotrexate', dose: 30, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: 'Vinblastine', dose: 3, unit: 'mg/m²', schedule: 'D2, every 2 weeks' },
                { name: 'Doxorubicin', dose: 30, unit: 'mg/m²', schedule: 'D2, every 2 weeks' },
                { name: 'Cisplatin', dose: 70, unit: 'mg/m²', schedule: 'D2, every 2 weeks' }
            ]
        },
        'GC-Neoadjuvant': {
            name: 'Gemcitabine + Cisplatin (Neoadjuvant)',
            cycles: 4,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 28 days' }
            ]
        },
        'GC-Durvalumab-Perioperative': {
            name: 'Gemcitabine + Cisplatin + Durvalumab (Perioperative - NIAGARA)',
            cycles: 4,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 70, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Durvalumab-Maintenance': {
            name: 'Durvalumab (Maintenance after NIAGARA)',
            cycles: 8,
            drugs: [
                { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 28 days' }
            ]
        },
        // Adjuvant Therapy
        'Nivolumab-Adjuvant': {
            name: 'Nivolumab (Adjuvant)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 2 weeks' }
            ]
        },
        // Metastatic - 1L Therapy
        'GC': {
            name: 'Gemcitabine + Cisplatin (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 28 days' }
            ]
        },
        'Gemcitabine-Cisplatin-Nivolumab': {
            name: 'Gemcitabine + Cisplatin + Nivolumab (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 2 weeks' }
            ]
        },
        'Enfortumab-Vedotin-Pembrolizumab': {
            name: 'Enfortumab Vedotin + Pembrolizumab (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Enfortumab Vedotin', dose: 1.25, unit: 'mg/kg (max 125mg)', schedule: 'D1, D8, D15, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'PC': {
            name: 'Paclitaxel + Carboplatin (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'GCa': {
            name: 'Gemcitabine + Carboplatin (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'DC': {
            name: 'Docetaxel + Cisplatin (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'CAP': {
            name: 'Cyclophosphamide + Doxorubicin + Cisplatin (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 400, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Doxorubicin', dose: 40, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D2, every 21 days' }
            ]
        },
        'MCV': {
            name: 'Methotrexate + Carboplatin + Vinblastine (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Methotrexate', dose: 30, unit: 'mg/m²', schedule: 'D1, D15, D22, every 28 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 28 days' },
                { name: 'Vinblastine', dose: 4, unit: 'mg/m²', schedule: 'D1, D15, D22, every 28 days' }
            ]
        },
        'CMV': {
            name: 'Cisplatin + Methotrexate + Vinblastine (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D2, every 21 days' },
                { name: 'Methotrexate', dose: 30, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Vinblastine', dose: 4, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'ITP': {
            name: 'Ifosfamide + Paclitaxel + Cisplatin (Metastatic - 1L)',
            cycles: 4,
            drugs: [
                { name: 'Ifosfamide', dose: 1500, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Ifosfamide-Doxorubicin-Gemcitabine': {
            name: 'Ifosfamide + Doxorubicin + Gemcitabine (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 1500, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        // Maintenance Therapy
        'Avelumab': {
            name: 'Avelumab maintenance (After first-line chemotherapy)',
            cycles: 12,
            drugs: [
                { name: 'Avelumab', dose: 800, unit: 'mg', schedule: 'every 2 weeks' }
            ]
        },
        // Metastatic Therapy
        'Enfortumab-Vedotin': {
            name: 'Enfortumab Vedotin (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Enfortumab Vedotin', dose: 1.25, unit: 'mg/kg (max 125mg)', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        'Single-Pembrolizumab': {
            name: 'Single agent Pembrolizumab (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
            ]
        },
        'Single-Nivolumab': {
            name: 'Single agent Nivolumab (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 2 weeks' }
            ]
        },
        'Durvalumab': {
            name: 'Durvalumab (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Durvalumab', dose: 1200, unit: 'mg', schedule: 'every 28 days' }
            ]
        },
        'Sacituzumab-Govitecan': {
            name: 'Sacituzumab Govitecan (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Sacituzumab Govitecan', dose: 10, unit: 'mg/kg', schedule: 'D1, D8, every 21 days' }
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
        },
        'Single-Gemcitabine': {
            name: 'Single agent Gemcitabine (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        'Single-Paclitaxel': {
            name: 'Single agent Paclitaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        // Targeted Therapy
        'Erdafitinib': {
            name: 'Erdafitinib (FGFR mutation)',
            cycles: 12,
            drugs: [
                { name: 'Erdafitinib', dose: 8, unit: 'mg', schedule: 'daily' }
            ]
        },
        // Concurrent Chemoradiation
        '5FU-MMC-RT': {
            name: '5-FU + Mitomycin-C + RT (Concurrent chemoRT)',
            cycles: 2,
            drugs: [
                { name: '5-Fluorouracil', dose: 500, unit: 'mg/m²', schedule: 'CI daily D1-D5 and D16-D20 of RT' },
                { name: 'Mitomycin-C', dose: 12, unit: 'mg/m²', schedule: 'D1' }
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
                { name: 'Thalidomide', dose: 100, unit: 'mg', schedule: 'PO daily' },
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
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 2 weeks x 8 weeks, then every 28 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1, D8, D15, D22, every 28 days' },
                { name: 'Thalidomide', dose: 100, unit: 'mg', schedule: 'PO daily' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1, D8, D15, D22, every 28 days' }
            ]
        },
        'Dara-VRd': {
            name: 'Daratumumab + Bortezomib + Lenalidomide + Dexamethasone (Dara-VRd / GRIFFIN) - Transplant Eligible',
            cycles: 4,
            drugs: [
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 2 weeks x 8 weeks, then every 28 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1, D8, D15, every 21 days' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'PO D1-D14, every 21 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1, D8, D15, every 21 days' }
            ]
        },
        'Isa-VRd': {
            name: 'Isatuximab + Bortezomib + Lenalidomide + Dexamethasone (Isa-VRd / GMMG-HD7) - Transplant Eligible',
            cycles: 4,
            drugs: [
                { name: 'Isatuximab', dose: 10, unit: 'mg/kg', schedule: 'weekly x 4 weeks, then every 2 weeks' },
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
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 2 weeks x 16 weeks, then every 28 days' },
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
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 2 weeks x 16 weeks, then every 28 days' },
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
                { name: 'Thalidomide', dose: 100, unit: 'mg', schedule: 'daily until progression' }
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
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 2 weeks x 16 weeks, then every 28 days' },
                { name: 'Pomalidomide', dose: 4, unit: 'mg', schedule: 'D1-D21 every 28 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1,D8,D15,D22 every 28 days' }
            ]
        },
        'Isa-Pd': {
            name: 'Isatuximab + Pomalidomide + Dexamethasone (Isa-Pd) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Isatuximab', dose: 10, unit: 'mg/kg', schedule: 'weekly x 4 weeks, then every 2 weeks' },
                { name: 'Pomalidomide', dose: 4, unit: 'mg', schedule: 'D1-D21 every 28 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1,D8,D15,D22 every 28 days' }
            ]
        },
        'Dara-Vd': {
            name: 'Daratumumab + Bortezomib + Dexamethasone (Dara-Vd) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 2 weeks x 16 weeks, then every 28 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1,D4,D8,D11 every 21 days' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1,D2,D4,D5,D8,D9,D11,D12 every 21 days' }
            ]
        },
        'Elo-Rd': {
            name: 'Elotuzumab + Lenalidomide + Dexamethasone (Elo-Rd) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Elotuzumab', dose: 10, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 2 weeks' },
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
                { name: 'Thalidomide', dose: 400, unit: 'mg', schedule: 'daily' },
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
                { name: 'Lenalidomide', dose: 10, unit: 'mg', schedule: 'daily until progression' }
            ]
        },
        'Thalidomide': {
            name: 'Thalidomide (single agent) - Maintenance',
            cycles: 12,
            drugs: [
                { name: 'Thalidomide', dose: 200, unit: 'mg', schedule: 'daily until progression' }
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
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 2 weeks x 16 weeks, then every 28 days' }
            ]
        },
        'Daratumumab-Hyaluronidase': {
            name: 'Daratumumab + Hyaluronidase (subcutaneous) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Daratumumab', dose: 1800, unit: 'mg', schedule: 'weekly x 8 weeks, then every 2 weeks x 16 weeks, then every 28 days (subcutaneous)' },
                { name: 'Hyaluronidase', dose: 30000, unit: 'units', schedule: 'with daratumumab' }
            ]
        },
        'Belantamab-Mafodotin': {
            name: 'Belantamab Mafodotin (BCMA-ADC) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Belantamab Mafodotin', dose: 2.5, unit: 'mg/kg', schedule: 'every 21 days' }
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
                { name: 'Ibrutinib', dose: 560, unit: 'mg', schedule: 'daily' }
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
                { name: 'Thalidomide', dose: 200, unit: 'mg', schedule: 'daily' },
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
                { name: 'Mesna', dose: 240, unit: 'mg/m²', schedule: 'D1-D3, every 21 days (uroprotection)' }
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
                { name: 'Mesna', dose: 240, unit: 'mg/m²', schedule: 'D1-D3, every 21 days (4 cycles)' },
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
            name: 'Carboplatin + Paclitaxel - Metastatic',
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
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
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
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'Cetuximab': {
            name: 'Cetuximab (EGFR inhibitor) - Metastatic',
            cycles: 8,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'weekly (loading dose 400 mg/m², then 250 mg/m²)', hasLoadingDose: true }
            ]
        }
    },
    vulvar_vaginal: {
        'Cisplatin-RT': {
            name: 'Cisplatin + RT (Definitive)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'D1, weekly during RT x 6 weeks' }
            ]
        },
        'Carboplatin-RT': {
            name: 'Carboplatin + RT (Definitive)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, weekly during RT x 6 weeks', requiresAUC: true }
            ]
        },
        'Carboplatin-Paclitaxel': {
            name: 'Carboplatin + Paclitaxel - Metastatic - 1L',
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
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' },
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
            name: 'Gemcitabine + Cisplatin - Metastatic - 1L',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1,D8 every 21 days' },
                { name: 'Cisplatin', dose: 70, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Cisplatin-Docetaxel': {
            name: 'Cisplatin + Docetaxel - Metastatic - 1L',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Cisplatin-Cetuximab': {
            name: 'Cisplatin + Cetuximab - Metastatic - 1L',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'weekly (loading dose 400 mg/m², then 250 mg/m²)', hasLoadingDose: true }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab (PD-L1 CPS >1, dMMR/MSI-H) - Metastatic',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Weekly': {
            name: 'Carboplatin + Paclitaxel (Weekly) - Metastatic - 1L',
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
            name: 'Carboplatin + Paclitaxel + Bevacizumab (Metastatic)',
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
            name: 'Carboplatin + Paclitaxel + Bevacizumab + Pembrolizumab (Metastatic)',
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
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 2 weeks or 480mg every 4 weeks' }
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
                { name: 'Erlotinib', dose: 150, unit: 'mg', schedule: 'PO daily' }
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
                { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'PO daily' }
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
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'PO daily (start 1-2 weeks before treatment)' },
                { name: 'Vitamin B12', dose: 1000, unit: 'mcg', schedule: 'IM every 9 weeks (start 1-2 weeks before treatment)' }
            ]
        },
        'Pemetrexed-Carboplatin': {
            name: 'Pemetrexed + Carboplatin (Cisplatin-ineligible) - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'PO daily (start 1-2 weeks before treatment)' },
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
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'PO daily (start 1-2 weeks before treatment)' },
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
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'PO daily (start 1-2 weeks before treatment)' },
                { name: 'Vitamin B12', dose: 1000, unit: 'mcg', schedule: 'IM every 9 weeks (start 1-2 weeks before treatment)' }
            ]
        },
        
        // Second-Line Therapy
        'Gemcitabine-Cisplatin': {
            name: 'Gemcitabine + Cisplatin - (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1250, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
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
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'PO daily' },
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
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 2 weeks' }
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
                { name: 'Gemcitabine', dose: 1250, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
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
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'PO daily (start 1-2 weeks before treatment)' },
                { name: 'Vitamin B12', dose: 1000, unit: 'mcg', schedule: 'IM every 9 weeks (start 1-2 weeks before treatment)' }
            ]
        },
        'Pemetrexed-Cisplatin-Adjuvant': {
            name: 'Pemetrexed + Cisplatin (Adjuvant)',
            cycles: 4,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'PO daily (start 1-2 weeks before treatment)' },
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
                { name: 'Avelumab', dose: 800, unit: 'mg', schedule: 'D1, every 2 weeks' }
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
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 2 weeks' }
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
                { name: 'Avelumab', dose: 800, unit: 'mg', schedule: 'D1, every 2 weeks' }
            ]
        },
        'Avelumab-Adjuvant': {
            name: 'Avelumab (Adjuvant)',
            cycles: 12,
            drugs: [
                { name: 'Avelumab', dose: 800, unit: 'mg', schedule: 'D1, every 2 weeks' }
            ]
        },
        'Pembrolizumab-Neoadjuvant': {
            name: 'Pembrolizumab (Neoadjuvant)',
            cycles: 3,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Pembrolizumab-Adjuvant': {
            name: 'Pembrolizumab (Adjuvant)',
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
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 2 weeks' }
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
            name: 'Paclitaxel + Carboplatin + Etoposide (PCE) - Neuroendocrine Features',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Etoposide', dose: 50, unit: 'mg/day', schedule: 'PO alternating with 100mg PO D1-D10, every 21 days' }
            ]
        },
        'Etoposide-Cisplatin': {
            name: 'Etoposide + Cisplatin (EP) - Neuroendocrine Features',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Germ Cell Features
        'BEP': {
            name: 'Bleomycin + Etoposide + Cisplatin (BEP) - Germ Cell Features',
            cycles: 3,
            drugs: [
                { name: 'Bleomycin', dose: 30, unit: 'units', schedule: 'D1, D8, D15, every 21 days' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5, every 21 days' }
            ]
        },
        
        // Adenocarcinoma - Triple combinations
        'Gemcitabine-Carboplatin-Paclitaxel': {
            name: 'Gemcitabine + Carboplatin + Paclitaxel (GCP) - Adenocarcinoma',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Cisplatin-Paclitaxel': {
            name: 'Gemcitabine + Cisplatin + Paclitaxel (GCP) - Adenocarcinoma',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Targeted therapy combinations
        'Bevacizumab-Erlotinib': {
            name: 'Bevacizumab + Erlotinib - Adenocarcinoma',
            cycles: 8,
            drugs: [
                { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                { name: 'Erlotinib', dose: 150, unit: 'mg', schedule: 'PO daily' }
            ]
        },
        
        // Standard doublets - Adenocarcinoma/Squamous
        'Carboplatin-Paclitaxel': {
            name: 'Carboplatin + Paclitaxel - Adenocarcinoma/Squamous',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Cisplatin': {
            name: 'Gemcitabine + Cisplatin - Adenocarcinoma/Squamous',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Weekly regimens
        'Carboplatin-Paclitaxel-Weekly': {
            name: 'Carboplatin + Paclitaxel (weekly) - Adenocarcinoma/Squamous',
            cycles: 12,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, weekly' },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, weekly' }
            ]
        },
        
        // Docetaxel combinations - Squamous
        'Docetaxel-Cisplatin': {
            name: 'Docetaxel + Cisplatin - Squamous',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Docetaxel-Carboplatin': {
            name: 'Docetaxel + Carboplatin - Squamous',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Carboplatin': {
            name: 'Gemcitabine + Carboplatin - Squamous',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Other combinations
        'Gemcitabine-Irinotecan': {
            name: 'Gemcitabine + Irinotecan (GI) - Adenocarcinoma',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Irinotecan', dose: 100, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'CAPEOX': {
            name: 'Capecitabine + Oxaliplatin (CAPEOX) - Colorectal Features',
            cycles: 8,
            drugs: [
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily, D1-D14, every 21 days' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        
        // Immunotherapy
        'Pembrolizumab': {
            name: 'Pembrolizumab (MSI-H/dMMR, TMB-H) - Metastatic',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Nivolumab': {
            name: 'Nivolumab (MSI-H/dMMR) - Metastatic',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 2 weeks' }
            ]
        },
        
        // Single agents - Metastatic
        'Docetaxel': {
            name: 'Docetaxel (single agent) - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine': {
            name: 'Gemcitabine (single agent) - Metastatic',
            cycles: 8,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Paclitaxel': {
            name: 'Paclitaxel (single agent) - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Capecitabine': {
            name: 'Capecitabine (single agent) - Metastatic',
            cycles: 8,
            drugs: [
                { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily, D1-D14, every 21 days' }
            ]
        }
    },
    adrenocortical: {
        'EDP-M': {
            name: 'Etoposide + Doxorubicin + Cisplatin + Mitotane (EDP-M) - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D5-D7 every 28 days' },
                { name: 'Doxorubicin', dose: 20, unit: 'mg/m²', schedule: 'D1, D8 every 28 days' },
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'D1, D9 every 28 days' },
                { name: 'Mitotane', dose: 2000, unit: 'mg', schedule: 'daily (target 14-20 mcg/ml)' }
            ]
        },
        'Streptozocin-Mitotane': {
            name: 'Streptozocin + Mitotane - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Streptozocin', dose: 1000, unit: 'mg/m²', schedule: 'D1-D5 cycle 1, then 2000 mg/m² D1 subsequent cycles every 21 days' },
                { name: 'Mitotane', dose: 1000, unit: 'mg', schedule: 'daily (titrate to 1000-4000 mg daily, target >14 mcg/ml)' }
            ]
        },
        'Mitotane': {
            name: 'Mitotane (single agent) - Adjuvant/Metastatic',
            cycles: 12,
            drugs: [
                { name: 'Mitotane', dose: 2000, unit: 'mg', schedule: 'daily (titrate to 6-10g daily based on levels)' }
            ]
        },
        'Gemcitabine-Capecitabine': {
            name: 'Gemcitabine + Capecitabine - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', schedule: 'D1, D8 every 21 days' },
                { name: 'Capecitabine', dose: 1500, unit: 'mg', schedule: 'daily every 21 days' }
            ]
        },
        'Temozolomide': {
            name: 'Temozolomide - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 200, unit: 'mg/m²', schedule: 'D1-D5 every 28 days' }
            ]
        },
        'EDP-M-Carboplatin': {
            name: 'EDP-M with Carboplatin - Metastatic alternative',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D5-D7 every 28 days' },
                { name: 'Doxorubicin', dose: 20, unit: 'mg/m²', schedule: 'D1, D8 every 28 days' },
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, D9 every 28 days' },
                { name: 'Mitotane', dose: 2000, unit: 'mg', schedule: 'daily (target 14-20 mcg/ml)' }
            ]
        },
        'Gemcitabine-Capecitabine-Mitotane': {
            name: 'Gemcitabine + Capecitabine + Mitotane - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', schedule: 'D1, D8 every 21 days' },
                { name: 'Capecitabine', dose: 1500, unit: 'mg', schedule: 'daily every 21 days' },
                { name: 'Mitotane', dose: 4000, unit: 'mg', schedule: 'daily every 21 days' }
            ]
        },
        'Docetaxel-Cisplatin': {
            name: 'Docetaxel + Cisplatin - Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 60, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Nivolumab-Ipilimumab': {
            name: 'Nivolumab + Ipilimumab - Metastatic - 3L+/Investigational',
            cycles: 6,
            drugs: [
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'every 21 days' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'every 21 days' }
            ]
        },
        'Cabozantinib': {
            name: 'Cabozantinib - Metastatic - 3L+/Investigational',
            cycles: 12,
            drugs: [
                { name: 'Cabozantinib', dose: 60, unit: 'mg', schedule: 'daily' }
            ]
        },
    },
    basal_cell: {
        'Vismodegib': {
            name: 'Vismodegib (Hedgehog pathway inhibitor) - Advanced/Metastatic',
            cycles: 8,
            drugs: [
                { name: 'Vismodegib', dose: 150, unit: 'mg', schedule: 'daily until progression' }
            ]
        },
        'Sonidegib': {
            name: 'Sonidegib (Hedgehog pathway inhibitor) - Advanced/Metastatic',
            cycles: 8,
            drugs: [
                { name: 'Sonidegib', dose: 200, unit: 'mg', schedule: 'daily until progression' }
            ]
        },
        'Cemiplimab': {
            name: 'Cemiplimab (PD-1 inhibitor) - Advanced/Metastatic',
            cycles: 8,
            drugs: [
                { name: 'Cemiplimab', dose: 350, unit: 'mg', schedule: 'every 3 weeks' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab (PD-1 inhibitor) - Advanced/Metastatic',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 3 weeks' }
            ]
        },
        'Nivolumab': {
            name: 'Nivolumab (PD-1 inhibitor) - Advanced/Metastatic',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 2 weeks' }
            ]
        }
    },
    brain: {
        'Temozolomide-RT': {
            name: 'Temozolomide + RT (Stupp Protocol) - Newly Diagnosed GBM',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 75, unit: 'mg/m²', schedule: 'daily during RT, then 150-200mg/m² D1-D5 every 28 days' }
            ]
        },
        'PCV': {
            name: 'Procarbazine + CCNU + Vincristine (PCV) - Oligodendroglioma/Anaplastic',
            cycles: 6,
            drugs: [
                { name: 'Procarbazine', dose: 60, unit: 'mg/m²', schedule: 'PO D8-D21, every 8 weeks' },
                { name: 'CCNU (Lomustine)', dose: 130, unit: 'mg/m²', schedule: 'PO D1, every 8 weeks' },
                { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D8,D29, every 8 weeks (max 2mg)' }
            ]
        },
        'Temozolomide-Bevacizumab': {
            name: 'Temozolomide + Bevacizumab - Recurrent GBM',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 150, unit: 'mg/m²', schedule: 'D1-D5 every 28 days' },
                { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'D1,D15 every 28 days' }
            ]
        },
        'Irinotecan-Bevacizumab': {
            name: 'Irinotecan + Bevacizumab - Recurrent GBM',
            cycles: 6,
            drugs: [
                { name: 'Irinotecan', dose: 125, unit: 'mg/m²', schedule: 'D1 every 2 weeks' },
                { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'D1 every 2 weeks' }
            ]
        },
        'Carboplatin-Irinotecan-Bevacizumab': {
            name: 'Carboplatin + Irinotecan + Bevacizumab - Recurrent GBM',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 4-5', unit: 'AUC', schedule: 'D1, every 28 days', requiresAUC: true },
                { name: 'Irinotecan', dose: 340, unit: 'mg/m²', schedule: 'D1, D14, every 28 days' },
                { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'D1, D14, every 28 days' }
            ]
        },
        'Temozolomide-Lomustine': {
            name: 'Temozolomide + Lomustine - Recurrent GBM',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 100, unit: 'mg/m²', schedule: 'PO D2-D6, every 28 days' },
                { name: 'Lomustine (CCNU)', dose: 100, unit: 'mg/m²', schedule: 'PO D1, every 28 days' }
            ]
        },
        'Carmustine': {
            name: 'Carmustine (BCNU) - Recurrent GBM',
            cycles: 6,
            drugs: [
                { name: 'Carmustine (BCNU)', dose: 200, unit: 'mg/m²', schedule: 'D1 every 6 weeks' }
            ]
        },
        'Lomustine': {
            name: 'Lomustine (CCNU) - Recurrent GBM',
            cycles: 6,
            drugs: [
                { name: 'Lomustine (CCNU)', dose: 130, unit: 'mg/m²', schedule: 'D1 every 6 weeks' }
            ]
        },
        'Procarbazine': {
            name: 'Procarbazine (single agent) - Recurrent GBM',
            cycles: 6,
            drugs: [
                { name: 'Procarbazine', dose: 150, unit: 'mg/m²', schedule: 'PO daily divided into 3 doses' }
            ]
        },
        'Temozolomide': {
            name: 'Temozolomide (single agent) - Recurrent GBM',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 200, unit: 'mg/m²', schedule: 'D1-D5 every 28 days' }
            ]
        },
        'Irinotecan': {
            name: 'Irinotecan (single agent) - Recurrent GBM',
            cycles: 8,
            drugs: [
                { name: 'Irinotecan', dose: 350, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'Bevacizumab': {
            name: 'Bevacizumab (single agent) - Recurrent GBM',
            cycles: 8,
            drugs: [
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'every 21 days' }
            ]
        },
        'Tumor-Treating-Fields': {
            name: 'Tumor Treating Fields (TTFields) + Temozolomide - Newly Diagnosed GBM',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 150, unit: 'mg/m²', schedule: 'D1-D5 every 28 days' },
                { name: 'TTFields', dose: 'Device', unit: 'continuous', schedule: '18+ hours daily' }
            ]
        },
        // Ependymoma Regimens
        'Cisplatin-Etoposide-Ependymoma': {
            name: 'Cisplatin + Etoposide (Ependymoma)',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        // Adult Medulloblastoma Regimens
        'Cisplatin-Cyclophosphamide-Vincristine': {
            name: 'Cisplatin + Cyclophosphamide + Vincristine (Adult Medulloblastoma)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cyclophosphamide', dose: 1500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' }
            ]
        },
        'Carboplatin-Etoposide-Cyclophosphamide': {
            name: 'Carboplatin + Etoposide + Cyclophosphamide (Adult Medulloblastoma)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days', requiresAUC: true },
                { name: 'Etoposide', dose: 150, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Etoposide-Cyclophosphamide': {
            name: 'Cisplatin + Etoposide + Cyclophosphamide (Adult Medulloblastoma)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Etoposide', dose: 150, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Cyclophosphamide', dose: 1500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Lomustine-Vincristine': {
            name: 'Cisplatin + Lomustine + Vincristine (Adult Medulloblastoma)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 42 days' },
                { name: 'Lomustine (CCNU)', dose: 75, unit: 'mg/m²', schedule: 'PO D1, every 42 days' },
                { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D1, D8, every 42 days (max 2mg)' }
            ]
        }
    },
    gist: {
        // NEOADJUVANT THERAPY
        'Imatinib-Neoadjuvant': {
            name: 'Imatinib (Neoadjuvant) - Borderline Resectable/Large GIST',
            cycles: 6,
            drugs: [
                { name: 'Imatinib', dose: 400, unit: 'mg', schedule: 'daily for 3-6 months preoperatively' }
            ]
        },
        'Avapritinib-Neoadjuvant': {
            name: 'Avapritinib (Neoadjuvant) - Imatinib-insensitive GIST (PDGFRA D842V)',
            cycles: 6,
            drugs: [
                { name: 'Avapritinib', dose: 300, unit: 'mg', schedule: 'daily preoperatively' }
            ]
        },
        'Larotrectinib-Neoadjuvant': {
            name: 'Larotrectinib (NAVIGATE) (Neoadjuvant) - NTRK fusion GIST',
            cycles: 6,
            drugs: [
                { name: 'Larotrectinib', dose: 100, unit: 'mg', schedule: 'PO twice daily preoperatively' }
            ]
        },
        'Entrectinib-Neoadjuvant': {
            name: 'Entrectinib (STARTRK-2) (Neoadjuvant) - NTRK fusion GIST',
            cycles: 6,
            drugs: [
                { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'daily preoperatively' }
            ]
        },
        'Repotrectinib-Neoadjuvant': {
            name: 'Repotrectinib (TRIDENT-1) (Neoadjuvant) - NTRK fusion GIST',
            cycles: 6,
            drugs: [
                { name: 'Repotrectinib', dose: 160, unit: 'mg', schedule: 'daily preoperatively' }
            ]
        },
        'Sunitinib-Neoadjuvant-SDH': {
            name: 'Sunitinib (Neoadjuvant) - SDH deficient GIST',
            cycles: 6,
            drugs: [
                { name: 'Sunitinib', dose: 50, unit: 'mg', schedule: 'daily x 4 weeks, then 2 weeks off preoperatively' }
            ]
        },
        'Dabrafenib-Trametinib-Neoadjuvant': {
            name: 'Dabrafenib + Trametinib (Neoadjuvant) - BRAF V600E mutation GIST',
            cycles: 6,
            drugs: [
                { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'twice daily preoperatively' },
                { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'daily preoperatively' }
            ]
        },

        // ADJUVANT THERAPY
        'Imatinib-Adjuvant': {
            name: 'Imatinib (ACOSOG Z9001) (Adjuvant) - High-risk Resected GIST',
            cycles: 36,
            drugs: [
                { name: 'Imatinib', dose: 400, unit: 'mg', schedule: 'daily x 3 years (high-risk features)' }
            ]
        },

        // METASTATIC THERAPY
        'Imatinib-Metastatic': {
            name: 'Imatinib (B2222) (Metastatic GIST)',
            cycles: 12,
            drugs: [
                { name: 'Imatinib', dose: 400, unit: 'mg', schedule: 'daily until progression (800mg if exon 9 mutation)' }
            ]
        },
        'Avapritinib-PDGFRA': {
            name: 'Avapritinib (NAVIGATOR) - PDGFRA D842V mutant GIST',
            cycles: 8,
            drugs: [
                { name: 'Avapritinib', dose: 300, unit: 'mg', schedule: 'daily until progression' }
            ]
        },

        // METASTATIC THERAPY
        'Sunitinib': {
            name: 'Sunitinib (A6181004) (Metastatic) - Imatinib-resistant GIST',
            cycles: 8,
            drugs: [
                { name: 'Sunitinib', dose: 50, unit: 'mg', schedule: 'daily x 4 weeks, then 2 weeks off' }
            ]
        },

        // METASTATIC - 3L THERAPY
        'Regorafenib': {
            name: 'Regorafenib (GRID) (Metastatic - 3L) - Imatinib/Sunitinib-resistant GIST',
            cycles: 8,
            drugs: [
                { name: 'Regorafenib', dose: 160, unit: 'mg', schedule: 'daily x 21 days, then 7 days off' }
            ]
        },

        // METASTATIC THERAPY
        'Ripretinib': {
            name: 'Ripretinib (INVICTUS) (Metastatic) - Multiple TKI-resistant GIST',
            cycles: 8,
            drugs: [
                { name: 'Ripretinib', dose: 150, unit: 'mg', schedule: 'daily until progression' }
            ]
        },
        'Cabozantinib': {
            name: 'Cabozantinib - Multiple TKI-resistant GIST',
            cycles: 8,
            drugs: [
                { name: 'Cabozantinib', dose: 60, unit: 'mg', schedule: 'daily until progression' }
            ]
        },
        'Everolimus': {
            name: 'Everolimus - Multiple TKI-resistant GIST',
            cycles: 8,
            drugs: [
                { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'daily until progression' }
            ]
        },

        // ADDITIONAL OPTIONS
        'Nilotinib': {
            name: 'Nilotinib - Imatinib-resistant GIST',
            cycles: 8,
            drugs: [
                { name: 'Nilotinib', dose: 400, unit: 'mg', schedule: 'twice daily until progression' }
            ]
        },
        'Dasatinib': {
            name: 'Dasatinib - Imatinib-resistant GIST',
            cycles: 8,
            drugs: [
                { name: 'Dasatinib', dose: 70, unit: 'mg', schedule: 'twice daily until progression' }
            ]
        },
        'Sorafenib': {
            name: 'Sorafenib - TKI-resistant GIST',
            cycles: 8,
            drugs: [
                { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'twice daily until progression' }
            ]
        },
        'Pazopanib': {
            name: 'Pazopanib - TKI-resistant GIST',
            cycles: 8,
            drugs: [
                { name: 'Pazopanib', dose: 800, unit: 'mg', schedule: 'daily until progression' }
            ]
        }
    },
    tumor_agnostic: {
        'Pembrolizumab-MSI-H': {
            name: 'Pembrolizumab - MSI-H/dMMR Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
            ]
        },
        'Pembrolizumab-TMB-H': {
            name: 'Pembrolizumab - TMB-H (≥10 mut/Mb) Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
            ]
        },
        'Larotrectinib': {
            name: 'Larotrectinib - NTRK Fusion-positive Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Larotrectinib', dose: 100, unit: 'mg', schedule: 'twice daily until progression' }
            ]
        },
        'Entrectinib': {
            name: 'Entrectinib - NTRK Fusion-positive Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'daily until progression' }
            ]
        },
        'Repotrectinib': {
            name: 'Repotrectinib - NTRK Fusion-positive Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Repotrectinib', dose: 160, unit: 'mg', schedule: 'daily until progression' }
            ]
        },
        'Selpercatinib': {
            name: 'Selpercatinib - RET Fusion-positive Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Selpercatinib', dose: 160, unit: 'mg', schedule: 'twice daily until progression' }
            ]
        },
        'Pralsetinib': {
            name: 'Pralsetinib - RET Fusion-positive Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Pralsetinib', dose: 400, unit: 'mg', schedule: 'daily until progression' }
            ]
        },
        'Dabrafenib-Trametinib': {
            name: 'Dabrafenib + Trametinib - BRAF V600E-mutant Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'twice daily until progression' },
                { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'daily until progression' }
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
                { name: 'Vemurafenib', dose: 960, unit: 'mg', schedule: 'twice daily until progression' }
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
                { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'PO daily, continuous' }
            ]
        },
        'Everolimus-Octreotide': {
            name: 'Everolimus + Octreotide LAR (RADIANT-2 Trial) - (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'PO daily, continuous' },
                { name: 'Octreotide LAR', dose: 30, unit: 'mg', schedule: 'D1, every 28 days' }
            ]
        },
        'Sunitinib': {
            name: 'Sunitinib (Pancreatic NETs) - (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Sunitinib', dose: 37.5, unit: 'mg', schedule: 'PO daily, continuous' }
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
                { name: 'Cabozantinib', dose: 60, unit: 'mg', schedule: 'PO daily, continuous' }
            ]
        },
        'Lenvatinib': {
            name: 'Lenvatinib (Advanced NETs) - (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Lenvatinib', dose: 24, unit: 'mg', schedule: 'PO daily, continuous' }
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
            name: 'Carboplatin + Paclitaxel (Neoadjuvant/Adjuvant)',
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
                { name: 'Bleomycin', dose: 30, unit: 'units', schedule: 'D2, every 21 days' },
                { name: 'Ifosfamide', dose: 5000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Mesna', dose: 6000, unit: 'mg/m²', schedule: 'D1 (with ifosfamide + 4h and 8h post), every 21 days' },
                { name: 'Cisplatin', dose: 70, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'BIC-Neo-Adj': {
            name: 'Bleomycin + Ifosfamide + Carboplatin (Neoadjuvant/Adjuvant)',
            cycles: 3,
            drugs: [
                { name: 'Bleomycin', dose: 30, unit: 'units', schedule: 'D2, every 21 days' },
                { name: 'Ifosfamide', dose: 5000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Mesna', dose: 6000, unit: 'mg/m²', schedule: 'D1 (with ifosfamide + 4h and 8h post), every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },

        // Definitive Chemoradiotherapy
        'Cisplatin-RT': {
            name: 'Cisplatin + RT (Definitive)',
            cycles: 5,
            drugs: [
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'weekly during radiation therapy x 5-6 weeks' }
            ]
        },
        'Cisplatin-Pembrolizumab-RT': {
            name: 'Cisplatin + Pembrolizumab + RT (Definitive)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'weekly during radiation therapy x 5-6 weeks' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Pembrolizumab-RT': {
            name: 'Carboplatin + Pembrolizumab + RT (Definitive)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly during radiation therapy' },
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
            name: 'Cisplatin + Paclitaxel (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Metastatic': {
            name: 'Carboplatin + Paclitaxel (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Weekly-Metastatic': {
            name: 'Carboplatin + Paclitaxel Weekly (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly' },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly' }
            ]
        },
        'Carboplatin-Paclitaxel-Pembrolizumab-Metastatic': {
            name: 'Carboplatin + Paclitaxel + Pembrolizumab (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Paclitaxel-Pembrolizumab-Metastatic': {
            name: 'Cisplatin + Paclitaxel + Pembrolizumab (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Paclitaxel-Bevacizumab-Metastatic': {
            name: 'Cisplatin + Paclitaxel + Bevacizumab (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Bevacizumab-Metastatic': {
            name: 'Carboplatin + Paclitaxel + Bevacizumab (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Atezolizumab-Bevacizumab-Metastatic': {
            name: 'Carboplatin + Paclitaxel + Atezolizumab + Bevacizumab (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Paclitaxel-Atezolizumab-Bevacizumab-Metastatic': {
            name: 'Cisplatin + Paclitaxel + Atezolizumab + Bevacizumab (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Pembrolizumab-Bevacizumab-Metastatic': {
            name: 'Carboplatin + Paclitaxel + Pembrolizumab + Bevacizumab (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Paclitaxel-Pembrolizumab-Bevacizumab-Metastatic': {
            name: 'Cisplatin + Paclitaxel + Pembrolizumab + Bevacizumab (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },

        // Metastatic
        'Pembrolizumab-Metastatic-2L': {
            name: 'Pembrolizumab (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Tisotumab-Vedotin-Metastatic-2L': {
            name: 'Tisotumab vedotin (Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Tisotumab vedotin', dose: 2.0, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Topotecan-Metastatic-2L': {
            name: 'Topotecan (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', schedule: 'D1-5, every 21 days' }
            ]
        },
        'Topotecan-Weekly-Metastatic-2L': {
            name: 'Topotecan Weekly (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Topotecan', dose: 4.0, unit: 'mg/m²', schedule: 'weekly x 3, every 28 days' }
            ]
        },
        'Pemetrexed-Metastatic-2L': {
            name: 'Pemetrexed (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Metastatic-2L': {
            name: 'Gemcitabine (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Docetaxel-Metastatic-2L': {
            name: 'Docetaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Paclitaxel-Metastatic-2L': {
            name: 'Paclitaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Irinotecan-Metastatic-2L': {
            name: 'Irinotecan (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Irinotecan', dose: 125, unit: 'mg/m²', schedule: 'weekly x 4, then 2 weeks rest, repeat' }
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
            name: 'Cisplatin + Gemcitabine (Metastatic)',
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
            name: 'Carboplatin + Paclitaxel (Neoadjuvant/Adjuvant)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Pembrolizumab-Neo-Adj-Met': {
            name: 'Carboplatin + Paclitaxel + Pembrolizumab (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Dostarlimab-Neo-Adj-Met': {
            name: 'Carboplatin + Paclitaxel + Dostarlimab (Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Durvalumab-dMMR-Neo-Adj-Met': {
            name: 'Carboplatin + Paclitaxel + Durvalumab (dMMR/Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Durvalumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Trastuzumab-HER2-Neo-Adj-Met': {
            name: 'Carboplatin + Paclitaxel + Trastuzumab (HER2+ / Neoadjuvant/Adjuvant/Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose 8 mg/kg, then 6 mg/kg every 21 days', hasLoadingDose: true }
            ]
        },
        'Carboplatin-Paclitaxel-Bevacizumab-Neo-Adj-Met': {
            name: 'Carboplatin + Paclitaxel + Bevacizumab (Neoadjuvant/Adjuvant/Metastatic)',
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
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'weekly during radiation therapy' }
            ]
        },

        // Metastatic - 1L
        'Carboplatin-Paclitaxel-Metastatic': {
            name: 'Carboplatin + Paclitaxel (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Docetaxel-Metastatic': {
            name: 'Carboplatin + Docetaxel (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Lenvatinib-Pembrolizumab-Metastatic': {
            name: 'Lenvatinib + Pembrolizumab (Metastatic - 1L)',
            cycles: 12,
            drugs: [
                { name: 'Lenvatinib', dose: 20, unit: 'mg', schedule: 'daily, continuous' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },

        // Metastatic
        'AP-Metastatic': {
            name: 'Doxorubicin + Cisplatin (AP / Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'CAP-Metastatic': {
            name: 'Cyclophosphamide + Doxorubicin + Cisplatin (CAP / Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'TAP-Metastatic': {
            name: 'Cisplatin + Doxorubicin + Paclitaxel (TAP / Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Doxorubicin', dose: 45, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 160, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'AC-Metastatic': {
            name: 'Doxorubicin + Cyclophosphamide (AC / Metastatic)',
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
            name: 'Gemcitabine + Cisplatin (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },

        // Carcinosarcoma-specific regimens
        'Ifosfamide-Carcinosarcoma': {
            name: 'Ifosfamide (Carcinosarcoma)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 1500, unit: 'mg/m²', schedule: 'D1-5, every 21 days' },
                { name: 'Mesna', dose: 1800, unit: 'mg/m²', schedule: 'D1-5 (with ifosfamide + 4h and 8h post), every 21 days' }
            ]
        },
        'Ifosfamide-Paclitaxel-Carcinosarcoma': {
            name: 'Ifosfamide + Paclitaxel (Carcinosarcoma)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 1600, unit: 'mg/m²', schedule: 'D1-3, every 21 days' },
                { name: 'Mesna', dose: 1920, unit: 'mg/m²', schedule: 'D1-3 (with ifosfamide + 4h and 8h post), every 21 days' },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },

        // Single agents and targeted therapy for dMMR/MSI-H
        'Single-Pembrolizumab-dMMR': {
            name: 'Pembrolizumab (dMMR/MSI-H)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Single-Dostarlimab-dMMR': {
            name: 'Dostarlimab (dMMR/MSI-H)',
            cycles: 12,
            drugs: [
                { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'D1, every 21 days x 4, then 1000mg every 6 weeks' }
            ]
        },

        // Single agents
        'Single-Topotecan': {
            name: 'Topotecan (Single agent)',
            cycles: 6,
            drugs: [
                { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', schedule: 'D1-5, every 21 days' }
            ]
        },
        'Single-Doxorubicin': {
            name: 'Doxorubicin (Single agent)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Single-Paclitaxel': {
            name: 'Paclitaxel (Single agent)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },

        // Hormonal therapy
        'Megestrol': {
            name: 'Megestrol Acetate (Hormonal therapy)',
            cycles: 12,
            drugs: [
                { name: 'Megestrol Acetate', dose: 160, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Medroxyprogesterone': {
            name: 'Medroxyprogesterone Acetate (Hormonal therapy)',
            cycles: 12,
            drugs: [
                { name: 'Medroxyprogesterone Acetate', dose: 200, unit: 'mg', schedule: 'daily, continuous' }
            ]
        }
    },
    colorectal: {
        colon_cancer: {
            // Adjuvant Therapy
            'Capecitabine-Adjuvant': {
                name: 'Capecitabine (Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO BD D1-D14, every 21 days' }
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
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 2 weeks' }
                ]
            },
            'CAPEOX-Neo-Adj': {
                name: 'CAPEOX (Neoadjuvant/Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO BD D1-D14, every 21 days' }
                ]
            },
            'Nivolumab-Ipilimumab-Neo-NICHE2': {
                name: 'Nivolumab + Ipilimumab (Neoadjuvant / NICHE-2 protocol / dMMR/MSI-H/POLE mutation)',
                cycles: 2,
                drugs: [
                    { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'D1, D15' },
                    { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1 only' }
                ]
            },
            'Pembrolizumab-Neo-dMMR': {
                name: 'Pembrolizumab (Neoadjuvant / dMMR/MSI-H/POLE mutation)',
                cycles: 4,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Cemiplimab-Neo-dMMR': {
                name: 'Cemiplimab (Neoadjuvant / dMMR/MSI-H/POLE mutation)',
                cycles: 4,
                drugs: [
                    { name: 'Cemiplimab', dose: 350, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Dostarlimab-Neo-dMMR': {
                name: 'Dostarlimab (Neoadjuvant / dMMR/MSI-H/POLE mutation)',
                cycles: 4,
                drugs: [
                    { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Retifanlimab-Neo-dMMR': {
                name: 'Retifanlimab (Neoadjuvant / dMMR/MSI-H/POLE mutation)',
                cycles: 4,
                drugs: [
                    { name: 'Retifanlimab', dose: 500, unit: 'mg', schedule: 'D1, every 28 days' }
                ]
            },
            'Toripalimab-Neo-dMMR': {
                name: 'Toripalimab (Neoadjuvant / dMMR/MSI-H/POLE mutation)',
                cycles: 4,
                drugs: [
                    { name: 'Toripalimab', dose: 240, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Tislelizumab-Neo-dMMR': {
                name: 'Tislelizumab (Neoadjuvant / dMMR/MSI-H/POLE mutation)',
                cycles: 4,
                drugs: [
                    { name: 'Tislelizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'mFOLFOX6-Atezolizumab-Adj-dMMR': {
                name: 'mFOLFOX6 + Atezolizumab (Adjuvant / dMMR/MSI-H/POLE mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 2 weeks' },
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'CAPEOX-Atezolizumab-Adj-dMMR': {
                name: 'CAPEOX + Atezolizumab (Adjuvant / dMMR/MSI-H/POLE mutation)',
                cycles: 8,
                drugs: [
                    { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO BD D1-D14, every 21 days' },
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
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 2 weeks' }
                ]
            },
            'CAPEOX-Rectal-Neo-Adj': {
                name: 'CAPEOX (Neoadjuvant/Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO BD D1-D14, every 21 days' }
                ]
            },
            'Dostarlimab-Rectal-Neo-dMMR': {
                name: 'Dostarlimab (Neoadjuvant / dMMR/MSI-H)',
                cycles: 4,
                drugs: [
                    { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            '5FU-RT-German-AIO': {
                name: '5-FU + RT (Neoadjuvant/Adjuvant / German AIO)',
                cycles: 2,
                drugs: [
                    { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'continuous infusion D1-D5, every 28 days during RT' }
                ]
            },
            'Capecitabine-RT-Neo-Adj': {
                name: 'Capecitabine + RT (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'PO BD on days of radiation therapy' }
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
            'CAPEOX-RT-Neo': {
                name: 'CAPEOX + RT (Neoadjuvant)',
                cycles: 5,
                drugs: [
                    { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'PO BD D1-D14 and D22-D35 during RT' },
                    { name: 'Oxaliplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, D8, D22, D29 during RT' }
                ]
            },
            '5FU-LV-Weekly-Adj': {
                name: '5-FU + Leucovorin Weekly (Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: '5-Fluorouracil', dose: 500, unit: 'mg/m²', schedule: 'D1, weekly' },
                    { name: 'Leucovorin', dose: 500, unit: 'mg/m²', schedule: 'D1, weekly' }
                ]
            },
            'FOLFOX4-Adj': {
                name: 'FOLFOX4 (Adjuvant)',
                cycles: 12,
                drugs: [
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil infusion', dose: 600, unit: 'mg/m²', schedule: '22-hour infusion D1-D2, every 2 weeks' },
                    { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, D2, every 2 weeks' }
                ]
            },
            '5FU-LV-deGramont-Adj': {
                name: '5-FU + Leucovorin (deGramont regimen / Adjuvant)',
                cycles: 12,
                drugs: [
                    { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, D2, every 2 weeks' },
                    { name: '5-Fluorouracil infusion', dose: 600, unit: 'mg/m²', schedule: '22-hour infusion D1, D2, every 2 weeks' },
                    { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, D2, every 2 weeks' }
                ]
            },
            'Capecitabine-Rectal-Adj': {
                name: 'Capecitabine (Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO BD D1-D14, every 21 days' }
                ]
            }
        },

        metastatic_colorectal: {
            // Metastatic - 1L
            'Modified-IFL-Saltz': {
                name: 'Modified IFL (Saltz regimen / Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Irinotecan', dose: 125, unit: 'mg/m²', schedule: 'D1, D8, D15, D22, every 6 weeks' },
                    { name: '5-Fluorouracil bolus', dose: 500, unit: 'mg/m²', schedule: 'D1, D8, D15, D22, every 6 weeks' },
                    { name: 'Leucovorin', dose: 20, unit: 'mg/m²', schedule: 'D1, D8, D15, D22, every 6 weeks' }
                ]
            },
            'Douillard-Regimen': {
                name: 'Douillard Regimen (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil infusion', dose: 600, unit: 'mg/m²', schedule: '22-hour infusion D1-D2, every 2 weeks' },
                    { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, every 2 weeks' }
                ]
            },
            'mFOLFIRI-Metastatic': {
                name: 'mFOLFIRI (Metastatic - 1L)',
                cycles: 12,
                drugs: [
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 2 weeks' }
                ]
            },
            'mFOLFOX6-Metastatic': {
                name: 'mFOLFOX6 (Metastatic - 1L)',
                cycles: 12,
                drugs: [
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 2 weeks' }
                ]
            },
            'FOLFOXIRI-Metastatic': {
                name: 'FOLFOXIRI (Metastatic - 1L)',
                cycles: 12,
                drugs: [
                    { name: 'Irinotecan', dose: 165, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil infusion', dose: 3200, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 2 weeks' },
                    { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, D2, every 2 weeks' }
                ]
            },
            'mFOLFOX6-Bevacizumab-Metastatic': {
                name: 'mFOLFOX6 + Bevacizumab (Metastatic - 1L)',
                cycles: 12,
                drugs: [
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 2 weeks' },
                    { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'D1, every 2 weeks' }
                ]
            },
            'CAPEOX-Bevacizumab-Metastatic': {
                name: 'CAPEOX + Bevacizumab (Metastatic - 1L)',
                cycles: 8,
                drugs: [
                    { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO BD D1-D14, every 21 days' },
                    { name: 'Bevacizumab', dose: 7.5, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'FOLFIRI-Bevacizumab-Metastatic': {
                name: 'FOLFIRI + Bevacizumab (Metastatic - 1L)',
                cycles: 12,
                drugs: [
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 2 weeks' },
                    { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'D1, every 2 weeks' }
                ]
            },
            'FOLFIRINOX-Metastatic': {
                name: 'FOLFIRINOX (Metastatic - 1L)',
                cycles: 12,
                drugs: [
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 2 weeks' }
                ]
            },
            'FOLFIRINOX-Bevacizumab-Metastatic': {
                name: 'FOLFIRINOX + Bevacizumab (Metastatic - 1L)',
                cycles: 12,
                drugs: [
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 2 weeks' },
                    { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'D1, every 2 weeks' }
                ]
            },
            'FOLFOXIRI-Bevacizumab-Metastatic': {
                name: 'FOLFOXIRI + Bevacizumab (Metastatic - 1L)',
                cycles: 12,
                drugs: [
                    { name: 'Irinotecan', dose: 165, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil infusion', dose: 3200, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 2 weeks' },
                    { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, D2, every 2 weeks' },
                    { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'D1, every 2 weeks' }
                ]
            },
            'mFOLFOX6-Cetuximab-Metastatic': {
                name: 'mFOLFOX6 + Cetuximab (Metastatic / KRAS/NRAS/BRAF WT/Left-sided)',
                cycles: 12,
                drugs: [
                    { name: 'Cetuximab', dose: 500, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 2 weeks' }
                ]
            },
            'mFOLFOX6-Panitumumab-Metastatic': {
                name: 'mFOLFOX6 + Panitumumab (Metastatic / KRAS/NRAS/BRAF WT/Left-sided)',
                cycles: 12,
                drugs: [
                    { name: 'Panitumumab', dose: 6, unit: 'mg/kg', schedule: 'D1, every 2 weeks' },
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 2 weeks' }
                ]
            },
            'CAPEOX-Cetuximab-Metastatic': {
                name: 'CAPEOX + Cetuximab (Metastatic / KRAS/NRAS/BRAF WT/Left-sided)',
                cycles: 8,
                drugs: [
                    { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'weekly (loading dose 400 mg/m², then 250 mg/m²)', hasLoadingDose: true },
                    { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO BD D1-D14, every 21 days' }
                ]
            },
            'CAPEOX-Panitumumab-Metastatic': {
                name: 'CAPEOX + Panitumumab (Metastatic / KRAS/NRAS/BRAF WT/Left-sided)',
                cycles: 8,
                drugs: [
                    { name: 'Panitumumab', dose: 6, unit: 'mg/kg', schedule: 'D1, every 2 weeks' },
                    { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO BD D1-D14, every 21 days' }
                ]
            },
            'FOLFIRI-Cetuximab-Metastatic': {
                name: 'FOLFIRI + Cetuximab (Metastatic / KRAS/NRAS/BRAF WT/Left-sided)',
                cycles: 12,
                drugs: [
                    { name: 'Cetuximab', dose: 500, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 2 weeks' }
                ]
            },
            'FOLFIRI-Panitumumab-Metastatic': {
                name: 'FOLFIRI + Panitumumab (Metastatic / KRAS/NRAS/BRAF WT/Left-sided)',
                cycles: 12,
                drugs: [
                    { name: 'Panitumumab', dose: 6, unit: 'mg/kg', schedule: 'D1, every 2 weeks' },
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 2 weeks' }
                ]
            },

            // Metastatic and Later
            'Cetuximab-Irinotecan-Metastatic': {
                name: 'Cetuximab + Irinotecan (Metastatic / KRAS/NRAS/BRAF WT)',
                cycles: 8,
                drugs: [
                    { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'weekly (loading dose 400 mg/m², then 250 mg/m²)', hasLoadingDose: true },
                    { name: 'Irinotecan', dose: 350, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'CAPEOX-Metastatic': {
                name: 'CAPEOX (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO BD D1-D14, every 21 days' }
                ]
            },
            'XELIRI-Metastatic': {
                name: 'Capecitabine + Irinotecan (XELIRI / Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO BD D1-D14, every 21 days' },
                    { name: 'Irinotecan', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Capecitabine-Mitomycin-C-Metastatic': {
                name: 'Capecitabine + Mitomycin-C (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO BD D1-D14, every 21 days' },
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
                name: '5-FU + Leucovorin (Roswell Park schedule / Metastatic)',
                cycles: 6,
                drugs: [
                    { name: '5-Fluorouracil', dose: 500, unit: 'mg/m²', schedule: 'D1, weekly for 6 weeks, then 2 weeks rest' },
                    { name: 'Leucovorin', dose: 500, unit: 'mg/m²', schedule: 'D1, weekly for 6 weeks, then 2 weeks rest' }
                ]
            },
            '5FU-LV-Bevacizumab-Metastatic': {
                name: '5-FU + Leucovorin + Bevacizumab (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: '5-Fluorouracil', dose: 500, unit: 'mg/m²', schedule: 'D1, weekly' },
                    { name: 'Leucovorin', dose: 500, unit: 'mg/m²', schedule: 'D1, weekly' },
                    { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'D1, every 2 weeks' }
                ]
            },
            'TAS-102-Bevacizumab-Metastatic': {
                name: 'TAS-102 + Bevacizumab (SUNLIGHT) (Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'TAS-102', dose: 35, unit: 'mg/m²', schedule: 'PO BD D1-5, D8-12, every 28 days' },
                    { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'D1, every 2 weeks' }
                ]
            },
            'TAS-102-Metastatic': {
                name: 'TAS-102 (RECOURSE) (Trifluridine/Tipiracil / Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'TAS-102', dose: 35, unit: 'mg/m²', schedule: 'PO BD D1-5, D8-12, every 28 days' }
                ]
            },
            'Cetuximab-Bevacizumab-Irinotecan-Metastatic': {
                name: 'Cetuximab + Bevacizumab + Irinotecan (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Cetuximab', dose: 500, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'D1, every 2 weeks' },
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 2 weeks' }
                ]
            },
            'Cetuximab-Bevacizumab-Metastatic': {
                name: 'Cetuximab + Bevacizumab (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Cetuximab', dose: 500, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'D1, every 2 weeks' }
                ]
            },
            'Irinotecan-Cetuximab-Metastatic': {
                name: 'Irinotecan + Cetuximab (CRYSTAL/OPUS) (Metastatic / KRAS/NRAS/BRAF WT)',
                cycles: 8,
                drugs: [
                    { name: 'Irinotecan', dose: 350, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'weekly (loading dose 400 mg/m², then 250 mg/m²)', hasLoadingDose: true }
                ]
            },
            'XELIRI-Bevacizumab-Metastatic': {
                name: 'XELIRI + Bevacizumab (Metastatic)',
                cycles: 8,
                drugs: [
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO BD D1-D14, every 21 days' },
                    { name: 'Irinotecan', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Bevacizumab', dose: 7.5, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'FOLFIRI-Ziv-Aflibercept-Metastatic': {
                name: 'FOLFIRI + Ziv-aflibercept (VELOUR) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 2 weeks' },
                    { name: 'Ziv-aflibercept', dose: 4, unit: 'mg/kg', schedule: 'D1, every 2 weeks' }
                ]
            },
            'FOLFIRI-Ramucirumab-Metastatic': {
                name: 'FOLFIRI + Ramucirumab (RAISE) (Metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 2 weeks' },
                    { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'D1, every 2 weeks' }
                ]
            },

            // BRAF V600E Targeted Therapy
            'mFOLFOX6-Encorafenib-Cetuximab-BRAF': {
                name: 'mFOLFOX6 + Encorafenib + Cetuximab (BREAKWATER) (BRAF V600E mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 2 weeks' },
                    { name: 'Encorafenib', dose: 300, unit: 'mg', schedule: 'daily' },
                    { name: 'Cetuximab', dose: 500, unit: 'mg/m²', schedule: 'D1, every 2 weeks' }
                ]
            },
            'mFOLFOX6-Encorafenib-Panitumumab-BRAF': {
                name: 'mFOLFOX6 + Encorafenib + Panitumumab (BRAF V600E mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: '46-hour infusion D1-D2, every 2 weeks' },
                    { name: 'Encorafenib', dose: 300, unit: 'mg', schedule: 'daily' },
                    { name: 'Panitumumab', dose: 6, unit: 'mg/kg', schedule: 'D1, every 2 weeks' }
                ]
            },
            'Vemurafenib-Irinotecan-Cetuximab-BRAF': {
                name: 'Vemurafenib + Irinotecan + Cetuximab (SWOG-1406) (BRAF V600E mutation)',
                cycles: 8,
                drugs: [
                    { name: 'Vemurafenib', dose: 960, unit: 'mg', schedule: 'PO BD daily' },
                    { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Cetuximab', dose: 500, unit: 'mg/m²', schedule: 'D1, every 2 weeks' }
                ]
            },
            'Binimetinib-Encorafenib-Cetuximab-BRAF': {
                name: 'Binimetinib + Encorafenib + Cetuximab (BEACON CRC) (BRAF V600E mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Binimetinib', dose: 45, unit: 'mg', schedule: 'PO BD daily' },
                    { name: 'Encorafenib', dose: 300, unit: 'mg', schedule: 'daily' },
                    { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'weekly (loading dose 400 mg/m², then 250 mg/m²)', hasLoadingDose: true }
                ]
            },
            'Encorafenib-Cetuximab-BRAF': {
                name: 'Encorafenib + Cetuximab (BEACON CRC) (BRAF V600E mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Encorafenib', dose: 300, unit: 'mg', schedule: 'daily' },
                    { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'weekly (loading dose 400 mg/m², then 250 mg/m²)', hasLoadingDose: true }
                ]
            },
            'Encorafenib-Panitumumab-BRAF': {
                name: 'Encorafenib + Panitumumab (BRAF V600E mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Encorafenib', dose: 300, unit: 'mg', schedule: 'daily' },
                    { name: 'Panitumumab', dose: 6, unit: 'mg/kg', schedule: 'D1, every 2 weeks' }
                ]
            },

            // Immunotherapy (dMMR/MSI-H)
            'Nivolumab-Ipilimumab-dMMR': {
                name: 'Nivolumab + Ipilimumab (CheckMate-142) (dMMR/MSI-H)',
                cycles: 12,
                drugs: [
                    { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 2 weeks' },
                    { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'every 6 weeks for 4 doses' }
                ]
            },

            // HER2 Targeted Therapy
            'Trastuzumab-Lapatinib-HER2': {
                name: 'Trastuzumab + Lapatinib (HER2 positive)',
                cycles: 12,
                drugs: [
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'weekly (loading dose 8 mg/kg, then 6 mg/kg)', hasLoadingDose: true },
                    { name: 'Lapatinib', dose: 1000, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Trastuzumab-Tucatinib-HER2': {
                name: 'Trastuzumab + Tucatinib (HER2 positive)',
                cycles: 12,
                drugs: [
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'weekly (loading dose 8 mg/kg, then 6 mg/kg)', hasLoadingDose: true },
                    { name: 'Tucatinib', dose: 300, unit: 'mg', schedule: 'PO BD daily' }
                ]
            },
            'Trastuzumab-Pertuzumab-HER2': {
                name: 'Trastuzumab + Pertuzumab (HER2 positive)',
                cycles: 12,
                drugs: [
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'weekly (loading dose 8 mg/kg, then 6 mg/kg)', hasLoadingDose: true },
                    { name: 'Pertuzumab', dose: 840, maintenanceDose: 420, unit: 'mg', schedule: 'every 21 days (loading dose 840 mg, then 420 mg)', hasLoadingDose: true }
                ]
            },

            // Single Agents
            'Capecitabine-Single': {
                name: 'Capecitabine (Single agent)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO BD D1-D14, every 21 days' }
                ]
            },
            'Irinotecan-Weekly-Single': {
                name: 'Irinotecan Weekly (Single agent)',
                cycles: 6,
                drugs: [
                    { name: 'Irinotecan', dose: 125, unit: 'mg/m²', schedule: 'weekly for 4 weeks, then 2 weeks rest' }
                ]
            },
            'Irinotecan-Monthly-Single': {
                name: 'Irinotecan Monthly (Single agent)',
                cycles: 6,
                drugs: [
                    { name: 'Irinotecan', dose: 350, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Cetuximab-Single': {
                name: 'Cetuximab (Single agent / KRAS/NRAS/BRAF WT)',
                cycles: 8,
                drugs: [
                    { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'weekly (loading dose 400 mg/m², then 250 mg/m²)', hasLoadingDose: true }
                ]
            },
            'Panitumumab-Single': {
                name: 'Panitumumab (Single agent / KRAS/NRAS/BRAF WT)',
                cycles: 8,
                drugs: [
                    { name: 'Panitumumab', dose: 6, unit: 'mg/kg', schedule: 'D1, every 2 weeks' }
                ]
            },
            'Trastuzumab-Deruxtecan-HER2': {
                name: 'Trastuzumab deruxtecan (HER2 positive)',
                cycles: 8,
                drugs: [
                    { name: 'Trastuzumab deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'Regorafenib-Single': {
                name: 'Regorafenib (CORRECT) (Single agent)',
                cycles: 6,
                drugs: [
                    { name: 'Regorafenib', dose: 160, unit: 'mg', schedule: 'daily for 21 days, then 7 days rest, every 28 days' }
                ]
            },
            'Pembrolizumab-dMMR': {
                name: 'Pembrolizumab (KEYNOTE-177) (dMMR/MSI-H)',
                cycles: 12,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Nivolumab-dMMR': {
                name: 'Nivolumab (dMMR/MSI-H)',
                cycles: 12,
                drugs: [
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 2 weeks' }
                ]
            },
            'Larotrectinib-NTRK': {
                name: 'Larotrectinib (NAVIGATE) (NTRK fusion)',
                cycles: 12,
                drugs: [
                    { name: 'Larotrectinib', dose: 100, unit: 'mg', schedule: 'PO BD daily' }
                ]
            },
            'Entrectinib-NTRK': {
                name: 'Entrectinib (STARTRK-2) (NTRK fusion)',
                cycles: 12,
                drugs: [
                    { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Sotorasib-KRAS-G12C': {
                name: 'Sotorasib (CodeBreaK 100) (KRAS G12C mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Sotorasib', dose: 960, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Adagrasib-KRAS-G12C': {
                name: 'Adagrasib (KRYSTAL-1) (KRAS G12C mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Adagrasib', dose: 600, unit: 'mg', schedule: 'PO BD daily' }
                ]
            },
            'Selpercatinib-RET': {
                name: 'Selpercatinib (LIBRETTO-001) (RET gene fusion)',
                cycles: 12,
                drugs: [
                    { name: 'Selpercatinib', dose: 160, unit: 'mg', schedule: 'PO BD daily' }
                ]
            },
            'Dostarlimab-dMMR': {
                name: 'Dostarlimab (dMMR/MSI-H)',
                cycles: 12,
                drugs: [
                    { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Cemiplimab-dMMR': {
                name: 'Cemiplimab (dMMR/MSI-H)',
                cycles: 12,
                drugs: [
                    { name: 'Cemiplimab', dose: 350, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Trifluridine-Tipiracil-Bevacizumab': {
                name: 'Trifluridine + Tipiracil + Bevacizumab',
                cycles: 6,
                drugs: [
                    { name: 'Trifluridine + Tipiracil', dose: 35, unit: 'mg/m²', schedule: 'PO BD D1-5, D8-12, every 28 days' },
                    { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'D1, every 2 weeks' }
                ]
            },
            'Retifanlimab-dMMR': {
                name: 'Retifanlimab (dMMR/MSI-H)',
                cycles: 12,
                drugs: [
                    { name: 'Retifanlimab', dose: 500, unit: 'mg', schedule: 'D1, every 28 days' }
                ]
            },
            'Tislelizumab-dMMR': {
                name: 'Tislelizumab (dMMR/MSI-H)',
                cycles: 12,
                drugs: [
                    { name: 'Tislelizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Toripalimab-dMMR': {
                name: 'Toripalimab (dMMR/MSI-H)',
                cycles: 12,
                drugs: [
                    { name: 'Toripalimab', dose: 240, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Fruquintinib': {
                name: 'Fruquintinib',
                cycles: 6,
                drugs: [
                    { name: 'Fruquintinib', dose: 5, unit: 'mg', schedule: 'daily for 21 days, then 7 days rest, every 28 days' }
                ]
            },
            'Nivolumab-Ipilimumab-dMMR': {
                name: 'Nivolumab + Ipilimumab (dMMR/MSI-H)',
                cycles: 12,
                drugs: [
                    { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 21 days x 4 doses, then 240mg every 2 weeks or 480mg every 4 weeks' },
                    { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 21 days x 4 doses only' }
                ]
            }
        }
    },
    esophageal: {
        // NEOADJUVANT/PERIOPERATIVE THERAPY
        'CROSS-Neoadjuvant': {
            name: 'CROSS Protocol (Neoadjuvant) - Carboplatin + Paclitaxel + RT',
            cycles: 5,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, weekly x 5 weeks with RT' },
                { name: 'Paclitaxel', dose: 50, unit: 'mg/m²', schedule: 'D1, weekly x 5 weeks with RT' }
            ]
        },
        'PRODIGES-ACCORD17-Neoadjuvant': {
            name: 'PRODIGES/ACCORD17 (Neoadjuvant) - 5-FU + Cisplatin + RT',
            cycles: 2,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, week 1 and 5 with RT' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'D1-D4, continuous infusion week 1 and 5 with RT' }
            ]
        },
        'FLOT4-Perioperative': {
            name: 'FLOT4 (Perioperative) - Docetaxel + Oxaliplatin + Leucovorin + 5-FU',
            cycles: 8,
            drugs: [
                { name: 'Docetaxel', dose: 50, unit: 'mg/m²', schedule: 'D1, every 2 weeks (4 cycles preop + 4 cycles postop)' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks (4 cycles preop + 4 cycles postop)' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'D1, every 2 weeks (4 cycles preop + 4 cycles postop)' },
                { name: '5-Fluorouracil', dose: 2600, unit: 'mg/m²', schedule: 'D1, CI over 24 hours, every 2 weeks (4 cycles preop + 4 cycles postop)' }
            ]
        },
        'ECF-MAGIC-Perioperative': {
            name: 'ECF MAGIC (Perioperative) - Epirubicin + Cisplatin + 5-FU',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days (3 cycles preop + 3 cycles postop)' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days (3 cycles preop + 3 cycles postop)' },
                { name: '5-Fluorouracil', dose: 200, unit: 'mg/m²', schedule: 'D1-D21, continuous infusion, every 21 days (3 cycles preop + 3 cycles postop)' }
            ]
        },
        'Neoadjuvant-Nivolumab-Ipilimumab': {
            name: 'Nivolumab + Ipilimumab (Neoadjuvant)',
            cycles: 3,
            drugs: [
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 2 weeks x 6 doses (preoperative)' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 6 weeks x 2 doses (preoperative)' }
            ]
        },
        'Neoadjuvant-FOLFOX-Pembrolizumab': {
            name: 'mFOLFOX6 + Pembrolizumab (Neoadjuvant)',
            cycles: 4,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks x 8 cycles (preoperative)' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks x 8 cycles (preoperative)' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'D1, bolus, every 2 weeks x 8 cycles (preoperative)' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'D1-D2, CI over 46 hours, every 2 weeks x 8 cycles (preoperative)' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days x 4 cycles (preoperative)' }
            ]
        },
        'Neoadjuvant-CAPEOX-Trastuzumab-HER2': {
            name: 'CAPEOX + Trastuzumab (Neoadjuvant, HER2+)',
            cycles: 6,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days x 6 cycles (preoperative)' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1-D14, twice daily, every 21 days x 6 cycles (preoperative)' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg every 21 days x 6 cycles (preoperative)', hasLoadingDose: true }
            ]
        },

        // ADJUVANT THERAPY
        'Adjuvant-Nivolumab': {
            name: 'Nivolumab (Adjuvant) - post-CRT with residual disease',
            cycles: 16,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 2 weeks x 16 cycles (postoperative)' }
            ]
        },
        // DEFINITIVE CHEMORADIATION (SQUAMOUS CELL CARCINOMA)
        'Definitive-5FU-Cisplatin-RT': {
            name: '5-FU + Cisplatin + RT (Definitive, Squamous)',
            cycles: 2,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, week 1 and 5 with RT' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'D1-D4, continuous infusion week 1 and 5 with RT' }
            ]
        },

        // METASTATIC THERAPY
        'Metastatic-Nivolumab-Ipilimumab-MSI': {
            name: 'Nivolumab + Ipilimumab (Metastatic - 1L, MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'D1, every 2 weeks x 4, then 480mg flat dose every 28 days' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'D1, every 6 weeks x 4 doses' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab (Neoadjuvant/Adjuvant/Metastatic, MSI-H/dMMR or PD-L1 CPS ≥1)',
            cycles: 17,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Metastatic-FOLFOX-Pembrolizumab': {
            name: 'mFOLFOX6 + Pembrolizumab (Metastatic - 1L, PD-L1 CPS≥1)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'D1, bolus, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'D1-D2, CI over 46 hours, every 2 weeks' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days (given with every other FOLFOX cycle)' }
            ]
        },
        'Metastatic-CAPEOX-Trastuzumab-HER2': {
            name: 'CAPEOX + Trastuzumab (Metastatic - 1L, HER2+)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1-D14, twice daily, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg every 21 days', hasLoadingDose: true }
            ]
        },
        'Metastatic-FOLFOX-Trastuzumab-HER2': {
            name: 'mFOLFOX6 + Trastuzumab (Metastatic - 1L, HER2+)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'D1, bolus, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'D1-D2, CI over 46 hours, every 2 weeks' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg every 21 days', hasLoadingDose: true }
            ]
        },
        'Metastatic-CAPEOX-Trastuzumab-Pembrolizumab-HER2': {
            name: 'CAPEOX + Trastuzumab + Pembrolizumab (Metastatic - 1L, HER2+/PD-L1 CPS≥1)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1-D14, twice daily, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg every 21 days', hasLoadingDose: true },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Metastatic-FOLFOX': {
            name: 'mFOLFOX6 (Metastatic - 1L)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'D1, bolus, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'D1-D2, CI over 46 hours, every 2 weeks' }
            ]
        },
        'Metastatic-CAPEOX': {
            name: 'CAPEOX (Metastatic - 1L)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1-D14, twice daily, every 21 days' }
            ]
        },
        'Metastatic-Carboplatin-Paclitaxel': {
            name: 'Carboplatin + Paclitaxel (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Metastatic-Cisplatin-Paclitaxel': {
            name: 'Cisplatin + Paclitaxel (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Metastatic-ECX': {
            name: 'ECX (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 625, unit: 'mg/m²', schedule: 'D1-D21, twice daily, every 21 days' }
            ]
        },
        'Metastatic-EOX': {
            name: 'EOX (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 625, unit: 'mg/m²', schedule: 'D1-D21, twice daily, every 21 days' }
            ]
        },

        // METASTATIC THERAPY
        'Metastatic-FOLFIRI-2L': {
            name: 'FOLFIRI (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'D1, bolus, every 2 weeks' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'D1-D2, CI over 46 hours, every 2 weeks' }
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
            name: 'Trastuzumab Deruxtecan (T-DXd) (Metastatic, HER2+)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab Deruxtecan', dose: 6.4, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Metastatic-Trastuzumab-Pertuzumab-HER2-2L': {
            name: 'Trastuzumab + Pertuzumab (Metastatic, HER2+)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose D1, then 6 mg/kg every 21 days', hasLoadingDose: true },
                { name: 'Pertuzumab', dose: 840, maintenanceDose: 420, unit: 'mg', schedule: 'loading dose D1, then 420 mg every 21 days', hasLoadingDose: true }
            ]
        },
        'Metastatic-Paclitaxel-2L': {
            name: 'Paclitaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Metastatic-Paclitaxel-Weekly-2L': {
            name: 'Paclitaxel (Metastatic, weekly)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, weekly x 18 weeks' }
            ]
        },
        'Metastatic-Docetaxel-2L': {
            name: 'Docetaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Metastatic-Irinotecan-2L': {
            name: 'Irinotecan (Metastatic)',
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
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', schedule: 'D1-D2, CI over 46 hours, every 2 weeks' },
                { name: 'Paclitaxel', dose: 150, unit: 'mg/m²', schedule: 'D1, every 2 weeks' }
            ]
        },

        // METASTATIC - 3L+ THERAPY
        'Metastatic-Pembrolizumab-3L': {
            name: 'Pembrolizumab (Metastatic - 3L+, PD-L1 CPS≥10)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Metastatic-Regorafenib-3L': {
            name: 'Regorafenib (Metastatic - 3L+)',
            cycles: 12,
            drugs: [
                { name: 'Regorafenib', dose: 160, unit: 'mg', schedule: 'PO daily D1-D21, every 28 days' }
            ]
        },
        'Metastatic-Trifluridine-Tipiracil-3L': {
            name: 'Trifluridine/Tipiracil (TAS-102) (Metastatic - 3L+)',
            cycles: 12,
            drugs: [
                { name: 'Trifluridine/Tipiracil', dose: 35, unit: 'mg/m²', schedule: 'PO twice daily D1-D5, D8-D12, every 28 days' }
            ]
        }
    },
    head_neck: {
        // DEFINITIVE CHEMORADIOTHERAPY
        'Cisplatin-RT': {
            name: 'Cisplatin + RT (Definitive/Adjuvant)',
            cycles: 3,
            drugs: [
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days with concurrent RT' }
            ]
        },
        'Cisplatin-RT-Weekly': {
            name: 'Cisplatin + RT (weekly) (Definitive/Adjuvant)',
            cycles: 7,
            drugs: [
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'D1, weekly x 7 weeks with concurrent RT' }
            ]
        },
        'Cetuximab-RT': {
            name: 'Cetuximab + RT (Definitive)',
            cycles: 7,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'D1 loading dose 400 mg/m², then D8, D15, D22, D29, D36, D43, D50 at 250 mg/m² with concurrent RT', hasLoadingDose: true }
            ]
        },
        'Carboplatin-Paclitaxel-RT': {
            name: 'Carboplatin + Paclitaxel + RT (weekly) (Definitive/Adjuvant)',
            cycles: 7,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, weekly x 7 weeks with concurrent RT' },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, weekly x 7 weeks with concurrent RT' }
            ]
        },

        // NEOADJUVANT THERAPY
        'TPF-Neoadjuvant': {
            name: 'TPF (TAX-323/324) (Neoadjuvant) - Docetaxel + Cisplatin + 5-FU',
            cycles: 3,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'D1-D4, continuous infusion, every 21 days' }
            ]
        },
        'TPF-Modified-Neoadjuvant': {
            name: 'TPF Modified (Neoadjuvant) - Docetaxel + Cisplatin + 5-FU',
            cycles: 3,
            drugs: [
                { name: 'Docetaxel', dose: 70, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'D1-D4, continuous infusion, every 21 days' }
            ]
        },
        'TIP-Neoadjuvant': {
            name: 'TIP (Neoadjuvant) - Docetaxel + Ifosfamide + Cisplatin',
            cycles: 4,
            drugs: [
                { name: 'Docetaxel', dose: 30, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Mesna', dose: 1200, unit: 'mg/m²', schedule: 'D1-D3, every 21 days (same dose as Ifosfamide)' }
            ]
        },
        'Paclitaxel-Ifosfamide-Cisplatin-Neoadjuvant': {
            name: 'Paclitaxel + Ifosfamide + Cisplatin (Neoadjuvant)',
            cycles: 4,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Ifosfamide', dose: 1000, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Mesna', dose: 1000, unit: 'mg/m²', schedule: 'D1-D3, every 21 days (same dose as Ifosfamide)' }
            ]
        },
        'Paclitaxel-Ifosfamide-Carboplatin-Neoadjuvant': {
            name: 'Paclitaxel + Ifosfamide + Carboplatin (Neoadjuvant)',
            cycles: 4,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Ifosfamide', dose: 1000, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Mesna', dose: 1000, unit: 'mg/m²', schedule: 'D1-D3, every 21 days (same dose as Ifosfamide)' }
            ]
        },
        'Cisplatin-5FU-Neoadjuvant': {
            name: 'Cisplatin + 5-FU (Neoadjuvant)',
            cycles: 3,
            drugs: [
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'D1-D4, continuous infusion, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Neoadjuvant': {
            name: 'Carboplatin + Paclitaxel (Neoadjuvant)',
            cycles: 3,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },

        // ADJUVANT THERAPY - See above regimens marked as Definitive/Adjuvant

        // METASTATIC THERAPY
        'Pembrolizumab-Cisplatin-5FU-1L': {
            name: 'Pembrolizumab + Cisplatin + 5-FU (KEYNOTE-048) (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'D1-D4, continuous infusion, every 21 days' }
            ]
        },
        'Pembrolizumab-Carboplatin-5FU-1L': {
            name: 'Pembrolizumab + Carboplatin + 5-FU (KEYNOTE-048) (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'D1-D4, continuous infusion, every 21 days' }
            ]
        },
        'Pembrolizumab-Carboplatin-Paclitaxel-1L': {
            name: 'Pembrolizumab + Carboplatin + Paclitaxel (KEYNOTE-048) (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Single-Pembrolizumab-CPS20-1L': {
            name: 'Single agent Pembrolizumab (KEYNOTE-048) (Metastatic, PD-L1 CPS≥20)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Cisplatin-5FU-Cetuximab-1L': {
            name: 'Cisplatin + 5-FU + Cetuximab (EXTREME) (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'D1 loading dose 400 mg/m², then D8, D15, D22 at 250 mg/m², every 21 days', hasLoadingDose: true },
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'D1-D4, continuous infusion, every 21 days' }
            ]
        },
        'Carboplatin-5FU-Cetuximab-1L': {
            name: 'Carboplatin + 5-FU + Cetuximab (EXTREME) (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'D1 loading dose 400 mg/m², then D8, D15, D22 at 250 mg/m², every 21 days', hasLoadingDose: true },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'D1-D4, continuous infusion, every 21 days' }
            ]
        },
        'Cisplatin-5FU-1L': {
            name: 'Cisplatin + 5-FU (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'D1-D4, continuous infusion, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-1L': {
            name: 'Carboplatin + Paclitaxel (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Paclitaxel-1L': {
            name: 'Cisplatin + Paclitaxel (Metastatic - 1L)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },

        // NASOPHARYNGEAL CARCINOMA SPECIFIC
        'Toripalimab-Gemcitabine-Cisplatin-NPC': {
            name: 'Toripalimab + Gemcitabine + Cisplatin (JUPITER-02) (Metastatic NPC)',
            cycles: 6,
            drugs: [
                { name: 'Toripalimab', dose: 240, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Cisplatin-NPC': {
            name: 'Gemcitabine + Cisplatin (Metastatic NPC)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Vinorelbine-NPC': {
            name: 'Cisplatin + Vinorelbine (Metastatic NPC)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Vinorelbine', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },

        // METASTATIC THERAPY
        'Single-Pembrolizumab-CPS1-2L': {
            name: 'Single agent Pembrolizumab (KEYNOTE-040) (Metastatic, PD-L1 CPS≥1)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Single-Nivolumab-CPS1-2L': {
            name: 'Single agent Nivolumab (CheckMate-141) (Metastatic, PD-L1 CPS≥1)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 2 weeks or 480mg every 28 days' }
            ]
        },
        'Single-Cetuximab-2L': {
            name: 'Single agent Cetuximab (Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'D1 loading dose 400 mg/m², then D8, D15, D22 at 250 mg/m², every 21 days', hasLoadingDose: true }
            ]
        },
        'Single-Docetaxel-2L': {
            name: 'Single agent Docetaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Single-Paclitaxel-2L': {
            name: 'Single agent Paclitaxel (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Single-Paclitaxel-Weekly-2L': {
            name: 'Single agent Paclitaxel (weekly) (Metastatic)',
            cycles: 18,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, weekly x 18 weeks' }
            ]
        },
        'Single-Methotrexate-2L': {
            name: 'Single agent Methotrexate (Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Methotrexate', dose: 40, unit: 'mg/m²', schedule: 'weekly' }
            ]
        },
        'Single-Capecitabine-HN': {
            name: 'Single agent Capecitabine (Head & Neck)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'twice daily, days 1-14, every 21 days' }
            ]
        },
        'Carboplatin-Cetuximab': {
            name: 'Carboplatin + Cetuximab',
            cycles: 6,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'Paclitaxel-Carboplatin-Cetuximab': {
            name: 'Paclitaxel + Carboplatin + Cetuximab (PCE)',
            cycles: 6,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
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
    leukemia: {
        cml: {
            'Imatinib-Metastatic': {
                name: 'Imatinib (BCR-ABL TKI) - Metastatic Chronic Phase',
                cycles: 12,
                drugs: [
                    { name: 'Imatinib', dose: 400, unit: 'mg', schedule: 'daily until progression (600-800mg if inadequate response)' }
                ]
            },
            'Dasatinib-Metastatic': {
                name: 'Dasatinib (BCR-ABL TKI) - Metastatic Chronic Phase',
                cycles: 12,
                drugs: [
                    { name: 'Dasatinib', dose: 100, unit: 'mg', schedule: 'daily until progression' }
                ]
            },
            'Nilotinib-Metastatic': {
                name: 'Nilotinib (BCR-ABL TKI) - Metastatic Chronic Phase',
                cycles: 12,
                drugs: [
                    { name: 'Nilotinib', dose: 300, unit: 'mg', schedule: 'twice daily until progression' }
                ]
            },
            'Bosutinib-Metastatic': {
                name: 'Bosutinib (BCR-ABL TKI) - Metastatic Chronic Phase',
                cycles: 12,
                drugs: [
                    { name: 'Bosutinib', dose: 400, unit: 'mg', schedule: 'daily until progression' }
                ]
            },
            'Dasatinib-Metastatic': {
                name: 'Dasatinib (BCR-ABL TKI) - Imatinib-resistant/intolerant',
                cycles: 12,
                drugs: [
                    { name: 'Dasatinib', dose: 140, unit: 'mg', schedule: 'daily (100mg if chronic phase, 140mg if accelerated)' }
                ]
            },
            'Nilotinib-Metastatic': {
                name: 'Nilotinib (BCR-ABL TKI) - Imatinib-resistant/intolerant',
                cycles: 12,
                drugs: [
                    { name: 'Nilotinib', dose: 400, unit: 'mg', schedule: 'twice daily until progression' }
                ]
            },
            'Bosutinib-Metastatic': {
                name: 'Bosutinib (BCR-ABL TKI) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Bosutinib', dose: 500, unit: 'mg', schedule: 'daily until progression' }
                ]
            },
            'Ponatinib': {
                name: 'Ponatinib (BCR-ABL TKI) - T315I mutation or Multiple TKI-resistant',
                cycles: 12,
                drugs: [
                    { name: 'Ponatinib', dose: 45, unit: 'mg', schedule: 'daily (reduce to 30mg or 15mg based on response)' }
                ]
            },
            'Asciminib': {
                name: 'Asciminib (STAMP inhibitor) - T315I mutation CML',
                cycles: 12,
                drugs: [
                    { name: 'Asciminib', dose: 200, unit: 'mg', schedule: 'twice daily (T315I) or 40mg twice daily (other mutations)' }
                ]
            },
            'Busulfan': {
                name: 'Busulfan - Historical/Blast Crisis',
                cycles: 4,
                drugs: [
                    { name: 'Busulfan', dose: 4, unit: 'mg', schedule: 'daily (adjust based on response)' }
                ]
            },
            'Hydroxyurea': {
                name: 'Hydroxyurea - Cytoreduction/Bridge Therapy',
                cycles: 6,
                drugs: [
                    { name: 'Hydroxyurea', dose: 1000, unit: 'mg', schedule: 'twice daily (titrate 500-3000mg daily)' }
                ]
            },
            'Interferon-alpha-2a': {
                name: 'Interferon alpha-2a - Pre-TKI Era/Special Circumstances',
                cycles: 12,
                drugs: [
                    { name: 'Interferon alpha-2a', dose: 5000000, unit: 'units', schedule: 'daily subcutaneous injection' }
                ]
            },
            'Omacetaxine': {
                name: 'Omacetaxine (Protein synthesis inhibitor) - T315I resistant CML',
                cycles: 6,
                drugs: [
                    { name: 'Omacetaxine', dose: 1.25, unit: 'mg/m²', schedule: 'subcutaneous twice daily x 14 days every 28 days' }
                ]
            },
            'Interferon-Cytarabine': {
                name: 'Interferon alpha + Cytarabine - Pre-TKI Era',
                cycles: 12,
                drugs: [
                    { name: 'Interferon alpha-2a', dose: 5000000, unit: 'units', schedule: 'daily subcutaneous' },
                    { name: 'Cytarabine', dose: 20, unit: 'mg/m²', schedule: 'daily subcutaneous x 10 days monthly' }
                ]
            }
        },
        cll: {
            'FCR': {
                name: 'Fludarabine + Cyclophosphamide + Rituximab (FCR) - Metastatic Fit Patients',
                cycles: 6,
                drugs: [
                    { name: 'Fludarabine', dose: 25, unit: 'mg/m²', schedule: 'D1-D3 every 28 days' },
                    { name: 'Cyclophosphamide', dose: 250, unit: 'mg/m²', schedule: 'D1-D3 every 28 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1 cycle 1, then 500mg/m² every 28 days' }
                ]
            },
            'PCR': {
                name: 'Pentostatin + Cyclophosphamide + Rituximab (PCR) - Metastatic Alternative',
                cycles: 6,
                drugs: [
                    { name: 'Pentostatin', dose: 2, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1 cycle 1, then 500mg/m² every 21 days' }
                ]
            },
            'BR': {
                name: 'Bendamustine + Rituximab (BR) - Metastatic',
                cycles: 6,
                drugs: [
                    { name: 'Bendamustine', dose: 90, unit: 'mg/m²', schedule: 'D1-D2 every 28 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1 cycle 1, then 500mg/m² every 28 days' }
                ]
            },
            'Obinutuzumab-Chlorambucil': {
                name: 'Obinutuzumab + Chlorambucil - Metastatic Elderly/Unfit',
                cycles: 6,
                drugs: [
                    { name: 'Obinutuzumab', dose: 1000, unit: 'mg', schedule: 'D1,D8,D15 cycle 1, then D1 every 28 days' },
                    { name: 'Chlorambucil', dose: 0.5, unit: 'mg/kg', schedule: 'D1,D15 every 28 days' }
                ]
            },
            'Obinutuzumab-Venetoclax': {
                name: 'Obinutuzumab + Venetoclax - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Obinutuzumab', dose: 1000, unit: 'mg', schedule: 'D1,D8,D15 cycle 1, then D1 every 28 days' },
                    { name: 'Venetoclax', dose: 400, unit: 'mg', schedule: 'daily (ramp-up from 20mg)' }
                ]
            },
            'Acalabrutinib-Obinutuzumab': {
                name: 'Acalabrutinib + Obinutuzumab (BTK inhibitor) - Metastatic',
                cycles: 6,
                drugs: [
                    { name: 'Acalabrutinib', dose: 100, unit: 'mg', schedule: 'twice daily until progression' },
                    { name: 'Obinutuzumab', dose: 1000, unit: 'mg', schedule: 'D1,D8,D15 cycle 1, then D1 every 28 days' }
                ]
            },
            'Ibrutinib-Rituximab': {
                name: 'Ibrutinib + Rituximab (BTK inhibitor) - Metastatic',
                cycles: 6,
                drugs: [
                    { name: 'Ibrutinib', dose: 420, unit: 'mg', schedule: 'daily until progression' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1 cycle 1, then 500mg/m² every 28 days' }
                ]
            },
            'Venetoclax-Rituximab': {
                name: 'Venetoclax + Rituximab (BCL-2 inhibitor) - Relapsed/Refractory',
                cycles: 12,
                drugs: [
                    { name: 'Venetoclax', dose: 400, unit: 'mg', schedule: 'daily x 24 cycles (ramp-up from 20mg)' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1 cycle 1, then 500mg/m² every 28 days' }
                ]
            },
            'Idelalisib-Rituximab': {
                name: 'Idelalisib + Rituximab (PI3K inhibitor) - Relapsed/Refractory',
                cycles: 8,
                drugs: [
                    { name: 'Idelalisib', dose: 150, unit: 'mg', schedule: 'twice daily until progression' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1 cycle 1, then 500mg/m² every 2 weeks x 7 cycles' }
                ]
            },
            'CVP': {
                name: 'Cyclophosphamide + Vincristine + Prednisone (CVP) - Historical',
                cycles: 8,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D1 every 21 days (max 2mg)' },
                    { name: 'Prednisone', dose: 40, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' }
                ]
            },
            'CF': {
                name: 'Cyclophosphamide + Fludarabine (CF) - Historical',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 250, unit: 'mg/m²', schedule: 'D1-D3 every 28 days' },
                    { name: 'Fludarabine', dose: 25, unit: 'mg/m²', schedule: 'D1-D3 every 28 days' }
                ]
            },
            'FP': {
                name: 'Fludarabine + Prednisone (FP) - Historical',
                cycles: 6,
                drugs: [
                    { name: 'Fludarabine', dose: 25, unit: 'mg/m²', schedule: 'D1-D5 every 28 days' },
                    { name: 'Prednisone', dose: 30, unit: 'mg/m²', schedule: 'D1-D5 every 28 days' }
                ]
            },
            'CP': {
                name: 'Chlorambucil + Prednisone (CP) - Historical',
                cycles: 12,
                drugs: [
                    { name: 'Chlorambucil', dose: 0.7, unit: 'mg/kg', schedule: 'D1-D14 every 28 days' },
                    { name: 'Prednisone', dose: 80, unit: 'mg', schedule: 'D1-D7 every 28 days' }
                ]
            },
            'FR': {
                name: 'Fludarabine + Rituximab (FR) - Relapsed/Refractory',
                cycles: 6,
                drugs: [
                    { name: 'Fludarabine', dose: 25, unit: 'mg/m²', schedule: 'D1-D5 every 28 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1 cycle 1, then 500mg/m² every 28 days' }
                ]
            },
            'Alemtuzumab': {
                name: 'Alemtuzumab (CD52 mAb) - Relapsed/Refractory p53 mutated',
                cycles: 3,
                drugs: [
                    { name: 'Alemtuzumab', dose: 30, unit: 'mg', schedule: '3x weekly x 12 weeks (escalate from 3mg → 10mg → 30mg)' }
                ]
            },
            'Chlorambucil': {
                name: 'Chlorambucil (single agent) - Elderly/Unfit',
                cycles: 12,
                drugs: [
                    { name: 'Chlorambucil', dose: 0.5, unit: 'mg/kg', schedule: 'D1,D15 every 28 days' }
                ]
            },
            'Cladribine': {
                name: 'Cladribine (single agent) - Historical',
                cycles: 6,
                drugs: [
                    { name: 'Cladribine', dose: 0.1, unit: 'mg/kg', schedule: 'D1-D7 every 28 days' }
                ]
            },
            'Fludarabine': {
                name: 'Fludarabine (single agent) - Historical',
                cycles: 6,
                drugs: [
                    { name: 'Fludarabine', dose: 25, unit: 'mg/m²', schedule: 'D1-D5 every 28 days' }
                ]
            },
            'Rituximab': {
                name: 'Rituximab (single agent) - Maintenance',
                cycles: 8,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'weekly x 4 weeks, then q3months' }
                ]
            },
            'Ofatumumab': {
                name: 'Ofatumumab (CD20 mAb) - Fludarabine-refractory',
                cycles: 8,
                drugs: [
                    { name: 'Ofatumumab', dose: 2000, unit: 'mg', schedule: 'weekly x 8 weeks, then monthly' }
                ]
            },
            'Pentostatin': {
                name: 'Pentostatin (single agent) - Historical',
                cycles: 6,
                drugs: [
                    { name: 'Pentostatin', dose: 4, unit: 'mg/m²', schedule: 'every 2 weeks' }
                ]
            },
            'Bendamustine': {
                name: 'Bendamustine (single agent) - Relapsed/Refractory',
                cycles: 6,
                drugs: [
                    { name: 'Bendamustine', dose: 100, unit: 'mg/m²', schedule: 'D1-D2 every 28 days' }
                ]
            },
            'Lenalidomide': {
                name: 'Lenalidomide (immunomodulator) - Relapsed/Refractory',
                cycles: 8,
                drugs: [
                    { name: 'Lenalidomide', dose: 10, unit: 'mg', schedule: 'D1-D21 every 28 days' }
                ]
            },
            'Ibrutinib': {
                name: 'Ibrutinib (BTK inhibitor) - Relapsed/Refractory',
                cycles: 12,
                drugs: [
                    { name: 'Ibrutinib', dose: 420, unit: 'mg', schedule: 'daily until progression' }
                ]
            },
            'Acalabrutinib': {
                name: 'Acalabrutinib (BTK inhibitor) - Relapsed/Refractory',
                cycles: 12,
                drugs: [
                    { name: 'Acalabrutinib', dose: 100, unit: 'mg', schedule: 'twice daily until progression' }
                ]
            },
            'Zanubrutinib': {
                name: 'Zanubrutinib (BTK inhibitor) - Relapsed/Refractory',
                cycles: 12,
                drugs: [
                    { name: 'Zanubrutinib', dose: 160, unit: 'mg', schedule: 'twice daily until progression' }
                ]
            },
            'Venetoclax': {
                name: 'Venetoclax (BCL-2 inhibitor) - 17p deletion CLL',
                cycles: 24,
                drugs: [
                    { name: 'Venetoclax', dose: 400, unit: 'mg', schedule: 'daily x 24 cycles (ramp-up from 20mg)' }
                ]
            },
            'Duvelisib': {
                name: 'Duvelisib (PI3K inhibitor) - Relapsed/Refractory',
                cycles: 8,
                drugs: [
                    { name: 'Duvelisib', dose: 25, unit: 'mg', schedule: 'twice daily until progression' }
                ]
            }
        },
        hcl: {
            'Cladribine-Rituximab': {
                name: 'Cladribine + Rituximab - Metastatic Hairy Cell Leukemia',
                cycles: 2,
                drugs: [
                    { name: 'Cladribine', dose: 0.15, unit: 'mg/kg', schedule: 'D1-D5 (8 weeks apart)' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'weekly x 8 weeks' }
                ]
            },
            'Moxetumomab-pasudotox': {
                name: 'Moxetumomab pasudotox-tdfk (CD22-directed immunotoxin) - Relapsed/Refractory',
                cycles: 6,
                drugs: [
                    { name: 'Moxetumomab pasudotox-tdfk', dose: 40, unit: 'mcg/kg', schedule: 'D1,D3,D5 every 28 days' }
                ]
            },
            'Cladribine': {
                name: 'Cladribine (single agent) - Metastatic Standard',
                cycles: 2,
                drugs: [
                    { name: 'Cladribine', dose: 0.15, unit: 'mg/kg', schedule: 'D1-D5 (8 weeks apart)' }
                ]
            },
            'Pentostatin': {
                name: 'Pentostatin (single agent) - Metastatic Alternative',
                cycles: 6,
                drugs: [
                    { name: 'Pentostatin', dose: 4, unit: 'mg/m²', schedule: 'every 2 weeks until CR, then 2 additional cycles' }
                ]
            },
            'Interferon-alpha-2a': {
                name: 'Interferon alpha-2a - Historical/Special Circumstances',
                cycles: 12,
                drugs: [
                    { name: 'Interferon alpha-2a', dose: 2000000, unit: 'units/m²', schedule: 'daily subcutaneous' }
                ]
            },
            'Rituximab': {
                name: 'Rituximab (single agent) - Minimal Residual Disease',
                cycles: 8,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'weekly x 8 weeks' }
                ]
            },
            'BRAF-MEK-Inhibitors': {
                name: 'Vemurafenib + Cobimetinib - BRAF V600E mutated HCL',
                cycles: 8,
                drugs: [
                    { name: 'Vemurafenib', dose: 960, unit: 'mg', schedule: 'twice daily until remission' },
                    { name: 'Cobimetinib', dose: 60, unit: 'mg', schedule: 'daily x 21 days, then 7 days off' }
                ]
            }
        },
        all: {
            'BFM-95': {
                name: 'BFM-95 Protocol - Standard Risk ALL',
                cycles: 24,
                drugs: [
                    { name: 'Prednisone', dose: 60, unit: 'mg/m²', schedule: 'D1-D28 (induction), then maintenance' },
                    { name: 'Vincristine', dose: 1.5, unit: 'mg/m²', schedule: 'D8,D15,D22,D29 (max 2mg)' },
                    { name: 'Daunorubicin', dose: 30, unit: 'mg/m²', schedule: 'D8,D15,D22,D29' },
                    { name: 'L-Asparaginase', dose: 10000, unit: 'units/m²', schedule: 'D12,D15,D18,D21,D24,D27,D30,D33' },
                    { name: 'Methotrexate (IT)', dose: 12, unit: 'mg', schedule: 'D1,D12 (CNS prophylaxis)' },
                    { name: 'Cytarabine (IT)', dose: 30, unit: 'mg', schedule: 'D1,D12 (CNS prophylaxis)' },
                    { name: 'Hydrocortisone (IT)', dose: 15, unit: 'mg', schedule: 'D1,D12 (CNS prophylaxis)' }
                ]
            },
            'Linker-Regimen': {
                name: 'Linker Regimen - Adult ALL',
                cycles: 30,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 1200, unit: 'mg/m²', schedule: 'D1 (induction)' },
                    { name: 'Daunorubicin', dose: 45, unit: 'mg/m²', schedule: 'D1,D2,D3 (induction)' },
                    { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'D1,D8,D15,D22 (max 2mg)' },
                    { name: 'Prednisone', dose: 60, unit: 'mg/m²', schedule: 'D1-D21 (induction)' },
                    { name: 'L-Asparaginase', dose: 6000, unit: 'units/m²', schedule: 'D5,D8,D11,D15,D18,D22' },
                    { name: 'Methotrexate (IT)', dose: 12, unit: 'mg', schedule: 'D1,D8,D15,D22 (CNS prophylaxis)' },
                    { name: 'Cytarabine (IT)', dose: 30, unit: 'mg', schedule: 'D1,D8,D15,D22 (CNS prophylaxis)' }
                ]
            },
            'Larson-Regimen': {
                name: 'Larson Regimen - Adult ALL',
                cycles: 30,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 1200, unit: 'mg/m²', schedule: 'D1,D22 (intensification)' },
                    { name: 'Cytarabine', dose: 75, unit: 'mg/m²', schedule: 'D1-D4,D8-D11,D15-D18,D22-D25' },
                    { name: 'Mercaptopurine', dose: 60, unit: 'mg/m²', schedule: 'D1-D14 (consolidation)' },
                    { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'D15,D22,D29,D36 (max 2mg)' },
                    { name: 'L-Asparaginase', dose: 6000, unit: 'units/m²', schedule: 'D15,D18,D22,D25' },
                    { name: 'Methotrexate (IT)', dose: 15, unit: 'mg', schedule: 'weekly x 8 (CNS prophylaxis)' }
                ]
            },
            'Hyper-CVAD-A': {
                name: 'Hyper-CVAD Part A - Adult ALL',
                cycles: 4,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 300, unit: 'mg/m²', schedule: 'D1-D3 q12h x 6 doses' },
                    { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'D4,D11 (max 2mg)' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 50, unit: 'mg/m²', schedule: 'D4 (24h infusion)' },
                    { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1-D4,D11-D14' },
                    { name: 'Methotrexate (IT)', dose: 12, unit: 'mg', schedule: 'D2 (CNS prophylaxis)' },
                    { name: 'Cytarabine (IT)', dose: 100, unit: 'mg', schedule: 'D8 (CNS prophylaxis)' }
                ]
            },
            'Hyper-CVAD-B': {
                name: 'Hyper-CVAD Part B - Adult ALL',
                cycles: 4,
                drugs: [
                    { name: 'Methotrexate', dose: 200, unit: 'mg/m²', schedule: 'D1 (2h infusion), then 800mg/m² over 22h' },
                    { name: 'Cytarabine', dose: 3000, unit: 'mg/m²', schedule: 'D2,D3 q12h x 4 doses' },
                    { name: 'Leucovorin', dose: 50, unit: 'mg', schedule: 'q6h x 8 doses (MTX rescue)' },
                    { name: 'Methotrexate (IT)', dose: 12, unit: 'mg', schedule: 'D2 (CNS prophylaxis)' },
                    { name: 'Cytarabine (IT)', dose: 100, unit: 'mg', schedule: 'D8 (CNS prophylaxis)' }
                ]
            },
            'CALGB-8811': {
                name: 'CALGB-8811 - Adult ALL',
                cycles: 24,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 1200, unit: 'mg/m²', schedule: 'D1,D29 (induction)' },
                    { name: 'Daunorubicin', dose: 45, unit: 'mg/m²', schedule: 'D1,D2,D3,D29,D30,D31' },
                    { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'D1,D8,D15,D22,D29,D36 (max 2mg)' },
                    { name: 'Prednisone', dose: 60, unit: 'mg/m²', schedule: 'D1-D21' },
                    { name: 'L-Asparaginase', dose: 6000, unit: 'units/m²', schedule: 'D5,D8,D11,D15,D18,D22' },
                    { name: 'Methotrexate (HD)', dose: 1500, unit: 'mg/m²', schedule: 'D11,D25 (consolidation)' }
                ]
            },
            'GMALL-07/2003': {
                name: 'GMALL-07/2003 - Standard Risk Adult ALL',
                cycles: 18,
                drugs: [
                    { name: 'Prednisolone', dose: 60, unit: 'mg/m²', schedule: 'D1-D28 (induction)' },
                    { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'D1,D8,D15,D22 (max 2mg)' },
                    { name: 'Daunorubicin', dose: 45, unit: 'mg/m²', schedule: 'D1,D8,D15,D22' },
                    { name: 'L-Asparaginase', dose: 5000, unit: 'units/m²', schedule: 'D12-D33' },
                    { name: 'Cyclophosphamide', dose: 650, unit: 'mg/m²', schedule: 'D29,D43,D57' },
                    { name: 'Cytarabine', dose: 75, unit: 'mg/m²', schedule: 'D31-D34,D38-D41,D45-D48,D52-D55' }
                ]
            },
            'Imatinib-ALL': {
                name: 'Imatinib (BCR-ABL TKI) - Ph+ ALL',
                cycles: 24,
                drugs: [
                    { name: 'Imatinib', dose: 600, unit: 'mg', schedule: 'daily until progression (Ph+ ALL)' },
                    { name: 'Prednisone', dose: 60, unit: 'mg/m²', schedule: 'D1-D14 (with chemotherapy backbone)' }
                ]
            },
            'Dasatinib-ALL': {
                name: 'Dasatinib (BCR-ABL TKI) - Ph+ ALL',
                cycles: 24,
                drugs: [
                    { name: 'Dasatinib', dose: 100, unit: 'mg', schedule: 'daily until progression (Ph+ ALL)' },
                    { name: 'Prednisone', dose: 60, unit: 'mg/m²', schedule: 'D1-D14 (with chemotherapy backbone)' }
                ]
            },
            'Nilotinib-ALL': {
                name: 'Nilotinib (BCR-ABL TKI) - Ph+ ALL',
                cycles: 24,
                drugs: [
                    { name: 'Nilotinib', dose: 400, unit: 'mg', schedule: 'twice daily until progression (Ph+ ALL)' },
                    { name: 'Prednisone', dose: 60, unit: 'mg/m²', schedule: 'D1-D14 (with chemotherapy backbone)' }
                ]
            },
            'Ponatinib-ALL': {
                name: 'Ponatinib (BCR-ABL TKI) - T315I mutant Ph+ ALL',
                cycles: 24,
                drugs: [
                    { name: 'Ponatinib', dose: 45, unit: 'mg', schedule: 'daily (reduce to 30mg based on response)' },
                    { name: 'Prednisone', dose: 60, unit: 'mg/m²', schedule: 'D1-D14 (with chemotherapy backbone)' }
                ]
            },
            'Blinatumomab': {
                name: 'Blinatumomab (CD19/CD3 BiTE) - Relapsed/Refractory B-ALL',
                cycles: 2,
                drugs: [
                    { name: 'Blinatumomab', dose: 28, unit: 'mcg/day', schedule: 'continuous IV x 28 days (cycle 1: 9mcg/day week 1, 28mcg/day weeks 2-4)' },
                    { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'premedication (cytokine release syndrome prevention)' }
                ]
            },
            'Inotuzumab': {
                name: 'Inotuzumab Ozogamicin (CD22-ADC) - Relapsed/Refractory B-ALL',
                cycles: 4,
                drugs: [
                    { name: 'Inotuzumab Ozogamicin', dose: 1.8, unit: 'mg/m²', schedule: 'D1,D8,D15 cycle 1, then D1 every 21 days (fractionated dosing)' }
                ]
            },
            'Tisagenlecleucel': {
                name: 'Tisagenlecleucel (CD19 CAR-T) - Relapsed/Refractory B-ALL',
                cycles: 1,
                drugs: [
                    { name: 'Tisagenlecleucel', dose: 0.2, unit: 'million cells/kg', schedule: 'single infusion after lymphodepletion (≤25 years)' },
                    { name: 'Fludarabine', dose: 30, unit: 'mg/m²', schedule: 'D-4 to D-2 (lymphodepletion)' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D-4 to D-2 (lymphodepletion)' }
                ]
            },
            'Brexucabtagene-Autoleucel': {
                name: 'Brexucabtagene Autoleucel (CD19 CAR-T) - Relapsed/Refractory B-ALL',
                cycles: 1,
                drugs: [
                    { name: 'Brexucabtagene Autoleucel', dose: 1, unit: 'million cells/kg', schedule: 'single infusion after lymphodepletion (adults)' },
                    { name: 'Fludarabine', dose: 30, unit: 'mg/m²', schedule: 'D-5 to D-3 (lymphodepletion)' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D-5 to D-3 (lymphodepletion)' }
                ]
            },
            'Clofarabine': {
                name: 'Clofarabine (nucleoside analog) - Relapsed/Refractory ALL',
                cycles: 6,
                drugs: [
                    { name: 'Clofarabine', dose: 52, unit: 'mg/m²', schedule: 'D1-D5 q3-6weeks' }
                ]
            },
            'Nelarabine': {
                name: 'Nelarabine (T-cell specific) - T-ALL Relapsed/Refractory',
                cycles: 3,
                drugs: [
                    { name: 'Nelarabine', dose: 1500, unit: 'mg/m²', schedule: 'D1,D3,D5 every 21 days (T-ALL specific)' }
                ]
            },
            'CNS-Prophylaxis': {
                name: 'CNS Prophylaxis - Intrathecal Therapy',
                cycles: 8,
                drugs: [
                    { name: 'Methotrexate (IT)', dose: 12, unit: 'mg', schedule: 'weekly x 8 doses' },
                    { name: 'Cytarabine (IT)', dose: 30, unit: 'mg', schedule: 'weekly x 8 doses' },
                    { name: 'Hydrocortisone (IT)', dose: 15, unit: 'mg', schedule: 'weekly x 8 doses' }
                ]
            },
            'CNS-Treatment': {
                name: 'CNS Treatment - Cranial Radiation + IT',
                cycles: 4,
                drugs: [
                    { name: 'Cranial Radiation', dose: 1800, unit: 'cGy', schedule: 'total dose over 2-3 weeks' },
                    { name: 'Methotrexate (IT)', dose: 15, unit: 'mg', schedule: 'twice weekly x 4 weeks' },
                    { name: 'Cytarabine (IT)', dose: 50, unit: 'mg', schedule: 'twice weekly x 4 weeks' }
                ]
            },
            'Venetoclax-ALL': {
                name: 'Venetoclax (BCL-2 inhibitor) - Relapsed/Refractory ALL',
                cycles: 8,
                drugs: [
                    { name: 'Venetoclax', dose: 400, unit: 'mg', schedule: 'daily (ramp-up from 20mg for TLS prevention)' },
                    { name: 'Navitoclax', dose: 300, unit: 'mg', schedule: 'daily (BCL-2 family inhibitor combination)' }
                ]
            },
            'Mini-Hyper-CVD': {
                name: 'Mini-Hyper-CVD - Elderly/Unfit ALL',
                cycles: 8,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 150, unit: 'mg/m²', schedule: 'D1-D3 q12h (reduced dose)' },
                    { name: 'Vincristine', dose: 1, unit: 'mg', schedule: 'D4,D11 (max 1mg elderly)' },
                    { name: 'Doxorubicin', dose: 25, unit: 'mg/m²', schedule: 'D4 (reduced dose)' },
                    { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1-D4,D11-D14 (reduced dose)' }
                ]
            }
        },
        aml: {
            // Standard Induction Regimens
            '7+3-Daunorubicin': {
                name: '7+3 Induction - Cytarabine + Daunorubicin',
                cycles: 1,
                drugs: [
                    { name: 'Cytarabine (Ara-C)', dose: 100, unit: 'mg/m²', schedule: 'D1-D7 continuous infusion x 7 days', days: 'D1-D7' },
                    { name: 'Daunorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1-D3 (age <60 years)', days: 'D1-D3' }
                ]
            },
            '7+3-Idarubicin': {
                name: '7+3 Induction - Cytarabine + Idarubicin',
                cycles: 1,
                drugs: [
                    { name: 'Cytarabine (Ara-C)', dose: 100, unit: 'mg/m²', schedule: 'D1-D7 continuous infusion x 7 days', days: 'D1-D7' },
                    { name: 'Idarubicin', dose: 12, unit: 'mg/m²', schedule: 'D1-D3', days: 'D1-D3' }
                ]
            },
            '7+3-Doxorubicin': {
                name: '7+3 Induction - Cytarabine + Doxorubicin',
                cycles: 1,
                drugs: [
                    { name: 'Cytarabine (Ara-C)', dose: 100, unit: 'mg/m²', schedule: 'D1-D7 continuous infusion x 7 days', days: 'D1-D7' },
                    { name: 'Doxorubicin', dose: 45, unit: 'mg/m²', schedule: 'D1-D3', days: 'D1-D3' }
                ]
            },
            'Gemtuzumab-7+3': {
                name: 'Cytarabine + Daunorubicin + Gemtuzumab Ozogamicin',
                cycles: 1,
                drugs: [
                    { name: 'Cytarabine (Ara-C)', dose: 100, unit: 'mg/m²', schedule: 'D1-D7 continuous infusion', days: 'D1-D7' },
                    { name: 'Daunorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1-D3', days: 'D1-D3' },
                    { name: 'Gemtuzumab Ozogamicin', dose: 3, unit: 'mg/m²', schedule: 'D1,D4,D7 (CD33+ AML)', days: 'D1,D4,D7' }
                ]
            },
            'Quizartinib-7+3-Daunorubicin': {
                name: 'Cytarabine + Daunorubicin + Quizartinib (FLT3-ITD+ AML)',
                cycles: 1,
                drugs: [
                    { name: 'Cytarabine (Ara-C)', dose: 100, unit: 'mg/m²', schedule: 'D1-D7 continuous infusion', days: 'D1-D7' },
                    { name: 'Daunorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1-D3', days: 'D1-D3' },
                    { name: 'Quizartinib', dose: 40, unit: 'mg', schedule: 'D8-D21 daily (FLT3-ITD+ AML)', days: 'D8-D21' }
                ]
            },
            'Quizartinib-7+3-Idarubicin': {
                name: 'Cytarabine + Idarubicin + Quizartinib (FLT3-ITD+ AML)',
                cycles: 1,
                drugs: [
                    { name: 'Cytarabine (Ara-C)', dose: 100, unit: 'mg/m²', schedule: 'D1-D7 continuous infusion', days: 'D1-D7' },
                    { name: 'Idarubicin', dose: 12, unit: 'mg/m²', schedule: 'D1-D3', days: 'D1-D3' },
                    { name: 'Quizartinib', dose: 40, unit: 'mg', schedule: 'D8-D21 daily (FLT3-ITD+ AML)', days: 'D8-D21' }
                ]
            },
            'Midostaurin-7+3': {
                name: 'Cytarabine + Daunorubicin + Midostaurin (FLT3+ AML)',
                cycles: 1,
                drugs: [
                    { name: 'Cytarabine (Ara-C)', dose: 100, unit: 'mg/m²', schedule: 'D1-D7 continuous infusion', days: 'D1-D7' },
                    { name: 'Daunorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1-D3', days: 'D1-D3' },
                    { name: 'Midostaurin', dose: 50, unit: 'mg', schedule: 'D8-D21 twice daily (FLT3+ AML)', days: 'D8-D21' }
                ]
            },
            'Clofarabine-AraC': {
                name: 'Cytarabine + Clofarabine',
                cycles: 1,
                drugs: [
                    { name: 'Clofarabine', dose: 40, unit: 'mg/m²', schedule: 'D1-D5', days: 'D1-D5' },
                    { name: 'Cytarabine (Ara-C)', dose: 20, unit: 'mg/m²', schedule: 'D1-D5', days: 'D1-D5' }
                ]
            },
            
            // APML (Acute Promyelocytic Leukemia) Regimens
            'AIDA': {
                name: 'AIDA Protocol - Tretinoin + Idarubicin (APML)',
                cycles: 2,
                drugs: [
                    { name: 'Tretinoin (ATRA)', dose: 45, unit: 'mg/m²', schedule: 'D1-D90 divided twice daily (APML)', days: 'D1-D90' },
                    { name: 'Idarubicin', dose: 12, unit: 'mg/m²', schedule: 'D2,D4,D6,D8 (induction)', days: 'D2,D4,D6,D8' }
                ]
            },
            'Tretinoin-Daunorubicin-AraC': {
                name: 'Tretinoin + Daunorubicin + Cytarabine (APML)',
                cycles: 1,
                drugs: [
                    { name: 'Tretinoin (ATRA)', dose: 45, unit: 'mg/m²', schedule: 'D1-D90 divided twice daily (APML)', days: 'D1-D90' },
                    { name: 'Daunorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1-D3', days: 'D1-D3' },
                    { name: 'Cytarabine (Ara-C)', dose: 200, unit: 'mg/m²', schedule: 'D3-D9 continuous infusion', days: 'D3-D9' }
                ]
            },
            'Tretinoin-Arsenic': {
                name: 'Tretinoin + Arsenic Trioxide (APML)',
                cycles: 1,
                drugs: [
                    { name: 'Tretinoin (ATRA)', dose: 45, unit: 'mg/m²', schedule: 'daily until CR, then maintenance (APML)', days: 'Daily' },
                    { name: 'Arsenic Trioxide', dose: 0.15, unit: 'mg/kg/day', schedule: 'D1-D60 (5 days/week) until CR (APML)', days: 'D1-D60' }
                ]
            },
            
            // Consolidation Regimens
            'Consolidation-AraC-Daunorubicin': {
                name: 'Consolidation - Cytarabine + Daunorubicin',
                cycles: 4,
                drugs: [
                    { name: 'Cytarabine (Ara-C)', dose: 100, unit: 'mg/m²', schedule: 'D1-D5 continuous infusion every 28 days x 4', days: 'D1-D5' },
                    { name: 'Daunorubicin', dose: 45, unit: 'mg/m²', schedule: 'D1,D2 every 28 days x 4', days: 'D1,D2' }
                ]
            },
            'Consolidation-AraC-Idarubicin': {
                name: 'Consolidation - Cytarabine + Idarubicin',
                cycles: 4,
                drugs: [
                    { name: 'Cytarabine (Ara-C)', dose: 100, unit: 'mg/m²', schedule: 'D1-D5 continuous infusion every 28 days x 4', days: 'D1-D5' },
                    { name: 'Idarubicin', dose: 12, unit: 'mg/m²', schedule: 'D1,D2 every 28 days x 4', days: 'D1,D2' }
                ]
            },
            'HiDAC': {
                name: 'High-Dose Cytarabine (HiDAC) - Consolidation',
                cycles: 4,
                drugs: [
                    { name: 'Cytarabine (Ara-C)', dose: 3000, unit: 'mg/m²', schedule: 'D1,D3,D5 (q12h x 6 doses) every 28 days x 4', days: 'D1,D3,D5' }
                ]
            },
            'Liposomal-Daunorubicin-AraC': {
                name: 'Liposomal Daunorubicin + Cytarabine (CPX-351)',
                cycles: 2,
                drugs: [
                    { name: 'CPX-351 (Daunorubicin:Cytarabine 1:5)', dose: 44, unit: 'units/m²', schedule: 'D1,D3,D5 (induction), D1,D3 (consolidation)', days: 'D1,D3,D5' }
                ]
            },
            
            // Hypomethylating Agent Combinations
            'Venetoclax-Azacitidine': {
                name: 'Venetoclax + Azacitidine',
                cycles: 12,
                drugs: [
                    { name: 'Azacitidine', dose: 75, unit: 'mg/m²', schedule: 'D1-D7 every 28 days', days: 'D1-D7' },
                    { name: 'Venetoclax', dose: 400, unit: 'mg', schedule: 'D1-D28 daily (ramp-up from 100mg for TLS prevention)', days: 'D1-D28' }
                ]
            },
            'Venetoclax-Decitabine': {
                name: 'Venetoclax + Decitabine',
                cycles: 12,
                drugs: [
                    { name: 'Decitabine', dose: 20, unit: 'mg/m²', schedule: 'D1-D5 every 28 days', days: 'D1-D5' },
                    { name: 'Venetoclax', dose: 400, unit: 'mg', schedule: 'D1-D28 daily (ramp-up from 100mg for TLS prevention)', days: 'D1-D28' }
                ]
            },
            'Glasdegib-AraC': {
                name: 'Glasdegib + Low-Dose Cytarabine',
                cycles: 12,
                drugs: [
                    { name: 'Glasdegib', dose: 100, unit: 'mg', schedule: 'D1-D28 daily every 28 days', days: 'D1-D28' },
                    { name: 'Cytarabine (Ara-C)', dose: 20, unit: 'mg/m²', schedule: 'D1-D10 subcutaneous twice daily every 28 days', days: 'D1-D10' }
                ]
            },
            'Ivosidenib-Azacitidine': {
                name: 'Ivosidenib + Azacitidine (IDH1 mutant AML)',
                cycles: 12,
                drugs: [
                    { name: 'Ivosidenib', dose: 500, unit: 'mg', schedule: 'daily continuous (IDH1 mutant AML)', days: 'Daily' },
                    { name: 'Azacitidine', dose: 75, unit: 'mg/m²', schedule: 'D1-D7 every 28 days', days: 'D1-D7' }
                ]
            },
            
            // Salvage Regimens
            'FLAG': {
                name: 'FLAG - Fludarabine + Cytarabine + G-CSF',
                cycles: 2,
                drugs: [
                    { name: 'Fludarabine', dose: 30, unit: 'mg/m²', schedule: 'D2-D6', days: 'D2-D6' },
                    { name: 'Cytarabine (Ara-C)', dose: 2000, unit: 'mg/m²', schedule: 'D2-D6 (2h after fludarabine)', days: 'D2-D6' },
                    { name: 'G-CSF (Filgrastim)', dose: 5, unit: 'mcg/kg', schedule: 'D1-D6 subcutaneous', days: 'D1-D6' }
                ]
            },
            'Mitoxantrone-Etoposide': {
                name: 'Mitoxantrone + Etoposide (Salvage)',
                cycles: 2,
                drugs: [
                    { name: 'Mitoxantrone', dose: 8, unit: 'mg/m²', schedule: 'D1-D5', days: 'D1-D5' },
                    { name: 'Etoposide', dose: 80, unit: 'mg/m²', schedule: 'D1-D5', days: 'D1-D5' }
                ]
            },
            
            // Single Agent Therapies
            'Cladribine': {
                name: 'Cladribine (2-CdA)',
                cycles: 6,
                drugs: [
                    { name: 'Cladribine', dose: 5, unit: 'mg/m²', schedule: 'D1-D5 continuous infusion q4-6weeks x 6', days: 'D1-D5' }
                ]
            },
            'Clofarabine': {
                name: 'Clofarabine',
                cycles: 6,
                drugs: [
                    { name: 'Clofarabine', dose: 40, unit: 'mg/m²', schedule: 'D1-D5 q3-6weeks x 6', days: 'D1-D5' }
                ]
            },
            'Tretinoin-APML': {
                name: 'Tretinoin (ATRA) - APML Maintenance',
                cycles: 24,
                drugs: [
                    { name: 'Tretinoin (ATRA)', dose: 45, unit: 'mg/m²', schedule: 'D1-D15 every 3 months x 2 years (APML maintenance)', days: 'D1-D15' }
                ]
            },
            'Arsenic-Trioxide-APML': {
                name: 'Arsenic Trioxide - APML',
                cycles: 5,
                drugs: [
                    { name: 'Arsenic Trioxide', dose: 0.15, unit: 'mg/kg/day', schedule: 'D1-D5 weekly x 25 weeks (APML)', days: 'D1-D5' }
                ]
            },
            'Azacitidine': {
                name: 'Azacitidine',
                cycles: 12,
                drugs: [
                    { name: 'Azacitidine', dose: 75, unit: 'mg/m²', schedule: 'D1-D7 every 28 days x 12', days: 'D1-D7' }
                ]
            },
            'Decitabine': {
                name: 'Decitabine',
                cycles: 12,
                drugs: [
                    { name: 'Decitabine', dose: 20, unit: 'mg/m²', schedule: 'D1-D5 every 28 days x 12', days: 'D1-D5' }
                ]
            },
            'Sorafenib': {
                name: 'Sorafenib',
                cycles: 12,
                drugs: [
                    { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'twice daily continuous', days: 'Daily' }
                ]
            },
            'Gilteritinib': {
                name: 'Gilteritinib (FLT3 mutant AML)',
                cycles: 12,
                drugs: [
                    { name: 'Gilteritinib', dose: 120, unit: 'mg', schedule: 'daily continuous (FLT3 mutant AML)', days: 'Daily' }
                ]
            },
            'Ivosidenib': {
                name: 'Ivosidenib (IDH1 mutant AML)',
                cycles: 12,
                drugs: [
                    { name: 'Ivosidenib', dose: 500, unit: 'mg', schedule: 'daily continuous (IDH1 mutant AML)', days: 'Daily' }
                ]
            },
            'Enasidenib': {
                name: 'Enasidenib (IDH2 mutant AML)',
                cycles: 12,
                drugs: [
                    { name: 'Enasidenib', dose: 100, unit: 'mg', schedule: 'daily continuous (IDH2 mutant AML)', days: 'Daily' }
                ]
            },
            'Olutasidenib': {
                name: 'Olutasidenib (IDH1 mutant AML)',
                cycles: 12,
                drugs: [
                    { name: 'Olutasidenib', dose: 150, unit: 'mg', schedule: 'twice daily continuous (IDH1 mutant AML)', days: 'Daily' }
                ]
            },
            
            // Additional NCCN-Listed Regimens
            'Maintenance-6-Mercaptopurine': {
                name: 'Maintenance - 6-Mercaptopurine + Methotrexate',
                cycles: 24,
                drugs: [
                    { name: '6-Mercaptopurine', dose: 60, unit: 'mg/m²', schedule: 'daily for 2 years', days: 'Daily' },
                    { name: 'Methotrexate', dose: 20, unit: 'mg/m²', schedule: 'weekly for 2 years', days: 'Weekly' }
                ]
            },
            'GO-Monotherapy': {
                name: 'Gemtuzumab Ozogamicin (GO) - Monotherapy',
                cycles: 3,
                drugs: [
                    { name: 'Gemtuzumab Ozogamicin', dose: 9, unit: 'mg/m²', schedule: 'D1,D15 every 28 days x 3 (CD33+ AML, elderly)', days: 'D1,D15' }
                ]
            },
            'CPX-351': {
                name: 'CPX-351 (Daunorubicin/Cytarabine Liposome)',
                cycles: 2,
                drugs: [
                    { name: 'CPX-351', dose: 44, unit: 'units/m²', schedule: 'D1,D3,D5 (induction), then D1,D3 (consolidation)', days: 'D1,D3,D5' }
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
                name: 'Carboplatin + Paclitaxel - Neoadjuvant',
                cycles: 3,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Cisplatin-Pemetrexed-Neoadjuvant': {
                name: 'Cisplatin + Pemetrexed (Non-squamous) - Neoadjuvant',
                cycles: 3,
                drugs: [
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Cisplatin-Gemcitabine-Neoadjuvant': {
                name: 'Cisplatin + Gemcitabine (Squamous) - Neoadjuvant',
                cycles: 3,
                drugs: [
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Gemcitabine', dose: 1250, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
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
                name: 'Carboplatin + Paclitaxel - Adjuvant',
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
                    { name: 'Paclitaxel', dose: 45, unit: 'mg/m²', schedule: 'weekly' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly' }
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
                name: 'Pembrolizumab + Carboplatin + Paclitaxel (KEYNOTE-407) - Metastatic - 1L - Squamous',
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
                    { name: 'Amivantamab', dose: 1400, unit: 'mg', schedule: 'loading dose 1400mg, then 1050mg every 2 weeks' },
                    { name: 'Lazertinib', dose: 240, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Osimertinib': {
                name: 'Osimertinib (FLAURA/AURA3) (EGFR exon19del/L858R/T790M) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Osimertinib', dose: 80, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Amivantamab-Exon20': {
                name: 'Amivantamab - Metastatic - EGFR exon20 insertion',
                cycles: 12,
                drugs: [
                    { name: 'Amivantamab', dose: 1400, unit: 'mg', schedule: 'loading dose 1400mg, then 1050mg every 2 weeks' }
                ]
            },
            'Mobocertinib': {
                name: 'Mobocertinib - Metastatic - EGFR exon20 insertion',
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
                    { name: 'Trastuzumab Deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'every 21 days' }
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
                name: 'Pembrolizumab + Cisplatin + Gemcitabine',
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
            'Single-Atezolizumab': {
                name: 'Single agent Atezolizumab - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'every 21 days' }
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
                name: 'Carboplatin + Paclitaxel (weekly) - Metastatic',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly x 12 weeks' },
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly x 12 weeks' }
                ]
            },
            'Carboplatin-Paclitaxel-Bevacizumab': {
                name: 'Carboplatin + Paclitaxel + Bevacizumab - Metastatic - Non-squamous',
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
                name: 'Gemcitabine + Cisplatin - Metastatic - Squamous',
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
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'every 21 days' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'every 21 days' }
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
                    { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Carboplatin-Paclitaxel-Pembrolizumab': {
                name: 'Carboplatin + Paclitaxel + Pembrolizumab (KEYNOTE-407) - Metastatic - Squamous',
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
                    { name: 'Ramucirumab', dose: 10, unit: 'mg/kg', schedule: 'every 2 weeks' },
                    { name: 'Erlotinib', dose: 150, unit: 'mg', schedule: 'daily' }
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
                name: 'Single agent Paclitaxel - Metastatic',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'every 21 days' }
                ]
            },
            'Single-Nab-Paclitaxel': {
                name: 'Single agent Nab-paclitaxel - Metastatic',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 260, unit: 'mg/m²', schedule: 'every 21 days' }
                ]
            },
            'Single-Docetaxel': {
                name: 'Single agent Docetaxel - Metastatic',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'every 21 days' }
                ]
            },
            'Single-Pemetrexed': {
                name: 'Single agent Pemetrexed - Metastatic - Non-squamous',
                cycles: 6,
                drugs: [
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'every 21 days' }
                ]
            },
            'Single-Gemcitabine': {
                name: 'Single agent Gemcitabine - Metastatic',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
                ]
            },
            'Single-Vinorelbine': {
                name: 'Single agent Vinorelbine - Metastatic',
                cycles: 6,
                drugs: [
                    { name: 'Vinorelbine', dose: 30, unit: 'mg/m²', schedule: 'weekly' }
                ]
            },
            // EGFR inhibitors
            'Gefitinib': {
                name: 'Gefitinib (EGFR exon19del) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Gefitinib', dose: 250, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Erlotinib': {
                name: 'Erlotinib (EGFR exon19del) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Erlotinib', dose: 150, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Afatinib': {
                name: 'Afatinib (EGFR exon19del) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Afatinib', dose: 40, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Dacomitinib': {
                name: 'Dacomitinib (EGFR exon19del) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Dacomitinib', dose: 45, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Single-Nivolumab': {
                name: 'Single agent Nivolumab - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 2 weeks' }
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
                    { name: 'Lorlatinib', dose: 100, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Entrectinib': {
                name: 'Entrectinib (NTRK fusion) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Entrectinib', dose: 600, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Osimertinib-T790M': {
                name: 'Osimertinib - Metastatic - EGFR exon19del/T790M mutation',
                cycles: 12,
                drugs: [
                    { name: 'Osimertinib', dose: 80, unit: 'mg', schedule: 'daily' }
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
                    { name: 'Pralsetinib', dose: 400, unit: 'mg', schedule: 'daily' }
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
                    { name: 'Tepotinib', dose: 450, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Sotorasib': {
                name: 'Sotorasib (KRAS G12C mutation) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Sotorasib', dose: 960, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Adagrasib': {
                name: 'Adagrasib (KRAS G12C mutation) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Adagrasib', dose: 600, unit: 'mg', schedule: 'twice daily' }
                ]
            },
            'Single-Pembrolizumab': {
                name: 'Single agent Pembrolizumab (KEYNOTE-024/042) (PD-L1 ≥50%) - Metastatic',
                cycles: 12,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
                ]
            },
            'Single-Durvalumab': {
                name: 'Single agent Durvalumab (PACIFIC) - Maintenance Post-CRT',
                cycles: 12,
                drugs: [
                    { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'every 28 days' }
                ]
            },
            'Single-Cemiplimab': {
                name: 'Single agent Cemiplimab - Metastatic',
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
                name: 'Carboplatin + Paclitaxel + Etoposide - Extensive Stage',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 50, unit: 'mg/m²', days: 'D1-D10', schedule: 'D1-D10, every 21 days' }
                ]
            },
            'Carboplatin-Paclitaxel-SCLC': {
                name: 'Carboplatin + Paclitaxel - Extensive Stage',
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
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 2 weeks, then 480mg every 28 days' }
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
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 2 weeks, then 480mg every 4 weeks' }
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
    
    if (protocolKey && cancerType && protocolDatabase[cancerType]) {
        let protocolData;
        
        if ((cancerType === 'breast' || cancerType === 'lung' || cancerType === 'lymphoma' || cancerType === 'leukemia' || cancerType === 'colorectal' || cancerType === 'thyroid' || cancerType === 'bone') && subtype && protocolDatabase[cancerType][subtype]) {
            protocolData = protocolDatabase[cancerType][subtype][protocolKey];
        } else if (cancerType !== 'breast' && cancerType !== 'lung' && cancerType !== 'lymphoma' && cancerType !== 'leukemia' && cancerType !== 'colorectal' && cancerType !== 'thyroid' && cancerType !== 'bone') {
            protocolData = protocolDatabase[cancerType][protocolKey];
        }
        
        if (protocolData) {
            const hasCarboplatin = protocolData.drugs.some(drug => drug.name.toLowerCase().includes('carboplatin'));
            
            if (hasCarboplatin) {
                carboplatinParams.style.display = 'block';
                aucGroup.style.display = 'block';
                aucSelect.required = true;
                ageInput.required = true;
                creatinineInput.required = true;
            } else {
                carboplatinParams.style.display = 'none';
                aucGroup.style.display = 'none';
                aucSelect.required = false;
                aucSelect.value = '';
                ageInput.required = false;
                ageInput.value = '';
                creatinineInput.required = false;
                creatinineInput.value = '';
            }
        } else {
            carboplatinParams.style.display = 'none';
            aucGroup.style.display = 'none';
            aucSelect.required = false;
            aucSelect.value = '';
            ageInput.required = false;
            ageInput.value = '';
            creatinineInput.required = false;
            creatinineInput.value = '';
        }
    } else {
        carboplatinParams.style.display = 'none';
        aucGroup.style.display = 'none';
        aucSelect.required = false;
        aucSelect.value = '';
        ageInput.required = false;
        ageInput.value = '';
        creatinineInput.required = false;
        creatinineInput.value = '';
    }
}

// Calculate drug doses
function calculateDoses(formData) {
    const { height, weight, age, sex, creatinine, cancerType, cancerSubtype, protocol, auc } = formData;
    
    const bsa = calculateBSA(parseFloat(height), parseFloat(weight));
    
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
                const loadingDose = (drug.dose * bsa).toFixed(1);
                const maintenanceDose = (drug.maintenanceDose * bsa).toFixed(1);
                calculatedDose = `${loadingDose} → ${maintenanceDose}`;
                doseUnit = 'mg';
            } else {
                calculatedDose = (drug.dose * bsa).toFixed(1);
                doseUnit = 'mg';
            }
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
    const sexMale = document.getElementById('sexMale');
    const sexFemale = document.getElementById('sexFemale');
    
    // Check if at least one sex checkbox is checked
    const sexValid = sexMale && sexFemale && (sexMale.checked || sexFemale.checked);
    
    return height && weight && sexValid;
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
    
    // Check if protocol is selected via cancer-specific search
    if (selectedCancerSearchProtocol) {
        console.log('Using cancer-specific search protocol'); // Debug log
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
    
    Object.keys(protocolDatabase).forEach(cancerType => {
        const cancerName = getCancerDisplayName(cancerType);
        
        if (cancerType === 'breast' || cancerType === 'lung' || cancerType === 'lymphoma' || cancerType === 'leukemia' || cancerType === 'colorectal' || cancerType === 'thyroid' || cancerType === 'bone') {
            // Handle breast cancer, lung cancer, lymphoma, leukemia, colorectal, thyroid, and bone cancer subtypes
            Object.keys(protocolDatabase[cancerType]).forEach(subtype => {
                const subtypeName = getSubtypeDisplayName(subtype);
                Object.keys(protocolDatabase[cancerType][subtype]).forEach(protocolKey => {
                    const protocol = protocolDatabase[cancerType][subtype][protocolKey];
                    const drugNames = protocol.drugs ? protocol.drugs.map(drug => drug.name).join(' ') : '';
                    allProtocols.push({
                        key: protocolKey,
                        name: protocol.name,
                        cancerType: cancerType,
                        cancerName: `${cancerName} - ${subtypeName}`,
                        subtype: subtype,
                        searchText: `${protocol.name} ${cancerName} ${subtypeName} ${drugNames}`.toLowerCase()
                    });
                });
            });
        } else {
            // Handle other cancer types
            Object.keys(protocolDatabase[cancerType]).forEach(protocolKey => {
                const protocol = protocolDatabase[cancerType][protocolKey];
                const drugNames = protocol.drugs ? protocol.drugs.map(drug => drug.name).join(' ') : '';
                allProtocols.push({
                    key: protocolKey,
                    name: protocol.name,
                    cancerType: cancerType,
                    cancerName: cancerName,
                    subtype: null,
                    searchText: `${protocol.name} ${cancerName} ${drugNames}`.toLowerCase()
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
    
    return results.slice(0, 50); // Limit to 50 suggestions to show more comprehensive results
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
    
    if ((protocol.cancerType === 'breast' || protocol.cancerType === 'lung' || protocol.cancerType === 'lymphoma' || protocol.cancerType === 'leukemia') && protocol.subtype) {
        protocolData = protocolDatabase[protocol.cancerType][protocol.subtype][protocol.key];
    } else {
        protocolData = protocolDatabase[protocol.cancerType][protocol.key];
    }
    
    if (protocolData) {
        const hasCarboplatin = protocolData.drugs.some(drug => drug.name.toLowerCase().includes('carboplatin'));
        const aucGroup = document.getElementById('aucGroup');
        const aucSelect = document.getElementById('auc');
        const carboplatinParams = document.getElementById('carboplatinParams');
        const ageInput = document.getElementById('age');
        const creatinineInput = document.getElementById('creatinine');
        
        if (hasCarboplatin) {
            carboplatinParams.style.display = 'block';
            aucGroup.style.display = 'block';
            aucSelect.required = true;
            ageInput.required = true;
            creatinineInput.required = true;
        } else {
            carboplatinParams.style.display = 'none';
            aucGroup.style.display = 'none';
            aucSelect.required = false;
            aucSelect.value = '';
            ageInput.required = false;
            ageInput.value = '';
            creatinineInput.required = false;
            creatinineInput.value = '';
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
    const results = cancerSpecificProtocols.filter(protocol => 
        protocol.searchText.includes(queryLower)
    );
    
    // Sort by relevance
    results.sort((a, b) => {
        const aExact = a.name.toLowerCase().startsWith(queryLower) ? 0 : 1;
        const bExact = b.name.toLowerCase().startsWith(queryLower) ? 0 : 1;
        return aExact - bExact;
    });
    
    return results.slice(0, 20); // Limit to 20 suggestions for cancer-specific search
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
    checkForCarboplatinBrowse(protocol.cancerType, protocol.subtype, protocol.key);
    
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
                                <td style="padding: 12px; border: 1px solid #dee2e6; font-size: 13px; color: #6c757d;">
                                    ${drug.schedule || 'Per protocol'}
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
    
    tableContainer.innerHTML = `
        <div style="display: grid; grid-template-columns: 2fr 1fr 80px 1fr; gap: 10px; align-items: center; padding: 10px; background: #f8f9fa; border-radius: 5px; font-weight: 600; margin-bottom: 10px;">
            <div>Drug</div>
            <div>Original</div>
            <div>Reduce</div>
            <div>Final</div>
        </div>
        ${results.drugs.map(drug => {
            const reduction = currentReductions[drug.name] || 0;
            const originalDose = drug.calculatedDose;
            const finalDose = originalDose * (1 - reduction / 100);
            
            return `
                <div style="display: grid; grid-template-columns: 2fr 1fr 80px 1fr; gap: 10px; align-items: center; padding: 10px; border-bottom: 1px solid #dee2e6;">
                    <div style="font-weight: 600; color: #2c3e50;">${drug.name}</div>
                    <div>${originalDose}</div>
                    <div style="position: relative;">
                        <input type="number" 
                               id="reduction_${drug.name.replace(/\s+/g, '_')}" 
                               value="${reduction}" 
                               min="0" 
                               max="100" 
                               placeholder="%" 
                               style="width: 100%; padding: 6px 25px 6px 6px; border: 2px solid #ddd; border-radius: 4px; font-size: 14px;"
                               onchange="updateDrugReduction('${drug.name}', this.value)">
                        <span style="position: absolute; right: 6px; top: 50%; transform: translateY(-50%); color: #999; font-size: 12px; pointer-events: none;">%</span>
                    </div>
                    <div id="final_${drug.name.replace(/\s+/g, '_')}" style="font-weight: 600; color: #27ae60;">
                        ${finalDose.toFixed(1)}${drug.unit || 'mg'}
                    </div>
                </div>
            `;
        }).join('')}
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
                            <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Schedule</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${results.drugs.map(drug => {
                            const reduction = currentReductions[drug.name] || 0;
                            const reducedDose = drug.calculatedDose * (1 - reduction / 100);
                            
                            return `
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
                                    <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: 600; color: ${reduction > 0 ? '#e74c3c' : '#27ae60'}; background-color: ${reduction > 0 ? '#fdf2f2' : '#f8f9fa'};">
                                        ${drug.hasLoadingDose ? 
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
                                            : `${reducedDose.toFixed(1)} ${drug.doseUnit}`}
                                    </td>
                                    <td style="padding: 12px; border: 1px solid #dee2e6; font-size: 13px; color: #6c757d;">
                                        ${drug.schedule || 'Per protocol'}
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
    
    // Build reduction summary
    const reductionList = document.getElementById('reductionList');
    const appliedReductions = Object.entries(currentReductions).filter(([_, reduction]) => reduction > 0);
    
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

// Event listeners moved to DOMContentLoaded

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('OncoCalcRx loaded successfully');
    buildProtocolIndex(); // Build search index
    
    // Page navigation event listeners
    document.getElementById('nextToPage2').addEventListener('click', function() {
        if (validatePage1()) {
            updatePatientInfoCard(); // Ensure patient card is updated
            showPage(2);
        } else {
            alert('Please fill in all patient information fields.');
        }
    });

    document.getElementById('backToPage1').addEventListener('click', function() {
        showPage(1);
    });

    document.getElementById('calculateDoses').addEventListener('click', function() {
        if (selectedSearchProtocol) {
            // Using global search selection
            formData = {
                height: document.getElementById('height').value,
                weight: document.getElementById('weight').value,
                age: document.getElementById('age').value,
                sex: document.getElementById('sexMale').checked ? 'male' : (document.getElementById('sexFemale').checked ? 'female' : ''),
                creatinine: document.getElementById('creatinine').value,
                cancerType: selectedSearchProtocol.cancerType,
                cancerSubtype: selectedSearchProtocol.subtype,
                protocol: selectedSearchProtocol.key,
                auc: document.getElementById('auc').value
            };
        } else if (selectedCancerSearchProtocol) {
            // Using cancer-specific search selection
            formData = {
                height: document.getElementById('height').value,
                weight: document.getElementById('weight').value,
                age: document.getElementById('age').value,
                sex: document.getElementById('sexMale').checked ? 'male' : (document.getElementById('sexFemale').checked ? 'female' : ''),
                creatinine: document.getElementById('creatinine').value,
                cancerType: selectedCancerSearchProtocol.cancerType,
                cancerSubtype: selectedCancerSearchProtocol.subtype,
                protocol: selectedCancerSearchProtocol.key,
                auc: document.getElementById('auc').value
            };
        } else {
            // Using browse selection
            formData = {
                height: document.getElementById('height').value,
                weight: document.getElementById('weight').value,
                age: document.getElementById('age').value,
                sex: document.getElementById('sexMale').checked ? 'male' : (document.getElementById('sexFemale').checked ? 'female' : ''),
                creatinine: document.getElementById('creatinine').value,
                cancerType: document.getElementById('cancerType').value,
                cancerSubtype: document.getElementById('cancerSubtype').value,
                protocol: document.getElementById('protocol').value,
                auc: document.getElementById('auc').value
            };
        }
        
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
    document.getElementById('adjustDoses').addEventListener('click', showDoseAdjustmentPage);
    document.getElementById('backToPage3').addEventListener('click', () => showPage(3));
    document.getElementById('finalDoses').addEventListener('click', showFinalPrescription);
    document.getElementById('backToPage4').addEventListener('click', () => showPage(4));
    document.getElementById('newCalculationFromPage5').addEventListener('click', function() {
        // Reset all form fields
        document.getElementById('height').value = '';
        document.getElementById('weight').value = '';
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