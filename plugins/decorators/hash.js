const fp = require('fastify-plugin')

const bcrypt = require('bcryptjs')
const { bcrypt: bcryptOpts } = require('../../config/opts')

function hash(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(bcryptOpts.salt))
}

function verifyHash(password, hash){
  return bcrypt.compareSync(password, hash)
}

module.exports = fp(async function(fastify, opts) {
  fastify
  .decorate('hash', hash)
  .decorate('verifyHash', verifyHash)
})
