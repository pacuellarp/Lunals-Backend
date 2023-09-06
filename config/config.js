require('dotenv').config();

const config = {
  env: process.env.NODE_ENV,
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
}

module.exports = { config };
