require('dotenv').config()

module.exports = {
  "development": {
    "use_env_variable": "DB_DEV_URL",
    logging: console.info
  },
  "test": {
    "use_env_variable": "DB_TEST_URL",
    logging: false
  },
  "production": {
    "use_env_variable": "DB_PROD_URL",
    logging: false
  }
}
