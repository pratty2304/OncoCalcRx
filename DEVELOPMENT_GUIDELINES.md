# OncoCalcRx - Development Guidelines & Logic Reference

## **1. REGIMEN ORGANIZATION HIERARCHY**

### **Treatment Setting Order (Always follow this sequence):**
1. **Neoadjuvant/Adjuvant** 
2. **Perioperative**
3. **Adjuvant** 
4. **Definitive** (Concurrent chemoRT)
5. **Metastatic** (Most commonly used → Least commonly used)

### **Metastatic Regimen Ordering Logic:**
- Order by clinical frequency of use (most common first)
- Combination therapies before monotherapies
- Targeted therapies in order of approval/adoption
- Immunotherapies grouped together
- Less common/salvage regimens at the end

---

## **2. NAMING CONVENTIONS & FORMATTING**

### **Treatment Setting Labels:**
- `(Neoadjuvant/Adjuvant)` - Dual indication
- `(Perioperative)` - Pre and post-operative
- `(Adjuvant)` - Post-operative only
- `(Definitive)` - Primary treatment (usually with RT)
- `(Metastatic)` - Advanced/metastatic disease

### **Drug Labels & Descriptions:**
- **Monotherapy:** Add "monotherapy" for single agents (ONLY for immunotherapy and chemotherapy drugs)
  - `Pembrolizumab monotherapy (PD-1 inhibitor)`
  - `Gemcitabine monotherapy`
  - `Temozolomide monotherapy`
  - **DO NOT** use "monotherapy" for oral targeted therapies: `Erdafitinib (FGFR inhibitor)` ✅ NOT `Erdafitinib monotherapy`

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

### **Oral Medications:**
- **ALWAYS prefix with "PO"**
- `schedule: 'PO once daily'` (for single daily dosing)
- `schedule: 'PO twice daily'` (for twice daily dosing, NOT "BID")
- `schedule: 'PO once daily x 3 years'` (for maintenance)
- `schedule: 'PO BID D1-D14, every 21 days'` (acceptable in RT context)
- `schedule: 'PO once daily D1-21, every 28 days'`

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

This reference guide should be updated whenever new patterns or logic are introduced to maintain consistency across the application.