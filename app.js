const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const BASE_URL = 'mongodb://0.0.0.0:27017/mestodb';

mongoose
  .connect(BASE_URL)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(`Something went wrong ${err}`)
  })

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '647f721067dc7a7b6eff1e0e'
  };

  next();
});

app.use(express.json());
app.use('/', router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
