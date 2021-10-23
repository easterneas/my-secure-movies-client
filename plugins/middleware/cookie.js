const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  const { cookie } = require('../../config/opts')

  fastify.register(require('fastify-cookie'), cookie)
})
