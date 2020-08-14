const axios = require('axios');
const cheerio = require('cheerio');
const puppeteerExtra = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');


// blocks ads on jspell
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteerExtra.use(AdblockerPlugin())

puppeteerExtra.use(pluginStealth());

let spellcheckUrl = 'https://www.jspell.com/checker/'

// navigate between pages
const spellChecker = async (spellcheckUrl) => {
    try {
      const browser = await puppeteerExtra.launch({headless: false})
      const page = await browser.newPage()
      await page.goto(spellcheckUrl, {waitUntil: 'networkidle2'})
      // await page.tap('.next_page')
      // let textArea = await page.waitFor('#pagetext');
      await page.$eval('#pagetext', el => el.value = 'Adenosine triphospdadhate');
      // await page.click('.btn btn-primary');

      } catch(error) {console.error}

  }

const pullDBUrls = async () => {
  try {
    let urlList = await Repo.findAll()
    resolve()
    // urlList.forEach(e => console.log(e))
    console.log(urlList[0])


  } catch(error) {console.error}
}


// spellChecker(spellcheckUrl)
console.log(pullDBUrls())
