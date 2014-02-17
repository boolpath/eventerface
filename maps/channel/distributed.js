var net = require('net'),
    EventEmitter = require('events').EventEmitter,
    tcpEventify = require('../../utils/tcpEventify'),
    find = require('../find.js');

/** Creates a point to point mapper that routes every event to the other side of the channel
 * @param {string} port - The port where the local side of the channel will be created
 * @returns {object} map - The local map created
 */
module.exports = function (port) {
    var map = {},
        serverConnected = false,
        emitter = new EventEmitter(),
        serverSocket = {},
        clientSocket = {};

    var server = net.createServer(function (socket) {
        if (!serverConnected) {
            channelConnected = true;
            var eventedSocket = tcpEventify(socket);
            serverSocket = eventedSocket;
            eventedSocket.on('event', function (event) {
                emitter.emit(event.name, event.message);
            });
        }
    }).listen(port, function () {
        // console.log('Distributed channel listening on port', port);
    });

    map.connect = function connectChannel(target, onConnect) {
        var parts = target.split(':'),
        options = {
            host: parts[0],
            port: parts[1]
        };

        find.distributed.channel(options, function (socket) {
            clientSocket = socket;
            socket.on('event', function (event) {
                emitter.emit(event.name, event.message);
            });
            if (typeof onConnect === 'function') {
                onConnect();
            }
        });
    };
    map.emit = function (event, message) {
        if (clientSocket.send) {
            clientSocket.send(event, message);
        } else if (serverSocket.send) {
            serverSocket.send(event, message);
        }
    };
    map.on = function (event, callback) {
        emitter.on(event, callback);
    };

    return map;
};