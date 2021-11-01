'use strict'

const { register, login, logout } = require('../controllers/AuthController')

const userDefs = require('../definitions/user')

const userSwagger = {
  login: {
    schema: {
      description: 'Logs the user in, if the email and password matched with the database.',
      body: userDefs.body.login,
      response: {
        200: userDefs.response[200],
        400: userDefs.response[400],
        404: userDefs.response[400],
      },
    },
  },
  register: {
    schema: {
      description: 'Registers a new user with supplied data',
      body: userDefs.body.register,
      response: {
        201: userDefs.response[201],
      },
    },
  },
  logout: {
    schema: {
      description: 'Logs out the user',
      method: 'POST',
      response: {
        200: {
          description: 'Successful logout',
          type: 'object',
          properties: {}
        }
      }
    }
  }
}

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })

  // user and authentication
  fastify.post('/register', { ...userSwagger.register }, register)
  fastify.post('/login', { ...userSwagger.login }, login)

  fastify.post('/logout', { preHandler: fastify.authenticate, ...userSwagger.logout }, logout)
}
