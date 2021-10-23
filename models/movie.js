'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      this.belongsTo(models.Genre)
      this.belongsTo(models.Studio)
    }
  }

  Movie.init(
    {
      GenreId: {
        type: DataTypes.INTEGER,
        references: { model: "Genres", key: "id" }
      },
      StudioId: {
        type: DataTypes.INTEGER,
        references: { model: "Studios", key: "id" }
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" }
      },
      name: DataTypes.STRING,
      yearReleased: DataTypes.INTEGER,
    },
    { sequelize, modelName: 'Movie' }
  )
  return Movie
}
