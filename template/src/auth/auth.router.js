const AuthController = require('./auth.controller');
const router = require('express').Router();
const { isAuth, isAdmin } = require('../common/middlewares');

router.post('/auth/signup', AuthController.signUp);
router.post('/auth/login', AuthController.login);
router.get('/auth/getUserById/:id', isAuth, AuthController.getUserById);
router.put('/auth/updateUserById/:id', isAuth, AuthController.updateUserById);
router.delete(
  '/auth/deleteUser/:id',
  isAuth,
  isAdmin,
  AuthController.deleteUser
);

module.exports = router;
