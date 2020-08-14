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

// puppeteerExtra.use(pluginStealth());

const spellcheckUrl = 'https://www.jspell.com/checker/'

// navigate between pages
const spellChecker = async (data) => {
    try {
      const browser = await puppeteerExtra.launch({headless: false})
      const page = await browser.newPage()
      await page.goto(spellcheckUrl, {waitUntil: 'networkidle2'})
      console.log('>>>>>>>>> , ', data)
      let text = `url: ${data.url}. >>> ${data.readme}`
      setTimeout(await page.$eval('#pagetext', (el, text) => {el.value = text}, text), 15000);

      } catch(error) {console.error}

  }


const pullDBUrls = async () => {

    let {data: urlList} = await axios.get('http://localhost:8080')
    if (!urlList) console.log('no data')

    let beggining = 0
    let end = 3
    let index = 0
    const itterator = (list) => {list.forEach(async element => {
      setTimeout(await spellChecker(element), 15000)
      })
    }

    const tabOpener = () => {
      let currentList = urlList.slice(beggining, end)
      itterator(currentList)
      beggining +=3
      end +=3

      rl.question('continue?', () => {
        tabOpener()
        rl.close();
      })
    }

    tabOpener()

}


// spellChecker('dsdfasjfdjsdfjlasjfljdsafjladsjfladsj')
pullDBUrls()