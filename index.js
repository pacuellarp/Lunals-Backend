const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
//const {
// backendMidnightCron,
// backendNoonCron,
//} = require('./backendLifeTime/backendCron');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = [
  'http://localhost:3000',
  'http://localhost:5050',
  'http://localhost:8080',
  'https://lunalsfashiondesign.vercel.app',
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed.'));
    }
  },
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

//backendMidnightCron.start();
//backendNoonCron.start();

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Mi port ${port}`);
});
