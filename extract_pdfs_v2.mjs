import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { readFileSync, writeFileSync } from 'fs';

async function extractPDF(pdfPath, outputPath, maxPages = 999) {
    const data = new Uint8Array(readFileSync(pdfPath));
    const loadingTask = getDocument({ data });
    const pdfDoc = await loadingTask.promise;
    const numPages = pdfDoc.numPages;
    console.log(pdfPath + ' -> Pages: ' + numPages);
    let fullText = '';
    for (let i = 1; i <= Math.min(numPages, maxPages); i++) {
        const page = await pdfDoc.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += '\n--- PAGE ' + i + ' ---\n' + pageText;
    }
    writeFileSync(outputPath, fullText, 'utf8');
    console.log('Written: ' + outputPath + ' (' + fullText.length + ' chars)');
    return numPages;
}

const baseDir = "C:\\Users\\ndjan\\OneDrive\\Documents\\zenu\\A I Medumbà\\";
const outDir = "C:\\Users\\ndjan\\Downloads\\medumba\\";

await extractPDF(baseDir + "Lexique médécine.pdf", outDir + "medecine_extracted.txt");
await extractPDF(baseDir + "Dictionnaire Medumba 2.pdf", outDir + "dico_medumba2_extracted.txt");
await extractPDF(baseDir + "Dictionnaire Français-Medumba..pdf", outDir + "dico_fr_medumba_extracted.txt");
