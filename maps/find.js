/* NODE MODULES */
var net = require('net'),
    tcpEventify = require('../utils/tcpEventify');

/** LOCAL OBJECT 
 * @property {} - 
 */
var FIND = {
    basepath: __dirname + '/../sockets/',
    retry: {
        attempts: 10,
        timeout: 100
    } 
};

/** MODULE INTERFACE
 *@method {function} - 
 */
module.exports = {
    globalNamespace: globalNamespace
};

/*----------------------------------------------------------------------------*/

function globalNamespace(name, found) {
    console.log('Searching global namespace "/' + name + '"');
    connectToNamespace(name, found);
}

function connectToNamespace(name, found, maxAttempts, retryTimeout) {
    var numAttempts = maxAttempts || FIND.retry.attempts,
        timeout = retryTimeout || FIND.retry.timeout,
        theEventerface,
        attempts = 0,
        socket;

    (function connect() {
        socket = net.connect(FIND.basepath + name + '.sock', function () {
            theEventerface = tcpEventify(socket);
            found(theEventerface);
        });
        socket.on('error', function (err) {
            if (err.errno === 'ECONNREFUSED') {
                if (++attempts <= numAttempts) {
                    setTimeout(function () {
                        connect();
                    }, timeout);
                }
            }
        });
    })();
}