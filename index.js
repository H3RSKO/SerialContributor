const {urlPageScraper, repoUrls, endingUrl} = require('./url_scraper')

let startingUrl = "https://github.com/search?q=stars%3A%3E100&s=stars&type=Repositories"

urlPageScraper(startingUrl)


