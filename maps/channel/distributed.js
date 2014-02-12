var net = require('net'),
    EventEmitter = require('events').EventEmitter,
    tcpEventify = require('../../utils/tcpEventify');

/** Creates a point to point mapper that routes every event to the other side of the channel
 * @param {string} port - The port where the local side of the channel will be created
 * @returns {object} map - The local map created
 */
module.exports = function (port) {
    var map = {
        emitter: new EventEmitter(),
        serverSocket: {},
        clientSocket: {}
    };

    var server = net.createServer(function (socket) {
        var eventedSocket = tcpEventify(socket);
        map.serverSocket = eventedSocket;
        eventedSocket.on('event', function (event) {
            map.emitter.emit(event.name, event.message);
        });
    }).listen(port, function () {
        console.log('Distributed channel listening on port', port);
    });

    return map;
};