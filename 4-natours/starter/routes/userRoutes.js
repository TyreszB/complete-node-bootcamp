const express = require('express');
const {
  signup,
  login,
  resetPassword,
  forgotPassword,
} = require('../controllers/authController');

const router = express.Router();

const {
  getAllUsers,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword').post(resetPassword);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUsers).patch(updateUser).delete(deleteUser);

module.exports = router;
