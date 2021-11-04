module.exports = {
  main: {
    logger: { level: "trace" }
  },
  bcrypt: {
    salt: process.env.SALT || 12
  },
  cookie: {
    secret: process.env.COOKIE_SECRET,
  },
  setCookie: {
    path: '/',
    secure: process.env.COOKIE_SECURE === 'true', // send cookie over HTTPS only
    httpOnly: process.env.COOKIE_HTTP_ONLY === 'true',
    signed: process.env.COOKIE_SIGNED === 'true',
    sameSite: process.env.COOKIE_SAME_SITE === 'true',
  },
  cors: {
    origin: (origin, cb) => {
      if(process.env.ORIGINS){
        const origins = process.env.ORIGINS.split(',')
        let flag = false

        origins.forEach(allowedOrigin => {
          console.log(origin, allowedOrigin, new RegExp(allowedOrigin).test(origin))
          if(new RegExp(allowedOrigin).test(origin)) flag = true
        })

        if(!flag) return cb(null, false)
      }
      cb(null, true)
    },
    // methods: [ 'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS' ],
    credentials: true,
    optionsSuccessStatus: 200,
    preflight: true,
  },
  csrf: {},
  helmet: {},
  jwt: {
    secret: process.env.JWT_SECRET,
    cookie: {
      cookieName: process.env.TOKEN_COOKIE,
      signed: process.env.COOKIE_SIGNED === 'true',
    },
  },
  leveldb: {
    name: `ldb.${process.env.LEVELDB_NAME}`,
  },
  multer: {},
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
