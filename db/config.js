const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

let URI = '';
if (!(config.env == 'development')) {
  URI = `${config.dialect}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
} else {
  URI = config.dbUrl;
}

module.exports = {
  development: {
    url: URI,
    dialect: config.dialect
  },
  production: {
    url: URI,
    dialect: config.dialect,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}