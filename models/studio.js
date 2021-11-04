'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Studio extends Model {
    static associate(models) {
      this.hasMany(models.Movie)
      this.belongsTo(models.User)
    }
  }

  Studio.init(
    {
      name: DataTypes.STRING,
      specialization: DataTypes.STRING,
    },
    { sequelize, modelName: 'Studio' }
  )

  return Studio
}
