import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

async function extractPDF(pdfPath) {
    const loadingTask = getDocument(pdfPath);
    const pdfDoc = await loadingTask.promise;
    const numPages = pdfDoc.numPages;
    console.log('Pages:', numPages);
    let fullText = '';
    for (let i = 1; i <= Math.min(numPages, 10); i++) {
        const page = await pdfDoc.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += `\n--- PAGE ${i} ---\n` + pageText;
    }
    return { numPages, text: fullText };
}

const baseDir = "C:\\Users\\ndjan\\OneDrive\\Documents\\zenu\\A I Medumbà\\";
const result = await extractPDF(new URL('file:///' + baseDir.replace(/\\/g, '/') + "Lexique médécine.pdf"));
console.log(result.text.substring(0, 2000));
