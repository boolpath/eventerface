/* NODE MODULES */
var net = require('net'),
    EventEmitter = require('events').EventEmitter,
    tcpEventify = require('tcp-eventify'),
    find = require('../find.js');

/** Creates a point to point mapper that routes every event to the other side of the channel
 * @param {string} port - The port where the local side of the channel will be created
 * @returns {object} map - The created mapping object
 */
module.exports = function (port) {
    var serverSocket = {},              // The socket created when the remote end contacts the local server
        clientSocket = {},              // The socket created when the local en contacts the remote server
        serverConnected = false,        // Limits the number of connections to one per channel
        emitter = new EventEmitter(),   // Used to map the received socket events to the channel owner
        map = {};

    // TCP server for receiving the connection request from the other end of the channel
    var server = net.createServer(function (socket) {
        // If the remote end of the channel has not connected to the local end yet
        if (!serverConnected) {
            serverConnected = true;
            var eventedSocket = tcpEventify(socket);
            serverSocket = eventedSocket;
            // Map all received events to the channel owner through 'emitter'
            eventedSocket.on('event', function (event) {
                emitter.emit(event.name, event.message);
            });
        }
    }).listen(port, function () {
        // console.log('Distributed channel listening on port', port);
    });

    /* Connect the local end of the channel to a remote end
     * @param {string} target - Contains the target host and port of the remote end of the channel
     * @param {function} onConnect - A callback to invoke when the channel is connected
     **/
    map.connect = function connectChannel(target, onConnect) {
        var parts = target.split(':'),
            options = {
                host: parts[0],
                port: parts[1]
            };

            find.distributed.channel(options, function (socket) {
                clientSocket = socket;
                // Map all received events to the channel owner through 'emitter'
                socket.on('event', function (event) {
                    emitter.emit(event.name, event.message);
                });
                if (typeof onConnect === 'function') {
                    onConnect();
                }
            });
        };

    // Expose and #emit method that uses either the client or the server connection
    map.emit = function (event, message) {
        if (clientSocket.send) {
            clientSocket.send(event, message);
        } else if (serverSocket.send) {
            serverSocket.send(event, message);
        }
    };
    // Subscribe to channel events through 'emitter'
    map.on = function (event, callback) {
        emitter.on(event, callback);
    };

    return map;
};