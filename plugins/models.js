'use strict';

const { readdirSync } = require('fs');
const path            = require('path');
const fp              = require('fastify-plugin');
const Sequelize       = require('sequelize');

const MODELS_DIR      = __dirname + '/../models'
const env             = process.env.NODE_ENV || 'development';
const db              = {}
const config          = require(__dirname + '/../config/config.js')[env];

let sequelize

if (config.use_env_variable) sequelize = new Sequelize(process.env[config.use_env_variable], config)
else sequelize = new Sequelize(config.database, config.username, config.password, config)

readdirSync(MODELS_DIR)
.filter(file => {
  return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js')
})
.forEach(file => {
  const model = require(path.join(MODELS_DIR, file))(sequelize, Sequelize.DataTypes)
  db[model.name] = model
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = fp(async function (fastify, opts) {
  fastify.decorate('models', db)
  
  db.sequelize.sync({ alter: true })
})
