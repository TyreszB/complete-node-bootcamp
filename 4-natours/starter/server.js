// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('connection success');
  });

const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});