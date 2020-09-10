const express = require('express')
const {urlPageScraper, repoUrls, endingUrl} = require('./url_scraper')
const server = require('./backend/server')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// you need to manually iterate this url (the number by the first p={num}) by 3 after every pass.
// so starting url "https://github.com/search?p=1&q=stars%3Aetc..." becomes "https://github.com/search?p=4&q=stars%3Aetc..."
let startingUrl = "https://github.com/search?p=1&q=stars%3A%3E100&s=stars&type=Repositories"


let logo = `
███████╗███████╗██████╗ ██╗ █████╗ ██╗
██╔════╝██╔════╝██╔══██╗██║██╔══██╗██║
███████╗█████╗  ██████╔╝██║███████║██║
╚════██║██╔══╝  ██╔══██╗██║██╔══██║██║
███████║███████╗██║  ██║██║██║  ██║███████╗
╚══════╝╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝

 ██████╗ ██████╗ ███╗   ██╗████████╗██████╗ ██╗██████╗ ██╗   ██╗████████╗ ██████╗ ██████╗
██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██║██╔══██╗██║   ██║╚══██╔══╝██╔═══██╗██╔══██╗
██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║██████╔╝██║   ██║   ██║   ██║   ██║██████╔╝
██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║██╔══██╗██║   ██║   ██║   ██║   ██║██╔══██╗
╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║██║██████╔╝╚██████╔╝   ██║   ╚██████╔╝██║  ██║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═════╝  ╚═════╝    ╚═╝    ╚═════╝ ╚═╝  ╚═╝ `

console.log(logo)
console.log('©️2020 By: Yosef Herskovitz')
rl.question('Press any button to continue', () => {
  urlPageScraper(startingUrl)
  server()})


