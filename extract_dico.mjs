import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require  = createRequire(import.meta.url);
const pdfParse = require('pdf-parse/lib/pdf-parse.js');
const XLSX     = require('xlsx');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pdfPath   = path.join(__dirname, 'new', 'esquisse dico Kelly Tatnkam.pdf');

const buf  = fs.readFileSync(pdfPath);
const data = await pdfParse(buf);

console.log('=== RAW TEXT (first 4000 chars) ===');
console.log(data.text.slice(0, 4000));
console.log('\n=== PAGES:', data.numpages, '===');
