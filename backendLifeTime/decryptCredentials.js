// decryptCredentials.js
const crypto = require('crypto');

function decryptData(encryptedData, key, algorithm) {
  if (!encryptedData || !key) {
    throw new Error('Datos encriptados o clave de cifrado no definidos');
  }

  const decipher = crypto.createDecipher(algorithm, key);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
}

module.exports = decryptData;
