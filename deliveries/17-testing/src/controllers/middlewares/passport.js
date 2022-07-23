const passport = require('passport')
const Strategy = require('passport-local').Strategy
const localStrategy = Strategy
const logInfo = require('../../logs/loggers').logInfo
const userDao = require('../../daos/factory/daoFactory').getUserPersistence()
const bcrypt = require ('bcrypt')

/* Bcrypt settings */
const saltRounds = 2

// Login
passport.use('login', new localStrategy({usernameField: 'email'}, async function(username, password, done) {
    logInfo(`URL: /login & METHOD: POST`)
    const exists = await userDao.getById(username)
    if(!exists)
        return done(null, false)
    
    bcrypt.compare(password, exists.password, (err, result) => {
        if(!result)
            return done(null, false)
            
        return done(null, exists)
    })
}))

// Register
passport.use('register', new localStrategy({usernameField: 'email'}, async function(username, password, done) {
    logInfo(`URL: /register & METHOD: POST`)
    const exists = await userDao.getById(username)
    if(exists)
        return done(null, false)

    bcrypt.hash(password, saltRounds, function(err, hash) {
        const newUser = {id: username, password: hash}
        userDao.save(newUser).then(() => {
            return done(null,newUser)
        }).catch((e) => {
            console.log(e)
        })
    })
}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser(async function(user, done) {
    const dsUser = userDao.getById(user.id)
    done(null, dsUser)
})

module.exports = passport