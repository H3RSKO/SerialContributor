const axios = require('axios');
const cheerio = require('cheerio');
const Repo = require('./backend/db')


const readmePageScraper = (currentUrl) => {
  axios(currentUrl)
  .then(async response => {
    const html = response.data;
    const $ = cheerio.load(html)

    console.log('>> pulling Readme')
    // get readme
    const readme = $('.markdown-body > p')
    let text = readme.each((i, p) => {}).text()
    let repo = {url: currentUrl, readme: text}
    await Repo.create(repo)
    console.log("Added to the Database")
  })
  .catch(console.error)
}


module.exports = readmePageScraper
