const log4js = require('log4js')

log4js.configure({
    appenders: {
        loggerConsole: {
            type: 'console'
        },
        loggerWarning: {
            type: 'file',
            filename: './logs/warn.log'
        },
        loggerError: {
            type: 'file',
            filename: './logs/error.log'
        }
    },
    categories: {
        default: {
            appenders: ['loggerConsole'], level: 'info'
        },
        warning: {
            appenders: ['loggerConsole', 'loggerWarning'], level: 'warn'
        },
        error: {
            appenders: ['loggerConsole', 'loggerError'], level: 'error'
        }
    }
})

function datedMessage(message) {
    return (message + ' AT: ' + new Date().toLocaleString())
}

const loggerInfo = log4js.getLogger('default')
const loggerWarn = log4js.getLogger('warning')
const loggerError = log4js.getLogger('error')

function logInfo(message) {
    loggerInfo.info(datedMessage(message))
}

function logWarn(message) {
    loggerWarn.warn(datedMessage(message))
}

function logError(message) {
    loggerError.error(datedMessage(message))
}

module.exports = {
    logInfo,
    logWarn,
    logError
}