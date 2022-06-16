const express = require('express')
const log4js = require('log4js')
const app = express()
const PORT = 8080
require('dotenv').config()

const ENT = process.env.NODE_ENV

if(ENT == 'PROD') {
    log4js.configure({
        appenders: {
            myLoggerFile: {
                type: 'file',
                filename: 'debug.log'
            },
            myErrorFile: {
                type: 'file',
                filename: 'error.log'
            }
        },
        categories: {
            default: {
                appenders: ['myLoggerFile'], level: 'all'
            },
            logwn: {
                appenders: ['myErrorFile'], level: 'warn'
            },
            logInfo: {
                appenders: ['myLoggerFile'], level: 'info'
            }
        }
    })
} else {
    log4js.configure({
        appenders: {
            myLoggerConsole: {
                type: 'console'
            }
        },
        categories: {
            default: {
                appenders: ['myLoggerConsole'], level: 'all'
            },
            logwn: {
                appenders: ['myLoggerConsole'], level: 'warn'
            },
            logInfo: {
                appenders: ['myLoggerConsole'], level: 'info'
            }
        }
    })
}
    
const logWarning = log4js.getLogger('logwn')
const logInfo = log4js.getLogger('logInfo')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.listen(PORT, (e) => {
    if(!e)
        console.log(`Server up listening at port: ${PORT}`)
})

app.get('/sum', (req, res) => {
    if(isNaN(req.query.val1) || isNaN(req.query.val2)) {
        logWarning.error('Data error, your data is not a number')
        res.json('Data error')
    } else {
        logInfo.info('Processed successfully')
        res.json(parseInt(req.query.val1) + parseInt(req.query.val2))
    }

})

app.use((req, res) => {
    logWarning.error('Incorrect route')
    res.json('Incorrect route')
})