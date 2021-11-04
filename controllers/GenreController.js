async function getGenres (req, reply) {
  const { Genre } = this.models

  try {
    const genres = await Genre.findAll()

    return reply.status(200).send(genres)
  } catch (e) {
    throw e
  }
}

module.exports = {
  getGenres
}
