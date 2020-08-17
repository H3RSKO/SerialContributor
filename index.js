const express = require('express')
const {urlPageScraper, repoUrls, endingUrl} = require('./url_scraper')
const server = require('./backend/server')

//87
let startingUrl = "https://github.com/search?p=87&q=stars%3A%3E100&s=stars&type=Repositories"

server()
// urlPageScraper(startingUrl)




