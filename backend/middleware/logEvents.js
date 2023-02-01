
// this is a file which logs event, and it is imported by the server.js file

const { format } = require('date-fns');  // This needs to be a dependancy install from npm, it is a date layout module
const { v4: uuid } = require('uuid');    // This needs to be a dependancy install from npm, it is a module that creates a unique identifyer which is usedul for logging events

const fs = require('fs');      // this is a common core module which provides a way to write and update files
const fsPromises = require('fs').promises;
const path = require('path');  // this is a common core module which provides a way to find files in the directory


// this is the module we are exporting. It is a function which creates an events log file 
const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;  // auto creates a date and time for the event
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;          // message is an input parameter with the message we want to log

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {  // to account for the case if we don't have a logs directory to begin with (if it doesn't exist)
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs')); // this makes the dir
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);  // creates a file in the log folder which has the logName and the message with date as the content
    } catch (err) {
        console.log(err);
    }
};


const logger = (req, res, next) => {
    logEvents(`${req.method}\t ${req.headers.origin}\t ${req.url}`, 'newnew.txt')
    console.log(`${req.method} ${req.path}`)
    next();
};

module.exports = logger;
