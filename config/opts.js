// const { GOOGLE_CONFIGURATION } = require('fastify-oauth2')

module.exports = {
  main: {
    logger: { level: "trace" }
  },
  bcrypt: {
    salt: process.env.SALT || 12
  },
  cookie: {
    secret: process.env.COOKIE_SECRET,
    // ? parsing cookie options
    // parseOptions: {}
  },
  setCookie: {
    path: '/',
    secure: process.env.COOKIE_SECURE === 'true', // send cookie over HTTPS only
    httpOnly: process.env.COOKIE_HTTP_ONLY === 'true',
    signed: process.env.COOKIE_SIGNED === 'true',
    sameSite: process.env.COOKIE_SAME_SITE === 'true',
  },
  csrf: {},
  helmet: {},
  jwt: {
    secret: process.env.JWT_SECRET,
    cookie: {
      cookieName: process.env.TOKEN_COOKIE,
      signed: process.env.COOKIE_SIGNED === 'true',
    },
    // * comment this if it's broken on local testing
    // sign: {
    //   issuer: process.env.API_DOMAIN
    // },
    // verify: {
    //   issuer: process.env.API_DOMAIN
    // }
  },
  leveldb: {
    name: `ldb.${process.env.LEVELDB_NAME}`,
    options: {
      // store: require('memdown')
    }
  },
  multer: {},
  // * Re-enable this if this provides little to no changes
  // oauth: {
  //   name: "googleOAuth2",
  //   credentials: {
  //     client: {
  //       id: "",
  //       secret: "",
  //     },
  //     auth: GOOGLE_CONFIGURATION
  //   }
  // },
  multipart: {
    limits: {
      fieldNameSize: 100, // Max field name size in bytes
      fieldSize: 100,     // Max field value size in bytes
      fields: 10,         // Max number of non-file fields
      fileSize: 1000000,  // For multipart forms, the max file size in bytes
      files: 1,           // Max number of file fields
      headerPairs: 2000   // Max number of header key=>value pairs
    }
  }
}
