const express = require('express');
const usersRoutes = express.Router();

const usersController = require('../controllers/users.controller');

usersRoutes.post('/', usersController.createNewUser);

usersRoutes.get('/', usersController.getAllUsers);

usersRoutes.get('/:id', usersController.getUserById);

usersRoutes.patch('/', usersController.updateUser);

usersRoutes.delete('/', usersController.deleteUser);

module.exports = usersRoutes; //export default
