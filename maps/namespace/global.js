/* NODE MODULES */
var tcpEventify = require('tcp-eventify'),
    net = require('net'),
    fs = require('fs'),
    basepath = __dirname + '/../../sockets/';

/*----------------------------------------------------------------------------*/

/** Creates a simple global mapper that routes every event to its listeners using unix sockets
 * @param {string} name - The name of the map
 * @returns {object} map - The global map created
 */
module.exports = function (name) {
    var map = {
        name: name || 'globalNamespace',
        sockets: [],    // A set of the connected sockets
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
        // Store the socket for further event mapping
        var socket = tcpEventify(unixSocket);
        map.sockets.push(socket);

        // Subscribe a listener to a particular event
        socket.on('on', function (eventName) {
            if (!(map.trees[eventName] instanceof Array)) {
                map.trees[eventName] = [];
            }
            map.trees[eventName].push(socket);
        });

        // Map emitted events to all listeners by sending the event through their corresponding sockets
        socket.on('event', function (event) {
            var eventName = event.name;
            // Register the event if this is the first time it is emitted
            if (!map.events[eventName]) {
                map.events[eventName] = socket;
            }

            // If there are any registered listeners to this particular event:
            var listeningSockets = map.trees[eventName];
            if (listeningSockets) {
                // Send the event to all its listeners
                listeningSockets.forEach(function (listener) {
                    if (typeof listener === 'object' && listener !== socket &&
                        typeof listener.send === 'function') {
                        listener.send(eventName, event.message);
                    }
                });     
            }
        });
    }).listen(path, function () {
        // console.log('Unix socket created: ' + name + '.sock');
    });

    return map;
}