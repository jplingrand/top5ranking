var winston = require('winston');
var fs = require( 'fs' );

var logDir = 'logs'; // directory path you want to set
if ( !fs.existsSync( logDir ) ) {
    // Create the directory if it does not exist
    console.log()
    fs.mkdirSync( logDir );
}

winston.addColors({
    debug: 'green',
    info:  'cyan',
    warn:  'yellow',
    error: 'red'
});

winston.remove(winston.transports.Console);

winston.add(
    winston.transports.Console,{ 
        level: 'debug',
        colorize:true,
        'timestamp':true
    }
);

function handleLogsAndSendJSON(err,result,callback){
    if (err) {
        callback(err)
    }
    else
    {
        if(result.file){
            console.log("get result and send it back "+result.file.length+" logs")
            callback(null,result.file)
        }else{
            callback(null,[])
        }
    }
}

function theDayBefore(date){
    return date - 24 * 60 * 60 * 1000;
}

winston.getLogs = function(from,to,callback){
    winston.query(
    {
        from:   from?from:(to?theDayBefore(to):theDayBefore(new Date)),
        until:  to?to:new Date,
        limit:  100,
        start:  0,
        order:  'asc',
        fields: ['message','timestamp','level']
    }, function (err, result){
        handleLogsAndSendJSON(err,result,callback)
    });
}


module.exports = winston;