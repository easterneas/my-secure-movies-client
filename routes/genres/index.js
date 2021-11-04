'use strict'
const {
  getGenres
} = require('../../controllers/GenreController')

const genreDefs = require('../../definitions/genre')

const genreSwagger = {
  getAll: {
    schema: {
      description: 'Fetches all genres',
      response: {
        200: {
          description: genreDefs.response[200].description,
          type: 'array',
          items: { ...genreDefs.response[200] }
        }
      }
    }
  },
}

module.exports = async function (fastify, opts) {
  fastify.get('/', { preHandler: fastify.auth([fastify.authenticate]), ...genreSwagger.getAll }, getGenres)
}
