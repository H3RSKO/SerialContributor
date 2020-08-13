const axios = require('axios');
const cheerio = require('cheerio');
const puppeteerExtra = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const  readmePageScraper = require('./readme_scraper')

// need to track where each run ends to start the next run
let endingUrl = ""
let runs = 1
const repoUrls = []

// can only run consecutively 3 times before being shut down by github
const urlPageScraper = (currentUrl) => {
  axios(currentUrl)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html)

    console.log('>> Finding Links')
    // get repo items
    const repoLinks = $('.repo-list > .repo-list-item > .mt-n1 > div > a')

    // get repo links
    repoLinks.each((i, link) => {
      const url = link.attribs.href
      const fullUrl = 'github.com' + url
      repoUrls.push(fullUrl)
    })
    navigator(currentUrl)
  })
  .catch(console.error)
}

// allows us to bypass scraping restrictions
puppeteerExtra.use(pluginStealth());

// navigate between pages
const navigator = async (currentUrl) => {
    runs ++
    try {
      const browser = await puppeteerExtra.launch({headless: false})
      const page = await browser.newPage()
      await page.goto(currentUrl, {waitUntil: 'networkidle2'})
      await page.tap('.next_page')
      let pageUrl = page.url()
      if(runs < 4) {
        await page.waitFor(1709);
        console.log('> Navigating to next page')
        urlPageScraper(pageUrl)
        await browser.close();
      } else {
          console.log(">> Max number of runs reached")
          await browser.close();
          endingUrl = currentUrl
          console.log(">> Initiating Readme scrape")
          repoUrls.forEach(url => {
            readmePageScraper('https://'+url)
          })
          console.log('>> Done')
          return
      }
      } catch(error) {console.error}

  }

module.exports = {
  endingUrl,
  repoUrls,
  urlPageScraper,
  navigator,
}

