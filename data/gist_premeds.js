window.premedData = window.premedData || {};

window.premedData.gist = (function () {

    // All GIST protocols are oral — no IV chemotherapy in any setting.
    // isOral: true suppresses the IV pre-medication and infusion table sections.
    // All oral drugs appear automatically in the Oral Chemotherapy section.

    function oral(emetogenicity) {
        return { label: null, emetogenicity: emetogenicity, isOral: true, infusionDrugs: [] };
    }

    return {

        // ── NEOADJUVANT ──────────────────────────────────────────────────────
        'Imatinib-Neo':       oral('low'),
        'Avapritinib-Neo':    oral('low'),

        // ── ADJUVANT ─────────────────────────────────────────────────────────
        'Imatinib-Adj':       oral('low'),

        // ── METASTATIC ───────────────────────────────────────────────────────
        'Imatinib-400':                oral('low'),
        'Imatinib-800-Exon9':          oral('low'),
        'Avapritinib-PDGFRA':          oral('low'),
        'Sunitinib-2L':                oral('moderate'),
        'Regorafenib-3L':              oral('moderate'),
        'Ripretinib-4L':               oral('low'),
        'Larotrectinib-NTRK':          oral('low'),
        'Entrectinib-NTRK':            oral('low'),
        'Repotrectinib-NTRK':          oral('low'),
        'Dabrafenib-Trametinib-BRAF':  oral('low')
    };

})();
