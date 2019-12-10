require('dotenv').config();

module.exports = {
  developement:{
    database:{
      dsn:process.env.DEVELOPMENT_DB_DSN
    }
  },
  production:{
    database:{
      dsn:process.env.PRODUCTION_DB_DSN
    }
  }
}