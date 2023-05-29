const express = require('express');
const controllerUser = require('./controllers/UserController');

const routes = express.Router();

routes.post('/login', controllerUser.Login);

routes.post('/refresh-token', controllerUser.RefreshAcessToken);

module.exports = routes;
