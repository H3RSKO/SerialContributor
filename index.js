const express = require('express')
const {urlPageScraper, repoUrls, endingUrl} = require('./url_scraper')
const server = require('./backend/server')


let startingUrl = "https://github.com/search?q=stars%3A%3E100&s=stars&type=Repositories"

server()
// urlPageScraper(startingUrl)


