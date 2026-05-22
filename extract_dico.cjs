const fs        = require('fs');
const path      = require('path');
const PDFParser = require('pdf2json');
const XLSX      = require('xlsx');

const pdfPath = path.join(__dirname, 'new', 'esquisse dico Kelly Tatnkam.pdf');
const outPath = path.join(__dirname, 'new', 'dico_medumba.xlsx');

// Characters specific to Medumba (absent from standard French)
const MEDUMBA_CHARS = /[ŋŊəƏʉɛɔɲꞌα]/;

function isMedumba(text) {
  return MEDUMBA_CHARS.test(text);
}

function shouldSkip(text, y) {
  const t = text.trim();
  if (t === '') return true;
  if (y > 37) return true;                        // footers / page stamps
  if (/^\d+$/.test(t)) return true;              // page numbers
  if (y < 12 && /^[A-Z]{1,2}$/.test(t)) return true; // section headers (A, B, C…)
  return false;
}

const pdfParser = new PDFParser(null, 1);

pdfParser.on('pdfParser_dataReady', (pdfData) => {
  const pairs = [];

  pdfData.Pages.forEach((page) => {
    const rawItems = page.Texts.map(text => ({
      x: text.x,
      y: text.y,
      text: decodeURIComponent(text.R.map(r => r.T).join(''))
    }));

    // Process left column (x < 17) then right column (x >= 17)
    for (const isRight of [false, true]) {
      const colItems = rawItems
        .filter(i => isRight ? i.x >= 17 : i.x < 17)
        .sort((a, b) => a.y - b.y || a.x - b.x);

      // Group items within 0.4 y-units into the same line
      const lines = [];
      for (const item of colItems) {
        const last = lines[lines.length - 1];
        if (last && Math.abs(item.y - last.y) <= 0.4) {
          last.parts.push(item.text);
        } else {
          lines.push({ y: item.y, parts: [item.text] });
        }
      }

      // Merge line parts and filter junk
      const textLines = lines
        .map(l => ({ y: l.y, text: l.parts.join('') }))
        .filter(l => !shouldSkip(l.text, l.y));

      // Pair each French entry with its Medumba lines
      let currentFrench = null;
      let medumbaParts  = [];

      const flush = () => {
        if (currentFrench !== null) {
          const med = medumbaParts
            .map(s => s.trim())
            .filter(Boolean)
            .join(' ');
          pairs.push({
            french:  currentFrench,
            medumba: med || null   // null = truly empty cell
          });
          currentFrench = null;
          medumbaParts  = [];
        }
      };

      for (const line of textLines) {
        if (isMedumba(line.text)) {
          if (currentFrench !== null) medumbaParts.push(line.text);
          // orphan Medumba line before any French entry → skip
        } else {
          flush();
          currentFrench = line.text.trim();
          medumbaParts  = [];
        }
      }
      flush(); // last entry in this column
    }
  });

  // ── Build Excel ──────────────────────────────────────────────────────────
  const rows = [['Français', 'Medumba']]; // header row
  for (const p of pairs) {
    rows.push([
      p.french  || null,         // Column A – French headword
      p.medumba?.trim() || null  // Column B – empty if no translation
    ]);
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{ wch: 50 }, { wch: 40 }];
  XLSX.utils.book_append_sheet(wb, ws, 'Dictionnaire');
  XLSX.writeFile(wb, outPath);

  console.log(`✅ ${pairs.length} entrées écrites dans :\n   ${outPath}`);
});

pdfParser.on('pdfParser_dataError', err => console.error('Erreur PDF :', err.parserError));
pdfParser.loadPDF(pdfPath);
