const axios = require('axios');
const cheerio = require('cheerio');
const puppeteerExtra = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// blocks ads on jspell
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteerExtra.use(AdblockerPlugin())

puppeteerExtra.use(pluginStealth());

const spellcheckUrl = 'https://www.spellboy.com/check_spelling/'

// navigate between pages
const spellChecker = async (data) => {
    try {
      const browser = await puppeteerExtra.launch({headless: false})
      const page = await browser.newPage()
      await page.goto(spellcheckUrl, {waitUntil: 'networkidle2'})
      let fixedReadme = data.readme.replace(/\./g, '. ')
      let text = `url: ${data.url}. >>> ${fixedReadme}`
      // let text = data
      setTimeout(await page.$eval('.text', (el, text) => {el.value = text}, text), 15000);

      } catch(error) {console.error}

  }


const itterator = async (id) => {
  let {data} = await axios.get(`http://localhost:8080/${id}`)
  if (!data) console.log(`ID: ${id} -- no data`)
  else {spellChecker(data)}
}

let beggining = 658
let end = 661
const tabOpener = () => {
    let id = beggining
    while(id < end) {
      itterator(id)
      console.log(id)
      id++
    }
    beggining +=3
    end +=3

    rl.question('continue?', () => {
      tabOpener()

    })
}

tabOpener()
