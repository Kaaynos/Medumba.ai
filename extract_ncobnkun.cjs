const fs = require('fs');

// Parse XLSX sharedStrings
const ssXml = fs.readFileSync('C:\\Users\\ndjan\\Downloads\\medumba\\extract_ncobnkun\\xl\\sharedStrings.xml', 'utf8');
const strings = [];
const siRegex = /<si>([\s\S]*?)<\/si>/g;
let m;
while ((m = siRegex.exec(ssXml)) !== null) {
    const si = m[1];
    const textParts = [];
    const tRegex = /<t(?:\s[^>]*)?>([^<]*)<\/t>/g;
    let tm;
    while ((tm = tRegex.exec(si)) !== null) {
        textParts.push(tm[1]);
    }
    strings.push(textParts.join(''));
}
console.log('Strings:', strings.length);

// Parse sheets
const sheetFiles = ['sheet1.xml', 'sheet2.xml', 'sheet3.xml'].map(f =>
    'C:\\Users\\ndjan\\Downloads\\medumba\\extract_ncobnkun\\xl\\worksheets\\' + f
);

const allRows = [];
for (const sf of sheetFiles) {
    if (!fs.existsSync(sf)) continue;
    const xml = fs.readFileSync(sf, 'utf8');
    const rowRegex = /<row[^>]*>([\s\S]*?)<\/row>/g;
    let rm;
    while ((rm = rowRegex.exec(xml)) !== null) {
        const rowXml = rm[1];
        const cells = [];
        const cellRegex = /<c\s[^>]*>([\s\S]*?)<\/c>/g;
        let cm;
        while ((cm = cellRegex.exec(rowXml)) !== null) {
            const cellXml = cm[0];
            const isStr = /t="s"/.test(cellXml);
            const vMatch = /<v>(\d+)<\/v>/.exec(cellXml);
            if (vMatch) {
                if (isStr) {
                    const idx = parseInt(vMatch[1]);
                    cells.push(idx < strings.length ? strings[idx] : '');
                } else {
                    cells.push(vMatch[1]);
                }
            } else {
                cells.push('');
            }
        }
        if (cells.some(c => c.trim())) {
            allRows.push(cells.join(' | '));
        }
    }
}

console.log('Total rows:', allRows.length);
fs.writeFileSync('C:\\Users\\ndjan\\Downloads\\medumba\\ncobnkun_extracted.txt', allRows.join('\n'), 'utf8');
allRows.slice(0, 30).forEach(r => console.log(r));
