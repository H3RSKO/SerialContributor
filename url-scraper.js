const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

let startingUrl = "https://github.com/search?q=stars%3A%3E100&s=stars&type=Repositories"

// need to track where each run ends to start the next run
let endingUrl = ""
let runs = 1
const repoUrls = []

// can only run consecutively 3 times before being shut down by github
const pageScraper = (currentUrl) => {
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
    console.log(repoUrls)
    navigator(currentUrl)
  })
  .catch(console.error)
}

// navigate between pages
const navigator = (currentUrl) => {
    runs ++
    puppeteer
      .launch({headless: false})
      .then(browser => browser.newPage())
      .then( async page => {
        await page.goto(currentUrl, {waitUntil: 'networkidle2'})
        await page.tap('.next_page')
        let pageUrl = page.url()
        if(runs < 4) {
          pageScraper(pageUrl)
        } else {
          console.log("Max number of runs reached")
          await browser.close()
        }
      })

  }


pageScraper(startingUrl)

