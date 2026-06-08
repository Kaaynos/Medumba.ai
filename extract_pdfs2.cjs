const fs = require('fs');
const pdfParse = require('pdf-parse');

async function extractPDF(pdfPath, outputPath) {
    try {
        const dataBuffer = fs.readFileSync(pdfPath);
        const data = await pdfParse(dataBuffer);
        fs.writeFileSync(outputPath, data.text, 'utf8');
        console.log('Extracted ' + data.numpages + ' pages, ' + data.text.length + ' chars -> ' + outputPath);
    } catch(e) {
        console.error('Error extracting ' + pdfPath + ':', e.message);
    }
}

const baseDir = "C:\\Users\\ndjan\\OneDrive\\Documents\\zenu\\A I Medumbà\\";
const outDir = "C:\\Users\\ndjan\\Downloads\\medumba\\";

(async () => {
    await extractPDF(baseDir + "Lexique médécine.pdf", outDir + "medecine_extracted.txt");
    await extractPDF(baseDir + "Dictionnaire Medumba 2.pdf", outDir + "dico_medumba2_extracted.txt");
    await extractPDF(baseDir + "Dictionnaire Français-Medumba..pdf", outDir + "dico_fr_medumba_extracted.txt");
})();
