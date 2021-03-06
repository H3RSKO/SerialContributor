// const router = require('express').Router()
const Repo = require('./db')
const express = require('express')
const app = express();

const server = () => {
  app.use(express.json())

  app.listen(8080, () => console.log('SerialContributor listening on Port 8080!'));

}


// app.get('/', async (req, res, next) => {
//   try {
//     const urlList = await Repo.findAll()
//     res.json(urlList)
//   }catch(err) {next(err)}
// })

app.get('/:id', async (req, res, next) => {
  try {
    const repo = await Repo.findByPk(req.params.id)
    res.json(repo)
  } catch (error) {
    next(error)
  }
})

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = server
