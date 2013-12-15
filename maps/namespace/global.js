var tcpEventify = require('../../utils/tcpEventify'),
    net = require('net'),
    fs = require('fs'),
    basepath = __dirname + '/../../sockets/';

/** Creates a simple global mapper that routes every event to its listeners
 * @param {string} name - The name of the map
 * @returns {object} map - The global map created
 */
module.exports = function (name) {
    var map = {
        name: name || 'globalNamespace',
        socket: {},
        events: {},     // A set of the emitted events
        trees: {}       // A set of arrays of listeners of events
    };
    var path = basepath + name + '.sock';

    // Check if a UNIX socket has been created previously and unlink it
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    } 

    // Create a UNIX socket server
    map.server = net.createServer(map.onConnection = function (unixSocket) {
        map.socket = tcpEventify(unixSocket);
        map.socket.on('event', function (event) {
            map.socket.send(event.name, event.message);
        });
    }).listen(path, function () {
        // console.log('Unix socket created: ' + name + '.sock');
    });

    // Map emitted events to all listeners by emitting the event on each of them
    map.emit = function () {
        
    };

    // Register a listener to a particular event
    map.on = function () {
        
    };

    return map;
}