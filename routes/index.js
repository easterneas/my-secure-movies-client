'use strict'

const { register, login, logout } = require('../controllers/AuthController')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })

  // user and authentication
  fastify.post('/register', register)
  fastify.post('/login', login)

  fastify.post('/logout', { preHandler: fastify.authenticate }, logout)
}
