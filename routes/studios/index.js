'use strict'
const {
  getStudios,
  getOneStudio
} = require('../../controllers/StudioController')

const studioDefs = require('../../definitions/studio')

const studioSwagger = {
  getAll: {
    schema: {
      description: 'Fetches all studios',
      response: {
        200: {
          description: studioDefs.response[200].description,
          type: 'array',
          items: { ...studioDefs.response[200] }
        }
      }
    }
  },
  getOne: {
    schema: {
      description: 'Fetches studio data',
      params: studioDefs.params,
      response: {
        200: studioDefs.response[200],
        404: studioDefs.response[404]
      }
    }
  },
}

module.exports = async function (fastify, opts) {
  fastify.get('/', { preHandler: fastify.auth([fastify.authenticate]), ...studioSwagger.getAll }, getStudios)
  fastify.get('/:StudioId', { preHandler: fastify.auth([fastify.authenticate]), ...studioSwagger.getOne }, getOneStudio)
}
