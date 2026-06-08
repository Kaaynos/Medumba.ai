const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function extractPDF(pdfPath, outputPath) {
    try {
        const parser = new PDFParse();
        const dataBuffer = fs.readFileSync(pdfPath);
        const data = await parser.parse(dataBuffer);
        const text = data.pages.map(p => p.content.map(c => c.text).join(' ')).join('\n\n');
        fs.writeFileSync(outputPath, text, 'utf8');
        console.log('Extracted ' + data.pages.length + ' pages, ' + text.length + ' chars -> ' + outputPath);
    } catch(e) {
        console.error('Error extracting ' + pdfPath + ':', e.message);
        console.error(e.stack);
    }
}

const baseDir = "C:\\Users\\ndjan\\OneDrive\\Documents\\zenu\\A I Medumbà\\";
const outDir = "C:\\Users\\ndjan\\Downloads\\medumba\\";

(async () => {
    await extractPDF(baseDir + "Lexique médécine.pdf", outDir + "medecine_extracted.txt");
    await extractPDF(baseDir + "Dictionnaire Medumba 2.pdf", outDir + "dico_medumba2_extracted.txt");
    await extractPDF(baseDir + "Dictionnaire Français-Medumba..pdf", outDir + "dico_fr_medumba_extracted.txt");
})();
