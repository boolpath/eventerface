/* NODE MODULES */
var net = require('net'),
    tcpEventify = require('../utils/tcpEventify');

/** LOCAL OBJECT 
 * @property {string} basepath - The path to look for unix sockets
 * @property {object} retry - Describes the number and delay between connection retries
 */
var FIND = {
    basepath: __dirname + '/../sockets/',
    retry: {
        attempts: 10,
        timeout: {
            local: 500,
            remote: 1000
        }
    }
};

/** MODULE INTERFACE
 *@method {function} globalNamespace - Looks for an existing global namespace
 */
module.exports = {
    globalNamespace: globalNamespace,
    distributed: {
        channel: distributedChannel
    }
};

/*----------------------------------------------------------------------------*/

/** Looks for an existing global namespace
 * @param {string} name - The name of the namespace
 * @returns {function} found - A function to be called when the namespace is found
 */
function globalNamespace(name, found) {
    // console.log('Searching global namespace "' + name + '"');
    connectToUnixSocket(name, found);
}

/** Connects to a unix-socket-based namespace
 * @param {string} name - The name of the namespace
 * @returns {function} found - A function to be called when the namespace is found
 * @param {number} maxAttempts - The max number of connection attempts to be done
 * @param {number} retryTimeout - The delay between unsuccessful connection attempts
 * @returns
 */
function connectToUnixSocket(name, found, maxAttempts, retryTimeout) {
    var numAttempts = maxAttempts || FIND.retry.attempts,
        timeout = retryTimeout || FIND.retry.timeout.local,
        attempts = 0,
        socket;

    // Try to connect to the unix socket server
    (function connect() {
        socket = net.connect(FIND.basepath + name + '.sock', function () {
            var eventedSocket = tcpEventify(socket);
            // Expose the socket methods through the 'emit' and 'on' methods
            // of the namespace object to be returned
            var emitter = {
                emit: function (eventName, message) {
                    eventedSocket.send(eventName, message);
                },
                on: function (eventName, listener) {
                    eventedSocket.send('on', eventName);
                    eventedSocket.on(eventName, listener);
                }
            };
            // Return the found namespace object by invoking the callback
            found(emitter);
        });
        socket.on('error', function (err) {
            // Retry on unsuccessful connection attempts
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

/**
 *
 */
function distributedChannel(options, found) {
    // console.log('Searching distributed channel on port', options.port);
    connectToTcpSocket(options, found);
}

/**
 *
 */
function connectToTcpSocket(options, found, maxAttempts, retryTimeout) {
    var numAttempts = maxAttempts || FIND.retry.attempts,
        timeout = retryTimeout || FIND.retry.timeout.remote,
        attempts = 0,
        socket;

    // Try to connect to the tcp socket server
    (function connect() {
        socket = net.connect(options, function () {
            var eventedSocket = tcpEventify(socket);
            var emitter = {
                emit: function (eventName, message) {
                    eventedSocket.send(eventName, message);
                },
                on: function (eventName, listener) {
                    eventedSocket.on(eventName, listener);
                }
            };
            found(emitter);
        });
        socket.on('error', function (err) {
            // Retry on unsuccessful connection attempts
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