'use strict'
const {
  getMovies,
  getOneMovie,
  addNewMovie,
  updateMovie,
  deleteMovie,
} = require('../../controllers/MovieController')

const movieDefs = require('../../definitions/movie')

const movieSwagger = {
  getAll: {
    schema: {
      description: 'Fetches all movies',
      response: {
        200: {
          description: 'The list of movies',
          type: 'array',
          items: { ...movieDefs.response[200] }
        },
      },
    },
  },
  getOne: {
    schema: {
      description: 'Fetches movie details based on the ID given',
      params: movieDefs.params,
      response: {
        200: movieDefs.response[200],
        404: movieDefs.response[404]
      },
    },
  },
  addNew: {
    schema: {
      description: 'Adds new movie data',
      body: movieDefs.body,
      response: {
        201: movieDefs.response[201],
        400: movieDefs.response[400],
        500: movieDefs.response[500],
      },
    },
  },
  update: {
    schema: {
      description: 'Updates the movie with new data',
      params: movieDefs.params,
      response: {
        204: movieDefs.response[204],
        400: movieDefs.response[400],
        404: movieDefs.response[404],
        500: movieDefs.response[500],
      },
    },
  },
  delete: {
    schema: {
      description: 'Fetches movie details based on the ID given',
      params: {
        type: 'object',
        properties: {
          MovieId: {
            type: 'integer',
            description: 'the ID of the movie',
          },
        },
      },
      response: {
        200: movieDefs.response[200],
        404: movieDefs.response[404]
      },
    },
  }
}

module.exports = async function (fastify, opts) {
  fastify.get('/', { preHandler: fastify.auth([ fastify.authenticate ]), ...movieSwagger.getAll }, getMovies)
  fastify.get('/:MovieId', { preHandler: fastify.auth([ fastify.authenticate ]), ...movieSwagger.getOne }, getOneMovie)
  fastify.post('/', { preHandler: fastify.auth([ fastify.authenticate, fastify.authorize ], { relation: 'and' }), ...movieSwagger.addNew }, addNewMovie)
  fastify.put('/:MovieId', { preHandler: fastify.auth([ fastify.authenticate, fastify.authorize ], { relation: 'and' }), ...movieSwagger.update }, updateMovie)
  fastify.delete('/:MovieId', { preHandler: fastify.auth([ fastify.authenticate, fastify.authorize ], { relation: 'and' }), ...movieSwagger.delete }, deleteMovie)
}
