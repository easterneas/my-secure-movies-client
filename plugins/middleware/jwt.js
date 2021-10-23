const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  const { jwt } = require('../../config/opts')

  fastify.register(require('fastify-jwt'), jwt)
})
