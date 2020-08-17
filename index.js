const express = require('express')
const {urlPageScraper, repoUrls, endingUrl} = require('./url_scraper')
const server = require('./backend/server')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//87
let startingUrl = "https://github.com/search?p=87&q=stars%3A%3E100&s=stars&type=Repositories"


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


