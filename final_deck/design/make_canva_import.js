// Generates canva_import.html — a multi-page HTML the Canva importer turns into
// a presentation. Each page is one full-bleed slide image plus speaker notes.
const fs = require('fs');
const path = require('path');

const OWNER = 'dannythehat';
const REPO = 'Presentation-';
const BRANCH = 'claude/limechain-cfo-board-deck-1coexa';
const RAW = `https://raw.githubusercontent.com/${OWNER}/${REPO}/refs/heads/${BRANCH}/final_deck/design/slides`;

const titles = [
  'Building Confidence',
  'Five working assumptions',
  'The forecast is not noisy. It is biased.',
  'Every ask in the brief is a break in one pipeline',
  'Three journeys, one order',
  'Stop the bleeding, see the truth',
  '€1.8m owed to us: five problems, five plays',
  'One version of the truth',
  'What fixed-price actually changes',
  'The ambition is right. The sequencing is the risk.',
  'Same project, new regime: Cygnus replayed',
  'What I commit to, and what I refuse to promise',
  'I am not asking for budget. I am asking for decision rights.',
  'The 13-week cash view: why weeks matter',
];

const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'notes.json'), 'utf8'));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

let pages = '';
for (let i = 0; i < 14; i++) {
  const n = String(i + 1).padStart(2, '0');
  const url = `${RAW}/slide-${n}.png`;
  const note = (notes.find(x => x.page === i + 1) || {}).notes || '';
  pages += `  <div data-document-role="page" data-label="${esc(titles[i])}" data-speaker-notes="${esc(note)}" style="width:1920px;height:1080px;position:relative;overflow:hidden;background:#161917;">
    <img src="${url}" alt="${esc(titles[i])}" style="position:absolute;inset:0;width:1920px;height:1080px;display:block;" />
  </div>\n`;
}

const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Building Confidence — LimeChain CFO 90-Day Plan</title></head>
<body style="margin:0">
${pages}</body>
</html>\n`;

fs.writeFileSync(path.join(__dirname, '..', 'canva_import.html'), html);
console.log('Wrote final_deck/canva_import.html with 14 pages.');
