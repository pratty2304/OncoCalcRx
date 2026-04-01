window.premedData = window.premedData || {};

window.premedData.tumor_agnostic = (function () {

    function pembro(seq)  { return { name: 'Pembrolizumab', solvent: 'NS', volume: 100, duration: '30 min', sequence: seq }; }
    function tdxd(seq)    { return { name: 'Trastuzumab Deruxtecan', solvent: 'NS', volume: 250, duration: '90 min (1st infusion); 30 min thereafter if tolerated', sequence: seq }; }
    function oral(emeto)  { return { label: null, emetogenicity: emeto, isOral: true, infusionDrugs: [] }; }

    return {

        'Pembrolizumab-MSI-H': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ pembro(1) ]
        },

        'Pembrolizumab-TMB-H': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ pembro(1) ]
        },

        'Trastuzumab-Deruxtecan-HER2': {
            label: null,
            emetogenicity: 'low',
            isOral: false,
            infusionDrugs: [ tdxd(1) ]
        },

        'Larotrectinib':       oral('low'),
        'Entrectinib':         oral('low'),
        'Repotrectinib':       oral('low'),
        'Selpercatinib':       oral('low'),
        'Dabrafenib-Trametinib': oral('low')

    };
})();
