const crypto = require('crypto');

// Función para encriptar
function encryptData(data, key) {
  const algorithm = 'aes-256-cbc';
  const cipher = crypto.createCipher(algorithm, key);
  let encryptedData = cipher.update(data, 'utf8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
}

// Función para desencriptar
function decryptData(encryptedData, key) {
  const algorithm = 'aes-256-cbc';
  const decipher = crypto.createDecipher(algorithm, key);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
}

// Generar una clave criptográfica
const key = crypto.randomBytes(32);

// Variables de estado
const email = 'pacuellarp';
const password = 'Cuellar1995,.-_';

// Encriptar las variables de estado
const encryptedEmail = encryptData(email, key);
const encryptedPassword = encryptData(password, key);

// Mostrar resultados
console.log('Credenciales encriptadas:');
console.log('Email:', encryptedEmail);
console.log('Password:', encryptedPassword);
console.log('Clave de cifrado:', key.toString('hex'));
