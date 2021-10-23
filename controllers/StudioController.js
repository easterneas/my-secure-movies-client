async function getStudios (req, reply) {
  const { Studio, User } = this.models

  const studios = await Studio.findAll({ include: { model: User } })

  return reply.status(200).send(studios)
}

async function getOneStudio (req, reply) {
  const { Studio, Movie } = this.models
  const { StudioId } = req.params

  const studio = await Studio.findByPk(StudioId, { include: [ { model: Movie } ] })

  if(!studio)
    return reply.status(404).send('not found')

  return reply.status(200).send(studio)
}

module.exports = {
  getStudios,
  getOneStudio
}
