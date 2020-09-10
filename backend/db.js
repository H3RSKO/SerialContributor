const { Sequelize, Model, DataTypes } = require('sequelize');
const pkg = require('../package.json')
const databaseName = pkg.name

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
    allowNull: false,
  }
})

db.sync()

module.exports = Repo
