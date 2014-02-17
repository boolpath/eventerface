/* NODE MODULES */
var net = require('net'),
    tcpEventify = require('tcp-eventify');

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
 *@method {object} global - Contains methods for finding existing global namespaces and channels
 *@method {object} distributed - Contains methods for finding existing distributed channels, stations and APIs
 */
module.exports = {
    global: {
        namespace: globalNamespace
    },
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

/** Establishes a connection to a unix-socket server
 * @param {string} name - The name of the target socket (i.e. name.sock)
 * @param {function} found - A function to invoke when the connection is established
 * @param {number} maxAttempts - The max number of connection attempts to be done
 * @param {number} retryTimeout - The delay between unsuccessful connection attempts
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
            // of the interface object that will be returned
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
        // Handle connection errors
        socket.on('error', function (err) {
            // Retry on unsuccessful connection attempts
            if (err.errno === 'ECONNREFUSED') {
                if (++attempts <= numAttempts) {
                    setTimeout(function () {
                        connect();
                    }, timeout);
                } else {
                    console.log('Could not connect to unix socket ' + name + '.sock');
                }
            }
        });
    })();
}

/** Looks for an existing distributed channel on a remote server
 * @param {options} - Information needed to find the distributed channel
 * @param {function} found - A callback to invoke when the channel is found
 */
function distributedChannel(options, found) {
    // console.log('Searching distributed channel on port', options.port);
    connectToTcpSocket(options, found);
}

/** Establishes a connnection to a TCP socket server
 * @param {options} - Information like host and port of the channel's server
 * @returns {function} found - A function to be called when the namespace is found
 * @param {number} maxAttempts - The max number of connection attempts to be done
 * @param {number} retryTimeout - The delay between unsuccessful connection attempts
 */
function connectToTcpSocket(options, found, maxAttempts, retryTimeout) {
    var numAttempts = maxAttempts || FIND.retry.attempts,
        timeout = retryTimeout || FIND.retry.timeout.remote,
        attempts = 0,
        socket;

    // Try to connect to the TCP socket server
    (function connect() {
        socket = net.connect(options, function () {
            var eventedSocket = tcpEventify(socket);
            // Expose the socket methods through the 'emit' and 'on' methods
            // of the interface object that will be returned
            var emitter = {
                emit: function (eventName, message) {
                    eventedSocket.send(eventName, message);
                },
                on: function (eventName, listener) {
                    eventedSocket.on(eventName, listener);
                }
            };
            emitter.send = emitter.emit;
            found(emitter);
        });
        // Handle connection errors
        socket.on('error', function (err) {
            // Retry on unsuccessful connection attempts
            if (err.errno === 'ECONNREFUSED') {
                if (++attempts <= numAttempts) {
                    setTimeout(function () {
                        connect();
                    }, timeout);
                } else {
                    console.log('Could not connect to', (options.host || '') + ':' + options.port);
                }
            }
        });
    })();
}