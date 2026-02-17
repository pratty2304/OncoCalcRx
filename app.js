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

// Build searchable protocol index
function buildProtocolIndex() {
    console.log('Building protocol index...'); // Debug log
    allProtocols = [];
    
    // Helper function to generate search aliases for common drug abbreviations
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
        if (text.includes('egfr') || text.includes('osimertinib') || text.includes('erlotinib') || text.includes('afatinib') || text.includes('mobocertinib') || text.includes('exon19') || text.includes('l858r') || text.includes('exon20')) {
            aliases += ' egfr egfr-positive egfr+ egfr-mutated egfr-mutation egfr-targeted exon19del l858r exon20';
        }
        // EGFR — drug-specific aliases (only added when that drug is present)
        if (text.includes('osimertinib')) aliases += ' tagrisso osimertinib';
        if (text.includes('erlotinib')) aliases += ' tarceva erlotinib';
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
                    'egfr': ['egfr', 'osimertinib', 'erlotinib', 'afatinib', 'mobocertinib', 'exon19', 'l858r', 'exon20'],
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
                    const searchText = `${protocol.name} ${settingName} ${drugNames}`.toLowerCase();
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
                    const searchText = `${protocol.name} ${settingName} ${drugNames}`.toLowerCase();
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
                const searchText = `${protocol.name} ${settingName} ${drugNames}`.toLowerCase();
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

    // Filter by selected clinical setting if one is chosen
    const selectedSetting = document.getElementById('clinicalSetting') ? document.getElementById('clinicalSetting').value : '';
    const searchPool = selectedSetting
        ? cancerSpecificProtocols.filter(p => p.setting === selectedSetting)
        : cancerSpecificProtocols;

    // First try exact/substring matches
    const exactResults = searchPool.filter(protocol =>
        protocol.searchText.includes(queryLower) ||
        protocol.searchTextNormalized.includes(queryNormalized)
    );

    // If we have exact matches, prioritize them with drug specificity scoring
    if (exactResults.length > 0) {
        const queryWords = queryLower.split(/\s+/).filter(w => w.length > 1);
        exactResults.sort((a, b) => {
            // Drug specificity: compute score adjustment for each result
            function drugSpecificityScore(protocol) {
                let adj = 0;
                if (protocol.drugCount > 0 && queryWords.length > 0) {
                    const matchedDrugCount = protocol.drugNames.filter(drugName =>
                        queryWords.some(term =>
                            drugName.includes(term) || term.includes(drugName) ||
                            (term.length > 3 && drugName.length > 3 && fuzzyMatch(term, drugName, 0.75))
                        )
                    ).length;
                    const unmatchedDrugs = protocol.drugCount - matchedDrugCount;
                    if (matchedDrugCount > 0) {
                        adj = unmatchedDrugs === 0 ? 5 : -(unmatchedDrugs * 2);
                    }
                }
                // Name-starts-with bonus
                if (protocol.name.toLowerCase().startsWith(queryLower)) adj += 1;
                return adj;
            }
            return drugSpecificityScore(b) - drugSpecificityScore(a);
        });
        return exactResults.slice(0, 20);
    }

    // If no exact matches, try fuzzy matching for auto-correction
    const fuzzyResults = searchPool.map(protocol => {
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
                Regimen: ${results.protocolName}${results.selectedAuc ? ` | AUC ${results.selectedAuc}` : ''}` :
                `Weight: ${patientData.weight} kg | Height: ${patientData.height} cm<br>
                BSA: ${results.bsa} m²<br>
                Setting: ${getSettingLabel(patientData.setting)}<br>
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
                Regimen: ${results.protocolName}${results.selectedAuc ? ` | AUC ${results.selectedAuc}` : ''}` :
                `Weight: ${patientData.weight} kg | Height: ${patientData.height} cm<br>
                BSA: ${results.bsa} m²<br>
                Setting: ${getSettingLabel(patientData.setting)}<br>
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
});