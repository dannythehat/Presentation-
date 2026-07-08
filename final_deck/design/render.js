const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const DIR = __dirname;
const OUT = path.join(DIR, 'slides');
const SCALE = 2; // 1920x1080 -> 3840x2160

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ args: ['--force-color-profile=srgb'] });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: SCALE,
  });
  await page.goto('file://' + path.join(DIR, 'deck.html'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);

  const slides = await page.$$('.slide');
  const notes = [];
  console.log(`Found ${slides.length} slides`);
  for (let i = 0; i < slides.length; i++) {
    const n = String(i + 1).padStart(2, '0');
    const file = path.join(OUT, `slide-${n}.png`);
    await slides[i].screenshot({ path: file });
    const note = await slides[i].evaluate(el => el.getAttribute('data-notes') || '');
    notes.push({ page: i + 1, notes: note });
    console.log(`  slide-${n}.png`);
  }
  fs.writeFileSync(path.join(DIR, 'notes.json'), JSON.stringify(notes, null, 2));
  await browser.close();
  console.log('Done.');
})();
