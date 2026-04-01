// Chemotherapy Protocol Calculator
// BSA calculation using Mosteller's formula: BSA = sqrt((height × weight) / 3600)

const protocolDatabase = {
    breast: {}, // Loaded from data/breast.json
    gastric: {}, // Loaded from data/gastric.json
    lymphoma: {}, // Loaded from data/lymphoma.json
    melanoma: {}, // Loaded from data/melanoma.json
    ovarian: {}, // Loaded from data/ovarian.json
    prostate: {}, // Loaded from data/prostate.json
    renal: {}, // Loaded from data/renal.json
    stem_cell_transplant: {}, // Loaded from data/stem_cell_transplant.json
    testicular: {}, // Loaded from data/testicular.json
    sarcoma: {}, // Loaded from data/sarcoma.json
    hepatocellular: {}, // Loaded from data/hepatocellular.json
    bone: {}, // Loaded from data/bone.json
    thymoma: {}, // Loaded from data/thymoma.json
    thyroid: {}, // Loaded from data/thyroid.json
    pancreatic: {}, // Loaded from data/pancreatic.json
    anal: {}, // Loaded from data/anal.json
    biliary: {}, // Loaded from data/biliary.json
    bladder: {}, // Loaded from data/bladder.json
    multiple_myeloma: {}, // Loaded from data/multiple_myeloma.json
    penile: {}, // Loaded from data/penile.json
    vulvar_vaginal: {}, // Loaded from data/vulvar_vaginal.json
    mesothelioma: {}, // Loaded from data/mesothelioma.json
    merkel_cell: {}, // Loaded from data/merkel_cell.json
    carcinoma_unknown_primary: {}, // Loaded from data/carcinoma_unknown_primary.json
    adrenocortical: {}, // Loaded from data/adrenocortical.json
    basal_cell: {}, // Loaded from data/basal_cell.json
    brain: {}, // Loaded from data/brain.json
    gist: {}, // Loaded from data/gist.json
    tumor_agnostic: {}, // Loaded from data/tumor_agnostic.json
    ureteric_urethral: {}, // Loaded from data/ureteric_urethral.json
    neuroendocrine: {}, // Loaded from data/neuroendocrine.json
    cervical: {}, // Loaded from data/cervical.json
    endometrial: {}, // Loaded from data/endometrial.json
    colorectal: {}, // Loaded from data/colorectal.json
    esophageal: {}, // Loaded from data/esophageal.json
    head_neck: {}, // Loaded from data/head_neck.json
    leukemia: {}, // Loaded from data/leukemia.json
    lung: {} // Loaded from data/lung.json
};

// Load external protocol data
function loadExternalProtocols() {
    if (!window.protocolData) {
        console.error('✗ No protocol data found. Ensure data/*.js files are loaded before app.js');
        return;
    }
    const cancerTypes = Object.keys(window.protocolData);
    cancerTypes.forEach(cancerType => {
        protocolDatabase[cancerType] = window.protocolData[cancerType];
    });
    console.log(`✓ Loaded ${cancerTypes.length} protocol files`);
}


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

// Get display label for clinical setting key
function getSettingLabel(setting) {
    const labels = {
        neoadjuvant: 'Neoadjuvant', adjuvant: 'Adjuvant', perioperative: 'Perioperative',
        definitive: 'Definitive', locally_advanced: 'Locally Advanced', primary_treatment: 'Primary Treatment',
        maintenance: 'Maintenance', metastatic: 'Metastatic', recurrent_progressive: 'Recurrent/Progressive',
        relapsed_refractory: 'Relapsed/Refractory', unresectable_recurrent: 'Unresectable/Recurrent',
        mcspc: 'Metastatic Castration-Sensitive (mCSPC)', nmcrpc: 'Non-Metastatic Castration-Resistant (nmCRPC)',
        mcrpc: 'Metastatic Castration-Resistant (mCRPC)', autologous: 'Autologous SCT Conditioning',
        allogeneic_mac: 'Allogeneic Myeloablative (MAC)', allogeneic_ric: 'Allogeneic Reduced Intensity / Non-Myeloablative'
    };
    return labels[setting] || setting || '';
}

// Populate subtype dropdown for breast cancer and lung cancer
// Populate clinical settings dropdown
function populateSettings(cancerType, subtype) {
    const settingGroup = document.getElementById('clinicalSettingGroup');
    const settingSelect = document.getElementById('clinicalSetting');
    const protocolSelect = document.getElementById('protocol');
    
    // Reset
    settingSelect.innerHTML = '<option value="">Select clinical setting</option>';
    protocolSelect.innerHTML = '<option value="">Select protocol</option>';
    settingSelect.disabled = true;
    protocolSelect.disabled = true;
    settingGroup.style.display = 'none';
    
    if (!cancerType) return;
    
    // Get the settings object
    let settingsObj;
    if (subtype && protocolDatabase[cancerType] && protocolDatabase[cancerType][subtype]) {
        settingsObj = protocolDatabase[cancerType][subtype];
    } else if (protocolDatabase[cancerType]) {
        settingsObj = protocolDatabase[cancerType];
    }
    
    if (settingsObj) {
        const settings = ['neoadjuvant', 'adjuvant', 'perioperative', 'definitive', 'locally_advanced', 'primary_treatment', 'maintenance', 'metastatic', 'recurrent_progressive', 'relapsed_refractory', 'unresectable_recurrent', 'mcspc', 'nmcrpc', 'mcrpc', 'autologous', 'allogeneic_mac', 'allogeneic_ric'];
        const settingLabels = {
            neoadjuvant: 'Neoadjuvant',
            adjuvant: 'Adjuvant',
            perioperative: 'Perioperative',
            definitive: 'Definitive',
            locally_advanced: 'Locally Advanced',
            primary_treatment: 'Primary Treatment',
            maintenance: 'Maintenance',
            metastatic: 'Metastatic',
            recurrent_progressive: 'Recurrent/Progressive',
            relapsed_refractory: 'Relapsed/Refractory',
            unresectable_recurrent: 'Unresectable/Recurrent',
            mcspc: 'Metastatic Castration-Sensitive (mCSPC)',
            nmcrpc: 'Non-Metastatic Castration-Resistant (nmCRPC)',
            mcrpc: 'Metastatic Castration-Resistant (mCRPC)',
            autologous: 'Autologous SCT Conditioning',
            allogeneic_mac: 'Allogeneic Myeloablative (MAC)',
            allogeneic_ric: 'Allogeneic Reduced Intensity / Non-Myeloablative'
        };
        
        settings.forEach(setting => {
            if (settingsObj[setting] && Object.keys(settingsObj[setting]).length > 0) {
                const option = document.createElement('option');
                option.value = setting;
                option.textContent = settingLabels[setting];
                settingSelect.appendChild(option);
            }
        });

        // Count actual settings (excluding placeholder)
        const realOptions = settingSelect.querySelectorAll('option[value]:not([value=""])');

        if (realOptions.length === 1) {
            // Only one setting available - auto-select it and skip showing the dropdown
            settingSelect.value = realOptions[0].value;
            settingGroup.style.display = 'none';
            settingSelect.disabled = false;
            // Auto-populate protocols
            const cancerType = document.getElementById('cancerType').value;
            populateProtocols(cancerType, subtype, realOptions[0].value);
        } else {
            settingGroup.style.display = 'block';
            settingSelect.disabled = false;
        }
    }
}

function populateSubtypes(cancerType) {
    const subtypeGroup = document.getElementById('subtypeGroup');
    const subtypeSelect = document.getElementById('cancerSubtype');
    const protocolSelect = document.getElementById('protocol');
    const settingGroup = document.getElementById('clinicalSettingGroup');
    const settingSelect = document.getElementById('clinicalSetting');
    
    
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
    } else if (cancerType === 'brain') {
        subtypeGroup.style.display = 'block';
        subtypeSelect.disabled = false;
        subtypeSelect.required = true;
        subtypeSelect.innerHTML = '<option value="">Select brain tumor type</option>';

        const subtypes = {
            'glioblastoma': 'Glioblastoma (GBM)',
            'glioma_grade2_3': 'Glioma Grade 2-3 (Astrocytoma/Oligodendroglioma)',
            'medulloblastoma': 'Medulloblastoma',
            'ependymoma': 'Ependymoma',
            'diffuse_midline_glioma': 'Diffuse Midline Glioma (DMG)'
        };

        Object.keys(subtypes).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = subtypes[key];
            subtypeSelect.appendChild(option);
        });

        // Reset protocol dropdown
        protocolSelect.innerHTML = '<option value="">Select brain tumor type first</option>';
        protocolSelect.disabled = true;
    } else {
        subtypeGroup.style.display = 'none';
    settingGroup.style.display = 'none';
    settingSelect.disabled = true;
        subtypeSelect.disabled = true;
        subtypeSelect.required = false;
        subtypeSelect.value = '';
        populateSettings(cancerType, null, null);
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
function populateProtocols(cancerType, subtype, setting) {
    const protocolSelect = document.getElementById('protocol');
    protocolSelect.innerHTML = '<option value="">Select regimen</option>';
    protocolSelect.disabled = true;
    
    if (!cancerType || !setting) return;
    
    let protocols;
    
    // Navigate based on subtype
    if (subtype && protocolDatabase[cancerType] && protocolDatabase[cancerType][subtype]) {
        protocols = protocolDatabase[cancerType][subtype][setting];
    } else if (protocolDatabase[cancerType]) {
        protocols = protocolDatabase[cancerType][setting];
    }
    
    if (protocols && Object.keys(protocols).length > 0) {
        protocolSelect.disabled = false;
        Object.keys(protocols).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = protocols[key].name;
            protocolSelect.appendChild(option);
        });
    } else {
        protocolSelect.innerHTML = '<option value="">No protocols for this setting</option>';
    }
}

// Check if protocol contains carboplatin and show/hide AUC dropdown
function checkForCarboplatin(protocolKey, cancerType, subtype, setting) {
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
        
        if ((cancerType === 'breast' || cancerType === 'lung' || cancerType === 'lymphoma' || cancerType === 'leukemia' || cancerType === 'colorectal' || cancerType === 'thyroid' || cancerType === 'bone' || cancerType === 'brain') && subtype && protocolDatabase[cancerType][subtype]) {
            if (setting && protocolDatabase[cancerType][subtype][setting]) {
                protocolData = protocolDatabase[cancerType][subtype][setting][protocolKey];
            } else {
                protocolData = protocolDatabase[cancerType][subtype][protocolKey];
            }
        } else if (cancerType !== 'breast' && cancerType !== 'lung' && cancerType !== 'lymphoma' && cancerType !== 'leukemia' && cancerType !== 'colorectal' && cancerType !== 'thyroid' && cancerType !== 'bone' && cancerType !== 'brain') {
            if (setting && protocolDatabase[cancerType][setting]) {
                protocolData = protocolDatabase[cancerType][setting][protocolKey];
            } else {
                protocolData = protocolDatabase[cancerType][protocolKey];
            }
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
    const { height, weight, directBSA, age, sex, creatinine, cancerType, cancerSubtype, protocol, auc, setting } = formData;

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

    // Find protocol in restructured database with clinical setting
    let protocolData;
    if (cancerSubtype && protocolDatabase[cancerType] && protocolDatabase[cancerType][cancerSubtype]) {
        // Has subtype - navigate: cancerType -> subtype -> setting -> protocol
        protocolData = protocolDatabase[cancerType][cancerSubtype][setting][protocol];
    } else if (protocolDatabase[cancerType]) {
        // No subtype - navigate: cancerType -> setting -> protocol
        protocolData = protocolDatabase[cancerType][setting][protocol];
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
        cyclesNote: protocolData.cyclesNote || null,
        drugs: calculatedDrugs,
        hasCarboplatin: hasCarboplatin,
        selectedAuc: auc ? parseFloat(auc) : null,
        reference: reference,
        protocolKey: protocol,
        cancerType: cancerType,
        subtype: cancerSubtype || null,
        setting: setting
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
        5: 'Final Prescription',
        6: 'Supportive Care & Print'
    };
    
    if (typeof trackPageView !== 'undefined') {
        trackPageView(pageNames[pageNumber] || `Page ${pageNumber}`);
    }
    
    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    const maxPages = 5; // Progress bar still reflects steps 1–5
    const progressPercent = (Math.min(pageNumber, maxPages) / maxPages) * 100;
    progressFill.style.width = `${progressPercent}%`;

    // Update step indicators
    document.querySelectorAll('.step-circle').forEach(circle => {
        const step = parseInt(circle.dataset.step);
        circle.classList.remove('active', 'completed');
        if (step === pageNumber) circle.classList.add('active');
        else if (step < pageNumber) circle.classList.add('completed');
    });
    document.querySelectorAll('.step-line').forEach(line => {
        const lineStep = parseInt(line.dataset.line);
        line.classList.toggle('completed', lineStep < pageNumber);
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function showValidationError(pageId, message) {
    const errorDiv = document.getElementById(pageId);
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        // Auto-hide after 6 seconds
        clearTimeout(errorDiv._hideTimer);
        errorDiv._hideTimer = setTimeout(() => { errorDiv.style.display = 'none'; }, 6000);
    }
}

function clearValidationError(pageId) {
    const errorDiv = document.getElementById(pageId);
    if (errorDiv) {
        errorDiv.style.display = 'none';
        clearTimeout(errorDiv._hideTimer);
    }
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

    function fail(msg) {
        showValidationError('page2Error', msg);
        return false;
    }

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
                return fail('Please enter a valid AUC value (1–10) for this carboplatin protocol.');
            }
            if (!age) {
                return fail('Please enter the patient age for carboplatin dosing calculation.');
            }
            if (!creatinine) {
                return fail('Please enter the patient creatinine level for carboplatin dosing calculation.');
            }
        }
        clearValidationError('page2Error');
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
                return fail('Please enter a valid AUC value (1–10) for this carboplatin protocol.');
            }
            if (!age) {
                return fail('Please enter the patient age for carboplatin dosing calculation.');
            }
            if (!creatinine) {
                return fail('Please enter the patient creatinine level for carboplatin dosing calculation.');
            }
        }
        clearValidationError('page2Error');
        return true;
    }

    // Check if protocol is selected via browse
    const cancerType = document.getElementById('cancerType').value;
    const protocol = document.getElementById('protocol').value;

    console.log('Browse selection - cancerType:', cancerType, 'protocol:', protocol); // Debug log

    if (!cancerType || !protocol) {
        return fail('Please either search for a protocol above or select a cancer type and protocol below.');
    }

    // Check if cancer type requires subtype
    if (cancerType === 'breast' || cancerType === 'lung' || cancerType === 'lymphoma' || cancerType === 'leukemia' || cancerType === 'colorectal' || cancerType === 'thyroid' || cancerType === 'bone' || cancerType === 'brain') {
        const subtype = document.getElementById('cancerSubtype').value;
        if (!subtype) {
            const names = { breast: 'breast cancer', lung: 'lung cancer', lymphoma: 'lymphoma', leukemia: 'leukemia', colorectal: 'colorectal cancer', thyroid: 'thyroid cancer', bone: 'bone cancer', brain: 'brain tumor' };
            return fail(`Please select a ${names[cancerType] || 'cancer'} subtype.`);
        }
    }

    // Check if carboplatin protocol requires AUC, age, and creatinine
    const aucGroup = document.getElementById('aucGroup');
    if (aucGroup.style.display !== 'none') {
        const auc = document.getElementById('auc').value;
        const age = document.getElementById('age').value;
        const creatinine = document.getElementById('creatinine').value;

        if (!auc) {
            return fail('Please select an AUC value for this carboplatin protocol.');
        }
        if (!age) {
            return fail('Please enter the patient age for carboplatin dosing calculation.');
        }
        if (!creatinine) {
            return fail('Please enter the patient creatinine level for carboplatin dosing calculation.');
        }
    }

    clearValidationError('page2Error');
    return true;
}

// Search functionality
let allProtocols = [];
let selectedSearchProtocol = null;

// Supportive drugs to exclude from therapeutic drug count (supplements, not searched by users)
const SUPPORTIVE_DRUGS = ['folic acid', 'vitamin b12', 'vitcofol'];

// Helper: extract therapeutic drug names from a protocol's drug list
function getTherapeuticDrugs(protocol) {
    if (!protocol.drugs) return [];
    return protocol.drugs
        .map(drug => drug.name)
        .filter(name => !SUPPORTIVE_DRUGS.includes(name.toLowerCase()));
}

// Generate search aliases for common drug abbreviations, brand names, and biomarkers
function generateSearchAliases(text) {
        let aliases = text;
        
        // === CANCER TYPE SYNONYMS ===
        // Add cancer type synonyms to search text
        if (text.includes('gastric cancer')) {
            aliases += ' stomach gastro';
        }
        if (text.includes('brain cancer')) {
            aliases += ' glioma glioblastoma glia gbm';
        }
        if (text.includes('hepatocellular')) {
            aliases += ' liver hepatic hcc';
        }
        if (text.includes('renal')) {
            aliases += ' kidney';
        }
        if (text.includes('leukemia')) {
            aliases += ' blood haematological hematological';
        }
        if (text.includes('lung cancer')) {
            aliases += ' pulmonary respiratory';
        }
        if (text.includes('head') && text.includes('neck')) {
            aliases += ' hnc head-neck';
        }
        if (text.includes('colorectal')) {
            aliases += ' crc colon rectal bowel';
        }
        if (text.includes('pancreatic')) {
            aliases += ' pancreas pdac';
        }
        if (text.includes('ovarian')) {
            aliases += ' ovary ovaries';
        }
        if (text.includes('endometrial')) {
            aliases += ' uterine uterus endometrium';
        }
        if (text.includes('cervical')) {
            aliases += ' cervix';
        }
        if (text.includes('bladder')) {
            aliases += ' urothelial';
        }
        if (text.includes('testicular')) {
            aliases += ' testes testis';
        }
        if (text.includes('prostate')) {
            aliases += ' prostatic';
        }
        if (text.includes('esophageal')) {
            aliases += ' esophagus oesophageal oesophagus';
        }
        if (text.includes('lymphoma')) {
            aliases += ' lymph nodes lymphatic';
        }
        
        // === BASIC DRUG ABBREVIATIONS ===
        // 5-FU variations
        if (text.includes('5-fluorouracil')) {
            aliases += ' 5fu 5 fu 5-fu fluorouracil';
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
        if (text.includes('trastuzumab')) {
            aliases += ' herceptin trastu';
        }
        
        // === ENHANCED BIOMARKER & TARGET SEARCH ===
        // EGFR-related — class-level aliases
        if (text.includes('egfr') || text.includes('osimertinib') || text.includes('erlotinib') || text.includes('afatinib') || text.includes('gefitinib') || text.includes('mobocertinib') || text.includes('exon19') || text.includes('l858r') || text.includes('exon20')) {
            aliases += ' egfr egfr-positive egfr+ egfr-mutated egfr-mutation egfr-targeted exon19del l858r exon20';
        }
        // EGFR — drug-specific aliases (only added when that drug is present)
        if (text.includes('osimertinib')) aliases += ' tagrisso osimertinib';
        if (text.includes('erlotinib')) aliases += ' tarceva erlotinib';
        if (text.includes('gefitinib')) aliases += ' iressa gefitinib';
        if (text.includes('afatinib')) aliases += ' gilotrif afatinib';
        if (text.includes('mobocertinib')) aliases += ' exkivity mobocertinib';

        // ALK-related — class-level aliases
        if (text.includes('alk') || text.includes('alectinib') || text.includes('crizotinib') || text.includes('brigatinib') || text.includes('lorlatinib') || text.includes('rearrangement')) {
            aliases += ' alk alk-positive alk+ alk-rearrangement alk-fusion alk-targeted';
        }
        // ALK — drug-specific aliases
        if (text.includes('alectinib')) aliases += ' alecensa alectinib';
        if (text.includes('crizotinib')) aliases += ' xalkori crizotinib';
        if (text.includes('brigatinib')) aliases += ' alunbrig brigatinib';
        if (text.includes('lorlatinib')) aliases += ' lorbrena lorlatinib';

        // PD-1/PD-L1 immunotherapy — class-level aliases
        if (text.includes('pd-1') || text.includes('pdl1') || text.includes('pd-l1') || text.includes('pembrolizumab') || text.includes('nivolumab') || text.includes('cemiplimab') || text.includes('dostarlimab') || text.includes('atezolizumab') || text.includes('durvalumab') || text.includes('avelumab')) {
            aliases += ' pd1 pd-1 pdl1 pd-l1 immunotherapy checkpoint-inhibitor checkpoint immune';
        }
        // PD-1/PD-L1 — drug-specific aliases (only added when that drug is present)
        if (text.includes('pembrolizumab')) aliases += ' keytruda pembro pembrolizumab';
        if (text.includes('nivolumab')) aliases += ' opdivo nivo nivolumab';
        if (text.includes('cemiplimab')) aliases += ' libtayo cemiplimab';
        if (text.includes('dostarlimab')) aliases += ' jemperli dostarlimab';
        if (text.includes('atezolizumab')) aliases += ' tecentriq atezo atezolizumab';
        if (text.includes('durvalumab')) aliases += ' imfinzi durva durvalumab';
        if (text.includes('avelumab')) aliases += ' bavencio avelumab';

        // CTLA-4 — class-level aliases
        if (text.includes('ctla') || text.includes('ipilimumab') || text.includes('tremelimumab')) {
            aliases += ' ctla4 ctla-4 immunotherapy checkpoint-inhibitor checkpoint immune';
        }
        // CTLA-4 — drug-specific aliases
        if (text.includes('ipilimumab')) aliases += ' yervoy ipi ipilimumab';
        if (text.includes('tremelimumab')) aliases += ' tremelimumab';

        // HER2-related — class-level aliases
        if (text.includes('her2') || text.includes('trastuzumab') || text.includes('pertuzumab') || text.includes('t-dxd') || text.includes('t-dm1')) {
            aliases += ' her2 her2-positive her2+ her2-targeted her2-amplified';
        }
        // HER2 — drug-specific aliases
        if (text.includes('trastuzumab')) aliases += ' herceptin trastu trastuzumab';
        if (text.includes('pertuzumab')) aliases += ' perjeta pertuz pertuzumab';
        if (text.includes('t-dxd')) aliases += ' enhertu t-dxd';
        if (text.includes('t-dm1')) aliases += ' kadcyla t-dm1';

        // VEGF/VEGFR angiogenesis — class-level aliases
        if (text.includes('vegf') || text.includes('bevacizumab') || text.includes('ramucirumab') || text.includes('axitinib') || text.includes('pazopanib') || text.includes('angiogenesis')) {
            aliases += ' vegf vegfr vegfr2 angiogenesis';
        }
        // VEGF — drug-specific aliases
        if (text.includes('bevacizumab')) aliases += ' avastin bev bevacizumab';
        if (text.includes('ramucirumab')) aliases += ' cyramza ram ramucirumab';
        if (text.includes('axitinib')) aliases += ' inlyta axitinib';
        if (text.includes('pazopanib')) aliases += ' votrient pazopanib';

        // PARP inhibitors — class-level aliases
        if (text.includes('parp') || text.includes('olaparib') || text.includes('rucaparib') || text.includes('niraparib') || text.includes('talazoparib') || text.includes('brca')) {
            aliases += ' parp parp-inhibitor brca brca-positive brca+ brca1 brca2 hrr hrd homologous-recombination';
        }
        // PARP — drug-specific aliases
        if (text.includes('olaparib')) aliases += ' lynparza olaparib';
        if (text.includes('rucaparib')) aliases += ' rubraca rucaparib';
        if (text.includes('niraparib')) aliases += ' zejula niraparib';
        if (text.includes('talazoparib')) aliases += ' talzenna talazoparib';

        // ROS1
        if (text.includes('ros1') || text.includes('entrectinib')) {
            aliases += ' ros1 ros1-positive ros1+ ros1-rearrangement ros1-fusion entrectinib rozlytrek';
        }

        // NTRK/TRK
        if (text.includes('ntrk') || text.includes('trk') || text.includes('larotrectinib')) {
            aliases += ' ntrk trk ntrk-fusion trk-fusion entrectinib rozlytrek larotrectinib vitrakvi';
        }

        // BRAF — class-level aliases
        if (text.includes('braf') || text.includes('vemurafenib') || text.includes('dabrafenib') || text.includes('trametinib') || text.includes('v600')) {
            aliases += ' braf braf-mutated braf+ v600e v600k';
        }
        // BRAF — drug-specific aliases
        if (text.includes('vemurafenib')) aliases += ' zelboraf vemurafenib';
        if (text.includes('dabrafenib')) aliases += ' tafinlar dabrafenib';
        if (text.includes('trametinib')) aliases += ' mekinist trametinib';
        
        // MSI/MMR
        if (text.includes('msi') || text.includes('mmr') || text.includes('dmmr') || text.includes('microsatellite')) {
            aliases += ' msi msi-high msi-h mmr mmr-deficient dmmr microsatellite-instability mismatch-repair deficient';
        }
        
        // TMB
        if (text.includes('tmb') || text.includes('tumor-mutational') || text.includes('mutational-burden')) {
            aliases += ' tmb tumor-mutational-burden high-tmb tmb-high mutational-burden';
        }
        
        // === TREATMENT STAGE ALIASES ===
        if (text.includes('neoadjuvant')) {
            aliases += ' neoadjuvant neo-adjuvant preoperative pre-operative pre-surgery before-surgery induction neoadj neo';
        }
        if (text.includes('adjuvant')) {
            aliases += ' adjuvant postoperative post-operative post-surgery after-surgery maintenance adj post-op';
        }
        if (text.includes('metastatic')) {
            aliases += ' metastatic advanced stage-iv stage4 stage-4 palliative systemic met mets advanced-disease';
        }
        if (text.includes('locally advanced')) {
            aliases += ' locally-advanced locally advanced unresectable stage-iii stage3 stage-3 local-advanced';
        }
        if (text.includes('perioperative')) {
            aliases += ' perioperative peri-operative around-surgery peri-op';
        }
        if (text.includes('definitive')) {
            aliases += ' definitive concurrent chemoradiation chemoradiotherapy crt radiation';
        }
        
        // === CANCER-SPECIFIC ALIASES ===
        if (text.includes('nsclc') || text.includes('non-small cell lung') || text.includes('adenocarcinoma') || text.includes('squamous')) {
            aliases += ' nsclc non-small-cell-lung non-small-cell lung adenocarcinoma squamous-cell-carcinoma large-cell adeno squamous';
        }
        if (text.includes('sclc') || text.includes('small cell lung')) {
            aliases += ' sclc small-cell-lung small-cell oat-cell';
        }
        if (text.includes('triple negative') || text.includes('tnbc')) {
            aliases += ' triple-negative tnbc er-negative pr-negative her2-negative hormone-negative tn';
        }
        if (text.includes('hormone positive') || text.includes('er positive') || text.includes('pr positive')) {
            aliases += ' hormone-positive er-positive pr-positive estrogen-receptor progesterone-receptor luminal hormone-receptor';
        }
        
        return aliases;
}

// Build searchable protocol index
function buildProtocolIndex() {
    console.log('Building protocol index...'); // Debug log
    allProtocols = [];

    Object.keys(protocolDatabase).forEach(cancerType => {
        const cancerName = getCancerDisplayName(cancerType);
        
        // Check if this cancer type has subtypes by looking at first key
        const firstKey = Object.keys(protocolDatabase[cancerType])[0];
        const hasSubtypes = !['neoadjuvant', 'adjuvant', 'perioperative', 'definitive', 'locally_advanced', 'primary_treatment', 'maintenance', 'metastatic', 'recurrent_progressive', 'relapsed_refractory', 'unresectable_recurrent', 'mcspc', 'nmcrpc', 'mcrpc', 'autologous', 'allogeneic_mac', 'allogeneic_ric'].includes(firstKey);

        if (hasSubtypes) {
            // Has subtypes - iterate: subtype -> setting -> protocol
            Object.keys(protocolDatabase[cancerType]).forEach(subtype => {
                const subtypeName = getSubtypeDisplayName(subtype);
                Object.keys(protocolDatabase[cancerType][subtype]).forEach(setting => {
                    Object.keys(protocolDatabase[cancerType][subtype][setting]).forEach(protocolKey => {
                        const protocol = protocolDatabase[cancerType][subtype][setting][protocolKey];
                        const drugNames = protocol.drugs ? protocol.drugs.map(drug => drug.name).join(' ') : '';
                        const therapeuticDrugs = getTherapeuticDrugs(protocol);
                        const settingName = setting.charAt(0).toUpperCase() + setting.slice(1);
                        const baseSearchText = `${protocol.name} ${cancerName} ${subtypeName} ${settingName} ${drugNames}`.toLowerCase();
                        const searchText = generateSearchAliases(baseSearchText);

                        allProtocols.push({
                            key: protocolKey,
                            name: protocol.name,
                            cancerType: cancerType,
                            cancerName: `${cancerName} - ${subtypeName}`,
                            subtype: subtype,
                            setting: setting,
                            searchText: searchText,
                            searchTextNormalized: normalizeSearchString(searchText),
                            drugCount: therapeuticDrugs.length,
                            drugNames: therapeuticDrugs.map(n => n.toLowerCase())
                        });
                    });
                });
            });
        } else {
            // No subtypes - iterate: setting -> protocol
            Object.keys(protocolDatabase[cancerType]).forEach(setting => {
                Object.keys(protocolDatabase[cancerType][setting]).forEach(protocolKey => {
                    const protocol = protocolDatabase[cancerType][setting][protocolKey];
                    const drugNames = protocol.drugs ? protocol.drugs.map(drug => drug.name).join(' ') : '';
                    const therapeuticDrugs = getTherapeuticDrugs(protocol);
                    const settingName = setting.charAt(0).toUpperCase() + setting.slice(1);
                    const baseSearchText = `${protocol.name} ${cancerName} ${settingName} ${drugNames}`.toLowerCase();
                    const searchText = generateSearchAliases(baseSearchText);

                    allProtocols.push({
                        key: protocolKey,
                        name: protocol.name,
                        cancerType: cancerType,
                        cancerName: cancerName,
                        subtype: null,
                        setting: setting,
                        searchText: searchText,
                        searchTextNormalized: normalizeSearchString(searchText),
                        drugCount: therapeuticDrugs.length,
                        drugNames: therapeuticDrugs.map(n => n.toLowerCase())
                    });
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
        glioblastoma: 'Glioblastoma (GBM)',
        glioma_grade2_3: 'Glioma Grade 2-3 (Astrocytoma/Oligodendroglioma)',
        medulloblastoma: 'Medulloblastoma',
        ependymoma: 'Ependymoma',
        diffuse_midline_glioma: 'Diffuse Midline Glioma (DMG)',
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

// Helper function to normalize search strings for better matching with fuzzy search
function normalizeSearchString(text) {
    return text.toLowerCase()
        .replace(/[\-\+\(\)\/]/g, ' ')  // Replace common punctuation with spaces
        .replace(/\s+/g, ' ')           // Replace multiple spaces with single space
        .trim();
}

// Simple fuzzy matching function for handling spelling mistakes
function fuzzyMatch(query, text, threshold = 0.7) {
    if (query.length < 3) return text.includes(query);
    
    // Calculate Levenshtein distance ratio
    const distance = levenshteinDistance(query, text);
    const maxLength = Math.max(query.length, text.length);
    const similarity = 1 - (distance / maxLength);
    
    return similarity >= threshold;
}

// Calculate Levenshtein distance between two strings
function levenshteinDistance(str1, str2) {
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

// Enhanced fuzzy search for common medical misspellings
function handleCommonMisspellings(query) {
    const misspellings = {
        // Common drug misspellings
        'pembrolizumib': 'pembrolizumab',
        'pemrolizumab': 'pembrolizumab',
        'pembro': 'pembrolizumab',
        'nivolumib': 'nivolumab',
        'nivolomab': 'nivolumab',
        'nivo': 'nivolumab',
        'durva': 'durvalumab',
        'imfinzi': 'durvalumab',
        'atezo': 'atezolizumab',
        'tecentriq': 'atezolizumab',
        'trastazumab': 'trastuzumab',
        'trastuzamab': 'trastuzumab',
        'hercepten': 'herceptin',
        'trastuzu': 'trastuzumab',
        'osimertinab': 'osimertinib',
        'osimertnib': 'osimertinib',
        'tagresso': 'tagrisso',
        'carboplaten': 'carboplatin',
        'carboplatn': 'carboplatin',
        'cisplaten': 'cisplatin',
        'cisplatn': 'cisplatin',
        'paclitazel': 'paclitaxel',
        'pacilitaxel': 'paclitaxel',
        'docetazel': 'docetaxel',
        'docitaxel': 'docetaxel',
        
        // Biomarker misspellings
        'egrf': 'egfr',
        'efgr': 'egfr',
        'egfr+': 'egfr positive',
        'egfr-': 'egfr negative',
        'pdl1': 'pd-l1',
        'pd1': 'pd-1',
        'pdl-1': 'pd-l1',
        'pd-1+': 'pd-l1 positive',
        'her-2': 'her2',
        'her+': 'her2 positive',
        'her2+': 'her2 positive',
        'her2-': 'her2 negative',
        'alk+': 'alk positive',
        'alk-': 'alk negative',
        'brca+': 'brca positive',
        'brca-': 'brca negative',
        'msi+': 'msi high',
        'msi-': 'msi low',
        'msih': 'msi high',
        'msil': 'msi low',
        
        // Treatment stage misspellings
        'neoadjuvent': 'neoadjuvant',
        'neo-adjuvent': 'neoadjuvant',
        'neoadjuvent': 'neoadjuvant',
        'adjuvent': 'adjuvant',
        'metastetic': 'metastatic',
        'metastatic': 'metastatic',
        'mestastatic': 'metastatic',
        'localy advanced': 'locally advanced',
        'locally advansed': 'locally advanced',
        
        // Cancer type synonyms and misspellings - map to database names
        'nsclc': 'lung',
        'sclc': 'lung',
        'pulmonary': 'lung',
        'respiratory': 'lung',
        'tnbc': 'triple negative breast',
        'gasterick': 'gastric',
        'stomach': 'gastric',
        'gastro': 'gastric',
        'liver': 'hepatocellular',
        'hepatic': 'hepatocellular',
        'hcc': 'hepatocellular',
        'kidney': 'renal',
        'renal-cell': 'renal',
        'rcc': 'renal',
        'glioma': 'brain',
        'glioblastoma': 'brain',
        'gbm': 'brain',
        'astrocytoma': 'brain',
        'cns': 'brain',
        'blood': 'leukemia',
        'hematologic': 'leukemia',
        'aml': 'leukemia',
        'cml': 'leukemia',
        'cll': 'leukemia',
        'myeloma': 'leukemia',
        'hodgkin': 'lymphoma',
        'nhl': 'lymphoma',
        'oral': 'head neck',
        'throat': 'head neck',
        'mouth': 'head neck',
        'tongue': 'head neck',
        'larynx': 'head neck',
        'gallbladder': 'biliary',
        'gall-bladder': 'biliary',
        'bile-duct': 'biliary',
        'bowel': 'colorectal',
        'colon': 'colorectal',
        'rectal': 'colorectal',
        'intestinal': 'colorectal',
        'colectal': 'colorectal',
        'colorectel': 'colorectal',
        'hepatocelular': 'hepatocellular',
        'hepatocelluar': 'hepatocellular',
        'uterine': 'endometrial',
        'uterus': 'endometrial',
        'cervix': 'cervical',
        'ovary': 'ovarian',
        'testis': 'testicular',
        'penis': 'penile',
        'skin': 'melanoma',
        'pancreas': 'pancreatic',
        'pdac': 'pancreatic',
        'esophagus': 'esophageal',
        'thymus': 'thymoma',
        'bone': 'bone',
        'sarcoma': 'bone'
    };
    
    let correctedQuery = query.toLowerCase().trim();
    
    // Check for exact misspelling matches first
    Object.keys(misspellings).forEach(misspelling => {
        const regex = new RegExp(`\\b${misspelling}\\b`, 'gi');
        correctedQuery = correctedQuery.replace(regex, misspellings[misspelling]);
    });
    
    return correctedQuery;
}

// Stores correction info for display, e.g. { original: 'pembrolizumib', corrected: 'pembrolizumab' }
let lastSearchCorrection = null;

function searchProtocols(query) {
    if (!query || query.length < 2) return [];

    // First handle common misspellings
    const correctedQuery = handleCommonMisspellings(query);
    const queryLower = correctedQuery.toLowerCase();
    const queryNormalized = normalizeSearchString(correctedQuery);

    // Track if a correction was made
    if (correctedQuery.toLowerCase() !== query.toLowerCase()) {
        lastSearchCorrection = { original: query, corrected: correctedQuery };
    } else {
        lastSearchCorrection = null;
    }

    console.log(`Search: "${query}" -> "${correctedQuery}"`); // Debug

    const queryWords = queryNormalized.split(' ').filter(word => word.length > 1);
    if (queryWords.length === 0) return [];

    // Cancer type synonym mapping
    const cancerSynonymMap = {
        'lung': 'lung',
        'breast': 'breast',
        'gastric': 'gastric',
        'stomach': 'gastric',
        'colorectal': 'colorectal',
        'colon': 'colorectal',
        'rectal': 'colorectal',
        'bowel': 'colorectal',
        'brain': 'brain',
        'glioma': 'brain',
        'glioblastoma': 'brain',
        'gbm': 'brain',
        'hepatocellular': 'hepatocellular',
        'liver': 'hepatocellular',
        'renal': 'renal',
        'kidney': 'renal',
        'pancreatic': 'pancreatic',
        'pancreas': 'pancreatic',
        'head': 'head_neck',
        'neck': 'head_neck',
        'esophageal': 'esophageal',
        'esophagus': 'esophageal',
        'oesophageal': 'esophageal',
        'leukemia': 'leukemia',
        'lymphoma': 'lymphoma',
        'ovarian': 'ovarian',
        'ovary': 'ovarian',
        'endometrial': 'endometrial',
        'uterine': 'endometrial',
        'cervical': 'cervical',
        'cervix': 'cervical',
        'prostate': 'prostate',
        'bladder': 'bladder',
        'urothelial': 'bladder',
        'testicular': 'testicular',
        'penile': 'penile',
        'melanoma': 'melanoma',
        'bone': 'bone',
        'thyroid': 'thyroid',
        'biliary': 'biliary',
        'anal': 'anal',
        'mesothelioma': 'mesothelioma',
        'thymoma': 'thymoma',
        'neuroendocrine': 'neuroendocrine',
        'gist': 'gist',
        'vulvar': 'vulvar_vaginal',
        'vaginal': 'vulvar_vaginal',
        'adrenocortical': 'adrenocortical',
        'basal': 'basal_cell',
        'merkel': 'merkel_cell',
        'myeloma': 'multiple_myeloma',
        'sarcoma': 'sarcoma'
    };

    const cancerTerms = Object.keys(cancerSynonymMap);
    const allCancerRelatedTerms = [...cancerTerms, 'cancer', 'carcinoma', 'adenocarcinoma', 'squamous', 'cell', 'tumor', 'neoplasm', 'triple', 'negative'];

    // Detect cancer type from query
    const queryCancerWord = queryWords.find(word => cancerTerms.includes(word));
    const mappedCancerType = queryCancerWord ? cancerSynonymMap[queryCancerWord] : null;

    // Separate non-cancer search terms (drug names, biomarkers, settings, etc.)
    const nonCancerWords = queryWords.filter(word => !allCancerRelatedTerms.includes(word));

    // For single-word queries with no cancer type, try exact substring first
    if (queryWords.length === 1 && !mappedCancerType) {
        const exactResults = allProtocols.filter(protocol =>
            protocol.searchText.includes(queryLower) ||
            protocol.searchTextNormalized.includes(queryNormalized)
        );

        if (exactResults.length > 0) {
            exactResults.sort((a, b) => {
                const aNameMatch = a.name.toLowerCase().includes(queryLower);
                const bNameMatch = b.name.toLowerCase().includes(queryLower);
                if (aNameMatch && !bNameMatch) return -1;
                if (!aNameMatch && bNameMatch) return 1;
                return a.name.localeCompare(b.name);
            });
            return exactResults.slice(0, 50);
        }
    }

    // Multi-word or cancer-type-specific search: score every protocol
    const scoredResults = allProtocols.map(protocol => {
        const protocolText = protocol.searchTextNormalized;
        const protocolWords = protocolText.split(' ');
        let score = 0;

        // If a cancer type is specified in query, filter strictly
        if (mappedCancerType) {
            if (protocol.cancerType !== mappedCancerType) {
                return { protocol, score: -1 }; // Exclude entirely
            }
            score += 5; // Boost for matching cancer type
        }

        // Score each non-cancer query word
        nonCancerWords.forEach(queryWord => {
            // Biomarker-specific matching
            if (['egfr', 'alk', 'ros1', 'ntrk', 'braf'].includes(queryWord)) {
                const biomarkerDrugs = {
                    'egfr': ['egfr', 'osimertinib', 'erlotinib', 'gefitinib', 'afatinib', 'mobocertinib', 'exon19', 'l858r', 'exon20'],
                    'alk': ['alk', 'alectinib', 'crizotinib', 'brigatinib', 'lorlatinib', 'rearrangement'],
                    'ros1': ['ros1', 'entrectinib'],
                    'ntrk': ['ntrk', 'larotrectinib', 'entrectinib'],
                    'braf': ['braf', 'vemurafenib', 'dabrafenib', 'trametinib', 'v600']
                };
                if (protocolWords.some(word => biomarkerDrugs[queryWord].some(bm => word.includes(bm)))) {
                    score += 4;
                }
            }
            // PD-1/PD-L1 immunotherapy
            else if (['pd', 'pd1', 'pdl1', 'immunotherapy', 'checkpoint'].includes(queryWord)) {
                if (protocolWords.some(word => ['pd', 'pd1', 'pdl1', 'pembrolizumab', 'nivolumab', 'atezolizumab', 'durvalumab', 'cemiplimab', 'dostarlimab', 'avelumab', 'immunotherapy', 'checkpoint'].includes(word))) {
                    score += 4;
                }
            }
            // HER2
            else if (['her2', 'herceptin', 'trastuzumab'].includes(queryWord)) {
                if (protocolWords.some(word => ['her2', 'trastuzumab', 'pertuzumab', 't', 'dxd', 'dm1', 'herceptin'].includes(word) || word.includes('her2') || word.includes('trastuzumab'))) {
                    score += 4;
                }
            }
            // VEGF
            else if (['vegf', 'vegfr', 'angiogenesis', 'bevacizumab', 'avastin'].includes(queryWord)) {
                if (protocolWords.some(word => ['vegf', 'vegfr', 'bevacizumab', 'ramucirumab', 'axitinib', 'pazopanib', 'angiogenesis'].includes(word))) {
                    score += 4;
                }
            }
            // PARP
            else if (['parp', 'brca'].includes(queryWord)) {
                if (protocolWords.some(word => ['parp', 'brca', 'olaparib', 'rucaparib', 'niraparib', 'talazoparib'].includes(word) || word.includes('parp') || word.includes('brca'))) {
                    score += 4;
                }
            }
            // Clinical setting terms
            else if (['neoadjuvant', 'adjuvant', 'metastatic', 'advanced', 'maintenance', 'perioperative', 'definitive', 'palliative', 'recurrent'].includes(queryWord)) {
                if (protocolWords.some(word => word.includes(queryWord))) {
                    score += 3;
                }
            }
            // General drug/term matching
            else {
                // Exact word match
                if (protocolWords.some(word => word === queryWord)) {
                    score += 3;
                }
                // Substring match (drug name partially typed)
                else if (protocolWords.some(word => word.includes(queryWord) && queryWord.length > 2)) {
                    score += 2;
                }
                // Reverse substring (query word contains a protocol word)
                else if (queryWord.length > 4 && protocolWords.some(word => word.length > 3 && queryWord.includes(word))) {
                    score += 1;
                }
                // Fuzzy match for typos
                else if (queryWord.length > 4) {
                    if (protocolWords.some(word => word.length > 3 && fuzzyMatch(queryWord, word, 0.75))) {
                        score += 1;
                    }
                }
            }
        });

        // Drug specificity scoring: prefer exact drug-count matches over combos with extra drugs
        if (protocol.drugCount > 0 && nonCancerWords.length > 0) {
            // Count how many protocol drugs are matched by any search term
            const matchedDrugCount = protocol.drugNames.filter(drugName =>
                nonCancerWords.some(term =>
                    drugName.includes(term) || term.includes(drugName) ||
                    (term.length > 3 && drugName.length > 3 && fuzzyMatch(term, drugName, 0.75))
                )
            ).length;
            const unmatchedDrugs = protocol.drugCount - matchedDrugCount;

            if (matchedDrugCount > 0) {
                if (unmatchedDrugs === 0) {
                    // All protocol drugs accounted for by search terms — exact match bonus
                    score += 5;
                } else {
                    // Penalty for each extra drug beyond what was searched
                    score -= unmatchedDrugs * 2;
                }
            }
        }

        // For queries with only cancer type and no other terms, show all protocols for that cancer
        if (mappedCancerType && nonCancerWords.length === 0) {
            score = 5; // Just the cancer type match score
        }

        // Require all non-cancer words to contribute something
        const minRequired = nonCancerWords.length > 0 ? nonCancerWords.length : 0;
        // Each matched word contributes at least 1 point, so check score meets threshold
        const cancerBonus = mappedCancerType ? 5 : 0;
        const wordScore = score - cancerBonus;

        if (nonCancerWords.length > 0 && wordScore < minRequired) {
            return { protocol, score: -1 }; // Not enough words matched
        }

        return { protocol, score };
    }).filter(item => item.score > 0);

    // Sort by score descending, then by protocol name match, then alphabetically
    scoredResults.sort((a, b) => {
        if (a.score !== b.score) return b.score - a.score;

        // Prefer protocols whose name contains a non-cancer query word
        if (nonCancerWords.length > 0) {
            const aNameMatch = nonCancerWords.some(w => a.protocol.name.toLowerCase().includes(w));
            const bNameMatch = nonCancerWords.some(w => b.protocol.name.toLowerCase().includes(w));
            if (aNameMatch && !bNameMatch) return -1;
            if (!aNameMatch && bNameMatch) return 1;
        }

        return a.protocol.name.localeCompare(b.protocol.name);
    });

    return scoredResults.slice(0, 50).map(item => item.protocol);
}

// Helper function to calculate match strength for sorting
function calculateMatchStrength(queryWords, protocolText) {
    const protocolWords = protocolText.split(' ');
    let strength = 0;
    
    queryWords.forEach(queryWord => {
        if (protocolWords.some(word => word === queryWord)) {
            strength += 3;
        } else if (protocolWords.some(word => word.includes(queryWord) && queryWord.length > 2)) {
            strength += 2;
        } else if (queryWord.length > 4 && protocolWords.some(word => fuzzyMatch(queryWord, word, 0.75))) {
            strength += 1;
        }
    });
    
    return strength;
}

function getSettingLabel(setting) {
    const labels = {
        neoadjuvant: 'Neoadjuvant',
        adjuvant: 'Adjuvant',
        perioperative: 'Perioperative',
        definitive: 'Definitive',
        locally_advanced: 'Locally Advanced',
        primary_treatment: 'Primary Treatment',
        maintenance: 'Maintenance',
        metastatic: 'Metastatic',
        recurrent_progressive: 'Recurrent/Progressive',
        relapsed_refractory: 'Relapsed/Refractory',
        unresectable_recurrent: 'Unresectable/Recurrent',
        mcspc: 'mCSPC',
        nmcrpc: 'nmCRPC',
        mcrpc: 'mCRPC',
        autologous: 'Autologous SCT',
        allogeneic_mac: 'Allogeneic MAC',
        allogeneic_ric: 'Allogeneic RIC'
    };
    return labels[setting] || setting;
}

function displaySearchSuggestions(suggestions) {
    const suggestionsDiv = document.getElementById('searchSuggestions');
    console.log('Displaying suggestions, count:', suggestions.length); // Debug log

    if (suggestions.length === 0) {
        suggestionsDiv.innerHTML = `
            <div style="padding: 14px 16px; color: #666; font-size: 13px; text-align: center;">
                <div style="font-weight: 600; margin-bottom: 4px;">No matching protocols found</div>
                <div>Try drug names (e.g. capecitabine), abbreviations (e.g. FOLFOX), or cancer type + drug</div>
            </div>`;
        suggestionsDiv.style.display = 'block';
        console.log('No suggestions to display'); // Debug log
        return;
    }

    // Group protocols by name + cancerType + subtype to merge settings
    const grouped = {};
    suggestions.forEach(protocol => {
        const groupKey = `${protocol.key}|${protocol.cancerType}|${protocol.subtype || ''}`;
        if (!grouped[groupKey]) {
            grouped[groupKey] = {
                key: protocol.key,
                name: protocol.name,
                cancerType: protocol.cancerType,
                cancerName: protocol.cancerName,
                subtype: protocol.subtype,
                settings: []
            };
        }
        if (protocol.setting) {
            grouped[groupKey].settings.push(protocol.setting);
        }
    });

    const groupedList = Object.values(grouped);

    // Build correction banner if a misspelling was auto-corrected
    const correctionBanner = lastSearchCorrection
        ? `<div style="padding: 8px 14px; background: #fff8e1; border-bottom: 1px solid #ffe082; font-size: 12px; color: #6d4c00;">Showing results for <strong>${lastSearchCorrection.corrected}</strong></div>`
        : '';

    suggestionsDiv.innerHTML = correctionBanner + groupedList.map(group => {
        if (group.settings.length <= 1) {
            // Single setting — render as before
            return `
                <div class="suggestion-item" data-protocol-key="${group.key}" data-cancer-type="${group.cancerType}" data-subtype="${group.subtype || ''}" data-setting="${group.settings[0] || ''}" style="padding: 10px; cursor: pointer; border-bottom: 1px solid #f0f0f0; transition: background 0.2s;" onmouseover="this.style.backgroundColor='#f8f9fa'" onmouseout="this.style.backgroundColor='white'">
                    <div class="suggestion-protocol">${group.name}</div>
                    <div class="suggestion-cancer">${group.cancerName}${group.settings[0] ? ' — ' + getSettingLabel(group.settings[0]) : ''}</div>
                </div>`;
        } else {
            // Multiple settings — show one entry with setting pills
            const settingPills = group.settings.map(s =>
                `<span class="setting-pill" data-setting="${s}" style="display: inline-block; padding: 3px 10px; margin: 2px 4px 2px 0; border-radius: 12px; font-size: 11px; font-weight: 600; cursor: pointer; background: #e8f4fd; color: #1a73e8; border: 1px solid #b8d9f2; transition: all 0.2s;">${getSettingLabel(s)}</span>`
            ).join('');
            return `
                <div class="suggestion-group" data-protocol-key="${group.key}" data-cancer-type="${group.cancerType}" data-subtype="${group.subtype || ''}" style="padding: 10px; border-bottom: 1px solid #f0f0f0;">
                    <div class="suggestion-protocol">${group.name}</div>
                    <div class="suggestion-cancer">${group.cancerName}</div>
                    <div style="margin-top: 4px;">${settingPills}</div>
                </div>`;
        }
    }).join('');

    suggestionsDiv.style.display = 'block';
    console.log('Suggestions displayed'); // Debug log

    // Add click handlers for single-setting items
    suggestionsDiv.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', function() {
            console.log('Suggestion clicked:', this.dataset.protocolKey); // Debug log
            selectSearchProtocol({
                key: this.dataset.protocolKey,
                cancerType: this.dataset.cancerType,
                subtype: this.dataset.subtype || null,
                setting: this.dataset.setting || null,
                name: this.querySelector('.suggestion-protocol').textContent,
                cancerName: this.querySelector('.suggestion-cancer').textContent
            });
        });
    });

    // Add click handlers for setting pills in grouped items
    suggestionsDiv.querySelectorAll('.suggestion-group .setting-pill').forEach(pill => {
        pill.addEventListener('mouseover', function() {
            this.style.background = '#1a73e8';
            this.style.color = '#fff';
        });
        pill.addEventListener('mouseout', function() {
            this.style.background = '#e8f4fd';
            this.style.color = '#1a73e8';
        });
        pill.addEventListener('click', function() {
            const group = this.closest('.suggestion-group');
            selectSearchProtocol({
                key: group.dataset.protocolKey,
                cancerType: group.dataset.cancerType,
                subtype: group.dataset.subtype || null,
                setting: this.dataset.setting || null,
                name: group.querySelector('.suggestion-protocol').textContent,
                cancerName: group.querySelector('.suggestion-cancer').textContent
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
    
    if (protocol.subtype && protocolDatabase[protocol.cancerType] && protocolDatabase[protocol.cancerType][protocol.subtype]) {
        if (protocol.setting && protocolDatabase[protocol.cancerType][protocol.subtype][protocol.setting]) {
            protocolData = protocolDatabase[protocol.cancerType][protocol.subtype][protocol.setting][protocol.key];
        } else {
            protocolData = protocolDatabase[protocol.cancerType][protocol.subtype][protocol.key];
        }
    } else if (protocolDatabase[protocol.cancerType]) {
        if (protocol.setting && protocolDatabase[protocol.cancerType][protocol.setting]) {
            protocolData = protocolDatabase[protocol.cancerType][protocol.setting][protocol.key];
        } else {
            protocolData = protocolDatabase[protocol.cancerType][protocol.key];
        }
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

    // Check if this cancer type has subtypes
    const firstKey = Object.keys(protocolDatabase[cancerType])[0];
    const hasSubtypes = !['neoadjuvant', 'adjuvant', 'perioperative', 'definitive', 'locally_advanced', 'primary_treatment', 'maintenance', 'metastatic', 'recurrent_progressive', 'relapsed_refractory', 'unresectable_recurrent', 'mcspc', 'nmcrpc', 'mcrpc', 'autologous', 'allogeneic_mac', 'allogeneic_ric'].includes(firstKey);

    if (hasSubtypes && subtype) {
        // Specific subtype selected - iterate: setting -> protocol
        const subtypeName = getSubtypeDisplayName(subtype);
        if (protocolDatabase[cancerType][subtype]) {
            Object.keys(protocolDatabase[cancerType][subtype]).forEach(setting => {
                Object.keys(protocolDatabase[cancerType][subtype][setting]).forEach(protocolKey => {
                    const protocol = protocolDatabase[cancerType][subtype][setting][protocolKey];
                    const drugNames = protocol.drugs ? protocol.drugs.map(drug => drug.name).join(' ') : '';
                    const therapeuticDrugs = getTherapeuticDrugs(protocol);
                    const settingName = setting.charAt(0).toUpperCase() + setting.slice(1);
                    const baseSearchText = `${protocol.name} ${settingName} ${drugNames}`.toLowerCase();
                    const searchText = generateSearchAliases(baseSearchText);
                    cancerSpecificProtocols.push({
                        key: protocolKey,
                        name: protocol.name,
                        cancerType: cancerType,
                        cancerName: `${cancerName} - ${subtypeName}`,
                        subtype: subtype,
                        setting: setting,
                        searchText: searchText,
                        searchTextNormalized: normalizeSearchString(searchText),
                        drugCount: therapeuticDrugs.length,
                        drugNames: therapeuticDrugs.map(n => n.toLowerCase())
                    });
                });
            });
        }
    } else if (hasSubtypes) {
        // Has subtypes but none selected - iterate: subtype -> setting -> protocol
        Object.keys(protocolDatabase[cancerType]).forEach(subtypeKey => {
            const subtypeName = getSubtypeDisplayName(subtypeKey);
            Object.keys(protocolDatabase[cancerType][subtypeKey]).forEach(setting => {
                Object.keys(protocolDatabase[cancerType][subtypeKey][setting]).forEach(protocolKey => {
                    const protocol = protocolDatabase[cancerType][subtypeKey][setting][protocolKey];
                    const drugNames = protocol.drugs ? protocol.drugs.map(drug => drug.name).join(' ') : '';
                    const therapeuticDrugs = getTherapeuticDrugs(protocol);
                    const settingName = setting.charAt(0).toUpperCase() + setting.slice(1);
                    const baseSearchText = `${protocol.name} ${settingName} ${drugNames}`.toLowerCase();
                    const searchText = generateSearchAliases(baseSearchText);
                    cancerSpecificProtocols.push({
                        key: protocolKey,
                        name: protocol.name,
                        cancerType: cancerType,
                        cancerName: `${cancerName} - ${subtypeName}`,
                        subtype: subtypeKey,
                        setting: setting,
                        searchText: searchText,
                        searchTextNormalized: normalizeSearchString(searchText),
                        drugCount: therapeuticDrugs.length,
                        drugNames: therapeuticDrugs.map(n => n.toLowerCase())
                    });
                });
            });
        });
    } else {
        // No subtypes - iterate: setting -> protocol
        Object.keys(protocolDatabase[cancerType]).forEach(setting => {
            Object.keys(protocolDatabase[cancerType][setting]).forEach(protocolKey => {
                const protocol = protocolDatabase[cancerType][setting][protocolKey];
                const drugNames = protocol.drugs ? protocol.drugs.map(drug => drug.name).join(' ') : '';
                const therapeuticDrugs = getTherapeuticDrugs(protocol);
                const settingName = setting.charAt(0).toUpperCase() + setting.slice(1);
                const baseSearchText = `${protocol.name} ${settingName} ${drugNames}`.toLowerCase();
                const searchText = generateSearchAliases(baseSearchText);
                cancerSpecificProtocols.push({
                    key: protocolKey,
                    name: protocol.name,
                    cancerType: cancerType,
                    cancerName: cancerName,
                    subtype: null,
                    setting: setting,
                    searchText: searchText,
                    searchTextNormalized: normalizeSearchString(searchText),
                    drugCount: therapeuticDrugs.length,
                    drugNames: therapeuticDrugs.map(n => n.toLowerCase())
                });
            });
        });
    }
    
    console.log(`Cancer-specific index built, total protocols for ${cancerType}:`, cancerSpecificProtocols.length);
}

function searchCancerSpecificProtocols(query) {
    if (!query || query.length < 2) return [];

    const queryLower = query.toLowerCase();
    const queryNormalized = normalizeSearchString(query);
    const queryWords = queryLower.split(/\s+/).filter(w => w.length > 1);

    // Filter by selected clinical setting if one is chosen
    const selectedSetting = document.getElementById('clinicalSetting') ? document.getElementById('clinicalSetting').value : '';
    const searchPool = selectedSetting
        ? cancerSpecificProtocols.filter(p => p.setting === selectedSetting)
        : cancerSpecificProtocols;

    // Score each protocol using per-word matching (supports abbreviations and multi-word queries)
    const scoredResults = searchPool.map(protocol => {
        const protocolWords = protocol.searchTextNormalized.split(' ');
        let score = 0;
        let matchedWords = 0;

        queryWords.forEach(queryWord => {
            // Exact word match
            if (protocolWords.some(word => word === queryWord)) {
                score += 3;
                matchedWords++;
            }
            // Substring match (abbreviation typed, e.g. "pem" matches "pemetrexed")
            else if (queryWord.length > 2 && protocolWords.some(word => word.includes(queryWord))) {
                score += 2;
                matchedWords++;
            }
            // Reverse substring (query word contains a protocol word)
            else if (queryWord.length > 4 && protocolWords.some(word => word.length > 3 && queryWord.includes(word))) {
                score += 1;
                matchedWords++;
            }
            // Fuzzy match for typos
            else if (queryWord.length > 4) {
                if (protocolWords.some(word => word.length > 3 && fuzzyMatch(queryWord, word, 0.75))) {
                    score += 1;
                    matchedWords++;
                }
            }
        });

        // Require all query words to match something
        if (matchedWords < queryWords.length) {
            return { protocol, score: -1 };
        }

        // Drug specificity scoring
        if (protocol.drugCount > 0 && queryWords.length > 0) {
            const matchedDrugCount = protocol.drugNames.filter(drugName =>
                queryWords.some(term =>
                    drugName.includes(term) || term.includes(drugName) ||
                    (term.length > 3 && drugName.length > 3 && fuzzyMatch(term, drugName, 0.75))
                )
            ).length;
            const unmatchedDrugs = protocol.drugCount - matchedDrugCount;
            if (matchedDrugCount > 0) {
                score += unmatchedDrugs === 0 ? 5 : -(unmatchedDrugs * 2);
            }
        }

        // Name-starts-with bonus
        if (protocol.name.toLowerCase().startsWith(queryLower)) score += 1;

        return { protocol, score };
    }).filter(item => item.score > 0);

    scoredResults.sort((a, b) => {
        if (a.score !== b.score) return b.score - a.score;
        return a.protocol.name.localeCompare(b.protocol.name);
    });

    return scoredResults.map(item => item.protocol).slice(0, 20);
}

function showCancerSearchDropdown(suggestions) {
    const dropdown = document.getElementById('cancerSearchDropdown');

    if (suggestions.length === 0) {
        dropdown.innerHTML = `
            <div style="padding: 12px 16px; color: #666; font-size: 13px; text-align: center;">
                No matching regimens found for this cancer type
            </div>`;
        dropdown.style.display = 'block';
        return;
    }
    
    dropdown.innerHTML = suggestions.map(protocol => `
        <div class="cancer-search-item" data-protocol-key="${protocol.key}" data-cancer-type="${protocol.cancerType}" data-subtype="${protocol.subtype || ''}" data-setting="${protocol.setting || ''}" style="padding: 10px; cursor: pointer; border-bottom: 1px solid #f0f0f0; transition: background 0.2s;" onmouseover="this.style.backgroundColor='#f8f9fa'" onmouseout="this.style.backgroundColor='white'">
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
                setting: this.dataset.setting || null,
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
    checkForCarboplatin(protocol.key, protocol.cancerType, protocol.subtype, protocol.setting);
    
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
                                            <div style="color: #0a7e8c; font-weight: 600;">Maintenance</div>
                                            <div style="color: #0a7e8c;">${drug.originalDose.split(' → ')[1]} ${drug.originalUnit}</div>
                                        </div>` 
                                        : `${drug.originalDose}${drug.originalUnit === 'AUC' && drug.originalDose.toString().includes('AUC') ? '' : ' ' + drug.originalUnit}`}
                                </td>
                                <td style="padding: 12px; border: 1px solid #dee2e6; background-color: #e6f3f5; font-weight: 600;">
                                    ${drug.hasLoadingDose ? 
                                        `<div style="font-size: 12px; line-height: 1.3;">
                                            <div style="color: #007bff; font-weight: 600;">Loading</div>
                                            <div style="color: #007bff; margin-bottom: 8px;">${drug.calculatedDose.split(' → ')[0]} ${drug.doseUnit}</div>
                                            <div style="color: #0a7e8c; font-weight: 600;">Maintenance</div>
                                            <div style="color: #0a7e8c;">${drug.calculatedDose.split(' → ')[1]} ${drug.doseUnit}</div>
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
                                                <div style="color: #0a7e8c; font-weight: 600;">Maintenance</div>
                                                <div style="color: #0a7e8c;">${roundDose(maintenanceDose, drug.name, results.protocolName)} ${drug.doseUnit}</div>
                                            </div>`;
                                        })()
                                        : `${roundDose(parseFloat(drug.calculatedDose), drug.name, results.protocolName)} ${drug.doseUnit}`}
                                </td>
                                <td style="padding: 12px; border: 1px solid #dee2e6; font-size: 13px; color: #6c757d;">
                                    ${(() => {
                                        let schedule = drug.schedule || 'Per protocol';
                                        if (results.cycles === 'Until progression' &&
                                            !schedule.toLowerCase().includes('progression') &&
                                            !schedule.toLowerCase().includes('until')) {
                                            schedule += '<br><span style="color: #6c757d; font-size: 12px; font-style: italic;">— continue until progression or unacceptable toxicity</span>';
                                        } else if (typeof results.cycles === 'number' &&
                                            !schedule.toLowerCase().includes('cycle')) {
                                            // If this drug is named in cyclesNote, it continues until progression
                                            const isUntilProgDrug = results.cyclesNote &&
                                                results.cyclesNote.toLowerCase().includes(drug.name.toLowerCase());
                                            if (isUntilProgDrug) {
                                                schedule += '<br><span style="color: #6c757d; font-size: 12px; font-style: italic;">— continue until progression or unacceptable toxicity</span>';
                                            } else {
                                                schedule += '<br><span style="color: #6c757d; font-size: 12px; font-style: italic;">× ' + results.cycles + ' cycles total</span>';
                                            }
                                        }
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
        
        <div class="result-item" style="margin-bottom: 20px; background: linear-gradient(135deg, #e8f5e9 0%, #f3e5f5 100%); border-left: 4px solid #4caf50;">
            <strong>Patient Summary:</strong><br>
            ${results.hasCarboplatin ?
                `Weight: ${patientData.weight} kg | Height: ${patientData.height} cm<br>
                BSA: ${results.bsa} m² | CrCl: ${results.crCl} mL/min<br>
                Setting: ${getSettingLabel(patientData.setting)}<br>
                Regimen: ${results.protocolName}${results.selectedAuc ? ` | AUC ${results.selectedAuc}` : ''}<br>
                Cycles: ${results.cycles}${results.cyclesNote ? ` <span style="font-style:italic;color:#6c757d;">(${results.cyclesNote})</span>` : ''}` :
                `Weight: ${patientData.weight} kg | Height: ${patientData.height} cm<br>
                BSA: ${results.bsa} m²<br>
                Setting: ${getSettingLabel(patientData.setting)}<br>
                Regimen: ${results.protocolName}<br>
                Cycles: ${results.cycles}${results.cyclesNote ? ` <span style="font-style:italic;color:#6c757d;">(${results.cyclesNote})</span>` : ''}`
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
    
    function isConditionallyReducibleDrug(drugName) {
        const conditionalDrugs = ['ramucirumab', 'cetuximab', 'panitumumab'];
        return conditionalDrugs.some(drug => drugName.toLowerCase().includes(drug));
    }
    
    function getConditionalReductionNote(drugName) {
        const drugLower = drugName.toLowerCase();
        if (drugLower.includes('ramucirumab')) {
            return "*Dose reduction ONLY for proteinuria. Hold/stop for all other toxicities.";
        }
        if (drugLower.includes('cetuximab') || drugLower.includes('panitumumab')) {
            return "*Dose reduction ONLY for skin toxicity. Hold/stop for all other toxicities.";
        }
        return "";
    }

    function isNonReducibleDrug(drugName) {
        // Conditionally reducible drugs take precedence over targeted therapy classification
        if (isConditionallyReducibleDrug(drugName)) {
            return false;
        }
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
                        const isConditionallyReducible = isConditionallyReducibleDrug(drug.name);
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
                                                <div style="color: #0a7e8c; font-weight: 600;">Maintenance</div>
                                                <div style="color: #0a7e8c;">${drug.calculatedDose.split(' → ')[1]}</div>
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
                                                <div style="color: #0a7e8c; font-weight: 600;">Maintenance</div>
                                                <div style="color: #0a7e8c;">${drug.calculatedDose.split(' → ')[1]}</div>
                                                <div style="font-size: 10px; color: #7f8c8d; font-weight: 400; margin-top: 3px; white-space: normal; word-wrap: break-word;">${(isImmuno || isHormonal) ? 'Withhold if toxicity' : 'Per dose level schedule'}</div>
                                            </div>` 
                                            : `${originalDose}<div style="font-size: 11px; color: #7f8c8d; font-weight: 400; margin-top: 2px; white-space: normal; word-wrap: break-word;">${(isImmuno || isHormonal) ? 'Withhold if toxicity' : 'Per dose level schedule'}</div>`}
                                    </td>
                                </tr>
                            `;
                        } else if (isConditionallyReducible) {
                            // Conditionally reducible drugs with special notes
                            const conditionalNote = getConditionalReductionNote(drug.name);
                            return `
                                <tr>
                                    <td style="font-weight: 600; color: #2c3e50;">
                                        ${drug.name}
                                        <div style="font-size: 11px; color: #d35400; font-weight: 500; margin-top: 2px; white-space: normal; word-wrap: break-word; line-height: 1.3;">
                                            ${conditionalNote}
                                        </div>
                                    </td>
                                    <td>
                                        ${drug.hasLoadingDose ? 
                                            `<div style="font-size: 11px; line-height: 1.3;">
                                                <div style="color: #007bff; font-weight: 600;">Loading</div>
                                                <div style="color: #007bff; margin-bottom: 4px;">${drug.calculatedDose.split(' → ')[0]}</div>
                                                <div style="color: #0a7e8c; font-weight: 600;">Maintenance</div>
                                                <div style="color: #0a7e8c;">${drug.calculatedDose.split(' → ')[1]}</div>
                                            </div>` 
                                            : originalDose}
                                    </td>
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
                                    <td id="final_${drug.name.replace(/\s+/g, '_')}" style="font-weight: 600; color: #0a7e8c;">
                                        ${finalDose.toFixed(1)}${drug.unit || 'mg'}
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
                                    <td id="final_${drug.name.replace(/\s+/g, '_')}" style="font-weight: 600; color: #0a7e8c;">
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

    // Check if any individual reductions have been manually set to different values
    const hasManualEdits = Object.values(currentReductions).some(val => val !== 0 && val !== clampedValue);

    if (hasManualEdits) {
        if (!confirm('You have individual dose reductions set. Applying a global reduction will overwrite them. Continue?')) {
            return;
        }
    }

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
                            const isConditionallyReducible = isConditionallyReducibleDrug(drug.name);
                            const isNonReducible = isNonReducibleDrug(drug.name);
                            
                            const reduction = currentReductions[drug.name] || 0;
                            const reducedDose = drug.calculatedDose * (1 - reduction / 100);
                            
                            return `
                                <tr style="border-bottom: 1px solid #dee2e6;">
                                    <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: 600;">
                                        ${drug.name}${drug.days ? ` (${drug.days})` : ''}
                                        ${isNonReducible ? `<div style="font-size: 10px; color: #e67e22; margin-top: 2px;">${(isImmuno || isHormonal) ? '*No dose reduction' : '*Standard dose level reductions apply'}</div>` : ''}
                                        ${isConditionallyReducible ? `<div style="font-size: 10px; color: #d35400; margin-top: 2px; line-height: 1.3; white-space: normal; word-wrap: break-word;">${getConditionalReductionNote(drug.name)}</div>` : ''}
                                    </td>
                                    <td style="padding: 12px; border: 1px solid #dee2e6;">
                                        ${drug.hasLoadingDose ? 
                                            `<div style="font-size: 12px; line-height: 1.3;">
                                                <div style="color: #007bff; font-weight: 600;">Loading</div>
                                                <div style="color: #007bff; margin-bottom: 8px;">${drug.originalDose.split(' → ')[0]} ${drug.originalUnit}</div>
                                                <div style="color: #0a7e8c; font-weight: 600;">Maintenance</div>
                                                <div style="color: #0a7e8c;">${drug.originalDose.split(' → ')[1]} ${drug.originalUnit}</div>
                                            </div>` 
                                            : `${drug.originalDose}${drug.originalUnit === 'AUC' && drug.originalDose.toString().includes('AUC') ? '' : ' ' + drug.originalUnit}`}
                                    </td>
                                    <td style="padding: 12px; border: 1px solid #dee2e6; background-color: #e6f3f5; font-weight: 600;">
                                        ${drug.hasLoadingDose ? 
                                            `<div style="font-size: 12px; line-height: 1.3;">
                                                <div style="color: #007bff; font-weight: 600;">Loading</div>
                                                <div style="color: #007bff; margin-bottom: 8px;">${drug.calculatedDose.split(' → ')[0]} ${drug.doseUnit}</div>
                                                <div style="color: #0a7e8c; font-weight: 600;">Maintenance</div>
                                                <div style="color: #0a7e8c;">${drug.calculatedDose.split(' → ')[1]} ${drug.doseUnit}</div>
                                            </div>` 
                                            : `${drug.calculatedDose} ${drug.doseUnit}`}
                                    </td>
                                    <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: 600; color: ${isNonReducible ? '#2c3e50' : (reduction > 0 ? '#e74c3c' : '#0a7e8c')}; background-color: ${isNonReducible ? '#f8f9fa' : (reduction > 0 ? '#fdf2f2' : '#f8f9fa')};">
                                        ${isNonReducible ? 
                                            // For non-reducible drugs, show same as calculated dose
                                            (drug.hasLoadingDose ? 
                                                `<div style="font-size: 12px; line-height: 1.3;">
                                                    <div style="color: #007bff; font-weight: 600;">Loading</div>
                                                    <div style="color: #007bff; margin-bottom: 8px;">${drug.calculatedDose.split(' → ')[0]} ${drug.doseUnit}</div>
                                                    <div style="color: #0a7e8c; font-weight: 600;">Maintenance</div>
                                                    <div style="color: #0a7e8c;">${drug.calculatedDose.split(' → ')[1]} ${drug.doseUnit}</div>
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
                                                        <div style="color: #0a7e8c; font-weight: 600;">Maintenance</div>
                                                        <div style="color: #0a7e8c;">${roundDose(calcMaintenanceDose, drug.name, results.protocolName)} ${drug.doseUnit}</div>
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
                                            if (results.cycles === 'Until progression' &&
                                                !schedule.toLowerCase().includes('progression') &&
                                                !schedule.toLowerCase().includes('until')) {
                                                schedule += '<br><span style="color: #6c757d; font-size: 12px; font-style: italic;">— continue until progression or unacceptable toxicity</span>';
                                            } else if (typeof results.cycles === 'number' &&
                                                !schedule.toLowerCase().includes('cycle')) {
                                                // If this drug is named in cyclesNote, it continues until progression
                                                const isUntilProgDrug = results.cyclesNote &&
                                                    results.cyclesNote.toLowerCase().includes(drug.name.toLowerCase());
                                                if (isUntilProgDrug) {
                                                    schedule += '<br><span style="color: #6c757d; font-size: 12px; font-style: italic;">— continue until progression or unacceptable toxicity</span>';
                                                } else {
                                                    schedule += '<br><span style="color: #6c757d; font-size: 12px; font-style: italic;">× ' + results.cycles + ' cycles total</span>';
                                                }
                                            }
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
        
        <div style="margin-top: 15px; padding: 8px 12px; background: linear-gradient(135deg, #e8f5e9 0%, #f3e5f5 100%); border-left: 3px solid #4caf50; border-radius: 3px; font-size: 14px;">
            <strong>Patient Summary:</strong><br>
            ${patientData.creatinine ?
                `Weight: ${patientData.weight} kg | Height: ${patientData.height} cm<br>
                BSA: ${results.bsa} m² | CrCl: ${results.crCl} mL/min<br>
                Setting: ${getSettingLabel(patientData.setting)}<br>
                Regimen: ${results.protocolName}${results.selectedAuc ? ` | AUC ${results.selectedAuc}` : ''}<br>
                Cycles: ${results.cycles}${results.cyclesNote ? ` <span style="font-style:italic;color:#6c757d;">(${results.cyclesNote})</span>` : ''}` :
                `Weight: ${patientData.weight} kg | Height: ${patientData.height} cm<br>
                BSA: ${results.bsa} m²<br>
                Setting: ${getSettingLabel(patientData.setting)}<br>
                Regimen: ${results.protocolName}<br>
                Cycles: ${results.cycles}${results.cyclesNote ? ` <span style="font-style:italic;color:#6c757d;">(${results.cyclesNote})</span>` : ''}`
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
    
    function isConditionallyReducibleDrug(drugName) {
        const conditionalDrugs = ['ramucirumab', 'cetuximab', 'panitumumab'];
        return conditionalDrugs.some(drug => drugName.toLowerCase().includes(drug));
    }
    
    function getConditionalReductionNote(drugName) {
        const drugLower = drugName.toLowerCase();
        if (drugLower.includes('ramucirumab')) {
            return "*Dose reduction ONLY for proteinuria. Hold/stop for all other toxicities.";
        }
        if (drugLower.includes('cetuximab') || drugLower.includes('panitumumab')) {
            return "*Dose reduction ONLY for skin toxicity. Hold/stop for all other toxicities.";
        }
        return "";
    }

    function isNonReducibleDrug(drugName) {
        // Conditionally reducible drugs take precedence over targeted therapy classification
        if (isConditionallyReducibleDrug(drugName)) {
            return false;
        }
        return isImmunotherapyDrug(drugName) || isTargetedTherapyDrug(drugName) || isHormonalTherapyDrug(drugName);
    }
    
    const appliedReductions = Object.entries(currentReductions).filter(([drugName, reduction]) => 
        reduction > 0 && !isNonReducibleDrug(drugName)
    );
    
    if (appliedReductions.length === 0) {
        reductionList.innerHTML = '<div class="reduction-item" style="color: #0a7e8c; font-style: italic; font-size: 13px;">No dose reductions applied</div>';
    } else {
        reductionList.innerHTML = appliedReductions.map(([drugName, reduction]) => 
            `<div class="reduction-item" style="margin-bottom: 5px; font-size: 13px;">• <strong>${drugName}:</strong> ${reduction}% reduction</div>`
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
    populateSettings(cancerType, this.value);
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

// Clinical setting change listener
document.getElementById('clinicalSetting').addEventListener('change', function() {
    const cancerType = document.getElementById('cancerType').value;
    const subtype = document.getElementById('cancerSubtype').value;
    populateProtocols(cancerType, subtype, this.value);
    // Clear cancer-specific search so results refresh for new setting
    clearCancerSearchSection();
});

document.getElementById('protocol').addEventListener('change', function() {
    const cancerType = document.getElementById('cancerType').value;
    const subtype = document.getElementById('cancerSubtype').value;
    const setting = document.getElementById('clinicalSetting').value;
    checkForCarboplatin(this.value, cancerType, subtype, setting);
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
        showValidationError('page2Error', `Please fill in the following for carboplatin calculation: ${requiredFields.join(', ')}`);
        return false;
    }

    // Special validation for KEYNOTE-522 regimen (Paclitaxel-Carboplatin-Pembrolizumab)
    if (formData.protocol === 'Paclitaxel-Carboplatin-Pembrolizumab') {
        const aucValue = parseFloat(formData.auc);
        if (aucValue > 1.5) {
            showValidationError('page2Error', 'For KEYNOTE-522 protocol (Paclitaxel + Carboplatin + Pembrolizumab), the maximum allowed AUC is 1.5. Please enter an AUC value of 1.5 or lower.');
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
    // Load external protocol data first
    loadExternalProtocols();
    
    console.log('OncoCalcRx loaded successfully');
    buildProtocolIndex(); // Build search index




        
    // Page navigation event listeners
    document.getElementById('nextToPage2').addEventListener('click', function() {
        if (validatePage1()) {
            clearValidationError('page1Error');
            // Track patient info completion
            trackEvent('patient_info_completed', {
                custom_parameter_1: 'page_navigation',
                custom_parameter_2: 'patient_to_regimen'
            });
            updatePatientInfoCard(); // Ensure patient card is updated
            showPage(2);
        } else {
            showValidationError('page1Error', 'Please fill in either Height, Weight & Sex OR enter a Direct BSA value.');
        }
    });

    document.getElementById('backToPage1').addEventListener('click', function() {
        showPage(1);
    });

    document.getElementById('calculateDoses').addEventListener('click', function() {
        // Check if any regimen has been selected
        const browseProtocol = document.getElementById('protocol').value;
        if (!selectedSearchProtocol && !selectedCancerSearchProtocol && !browseProtocol) {
            showValidationError('page2Error', 'Please select a regimen before calculating doses. Use Quick Search or Browse by Cancer Type to find a regimen.');
            return;
        }

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
                setting: selectedSearchProtocol.setting,
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
                setting: selectedCancerSearchProtocol.setting,
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
                setting: document.getElementById('clinicalSetting').value,
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
        document.getElementById('clinicalSetting').value = '';
        document.getElementById('protocol').value = '';
        document.getElementById('auc').value = '';

        // Reset search
        clearSearchSection();
        clearCancerSearchSection();

        // Reset UI state
        document.getElementById('subtypeGroup').style.display = 'none';
        document.getElementById('clinicalSettingGroup').style.display = 'none';
        document.getElementById('clinicalSetting').disabled = true;
        document.getElementById('aucGroup').style.display = 'none';
        document.getElementById('carboplatinParams').style.display = 'none';
        document.getElementById('cancerSearchGroup').style.display = 'none';
        document.getElementById('protocol').disabled = true;
        document.getElementById('cancerSubtype').disabled = true;

        // Reset tabs to Quick Search
        document.getElementById('searchTab').style.display = '';
        document.getElementById('browseTab').style.display = 'none';
        document.getElementById('tabSearch').style.background = '#0a7e8c';
        document.getElementById('tabSearch').style.color = 'white';
        document.getElementById('tabBrowse').style.background = 'white';
        document.getElementById('tabBrowse').style.color = '#0a7e8c';

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
        document.getElementById('clinicalSetting').value = '';
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
        document.getElementById('clinicalSettingGroup').style.display = 'none';
        document.getElementById('clinicalSetting').disabled = true;
        document.getElementById('aucGroup').style.display = 'none';
        document.getElementById('carboplatinParams').style.display = 'none';
        document.getElementById('cancerSearchGroup').style.display = 'none';
        document.getElementById('protocol').disabled = true;
        document.getElementById('cancerSubtype').disabled = true;

        // Reset tabs to Quick Search
        document.getElementById('searchTab').style.display = '';
        document.getElementById('browseTab').style.display = 'none';
        document.getElementById('tabSearch').style.background = '#0a7e8c';
        document.getElementById('tabSearch').style.color = 'white';
        document.getElementById('tabBrowse').style.background = 'white';
        document.getElementById('tabBrowse').style.color = '#0a7e8c';

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
        const setting = document.getElementById('clinicalSetting').value;

        // Check for carboplatin and show/hide fields accordingly
        checkForCarboplatin(protocolKey, cancerType, subtype, setting);
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
    
    // Tab switching for Search vs Browse
    document.getElementById('tabSearch').addEventListener('click', function() {
        document.getElementById('searchTab').style.display = '';
        document.getElementById('browseTab').style.display = 'none';
        this.style.background = '#0a7e8c';
        this.style.color = 'white';
        const browseBtn = document.getElementById('tabBrowse');
        browseBtn.style.background = 'white';
        browseBtn.style.color = '#0a7e8c';
    });

    document.getElementById('tabBrowse').addEventListener('click', function() {
        document.getElementById('browseTab').style.display = '';
        document.getElementById('searchTab').style.display = 'none';
        this.style.background = '#0a7e8c';
        this.style.color = 'white';
        const searchBtn = document.getElementById('tabSearch');
        searchBtn.style.background = 'white';
        searchBtn.style.color = '#0a7e8c';
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
            searchKeyboardIndex = -1;
        }, 300);
    });

    document.getElementById('protocolSearch').addEventListener('focus', function() {
        const query = this.value.trim();
        if (query.length >= 2) {
            const suggestions = searchProtocols(query);
            displaySearchSuggestions(suggestions);
        }
        searchKeyboardIndex = -1;
    });

    // Keyboard navigation for global search suggestions
    let searchKeyboardIndex = -1;
    document.getElementById('protocolSearch').addEventListener('keydown', function(e) {
        const suggestionsDiv = document.getElementById('searchSuggestions');
        if (suggestionsDiv.style.display === 'none') return;

        // Get all selectable items (single-setting items and setting pills in groups)
        const items = suggestionsDiv.querySelectorAll('.suggestion-item, .suggestion-group');
        if (items.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            searchKeyboardIndex = Math.min(searchKeyboardIndex + 1, items.length - 1);
            highlightSearchItem(items, searchKeyboardIndex);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            searchKeyboardIndex = Math.max(searchKeyboardIndex - 1, 0);
            highlightSearchItem(items, searchKeyboardIndex);
        } else if (e.key === 'Enter' && searchKeyboardIndex >= 0) {
            e.preventDefault();
            const activeItem = items[searchKeyboardIndex];
            if (activeItem.classList.contains('suggestion-item')) {
                // Single-setting item — click it directly
                activeItem.click();
            } else if (activeItem.classList.contains('suggestion-group')) {
                // Grouped item — select the first setting pill
                const firstPill = activeItem.querySelector('.setting-pill');
                if (firstPill) firstPill.click();
            }
            searchKeyboardIndex = -1;
        } else if (e.key === 'Escape') {
            suggestionsDiv.style.display = 'none';
            searchKeyboardIndex = -1;
        }
    });

    function highlightSearchItem(items, index) {
        items.forEach((item, i) => {
            item.style.backgroundColor = i === index ? '#f0f4ff' : '';
        });
        if (items[index]) {
            items[index].scrollIntoView({ block: 'nearest' });
        }
    }
    
    // Note: showPage(1) removed to allow splash screen to display first

    // ===== PAGE 6 BUTTON LISTENERS =====
    document.getElementById('goToPage6').addEventListener('click', function() {
        showPage6(5);
    });
    document.getElementById('goToPage6FromPage3').addEventListener('click', function() {
        showPage6(3);
    });
    document.getElementById('backToPage5').addEventListener('click', function() {
        showPage(page6CallerPage || 5);
    });
    document.getElementById('printPrescription').addEventListener('click', function() {
        buildAndPrint();
    });

    // All dropdowns default to none — no localStorage, physician selects fresh each time
    ['selectNK1','selectDex','select5ht3','selectAntiHist','selectAntacid',
     'selectOralAntacid','selectOralOndansetron','selectOralDex','selectOralOlanzapine','selectGCS'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.value = 'none';
        el.addEventListener('change', function() {
            if (id === 'selectNK1') handleNEPALogic();
            buildPrintPreview();
        });
    });
    // Clear any stale localStorage keys from previous versions
    ['selectNK1','selectDex','select5ht3','selectAntiHist','selectAntacid',
     'selectOralAntacid','selectOralOndansetron','selectOralDex','selectOralOlanzapine','selectGCS'].forEach(id => {
        localStorage.removeItem('onco_' + id);
    });

    document.getElementById('phaseSelect').addEventListener('change', buildPrintPreview);

    // Optional patient name/age — update preview live as user types
    ['printPatientName','printPatientAge'].forEach(id => {
        document.getElementById(id).addEventListener('input', buildPrintPreview);
    });
});

// ===== PAGE 6 LOGIC =====

let page6CallerPage = 5;

function showPage6(callerPage) {
    if (!originalResults) return;
    page6CallerPage = callerPage || 5;
    showPage(6);
    loadPreferences();
    setupPhaseSelector();
    setupCycleTypeSelector();
    populateRegimenRecall();
    buildPrintPreview();
}

function populateRegimenRecall() {
    const { results, patientData } = originalResults;
    const nameEl = document.getElementById('regimenRecallName');
    const metaEl = document.getElementById('regimenRecallMeta');
    if (!nameEl || !metaEl) return;
    nameEl.textContent = results.protocolName || '—';
    const cancerDisplay = getCancerDisplayName(results.cancerType);
    const subtypeDisplay = results.subtype ? ' — ' + getSubtypeDisplayName(results.subtype) : '';
    const settingDisplay = getSettingLabel(patientData.setting);
    metaEl.textContent = `${cancerDisplay}${subtypeDisplay} | ${settingDisplay} | BSA: ${results.bsa} m²`;
}

function loadPreferences() {
    // All dropdowns reset to none on every Page 6 visit — no pre-selection
    ['selectNK1','selectDex','select5ht3','selectAntiHist','selectAntacid',
     'selectOralAntacid','selectOralOndansetron','selectOralDex','selectOralOlanzapine','selectGCS'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = 'none';
    });
    handleNEPALogic();
}

let _prevNK1WasNEPA = false;

function handleNEPALogic() {
    const nk1Val = document.getElementById('selectNK1').value;
    const group5ht3 = document.getElementById('serotonin5ht3Group');
    const sel5ht3 = document.getElementById('select5ht3');
    if (nk1Val === 'nepa') {
        group5ht3.style.opacity = '0.4';
        group5ht3.style.pointerEvents = 'none';
        group5ht3.querySelector('label').textContent = '5-HT3 Antagonist (Included in NEPA — Palonosetron 0.5mg)';
        sel5ht3.value = 'palonosetron';
        _prevNK1WasNEPA = true;
    } else {
        group5ht3.style.opacity = '1';
        group5ht3.style.pointerEvents = '';
        group5ht3.querySelector('label').innerHTML = '5-HT3 Antagonist';
        // Only reset 5-HT3 when switching away from NEPA (not on every call)
        if (_prevNK1WasNEPA) {
            sel5ht3.value = 'ondansetron';
            _prevNK1WasNEPA = false;
        }
    }
}

function getPhaseProtocolData() {
    if (!originalResults) return null;
    const { results } = originalResults;
    const cancerType = results.cancerType;
    const protocolKey = results.protocolKey;

    // Look up from premedData (supportive care data file)
    if (window.premedData && window.premedData[cancerType]) {
        return window.premedData[cancerType][protocolKey] || null;
    }
    return null;
}

function setupPhaseSelector() {
    const protocolData = getPhaseProtocolData();
    const phaseGroup = document.getElementById('phaseSelectGroup');
    const phaseSelect = document.getElementById('phaseSelect');
    phaseSelect.innerHTML = '';

    if (protocolData && protocolData.phases && protocolData.phases.length > 1) {
        phaseGroup.style.display = 'block';
        protocolData.phases.forEach((phase, i) => {
            const opt = document.createElement('option');
            opt.value = i;
            opt.textContent = phase.label;
            phaseSelect.appendChild(opt);
        });
    } else {
        phaseGroup.style.display = 'none';
    }
}

function setupCycleTypeSelector() {
    const { results } = originalResults;
    const hasLoading = (results.drugs || []).some(d => d.hasLoadingDose);
    const group = document.getElementById('cycleTypeGroup');
    const sel = document.getElementById('selectCycleType');
    if (group) group.style.display = hasLoading ? 'block' : 'none';
    if (sel) sel.value = 'loading'; // always reset to loading on each Page 6 visit
}

function getActivePhaseData() {
    const protocolData = getPhaseProtocolData();

    if (protocolData) {
        if (protocolData.phases && protocolData.phases.length > 1) {
            const idx = parseInt(document.getElementById('phaseSelect').value) || 0;
            return protocolData.phases[idx];
        }
        // Single-phase or no phases array — use protocol itself as the phase
        return protocolData;
    }

    // No premed data file for this cancer type — build a generic fallback from results.drugs
    if (!originalResults) return null;
    const { results } = originalResults;
    return {
        label: null,
        emetogenicity: 'moderate',
        infusionDrugs: (results.drugs || []).map(d => d.name),
        dilution: {}
    };
}

function get5HT3Label() {
    const v = document.getElementById('select5ht3').value;
    const nk1v = document.getElementById('selectNK1').value;
    if (nk1v === 'nepa') return null; // covered by NEPA
    if (v === 'none') return null;
    const map = {
        ondansetron: 'Ondansetron 8mg IV',
        granisetron: 'Granisetron 1mg IV',
        palonosetron: 'Palonosetron 0.25mg IV'
    };
    return map[v] || null;
}

function getNK1Label() {
    const v = document.getElementById('selectNK1').value;
    if (v === 'none') return null;
    if (v === 'nepa') return 'Netupitant + Palonosetron (NEPA) 300mg/0.5mg oral';
    if (v === 'aprepitant') return 'Aprepitant 125mg oral';
    return 'Fosaprepitant 150mg IV';
}

function getAntiHistLabel() {
    const v = document.getElementById('selectAntiHist').value;
    if (v === 'none') return null;
    return v === 'diphenhydramine' ? 'Diphenhydramine 50mg IV' : 'Pheniramine Maleate 25mg IV';
}

function getAntacidRow() {
    const v = document.getElementById('selectAntacid').value;
    if (v === 'none') return null;
    const map = {
        pantoprazole:  { drug: 'Pantoprazole',  dose: '40mg' },
        omeprazole:    { drug: 'Omeprazole',    dose: '40mg' },
        esomeprazole:  { drug: 'Esomeprazole',  dose: '40mg' },
        famotidine:    { drug: 'Famotidine',    dose: '20mg' },
        ranitidine:    { drug: 'Ranitidine',    dose: '50mg' }
    };
    return map[v] || null;
}

const GF_ANC_RECOVERY_PROTOCOLS = new Set([
    // Lymphoma
    'R-EPOCH','DA-R-EPOCH','R-ICE','ICE','DHAP','R-DHAP','R-ESHAP','R-GDP','GDP',
    'R-CODOX-M-IVAC','CHOEP-PTCL',
    // Leukemia
    'HyperCVAD','Dasatinib-HyperCVAD-PhPos','Ponatinib-HyperCVAD-PhPos',
    'FLAG-IDA','R-HyperCVAD-MCL','HyperCVAD-MA-R',
    // Bladder
    'ddMVAC'
]);

function getGCSLabel() {
    const v = document.getElementById('selectGCS').value;
    if (v === 'none') return null;
    if (v === 'pegfilgrastim') return 'Inj. Pegfilgrastim 6mg SC — 24h after chemotherapy completion (single dose)';
    const protocolKey = originalResults && originalResults.results && originalResults.results.protocolKey;
    const forceANC = protocolKey && GF_ANC_RECOVERY_PROTOCOLS.has(protocolKey);
    if (v === 'filgrastimANC' || forceANC) return 'Inj. Filgrastim 5mcg/kg SC — Day 3 until ANC recovery (ANC ≥1000/μL post-nadir) [NCCN recommended]';
    if (v === 'filgrastim7') return 'Inj. Filgrastim 5mcg/kg SC — Day 3 to Day 9 (7 days)';
    return 'Inj. Filgrastim 5mcg/kg SC — Day 3 to Day 7 (5 days)';
}

// Drugs that require H1 anti-allergic premedication
const ANTI_ALLERGIC_DRUGS = [
    'paclitaxel','docetaxel',
    'rituximab','cetuximab','obinutuzumab','ofatumumab',
    'trastuzumab','pertuzumab','ado-trastuzumab',
    'trastuzumab emtansine','trastuzumab deruxtecan'
];

// Checkpoint inhibitors — used for irAE alerts and auto in-line filter notes
const ICI_DRUGS = [
    'pembrolizumab','nivolumab','ipilimumab','atezolizumab','durvalumab',
    'avelumab','cemiplimab','dostarlimab','tremelimumab',
    'toripalimab','tislelizumab','retifanlimab','relatlimab'
];

// Solvent-based taxanes — require glass/non-PVC container + Codan (non-DEHP) set + 0.22µm filter
// Nab-paclitaxel (albumin-bound) is EXCLUDED — no PVC concern, no filter
// Note under drug is SHORT; full DEHP leaching explanation goes in buildClinicalAlerts()
const SOLVENT_TAXANE_NOTE = {
    paclitaxel: 'Non-PVC/non-DEHP set (Codan) + 0.22µm filter required.',
    docetaxel:  'Non-PVC/non-DEHP set (Codan) + 0.22µm filter required.',
    cabazitaxel:'Non-PVC/non-DEHP set (Codan) + 0.22µm filter required.'
};

function needsAntiAllergicPremed(phase) {
    return (phase.infusionDrugs || []).some(d =>
        ANTI_ALLERGIC_DRUGS.some(m => d.name.toLowerCase().includes(m))
    );
}

function buildPremeds(phase) {
    const rows = [];
    const emetogenicity = phase.emetogenicity || 'moderate';
    const hasDocetaxel = phase.hasDocetaxel || false;
    const hasPaclitaxel = phase.hasPaclitaxel || false;
    const isOral = phase.isOral || false;
    const needsAntiAllergic = needsAntiAllergicPremed(phase);

    if (isOral) {
        rows.push({ drug: 'No IV pre-medications required', dose: '—', route: '—', timing: '—' });
        return rows;
    }

    // 1. NK1 antagonist (physician's discretion — shown for all regimens)
    const nk1 = document.getElementById('selectNK1').value;
    if (nk1 === 'fosaprepitant') {
        rows.push({ drug: 'Inj. Fosaprepitant', dose: '150mg', route: 'IV', timing: '30 min before chemo' });
    } else if (nk1 === 'aprepitant') {
        rows.push({ drug: 'Cap. Aprepitant', dose: '125mg', route: 'Oral', timing: '60 min before chemo' });
    } else if (nk1 === 'nepa') {
        rows.push({ drug: 'Cap. NEPA (Netupitant + Palonosetron)', dose: '300mg/0.5mg', route: 'Oral', timing: '60 min before chemo' });
    }

    // 2. Dexamethasone IV
    const dexSel = document.getElementById('selectDex').value;
    if (dexSel !== 'none') {
        const dexDose = `${dexSel}mg`;
        const dexTiming = '30 min before chemo';
        rows.push({ drug: 'Inj. Dexamethasone', dose: dexDose, route: 'IV', timing: dexTiming });
    }

    // 3. 5-HT3 antagonist
    const ht3Val = document.getElementById('select5ht3').value;
    const nk1vForHT3 = document.getElementById('selectNK1').value;
    if (ht3Val !== 'none' && nk1vForHT3 !== 'nepa') {
        const ht3Map = {
            ondansetron:  { drug: 'Inj. Ondansetron',   dose: '8mg'    },
            granisetron:  { drug: 'Inj. Granisetron',   dose: '1mg'    },
            palonosetron: { drug: 'Inj. Palonosetron',  dose: '0.25mg' }
        };
        const ht3Row = ht3Map[ht3Val];
        if (ht3Row) rows.push({ drug: ht3Row.drug, dose: ht3Row.dose, route: 'IV', timing: '30 min before chemo' });
    }

    // 4. Antacid / gastroprotective IV
    const antacid = getAntacidRow();
    if (antacid) {
        rows.push({ drug: `Inj. ${antacid.drug}`, dose: antacid.dose, route: 'IV', timing: '30 min before chemo' });
    }

    // 5. H1 anti-allergic (taxanes + chimeric/humanised MABs)
    if (needsAntiAllergic) {
        const ahVal = document.getElementById('selectAntiHist').value;
        if (ahVal !== 'none') {
            const ahMap = {
                pheniramine:     { drug: 'Inj. Pheniramine Maleate', dose: '25mg' },
                diphenhydramine: { drug: 'Inj. Diphenhydramine',     dose: '50mg' }
            };
            const ah = ahMap[ahVal];
            if (ah) {
                const ahTiming = hasPaclitaxel ? '30 min before paclitaxel' : '30 min before infusion';
                rows.push({ drug: ah.drug, dose: ah.dose, route: 'IV', timing: ahTiming });
            }
        }
    }

    if (rows.length === 0) {
        rows.push({ drug: 'No pre-medications selected', dose: '—', route: '—', timing: '—' });
    }
    return rows;
}

function buildPostMeds() {
    const rows = [];

    // Aprepitant Days 2–3 (auto-added when Cap Aprepitant chosen as NK1)
    if (document.getElementById('selectNK1').value === 'aprepitant') {
        rows.push({ name: 'Tab. Aprepitant', dose: '80mg', route: 'Oral', frequency: 'OD', duration: 'Days 2 & 3' });
    }

    // Oral antacid
    const oralAntacidMap = {
        pantoprazole: { name: 'Tab. Pantoprazole', dose: '40mg', route: 'Oral', frequency: 'OD', duration: 'Days 2–5' },
        omeprazole:   { name: 'Tab. Omeprazole',   dose: '20mg', route: 'Oral', frequency: 'OD', duration: 'Days 2–5' },
        esomeprazole: { name: 'Tab. Esomeprazole', dose: '20mg', route: 'Oral', frequency: 'OD', duration: 'Days 2–5' },
        rabeprazole:  { name: 'Tab. Rabeprazole',  dose: '20mg', route: 'Oral', frequency: 'OD', duration: 'Days 2–5' },
        famotidine:   { name: 'Tab. Famotidine',   dose: '40mg', route: 'Oral', frequency: 'OD', duration: 'Days 2–5' },
        ranitidine:   { name: 'Tab. Ranitidine',   dose: '150mg', route: 'Oral', frequency: 'BD', duration: 'Days 2–5' }
    };
    const oralAntacidVal = document.getElementById('selectOralAntacid').value;
    if (oralAntacidVal !== 'none' && oralAntacidMap[oralAntacidVal]) {
        rows.push(oralAntacidMap[oralAntacidVal]);
    }

    // Oral antiemetics
    const oralOndan = document.getElementById('selectOralOndansetron').value;
    if (oralOndan !== 'none') {
        const [dose, freq] = oralOndan.split(' ');
        rows.push({ name: 'Tab. Ondansetron', dose, route: 'Oral', frequency: freq, duration: 'Days 2–4' });
    }

    const oralDex = document.getElementById('selectOralDex').value;
    if (oralDex !== 'none') {
        const [dose, freq] = oralDex.split(' ');
        rows.push({ name: 'Tab. Dexamethasone', dose, route: 'Oral', frequency: freq, duration: 'Days 2–4' });
    }

    const oralOlanz = document.getElementById('selectOralOlanzapine').value;
    if (oralOlanz !== 'none') {
        const [dose] = oralOlanz.split(' ');
        rows.push({ name: 'Tab. Olanzapine', dose, route: 'Oral', frequency: 'SOS', duration: 'As needed' });
    }

    return rows;
}

// Detects 5-FU continuous-infusion drugs and returns dose display + Baxter pump recommendation.
// Returns null if not a 5-FU CI drug.
function get5FUCIInfo(drugName, calcDrug, reduction) {
    if (!calcDrug) return null;
    const name = (drugName || '').toLowerCase();
    const sched = (calcDrug.schedule || '').toLowerCase();

    // Must be a fluorouracil drug
    if (!name.includes('fluorouracil')) return null;
    // Must be CI: name says "continuous" OR schedule has CI indicator
    const isCI = name.includes('continuous') || /\bci\b/.test(sched) ||
                 sched.includes('continuous') || sched.includes('daily ci');
    if (!isCI) return null;

    const rawDose = parseFloat(calcDrug.calculatedDose);
    if (isNaN(rawDose) || rawDose <= 0) return null;
    const red = reduction || 0;
    const reducedDose = rawDose * (1 - red / 100);

    // ── 46-hour CI (FOLFOX / FOLCIS / DCF type) ──────────────────────────────
    // Dose is the TOTAL for the 46h infusion, not per-day.
    // Standard worldwide: Baxter Infusor LV5 — 5mL/h, 240mL fill, D5W, 48h nominal.
    if (sched.includes('46h') || sched.includes('46 h') || sched.includes('46-h') || sched.includes('46hr')) {
        const total = Math.round(reducedDose / 100) * 100;
        return {
            doseText:     `${total} mg <small style="color:#555">(total over 46h)</small>`,
            volumeText:   '240mL',
            durationText: `46h CI &mdash; Baxter Infusor LV5 (5mL/h)`
        };
    }

    // ── Multi-day CI (D1–D4, D1–D5, etc.) ────────────────────────────────────
    const dayMatch = sched.match(/d(\d+)\s*[\-\u2013]\s*d(\d+)/i);
    if (dayMatch) {
        const startDay = parseInt(dayMatch[1]);
        const endDay   = parseInt(dayMatch[2]);
        const numDays  = endDay - startDay + 1;
        const daily    = Math.round(reducedDose / 50) * 50;
        const total    = daily * numDays;
        const hours    = numDays * 24;
        return {
            doseText:     `${daily} mg/day &times; ${numDays} days<br><small style="color:#555">Total: ${total} mg over ${hours}h</small>`,
            volumeText:   'Per pharmacy',
            durationText: `${hours}h CI (D${startDay}–D${endDay})`
        };
    }

    // ── Daily CI without explicit day range (e.g. "daily CI during RT") ───────
    const daily24 = Math.round(reducedDose / 50) * 50;
    return {
        doseText:     `${daily24} mg/day`,
        volumeText:   'Per pharmacy',
        durationText: `Daily CI`
    };
}

function buildInfusionRows(phase) {
    if (!originalResults) return [];
    const { results } = originalResults;
    const phaseDrugs = phase.infusionDrugs || [];

    // Premed data file path: infusionDrugs = array of objects with .sequence, .name, .solvent etc.
    const hasDetailedData = phaseDrugs.length > 0 && typeof phaseDrugs[0] === 'object' && phaseDrugs[0].sequence;

    if (hasDetailedData) {
        const cycleType = (document.getElementById('selectCycleType') || {}).value || 'loading';

        // Build occurrence-order lookup: when two premed entries share the same drug name
        // (e.g. '5-Fluorouracil' bolus + '5-Fluorouracil' CI), the Nth premed entry
        // matches the Nth drug of that name in results.drugs — preventing the CI entry
        // from always resolving to the first (bolus) drug via .find().
        const drugNameOccurrenceCount = {};
        const sortedPhaseDrugs = phaseDrugs
            .filter(d => d.sequence)
            .sort((a, b) => a.sequence - b.sequence);

        // Pre-group results.drugs by lowercase name, preserving order
        const resultsDrugsByName = {};
        results.drugs.forEach(r => {
            const key = r.name.toLowerCase();
            if (!resultsDrugsByName[key]) resultsDrugsByName[key] = [];
            resultsDrugsByName[key].push(r);
        });

        return sortedPhaseDrugs
            .map(d => {
                const nameKey = d.name.toLowerCase();
                const occIdx = drugNameOccurrenceCount[nameKey] || 0;
                drugNameOccurrenceCount[nameKey] = occIdx + 1;
                const candidates = resultsDrugsByName[nameKey] || [];
                const calcDrug = candidates[occIdx] || candidates[0] || null;
                const reduction = (typeof currentReductions !== 'undefined' && currentReductions[d.name]) || 0;

                // Check for 5-FU CI special display (daily dose × days + Baxter pump)
                const ciInfo = get5FUCIInfo(d.name, calcDrug, reduction);

                let doseDisplay = '—';

                // Duration: respect loading/maintenance-specific overrides from premed file
                let durationDisplay = d.duration || '—';
                if (cycleType === 'maintenance' && d.durationMaintenance) durationDisplay = d.durationMaintenance;
                else if (cycleType === 'loading' && d.durationLoading) durationDisplay = d.durationLoading;

                let volumeDisplay  = typeof d.volume === 'number' ? `${d.volume}mL` : (d.volume || '—');

                if (ciInfo) {
                    doseDisplay    = ciInfo.doseText;
                    volumeDisplay  = ciInfo.volumeText;
                    durationDisplay = ciInfo.durationText;
                } else if (calcDrug) {
                    // For loading dose drugs, calculatedDose is stored as "loading → maintenance"
                    const isLoadingDrug = calcDrug.hasLoadingDose && typeof calcDrug.calculatedDose === 'string' && calcDrug.calculatedDose.includes('→');
                    let rawDose;
                    if (isLoadingDrug && cycleType === 'maintenance') {
                        rawDose = parseFloat(calcDrug.calculatedDose.split('→')[1].trim());
                    } else if (isLoadingDrug) {
                        rawDose = parseFloat(calcDrug.calculatedDose.split('→')[0].trim());
                    } else {
                        rawDose = parseFloat(calcDrug.calculatedDose);
                    }
                    if (!isNaN(rawDose)) {
                        const reduced = rawDose * (1 - reduction / 100);
                        const rounded = roundDose(reduced, d.name, results.protocolName || '');
                        doseDisplay = `${rounded} mg`;
                    }
                }

                // Auto-append administration notes based on drug class
                const drugLower = d.name.toLowerCase();
                const existingNote = d.note || '';
                const existingNoteLower = existingNote.toLowerCase();

                // Checkpoint inhibitors — 0.2 micron filter
                const isICI = ICI_DRUGS.some(m => drugLower.includes(m));
                const filterNote = isICI && !existingNoteLower.includes('filter')
                    ? 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions.'
                    : '';

                // Solvent-based taxanes — glass/non-PVC + Codan set + 0.22µm filter
                // Exclude nab-paclitaxel (albumin-bound — no PVC concern, no filter)
                const isNabPaclitaxel = drugLower.includes('nab') && drugLower.includes('paclitaxel');
                const taxaneKey = !isNabPaclitaxel && Object.keys(SOLVENT_TAXANE_NOTE).find(k => drugLower.includes(k));
                const taxaneNote = taxaneKey && !existingNote && !existingNoteLower.includes('codan') && !existingNoteLower.includes('glass bottle')
                    ? SOLVENT_TAXANE_NOTE[taxaneKey]
                    : '';

                // Cisplatin — mandatory hydration + electrolyte monitoring (all regimens, all cancer types)
                const isCisplatin = drugLower.includes('cisplatin');
                const cisNote = isCisplatin && !existingNoteLower.includes('hydrat')
                    ? 'Pre + post IV hydration required. Supplement Mg²⁺ and K⁺. See Clinical Alerts.'
                    : '';

                const noteDisplay = [existingNote, filterNote, taxaneNote, cisNote].filter(Boolean).join(' ');

                return {
                    seq: d.sequence,
                    drug: d.name,
                    dose: doseDisplay,
                    solvent: d.solvent || '—',
                    volume: volumeDisplay,
                    duration: durationDisplay,
                    note: noteDisplay || null
                };
            });
    }

    // Empty infusionDrugs from a data file = oral/no-IV regimen
    if (phaseDrugs.length === 0 && getPhaseProtocolData() !== null) {
        return [{ seq: '—', drug: 'No IV chemotherapy — administered orally / subcutaneously', dose: '—', solvent: 'N/A', volume: 'N/A', duration: 'N/A' }];
    }

    // Fallback path: build from results.drugs (no dilution data — will show as —)
    const cycleTypeFb = (document.getElementById('selectCycleType') || {}).value || 'loading';
    return results.drugs.map((d, i) => {
        const reduction = (typeof currentReductions !== 'undefined' && currentReductions[d.name]) || 0;

        const ciInfo = get5FUCIInfo(d.name, d, reduction);
        let doseDisplay = '—';
        let durationDisplay = '—';
        let volumeDisplay = '—';

        if (ciInfo) {
            doseDisplay    = ciInfo.doseText;
            volumeDisplay  = ciInfo.volumeText;
            durationDisplay = ciInfo.durationText;
        } else {
            const isLoadingDrug = d.hasLoadingDose && typeof d.calculatedDose === 'string' && d.calculatedDose.includes('→');
            let rawDose;
            if (isLoadingDrug && cycleTypeFb === 'maintenance') {
                rawDose = parseFloat(d.calculatedDose.split('→')[1].trim());
            } else if (isLoadingDrug) {
                rawDose = parseFloat(d.calculatedDose.split('→')[0].trim());
            } else {
                rawDose = parseFloat(d.calculatedDose);
            }
            if (!isNaN(rawDose)) {
                const reduced = rawDose * (1 - reduction / 100);
                const rounded = roundDose(reduced, d.name, results.protocolName || '');
                doseDisplay = `${rounded} mg`;
            }
        }

        // Auto-append drug class notes (fallback path — same logic as detailed path)
        const drugLowerFb = d.name.toLowerCase();
        const isICIFb = ICI_DRUGS.some(m => drugLowerFb.includes(m));
        const filterNoteFb = isICIFb
            ? 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions.'
            : '';
        const isNabFb = drugLowerFb.includes('nab') && drugLowerFb.includes('paclitaxel');
        const taxaneKeyFb = !isNabFb && Object.keys(SOLVENT_TAXANE_NOTE).find(k => drugLowerFb.includes(k));
        const taxaneNoteFb = taxaneKeyFb && !drugLowerFb.includes('codan') ? SOLVENT_TAXANE_NOTE[taxaneKeyFb] : '';
        const cisNoteFb = drugLowerFb.includes('cisplatin')
            ? 'Mandatory pre-hydration (1–2L IV NS over 2–4h before) and post-hydration (1–2L IV NS after). Supplement Mg²⁺ and K⁺ before each cycle (cisplatin causes obligate renal wasting). Target urine output ≥100 mL/hr during infusion.'
            : '';
        const noteDisplayFb = [filterNoteFb, taxaneNoteFb, cisNoteFb].filter(Boolean).join(' ');

        return {
            seq: i + 1,
            drug: d.name,
            dose: doseDisplay,
            solvent: '—',
            volume: volumeDisplay,
            duration: durationDisplay,
            note: noteDisplayFb || null
        };
    });
}

function extractPhaseCycles(phase, results) {
    // Explicit cycles set on the phase take priority
    if (phase && phase.cycles) return phase.cycles;
    // For single-phase protocols, use total cycles
    const protocolData = getPhaseProtocolData();
    if (!protocolData || !protocolData.phases || protocolData.phases.length <= 1) return null;
    // For sequential protocols: extract cycles from the schedule string of any phase drug in breast.js
    if (!results) return null;
    const phaseDrugs = phase.infusionDrugs || [];
    for (const pd of phaseDrugs) {
        const calcDrug = results.drugs.find(d => d.name.toLowerCase() === pd.name.toLowerCase());
        if (calcDrug && calcDrug.schedule) {
            const match = calcDrug.schedule.match(/x\s*(\d+)\s*cycles?/i);
            if (match) return parseInt(match[1]);
        }
    }
    // Fallback: divide total cycles evenly
    return Math.round(results.cycles / protocolData.phases.length);
}

function buildOralChemoRows(phase) {
    if (!originalResults) return [];
    // Only run when a premed data file exists — fallback path shows all drugs in infusion table
    if (!getPhaseProtocolData()) return [];
    const { results } = originalResults;

    // For multi-phase sequential regimens, exclude drugs that appear in ANY phase's infusionDrugs
    // (prevents Phase 2 IV drugs from being misidentified as oral when Phase 1 is shown)
    const protocolData = getPhaseProtocolData();
    let infusionNames;
    if (protocolData && protocolData.phases && protocolData.phases.length > 1) {
        infusionNames = new Set(
            protocolData.phases.flatMap(p =>
                (p.infusionDrugs || []).map(d => (typeof d === 'object' ? d.name : d).toLowerCase())
            )
        );
    } else {
        infusionNames = new Set(
            (phase.infusionDrugs || []).map(d => (typeof d === 'object' ? d.name : d).toLowerCase())
        );
    }

    // Remaining drugs from results = oral / SC / agents not given by IV infusion
    return results.drugs
        .filter(d => !infusionNames.has(d.name.toLowerCase()))
        .map((d, i) => {
            const reduction = (typeof currentReductions !== 'undefined' && currentReductions[d.name]) || 0;
            let doseDisplay = '—';
            const rawDose = parseFloat(d.calculatedDose);
            if (!isNaN(rawDose) && rawDose > 0) {
                const reduced = rawDose * (1 - reduction / 100);
                const rounded = roundDose(reduced, d.name, results.protocolName || '');
                doseDisplay = `${rounded} mg`;
            } else if (d.dose) {
                doseDisplay = `${d.dose}${d.unit ? ' ' + d.unit : ''}`;
            }
            return {
                num: i + 1,
                drug: d.name,
                dose: doseDisplay,
                route: 'Oral',
                schedule: d.schedule || '—'
            };
        });
}

function buildClinicalAlerts(results) {
    const alerts = [];
    const drugs = results.drugs || [];
    const hasDrug = (name) => drugs.some(d => d.name.toLowerCase().includes(name.toLowerCase()));
    const getDrug  = (name) => drugs.find(d => d.name.toLowerCase().includes(name.toLowerCase()));

    // Docetaxel / Cabazitaxel — mandatory pre-treatment dexamethasone
    if (hasDrug('docetaxel') || hasDrug('cabazitaxel')) {
        const drug = hasDrug('docetaxel') ? 'Docetaxel' : 'Cabazitaxel';
        alerts.push({
            title: `${drug} — Mandatory Pre-treatment Dexamethasone`,
            text: `Tab. Dexamethasone 8 mg BD orally on Day −1, Day 0, and Day +1 — mandatory to prevent fluid retention and hypersensitivity reactions.`
        });
    }

    // Bleomycin — test dose
    if (hasDrug('bleomycin')) {
        alerts.push({
            title: 'Bleomycin — Test Dose Required',
            text: 'Administer a test dose of 1–2 units IM or IV before the first cycle. Observe for 60 minutes for signs of anaphylaxis or idiosyncratic reaction before proceeding with the full dose.'
        });
    }

    // Rituximab — first infusion rate
    if (hasDrug('rituximab')) {
        alerts.push({
            title: 'Rituximab — Infusion Rate (First Cycle)',
            text: 'First infusion: start at 50mg/hr, increase by 50mg/hr every 30 minutes as tolerated, to a maximum of 400mg/hr. Subsequent cycles: may start at 100mg/hr if previous cycle was well tolerated. Have resuscitation equipment available.'
        });
    }

    // Cisplatin — hydration protocol
    if (hasDrug('cisplatin')) {
        alerts.push({
            title: 'Cisplatin — IV Hydration & Electrolyte Monitoring',
            text: 'Pre-hydrate 1–2L NS over 2–4h before cisplatin; post-hydrate 1–2L NS after. Monitor and supplement Mg²⁺ and K⁺ each cycle (obligate renal wasting). Target urine output ≥100 mL/h during infusion.'
        });
    }

    // Ifosfamide — MESNA
    if (hasDrug('ifosfamide')) {
        alerts.push({
            title: 'Ifosfamide — MESNA Uroprotection Required',
            text: 'MESNA mandatory to prevent haemorrhagic cystitis: 60–100% of ifosfamide dose IV at 0h, 4h, and 8h relative to each ifosfamide dose. Maintain adequate IV hydration.'
        });
    }

    // High-dose cyclophosphamide — MESNA
    const cyclo = getDrug('cyclophosphamide');
    if (cyclo && cyclo.unit === 'mg/m²' && Number(cyclo.dose) >= 1000) {
        alerts.push({
            title: 'High-dose Cyclophosphamide — MESNA Uroprotection',
            text: 'MESNA recommended for cyclophosphamide ≥1000mg/m². Standard: MESNA 20% of cyclophosphamide dose IV at 0h, 4h, and 8h after cyclophosphamide administration. Ensure adequate oral and IV hydration.'
        });
    }

    // High-dose Methotrexate — leucovorin rescue
    const mtx = getDrug('methotrexate');
    if (mtx && mtx.unit === 'mg/m²' && Number(mtx.dose) >= 500) {
        alerts.push({
            title: 'High-dose Methotrexate — Leucovorin Rescue & Urinary Alkalinisation',
            text: 'Alkalinise urine to pH ≥7 before and during infusion. Begin leucovorin rescue 24h after MTX start; continue until MTX level <0.1 μmol/L. Monitor MTX levels at 24h/48h/72h. Maintain urine output ≥100 mL/h.'
        });
    }

    // Oxaliplatin — cold sensitivity
    if (hasDrug('oxaliplatin')) {
        alerts.push({
            title: 'Oxaliplatin — Cold Sensitivity Counselling',
            text: 'Avoid cold food, drinks, and surfaces (including cold water) for 5–7 days post-dose. Cold-induced dysaesthesia worsens with cumulative doses. Wear gloves when handling cold objects.'
        });
    }

    // Capecitabine — hand-foot syndrome
    if (hasDrug('capecitabine')) {
        alerts.push({
            title: 'Capecitabine — Hand-Foot Syndrome Monitoring',
            text: 'Counsel patient on hand-foot syndrome (palmar-plantar erythrodysaesthesia): moisturise hands and feet regularly with urea-based cream, avoid tight footwear and friction. Report early signs of redness, swelling, blistering, or pain. Dose reduce or interrupt for Grade 2–3 toxicity.'
        });
    }

    // Vinblastine — constipation prophylaxis (vinca alkaloid class effect)
    if (hasDrug('vinblastine')) {
        alerts.push({
            title: 'Vinblastine — Constipation Prophylaxis',
            text: 'Vinca alkaloid autonomic neuropathy can cause constipation and, rarely, paralytic ileus. Prophylactic laxatives recommended from Day 1 (bisacodyl or senna). Monitor bowel function each cycle.'
        });
    }

    // Vincristine — constipation prophylaxis
    if (hasDrug('vincristine')) {
        alerts.push({
            title: 'Vincristine — Constipation Prophylaxis',
            text: 'Prophylactic laxatives from Day 1 (bisacodyl 5–10 mg or senna 15 mg at bedtime). Vincristine autonomic neuropathy can cause paralytic ileus — monitor bowel function each cycle.'
        });
    }

    // Etoposide — infusion rate
    if (hasDrug('etoposide')) {
        alerts.push({
            title: 'Etoposide — Minimum Infusion Duration',
            text: 'Etoposide must be infused over a minimum of 30–60 minutes. Rapid IV administration causes hypotension, bronchospasm, and anaphylactoid reactions. Do not administer as an IV bolus. Dilute to a maximum concentration of 0.4mg/mL in NS or D5W.'
        });
    }

    // Mitotane — adrenal replacement + monitoring
    if (hasDrug('mitotane')) {
        alerts.push({
            title: 'Mitotane — Mandatory Adrenal Replacement Therapy',
            text: 'Adrenal replacement mandatory: hydrocortisone 15–25 mg/day + fludrocortisone 0.05–0.1 mg/day before or at treatment start. Plasma levels target 14–20 mg/L (check at 4–6 weeks, then monthly). Potent CYP3A4 inducer — review warfarin, antiepileptics, oral contraceptives.'
        });
    }

    // Streptozocin — renal and metabolic monitoring
    if (hasDrug('streptozocin')) {
        alerts.push({
            title: 'Streptozocin — Renal, Hepatic & Glucose Monitoring',
            text: 'Monitor renal function before every cycle (cumulative nephrotoxicity — dose-limiting). Blood glucose before and after each infusion (acute insulin release → hypoglycaemia; cumulative doses → diabetes). LFTs each cycle. Adequate IV hydration required.'
        });
    }

    // Mitomycin-C — HUS / TMA warning
    if (hasDrug('mitomycin')) {
        alerts.push({
            title: 'Mitomycin-C — Risk of Haemolytic Uraemic Syndrome (HUS / TMA)',
            text: 'HUS/TMA risk is cumulative-dose dependent — significantly increased at total dose >60 mg. Monitor FBC, blood film, creatinine, and LDH before every cycle. Schistocytes + rising creatinine + falling platelets → stop drug + urgent haematology review.'
        });
    }

    // Solvent-based taxanes — DEHP leaching & non-PVC administration
    const hasPaclitaxel = hasDrug('paclitaxel') && !drugs.some(d => d.name.toLowerCase().includes('nab') && d.name.toLowerCase().includes('paclitaxel'));
    const hasDocetaxelOrCabazitaxel = hasDrug('docetaxel') || hasDrug('cabazitaxel');
    if (hasPaclitaxel) {
        alerts.push({
            title: 'Paclitaxel — Non-DEHP Administration Required',
            text: 'Cremophor EL vehicle leaches DEHP from PVC — use non-PVC bag and non-DEHP set (Codan or equivalent) + 0.22µm in-line filter. Nab-paclitaxel (albumin-bound) does NOT require these precautions.'
        });
    }
    if (hasDocetaxelOrCabazitaxel) {
        const taxName = hasDrug('docetaxel') ? 'Docetaxel' : 'Cabazitaxel';
        alerts.push({
            title: `${taxName} — Non-DEHP Administration Required (Polysorbate 80 Vehicle)`,
            text: `${taxName} is formulated in polysorbate 80 (Tween 80) which leaches DEHP from PVC. Use glass or non-PVC container + non-DEHP infusion set (Codan or equivalent) + 0.22 µm in-line filter.`
        });
    }

    // Vismodegib — embryo-fetal toxicity & contraception
    if (hasDrug('vismodegib')) {
        alerts.push({
            title: 'Vismodegib — Embryo-fetal Toxicity & Contraception Requirements',
            text: 'Teratogenic — Category X. Females: 2 forms contraception during + 24 months post; no breastfeeding 24 months post. Males (incl. vasectomy): condoms during + 3 months post; no semen donation. No blood donation during treatment.'
        });
    }

    // Sonidegib — embryo-fetal toxicity, contraception & rhabdomyolysis
    if (hasDrug('sonidegib')) {
        alerts.push({
            title: 'Sonidegib — Embryo-fetal Toxicity & Contraception Requirements',
            text: 'Teratogenic with long half-life (~28 days). Females: 2 forms contraception during + 20 months post. Males: condoms during + 8 months post; no semen donation. No blood donation.'
        });
        alerts.push({
            title: 'Sonidegib — Musculoskeletal Toxicity & Rhabdomyolysis Monitoring',
            text: 'Sonidegib can cause musculoskeletal adverse effects including muscle spasms, myalgia, and rhabdomyolysis. Monitor serum creatine kinase (CK) and creatinine at baseline, then periodically during treatment and as clinically indicated. Withhold sonidegib for CK elevation 2.5–5× ULN with worsening muscle symptoms; permanently discontinue for CK >5× ULN or recurrent CK elevation 2.5–5× ULN. Advise patients to report new or worsening muscle pain, tenderness, or weakness promptly.'
        });
    }

    // Immune Checkpoint Inhibitors — general irAE counselling
    const hasICI = ICI_DRUGS.some(d => hasDrug(d));
    if (hasICI) {
        alerts.push({
            type: 'info',
            title: 'Immune Checkpoint Inhibitor — irAE Counselling',
            text: 'Report immediately: new cough/breathlessness (pneumonitis), diarrhoea >3×/day or blood in stool (colitis), jaundice (hepatitis), severe fatigue + headache (hypophysitis), widespread rash, chest pain/palpitations (myocarditis). ' +
                  'Monitor LFTs, TFTs, blood glucose, and cortisol before each cycle. Hold for Grade 2; permanently discontinue for Grade 3–4. Do not self-medicate with steroids.'
        });
    }

    // Ipilimumab (CTLA-4) — elevated irAE risk, especially colitis
    if (hasDrug('ipilimumab')) {
        alerts.push({
            title: 'Ipilimumab (CTLA-4 Inhibitor) — Elevated irAE Risk',
            text: 'Higher irAE rate than PD-1/PD-L1 inhibitors — especially colitis (~10–15%). Grade 2 (≥4 stools/day): hold, start prednisolone 0.5–1 mg/kg/day oral. Grade 3–4 (≥7 stools/day, blood PR, fever): admit, IV methylprednisolone 1–2 mg/kg/day; consider infliximab 5 mg/kg if no response at 48–72h. Permanently discontinue for any Grade 3–4 irAE. Risk further increased in combination with PD-1 inhibitors.'
        });
    }

    // FGFR Inhibitors — class-specific alerts (pemigatinib, futibatinib, infigratinib)
    const hasFGFRi = hasDrug('pemigatinib') || hasDrug('futibatinib') || hasDrug('infigratinib') || hasDrug('erdafitinib');
    if (hasFGFRi) {
        alerts.push({
            title: 'FGFR Inhibitor — Hyperphosphatemia',
            text: 'Monitor serum phosphate: baseline → weekly × 4 weeks → monthly. Low-phosphate diet (restrict dairy, nuts, cola). Add phosphate binder if >5.5 mg/dL. Hold for Grade 4 (>7.0 mg/dL) or symptomatic (cramps, tetany); resume at reduced dose after resolution.'
        });
        alerts.push({
            title: 'FGFR Inhibitor — Ocular Toxicity (Central Serous Retinopathy / Retinal Detachment)',
            text: 'Baseline ophthalmology (fundoscopy + OCT) before starting. Monitor monthly × 4 months, then every 3 months. Report immediately: blurred vision, floaters, visual field changes. Hold for symptomatic CSR/SRD; permanently discontinue Grade 3–4. Advise no driving if visual symptoms develop.'
        });
        alerts.push({
            type: 'info',
            title: 'FGFR Inhibitor — Nail Toxicity (Paronychia / Onycholysis)',
            text: 'Inspect nails at each visit. Grade 1: warm soaks + antiseptic. Grade 2: oral antibiotics (cefalexin or doxycycline). Grade 3: hold drug, refer to dermatology. Advise well-fitting footwear and avoid nail polish during treatment.'
        });
        alerts.push({
            title: 'FGFR Inhibitor — Embryo-fetal Toxicity',
            text: 'Teratogenic. Verify negative pregnancy test before starting. Females: effective contraception during + ≥1 month after last dose; no breastfeeding. Males: condoms during + ≥1 week after last dose.'
        });
    }

    // NTRK inhibitors (larotrectinib, entrectinib, repotrectinib)
    const hasNTRKi = hasDrug('larotrectinib') || hasDrug('entrectinib') || hasDrug('repotrectinib');
    if (hasNTRKi) {
        alerts.push({
            title: 'NTRK Inhibitor — Neurotoxicity',
            text: 'Dizziness, ataxia, cognitive impairment, and sleep disturbances are common. Advise no driving or operating machinery if symptomatic. Hold for Grade 3+; resume at reduced dose after resolution.'
        });
        alerts.push({
            title: 'NTRK Inhibitor — Hepatotoxicity',
            text: 'Monitor LFTs at baseline, then monthly. Hold for Grade 3 elevation; permanently discontinue for Grade 4 or recurrent Grade 3.'
        });
        alerts.push({
            type: 'info',
            title: 'NTRK Inhibitor — CYP3A4 Drug Interactions',
            text: 'Strong CYP3A4 inhibitors (azole antifungals, clarithromycin) increase drug levels; strong inducers (rifampicin, phenytoin, carbamazepine) reduce efficacy. Review all concomitant medications. Avoid grapefruit and grapefruit juice.'
        });
        alerts.push({
            title: 'NTRK Inhibitor — Embryo-fetal Toxicity',
            text: 'Teratogenic. Effective contraception during treatment and for ≥1 week after last dose (both sexes). Avoid breastfeeding during treatment.'
        });
    }

    // Entrectinib — additional QTc alert (beyond general NTRK alerts)
    if (hasDrug('entrectinib')) {
        alerts.push({
            title: 'Entrectinib — QTc Prolongation',
            text: 'Baseline ECG before starting. Avoid concomitant QTc-prolonging drugs. Correct electrolyte imbalances (K⁺, Mg²⁺) before and during treatment. Hold for QTc >500ms or increase >60ms from baseline.'
        });
    }

    // KRAS G12C inhibitors (sotorasib, adagrasib)
    const hasKRASi = hasDrug('sotorasib') || hasDrug('adagrasib');
    if (hasKRASi) {
        alerts.push({
            title: 'KRAS G12C Inhibitor — Hepatotoxicity',
            text: 'Monitor LFTs at baseline, every 3 weeks for the first 3 months, then monthly. Hold for Grade 3; permanently discontinue for Grade 4 or recurrent Grade 3.'
        });
        alerts.push({
            title: 'KRAS G12C Inhibitor — Interstitial Lung Disease / Pneumonitis',
            text: 'Report new or worsening dyspnoea, cough, or fever promptly. Hold drug immediately if ILD/pneumonitis suspected; arrange CT chest. Permanently discontinue if confirmed.'
        });
        alerts.push({
            title: 'KRAS G12C Inhibitor — Embryo-fetal Toxicity',
            text: 'Teratogenic. Females: effective contraception during + ≥6 months after last dose; no breastfeeding. Males: condoms during + ≥3 months after last dose.'
        });
    }

    // Adagrasib — additional QTc alert
    if (hasDrug('adagrasib')) {
        alerts.push({
            title: 'Adagrasib — QTc Prolongation',
            text: 'Baseline ECG before starting; repeat at 1 week and 1 month. Avoid QTc-prolonging drugs. Correct K⁺ and Mg²⁺ before and during treatment. Hold for QTc >500ms or increase >60ms from baseline; permanently discontinue for life-threatening arrhythmia.'
        });
    }

    // Cabozantinib (multi-target TKI: VEGFR, MET, AXL, RET)
    if (hasDrug('cabozantinib')) {
        alerts.push({
            title: 'Cabozantinib — Hypertension',
            text: 'Monitor BP before each cycle and regularly during treatment. Initiate or optimise antihypertensives as needed. Hold for hypertensive crisis (>180/120 mmHg); permanently discontinue for hypertensive encephalopathy.'
        });
        alerts.push({
            title: 'Cabozantinib — Hand-Foot Syndrome',
            text: 'Inspect hands and feet at each visit. Start emollients early. Dose reduce for Grade 2; hold for Grade 3 until ≤Grade 1, then resume at reduced dose.'
        });
        alerts.push({
            title: 'Cabozantinib — GI Perforation / Fistula & Wound Healing',
            text: 'Rare but serious. Report severe or persistent abdominal pain — hold and investigate urgently. Hold ≥28 days before elective surgery; do not resume until adequate wound healing.'
        });
        alerts.push({
            title: 'Cabozantinib — Embryo-fetal Toxicity',
            text: 'Teratogenic. Females: effective contraception during + ≥4 months after last dose; no breastfeeding. Males: condoms during + ≥3 months after last dose.'
        });
    }

    // Sorafenib (RAF/VEGFR/PDGFR/KIT TKI)
    if (hasDrug('sorafenib')) {
        alerts.push({
            title: 'Sorafenib — Hypertension & Cardiovascular',
            text: 'Monitor BP weekly × 6 weeks then monthly. Initiate antihypertensives as needed. Hold for hypertensive crisis or cardiac ischaemia.'
        });
        alerts.push({
            title: 'Sorafenib — Hand-Foot Skin Reaction (HFSR)',
            text: 'Inspect hands and feet at each visit. Emollients from day 1. Dose reduce for Grade 2; hold for Grade 3.'
        });
        alerts.push({
            title: 'Sorafenib — Hepatotoxicity',
            text: 'LFTs at baseline, q4 weeks × 3 months, then q3 months. Hold Grade 3; permanently discontinue Grade 4.'
        });
        alerts.push({
            title: 'Sorafenib — Embryo-fetal Toxicity',
            text: 'Females: contraception during + ≥6 months post; no breastfeeding. Males: condoms during + ≥3 months post.'
        });
    }

    // Regorafenib (RAF/VEGFR/PDGFR/KIT/FGFR TKI)
    if (hasDrug('regorafenib')) {
        alerts.push({
            title: 'Regorafenib — Hepatotoxicity (Black Box)',
            text: 'LFTs before start, then at weeks 2, 4, 6, 8, then q3 months. Hold Grade 3; permanently discontinue Grade 4 or recurrent Grade 3.'
        });
        alerts.push({
            title: 'Regorafenib — Hand-Foot Skin Reaction (HFSR)',
            text: 'Emollients from day 1. Dose reduce Grade 2; hold Grade 3 until ≤Grade 1, then resume at reduced dose.'
        });
        alerts.push({
            title: 'Regorafenib — Hypertension & Haemorrhage',
            text: 'Monitor BP weekly × 6 weeks then monthly. Hold for severe bleeding or hypertensive crisis. Hold ≥2 weeks before elective surgery.'
        });
        alerts.push({
            title: 'Regorafenib — Embryo-fetal Toxicity',
            text: 'Females: contraception during + ≥2 months post; no breastfeeding. Males: condoms during + ≥2 months post.'
        });
    }

    // Imatinib (BCR-ABL/KIT/PDGFR TKI)
    if (hasDrug('imatinib')) {
        alerts.push({
            title: 'Imatinib — Hepatotoxicity',
            text: 'LFTs at baseline, then monthly × 3 months, then q3 months thereafter. Hold Grade 3; permanently discontinue Grade 4.'
        });
        alerts.push({
            title: 'Imatinib — Fluid Retention & Oedema',
            text: 'Monitor weight weekly. Periorbital or peripheral oedema common; severe cases (pleural effusion, ascites) → dose reduce or hold. Diuretics as needed.'
        });
        alerts.push({
            type: 'info',
            title: 'Imatinib — CYP3A4 Drug Interactions',
            text: 'Strong CYP3A4 inhibitors (ketoconazole, clarithromycin) increase imatinib levels. Strong inducers (rifampicin, phenytoin) decrease levels significantly — avoid or adjust dose. Avoid grapefruit juice.'
        });
    }

    // Dasatinib (BCR-ABL/SRC TKI)
    if (hasDrug('dasatinib')) {
        alerts.push({
            title: 'Dasatinib — Pleural Effusion',
            text: 'New dyspnoea or cough → CXR/ultrasound. Grade 2: dose reduce/hold + diuretics; Grade 3–4: hold until resolved, then resume at lower dose.'
        });
        alerts.push({
            title: 'Dasatinib — Pulmonary Arterial Hypertension (PAH)',
            text: 'Rare but serious. Assess if progressive exertional dyspnoea or fatigue — echocardiogram. Permanently discontinue if PAH confirmed.'
        });
        alerts.push({
            title: 'Dasatinib — Hepatotoxicity',
            text: 'LFTs at baseline and monthly during treatment. Hold Grade 3; permanently discontinue Grade 4.'
        });
    }

    // Sunitinib (multi-target VEGFR/PDGFR/KIT/RET TKI)
    if (hasDrug('sunitinib')) {
        alerts.push({
            title: 'Sunitinib — Hepatotoxicity (Severe/Fatal)',
            text: 'LFTs at baseline, q3 weeks × 3 cycles, then q3 months. Hold Grade 3; permanently discontinue Grade 4 or fulminant hepatitis.'
        });
        alerts.push({
            title: 'Sunitinib — Hypertension & Cardiac Toxicity',
            text: 'Monitor BP weekly. Echo/LVEF at baseline and if cardiotoxicity suspected. Hold for hypertensive crisis or LVEF fall >20% from baseline.'
        });
        alerts.push({
            title: 'Sunitinib — Hand-Foot Syndrome',
            text: 'Emollients from start of treatment. Dose reduce for Grade 2; hold for Grade 3.'
        });
        alerts.push({
            title: 'Sunitinib — Embryo-fetal Toxicity',
            text: 'Females: contraception during + ≥4 weeks post; no breastfeeding. Males: condoms during + ≥7 weeks post.'
        });
    }

    // Avapritinib (KIT/PDGFRA D842V inhibitor)
    if (hasDrug('avapritinib')) {
        alerts.push({
            title: 'Avapritinib — Intracranial Haemorrhage',
            text: 'Rare but serious. Report new headache, visual disturbance, or neurological symptoms immediately. Withhold and evaluate urgently; permanently discontinue if confirmed.'
        });
        alerts.push({
            title: 'Avapritinib — Cognitive Effects',
            text: 'Memory impairment and altered cognition reported (especially at 300mg). Counsel patient; advise caution driving. Hold for Grade ≥3 cognitive effects until recovery, then resume at reduced dose.'
        });
        alerts.push({
            title: 'Avapritinib — Embryo-fetal Toxicity',
            text: 'Females: contraception during + ≥1 month post. Males: condoms during + ≥1 week post. No breastfeeding during treatment.'
        });
    }

    // Ripretinib (KIT/PDGFRA switch-control inhibitor)
    if (hasDrug('ripretinib')) {
        alerts.push({
            title: 'Ripretinib — Hand-Foot Skin Reaction (HFSR)',
            text: 'Emollients from treatment start. Dose reduce for Grade 2; hold for Grade 3 until ≤Grade 1, then resume at reduced dose.'
        });
        alerts.push({
            title: 'Ripretinib — Hypertension',
            text: 'Monitor BP at baseline and each cycle. Initiate antihypertensives as needed; hold for hypertensive crisis until controlled.'
        });
        alerts.push({
            title: 'Ripretinib — New Primary Cutaneous Malignancies',
            text: 'Dermatology skin exam at baseline and every 2 months during treatment. Refer any suspicious skin lesions promptly.'
        });
        alerts.push({
            title: 'Ripretinib — Embryo-fetal Toxicity',
            text: 'Females: contraception during + ≥1 week post. Males: condoms during + ≥1 week post.'
        });
    }

    // Dabrafenib + Trametinib (BRAF V600E + MEK inhibitor combination)
    if (hasDrug('dabrafenib') || hasDrug('trametinib')) {
        alerts.push({
            title: 'Dabrafenib/Trametinib — Pyrexia (Fever)',
            text: 'Fever is the most common serious toxicity of this combination. Hold for temperature >38.5°C; evaluate for infection; manage with antipyretics. Resume at reduced dose once afebrile.'
        });
        alerts.push({
            title: 'Trametinib — Cardiomyopathy',
            text: 'Echo/LVEF at baseline, after 1 month, then every 3 months. Hold if LVEF drops ≥10 percentage points below LLN; permanently discontinue if unresolved.'
        });
        alerts.push({
            title: 'Dabrafenib — New Primary Cutaneous Malignancies',
            text: 'Dermatology skin exam before starting and every 2 months during treatment. Report any new skin lesion; excise suspicious lesions promptly.'
        });
        alerts.push({
            title: 'Trametinib — Ocular Toxicity',
            text: 'Report visual changes urgently. Ophthalmology referral for suspected retinal vein occlusion or uveitis; hold if confirmed, permanently discontinue for retinal vein occlusion.'
        });
        alerts.push({
            title: 'Dabrafenib/Trametinib — Embryo-fetal Toxicity',
            text: 'Females: contraception during + ≥16 weeks post (dabrafenib has long half-life). Males: condoms during + ≥16 weeks post. No breastfeeding.'
        });
    }

    // Erlotinib (EGFR TKI)
    if (hasDrug('erlotinib')) {
        alerts.push({
            title: 'Erlotinib — Acneiform Rash',
            text: 'Onset typically weeks 1–2. Mild: topical clindamycin/doxycycline. Grade 3: hold until ≤Grade 2, then resume at reduced dose. Rash severity correlates with response.'
        });
        alerts.push({
            title: 'Erlotinib — ILD / Pneumonitis',
            text: 'New or worsening dyspnoea, cough, or fever → hold immediately, CT chest. If ILD confirmed, permanently discontinue.'
        });
        alerts.push({
            title: 'Erlotinib — Hepatotoxicity',
            text: 'LFTs at baseline and monthly. Hold Grade 3; permanently discontinue Grade 4.'
        });
    }

    // Lapatinib (HER2/EGFR dual TKI)
    if (hasDrug('lapatinib')) {
        alerts.push({
            title: 'Lapatinib — Diarrhoea',
            text: 'Can be severe and occur within days of starting. Loperamide from first loose stool. Grade 3 with dehydration → hold; Grade 4 → permanently discontinue.'
        });
        alerts.push({
            title: 'Lapatinib — QTc Prolongation',
            text: 'Baseline ECG and repeat at 1 month. Correct hypokalaemia/hypomagnesaemia before starting. Avoid other QTc-prolonging drugs. Hold if QTc >500ms or increase >60ms from baseline.'
        });
        alerts.push({
            title: 'Lapatinib — Hepatotoxicity',
            text: 'LFTs at baseline and monthly. Hold Grade 3; permanently discontinue Grade 4 or recurrent Grade 3.'
        });
    }

    // Zenocutuzumab (anti-HER2 × anti-HER3 bispecific — NRG1-fusion)
    if (hasDrug('zenocutuzumab')) {
        alerts.push({
            title: 'Zenocutuzumab — Infusion-Related Reactions',
            text: 'IRR reported in ~40% (most Grade 1–2; severe in ~5%). Pre-medicate before each infusion: antihistamine + corticosteroid + paracetamol. First infusion over 2h; reduce rate or interrupt for IRR; permanently discontinue for anaphylaxis or Grade 4 IRR.'
        });
        alerts.push({
            title: 'Zenocutuzumab — Diarrhoea & Hepatotoxicity',
            text: 'Diarrhoea in ~40% (Grade 3 in ~10%): loperamide at first loose stool; hold Grade 3; reduce dose after recovery. LFTs at baseline and before each cycle; hold Grade 3 transaminase elevation; permanently discontinue Grade 4.'
        });
        alerts.push({
            title: 'Zenocutuzumab — Embryo-fetal Toxicity',
            text: 'Females: effective contraception during + ≥7 months post; no breastfeeding during + ≥7 months post. Males: condoms during + ≥4 months post.'
        });
    }

    // Pazopanib (VEGFR/PDGFR/FGFR/KIT TKI)
    if (hasDrug('pazopanib')) {
        alerts.push({
            title: 'Pazopanib — Severe / Fatal Hepatotoxicity',
            text: 'LFTs before start, then at weeks 3, 5, 7, 9, then monthly × 3, then q3 months. Hold Grade 3; permanently discontinue Grade 4 or recurrent Grade 3.'
        });
        alerts.push({
            title: 'Pazopanib — Hypertension',
            text: 'BP should be well-controlled before starting. Monitor weekly × 4 weeks then monthly. Antihypertensives as needed; hold for hypertensive crisis.'
        });
        alerts.push({
            title: 'Pazopanib — QTc Prolongation',
            text: 'Baseline ECG. Correct electrolytes before starting and during treatment. Avoid concomitant QTc-prolonging drugs. Hold if QTc >500ms.'
        });
        alerts.push({
            title: 'Pazopanib — Embryo-fetal Toxicity',
            text: 'Females: contraception during + ≥2 weeks post; no breastfeeding. Males: condoms during + ≥2 weeks post.'
        });
    }

    // Axitinib (selective VEGFR-1/2/3 TKI)
    if (hasDrug('axitinib')) {
        alerts.push({
            title: 'Axitinib — Hypertension (Frequent, Dose-dependent)',
            text: 'Hypertension in ~40% — BP must be well controlled before starting. Monitor BP daily for first 2 weeks, then weekly × 1 month, then monthly. Initiate antihypertensives early; do not delay dose reduction. Hold for hypertensive crisis or persistent uncontrolled Grade 3; discontinue for Grade 4 or hypertensive encephalopathy.'
        });
        alerts.push({
            title: 'Axitinib — Hypothyroidism & Embryo-fetal Toxicity',
            text: 'Thyroid function tests at baseline and monthly — hypothyroidism in ~20%; initiate levothyroxine as needed. Dose titration: may increase from 5mg BD → 7mg BD → 10mg BD every 2 weeks if no toxicity ≥Grade 2 and BP well controlled. Females: contraception during + ≥1 week post; no breastfeeding. Males: condoms during + ≥1 week post.'
        });
    }

    // Tivozanib (VEGFR-1/2/3 TKI)
    if (hasDrug('tivozanib')) {
        alerts.push({
            title: 'Tivozanib — Hypertension & Hypothyroidism',
            text: 'Hypertension in ~45% — monitor BP before each dose and weekly × 6 weeks, then monthly; antihypertensives as needed. Hypothyroidism reported — TFTs at baseline and every 3 months. Dysphonia common (voice changes) — counsel patient, no dose modification needed unless Grade 3+.'
        });
        alerts.push({
            title: 'Tivozanib — Embryo-fetal Toxicity',
            text: 'Females: effective contraception during + ≥1 month post; no breastfeeding. Males: condoms during + ≥1 month post.'
        });
    }

    // Ivosidenib (IDH1 inhibitor)
    if (hasDrug('ivosidenib')) {
        alerts.push({
            title: 'Ivosidenib — QTc Prolongation',
            text: 'Baseline ECG, then at weeks 1, 2, 4, then monthly. Correct electrolytes. Avoid other QTc-prolonging drugs. Hold if QTc >500ms or increase >60ms from baseline.'
        });
        alerts.push({
            title: 'Ivosidenib — Differentiation Syndrome (IDH1)',
            text: 'Rare in solid tumours but reported. New fever, hypoxia, pleural/pericardial effusion, rash, oedema within first 3 months → hold and start dexamethasone 10mg IV q12h × ≥3 days.'
        });
        alerts.push({
            title: 'Ivosidenib — Hepatotoxicity',
            text: 'LFTs at baseline and monthly. Hold Grade 3; permanently discontinue Grade 4.'
        });
    }

    // Denosumab (RANKL inhibitor — giant cell tumour of bone)
    if (hasDrug('denosumab')) {
        alerts.push({
            title: 'Denosumab — Hypocalcaemia',
            text: 'Supplement calcium 500mg + vitamin D 400IU daily throughout treatment. Check serum calcium, phosphate, and magnesium before each dose. Delay dosing for uncorrected hypocalcaemia.'
        });
        alerts.push({
            title: 'Denosumab — Osteonecrosis of the Jaw (ONJ)',
            text: 'Dental exam and any invasive dental work should be completed before starting. Avoid elective dental procedures during treatment. Advise good oral hygiene.'
        });
        alerts.push({
            title: 'Denosumab — Rebound Hypercalcaemia on Discontinuation',
            text: 'Stopping denosumab abruptly can cause severe rebound hypercalcaemia in giant cell tumour patients. Plan bisphosphonate bridging if treatment is to be discontinued.'
        });
    }

    // Bevacizumab (anti-VEGF biologic)
    if (hasDrug('bevacizumab')) {
        alerts.push({
            title: 'Bevacizumab — Hypertension & Proteinuria',
            text: 'Monitor BP before every infusion; initiate antihypertensives as needed. Hold for hypertensive crisis; permanently discontinue for hypertensive encephalopathy/PRES. Urine dipstick before each cycle; 24-hour urine protein if ≥2+. Hold for protein ≥2 g/24h; permanently discontinue for nephrotic syndrome.'
        });
        alerts.push({
            title: 'Bevacizumab — GI Perforation, ATE & Wound Healing',
            text: 'GI perforation and arterial thrombotic events (stroke, MI) — permanently discontinue if either occurs. Hold ≥28 days before elective surgery; do not resume for ≥28 days after surgery until wound is fully healed. CNS tumours: monitor for new neurological symptoms (intracranial haemorrhage risk).'
        });
    }

    // Ramucirumab (anti-VEGFR-2 antibody)
    if (hasDrug('ramucirumab')) {
        alerts.push({
            title: 'Ramucirumab — Hypertension & Proteinuria',
            text: 'Monitor BP before every infusion; manage with antihypertensives as needed. Hold for severe hypertension not controlled medically; permanently discontinue for hypertensive crisis/PRES. Urine protein by dipstick before each cycle; hold for urine protein ≥2 g/24h.'
        });
        alerts.push({
            title: 'Ramucirumab — GI Perforation, ATE & Wound Healing',
            text: 'GI perforation and arterial thromboembolic events — permanently discontinue if either occurs. Hold ≥28 days before elective surgery; do not resume for ≥28 days post-surgery until wound healed. Pre-medicate with diphenhydramine IV before each of the first 2 infusions (IRR risk).'
        });
    }

    // Lomustine / CCNU (nitrosourea — delayed myelosuppression)
    if (hasDrug('lomustine')) {
        alerts.push({
            title: 'Lomustine (CCNU) — Delayed & Cumulative Myelosuppression',
            text: 'Nadir occurs late at weeks 4–6. FBC at weeks 4 and 6 before next cycle; do not give next dose until counts have fully recovered. Cumulative toxicity — minimum 6-week interval between doses.'
        });
        alerts.push({
            title: 'Lomustine — Pulmonary Fibrosis (Cumulative)',
            text: 'Risk increases with cumulative dose (significant above 1100 mg/m² total). Baseline PFTs and annual CXR during treatment. Report new cough or dyspnoea — hold and investigate with CT chest. Permanently discontinue if pulmonary fibrosis confirmed.'
        });
    }

    // Carmustine / BCNU (nitrosourea)
    if (hasDrug('carmustine')) {
        alerts.push({
            title: 'Carmustine (BCNU) — Delayed Myelosuppression',
            text: 'Nadir at weeks 4–6. FBC at weeks 4 and 6 before next cycle. Minimum 6-week interval between doses. Cumulative myelosuppression — assess blood counts carefully with each cycle.'
        });
        alerts.push({
            title: 'Carmustine — Pulmonary Toxicity (Cumulative)',
            text: 'Pulmonary fibrosis risk rises above cumulative dose 1400 mg/m². Baseline PFTs recommended; monitor for new cough or dyspnoea. Report respiratory symptoms — CT chest if suspected.'
        });
        alerts.push({
            type: 'info',
            title: 'Carmustine — Infusion Reactions (Flushing)',
            text: 'Burning/flushing at injection site and facial flushing during infusion is common due to alcohol diluent. Slow the infusion if distressing. Protect from light during administration.'
        });
    }

    // Procarbazine (MAO inhibitor — dietary and drug interactions)
    if (hasDrug('procarbazine')) {
        alerts.push({
            title: 'Procarbazine — Dietary Tyramine Restriction (MAOI activity)',
            text: 'Procarbazine has weak MAOI activity. Avoid tyramine-rich foods: aged cheeses, cured/smoked meats, fermented products, broad beans, red wine, beer. Risk of hypertensive crisis if these are consumed.'
        });
        alerts.push({
            title: 'Procarbazine — Drug Interactions (MAOI)',
            text: 'Avoid: alcohol (disulfiram-like reaction), SSRIs/SNRIs (serotonin syndrome), TCAs, sympathomimetics, CNS depressants. Allow ≥2 weeks washout from SSRIs/SNRIs before starting procarbazine.'
        });
        alerts.push({
            title: 'Procarbazine — Embryo-fetal Toxicity',
            text: 'Teratogenic. Females: effective contraception during + ≥1 month post; no breastfeeding. Males: condoms during treatment and for 3 months after.'
        });
    }

    // Vorasidenib (IDH1/2 inhibitor — glioma)
    if (hasDrug('vorasidenib')) {
        alerts.push({
            title: 'Vorasidenib — Hepatotoxicity',
            text: 'LFTs at baseline, then at weeks 2, 4, 8, 12, then every 3 months. Hold Grade 3; permanently discontinue Grade 4 or recurrent Grade 3.'
        });
        alerts.push({
            title: 'Vorasidenib — Differentiation Syndrome (IDH inhibitor)',
            text: 'Rare in solid tumours. New fever, dyspnoea, peripheral oedema, or pleural/pericardial effusion in first 3 months → hold and start dexamethasone 10mg IV q12h × ≥3 days.'
        });
    }

    // Tovorafenib (RAF inhibitor — paediatric low-grade glioma)
    if (hasDrug('tovorafenib')) {
        alerts.push({
            title: 'Tovorafenib — Cutaneous Toxicity',
            text: 'Palmar-plantar erythrodysaesthesia and photosensitivity common. Daily SPF 50+ sunscreen + protective clothing. Inspect skin at each visit; dose reduce for Grade 2; hold for Grade 3.'
        });
        alerts.push({
            title: 'Tovorafenib — Uveitis / Ocular Toxicity',
            text: 'Periodic ophthalmology assessment. Report new visual symptoms (pain, blurred vision, photophobia) — hold and ophthalmology review; permanently discontinue Grade 3–4.'
        });
        alerts.push({
            title: 'Tovorafenib — Hepatotoxicity',
            text: 'LFTs at baseline and monthly. Hold Grade 3; permanently discontinue Grade 4.'
        });
        alerts.push({
            title: 'Tovorafenib — Embryo-fetal Toxicity',
            text: 'Females: contraception during + ≥1 week post. Males: condoms during + ≥1 week post. No breastfeeding.'
        });
    }

    // Dordaviprone (ClpP activator — diffuse midline glioma)
    if (hasDrug('dordaviprone')) {
        alerts.push({
            title: 'Dordaviprone — Hepatotoxicity',
            text: 'LFTs at baseline and monthly. Hold Grade 3; permanently discontinue Grade 4 or recurrent Grade 3.'
        });
        alerts.push({
            title: 'Dordaviprone — Embryo-fetal Toxicity',
            text: 'Females: contraception during + ≥1 month post; no breastfeeding. Males: condoms during + ≥1 week post.'
        });
    }

    // CDK4/6 inhibitors (palbociclib / ribociclib / abemaciclib)
    if (hasDrug('palbociclib') || hasDrug('ribociclib') || hasDrug('abemaciclib')) {
        alerts.push({
            title: 'CDK4/6 Inhibitor — Neutropenia Monitoring',
            text: 'CBC before start, at 2 weeks of cycle 1, beginning of each subsequent cycle, and as clinically indicated. Grade 3–4 neutropenia is the most common cause of dose interruption. Hold for ANC <1.0 × 10⁹/L; restart at reduced dose.'
        });
        alerts.push({
            title: 'CDK4/6 Inhibitor — Hepatotoxicity',
            text: 'LFTs at baseline, every 2 weeks for first 2 months, then monthly for 4 months, then as clinically indicated. Hold Grade 3 ALT/AST (>5× ULN) until recovery to Grade 1; permanently discontinue Grade 4 or if total bilirubin >3× ULN without other cause.'
        });
        alerts.push({
            title: 'CDK4/6 Inhibitor — Embryo-fetal Toxicity',
            text: 'Females of reproductive potential: effective contraception during treatment + ≥3 weeks post (palbociclib/abemaciclib) or ≥3 weeks (ribociclib). Males: condoms during + ≥3 weeks post. No breastfeeding during treatment.'
        });
    }

    // Ribociclib-specific: QTc prolongation (additional to class effects)
    if (hasDrug('ribociclib')) {
        alerts.push({
            title: 'Ribociclib — QTc Prolongation',
            text: 'ECG at baseline. Do NOT start if QTc ≥450ms. Repeat ECG at day 14 of cycle 1, beginning of cycle 2, then as clinically indicated. Correct hypokalaemia/hypomagnesaemia. Avoid concomitant QTc-prolonging drugs (including some antiemetics — check interactions). Hold if QTc >480ms; permanently discontinue if QTc >500ms.'
        });
    }

    // Abemaciclib-specific: diarrhea
    if (hasDrug('abemaciclib')) {
        alerts.push({
            title: 'Abemaciclib — Diarrhea Management',
            text: 'Most common toxicity — starts early (median onset day 6). Initiate loperamide at first loose stool. Grade 2 persisting ≥24h or Grade 3 → dose interrupt until ≤Grade 1, then reduce dose. Grade 4 → permanently discontinue.'
        });
    }

    // PARP inhibitors (olaparib / niraparib / rucaparib / talazoparib) — class effects
    if (hasDrug('olaparib') || hasDrug('niraparib') || hasDrug('rucaparib') || hasDrug('talazoparib')) {
        alerts.push({
            title: 'PARP Inhibitor — Myelosuppression Monitoring',
            text: 'CBC at baseline and monthly. Anaemia is the most common Grade 3–4 toxicity (transfusion threshold applies). Neutropenia and thrombocytopenia also occur. Hold for ANC <1.0 × 10⁹/L, Hb <8 g/dL, or platelets <50 × 10⁹/L.'
        });
        alerts.push({
            title: 'PARP Inhibitor — MDS / AML Risk',
            text: 'Treatment-related MDS or AML reported (incidence ~1%). Monitor CBC throughout; if unexplained or prolonged cytopenia after dose hold, investigate for MDS/AML. If confirmed, permanently discontinue. Counsel patient about this rare but serious risk at initiation.'
        });
        alerts.push({
            title: 'PARP Inhibitor — Embryo-fetal Toxicity',
            text: 'Olaparib: females — effective contraception during + ≥6 months post; males — condoms during + ≥3 months post. Niraparib/Rucaparib: females — during + ≥6 months post; males — condoms during + ≥3 months post. Talazoparib: females — during + ≥7 months post; males — during + ≥4 months post. No breastfeeding.'
        });
    }

    // Niraparib — specific: thrombocytopenia + hypertension
    if (hasDrug('niraparib')) {
        alerts.push({
            title: 'Niraparib — Thrombocytopenia & Individualised Starting Dose',
            text: 'Starting dose: 200 mg/day if baseline weight <77 kg OR platelet count <150,000/µL; otherwise 300 mg/day. CBC weekly for first month, then monthly. If platelets <100,000/µL → hold; restart at reduced dose after recovery. If platelets <50,000/µL → hold; investigate and restart reduced dose. Grade 4 thrombocytopenia or recurrent Grade 3 → consider discontinuation.'
        });
        alerts.push({
            title: 'Niraparib — Hypertension & Cardiovascular Monitoring',
            text: 'Hypertension and hypertensive crisis reported. Monitor BP weekly for first 2 months, then monthly. Initiate or adjust antihypertensives as needed. Hold for Grade 3 hypertension not controlled with antihypertensive therapy; resume when controlled. Cardiac events also reported — assess at baseline and monitor during treatment.'
        });
    }

    // Everolimus (mTOR inhibitor)
    if (hasDrug('everolimus')) {
        alerts.push({
            title: 'Everolimus — Stomatitis / Oral Mucositis',
            text: 'Most common and dose-limiting toxicity. Preventive steroid mouthwash (e.g. dexamethasone 0.5mg/5mL, rinse and spit 4×/day) recommended from Day 1. Alcohol-containing mouthwash is contraindicated (worsens mucositis). Dose interrupt Grade 2 persisting; reduce dose after recovery.'
        });
        alerts.push({
            title: 'Everolimus — Non-infectious Pneumonitis',
            text: 'Incidence ~14%. May present as dyspnoea, dry cough, or fever. Grade 1–2: dose interrupt; if improving, may resume. Grade 3: permanently discontinue. CT chest for any respiratory symptoms. No infection must be excluded first — do not treat with steroids empirically without ruling out infection.'
        });
        alerts.push({
            type: 'info',
            title: 'Everolimus — Hyperglycaemia & Hyperlipidaemia',
            text: 'Monitor fasting blood glucose and lipid panel before starting and regularly during treatment. Titrate antidiabetic medications as needed. Statins may be required for hyperlipidaemia. Hold for Grade 3 hyperglycaemia (>250mg/dL) until controlled.'
        });
    }

    // Alpelisib (PI3K-alpha inhibitor)
    if (hasDrug('alpelisib')) {
        alerts.push({
            title: 'Alpelisib — SEVERE Hyperglycaemia',
            text: 'Fasting blood glucose (FBG) and HbA1c must be checked at baseline. Do NOT start if FBG ≥126mg/dL or HbA1c ≥6.5% (unless diabetes optimised). FBG monitoring weekly × 8 weeks, then at least every 4 weeks. Grade 3 hyperglycaemia (FBG 250–500mg/dL) → hold; initiate or intensify antidiabetic therapy. Grade 4 (FBG >500mg/dL) → permanently discontinue. Most patients require anti-hyperglycaemic treatment.'
        });
        alerts.push({
            title: 'Alpelisib — Severe Cutaneous Reactions',
            text: 'Rash occurs in ~52% (Grade 3: ~10%). Stevens-Johnson syndrome and toxic epidermal necrolysis reported. Report new or worsening rash immediately. Grade 3 → hold and consider dermatology. Grade 4 or SJS/TEN → permanently discontinue.'
        });
        alerts.push({
            title: 'Alpelisib — Diarrhoea',
            text: 'Occurs in ~58% (Grade 3: ~7%). Initiate antidiarrhoeal agents at first loose stool. Hold for Grade 3; permanently discontinue for Grade 4 or recurrent Grade 3 after dose reduction.'
        });
    }

    // Capivasertib (AKT inhibitor)
    if (hasDrug('capivasertib')) {
        alerts.push({
            title: 'Capivasertib — Hyperglycaemia',
            text: 'FBG at baseline and before each cycle. Grade 3 (FBG 250–500mg/dL) → hold; anti-hyperglycaemic treatment may be needed. Grade 4 → permanently discontinue. Do not start if diabetes is uncontrolled.'
        });
        alerts.push({
            title: 'Capivasertib — Diarrhoea & Rash',
            text: 'Diarrhoea in ~72% (Grade 3: ~9%); rash in ~39%. Loperamide for diarrhoea. Topical corticosteroids for rash. Dose reduce or hold for Grade 3–4.'
        });
        alerts.push({
            title: 'Capivasertib — Embryo-fetal Toxicity',
            text: 'Females: contraception during + ≥1 month post. Males: condoms during + ≥1 week post. No breastfeeding.'
        });
    }

    // Inavolisib (PI3K-alpha inhibitor)
    if (hasDrug('inavolisib')) {
        alerts.push({
            title: 'Inavolisib — Hyperglycaemia',
            text: 'FBG at baseline, weekly × 8 weeks, then monthly. Optimise glycaemic control before starting. Grade 3 (FBG >250mg/dL) → hold; initiate anti-hyperglycaemic therapy. Grade 4 → permanently discontinue.'
        });
        alerts.push({
            title: 'Inavolisib — Stomatitis',
            text: 'Oral mucositis in ~45% (Grade 3: ~10%). Preventive mouthwash regimen (steroid-based, alcohol-free) from Day 1. Dose interrupt for Grade 3; reduce after recovery.'
        });
    }

    // SERDs (elacestrant / imlunestrant)
    if (hasDrug('elacestrant') || hasDrug('imlunestrant')) {
        alerts.push({
            title: 'SERD (Oral) — Embryo-fetal Toxicity',
            text: 'Elacestrant: females — effective contraception during + ≥1 week post; males — condoms during + ≥1 week post. Imlunestrant: females — contraception during; males — condoms during. No breastfeeding. Counsel on the potential for early pregnancy loss.'
        });
        alerts.push({
            type: 'info',
            title: 'SERD — Nausea & GI Effects',
            text: 'Nausea is common (elacestrant ~35%, mostly Grade 1–2). Take with food to reduce GI symptoms. Musculoskeletal pain and hot flushes also reported. Dose reduction may help persistent Grade 2 nausea.'
        });
    }

    // Sacituzumab Govitecan (TROP-2 ADC)
    if (hasDrug('sacituzumab')) {
        alerts.push({
            title: 'Sacituzumab Govitecan — Severe Neutropenia',
            text: 'Grade 3–4 neutropenia in ~47%. CBC before each dose. Hold if ANC <1.5 × 10⁹/L on Day 1 or <1.0 × 10⁹/L on Day 8. G-CSF recommended for Grade 3–4 febrile neutropenia or recurrent Grade 4 neutropenia.'
        });
        alerts.push({
            title: 'Sacituzumab Govitecan — Diarrhoea (Early & Late)',
            text: 'Early-onset (cholinergic) diarrhoea can occur during infusion — atropine if severe. Late-onset diarrhoea (after 24h) is common (Grade 3: ~11%) — loperamide at first loose stool, intensify if not controlled within 24h. Hold for Grade 3; permanently discontinue for Grade 4 or life-threatening.'
        });
        alerts.push({
            type: 'info',
            title: 'Sacituzumab Govitecan — UGT1A1 Polymorphism',
            text: 'UGT1A1*28 homozygosity (*28/*28) is associated with increased toxicity (particularly neutropenia and diarrhoea). Genotyping is recommended before starting where available. If *28/*28 genotype confirmed, consider starting at reduced dose (7.5 mg/kg) and monitoring closely.'
        });
    }

    // Enfortumab Vedotin (Nectin-4 ADC, MMAE payload)
    if (hasDrug('enfortumab')) {
        alerts.push({
            title: 'Enfortumab Vedotin — Severe Hyperglycaemia (Black Box Warning)',
            text: 'Black Box Warning: severe, sometimes fatal hyperglycaemia including new-onset diabetes and diabetic ketoacidosis. Monitor fasting blood glucose before each dose. Hold for glucose ≥250 mg/dL; permanently discontinue for life-threatening hyperglycaemia. Use with caution in patients with diabetes or risk factors; intensify glucose monitoring and antidiabetic therapy as needed.'
        });
        alerts.push({
            title: 'Enfortumab Vedotin — Ocular Keratopathy',
            text: 'Keratopathy (corneal changes) in ~40% — most are asymptomatic or low-grade. Baseline ophthalmology assessment recommended; monitor at each cycle for ocular symptoms (blurred vision, dry eyes, photophobia). Lubricating eye drops throughout treatment. Hold for Grade 2; permanently discontinue for Grade 3–4.'
        });
        alerts.push({
            title: 'Enfortumab Vedotin — Peripheral Neuropathy & Skin Reactions',
            text: 'Peripheral neuropathy (MMAE mechanism) in ~50%: monitor at each visit; hold for Grade ≥2 neuropathy; permanently discontinue for Grade ≥3. Skin reactions (maculopapular rash, alopecia) common. Stevens-Johnson syndrome/TEN reported (rare) — permanently discontinue for Grade ≥3 skin reactions.'
        });
        alerts.push({
            title: 'Enfortumab Vedotin — Embryo-fetal Toxicity',
            text: 'Females: effective contraception during + ≥2 months post; no breastfeeding. Males: condoms during + ≥4 months post; no sperm donation.'
        });
    }

    // Tisotumab Vedotin (tissue factor-directed ADC, MMAE payload)
    if (hasDrug('tisotumab')) {
        alerts.push({
            title: 'Tisotumab Vedotin — Ocular Toxicity (Mandatory Eye Care Protocol)',
            text: 'Conjunctivitis, keratitis, and corneal disorders occur in ~60% of patients and can cause vision loss. Mandatory protocol: (1) Preservative-free lubricating eye drops at least 3× daily throughout treatment; (2) Vasoconstrictor eye drops (e.g. naphazoline) immediately before, during, and for 2 hours after each infusion; (3) Steroid eye drops (e.g. prednisolone acetate 1%) 3× daily for 3 days starting on the day of infusion; (4) Avoid contact lenses during treatment. Ophthalmology review if any visual symptoms, eye pain, or redness. Hold for Grade 2 keratitis or new corneal findings; permanently discontinue for Grade 3–4 or recurrent Grade 2.'
        });
        alerts.push({
            title: 'Tisotumab Vedotin — Peripheral Neuropathy',
            text: 'Peripheral neuropathy in ~45% (Grade 3+: ~4%). Assess neurological symptoms before each infusion. Grade 1–2 with pain or functional limitation → dose reduce; Grade 3+ → hold until ≤Grade 1, then reduce dose. Permanently discontinue if Grade 3+ neuropathy does not recover.'
        });
        alerts.push({
            title: 'Tisotumab Vedotin — Skin Reactions & Haemorrhage',
            text: 'Skin reactions including alopecia, dry skin, and palmar-plantar erythema reported. Severe skin reactions (Stevens-Johnson Syndrome, TEN) are rare but possible — withhold for severe reactions. Haemorrhage risk (intracranial, GI, pulmonary): avoid in patients on anticoagulation; hold for Grade 3+.'
        });
        alerts.push({
            title: 'Tisotumab Vedotin — Embryo-fetal Toxicity',
            text: 'Females: effective contraception during + ≥2 months post; no breastfeeding. Males: condoms during + ≥4 months post; no sperm donation.'
        });
    }

    // DXd-class ADCs (T-DXd / Datopotamab DXd) — ILD class warning
    if (hasDrug('deruxtecan')) {
        alerts.push({
            title: 'DXd-class ADC — Interstitial Lung Disease (ILD) / Pneumonitis',
            text: 'ILD/pneumonitis is a class effect of DXd-conjugated ADCs and can be FATAL. Incidence: T-DXd ~15% (Grade 3–4: ~1%), Datopotamab DXd ~26% (mostly low-grade). Monitor for new/worsening dyspnoea, cough, or fever at every visit. If suspected → hold immediately, CT chest, pulmonary review. Grade 1 → hold until resolution; Grade 2 → hold + consider corticosteroids; Grade 3 or any recurrent ILD → permanently discontinue.'
        });
    }

    // Datopotamab Deruxtecan-specific (TROP-2 DXd ADC)
    if (hasDrug('datopotamab')) {
        alerts.push({
            title: 'Datopotamab Deruxtecan — Stomatitis / Oral Mucositis',
            text: 'Most common toxicity (~50%, Grade 3: ~6%). Begin preventive steroid mouthwash (dexamethasone 0.5mg/5mL or equivalent, rinse and spit 4×/day) from Day 1. Avoid alcohol-containing mouthwash. Dose interrupt for Grade 2 persistent; reduce dose after recovery from Grade 3.'
        });
        alerts.push({
            title: 'Datopotamab Deruxtecan — Ocular Toxicity',
            text: 'Keratitis and blurred vision reported (~18%). Baseline ophthalmology assessment recommended. Eye drops (artificial tears) during treatment; avoid contact lens use. Report any visual symptoms or ocular pain — ophthalmology review; hold for Grade 3+.'
        });
    }

    // Tucatinib (HER2 TKI)
    if (hasDrug('tucatinib')) {
        alerts.push({
            title: 'Tucatinib — Diarrhoea',
            text: 'Severe diarrhoea in ~13% (any grade: ~81%). Loperamide at first loose stool. Grade 3 persisting >24h or Grade 4 → hold until ≤Grade 1, then reduce dose. If uncontrolled with loperamide, investigate for other causes and consider budesonide.'
        });
        alerts.push({
            title: 'Tucatinib — Hepatotoxicity',
            text: 'LFTs at baseline, then every 3 weeks during treatment, and as clinically indicated. ALT/AST >5× ULN or total bilirubin >3× ULN → hold; reduce dose after recovery to ≤Grade 1. Grade 4 or recurrent Grade 3 → permanently discontinue.'
        });
        alerts.push({
            title: 'Tucatinib — Embryo-fetal Toxicity',
            text: 'Females: effective contraception during + ≥1 week post. Males: condoms during + ≥1 week post. No breastfeeding during treatment + 1 week after.'
        });
    }

    // Neratinib (pan-HER irreversible TKI)
    if (hasDrug('neratinib')) {
        alerts.push({
            title: 'Neratinib — MANDATORY Diarrhoea Prophylaxis',
            text: 'Prophylactic loperamide is REQUIRED from Day 1 of treatment: 4mg three times daily for weeks 1–2, then 4mg twice daily for weeks 3–8, then 4mg once daily as tolerated (or as per local protocol). Without prophylaxis, Grade 3–4 diarrhoea occurs in >40% of patients. Instruct patient on this protocol at every visit.'
        });
        alerts.push({
            title: 'Neratinib — Hepatotoxicity',
            text: 'LFTs at baseline, then monthly × 3 months, then every 3 months during treatment. Hold for Grade 3 (ALT/AST >5–20× ULN) until recovery; permanently discontinue for Grade 4 (>20× ULN) or severe hepatic impairment.'
        });
        alerts.push({
            title: 'Neratinib — Embryo-fetal Toxicity',
            text: 'Females: effective contraception during + ≥1 month post. Males: condoms during + ≥3 months post. No breastfeeding.'
        });
    }

    // Trastuzumab (all variants: plain / T-DM1 / T-DXd) — cardiotoxicity + embryo-fetal
    if (hasDrug('trastuzumab')) {
        alerts.push({
            title: 'Trastuzumab — Cardiotoxicity (LVEF Monitoring)',
            text: 'LVEF (echo or MUGA) at baseline then every 3 months. Hold for LVEF <50% or drop ≥10 percentage points from baseline to below LLN. Do not give concurrently with anthracyclines — allow ≥3-week gap after last anthracycline. Cardiotoxicity is generally reversible on stopping.'
        });
        alerts.push({
            title: 'Trastuzumab — Embryo-fetal Toxicity',
            text: '2nd/3rd trimester exposure → oligohydramnios, fetal death. Effective contraception during + ≥7 months after last dose. No breastfeeding during + ≥7 months post.'
        });
    }

    // Pertuzumab — diarrhoea (cardiotoxicity covered by trastuzumab block above)
    if (hasDrug('pertuzumab')) {
        alerts.push({
            title: 'Pertuzumab — Diarrhoea',
            text: 'Most common pertuzumab-specific toxicity (~67%, Grade 3: ~8%). Initiate loperamide at first loose stool. Ensure adequate hydration. Hold for Grade 3 with dehydration or Grade 4 until resolved; resume with dose reduction if recurrent.'
        });
    }

    // Zanidatamab (HER2/HER3 bispecific) — class-specific alerts
    if (hasDrug('zanidatamab')) {
        alerts.push({
            title: 'Zanidatamab — Diarrhoea',
            text: 'Most common toxicity (~50%, Grade 3: ~5%). Loperamide from first loose stool. Hold for Grade 3–4; resume at reduced dose after resolution.'
        });
        alerts.push({
            title: 'Zanidatamab — Infusion-related Reactions',
            text: 'IRRs occur primarily with the first infusion. Pre-medicate with antihistamine ± antipyretic as per institutional protocol. Slow or interrupt infusion for Grade 1–2; permanently discontinue for Grade 3–4 anaphylaxis.'
        });
        alerts.push({
            title: 'Zanidatamab — Cardiotoxicity (LVEF Monitoring)',
            text: 'LVEF at baseline and every 3 months. Hold for LVEF <50% or drop ≥10 percentage points from baseline to below LLN.'
        });
        alerts.push({
            title: 'Zanidatamab — Embryo-fetal Toxicity',
            text: 'Effective contraception during treatment + ≥7 months after last dose (based on class data). No breastfeeding during + ≥7 months post.'
        });
    }

    // Selpercatinib (RET inhibitor)
    if (hasDrug('selpercatinib')) {
        alerts.push({
            title: 'Selpercatinib — Hepatotoxicity',
            text: 'LFTs at baseline, then every 2 weeks for the first 3 months, then monthly. Hold Grade 3 (ALT/AST >5× ULN); permanently discontinue Grade 4 or recurrent Grade 3.'
        });
        alerts.push({
            title: 'Selpercatinib — Hypertension',
            text: 'Monitor BP before starting and regularly during treatment. Initiate antihypertensives as needed. Hold for hypertensive crisis; permanently discontinue for hypertensive emergency uncontrolled by medical therapy.'
        });
        alerts.push({
            title: 'Selpercatinib — QTc Prolongation',
            text: 'Baseline ECG. Correct hypokalaemia and hypomagnesaemia before starting. Avoid strong QTc-prolonging drugs. Hold for QTc >500ms or increase >60ms from baseline.'
        });
        alerts.push({
            title: 'Selpercatinib — Embryo-fetal Toxicity',
            text: 'Females: effective contraception during + ≥1 week post; no breastfeeding. Males: condoms during + ≥1 week post.'
        });
    }

    // Pralsetinib (RET inhibitor)
    if (hasDrug('pralsetinib')) {
        alerts.push({
            title: 'Pralsetinib — Hepatotoxicity',
            text: 'LFTs at baseline, then every 2 weeks for the first 3 months, then monthly. Hold Grade 3 (ALT/AST >5× ULN); permanently discontinue Grade 4 or recurrent Grade 3.'
        });
        alerts.push({
            title: 'Pralsetinib — ILD / Pneumonitis',
            text: 'Hold immediately if new or worsening respiratory symptoms. CT chest to evaluate; corticosteroids if Grade 2+. Permanently discontinue for Grade 3–4 or recurrent Grade 2.'
        });
        alerts.push({
            title: 'Pralsetinib — Hypertension & Embryo-fetal Toxicity',
            text: 'Monitor BP regularly; antihypertensives as needed. Embryo-fetal toxicity: effective contraception in females of reproductive potential during + ≥2 weeks post; males: condoms during + ≥1 week post.'
        });
    }

    // Vandetanib (RET/VEGFR/EGFR multi-kinase inhibitor — medullary thyroid)
    if (hasDrug('vandetanib')) {
        alerts.push({
            title: 'Vandetanib — QTc Prolongation (Black Box Warning)',
            text: 'Black Box Warning: QTc prolongation, torsades de pointes, and sudden death. Baseline ECG; repeat at 2–4 weeks, 8–12 weeks, and every 3 months thereafter. Correct hypokalaemia, hypomagnesaemia, and hypocalcaemia before and during treatment. Avoid all QTc-prolonging drugs. Hold for QTc >500ms; dose reduce for QTc 450–500ms. Permanently discontinue for Grade 3–4 arrhythmia or QTc >500ms despite dose reduction.'
        });
        alerts.push({
            title: 'Vandetanib — Hypertension & Diarrhoea',
            text: 'Hypertension in ~33%: monitor BP before each cycle; antihypertensives as needed. Diarrhoea in ~57%: initiate antidiarrhoeals (loperamide) early; dose reduce for Grade 3. Rash and photosensitivity common — advise sun avoidance and SPF 50+ sunscreen daily.'
        });
        alerts.push({
            title: 'Vandetanib — Embryo-fetal Toxicity',
            text: 'Females: effective contraception during + ≥4 months post (long half-life ~19 days); no breastfeeding. Males: condoms during + ≥4 months post.'
        });
    }

    // Lenvatinib (VEGFR/FGFR/PDGFR/KIT/RET multi-kinase inhibitor)
    if (hasDrug('lenvatinib')) {
        alerts.push({
            title: 'Lenvatinib — Hypertension',
            text: 'BP should be well-controlled before starting. Monitor BP weekly × 2 weeks, then every 2 weeks × 2 months, then monthly. Initiate antihypertensives as needed. Hold for hypertensive crisis (>160/100 mmHg uncontrolled); dose reduce or stop for persistent Grade 3.'
        });
        alerts.push({
            title: 'Lenvatinib — Hepatotoxicity',
            text: 'LFTs at baseline, then every 2 weeks for first 2 months, then monthly. Hold Grade 3; permanently discontinue Grade 4 or hepatic failure.'
        });
        alerts.push({
            title: 'Lenvatinib — Proteinuria Monitoring',
            text: 'Urine dipstick before each cycle. If ≥2+, obtain 24-hour urine protein. Hold for protein ≥2g/24h; permanently discontinue for nephrotic syndrome.'
        });
        alerts.push({
            title: 'Lenvatinib — Embryo-fetal Toxicity',
            text: 'Females: contraception during + ≥30 days post; no breastfeeding. Males: condoms during + ≥30 days post.'
        });
    }

    // FOLFOX — Y-site concurrent administration
    if (hasDrug('oxaliplatin') && hasDrug('leucovorin')) {
        alerts.push({
            type: 'info',
            title: 'FOLFOX — Y-site Concurrent Administration',
            text: 'Run oxaliplatin and leucovorin simultaneously via Y-site over 2h. Flush with D5W — oxaliplatin is incompatible with NS and chloride-containing solutions. 5-FU bolus + 46h CI follows after.'
        });
    }

    // FOLFIRI — Y-site concurrent administration
    if (hasDrug('irinotecan') && hasDrug('leucovorin')) {
        alerts.push({
            type: 'info',
            title: 'FOLFIRI — Y-site Concurrent Administration',
            text: 'Run irinotecan and leucovorin simultaneously via Y-site over 90 min. 5-FU bolus + 46h CI follows after.'
        });
    }

    // Liposomal Irinotecan (nal-IRI / Onivyde) — NOT interchangeable with conventional irinotecan
    if (hasDrug('liposomal irinotecan')) {
        alerts.push({
            title: 'Liposomal Irinotecan — NOT Interchangeable with Conventional Irinotecan',
            text: 'Liposomal irinotecan (nal-IRI) has different pharmacokinetics and dosing — do NOT substitute with conventional irinotecan. Dose: 70 mg/m² (free base equivalent) or 50 mg/m² when used in NALIRIFOX. Infuse over 90 min via a 0.2 micron in-line filter.'
        });
        alerts.push({
            title: 'Liposomal Irinotecan — Severe Diarrhoea',
            text: 'Delayed diarrhoea (onset hours to days post-infusion) occurs in up to 50%. Provide loperamide and written instructions: 4 mg at first loose stool then 2 mg every 2h until diarrhoea-free ≥12h. Acute cholinergic syndrome (early diarrhoea, sweating, cramping) → atropine 0.25–1 mg IV/SC. Grade 3–4 → hold; restart reduced dose after recovery. Do not initiate next cycle with active diarrhoea.'
        });
    }

    // ── LEUKEMIA-SPECIFIC ALERTS ────────────────────────────────────────────────

    // Venetoclax — TLS during dose ramp-up (critical)
    if (hasDrug('venetoclax')) {
        alerts.push({
            title: 'Venetoclax — Tumour Lysis Syndrome (TLS) Risk During Ramp-Up',
            text: 'Mandatory structured ramp-up (CLL: 20→50→100→200→400 mg over 5 weeks; AML: compressed ramp-up). High-risk patients: hospitalise for each dose step. Allopurinol 2–3 days before initiation; rasburicase for very high-risk. Monitor uric acid, K⁺, PO₄, Ca²⁺, creatinine at baseline and 6–8h after each dose step. TLS → hold, correct electrolytes; do not escalate for ≥1 week.'
        });
    }

    // Blinatumomab — CRS and neurological toxicity (Black Box Warning)
    if (hasDrug('blinatumomab')) {
        alerts.push({
            title: 'Blinatumomab — CRS and Neurological Toxicity (Black Box Warning)',
            text: 'CRS and ICANS — both potentially severe/fatal (Black Box Warning). Premedicate: dexamethasone 20 mg IV within 1h before each cycle start, step-dose, or restart after ≥4h interruption. Levetiracetam prophylaxis for patients with neurological history. Administer as continuous IV infusion. Hospital admission for first 9 days Cycle 1 and first 2 days subsequent cycles.'
        });
    }

    // Inotuzumab ozogamicin — VOD/SOS (Black Box Warning)
    if (hasDrug('inotuzumab')) {
        alerts.push({
            title: 'Inotuzumab Ozogamicin — Hepatic Veno-occlusive Disease / SOS (Black Box Warning)',
            text: 'VOD/SOS risk (Black Box Warning) — potentially fatal; highest risk in patients proceeding to HSCT. Monitor weight, abdominal girth, bilirubin, and LFTs before each dose. Permanently discontinue if VOD/SOS occurs. Use minimum cycles before transplant; avoid busulfan conditioning where possible.'
        });
    }

    // Gemtuzumab ozogamicin — VOD/SOS risk
    if (hasDrug('gemtuzumab')) {
        alerts.push({
            title: 'Gemtuzumab Ozogamicin — Hepatic Veno-occlusive Disease / SOS',
            text: 'VOD/SOS risk — monitor bilirubin, AST/ALT, and PT before each dose. Signs: weight gain, RUQ pain, jaundice, ascites. Permanently discontinue if confirmed. Optimise timing if HSCT planned.'
        });
    }

    // ATRA (All-trans retinoic acid) — APL Differentiation Syndrome
    if (hasDrug('retinoic acid')) {
        alerts.push({
            title: 'ATRA — APL Differentiation Syndrome',
            text: 'Differentiation syndrome in up to 25%, typically within the first 3 weeks. Features: fever, dyspnoea, infiltrates, effusion, oedema, hypotension. If suspected → dexamethasone 10 mg IV BD immediately (do NOT wait for confirmation). Interrupt ATRA only for severe Grade 3–4 pulmonary compromise. Rising WBC alone does not indicate differentiation syndrome.'
        });
    }

    // Arsenic trioxide — QTc prolongation
    if (hasDrug('arsenic')) {
        alerts.push({
            title: 'Arsenic Trioxide — QTc Prolongation and Electrolyte Monitoring',
            text: 'Baseline ECG required; repeat weekly during induction then each cycle. Correct K⁺ ≥4 mEq/L, Mg²⁺ ≥1.8 mg/dL before every dose. Avoid QTc-prolonging drugs (azoles, fluoroquinolones). Hold if QTc >500 ms or ΔQTc >60 ms from baseline.'
        });
    }

    // Nilotinib — QTc and cardiovascular risk
    if (hasDrug('nilotinib')) {
        alerts.push({
            title: 'Nilotinib — QTc Prolongation and Cardiovascular Risk',
            text: 'QTc: baseline ECG; repeat Day 7, then periodically; correct electrolytes; avoid QTc-prolonging drugs; hold if >481 ms; permanently discontinue if >500 ms. CV events: assess cardiovascular risk at baseline and q3 months; manage all modifiable risk factors aggressively. Take on empty stomach (no food 2h before, 1h after). Avoid grapefruit.'
        });
    }

    // Ponatinib — arterial occlusion (Black Box Warning)
    if (hasDrug('ponatinib')) {
        alerts.push({
            title: 'Ponatinib — Arterial and Venous Occlusion (Black Box Warning)',
            text: 'Arterial and venous occlusive events in up to 27% (Black Box Warning). Assess CV status at baseline and monthly; manage all CV risk factors aggressively. Interrupt for any arterial occlusive event; consider permanent discontinuation for recurrence. Consider dose reduction to 15 mg after major cytogenetic response.'
        });
    }

    // BTK inhibitors — AF, bleeding, drug interactions
    if (hasDrug('ibrutinib') || hasDrug('acalabrutinib') || hasDrug('zanubrutinib')) {
        alerts.push({
            title: 'BTK Inhibitor — Atrial Fibrillation, Bleeding, and Drug Interactions',
            text: 'AF: baseline ECG; if AF develops, rate control ± anticoagulation (concurrent BTK + anticoagulant increases bleeding risk — assess carefully). Bleeding: hold 3–7 days before/after surgery; avoid aspirin/NSAIDs unless clearly indicated. CYP3A4 substrate — avoid strong inhibitors (azole antifungals) and inducers (rifampicin, phenytoin).'
        });
    }

    // IDH inhibitors (enasidenib/ivosidenib) — differentiation syndrome
    if (hasDrug('enasidenib') || hasDrug('ivosidenib')) {
        alerts.push({
            title: 'IDH Inhibitor — Differentiation Syndrome',
            text: 'Differentiation syndrome in up to 13–19%, typically within first 3 months. Features: fever, dyspnoea, effusion, oedema, hypotension (identical to APL differentiation syndrome). Initiate dexamethasone 10 mg IV BD immediately if suspected. Interrupt IDH inhibitor only for Grade 4/life-threatening pulmonary symptoms; otherwise continue through dexamethasone.'
        });
    }

    // Revumenib — differentiation syndrome and QTc
    if (hasDrug('revumenib')) {
        alerts.push({
            title: 'Revumenib — Differentiation Syndrome and QTc Prolongation',
            text: 'Differentiation syndrome >20% (AUGMENT-101): manage identically to IDH inhibitor differentiation syndrome; hydroxyurea prophylaxis if WBC >25 × 10⁹/L. QTc: baseline ECG; correct K⁺/Mg²⁺ before each cycle; avoid QTc-prolonging drugs; hold if QTc >481 ms.'
        });
    }

    // ── LUNG-SPECIFIC ALERTS ────────────────────────────────────────────────────

    // Pemetrexed — mandatory B12 / folic acid supplementation
    if (hasDrug('pemetrexed')) {
        alerts.push({
            type: 'info',
            title: 'Pemetrexed — Mandatory Folic Acid & Vitamin B12',
            text: 'Folic acid 400–1000 mcg PO daily (start ≥7 days before first dose, continue for 21 days after last dose). Vitamin B12 1000 mcg IM every 9 weeks (first dose ≥7 days before starting). Dexamethasone 4 mg BD × 3 days (day before, day of, day after) to reduce rash. Do not administer without confirming supplementation is in place.'
        });
    }

    // EGFR TKIs — ILD / pneumonitis (osimertinib, gefitinib, afatinib)
    if (hasDrug('osimertinib') || hasDrug('gefitinib') || hasDrug('afatinib')) {
        alerts.push({
            title: 'EGFR TKI — Interstitial Lung Disease / Pneumonitis',
            text: 'ILD/pneumonitis in 3–4% (can be fatal with osimertinib). Report new dyspnoea, cough, or fever — hold immediately, CT chest. Permanently discontinue if Grade 2+ ILD confirmed; start prednisolone 0.5–1 mg/kg/day tapering over ≥4 weeks.'
        });
    }

    // Osimertinib — cardiac (QTc + LVEF)
    if (hasDrug('osimertinib')) {
        alerts.push({
            title: 'Osimertinib — Cardiac Toxicity (QTc Prolongation and Cardiomyopathy)',
            text: 'QTc: baseline ECG; avoid QTc-prolonging drugs; hold if QTc >500 ms or ΔQTc >60 ms; resume at reduced dose (80→40 mg). LVEF: baseline assessment; hold for symptomatic decline or decrease >10% to below 50%; permanently discontinue for persistent symptomatic cardiac failure.'
        });
    }

    // Brigatinib — early-onset pulmonary toxicity
    if (hasDrug('brigatinib')) {
        alerts.push({
            title: 'Brigatinib — Early-Onset Pulmonary Toxicity (Within First Week)',
            text: 'ILD/pneumonitis in up to 9%, typically within first 7 days — counsel patient before starting to report dyspnoea/hypoxia/cough immediately. Monitor closely during lead-in period (90 mg × 7 days). Interrupt for Grade 1–2 respiratory symptoms; permanently discontinue for Grade 3–4 or recurrent Grade 2.'
        });
    }

    // ALK/ROS1 TKIs — hepatotoxicity (alectinib, brigatinib, lorlatinib, crizotinib)
    if (hasDrug('alectinib') || hasDrug('brigatinib') || hasDrug('lorlatinib') || hasDrug('crizotinib')) {
        alerts.push({
            title: 'ALK/ROS1 TKI — Hepatotoxicity Monitoring',
            text: 'LFTs at baseline, monthly × 3 months, then q3 months. Hold Grade 3 (ALT/AST >5× ULN); permanently discontinue Grade 4 (>20× ULN) or DILI with bilirubin elevation. Crizotinib: also monitor for bradycardia and visual disturbances (photopsia, blurred vision).'
        });
    }

    // Lorlatinib — hyperlipidaemia and CNS effects
    if (hasDrug('lorlatinib')) {
        alerts.push({
            title: 'Lorlatinib — Hyperlipidaemia and CNS Effects',
            text: 'Hyperlipidaemia: fasting lipid panel at baseline, months 1 and 2, then q3 months; statin therapy for Grade 2+. CNS effects (mood changes, cognitive effects, hallucinations): counsel patient and carers before starting; assess at each visit; hold/dose-reduce for Grade 3–4.'
        });
    }

    // MET inhibitors — peripheral oedema, hepatotoxicity, ILD
    if (hasDrug('capmatinib') || hasDrug('tepotinib')) {
        alerts.push({
            title: 'MET Inhibitor (Capmatinib / Tepotinib) — Peripheral Oedema, Hepatotoxicity, and ILD',
            text: 'Peripheral oedema (>50%): monitor weight/fluid status; diuretics as needed; dose-reduce Grade 3. Hepatotoxicity: LFTs at baseline, q2 weeks × 3 months, then monthly; hold Grade 3, stop Grade 4. ILD/pneumonitis: hold immediately if suspected; permanently discontinue if confirmed. Capmatinib: avoid strong CYP3A4 inhibitors.'
        });
    }

    // Amivantamab — IRR and VTE risk
    if (hasDrug('amivantamab')) {
        alerts.push({
            title: 'Amivantamab — Infusion-Related Reactions and Venous Thromboembolism',
            text: 'IRR (66%, mostly Cycle 1 Day 1): pre-medicate before every infusion — antihistamine IV + paracetamol PO + dexamethasone 8 mg IV. First Cycle 1 dose split over 2 days — administer at IRR-equipped facility. Interrupt/slow for Grade 1–2; permanently discontinue for Grade 3–4. VTE (~7–8%): aspirin/anticoagulant prophylaxis during combination chemo phase.'
        });
    }

    // Tarlatamab — CRS and neurological toxicity
    if (hasDrug('tarlatamab')) {
        alerts.push({
            title: 'Tarlatamab — Cytokine Release Syndrome (CRS) and Neurological Toxicity',
            text: 'CRS common with step-up dosing (1 mg D1 → 10 mg D8). Premedicate before first two step-up doses: dexamethasone 8 mg IV + antihistamine + paracetamol. Observe ≥24h after each step-up. Grade 1–2: supportive; Grade 3: interrupt + steroids; Grade 4: permanently discontinue. ICANS (confusion/aphasia/seizure): interrupt + dexamethasone.'
        });
    }

    // Lurbinectedin — hepatotoxicity
    if (hasDrug('lurbinectedin')) {
        alerts.push({
            title: 'Lurbinectedin — Hepatotoxicity and Myelosuppression',
            text: 'LFTs at baseline and before each cycle; hold ALT/AST >5× ULN; permanently discontinue if not resolved within 3 weeks. ANC ≥1.5 × 10⁹/L and platelets ≥100 × 10⁹/L required at cycle start. Protect infusion bag from light during preparation and administration.'
        });
    }

    // ── LYMPHOMA-SPECIFIC ALERTS ────────────────────────────────────────────────

    // Brentuximab vedotin — PML (black box) + peripheral neuropathy
    if (hasDrug('brentuximab')) {
        alerts.push({
            title: 'Brentuximab Vedotin — PML (Black Box) & Peripheral Neuropathy',
            text: 'PML (JC virus reactivation, including fatal cases — Black Box): monitor for new/worsening neurological, cognitive, or behavioural symptoms; hold and evaluate immediately if suspected. Peripheral neuropathy (cumulative): dose reduce Grade 2–3 (75% or 50%); permanently discontinue Grade ≥4.'
        });
    }

    // Polatuzumab vedotin — peripheral neuropathy (ADC)
    if (hasDrug('polatuzumab')) {
        alerts.push({
            title: 'Polatuzumab Vedotin — Peripheral Neuropathy',
            text: 'Peripheral neuropathy (sensory and motor): assess before each cycle using the NCI-CTCAE scale. Dose reduce for Grade 2 persistent or Grade 3; permanently discontinue for Grade 4. Neuropathy may persist after treatment completion.'
        });
    }

    // Loncastuximab tesirine — oedema / effusions (SG unique toxicity)
    if (hasDrug('loncastuximab')) {
        alerts.push({
            title: 'Loncastuximab Tesirine — Oedema, Effusions & Skin Toxicity',
            text: 'Oedema and effusions: monitor weight and fluid status each cycle; hold for Grade ≥3 or clinically significant peripheral oedema/pleural effusion. Cutaneous reactions including photosensitivity: advise UV protection; assess skin each visit. Myelosuppression: nadir around Day 15; monitor CBC before each cycle.'
        });
    }

    // CAR-T therapy — CRS and ICANS (black box)
    if (hasDrug('axicabtagene') || hasDrug('tisagenlecleucel') || hasDrug('lisocabtagene')) {
        alerts.push({
            title: 'CAR-T Therapy — CRS & ICANS (Black Box)',
            text: 'CRS and ICANS — potentially fatal (Black Box Warning). Administer ONLY at certified REMS centres with ICU support and tocilizumab available. CRS → tocilizumab 8 mg/kg IV ± dexamethasone. ICANS → dexamethasone 10 mg q6h + neurology review. Monitor ≥7 days post-infusion at certified facility.'
        });
    }

    // Epcoritamab — CRS and ICANS (SC bispecific, step-up dosing)
    if (hasDrug('epcoritamab')) {
        alerts.push({
            title: 'Epcoritamab — CRS & ICANS (Step-Up Dosing Protocol)',
            text: 'CRS predominantly during Cycle 1 step-up (Days 1, 8, 15, 22). Pre-medicate before EVERY Cycle 1 step-up: dexamethasone 8 mg PO/IV + antihistamine + paracetamol. Observe ≥2h post each step-up injection. CRS → tocilizumab 8 mg/kg IV ± dexamethasone. ICANS: neurological assessment before each injection; manage with dexamethasone.'
        });
    }

    // Glofitamab and Mosunetuzumab — CRS (IV bispecifics, step-up dosing)
    if (hasDrug('glofitamab') || hasDrug('mosunetuzumab')) {
        alerts.push({
            title: 'Glofitamab / Mosunetuzumab — CRS (IV Bispecific Step-Up Dosing)',
            text: 'CRS most common during step-up doses. Obinutuzumab pretreatment (1000 mg, 7 days before Cycle 1 glofitamab) mandatory. Pre-medicate each step-up: corticosteroid (prednisolone 100 mg or dexamethasone 20 mg IV) + antihistamine + paracetamol. CRS → tocilizumab 8 mg/kg IV; suspend infusion for Grade ≥2.'
        });
    }

    // Lenalidomide — REMS (embryo-fetal toxicity + VTE)
    if (hasDrug('lenalidomide')) {
        alerts.push({
            title: 'Lenalidomide — REMS: Embryo-fetal Toxicity & VTE',
            text: 'Teratogenic (thalidomide analogue) — REMS enrolment mandatory. Females: 2 effective contraceptive methods during + 4 weeks after; pregnancy test before each prescription. Males: condoms during + 4 weeks after. VTE: aspirin/LMWH/warfarin prophylaxis strongly recommended.'
        });
    }

    // Bexarotene — lipid, thyroid and teratogenicity
    if (hasDrug('bexarotene')) {
        alerts.push({
            title: 'Bexarotene — Hyperlipidaemia, Hypothyroidism & Teratogenicity',
            text: 'Hyperlipidaemia (>70%): fasting lipid panel at baseline and q2–4 weeks; most patients need lipid-lowering therapy (avoid gemfibrozil). Central hypothyroidism: TFTs at baseline and monthly; supplement if free T4 low. Teratogenic (Category X): contraception in both sexes during + 1 month after. FBC monthly for leukopenia. Sun protection advised.'
        });
    }

    // Selinexor — nausea (major), thrombocytopenia, hyponatraemia
    if (hasDrug('selinexor')) {
        alerts.push({
            title: 'Selinexor — Nausea, Thrombocytopenia & Hyponatraemia',
            text: 'Prophylactic antiemetics (5-HT3 + olanzapine or prochlorperazine) before each dose. Platelet count before each dose; hold for <50 × 10⁹/L. Electrolytes at baseline and each cycle; correct hyponatraemia before dosing.'
        });
    }

    // L-asparaginase — hypersensitivity, pancreatitis, thrombosis, hepatotoxicity
    if (hasDrug('asparaginase') || hasDrug('aspar')) {
        alerts.push({
            title: 'L-asparaginase — Hypersensitivity, Pancreatitis & Thrombosis',
            text: 'Anaphylaxis risk: test dose per protocol; epinephrine/antihistamines/steroids available; observe ≥1h post-infusion. Pancreatitis: amylase/lipase before each dose; hold for pancreatitis; permanently discontinue if severe/haemorrhagic. Coagulopathy (reduced fibrinogen/antithrombin III): coagulation profile each cycle; cryoprecipitate/FFP if fibrinogen <1.0 g/L.'
        });
    }

    // Idelalisib — hepatotoxicity, colitis, pneumonitis (black box)
    if (hasDrug('idelalisib')) {
        alerts.push({
            title: 'Idelalisib — Hepatotoxicity, Colitis & Pneumonitis (Black Box)',
            text: 'Fatal toxicities (Black Box Warning): hepatotoxicity (LFTs q2 weeks × 3 months, then monthly; hold Grade ≥3; permanently discontinue Grade 4); severe colitis (hold Grade 3; colonoscopy + budesonide/steroids; stop Grade 4); pneumonitis (hold for respiratory symptoms; permanently discontinue if confirmed). P. jirovecii prophylaxis (TMP-SMX) mandatory throughout.'
        });
    }

    // Copanlisib — hyperglycaemia and hypertension (infusion-day effects)
    if (hasDrug('copanlisib')) {
        alerts.push({
            title: 'Copanlisib — Infusion-Day Hyperglycaemia & Hypertension',
            text: 'Hyperglycaemia (peaks 5–8h post-infusion): blood glucose before each infusion; do not administer if >160 mg/dL; avoid high-carbohydrate meals on infusion day. Hypertension (acute): BP before and 1h post-infusion; do not administer if pre-infusion BP >150/90 mmHg; avoid antihypertensives on morning of infusion day.'
        });
    }

    // Tazemetostat — embryo-fetal toxicity (EZH2 inhibitor)
    if (hasDrug('tazemetostat')) {
        alerts.push({
            title: 'Tazemetostat — Embryo-fetal Toxicity & Secondary Malignancy',
            text: 'Embryo-fetal toxicity: advise contraception in females of reproductive potential during treatment and for 6 months after; males should use contraception during treatment and for 3 months after. Secondary T-cell lymphomas and MDS reported with EZH2 inhibitors: monitor clinically; report new haematological symptoms promptly. LFTs at baseline and periodically.'
        });
    }

    // ── SARCOMA-SPECIFIC ALERTS ───────────────────────────────────────────────

    // Trabectedin — mandatory dexamethasone pre-medication, hepatotoxicity, rhabdomyolysis
    if (hasDrug('trabectedin')) {
        alerts.push({
            title: 'Trabectedin — Mandatory Dexamethasone Pre-medication',
            text: 'Dexamethasone 20 mg IV must be given 30 min before EVERY trabectedin infusion. Reduces both hepatotoxicity risk and nausea/vomiting. Do not omit regardless of antiemetic regimen used.'
        });
        alerts.push({
            title: 'Trabectedin — Hepatotoxicity',
            text: 'Transaminase elevations (ALT/AST) occur in >80% of patients. Check LFTs before each cycle. Hold if ALT/AST >2.5× ULN or bilirubin >ULN before infusion day. Typically reversible between cycles.'
        });
        alerts.push({
            title: 'Trabectedin — Rhabdomyolysis & Extravasation Risk',
            text: 'Rhabdomyolysis reported (rare but potentially fatal): monitor CK and creatinine at baseline and before each cycle; hold for CK >5× ULN with symptoms. Vesicant — administer exclusively via central venous access; monitor for extravasation throughout the 24-hour infusion.'
        });
    }

    // Nirogacestat — GI toxicity, ovarian toxicity, embryo-fetal
    if (hasDrug('nirogacestat')) {
        alerts.push({
            title: 'Nirogacestat — Diarrhoea (Major Toxicity)',
            text: 'Diarrhoea in ~84% of patients (Grade 3: ~37%) — most common cause of dose reduction. Initiate antidiarrhoeal agents (loperamide) at first loose stool; hold for Grade 3; reduce dose after recovery. Nausea and vomiting also frequent — ensure adequate antiemetic support.'
        });
        alerts.push({
            title: 'Nirogacestat — Ovarian Toxicity & Embryo-fetal Toxicity',
            text: 'Premature menopause reported in premenopausal women — counsel on fertility impact before starting; consider fertility preservation referral if appropriate. Embryo-fetal toxicity: effective contraception in females of reproductive potential during treatment and for ≥1 month after last dose; confirm pregnancy status before starting.'
        });
    }

    // Pexidartinib — Black Box hepatotoxicity, REMS
    if (hasDrug('pexidartinib')) {
        alerts.push({
            title: 'Pexidartinib — SERIOUS Hepatotoxicity (Black Box Warning)',
            text: 'Serious and potentially fatal hepatotoxicity including cholestatic hepatitis reported. REMS programme (PEXIVAS) mandatory — prescriber and patient must both be enrolled. LFTs (ALT, AST, total bilirubin, alkaline phosphatase) must be checked before treatment, weekly × 8 weeks, then every 2 weeks × 4, then monthly thereafter. Hold for ALT/AST 3–8× ULN; permanently discontinue for ALT/AST >8× ULN or any ALT elevation with bilirubin >2× ULN.'
        });
        alerts.push({
            type: 'info',
            title: 'Pexidartinib — Food Interaction',
            text: 'Must be taken with a low-fat meal (≤400 kcal, ≤25g fat) to reduce GI adverse effects; a high-fat meal markedly increases exposure — avoid. Skin and hair hypopigmentation common (CSF1R effect) — cosmetically bothersome but not a safety concern.'
        });
    }

    // Afamitresgene autoleucel — TCR T-cell therapy, CRS, cytopenia
    if (hasDrug('afamitresgene')) {
        alerts.push({
            title: 'Afamitresgene Autoleucel — CRS & Anaphylaxis (Black Box Warning)',
            text: 'Cytokine release syndrome (CRS) and anaphylaxis are Black Box Warnings. Administer ONLY in certified cell therapy centres with ICU capability. Patient ID verification with 2 identifiers mandatory before infusion. Monitor continuously for ≥4 hours post-infusion. Have resuscitation, tocilizumab, and adrenaline immediately available. Delayed CRS can occur up to 48 hours post-infusion.'
        });
        alerts.push({
            title: 'Afamitresgene Autoleucel — Prolonged Cytopenia & Infection Risk',
            text: 'Lymphodepletion (fludarabine + cyclophosphamide) causes profound neutropenia and lymphopenia — risk of severe infections. Monitor FBC daily during lymphodepletion and at least weekly post-infusion. PCP prophylaxis, antifungal prophylaxis, and antiviral (acyclovir) prophylaxis mandatory from lymphodepletion start until immune recovery. Avoid live vaccines for ≥6 weeks post-lymphodepletion.'
        });
    }

    // Sirolimus (mTOR inhibitor for PEComa) — class alerts similar to everolimus
    if (hasDrug('sirolimus')) {
        alerts.push({
            title: 'Sirolimus — Stomatitis / Oral Mucositis',
            text: 'mTOR inhibitor class effect. Preventive steroid mouthwash (e.g. dexamethasone 0.5 mg/5 mL, rinse and spit 4×/day) from Day 1. Alcohol-containing mouthwash contraindicated. Hold for Grade 3; reduce dose after recovery.'
        });
        alerts.push({
            title: 'Sirolimus — Non-infectious Pneumonitis',
            text: 'mTOR inhibitor class effect. Monitor for dyspnoea, dry cough, or fever. CT chest for any respiratory symptoms. Rule out infection before initiating steroids. Hold for Grade 2; permanently discontinue for Grade 3.'
        });
        alerts.push({
            type: 'info',
            title: 'Sirolimus — Hyperglycaemia, Hyperlipidaemia & Drug Interactions',
            text: 'Monitor fasting glucose and lipid panel at baseline and periodically. Strong CYP3A4 inhibitors (azole antifungals, macrolides) markedly increase sirolimus levels — check drug interactions. Avoid grapefruit. Therapeutic drug monitoring (trough levels) may be appropriate; target 4–12 ng/mL in transplant practice (oncology dosing may differ).'
        });
    }

    // Romidepsin — QTc prolongation
    if (hasDrug('romidepsin')) {
        alerts.push({
            title: 'Romidepsin — QTc Prolongation',
            text: 'QTc prolongation: baseline ECG before first dose; correct hypokalaemia and hypomagnesaemia before each infusion; avoid concurrent QTc-prolonging drugs. Hold if QTc >480 ms; permanently discontinue for QTc >500 ms or symptomatic arrhythmia.'
        });
    }

    // Mogamulizumab — severe skin reactions and allogeneic SCT risk
    if (hasDrug('mogamulizumab')) {
        alerts.push({
            title: 'Mogamulizumab — Severe Skin Reactions & Pre-transplant Caution',
            text: 'Severe cutaneous adverse reactions (Stevens-Johnson syndrome, toxic epidermal necrolysis): monitor skin at each visit; promptly evaluate and manage any blistering, mucositis, or extensive rash; permanently discontinue for Grade ≥3. Pre-allogeneic HSCT caution: increased risk of severe and fatal immune complications (engraftment syndrome, GVHD) when allogeneic SCT is performed within 50 days of last mogamulizumab dose — discuss timing carefully with transplant team.'
        });
    }

    // Denileukin diftitox — capillary leak syndrome (black box)
    if (hasDrug('denileukin')) {
        alerts.push({
            title: 'Denileukin Diftitox — Capillary Leak Syndrome (Black Box)',
            text: 'Vascular leak syndrome (Black Box Warning): hypotension, oedema, hypoalbuminaemia — can be severe, requiring hospitalisation. Monitor weight, BP and albumin before each cycle; hold if albumin <3.0 g/dL. Acute hypersensitivity reactions during infusion (within 24 h): have resuscitation facilities available; pre-medicate with antihistamine + paracetamol. Visual disturbances including loss of visual acuity reported: ophthalmological assessment if symptoms develop.'
        });
    }

    // ── MULTIPLE MYELOMA-SPECIFIC ALERTS ─────────────────────────────────────

    // Daratumumab — mandatory pre-medication; split first infusion over 2 days; IRR
    if (hasDrug('daratumumab')) {
        alerts.push({
            title: 'Daratumumab — Mandatory Pre-medication & First-Infusion Protocol',
            text: 'Pre-medicate before EVERY infusion: antihistamine IV + paracetamol 1g PO + methylprednisolone 100 mg IV (or dexamethasone 20 mg). IRR in ~50% at first infusion: interrupt; resume at 50% rate when resolved; permanently discontinue for Grade 4/anaphylaxis. First IV dose may be split over 2 consecutive days. Post-infusion: montelukast 10 mg PO ± inhaled SABA for ≥3 days (delayed bronchospasm).'
        });
    }

    // Isatuximab — mandatory pre-medication; IRR management
    if (hasDrug('isatuximab')) {
        alerts.push({
            title: 'Isatuximab — Mandatory Pre-medication & IRR Management',
            text: 'Pre-medicate before EVERY infusion: dexamethasone 28 mg PO/IV + diphenhydramine IV + H2 antagonist IV + paracetamol PO. First infusion rate: 25→50→75→200 mL/h (step up each 30 min). IRR in ~38%: interrupt; resume at reduced rate; permanently discontinue for Grade 4.'
        });
    }

    // Carfilzomib — cardiovascular toxicity, mandatory hydration
    if (hasDrug('carfilzomib')) {
        alerts.push({
            title: 'Carfilzomib — Cardiovascular Toxicity & Mandatory Hydration',
            text: 'Baseline ECHO/MUGA before starting; BP before each dose. Cardiovascular events including cardiac arrest — fatal cases reported; hold Grade 3+; permanently discontinue for cardiac arrest/severe HF. IV hydration 250–500 mL NS before each dose in Cycles 1–2. Cycle 1 step-up dose 20 mg/m²; Cycle 2+ dose 56 mg/m².'
        });
    }

    // Bortezomib — peripheral neuropathy + mandatory herpes zoster prophylaxis
    if (hasDrug('bortezomib')) {
        alerts.push({
            title: 'Bortezomib — Peripheral Neuropathy & Herpes Zoster Prophylaxis',
            text: 'Peripheral neuropathy: Grade 1 with pain/Grade 2 → reduce to 1.0 mg/m²; Grade 2 with pain/Grade 3 → hold, restart at 0.7 mg/m²; Grade 4 → permanently discontinue. SC route preferred (lower neuropathy risk). Herpes zoster prophylaxis mandatory throughout + 3 months after: acyclovir 400 mg BD or valaciclovir 500 mg OD.'
        });
    }

    // Thalidomide — REMS, peripheral neuropathy, VTE, embryo-fetal toxicity
    if (hasDrug('thalidomide')) {
        alerts.push({
            title: 'Thalidomide — Embryo-fetal Toxicity (REMS), Neuropathy & VTE',
            text: 'THALOMID REMS mandatory (prescriber/patient/pharmacy registration; pregnancy test before each prescription). Teratogenic — single dose can cause severe birth defects. Females: 2 forms contraception during + ≥4 weeks after. Males: condoms during + ≥4 weeks after; no semen/blood donation. VTE: aspirin (standard risk) or LMWH/warfarin (high risk/IMiD + steroid). Monthly neurological assessment for neuropathy.'
        });
    }

    // Belantamab mafodotin — corneal toxicity (REMS), KAYG ophthalmology mandatory
    if (hasDrug('belantamab')) {
        alerts.push({
            title: 'Belantamab Mafodotin — Corneal Toxicity: Ophthalmology Before Each Dose (REMS)',
            text: 'DREAMM REMS: ophthalmological exam (visual acuity + slit-lamp) required before EVERY dose. Keratopathy in >70% — dose-limiting. Grade 1: continue monitoring. Grade 2 (VA ≥20/40): hold, reduce dose. Grade 3–4 or VA <20/200: permanently discontinue. Preservative-free lubricating eye drops throughout treatment.'
        });
    }

    // Bispecific antibodies (BCMA/GPRC5D) — CRS + ICANS, mandatory step-up inpatient
    if (hasDrug('teclistamab') || hasDrug('talquetamab') || hasDrug('elranatamab') || hasDrug('linvoseltamab')) {
        alerts.push({
            title: 'Bispecific Antibody — CRS & ICANS: Mandatory Inpatient Step-up Dosing',
            text: 'ALL step-up doses must be administered inpatient with ≥48h observation for CRS (50–75%). CRS → tocilizumab 8 mg/kg IV for Grade ≥2; steroids for refractory. ICANS: neurological assessment daily during step-up; permanently discontinue for Grade 4 CRS or Grade 3+ ICANS. Mandatory infection prophylaxis: PCP (co-trimoxazole) + antiviral + antifungal throughout treatment.'
        });
    }

    // Panobinostat — QTc prolongation, severe diarrhoea
    if (hasDrug('panobinostat')) {
        alerts.push({
            title: 'Panobinostat — QTc Prolongation & Severe Diarrhoea',
            text: 'QTc: baseline ECG; correct K⁺/Mg²⁺ before starting; hold >480 ms; permanently discontinue >500 ms or increase >60 ms; avoid QTc-prolonging drugs. Diarrhoea (Grade 3–4 in ~25%): loperamide at first sign; hold Grade 3–4; dose reduce after recovery. Dosing: Days 1, 3, 5, 8, 10, 12 of each 21-day cycle.'
        });
    }

    // ── PROSTATE-SPECIFIC ALERTS ──────────────────────────────────────────────

    // Abiraterone — mineralocorticoid excess, empty stomach dosing, hepatotoxicity
    if (hasDrug('abiraterone')) {
        alerts.push({
            title: 'Abiraterone — Mineralocorticoid Excess & Mandatory Corticosteroid Co-administration',
            text: 'Must be given WITH prednisone 5 mg BD (or methylprednisolone 4 mg BD) to prevent mineralocorticoid excess. Monitor for hypertension, hypokalaemia, and fluid retention each cycle. Check electrolytes and BP before each cycle; supplement potassium as needed. Manage hypertension with antihypertensives.'
        });
        alerts.push({
            title: 'Abiraterone — Empty Stomach Dosing & Hepatotoxicity',
            text: 'Must be taken on an empty stomach — no food for 2h before and 1h after dose. Food increases abiraterone AUC by up to 10-fold → dose-limiting toxicity. LFTs at baseline, every 2 weeks × 3 months, then monthly. Hold Grade 3 transaminase elevation; permanently discontinue Grade 4 or jaundice.'
        });
    }

    // Enzalutamide — seizure risk, CNS effects, CYP3A4 induction
    if (hasDrug('enzalutamide')) {
        alerts.push({
            title: 'Enzalutamide — Seizure Risk & CNS Effects',
            text: 'Seizures reported (~1%). Contraindicated in patients with prior seizure or predisposing CNS conditions. Counsel patient: do not drive or operate machinery if dizziness, somnolence, or cognitive impairment occur. Falls and fractures reported — assess fall risk at baseline. Posterior reversible encephalopathy syndrome (PRES) — rare but serious.'
        });
        alerts.push({
            type: 'info',
            title: 'Enzalutamide — Strong CYP3A4 Inducer & Embryo-fetal Toxicity',
            text: 'Strong CYP3A4 inducer — reduces plasma levels of many co-medications (warfarin, statins, immunosuppressants, opioids). Review full drug list at initiation. Males with female partners of childbearing potential: condoms during + ≥3 months post treatment.'
        });
    }

    // Apalutamide — rash, seizure risk, thyroid function, CYP induction
    if (hasDrug('apalutamide')) {
        alerts.push({
            title: 'Apalutamide — Rash & Seizure Risk',
            text: 'Maculopapular rash in ~26% (Grade 3 in ~6%) — typically onset weeks 2–4. Mild: topical steroids ± antihistamines. Grade 3 → hold until ≤Grade 1, then resume at reduced dose; recurrent Grade 3 → permanently discontinue. Seizure risk (~0.2%): contraindicated in prior seizure history.'
        });
        alerts.push({
            type: 'info',
            title: 'Apalutamide — Thyroid Function & CYP Induction',
            text: 'Thyroid-stimulating hormone (TSH) may rise — monitor thyroid function in patients on levothyroxine (apalutamide increases levothyroxine metabolism). Strong CYP3A4 and CYP2C19 inducer — review drug interactions. Males: condoms during + ≥3 months post treatment.'
        });
    }

    // Darolutamide — hepatotoxicity, embryo-fetal toxicity
    if (hasDrug('darolutamide')) {
        alerts.push({
            title: 'Darolutamide — Hepatotoxicity & Embryo-fetal Toxicity',
            text: 'LFTs at baseline and monthly for first 6 months, then as clinically indicated. Hold for Grade 3 transaminase elevation; permanently discontinue Grade 4. Lower CNS penetration vs. enzalutamide — generally better tolerated (lower seizure/fall risk). Males: condoms during + ≥1 week post treatment.'
        });
    }

    // Radium-223 — radiation safety, bone marrow, avoid abiraterone co-admin
    if (hasDrug('radium-223') || hasDrug('radium 223')) {
        alerts.push({
            title: 'Radium-223 — Radiation Safety & Bone Marrow Monitoring',
            text: 'Administer in a licensed nuclear medicine facility. Patient excretes radiation primarily via faeces for 3–7 days — standard radiation hygiene precautions. CBC before each injection: hold for ANC <1.0 × 10⁹/L or platelets <50 × 10⁹/L. Aplasia and pancytopenia reported — increased risk if prior or concurrent myelosuppressive chemotherapy. Do NOT use concurrently with abiraterone + prednisone (ERA-223: increased fractures and mortality).'
        });
    }

    // Lu-177 PSMA-617 — salivary gland toxicity, radiation safety (distinct from dotatate)
    if (hasDrug('psma')) {
        alerts.push({
            title: 'Lu-177 PSMA-617 — Salivary Gland Toxicity & Dry Mouth',
            text: 'Salivary gland uptake of PSMA tracer causes xerostomia and hyposalivation in ~40% (Grade 3 in ~8%). Pre-hydrate salivary glands: sour candy/lemon drops before and after infusion to stimulate saliva flow and reduce radiation dose to glands. Maintain good oral hygiene. Monitor for dry mouth throughout treatment — irreversible in some patients.'
        });
        alerts.push({
            type: 'info',
            title: 'Lu-177 PSMA-617 — Radiation Safety Precautions',
            text: 'Administer in a licensed nuclear medicine facility. Patient emits radiation for ≥7 days post-infusion — limit close contact with children and pregnant women. Urine is the main excretion route (radiation hazard) — careful handling for 7 days. FBC monitoring for myelosuppression before each cycle.'
        });
    }

    // Sipuleucel-T — autologous product handling, infusion reactions
    if (hasDrug('sipuleucel')) {
        alerts.push({
            title: 'Sipuleucel-T — Autologous Product: Mandatory Patient ID Verification',
            text: 'Autologous cellular immunotherapy — must confirm patient identity using 2 identifiers against the product label before infusion. Do NOT infuse if label does not match. Do NOT use a cell filter. Infuse entire contents of bag over 60 min; do not initiate if bag shows signs of clumping or aggregation that do not disperse with gentle mixing.'
        });
        alerts.push({
            title: 'Sipuleucel-T — Infusion Reactions & Acute Infusion Management',
            text: 'Infusion reactions (chills, fever, fatigue, nausea) in ~70% — typically Grade 1–2, onset within 24h. Pre-medicate with paracetamol + antihistamine 30 min before each infusion. For Grade 3 reactions: slow or interrupt infusion; give IV antihistamine, H2 blocker, and/or low-dose IV corticosteroid. Three infusions total: D1, D15, D29 (each requires a preceding leukapheresis ~3 days before).'
        });
    }

    // ── NEUROENDOCRINE-SPECIFIC ALERTS ───────────────────────────────────────

    // Somatostatin analogues (octreotide LAR / lanreotide) — carcinoid crisis + metabolic
    if (hasDrug('octreotide') || hasDrug('lanreotide')) {
        alerts.push({
            title: 'Somatostatin Analogue — Carcinoid Crisis Prophylaxis',
            text: 'Carcinoid crisis risk during any procedure, anaesthesia, or tumour manipulation. Pre-treat with octreotide 500 mcg IV bolus before any intervention; have IV octreotide infusion ready intraoperatively. Administer SSA injections consistently (same day each cycle) and monitor for injection-site reactions.'
        });
        alerts.push({
            type: 'info',
            title: 'Somatostatin Analogue — Metabolic & GI Monitoring',
            text: 'Monitor fasting blood glucose (SSAs suppress insulin → risk of hyperglycaemia, or hypoglycaemia in insulinoma patients). Gallstone formation common with chronic use — baseline abdominal ultrasound recommended; annual surveillance.'
        });
    }

    // Lutetium Lu 177 dotatate — PRRT: mandatory amino acid renal protection + radiation safety
    if (hasDrug('dotatate')) {
        alerts.push({
            title: 'Lu-177 Dotatate (PRRT) — Mandatory Amino Acid Renal Protection',
            text: 'Amino acid solution (lysine/arginine-based) must be co-administered IV to protect the kidneys from radiation damage — start 30 min before Lu-177 infusion and continue for 3–4h total. Confirm renal function (GFR ≥30 mL/min) and baseline FBC before each cycle. Hold somatostatin analogue for ≥4 weeks before PRRT (SSAs compete with Lu-177 for SSTR binding).'
        });
        alerts.push({
            type: 'info',
            title: 'Lu-177 Dotatate (PRRT) — Radiation Safety Precautions',
            text: 'Administer in a licensed nuclear medicine facility with radiation safety infrastructure. Patient emits radiation for ≥7 days post-infusion — advise to limit close contact with children and pregnant women. Collect urine carefully (radiation hazard). FBC monitoring for myelosuppression at 4 and 8 weeks post each cycle.'
        });
    }

    // Belzutifan (HIF-2α inhibitor) — anaemia, hypoxia, embryo-fetal toxicity
    if (hasDrug('belzutifan')) {
        alerts.push({
            title: 'Belzutifan — Anaemia & Hypoxia (HIF-2α Inhibition)',
            text: 'Anaemia is common (HIF-2α suppression reduces erythropoietin) — FBC at baseline and monthly; transfusion may be required. Hypoxia can also occur — monitor oxygen saturation; hold for O₂ saturation <90% or Grade 3 hypoxia. Both may require dose interruption or reduction.'
        });
        alerts.push({
            title: 'Belzutifan — Embryo-fetal Toxicity',
            text: 'Teratogenic. Females: effective contraception during + ≥1 week post; no breastfeeding. Males: condoms during + ≥1 week post.'
        });
    }

    // ── OVARIAN-SPECIFIC ALERTS ──────────────────────────────────────────────

    // Mirvetuximab soravtansine (FRα-targeting ADC)
    if (hasDrug('mirvetuximab')) {
        alerts.push({
            title: 'Mirvetuximab Soravtansine — Ocular Toxicity (Keratopathy)',
            text: 'Ocular adverse events in ~40% (blurred vision, keratopathy, dry eye, photophobia). Ophthalmology assessment (slit-lamp + BCVA) before each dose cycle. Prescribe preservative-free lubricating eye drops and vasoconstricting eye drops prophylactically. Grade 2 → hold until Grade ≤1; Grade 3 → hold or reduce dose; Grade 4 → permanently discontinue. Avoid contact lenses during treatment.'
        });
        alerts.push({
            title: 'Mirvetuximab Soravtansine — Peripheral Neuropathy',
            text: 'Peripheral neuropathy reported in ~30% (mostly sensory). Assess neurological symptoms before each dose. Grade 2 with pain → hold until Grade ≤1; Grade 3 → hold and consider dose reduction; Grade 4 → permanently discontinue.'
        });
        alerts.push({
            title: 'Mirvetuximab Soravtansine — Embryo-fetal Toxicity',
            text: 'Contains a maytansine-class cytotoxic payload. Females: effective contraception during + ≥6 months post; no breastfeeding during + ≥3 months post. Males: condoms during + ≥3 months post.'
        });
    }

    // PLD — palmar-plantar erythrodysesthesia, stomatitis, infusion rate
    if (hasDrug('liposomal doxorubicin') || hasDrug('pegylated liposomal')) {
        alerts.push({
            title: 'Pegylated Liposomal Doxorubicin — Palmar-Plantar Erythrodysesthesia (PPE)',
            text: 'PPE (hand-foot syndrome) is the dose-limiting toxicity — onset typically 2–3 weeks into first cycle. Inspect hands and feet each visit. Preventive measures: moisturisers, padded footwear, avoid friction and heat. Grade 2 (blistering/painful) → hold until resolved to Grade ≤1, then reduce dose by one level. Grade 3 → hold + dose reduce. Grade 4 → discontinue.'
        });
        alerts.push({
            type: 'info',
            title: 'Pegylated Liposomal Doxorubicin — Stomatitis & Infusion Precautions',
            text: 'Stomatitis in ~20%: oral hygiene, alcohol-free mouthwash, hold Grade 3. Infusion-related reactions (flushing, dyspnoea, chest pain) — typically first dose: do NOT pre-medicate with antihistamines unless reaction occurs; reduce infusion rate if reaction. Cumulative cardiac toxicity: echocardiogram or MUGA at baseline and every 3–4 cycles (lower cumulative cardiotoxicity than conventional doxorubicin but not absent).'
        });
    }

    // Avutometinib (RAF/MEK inhibitor) + Defactinib (FAK inhibitor)
    if (hasDrug('avutometinib') || hasDrug('defactinib')) {
        alerts.push({
            title: 'Avutometinib — Ocular Toxicity (Retinal Pigment Epithelial Detachment)',
            text: 'MEK/RAF inhibitor class effect: retinal pigment epithelial detachment (RPED) and blurred vision reported. Ophthalmology assessment at baseline and if any visual symptoms develop. Hold for Grade 2 visual disturbance or RPED; resume at reduced dose if resolved. Grade 3–4 or non-recovering Grade 2 → permanently discontinue.'
        });
        alerts.push({
            title: 'Avutometinib + Defactinib — Hepatotoxicity & CK Elevation',
            text: 'LFTs at baseline, every 2 weeks for first 2 months, then monthly. Hold for Grade 3 transaminase elevation; permanently discontinue for Grade 4. CK elevation with avutometinib: CK at baseline and monthly; hold for CK >5× ULN with symptoms or ≥10× ULN. Advise patient to report unexplained muscle pain or dark urine.'
        });
        alerts.push({
            title: 'Avutometinib + Defactinib — Embryo-fetal Toxicity',
            text: 'Both agents are potentially teratogenic. Females: effective contraception during + ≥6 months post; no breastfeeding. Males: condoms during + ≥3 months post.'
        });
    }

    // ── MESOTHELIOMA-SPECIFIC ALERTS ─────────────────────────────────────────
    // (Bevacizumab alerts handled in the global bevacizumab block above)

    // ── MERKEL CELL-SPECIFIC ALERTS ──────────────────────────────────────────

    // Avelumab — mandatory antihistamine + paracetamol pre-medication (per FDA labelling)
    if (hasDrug('avelumab')) {
        alerts.push({
            type: 'info',
            title: 'Avelumab — Mandatory Pre-medication Required (per FDA Labelling)',
            text: 'Pre-medicate before each of the first 4 infusions: antihistamine IV + paracetamol PO, 30–60 min before. After infusion 4: pre-medicate only if prior Grade 1–2 IRR occurred. IRR in ~25%: interrupt; resume at 50% rate when resolved. Grade 3–4 or anaphylaxis: permanently discontinue.'
        });
    }

    // ── MELANOMA-SPECIFIC ALERTS ─────────────────────────────────────────────

    // Vemurafenib — QTc prolongation, photosensitivity, cutaneous SCC
    if (hasDrug('vemurafenib')) {
        alerts.push({
            title: 'Vemurafenib — QTc Prolongation',
            text: 'Baseline ECG before starting; repeat at Day 15, then monthly × 3 months, then quarterly. Correct electrolytes (K⁺, Mg²⁺) before each assessment. Hold for QTc >500 ms or increase >60 ms from baseline; permanently discontinue for recurrent QTc >500 ms.'
        });
        alerts.push({
            title: 'Vemurafenib — Photosensitivity & Cutaneous SCC',
            text: 'Severe photosensitivity (Grade 2–3 in up to 30%): prescribe SPF 30+ sunscreen, UV-protective clothing; avoid sun during peak hours throughout treatment. Cutaneous squamous cell carcinoma and keratoacanthoma (paradoxical MAPK activation): baseline full-body skin examination then every 2 months during treatment and 6 months post; excise new lesions and send for histology — does NOT require dose modification.'
        });
    }

    // Cobimetinib (MEK inhibitor) — retinal serous detachment, rhabdomyolysis, hepatotoxicity
    if (hasDrug('cobimetinib')) {
        alerts.push({
            title: 'Cobimetinib — Retinal Serous Detachment & Visual Changes',
            text: 'Serous retinopathy (retinal pigment epithelial detachment / subretinal fluid): ophthalmological assessment at baseline, after 1 month, then q3 months. New visual symptoms → urgent ophthalmology; hold for Grade 2 retinopathy; permanently discontinue for Grade 3–4 or recurrent Grade 2.'
        });
        alerts.push({
            title: 'Cobimetinib — Rhabdomyolysis & CK Elevation',
            text: 'Creatine kinase (CK) and creatinine at baseline and monthly during treatment. Hold for CK >5× ULN with muscle pain/weakness or ≥10× ULN regardless of symptoms. Resume at reduced dose once CK ≤3× ULN and symptoms resolve. Advise patient to report unexplained muscle pain, tenderness, or dark urine immediately.'
        });
        alerts.push({
            title: 'Cobimetinib — Hepatotoxicity',
            text: 'LFTs at baseline, monthly, and as clinically indicated. Hold for Grade 3 transaminase elevation; permanently discontinue for Grade 4 or recurrent Grade 3.'
        });
    }

    // Binimetinib (MEK inhibitor) — retinal serous detachment, rhabdomyolysis, hepatotoxicity, LV dysfunction
    if (hasDrug('binimetinib')) {
        alerts.push({
            title: 'Binimetinib — Retinal Serous Detachment & Visual Changes',
            text: 'Serous retinopathy reported in clinical trials. Ophthalmological assessment (including OCT) at baseline and periodically; urgent review for new visual symptoms. Hold Grade 2; permanently discontinue Grade 3–4 or recurrent Grade 2 retinopathy.'
        });
        alerts.push({
            title: 'Binimetinib — Rhabdomyolysis & CK Elevation',
            text: 'CK and creatinine at baseline and at each scheduled visit. Hold for CK >5× ULN with symptoms or ≥10× ULN; resume at reduced dose once resolved. Advise patient to report muscle pain, weakness, or dark urine promptly.'
        });
        alerts.push({
            title: 'Binimetinib — Left Ventricular Dysfunction',
            text: 'LVEF assessment by echocardiogram or MUGA at baseline, then at 1 month and every 3 months thereafter. Hold for asymptomatic LVEF decrease ≥10 percentage points to below LLN; permanently discontinue for symptomatic LV dysfunction or LVEF decrease ≥20 percentage points.'
        });
    }

    // Encorafenib (BRAF inhibitor) — QTc, hepatotoxicity, uveitis
    if (hasDrug('encorafenib')) {
        alerts.push({
            title: 'Encorafenib — QTc Prolongation',
            text: 'Baseline ECG; repeat at 1 month then quarterly. Correct K⁺ and Mg²⁺ before treatment. Hold for QTc >500 ms or increase >60 ms; permanently discontinue for recurrent QTc >500 ms or Grade 3–4 arrhythmia.'
        });
        alerts.push({
            title: 'Encorafenib — Uveitis & Ocular Toxicity',
            text: 'Uveitis and iritis reported with BRAF/MEK inhibitor combinations. Advise patients to report blurred vision, photophobia, or eye pain promptly. Ophthalmological assessment at symptom onset; topical or systemic steroids per ophthalmologist guidance; hold drug for Grade 3–4 ocular events.'
        });
    }

    // Tebentafusp — CRS requiring mandatory inpatient observation for first 3 doses
    if (hasDrug('tebentafusp')) {
        alerts.push({
            title: 'Tebentafusp — CRS: Mandatory Inpatient Observation (First 3 Doses)',
            text: 'Step-up dosing (20→30→68 mcg). ALL first 3 doses: inpatient/monitored setting with ≥16h observation (CRS in ~89%). CRS → paracetamol/IV fluids; tocilizumab/steroids for Grade ≥2. Permanently discontinue for Grade 4 CRS. HLA-A*02:01 testing required before prescribing.'
        });
    }

    // Lifileucel (TIL therapy) — severe toxicity black box from lymphodepletion + HD IL-2
    if (hasDrug('lifileucel')) {
        alerts.push({
            title: 'Lifileucel (TIL Therapy) — Severe Toxicity: Lymphodepletion & High-Dose IL-2 (Black Box)',
            text: 'Black Box Warning: severe/fatal toxicity from lymphodepleting chemotherapy (cyclophosphamide + fludarabine) and high-dose aldesleukin. Administer only at qualified centres with ICU support and experienced TIL therapy team. MESNA uroprotection mandatory for cyclophosphamide. PCP prophylaxis (co-trimoxazole) required; G-CSF support post-lymphodepletion.'
        });
    }

    // Talimogene laherparepvec — herpes transmission / biosafety precautions
    if (hasDrug('talimogene')) {
        alerts.push({
            title: 'Talimogene Laherparepvec (T-VEC) — Herpetic Transmission & Biosafety',
            text: 'Live attenuated HSV-1 — biosafety precautions mandatory. Wear gloves, eye protection, and gown when handling; avoid contact with immunocompromised individuals, pregnant women, and neonates. Cover injection sites with occlusive dressings ≥1 week post-injection; treat used materials as contaminated waste. Herpetic transmission to close contacts possible — counsel patient.'
        });
    }

    // Aldesleukin (HD IL-2) — capillary leak syndrome black box, ICU mandatory
    if (hasDrug('aldesleukin')) {
        alerts.push({
            title: 'Aldesleukin (High-Dose IL-2) — Capillary Leak Syndrome (Black Box): ICU Mandatory',
            text: 'Black Box Warning: capillary leak syndrome (CLS) — fluid extravasation, hypotension, organ hypoperfusion; can be fatal. Prerequisites: normal cardiac stress test + normal PFTs before each course; ICU or monitored inpatient setting only. Hold criteria: systolic BP <90 mmHg, O₂ saturation <90%, or Grade ≥3 organ toxicity. Withhold for active infection — confirm resolution before starting.'
        });
    }

    // Dacarbazine — light-sensitive drug preparation note
    if (hasDrug('dacarbazine')) {
        alerts.push({
            type: 'info',
            title: 'Dacarbazine — Light-Sensitive Preparation',
            text: 'Dacarbazine is highly photosensitive: prepared and stored in amber or foil-wrapped bags; protect infusion line from light during administration. Administer freshly prepared solution within 8 hours at room temperature (24 hours if refrigerated). Facial flushing and paraesthesia may occur during rapid infusion — infuse over 30–60 min; never IV bolus.'
        });
    }

    // ── TRANSPLANT CONDITIONING-SPECIFIC ALERTS ───────────────────────────────

    // Busulfan — seizure prophylaxis mandatory, TDM, VOD/SOS risk
    if (hasDrug('busulfan')) {
        alerts.push({
            title: 'Busulfan — Seizure Prophylaxis Mandatory',
            text: 'Anti-epileptic prophylaxis required during busulfan and for 24 hours after last dose. Preferred agents: levetiracetam (500–1000 mg BD), phenytoin (15 mg/kg loading), or clonazepam per institutional protocol. Phenytoin induces CYP3A4 and may reduce busulfan AUC — use levetiracetam if available. Do NOT omit seizure prophylaxis.'
        });
        alerts.push({
            title: 'Busulfan — Therapeutic Drug Monitoring (TDM)',
            text: 'Busulfan IV dosing should target AUC 900–1350 µmol·min per dose (MAC) or 600–900 µmol·min (RIC) per institutional protocol. Pharmacokinetic sampling after first or second dose; dose-adjust subsequent doses. Supratherapeutic AUC increases VOD/SOS and non-relapse mortality.'
        });
        alerts.push({
            title: 'Busulfan — Veno-occlusive Disease / SOS Risk',
            text: 'Busulfan is the major driver of hepatic VOD/SOS after conditioning. Monitor weight, abdominal girth, and bilirubin daily from start of conditioning. Ursodeoxycholic acid prophylaxis is recommended throughout conditioning and post-transplant. Defibrotide is first-line treatment for severe SOS/VOD — have access plan in place.'
        });
    }

    // Melphalan (high-dose conditioning) — mucositis, strict stability
    if (hasDrug('melphalan')) {
        alerts.push({
            title: 'Melphalan — Severe Mucositis & Oral Cryotherapy',
            text: 'Oral ice chips (cryotherapy) started 5 min before infusion and continued for 30 min significantly reduce melphalan-induced mucositis — this is the standard of care for MEL-200. Assess oral mucosa daily from Day 0. Nutritional support and analgesics (including opioids for Grade 3–4 mucositis) should be anticipated.'
        });
        alerts.push({
            type: 'info',
            title: 'Melphalan — Strict Stability Limit',
            text: 'Reconstituted melphalan is unstable — must be infused within 60 minutes of preparation. Delays or temperature excursions significantly reduce potency. Confirm with pharmacy that preparation-to-administration time is within limit.'
        });
    }

    // Thiotepa — skin toxicity, CNS penetration, showering protocol
    if (hasDrug('thiotepa')) {
        alerts.push({
            title: 'Thiotepa — Skin Pigmentation & Blistering (Nursing Alert)',
            text: 'Thiotepa is excreted in sweat and causes severe skin pigmentation and blistering at pressure points. Patients must shower every 6 hours during infusion and for 48 hours after last dose. Remove tight clothing and change bed linen daily during treatment. Avoid contact with mucous membranes.'
        });
        alerts.push({
            title: 'Thiotepa — CNS Toxicity',
            text: 'High-dose thiotepa penetrates the CNS and can cause somnolence, confusion, and encephalopathy. Assess neurological status daily. Avoid concurrent CNS-depressant medications where possible. Most neurotoxicity is reversible after drug clearance.'
        });
    }

    // Amsacrine — glass container mandatory, QTc, hepatotoxicity
    if (hasDrug('amsacrine')) {
        alerts.push({
            title: 'Amsacrine — Glass Container MANDATORY',
            text: 'Amsacrine dissolves PVC — must be diluted ONLY in 5% Dextrose (D5W) and administered through glass or polyolefin containers. NS causes crystallisation and renders the solution unsafe. Incompatible with heparin. Protect from light during administration.'
        });
        alerts.push({
            title: 'Amsacrine — QTc Prolongation & Hepatotoxicity',
            text: 'QTc prolongation: baseline ECG before each course; correct hypokalaemia and hypomagnesaemia before infusion; avoid concurrent QTc-prolonging agents. Hepatotoxicity: monitor LFTs before each dose; hold for significant transaminase elevation.'
        });
    }

    // Treosulfan — busulfan-like VOD risk, but lower neurotoxicity
    if (hasDrug('treosulfan')) {
        alerts.push({
            title: 'Treosulfan — VOD/SOS Risk & Hepatotoxicity',
            text: 'Treosulfan is a busulfan analogue with MAC-equivalent myeloablation but lower neurotoxicity (no seizure prophylaxis required). VOD/SOS risk is lower than busulfan but still present. Ursodeoxycholic acid prophylaxis recommended. Monitor LFTs, weight, and abdominal girth daily from start of conditioning.'
        });
    }

    return alerts;
}

function buildPrintPreview() {
    const phase = getActivePhaseData();
    if (!phase) return;

    handleNEPALogic();
    const emetogenicity = phase.emetogenicity || 'moderate';

    // Detect fully oral regimen: flagged explicitly OR premed file exists with no IV drugs
    const isOralOnly = phase.isOral === true ||
        (getPhaseProtocolData() !== null && (phase.infusionDrugs || []).length === 0);

    // Hide entire pre-medication preferences card for oral-only regimens
    document.getElementById('premedPreferencesCard').style.display = isOralOnly ? 'none' : 'block';
    document.getElementById('nk1Group').style.display = isOralOnly ? 'none' : 'block';
    document.getElementById('antihistGroup').style.display = (!isOralOnly && needsAntiAllergicPremed(phase)) ? 'block' : 'none';
    document.getElementById('gcsGroup').style.display = 'block';

    // Pre-med and infusion sections: hidden for oral-only
    const premedSection = document.getElementById('printPremedSection');
    const infusionSection = document.getElementById('printInfusionSection');
    document.getElementById('printPreCycleNote').style.display = 'none';

    if (isOralOnly) {
        premedSection.style.display = 'none';
        infusionSection.style.display = 'none';
    } else {
        premedSection.style.display = 'block';
        infusionSection.style.display = 'block';

        // Build premed rows
        const premeds = buildPremeds(phase);
        const premedBody = document.getElementById('printPremedRows');
        premedBody.innerHTML = premeds.map((r, i) => `
            <tr>
                <td>${i + 1}</td>
                <td><strong>${r.drug}</strong></td>
                <td>${r.dose}</td>
                <td>${r.route}</td>
                <td>${r.timing}</td>
            </tr>`).join('');

        // Build infusion rows
        const infusionRows = buildInfusionRows(phase);
        const infusionBody = document.getElementById('printInfusionRows');
        infusionBody.innerHTML = infusionRows.map(r => `
            <tr>
                <td>${r.seq}</td>
                <td><strong>${r.drug}</strong>${r.note ? `<br><span style="font-size:10px;color:#555;font-style:italic;">${r.note}</span>` : ''}</td>
                <td>${r.dose}</td>
                <td>${r.solvent}</td>
                <td>${r.volume}</td>
                <td>${r.duration}</td>
            </tr>`).join('');
    }

    // Build oral chemotherapy rows
    const oralChemoRows = buildOralChemoRows(phase);
    const oralChemoSection = document.getElementById('printOralChemoSection');
    const oralChemoBody = document.getElementById('printOralChemoRows');
    if (oralChemoRows.length > 0) {
        oralChemoSection.style.display = 'block';
        oralChemoBody.innerHTML = oralChemoRows.map(r => `
            <tr>
                <td>${r.num}</td>
                <td><strong>${r.drug}</strong></td>
                <td>${r.dose}</td>
                <td>${r.route}</td>
                <td style="font-size:11px;">${r.schedule}</td>
            </tr>`).join('');
    } else {
        oralChemoSection.style.display = 'none';
    }

    // Build post-discharge rows
    const postmeds = buildPostMeds();
    const postBody = document.getElementById('printPostmedRows');
    postBody.innerHTML = postmeds.map((r, i) => `
        <tr>
            <td>${i + 1}</td>
            <td><strong>${r.name}</strong></td>
            <td>${r.dose}</td>
            <td>${r.route}</td>
            <td>${r.frequency}</td>
            <td>${r.duration}</td>
        </tr>`).join('');

    // Growth factor
    const gfSection = document.getElementById('printGrowthFactorSection');
    const gfText = document.getElementById('printGrowthFactorText');
    const gfLabel = getGCSLabel();
    if (gfLabel) {
        gfSection.style.display = 'block';
        gfText.textContent = gfLabel;
    } else {
        gfSection.style.display = 'none';
    }

    // Clinical alerts
    const { results, patientData } = originalResults;
    const alertsSection = document.getElementById('printClinicalAlerts');
    const alertsContent = document.getElementById('printClinicalAlertsContent');
    const alerts = buildClinicalAlerts(results);
    if (alerts.length > 0) {
        alertsSection.style.display = 'block';
        alertsContent.innerHTML = alerts.map(a => {
            const isInfo = a.type === 'info';
            const bg     = isInfo ? '#e3f2fd' : '#fff8e1';
            const border = isInfo ? '#1976d2' : '#f9a825';
            const title  = isInfo ? '#0d47a1' : '#7a5000';
            const icon   = isInfo ? '&#8505;' : '&#9654;';
            return `<div class="print-alert-${isInfo ? 'info' : 'warning'}" style="margin-bottom:10px; padding:8px 12px; background:${bg}; border-left:4px solid ${border}; border-radius:3px;">
                <div class="alert-title" style="font-weight:700; font-size:12px; color:${title}; margin-bottom:3px;">${icon} ${a.title}</div>
                <div style="font-size:12px; color:#333; line-height:1.5;">${a.text}</div>
            </div>`;
        }).join('');
    } else {
        alertsSection.style.display = 'none';
    }

    // Patient summary
    const phaseLabel = phase.label ? ` — ${phase.label}` : '';
    const displayCycles = extractPhaseCycles(phase, results) || results.cycles || '—';
    const cyclesNote = results.cyclesNote || null;
    const printName = (document.getElementById('printPatientName').value || '').trim();
    const printAge = (document.getElementById('printPatientAge').value || '').trim();
    const patientLine = [
        printName ? `<strong>Name:</strong> ${printName}` : null,
        printAge ? `Age: ${printAge} yrs` : null,
        `Sex: ${patientData.sex ? patientData.sex.charAt(0).toUpperCase() + patientData.sex.slice(1) : '—'}`,
        `Height: ${patientData.height ? patientData.height + ' cm' : '—'}`,
        `Weight: ${patientData.weight ? patientData.weight + ' kg' : '—'}`,
        `BSA: ${results.bsa} m²`
    ].filter(Boolean).join(' | ');
    document.getElementById('printPatientSummary').innerHTML = `
        <strong>Patient:</strong> ${patientLine}<br>
        <strong>Cancer:</strong> ${getCancerDisplayName(results.cancerType)}${results.subtype ? ' — ' + getSubtypeDisplayName(results.subtype) : ''}<br>
        <strong>Setting:</strong> ${getSettingLabel(patientData.setting)}<br>
        <strong>Regimen:</strong> ${results.protocolName}${phaseLabel} | Cycles: ${displayCycles}${cyclesNote ? ` <span style="color:#555;font-style:italic;">(${cyclesNote})</span>` : ''}
    `;
    document.getElementById('printDate').textContent = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'long', year:'numeric' });

    // Dose modification note
    const doseModEl = document.getElementById('printDoseModNote');
    const reductions = (typeof currentReductions !== 'undefined') ? currentReductions : {};
    const modifiedDrugs = Object.entries(reductions).filter(([, pct]) => pct > 0);
    if (modifiedDrugs.length > 0) {
        const modText = modifiedDrugs.map(([drug, pct]) => `${drug} (−${pct}%)`).join(', ');
        doseModEl.innerHTML = `&#9888; <strong>Dose modifications applied:</strong> ${modText}`;
        doseModEl.style.display = 'block';
    } else {
        doseModEl.style.display = 'none';
    }
}

function buildAndPrint() {
    buildPrintPreview();
    document.getElementById('printArea').style.display = 'block';
    window.print();
    setTimeout(() => { document.getElementById('printArea').style.display = 'none'; }, 1000);
}