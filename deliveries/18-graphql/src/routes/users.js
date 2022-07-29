const express = require('express')
const userRouter = express.Router()
const passport = require('../controllers/middlewares/passport')
const userController = require('../controllers/users')

userRouter.get('/register', userController.register)

userRouter.post('/register', passport.authenticate('register', {
    failureRedirect: '/register-fail',
    successRedirect: '/products'
}))

userRouter.get('/register-fail', userController.registerFail)

userRouter.get('/login', userController.login)

userRouter.post('/login', passport.authenticate('login', {
    failureRedirect: '/login-fail',
    successRedirect: '/products'
}))

userRouter.get('/login-fail', userController.loginFail)

userRouter.get('/products', userController.products)
    
userRouter.get('/logout', userController.logout)

module.exports = userRouter