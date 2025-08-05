# OncoCalcRx - Development Guidelines & Logic Reference

## **1. REGIMEN ORGANIZATION HIERARCHY**

### **Treatment Setting Order (Always follow this sequence):**

#### **For Solid Tumors:**
1. **Neoadjuvant/Adjuvant** 
2. **Perioperative**
3. **Adjuvant** 
4. **Definitive** (Concurrent chemoRT)
5. **Metastatic** (Most commonly used → Least commonly used)

#### **For Hematologic Malignancies (Leukemia/Lymphoma):**
1. **First-Line** (Newly diagnosed)
2. **Second-Line** (First relapse/resistance)
3. **Third-Line and Beyond** (Multiple relapses)
4. **Relapsed/Refractory** (Salvage regimens)

#### **For Multiple Myeloma (Special Case):**
1. **First-Line - Transplant-Eligible** (Newly diagnosed, fit for autologous SCT)
2. **First-Line - Transplant-Ineligible** (Newly diagnosed, unfit for autologous SCT)
3. **Relapsed/Refractory** (Second-line and beyond)

### **Advanced Disease Regimen Ordering Logic:**
- **Solid Tumors**: Order metastatic regimens by clinical frequency
- **Hematologic Malignancies**: Order relapsed/refractory regimens by line of therapy
- Combination therapies before monotherapies
- Targeted therapies in order of approval/adoption
- Immunotherapies grouped together
- Less common/salvage regimens at the end

---

## **2. NAMING CONVENTIONS & FORMATTING**

### **Treatment Setting Labels:**

#### **For Solid Tumors:**
- `(Neoadjuvant/Adjuvant)` - Dual indication
- `(Perioperative)` - Pre and post-operative
- `(Adjuvant)` - Post-operative only
- `(Definitive)` - Primary treatment (usually with RT)
- `(Metastatic)` - Advanced/metastatic disease

#### **For Hematologic Malignancies:**
- `(First-Line)` - Newly diagnosed, treatment-naïve
- `(Second-Line)` - First relapse or resistance
- `(Third-Line)` - Multiple prior therapies
- `(Relapsed/Refractory)` - Salvage therapy, multiple relapses
- `(Maintenance)` - Post-induction/consolidation therapy

#### **For Multiple Myeloma (Special Labels):**
- `(transplant-eligible) (First-Line)` - Newly diagnosed, fit for autologous SCT
- `(transplant-ineligible) (First-Line)` - Newly diagnosed, unfit for autologous SCT
- `(Relapsed/Refractory)` - Second-line and beyond regimens

### **Drug Labels & Descriptions:**
- **Regimen Abbreviations:** Drug regimen expansion should be followed by abbreviation in parentheses
  - `Cyclophosphamide + Doxorubicin + Vincristine (CAV)`
  - `Cisplatin + Etoposide (CE)`
  - `Atezolizumab + Carboplatin + Etoposide (ACE)`
  - `Durvalumab + Carboplatin + Etoposide (DCE)`

- **Monotherapy:** Add "monotherapy" for single agents (ONLY for immunotherapy and chemotherapy drugs)
  - `Pembrolizumab monotherapy (PD-1 inhibitor)`
  - `Gemcitabine monotherapy`
  - `Temozolomide monotherapy`
  - **DO NOT** use "monotherapy" for oral targeted therapies: `Erdafitinib (FGFR inhibitor)` ✅ NOT `Erdafitinib monotherapy`

- **5-Fluorouracil Administration Specificity:** Always distinguish administration method when both exist in same regimen
  - `5-Fluorouracil (bolus)` - For bolus/push doses
  - `5-Fluorouracil (continuous infusion)` - For CI/prolonged infusion doses
  - **Single administration regimens:** Use `5-Fluorouracil` without parenthetical descriptor
  - **Mixed administration regimens:** MUST specify both `(bolus)` and `(continuous infusion)` for clarity

**Examples:**
```javascript
// Mixed regimen (FOLFOX) - Both labels required
{ name: '5-Fluorouracil (bolus)', dose: 400, unit: 'mg/m²', schedule: 'D1, every 14 days' },
{ name: '5-Fluorouracil (continuous infusion)', dose: 2400, unit: 'mg/m²', schedule: 'CI over 46 hours D1-D2, every 14 days' }

// Single CI regimen (FLOT) - No label needed
{ name: '5-Fluorouracil', dose: 2600, unit: 'mg/m²', schedule: 'CI over 24 hours D1, every 14 days' }

// Single bolus regimen (CAF) - No label needed  
{ name: '5-Fluorouracil', dose: 600, unit: 'mg/m²', schedule: 'D1, every 21 days' }
```

- **Immunotherapy Targets:** Always specify mechanism
  - `(PD-1 inhibitor)` - Pembrolizumab, Nivolumab, Cemiplimab
  - `(PD-L1 inhibitor)` - Durvalumab, Avelumab
  - `(CTLA-4 inhibitor)` - Ipilimumab

- **Targeted Therapy:** Include target/mechanism
  - `(FGFR inhibitor)` - Erdafitinib  
  - `(Hedgehog pathway inhibitor)` - Vismodegib
  - `(Trop-2 ADC)` - Sacituzumab Govitecan

### **Trial References:**
- Add trial names in parentheses before setting
- Format: `Drug Name (TRIAL-NAME) (Setting)`
- Examples:
  - `Gemcitabine + Cisplatin + Durvalumab (NIAGARA) (Perioperative)`
  - `Sacituzumab Govitecan (TROPHY-U-01) (Metastatic)`

### **Cisplatin-Ineligible Regimens:**
- Add `(cisplatin-ineligible)` before setting for carboplatin-based alternatives
- `Paclitaxel + Carboplatin (cisplatin-ineligible) (Metastatic)`

### **Monotherapy Labeling Rules:**
**INCLUDE "monotherapy" for:**
- **Immunotherapy agents:** Pembrolizumab, Nivolumab, Cemiplimab, Durvalumab, etc.
- **Chemotherapy drugs:** Gemcitabine, Temozolomide, Capecitabine, etc.

**EXCLUDE "monotherapy" for:**
- **Oral targeted therapies:** Erdafitinib, Imatinib, Erlotinib, Palbociclib, etc.
- **Hormonal therapies:** Tamoxifen, Anastrozole, etc.

**Examples:**
- ✅ `Pembrolizumab monotherapy (PD-1 inhibitor)`
- ✅ `Gemcitabine monotherapy` 
- ✅ `Erdafitinib (FGFR inhibitor)` (NO monotherapy label)
- ✅ `Imatinib (BCR-ABL inhibitor)` (NO monotherapy label)

---

## **3. DRUG SCHEDULE FORMATTING**

### **UNIVERSAL SCHEDULE RULES:**
1. **Standardized Time Intervals:**
   - Use `every 14 days` (NOT "every 2 weeks")
   - Use `every 21 days` (standard 3-week cycle)
   - Use `every 28 days` (standard 4-week cycle)
   - Use `every 7 days` (weekly dosing)

2. **Day Notation:**
   - Always use `D1, D8, D15` format for specific days
   - Use `D1-D3` for consecutive days
   - Use `D1-D5` for 5-day continuous schedules

### **Route of Administration Guidelines:**

#### **INCLUDE route specification for:**
- **Oral drugs:** Always prefix with "PO"
  - `schedule: 'PO once daily'` (for single daily dosing)
  - `schedule: 'PO twice daily'` (for twice daily dosing, NOT "BID")
  - `schedule: 'PO once daily x 3 years'` (for maintenance)
  - `schedule: 'PO BID D1-D14, every 21 days'` (acceptable in RT context)
  - `schedule: 'PO once daily D1-21, every 28 days'`

- **Intramuscular drugs:** Include "IM" for specific drugs
  - Fulvestrant: `schedule: 'IM D1, every 28 days'`
  - Octreotide LAR: `schedule: 'IM monthly'`

- **Subcutaneous drugs:** Include "SC" for specific drugs
  - Bortezomib: `schedule: 'SC D1, D8, D15, every 21 days'`
  - Lanreotide: `schedule: 'SC D1, every 28 days'`

#### **EXCLUDE route specification for:**
- **Intravenous drugs:** NO "IV" specification (default assumption)
  - ✅ `schedule: 'D1, every 21 days'` (NOT "IV D1, every 21 days")
  - ✅ `schedule: 'D1-D5, every 21 days'` (NOT "IV D1-D5, every 21 days")
  - ✅ `schedule: 'Every 6 hours D-7 to D-4 (16 doses total)'`

### **Intravenous Medications:**
- `schedule: 'D1, every 21 days'` (single day dosing)
- `schedule: 'D1, D8, every 21 days'` (two days per cycle)
- `schedule: 'D1, D8, D15, every 21 days'` (three days per cycle)
- `schedule: 'D1-D3, every 21 days'` (consecutive days)
- `schedule: 'D1-D5, every 21 days'` (5-day continuous)

### **Continuous Infusions:**
- `schedule: 'CI D1-D4, every 21 days'` (4-day continuous infusion)
- `schedule: 'CI over 46 hours, every 14 days'` (specific duration)
- `schedule: 'CI daily D1-D5 and D16-D20 of RT'` (radiation concurrent)

### **Immunotherapy Specific:**
- `schedule: 'D1, every 21 days'` (standard)
- `schedule: 'D1, every 14 days'` (biweekly)
- `schedule: 'D1, every 28 days'` (monthly)
- Alternative: `schedule: 'every 21 days or 400mg every 6 weeks'`

### **Loading Dose Schedules:**
- Format: `'8 mg/kg loading dose, then 6 mg/kg D1, every 14 days'`
- Always specify loading dose first

### **Maintenance Schedules:**
- `schedule: 'D1, every 28 days (maintenance after chemotherapy)'`
- `schedule: 'PO daily until progression'`
- `schedule: 'PO daily x 3 years'`

### **Radiation Concurrent:**
- `schedule: 'PO BID on days of RT'`
- `schedule: 'CI daily D1-D5 and D16-D20 of RT'`
- `schedule: 'D1, D29 (with concurrent RT)'`

### **FORMATTING CONSISTENCY RULES:**
1. **Capitalization:** Use D1, D8 (capital D)
2. **Spacing:** Always space after commas: `D1, D8, every 21 days`
3. **Frequency Clarity:** Use "once daily" and "twice daily" for explicit frequency distinction
4. **PO Prefix:** ALL oral drugs must start with "PO "
5. **Time Units:** Use "days" not "weeks" (every 14 days, not every 2 weeks)
6. **Parentheses:** Use for additional context: `(maintenance)`, `(with RT)`, `(until progression)`

---

## **4. DOSE CALCULATIONS & UNITS**

### **BSA Calculations:**
- Use Mosteller's formula: `BSA = √((height × weight) / 3600)`
- Round to 2 decimal places
- Mutual exclusion: Either height/weight/sex OR direct BSA entry

### **Carboplatin AUC Calculations:**
- Use Calvert formula: `Dose = AUC × (GFR + 25)`
- Requires: Age, Weight, Sex, Creatinine, AUC
- When BSA entered directly: Show additional weight/sex fields

### **Creatinine Clearance:**
- Cockcroft-Gault formula with sex-based adjustment
- Male: `((140-age) × weight) / (72 × creatinine)`
- Female: `Above × 0.85`

### **Carboplatin Creatinine Floor Validation:**
- **Minimum Creatinine Value**: 0.7 mg/dL
- **Clinical Rationale**: Prevents GFR overestimation and carboplatin overdosing
- **High-Risk Populations**:
  - Low muscle mass patients
  - Malnourished patients  
  - Elderly patients
- **Implementation**: Warning dialog appears when creatinine < 0.7 mg/dL
- **User Options**: Proceed with entered value or modify creatinine

**Warning Message Logic:**
```javascript
if (creatinineValue < 0.7) {
    const userConfirm = confirm('⚠️ CARBOPLATIN DOSING WARNING\n\n' +
        'Serum creatinine values < 0.7 mg/dL may overestimate GFR and lead to ' +
        'carboplatin overdosing, especially in patients with:\n' +
        '• Low muscle mass\n• Malnutrition\n• Elderly patients\n\n' +
        'Clinical Recommendation:\n' +
        'Consider using a minimum creatinine value of 0.7 mg/dL for safer dosing.');
}
```

### **Dose Rounding Logic:**
```javascript
// < 10mg: Round to nearest 1mg
// 10-100mg: Round to nearest 5mg  
// 100-500mg: Round to nearest 10mg
// 500-1000mg: Round to nearest 50mg
// 1000-2000mg: Round to nearest 50mg
// >2000mg: Round to nearest 100mg
```

### **Vincristine Special Dosing Logic:**

**Calculated Dose Display:**
- Always show the true calculated dose (BSA × dose/m² = calculated mg)
- Example: BSA 2.12 × 1.5 mg/m² = 3.18mg (displayed as calculated)

**Rounded Dose Logic:**
- **EPOCH Regimens (ALL variants):** No rounding applied to vincristine
  - R-DA-EPOCH, DA-EPOCH, R-EPOCH, EPOCH
  - Any protocol containing "epoch" (case-insensitive)
  - Calculated dose = Rounded dose (exact precision maintained)
  - Example: 3.18mg calculated → 3.18mg rounded

- **Regular Regimens:** Apply normal rounding rules, then cap at 2mg
  - Apply standard dose rounding first
  - If rounded dose > 2mg, cap at 2mg maximum
  - Example: 3.18mg calculated → 3mg rounded → 2mg final (capped)

**Implementation Logic:**
```javascript
// In roundDose() function
if (drugNameLower.includes('vincristine')) {
    const protocolNameLower = protocolName.toLowerCase();
    const isEpochRegimen = protocolNameLower.includes('epoch');
    
    if (isEpochRegimen) {
        // All EPOCH variants: No rounding - return original dose
        return numDose;
    } else {
        // Regular regimens: Cap at 2mg after normal rounding
        if (roundedDose > 2) {
            roundedDose = 2;
        }
    }
}
```

**Clinical Rationale:**
- **EPOCH Regimens:** Require precise dosing per protocol specifications
- **Regular Regimens:** Safety cap prevents vincristine-induced peripheral neuropathy
- **Transparency:** Shows actual calculated dose for clinical review

---

## **5. CARBOPLATIN PARAMETER LOGIC**

### **When to Show Carboplatin Fields:**
- Detect drugs with `name.toLowerCase().includes('carboplatin')`
- Show: Age, Creatinine, AUC fields

### **BSA Direct Entry Logic:**
- If `directBSA` value exists AND carboplatin detected:
  - Show additional Weight and Sex fields
  - Make these fields required
  - Use in form data collection for calculations

### **Field Management:**
- Search section: `searchBSAAdditionalFields`
- Browse section: `browseBSAAdditionalFields`  
- Clear functions must handle both sections

---

## **6. VALIDATION RULES**

### **Required Fields:**
- Either (Height + Weight + Sex) OR Direct BSA
- For carboplatin: Age + Creatinine + AUC + (Weight + Sex if BSA direct)
- Cancer Type + Protocol selection

### **Input Constraints:**
- Height: 100-250 cm
- Weight: 20-200 kg  
- BSA: 0.5-3.0 m²
- Age: 1-120 years
- Creatinine: 0.3-15 mg/dL
- AUC: 1-10

---

## **6. DOSE REDUCTION LOGIC**

### **Drugs EXCLUDED from Dose Reduction:**

#### **Immunotherapy Agents:**
- **PD-1 Inhibitors:** Pembrolizumab, Nivolumab, Cemiplimab, Toripalimab, Tislelizumab
- **PD-L1 Inhibitors:** Durvalumab, Avelumab, Atezolizumab
- **CTLA-4 Inhibitors:** Ipilimumab
- **Other Immunotherapy:** CAR-T therapies, Monoclonal antibodies

#### **Oral Targeted Therapy Drugs:**
- **Tyrosine Kinase Inhibitors:** Imatinib, Dasatinib, Nilotinib, Bosutinib, Ponatinib
- **EGFR Inhibitors:** Erlotinib, Gefitinib, Osimertinib, Afatinib
- **ALK/ROS1 Inhibitors:** Crizotinib, Alectinib, Ceritinib, Brigatinib
- **BRAF/MEK Inhibitors:** Dabrafenib, Trametinib, Vemurafenib, Cobimetinib
- **CDK4/6 Inhibitors:** Palbociclib, Ribociclib, Abemaciclib
- **mTOR Inhibitors:** Everolimus, Temsirolimus
- **PARP Inhibitors:** Olaparib, Rucaparib, Niraparib
- **BTK Inhibitors:** Ibrutinib, Acalabrutinib, Zanubrutinib
- **PI3K Inhibitors:** Idelalisib, Duvelisib
- **FLT3 Inhibitors:** Midostaurin, Gilteritinib
- **FGFR Inhibitors:** Erdafitinib, Pemigatinib
- **Hedgehog Inhibitors:** Vismodegib, Sonidegib
- **Multi-kinase Inhibitors:** Sorafenib, Lenvatinib, Cabozantinib, Regorafenib
- **RET Inhibitors:** Selpercatinib, Pralsetinib
- **TRK Inhibitors:** Larotrectinib, Entrectinib, Repotrectinib

#### **Hormonal Therapy Drugs:**
- **Selective Estrogen Receptor Modulators (SERMs):** Tamoxifen, Toremifene
- **Aromatase Inhibitors:** Anastrozole, Letrozole, Exemestane
- **Selective Estrogen Receptor Degraders (SERDs):** Fulvestrant, Elacestrant, Camizestrant
- **GnRH Agonists:** Goserelin, Leuprolide, Triptorelin
- **Androgen Deprivation Therapy:** Bicalutamide, Flutamide, Enzalutamide, Abiraterone

### **Drugs INCLUDED in Dose Reduction:**
- **Chemotherapy agents** (all cytotoxic drugs)
- **Antibody-Drug Conjugates (ADCs):** Enfortumab Vedotin, Sacituzumab Govitecan, T-DM1
- **Monoclonal antibodies** (non-immunotherapy): Trastuzumab, Bevacizumab, Cetuximab

### **Implementation Logic:**
```javascript
// Identify drugs exempt from dose reduction
const immunotherapyKeywords = ['pembrolizumab', 'nivolumab', 'durvalumab', 'avelumab', 'ipilimumab'];
const oralTargetedKeywords = ['imatinib', 'erlotinib', 'palbociclib', 'olaparib', 'ibrutinib'];
const hormonalTherapyKeywords = ['tamoxifen', 'anastrozole', 'letrozole', 'exemestane', 'fulvestrant', 
                                'elacestrant', 'camizestrant', 'goserelin', 'leuprolide', 'triptorelin',
                                'bicalutamide', 'flutamide', 'enzalutamide', 'abiraterone'];

// Check if drug should be excluded from reduction
function isExemptFromReduction(drugName) {
    const drugLower = drugName.toLowerCase();
    return immunotherapyKeywords.some(keyword => drugLower.includes(keyword)) ||
           oralTargetedKeywords.some(keyword => drugLower.includes(keyword)) ||
           hormonalTherapyKeywords.some(keyword => drugLower.includes(keyword)) ||
           drugLower.includes('inhibitor') && isOralTargeted;
}
```

### **Clinical Rationale:**
- **Immunotherapy:** Fixed dosing based on pharmacokinetic studies
- **Oral Targeted Therapy:** Dose optimization through individual titration
- **Hormonal Therapy:** Fixed dosing with standard protocols; toxicity managed by withholding/discontinuation
- **Standard Practice:** These drugs are held/discontinued rather than reduced for toxicity management

---

## **7. USER INTERFACE PATTERNS**

### **Multi-Page Navigation:**
1. **Page 1:** Patient Information (Height/Weight/Sex OR BSA)
2. **Page 2:** Regimen Selection (3 methods: Global search, Cancer search, Browse)
3. **Page 3:** Results Display
4. **Page 4:** Dose Adjustment  
5. **Page 5:** Final Prescription

### **Search Methods:**
1. **Global Search:** Search all regimens across cancers
2. **Cancer-Specific Search:** Search within selected cancer type
3. **Browse Method:** Dropdown selection by cancer → subtype → protocol

### **Responsive Design:**
- Mobile-first approach
- Touch-friendly buttons (min 44px)
- Horizontal scrolling tables on mobile
- Collapsible sections for space efficiency

---

## **8. DATA STRUCTURE PATTERNS**

### **Protocol Database Structure:**
```javascript
cancerType: {
    subtype: {  // For breast, lung, lymphoma, leukemia, etc.
        'protocol-key': {
            name: 'Display Name (Setting)',
            cycles: number,
            drugs: [
                {
                    name: 'Drug Name',
                    dose: number || 'AUC X',
                    unit: 'mg/m²' || 'mg' || 'AUC',
                    schedule: 'Dosing schedule'
                }
            ]
        }
    }
}
```

### **Form Data Collection:**
- Collect from appropriate fields based on search method used
- Handle BSA direct entry with additional carboplatin fields
- Validate required fields before calculation

---

## **9. ANALYTICS INTEGRATION**

### **Event Tracking:**
- App start/initialization
- Protocol selection method (search/browse/cancer-specific)
- Dose calculations performed
- Workflow completion rates
- Error tracking for failed calculations

### **Google Analytics 4:**
- Track user flows and drop-off points
- Monitor most commonly used protocols
- Device and platform usage analytics

---

## **10. ERROR HANDLING & EDGE CASES**

### **Calculation Errors:**
- Invalid input validation with user-friendly messages
- Fallback values for edge cases
- Clear error states for missing required fields

### **Protocol Missing:**
- Graceful handling of undefined protocols
- Clear messaging for unsupported combinations
- Fallback to similar regimens where appropriate

---

## **11. ACCESSIBILITY & USABILITY**

### **Form Design:**
- Clear labels and placeholders
- Visual feedback for required fields
- Progress indicators for multi-step process
- Error states with actionable guidance

### **Mobile Optimization:**
- Large touch targets
- Readable font sizes (min 16px on mobile)
- Efficient use of screen space
- Offline capability considerations

---

## **12. MAINTENANCE & UPDATES**

### **Adding New Regimens:**
1. Follow treatment setting hierarchy
2. Use consistent naming conventions
3. Include trial references where applicable
4. Add monotherapy labels for single agents
5. Test carboplatin logic if applicable

### **Updating Existing Regimens:**
- Maintain key consistency for saved data
- Update display names following conventions
- Preserve dose calculation logic
- Test across all search methods

---

## **13. QUALITY ASSURANCE CHECKLIST**

### **Before Deployment:**
- [ ] All regimens follow naming conventions
- [ ] Treatment settings in correct order
- [ ] Monotherapy labels added where needed
- [ ] Carboplatin logic tested for both BSA entry methods  
- [ ] Mobile responsive design verified
- [ ] Form validation working correctly
- [ ] Analytics events firing properly
- [ ] Error handling graceful
- [ ] Performance acceptable on target devices

---

---

## **14. SCHEDULE FORMATTING EXAMPLES**

### **Standardized Formats Applied:**
- `every 14 days` ✅ (NOT "every 2 weeks")
- `PO daily` ✅ (ALL oral drugs)  
- `PO twice daily` ✅ (NOT "BID" except in RT context)
- `PO daily until progression` ✅
- `D1, every 21 days` ✅
- `D1, D8, every 21 days` ✅
- `CI D1-D4, every 21 days` ✅

### **Acceptable Exceptions:**
- `PO BID on days of RT` (radiation therapy context)
- `BID` in transplant protocols (medical abbreviations)
- Loading dose schedules with specific formatting

---

## **15. MESNA UROPROTECTION DOSING LOGIC**

### **Clinical Rationale:**
Mesna (2-mercaptoethanesulfonate) provides uroprotection for alkylating agents by neutralizing toxic metabolites in the urinary tract, preventing hemorrhagic cystitis.

### **Ifosfamide + Mesna Protocols:**

#### **Total Daily Mesna Dose:**
- **100% of Ifosfamide dose** (equal mg/m² amounts)
- **Split-dose administration:** 20% - 40% - 40% pattern

#### **Split-Dose Timing:**
1. **Pre-dose (20%):** Before Ifosfamide infusion
2. **4-hour post (40%):** 4 hours after Ifosfamide completion  
3. **8-hour post (40%):** 8 hours after Ifosfamide completion

### **Database Structure - Individual Dose Components:**

**CRITICAL: Represent Mesna as separate drug entries, NOT single total dose**

```javascript
// ❌ INCORRECT - Single total dose (confusing for clinical use)
{ name: 'Mesna', dose: 1500, unit: 'mg/m²', schedule: '300 mg/m² before, then 600 mg/m² at 4h and 8h post' }

// ✅ CORRECT - Individual dose components (clinically clear)
{ name: 'Mesna (pre-dose)', dose: 300, unit: 'mg/m²', schedule: 'before Ifosfamide, D1-D5 every 21 days' },
{ name: 'Mesna (4h post)', dose: 600, unit: 'mg/m²', schedule: '4 hours after Ifosfamide, D1-D5 every 21 days' },
{ name: 'Mesna (8h post)', dose: 600, unit: 'mg/m²', schedule: '8 hours after Ifosfamide, D1-D5 every 21 days' }
```

### **Dosing Examples:**

#### **Ifosfamide 1200 mg/m² (e.g., VIP regimen):**
- **Mesna (pre-dose):** 240 mg/m² (20%)
- **Mesna (4h post):** 480 mg/m² (40%)
- **Mesna (8h post):** 480 mg/m² (40%)
- **Total:** 1200 mg/m² (100%)

#### **Ifosfamide 1500 mg/m² (e.g., TIP, BIP regimens):**
- **Mesna (pre-dose):** 300 mg/m² (20%)
- **Mesna (4h post):** 600 mg/m² (40%)
- **Mesna (8h post):** 600 mg/m² (40%)
- **Total:** 1500 mg/m² (100%)

#### **Ifosfamide 2500 mg/m² (e.g., AIM regimen):**
- **Mesna (pre-dose):** 500 mg/m² (20%)
- **Mesna (4h post):** 1000 mg/m² (40%)
- **Mesna (8h post):** 1000 mg/m² (40%)
- **Total:** 2500 mg/m² (100%)

### **High-Dose Cyclophosphamide + Mesna:**

#### **Indication Criteria:**
- **Cyclophosphamide ≥1000 mg/m²** OR **total dose ≥1 g**
- Examples: BEACOPP (1250 mg/m²), R-CVP (1000 mg/m²)

#### **Mesna Dosing:**
- **Total Mesna = 60-100% of Cyclophosphamide dose**
- **Standard: 80% of Cyclophosphamide dose**
- **Single dose administration** (unlike Ifosfamide split-dosing)

#### **Examples:**
```javascript
// Cyclophosphamide 1250 mg/m² → Mesna 1000 mg/m² (80%)
{ name: 'Cyclophosphamide', dose: 1250, unit: 'mg/m²', schedule: 'D1, every 21 days' },
{ name: 'Mesna', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days (80% of Cyclophosphamide dose)' }

// Cyclophosphamide 1000 mg/m² → Mesna 800 mg/m² (80%)  
{ name: 'Cyclophosphamide', dose: 1000, unit: 'mg/m²', schedule: 'D1, every 21 days' },
{ name: 'Mesna', dose: 800, unit: 'mg/m²', schedule: 'D1, every 21 days (80% of Cyclophosphamide dose)' }
```

### **Clinical Benefits of Split-Dose Structure:**

#### **For Prescribers:**
- **Clear individual dose components** for accurate prescribing
- **Precise timing intervals** specified for each administration
- **No confusion** between total daily dose and individual components

#### **For Pharmacists:**
- **Individual dose calculations** for dispensing preparation
- **Clear preparation instructions** for each time point
- **Accurate inventory planning** for multiple administrations

#### **For Nursing Staff:**
- **Precise administration timing** with clear dose amounts
- **Individual dose verification** at each time point
- **Simplified documentation** for each Mesna administration

### **Implementation Requirements:**

#### **Regimen Coverage:**
- **ALL Ifosfamide-containing regimens** must use split-dose structure
- **High-dose Cyclophosphamide regimens** require Mesna addition
- **Cross-cancer type consistency** (testicular, sarcoma, cervical, endometrial, etc.)

#### **Schedule Formatting:**
- Use standardized timing descriptions: "before Ifosfamide", "4 hours after Ifosfamide", "8 hours after Ifosfamide"
- Include cycle timing: "D1-D5 every 21 days", "D1-D3 every 21 days"
- Add dose rationale in parentheses when helpful: "(80% of Cyclophosphamide dose)"

#### **Quality Assurance:**
- Verify 20-40-40 split adds to 100% of Ifosfamide dose
- Ensure all three components have matching schedule patterns
- Confirm naming convention: "Mesna (pre-dose)", "Mesna (4h post)", "Mesna (8h post)"

---

## **16. REGIMEN VALIDATION & UPDATES**

### **Cross-Reference with Latest Guidelines:**

#### **Dose Verification Protocol:**
- **MANDATORY**: Cross-check ALL regimen doses against latest NCCN and ASCO guidelines
- **Sources to verify**: 
  - NCCN Guidelines (current version for each cancer type)
  - ASCO Annual Meeting abstracts and updates
  - FDA-approved dosing schedules
  - Pivotal clinical trial publications
- **Action Required**: If any doses are incorrect or outdated, MUST correct to match current evidence-based standards
- **Documentation**: Note source and date of verification for dose corrections

#### **Missing Regimen Assessment:**
- **MANDATORY**: Cross-check with latest NCCN and ASCO guidelines for any missing regimens
- **Evaluation Criteria**:
  - NCCN Category 1, 2A, or 2B recommendations
  - FDA-approved regimens not yet included
  - Practice-changing clinical trial results from recent ASCO meetings
  - Breakthrough therapy designations
- **Action Required**: Add missing regimens that meet evidence standards
- **Priority Guidelines**:
  - **High Priority**: FDA-approved, NCCN Category 1 recommendations
  - **Medium Priority**: NCCN Category 2A, practice-changing trial results
  - **Low Priority**: Investigational regimens with promising but preliminary data

#### **Update Frequency:**
- **Annual Review**: Complete cross-reference with updated NCCN guidelines (typically released annually)
- **Post-ASCO Review**: Assess for practice-changing abstracts and breakthrough results
- **FDA Approval Monitoring**: Add newly approved regimens within 30 days of approval
- **Emergency Updates**: Critical safety updates or dose modifications implemented immediately

#### **Quality Assurance Process:**
1. **Systematic Review**: Go through each cancer type methodically
2. **Documentation**: Record what was checked, when, and what changes were made
3. **Evidence Grading**: Note the level of evidence for each regimen (Phase III trial, FDA approval, etc.)
4. **Cross-Validation**: Have clinical expertise review major changes before implementation

### **Implementation Workflow:**
```
1. Select cancer type for review
2. Access latest NCCN guidelines for that cancer type
3. Cross-reference every existing regimen:
   - Verify drug names, doses, schedules, cycles
   - Check for any dose modifications or updates
4. Review NCCN recommendations for missing regimens
5. Search ASCO abstracts for breakthrough results
6. Add missing regimens following development guidelines format
7. Document all changes with evidence sources
8. Update version control and change log
```

---

## **17. REGIMEN DEDUPLICATION RULES**

### **No Duplicate Regimens Policy:**
- **RULE**: No identical drug combination should be repeated multiple times for different treatment settings
- **SOLUTION**: Use single regimen entry with multiple treatment settings in parentheses
- **FORMAT**: `Drug1 + Drug2 (Setting1/Setting2/Setting3)`

### **Examples of Proper Deduplication:**

#### **Instead of Multiple Entries:**
```javascript
// ❌ INCORRECT - Duplicated regimens
'Pemetrexed-Cisplatin-Neoadjuvant': {
    name: 'Pemetrexed + Cisplatin (PC) (Neoadjuvant)'
},
'Pemetrexed-Cisplatin-Adjuvant': {
    name: 'Pemetrexed + Cisplatin (PC) (Adjuvant)' 
},
'Pemetrexed-Cisplatin': {
    name: 'Pemetrexed + Cisplatin (PC) (Metastatic)'
}
```

#### **Use Single Combined Entry:**
```javascript
// ✅ CORRECT - Single deduplicated regimen
'Pemetrexed-Cisplatin': {
    name: 'Pemetrexed + Cisplatin (PC) (Neoadjuvant/Adjuvant/Metastatic)',
    cycles: 6, // Use most common cycle count or indicate variable
    drugs: [
        { name: 'Pemetrexed', dose: 500, unit: 'mg/m²', schedule: 'D1, every 21 days' },
        { name: 'Cisplatin', dose: 75, unit: 'mg/m²', schedule: 'D1, every 21 days' }
    ]
}
```

### **Setting Combination Guidelines:**

#### **Common Combinations:**
- `(Neoadjuvant/Adjuvant)` - Same regimen used pre and post-operatively
- `(Adjuvant/Metastatic)` - Same regimen for adjuvant and advanced disease
- `(Neoadjuvant/Adjuvant/Metastatic)` - Regimen used across all settings

#### **Treatment-Specific Variations:**
- Different doses, cycles, or schedules → Keep as separate entries
- Different drug names or mechanisms → Keep as separate entries
- Same drugs, doses, schedules → Combine into single entry

### **Cycle Count for Combined Settings:**
- Use the most commonly used cycle count
- If significantly different, note in drug schedule: `'D1, every 21 days (3-6 cycles depending on setting)'`

### **Implementation Workflow:**
1. **Audit existing regimens** for identical drug combinations
2. **Identify true duplicates** (same drugs, doses, schedules)
3. **Combine into single entries** with multiple settings
4. **Preserve unique regimens** that have different parameters
5. **Update regimen keys** to remove setting-specific suffixes
6. **Test functionality** to ensure search/browse methods work correctly

### **Benefits of Deduplication:**
- **Reduced database size** and maintenance overhead
- **Improved user experience** - fewer redundant options
- **Cleaner codebase** with less repetitive entries
- **Easier updates** - change once, applies to all settings

---

## **18. MULTIPLE MYELOMA TRANSPLANT ELIGIBILITY CLASSIFICATION**

### **Clinical Rationale:**
Multiple myeloma treatment approach is fundamentally determined by autologous stem cell transplant (ASCT) eligibility, which affects both induction regimen selection and treatment goals.

### **Transplant-Eligible Criteria:**
#### **Patient Factors:**
- **Age:** Typically ≤70 years (some centers extend to 75)
- **Performance Status:** ECOG 0-2, adequate functional status
- **Organ Function:** Adequate cardiac, pulmonary, hepatic, and renal function
- **Comorbidities:** Absence of major comorbidities that contraindicate ASCT

#### **Disease Factors:**
- **Stage:** Any stage (ISS I-III acceptable)
- **Cytogenetics:** High-risk cytogenetics do not exclude transplant eligibility
- **Response Goals:** Aim for maximal response before ASCT

### **Transplant-Ineligible Criteria:**
#### **Patient Factors:**
- **Age:** Typically >70-75 years (institutional variation)
- **Performance Status:** ECOG ≥3, poor functional status
- **Comorbidities:** Significant cardiac, pulmonary, or other organ dysfunction
- **Frailty:** Geriatric assessment indicating frailty

#### **Treatment Approach:**
- **Extended Induction:** Longer treatment courses (9-12+ cycles)
- **Continuous Therapy:** Often continued until progression
- **Lower Intensity:** May require dose modifications

### **Regimen Design Differences:**

#### **Transplant-Eligible Regimens:**
- **Cycle Count:** Typically 3-4 cycles of induction
- **Intensity:** Full-dose, intensive regimens acceptable
- **Goal:** Achieve rapid, deep response before ASCT
- **Examples:** VRd × 4, Dara-VRd × 4, VTD × 4

#### **Transplant-Ineligible Regimens:**
- **Cycle Count:** Extended courses (9-12+ cycles)
- **Intensity:** May require dose reductions (e.g., VRd-Lite)
- **Goal:** Sustained disease control with manageable toxicity
- **Maintenance:** Often includes continuous therapy until progression
- **Examples:** VRd-Lite × 9, Dara-Rd (continuous), MPT

### **Naming Convention Implementation:**

#### **Transplant-Eligible Format:**
```javascript
// Format: Drug Name (Trial) (transplant-eligible) (First-Line)
name: 'Bortezomib + Lenalidomide + Dexamethasone (VRd) (SWOG S0777) (transplant-eligible) (First-Line)'
```

#### **Transplant-Ineligible Format:**
```javascript
// Format: Drug Name (Trial) (transplant-ineligible) (First-Line)
name: 'Daratumumab + Lenalidomide + Dexamethasone (Dara-Rd) (MAIA) (transplant-ineligible) (First-Line)'
```

### **Clinical Decision Support:**
The transplant eligibility designation helps clinicians:
1. **Select Appropriate Regimens:** Match treatment intensity to patient fitness
2. **Set Treatment Goals:** Different depth of response expectations
3. **Plan Treatment Duration:** Short induction vs. extended therapy
4. **Anticipate Toxicity:** Adjust for patient tolerance
5. **Coordinate Care:** Plan for ASCT evaluation and timing

### **Implementation Requirements:**
- **ALL first-line multiple myeloma regimens** must include transplant eligibility designation
- **Relapsed/refractory regimens** do not require this designation (treatment approach similar regardless)
- **Maintenance regimens** should specify post-transplant vs. primary maintenance context
- **Cross-reference with NCCN guidelines** for current eligibility criteria

### **Quality Assurance:**
- Verify regimen classifications match current clinical practice standards
- Ensure cycle counts and dosing align with transplant eligibility status
- Confirm trial references support the designated patient population
- Review annually with updated transplant eligibility guidelines

---

## **18. MULTIPLE MYELOMA TRANSPLANT ELIGIBILITY LOGIC**

### **Clinical Rationale:**
Multiple myeloma treatment is uniquely stratified by transplant eligibility due to significant differences in treatment intensity, duration, and outcomes between transplant-eligible and transplant-ineligible patients.

### **Transplant Eligibility Criteria:**

#### **Transplant-Eligible Patients:**
- **Age:** Typically ≤70 years (varies by center, some extend to 75)
- **Performance Status:** ECOG 0-2
- **Organ Function:** Adequate cardiac, pulmonary, renal, hepatic function
- **Patient Preference:** Willing to undergo autologous stem cell transplant

#### **Transplant-Ineligible Patients:**
- **Age:** Typically >70-75 years
- **Performance Status:** ECOG 3-4 or significant frailty
- **Organ Dysfunction:** Cardiac, pulmonary, renal, or hepatic impairment
- **Patient Preference:** Declines transplant option

### **Treatment Strategy Differences:**

#### **Transplant-Eligible Regimens:**
- **Induction Phase:** 3-4 cycles of intensive triplet/quadruplet therapy
- **Autologous SCT:** High-dose melphalan conditioning
- **Post-Transplant:** Maintenance therapy
- **Goal:** Deep response (≥VGPR) before transplant

#### **Transplant-Ineligible Regimens:**
- **Extended Therapy:** 9-12 cycles or continuous treatment
- **Lower Intensity:** Reduced doses, especially dexamethasone
- **Continuous Maintenance:** Until progression or intolerance
- **Goal:** Prolonged disease control with acceptable toxicity

### **Labeling Requirements:**

#### **Mandatory Label Format:**
- **Pattern:** `Drug Name (TRIAL) (transplant-eligible/transplant-ineligible) (First-Line)`
- **Placement:** Transplant eligibility label comes BEFORE treatment setting
- **Consistency:** ALL first-line multiple myeloma regimens must include eligibility status

#### **Examples:**
- ✅ `Bortezomib + Lenalidomide + Dexamethasone (VRd) (SWOG S0777) (transplant-eligible) (First-Line)`
- ✅ `Daratumumab + Lenalidomide + Dexamethasone (Dara-Rd) (MAIA) (CD38 mAb) (transplant-ineligible) (First-Line)`

### **Implementation:**

#### **Database Organization:**
```javascript
// First-Line - Transplant-Eligible Patients
// First-Line - Transplant-Ineligible Patients  
// Relapsed/Refractory - Second-Line and Beyond
```

#### **Key Differences:**
- **Cycle Number:** Transplant-eligible (3-4 cycles) vs Transplant-ineligible (9-12 cycles)
- **Dexamethasone:** Standard dose (40mg) vs Reduced dose (20mg in elderly)
- **Duration:** Fixed induction vs Continuous until progression

---

This reference guide should be updated whenever new patterns or logic are introduced to maintain consistency across the application.