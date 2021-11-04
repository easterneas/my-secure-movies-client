const fp = require('fastify-plugin')

module.exports = fp(async function (fastify) {
  const { cors } = require('../config/opts')
  fastify.register(require('fastify-cors'), cors)
})
