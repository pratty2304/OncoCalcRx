# OncoCalcRx — CLAUDE.md

Complete reference for understanding and maintaining this codebase.

---

## What This App Is

**OncoCalcRx** is a client-side chemotherapy dose calculator PWA (Progressive Web App).
No backend. All data and logic runs in the browser.

**5-page single-page application flow:**
1. Patient Information (height, weight, BSA, sex)
2. Regimen Selection (cancer type → subtype → setting → protocol)
3. Dose Results (calculated doses)
4. Dose Adjustment (manual overrides)
5. Final Prescription (printable output)

---

## File Structure

```
oncocalcrx/
├── index.html          # All UI (2,200+ lines) — 5 pages shown/hidden via CSS class
├── app.js              # All logic (3,900+ lines) — no frameworks, vanilla JS
├── data/               # 38 cancer type data files
│   ├── breast.js       # window.protocolData.breast = { ... }
│   ├── lung.js
│   ├── ... (one .js per cancer type)
│   └── *.json          # Raw JSON mirrors of the .js files
├── PRD.md              # Data quality rules (must read before editing protocols)
├── DEVELOPMENT_GUIDELINES.md  # Naming conventions, ordering, formatting rules
└── splash-bg.jpg       # UI background image
```

---

## Data Architecture

### How Data Loads

Each `data/*.js` file sets `window.protocolData.<cancerType> = { ... }`.
`app.js` calls `loadExternalProtocols()` on init, which merges all into `protocolDatabase`.

### Data Structure

```
protocolDatabase
  └── cancerType (e.g. "breast")
        └── subtype (e.g. "hormone_positive")  ← only for cancer types WITH subtypes
              └── setting (e.g. "neoadjuvant")
                    └── protocolKey (e.g. "AC-T")
                          ├── name: "Doxorubicin + Cyclophosphamide → Paclitaxel (AC-T)"
                          ├── cycles: 8
                          └── drugs: [
                                {
                                  name: "Doxorubicin",
                                  dose: 60,
                                  unit: "mg/m²",          // or "mg/kg", "AUC", flat "mg"
                                  schedule: "D1, every 21 days x 4 cycles",
                                  hasLoadingDose: false,   // optional
                                  maintenanceDose: ...,    // only if hasLoadingDose
                                  days: ...                // optional
                                }
                              ]
```

### Cancer Types WITH Subtypes (require subtype dropdown)

| Cancer Type | Subtypes |
|---|---|
| `breast` | hormone_positive, triple_negative, her2_positive, her2_low_ultralow |
| `lung` | nsclc, sclc |
| `lymphoma` | hodgkins_lymphoma, b_cell_nhl, t_cell_nhl |
| `leukemia` | cml, cll, all, aml, hcl |
| `colorectal` | colon_cancer, rectal_cancer, metastatic_colorectal |
| `thyroid` | differentiated, medullary, anaplastic |
| `bone` | osteosarcoma, chordoma, ewings_sarcoma, chondrosarcoma, giant_cell_tumor |
| `brain` | glioblastoma, glioma_grade2_3, medulloblastoma, ependymoma, diffuse_midline_glioma |

All other cancer types go directly: `protocolDatabase[cancerType][setting][protocolKey]`

### Data Lookup Paths

```js
// With subtype:
protocolDatabase[cancerType][subtype][setting][protocolKey]

// Without subtype:
protocolDatabase[cancerType][setting][protocolKey]
```

---

## Clinical Settings

Defined in `populateSettings()`. The ordered array controls dropdown order:

```js
['neoadjuvant', 'adjuvant', 'perioperative', 'definitive', 'locally_advanced',
 'primary_treatment', 'maintenance', 'metastatic', 'recurrent_progressive',
 'relapsed_refractory', 'unresectable_recurrent', 'mcspc', 'nmcrpc', 'mcrpc',
 'autologous', 'allogeneic_mac', 'allogeneic_ric']
```

**When adding a new setting key**, update ALL 3 locations:
1. The `settings` array in `populateSettings()`
2. The `settingLabels` object in `populateSettings()`
3. The `getSettingLabel()` function at the top of `app.js`

**Auto-select behavior**: If only one setting exists for a cancer type, the dropdown is hidden and the setting is selected automatically.

---

## Medical Formulas

### BSA — Mosteller's Formula
```
BSA (m²) = sqrt((height_cm × weight_kg) / 3600)
```

### Creatinine Clearance — Cockcroft-Gault
```
CrCl = ((140 - age) × weight_kg) / (72 × creatinine_mg/dL)
CrCl × 0.85  (if female)
```

### Carboplatin — Calvert Formula
```
Dose (mg) = AUC × (CrCl + 25)
```
AUC is user-selected (typically 4–6). GFR is approximated by CrCl.

---

## Carboplatin Logic (`checkForCarboplatin`)

When a protocol is selected, the app checks if any drug name includes `"carboplatin"`.
If yes → shows AUC dropdown + age + creatinine fields (required).

**Special case**: If user entered BSA directly (not height/weight), additional weight + sex fields are shown (needed for CrCl calculation).

`checkForCarboplatin(protocolKey, cancerType, subtype, setting)` must be called with the **setting** parameter — this is a common bug source. Verify it's passed in all call sites.

---

## Dose Rounding Logic (`roundDose`)

**No rounding applied to:**
- Immunotherapy drugs (pembrolizumab, nivolumab, ipilimumab, atezolizumab, durvalumab, avelumab, cemiplimab, dostarlimab, toripalimab, tislelizumab, tremelimumab, spartalizumab, retifanlimab, relatlimab)
- Bortezomib
- Pertuzumab (fixed doses: 840mg loading, 420mg maintenance)
- Oral targeted therapies (CDK4/6i, PARPi, EGFRi, ALKi, BTKi, TKIs, PI3Ki, BCL-2i, FLT3i, IDHi, FGFRi, Hedgehog, RETi, TRKi, BRAF/MEKi, multi-kinase inhibitors, mTORi, etc.)
- Hormonal therapies (tamoxifen, AIs, SERDs, GnRH agonists, anti-androgens, abiraterone)

**Rounding tiers for chemo drugs:**
| Dose range | Round to |
|---|---|
| < 10 mg | nearest 1 mg |
| 10–99 mg | nearest 5 mg |
| 100–499 mg | nearest 10 mg |
| 500–999 mg | nearest 50 mg |
| 1000–1999 mg | nearest 50 mg |
| ≥ 2000 mg | nearest 100 mg |

**Vincristine special rule:**
- EPOCH regimens (R-DA-EPOCH, DA-EPOCH, R-EPOCH, EPOCH): no rounding
- All other regimens: cap at 2 mg max

---

## Dose Calculation Logic (`calculateDoses`)

```
unit = "mg/m²"  →  dose × BSA
unit = "mg/kg"  →  dose × weight_kg
unit = "AUC"    →  Calvert formula (AUC × (CrCl + 25))
unit = flat     →  dose as-is (no calculation)
```

**Loading dose support**: drugs with `hasLoadingDose: true` have both `dose` (loading) and `maintenanceDose`. Output shown as `"loading → maintenance"`.

---

## Protocol Selection: 3 Paths

Users can select a protocol via any of these, validated in `validatePage2()`:

1. **Global search** (`selectedSearchProtocol`) — fuzzy full-database search
2. **Cancer-specific search** (`selectedCancerSearchProtocol`) — search within selected cancer type
3. **Browse dropdowns** — Cancer type → Subtype → Setting → Protocol

---

## Search System

### `buildProtocolIndex()` / `buildCancerSpecificIndex(cancerType)`
Builds flat arrays of all protocols with searchable text including:
- Protocol name, drug names, cancer type, subtype, setting
- Search aliases (abbreviations, synonyms) via `generateSearchAliases()`

### Key Aliases Supported
- `5-fluorouracil` → `5fu`, `5-fu`, `fluorouracil`
- oxaliplatin+5FU+leucovorin → `folfox`
- irinotecan+5FU+leucovorin → `folfiri`
- capecitabine+oxaliplatin → `xelox`, `capox`
- bortezomib+lenalidomide+dexamethasone → `vrd`, `vld`
- Cancer synonyms: gastric→stomach, renal→kidney, hepatocellular→hcc/liver, etc.

### Supportive drugs excluded from search
`['folic acid', 'vitamin b12', 'vitcofol']`

---

## Page Navigation

`showPage(pageNumber)` — hides all `.page` elements, shows `#page{N}`, updates progress bar and step indicators. Scrolls to top.

Validation runs before advancing:
- `validatePage1()` — requires (height + weight + sex) OR (direct BSA)
- `validatePage2()` — requires protocol selection + carboplatin params if needed

---

## PRD Rules (Must Follow When Editing Data)

1. **Verify against NCCN/ESMO** before adding/keeping any regimen
2. **Landmark trial names** in brackets: `[KEYNOTE-590]`, `[CheckMate 77T]` — no "Author et al."
3. **No setting labels in regimen names**: no `(Metastatic)`, `(Adjuvant)` etc. in the `name` field
4. **Functional labels OK**: `(NCCN Preferred)`, `(Investigational)`, `(PD-L1 irrespective)`, etc.
5. **Cycle counts required** in schedule strings for neoadjuvant/adjuvant/perioperative: `"D1, every 21 days x 6 cycles"`
6. **Sequential regimens** (e.g. AC→T): each phase states its own cycles: `"x 4 cycles"` / `"x 4 cycles (after 4 cycles AC)"`
7. **mg/kg drugs**: do NOT convert to flat doses unless guidelines changed
8. **Carboplatin**: every carboplatin regimen must trigger AUC/creatinine fields
9. **One cancer at a time**: complete all corrections before moving to the next
10. **Always present proposed changes** to user before editing

---

## Development Guidelines Summary

### Regimen Ordering (within each setting)
- Combination therapies before monotherapies
- Preferred/standard regimens first, then alternatives
- Immunotherapy combinations grouped
- Salvage/less common at end
- Metastatic: order by clinical frequency

### Setting Order (solid tumors)
1. neoadjuvant → 2. perioperative → 3. adjuvant → 4. definitive → 5. metastatic

### Setting Order (hematologic malignancies)
1. First-line → 2. Second-line → 3. Relapsed/refractory

---

## Analytics

Google Analytics 4 integrated. Key events tracked:
- Page views via `trackPageView(pageName)` (called in `showPage()`)
- Protocol selection and calculation events

`typeof trackAnalyticsEvent !== 'undefined'` guards all GA calls.

---

## Common Pitfalls

- **`checkForCarboplatin` missing `setting` param** — causes carboplatin AUC fields not to appear
- **Adding a new cancer subtype without updating `populateSubtypes()`** — subtype won't show in dropdown
- **Adding a new clinical setting without updating all 3 locations** — setting won't appear in dropdown
- **Adding a new subtyped cancer type without updating `checkForCarboplatin`'s hardcoded list** — carboplatin detection will break for that cancer type (the function has a long `if/else if` chain listing all subtyped cancer types by name)
- **Forgetting `x N cycles` in schedule** for adjuvant/neoadjuvant regimens

---

## 38 Cancer Types in Database

adrenocortical, anal, basal_cell, biliary, bladder, bone\*, brain\*, breast\*, carcinoma_unknown_primary, cervical, colorectal\*, endometrial, esophageal, gastric, gist, head_neck, hepatocellular, leukemia\*, lung\*, lymphoma\*, melanoma, merkel_cell, mesothelioma, multiple_myeloma, neuroendocrine, ovarian, pancreatic, penile, prostate, renal, sarcoma, stem_cell_transplant, testicular, thymoma, thyroid\*, tumor_agnostic, ureteric_urethral, vulvar_vaginal

\* = has subtypes (require subtype dropdown)
