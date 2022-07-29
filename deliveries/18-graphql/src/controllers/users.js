const logInfo = require('../logs/loggers').logInfo
const logWarn = require('../logs/loggers').logWarn

const userController = {
    register: (req, res) => {
        logInfo(`URL: ${req.url} & METHOD: ${req.method}`)
        res.render('layouts/register')
    },
    registerFail: (req, res) => {
        logWarn(`URL: ${req.url} & METHOD: ${req.method}`)
        res.render('layouts/register-fail')
    },
    login: (req, res) => {
        logInfo(`URL: ${req.url} & METHOD: ${req.method}`)
        res.render('layouts/login')
    },
    loginFail: (req, res) => {
        logWarn(`URL: ${req.url} & METHOD: ${req.method}`)
        res.render('layouts/login-fail')
    },
    products: (req, res) => {
        logInfo(`URL: ${req.url} & METHOD: ${req.method}`)
        if(!req.session.passport)
            res.redirect('/login')
        else
            res.render('layouts/main', {email: req.session.passport.user.id})
    },
    logout: (req, res) => {
        logInfo(`URL: ${req.url} & METHOD: ${req.method}`)
        const user = req.session.passport.user.id
        req.session.destroy((e) => {
            if(e) 
                res.json(e)
            else
                res.render('layouts/goodbye', {username: user})
        })
    }
}

module.exports = userController