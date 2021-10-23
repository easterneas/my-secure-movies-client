const { setCookie } = require('../config/opts')

async function login (req, reply) {
  try {
    const { User } = this.models
    const { email, password } = req.body

    if(!email || !password)
      return reply.code(400).send({ message: "You have to fill both fields!" })

    const { name, password: userPassword } = await User.findOne({ where: { email } })

    if(!name) return reply.code(404).send({ message: "Sorry, but wrong credentials." })
    if(!this.verifyHash(password, userPassword)) return reply.code(404).send({ message: "Sorry, but wrong credentials." })

    const token = await reply.jwtSign({ name, email })

    reply
    .code(200)
    .setCookie(process.env.TOKEN_COOKIE, token, setCookie)
    .send({ name, email })
  } catch (e) {
    throw e
  }
}

async function logout (req, reply) {
  try {
    reply.clearCookie('appToken', { path: '/' }).code(200).send()
  } catch (e) {
    throw e
  }
}

async function register (req, reply) {
  const { sequelize, User } = this.models
  const t = await sequelize.transaction()

  try {
    const { name, email, password } = req.body
    const hashedPassword = this.hash(password)

    await User.create({ name, email, password: hashedPassword }, { transaction: t })
    await t.commit()

    const token = await reply.jwtSign({ name, email })

    reply
    .code(200)
    .setCookie(process.env.TOKEN_COOKIE, token, setCookie)
    .send({ name, email })
  } catch (e) {
    await t.rollback()

    throw e
  }
}

module.exports = {
  login,
  logout,
  register
}
