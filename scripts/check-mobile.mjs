/**
 * Responsive audit: renders the site at several widths and walks the whole
 * DOM looking for the ACTUAL sources of horizontal overflow (elements whose
 * box extends past the layout width), rather than guessing.
 *
 * Usage: node scripts/check-mobile.mjs [baseUrl]
 */
import { existsSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

const CHROME_PATHS = [
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
];
const executablePath = CHROME_PATHS.find((p) => existsSync(p));
if (!executablePath) {
  console.error('Chrome not found');
  process.exit(1);
}

const base = process.argv[2] ?? 'http://localhost:5173/My-Portfolio/';
const WIDTHS = [320, 360, 375, 390, 414, 768, 1024, 1280];

const browser = await puppeteer.launch({
  executablePath,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--force-device-scale-factor=1'],
});

for (const width of WIDTHS) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
  await page.goto(`${base}?w=${width}`, { waitUntil: 'networkidle2', timeout: 45000 });
  // Let entrance animations settle so transient transforms don't false-positive
  await new Promise((r) => setTimeout(r, 1500));

  const audit = await page.evaluate(() => {
    const layoutW = document.documentElement.clientWidth;
    const offenders = [];
    const all = document.querySelectorAll('*');

    for (const el of all) {
      const r = el.getBoundingClientRect();
      const overRight = r.right - layoutW;
      const overLeft = -r.left;
      // Ignore sub-pixel noise and elements inside a horizontal scroller
      let inScroller = false;
      let p = el.parentElement;
      while (p) {
        const cs = getComputedStyle(p);
        if ((cs.overflowX === 'auto' || cs.overflowX === 'scroll') && p.scrollWidth > p.clientWidth) {
          inScroller = true;
          break;
        }
        p = p.parentElement;
      }
      if (!inScroller && (overRight > 1 || overLeft > 1)) {
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className?.baseVal ?? el.className ?? '').toString().slice(0, 80),
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
          overRight: Math.round(overRight),
        });
      }
    }

    // Deduplicate by class
    const seen = new Set();
    const unique = offenders.filter((o) => {
      const key = `${o.tag}|${o.cls}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return {
      layoutW,
      innerW: window.innerWidth,
      docScrollW: document.documentElement.scrollWidth,
      bodyScrollW: document.body.scrollWidth,
      hasHorizontalScroll: document.documentElement.scrollWidth > layoutW,
      mqDesktop: window.matchMedia('(min-width: 1024px)').matches,
      offenders: unique.slice(0, 12),
    };
  });

  console.log(`\n=== ${width}px ===`);
  console.log(
    `layout=${audit.layoutW} inner=${audit.innerW} docScroll=${audit.docScrollW} bodyScroll=${audit.bodyScrollW} hScroll=${audit.hasHorizontalScroll} desktopMQ=${audit.mqDesktop}`,
  );
  if (audit.offenders.length === 0) {
    console.log('✓ no elements overflow the viewport');
  } else {
    for (const o of audit.offenders) {
      console.log(`  ✗ <${o.tag}> right=${o.right} (over by ${o.overRight})  cls="${o.cls}"`);
    }
  }
  await page.close();
}

await browser.close();
