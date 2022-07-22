const parseArgs = require('minimist')
const os = require('os')
const logInfo = require('../logs/loggers').logInfo

const args = parseArgs(process.argv.slice(2))

const infoController = {
    getInfo: (req, res) => {
        logInfo(`URL: ${req.baseUrl} & METHOD: ${req.method}`)
        res.json({
            args: args,
            platformName: process.platform,
            nodeVersion: process.version,
            memoryUsed: process.memoryUsage(),
            execPath: process.title,
            processId: process.pid,
            projectFolder: process.cwd(),
            cpus: os.cpus().length
        })
    }
}

module.exports = infoController