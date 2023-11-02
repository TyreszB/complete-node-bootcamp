const fs = require('fs');

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const tour = tours.find((el) => el.id === Number(req.params.id));

  if (!tour)
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const tour = tours.find((el) => el.id === Number(req.params.id));

  if (!tour)
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'updataed tour here ...',
    },
  });
};

const deleteTour = (req, res) => {
  const tour = tours.find((el) => el.id === Number(req.params.id));

  if (!tour)
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is no defined!',
  });
};
const getUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is no defined!',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is no defined!',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is no defined!',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is no defined!',
  });
};

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUsers).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/user', userRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
