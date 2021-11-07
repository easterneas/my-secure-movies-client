async function getMovies (req, reply) {
  const { Movie, Studio, Genre } = this.models

  const movies = await Movie.findAll({
    include: [
      { model: Studio, attributes: [ 'name' ] },
      { model: Genre }
    ],
    where: {
      UserId: req.user.id
    }
  })

  return reply.status(200).send(movies)
}

async function getOneMovie (req, reply) {
  const { Movie, Studio, Genre } = this.models
  const { MovieId } = req.params
  const { id: UserId } = req.user

  try {
    const movie = await Movie.findOne({
      where: { id: MovieId, UserId } ,
      include: [ { model: Studio }, { model: Genre } ]
    })

    if(!movie) throw { statusCode: 404 }

    return reply.status(200).send(movie)
  } catch (e) {
    throw e
  }
}

// mutations

async function addNewMovie (req, reply) {
  const { Movie, sequelize } = this.models
  const { name, GenreId, StudioId, yearReleased } = req.body
  const { id: UserId } = req.user
  const t = await sequelize.transaction()

  try {
    const newMovie = await Movie.create({ name, GenreId, StudioId, yearReleased, UserId }, { transaction: t })

    await t.commit()

    return reply.status(201).send({ ...newMovie.dataValues, id: newMovie.dataValues.id })
  } catch (e) {
    await t.rollback()

    throw e
  }
}

async function updateMovie (req, reply) {
  const { Movie, sequelize } = this.models
  const { name, GenreId, StudioId, yearReleased } = req.body
  const { MovieId } = req.params
  const t = await sequelize.transaction()

  try {
    const movie = await Movie.findByPk(MovieId)

    if(!movie) throw { statusCode: 404 }

    movie.name = name ? name : movie.name
    movie.GenreId = GenreId ? GenreId : movie.GenreId
    movie.StudioId = StudioId ? StudioId : movie.StudioId
    movie.yearReleased = yearReleased ? yearReleased : movie.yearReleased

    await movie.save({ transaction: t })
    await t.commit()

    return reply.status(204).send()
  } catch (e) {
    await t.rollback()

    throw e
  }
}

async function deleteMovie (req, reply) {
  const { Movie, sequelize } = this.models
  const { MovieId } = req.params
  const t = await sequelize.transaction()

  try {
    const movie = await Movie.findByPk(MovieId)

    if(!movie) throw { statusCode: 404 }

    await movie.destroy({ transaction: t })
    await t.commit()

    return reply.status(201).send(movie)
  } catch (e) {
    await t.rollback()

    throw e
  }
}

module.exports = {
  getMovies,
  getOneMovie,
  addNewMovie,
  updateMovie,
  deleteMovie
}
