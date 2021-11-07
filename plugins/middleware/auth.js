const fp = require('fastify-plugin')

/**
 * Verifies web token sent through specific header.
 *
 * @param {Request} req
 * @param {Response} reply
 */
async function authenticate (req, reply) {
  try {
    const { User } = this.models

    await req.jwtVerify()

    const { name, email } = req.user
    const user = await User.findOne({ where: { name, email } })

    if (!user) throw new Error('Token is not valid')

    req.user = user

    return
  } catch (e) {
    reply.code(401).send(e)
  }
}

/**
 * Verifies the user is the owner of the movie collection.
 *
 * @param {Request} req
 * @param {Response} reply
 */
async function authorize (req, reply) {
  try {
    const { Movie } = this.models
    const { id } = req.user
    const { MovieId } = req.params

    if(MovieId){
      const movie = await Movie.findByPk(MovieId)

      if (movie) {
        if(movie.UserId !== id) throw new Error('Access not permitted. You should only able to edit your own movies!')
      } else throw new Error('Item is not found')
    }
  } catch (e) {
    reply.code(400).send(e)
  }
}

module.exports = fp(async function(fastify, opts) {
  fastify
  .decorate('authenticate', authenticate)
  .decorate('authorize', authorize)
})
