const cron = require('node-cron');
const decryptData = require('./decryptCredentials');
const backendLifeTime = require('./backendLifeTime');

async function backendLF() {
  console.log('La tarea programada se ejecutó a las 2 pm.');
  try {
    const keyHex = process.env.CRYPTO_PASSWORD;
    if (!keyHex) {
      throw new Error('Clave de cifrado no definida');
    }
    const key = Buffer.from(keyHex, 'hex');

    const decryptedEmail = decryptData(
      process.env.BACKEND_EMAIL,
      key,
      process.env.CRYPTO_ALGORITHM
    );
    const decryptedPassword = decryptData(
      process.env.BACKEND_PASSWORD,
      key,
      process.env.CRYPTO_ALGORITHM
    );

    backendLifeTime(decryptedEmail, decryptedPassword);
  } catch (error) {
    console.error('Error durante la desencriptación:', error.message);
    process.exit(1);
  }
}

// Programar ejecución a la medianoche (00:00)
const backendMidnightCron = cron.schedule('00 00 * * *', backendLF, {
  timezone: 'America/Bogota',
});

// Programar ejecución al mediodía (12:00)
const backendNoonCron = cron.schedule('00 12 * * *', backendLF, {
  timezone: 'America/Bogota',
});

module.exports = { backendMidnightCron, backendNoonCron };
