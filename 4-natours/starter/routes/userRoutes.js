const express = require('express');
const { signup } = require('../controllers/authController');

const router = express.Router();

const {
  getAllUsers,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.route('/signup').post(signup);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUsers).patch(updateUser).delete(deleteUser);

module.exports = router;
