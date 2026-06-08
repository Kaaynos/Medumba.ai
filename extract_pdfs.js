const fs = require('fs');
const path = require('path');

async function extractPDF(pdfPath, outputPath) {
    try {
        const pdfParse = require('pdf-parse');
        const dataBuffer = fs.readFileSync(pdfPath);
        const data = await pdfParse(dataBuffer);
        fs.writeFileSync(outputPath, data.text, 'utf8');
        console.log(`Extracted ${data.numpages} pages, ${data.text.length} chars -> ${outputPath}`);
    } catch(e) {
        console.error('Error:', e.message);
    }
}

const baseDir = "C:\\Users\\ndjan\\OneDrive\\Documents\\zenu\\A I Medumbà\\";
const outDir = "C:\\Users\\ndjan\\Downloads\\medumba\\";

const pdfs = [
    { src: baseDir + "Lexique médécine.pdf", out: outDir + "medecine_extracted.txt" },
    { src: baseDir + "Dictionnaire Medumba 2.pdf", out: outDir + "dico_medumba2_extracted.txt" },
    { src: baseDir + "Dictionnaire Français-Medumba..pdf", out: outDir + "dico_fr_medumba_extracted.txt" },
];

(async () => {
    for (const p of pdfs) {
        await extractPDF(p.src, p.out);
    }
})();
