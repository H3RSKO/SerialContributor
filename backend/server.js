const router = require('express').Router()
const Repo = require('./backend/db')

const server = () => {
  app.use(express.json())

  app.listen(8080, () => console.log('Gator app listening on port 8080!'));

}


router.get('/', (req, res, next) => {
  try {
    const urlList = await Repo.findAll()
    res.send(urlList)
  }catch(err) {next(err)}
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = server
