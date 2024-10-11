
import puppeteer from 'puppeteer';

// testi, joka lisää kommentin tutoriaalisivulle

(async () => {
  // avataan selain
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // mennään sivulle, jolla on kommentointi
  await page.goto('http://localhost:8081/tutorials/1');

  // odotetaan, että sivu latautuu
  await page.waitForSelector('input[placeholder="Add a comment"]');
  await page.type('input[placeholder="Add a comment"]', 'This is a test comment.');

  //  lähetetään kommentti
  await page.click('button[type="submit"]');

  // odotetaan, että kommentti näkyy sivulla
  await page.waitForFunction(
    'document.querySelector("ul").innerText.includes("This is a test comment.")'
  );

  // suljetaan selain
  await browser.close();
})();
