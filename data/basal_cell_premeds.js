window.premedData = window.premedData || {};
window.premedData.basal_cell = {

    // ── LOCALLY ADVANCED / METASTATIC ────────────────────────────────────────

    'Vismodegib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
        // Vismodegib is oral — appears in Oral Chemotherapy section
    },

    'Sonidegib': {
        label: null,
        emetogenicity: 'low',
        isOral: true,
        infusionDrugs: []
        // Sonidegib is oral — appears in Oral Chemotherapy section
    },

    'Cemiplimab': {
        label: null,
        emetogenicity: 'low',
        infusionDrugs: [
            {
                name: 'Cemiplimab',
                sequence: 1,
                solvent: 'NS or D5W',
                volume: '250mL',
                duration: '30 min',
                note: 'Administer through a 0.2 micron in-line filter. Monitor for infusion-related reactions. Counsel patient on irAEs before starting therapy.'
            }
        ]
    }
};
