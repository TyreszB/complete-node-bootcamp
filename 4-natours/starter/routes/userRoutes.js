const express = require('express');

const router = express.Router();

const {
  getAllUsers,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require('./../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUsers).patch(updateUser).delete(deleteUser);

module.exports = router;
