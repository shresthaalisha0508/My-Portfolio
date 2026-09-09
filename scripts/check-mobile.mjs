/**
 * One-off mobile layout diagnostic: renders the page at 390x844 (iPhone-ish)
 * in headless Chrome and reports the real geometry of the header elements.
 */
import { existsSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

const CHROME_PATHS = [
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
];
const executablePath = CHROME_PATHS.find((p) => existsSync(p));

const browser = await puppeteer.launch({
  executablePath,
  headless: 'new',
  args: [
    '--no-sandbox',
    '--disable-dev-shm-usage',
    // Windows display scaling inflates the emulated viewport without this
    '--force-device-scale-factor=1',
    '--window-size=390,900',
  ],
});

const page = await browser.newPage();
await page.goto('http://localhost:5173/My-Portfolio/', { waitUntil: 'networkidle2', timeout: 30000 });

// Apply device metrics via raw CDP — immune to Windows display scaling
const cdp = await page.createCDPSession();
await cdp.send('Emulation.setDeviceMetricsOverride', {
  width: 390,
  height: 844,
  deviceScaleFactor: 3,
  mobile: true,
});
await page.reload({ waitUntil: 'networkidle2' });

const report = await page.evaluate(() => {
  const pick = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      display: cs.display,
      x: Math.round(r.x),
      y: Math.round(r.y),
      width: Math.round(r.width),
      height: Math.round(r.height),
      right: Math.round(r.right),
    };
  };

  return {
    viewport: { w: innerWidth, h: innerHeight },
    header: pick('header'),
    container: pick('header > div'),
    brand: pick('header a[href="#top"]'),
    brandName: pick('header a[href="#top"] span span:first-child'),
    desktopNav: pick('header nav[aria-label="Primary"]'),
    hamburger: pick('header button[aria-controls="mobile-navigation"]'),
    docScrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
  };
});

console.log(JSON.stringify(report, null, 2));
await browser.close();
