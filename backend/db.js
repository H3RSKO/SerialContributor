const { Sequelize, Model, DataTypes } = require('sequelize');
const pkg = require('../package.json')
const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: false
  });

const Repo = db.define('repo', {
  url: {
    type: Sequelize.TEXT,
    unique: true,
    allowNull: false,
  },
  readme: {
    type: Sequelize.TEXT,
    unique: true,
    allowNull: false,
  }
})

db.sync()

module.exports = Repo
