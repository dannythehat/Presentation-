const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const DIR = __dirname;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + path.join(DIR, 'deck.html'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  // Print CSS: one slide per page, no gaps.
  await page.addStyleTag({ content: `
    @page { size: 1920px 1080px; margin: 0; }
    html, body { background: #fff; }
    .deck { display: block !important; gap: 0 !important; padding: 0 !important; }
    .slide { break-after: page; page-break-after: always; }
    .slide:last-child { break-after: auto; page-break-after: auto; }
  `});
  await page.waitForTimeout(300);
  await page.pdf({
    path: path.join(DIR, 'Building-Confidence-LimeChain-CFO.pdf'),
    width: '1920px', height: '1080px',
    printBackground: true, pageRanges: '1-14',
  });
  await browser.close();
  console.log('PDF written.');
})();
