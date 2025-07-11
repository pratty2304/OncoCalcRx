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
                name: 'Docetaxel + Adriamycin + Cyclophosphamide (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
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
            'Dose-Dense-AC': {
                name: 'Dose Dense AC (Neoadjuvant/Adjuvant)',
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
                name: 'Olaparib (Adjuvant - germline BRCA1/2 mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Olaparib', dose: 300, unit: 'mg', schedule: 'PO twice daily' }
                ]
            },
            'Abemaciclib-Tamoxifen': {
                name: 'Abemaciclib + Tamoxifen (Adjuvant)',
                cycles: 24,
                drugs: [
                    { name: 'Abemaciclib', dose: 150, unit: 'mg', schedule: 'PO twice daily' },
                    { name: 'Tamoxifen', dose: 20, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            'Ribociclib-AI-Adjuvant': {
                name: 'Ribociclib + Aromatase Inhibitor (Adjuvant - high-risk early breast cancer)',
                cycles: 36,
                drugs: [
                    { name: 'Ribociclib', dose: 400, unit: 'mg', schedule: 'PO daily, D1-21, every 28 days x 3 years' },
                    { name: 'Anastrozole', dose: 1, unit: 'mg', schedule: 'PO daily x 3 years' }
                ]
            },
            'Ribociclib-Letrozole-Adjuvant': {
                name: 'Ribociclib + Letrozole (Adjuvant - high-risk early breast cancer)',
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
            // First-line Metastatic Therapy
            'Palbociclib-Letrozole': {
                name: 'Palbociclib + Letrozole (First-line metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Palbociclib', dose: 125, unit: 'mg', schedule: 'PO daily for 21 days, then 7 days off' },
                    { name: 'Letrozole', dose: 2.5, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            'Ribociclib-Letrozole': {
                name: 'Ribociclib + Letrozole (First-line metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Ribociclib', dose: 600, unit: 'mg', schedule: 'PO daily for 21 days, then 7 days off' },
                    { name: 'Letrozole', dose: 2.5, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            'Abemaciclib-Letrozole': {
                name: 'Abemaciclib + Letrozole (First-line metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Abemaciclib', dose: 150, unit: 'mg', schedule: 'PO twice daily' },
                    { name: 'Letrozole', dose: 2.5, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            // Second-line and Later Metastatic Therapy
            'Palbociclib-Fulvestrant': {
                name: 'Palbociclib + Fulvestrant (Second-line metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Palbociclib', dose: 125, unit: 'mg', schedule: 'PO daily for 21 days, then 7 days off' },
                    { name: 'Fulvestrant', dose: 500, unit: 'mg', schedule: 'IM monthly' }
                ]
            },
            'Ribociclib-Fulvestrant': {
                name: 'Ribociclib + Fulvestrant (Second-line metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Ribociclib', dose: 600, unit: 'mg', schedule: 'PO daily for 21 days, then 7 days off' },
                    { name: 'Fulvestrant', dose: 500, unit: 'mg', schedule: 'IM monthly' }
                ]
            },
            'Abemaciclib-Fulvestrant': {
                name: 'Abemaciclib + Fulvestrant (Second-line metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Abemaciclib', dose: 150, unit: 'mg', schedule: 'PO twice daily' },
                    { name: 'Fulvestrant', dose: 500, unit: 'mg', schedule: 'IM monthly' }
                ]
            },
            'Everolimus-Exemestane': {
                name: 'Everolimus + Exemestane (Second-line metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'PO daily' },
                    { name: 'Exemestane', dose: 25, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            'Alpelisib-Fulvestrant': {
                name: 'Alpelisib + Fulvestrant (PIK3CA mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Alpelisib', dose: 300, unit: 'mg', schedule: 'PO daily' },
                    { name: 'Fulvestrant', dose: 500, unit: 'mg', schedule: 'IM monthly' }
                ]
            },
            'Elacestrant': {
                name: 'Elacestrant (ESR1 mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Elacestrant', dose: 345, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            'Inavolisib-Palbociclib-Fulvestrant': {
                name: 'Inavolisib + Palbociclib + Fulvestrant (PIK3CA mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Inavolisib', dose: 9, unit: 'mg', schedule: 'PO daily' },
                    { name: 'Palbociclib', dose: 125, unit: 'mg', schedule: 'PO daily for 21 days, then 7 days off' },
                    { name: 'Fulvestrant', dose: 500, unit: 'mg', schedule: 'IM monthly' }
                ]
            },
            'Capivasertib-Fulvestrant': {
                name: 'Capivasertib + Fulvestrant (AKT1/PIK3CA/PTEN alteration)',
                cycles: 12,
                drugs: [
                    { name: 'Capivasertib', dose: 400, unit: 'mg', schedule: 'PO twice daily for 4 days, then 3 days off' },
                    { name: 'Fulvestrant', dose: 500, unit: 'mg', schedule: 'IM monthly' }
                ]
            },
            'Camizestrant-Palbociclib': {
                name: 'Camizestrant + Palbociclib (ESR1 mutation detected during first-line treatment)',
                cycles: 12,
                drugs: [
                    { name: 'Camizestrant', dose: 75, unit: 'mg', schedule: 'PO daily' },
                    { name: 'Palbociclib', dose: 125, unit: 'mg', schedule: 'PO daily, D1-21, every 28 days' }
                ]
            },
            'Camizestrant-Ribociclib': {
                name: 'Camizestrant + Ribociclib (ESR1 mutation detected during first-line treatment)',
                cycles: 12,
                drugs: [
                    { name: 'Camizestrant', dose: 75, unit: 'mg', schedule: 'PO daily' },
                    { name: 'Ribociclib', dose: 600, unit: 'mg', schedule: 'PO daily, D1-21, every 28 days' }
                ]
            },
            'Camizestrant-Abemaciclib': {
                name: 'Camizestrant + Abemaciclib (ESR1 mutation detected during first-line treatment)',
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
                name: 'Docetaxel + Adriamycin + Cyclophosphamide (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Dose-Dense-AC': {
                name: 'Dose Dense AC (Neoadjuvant/Adjuvant)',
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
                name: 'Olaparib (Metastatic - germline BRCA1/2 mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Olaparib', dose: 300, unit: 'mg', schedule: 'PO twice daily' }
                ]
            },
            'Talazoparib-BRCA': {
                name: 'Talazoparib (Metastatic - germline BRCA1/2 mutation)',
                cycles: 12,
                drugs: [
                    { name: 'Talazoparib', dose: 1, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            // First-line Metastatic Therapy
            'Sacituzumab-Govitecan-Pembrolizumab': {
                name: 'Sacituzumab Govitecan + Pembrolizumab (First-line metastatic - PD-L1+)',
                cycles: 6,
                drugs: [
                    { name: 'Sacituzumab Govitecan', dose: 10, unit: 'mg/kg', schedule: 'D1, D8, every 21 days' },
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
                ]
            },
            'Paclitaxel-Carboplatin-3weekly': {
                name: 'Paclitaxel + Carboplatin (3-weekly) (First-line metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Paclitaxel-Carboplatin-weekly': {
                name: 'Paclitaxel + Carboplatin (weekly) (First-line metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin-3weekly': {
                name: 'Nab-paclitaxel + Carboplatin (3-weekly) (First-line metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 260, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin-weekly': {
                name: 'Nab-paclitaxel + Carboplatin (weekly) (First-line metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'weekly' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly' }
                ]
            },
            'Gemcitabine-Carboplatin': {
                name: 'Gemcitabine + Carboplatin (First-line metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Carboplatin-Docetaxel': {
                name: 'Carboplatin + Docetaxel (First-line metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Paclitaxel-Bevacizumab': {
                name: 'Paclitaxel + Bevacizumab (First-line metastatic)',
                cycles: 12,
                drugs: [
                    { name: 'Paclitaxel', dose: 90, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                    { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'D1, D15, every 28 days' }
                ]
            },
            // Second-line and Later Metastatic Therapy
            'Sacituzumab-Govitecan': {
                name: 'Sacituzumab Govitecan (Second-line metastatic)',
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
                name: 'Docetaxel + Carboplatin + Trastuzumab + Pertuzumab (Neoadjuvant/Adjuvant)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                    { name: 'Pertuzumab', dose: 840, maintenanceDose: 420, unit: 'mg', schedule: 'D1, 840 mg loading dose, then 420 mg every 21 days', hasLoadingDose: true }
                ]
            },
            'TCH': {
                name: 'Docetaxel + Carboplatin + Trastuzumab (Neoadjuvant/Adjuvant)',
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
                name: 'AC → Paclitaxel + Trastuzumab (Neoadjuvant/Adjuvant)',
                cycles: 8,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles' },
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days x 4 cycles (after 4 cycles AC)' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true }
                ]
            },
            'Dose-Dense-AC': {
                name: 'Dose Dense AC (Neoadjuvant/Adjuvant)',
                cycles: 4,
                drugs: [
                    { name: 'Doxorubicin (Adriamycin)', dose: 60, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 2 weeks' }
                ]
            },
            'Dose-Dense-Paclitaxel-Trastuzumab': {
                name: 'Dose Dense Paclitaxel + Trastuzumab (Neoadjuvant/Adjuvant)',
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
            
            // First-line Metastatic
            'TDM1': {
                name: 'Trastuzumab emtansine (Second-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab emtansine', dose: 3.6, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'TDxd-DESTINY-Breast03': {
                name: 'Trastuzumab deruxtecan (Second-line Metastatic / DESTINY-Breast03)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'TDxd-DESTINY-Breast02': {
                name: 'Trastuzumab deruxtecan (Third-line+ Metastatic / DESTINY-Breast02)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'Trastuzumab-Paclitaxel': {
                name: 'Trastuzumab + Paclitaxel (First-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Trastuzumab-Docetaxel': {
                name: 'Trastuzumab + Docetaxel (First-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                    { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Paclitaxel-Carboplatin-3weekly': {
                name: 'Paclitaxel + Carboplatin (3 weekly) (First-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Paclitaxel-Carboplatin-weekly': {
                name: 'Paclitaxel + Carboplatin (weekly) (First-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, D8, D15, every 28 days' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin-3weekly': {
                name: 'Nab-paclitaxel + Carboplatin (3 weekly) (First-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 260, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin-weekly': {
                name: 'Nab-paclitaxel + Carboplatin (weekly) (First-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, D8, D15, every 28 days' }
                ]
            },
            'Gemcitabine-Carboplatin': {
                name: 'Gemcitabine + Carboplatin (First-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Gemcitabine-Carboplatin-Trastuzumab': {
                name: 'Gemcitabine + Carboplatin + Trastuzumab (First-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, D8, every 21 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true }
                ]
            },
            'Trastuzumab-Lapatinib': {
                name: 'Trastuzumab + Lapatinib (First-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                    { name: 'Lapatinib', dose: 1000, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            'Capecitabine-Lapatinib': {
                name: 'Capecitabine + Lapatinib (First-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily, D1-14, every 21 days' },
                    { name: 'Lapatinib', dose: 1250, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            'Trastuzumab-Navelbine': {
                name: 'Trastuzumab + Navelbine (First-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab', dose: 4, maintenanceDose: 2, unit: 'mg/kg', schedule: 'D1, 4 mg/kg loading dose, then 2 mg/kg weekly', hasLoadingDose: true },
                    { name: 'Vinorelbine (Navelbine)', dose: 25, unit: 'mg/m²', schedule: 'D1, weekly' }
                ]
            },
            'Trastuzumab-Capecitabine': {
                name: 'Trastuzumab + Capecitabine (First-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily, D1-14, every 21 days' }
                ]
            },
            'CHP': {
                name: 'Paclitaxel + Cyclophosphamide + Trastuzumab (First-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true }
                ]
            },
            'CH': {
                name: 'Paclitaxel + Trastuzumab (First-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true }
                ]
            },
            
            // Second-line Metastatic
            'Tucatinib-Trastuzumab-Capecitabine': {
                name: 'Tucatinib + Trastuzumab + Capecitabine (Second-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Tucatinib', dose: 300, unit: 'mg', schedule: 'PO twice daily' },
                    { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'D1, 8 mg/kg loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily, D1-14, every 21 days' }
                ]
            },
            'Capecitabine-Neratinib': {
                name: 'Capecitabine + Neratinib (Second-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 750, unit: 'mg/m²', schedule: 'PO twice daily, D1-14, every 21 days' },
                    { name: 'Neratinib', dose: 240, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            'Margetuximab-Capecitabine': {
                name: 'Margetuximab + Capecitabine (Second-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Margetuximab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'PO twice daily, D1-14, every 21 days' }
                ]
            },
            'Margetuximab-Eribulin': {
                name: 'Margetuximab + Eribulin (Second-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Margetuximab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Eribulin', dose: 1.4, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Margetuximab-Vinorelbine': {
                name: 'Margetuximab + Vinorelbine (Second-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Margetuximab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Vinorelbine', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Margetuximab-Gemcitabine': {
                name: 'Margetuximab + Gemcitabine (Second-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Margetuximab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Single-Neratinib': {
                name: 'Single agent Neratinib (Second-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Neratinib', dose: 240, unit: 'mg', schedule: 'PO daily' }
                ]
            },
            'Single-Capecitabine': {
                name: 'Single agent Capecitabine (Second-line Metastatic)',
                cycles: 6,
                drugs: [
                    { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily, D1-14, every 21 days' }
                ]
            },
            'Single-Docetaxel': {
                name: 'Single agent Docetaxel (Second-line Metastatic)',
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
    colorectal: {
        'mFOLFOX6': {
            name: 'Modified FOLFOX6 (mFOLFOX6)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' }
            ]
        },
        'CAPEOX': {
            name: 'Capecitabine + Oxaliplatin (CAPEOX)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, every 21 days' }
            ]
        },
        'mFOLFIRI': {
            name: 'Modified FOLFIRI (mFOLFIRI)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' }
            ]
        },
        'mFOLFOX6-Bevacizumab': {
            name: 'mFOLFOX6 + Bevacizumab',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' },
                { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'every 2 weeks' }
            ]
        },
        'mFOLFIRI-Bevacizumab': {
            name: 'mFOLFIRI + Bevacizumab',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' },
                { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'every 2 weeks' }
            ]
        },
        'CAPEOX-Bevacizumab': {
            name: 'CAPEOX + Bevacizumab',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, every 21 days' },
                { name: 'Bevacizumab', dose: 7.5, unit: 'mg/kg', schedule: 'every 21 days' }
            ]
        },
        'mFOLFOX6-Cetuximab': {
            name: 'mFOLFOX6 + Cetuximab (KRAS/NRAS wild-type)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' },
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true }
            ]
        },
        'mFOLFIRI-Cetuximab': {
            name: 'mFOLFIRI + Cetuximab (KRAS/NRAS wild-type)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' },
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true }
            ]
        },
        'mFOLFOX6-Panitumumab': {
            name: 'mFOLFOX6 + Panitumumab (KRAS/NRAS wild-type)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' },
                { name: 'Panitumumab', dose: 6, unit: 'mg/kg', schedule: 'every 2 weeks' }
            ]
        },
        'mFOLFIRI-Panitumumab': {
            name: 'mFOLFIRI + Panitumumab (KRAS/NRAS wild-type)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' },
                { name: 'Panitumumab', dose: 6, unit: 'mg/kg', schedule: 'every 2 weeks' }
            ]
        },
        'FOLFOXIRI': {
            name: 'FOLFOXIRI',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 165, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 3200, unit: 'mg/m²', days: 'D1-D2 (48hr CI)', schedule: '48-hour infusion, every 2 weeks' }
            ]
        },
        'FOLFOXIRI-Bevacizumab': {
            name: 'FOLFOXIRI + Bevacizumab',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 165, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 3200, unit: 'mg/m²', days: 'D1-D2 (48hr CI)', schedule: '48-hour infusion, every 2 weeks' },
                { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'every 2 weeks' }
            ]
        },
        'FOLFOXIRI-Panitumumab': {
            name: 'FOLFOXIRI + Panitumumab (KRAS/NRAS wild-type)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 165, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 3200, unit: 'mg/m²', days: 'D1-D2 (48hr CI)', schedule: '48-hour infusion, every 2 weeks' },
                { name: 'Panitumumab', dose: 6, unit: 'mg/kg', schedule: 'every 2 weeks' }
            ]
        },
        'FOLFIRI-Ziv-aflibercept': {
            name: 'FOLFIRI + Ziv-aflibercept (ZALTRAP)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' },
                { name: 'Ziv-aflibercept', dose: 4, unit: 'mg/kg', schedule: 'every 2 weeks' }
            ]
        },
        'CAPIRI': {
            name: 'Capecitabine + Irinotecan (CAPIRI)',
            cycles: 8,
            drugs: [
                { name: 'Irinotecan', dose: 250, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, every 21 days' }
            ]
        },
        'XELIRI-Bevacizumab': {
            name: 'XELIRI + Bevacizumab',
            cycles: 8,
            drugs: [
                { name: 'Irinotecan', dose: 200, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, every 21 days' },
                { name: 'Bevacizumab', dose: 7.5, unit: 'mg/kg', schedule: 'every 21 days' }
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
                { name: 'Irinotecan', dose: 350, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'Cetuximab-Irinotecan': {
            name: 'Cetuximab + Irinotecan (KRAS/NRAS wild-type)',
            cycles: 12,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true },
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'every 2 weeks' }
            ]
        },
        'Irinotecan-Cetuximab': {
            name: 'Irinotecan + Cetuximab (KRAS/NRAS wild-type)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true }
            ]
        },
        'Cetuximab-Bevacizumab-Irinotecan': {
            name: 'Cetuximab + Bevacizumab + Irinotecan',
            cycles: 12,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true },
                { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'every 2 weeks' },
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'every 2 weeks' }
            ]
        },
        '5FU-LV-Oxaliplatin': {
            name: '5-FU/LV + Oxaliplatin',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2000, unit: 'mg/m²', schedule: '22-hour infusion, every 2 weeks' }
            ]
        },
        '5FU-LV-deGramont': {
            name: '5-FU + LV (de Gramont regimen)',
            cycles: 12,
            drugs: [
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 600, unit: 'mg/m²', schedule: '22-hour infusion, every 2 weeks' }
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
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 600, unit: 'mg/m²', schedule: '22-hour infusion, every 2 weeks' },
                { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'every 2 weeks' }
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
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'twice daily, days 1-14, every 21 days' },
                { name: 'Mitomycin-C', dose: 7, unit: 'mg/m²', schedule: 'days 1,29' }
            ]
        },
        'TAS-102': {
            name: 'Trifluridine/Tipiracil (TAS-102)',
            cycles: 6,
            drugs: [
                { name: 'TAS-102', dose: 35, unit: 'mg/m²', schedule: 'twice daily, days 1-5 and 8-12, every 28 days' }
            ]
        },
        'TAS-102-Bevacizumab': {
            name: 'TAS-102 + Bevacizumab',
            cycles: 6,
            drugs: [
                { name: 'TAS-102', dose: 35, unit: 'mg/m²', schedule: 'twice daily, days 1-5 and 8-12, every 28 days' },
                { name: 'Bevacizumab', dose: 5, unit: 'mg/kg', schedule: 'every 2 weeks' }
            ]
        },
        'Regorafenib': {
            name: 'Regorafenib',
            cycles: 6,
            drugs: [
                { name: 'Regorafenib', dose: 160, unit: 'mg', schedule: 'daily for 21 days, then 7 days off, every 28 days' }
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
                { name: 'Panitumumab', dose: 6, unit: 'mg/kg', schedule: 'every 2 weeks' }
            ]
        },
        'Vemurafenib-Irinotecan-Cetuximab': {
            name: 'Vemurafenib + Irinotecan + Cetuximab (BRAF V600E)',
            cycles: 12,
            drugs: [
                { name: 'Vemurafenib', dose: 960, unit: 'mg', schedule: 'twice daily' },
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'every 2 weeks' },
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
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'every 2 weeks x 4, then 480mg flat dose every 28 days' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'every 6 weeks x 4 doses' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab (MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Trastuzumab-Lapatinib-CRC': {
            name: 'Trastuzumab + Lapatinib (HER2 positive)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                { name: 'Lapatinib', dose: 1000, unit: 'mg', schedule: 'daily' }
            ]
        },
        'Trastuzumab-Tucatinib-CRC': {
            name: 'Trastuzumab + Tucatinib (HER2 positive)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                { name: 'Tucatinib', dose: 300, unit: 'mg', schedule: 'twice daily' }
            ]
        },
        'Trastuzumab-Pertuzumab-CRC': {
            name: 'Trastuzumab + Pertuzumab (HER2 positive)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                { name: 'Pertuzumab', dose: 840, maintenanceDose: 420, unit: 'mg', schedule: 'loading dose, then 420 mg every 21 days', hasLoadingDose: true }
            ]
        },
        'T-DXd-CRC': {
            name: 'Trastuzumab deruxtecan (T-DXd) (HER2 positive)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'every 21 days' }
            ]
        }
    },
    gastric: {
        'FLOT4': {
            name: 'Fluorouracil + Leucovorin + Oxaliplatin + Docetaxel (FLOT4)',
            cycles: 8,
            drugs: [
                { name: 'Docetaxel', dose: 50, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2600, unit: 'mg/m²', days: 'D1 (24hr CI)', schedule: '24-hour infusion, every 2 weeks' }
            ]
        },
        'DCF': {
            name: 'Docetaxel + Cisplatin + 5-Fluorouracil (DCF)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: '5-Fluorouracil infusion', dose: 750, unit: 'mg/m²', schedule: 'daily x 5 days, every 21 days' }
            ]
        },
        'ECF': {
            name: 'Epirubicin + Cisplatin + 5-Fluorouracil (ECF)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: '5-Fluorouracil infusion', dose: 200, unit: 'mg/m²', schedule: 'daily continuous infusion' }
            ]
        },
        'ECX': {
            name: 'Epirubicin + Cisplatin + Capecitabine (ECX)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'twice daily, days 1-14, every 21 days' }
            ]
        },
        'EOX': {
            name: 'Epirubicin + Oxaliplatin + Capecitabine (EOX)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'twice daily, days 1-14, every 21 days' }
            ]
        },
        'CAPEOX': {
            name: 'Capecitabine + Oxaliplatin (CAPEOX)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, every 21 days' }
            ]
        },
        'mFOLFOX6': {
            name: 'Modified FOLFOX6 (mFOLFOX6)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' }
            ]
        },
        'mFOLFIRI': {
            name: 'Modified FOLFIRI (mFOLFIRI)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' }
            ]
        },
        'Cisplatin-5FU': {
            name: 'Cisplatin + 5-Fluorouracil (CF)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: '5-Fluorouracil infusion', dose: 1000, unit: 'mg/m²', schedule: 'daily x 4 days, every 21 days' }
            ]
        },
        'FLO': {
            name: 'Fluorouracil + Leucovorin + Oxaliplatin (FLO)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2600, unit: 'mg/m²', days: 'D1 (24hr CI)', schedule: '24-hour infusion, every 2 weeks' }
            ]
        },
        'Docetaxel-Cisplatin': {
            name: 'Docetaxel + Cisplatin (DC)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'Capecitabine-Cisplatin': {
            name: 'Capecitabine + Cisplatin (XP)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'twice daily, days 1-14, every 21 days' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'XP-Trastuzumab': {
            name: 'XP + Trastuzumab (HER2 positive)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'twice daily, days 1-14, every 21 days' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true }
            ]
        },
        '5FU-Cisplatin-Trastuzumab': {
            name: '5-FU + Cisplatin + Trastuzumab (HER2 positive)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: '5-Fluorouracil infusion', dose: 800, unit: 'mg/m²', schedule: 'daily x 5 days, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true }
            ]
        },
        'Paclitaxel-Ramucirumab': {
            name: 'Paclitaxel + Ramucirumab',
            cycles: 8,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly x 12 weeks' },
                { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'every 2 weeks' }
            ]
        },
        'FOLFIRI-Ramucirumab': {
            name: 'FOLFIRI + Ramucirumab',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' },
                { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'every 2 weeks' }
            ]
        },
        'Irinotecan-Ramucirumab': {
            name: 'Irinotecan + Ramucirumab',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 150, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'every 2 weeks' }
            ]
        },
        'Pembrolizumab-Cisplatin-5FU': {
            name: 'Pembrolizumab + Cisplatin + 5-FU (PD-L1 positive)',
            cycles: 6,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: '5-Fluorouracil infusion', dose: 800, unit: 'mg/m²', schedule: 'daily x 5 days, every 21 days' }
            ]
        },
        'mFOLFOX6-Nivolumab': {
            name: 'mFOLFOX6 + Nivolumab',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' },
                { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'every 21 days' }
            ]
        },
        'Nivolumab-CAPEOX': {
            name: 'Nivolumab + CAPEOX',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'every 21 days' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, every 21 days' }
            ]
        },
        'Nivolumab-Ipilimumab': {
            name: 'Nivolumab + Ipilimumab (MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'every 2 weeks x 4, then 480mg flat dose every 28 days' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'every 6 weeks x 4 doses' }
            ]
        },
        'Pembrolizumab-Trastuzumab-CAPEOX': {
            name: 'Pembrolizumab + Trastuzumab + CAPEOX (HER2+/PD-L1+)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, every 21 days' }
            ]
        },
        'Pembrolizumab-Trastuzumab-5FU-Cisplatin': {
            name: 'Pembrolizumab + Trastuzumab + 5FU + Cisplatin (HER2+/PD-L1+)',
            cycles: 6,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: '5-Fluorouracil infusion', dose: 800, unit: 'mg/m²', schedule: 'daily x 5 days, every 21 days' }
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
                { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'twice daily, days 1-14, every 21 days' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'Trastuzumab-Pertuzumab': {
            name: 'Trastuzumab + Pertuzumab (HER2 positive)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                { name: 'Pertuzumab', dose: 840, maintenanceDose: 420, unit: 'mg', schedule: 'loading dose, then 420 mg every 21 days', hasLoadingDose: true }
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
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'every 21 days' }
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
            name: 'Single agent Irinotecan (every 2 weeks)',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'every 2 weeks' }
            ]
        },
        'Single-Irinotecan-3weekly': {
            name: 'Single agent Irinotecan (every 21 days)',
            cycles: 8,
            drugs: [
                { name: 'Irinotecan', dose: 350, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'Single-Ramucirumab': {
            name: 'Single agent Ramucirumab',
            cycles: 12,
            drugs: [
                { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'every 2 weeks' }
            ]
        },
        'Single-Pembrolizumab': {
            name: 'Single agent Pembrolizumab (PD-L1 positive)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Single-Nivolumab': {
            name: 'Single agent Nivolumab',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 2 weeks or 480mg every 28 days' }
            ]
        },
        'Single-Cisplatin': {
            name: 'Single agent Cisplatin',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'TAS-102': {
            name: 'Trifluridine/Tipiracil (TAS-102)',
            cycles: 6,
            drugs: [
                { name: 'TAS-102', dose: 35, unit: 'mg/m²', schedule: 'twice daily, days 1-5 and 8-12, every 28 days' }
            ]
        },
        'Dostarlimab': {
            name: 'Dostarlimab (MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'every 21 days x 4, then 1000mg every 6 weeks' }
            ]
        },
        'T-DXd-Gastric': {
            name: 'Trastuzumab deruxtecan (T-DXd) (HER2 positive)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab deruxtecan', dose: 6.4, unit: 'mg/kg', schedule: 'every 21 days' }
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
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 21 days' },
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
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, every 21 days' }
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
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, every 21 days' }
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
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 21 days' },
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 2 weeks x 6 doses' }
                ]
            },
            'ICE-Pembrolizumab': {
                name: 'ICE + Pembrolizumab (Relapsed/Refractory)',
                cycles: 3,
                drugs: [
                    { name: 'Ifosfamide', dose: 5000, unit: 'mg/m²', schedule: 'day 2, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 2, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 21 days' },
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
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 21 days' },
                    { name: 'Brentuximab vedotin', dose: 1.8, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'IGEV': {
                name: 'IGEV (Ifosfamide + Gemcitabine + Vinorelbine + Prednisone)',
                cycles: 4,
                drugs: [
                    { name: 'Ifosfamide', dose: 2000, unit: 'mg/m²', days: 'D1-D4', schedule: 'days 1-4, every 21 days' },
                    { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', days: 'D1,D4', schedule: 'days 1, 4, every 21 days' },
                    { name: 'Vinorelbine', dose: 20, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, every 21 days' }
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
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 21 days' }
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
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 21 days' },
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
                    { name: 'Etoposide', dose: 200, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 21 days' },
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
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
                    { name: 'Vinorelbine', dose: 20, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
                    { name: 'Doxorubicin (Liposomal)', dose: 15, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Gemcitabine-Single': {
                name: 'Gemcitabine (Single Agent)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' }
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
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, every 21 days' }
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
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, every 21 days' }
                ]
            },
            'R-CVP': {
                name: 'R-CVP (Rituximab + CVP) - Indolent NHL',
                cycles: 8,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, every 21 days' }
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
                    { name: 'Prednisone', dose: 60, unit: 'mg/m²', schedule: 'days 1-5, every 21 days' },
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
                    { name: 'Prednisone', dose: 60, unit: 'mg/m²', schedule: 'days 1-5, every 21 days' },
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
                    { name: 'Copanlisib', dose: 60, unit: 'mg', schedule: 'days 1, 8, 15, every 28 days' }
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
                    { name: 'Carfilzomib', dose: 27, unit: 'mg/m²', schedule: 'days 1, 2, 8, 9, 15, 16, every 28 days' }
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
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, every 21 days' }
                ]
            },
            'R-CEPP': {
                name: 'R-CEPP (Rituximab + CEPP)',
                cycles: 6,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', days: 'D1,D8', schedule: 'days 1, 8, every 28 days' },
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
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, every 21 days' }
                ]
            },
            'R-ICE': {
                name: 'R-ICE (Relapsed/Refractory)',
                cycles: 3,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Ifosfamide', dose: 5000, unit: 'mg/m²', schedule: 'day 2, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'day 2, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 21 days' }
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
                    { name: 'Methylprednisolone (Solu-Medrol)', dose: 500, unit: 'mg', days: 'D1-D5', schedule: 'days 1-5, every 21 days' },
                    { name: 'Cytarabine (High-dose)', dose: 2000, unit: 'mg/m²', schedule: 'day 5, every 21 days' },
                    { name: 'Cisplatin', dose: 25, unit: 'mg/m²', days: 'D1-D4', schedule: 'days 1-4, every 21 days' }
                ]
            },
            'R-GDP': {
                name: 'R-GDP (Relapsed/Refractory)',
                cycles: 3,
                drugs: [
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
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
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, every 21 days' }
                ]
            },
            'CHOEP': {
                name: 'CHOEP (T-cell lymphomas)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Hydroxydaunorubicin)', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 21 days' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, every 21 days' }
                ]
            },
            'CHOP-Brentuximab': {
                name: 'CHOP + Brentuximab vedotin (CD30+ PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 750, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Hydroxydaunorubicin)', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Vincristine (Oncovin)', dose: 1.4, unit: 'mg/m²', schedule: 'D1, every 21 days (max 2mg)' },
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, every 21 days' },
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
                    { name: 'Prednisone', dose: 100, unit: 'mg', schedule: 'days 1-5, every 21 days' }
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
                    { name: 'Belinostat', dose: 1000, unit: 'mg/m²', schedule: 'days 1-5, every 21 days' }
                ]
            },
            'Romidepsin': {
                name: 'Romidepsin (HDAC inhibitor - PTCL)',
                cycles: 6,
                drugs: [
                    { name: 'Romidepsin', dose: 14, unit: 'mg/m²', schedule: 'days 1, 8, 15, every 28 days' }
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
                    { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
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
                    { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 21 days' }
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
        'Nivolumab': {
            name: 'Nivolumab (Anti-PD-1 - First-line metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 2 weeks, then 480mg every 28 days' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab (Anti-PD-1 - First-line metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days, then 400mg every 6 weeks' }
            ]
        },
        'Nivolumab-Ipilimumab': {
            name: 'Nivolumab + Ipilimumab (Combination immunotherapy)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 1, unit: 'mg/kg', schedule: 'every 21 days, then 240mg every 2 weeks' },
                { name: 'Ipilimumab', dose: 3, unit: 'mg/kg', schedule: 'every 21 days only' }
            ]
        },
        'Nivolumab-Relatlimab': {
            name: 'Nivolumab + Relatlimab (LAG-3 + PD-1 inhibition)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 480, unit: 'mg', schedule: 'every 28 days' },
                { name: 'Relatlimab', dose: 160, unit: 'mg', schedule: 'every 28 days' }
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
                { name: 'Atezolizumab', dose: 840, unit: 'mg', schedule: 'every 2 weeks, then 1200mg every 21 days' },
                { name: 'Vemurafenib', dose: 720, unit: 'mg', schedule: 'twice daily, continuous' },
                { name: 'Cobimetinib', dose: 60, unit: 'mg', schedule: 'daily x 21 days, then 7 days off' }
            ]
        },
        'Ipilimumab': {
            name: 'Ipilimumab (Anti-CTLA-4 monotherapy)',
            cycles: 4,
            drugs: [
                { name: 'Ipilimumab', dose: 3, unit: 'mg/kg', schedule: 'every 21 days' }
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
                { name: 'Dacarbazine', dose: 220, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 28 days' },
                { name: 'Carmustine (BCNU)', dose: 150, unit: 'mg/m²', schedule: 'day 1, every 6 weeks (cycles 1, 3, 5)' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 28 days' }
            ]
        },
        'IFN-Dacarbazine': {
            name: 'Interferon + Dacarbazine',
            cycles: 6,
            drugs: [
                { name: 'Interferon alfa-2b', dose: 15, unit: 'MIU/m²', schedule: 'SC daily x 5 days/week' },
                { name: 'Dacarbazine', dose: 200, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 21 days' }
            ]
        },
        'Temozolomide-Thalidomide': {
            name: 'Temozolomide + Thalidomide',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 150, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 28 days' },
                { name: 'Thalidomide', dose: 200, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Dacarbazine': {
            name: 'Dacarbazine (Single agent)',
            cycles: 6,
            drugs: [
                { name: 'Dacarbazine', dose: 250, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 21 days' }
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
                { name: 'Temozolomide', dose: 200, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 28 days' }
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
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
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
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days, then maintenance' }
            ]
        },
        'Bevacizumab-Maintenance': {
            name: 'Bevacizumab Maintenance (Post first-line)',
            cycles: 12,
            drugs: [
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'every 21 days (maintenance)' }
            ]
        },
        'Carboplatin-Docetaxel': {
            name: 'Carboplatin + Docetaxel (First-line alternative)',
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
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
                { name: 'Doxorubicin liposomal', dose: 30, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Cisplatin': {
            name: 'Gemcitabine + Cisplatin (Recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Carboplatin': {
            name: 'Gemcitabine + Carboplatin (Recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 4', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'IP-Cisplatin-Paclitaxel': {
            name: 'IP Cisplatin + IV Paclitaxel + IP Paclitaxel (First-line optimal debulking)',
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
            name: 'Cisplatin + Cyclophosphamide (Historical first-line)',
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
                { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 21 days' }
            ]
        },
        'Gemcitabine-Single': {
            name: 'Gemcitabine (Single agent - recurrent)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8,D15', schedule: 'days 1, 8, 15, every 28 days' }
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
            name: 'Veliparib + Carboplatin + Paclitaxel (BRCA+ first-line)',
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
                { name: 'Bleomycin', dose: 30, unit: 'units', schedule: 'days 1, 8, 15, every 21 days' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 21 days' }
            ]
        }
    },
    prostate: {
        'Docetaxel-Prednisone': {
            name: 'Docetaxel + Prednisone (mCSPC/mCRPC first-line)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Prednisone', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Docetaxel-Leuprolide': {
            name: 'Docetaxel + Leuprolide (mCSPC)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Leuprolide', dose: 22.5, unit: 'mg', schedule: 'IM q3months, continuous' },
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
            name: 'Cabazitaxel + Prednisone (mCRPC post-docetaxel)',
            cycles: 8,
            drugs: [
                { name: 'Cabazitaxel', dose: 20, unit: 'mg/m²', schedule: 'D1, every 21 days' },
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
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days (MSI-H/dMMR)' }
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
                { name: 'Sipuleucel-T', dose: '50×10⁶', unit: 'autologous CD54+ cells', schedule: '3 infusions every 2 weeks (weeks 0, 2, 4)' }
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
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'every 21 days' }
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
                { name: 'Radium-223 dichloride', dose: 55, unit: 'kBq/kg', schedule: 'IV every 28 days (bone metastases)' }
            ]
        },
        'Lutetium-177-PSMA': {
            name: 'Lutetium-177 PSMA-617 (PSMA-targeted therapy)',
            cycles: 6,
            drugs: [
                { name: 'Lutetium-177 PSMA-617', dose: 7400, unit: 'MBq', schedule: 'IV every 6 weeks (PSMA+ mCRPC)' }
            ]
        }
    },
    renal: {
        'Nivolumab-Ipilimumab': {
            name: 'Nivolumab + Ipilimumab (First-line intermediate/poor risk)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'every 21 days, then 240mg every 2 weeks' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'every 21 days only' }
            ]
        },
        'Pembrolizumab-Axitinib': {
            name: 'Pembrolizumab + Axitinib (First-line)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days, then 400mg every 6 weeks' },
                { name: 'Axitinib', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Avelumab-Axitinib': {
            name: 'Avelumab + Axitinib (First-line)',
            cycles: 8,
            drugs: [
                { name: 'Avelumab', dose: 800, unit: 'mg', schedule: 'every 2 weeks' },
                { name: 'Axitinib', dose: 5, unit: 'mg', schedule: 'twice daily, continuous' }
            ]
        },
        'Lenvatinib-Pembrolizumab': {
            name: 'Lenvatinib + Pembrolizumab (First-line)',
            cycles: 8,
            drugs: [
                { name: 'Lenvatinib', dose: 20, unit: 'mg', schedule: 'daily, continuous' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days, then 400mg every 6 weeks' }
            ]
        },
        'Nivolumab-Cabozantinib': {
            name: 'Nivolumab + Cabozantinib (First-line)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 2 weeks, then 480mg every 28 days' },
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
                { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'every 2 weeks' },
                { name: 'Everolimus', dose: 10, unit: 'mg', schedule: 'daily, continuous' }
            ]
        },
        'Bevacizumab-Interferon': {
            name: 'Bevacizumab + Interferon alfa-2a (Historical first-line)',
            cycles: 8,
            drugs: [
                { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'every 2 weeks' },
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
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 2 weeks, then 480mg every 28 days' }
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
                { name: 'Bevacizumab', dose: 10, unit: 'mg/kg', schedule: 'every 2 weeks' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab (Second-line)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days, then 400mg every 6 weeks' }
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
            name: 'BEP (Bleomycin + Etoposide + Cisplatin) - Standard risk',
            cycles: 3,
            drugs: [
                { name: 'Bleomycin', dose: 30, unit: 'units', schedule: 'days 1, 8, 15, every 21 days' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 21 days' }
            ]
        },
        'EP': {
            name: 'EP (Etoposide + Cisplatin) - Standard risk',
            cycles: 4,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 21 days' }
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
                { name: 'Vinblastine', dose: 0.11, unit: 'mg/kg', days: 'D1-D2', schedule: 'days 1-2, every 21 days' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 21 days' },
                { name: 'Mesna', dose: 400, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5 (with ifosfamide)' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 21 days' }
            ]
        },
        'TIP': {
            name: 'TIP (Paclitaxel + Ifosfamide + Cisplatin) - Salvage',
            cycles: 4,
            drugs: [
                { name: 'Paclitaxel', dose: 250, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Ifosfamide', dose: 1500, unit: 'mg/m²', days: 'D2-D6', schedule: 'days 2-6, every 21 days' },
                { name: 'Mesna', dose: 500, unit: 'mg/m²', days: 'D2-D6', schedule: 'days 2-6 (with ifosfamide)' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', days: 'D2-D6', schedule: 'days 2-6, every 21 days' }
            ]
        },
        'VeIP': {
            name: 'VeIP (Vinblastine + Ifosfamide + Cisplatin) - Salvage',
            cycles: 4,
            drugs: [
                { name: 'Vinblastine', dose: 0.11, unit: 'mg/kg', days: 'D1-D2', schedule: 'days 1-2, every 21 days' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 21 days' },
                { name: 'Mesna', dose: 400, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5 (with ifosfamide)' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 21 days' }
            ]
        },
        'PVB': {
            name: 'PVB (Cisplatin + Vinblastine + Bleomycin) - Historical',
            cycles: 3,
            drugs: [
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 21 days' },
                { name: 'Vinblastine', dose: 0.15, unit: 'mg/kg', days: 'D1-D2', schedule: 'days 1-2, every 21 days' },
                { name: 'Bleomycin', dose: 30, unit: 'units', schedule: 'days 1, 8, 15, every 21 days' }
            ]
        },
        'VAB-6': {
            name: 'VAB-6 (Vinblastine + Actinomycin D + Bleomycin + Cisplatin + Cyclophosphamide) - Historical',
            cycles: 3,
            drugs: [
                { name: 'Vinblastine', dose: 4, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Actinomycin D', dose: 1, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Bleomycin', dose: 30, unit: 'units', schedule: 'days 1, 8, 15, every 21 days' },
                { name: 'Cisplatin', dose: 120, unit: 'mg/m²', schedule: 'day 4, every 21 days' },
                { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Paclitaxel-Gemcitabine': {
            name: 'Paclitaxel + Gemcitabine (Salvage)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', days: 'D1,D8,D15', schedule: 'days 1, 8, 15, every 28 days' },
                { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', days: 'D1,D8,D15', schedule: 'days 1, 8, 15, every 28 days' }
            ]
        },
        'Paclitaxel-Gemcitabine-Oxaliplatin': {
            name: 'Paclitaxel + Gemcitabine + Oxaliplatin (Salvage)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
                { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Oxaliplatin': {
            name: 'Gemcitabine + Oxaliplatin (Salvage)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Etoposide-Single': {
            name: 'Etoposide (Single agent)',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 21 days' }
            ]
        }
    },
    sarcoma: {
        'AD': {
            name: 'AD (Doxorubicin + Dacarbazine)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Dacarbazine', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'AI': {
            name: 'AI (Doxorubicin + Ifosfamide)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Ifosfamide', dose: 10000, unit: 'mg/m²', schedule: 'continuous infusion days 1-3, every 21 days' },
                { name: 'Mesna', dose: 2000, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, every 21 days' }
            ]
        },
        'MAID': {
            name: 'MAID (Mesna + Doxorubicin + Ifosfamide + Dacarbazine)',
            cycles: 6,
            drugs: [
                { name: 'Mesna', dose: 2500, unit: 'mg/m²', schedule: 'continuous infusion days 1-4, every 21 days' },
                { name: 'Doxorubicin', dose: 20, unit: 'mg/m²', days: 'D1-D3', schedule: 'continuous infusion days 1-3, every 21 days' },
                { name: 'Ifosfamide', dose: 2500, unit: 'mg/m²', days: 'D1-D3', schedule: 'continuous infusion days 1-3, every 21 days' },
                { name: 'Dacarbazine', dose: 300, unit: 'mg/m²', days: 'D1-D3', schedule: 'continuous infusion days 1-3, every 21 days' }
            ]
        },
        'CYVADIC': {
            name: 'CYVADIC (Cyclophosphamide + Vincristine + Doxorubicin + Dacarbazine)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Vincristine', dose: 1.4, unit: 'mg/m²', schedule: 'D1, D8, every 21 days (max 2mg)' },
                { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Dacarbazine', dose: 250, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 21 days' }
            ]
        },
        'IAP': {
            name: 'IAP (Ifosfamide + Doxorubicin + Cisplatin)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 2000, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 21 days' },
                { name: 'Mesna', dose: 400, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5 (with ifosfamide)' },
                { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'AP': {
            name: 'AP (Doxorubicin + Cisplatin)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Docetaxel': {
            name: 'Gemcitabine + Docetaxel',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 900, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
                { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'day 8, every 21 days' }
            ]
        },
        'Gemcitabine-Vinorelbine': {
            name: 'Gemcitabine + Vinorelbine',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
                { name: 'Vinorelbine', dose: 25, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' }
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
                { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'Ifosfamide': {
            name: 'Ifosfamide (Single agent)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 3000, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 21 days' },
                { name: 'Mesna', dose: 600, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3 (with ifosfamide)' }
            ]
        },
        'Gemcitabine': {
            name: 'Gemcitabine (Single agent)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8,D15', schedule: 'days 1, 8, 15, every 28 days' }
            ]
        },
        'Doxorubicin-Liposomal': {
            name: 'Doxorubicin liposomal (Single agent)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin liposomal', dose: 50, unit: 'mg/m²', schedule: 'every 28 days' }
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
                { name: 'Trabectedin', dose: 1.5, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'Eribulin': {
            name: 'Eribulin (Single agent)',
            cycles: 6,
            drugs: [
                { name: 'Eribulin', dose: 1.4, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
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
                { name: 'Atezolizumab', dose: 840, unit: 'mg', schedule: 'every 2 weeks, then 1200mg every 21 days' }
            ]
        }
    },
    hepatocellular: {
        'Atezolizumab-Bevacizumab': {
            name: 'Atezolizumab + Bevacizumab (IMbrave150)',
            cycles: 8,
            drugs: [
                { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'every 21 days' }
            ]
        },
        'Durvalumab-Tremelimumab': {
            name: 'Durvalumab + Tremelimumab (HIMALAYA)',
            cycles: 6,
            drugs: [
                { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'every 28 days' },
                { name: 'Tremelimumab', dose: 300, unit: 'mg', schedule: 'every 28 days, then durvalumab alone' }
            ]
        },
        'Ipilimumab-Nivolumab': {
            name: 'Ipilimumab + Nivolumab (CheckMate 040)',
            cycles: 6,
            drugs: [
                { name: 'Ipilimumab', dose: 3, unit: 'mg/kg', schedule: 'every 21 days' },
                { name: 'Nivolumab', dose: 1, unit: 'mg/kg', schedule: 'every 21 days, then nivolumab 240mg every 2 weeks' }
            ]
        },
        'Sorafenib': {
            name: 'Sorafenib (TKI)',
            cycles: 8,
            drugs: [
                { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'twice daily' }
            ]
        },
        'Lenvatinib': {
            name: 'Lenvatinib (REFLECT)',
            cycles: 8,
            drugs: [
                { name: 'Lenvatinib', dose: 8, unit: 'mg', schedule: 'daily (≥60kg) or 12mg daily (<60kg)' }
            ]
        },
        'Cabozantinib': {
            name: 'Cabozantinib (CELESTIAL)',
            cycles: 8,
            drugs: [
                { name: 'Cabozantinib', dose: 60, unit: 'mg', schedule: 'daily' }
            ]
        },
        'Regorafenib': {
            name: 'Regorafenib (RESORCE)',
            cycles: 8,
            drugs: [
                { name: 'Regorafenib', dose: 160, unit: 'mg', schedule: 'daily for 21 days, then 7 days off' }
            ]
        },
        'Nivolumab': {
            name: 'Nivolumab (CheckMate 040)',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 2 weeks, then 480mg every 28 days' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab (KEYNOTE-224)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
            ]
        },
        'Ramucirumab': {
            name: 'Ramucirumab (REACH-2)',
            cycles: 8,
            drugs: [
                { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'every 2 weeks' }
            ]
        }
    },
    osteosarcoma: {
        'MAP': {
            name: 'Methotrexate + Adriamycin + Cisplatin (MAP)',
            cycles: 6,
            drugs: [
                { name: 'Methotrexate (HD)', dose: 12000, unit: 'mg/m²', schedule: 'D1 every 21 days (with leucovorin rescue)' },
                { name: 'Doxorubicin (Adriamycin)', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Cisplatin', dose: 120, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'IE': {
            name: 'Ifosfamide + Etoposide (IE)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 1800, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Mesna', dose: 360, unit: 'mg/m²', schedule: 'D1-D5 every 21 days (uroprotection)' }
            ]
        },
        'IAP': {
            name: 'Ifosfamide + Adriamycin + Cisplatin (IAP)',
            cycles: 6,
            drugs: [
                { name: 'Ifosfamide', dose: 2000, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Doxorubicin (Adriamycin)', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Cisplatin', dose: 120, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Mesna', dose: 400, unit: 'mg/m²', schedule: 'D1-D5 every 21 days (uroprotection)' }
            ]
        },
        'AP': {
            name: 'Adriamycin + Cisplatin (AP)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin (Adriamycin)', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Cisplatin', dose: 120, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'HD-MTX': {
            name: 'High-Dose Methotrexate (HD-MTX)',
            cycles: 8,
            drugs: [
                { name: 'Methotrexate (HD)', dose: 12000, unit: 'mg/m²', schedule: 'D1 every 2 weeks (with leucovorin rescue)' },
                { name: 'Leucovorin', dose: 15, unit: 'mg/m²', schedule: 'rescue per protocol' }
            ]
        },
        'Gemcitabine-Docetaxel': {
            name: 'Gemcitabine + Docetaxel (Relapsed)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 675, unit: 'mg/m²', schedule: 'D1,D8 every 21 days' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D8 every 21 days' }
            ]
        },
        'Sorafenib': {
            name: 'Sorafenib (Relapsed)',
            cycles: 8,
            drugs: [
                { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'twice daily' }
            ]
        },
        'Cyclophosphamide-Etoposide': {
            name: 'Cyclophosphamide + Etoposide (CE)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' }
            ]
        }
    },
    thymoma: {
        'CAP': {
            name: 'Cyclophosphamide + Adriamycin + Cisplatin (CAP)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Doxorubicin (Adriamycin)', dose: 50, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'ADOC': {
            name: 'Adriamycin + Cisplatin + Vincristine + Cyclophosphamide (ADOC)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin (Adriamycin)', dose: 40, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Vincristine', dose: 0.6, unit: 'mg/m²', schedule: 'D3 every 21 days (max 2mg)' },
                { name: 'Cyclophosphamide', dose: 700, unit: 'mg/m²', schedule: 'D4 every 21 days' }
            ]
        },
        'Cisplatin-Etoposide': {
            name: 'Cisplatin + Etoposide (PE)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Etoposide', dose: 120, unit: 'mg/m²', schedule: 'D1-D3 every 21 days' }
            ]
        },
        'VIP': {
            name: 'Etoposide + Ifosfamide + Cisplatin (VIP)',
            cycles: 4,
            drugs: [
                { name: 'Etoposide', dose: 75, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Mesna', dose: 240, unit: 'mg/m²', schedule: 'D1-D5 every 21 days (uroprotection)' }
            ]
        },
        'Gemcitabine-Docetaxel': {
            name: 'Gemcitabine + Docetaxel',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1,D8 every 21 days' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D8 every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel': {
            name: 'Carboplatin + Paclitaxel',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC', unit: 'mg', schedule: 'D1 every 21 days', requiresAUC: true },
                { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab (PD-1 inhibitor)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
            ]
        },
        'Octreotide': {
            name: 'Octreotide (for thymic neuroendocrine tumors)',
            cycles: 12,
            drugs: [
                { name: 'Octreotide LAR', dose: 30, unit: 'mg', schedule: 'monthly injection' }
            ]
        }
    },
    thyroid: {
        'Doxorubicin-Cisplatin': {
            name: 'Doxorubicin + Cisplatin (Anaplastic)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Doxorubicin': {
            name: 'Doxorubicin (single agent)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 75, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'Sorafenib': {
            name: 'Sorafenib (DECISION trial)',
            cycles: 8,
            drugs: [
                { name: 'Sorafenib', dose: 400, unit: 'mg', schedule: 'twice daily' }
            ]
        },
        'Sunitinib': {
            name: 'Sunitinib (medullary thyroid cancer)',
            cycles: 8,
            drugs: [
                { name: 'Sunitinib', dose: 50, unit: 'mg', schedule: 'daily for 4 weeks, then 2 weeks off' }
            ]
        },
        'Pazopanib': {
            name: 'Pazopanib (follicular thyroid cancer)',
            cycles: 8,
            drugs: [
                { name: 'Pazopanib', dose: 800, unit: 'mg', schedule: 'daily' }
            ]
        },
        'Vandetanib': {
            name: 'Vandetanib (medullary thyroid cancer)',
            cycles: 8,
            drugs: [
                { name: 'Vandetanib', dose: 300, unit: 'mg', schedule: 'daily' }
            ]
        },
        'Cabozantinib': {
            name: 'Cabozantinib (medullary thyroid cancer)',
            cycles: 8,
            drugs: [
                { name: 'Cabozantinib', dose: 140, unit: 'mg', schedule: 'daily' }
            ]
        },
        'Lenvatinib': {
            name: 'Lenvatinib (SELECT trial)',
            cycles: 8,
            drugs: [
                { name: 'Lenvatinib', dose: 24, unit: 'mg', schedule: 'daily' }
            ]
        },
        'Selpercatinib': {
            name: 'Selpercatinib (RET fusion positive)',
            cycles: 8,
            drugs: [
                { name: 'Selpercatinib', dose: 160, unit: 'mg', schedule: 'twice daily' }
            ]
        },
        'Pralsetinib': {
            name: 'Pralsetinib (RET fusion positive)',
            cycles: 8,
            drugs: [
                { name: 'Pralsetinib', dose: 400, unit: 'mg', schedule: 'daily' }
            ]
        },
        'Dabrafenib-Trametinib': {
            name: 'Dabrafenib + Trametinib (BRAF V600E positive)',
            cycles: 8,
            drugs: [
                { name: 'Dabrafenib', dose: 150, unit: 'mg', schedule: 'twice daily' },
                { name: 'Trametinib', dose: 2, unit: 'mg', schedule: 'daily' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab (anaplastic thyroid cancer)',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
            ]
        },
        'Larotrectinib': {
            name: 'Larotrectinib (NTRK fusion positive)',
            cycles: 8,
            drugs: [
                { name: 'Larotrectinib', dose: 100, unit: 'mg', schedule: 'twice daily' }
            ]
        }
    },
    pancreatic: {
        'mFOLFIRINOX': {
            name: 'Modified FOLFIRINOX (mFOLFIRINOX)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Irinotecan', dose: 150, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' }
            ]
        },
        'Gemcitabine-Nabpaclitaxel': {
            name: 'Gemcitabine + Nab-paclitaxel',
            cycles: 6,
            drugs: [
                { name: 'Nab-paclitaxel', dose: 125, unit: 'mg/m²', schedule: 'days 1, 8, 15, every 28 days' },
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'days 1, 8, 15, every 28 days' }
            ]
        },
        'Gemcitabine-Capecitabine': {
            name: 'Gemcitabine + Capecitabine',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
                { name: 'Capecitabine', dose: 830, unit: 'mg/m²', schedule: 'twice daily, days 1-14, every 21 days' }
            ]
        },
        'Single-Gemcitabine': {
            name: 'Single agent Gemcitabine',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Single-Capecitabine': {
            name: 'Single agent Capecitabine',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'twice daily, days 1-14, every 21 days' }
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
                { name: 'Gemcitabine', dose: 300, unit: 'mg/m²', schedule: 'D1, D8, every 21 days, then with RT' },
                { name: 'Capecitabine', dose: 830, unit: 'mg/m²', schedule: 'twice daily, days 1-14, every 21 days, then with RT' }
            ]
        },
        '5FU-LV': {
            name: '5-Fluorouracil + Leucovorin',
            cycles: 6,
            drugs: [
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' }
            ]
        },
        'GTX': {
            name: 'Gemcitabine + Docetaxel + Capecitabine (GTX)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 750, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Docetaxel', dose: 30, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Capecitabine', dose: 750, unit: 'mg/m²', schedule: 'twice daily, days 1-14, every 21 days' }
            ]
        },
        'GEMOX': {
            name: 'Gemcitabine + Oxaliplatin (GEMOX)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
                { name: 'Oxaliplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Erlotinib': {
            name: 'Gemcitabine + Erlotinib',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
                { name: 'Erlotinib', dose: 100, unit: 'mg', schedule: 'daily' }
            ]
        },
        'Capecitabine-Erlotinib': {
            name: 'Capecitabine + Erlotinib',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'twice daily, days 1-14, every 21 days' },
                { name: 'Erlotinib', dose: 100, unit: 'mg', schedule: 'daily' }
            ]
        },
        'Liposomal-Irinotecan-5FU-LV': {
            name: 'Liposomal Irinotecan + 5-FU + LV (NAPOLI-1)',
            cycles: 12,
            drugs: [
                { name: 'Liposomal Irinotecan', dose: 70, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' }
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
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days or 400mg every 6 weeks' }
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
        '5FU-MMC-RT-EORTC': {
            name: '5-FU + Mitomycin-C + RT (EORTC)',
            cycles: 2,
            drugs: [
                { name: '5-Fluorouracil', dose: 200, unit: 'mg/m²/day', schedule: 'continuous infusion D1-D26' },
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
            name: 'Modified FOLFOX6 (mFOLFOX6)',
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
            name: 'Modified DCF (First-line, metastatic)',
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
            name: 'Single agent Pembrolizumab (Second-line, metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Single-Nivolumab': {
            name: 'Single agent Nivolumab (Second-line, metastatic)',
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
        // First-line Metastatic Therapy
        'Gemcitabine-Cisplatin-Durvalumab': {
            name: 'Gemcitabine + Cisplatin + Durvalumab (First-line metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Cisplatin': {
            name: 'Gemcitabine + Cisplatin (First-line metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Gemcitabine-Capecitabine': {
            name: 'Gemcitabine + Capecitabine (First-line metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Capecitabine', dose: 650, unit: 'mg/m²', schedule: 'twice daily D1-D14, every 21 days' }
            ]
        },
        'GEMOX': {
            name: 'Gemcitabine + Oxaliplatin (GEMOX) - (First-line metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Oxaliplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Nabpaclitaxel': {
            name: 'Gemcitabine + Nab-paclitaxel (First-line metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Nab-paclitaxel', dose: 125, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        'Gemcitabine-Cisplatin-Nabpaclitaxel': {
            name: 'Gemcitabine + Cisplatin + Nab-paclitaxel (First-line metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Gemcitabine-Cisplatin-Pembrolizumab': {
            name: 'Gemcitabine + Cisplatin + Pembrolizumab (First-line metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Capecitabine-Cisplatin': {
            name: 'Capecitabine + Cisplatin (First-line metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily D1-D14, every 21 days' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        // Second-line Metastatic Therapy
        'mFOLFOX6': {
            name: 'Modified FOLFOX6 (Second-line metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'D1, every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', schedule: 'D1-D2 (46hr CI), every 2 weeks' }
            ]
        },
        '5FU-Cisplatin': {
            name: '5-FU + Cisplatin (Second-line metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil infusion', dose: 1000, unit: 'mg/m²', schedule: 'daily x 4 days, every 21 days' }
            ]
        },
        'CAPEOX': {
            name: 'Capecitabine + Oxaliplatin (CAPEOX) - (Second-line metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', schedule: 'twice daily, days 1-14, every 21 days' }
            ]
        },
        'Single-Gemcitabine': {
            name: 'Single agent Gemcitabine (Second-line metastatic)',
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
        // First-line Metastatic Therapy
        'GC': {
            name: 'Gemcitabine + Cisplatin (First-line metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 28 days' }
            ]
        },
        'Gemcitabine-Cisplatin-Nivolumab': {
            name: 'Gemcitabine + Cisplatin + Nivolumab (First-line metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 2 weeks' }
            ]
        },
        'Enfortumab-Vedotin-Pembrolizumab': {
            name: 'Enfortumab Vedotin + Pembrolizumab (First-line metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Enfortumab Vedotin', dose: 1.25, unit: 'mg/kg (max 125mg)', schedule: 'D1, D8, D15, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'PC': {
            name: 'Paclitaxel + Carboplatin (First-line metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'GCa': {
            name: 'Gemcitabine + Carboplatin (First-line metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'DC': {
            name: 'Docetaxel + Cisplatin (First-line metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'CAP': {
            name: 'Cyclophosphamide + Doxorubicin + Cisplatin (First-line metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 400, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Doxorubicin', dose: 40, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D2, every 21 days' }
            ]
        },
        'MCV': {
            name: 'Methotrexate + Carboplatin + Vinblastine (First-line metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Methotrexate', dose: 30, unit: 'mg/m²', schedule: 'D1, D15, D22, every 28 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 28 days' },
                { name: 'Vinblastine', dose: 4, unit: 'mg/m²', schedule: 'D1, D15, D22, every 28 days' }
            ]
        },
        'CMV': {
            name: 'Cisplatin + Methotrexate + Vinblastine (First-line metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D2, every 21 days' },
                { name: 'Methotrexate', dose: 30, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Vinblastine', dose: 4, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'ITP': {
            name: 'Ifosfamide + Paclitaxel + Cisplatin (First-line metastatic)',
            cycles: 4,
            drugs: [
                { name: 'Ifosfamide', dose: 1500, unit: 'mg/m²', schedule: 'D1-D3, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Ifosfamide-Doxorubicin-Gemcitabine': {
            name: 'Ifosfamide + Doxorubicin + Gemcitabine (First-line metastatic)',
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
        // Second-line and Later Metastatic Therapy
        'Enfortumab-Vedotin': {
            name: 'Enfortumab Vedotin (Second-line metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Enfortumab Vedotin', dose: 1.25, unit: 'mg/kg (max 125mg)', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        'Single-Pembrolizumab': {
            name: 'Single agent Pembrolizumab (Second-line metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
            ]
        },
        'Single-Nivolumab': {
            name: 'Single agent Nivolumab (Second-line metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 2 weeks' }
            ]
        },
        'Durvalumab': {
            name: 'Durvalumab (Second-line metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Durvalumab', dose: 1200, unit: 'mg', schedule: 'every 28 days' }
            ]
        },
        'Sacituzumab-Govitecan': {
            name: 'Sacituzumab Govitecan (Second-line metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Sacituzumab Govitecan', dose: 10, unit: 'mg/kg', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'GP': {
            name: 'Gemcitabine + Paclitaxel (Second-line metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'GD': {
            name: 'Gemcitabine + Docetaxel (Second-line metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Single-Gemcitabine': {
            name: 'Single agent Gemcitabine (Second-line metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, D15, every 28 days' }
            ]
        },
        'Single-Paclitaxel': {
            name: 'Single agent Paclitaxel (Second-line metastatic)',
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
        // First-line therapy for transplant-eligible patients
        'VRd': {
            name: 'Bortezomib + Lenalidomide + Dexamethasone (VRd) - Transplant Eligible',
            cycles: 4,
            drugs: [
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1,D4,D8,D11 every 21 days' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'D1-D14 every 21 days' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1,D2,D4,D5,D8,D9,D11,D12 every 21 days' }
            ]
        },
        'VTD': {
            name: 'Bortezomib + Thalidomide + Dexamethasone (VTD) - Transplant Eligible',
            cycles: 4,
            drugs: [
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1,D4,D8,D11 every 21 days' },
                { name: 'Thalidomide', dose: 200, unit: 'mg', schedule: 'daily' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1,D4,D8,D11 every 21 days' }
            ]
        },
        'CyBorD': {
            name: 'Cyclophosphamide + Bortezomib + Dexamethasone (CyBorD) - Transplant Eligible',
            cycles: 4,
            drugs: [
                { name: 'Cyclophosphamide', dose: 300, unit: 'mg/m²', schedule: 'D1,D8,D15 every 28 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1,D4,D8,D11 every 21 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1,D4,D8,D11 every 21 days' }
            ]
        },
        'Dara-VTD': {
            name: 'Daratumumab + Bortezomib + Thalidomide + Dexamethasone (Dara-VTD) - Transplant Eligible',
            cycles: 4,
            drugs: [
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 2 weeks x 8 weeks, then every 28 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1,D4,D8,D11 every 21 days' },
                { name: 'Thalidomide', dose: 100, unit: 'mg', schedule: 'daily' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1,D4,D8,D11 every 21 days' }
            ]
        },
        'Dara-VRd': {
            name: 'Daratumumab + Bortezomib + Lenalidomide + Dexamethasone (Dara-VRd) - Transplant Eligible',
            cycles: 4,
            drugs: [
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 2 weeks x 8 weeks, then every 28 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1,D4,D8,D11 every 21 days' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'D1-D14 every 21 days' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1,D2,D4,D5,D8,D9,D11,D12 every 21 days' }
            ]
        },
        'Isa-VRd': {
            name: 'Isatuximab + Bortezomib + Lenalidomide + Dexamethasone (Isa-VRd) - Transplant Eligible',
            cycles: 4,
            drugs: [
                { name: 'Isatuximab', dose: 10, unit: 'mg/kg', schedule: 'weekly x 4 weeks, then every 2 weeks' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1,D4,D8,D11 every 21 days' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'D1-D14 every 21 days' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'D1,D4,D8,D11 every 21 days' }
            ]
        },
        // First-line therapy for transplant-ineligible patients
        'VRd-Lite': {
            name: 'Bortezomib + Lenalidomide + Dexamethasone (VRd-Lite) - Transplant Ineligible',
            cycles: 9,
            drugs: [
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1,D8,D15 every 28 days x 9 cycles' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'D1-D21 every 28 days x 9 cycles' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1,D8,D15 every 28 days x 9 cycles' }
            ]
        },
        'Dara-Rd': {
            name: 'Daratumumab + Lenalidomide + Dexamethasone (Dara-Rd) - Transplant Ineligible',
            cycles: 12,
            drugs: [
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 8 weeks, then every 2 weeks x 16 weeks, then every 28 days' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'D1-D21 every 28 days until progression' },
                { name: 'Dexamethasone', dose: 40, unit: 'mg', schedule: 'weekly until progression' }
            ]
        },
        'Dara-VMP': {
            name: 'Daratumumab + Bortezomib + Melphalan + Prednisone (Dara-VMP) - Transplant Ineligible',
            cycles: 9,
            drugs: [
                { name: 'Daratumumab', dose: 16, unit: 'mg/kg', schedule: 'weekly x 6 weeks, then every 21 days x 16 weeks, then every 28 days' },
                { name: 'Bortezomib', dose: 1.3, unit: 'mg/m²', schedule: 'D1,D4,D8,D11 every 6 weeks, then D1,D8,D15,D22 every 6 weeks' },
                { name: 'Melphalan', dose: 9, unit: 'mg/m²', schedule: 'D1-D4 every 6 weeks x 9 cycles' },
                { name: 'Prednisone', dose: 60, unit: 'mg/m²', schedule: 'D1-D4 every 6 weeks x 9 cycles' }
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
            name: 'Carfilzomib + Lenalidomide + Dexamethasone (KRd) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Carfilzomib', dose: 56, unit: 'mg/m²', schedule: 'D1,D2,D8,D9,D15,D16 every 28 days' },
                { name: 'Lenalidomide', dose: 25, unit: 'mg', schedule: 'D1-D21 every 28 days' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1,D2,D8,D9,D15,D16,D22,D23 every 28 days' }
            ]
        },
        'Kd': {
            name: 'Carfilzomib + Dexamethasone (Kd) - Relapsed/Refractory',
            cycles: 8,
            drugs: [
                { name: 'Carfilzomib', dose: 56, unit: 'mg/m²', schedule: 'D1,D2,D8,D9,D15,D16 every 28 days' },
                { name: 'Dexamethasone', dose: 20, unit: 'mg', schedule: 'D1,D2,D8,D9,D15,D16,D22,D23 every 28 days' }
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
                { name: 'Carfilzomib', dose: 56, unit: 'mg/m²', schedule: 'D1,D2,D8,D9,D15,D16 every 28 days' }
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
            name: 'Paclitaxel + Ifosfamide + Cisplatin (TIP) - First-line Metastatic',
            cycles: 4,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Cisplatin', dose: 20, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Mesna', dose: 240, unit: 'mg/m²', schedule: 'D1-D5 every 21 days (uroprotection)' }
            ]
        },
        'Cisplatin-5FU': {
            name: 'Cisplatin + 5-Fluorouracil (Cisplatin-5FU) - First-line Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Weekly': {
            name: 'Carboplatin + Paclitaxel (Weekly) - First-line Metastatic',
            cycles: 12,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC', unit: 'mg', schedule: 'D1 weekly', requiresAUC: true },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1 weekly' }
            ]
        },
        'Carboplatin-Paclitaxel': {
            name: 'Carboplatin + Paclitaxel (3-weekly) - First-line Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC', unit: 'mg', schedule: 'D1 every 21 days', requiresAUC: true },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Cisplatin-Paclitaxel': {
            name: 'Cisplatin + Paclitaxel - First-line Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Cisplatin-5FU-Pembrolizumab': {
            name: 'Cisplatin + 5-FU + Pembrolizumab - First-line Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'D1-D4 every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1 every 21 days until progression' }
            ]
        },
        'Carboplatin-5FU-Pembrolizumab': {
            name: 'Carboplatin + 5-FU + Pembrolizumab - First-line Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC', unit: 'mg', schedule: 'D1 every 21 days', requiresAUC: true },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', schedule: 'D1-D4 every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1 every 21 days until progression' }
            ]
        },
        'Pembrolizumab-Maintenance': {
            name: 'Pembrolizumab (Maintenance) - Second-line',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
            ]
        },
        'Capecitabine-RT': {
            name: 'Capecitabine + Radiation Therapy - Neoadjuvant/Adjuvant',
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
            name: 'Paclitaxel (single agent) - Second-line',
            cycles: 8,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'Cetuximab': {
            name: 'Cetuximab (EGFR inhibitor) - Second-line',
            cycles: 8,
            drugs: [
                { name: 'Cetuximab', dose: 400, unit: 'mg/m²', schedule: 'loading dose, then 250mg/m² weekly' }
            ]
        }
    },
    vulvar_vaginal: {
        'Cisplatin-RT': {
            name: 'Cisplatin + Radiation Therapy - Neoadjuvant/Adjuvant',
            cycles: 2,
            drugs: [
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'weekly during RT x 6 weeks' }
            ]
        },
        'Carboplatin-Paclitaxel': {
            name: 'Carboplatin + Paclitaxel - First-line Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC', unit: 'mg', schedule: 'D1 every 21 days', requiresAUC: true },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Cisplatin-Paclitaxel': {
            name: 'Cisplatin + Paclitaxel - First-line Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Capecitabine-RT': {
            name: 'Capecitabine + Radiation Therapy - Neoadjuvant/Adjuvant',
            cycles: 2,
            drugs: [
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'twice daily during RT' }
            ]
        },
        'Gemcitabine-Cisplatin': {
            name: 'Gemcitabine + Cisplatin - First-line Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1,D8 every 21 days' },
                { name: 'Cisplatin', dose: 70, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Cisplatin-Docetaxel': {
            name: 'Cisplatin + Docetaxel - First-line Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Cisplatin-Cetuximab': {
            name: 'Cisplatin + Cetuximab - First-line Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Cetuximab', dose: 400, unit: 'mg/m²', schedule: 'loading dose, then 250mg/m² weekly' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab (PD-L1 CPS >1, dMMR/MSI-H) - Second-line',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Weekly': {
            name: 'Carboplatin + Paclitaxel (Weekly) - First-line Metastatic',
            cycles: 12,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC', unit: 'mg', schedule: 'D1 weekly', requiresAUC: true },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'D1 weekly' }
            ]
        },
        'Topotecan': {
            name: 'Topotecan (single agent) - Second-line',
            cycles: 6,
            drugs: [
                { name: 'Topotecan', dose: 1.25, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' }
            ]
        }
    },
    mesothelioma: {
        'Pemetrexed-Cisplatin': {
            name: 'Pemetrexed + Cisplatin - First-line',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'daily supplementation' },
                { name: 'Vitamin B12', dose: 1000, unit: 'mcg', schedule: 'q9weeks injection' }
            ]
        },
        'Pemetrexed-Carboplatin': {
            name: 'Pemetrexed + Carboplatin - First-line',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Carboplatin', dose: 'AUC', unit: 'mg', schedule: 'D1 every 21 days', requiresAUC: true },
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'daily supplementation' },
                { name: 'Vitamin B12', dose: 1000, unit: 'mcg', schedule: 'q9weeks injection' }
            ]
        },
        'Nivolumab-Ipilimumab': {
            name: 'Nivolumab + Ipilimumab (CheckMate 743) - First-line',
            cycles: 4,
            drugs: [
                { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'every 21 days, then 480mg every 28 days' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'every 6 weeks' }
            ]
        },
        'Gemcitabine-Cisplatin': {
            name: 'Gemcitabine + Cisplatin - Second-line',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1250, unit: 'mg/m²', schedule: 'D1,D8 every 21 days' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Gemcitabine-Carboplatin': {
            name: 'Gemcitabine + Carboplatin - Second-line',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1,D8 every 21 days' },
                { name: 'Carboplatin', dose: 'AUC', unit: 'mg', schedule: 'D1 every 21 days', requiresAUC: true }
            ]
        },
        'Gemcitabine-Vinorelbine': {
            name: 'Gemcitabine + Vinorelbine - Second-line',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1,D8 every 21 days' },
                { name: 'Vinorelbine', dose: 25, unit: 'mg/m²', schedule: 'D1,D8 every 21 days' }
            ]
        },
        'Pemetrexed-Gemcitabine': {
            name: 'Pemetrexed + Gemcitabine - Second-line',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Gemcitabine', dose: 1250, unit: 'mg/m²', schedule: 'D1,D8 every 21 days' },
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'daily supplementation' },
                { name: 'Vitamin B12', dose: 1000, unit: 'mcg', schedule: 'q9weeks injection' }
            ]
        },
        'Doxorubicin-Cisplatin': {
            name: 'Doxorubicin + Cisplatin - Second-line',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'CAP': {
            name: 'Cyclophosphamide + Adriamycin + Cisplatin (CAP) - Second-line',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Doxorubicin (Adriamycin)', dose: 50, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Pemetrexed': {
            name: 'Pemetrexed (single agent) - Maintenance/Second-line',
            cycles: 8,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Folic Acid', dose: 400, unit: 'mcg', schedule: 'daily supplementation' },
                { name: 'Vitamin B12', dose: 1000, unit: 'mcg', schedule: 'q9weeks injection' }
            ]
        },
        'Vinorelbine': {
            name: 'Vinorelbine (single agent) - Second-line',
            cycles: 8,
            drugs: [
                { name: 'Vinorelbine', dose: 30, unit: 'mg/m²', schedule: 'weekly' }
            ]
        },
        'Gemcitabine': {
            name: 'Gemcitabine (single agent) - Second-line',
            cycles: 8,
            drugs: [
                { name: 'Gemcitabine', dose: 1250, unit: 'mg/m²', schedule: 'D1,D8 every 21 days' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab (PD-1 inhibitor) - Second-line',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
            ]
        },
        'Nivolumab': {
            name: 'Nivolumab (PD-1 inhibitor) - Second-line',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 2 weeks, then 480mg every 28 days' }
            ]
        }
    },
    merkel_cell: {
        'EP': {
            name: 'Etoposide + Cisplatin (EP) - First-line Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 120, unit: 'mg/m²', schedule: 'D1-D3 every 21 days' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'EC': {
            name: 'Etoposide + Carboplatin (EC) - First-line Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 120, unit: 'mg/m²', schedule: 'D1-D3 every 21 days' },
                { name: 'Carboplatin', dose: 'AUC', unit: 'mg', schedule: 'D1 every 21 days', requiresAUC: true }
            ]
        },
        'CAV': {
            name: 'Cyclophosphamide + Adriamycin + Vincristine (CAV) - First-line Metastatic',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Doxorubicin (Adriamycin)', dose: 45, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Vincristine', dose: 2, unit: 'mg', schedule: 'D1 every 21 days (max 2mg)' }
            ]
        },
        'Topotecan-Cyclophosphamide': {
            name: 'Topotecan + Cyclophosphamide - Second-line',
            cycles: 6,
            drugs: [
                { name: 'Topotecan', dose: 1.7, unit: 'mg/m²', schedule: 'D1-D5 every 21 days' },
                { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Avelumab': {
            name: 'Avelumab (PD-L1 inhibitor) - First-line/Second-line',
            cycles: 8,
            drugs: [
                { name: 'Avelumab', dose: 800, unit: 'mg', schedule: 'every 2 weeks, then every 28 days' }
            ]
        },
        'Pembrolizumab': {
            name: 'Pembrolizumab (PD-1 inhibitor) - First-line/Second-line',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
            ]
        },
        'Nivolumab': {
            name: 'Nivolumab (PD-1 inhibitor) - Second-line',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 2 weeks, then 480mg every 28 days' }
            ]
        },
        'Retifanlimab': {
            name: 'Retifanlimab (PD-1 inhibitor) - Second-line',
            cycles: 8,
            drugs: [
                { name: 'Retifanlimab', dose: 500, unit: 'mg', schedule: 'every 28 days' }
            ]
        },
        'Temozolomide': {
            name: 'Temozolomide (single agent) - Second-line',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 200, unit: 'mg/m²', schedule: 'D1-D5 every 28 days' }
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
            name: 'Pembrolizumab (MSI-H/dMMR, TMB-H) - Second-line',
            cycles: 8,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Nivolumab': {
            name: 'Nivolumab (MSI-H/dMMR) - Second-line',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'D1, every 2 weeks' }
            ]
        },
        
        // Single agents - Second-line
        'Docetaxel': {
            name: 'Docetaxel (single agent) - Second-line',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine': {
            name: 'Gemcitabine (single agent) - Second-line',
            cycles: 8,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Paclitaxel': {
            name: 'Paclitaxel (single agent) - Second-line',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Capecitabine': {
            name: 'Capecitabine (single agent) - Second-line',
            cycles: 8,
            drugs: [
                { name: 'Capecitabine', dose: 1250, unit: 'mg/m²', schedule: 'PO twice daily, D1-D14, every 21 days' }
            ]
        }
    },
    adrenocortical: {
        'EDP-M': {
            name: 'Etoposide + Doxorubicin + Cisplatin + Mitotane (EDP-M) - First-line',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D5-D7 every 28 days' },
                { name: 'Doxorubicin', dose: 20, unit: 'mg/m²', schedule: 'D1, D8 every 28 days' },
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'D1, D9 every 28 days' },
                { name: 'Mitotane', dose: 2000, unit: 'mg', schedule: 'daily (target 14-20 mcg/ml)' }
            ]
        },
        'Streptozocin-Mitotane': {
            name: 'Streptozocin + Mitotane - Second-line',
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
            name: 'Gemcitabine + Capecitabine - Second-line',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', schedule: 'D1, D8 every 21 days' },
                { name: 'Capecitabine', dose: 1500, unit: 'mg', schedule: 'daily every 21 days' }
            ]
        },
        'Temozolomide': {
            name: 'Temozolomide - Second-line',
            cycles: 6,
            drugs: [
                { name: 'Temozolomide', dose: 200, unit: 'mg/m²', schedule: 'D1-D5 every 28 days' }
            ]
        },
        'EDP-M-Carboplatin': {
            name: 'EDP-M with Carboplatin - First-line alternative',
            cycles: 6,
            drugs: [
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', schedule: 'D5-D7 every 28 days' },
                { name: 'Doxorubicin', dose: 20, unit: 'mg/m²', schedule: 'D1, D8 every 28 days' },
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'D1, D9 every 28 days' },
                { name: 'Mitotane', dose: 2000, unit: 'mg', schedule: 'daily (target 14-20 mcg/ml)' }
            ]
        },
        'Gemcitabine-Capecitabine-Mitotane': {
            name: 'Gemcitabine + Capecitabine + Mitotane - Second-line',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 800, unit: 'mg/m²', schedule: 'D1, D8 every 21 days' },
                { name: 'Capecitabine', dose: 1500, unit: 'mg', schedule: 'daily every 21 days' },
                { name: 'Mitotane', dose: 4000, unit: 'mg', schedule: 'daily every 21 days' }
            ]
        },
        'Docetaxel-Cisplatin': {
            name: 'Docetaxel + Cisplatin - Second-line',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 60, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1 every 21 days' }
            ]
        },
        'Nivolumab-Ipilimumab': {
            name: 'Nivolumab + Ipilimumab - Third-line/Investigational',
            cycles: 6,
            drugs: [
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'every 21 days' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'every 21 days' }
            ]
        },
        'Cabozantinib': {
            name: 'Cabozantinib - Third-line/Investigational',
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
            name: 'Temozolomide + Radiation Therapy (Stupp Protocol) - Newly Diagnosed GBM',
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
        'Imatinib-Adjuvant': {
            name: 'Imatinib (Adjuvant) - High-risk Resected GIST',
            cycles: 36,
            drugs: [
                { name: 'Imatinib', dose: 400, unit: 'mg', schedule: 'daily x 3 years (high-risk features)' }
            ]
        },
        'Imatinib-Metastatic': {
            name: 'Imatinib (First-line) - Metastatic GIST',
            cycles: 12,
            drugs: [
                { name: 'Imatinib', dose: 400, unit: 'mg', schedule: 'daily until progression (800mg if exon 9 mutation)' }
            ]
        },
        'Sunitinib': {
            name: 'Sunitinib (Second-line) - Imatinib-resistant GIST',
            cycles: 8,
            drugs: [
                { name: 'Sunitinib', dose: 50, unit: 'mg', schedule: 'daily x 4 weeks, then 2 weeks off' }
            ]
        },
        'Regorafenib': {
            name: 'Regorafenib (Third-line) - Imatinib/Sunitinib-resistant GIST',
            cycles: 8,
            drugs: [
                { name: 'Regorafenib', dose: 160, unit: 'mg', schedule: 'daily x 21 days, then 7 days off' }
            ]
        },
        'Ripretinib': {
            name: 'Ripretinib (Fourth-line) - Multiple TKI-resistant GIST',
            cycles: 8,
            drugs: [
                { name: 'Ripretinib', dose: 150, unit: 'mg', schedule: 'daily until progression' }
            ]
        },
        'Avapritinib': {
            name: 'Avapritinib - PDGFRA D842V mutant GIST',
            cycles: 8,
            drugs: [
                { name: 'Avapritinib', dose: 300, unit: 'mg', schedule: 'daily until progression' }
            ]
        },
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
        'Cabozantinib': {
            name: 'Cabozantinib - Multiple TKI-resistant GIST',
            cycles: 8,
            drugs: [
                { name: 'Cabozantinib', dose: 60, unit: 'mg', schedule: 'daily until progression' }
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
        'Vemurafenib': {
            name: 'Vemurafenib - BRAF V600E-mutant Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Vemurafenib', dose: 960, unit: 'mg', schedule: 'twice daily until progression' }
            ]
        },
        'Nivolumab': {
            name: 'Nivolumab - High PD-L1 Expression Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 2 weeks, then 480mg every 28 days' }
            ]
        },
        'Dostarlimab': {
            name: 'Dostarlimab - MSI-H/dMMR Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'every 21 days, then 1000mg every 6 weeks' }
            ]
        },
        'Trastuzumab-Deruxtecan': {
            name: 'Trastuzumab Deruxtecan - HER2-positive Solid Tumors',
            cycles: 8,
            drugs: [
                { name: 'Trastuzumab Deruxtecan', dose: 5.4, unit: 'mg/kg', schedule: 'every 21 days until progression' }
            ]
        },
        'Alpelisib': {
            name: 'Alpelisib + Fulvestrant - PIK3CA-mutant HR+/HER2- Breast Cancer',
            cycles: 8,
            drugs: [
                { name: 'Alpelisib', dose: 300, unit: 'mg', schedule: 'daily until progression' },
                { name: 'Fulvestrant', dose: 500, unit: 'mg', schedule: 'monthly injection' }
            ]
        },
        'Erdafitinib': {
            name: 'Erdafitinib - FGFR2/3-altered Urothelial Carcinoma',
            cycles: 8,
            drugs: [
                { name: 'Erdafitinib', dose: 8, unit: 'mg', schedule: 'daily (titrate based on phosphate)' }
            ]
        },
        'Encorafenib-Cetuximab': {
            name: 'Encorafenib + Cetuximab - BRAF V600E-mutant Colorectal Cancer',
            cycles: 8,
            drugs: [
                { name: 'Encorafenib', dose: 300, unit: 'mg', schedule: 'daily until progression' },
                { name: 'Cetuximab', dose: 400, unit: 'mg/m²', schedule: 'loading dose, then 250mg/m² weekly' }
            ]
        },
        'Tepotinib': {
            name: 'Tepotinib - MET Exon 14 Skipping NSCLC',
            cycles: 8,
            drugs: [
                { name: 'Tepotinib', dose: 500, unit: 'mg', schedule: 'daily until progression' }
            ]
        },
        'Capmatinib': {
            name: 'Capmatinib - MET Exon 14 Skipping NSCLC',
            cycles: 8,
            drugs: [
                { name: 'Capmatinib', dose: 400, unit: 'mg', schedule: 'twice daily until progression' }
            ]
        }
    },
    neuroendocrine: {
        'Cisplatin-Etoposide': {
            name: 'Cisplatin + Etoposide',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 21 days' }
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
                { name: '5-Fluorouracil', dose: 400, unit: 'mg/m²', schedule: 'days 1-5, every 6 weeks' },
                { name: 'Streptozocin', dose: 500, unit: 'mg/m²', schedule: 'days 1-5, every 6 weeks' }
            ]
        },
        'Doxorubicin-Streptozocin': {
            name: 'Doxorubicin + Streptozocin',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Streptozocin', dose: 500, unit: 'mg/m²', schedule: 'days 1-5, every 21 days' }
            ]
        },
        'Capecitabine-Temozolomide': {
            name: 'Capecitabine + Temozolomide (CAPTEM)',
            cycles: 6,
            drugs: [
                { name: 'Capecitabine', dose: 750, unit: 'mg', schedule: 'twice daily, days 1-14, every 28 days' },
                { name: 'Temozolomide', dose: 200, unit: 'mg/m²', schedule: 'daily, days 10-14, every 28 days' }
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
                { name: 'Lutetium Lu 177 Dotatate', dose: 7.4, unit: 'GBq', schedule: 'q8weeks' }
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
            name: 'Cisplatin + Radiation Therapy (Definitive)',
            cycles: 5,
            drugs: [
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'weekly during radiation therapy x 5-6 weeks' }
            ]
        },
        'Cisplatin-Pembrolizumab-RT': {
            name: 'Cisplatin + Pembrolizumab + Radiation Therapy (Definitive)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 40, unit: 'mg/m²', schedule: 'weekly during radiation therapy x 5-6 weeks' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Pembrolizumab-RT': {
            name: 'Carboplatin + Pembrolizumab + Radiation Therapy (Definitive)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly during radiation therapy' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Mitomycin-5FU-RT': {
            name: 'Mitomycin + 5-Fluorouracil + Radiation Therapy (Definitive)',
            cycles: 2,
            drugs: [
                { name: 'Mitomycin', dose: 10, unit: 'mg/m²', schedule: 'D1, D29' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²/day', schedule: 'continuous infusion D1-4, D29-32' }
            ]
        },

        // First-line Metastatic
        'Cisplatin-Paclitaxel-Metastatic': {
            name: 'Cisplatin + Paclitaxel (First-line Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Metastatic': {
            name: 'Carboplatin + Paclitaxel (First-line Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Weekly-Metastatic': {
            name: 'Carboplatin + Paclitaxel Weekly (First-line Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 2', unit: 'AUC', schedule: 'weekly' },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly' }
            ]
        },
        'Carboplatin-Paclitaxel-Pembrolizumab-Metastatic': {
            name: 'Carboplatin + Paclitaxel + Pembrolizumab (First-line Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Paclitaxel-Pembrolizumab-Metastatic': {
            name: 'Cisplatin + Paclitaxel + Pembrolizumab (First-line Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Paclitaxel-Bevacizumab-Metastatic': {
            name: 'Cisplatin + Paclitaxel + Bevacizumab (First-line Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 135, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-Bevacizumab-Metastatic': {
            name: 'Carboplatin + Paclitaxel + Bevacizumab (First-line Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Atezolizumab-Bevacizumab-Metastatic': {
            name: 'Atezolizumab + Bevacizumab (First-line Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },

        // Second-line and Beyond Metastatic
        'Pembrolizumab-Metastatic-2L': {
            name: 'Pembrolizumab (Second-line Metastatic)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days' }
            ]
        },
        'Tisotumab-Vedotin-Metastatic-2L': {
            name: 'Tisotumab vedotin (Second-line Metastatic)',
            cycles: 8,
            drugs: [
                { name: 'Tisotumab vedotin', dose: 2.0, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Topotecan-Metastatic-2L': {
            name: 'Topotecan (Second-line Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', schedule: 'D1-5, every 21 days' }
            ]
        },
        'Topotecan-Weekly-Metastatic-2L': {
            name: 'Topotecan Weekly (Second-line Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Topotecan', dose: 4.0, unit: 'mg/m²', schedule: 'weekly x 3, every 28 days' }
            ]
        },
        'Pemetrexed-Metastatic-2L': {
            name: 'Pemetrexed (Second-line Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Metastatic-2L': {
            name: 'Gemcitabine (Second-line Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Docetaxel-Metastatic-2L': {
            name: 'Docetaxel (Second-line Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Paclitaxel-Metastatic-2L': {
            name: 'Paclitaxel (Second-line Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Irinotecan-Metastatic-2L': {
            name: 'Irinotecan (Second-line Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Irinotecan', dose: 125, unit: 'mg/m²', schedule: 'weekly x 4, then 2 weeks rest, repeat' }
            ]
        },
        'Cisplatin-Topotecan-Metastatic-2L': {
            name: 'Cisplatin + Topotecan (Second-line Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Topotecan', dose: 0.75, unit: 'mg/m²', schedule: 'D1-3, every 21 days' }
            ]
        },
        'Paclitaxel-Topotecan-Metastatic-2L': {
            name: 'Paclitaxel + Topotecan (Second-line Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Topotecan', dose: 0.75, unit: 'mg/m²', schedule: 'D1-3, every 21 days' }
            ]
        },
        'Paclitaxel-Topotecan-Bevacizumab-Metastatic-2L': {
            name: 'Paclitaxel + Topotecan + Bevacizumab (Second-line Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Topotecan', dose: 0.75, unit: 'mg/m²', schedule: 'D1-3, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-Gemcitabine-Metastatic-2L': {
            name: 'Cisplatin + Gemcitabine (Second-line Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Cisplatin-Docetaxel-Metastatic-2L': {
            name: 'Cisplatin + Docetaxel (Second-line Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-Docetaxel-Metastatic-2L': {
            name: 'Carboplatin + Docetaxel (Second-line Metastatic)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        }
    },
    endometrial: {
        'Carboplatin-Paclitaxel': {
            name: 'Carboplatin + Paclitaxel (3-weekly)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
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
                { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'every 21 days, then 1000mg every 6 weeks' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
            ]
        },
        'AC': {
            name: 'Doxorubicin + Cyclophosphamide (AC)',
            cycles: 4,
            drugs: [
                { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'AP': {
            name: 'Doxorubicin + Cisplatin (AP)',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Doxorubicin-Paclitaxel': {
            name: 'Doxorubicin + Paclitaxel',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 45, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 160, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'TAP': {
            name: 'Cisplatin + Doxorubicin + Paclitaxel (TAP)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Doxorubicin', dose: 45, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 160, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'CAP': {
            name: 'Cyclophosphamide + Doxorubicin + Cisplatin (CAP)',
            cycles: 6,
            drugs: [
                { name: 'Cyclophosphamide', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Doxorubicin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 50, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Paclitaxel-Carboplatin-Bevacizumab': {
            name: 'Paclitaxel + Carboplatin + Bevacizumab',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
            ]
        },
        'Gemcitabine-Docetaxel': {
            name: 'Gemcitabine + Docetaxel',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 900, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'day 8, every 21 days' }
            ]
        },
        'Pembrolizumab-Lenvatinib': {
            name: 'Pembrolizumab + Lenvatinib',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' },
                { name: 'Lenvatinib', dose: 20, unit: 'mg', schedule: 'daily' }
            ]
        },
        'Single-Docetaxel': {
            name: 'Single agent Docetaxel',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 100, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'Single-Paclitaxel': {
            name: 'Single agent Paclitaxel',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'Single-Topotecan': {
            name: 'Single agent Topotecan',
            cycles: 6,
            drugs: [
                { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', schedule: 'days 1-5, every 21 days' }
            ]
        },
        'Single-Dostarlimab': {
            name: 'Single agent Dostarlimab (MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Dostarlimab', dose: 500, unit: 'mg', schedule: 'every 21 days x 4, then 1000mg every 6 weeks' }
            ]
        },
        'Single-Pembrolizumab': {
            name: 'Single agent Pembrolizumab (MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Single-Doxorubicin': {
            name: 'Single agent Doxorubicin',
            cycles: 6,
            drugs: [
                { name: 'Doxorubicin', dose: 60, unit: 'mg/m²', schedule: 'every 21 days' }
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
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks with RT' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks with RT' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks with RT' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks with RT' }
            ]
        },
        'CAPEOX-RT': {
            name: 'CAPEOX + RT',
            cycles: 3,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'every 21 days with RT' },
                { name: 'Capecitabine', dose: 825, unit: 'mg/m²', schedule: 'twice daily, days 1-14 during RT' }
            ]
        },
        'Carboplatin-Paclitaxel': {
            name: 'Carboplatin + Paclitaxel',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'every 21 days' },
                { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'ECF-MAGIC': {
            name: 'Epirubicin + Cisplatin + 5-FU (MAGIC)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: '5-Fluorouracil infusion', dose: 200, unit: 'mg/m²', days: 'D1-D21', schedule: 'continuous infusion daily x 21 days, every 21 days' }
            ]
        },
        'FLO': {
            name: 'Oxaliplatin + Leucovorin + 5-FU (FLO)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2600, unit: 'mg/m²', days: 'D1 (24hr CI)', schedule: '24-hour infusion, every 2 weeks' }
            ]
        },
        'FLOT4': {
            name: 'FLOT4 (Docetaxel + Oxaliplatin + Leucovorin + 5-FU)',
            cycles: 8,
            drugs: [
                { name: 'Docetaxel', dose: 50, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2600, unit: 'mg/m²', days: 'D1 (24hr CI)', schedule: '24-hour infusion, every 2 weeks' }
            ]
        },
        'mFOLFOX6': {
            name: 'Modified FOLFOX6 (mFOLFOX6)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' }
            ]
        },
        'CAPEOX': {
            name: 'Capecitabine + Oxaliplatin (CAPEOX)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, every 21 days' }
            ]
        },
        'EOF': {
            name: 'Epirubicin + Oxaliplatin + 5-FU (EOF)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: '5-Fluorouracil infusion', dose: 200, unit: 'mg/m²', days: 'D1-D21', schedule: 'continuous infusion daily x 21 days, every 21 days' }
            ]
        },
        'ECX': {
            name: 'Epirubicin + Cisplatin + Capecitabine (ECX)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Capecitabine', dose: 625, unit: 'mg/m²', days: 'D1-D21', schedule: 'twice daily, days 1-21, every 21 days' }
            ]
        },
        'EOX': {
            name: 'Epirubicin + Oxaliplatin + Capecitabine (EOX)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Capecitabine', dose: 625, unit: 'mg/m²', days: 'D1-D21', schedule: 'twice daily, days 1-21, every 21 days' }
            ]
        },
        'Cisplatin-Irinotecan': {
            name: 'Cisplatin + Irinotecan',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 30, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Irinotecan', dose: 65, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        '5FU-Paclitaxel': {
            name: '5-FU + Paclitaxel',
            cycles: 6,
            drugs: [
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' },
                { name: 'Paclitaxel', dose: 150, unit: 'mg/m²', schedule: 'every 2 weeks' }
            ]
        },
        'Cisplatin-Paclitaxel': {
            name: 'Cisplatin + Paclitaxel',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'Cisplatin-Docetaxel': {
            name: 'Cisplatin + Docetaxel',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'Nivolumab-Maintenance': {
            name: 'Nivolumab (post-CRT maintenance)',
            cycles: 16,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 2 weeks x 16 cycles (post-CRT with residual disease)' }
            ]
        },
        'CAPEOX-Trastuzumab': {
            name: 'CAPEOX + Trastuzumab (HER2+)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true }
            ]
        },
        'mFOLFOX6-Trastuzumab': {
            name: 'mFOLFOX6 + Trastuzumab (HER2+)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true }
            ]
        },
        'CAPEOX-Trastuzumab-Pembrolizumab': {
            name: 'CAPEOX + Trastuzumab + Pembrolizumab (HER2+/PD-L1 CPS≥1)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
            ]
        },
        'mFOLFOX6-Trastuzumab-Pembrolizumab': {
            name: 'mFOLFOX6 + Trastuzumab + Pembrolizumab (HER2+/PD-L1 CPS≥1)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days (given with every other FOLFOX cycle)' }
            ]
        },
        'CAPEOX-Nivolumab': {
            name: 'CAPEOX + Nivolumab',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, every 21 days' },
                { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'every 21 days' }
            ]
        },
        'mFOLFOX6-Nivolumab': {
            name: 'mFOLFOX6 + Nivolumab',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' },
                { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'every 21 days (given with every other FOLFOX cycle)' }
            ]
        },
        'FOLFIRI': {
            name: 'FOLFIRI',
            cycles: 12,
            drugs: [
                { name: 'Irinotecan', dose: 180, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' }
            ]
        },
        'Nivolumab-Ipilimumab': {
            name: 'Nivolumab + Ipilimumab (MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'every 2 weeks x 4, then 480mg flat dose every 28 days' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'every 6 weeks x 4 doses' }
            ]
        },
        'Single-Pembrolizumab': {
            name: 'Single agent Pembrolizumab (MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Single-Docetaxel': {
            name: 'Single agent Docetaxel',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'Single-Paclitaxel': {
            name: 'Single agent Paclitaxel (3-weekly)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'every 21 days' }
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
                { name: 'Ramucirumab', dose: 8, unit: 'mg/kg', schedule: 'every 2 weeks' },
                { name: 'Paclitaxel', dose: 80, unit: 'mg/m²', schedule: 'weekly x 12 weeks' }
            ]
        },
        'T-DXd': {
            name: 'Trastuzumab Deruxtecan (T-DXd) (HER2+)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab Deruxtecan', dose: 6.4, unit: 'mg/kg', schedule: 'every 21 days' }
            ]
        },
        'Single-Irinotecan': {
            name: 'Single agent Irinotecan',
            cycles: 6,
            drugs: [
                { name: 'Irinotecan', dose: 350, unit: 'mg/m²', schedule: 'every 21 days' }
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
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'every 21 days' }
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
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'every 21 days pre-op, 3 cycles post-op' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'every 21 days pre-op, 3 cycles post-op' },
                { name: '5-Fluorouracil', dose: 200, unit: 'mg/m²', days: 'D1-D21', schedule: 'continuous infusion daily x 21 days, every 21 days' }
            ]
        },
        'FLO-Trial': {
            name: 'FLO Trial (Oxaliplatin + Leucovorin + 5-FU)',
            cycles: 4,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil', dose: 2600, unit: 'mg/m²', days: 'D1 (24hr CI)', schedule: '24-hour infusion, every 2 weeks' }
            ]
        },
        'FLOT4': {
            name: 'FLOT4 (Docetaxel + Oxaliplatin + Leucovorin + 5-FU)',
            cycles: 8,
            drugs: [
                { name: 'Docetaxel', dose: 50, unit: 'mg/m²', schedule: 'every 2 weeks pre-op, 4 cycles post-op' },
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks pre-op, 4 cycles post-op' },
                { name: 'Leucovorin', dose: 200, unit: 'mg/m²', schedule: 'every 2 weeks pre-op, 4 cycles post-op' },
                { name: '5-Fluorouracil', dose: 2600, unit: 'mg/m²', days: 'D1 (24hr CI)', schedule: '24-hour infusion, every 2 weeks pre-op, 4 cycles post-op' }
            ]
        },
        'mFOLFOX6-Eso': {
            name: 'mFOLFOX6 (Esophageal)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' }
            ]
        },
        'CAPEOX-Eso': {
            name: 'CAPEOX (Esophageal)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, every 21 days' }
            ]
        },
        'EOF-Eso': {
            name: 'EOF (Esophageal)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: '5-Fluorouracil', dose: 200, unit: 'mg/m²', days: 'D1-D21', schedule: 'continuous infusion daily x 21 days, every 21 days' }
            ]
        },
        'ECX-Eso': {
            name: 'ECX (Esophageal)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Capecitabine', dose: 625, unit: 'mg/m²', days: 'D1-D21', schedule: 'twice daily, days 1-21, every 21 days' }
            ]
        },
        'EOX-Eso': {
            name: 'EOX (Esophageal)',
            cycles: 6,
            drugs: [
                { name: 'Epirubicin', dose: 50, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Capecitabine', dose: 625, unit: 'mg/m²', days: 'D1-D21', schedule: 'twice daily, days 1-21, every 21 days' }
            ]
        },
        'Cisplatin-Irinotecan-Eso': {
            name: 'Cisplatin + Irinotecan (Esophageal)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 30, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Irinotecan', dose: 65, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' }
            ]
        },
        '5FU-Paclitaxel-Eso': {
            name: '5-FU + Paclitaxel (Esophageal)',
            cycles: 6,
            drugs: [
                { name: '5-Fluorouracil', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' },
                { name: 'Paclitaxel', dose: 150, unit: 'mg/m²', schedule: 'every 2 weeks' }
            ]
        },
        'Cisplatin-Paclitaxel-Eso': {
            name: 'Cisplatin + Paclitaxel (Esophageal)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'Cisplatin-Docetaxel-Eso': {
            name: 'Cisplatin + Docetaxel (Esophageal)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'Nivolumab-Maintenance-Eso': {
            name: 'Nivolumab (post-CRT maintenance)',
            cycles: 16,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 2 weeks x 16 cycles (post-CRT with residual disease)' }
            ]
        },
        'Trastuzumab-Pertuzumab-HER2': {
            name: 'Trastuzumab + Pertuzumab (HER2+)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true },
                { name: 'Pertuzumab', dose: 840, maintenanceDose: 420, unit: 'mg', schedule: 'loading dose, then 420 mg every 21 days', hasLoadingDose: true }
            ]
        },
        'mFOLFOX6-Trastuzumab-Eso': {
            name: 'mFOLFOX6 + Trastuzumab (HER2+)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true }
            ]
        },
        'CAPEOX-Trastuzumab-Eso': {
            name: 'CAPEOX + Trastuzumab (HER2+)',
            cycles: 8,
            drugs: [
                { name: 'Oxaliplatin', dose: 130, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Capecitabine', dose: 1000, unit: 'mg/m²', days: 'D1-D14', schedule: 'twice daily, days 1-14, every 21 days' },
                { name: 'Trastuzumab', dose: 8, maintenanceDose: 6, unit: 'mg/kg', schedule: 'loading dose, then 6 mg/kg every 21 days', hasLoadingDose: true }
            ]
        },
        'Nivolumab-Ipilimumab-MSI': {
            name: 'Nivolumab + Ipilimumab (MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 3, unit: 'mg/kg', schedule: 'every 2 weeks x 4, then 480mg flat dose every 28 days' },
                { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'every 6 weeks x 4 doses' }
            ]
        },
        'Pembrolizumab-MSI': {
            name: 'Pembrolizumab (MSI-H/dMMR)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Pembrolizumab-PDL1': {
            name: 'Pembrolizumab (PD-L1 CPS≥10)',
            cycles: 12,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days or 400mg every 6 weeks' }
            ]
        },
        'mFOLFOX6-Pembrolizumab': {
            name: 'mFOLFOX6 + Pembrolizumab (PD-L1 CPS≥1)',
            cycles: 12,
            drugs: [
                { name: 'Oxaliplatin', dose: 85, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: 'Leucovorin', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil bolus', dose: 400, unit: 'mg/m²', schedule: 'every 2 weeks' },
                { name: '5-Fluorouracil infusion', dose: 2400, unit: 'mg/m²', days: 'D1-D2 (46hr CI)', schedule: '46-hour infusion, every 2 weeks' },
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days (given with every other FOLFOX cycle)' }
            ]
        },
        'Single-Docetaxel-Eso': {
            name: 'Single agent Docetaxel (Esophageal)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'Single-Paclitaxel-Eso': {
            name: 'Single agent Paclitaxel (Esophageal)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'every 21 days' }
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
                { name: 'Irinotecan', dose: 350, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'T-DXd-Eso': {
            name: 'Trastuzumab Deruxtecan (T-DXd) (HER2+)',
            cycles: 12,
            drugs: [
                { name: 'Trastuzumab Deruxtecan', dose: 6.4, unit: 'mg/kg', schedule: 'every 21 days' }
            ]
        }
    },
    head_neck: {
        'TPF': {
            name: 'TPF (Docetaxel + Cisplatin + 5-FU)',
            cycles: 3,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', days: 'D1-D4', schedule: 'continuous infusion days 1-4, every 21 days' }
            ]
        },
        'TPF-Modified': {
            name: 'TPF Modified (Docetaxel + Cisplatin + 5-FU)',
            cycles: 3,
            drugs: [
                { name: 'Docetaxel', dose: 70, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', days: 'D1-D4', schedule: 'continuous infusion days 1-4, every 21 days' }
            ]
        },
        'TIP': {
            name: 'TIP (Docetaxel + Ifosfamide + Cisplatin)',
            cycles: 4,
            drugs: [
                { name: 'Docetaxel', dose: 30, unit: 'mg/m²', schedule: 'D1, D8, every 21 days' },
                { name: 'Ifosfamide', dose: 1200, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 21 days' },
                { name: 'Cisplatin', dose: 25, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 21 days' }
            ]
        },
        'Carboplatin-Paclitaxel-HN': {
            name: 'Carboplatin + Paclitaxel (Head & Neck)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'every 21 days' }
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
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'Cisplatin-5FU-HN': {
            name: 'Cisplatin + 5-FU (Head & Neck)',
            cycles: 6,
            drugs: [
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', days: 'D1-D4', schedule: 'continuous infusion days 1-4, every 21 days' }
            ]
        },
        'Carboplatin-5FU-HN': {
            name: 'Carboplatin + 5-FU (Head & Neck)',
            cycles: 6,
            drugs: [
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', days: 'D1-D4', schedule: 'continuous infusion days 1-4, every 21 days' }
            ]
        },
        'Pembrolizumab-Carboplatin-5FU': {
            name: 'Pembrolizumab + Carboplatin + 5-FU (all patients)',
            cycles: 6,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', days: 'D1-D4', schedule: 'continuous infusion days 1-4, every 21 days' }
            ]
        },
        'Pembrolizumab-Cisplatin-5FU': {
            name: 'Pembrolizumab + Cisplatin + 5-FU (all patients)',
            cycles: 6,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', days: 'D1-D4', schedule: 'continuous infusion days 1-4, every 21 days' }
            ]
        },
        'Pembrolizumab-Carboplatin-Paclitaxel': {
            name: 'Pembrolizumab + Carboplatin + Paclitaxel',
            cycles: 6,
            drugs: [
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Carboplatin-5FU-Cetuximab': {
            name: 'Carboplatin + 5-FU + Cetuximab (EXTREME)',
            cycles: 6,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true },
                { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', days: 'D1-D4', schedule: 'continuous infusion days 1-4, every 21 days' }
            ]
        },
        'Cisplatin-5FU-Cetuximab': {
            name: 'Cisplatin + 5-FU + Cetuximab (EXTREME)',
            cycles: 6,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true },
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: '5-Fluorouracil', dose: 1000, unit: 'mg/m²', days: 'D1-D4', schedule: 'continuous infusion days 1-4, every 21 days' }
            ]
        },
        'Cisplatin-Cetuximab': {
            name: 'Cisplatin + Cetuximab',
            cycles: 6,
            drugs: [
                { name: 'Cetuximab', dose: 400, maintenanceDose: 250, unit: 'mg/m²', schedule: 'loading dose, then 250 mg/m² weekly', hasLoadingDose: true },
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Cisplatin-RT': {
            name: 'Cisplatin + Radiation Therapy',
            cycles: 3,
            drugs: [
                { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 21 days with concurrent RT' }
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
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                { name: 'Vinorelbine', dose: 25, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' }
            ]
        },
        'Gemcitabine-Cisplatin-NPC': {
            name: 'Gemcitabine + Cisplatin (Nasopharyngeal)',
            cycles: 6,
            drugs: [
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Toripalimab-Gemcitabine-Cisplatin': {
            name: 'Toripalimab + Gemcitabine + Cisplatin (Nasopharyngeal)',
            cycles: 6,
            drugs: [
                { name: 'Toripalimab', dose: 240, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
                { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' }
            ]
        },
        'Single-Docetaxel-HN': {
            name: 'Single agent Docetaxel (Head & Neck)',
            cycles: 6,
            drugs: [
                { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'every 21 days' }
            ]
        },
        'Single-Paclitaxel-HN': {
            name: 'Single agent Paclitaxel (Head & Neck)',
            cycles: 6,
            drugs: [
                { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'every 21 days' }
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
                { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days or 400mg every 6 weeks' }
            ]
        },
        'Single-Nivolumab-CPS1': {
            name: 'Single agent Nivolumab (PD-L1 CPS≥1)',
            cycles: 12,
            drugs: [
                { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 2 weeks or 480mg every 28 days' }
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
            'Imatinib-First-line': {
                name: 'Imatinib (BCR-ABL TKI) - First-line Chronic Phase',
                cycles: 12,
                drugs: [
                    { name: 'Imatinib', dose: 400, unit: 'mg', schedule: 'daily until progression (600-800mg if inadequate response)' }
                ]
            },
            'Dasatinib-First-line': {
                name: 'Dasatinib (BCR-ABL TKI) - First-line Chronic Phase',
                cycles: 12,
                drugs: [
                    { name: 'Dasatinib', dose: 100, unit: 'mg', schedule: 'daily until progression' }
                ]
            },
            'Nilotinib-First-line': {
                name: 'Nilotinib (BCR-ABL TKI) - First-line Chronic Phase',
                cycles: 12,
                drugs: [
                    { name: 'Nilotinib', dose: 300, unit: 'mg', schedule: 'twice daily until progression' }
                ]
            },
            'Bosutinib-First-line': {
                name: 'Bosutinib (BCR-ABL TKI) - First-line Chronic Phase',
                cycles: 12,
                drugs: [
                    { name: 'Bosutinib', dose: 400, unit: 'mg', schedule: 'daily until progression' }
                ]
            },
            'Dasatinib-Second-line': {
                name: 'Dasatinib (BCR-ABL TKI) - Imatinib-resistant/intolerant',
                cycles: 12,
                drugs: [
                    { name: 'Dasatinib', dose: 140, unit: 'mg', schedule: 'daily (100mg if chronic phase, 140mg if accelerated)' }
                ]
            },
            'Nilotinib-Second-line': {
                name: 'Nilotinib (BCR-ABL TKI) - Imatinib-resistant/intolerant',
                cycles: 12,
                drugs: [
                    { name: 'Nilotinib', dose: 400, unit: 'mg', schedule: 'twice daily until progression' }
                ]
            },
            'Bosutinib-Second-line': {
                name: 'Bosutinib (BCR-ABL TKI) - Second-line',
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
                name: 'Fludarabine + Cyclophosphamide + Rituximab (FCR) - First-line Fit Patients',
                cycles: 6,
                drugs: [
                    { name: 'Fludarabine', dose: 25, unit: 'mg/m²', schedule: 'D1-D3 every 28 days' },
                    { name: 'Cyclophosphamide', dose: 250, unit: 'mg/m²', schedule: 'D1-D3 every 28 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1 cycle 1, then 500mg/m² every 28 days' }
                ]
            },
            'PCR': {
                name: 'Pentostatin + Cyclophosphamide + Rituximab (PCR) - First-line Alternative',
                cycles: 6,
                drugs: [
                    { name: 'Pentostatin', dose: 2, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                    { name: 'Cyclophosphamide', dose: 600, unit: 'mg/m²', schedule: 'D1 every 21 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1 cycle 1, then 500mg/m² every 21 days' }
                ]
            },
            'BR': {
                name: 'Bendamustine + Rituximab (BR) - First-line',
                cycles: 6,
                drugs: [
                    { name: 'Bendamustine', dose: 90, unit: 'mg/m²', schedule: 'D1-D2 every 28 days' },
                    { name: 'Rituximab', dose: 375, unit: 'mg/m²', schedule: 'D1 cycle 1, then 500mg/m² every 28 days' }
                ]
            },
            'Obinutuzumab-Chlorambucil': {
                name: 'Obinutuzumab + Chlorambucil - First-line Elderly/Unfit',
                cycles: 6,
                drugs: [
                    { name: 'Obinutuzumab', dose: 1000, unit: 'mg', schedule: 'D1,D8,D15 cycle 1, then D1 every 28 days' },
                    { name: 'Chlorambucil', dose: 0.5, unit: 'mg/kg', schedule: 'D1,D15 every 28 days' }
                ]
            },
            'Obinutuzumab-Venetoclax': {
                name: 'Obinutuzumab + Venetoclax - First-line',
                cycles: 12,
                drugs: [
                    { name: 'Obinutuzumab', dose: 1000, unit: 'mg', schedule: 'D1,D8,D15 cycle 1, then D1 every 28 days' },
                    { name: 'Venetoclax', dose: 400, unit: 'mg', schedule: 'daily (ramp-up from 20mg)' }
                ]
            },
            'Acalabrutinib-Obinutuzumab': {
                name: 'Acalabrutinib + Obinutuzumab (BTK inhibitor) - First-line',
                cycles: 6,
                drugs: [
                    { name: 'Acalabrutinib', dose: 100, unit: 'mg', schedule: 'twice daily until progression' },
                    { name: 'Obinutuzumab', dose: 1000, unit: 'mg', schedule: 'D1,D8,D15 cycle 1, then D1 every 28 days' }
                ]
            },
            'Ibrutinib-Rituximab': {
                name: 'Ibrutinib + Rituximab (BTK inhibitor) - First-line',
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
                name: 'Cladribine + Rituximab - First-line Hairy Cell Leukemia',
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
                name: 'Cladribine (single agent) - First-line Standard',
                cycles: 2,
                drugs: [
                    { name: 'Cladribine', dose: 0.15, unit: 'mg/kg', schedule: 'D1-D5 (8 weeks apart)' }
                ]
            },
            'Pentostatin': {
                name: 'Pentostatin (single agent) - First-line Alternative',
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
            // First-line combinations with immunotherapy
            'Nivolumab-Carboplatin-Pemetrexed': {
                name: 'Nivolumab + Carboplatin + Pemetrexed (Non-squamous histology)',
                cycles: 4,
                drugs: [
                    { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days, then maintenance' }
                ]
            },
            'Nivolumab-Cisplatin-Pemetrexed': {
                name: 'Nivolumab + Cisplatin + Pemetrexed (Non-squamous histology)',
                cycles: 4,
                drugs: [
                    { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days, then maintenance' }
                ]
            },
            'Pembrolizumab-Cisplatin-Pemetrexed': {
                name: 'Pembrolizumab + Cisplatin + Pemetrexed (Non-squamous histology)',
                cycles: 4,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days, then maintenance' }
                ]
            },
            'Pembrolizumab-Carboplatin-Pemetrexed': {
                name: 'Pembrolizumab + Carboplatin + Pemetrexed (Non-squamous histology)',
                cycles: 4,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days, then maintenance' }
                ]
            },
            'Pemetrexed-Cisplatin': {
                name: 'Pemetrexed + Cisplatin (Non-squamous histology)',
                cycles: 4,
                drugs: [
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Pemetrexed-Carboplatin': {
                name: 'Pemetrexed + Carboplatin (Non-squamous histology)',
                cycles: 4,
                drugs: [
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Pemetrexed-Carboplatin-Bevacizumab': {
                name: 'Pemetrexed + Carboplatin + Bevacizumab (Non-squamous)',
                cycles: 4,
                drugs: [
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days, continue as maintenance' }
                ]
            },
            'Atezolizumab-Bevacizumab-Carboplatin-Paclitaxel': {
                name: 'ABCP (Atezolizumab + Bevacizumab + Carboplatin + Paclitaxel)',
                cycles: 4,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days, continue as maintenance' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Atezolizumab-Nab-Paclitaxel-Carboplatin': {
                name: 'Atezolizumab + Nab-paclitaxel + Carboplatin (Non-squamous)',
                cycles: 4,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', days: 'D1,D8,D15', schedule: 'days 1, 8, 15, every 28 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            // EGFR-targeted therapy
            'Amivantamab-Lazertinib': {
                name: 'Amivantamab + Lazertinib (EGFR exon19del/L858R)',
                cycles: 12,
                drugs: [
                    { name: 'Amivantamab', dose: 1400, unit: 'mg', schedule: 'loading dose 1400mg, then 1050mg every 2 weeks' },
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
                    { name: 'Amivantamab', dose: 1400, unit: 'mg', schedule: 'loading dose 1400mg, then 1050mg every 2 weeks' }
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
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days maintenance' }
                ]
            },
            // Second-line therapy
            'Docetaxel-Ramucirumab': {
                name: 'Docetaxel + Ramucirumab (Second-line)',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Ramucirumab', dose: 10, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'T-DXd-HER2': {
                name: 'Trastuzumab Deruxtecan (HER2 mutation)',
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
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' }
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
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Vinorelbine-Cisplatin': {
                name: 'Vinorelbine + Cisplatin',
                cycles: 4,
                drugs: [
                    { name: 'Vinorelbine', dose: 25, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
                    { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Cisplatin-Vinblastine': {
                name: 'Cisplatin + Vinblastine',
                cycles: 4,
                drugs: [
                    { name: 'Cisplatin', dose: 100, unit: 'mg/m²', schedule: 'D1, every 28 days' },
                    { name: 'Vinblastine', dose: 4, unit: 'mg/m²', schedule: 'days 1, 8, every 28 days' }
                ]
            },
            'Cisplatin-Etoposide-NSCLC': {
                name: 'Cisplatin + Etoposide',
                cycles: 4,
                drugs: [
                    { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 120, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 21 days' }
                ]
            },
            'Single-Atezolizumab': {
                name: 'Single agent Atezolizumab',
                cycles: 12,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'every 21 days' }
                ]
            },
            'Carboplatin-Nab-Paclitaxel': {
                name: 'Carboplatin + Nab-paclitaxel',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', days: 'D1,D8,D15', schedule: 'days 1, 8, 15, every 28 days' }
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
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days, then maintenance' }
                ]
            },
            'ABCP': {
                name: 'Atezolizumab + Bevacizumab + Carboplatin + Paclitaxel (ABCP)',
                cycles: 4,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Gemcitabine-Cisplatin-Bevacizumab': {
                name: 'Gemcitabine + Cisplatin + Bevacizumab',
                cycles: 4,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'Cisplatin-Paclitaxel': {
                name: 'Cisplatin + Paclitaxel',
                cycles: 4,
                drugs: [
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Docetaxel-Carboplatin': {
                name: 'Docetaxel + Carboplatin',
                cycles: 4,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Docetaxel-Cisplatin': {
                name: 'Docetaxel + Cisplatin',
                cycles: 4,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Docetaxel-Gemcitabine': {
                name: 'Docetaxel + Gemcitabine',
                cycles: 4,
                drugs: [
                    { name: 'Docetaxel', dose: 85, unit: 'mg/m²', schedule: 'day 8, every 21 days' },
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Gemcitabine-Cisplatin': {
                name: 'Gemcitabine + Cisplatin',
                cycles: 4,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Gemcitabine-Carboplatin': {
                name: 'Gemcitabine + Carboplatin',
                cycles: 4,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Gemcitabine-Vinorelbine': {
                name: 'Gemcitabine + Vinorelbine',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
                    { name: 'Vinorelbine', dose: 25, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Docetaxel-Bevacizumab': {
                name: 'Docetaxel + Bevacizumab',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'every 21 days' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'every 21 days' }
                ]
            },
            'Pemetrexed-Carboplatin-Bevacizumab': {
                name: 'Pemetrexed + Carboplatin + Bevacizumab (Non-squamous histology)',
                cycles: 4,
                drugs: [
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Bevacizumab', dose: 15, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'Maintenance-Pemetrexed': {
                name: 'Maintenance Pemetrexed (Non-squamous histology)',
                cycles: 12,
                drugs: [
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days maintenance' }
                ]
            },
            'Nab-Paclitaxel-Carboplatin': {
                name: 'Nab-paclitaxel + Carboplatin',
                cycles: 4,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', days: 'D1,D8,D15', schedule: 'days 1, 8, 15, every 28 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 28 days' }
                ]
            },
            'Docetaxel-Ramucirumab': {
                name: 'Docetaxel + Ramucirumab',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Ramucirumab', dose: 10, unit: 'mg/kg', schedule: 'D1, every 21 days' }
                ]
            },
            'Gemcitabine-Cisplatin-Necitumumab': {
                name: 'Gemcitabine + Cisplatin + Necitumumab',
                cycles: 4,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' },
                    { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Necitumumab', dose: 800, unit: 'mg', schedule: 'D1, D8, every 21 days' }
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
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' }
                ]
            },
            'Carboplatin-Nab-Paclitaxel-Pembrolizumab': {
                name: 'Carboplatin + Nab-paclitaxel + Pembrolizumab',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', days: 'D1,D8,D15', schedule: 'days 1, 8, 15, every 28 days' },
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' }
                ]
            },
            'Atezolizumab-Nab-Paclitaxel-Carboplatin': {
                name: 'Atezolizumab + Nab-paclitaxel + Carboplatin',
                cycles: 4,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Nab-paclitaxel', dose: 100, unit: 'mg/m²', days: 'D1,D8,D15', schedule: 'days 1, 8, 15, every 28 days' },
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' }
                ]
            },
            'Ramucirumab-Erlotinib': {
                name: 'Ramucirumab + Erlotinib',
                cycles: 12,
                drugs: [
                    { name: 'Ramucirumab', dose: 10, unit: 'mg/kg', schedule: 'every 2 weeks' },
                    { name: 'Erlotinib', dose: 150, unit: 'mg', schedule: 'daily' }
                ]
            },
            'Ipilimumab-Nivolumab': {
                name: 'Ipilimumab + Nivolumab',
                cycles: 4,
                drugs: [
                    { name: 'Ipilimumab', dose: 1, unit: 'mg/kg', schedule: 'day 1, every 6 weeks' },
                    { name: 'Nivolumab', dose: 360, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' }
                ]
            },
            'Durvalumab-Tremelimumab': {
                name: 'Durvalumab + Tremelimumab',
                cycles: 4,
                drugs: [
                    { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 28 days, then maintenance' },
                    { name: 'Tremelimumab', dose: 75, unit: 'mg', schedule: 'D1, every 28 days' }
                ]
            },
            // Single agents
            'Single-Paclitaxel': {
                name: 'Single agent Paclitaxel',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'every 21 days' }
                ]
            },
            'Single-Nab-Paclitaxel': {
                name: 'Single agent Nab-paclitaxel',
                cycles: 6,
                drugs: [
                    { name: 'Nab-paclitaxel', dose: 260, unit: 'mg/m²', schedule: 'every 21 days' }
                ]
            },
            'Single-Docetaxel': {
                name: 'Single agent Docetaxel',
                cycles: 6,
                drugs: [
                    { name: 'Docetaxel', dose: 75, unit: 'mg/m²', schedule: 'every 21 days' }
                ]
            },
            'Single-Pemetrexed': {
                name: 'Single agent Pemetrexed (Non-squamous histology)',
                cycles: 6,
                drugs: [
                    { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'every 21 days' }
                ]
            },
            'Single-Gemcitabine': {
                name: 'Single agent Gemcitabine',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8,D15', schedule: 'days 1, 8, 15, every 28 days' }
                ]
            },
            'Single-Vinorelbine': {
                name: 'Single agent Vinorelbine',
                cycles: 6,
                drugs: [
                    { name: 'Vinorelbine', dose: 30, unit: 'mg/m²', schedule: 'weekly' }
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
                    { name: 'Amivantamab', dose: 1400, unit: 'mg', schedule: 'loading dose 1400mg, then 1050mg every 2 weeks' }
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
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 2 weeks' }
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
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days' }
                ]
            },
            'Single-Durvalumab': {
                name: 'Single agent Durvalumab',
                cycles: 12,
                drugs: [
                    { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'every 28 days' }
                ]
            },
            'Single-Cemiplimab': {
                name: 'Single agent Cemiplimab',
                cycles: 12,
                drugs: [
                    { name: 'Cemiplimab', dose: 350, unit: 'mg', schedule: 'every 21 days' }
                ]
            }
        },
        sclc: {
            // First-line therapy for extensive stage SCLC
            'Atezolizumab-Carboplatin-Etoposide': {
                name: 'Atezolizumab + Carboplatin + Etoposide (ES-SCLC)',
                cycles: 4,
                drugs: [
                    { name: 'Atezolizumab', dose: 1200, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 21 days' }
                ]
            },
            'Durvalumab-Carboplatin-Etoposide': {
                name: 'Durvalumab + Carboplatin + Etoposide (ES-SCLC)',
                cycles: 4,
                drugs: [
                    { name: 'Durvalumab', dose: 1500, unit: 'mg', schedule: 'D1, every 21 days, then maintenance' },
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 21 days' }
                ]
            },
            'Carboplatin-Etoposide': {
                name: 'Carboplatin + Etoposide (SCLC)',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 21 days' }
                ]
            },
            'Cisplatin-Etoposide-SCLC': {
                name: 'Cisplatin + Etoposide (SCLC)',
                cycles: 4,
                drugs: [
                    { name: 'Cisplatin', dose: 80, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 21 days' }
                ]
            },
            'Topotecan-SCLC': {
                name: 'Topotecan (Second-line SCLC)',
                cycles: 6,
                drugs: [
                    { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 21 days' }
                ]
            },
            'Lurbinectedin': {
                name: 'Lurbinectedin (Second-line SCLC)',
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
                name: 'Irinotecan + Cisplatin (SCLC)',
                cycles: 4,
                drugs: [
                    { name: 'Irinotecan', dose: 60, unit: 'mg/m²', days: 'D1,D8,D15', schedule: 'days 1, 8, 15, every 28 days' },
                    { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 28 days' }
                ]
            },
            'Topotecan-Cisplatin': {
                name: 'Topotecan + Cisplatin (SCLC)',
                cycles: 4,
                drugs: [
                    { name: 'Topotecan', dose: 1.5, unit: 'mg/m²', days: 'D1-D5', schedule: 'days 1-5, every 21 days' },
                    { name: 'Cisplatin', dose: 60, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Carboplatin-Paclitaxel-Etoposide': {
                name: 'Carboplatin + Paclitaxel + Etoposide (SCLC)',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 50, unit: 'mg/m²', days: 'D1-D10', schedule: 'days 1-10, every 21 days' }
                ]
            },
            'Carboplatin-Paclitaxel-SCLC': {
                name: 'Carboplatin + Paclitaxel (SCLC)',
                cycles: 4,
                drugs: [
                    { name: 'Carboplatin', dose: 'AUC 5-6', unit: 'AUC', schedule: 'D1, every 21 days' },
                    { name: 'Paclitaxel', dose: 200, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'CAE-SCLC': {
                name: 'CAE (Cyclophosphamide + Adriamycin + Etoposide)',
                cycles: 6,
                drugs: [
                    { name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Doxorubicin (Adriamycin)', dose: 45, unit: 'mg/m²', schedule: 'D1, every 21 days' },
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 21 days' }
                ]
            },
            'Etoposide-Single': {
                name: 'Etoposide (Single Agent SCLC)',
                cycles: 6,
                drugs: [
                    { name: 'Etoposide', dose: 100, unit: 'mg/m²', days: 'D1-D3', schedule: 'days 1-3, every 21 days' }
                ]
            },
            'Paclitaxel-Single-SCLC': {
                name: 'Paclitaxel (Single Agent SCLC)',
                cycles: 6,
                drugs: [
                    { name: 'Paclitaxel', dose: 175, unit: 'mg/m²', schedule: 'D1, every 21 days' }
                ]
            },
            'Gemcitabine-Single-SCLC': {
                name: 'Gemcitabine (Single Agent SCLC)',
                cycles: 6,
                drugs: [
                    { name: 'Gemcitabine', dose: 1000, unit: 'mg/m²', days: 'D1,D8', schedule: 'D1, D8, every 21 days' }
                ]
            },
            'Nivolumab-SCLC': {
                name: 'Nivolumab (PD-L1 CPS ≥1% SCLC)',
                cycles: 8,
                drugs: [
                    { name: 'Nivolumab', dose: 240, unit: 'mg', schedule: 'every 2 weeks, then 480mg every 28 days' }
                ]
            },
            'Pembrolizumab-SCLC': {
                name: 'Pembrolizumab (PD-L1 CPS ≥1% SCLC)',
                cycles: 8,
                drugs: [
                    { name: 'Pembrolizumab', dose: 200, unit: 'mg', schedule: 'every 21 days, then 400mg every 6 weeks' }
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
    protocolSelect.innerHTML = '<option value="">Select regimen</option>';
    
    if (cancerType && protocolDatabase[cancerType]) {
        let protocols;
        
        if ((cancerType === 'breast' || cancerType === 'lung' || cancerType === 'lymphoma' || cancerType === 'leukemia') && subtype) {
            protocols = protocolDatabase[cancerType][subtype];
        } else if (cancerType !== 'breast' && cancerType !== 'lung' && cancerType !== 'lymphoma' && cancerType !== 'leukemia') {
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
        
        if ((cancerType === 'breast' || cancerType === 'lung' || cancerType === 'lymphoma' || cancerType === 'leukemia') && subtype && protocolDatabase[cancerType][subtype]) {
            protocolData = protocolDatabase[cancerType][subtype][protocolKey];
        } else if (cancerType !== 'breast' && cancerType !== 'lung' && cancerType !== 'lymphoma' && cancerType !== 'leukemia') {
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
    if ((cancerType === 'breast' || cancerType === 'lung' || cancerType === 'lymphoma' || cancerType === 'leukemia') && cancerSubtype) {
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
    const progressPercent = (pageNumber / 3) * 100;
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
    
    // Check if protocol is selected via search
    if (selectedSearchProtocol) {
        console.log('Using search protocol'); // Debug log
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
    
    // Check if breast cancer, lung cancer, lymphoma, or leukemia requires subtype
    if (cancerType === 'breast' || cancerType === 'lung' || cancerType === 'lymphoma' || cancerType === 'leukemia') {
        const subtype = document.getElementById('cancerSubtype').value;
        if (!subtype) {
            let cancerTypeName = 'cancer';
            if (cancerType === 'breast') cancerTypeName = 'breast cancer';
            else if (cancerType === 'lung') cancerTypeName = 'lung cancer';
            else if (cancerType === 'lymphoma') cancerTypeName = 'lymphoma';
            else if (cancerType === 'leukemia') cancerTypeName = 'leukemia';
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
        
        if (cancerType === 'breast' || cancerType === 'lung' || cancerType === 'lymphoma' || cancerType === 'leukemia') {
            // Handle breast cancer, lung cancer, lymphoma, and leukemia subtypes
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
        her2_low_ultralow: 'HER2-Low/Ultralow',
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
        'osteosarcoma': 'NCCN Bone Cancer Guidelines',
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
            // Using search selection
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
    
    // Add missing event listeners for browse dropdowns
    document.getElementById('cancerType').addEventListener('change', function() {
        const cancerType = this.value;
        const protocolSelect = document.getElementById('protocol');
        const subtypeGroup = document.getElementById('subtypeGroup');
        const cancerSubtypeSelect = document.getElementById('cancerSubtype');
        
        if (cancerType) {
            // Show/hide subtype group for certain cancer types
            if (cancerType === 'breast' || cancerType === 'lung' || cancerType === 'lymphoma' || cancerType === 'leukemia') {
                subtypeGroup.style.display = 'block';
                cancerSubtypeSelect.disabled = false;
                protocolSelect.disabled = true;
            } else {
                subtypeGroup.style.display = 'none';
                cancerSubtypeSelect.disabled = true;
                protocolSelect.disabled = false;
                // Load protocols for this cancer type
                loadProtocols(cancerType);
            }
        } else {
            subtypeGroup.style.display = 'none';
            cancerSubtypeSelect.disabled = true;
            protocolSelect.disabled = true;
        }
        
        // Reset carboplatin fields
        checkForCarboplatin('', cancerType, '');
    });
    
    document.getElementById('cancerSubtype').addEventListener('change', function() {
        const cancerType = document.getElementById('cancerType').value;
        const subtype = this.value;
        const protocolSelect = document.getElementById('protocol');
        
        if (subtype && cancerType) {
            protocolSelect.disabled = false;
            loadProtocols(cancerType, subtype);
        } else {
            protocolSelect.disabled = true;
        }
        
        // Reset carboplatin fields
        checkForCarboplatin('', cancerType, subtype);
    });
    
    document.getElementById('protocol').addEventListener('change', function() {
        const protocolKey = this.value;
        const cancerType = document.getElementById('cancerType').value;
        const subtype = document.getElementById('cancerSubtype').value;
        
        // Check for carboplatin and show/hide fields accordingly
        checkForCarboplatin(protocolKey, cancerType, subtype);
    });
    
    // Note: showPage(1) removed to allow splash screen to display first
});