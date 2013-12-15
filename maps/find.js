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
    },
    found: {}
};

/** MODULE INTERFACE
 *@method {function} - 
 */
module.exports = {
    globalNamespace: globalNamespace
};

/*----------------------------------------------------------------------------*/

/** 
 * @param
 * @returns
 */
function globalNamespace(name, found) {
    console.log('Searching global namespace "/' + name + '"');
    connectToNamespace(name, found);
}

/** 
 * @param
 * @returns
 */
function connectToNamespace(name, found, maxAttempts, retryTimeout) {
    var numAttempts = maxAttempts || FIND.retry.attempts,
        timeout = retryTimeout || FIND.retry.timeout,
        theEventerface,
        attempts = 0,
        socket;

    if (!FIND.found[name]) {
        (function connect() {
            socket = net.connect(FIND.basepath + name + '.sock', function () {
                var eventedSocket = tcpEventify(socket);
                theEventerface = {
                    emit: function (eventName, message) {
                        eventedSocket.send(eventName, message);
                    },
                    on: function (eventName, listener) {
                        eventedSocket.on(eventName, listener);
                    }
                };
                FIND.found[name] = theEventerface;
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
    } else {
        found(FIND.found[name]);
    }
}